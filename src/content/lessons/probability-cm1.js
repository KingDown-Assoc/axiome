// Field "Probability" — PRIMARY module (CM1 year): first encounter with randomness.
// Official cycle-3 programme (2025): identifying random experiments, listing all
// possible outcomes, the vocabulary scale (impossible → certain, une chance sur
// deux), comparing events by likelihood, equiprobability — and the central trap:
// two outcomes does NOT mean one chance in two.
import { randint, pick } from "../../core/exercises.js";

// — Taming chance (programme: expériences aléatoires, issues, équiprobabilité) —
const chance = {
  id: "probability.primary.chance",
  level: "primary", domain: "probability",
  title: "Le hasard apprivoisé",
  tagline: "On ne peut pas prédire l'issue — mais on peut compter les possibles.",
  prereqs: ["numbers.primary.fractions"],
  intuition:
    "Lance un dé : impossible de prédire la face. C'est une **expérience aléatoire** — et pourtant, le hasard se laisse étudier ! Première arme : **recenser les issues**, toutes les fins possibles. Le dé en a 6, la pièce 2, le jeu de cartes 52.\n\nDeuxième arme : une **échelle de mots** — impossible, peu probable, une chance sur deux, probable, certain. « Obtenir 7 » avec un dé : impossible. « Obtenir entre 1 et 6 » : certain.",
  depths: {
    discovery:
      "**Avec les mains** : lance vingt fois une pièce et note — pile et face alternent sans ordre, mais s'équilibrent à peu près : chacune a **une chance sur deux**. Le dé pareil : aucune face n'est privilégiée — le dé est **équilibré**, ses issues sont **équiprobables**.",
    standard:
      "**En image** : « une chance sur deux » se reconnaît quand l'événement réussit dans **la moitié** des issues — « pile » (1 sur 2), « nombre pair au dé » (3 sur 6 : les faces 2, 4, 6), « carte rouge » (26 sur 52). Moins de la moitié : **peu probable** (« obtenir un 2 » : 1 sur 6). Plus de la moitié : **probable** (« au moins 2 » : 5 sur 6). Compter les issues favorables, comparer à la moitié.",
    advanced:
      "**Dans la tête** : LE piège du chapitre — **deux issues ne font pas une chance sur deux !** Lance une punaise : elle tombe « pointe en l'air » ou « sur le côté » — deux issues, mais pas équiprobables (essaie : le côté gagne largement). « Demain il pleut ou il ne pleut pas » : deux issues, pas 50-50 pour autant. L'équiprobabilité est une **propriété à vérifier** (le dé équilibré, la pièce honnête), jamais une évidence offerte par le comptage.",
  },
  keyIdea: "Recenser **toutes** les issues, compter les **favorables**, comparer à la moitié — et se méfier : deux issues ≠ une chance sur deux.",
  why:
    "Pourquoi étudier ce qu'on ne peut pas prédire ? Parce que le hasard a des **lois de groupe** : une face de dé est imprévisible, mais sur mille lancers, chaque face sortira environ une fois sur six. Les assurances, la météo, les jeux — tout un pan du monde fonctionne sur cette prévisibilité de l'imprévisible. Le CM1 en pose la première pierre : compter les possibles.",
  examples: [
    { title: "Recenser, puis situer", steps: [
      { p: "Un dé : issues possibles = {1, 2, 3, 4, 5, 6} — six issues." },
      { p: "« Obtenir un nombre pair » : 3 issues favorables (2, 4, 6) sur 6 — **une chance sur deux**." },
    ] },
    { title: "Le piège de la punaise", steps: [
      { p: "Une punaise lancée : « pointe en l'air » ou « sur le côté » — deux issues seulement." },
      { p: "Mais la punaise est déséquilibrée : le côté sort bien plus souvent. **Deux issues, pas 50-50.**" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qu'une expérience aléatoire ? Donne deux exemples.", solution: "Une expérience dont on **ne peut pas prédire l'issue** avant de la faire — lancer un dé, tirer une carte au hasard. (Faire bouillir de l'eau n'en est pas une : l'issue est certaine.)" },
    { tier: "warmup", prompt: "Recense toutes les issues : lancer une pièce ; lancer un dé ; tirer une carte d'un jeu de 52.", solution: "Pièce : **2** issues (pile, face). Dé : **6** issues (1 à 6). Jeu : **52** issues — recenser, c'est l'arme numéro un." },
    { tier: "application", prompt: "Place sur l'échelle (impossible / peu probable / une chance sur deux / probable / certain) : « obtenir 7 au dé », « obtenir un nombre pair », « obtenir entre 1 et 6 ».", solution: "« 7 » : **impossible** (aucune issue). « Pair » : **une chance sur deux** (3 sur 6). « Entre 1 et 6 » : **certain** (toutes les issues)." },
    { tier: "challenge", prompt: "« Obtenir un 2 » et « obtenir au moins 2 » au dé : compare leurs chances.", solution: "« Un 2 » : 1 issue sur 6 — **peu probable**. « Au moins 2 » : 5 issues sur 6 — **probable**. Compter les favorables départage tout." },
    { tier: "exam", prompt: "Tom affirme : « La punaise tombe pointe en l'air ou sur le côté : deux issues, donc une chance sur deux chacune. » Réfute.", solution: "Deux issues n'impliquent **pas** l'équiprobabilité : la punaise est déséquilibrée, le côté sort bien plus souvent. « Une chance sur deux » exige des issues **également probables** — comme la pièce honnête, pas comme la punaise. C'est LE piège du chapitre." },
  ],
  practice: [
    { tier: "warmup", label: "Recenser les issues", make: (r) => {
      const q = pick(r, [["un dé à six faces", 6], ["une pièce de monnaie", 2], ["un jeu de 52 cartes", 52], ["un dé à dix faces (de 1 à 10)", 10]]);
      return { prompt: `Combien d'issues possibles en lançant ou tirant dans ${q[0]} ?`, answer: q[1], solution: `**${q[1]} issues** — toutes recensées avant de parler de chances.` };
    } },
    { tier: "application", label: "Compter les favorables", make: (r) => {
      const q = pick(r, [
        ["obtenir un nombre pair avec un dé", 3, "les faces 2, 4 et 6"],
        ["obtenir un nombre plus grand que 4 avec un dé", 2, "les faces 5 et 6"],
        ["tirer une carte rouge dans un jeu de 52 cartes", 26, "la moitié du jeu : cœurs et carreaux"],
        ["obtenir un 6 avec un dé", 1, "la seule face 6"],
      ]);
      return { prompt: `Combien d'issues favorables pour « ${q[0]} » ?`, answer: q[1], solution: `**${q[1]}** — ${q[2]}.` };
    } },
  ],
};

export default [chance];
