// Field "Probability" — MIDDLE module (4e year): the contrary event and
// two-trial experiments. Official cycle-4 programme: using set vocabulary and
// NOTATIONS to describe a random experiment and define events (complement,
// union, intersection, empty set = impossible event), computing the probability
// of an event AND of its CONTRARY; simple TWO-TRIAL experiments (two coins, a
// coin and a die, two dice); comparing FREQUENCY and PROBABILITY distribution
// graphs from materially repeated or simulated experiments — with d'Alembert's
// celebrated error as the official historical extension.
import { randint, pick } from "../../core/exercises.js";

const deuxEpreuves = {
  id: "probability.middle.deux-epreuves",
  level: "middle", domain: "probability",
  title: "Contraire et deux épreuves",
  tagline: "P(contraire) = 1 − P, et l'arbre des deux épreuves (l'erreur de d'Alembert).",
  prereqs: ["probability.middle.vocabulaire"],
  intuition:
    "Ton vocabulaire de 5e gagne ses **notations** : un événement est un **ensemble d'issues** — son **contraire** $\\bar{A}$ rassemble toutes les autres, et leurs probabilités se complètent : $P(\\bar{A}) = 1 - P(A)$.\n\nPuis le hasard se met à **enchaîner** : lancer **deux** pièces, c'est une expérience à deux épreuves — et l'arbre des possibles en dresse la carte.",
  depths: {
    discovery:
      "**Avec les mains** : deux pièces, l'arbre — la première donne P ou F, et **chaque** branche se dédouble : quatre chemins, **PP, PF, FP, FF**, tous équiprobables ($\\frac{1}{4}$ chacun). « Deux piles » ne vit que sur un chemin : $P = \\frac{1}{4}$ — l'arbre compte ce que l'intuition embrouille.",
    standard:
      "**En image** : les notations au travail — sur un dé, $A = $ « pair » $= \\{2, 4, 6\\}$ et $B = $ « plus grand que 4 » $= \\{5, 6\\}$ : la **réunion** $A \\cup B = \\{2, 4, 5, 6\\}$ (l'un **ou** l'autre), l'**intersection** $A \\cap B = \\{6\\}$ (les deux **à la fois**), et l'ensemble **vide** $\\varnothing$ est l'événement impossible ($P = 0$). Le contraire fait gagner du temps : $P(\\text{au moins un pile}) = 1 - P(\\text{FF}) = 1 - \\frac{1}{4} = \\frac{3}{4}$ — compter le complément plutôt que trois chemins.",
    advanced:
      "**Dans la tête** : l'erreur de **d'Alembert** — l'immense encyclopédiste affirma (1754) que « deux piles » avait une chance sur **trois** : il voyait trois résultats (0, 1 ou 2 piles) et les crut équiprobables. L'arbre le corrige : « 1 pile » couvre **deux** chemins (PF et FP) — les probabilités sont $\\frac{1}{4}, \\frac{2}{4}, \\frac{1}{4}$, pas trois tiers. Comment trancher entre d'Alembert et l'arbre ? **Répéter** : lance mille fois deux pièces (ou simule) — la distribution des fréquences colle à $\\frac{1}{4}, \\frac{1}{2}, \\frac{1}{4}$ et dément le tiers : quand la théorie hésite, l'expérience vote, et les issues équiprobables sont les **chemins**, jamais les résumés.",
  },
  keyIdea: "$P(\\bar{A}) = 1 - P(A)$ — le contraire complète à 1. Deux épreuves : l'**arbre** dédouble chaque branche, les issues équiprobables sont les **chemins** (PP, PF, FP, FF), pas les bilans.",
  why:
    "Pourquoi un arbre pour deux malheureuses pièces ? Parce que l'intuition échoue précisément là : d'Alembert, l'un des plus grands esprits de son siècle, s'y est trompé publiquement — confondre « les résultats qu'on peut décrire » et « les issues équiprobables » est l'erreur fondatrice des probabilités. L'arbre est le garde-fou : il déplie ce que le langage compresse, et la 3e l'étendra aux épreuves dépendantes.",
  examples: [
    { title: "Au moins un pile", steps: [
      { p: "Le contraire de « au moins un pile » est « **aucun** pile » $= $ FF : $P = \\frac{1}{4}$." },
      { p: "$P(\\text{au moins un}) = 1 - \\frac{1}{4} = \\frac{3}{4}$ — un chemin compté au lieu de trois." },
    ] },
    { title: "Réunion et intersection", steps: [
      { p: "Dé : $A = \\{2, 4, 6\\}$, $B = \\{5, 6\\}$ — $A \\cup B = \\{2, 4, 5, 6\\}$, $A \\cap B = \\{6\\}$." },
      { p: "$P(A \\cup B) = \\frac{4}{6} = \\frac{2}{3}$ ; $P(A \\cap B) = \\frac{1}{6}$ — le « ou » réunit, le « et » filtre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dresse l'arbre du lancer de deux pièces : combien de chemins, et que vaut chacun ?", solution: "Quatre chemins équiprobables — **PP, PF, FP, FF** — à $\\frac{1}{4}$ chacun : chaque branche de la première pièce se dédouble à la seconde." },
    { tier: "warmup", prompt: "Sur un dé, $A = $ « obtenir un 6 ». Décris $\\bar{A}$ en ensemble d'issues et calcule $P(\\bar{A})$.", solution: "$\\bar{A} = \\{1, 2, 3, 4, 5\\}$ — tout sauf le 6 : $P(\\bar{A}) = 1 - \\frac{1}{6} = \\frac{5}{6}$ : le contraire complète à 1." },
    { tier: "application", prompt: "Dé : $A = \\{2, 4, 6\\}$ (pair), $B = \\{5, 6\\}$. Donne $A \\cup B$, $A \\cap B$ et leurs probabilités. Que serait $A \\cap \\{1, 3, 5\\}$ ?", solution: "$A \\cup B = \\{2, 4, 5, 6\\}$ : $P = \\frac{4}{6} = \\frac{2}{3}$ ; $A \\cap B = \\{6\\}$ : $P = \\frac{1}{6}$ ; et $A \\cap \\{1, 3, 5\\} = \\varnothing$ — pair **et** impair : l'événement impossible, $P = 0$." },
    { tier: "challenge", prompt: "Deux pièces : calcule $P(\\text{au moins un pile})$ de deux façons — en comptant les chemins, puis par le contraire. Laquelle préfères-tu ?", solution: "Chemins favorables : PP, PF, FP → $\\frac{3}{4}$ ; par le contraire : $1 - P(\\text{FF}) = 1 - \\frac{1}{4} = \\frac{3}{4}$ ✓ — le contraire ne compte qu'**un** chemin : dès que l'événement dit « au moins », son contraire (« aucun ») est le raccourci." },
    { tier: "exam", prompt: "D'Alembert (1754) : « deux pièces donnent 0, 1 ou 2 piles : trois cas, donc P(2 piles) = 1/3. » Réfute-le par l'arbre, donne la vraie distribution, et explique comment 1 000 lancers simulés trancheraient.", solution: "L'arbre déplie **quatre** chemins équiprobables : PP, PF, FP, FF — « 1 pile » en couvre **deux** : la distribution est $\\frac{1}{4}, \\frac{2}{4}, \\frac{1}{4}$, et $P(2\\text{ piles}) = \\frac{1}{4}$, pas $\\frac{1}{3}$. Mille lancers donneraient des fréquences proches de **25 %, 50 %, 25 %** (et non 33-33-33) : la distribution **fréquentielle** épouse la probabiliste de l'arbre — les issues équiprobables sont les chemins, pas les bilans, et l'expérience départage les théories." },
  ],
  practice: [
    { tier: "warmup", label: "Le complément à 1", make: (r) => {
      const d = pick(r, [4, 5, 6, 8, 10]); const f = randint(r, 1, d - 1);
      return { prompt: `$P(A) = \\frac{${f}}{${d}}$ : que vaut $P(\\bar{A})$ ? Réponds par le numérateur (sur ${d}).`, answer: d - f, solution: `$1 - \\frac{${f}}{${d}} = \\frac{${d - f}}{${d}}$ — numérateur **${d - f}** : le contraire complète à 1.` };
    } },
    { tier: "application", label: "Compter les chemins", make: (r) => {
      const m = pick(r, [2, 2, 6]); const n = pick(r, [2, 6]);
      const noms = { 2: "une pièce", 6: "un dé" };
      return { prompt: `On lance ${noms[m]} puis ${noms[n]} : combien d'issues (de chemins) en tout ?`, answer: m * n, solution: `Chaque branche se dédouble : $${m} \\times ${n} = $ **${m * n}** chemins équiprobables.` };
    } },
    { tier: "challenge", label: "Le raccourci du contraire", make: (r) => {
      const lancers = pick(r, [2, 3]);
      const tot = 2 ** lancers;
      return { prompt: `On lance ${lancers} pièces. $P(\\text{au moins un pile})$ : réponds par le numérateur (sur ${tot}).`, answer: tot - 1, solution: `Contraire $=$ « que des faces » : un seul chemin sur ${tot} → $1 - \\frac{1}{${tot}} = \\frac{${tot - 1}}{${tot}}$ : **${tot - 1}**.` };
    } },
  ],
};

export default [deuxEpreuves];
