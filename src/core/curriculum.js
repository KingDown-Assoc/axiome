// French curriculum structure — years (classes) and cycles, mapped onto lessons.
// Primary lessons carry a `year` tag (added at import time in content/index.js);
// every preschool lesson belongs to "maternelle". Lessons outside any declared
// year (the skeleton levels: collège and beyond, for now) are grouped by level
// via leftoverByLevel(), so the progress UI can still act on them.
//
// Adding a school year = one entry in YEARS (+ its cycle) and the matching
// year(...) tag in content/index.js. Nothing else to wire.
import { levelOrder } from "./levels.js";
import { domainOrder } from "./domains.js";

export const YEARS = [
  { id: "maternelle", label: "Maternelle", sub: "3–6 ans", level: "preschool", year: null },
  { id: "cp",  label: "CP",  sub: "6–7 ans", level: "primary", year: "cp"  },
  { id: "ce1", label: "CE1", sub: "7–8 ans", level: "primary", year: "ce1" },
  { id: "ce2", label: "CE2", sub: "8–9 ans", level: "primary", year: "ce2" },
  { id: "cm1", label: "CM1", sub: "9–10 ans", level: "primary", year: "cm1" },
  { id: "cm2", label: "CM2", sub: "10–11 ans", level: "primary", year: "cm2" },
  { id: "sixieme", label: "6e", sub: "11–12 ans", level: "middle", year: "sixieme" },
  { id: "cinquieme", label: "5e", sub: "12–13 ans", level: "middle", year: "cinquieme" },
  { id: "quatrieme", label: "4e", sub: "13–14 ans", level: "middle", year: "quatrieme" },
  { id: "troisieme", label: "3e", sub: "14–15 ans", level: "middle", year: "troisieme" },
  { id: "seconde", label: "2de", sub: "15–16 ans", level: "high", year: "seconde" },
  { id: "premiere", label: "1re", sub: "16–17 ans", level: "high", year: "premiere" },
  { id: "terminale", label: "Tle", sub: "17–18 ans", level: "high", year: "terminale" },
  { id: "expertes", label: "Exp", sub: "option de Tle", level: "high", year: "expertes" },
  { id: "seconde-pro", label: "2de pro", sub: "voie professionnelle", level: "high", year: "seconde-pro" },
  { id: "premiere-pro", label: "1re pro", sub: "voie professionnelle", level: "high", year: "premiere-pro" },
  { id: "terminale-pro", label: "Tle pro", sub: "voie professionnelle", level: "high", year: "terminale-pro" },
  { id: "l1", label: "L1", sub: "licence de mathématiques", level: "bachelor", year: "l1" },
  { id: "l2", label: "L2", sub: "licence de mathématiques", level: "bachelor", year: "l2" },
  { id: "l3", label: "L3", sub: "licence de mathématiques", level: "bachelor", year: "l3" },
  { id: "m1", label: "M1", sub: "master de mathématiques", level: "master", year: "m1" },
  { id: "m2", label: "M2", sub: "master de mathématiques", level: "master", year: "m2" },
  { id: "doctorat", label: "Le millénaire", sub: "les 7 problèmes du millénaire", level: "phd", year: "doctorat" },
  { id: "recherche", label: "Portes de recherche", sub: "séminaires avancés · vers la thèse", level: "phd", year: "recherche" },
  // La licence est complète — la suite : le master, vers le doctorat.
];
export const YEAR_BY_ID = Object.fromEntries(YEARS.map((y) => [y.id, y]));

