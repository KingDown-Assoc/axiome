// Recherche par mot-clé sur les leçons — logique pure (testable, sans React).
// Insensible à la casse et aux accents ; score pondéré multi-champs ; sémantique
// ET (chaque mot de la requête doit apparaître quelque part). Tout le contenu
// étant déjà côté client, on filtre simplement le tableau des leçons en mémoire.
import { DOMAIN_BY_ID } from "./domains.js";
import { LEVELS } from "./levels.js";

const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l]));

// minuscule + suppression des diacritiques (« géométrie » -> « geometrie »).
export function normalizeText(s) {
  return (s == null ? "" : String(s))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// retire le bruit de balisage/maths pour que les mots collés à $...$, ** ou \cmd matchent.
function strip(s) {
  return (s || "").replace(/[\\${}*_`]/g, " ");
}

function collect(v, out) {
  if (v == null) return;
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) collect(x, out);
  else if (typeof v === "object") for (const k in v) collect(v[k], out);
}

// Champs normalisés d'une leçon, mémoïsés (WeakMap : aucune mutation de l'objet).
const CACHE = new WeakMap();
function fieldsOf(lesson) {
  let f = CACHE.get(lesson);
  if (f) return f;
  const dom = DOMAIN_BY_ID[lesson.domain];
  const lvl = LEVEL_BY_ID[lesson.level];
  const deep = []; collect(lesson.depths, deep);
  const body = []; collect(lesson.examples, body); collect(lesson.exercises, body);
  f = {
    title: normalizeText(lesson.title),
    tagline: normalizeText(lesson.tagline),
    meta: normalizeText([dom && dom.label, lvl && lvl.label, lesson.domain, lesson.level].filter(Boolean).join(" ")),
    key: normalizeText(strip([lesson.keyIdea, lesson.intuition, lesson.vulgarisation].filter(Boolean).join(" "))),
    why: normalizeText(strip(lesson.why || "")),
    deep: normalizeText(strip(deep.join(" "))),
    body: normalizeText(strip(body.join(" "))),
  };
  f.all = [f.title, f.tagline, f.meta, f.key, f.why, f.deep, f.body].join(" \u0001 ");
  CACHE.set(lesson, f);
  return f;
}

const WEIGHTS = [
  ["title", 10], ["tagline", 5], ["meta", 4], ["key", 4], ["why", 3], ["deep", 2], ["body", 1],
];

// Renvoie les leçons correspondant à `query`, triées par pertinence (au plus `limit`).
export function searchLessons(lessons, query, limit = 12) {
  const q = normalizeText(query).trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const hits = [];
  for (const lesson of lessons || []) {
    const f = fieldsOf(lesson);
    if (!tokens.every((tk) => f.all.includes(tk))) continue; // ET : tous les mots présents
    let score = 0;
    for (const tk of tokens) {
      for (const [field, w] of WEIGHTS) if (f[field].includes(tk)) score += w;
    }
    if (f.title.includes(q)) score += 8;        // bonus phrase exacte dans le titre
    if (f.title.startsWith(q)) score += 6;       // bonus préfixe de titre
    hits.push({ lesson, score });
  }
  hits.sort((a, b) => b.score - a.score || a.lesson.title.localeCompare(b.lesson.title, "fr"));
  return hits.slice(0, Math.max(0, limit)).map((h) => h.lesson);
}
