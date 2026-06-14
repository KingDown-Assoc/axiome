// Field "Discrete mathematics" — MIDDLE module (3e year): quartiles and box
// plots. Official cycle-4 programme: computing INCREASING CUMULATIVE
// FREQUENCIES, giving the QUARTILES and the median of a series presented as a
// frequency table or bar chart, building and using BOX-AND-WHISKER plots to
// represent the position values of a statistical series, understanding and
// interpreting statistical data, and using a spreadsheet to compute mean,
// median and range.
import { randint, pick } from "../../core/exercises.js";

const quartiles = {
  id: "discrete.middle.quartiles",
  level: "middle", domain: "discrete",
  title: "Quartiles et boîtes à moustaches",
  tagline: "Couper la série en quatre — et cinq nombres résument tout.",
  prereqs: ["discrete.middle.mediane"],
  intuition:
    "Ta médiane coupait la série en **deux** moitiés ; les **quartiles** la coupent en **quatre** quarts : le premier quartile $Q_1$ laisse au moins **25 %** des valeurs en dessous (ou égales), le troisième $Q_3$ en laisse au moins **75 %**.\n\nAvec le minimum et le maximum, cela fait **cinq nombres** — et un dessin les porte tous : la **boîte à moustaches**.",
  depths: {
    discovery:
      "**Avec les mains** : série rangée de 11 notes — 4, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18. La médiane est la 6e (11 : cinq avant, cinq après) ; pour $Q_1$, vise le quart : $25\\,\\%$ de 11 $= 2{,}75$, donc la **3e** valeur (8 — la première à couvrir au moins un quart) ; pour $Q_3$ : $75\\,\\%$ de 11 $= 8{,}25$, donc la **9e** (15). Trois coupes, quatre quarts.",
    standard:
      "**En image** : la **boîte à moustaches** — un rectangle de $Q_1$ à $Q_3$ (la boîte : la **moitié centrale** de la série), un trait dedans à la médiane, deux moustaches qui filent jusqu'au minimum et au maximum. Cinq nombres, un dessin — et l'**écart interquartile** $Q_3 - Q_1$ (la largeur de la boîte) mesure la dispersion du cœur, insensible aux extrêmes : le patron à 20 000 € allonge la moustache, pas la boîte.",
    advanced:
      "**Dans la tête** : les boîtes **comparent** d'un regard — deux classes, même médiane 12 : la boîte A est étroite (notes serrées), la boîte B s'étale de 6 à 17 (grand écart au cœur même de la classe) — moyennes et médianes identiques, réalités opposées, et seules les boîtes le crient. Pour les grandes séries en tableau, les **effectifs cumulés croissants** font le travail : on additionne les effectifs ligne à ligne, et $Q_1$ est la première valeur dont le cumul atteint 25 % de l'effectif total — le tableur s'en régale. L'outil est jeune : le statisticien John Tukey l'a inventé en 1977 — preuve qu'on crée encore des mathématiques pour *voir* les données.",
  },
  keyIdea: "$Q_1$ : au moins **25 %** des valeurs $\\leq Q_1$ ; $Q_3$ : au moins **75 %**. Boîte de $Q_1$ à $Q_3$ (la moitié centrale), trait à la médiane, moustaches jusqu'aux extrêmes — cinq nombres résument la série ; $Q_3 - Q_1$ mesure la dispersion du cœur.",
  why:
    "Pourquoi cinq nombres plutôt que la moyenne seule ? Parce qu'une distribution est une **forme**, pas un point : où commence-t-elle, où s'entasse-t-elle, jusqu'où traîne-t-elle ? La boîte à moustaches répond d'un coup d'œil et résiste aux valeurs extrêmes qui affolent la moyenne — c'est l'outil des salaires, des temps de course, des relevés médicaux : partout où il faut comparer des populations sans se faire mentir par un seul nombre.",
  examples: [
    { title: "Trois coupes sur onze notes", steps: [
      { p: "Rangées : 4, 7, **8**, 9, 10, **11**, 12, 13, **15**, 16, 18 — onze valeurs." },
      { p: "$Q_1 = 8$ (3e : $25\\,\\%$ de 11 $= 2{,}75$, on monte à 3), médiane $= 11$ (6e), $Q_3 = 15$ (9e)." },
    ] },
    { title: "La boîte qui résume", steps: [
      { p: "Cinq nombres : min 4, $Q_1 = 8$, médiane 11, $Q_3 = 15$, max 18." },
      { p: "Boîte de 8 à 15 (la moitié centrale), trait à 11, moustaches vers 4 et 18 — la série en un dessin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Série rangée : 4, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18. Donne la médiane, puis $Q_1$ et $Q_3$ en expliquant les positions.", solution: "Médiane $= $ **11** (6e valeur : cinq de chaque côté) ; $Q_1$ : $25\\,\\%$ de 11 $= 2{,}75$ → la **3e** valeur, **8** ; $Q_3$ : $75\\,\\%$ de 11 $= 8{,}25$ → la **9e**, **15** — la première position qui atteint le quart, puis les trois quarts." },
    { tier: "warmup", prompt: "Avec min 4, $Q_1 = 8$, médiane 11, $Q_3 = 15$, max 18 : décris la boîte à moustaches.", solution: "Un **rectangle de 8 à 15** (la boîte : la moitié centrale des valeurs), un **trait à 11** (la médiane), deux **moustaches** filant jusqu'à 4 et 18 — cinq nombres, un portrait complet." },
    { tier: "application", prompt: "Calcule l'écart interquartile de la série ci-dessus. Que mesure-t-il, et pourquoi résiste-t-il mieux que l'étendue ?", solution: "$Q_3 - Q_1 = 15 - 8 = $ **7** — la largeur de la boîte : la dispersion de la **moitié centrale**. L'étendue ($18 - 4 = 14$) dépend des deux extrêmes ; l'interquartile les ignore : une valeur folle allonge la moustache, jamais la boîte." },
    { tier: "challenge", prompt: "Un tableau d'effectifs donne : note 8 (effectif 5), note 10 (effectif 7), note 12 (effectif 6), note 15 (effectif 2). Dresse les effectifs cumulés croissants et trouve la médiane et $Q_1$ (20 valeurs).", solution: "Cumuls : 5, 12, 18, 20. Médiane : la 10e valeur (moitié de 20) — le cumul atteint 10 à la note **10** ; $Q_1$ : $25\\,\\%$ de 20 $= 5$ → la 5e valeur — le cumul atteint 5 dès la note **8** : les cumuls croissants localisent les coupes sans dérouler la série." },
    { tier: "exam", prompt: "Deux classes ont 12 de médiane. Classe A : boîte de 10 à 13, moustaches de 8 à 16 ; classe B : boîte de 6 à 17, moustaches de 3 à 19. Compare-les et explique ce que la moyenne seule aurait caché.", solution: "Même **centre**, formes opposées : en A, la moitié centrale tient en **3 points** (10 à 13) — classe homogène ; en B, elle s'étale sur **11 points** (6 à 17) — des très faibles et des très forts cohabitent jusqu'au cœur de la série. Une moyenne (sans doute proche de 12 dans les deux cas) aurait déclaré les classes jumelles ; les boîtes révèlent que l'une avance groupée et l'autre écartelée — c'est toute la pédagogie à adapter, et c'est le dessin qui le dit." },
  ],
  practice: [
    { tier: "warmup", label: "La position de la coupe", make: (r) => {
      const n = pick(r, [7, 9, 11, 15, 19]);
      return { prompt: `Une série rangée compte ${n} valeurs : quelle position (rang) occupe la médiane ?`, answer: (n + 1) / 2, solution: `$\\dfrac{${n} + 1}{2} = $ **${(n + 1) / 2}e** — autant de valeurs avant qu'après.` };
    } },
    { tier: "application", label: "Le quart atteint", make: (r) => {
      const n = pick(r, [8, 11, 12, 16, 20]);
      const pos = Math.ceil(0.25 * n);
      return { prompt: `Série rangée de ${n} valeurs : à quelle position lit-on $Q_1$ (au moins 25 % des valeurs couvertes) ?`, answer: pos, solution: `$25\\,\\%$ de ${n} $= ${String(0.25 * n).replace(".", ",")}$ → on monte à la position **${pos}** : la première à couvrir le quart.` };
    } },
    { tier: "challenge", label: "La largeur de la boîte", make: (r) => {
      const q1 = randint(r, 5, 11); const iq = randint(r, 3, 9);
      return { prompt: `Sur une boîte à moustaches, $Q_1 = ${q1}$ et $Q_3 = ${q1 + iq}$ : quel est l'écart interquartile ?`, answer: iq, solution: `$Q_3 - Q_1 = ${q1 + iq} - ${q1} = $ **${iq}** — la largeur de la boîte : la dispersion du cœur, sourde aux extrêmes.` };
    } },
  ],
};

export default [quartiles];
