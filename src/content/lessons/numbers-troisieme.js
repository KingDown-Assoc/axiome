// Field "Numbers" — MIDDLE module (3e year), part 1: irreducible fractions,
// negative exponents, scientific notation. Official cycle-4 programme: putting a
// fraction in IRREDUCIBLE form (with prime factorization 60 = 2² × 3 × 5 as the
// entertained automatism), solving fraction problems, the number-set notations
// (naturals, relative integers, decimals, rationals) as official extension;
// defining powers with NEGATIVE exponents, multiplying and DIVIDING powers;
// determining the SCIENTIFIC NOTATION of a number and solving problems with it —
// Sissa's chessboard and the Rhind papyrus as historical threads.
import { randint, pick } from "../../core/exercises.js";

// — Irreducible fractions (programme: forme irréductible, facteurs premiers) —
const irreductible = {
  id: "numbers.middle.irreductible",
  level: "middle", domain: "numbers",
  title: "Fractions irréductibles",
  tagline: "Décomposer en facteurs premiers — la fraction rend tout ce qu'elle peut.",
  prereqs: ["numbers.middle.divisibilite", "numbers.middle.fractions-division"],
  intuition:
    "Une fraction est **irréductible** quand plus rien ne se simplifie : numérateur et dénominateur n'ont plus aucun diviseur commun (autre que 1).\n\nL'outil ultime : la **décomposition en facteurs premiers** — $60 = 2^2 \\times 3 \\times 5$ : chaque entier est un assemblage unique d'atomes premiers, et les atomes communs des deux étages se barrent.",
  depths: {
    discovery:
      "**Avec les mains** : $\\dfrac{60}{84}$ — décompose : $60 = 2^2 \\times 3 \\times 5$ et $84 = 2^2 \\times 3 \\times 7$ ; barre les atomes communs ($2^2 \\times 3 = 12$) : reste $\\dfrac{5}{7}$ — irréductible, garanti : 5 et 7 n'ont plus rien à se dire.",
    standard:
      "**En image** : décomposer méthodiquement — divise par 2 tant que possible, puis par 3, par 5, par 7… $84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2^2 \\times 3 \\times 7$ : l'arbre des facteurs descend jusqu'aux premiers. Simplifier pas à pas marche aussi ($\\frac{60}{84} = \\frac{30}{42} = \\frac{15}{21} = \\frac{5}{7}$), mais la décomposition simplifie **tout d'un coup** et certifie qu'on a fini.",
    advanced:
      "**Dans la tête** : après quatre ans de constructions, la carte des nombres se dessine — les **entiers naturels** (0, 1, 2…), englobés par les **entiers relatifs** (… −2, −1, 0, 1…), englobés par les **décimaux** (écriture finie), englobés par les **rationnels** (tous les quotients d'entiers — tes fractions). Quatre familles emboîtées comme des poupées russes : chaque extension répondait à une opération qui coinçait (soustraire, diviser…). Et la 4e a montré que la muraille rationnelle a une brèche : $\\sqrt{2}$ vit **dehors** — le territoire continue au-delà de la carte.",
  },
  keyIdea: "Décomposer en **facteurs premiers** ($60 = 2^2 \\times 3 \\times 5$), barrer les atomes communs : la fraction devient **irréductible** — plus aucun diviseur commun, garanti.",
  why:
    "Pourquoi exiger l'irréductible, puisque $\\frac{60}{84}$ et $\\frac{5}{7}$ sont le même nombre ? Pour la même raison qu'on range : la forme irréductible est l'**identifiant unique** du rationnel — deux fractions irréductibles différentes sont des nombres différents, ce qui n'est vrai d'aucune autre écriture. Comparer, reconnaître, communiquer : tout est plus sûr sur la forme canonique — et les facteurs premiers, atomes de la multiplication, sont les juges de paix.",
  examples: [
    { title: "60/84 d'un coup", steps: [
      { p: "$60 = 2^2 \\times 3 \\times 5$ ; $84 = 2^2 \\times 3 \\times 7$ — les atomes communs : $2^2 \\times 3$." },
      { p: "Reste $\\dfrac{5}{7}$ : irréductible, et certifié — 5 et 7 sont premiers entre eux." },
    ] },
    { title: "L'arbre des facteurs", steps: [
      { p: "$84 \\to 2 \\times 42 \\to 2 \\times 2 \\times 21 \\to 2^2 \\times 3 \\times 7$." },
      { p: "Diviser par 2, puis 3, puis 5, puis 7… jusqu'aux atomes : la décomposition est unique." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décompose 60 en produit de facteurs premiers, par divisions successives.", solution: "$60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2^2 \\times 3 \\times 5$ — diviser par les premiers, du plus petit au plus grand, jusqu'à épuisement." },
    { tier: "warmup", prompt: "Rends $\\dfrac{60}{84}$ irréductible par les décompositions.", solution: "$\\dfrac{2^2 \\times 3 \\times 5}{2^2 \\times 3 \\times 7}$ : barre $2^2 \\times 3$ → $\\dfrac{5}{7}$ — irréductible d'un seul geste." },
    { tier: "application", prompt: "Rends irréductibles : $\\dfrac{15}{35}$ ; $\\dfrac{63}{14}$ ; $\\dfrac{36}{48}$.", solution: "$\\dfrac{3}{7}$ (÷5) ; $\\dfrac{9}{2}$ (÷7) ; $\\dfrac{3}{4}$ ($36 = 2^2 \\times 3^2$, $48 = 2^4 \\times 3$ : barre $2^2 \\times 3$) — les tables ou les atomes, même verdict." },
    { tier: "challenge", prompt: "Comment être certain que $\\dfrac{5}{7}$ est irréductible sans essayer tous les diviseurs ?", solution: "5 et 7 sont **premiers** (et distincts) : leurs décompositions n'ont aucun atome commun — aucune simplification possible. Les facteurs premiers certifient ce que les essais ne font que suggérer." },
    { tier: "exam", prompt: "Place les nombres $7$ ; $-3$ ; $2{,}5$ ; $\\dfrac{5}{7}$ ; $\\sqrt{2}$ dans les familles : entiers naturels, entiers relatifs, décimaux, rationnels. Qui reste dehors ?", solution: "$7$ : naturel (donc relatif, décimal, rationnel) ; $-3$ : relatif (et décimal, rationnel) ; $2{,}5$ : décimal (et rationnel : $\\frac{5}{2}$) ; $\\dfrac{5}{7}$ : rationnel seulement (son écriture décimale ne s'arrête pas) ; $\\sqrt{2}$ : **dehors** — irrationnel, démontré en 4e. Quatre poupées russes emboîtées, et un territoire au-delà : la carte des nombres du collège." },
  ],
  practice: [
    { tier: "warmup", label: "Compter un atome", make: (r) => {
      const e2 = randint(r, 1, 3); const e3 = randint(r, 0, 2); const e5 = randint(r, 0, 1);
      const n = 2 ** e2 * 3 ** e3 * 5 ** e5;
      return { prompt: `Dans la décomposition de ${n} en facteurs premiers, quel est l'exposant de 2 ?`, answer: e2, solution: `$${n} = 2^{${e2}}${e3 ? " \\times 3" + (e3 > 1 ? "^{" + e3 + "}" : "") : ""}${e5 ? " \\times 5" : ""}$ — exposant **${e2}**.` };
    } },
    { tier: "application", label: "Rendre irréductible", make: (r) => {
      const k = pick(r, [4, 6, 10, 12, 14]); const couples = [[2, 3], [3, 4], [2, 5], [3, 5], [5, 7], [4, 7]];
      const [a, b] = pick(r, couples);
      return { prompt: `Rends $\\frac{${a * k}}{${b * k}}$ irréductible. Réponds par le numérateur.`, answer: a, solution: `Diviser les deux par ${k} : $\\frac{${a}}{${b}}$ — numérateur **${a}**, et ${a} et ${b} n'ont plus d'atome commun.` };
    } },
  ],
};

// — Negative exponents (programme: exposants négatifs, diviser des puissances) —
const exposantsNegatifs = {
  id: "numbers.middle.exposants-negatifs",
  level: "middle", domain: "numbers",
  title: "Les exposants négatifs",
  tagline: "a⁻ⁿ = 1/aⁿ — la division de puissances l'exigeait.",
  prereqs: ["numbers.middle.puissances-exposants", "numbers.middle.fractions-division"],
  intuition:
    "Diviser des puissances de même base : les facteurs se barrent — $\\dfrac{a^5}{a^2} = a^{5-2} = a^3$ : les exposants se **soustraient**.\n\nMais $\\dfrac{a^2}{a^5}$ ? La règle exige $a^{2-5} = a^{-3}$… et le calcul direct donne $\\dfrac{1}{a^3}$. La définition s'impose : $a^{-n} = \\dfrac{1}{a^n}$ — l'exposant négatif est un **inverse**.",
  depths: {
    discovery:
      "**Avec les mains** : barre les facteurs — $\\dfrac{a \\times a}{a \\times a \\times a \\times a \\times a}$ : deux paires s'annulent, il reste **trois** facteurs $a$ au dénominateur : $\\dfrac{1}{a^3}$. La règle de soustraction dit $a^{-3}$ : les deux écritures désignent le même nombre, donc $a^{-3} = \\dfrac{1}{a^3}$ — comme la règle des signes de 4e, la définition n'est pas un choix : c'est le prix de la cohérence.",
    standard:
      "**En image** : les puissances de 10 descendent l'escalier — $10^2 = 100$, $10^1 = 10$, $10^0 = 1$ (!), $10^{-1} = 0{,}1$, $10^{-2} = 0{,}01$ : chaque marche **divise par 10**, et l'exposant négatif compte les rangs après la virgule. Le $10^0 = 1$ surprend ? C'est la marche entre 10 et 0,1 — et $\\frac{a^n}{a^n} = a^0 = 1$ le confirme : tout nombre (non nul) à la puissance 0 vaut 1.",
    advanced:
      "**Dans la tête** : toutes les règles de 4e survivent, étendues — $a^m \\times a^n = a^{m+n}$ et $\\dfrac{a^m}{a^n} = a^{m-n}$ pour **tous** les exposants relatifs : $10^3 \\times 10^{-5} = 10^{-2}$, $\\dfrac{2^{-1}}{2^{-4}} = 2^3 = 8$. Les exposants vivent leur vie d'entiers relatifs (ta 5e !) pendant que les puissances se multiplient : c'est un dictionnaire entre deux mondes — additionner en haut, multiplier en bas — et ce dictionnaire, poussé plus loin, deviendra les logarithmes du lycée.",
  },
  keyIdea: "$a^{-n} = \\dfrac{1}{a^n}$ (l'inverse) et $a^0 = 1$. Diviser : $\\dfrac{a^m}{a^n} = a^{m-n}$ — les exposants sont des relatifs à part entière.",
  why:
    "Pourquoi définir $a^{-3}$ plutôt qu'interdire la division « impossible » ? Parce que les mathématiques préfèrent **étendre** qu'interdire — chaque fois qu'une règle bute (soustraire trop, diviser sans reste, soustraire des exposants…), on invente le nombre qui la sauve : relatifs, fractions, et maintenant exposants négatifs. La règle $a^{m-n}$ valait trop cher pour l'abandonner ; la définition $\\frac{1}{a^n}$ est sa rançon — et l'infiniment petit y gagne une écriture.",
  examples: [
    { title: "La division qui force tout", steps: [
      { p: "$\\dfrac{a^2}{a^5}$ : barre deux paires — reste $\\dfrac{1}{a^3}$. La règle dit $a^{2-5} = a^{-3}$." },
      { p: "Donc $a^{-3} = \\dfrac{1}{a^3}$ — la cohérence a tranché." },
    ] },
    { title: "L'escalier du dix", steps: [
      { p: "$10^2 = 100 \\to 10^1 = 10 \\to 10^0 = 1 \\to 10^{-1} = 0{,}1 \\to 10^{-2} = 0{,}01$." },
      { p: "Chaque marche divise par 10 — l'exposant négatif compte les rangs décimaux." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\dfrac{a^2}{a^5}$ en barrant les facteurs, puis avec la règle des exposants. Conclus.", solution: "Barrage : $\\dfrac{1}{a^3}$ ; règle : $a^{2-5} = a^{-3}$ — même nombre, donc $a^{-3} = \\dfrac{1}{a^3}$ : l'exposant négatif est forcé par la cohérence, pas décrété." },
    { tier: "warmup", prompt: "Écris sans exposant négatif : $2^{-3}$ ; $10^{-2}$ ; $5^{-1}$.", solution: "$\\dfrac{1}{2^3} = \\dfrac{1}{8}$ ; $\\dfrac{1}{100} = 0{,}01$ ; $\\dfrac{1}{5} = 0{,}2$ — l'inverse de la puissance positive." },
    { tier: "application", prompt: "Écris sous une seule puissance : $\\dfrac{10^3}{10^7}$ ; $10^3 \\times 10^{-5}$ ; $\\dfrac{2^{-1}}{2^{-4}}$.", solution: "$10^{-4}$ ; $10^{-2}$ ; $2^{-1-(-4)} = 2^3 = 8$ — soustraire et additionner des **relatifs** : tes règles de 5e pilotent les exposants." },
    { tier: "challenge", prompt: "Que vaut $7^0$ ? Justifie avec la division $\\dfrac{7^n}{7^n}$.", solution: "$\\dfrac{7^n}{7^n} = 1$ (un nombre divisé par lui-même) et $= 7^{n-n} = 7^0$ par la règle : donc $7^0 = $ **1** — la marche de l'escalier entre $7$ et $\\frac{1}{7}$, imposée par la cohérence." },
    { tier: "exam", prompt: "Un bactériophage mesure environ $10^{-7}$ m, une bactérie $10^{-6}$ m. Laquelle est la plus grande, et combien de fois ? Que représente l'exposant négatif ici ?", solution: "La **bactérie** : $\\dfrac{10^{-6}}{10^{-7}} = 10^{-6-(-7)} = 10^1 = $ **10 fois** plus grande. L'exposant négatif compte les rangs sous l'unité ($10^{-6} = 0{,}000\\,001$ m, un millionième) — c'est l'écriture de l'infiniment petit, et la division de puissances compare les échelles sans poser un seul zéro." },
  ],
  practice: [
    { tier: "warmup", label: "L'inverse caché", make: (r) => {
      const a = pick(r, [2, 3, 5, 10]); const n = randint(r, 1, 3);
      return { prompt: `Écris $${a}^{-${n}}$ sous forme de fraction $\\frac{1}{?}$ : quel dénominateur ?`, answer: a ** n, solution: `$${a}^{-${n}} = \\dfrac{1}{${a}^{${n}}} = \\dfrac{1}{${a ** n}}$ — dénominateur **${a ** n}**.` };
    } },
    { tier: "application", label: "Soustraire les exposants", make: (r) => {
      const m = randint(r, -4, 5); const n = randint(r, -4, 5);
      return { prompt: `$\\dfrac{10^{${m}}}{10^{${n}}} = 10^{?}$ : quel exposant ?`, answer: m - n, solution: `$${m} - (${n}) = $ **${m - n}** — la soustraction de relatifs aux commandes.` };
    } },
  ],
};

// — Scientific notation (programme: notation scientifique, problèmes) —
const notationScientifique = {
  id: "numbers.middle.notation-scientifique",
  level: "middle", domain: "numbers",
  title: "La notation scientifique",
  tagline: "a × 10ⁿ — de l'atome à la galaxie sur une seule ligne.",
  prereqs: ["numbers.middle.exposants-negatifs"],
  intuition:
    "La distance Terre-Soleil : $149\\,600\\,000\\,000$ m. La taille d'un atome : $0{,}000\\,000\\,000\\,1$ m. Les zéros noient l'information.\n\nLa **notation scientifique** la sauve : $a \\times 10^n$ avec $1 \\leq a < 10$ — un seul chiffre avant la virgule, l'exposant porte l'échelle : $1{,}496 \\times 10^{11}$ m et $1 \\times 10^{-10}$ m.",
  depths: {
    discovery:
      "**Avec les mains** : convertir, c'est déplacer la virgule en comptant — $3\\,200\\,000 = 3{,}2 \\times 10^6$ (la virgule recule de 6 rangs) ; $0{,}000\\,45 = 4{,}5 \\times 10^{-4}$ (elle avance de 4). Le test du format : un seul chiffre non nul avant la virgule — $32 \\times 10^5$ est juste mais n'est **pas** scientifique.",
    standard:
      "**En image** : comparer devient instantané — $7 \\times 10^8$ contre $2 \\times 10^9$ ? L'exposant tranche d'abord : $10^9$ gagne (le 2 bat le 7, car il joue une division plus haut). Et calculer suit les règles de puissances : $(3 \\times 10^5) \\times (2 \\times 10^{-2}) = 6 \\times 10^3$ — les nombres entre eux, les dix entre eux.",
    advanced:
      "**Dans la tête** : l'**ordre de grandeur** est la pensée du physicien — la Terre pèse $\\approx 6 \\times 10^{24}$ kg, toi $\\approx 6 \\times 10^1$ : le rapport, $10^{23}$, se lit dans les exposants seuls. L'humanité a toujours buté sur ces nombres : le scribe du papyrus de Rhind (-1550) alignait ses fractions, Sissa ruinait son roi avec $2^{63}$ grains — la notation scientifique est l'invention qui rend l'inimaginable **calculable** : 41 chiffres deviennent deux nombres et un exposant.",
  },
  keyIdea: "$a \\times 10^n$ avec $1 \\leq a < 10$ : un chiffre avant la virgule, l'exposant dit l'échelle. Comparer : l'exposant d'abord ; calculer : les nombres entre eux, les puissances entre elles.",
  why:
    "Pourquoi un format imposé, puisque $32 \\times 10^5$ est juste ? Parce qu'un **standard** rend les nombres comparables d'un regard : en notation scientifique, plus grand exposant = plus grand nombre, point. C'est la langue commune de la science mondiale — l'astronome, le chimiste et ta calculatrice (qui affiche 3.2E6) la parlent — et toute langue commune vaut par sa grammaire stricte.",
  examples: [
    { title: "Convertir dans les deux sens", steps: [
      { p: "$3\\,200\\,000 = 3{,}2 \\times 10^6$ — la virgule recule de six rangs." },
      { p: "$0{,}000\\,45 = 4{,}5 \\times 10^{-4}$ — elle avance de quatre : l'exposant compte les pas." },
    ] },
    { title: "Calculer en deux colonnes", steps: [
      { p: "$(3 \\times 10^5) \\times (2 \\times 10^{-2})$ : nombres $3 \\times 2 = 6$ ; dix $10^{5+(-2)} = 10^3$." },
      { p: "$= 6 \\times 10^3 = 6\\,000$ — chaque colonne suit ses propres règles." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris en notation scientifique : $3\\,200\\,000$ et $0{,}000\\,45$. Quelle est la règle sur $a$ ?", solution: "$3{,}2 \\times 10^6$ et $4{,}5 \\times 10^{-4}$ — la règle : $1 \\leq a < 10$, un **seul** chiffre non nul avant la virgule ; l'exposant compte les déplacements." },
    { tier: "warmup", prompt: "Parmi $32 \\times 10^5$, $3{,}2 \\times 10^6$, $0{,}32 \\times 10^7$ : lesquels valent le même nombre, et lequel est en notation scientifique ?", solution: "**Tous trois** valent $3\\,200\\,000$ — mais seul $3{,}2 \\times 10^6$ respecte $1 \\leq a < 10$ : le format est une grammaire, pas une valeur." },
    { tier: "application", prompt: "Compare $7 \\times 10^8$ et $2 \\times 10^9$ sans les développer.", solution: "$2 \\times 10^9$ est le plus grand : son **exposant** domine ($10^9 = 10 \\times 10^8$, donc $2 \\times 10^9 = 20 \\times 10^8 > 7 \\times 10^8$) — en notation scientifique, l'exposant tranche avant le nombre." },
    { tier: "challenge", prompt: "Calcule $(3 \\times 10^5) \\times (2 \\times 10^{-2})$ et donne le résultat en notation scientifique puis en écriture décimale.", solution: "Nombres : $6$ ; puissances : $10^{5-2} = 10^3$ → $6 \\times 10^3 = $ **6 000** — deux colonnes, deux règles, un résultat." },
    { tier: "exam", prompt: "La lumière parcourt $3 \\times 10^8$ m/s. Le Soleil est à $1{,}5 \\times 10^{11}$ m. Combien de temps met sa lumière à nous parvenir ? Donne le calcul en notation scientifique puis le résultat en secondes et en minutes.", solution: "$t = \\dfrac{1{,}5 \\times 10^{11}}{3 \\times 10^8} = \\dfrac{1{,}5}{3} \\times 10^{11-8} = 0{,}5 \\times 10^3 = 5 \\times 10^2 = $ **500 s**, soit environ **8 min 20 s** — le lever de soleil que tu regardes a huit minutes d'âge : la notation scientifique divise des immensités en une ligne." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les rangs", make: (r) => {
      const a = pick(r, [1.5, 2.4, 3.2, 6.1, 7.5]); const n = randint(r, 3, 8);
      return { prompt: `$${String(a).replace(".", ",")} \\times 10^{${n}}$ : combien de chiffres avant la virgule en écriture décimale ?`, answer: n + 1, solution: `L'exposant ${n} décale de ${n} rangs : **${n + 1}** chiffres avant la virgule ($${String(a * 10 ** n).toLocaleString("fr-FR").replace(/\u202f/g, "\\,")}$).` };
    } },
    { tier: "application", label: "Le bon exposant", make: (r) => {
      const a = pick(r, [2, 3, 5, 7]); const n = randint(r, 2, 6); const neg = r() < 0.4;
      const val = neg ? a / 10 ** n : a * 10 ** n;
      return { prompt: `Écris $${neg ? String(val).replace(".", ",") : val.toLocaleString("fr-FR").replace(/\u202f/g, " ")}$ en notation scientifique $${a} \\times 10^{?}$ : quel exposant ?`, answer: neg ? -n : n, solution: `La virgule se déplace de ${n} rangs ${neg ? "vers la droite : exposant **−" + n + "**" : "vers la gauche : exposant **" + n + "**"}.` };
    } },
    { tier: "challenge", label: "Deux colonnes", make: (r) => {
      const a = pick(r, [2, 3, 4]); const b = pick(r, [2, 3]); const m = randint(r, 2, 6); const n = randint(r, -4, 4);
      return { prompt: `$(${a} \\times 10^{${m}}) \\times (${b} \\times 10^{${n}}) = ${a * b} \\times 10^{?}$ : quel exposant ?`, answer: m + n, solution: `Les dix s'additionnent : $${m} + (${n}) = $ **${m + n}**.` };
    } },
  ],
};

export default [irreductible, exposantsNegatifs, notationScientifique];
