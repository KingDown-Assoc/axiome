// Field "Combinatorics & discrete maths" — starts in PRESCHOOL with patterns (organized sequences).
import { randint, pick } from "../../core/exercises.js";

const patterns = {
  id: "discrete.preschool.patterns",
  level: "preschool", domain: "discrete",
  title: "Continuer un motif",
  tagline: "Rouge, bleu, rouge, bleu… et après ? Repérer la règle qui se répète.",
  prereqs: [],
  intuition:
    "Un motif, c'est quelque chose qui **se répète** : rouge, bleu, rouge, bleu… Pour deviner la suite, on cherche le petit bout qui revient (ici « rouge-bleu »).\n\nDès qu'on a trouvé le morceau qui se répète, on peut continuer aussi loin qu'on veut — et même dire ce qu'il y aura beaucoup plus loin.",
  depths: {
    discovery: "On repère le morceau qui se répète, puis on le continue.",
    standard: "Un **motif** (ou algorithme) est une suite qui répète un même bloc, appelé **période**. Trouver la période, c'est trouver la règle : elle permet de prédire n'importe quel terme suivant.",
    advanced: "C'est la première rencontre avec les **suites périodiques** : si la période a longueur $p$, le terme de rang $n$ ne dépend que de $n$ modulo $p$ (l'arithmétique des restes !). Cette idée irrigue la combinatoire, les congruences et bien plus.",
  },
  keyIdea: "Trouver le bloc qui se répète (la **période**), puis le prolonger.",
  why:
    "Pourquoi chercher « ce qui se répète » plutôt que deviner au hasard ? Parce qu'une fois la période trouvée, on a une **règle sûre** : on peut continuer sans se tromper, même très loin. Comprendre la règle vaut mieux que mémoriser les premiers termes.",
  widgets: [
    { kind: "pattern", params: { sequence: ["rouge", "bleu", "rouge", "bleu"], next: "rouge" }, caption: "Trouve le bloc qui se répète, puis dévoile la suite pour vérifier." },
  ],
  examples: [
    { title: "Continuer 🔺⚫🔺⚫", steps: [
      { p: "Le bloc qui se répète est « triangle, rond »." },
      { p: "Après ⚫ vient donc un **triangle** 🔺." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le motif est : rond, rond, carré, rond, rond, carré… Quelle est la forme qui se répète ?", solution: "Le bloc **« rond, rond, carré »**." },
    { tier: "warmup", prompt: "Rouge, bleu, rouge, bleu… Quelle couleur vient après le dernier bleu ?", solution: "**rouge**." },
    { tier: "challenge", prompt: "A, B, B, A, B, B, A, B, B… quelle lettre vient ensuite ?", solution: "La période est « A, B, B », qui vient de se finir → **A**." },
    { tier: "exam", prompt: "Motif rouge-bleu-vert qui se répète. De quelle couleur sera le 7e jeton ?", solution: "Période de longueur 3 : les rangs 1, 4, **7** sont rouges → **rouge**." },
  ],
  practice: [
    { tier: "application", label: "Quelle couleur ensuite ?", make: (r) => { const base = pick(r, [["rouge", "bleu"], ["rouge", "vert"], ["bleu", "jaune"], ["rouge", "bleu", "vert"]]); const reps = base.length === 2 ? 2 : 1; const seq = []; for (let k = 0; k < reps; k++) seq.push(...base); const next = base[seq.length % base.length]; return { prompt: `Le motif « ${base.join(", ")} » se répète : ${seq.join(", ")}, … Quelle couleur vient ensuite ?`, answer: next, check: { type: "exact" }, solution: `Le bloc « ${base.join(", ")} » recommence → **${next}**.` }; } },
  ],
};

// — Sorting & classifying (preschool) —
const sorting = {
  id: "discrete.preschool.sorting",
  level: "preschool", domain: "discrete",
  title: "Trier et classer",
  tagline: "Regrouper ce qui se ressemble selon une règle.",
  intuition:
    "Trier, c'est faire des **paquets** en suivant une règle : tous les objets rouges ensemble, tous les bleus ensemble. On peut classer selon la **couleur**, la **forme**, la **taille**…\n\nLa même collection peut se trier de plusieurs façons : tout dépend de la règle choisie.",
  depths: {
    discovery:
      "Pour trier, on choisit un **critère** (une règle) : par exemple la couleur. Puis on met ensemble tout ce qui a la même couleur.\n\nUne chaussette rouge va avec les rouges, une bleue avec les bleues.",
    standard:
      "On peut trier la **même** collection de plusieurs manières : par couleur, par forme, ou par taille — le résultat change selon le critère.\n\nUn objet va dans un paquet **seulement si** il respecte la règle.",
    advanced:
      "Trier selon une règle, c'est répartir une collection en **catégories** qui ne se mélangent pas : l'idée des *ensembles*, où chaque élément est dedans ou dehors selon une propriété.",
  },
  keyIdea: "Trier = faire des paquets selon une **règle** (couleur, forme, taille…).",
  why:
    "Pourquoi trier ? Parce que ça aide à **compter** et à **comparer** : une fois les jetons rangés par couleur, on voit tout de suite s'il y a plus de rouges ou de bleus. Ranger, c'est déjà raisonner.",
  examples: [
    { title: "Trier par couleur", steps: [
      { p: "On a des billes rouges et bleues mélangées." },
      { p: "Règle choisie : la couleur." },
      { p: "On fait deux paquets : les rouges, les bleues." },
    ] },
    { title: "Changer de règle", steps: [
      { p: "Mêmes billes, nouvelle règle : la taille." },
      { p: "On fait deux paquets : les grosses, les petites." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour trier des objets, que choisit-on d'abord ?", solution: "Une **règle** (un critère) : couleur, forme, taille…" },
    { tier: "warmup", prompt: "On trie par couleur. Où va un carré rouge : avec les rouges, ou avec les ronds ?", solution: "Avec les **rouges** — la règle, c'est la couleur." },
    { tier: "application", prompt: "Tu as 3 jetons rouges et 2 bleus. En triant par couleur, combien de paquets ?", solution: "**2** paquets : un de rouges, un de bleus." },
    { tier: "challenge", prompt: "Peut-on trier les mêmes objets de deux façons différentes ?", solution: "**Oui** : par couleur, par forme, par taille… le critère change le tri." },
    { tier: "exam", prompt: "Dans un paquet « formes rondes », un triangle a-t-il sa place ?", solution: "**Non** : un triangle n'est pas rond, il ne respecte pas la règle." },
  ],
  practice: [
    { tier: "warmup", label: "Compter dans un paquet", make: (r) => { const red = randint(r, 2, 5); const blue = randint(r, 1, 4); return { prompt: `Tu as ${red} jetons rouges et ${blue} bleus. En triant par couleur, combien de jetons dans le paquet rouge ?`, answer: red, solution: `Le paquet rouge contient les ${red} jetons rouges.` }; } },
  ],
};

export default [patterns, sorting];
