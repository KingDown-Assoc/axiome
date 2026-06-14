// Field "Algebra" — MIDDLE module (6e year): pre-algebraic thinking. Official
// cycle-3 programme (2025): reasoning on RELATIONS between quantities rather than
// values, bar models with unknowns, multiplicative fill-in equalities (bridging
// to the fraction-as-quotient and prefiguring a × x = b), and motif structures
// identified by their rank rule. Formal letters are deferred to cycle 4.
import { randint, pick } from "../../core/exercises.js";

// — Pre-algebraic models (programme: modèles pré-algébriques, structures de motifs) —
const preAlgebra = {
  id: "algebra.middle.pre-algebra",
  level: "middle", domain: "algebra",
  title: "Raisonner sur l'inconnu",
  tagline: "Pas besoin de connaître un nombre pour calculer avec lui.",
  prereqs: ["algebra.primary.rules", "numbers.middle.fraction-quotient"],
  intuition:
    "La pensée algébrique raisonne sur les **relations**, pas sur les valeurs. « Léa a le double de Tom ; ensemble ils ont 36 images » — sans connaître aucun des deux nombres, le **schéma en barres** voit tout : une barre pour Tom, deux pour Léa, trois barres égales valent 36 — une barre vaut 12.\n\nLes lettres officielles attendront le cycle 4 : ici, des mots, des dessins, des barres — et déjà tout le raisonnement.",
  depths: {
    discovery:
      "**Avec les mains** : trois bandes de papier identiques bout à bout = 36 cm — plie, mesure, découvre : chaque bande fait 12 cm. La barre est l'inconnue qu'on manipule sans la nommer.",
    standard:
      "**En image** : les égalités à trous **multiplicatives** rejoignent tes fractions — $? \\times 4 = 3$ : le nombre cherché est, par définition, $\\frac{3}{4}$ ! L'égalité à trous d'aujourd'hui est l'équation $a \\times x = b$ de demain, et la fraction-quotient en est déjà la solution. Les ponts se construisent avant les noms.",
    advanced:
      "**Dans la tête** : les **motifs** livrent leur structure — une frise d'étape en étape : 5, 8, 11, 14 carreaux… Régularité : $+3$. Structure : « 2 carreaux fixes, plus 3 par étape » — d'où l'étape 20 : $2 + 3 \\times 20 = 62$, sans dessiner. Repérer la régularité dit *comment ça avance* ; identifier la structure dit *pourquoi* — et seul le pourquoi atteint les étapes lointaines.",
  },
  keyIdea: "La **barre** porte l'inconnue ; la **structure** d'un motif (sa loi de fabrication) vaut mieux que sa régularité (son pas) — elle répond à toutes les étapes.",
  why:
    "Pourquoi retarder les lettres si on sait déjà raisonner ? Parce qu'un symbole vide de sens est un piège : écrire $x$ sans avoir longuement manipulé des barres produit des élèves qui « font passer de l'autre côté » sans comprendre. La barre se voit, se plie, se partage — quand $x$ arrivera au cycle 4, il héritera de toute cette chair.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", whole: 36, parts: [12, 12, 12], unknown: "part" }, caption: "Tom : une part ; Léa : deux parts identiques — trois parts égales font 36 : la part vaut 36 ÷ 3." },
  ],
  examples: [
    { title: "Léa et Tom en barres", steps: [
      { p: "Tom : une barre. Léa : deux barres identiques. Ensemble : trois barres = 36." },
      { p: "Une barre $= 36 \\div 3 = 12$ : Tom a **12** images, Léa **24** — sans algèbre formelle." },
    ] },
    { title: "Le trou multiplicatif", steps: [
      { p: "$? \\times 4 = 3$ — quel nombre, multiplié par 4, donne 3 ?" },
      { p: "Par définition : $\\frac{3}{4}$ — la fraction-quotient est la première solution d'équation." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Léa a le double de Tom ; ensemble, 36 images. Dessine les barres et conclus.", solution: "Tom : 1 barre ; Léa : 2 barres ; total 3 barres $= 36$ → une barre $= 12$ : **Tom 12, Léa 24** — le dessin a fait l'algèbre." },
    { tier: "warmup", prompt: "Complète : $? \\times 4 = 3$, puis $? \\times 5 = 2$.", solution: "$\\frac{3}{4}$ et $\\frac{2}{5}$ — la fraction-quotient répond exactement aux trous multiplicatifs." },
    { tier: "application", prompt: "Une frise compte 5, 8, 11, 14 carreaux aux étapes 1, 2, 3, 4. Donne la régularité, puis la structure.", solution: "Régularité : **+3** par étape. Structure : **2 carreaux fixes + 3 par étape** — vérification : étape 1 : $2 + 3 = 5$ ✓." },
    { tier: "challenge", prompt: "Avec la structure précédente, combien de carreaux à l'étape 20 ?", solution: "$2 + 3 \\times 20 = $ **62 carreaux** — la structure répond aux étapes lointaines, la régularité seule aurait exigé 19 additions." },
    { tier: "exam", prompt: "Un panier (pommes + cagette) pèse 5,2 kg ; la cagette seule pèse 0,4 kg ; les pommes sont en 4 sachets égaux. Schématise en barres et trouve la masse d'un sachet.", solution: "Barre totale 5,2 ; ôter la cagette : $5{,}2 - 0{,}4 = 4{,}8$ kg de pommes ; quatre barres égales : $4{,}8 \\div 4 = $ **1,2 kg** par sachet — relations d'abord, valeurs ensuite." },
  ],
  practice: [
    { tier: "application", label: "Barres en parts égales", make: (r) => {
      const k = pick(r, [2, 3, 4]); const part = randint(r, 6, 25); const total = (k + 1) * part;
      return { prompt: `Aya a ${k} fois plus de billes que Sam ; ensemble : ${total}. Combien Sam en a-t-il ? (pense en barres)`, answer: part, solution: `Sam : 1 barre ; Aya : ${k} barres ; ${k + 1} barres $= ${total}$ → une barre $= ${total} \\div ${k + 1} = $ **${part}**.` };
    } },
    { tier: "challenge", label: "La structure à l'étape n", make: (r) => {
      const fixe = randint(r, 1, 5), pas = randint(r, 2, 6); const n = randint(r, 10, 30);
      return { prompt: `Un motif : ${fixe + pas} éléments à l'étape 1, puis ${pas} de plus à chaque étape (structure : ${fixe} fixes + ${pas} par étape). Combien à l'étape ${n} ?`, answer: fixe + pas * n, solution: `$${fixe} + ${pas} \\times ${n} = $ **${fixe + pas * n}** — la structure saute directement à l'étape ${n}.` };
    } },
  ],
};

export default [preAlgebra];