export const CYCLES = [
  { id: "cycle1", label: "Cycle 1", sub: "Maternelle — apprentissages premiers", years: ["maternelle"] },
  { id: "cycle2", label: "Cycle 2", sub: "CP · CE1 · CE2 — apprentissages fondamentaux", years: ["cp", "ce1", "ce2"] },
  // Le cycle 3 s'étend lot par lot : cm2 puis sixieme rejoindront years.
  { id: "cycle3", label: "Cycle 3", sub: "CM1 · CM2 · 6e — consolidation", years: ["cm1", "cm2", "sixieme"] },
  // Cycle 4 complet — le lycée (level "high") ouvrira de nouveaux cycles.
  { id: "cycle4", label: "Cycle 4", sub: "5e · 4e · 3e — approfondissements", years: ["cinquieme", "quatrieme", "troisieme"] },
  // Le lycée s’étend lot par lot : premiere et terminale rejoindront years.
  { id: "lycee", label: "Lycée", sub: "2de · 1re · Tle · expertes — vers le supérieur", years: ["seconde", "premiere", "terminale", "expertes"] },
  // La voie professionnelle : un cycle parallèle au lycée général, méthode Singapour.
  { id: "pro", label: "Lycée pro", sub: "2de · 1re · Tle — la voie professionnelle", years: ["seconde-pro", "premiere-pro", "terminale-pro"] },
  // Le supérieur : la licence de mathématiques, programme CPGE condensé + canon universitaire.
  { id: "licence", label: "Licence", sub: "L1 · L2 · L3 — vers le master", years: ["l1", "l2", "l3"] },
  // Le master : M1 cette première étape, M2 et les six portes rejoindront years.
  { id: "master", label: "Master", sub: "M1 · M2 — vers le doctorat", years: ["m1", "m2"] },
  { id: "phd", label: "Doctorat", sub: "le millénaire & les portes de recherche — la frontière", years: ["doctorat", "recherche"] },
];
export const CYCLE_BY_ID = Object.fromEntries(CYCLES.map((c) => [c.id, c]));

// A lesson belongs to a year when the level matches and, if the year is tagged
// (cp/ce1/ce2…), the lesson carries the same tag. Untagged years (maternelle)
// swallow their whole level.
export function lessonMatchesYear(lesson, y) {
  return !!y && lesson.level === y.level && (y.year == null || lesson.year === y.year);
}

export function lessonsOfYear(lessons, yearId) {
  const y = YEAR_BY_ID[yearId];
  return y ? lessons.filter((l) => lessonMatchesYear(l, y)) : [];
}

export function lessonsOfCycle(lessons, cycleId) {
  const c = CYCLE_BY_ID[cycleId];
  if (!c) return [];
  return lessons.filter((l) => c.years.some((yid) => lessonMatchesYear(l, YEAR_BY_ID[yid])));
}

// Group an (already filtered) lesson list by field, in canonical field order.
// Insertion order inside each field is preserved — i.e. the pedagogical order.
export function groupByDomain(lessons) {
  const by = new Map();
  for (const l of lessons) {
    if (!by.has(l.domain)) by.set(l.domain, []);
    by.get(l.domain).push(l);
  }
  return [...by.entries()]
    .sort((a, b) => domainOrder(a[0]) - domainOrder(b[0]))
    .map(([domain, items]) => ({ domain, lessons: items }));
}

// Modules of a year = its lessons grouped by field.
export function modulesOfYear(lessons, yearId) {
  return groupByDomain(lessonsOfYear(lessons, yearId));
}

// Year groups inside a level, for the navigation and the level overview.
// Returns [{ year: yearDef|null, lessons }] in YEARS order; a trailing
// { year: null } group collects the level's lessons outside any declared year.
// A level without declared years yields a single null group → flat display.
export function yearGroupsOfLevel(lessons, levelId) {
  const inLevel = lessons.filter((l) => l.level === levelId);
  const groups = [];
  const seen = new Set();
  for (const y of YEARS) {
    if (y.level !== levelId) continue;
    const ls = inLevel.filter((l) => lessonMatchesYear(l, y));
    if (ls.length) { groups.push({ year: y, lessons: ls }); for (const l of ls) seen.add(l.id); }
  }
  const rest = inLevel.filter((l) => !seen.has(l.id));
  if (rest.length) groups.push({ year: null, lessons: rest });
  return groups;
}

export function inCurriculum(lesson) {
  return YEARS.some((y) => lessonMatchesYear(lesson, y));
}

// Everything not covered by a declared year, grouped by level (skeleton content).
export function leftoverByLevel(lessons) {
  const by = new Map();
  for (const l of lessons) {
    if (inCurriculum(l)) continue;
    if (!by.has(l.level)) by.set(l.level, []);
    by.get(l.level).push(l);
  }
  return [...by.entries()]
    .sort((a, b) => levelOrder(a[0]) - levelOrder(b[0]))
    .map(([level, items]) => ({ level, lessons: items }));
}
