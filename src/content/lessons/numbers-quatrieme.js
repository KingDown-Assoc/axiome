// Field "Numbers" — MIDDLE module (4e year), part 1: rational numbers in full.
// Official cycle-4 programme: multiplying two relative numbers (one negative
// factor first, then TWO negative factors proved via distributivity), dividing
// relatives, chaining operations; simplifying fractions, DEFINING the rational
// number (quotient of two relative integers), the opposite of a rational, the
// PRODUCT of rationals, fraction of a fraction; the INVERSE of a number and its
// notation, the inverse of a fraction, DIVIDING fractions, multi-operation
// expressions and problems across all four operations.
import { randint, pick } from "../../core/exercises.js";

// — Multiplying/dividing relatives (programme: règle des signes démontrée) —
const relatifsProduit = {
  id: "numbers.middle.relatifs-produit",
  level: "middle", domain: "numbers",
  title: "Multiplier et diviser des relatifs",
  tagline: "Moins par moins fait plus — et la distributivité le démontre.",
  prereqs: ["numbers.middle.relatifs-somme", "numbers.middle.priorites"],
  intuition:
    "L'addition itérée donne le premier cas : $(-3) \\times 4 = (-3) + (-3) + (-3) + (-3) = -12$ — un facteur négatif, produit **négatif**.\n\nMais $(-3) \\times (-4)$ ? On ne peut pas « additionner $-4$ fois ». La réponse viendra d'une **démonstration** — et elle dit : **plus 12**.",
  depths: {
    discovery:
      "**Avec les mains** : la règle des signes — signes **identiques** : produit positif ; signes **contraires** : négatif. Et la valeur absolue se multiplie normalement : $(-5) \\times (-6) = +30$, $(-5) \\times 6 = -30$. Quatre cas, deux règles.",
    standard:
      "**En image** : la division hérite tout — $(-12) \\div 3 = -4$ (car $-4 \\times 3 = -12$ : diviser, c'est remonter la multiplication), donc **mêmes règles de signes**. Les enchaînements suivent les priorités de 5e : $(-2) \\times 5 + (-3) \\times (-4) = -10 + 12 = 2$ — les produits d'abord, leurs signes calculés chacun chez soi.",
    advanced:
      "**Dans la tête** : voici la démonstration promise — calcule $(-3) \\times \\big(4 + (-4)\\big)$ de deux façons. Directement : $(-3) \\times 0 = 0$. Par **distributivité** : $(-3) \\times 4 + (-3) \\times (-4) = -12 + (-3) \\times (-4)$. Les deux résultats sont égaux : $-12 + (-3) \\times (-4) = 0$, donc $(-3) \\times (-4) = +12$ — il n'y avait pas le choix ! « Moins par moins fait plus » n'est pas une convention d'adultes : c'est le prix à payer pour que la distributivité, reine du calcul, survive aux relatifs.",
  },
  keyIdea: "Signes **identiques** → $+$ ; signes **contraires** → $-$ (produit et quotient). Et la règle se **démontre** : la distributivité sur $4 + (-4) = 0$ force $(-3) \\times (-4) = +12$.",
  why:
    "Pourquoi démontrer une règle qu'on pourrait apprendre par cœur ? Parce que « moins par moins fait plus » est l'énoncé le plus contesté du collège — chacun sent qu'on lui cache quelque chose. La démonstration montre qu'on ne cache rien : les mathématiques étendent leurs règles aux nouveaux nombres **sans casser les anciennes**, et la règle des signes est la seule extension possible. La cohérence décide, pas le professeur.",
  examples: [
    { title: "Les quatre cas", steps: [
      { p: "$(-5) \\times 6 = -30$ et $5 \\times (-6) = -30$ : signes contraires, produit négatif." },
      { p: "$(-5) \\times (-6) = +30$ et $5 \\times 6 = 30$ : signes identiques, produit positif." },
    ] },
    { title: "La preuve par zéro", steps: [
      { p: "$(-3) \\times \\big(4 + (-4)\\big) = (-3) \\times 0 = 0$ ; en distribuant : $-12 + (-3) \\times (-4)$." },
      { p: "Donc $(-3) \\times (-4) = 12$ — la distributivité ne laissait aucun autre choix." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $(-3) \\times 4$ en l'écrivant comme une addition répétée.", solution: "$(-3) + (-3) + (-3) + (-3) = $ **−12** — quatre paquets de $-3$ : un facteur négatif suffit à rendre le produit négatif." },
    { tier: "warmup", prompt: "Calcule : $(-5) \\times 6$ ; $(-5) \\times (-6)$ ; $(-30) \\div 5$ ; $(-30) \\div (-6)$.", solution: "**−30** ; **+30** ; **−6** ; **+5** — signes contraires → négatif, signes identiques → positif, pour le produit comme pour le quotient." },
    { tier: "application", prompt: "Calcule $(-2) \\times 5 + (-3) \\times (-4)$ en respectant les priorités.", solution: "Produits d'abord : $-10$ et $+12$ ; puis $-10 + 12 = $ **2** — chaque produit règle son signe, l'addition de 5e conclut." },
    { tier: "challenge", prompt: "Quel est le signe de $(-2) \\times (-3) \\times (-5)$ ? Énonce la règle pour un produit de plusieurs facteurs.", solution: "$+6 \\times (-5) = $ **−30** : négatif. Règle : le signe dépend du **nombre de facteurs négatifs** — pair → positif, **impair** → négatif (chaque paire de moins s'annule)." },
    { tier: "exam", prompt: "Démontre que $(-3) \\times (-4) = 12$ en calculant $(-3) \\times \\big(4 + (-4)\\big)$ de deux façons.", solution: "Directement : $(-3) \\times 0 = $ **0**. Par distributivité : $(-3) \\times 4 + (-3) \\times (-4) = -12 + (-3) \\times (-4)$. Égalité : $-12 + (-3) \\times (-4) = 0$, donc $(-3) \\times (-4) = $ **12** — la règle des signes n'est pas un décret : c'est la seule valeur compatible avec la distributivité." },
  ],
  practice: [
    { tier: "warmup", label: "La règle des signes", make: (r) => {
      const a = (r() < 0.5 ? -1 : 1) * randint(r, 2, 9); const b = (r() < 0.6 ? -1 : 1) * randint(r, 2, 9);
      return { prompt: `Calcule $(${a}) \\times (${b})$.`, answer: a * b, solution: `Signes ${a * b > 0 ? "identiques → positif" : "contraires → négatif"} : **${a * b}**.` };
    } },
    { tier: "application", label: "Le quotient signé", make: (r) => {
      const b = (r() < 0.5 ? -1 : 1) * randint(r, 2, 9); const q = (r() < 0.5 ? -1 : 1) * randint(r, 2, 9);
      return { prompt: `Calcule $(${b * q}) \\div (${b})$.`, answer: q, solution: `Le nombre qui, multiplié par ${b}, donne ${b * q} : **${q}** — mêmes règles de signes.` };
    } },
    { tier: "challenge", label: "Compter les moins", make: (r) => {
      const n = randint(r, 2, 4); const facs = []; let p = 1;
      for (let i = 0; i < n; i++) { const f = (r() < 0.55 ? -1 : 1) * randint(r, 2, 5); facs.push(f); p *= f; }
      return { prompt: `Quel est le signe de $${facs.map(f => "(" + f + ")").join(" \\times ")}$ ? (1 = positif, 0 = négatif)`, answer: p > 0 ? 1 : 0, solution: `${facs.filter(f => f < 0).length} facteur(s) négatif(s) — ${facs.filter(f => f < 0).length % 2 === 0 ? "pair → **positif**" : "impair → **négatif**"} ($= ${p}$).` };
    } },
  ],
};

// — Multiplying fractions (programme: produit, fraction de fraction, rationnel) —
const fractionsProduit = {
  id: "numbers.middle.fractions-produit",
  level: "middle", domain: "numbers",
  title: "Multiplier des fractions",
  tagline: "Numérateurs ensemble, dénominateurs ensemble — et les deux tiers de trois quarts se dessinent.",
  prereqs: ["numbers.middle.fractions-denominateurs", "numbers.middle.relatifs-produit"],
  intuition:
    "La règle la plus simple des fractions : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$ — numérateurs ensemble, dénominateurs ensemble. Pas de dénominateur commun !\n\nEt la famille s'agrandit : un **nombre rationnel** est le quotient de deux entiers **relatifs** — $\\frac{-3}{4}$ en est un, son opposé est $\\frac{3}{4}$.",
  depths: {
    discovery:
      "**Avec les mains** : « les $\\frac{2}{3}$ de $\\frac{3}{4}$ d'une tablette » — dessine la tablette, hachure trois quarts, prends-en deux tiers : il reste $\\frac{6}{12} = \\frac{1}{2}$. Le rectangle découpé en $3 \\times 4$ explique la règle : les dénominateurs multiplient les découpes, les numérateurs comptent les cases retenues — et « de » se traduit par « × ».",
    standard:
      "**En image** : **simplifier avant** de multiplier — $\\frac{5}{6} \\times \\frac{3}{10} = \\frac{5 \\times 3}{6 \\times 10}$ : le 5 et le 10 se simplifient, le 3 et le 6 aussi → $\\frac{1 \\times 1}{2 \\times 2} = \\frac{1}{4}$. Barrer en croix avant de calculer évite les gros nombres ; simplifier après marche aussi, mais transpire plus.",
    advanced:
      "**Dans la tête** : les signes voyagent avec les relatifs — $\\frac{-3}{4} \\times \\frac{2}{-5} = \\frac{-6}{-20} = \\frac{6}{20} = \\frac{3}{10}$ : la règle des signes de l'autre leçon s'applique, et l'opposé de $\\frac{3}{4}$ s'écrit indifféremment $\\frac{-3}{4} = \\frac{3}{-4} = -\\frac{3}{4}$ — trois écritures, un nombre. Le mot **rationnel** vient de *ratio* : tout quotient d'entiers relatifs est admis, et la multiplication y circule sans entrave.",
  },
  keyIdea: "$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{ac}{bd}$ — et « **de** » se traduit « **×** ». Simplifier **avant** de multiplier ; les signes suivent la règle des relatifs.",
  why:
    "Pourquoi la multiplication des fractions est-elle plus simple que leur addition ? Parce que multiplier des découpages **compose** les découpages (un tiers d'un quart est naturellement un douzième), alors qu'additionner exige une unité commune. C'est l'inverse de l'intuition — et un avertissement précieux : en mathématiques, la difficulté ne suit pas l'ordre d'apprentissage des opérations.",
  examples: [
    { title: "Les deux tiers de trois quarts", steps: [
      { p: "« de » $= \\times$ : $\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{2 \\times 3}{3 \\times 4} = \\dfrac{6}{12}$." },
      { p: "$= \\dfrac{1}{2}$ — le dessin de la tablette confirme : la moitié." },
    ] },
    { title: "Simplifier avant", steps: [
      { p: "$\\dfrac{5}{6} \\times \\dfrac{3}{10}$ : barre le 5 avec le 10 ($\\to 1$ et $2$), le 3 avec le 6 ($\\to 1$ et $2$)." },
      { p: "$\\dfrac{1 \\times 1}{2 \\times 2} = \\dfrac{1}{4}$ — petits nombres, zéro transpiration." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Traduis « les $\\frac{2}{3}$ de $\\frac{3}{4}$ » en calcul et donne le résultat simplifié.", solution: "« de » devient × : $\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$ — la tablette hachurée le montre." },
    { tier: "warmup", prompt: "Calcule $\\frac{2}{5} \\times \\frac{3}{7}$.", solution: "$\\frac{2 \\times 3}{5 \\times 7} = \\frac{6}{35}$ — numérateurs ensemble, dénominateurs ensemble : pas de dénominateur commun à chercher." },
    { tier: "application", prompt: "Calcule $\\frac{5}{6} \\times \\frac{3}{10}$ en simplifiant avant de multiplier.", solution: "$5$ et $10$ → $1$ et $2$ ; $3$ et $6$ → $1$ et $2$ : $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$ — barrer d'abord, multiplier ensuite." },
    { tier: "challenge", prompt: "Calcule $\\frac{-3}{4} \\times \\frac{2}{-5}$ et écris l'opposé du résultat de deux façons.", solution: "$\\frac{(-3) \\times 2}{4 \\times (-5)} = \\frac{-6}{-20} = \\frac{6}{20} = \\frac{3}{10}$ (deux signes − s'annulent). Son opposé : $-\\frac{3}{10} = \\frac{-3}{10}$ — le signe se loge où l'on veut." },
    { tier: "exam", prompt: "Un réservoir est rempli aux $\\frac{3}{4}$. On en vide les $\\frac{2}{3}$. Quelle fraction du réservoir a-t-on vidée, et quelle fraction reste-t-il ?", solution: "Vidé : $\\frac{2}{3}$ **de** $\\frac{3}{4} = \\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{2}$ du réservoir ; reste : $\\frac{3}{4} - \\frac{1}{2} = \\frac{1}{4}$ — la multiplication prélève, la soustraction de 5e fait les comptes : **un quart**." },
  ],
  practice: [
    { tier: "warmup", label: "Num avec num, dén avec dén", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 2, 7); const c = randint(r, 1, 5); const d = randint(r, 2, 7);
      return { prompt: `Calcule $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}}$. Réponds par le numérateur (sans simplifier).`, answer: a * c, solution: `$\\frac{${a} \\times ${c}}{${b} \\times ${d}} = \\frac{${a * c}}{${b * d}}$ — numérateur **${a * c}**.` };
    } },
    { tier: "application", label: "La fraction du nombre", make: (r) => {
      const d = pick(r, [3, 4, 5]); const n = randint(r, 1, d - 1); const x = d * randint(r, 2, 9);
      return { prompt: `Calcule les $\\frac{${n}}{${d}}$ de ${x}.`, answer: (n * x) / d, solution: `$\\frac{${n}}{${d}} \\times ${x} = \\frac{${n * x}}{${d}} = $ **${(n * x) / d}** — « de » se traduit « × ».` };
    } },
  ],
};

// — Dividing fractions (programme: inverse, division) —
const fractionsDivision = {
  id: "numbers.middle.fractions-division",
  level: "middle", domain: "numbers",
  title: "Diviser par une fraction",
  tagline: "Diviser, c'est multiplier par l'inverse — la fraction renversée.",
  prereqs: ["numbers.middle.fractions-produit"],
  intuition:
    "L'**inverse** d'un nombre $x$ (non nul) est le nombre qui, multiplié par $x$, donne **1** : l'inverse de 4 est $\\frac{1}{4}$, l'inverse de $\\frac{2}{3}$ est $\\frac{3}{2}$ — la fraction **renversée** ($\\frac{2}{3} \\times \\frac{3}{2} = \\frac{6}{6} = 1$ ✓).\n\nEt la division tombe : **diviser par un nombre, c'est multiplier par son inverse** — $\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2} = \\dfrac{15}{8}$.",
  depths: {
    discovery:
      "**Avec les mains** : « combien de fois $\\frac{1}{4}$ dans 3 ? » — douze quarts dans trois unités : $3 \\div \\frac{1}{4} = 12 = 3 \\times 4$. Diviser par un quart, c'est multiplier par 4 : la division par plus petit que 1 **agrandit** — ton $\\div 0{,}2$ de 5e le savait déjà.",
    standard:
      "**En image** : la mécanique — renverser le **diviseur** (jamais le premier !), puis multiplier : $\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2}$, simplifications croisées bienvenues. Et la barre de fraction elle-même est une division : $\\dfrac{\\;\\frac{3}{4}\\;}{\\;\\frac{2}{5}\\;}$ se lit $\\frac{3}{4} \\div \\frac{2}{5}$ — les fractions de fractions perdent leur mystère.",
    advanced:
      "**Dans la tête** : pourquoi « multiplier par l'inverse » ? Parce que diviser par $x$, c'est répondre à « $? \\times x = a$ » — multiplie les deux membres par l'inverse de $x$ : le $x$ s'évapore ($x \\times \\frac{1}{x} = 1$), reste $? = a \\times \\frac{1}{x}$. La division n'est pas une quatrième opération : c'est la multiplication par l'inverse, comme la soustraction était l'addition de l'opposé — les quatre opérations n'étaient que **deux**, chacune avec sa marche arrière.",
  },
  keyIdea: "Inverse de $\\frac{a}{b}$ : $\\frac{b}{a}$ (leur produit fait **1**). Diviser $=$ **multiplier par l'inverse** du diviseur : $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.",
  why:
    "Pourquoi ramener la division à la multiplication ? Même geste qu'en 5e (soustraire $=$ ajouter l'opposé) : **réduire le nombre de règles**. Opposé et inverse sont les deux machines à remonter — l'un défait l'addition, l'autre la multiplication — et avec elles, toute équation du premier degré se résoudra en deux gestes. La 4e ne complique pas le calcul : elle le compacte.",
  examples: [
    { title: "Combien de quarts dans 3 ?", steps: [
      { p: "$3 \\div \\frac{1}{4}$ : douze quarts tiennent dans trois unités." },
      { p: "$3 \\times 4 = $ **12** — diviser par $\\frac{1}{4}$, c'est multiplier par son inverse 4." },
    ] },
    { title: "La mécanique complète", steps: [
      { p: "$\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2}$ — le diviseur se renverse." },
      { p: "$= \\dfrac{15}{8}$ — et $\\frac{15}{8} \\times \\frac{2}{5} = \\frac{30}{40} = \\frac{3}{4}$ ✓ : la vérification boucle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne l'inverse de : $4$ ; $\\frac{2}{3}$ ; $\\frac{1}{5}$. Vérifie l'un d'eux.", solution: "$\\frac{1}{4}$ ; $\\frac{3}{2}$ ; $5$ — vérification : $\\frac{2}{3} \\times \\frac{3}{2} = \\frac{6}{6} = 1$ ✓ : l'inverse est le partenaire qui ramène à 1." },
    { tier: "warmup", prompt: "Calcule $3 \\div \\frac{1}{4}$ et explique avec des quarts.", solution: "$3 \\times 4 = $ **12** — il y a douze quarts dans trois unités : diviser par plus petit que 1 agrandit." },
    { tier: "application", prompt: "Calcule $\\frac{3}{4} \\div \\frac{2}{5}$.", solution: "$\\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8}$ — renverser le diviseur, multiplier, et jamais l'inverse du premier !" },
    { tier: "challenge", prompt: "Calcule $\\frac{2}{3} + \\frac{1}{2} \\div \\frac{3}{4}$ en respectant les priorités.", solution: "La division d'abord : $\\frac{1}{2} \\times \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}$ ; puis $\\frac{2}{3} + \\frac{2}{3} = \\frac{4}{3}$ — les priorités de 5e gouvernent aussi les fractions." },
    { tier: "exam", prompt: "Une bouteille de $\\frac{3}{2}$ L est servie en verres de $\\frac{1}{8}$ L. Combien de verres ? Pose la division, justifie par l'inverse, vérifie.", solution: "$\\frac{3}{2} \\div \\frac{1}{8} = \\frac{3}{2} \\times 8 = $ **12 verres** — diviser par $\\frac{1}{8}$, c'est multiplier par 8. Vérification : $12 \\times \\frac{1}{8} = \\frac{12}{8} = \\frac{3}{2}$ ✓ — la multiplication referme ce que la division a ouvert." },
  ],
  practice: [
    { tier: "warmup", label: "Le partenaire du 1", make: (r) => {
      const a = randint(r, 2, 9); const b = randint(r, 2, 9);
      if (r() < 0.4) return { prompt: `Quel est l'inverse de ${a} ? Réponds par le dénominateur de la fraction.`, answer: a, solution: `L'inverse de $${a}$ est $\\frac{1}{${a}}$ — dénominateur **${a}**.` };
      return { prompt: `L'inverse de $\\frac{${a}}{${b}}$ est $\\frac{?}{${a}}$ : quel numérateur ?`, answer: b, solution: `La fraction renversée : $\\frac{${b}}{${a}}$ — numérateur **${b}**, et $\\frac{${a}}{${b}} \\times \\frac{${b}}{${a}} = 1$ ✓.` };
    } },
    { tier: "application", label: "Renverser puis multiplier", make: (r) => {
      const n = randint(r, 2, 6); const d = pick(r, [2, 3, 4, 5]); const k = randint(r, 2, 5);
      return { prompt: `Calcule $${n * k} \\div \\frac{${n}}{${d}}$.`, answer: k * d, solution: `$${n * k} \\times \\frac{${d}}{${n}} = \\frac{${n * k * d}}{${n}} = $ **${k * d}** — multiplier par l'inverse.` };
    } },
  ],
};

export default [relatifsProduit, fractionsProduit, fractionsDivision];
