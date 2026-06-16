// Field "Probability" — PRIMARY module (CM2 year): quantifying chance. Official
// cycle-3 programme (2025): expressing probabilities as "a chances sur b" under
// equiprobability, comparing quantified probabilities, the notion of INDEPENDENCE
// (the die does not remember — the gambler's fallacy), and two-stage experiments
// whose outcomes are enumerated in a tree or a double-entry table.
import { randint, pick } from "../../core/exercises.js";

// — Counting chances (programme: « a chances sur b », indépendance, deux étapes) —
const countChances = {
  id: "probability.primary.count-chances",
  level: "primary", domain: "probability",
  title: "a chances sur b",
  tagline: "Compter les issues pour mesurer le hasard — et le dé n'a pas de mémoire.",
  prereqs: ["probability.primary.chance"],
  intuition:
    "Au CM1, des mots (probable, peu probable). Au CM2, des **nombres** : quand les issues sont équiprobables, la probabilité d'un événement se dit « **a chances sur b** » — a issues favorables, b issues en tout.\n\n« Obtenir un nombre pair » au dé : 3 issues favorables (2, 4, 6) sur 6 → **3 chances sur 6**. « Tirer un as » dans 52 cartes : **4 chances sur 52**. Compter, c'est quantifier.",
  depths: {
    discovery:
      "**Avec les mains** : une urne, 2 boules rouges et 4 bleues — tirer une rouge : **2 chances sur 6**. Tirer une bleue : 4 sur 6 — plus probable, et les nombres le disent mieux que les mots : la comparaison devient un calcul.",
    standard:
      "**En image** : pour les expériences en **deux étapes**, recenser exige de l'ordre — deux lancers de pièce : l'**arbre** déploie P/F puis P/F encore → quatre chemins : PP, PF, FP, FF. « Deux piles » : **1 chance sur 4**. « Une pile et une face » : 2 chemins (PF et FP !) → **2 chances sur 4** — l'arbre voit les chemins que l'intuition fusionne.",
    advanced:
      "**Dans la tête** : le concept roi — l'**indépendance**. Le dé vient de sortir trois 6 d'affilée : quelle chance au prochain lancer ? **1 sur 6, comme toujours** — le dé « ne se souvient pas », chaque lancer repart de zéro. Le sentiment que face « est dû » après trois piles est une illusion célèbre (elle ruine les joueurs depuis des siècles). Les objets du hasard n'ont ni mémoire ni dette.",
  },
  keyIdea: "Équiprobabilité → probabilité = « **a chances sur b** » (favorables sur total). Deux étapes : l'**arbre** recense tout. Et le dé **ne se souvient pas**.",
  why:
    "Pourquoi « 3 chances sur 6 » plutôt que « une chance sur deux », son égale ? Les deux sont vraies — mais « 3 sur 6 » garde la **trace du comptage** : on voit les trois faces paires sur les six. Simplifier viendra (c'est ta leçon des fractions égales !) ; compter d'abord, c'est comprendre d'où vient le nombre.",
  examples: [
    { title: "Quantifier au dé", steps: [
      { p: "« Obtenir un nombre pair » : issues favorables 2, 4, 6 — trois sur six." },
      { p: "Probabilité : **3 chances sur 6** (autant que l'impair : le dé est équitable)." },
    ] },
    { title: "L'arbre des deux pièces", steps: [
      { p: "Premier lancer : P ou F ; second : P ou F — l'arbre donne **PP, PF, FP, FF**." },
      { p: "« Deux piles » : 1 chemin sur 4 → **1 chance sur 4**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie « 3 chances sur 6 » pour l'événement « obtenir un nombre pair » au dé ?", solution: "**3 issues favorables** (les faces 2, 4 et 6) sur **6 issues en tout**, toutes équiprobables — le comptage devient la probabilité." },
    { tier: "warmup", prompt: "Une urne contient 2 boules rouges et 4 bleues. Quelle est la probabilité de tirer une rouge ? Une bleue ? Compare.", solution: "Rouge : **2 chances sur 6** ; bleue : **4 chances sur 6** — la bleue est deux fois plus probable : les nombres tranchent." },
    { tier: "application", prompt: "On lance deux pièces. Recense les issues avec un arbre, puis donne la probabilité d'obtenir deux piles.", solution: "PP, PF, FP, FF — quatre chemins équiprobables. Deux piles : **1 chance sur 4**." },
    { tier: "challenge", prompt: "Avec les deux pièces : quelle est la probabilité d'obtenir une pile ET une face ?", solution: "**2 chances sur 4** — deux chemins (PF **et** FP) : l'arbre distingue ce que l'œil confond, et c'est plus probable que deux piles !" },
    { tier: "exam", prompt: "Un dé a sorti trois 6 d'affilée. Tom dit : « le 6 est usé, il a moins de chances maintenant ». Lina dit : « un 6 est dû, il a plus de chances ». Qui a raison ?", solution: "**Ni l'un ni l'autre** : la probabilité reste **1 chance sur 6** — le dé n'a ni mémoire ni dette, chaque lancer est **indépendant** des précédents. Cette double illusion (l'usure et le dû) trompe les joueurs depuis toujours." },
  ],
  practice: [
    { tier: "application", label: "Compter a sur b", make: (r) => {
      const q = pick(r, [
        ["obtenir un nombre pair avec un dé", 3, 6, "les faces 2, 4 et 6"],
        ["obtenir plus que 4 avec un dé", 2, 6, "les faces 5 et 6"],
        ["tirer un as dans un jeu de 52 cartes", 4, 52, "quatre as dans le jeu"],
        ["tirer une carte rouge dans un jeu de 52 cartes", 26, 52, "cœurs et carreaux"],
        ["tirer une rouge dans une urne de 2 rouges et 4 bleues", 2, 6, "deux boules sur six"],
      ]);
      return { prompt: `« ${q[0]} » : combien de chances sur ${q[2]} ? (réponds par le nombre de chances)`, answer: q[1], solution: `**${q[1]} chances sur ${q[2]}** — ${q[3]}.` };
    } },
    { tier: "challenge", label: "Les issues en deux étapes", make: (r) => {
      const q = pick(r, [
        ["on lance deux pièces", 4, "PP, PF, FP, FF"],
        ["on lance une pièce puis un dé", 12, "2 branches × 6 branches"],
        ["on lance deux dés", 36, "6 × 6 chemins dans l'arbre"],
        ["on lance une pièce puis on tire une boule parmi 3", 6, "2 × 3 chemins"],
      ]);
      return { prompt: `Combien d'issues possibles quand ${q[0]} ? (recense avec un arbre ou un tableau)`, answer: q[1], solution: `**${q[1]} issues** — ${q[2]} : l'arbre multiplie les branches.` };
    } },
  ],
};

export default [countChances];
