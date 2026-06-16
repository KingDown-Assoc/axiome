// Field "Numbers" — PRIMARY module (CM2 year), part 1: numbers. Official cycle-3
// programme (2025): integers to 999 999 999 (millions class), all divisors of n ≤ 30,
// common divisors (≤ 30) and common multiples (< 15) in service of fractions,
// fractions with denominators ≤ 60 compared/added via compatible denominators,
// integer × fraction products, non-unit fraction operators (deux tiers de 12 €),
// and decimals extended to thousandths. Crossed with Singapore P5.
import { randint, pick } from "../../core/exercises.js";

// — Numbers to 999 999 999 (programme: millions, dizaines et centaines de millions) —
const toBillion = {
  id: "numbers.primary.to-billion",
  level: "primary", domain: "numbers",
  title: "Les nombres jusqu'à 999 999 999",
  tagline: "La classe des millions : neuf chiffres, trois classes, un même principe.",
  prereqs: ["numbers.primary.to-999999"],
  intuition:
    "Trois rangs nouveaux d'un coup : les **millions**, les dizaines de millions, les centaines de millions. Neuf chiffres au total — et toujours le même secret : les classes de trois.\n\n47 258 396 se lit classe par classe : 47 (millions) 258 (mille) 396 — « quarante-sept-millions-deux-cent-cinquante-huit-mille-trois-cent-quatre-vingt-seize ».",
  depths: {
    discovery:
      "**Avec les mains** : les millions se touchent mal — alors on les **estime** : un million de secondes ≈ 11 jours et demi ; la France compte environ 68 millions d'habitants. Donner corps aux grands nombres, c'est déjà les comprendre.",
    standard:
      "**En image** : trois classes empilées — unités, mille, millions — chacune lue comme un nombre de 1 à 999. Comparer suit la règle éternelle : d'abord le **nombre de chiffres** (8 chiffres < 9 chiffres), puis rang par rang depuis la gauche. La demi-droite se gradue en millions.",
    advanced:
      "**Dans la tête** : la valeur positionnelle ne flanche pas — dans 47 258 396, le 7 vaut **7 000 000**. Et les décompositions s'étagent : $47\\,258\\,396 = (47 \\times 1\\,000\\,000) + (258 \\times 1\\,000) + 396$. La classe des milliards attend en coulisses — mais la machine, elle, est déjà complète : tu sais lire l'infini par paquets de trois.",
  },
  keyIdea: "Trois classes : **millions | mille | unités** — chacune se lit de 1 à 999. Neuf chiffres, zéro idée neuve.",
  why:
    "Pourquoi a-t-on besoin de si grands nombres ? Parce que le monde les fournit : populations, distances spatiales, budgets. Le kilomètre Terre-Lune (384 400 km), les 68 millions de Français — sans la classe des millions, ces réalités resteraient illisibles. Les nombres grandissent avec les questions qu'on pose.",
  widgets: [
    { kind: "odometer", params: { value: 47258396 }, caption: "Huit roues — la classe des millions (47), la classe des mille (258), les unités (396)." },
  ],
  examples: [
    { title: "Lire 47 258 396", steps: [
      { p: "Classe des millions : 47. Classe des mille : 258. Unités : 396." },
      { p: "« Quarante-sept-millions-deux-cent-cinquante-huit-mille-trois-cent-quatre-vingt-seize. »" },
    ] },
    { title: "Comparer 99 854 720 et 102 040 318", steps: [
      { p: "Huit chiffres contre neuf : le second l'emporte avant tout examen." },
      { p: "$99\\,854\\,720 < 102\\,040\\,318$ — le nombre de chiffres tranche d'abord." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment s'appelle la troisième classe, après les unités et les mille ?", solution: "La classe des **millions** — millions, dizaines de millions, centaines de millions : trois rangs de plus." },
    { tier: "warmup", prompt: "Écris en chiffres : « trois-millions-quarante-mille-deux-cents ».", solution: "3 (millions) 040 (mille) 200 → **3 040 200** — les zéros tiennent les places des classes." },
    { tier: "application", prompt: "Dans 47 258 396, que vaut le chiffre 7 ? Et le chiffre 2 (le premier) ?", solution: "Le 7 : **7 000 000** (millions). Le premier 2 : **200 000** (centaines de milliers)." },
    { tier: "challenge", prompt: "Range : 102 040 318 ; 99 854 720 ; 102 004 318.", solution: "**99 854 720 < 102 004 318 < 102 040 318** — huit chiffres d'abord, puis rang par rang (le 4 contre le 0 des dizaines de milliers départage les jumeaux)." },
    { tier: "exam", prompt: "La France compte environ 68 millions d'habitants ; l'Allemagne environ 84 millions. Écris ces nombres en chiffres et calcule l'écart.", solution: "$68\\,000\\,000$ et $84\\,000\\,000$ ; écart : $84 - 68 = 16$ millions → **16 000 000 habitants** — on calcule sur les classes." },
  ],
  practice: [
    { tier: "warmup", label: "Les classes en chiffres", make: (r) => {
      const m = randint(r, 2, 99), k = randint(r, 1, 999);
      return { prompt: `${m} millions et ${k} milliers : quel nombre ?`, answer: m * 1000000 + k * 1000, solution: `$${m} \\times 1\\,000\\,000 + ${k} \\times 1\\,000 = $ **${m * 1000000 + k * 1000}**.` };
    } },
    { tier: "application", label: "La valeur du chiffre", make: (r) => {
      const d = randint(r, 1, 9); const rang = pick(r, [[1000000, "millions"], [10000000, "dizaines de millions"]]);
      const reste = randint(r, 1111, 999999);
      return { prompt: `Dans ${d * rang[0] + reste}, que vaut le chiffre ${d} (au rang des ${rang[1]}) ?`, answer: d * rang[0], solution: `${d} au rang des ${rang[1]} : **${d * rang[0]}**.` };
    } },
  ],
};

// — Common divisors and multiples (programme: tous les diviseurs ≤ 30, communs, en vue des fractions) —
const divisorsCommon = {
  id: "numbers.primary.divisors-common",
  level: "primary", domain: "numbers",
  title: "Diviseurs communs, multiples communs",
  tagline: "Lister tous les diviseurs — et trouver ceux que deux nombres partagent.",
  prereqs: ["numbers.primary.multiples"],
  intuition:
    "Un nombre a une **collection** de diviseurs : ceux de 12 sont 1, 2, 3, 4, 6 et 12. Pour les attraper tous, le truc des **paires** : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$ — chaque produit livre deux diviseurs d'un coup.\n\nEt deux nombres peuvent **partager** des diviseurs : 12 et 18 ont en commun 1, 2, 3 et 6. Ces diviseurs communs (et les multiples communs) seront tes outils pour apprivoiser les fractions.",
  depths: {
    discovery:
      "**Avec les mains** : 12 jetons — quels rectangles parfaits ? $1 \\times 12$, $2 \\times 6$, $3 \\times 4$ : chaque rectangle révèle une paire de diviseurs. 13 jetons : seul $1 \\times 13$ marche — certains nombres sont avares de diviseurs.",
    standard:
      "**En image** : pour les diviseurs **communs**, deux listes côte à côte — div(12) = {1, 2, 3, 4, 6, 12}, div(18) = {1, 2, 3, 6, 9, 18} : en commun, **1, 2, 3, 6**. Pour les multiples communs, deux suites qui défilent — 4, 8, **12**, 16, 20, **24**… et 6, **12**, 18, **24**… : 12, 24, 36 sont au rendez-vous (le premier, 12, est le plus précieux).",
    advanced:
      "**Dans la tête** : à quoi bon ? Aux **fractions** ! Comparer $\\frac{5}{6}$ et $\\frac{3}{4}$ exige un dénominateur de rencontre — un multiple commun de 6 et 4 : douze. Et 6, diviseur commun de 12 et 18, simplifiera des rapports. Ce chapitre fabrique les clés ; la porte des fractions s'ouvre à la leçon suivante.",
  },
  keyIdea: "Les paires de produits livrent **tous** les diviseurs. Diviseurs **communs** : l'intersection des deux listes ; multiples communs : le rendez-vous des deux suites.",
  why:
    "Pourquoi le 1 est-il diviseur de tout le monde, et chaque nombre diviseur de lui-même ? Parce que $1 \\times n = n$, toujours. Ces deux diviseurs « gratuits » bornent la collection — et entre eux se cache la personnalité du nombre : 12 en a six, 13 n'en a que deux. (Ces nombres à deux diviseurs ont un nom célèbre… patience, le collège arrive.)",
  examples: [
    { title: "Tous les diviseurs de 12", steps: [
      { p: "Les paires : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$ — et 4 × 3 répèterait." },
      { p: "Collection complète : **1, 2, 3, 4, 6, 12** — six diviseurs." },
    ] },
    { title: "Le rendez-vous de 4 et 6", steps: [
      { p: "Multiples de 4 : 4, 8, 12, 16, 20, 24… Multiples de 6 : 6, 12, 18, 24…" },
      { p: "Communs : **12, 24, 36…** — le premier rendez-vous est 12." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment être sûr d'avoir trouvé tous les diviseurs de 12 ?", solution: "Par les **paires** : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$ — quand les deux facteurs se croisent, la collection est complète : 1, 2, 3, 4, 6, 12." },
    { tier: "warmup", prompt: "Liste tous les diviseurs de 18, puis de 30.", solution: "18 : **1, 2, 3, 6, 9, 18** ($1{\\times}18$, $2{\\times}9$, $3{\\times}6$). 30 : **1, 2, 3, 5, 6, 10, 15, 30**." },
    { tier: "application", prompt: "Quels sont les diviseurs communs de 12 et 18 ?", solution: "div(12) = {1, 2, 3, 4, 6, 12}, div(18) = {1, 2, 3, 6, 9, 18} → communs : **1, 2, 3, 6**." },
    { tier: "challenge", prompt: "Trouve le plus petit multiple commun (non nul) de 4 et de 6.", solution: "4, 8, **12**… et 6, **12**… → **12** — le premier rendez-vous des deux tables." },
    { tier: "exam", prompt: "Deux guirlandes clignotent, l'une toutes les 4 secondes, l'autre toutes les 6. Elles viennent de clignoter ensemble : dans combien de secondes le referont-elles ?", solution: "Au premier multiple commun : **12 secondes** — les multiples communs sont des rendez-vous." },
  ],
  practice: [
    { tier: "application", label: "Compter les diviseurs", make: (r) => {
      const data = pick(r, [[12, 6], [18, 6], [16, 5], [20, 6], [24, 8], [30, 8], [25, 3], [28, 6]]);
      return { prompt: `Combien de diviseurs possède ${data[0]} ? (liste-les par paires)`, answer: data[1], solution: `Les paires de produits donnent **${data[1]} diviseurs** pour ${data[0]}.` };
    } },
    { tier: "challenge", label: "Le premier rendez-vous", make: (r) => {
      const pairs = pick(r, [[4, 6, 12], [6, 8, 24], [3, 5, 15], [4, 10, 20], [6, 9, 18], [8, 12, 24]]);
      return { prompt: `Quel est le plus petit multiple commun (non nul) de ${pairs[0]} et ${pairs[1]} ?`, answer: pairs[2], solution: `Les suites se croisent d'abord en **${pairs[2]}**.` };
    } },
  ],
};

// — Fractions with compatible denominators (programme: dén ≤ 60, comparaison, ± via le commun) —
const fractionsCommon = {
  id: "numbers.primary.fractions-common",
  level: "primary", domain: "numbers",
  title: "Fractions : le dénominateur de rencontre",
  tagline: "Comparer et additionner des fractions qui ne parlent pas la même langue.",
  prereqs: ["numbers.primary.fractions-mixed", "numbers.primary.divisors-common"],
  intuition:
    "$\\frac{5}{6} + \\frac{1}{3}$ : des sixièmes et des tiers — deux langues. Mais 3 **divise** 6 : un tiers se traduit en deux sixièmes ($\\frac{1}{3} = \\frac{2}{6}$), et l'addition redevient familière : $\\frac{5}{6} + \\frac{2}{6} = \\frac{7}{6}$.\n\nLe **dénominateur de rencontre** — un multiple commun des deux dénominateurs — met tout le monde d'accord. Au CM2, les dénominateurs grimpent jusqu'à 60.",
  depths: {
    discovery:
      "**Avec les mains** : la bande en tiers posée sur la bande en sixièmes — chaque tiers couvre exactement **deux** sixièmes : la traduction se voit avant de se calculer.",
    standard:
      "**En image** : comparer suit le même chemin — $\\frac{5}{6}$ et $\\frac{3}{4}$ ? Rendez-vous en douzièmes (12 = premier multiple commun de 6 et 4) : $\\frac{5}{6} = \\frac{10}{12}$ et $\\frac{3}{4} = \\frac{9}{12}$ → $\\frac{5}{6} > \\frac{3}{4}$. La règle des égalités du CE2 fait la traduction ; les multiples communs choisissent la salle de réunion.",
    advanced:
      "**Dans la tête** : la soustraction suit ($\\frac{5}{6} - \\frac{1}{3} = \\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6}$ — la moitié !), et les fractions dépassant 1 se rangent comme au CM1. Tout l'art tient en deux questions : *quel multiple commun ?* puis *combien de fois chaque dénominateur y entre-t-il ?* Les diviseurs et multiples de la leçon précédente n'étaient pas un détour — c'étaient les clés.",
  },
  keyIdea: "Traduire au **dénominateur de rencontre** (un multiple commun), puis comparer ou additionner les numérateurs — la langue commune d'abord.",
  why:
    "Pourquoi ne peut-on pas additionner les numérateurs ET les dénominateurs ($\\frac{5}{6} + \\frac{1}{3} = \\frac{6}{9}$ ?) ? Vérifie : $\\frac{6}{9} = \\frac{2}{3}$, plus petit que $\\frac{5}{6}$ tout seul — additionner aurait rapetissé ! Les dénominateurs ne se cumulent pas : ils **nomment la taille des parts**. On n'additionne que des parts de même taille — d'où la traduction obligatoire.",
  examples: [
    { title: "Additionner sixièmes et tiers", steps: [
      { p: "3 divise 6 : $\\frac{1}{3} = \\frac{2}{6}$ (parts deux fois plus petites, deux fois plus de parts)." },
      { p: "$\\frac{5}{6} + \\frac{2}{6} = \\frac{7}{6} = 1 + \\frac{1}{6}$." },
    ] },
    { title: "Comparer 5/6 et 3/4", steps: [
      { p: "Rendez-vous en douzièmes : $\\frac{5}{6} = \\frac{10}{12}$, $\\frac{3}{4} = \\frac{9}{12}$." },
      { p: "$10 > 9$ : $\\frac{5}{6} > \\frac{3}{4}$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi ne peut-on pas calculer $\\frac{5}{6} + \\frac{1}{3}$ directement ?", solution: "Les parts n'ont pas la **même taille** — des sixièmes et des tiers. Il faut d'abord traduire : $\\frac{1}{3} = \\frac{2}{6}$, puis additionner des parts identiques." },
    { tier: "warmup", prompt: "Calcule $\\frac{5}{6} + \\frac{1}{3}$.", solution: "$\\frac{1}{3} = \\frac{2}{6}$, donc $\\frac{5}{6} + \\frac{2}{6} = \\frac{7}{6}$, c'est-à-dire $1 + \\frac{1}{6}$." },
    { tier: "application", prompt: "Compare $\\frac{5}{6}$ et $\\frac{3}{4}$ en passant par les douzièmes.", solution: "$\\frac{10}{12}$ contre $\\frac{9}{12}$ : $\\frac{5}{6} > \\frac{3}{4}$ — le multiple commun de 6 et 4 sert de salle de réunion." },
    { tier: "challenge", prompt: "Calcule $\\frac{5}{6} - \\frac{1}{3}$ et simplifie le résultat.", solution: "$\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$ — trois sixièmes, c'est la moitié." },
    { tier: "exam", prompt: "Lina affirme : $\\frac{1}{4} + \\frac{1}{4} = \\frac{2}{8}$. Réfute avec un dessin de tarte.", solution: "Deux quarts de tarte font une **demi**-tarte, pas $\\frac{2}{8}$ ($= \\frac{1}{4}$ !). On additionne les **numérateurs** seuls : $\\frac{1}{4} + \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}$ — le dénominateur nomme la taille des parts, il ne se cumule pas." },
  ],
  practice: [
    { tier: "application", label: "Traduire puis additionner", make: (r) => {
      const b = pick(r, [3, 4, 5, 6]); const k = 2; const B = k * b;
      const a1 = randint(r, 1, B - 1), a2 = randint(r, 1, b - 1);
      return { prompt: `Calcule $\\frac{${a1}}{${B}} + \\frac{${a2}}{${b}}$. Réponds par le numérateur (en ${B === 6 ? "sixièmes" : B === 8 ? "huitièmes" : B === 10 ? "dixièmes" : "douzièmes"}).`, answer: a1 + k * a2, solution: `$\\frac{${a2}}{${b}} = \\frac{${k * a2}}{${B}}$, donc $\\frac{${a1}}{${B}} + \\frac{${k * a2}}{${B}} = \\frac{${a1 + k * a2}}{${B}}$ → **${a1 + k * a2}**.` };
    } },
  ],
};

// — Integer × fraction, non-unit operators (programme: produit, deux tiers de 12 €) —
const fractionTimes = {
  id: "numbers.primary.fraction-times",
  level: "primary", domain: "numbers",
  title: "Multiplier avec des fractions",
  tagline: "Trois fois deux cinquièmes — et les deux tiers de 12 euros.",
  prereqs: ["numbers.primary.fraction-of", "numbers.primary.fractions-common"],
  intuition:
    "Deux pouvoirs nouveaux. D'abord le **produit** : $3 \\times \\frac{2}{5}$, c'est trois fois deux cinquièmes — six cinquièmes : $\\frac{6}{5}$. On multiplie le numérateur, la taille des parts ne change pas.\n\nEnsuite l'opérateur grandit : au CM1, *un* tiers de 12 ; au CM2, **deux tiers de 12 €** — un tiers vaut 4 €, donc deux tiers valent $2 \\times 4 = 8$ €. Diviser, puis multiplier.",
  depths: {
    discovery:
      "**Avec les mains** : la barre de 12 € en trois parts — chaque part 4 €. « Deux tiers », c'est **deux parts** : 8 €. Le schéma rend la double opération évidente : couper d'abord, prendre ensuite.",
    standard:
      "**En image** : $\\frac{3}{4}$ de 100 m — un quart : $100 \\div 4 = 25$ m ; trois quarts : $3 \\times 25 = $ **75 m**. La recette en deux temps : *diviser par le dénominateur, multiplier par le numérateur*. Et le produit $n \\times \\frac{a}{b} = \\frac{n \\times a}{b}$ raconte la même histoire en symboles.",
    advanced:
      "**Dans la tête** : les deux pouvoirs n'en font qu'un — « $\\frac{2}{3}$ de 12 » et « $\\frac{2}{3} \\times 12$ » donnent le même 8 : $\\frac{2 \\times 12}{3} = \\frac{24}{3} = 8$. Le mot « de » et le signe « × » convergent : prendre une fraction de quelque chose, c'est **multiplier** par cette fraction. Cette identité, ici entrevue, deviendra la définition officielle au collège.",
  },
  keyIdea: "$n \\times \\frac{a}{b} = \\frac{n \\times a}{b}$ — et « $\\frac{a}{b}$ de $N$ » = diviser $N$ par $b$, puis multiplier par $a$.",
  why:
    "Pourquoi le dénominateur ne change-t-il pas dans $3 \\times \\frac{2}{5}$ ? Parce que multiplier répète : deux cinquièmes, encore deux, encore deux — six **cinquièmes**. La taille des parts est un nom, pas une quantité : trois sacs de deux pommes font six pommes, pas six « doubles-pommes ».",
  examples: [
    { title: "Trois fois deux cinquièmes", steps: [
      { p: "$3 \\times \\frac{2}{5} = \\frac{2}{5} + \\frac{2}{5} + \\frac{2}{5}$." },
      { p: "$= \\frac{6}{5} = 1 + \\frac{1}{5}$ — six parts d'un cinquième." },
    ] },
    { title: "Deux tiers de 12 €", steps: [
      { p: "Un tiers : $12 \\div 3 = 4$ €." },
      { p: "Deux tiers : $2 \\times 4 = $ **8 €** — couper, puis prendre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $3 \\times \\frac{2}{5}$ en l'écrivant comme une addition.", solution: "$\\frac{2}{5} + \\frac{2}{5} + \\frac{2}{5} = \\frac{6}{5}$ — le numérateur se multiplie, le dénominateur reste." },
    { tier: "warmup", prompt: "Calcule les deux tiers de 12 €.", solution: "Un tiers : $12 \\div 3 = 4$ € ; deux tiers : $2 \\times 4 = $ **8 €**." },
    { tier: "application", prompt: "Calcule les trois quarts de 100 mètres.", solution: "Un quart : $100 \\div 4 = 25$ m ; trois quarts : $3 \\times 25 = $ **75 m**." },
    { tier: "challenge", prompt: "Montre que « $\\frac{2}{3}$ de 12 » et « $\\frac{2}{3} \\times 12$ » donnent le même résultat.", solution: "De : $12 \\div 3 = 4$, puis $\\times 2 = 8$. Produit : $\\frac{2 \\times 12}{3} = \\frac{24}{3} = 8$ — le « de » et le « × » sont le même geste." },
    { tier: "exam", prompt: "Un réservoir de 60 L est rempli aux cinq sixièmes. Quel volume d'eau contient-il ?", solution: "Un sixième : $60 \\div 6 = 10$ L ; cinq sixièmes : $5 \\times 10 = $ **50 L** — vraisemblable pour un réservoir presque plein ✓." },
  ],
  practice: [
    { tier: "warmup", label: "Le produit", make: (r) => {
      const n = randint(r, 2, 6), a = randint(r, 2, 7), b = randint(r, 5, 12);
      return { prompt: `Calcule $${n} \\times \\frac{${a}}{${b}}$. Réponds par le numérateur (en ${b}èmes).`, answer: n * a, solution: `$${n} \\times \\frac{${a}}{${b}} = \\frac{${n * a}}{${b}}$ → numérateur **${n * a}**.` };
    } },
    { tier: "application", label: "L'opérateur complet", make: (r) => {
      const b = randint(r, 3, 8); const a = randint(r, 2, b - 1); const m = randint(r, 3, 12); const N = b * m;
      const noms = { 3: "tiers", 4: "quarts", 5: "cinquièmes", 6: "sixièmes", 7: "septièmes", 8: "huitièmes" };
      return { prompt: `Calcule les ${a} ${noms[b]} de ${N}.`, answer: a * m, solution: `Un ${noms[b].slice(0, -1)} : $${N} \\div ${b} = ${m}$ ; ${a} ${noms[b]} : $${a} \\times ${m} = $ **${a * m}**.` };
    } },
  ],
};

// — Thousandths (programme: l'étude des décimaux s'étend aux millièmes) —
const thousandths = {
  id: "numbers.primary.thousandths",
  level: "primary", domain: "numbers",
  title: "Les millièmes",
  tagline: "Un troisième chiffre après la virgule — le zoom continue.",
  prereqs: ["numbers.primary.decimals"],
  intuition:
    "Le zoom ne s'arrête pas aux centièmes : chaque centième se coupe en dix **millièmes** ($\\frac{1}{1000}$). Troisième chiffre après la virgule : $35{,}784 = 35 + \\frac{7}{10} + \\frac{8}{100} + \\frac{4}{1000}$.\n\nLa machine est la même — dix millièmes font un centième, mille millièmes font l'unité.",
  depths: {
    discovery:
      "**Avec les mains** : le millimètre porte bien son nom — c'est le **millième** du mètre : $1{,}784$ m = 1 m, 7 dm, 8 cm, 4 mm. Les millièmes se touchent du doigt sur le double-décimètre.",
    standard:
      "**En image** : tout l'acquis s'étend d'un rang — décomposer ($\\frac{3\\,517}{1\\,000} = 3 + \\frac{5}{10} + \\frac{1}{100} + \\frac{7}{1000}$), placer, comparer rang par rang. Le piège du CM1 s'aiguise : $0{,}8 > 0{,}75 > 0{,}748$ — huit dixièmes dominent, peu importe la longueur des écritures.",
    advanced:
      "**Dans la tête** : l'intercalation devient vertigineuse — entre $3{,}74$ et $3{,}75$, le zoom aux millièmes révèle $3{,}741$, $3{,}745$, $3{,}749$… Entre deux décimaux, **toujours** de la place : il suffit d'ajouter un rang. Cette idée — la droite se raffine sans fin — est l'une des plus profondes des mathématiques, et elle tient dans ton troisième chiffre.",
  },
  keyIdea: "$\\frac{10}{1000} = \\frac{1}{100}$ : le millième prolonge la machine d'un rang. Comparer reste **rang par rang**, jamais à la longueur.",
  why:
    "Pourquoi s'arrêter aux millièmes au CM2 ? On ne s'arrête pas — on **marque une étape**. La numération décimale n'a pas de dernier rang : dix-millièmes, cent-millièmes… attendent les mesures qui les réclameront (le chronomètre au centième, la balance au millième). Les rangs naissent des besoins.",
  examples: [
    { title: "Décoder 35,784", steps: [
      { p: "3 dizaines, 5 unités | 7 dixièmes, 8 centièmes, 4 millièmes." },
      { p: "$35{,}784 = 35 + \\frac{7}{10} + \\frac{8}{100} + \\frac{4}{1000}$." },
    ] },
    { title: "Intercaler entre 3,74 et 3,75", steps: [
      { p: "Zoom aux millièmes : $3{,}740$, $3{,}741$, …, $3{,}750$." },
      { p: "Par exemple **3,745** — neuf candidats rien qu'à ce rang." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de millièmes dans un centième ? Dans une unité ?", solution: "$\\frac{1}{100} = \\frac{10}{1000}$ : **dix**. Et $1 = \\frac{1000}{1000}$ : **mille** — la machine à dix, un rang plus bas." },
    { tier: "warmup", prompt: "Écris $3 + \\frac{5}{10} + \\frac{1}{100} + \\frac{7}{1000}$ avec une virgule.", solution: "**3,517** — chaque fraction à son rang." },
    { tier: "application", prompt: "Range : 0,8 ; 0,75 ; 0,748.", solution: "$0{,}8 = 0{,}800 > 0{,}750 > 0{,}748$ : **0,748 < 0,75 < 0,8** — les dixièmes commandent." },
    { tier: "challenge", prompt: "Intercale un nombre entre 3,74 et 3,75.", solution: "Zoom aux millièmes : **3,745** (ou 3,741, 3,749…) — il y a toujours de la place un rang plus bas." },
    { tier: "exam", prompt: "Exprime 1,784 m en mètres, décimètres, centimètres et millimètres, et explique le nom « millimètre ».", solution: "1 m, 7 dm, 8 cm, 4 mm — le millimètre est le **millième du mètre** : $\\frac{4}{1000}$ m = 4 mm. Les unités métriques incarnent les rangs décimaux." },
  ],
  practice: [
    { tier: "warmup", label: "Coder aux millièmes", make: (r) => {
      const e = randint(r, 1, 20), d = randint(r, 1, 9), c = randint(r, 0, 9), m = randint(r, 1, 9);
      return { prompt: `Écris $${e} + \\frac{${d}}{10} + \\frac{${c}}{100} + \\frac{${m}}{1000}$ en écriture à virgule.`, answer: e + d / 10 + c / 100 + m / 1000, solution: `**${e},${d}${c}${m}** — dixièmes, centièmes, millièmes, chacun à son rang.` };
    } },
    { tier: "application", label: "Millièmes ↔ centièmes", make: (r) => {
      const n = randint(r, 2, 9);
      return { prompt: `Combien de millièmes valent $\\frac{${n}}{100}$ ? (réponds par le numérateur)`, answer: 10 * n, solution: `$\\frac{${n}}{100} = \\frac{${10 * n}}{1000}$ : **${10 * n} millièmes**.` };
    } },
  ],
};

export default [toBillion, divisorsCommon, fractionsCommon, fractionTimes, thousandths];
