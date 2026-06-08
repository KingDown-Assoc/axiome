// Field "Combinatorics & discrete maths" — starts in PRESCHOOL with patterns (organized sequences).
import { pick } from "../../core/exercises.js";

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

export default [patterns];
