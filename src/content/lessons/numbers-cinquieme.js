// Field "Numbers" — MIDDLE module (5e year), part 1: relative numbers and rational
// numbers. Official cycle-4 programme: defining relative numbers (opposite,
// absolute value, strictly positive/negative), representing below-zero quantities,
// reading/placing abscissas, comparing and ordering; adding two then several
// relative decimals, subtracting as adding the opposite, simplifying writings with
// parentheses, chaining; comparing fractions and adding/subtracting fractions with
// ARBITRARY denominators, multiple writings of the same number (1,2 = 6/5 = 120 %).
import { randint, pick } from "../../core/exercises.js";

// — Relative numbers (programme: définir, opposé, valeur absolue, comparer) —
const relatifs = {
  id: "numbers.middle.relatifs",
  level: "middle", domain: "numbers",
  title: "Les nombres relatifs",
  tagline: "Les nombres négatifs : sous le zéro, comme sur un thermomètre.",
  prereqs: ["numbers.primary.thousandths"],
  intuition:
    "−7 °C, le 3e sous-sol, 200 m sous la mer : le monde compte **sous zéro** depuis toujours. Les **nombres relatifs** donnent un statut officiel à ces quantités : un **signe** (+ ou −) et une **distance à zéro**.\n\nLa droite graduée s'étend vers la gauche : chaque nombre y a son **abscisse**, et chaque nombre a son **opposé** — son reflet de l'autre côté du zéro : l'opposé de $5$ est $-5$, l'opposé de $-3$ est $3$.",
  depths: {
    discovery:
      "**Avec les mains** : le thermomètre est une droite graduée debout — $-7$ est plus bas que $-2$, donc **plus petit** : $-7 < -2$. Le piège des débutants : 7 est plus grand que 2, mais côté négatif, tout s'inverse — plus on s'enfonce, plus c'est petit.",
    standard:
      "**En image** : la **valeur absolue** d'un nombre est sa distance à zéro, notée $|x|$ : $|-7| = 7$ et $|7| = 7$ — les opposés ont la même valeur absolue, seul le signe les distingue. Comparer deux négatifs : le plus grand est celui de **plus petite** valeur absolue ($-2 > -7$ car 2 < 7). Et le vocabulaire se précise : $-3$ est strictement négatif, $0$ est le seul nombre à la fois positif **et** négatif.",
    advanced:
      "**Dans la tête** : il a fallu mille ans pour accepter ces nombres — Brahmagupta (Inde, vers 600) calculait déjà avec des « dettes » et des « biens », mais l'Europe du XVIIe siècle niait encore leur existence (« comment un nombre serait-il moins que rien ? »). La réponse : un nombre relatif ne compte pas des objets, il code une **position** ou une **variation** — et les positions sous zéro existent autant que les autres. Quand le sens change, le nombre suit.",
  },
  keyIdea: "Un relatif = un **signe** + une **valeur absolue** (la distance à zéro, $|x|$). Sur la droite : plus à gauche = plus petit — donc $-7 < -2$.",
  why:
    "Pourquoi inventer des nombres « moins que rien » ? Parce que soustraire doit toujours être possible : $3 - 7$ n'avait pas de réponse, et le monde en avait besoin (une dette de 4, une chute de 4 degrés). Les relatifs complètent la droite pour que **toute** soustraction ait un résultat — la même logique qui a créé les fractions pour que toute division en ait un.",
  examples: [
    { title: "Comparer −7 et −2", steps: [
      { p: "Sur le thermomètre : $-7$ est plus bas que $-2$." },
      { p: "$-7 < -2$ — côté négatif, la plus grande valeur absolue fait le plus petit nombre." },
    ] },
    { title: "Opposé et valeur absolue", steps: [
      { p: "L'opposé de $-3$ est $3$ : son reflet par rapport à zéro." },
      { p: "$|-3| = |3| = 3$ : même distance à zéro — seul le signe change." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne trois grandeurs de la vie réelle qui descendent sous zéro.", solution: "Par exemple : la **température** ($-7$ °C), l'**altitude** ($-200$ m sous la mer), un **étage** (3e sous-sol), un **solde bancaire** (dette) — le monde compte sous zéro depuis toujours." },
    { tier: "warmup", prompt: "Donne l'opposé puis la valeur absolue de : $-8$ ; $5$ ; $-2{,}5$.", solution: "Opposés : $8$ ; $-5$ ; $2{,}5$. Valeurs absolues : $|-8| = 8$ ; $|5| = 5$ ; $|-2{,}5| = 2{,}5$ — la distance à zéro ignore le signe." },
    { tier: "application", prompt: "Range dans l'ordre croissant : $3$ ; $-7$ ; $0$ ; $-2$ ; $1{,}5$.", solution: "$-7 < -2 < 0 < 1{,}5 < 3$ — de gauche à droite sur la droite graduée : les négatifs d'abord, le plus « lourd » en tête." },
    { tier: "challenge", prompt: "Vrai ou faux : « $-12 > -5$ car $12 > 5$ ». Corrige le raisonnement.", solution: "**Faux** : côté négatif, tout s'inverse — $|-12| = 12 > 5$ signifie que $-12$ est **plus loin** sous zéro, donc plus petit : $-12 < -5$. La règle : entre deux négatifs, le plus grand est celui de plus **petite** valeur absolue." },
    { tier: "exam", prompt: "Le nombre $0$ est-il positif ? Négatif ? Strictement positif ? Justifie avec les définitions.", solution: "$0$ est **à la fois positif et négatif** (il n'est ni au-dessus ni au-dessous de lui-même) — mais ni strictement positif ni strictement négatif : « strictement » exclut zéro. C'est le seul nombre dans ce cas : la frontière appartient aux deux camps." },
  ],
  practice: [
    { tier: "warmup", label: "Opposés et distances", make: (r) => {
      const n = (r() < 0.5 ? -1 : 1) * (randint(r, 2, 40) + (r() < 0.4 ? 0.5 : 0));
      if (r() < 0.5) return { prompt: `Quel est l'opposé de $${String(n).replace(".", ",")}$ ?`, answer: -n, solution: `Le reflet par rapport à zéro : **${String(-n).replace(".", ",")}**.` };
      return { prompt: `Que vaut $|${String(n).replace(".", ",")}|$ ?`, answer: Math.abs(n), solution: `La distance à zéro : **${String(Math.abs(n)).replace(".", ",")}**.` };
    } },
    { tier: "application", label: "Le plus grand des deux", make: (r) => {
      const a = -randint(r, 2, 30); let b = -randint(r, 2, 30);
      if (a === b) b = b - 1;
      return { prompt: `Quel est le plus grand : $${a}$ ou $${b}$ ?`, answer: Math.max(a, b), solution: `$${Math.max(a, b)} > ${Math.min(a, b)}$ — la plus petite valeur absolue gagne côté négatif.` };
    } },
  ],
};

// — Adding and subtracting relatives (programme: additionner, soustraire = opposé) —
const relatifsSomme = {
  id: "numbers.middle.relatifs-somme",
  level: "middle", domain: "numbers",
  title: "Additionner et soustraire des relatifs",
  tagline: "Soustraire, c'est ajouter l'opposé — et 3 − 7 a enfin une réponse.",
  prereqs: ["numbers.middle.relatifs"],
  intuition:
    "Additionner des relatifs, c'est cumuler des **variations** : gagner 3 puis perdre 7, c'est $3 + (-7) = -4$.\n\nDeux règles suffisent : **même signe** — on additionne les valeurs absolues et on garde le signe ($(-3) + (-4) = -7$) ; **signes contraires** — on soustrait les valeurs absolues et le signe du plus « lourd » l'emporte ($3 + (-7) = -4$, car $|-7| > |3|$).",
  depths: {
    discovery:
      "**Avec les mains** : l'ascenseur — départ au 3e, descente de 7 étages : $3 + (-7)$… te voilà au $-4$ (4e sous-sol). Chaque addition est un trajet sur la droite graduée : positif vers la droite, négatif vers la gauche.",
    standard:
      "**En image** : la **soustraction** se ramène à l'addition — soustraire un nombre, c'est **ajouter son opposé** : $3 - 7 = 3 + (-7) = -4$ ; et $5 - (-2) = 5 + 2 = 7$ (retirer une dette, c'est s'enrichir !). Les écritures se simplifient : $3 + (-7)$ s'écrit $3 - 7$ ; $5 - (-2)$ s'écrit $5 + 2$ — deux signes qui se suivent fusionnent.",
    advanced:
      "**Dans la tête** : les longues chaînes se traitent par **regroupement** — $-4 + 9 - 6 + 1 = (9 + 1) + (-4 - 6) = 10 - 10 = 0$ : rassembler les positifs, rassembler les négatifs, conclure. L'addition à trous éclaire le tout : $2 + \\,? = 7$ se résout par $7 - 2$ — la soustraction **est** la machine à remonter l'addition, et avec les relatifs, elle remonte dans les deux sens.",
  },
  keyIdea: "Soustraire $=$ **ajouter l'opposé** : $a - b = a + (-b)$. Même signe : on cumule ; signes contraires : on soustrait les $|\\cdot|$, le plus lourd impose son signe.",
  why:
    "Pourquoi transformer la soustraction en addition ? Pour n'avoir qu'**une seule** opération à maîtriser : l'addition de relatifs, avec ses deux règles, absorbe tous les cas — plus de « petit moins grand impossible », plus de cas particuliers. Réduire deux opérations à une, c'est le geste préféré des mathématiques : moins de règles, plus de puissance.",
  examples: [
    { title: "3 − 7, enfin", steps: [
      { p: "$3 - 7 = 3 + (-7)$ : ajouter l'opposé." },
      { p: "Signes contraires : $7 - 3 = 4$, le signe du plus lourd ($-7$) : $-4$." },
    ] },
    { title: "Retirer une dette", steps: [
      { p: "$5 - (-2) = 5 + 2 = 7$ — soustraire $-2$, c'est ajouter $2$." },
      { p: "Écriture simplifiée : $5 - (-2)$ devient $5 + 2$ — deux signes qui se suivent fusionnent." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Tu es au 3e étage, l'ascenseur descend de 7 étages. Écris le calcul et donne l'étage d'arrivée.", solution: "$3 + (-7) = $ **−4** : le 4e sous-sol — additionner un négatif, c'est descendre." },
    { tier: "warmup", prompt: "Calcule : $(-3) + (-4)$ ; $3 + (-7)$ ; $(-2) + 9$.", solution: "$-7$ (même signe : on cumule) ; $-4$ (le 7 l'emporte) ; $7$ (le 9 l'emporte) — la valeur absolue la plus lourde impose son signe." },
    { tier: "application", prompt: "Transforme en addition puis calcule : $3 - 7$ ; $5 - (-2)$ ; $-4 - 6$.", solution: "$3 + (-7) = $ **−4** ; $5 + 2 = $ **7** ; $-4 + (-6) = $ **−10** — soustraire, c'est ajouter l'opposé." },
    { tier: "challenge", prompt: "Calcule en regroupant : $-4 + 9 - 6 + 1$.", solution: "Positifs : $9 + 1 = 10$ ; négatifs : $-4 - 6 = -10$ ; total : **0** — regrouper avant de calculer, c'est voir la chaîne d'un coup." },
    { tier: "exam", prompt: "La température passe de $-3$ °C à $5$ °C. Écris la variation comme une soustraction de relatifs et calcule-la.", solution: "Variation $=$ arrivée $-$ départ $= 5 - (-3) = 5 + 3 = $ **+8 °C** — soustraire le départ négatif **ajoute** : il a fait 8 degrés de mieux, et le calcul le démontre." },
  ],
  practice: [
    { tier: "warmup", label: "Les deux règles", make: (r) => {
      const a = (r() < 0.5 ? -1 : 1) * randint(r, 2, 20); const b = (r() < 0.5 ? -1 : 1) * randint(r, 2, 20);
      return { prompt: `Calcule $${a < 0 ? "(" + a + ")" : a} + ${b < 0 ? "(" + b + ")" : b}$.`, answer: a + b, solution: `${a >= 0 === b >= 0 ? "Même signe : on cumule" : "Signes contraires : le plus lourd impose son signe"} : **${a + b}**.` };
    } },
    { tier: "application", label: "Ajouter l'opposé", make: (r) => {
      const a = (r() < 0.5 ? -1 : 1) * randint(r, 2, 18); const b = (r() < 0.6 ? -1 : 1) * randint(r, 2, 18);
      return { prompt: `Calcule $${a} - ${b < 0 ? "(" + b + ")" : b}$.`, answer: a - b, solution: `$${a} + ${-b < 0 ? "(" + -b + ")" : -b} = $ **${a - b}** — soustraire, c'est ajouter l'opposé.` };
    } },
    { tier: "challenge", label: "La chaîne regroupée", make: (r) => {
      const v = [randint(r, 1, 9), -randint(r, 1, 9), randint(r, 1, 9), -randint(r, 1, 9)];
      const s = v.reduce((x, y) => x + y, 0);
      return { prompt: `Calcule en regroupant : $${v[0]} ${v[1] < 0 ? "- " + (-v[1]) : "+ " + v[1]} ${v[2] < 0 ? "- " + (-v[2]) : "+ " + v[2]} ${v[3] < 0 ? "- " + (-v[3]) : "+ " + v[3]}$.`, answer: s, solution: `Positifs : $${v.filter(x => x > 0).join(" + ")}$ ; négatifs : $${v.filter(x => x < 0).join(" ")}$ → **${s}**.` };
    } },
  ],
};

// — Fractions with arbitrary denominators (programme: comparer, ± quelconques) —
const fractionsDenominateurs = {
  id: "numbers.middle.fractions-denominateurs",
  level: "middle", domain: "numbers",
  title: "Fractions : tous les dénominateurs",
  tagline: "2/3 + 4/21 — les multiples fabriquent la langue commune.",
  prereqs: ["numbers.middle.fraction-ops"],
  intuition:
    "En 6e, additionner des fractions exigeait des dénominateurs compatibles. La 5e lève la barrière : **tous** les dénominateurs, grâce à la mise au même dénominateur — un **multiple commun**.\n\n$\\frac{2}{3} + \\frac{4}{21}$ : 21 est un multiple de 3 — $\\frac{2}{3} = \\frac{14}{21}$, donc $\\frac{14}{21} + \\frac{4}{21} = \\frac{18}{21} = \\frac{6}{7}$. Traduire, additionner, simplifier.",
  depths: {
    discovery:
      "**Avec les mains** : deux gâteaux découpés différemment ne se comparent pas part à part — il faut **redécouper** : les tiers en vingt-et-unièmes (chaque tiers en 7), et soudain les parts s'additionnent. Le même dénominateur, c'est le même découpage.",
    standard:
      "**En image** : comparer s'enrichit — même dénominateur : le plus grand numérateur gagne ($\\frac{5}{7} > \\frac{2}{7}$) ; même **numérateur** : le plus grand dénominateur **perd** ($\\frac{8}{21} < \\frac{8}{12}$ : des parts plus fines !) ; sinon : passer par 1 ou $\\frac{1}{2}$ ($\\frac{3}{4} < \\frac{7}{6}$ car l'une est sous 1, l'autre au-dessus), ou tout traduire.",
    advanced:
      "**Dans la tête** : un nombre, une infinité d'habits — $1{,}2 = \\frac{12}{10} = \\frac{6}{5} = 1 + \\frac{1}{5} = 120\\,\\% = \\frac{120}{100}$ : décimal, fraction, fraction simplifiée, nombre mixte, pourcentage désignent le même point de la droite. Savoir **changer d'habit** au bon moment est la vraie maîtrise : $\\frac{6}{5}$ pour additionner des fractions, $1{,}2$ pour multiplier, $120\\,\\%$ pour comparer à un tout — le nombre est un, ses écritures servent chacune un usage.",
  },
  keyIdea: "Mettre au **même dénominateur** (un multiple commun), additionner les numérateurs, **simplifier**. Même numérateur : le plus grand dénominateur fait la plus petite fraction.",
  why:
    "Pourquoi le même dénominateur est-il obligatoire pour additionner ? Parce qu'additionner exige une **unité commune** : 2 tiers + 4 vingt-et-unièmes, c'est comme 2 mètres + 4 pouces — des unités différentes ne se cumulent pas telles quelles. Le dénominateur **est** l'unité de la fraction ; la mise au même dénominateur est une conversion d'unités.",
  examples: [
    { title: "2/3 + 4/21", steps: [
      { p: "21 est un multiple de 3 : $\\frac{2}{3} = \\frac{2 \\times 7}{3 \\times 7} = \\frac{14}{21}$." },
      { p: "$\\frac{14}{21} + \\frac{4}{21} = \\frac{18}{21} = \\frac{6}{7}$ (simplifier par 3) — traduire, cumuler, alléger." },
    ] },
    { title: "Comparer 8/21 et 8/12", steps: [
      { p: "Même numérateur : 8 parts dans les deux cas — mais des **vingt-et-unièmes** sont plus fins que des douzièmes." },
      { p: "$\\frac{8}{21} < \\frac{8}{12}$ — plus le dénominateur grandit, plus la part rétrécit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi ne peut-on pas additionner directement $\\frac{2}{3}$ et $\\frac{4}{21}$ ?", solution: "Parce que les parts n'ont pas la même taille — des tiers et des vingt-et-unièmes sont des **unités différentes**. Il faut d'abord tout exprimer dans le même découpage : $\\frac{2}{3} = \\frac{14}{21}$." },
    { tier: "warmup", prompt: "Calcule $\\frac{2}{3} + \\frac{4}{21}$ et simplifie.", solution: "$\\frac{14}{21} + \\frac{4}{21} = \\frac{18}{21} = \\frac{6}{7}$ — traduire, additionner, simplifier par 3." },
    { tier: "application", prompt: "Compare sans calcul décimal : $\\frac{8}{21}$ et $\\frac{8}{12}$ ; puis $\\frac{3}{4}$ et $\\frac{7}{6}$.", solution: "$\\frac{8}{21} < \\frac{8}{12}$ (même numérateur : parts plus fines à 21) ; $\\frac{3}{4} < \\frac{7}{6}$ (l'une sous 1, l'autre au-dessus) — comparer, c'est choisir le bon point de repère." },
    { tier: "challenge", prompt: "Écris $1{,}2$ sous cinq formes différentes.", solution: "$1{,}2 = \\frac{12}{10} = \\frac{6}{5} = 1 + \\frac{1}{5} = 120\\,\\% = \\frac{120}{100}$ — un nombre, cinq habits, chacun son usage." },
    { tier: "exam", prompt: "Léa a lu $\\frac{2}{5}$ de son livre lundi et $\\frac{1}{4}$ mardi. Quelle fraction reste-t-il ? (réponds en fraction simplifiée)", solution: "Lu : $\\frac{2}{5} + \\frac{1}{4} = \\frac{8}{20} + \\frac{5}{20} = \\frac{13}{20}$ ; reste : $1 - \\frac{13}{20} = \\frac{7}{20}$ — le multiple commun 20 fait la langue, le tout vaut $\\frac{20}{20}$." },
  ],
  practice: [
    { tier: "application", label: "La langue commune", make: (r) => {
      const d1 = pick(r, [2, 3, 4, 5]); const k = pick(r, [2, 3, 4]); const d2 = d1 * k;
      const n1 = randint(r, 1, d1 - 1); const n2 = randint(r, 1, d2 - 1);
      return { prompt: `Calcule $\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}$. Réponds par le numérateur (sur ${d2}, sans simplifier).`, answer: n1 * k + n2, solution: `$\\frac{${n1}}{${d1}} = \\frac{${n1 * k}}{${d2}}$ → $\\frac{${n1 * k} + ${n2}}{${d2}} = \\frac{${n1 * k + n2}}{${d2}}$ : numérateur **${n1 * k + n2}**.` };
    } },
    { tier: "challenge", label: "Même numérateur, qui gagne ?", make: (r) => {
      const n = randint(r, 2, 9); const d1 = randint(r, 3, 12); let d2 = randint(r, 3, 24); if (d2 === d1) d2 += 2;
      return { prompt: `Sans calculer : laquelle est la plus grande, $\\frac{${n}}{${d1}}$ ou $\\frac{${n}}{${d2}}$ ? Réponds par son dénominateur.`, answer: Math.min(d1, d2), solution: `Même numérateur : le plus **petit** dénominateur fait les parts les plus grosses → $\\frac{${n}}{${Math.min(d1, d2)}}$.` };
    } },
  ],
};

export default [relatifs, relatifsSomme, fractionsDenominateurs];
