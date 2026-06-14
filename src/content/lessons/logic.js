// Field "Logic & foundations" — starts in PRESCHOOL with same/different (the first yes/no reasoning).
import { pick, randint } from "../../core/exercises.js";

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

const trueFalse = {
  id: "logic.preschool.true-false",
  level: "preschool", domain: "logic",
  title: "Vrai ou faux : tous, quelques, aucun",
  tagline: "Décider si une phrase sur un groupe est vraie, avec les mots tous, quelques, aucun.",
  prereqs: ["logic.preschool.same-different"],
  intuition:
    "Une phrase peut être **vraie** ou **fausse**. « Le ciel est bleu » : vrai. « Les poissons volent » : faux.\n\nQuand la phrase parle d'un **groupe**, trois petits mots changent tout : **tous** (tout le monde, sans exception), **quelques** (au moins un, mais pas tous), **aucun** (pas un seul).",
  depths: {
    discovery:
      "Pour parler d'un groupe, on a trois mots :\n\n- **tous** → tout le monde, chaque objet ;\n- **quelques** → au moins un, mais pas forcément tous ;\n- **aucun** → personne, pas un seul.\n\nEt une phrase est toujours soit **vraie**, soit **fausse**.",
    standard:
      "Pour vérifier « **tous** les ronds sont rouges », il suffit de trouver **un seul** rond d'une autre couleur pour que ce soit **faux** : c'est un **contre-exemple**.\n\n« **Aucun** rond n'est rouge » est vrai seulement si on n'en trouve **pas un seul** de rouge. « **Quelques** ronds sont rouges » est vrai dès qu'on en trouve **au moins un**.",
    advanced:
      "Ces mots sont les **quantificateurs** : « tous » (pour chaque), « quelques » (il en existe au moins un), « aucun » (il n'en existe pas). « Tous » et « aucun » sont **fragiles** : un seul cas suffit à les mettre en défaut. C'est exactement la **preuve par contre-exemple**, un outil qu'on utilise dans toutes les mathématiques.",
  },
  keyIdea: "« Tous » et « aucun » tombent dès **un seul** contre-exemple ; « quelques » tient dès **un seul** exemple.",
  why:
    "Pourquoi une seule bille bleue rend-elle « toutes les billes sont rouges » fausse ? Parce que « tous » ne tolère **aucune** exception : une seule suffit à casser la phrase. C'est pour ça qu'on dit qu'« un contre-exemple suffit » — une idée minuscule mais redoutablement puissante.",
  examples: [
    { title: "Tous ?", steps: [
      { p: "Trois ronds, tous rouges → « tous les ronds sont rouges » est **vrai**." },
      { p: "Si un seul devient bleu → la phrase devient **fausse** (un contre-exemple suffit)." },
    ] },
    { title: "Quelques / aucun", steps: [
      { p: "Deux ronds rouges et un rond bleu." },
      { p: "« Quelques ronds sont bleus » → **vrai** (il y en a un)." },
      { p: "« Aucun rond n'est bleu » → **faux**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le mot « aucun » veut dire combien ?", solution: "**Pas un seul** (zéro)." },
    { tier: "warmup", prompt: "5 billes, toutes rouges. « Toutes les billes sont rouges » : vrai ou faux ?", solution: "**Vrai**." },
    { tier: "application", prompt: "4 billes : 3 rouges et 1 bleue. « Toutes les billes sont rouges » : vrai ou faux ?", solution: "**Faux** : la bille bleue est un contre-exemple." },
    { tier: "challenge", prompt: "Combien de contre-exemples suffisent pour rendre une phrase en « tous… » fausse ?", solution: "**Un seul** suffit." },
    { tier: "exam", prompt: "3 billes, toutes rouges. Des deux phrases « quelques billes sont bleues » et « aucune bille n'est bleue », laquelle est vraie ?", solution: "« **Aucune** bille n'est bleue » est vraie ; « quelques » est fausse (il n'y en a pas une seule)." },
  ],
  practice: [
    { tier: "application", label: "Vrai ou faux ?", make: (r) => {
      const red = randint(r, 2, 4), blue = randint(r, 0, 2);
      const ans = blue === 0 ? "vrai" : "faux";
      return {
        prompt: `${red + blue} billes : ${red} rouge(s) et ${blue} bleue(s). « Toutes les billes sont rouges » : vrai ou faux ?`,
        answer: ans,
        check: { type: "exact" },
        solution: blue === 0 ? "Aucune autre couleur → **vrai**." : `Il y a ${blue} bille(s) bleue(s) (un contre-exemple) → **faux**.`,
      };
    } },
  ],
};

export default [sameDifferent, trueFalse];
