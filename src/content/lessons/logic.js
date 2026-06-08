// Field "Logic & foundations" — starts in PRESCHOOL with same/different (the first yes/no reasoning).
import { pick } from "../../core/exercises.js";

const sameDifferent = {
  id: "logic.preschool.same-different",
  level: "preschool", domain: "logic",
  title: "Pareil ou différent",
  tagline: "Décider si deux choses sont identiques, ou non.",
  intuition:
    "Comparer deux choses, c'est se demander : sont-elles **pareilles** ou **différentes** ? Deux ronds rouges de même taille sont pareils. Un rond et un carré sont différents.\n\nPour répondre, on regarde une **propriété** : la forme, la couleur, la taille…",
  depths: {
    discovery:
      "Deux objets sont **pareils** s'ils ont la même propriété qu'on observe : même forme, ou même couleur.\n\nIls sont **différents** dès qu'une propriété change : un rond rouge et un rond bleu diffèrent par la couleur.",
    standard:
      "Tout dépend de **ce qu'on regarde**. Un grand rond et un petit rond sont *pareils* par la forme, mais *différents* par la taille.\n\nQuand on dit « pareils », il faut préciser : pareils **selon quoi** ?",
    advanced:
      "Répondre « pareil / différent », c'est répondre par **oui ou non** — le tout début de la **logique** : une affirmation est vraie ou fausse, sans entre-deux.",
  },
  keyIdea: "Pareil ou différent ? Tout dépend de la **propriété** qu'on observe.",
  why:
    "Pourquoi est-ce de la logique ? Parce qu'on tranche par **oui ou non** : ou bien c'est pareil, ou bien c'est différent. Apprendre à décider clairement, c'est apprendre à raisonner juste.",
  examples: [
    { title: "Pareils ?", steps: [
      { p: "On compare deux ronds rouges de même taille." },
      { p: "Même forme, même couleur, même taille → **pareils**." },
    ] },
    { title: "Différents ?", steps: [
      { p: "On compare un rond et un carré." },
      { p: "La forme change → **différents**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un rond rouge et un rond rouge identiques : pareils ou différents ?", solution: "**Pareils**." },
    { tier: "warmup", prompt: "Un rond rouge et un rond bleu : pareils ou différents ?", solution: "**Différents** — la couleur change." },
    { tier: "application", prompt: "Un grand rond et un petit rond : sont-ils pareils par la forme ?", solution: "**Oui**, même forme (rond) — mais différents par la taille." },
    { tier: "challenge", prompt: "« Ces deux objets sont pareils. » La phrase est-elle complète ?", solution: "Pas tout à fait : il faut dire **pareils selon quoi** (forme ? couleur ? taille ?)." },
    { tier: "exam", prompt: "Deux carrés bleus, mais l'un grand et l'autre petit : pareils ou différents ?", solution: "**Différents** par la taille (même forme et même couleur pourtant)." },
  ],
  practice: [
    { tier: "warmup", label: "Pareil ou différent ?", make: (r) => {
      const colors = ["rouge", "bleu", "vert"];
      const shapes = ["rond", "carré"];
      const c1 = pick(r, colors), s1 = pick(r, shapes);
      let c2 = c1, s2 = s1;
      if (r() < 0.5) {
        if (r() < 0.5) c2 = pick(r, colors.filter((c) => c !== c1));
        else s2 = shapes.find((s) => s !== s1);
      }
      const ans = c1 === c2 && s1 === s2 ? "pareil" : "différent";
      return {
        prompt: `Un ${s1} ${c1} et un ${s2} ${c2} : pareil ou différent ?`,
        answer: ans,
        check: { type: "exact" },
        solution: ans === "pareil" ? "Même forme et même couleur → **pareil**." : "Une propriété change → **différent**.",
      };
    } },
  ],
};

export default [sameDifferent];
