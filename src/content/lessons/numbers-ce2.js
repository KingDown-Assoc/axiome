// Field "Numbers" — PRIMARY module (CE2 year). Official cycle-2 programme (BO n°41, 31/10/2024):
// numbers to 10 000, column multiplication (P4), division sense with the ÷ sign (inverse of ×),
// fraction equalities and the fraction-graduated ruler, ×4/×8 by doubling, "fois plus" problems.
import { randint, pick } from "../../core/exercises.js";

// — Numbers to ten thousand (programme: le millier, six écritures, demi-droite de 1000 en 1000) —
const toTenThousand = {
  id: "numbers.primary.to-10000",
  level: "primary", domain: "numbers",
  title: "Les nombres jusqu'à dix-mille",
  tagline: "Le millier prend forme : un gros cube de mille petits cubes.",
  prereqs: ["numbers.primary.to-1000"],
  intuition:
    "Dix plaques de cent s'empilent : voici le **cube de mille** — le millier a un corps. Avec lui, les nombres filent jusqu'à **dix-mille**.\n\n4 635, c'est quatre gros cubes, six plaques, trois barres, cinq petits cubes : « quatre-mille-six-cent-trente-cinq ». Et toujours les écritures multiples : $4\\,000 + 600 + 30 + 5$, ou $(4 \\times 1\\,000) + (6 \\times 100) + (3 \\times 10) + (5 \\times 1)$.",
  depths: {
    discovery:
      "**Avec les mains** : je dénombre en organisant par milliers, centaines, dizaines — même en désordre : « 17 unités, 8 dizaines, 32 centaines et 2 milliers » → 32 centaines = 3 milliers et 2 centaines ; 17 unités = 1 dizaine et 7 unités → $2\\,000 + 3\\,200 + 80 + 17 = $ **5 297**.",
    standard:
      "**En image** : la demi-droite se gradue maintenant de un en un… ou de **mille en mille**. Je complète la bande lacunaire (2 391, 2 392, 2 393, ?, ?, 2 396…), j'ordonne cinq nombres à quatre chiffres (5 229, 6 234, 6 239, 6 243, 6 300) — les **milliers** d'abord, puis centaines, dizaines, unités.",
    advanced:
      "**Dans la tête** : les unités de numération résolvent des problèmes — une entreprise a besoin de 1 235 filtres vendus par lots de **cent** : 12 lots font 1 200, il en manque… il faut **13 lots** (1 300 filtres, et 65 de trop). Penser en centaines, c'est diviser sans le savoir.",
  },
  keyIdea: "Dix centaines = un **millier** ; dix milliers = dix-mille. Comparer : milliers, puis centaines, puis dizaines, puis unités.",
  why:
    "Pourquoi le système ne fatigue-t-il jamais ? Parce que c'est toujours le **même échange** — dix paquets deviennent un paquet plus gros — répété étage après étage. Celui qui comprend l'échange à un étage les comprend tous : la numération est une échelle sans dernier barreau.",
  widgets: [
    { kind: "odometer", params: { value: 4635 }, caption: "Quatre-mille-six-cent-trente-cinq : chaque roue compte son étage — milliers, centaines, dizaines, unités." },
  ],
  examples: [
    { title: "Convertir un grand désordre", steps: [
      { p: "« 17 unités, 8 dizaines, 32 centaines et 2 milliers » : je range étage par étage." },
      { p: "32 centaines = 3 milliers et 2 centaines ; 17 unités = 1 dizaine et 7 unités." },
      { p: "$2\\,000 + 3\\,000 + 200 + 80 + 10 + 7 = $ **5 297**." },
    ] },
    { title: "Les filtres par lots de cent", steps: [
      { p: "Il faut 1 235 filtres, vendus par lots de 100." },
      { p: "12 lots = 1 200 filtres : pas assez. **13 lots** = 1 300 filtres : suffisant (65 de réserve)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de centaines dans un millier ? De milliers dans dix-mille ?", solution: "**Dix** centaines font mille ; **dix** milliers font dix-mille — l'échange continue, étage après étage." },
    { tier: "warmup", prompt: "4 gros cubes, 6 plaques, 3 barres et 5 cubes : quel nombre ?", solution: "« Quatre milliers, six centaines, trois dizaines et cinq unités » : **4 635**." },
    { tier: "application", prompt: "Écris 4 635 sous forme de somme, puis avec des produits.", solution: "$4\\,000 + 600 + 30 + 5$ ; et $(4 \\times 1\\,000) + (6 \\times 100) + (3 \\times 10) + (5 \\times 1)$." },
    { tier: "challenge", prompt: "Range dans l'ordre croissant : 6 234, 6 243, 6 239, 6 300, 5 229.", solution: "**5 229 < 6 234 < 6 239 < 6 243 < 6 300** — milliers d'abord, puis centaines, puis dizaines." },
    { tier: "exam", prompt: "Une entreprise a besoin de 1 235 filtres, vendus uniquement par lots de cent. Combien de lots doit-elle acheter ?", solution: "12 lots = 1 200 : insuffisant. **13 lots** (1 300 filtres) — le reste de 65 fait partie de la réponse au problème, pas du calcul exact." },
  ],
  practice: [
    { tier: "warmup", label: "Milliers, centaines, dizaines, unités", make: (r) => {
      const m = randint(r, 1, 9), c = randint(r, 0, 9), d = randint(r, 0, 9), u = randint(r, 0, 9);
      return { prompt: `${m} milliers, ${c} centaines, ${d} dizaines et ${u} unités : quel nombre ?`, answer: 1000 * m + 100 * c + 10 * d + u, solution: `$${m * 1000} + ${c * 100} + ${d * 10} + ${u} = $ **${1000 * m + 100 * c + 10 * d + u}**.` };
    } },
    { tier: "challenge", label: "Convertir un désordre", make: (r) => {
      const m = randint(r, 1, 4), c = randint(r, 11, 29), u = randint(r, 0, 9);
      const n = 1000 * m + 100 * c + u;
      return { prompt: `${m} milliers, ${c} centaines et ${u} unités : quel nombre ?`, answer: n, solution: `${c} centaines = ${Math.floor(c / 10)} millier${Math.floor(c / 10) > 1 ? "s" : ""} et ${c % 10} centaines → **${n}**.` };
    } },
  ],
};

// — Column multiplication (programme: posée P4, 2-3 chiffres × 1-2 chiffres, facteur/produit/multiple) —
const multiplyColumn = {
  id: "numbers.primary.multiply-column",
  level: "primary", domain: "numbers",
  title: "La multiplication posée",
  tagline: "La multiplication posée : la distributivité en colonnes, pour 16 × 548.",
  prereqs: ["numbers.primary.tables", "numbers.primary.mental-1000"],
  intuition:
    "Tu sais déjà que $13 \\times 7 = 10 \\times 7 + 3 \\times 7$. La **multiplication posée** range exactement ce découpage en colonnes — et soudain $16 \\times 548$ ne fait plus peur.\n\nAu passage, le vocabulaire s'installe : dans $3 \\times 25 = 75$, les nombres 3 et 25 sont les **facteurs**, 75 est le **produit** — et 75 est un **multiple** de 25 (et de 3).",
  depths: {
    discovery:
      "**Avec les mains** : $4 \\times 123$ avec le matériel — quatre fois une plaque, quatre fois deux barres, quatre fois trois cubes : $400 + 80 + 12 = 492$. La posée racontera ce geste, colonne par colonne.",
    standard:
      "**En image** : je pose avec le nombre ayant **le moins de chiffres en deuxième ligne** : pour $16 \\times 548$, c'est 548 en haut, 16 en bas. Je multiplie 548 par 6 (les unités), puis 548 par 1 dizaine (en décalant d'un rang), et j'additionne : $3\\,288 + 5\\,480 = $ **8 768**.",
    advanced:
      "**Dans la tête** : la posée n'est que la distributivité bien rangée — $16 \\times 548 = 10 \\times 548 + 6 \\times 548$. Et le mot **multiple** structure les nombres : « les nombres pairs sont les multiples de 2 », 75 est un multiple de 25. Reconnaître un multiple, c'est voir une multiplication cachée.",
  },
  keyIdea: "Poser une multiplication = appliquer $a \\times (d + u) = a \\times d + a \\times u$ en colonnes. **Facteurs** → **produit**.",
  why:
    "Pourquoi décaler la deuxième ligne d'un rang ? Parce qu'on n'y multiplie pas par 1 mais par **une dizaine** : $548 \\times 10 = 5\\,480$ — le glissement des chiffres que tu connais. Le décalage n'est pas une règle magique, c'est le $\\times 10$ qui s'écrit.",
  examples: [
    { title: "16 × 548, posé", steps: [
      { p: "548 en haut, 16 en bas (le moins de chiffres en deuxième ligne)." },
      { p: "Par les unités : $6 \\times 548 = 3\\,288$. Par la dizaine : $1 \\times 548 = 548$, décalé d'un rang : $5\\,480$." },
      { p: "Somme : $3\\,288 + 5\\,480 = $ **8 768**." },
    ] },
    { title: "Le vocabulaire en action", steps: [
      { p: "$3 \\times 25 = 75$ : « le produit de 3 et de 25 est 75 »." },
      { p: "« 75 est un **multiple** de 25 » — et de 3. Les facteurs fabriquent leurs multiples." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $3 \\times 25 = 75$, comment s'appellent 3 et 25 ? Et 75 ?", solution: "3 et 25 sont les **facteurs** ; 75 est le **produit** — et un **multiple** de 25 comme de 3." },
    { tier: "warmup", prompt: "Pose et calcule $4 \\times 123$.", solution: "$4 \\times 3 = 12$ (je pose 2, retenue 1), $4 \\times 2 + 1 = 9$, $4 \\times 1 = 4$ → **492**." },
    { tier: "application", prompt: "Pour poser $16 \\times 548$, quel nombre écris-tu en deuxième ligne, et pourquoi ?", solution: "**16** — le nombre ayant le moins de chiffres va en deuxième ligne : moins de lignes de calcul, moins d'erreurs." },
    { tier: "challenge", prompt: "Pose et calcule $16 \\times 548$.", solution: "$6 \\times 548 = 3\\,288$ ; $10 \\times 548 = 5\\,480$ (le décalage !) ; $3\\,288 + 5\\,480 = $ **8 768**." },
    { tier: "exam", prompt: "« Les nombres pairs sont les multiples de 2. » Explique cette phrase avec un exemple et un contre-exemple.", solution: "$14 = 7 \\times 2$ : 14 est pair, multiple de 2. Mais 15 ne s'écrit pas « entier $\\times$ 2 » : impair, pas multiple de 2. Pair = multiple de 2, c'est la même idée dite deux fois." },
  ],
  practice: [
    { tier: "application", label: "Posée par un chiffre", make: (r) => {
      const a = randint(r, 124, 987), b = randint(r, 3, 9);
      const u = a % 10, d = Math.floor(a / 10) % 10, c = Math.floor(a / 100);
      return { prompt: `Pose et calcule $${b} \\times ${a}$.`, answer: a * b, solution: `$${b} \\times ${u} = ${b * u}$ ; $${b} \\times ${d}$ dizaines ; $${b} \\times ${c}$ centaines — avec les retenues : **${a * b}**.` };
    } },
    { tier: "challenge", label: "Posée par deux chiffres", make: (r) => {
      const a = randint(r, 112, 615), b = randint(r, 12, 16);
      const bu = b % 10;
      return { prompt: `Pose et calcule $${b} \\times ${a}$.`, answer: a * b, solution: `Ligne des unités : $${bu} \\times ${a} = ${bu * a}$ ; ligne des dizaines : $${a}$ décalé d'un rang $= ${10 * a}$ ; somme : **${a * b}**.` };
    } },
  ],
};

// — Division and the ÷ sign (programme: sens + symbole, opération inverse de la multiplication) —
const divisionSign = {
  id: "numbers.primary.division",
  level: "primary", domain: "numbers",
  title: "La division : le signe ÷",
  tagline: "La division : son symbole, et l'opération inverse de la multiplication.",
  prereqs: ["numbers.primary.tables", "numbers.primary.problems-1000"],
  intuition:
    "Les partages, tu les fais depuis le CP. Voici leur écriture : le signe **÷**. « 72 partagé en 6 » s'écrit $72 \\div 6$.\n\nEt le secret de la division : c'est la **multiplication à l'envers**. Puisque $7 \\times 13 = 91$, alors $91 \\div 7 = 13$… et $91 \\div 13 = 7$. Une multiplication sue, deux divisions offertes.",
  depths: {
    discovery:
      "**Avec les mains** : 72 € pour 6 dictionnaires identiques — je distribue les euros en 6 tas égaux, ou je dessine la barre de 72 coupée en 6 parts : chaque part vaut **12 €**.",
    standard:
      "**En image** : le schéma en barre transforme la division en égalité à trous — la barre de 72 en 6 parts égales, c'est $6 \\times \\,? = 72$. Ma table de 6 répond : $6 \\times 12 = 72$, donc $72 \\div 6 = 12$. Diviser, c'est interroger ses tables dans l'autre sens.",
    advanced:
      "**Dans la tête** : chaque fait multiplicatif livre **deux** divisions — $7 \\times 13 = 91$ donne $91 \\div 7 = 13$ **et** $91 \\div 13 = 7$ : on cherche tantôt la valeur d'une part, tantôt le nombre de parts. (La division **posée** attendra le cycle 3 — au CE2, le sens et le symbole suffisent.)",
  },
  keyIdea: "$a \\times b = c$ donne $c \\div a = b$ et $c \\div b = a$ : la division est l'opération **inverse** de la multiplication.",
  why:
    "Pourquoi dire que ÷ « défait » × ? Multiplie 13 par 7, puis divise le résultat par 7 : te voilà revenu à 13, comme si rien ne s'était passé. Chaque opération a ainsi son inverse — l'addition a la soustraction, la multiplication a la division. Les maths aiment les allers-retours.",
  examples: [
    { title: "Les six dictionnaires", steps: [
      { p: "La maîtresse a payé 72 € pour 6 dictionnaires identiques. Prix d'un dictionnaire ?" },
      { p: "Barre de 72 en 6 parts : $6 \\times \\,? = 72$ → $72 \\div 6 = $ **12 €**." },
    ] },
    { title: "Une multiplication, deux divisions", steps: [
      { p: "$7 \\times 13 = 91$." },
      { p: "Donc $91 \\div 7 = 13$ (la valeur d'une part) et $91 \\div 13 = 7$ (le nombre de parts)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment lit-on $72 \\div 6$ ? Que cherche-t-on ?", solution: "« 72 **divisé par** 6 » : on partage 72 en 6 parts égales — ou on cherche combien de fois 6 tient dans 72." },
    { tier: "warmup", prompt: "Sachant que $6 \\times 12 = 72$, donne $72 \\div 6$ et $72 \\div 12$.", solution: "$72 \\div 6 = $ **12** et $72 \\div 12 = $ **6** — une multiplication sue, deux divisions offertes." },
    { tier: "application", prompt: "Calcule $45 \\div 5$ en interrogeant ta table.", solution: "$5 \\times \\,? = 45$ → $5 \\times 9 = 45$, donc $45 \\div 5 = $ **9**." },
    { tier: "challenge", prompt: "La maîtresse paie 72 € pour 6 dictionnaires identiques. Écris l'opération avec ÷ et conclus.", solution: "$72 \\div 6 = 12$ : un dictionnaire coûte **12 €** — le schéma en barre (72 coupé en 6) le montre d'un coup d'œil." },
    { tier: "exam", prompt: "Vrai ou faux : « si $91 \\div 7 = 13$, alors $13 \\times 7 = 91$ ». Justifie.", solution: "**Vrai** : division et multiplication se défont l'une l'autre. C'est même ainsi qu'on **vérifie** une division — en remultipliant." },
  ],
  practice: [
    { tier: "warmup", label: "Les tables à l'envers", make: (r) => {
      const a = randint(r, 3, 10), b = randint(r, 3, 10);
      return { prompt: `Calcule $${a * b} \\div ${a}$.`, answer: b, solution: `$${a} \\times ${b} = ${a * b}$ → $${a * b} \\div ${a} = $ **${b}**.` };
    } },
    { tier: "application", label: "L'inverse de la multiplication", make: (r) => {
      const k = randint(r, 11, 19), n = randint(r, 3, 7);
      return { prompt: `On sait que $${n} \\times ${k} = ${n * k}$. Calcule $${n * k} \\div ${n}$.`, answer: k, solution: `La division défait la multiplication : $${n * k} \\div ${n} = $ **${k}**.` };
    } },
  ],
};

// — Fraction equalities (programme: 5/10 = 1/2, la verbalisation officielle) —
const fractionsEqual = {
  id: "numbers.primary.fractions-equal",
  level: "primary", domain: "numbers",
  title: "Les égalités de fractions",
  tagline: "Des parts deux fois plus petites, deux fois plus de parts : la même quantité.",
  prereqs: ["numbers.primary.fractions"],
  intuition:
    "Coupe un gâteau en 4 et prends 3 parts. Maintenant recoupe chaque part en deux : te voilà avec 6 parts sur 8 — et **exactement le même gâteau** dans l'assiette : $\\frac{6}{8} = \\frac{3}{4}$.\n\nLa règle se dit ainsi : « Si, pour un même tout, je fais des parts **deux fois plus petites** et si je prends **deux fois plus de parts**, alors j'en prends la même quantité. »",
  depths: {
    discovery:
      "**Avec les mains** : je plie une bande en deux ($\\frac{1}{2}$ marquée), puis je replie en dixièmes : la marque tombe pile sur $\\frac{5}{10}$. Le pliage **prouve** l'égalité $\\frac{5}{10} = \\frac{1}{2}$.",
    standard:
      "**En image** : deux barres l'une sous l'autre — l'une coupée en 4 avec 3 parts prises, l'autre en 8 avec 6 parts prises : les zones colorées s'arrêtent au même endroit. Parmi $\\frac{1}{3}$, $\\frac{2}{4}$, $\\frac{3}{4}$, $\\frac{2}{6}$, $\\frac{3}{6}$, les fractions égales à $\\frac{1}{2}$ sont $\\frac{2}{4}$ et $\\frac{3}{6}$ — le numérateur est la **moitié** du dénominateur.",
    advanced:
      "**Dans la tête** : les trous se déduisent — $\\frac{?}{8} = \\frac{1}{2}$ : des parts 4 fois plus petites (de 2 à 8), donc 4 fois plus de parts : $? = $ **4**. Une même quantité porte plusieurs noms : les fractions égales sont des **synonymes** — et savoir renommer, c'est préparer les additions à venir.",
  },
  keyIdea: "Parts **deux fois plus petites** + **deux fois plus de parts** = même quantité : $\\frac{3}{4} = \\frac{6}{8}$, $\\frac{1}{2} = \\frac{5}{10}$.",
  why:
    "Pourquoi un même nombre a-t-il plusieurs écritures fractionnaires ? Parce que la fraction décrit un **partage**, et qu'on peut partager plus finement sans changer la quantité — recouper chaque part en deux ne mange rien. Le nombre est unique ; ses noms sont légion.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 4, filled: 3 }, caption: "Trois quarts…" },
    { kind: "numberline", params: { mode: "fractionbar", parts: 8, filled: 6 }, caption: "…et six huitièmes : les zones s'arrêtent au même endroit — même quantité, deux noms." },
  ],
  examples: [
    { title: "Prouver 6/8 = 3/4", steps: [
      { p: "Je pars de $\\frac{3}{4}$ : un tout en 4 parts, j'en prends 3." },
      { p: "Je recoupe chaque part en deux : parts deux fois plus petites (8), parts prises deux fois plus nombreuses (6)." },
      { p: "Rien n'a bougé dans l'assiette : $\\frac{6}{8} = \\frac{3}{4}$." },
    ] },
    { title: "Le trou de l'égalité", steps: [
      { p: "$\\frac{?}{8} = \\frac{1}{2}$ : de 2 à 8, les parts deviennent 4 fois plus petites." },
      { p: "Il en faut 4 fois plus : $? = 4$ — et en effet, 4 est la moitié de 8." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Récite la règle des égalités de fractions (parts plus petites…).", solution: "« Si, pour un même tout, je fais des parts **deux fois plus petites** et si je prends **deux fois plus de parts**, alors j'en prends la même quantité. »" },
    { tier: "warmup", prompt: "Pourquoi $\\frac{5}{10} = \\frac{1}{2}$ ?", solution: "De 2 à 10 : parts **cinq fois** plus petites ; de 1 à 5 : **cinq fois** plus de parts — la quantité n'a pas bougé." },
    { tier: "application", prompt: "Parmi $\\frac{1}{3}$, $\\frac{2}{4}$, $\\frac{3}{4}$, $\\frac{2}{6}$ et $\\frac{3}{6}$, lesquelles sont égales à $\\frac{1}{2}$ ?", solution: "$\\frac{2}{4}$ et $\\frac{3}{6}$ : le numérateur y est la **moitié** du dénominateur." },
    { tier: "challenge", prompt: "Trouve le numérateur manquant : $\\frac{?}{8} = \\frac{1}{2}$. Justifie.", solution: "**4** : parts quatre fois plus petites (2 → 8), donc quatre fois plus de parts (1 → 4)." },
    { tier: "exam", prompt: "Aya dit : « $\\frac{2}{6} = \\frac{1}{2}$ car il suffit d'enlever 1 en haut et en bas. » Que lui réponds-tu ?", solution: "Non : la règle multiplie ou divise les **deux** nombres par un même facteur, elle ne soustrait pas. $\\frac{2}{6} = \\frac{1}{3}$ (parts deux fois plus petites que les tiers, deux fois plus prises) — et $\\frac{1}{3} \\neq \\frac{1}{2}$." },
  ],
  practice: [
    { tier: "application", label: "Égal à un demi", make: (r) => {
      const d = pick(r, [4, 6, 8, 10, 12]);
      return { prompt: `Complète (réponds par le numérateur) : $\\frac{?}{${d}} = \\frac{1}{2}$`, answer: d / 2, solution: `Le numérateur est la moitié du dénominateur : $\\frac{${d / 2}}{${d}}$.` };
    } },
    { tier: "challenge", label: "Doubler le partage", make: (r) => {
      const b = pick(r, [2, 3, 4, 5, 6]); const a = randint(r, 1, b - 1);
      return { prompt: `Complète (réponds par le numérateur) : $\\frac{${a}}{${b}} = \\frac{?}{${2 * b}}$`, answer: 2 * a, solution: `Parts deux fois plus petites → deux fois plus de parts : $\\frac{${2 * a}}{${2 * b}}$.` };
    } },
  ],
};

// — The fraction ruler (programme: fractions d'une unité de longueur, comparaisons, dén. multiples) —
const fractionRuler = {
  id: "numbers.primary.fraction-ruler",
  level: "primary", domain: "numbers",
  title: "La règle des fractions",
  tagline: "Quand les entiers ne suffisent plus : graduer l'unité pour mesurer entre les nombres.",
  prereqs: ["numbers.primary.fractions-equal", "applied.primary.units"],
  intuition:
    "Ta bande mesure plus d'une unité, mais moins de deux : les entiers ne suffisent plus ! La solution : **graduer l'unité elle-même** — en quarts (par pliage), en dixièmes (sur quadrillage).\n\nLa règle ainsi graduée mesure l'invisible : « la bande mesure 2 unités et $\\frac{1}{4}$ d'unité », « le segment est compris entre $\\frac{7}{10}$ et $\\frac{8}{10}$ d'unité ».",
  depths: {
    discovery:
      "**Avec les mains** : je plie la bande-unité en deux, puis encore en deux : la voilà graduée en **quarts**. Sur un quadrillage, je la découpe en **dixièmes**. Ma règle à fractions est née — je mesure et je trace : $\\frac{1}{2}$ unité, 1 unité $+ \\frac{1}{5}$, 2 unités $+ \\frac{3}{5}$.",
    standard:
      "**En image** : sur la règle graduée, les fractions **égales** tombent sur la même graduation — $\\frac{5}{10}$ pile sur $\\frac{1}{2}$ ! Et l'ordre se voit : à même dénominateur, $\\frac{5}{12} < \\frac{7}{12}$ ; à même numérateur, $\\frac{5}{12} < \\frac{5}{8}$ (des douzièmes plus fins que des huitièmes).",
    advanced:
      "**Dans la tête** : le cas roi — comparer $\\frac{7}{12}$ et $\\frac{5}{6}$, dont un dénominateur est **multiple** de l'autre : je renomme $\\frac{5}{6} = \\frac{10}{12}$, et $\\frac{7}{12} < \\frac{10}{12}$. Même clé pour additionner : $\\frac{1}{6} + \\frac{5}{12} = \\frac{2}{12} + \\frac{5}{12} = \\frac{7}{12}$. Renommer d'abord, opérer ensuite.",
  },
  keyIdea: "Graduer l'unité en fractions, c'est mesurer **entre** les entiers. Dénominateurs multiples ? On **renomme**, puis on compare ou on ajoute.",
  why:
    "Pourquoi inventer des graduations entre 0 et 1 ? Parce que le monde ne tombe pas juste : les longueurs réelles ignorent nos entiers. Les fractions remplissent les vides de la droite — premier pas d'une grande aventure : il y a des nombres **entre** les nombres.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 10, filled: 7 }, caption: "La bande-unité graduée en dixièmes : le segment s'arrête à sept dixièmes — entre 0 et 1, la mesure existe." },
  ],
  examples: [
    { title: "Comparer 7/12 et 5/6", steps: [
      { p: "12 est un multiple de 6 : je renomme $\\frac{5}{6}$ en douzièmes — parts deux fois plus petites, deux fois plus de parts : $\\frac{10}{12}$." },
      { p: "$\\frac{7}{12} < \\frac{10}{12}$, donc $\\frac{7}{12} < \\frac{5}{6}$." },
    ] },
    { title: "Le gâteau de Marc, Ange et Saïd", steps: [
      { p: "Marc mange $\\frac{1}{10}$, Ange $\\frac{3}{10}$, Saïd $\\frac{2}{10}$ : ensemble $\\frac{6}{10}$." },
      { p: "Le tout vaut $\\frac{10}{10}$ : il reste $\\frac{4}{10}$ du gâteau." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment fabriquer une règle graduée en quarts d'unité ? En dixièmes ?", solution: "En quarts : deux **pliages** en deux. En dixièmes : en s'appuyant sur un **quadrillage** — dix cases pour l'unité." },
    { tier: "warmup", prompt: "Compare $\\frac{5}{12}$ et $\\frac{7}{12}$, puis $\\frac{5}{12}$ et $\\frac{5}{8}$.", solution: "$\\frac{5}{12} < \\frac{7}{12}$ (mêmes parts, on en prend plus) ; $\\frac{5}{12} < \\frac{5}{8}$ (les douzièmes sont plus **fins** que les huitièmes)." },
    { tier: "application", prompt: "Compare $\\frac{7}{12}$ et $\\frac{5}{6}$.", solution: "$\\frac{5}{6} = \\frac{10}{12}$ (renommage), et $\\frac{7}{12} < \\frac{10}{12}$ : donc $\\frac{7}{12} < \\frac{5}{6}$." },
    { tier: "challenge", prompt: "Calcule $\\frac{1}{6} + \\frac{5}{12}$.", solution: "$\\frac{1}{6} = \\frac{2}{12}$, puis $\\frac{2}{12} + \\frac{5}{12} = \\frac{7}{12}$ — renommer d'abord, ajouter ensuite." },
    { tier: "exam", prompt: "Marc a mangé $\\frac{1}{10}$ du gâteau, Ange $\\frac{3}{10}$ et Saïd $\\frac{2}{10}$. Quelle fraction du gâteau reste-t-il ?", solution: "$\\frac{1}{10} + \\frac{3}{10} + \\frac{2}{10} = \\frac{6}{10}$ ; il reste $\\frac{10}{10} - \\frac{6}{10} = \\frac{4}{10}$ (soit $\\frac{2}{5}$ — même graduation sur la règle !)." },
  ],
  practice: [
    { tier: "application", label: "Renommer en douzièmes", make: (r) => {
      const x = pick(r, [[1, 6], [5, 6], [1, 3], [2, 3], [1, 4], [3, 4], [1, 2]]);
      const k = 12 / x[1];
      return { prompt: `Combien de douzièmes vaut $\\frac{${x[0]}}{${x[1]}}$ ? (réponds par le numérateur)`, answer: x[0] * k, solution: `Parts ${k} fois plus petites, ${k} fois plus de parts : $\\frac{${x[0]}}{${x[1]}} = \\frac{${x[0] * k}}{12}$.` };
    } },
    { tier: "challenge", label: "Ce qui reste du gâteau", make: (r) => {
      const a = randint(r, 1, 3), b = randint(r, 1, 3), c = randint(r, 1, 3);
      const reste = 10 - a - b - c;
      return { prompt: `Trois amis mangent $\\frac{${a}}{10}$, $\\frac{${b}}{10}$ et $\\frac{${c}}{10}$ d'un gâteau. Quelle fraction reste-t-il ? (réponds par le numérateur)`, answer: reste, solution: `Mangé : $\\frac{${a + b + c}}{10}$ ; reste : $\\frac{10}{10} - \\frac{${a + b + c}}{10} = \\frac{${reste}}{10}$.` };
    } },
  ],
};

// — Mental calculation to 10 000 (programme: ×100, ×4 = ×2×2, ×8, +38 = +40−2, décompositions de 60) —
const mentalTenThousand = {
  id: "numbers.primary.mental-10000",
  level: "primary", domain: "numbers",
  title: "Calculer malin jusqu'à dix-mille",
  tagline: "×100, ×4 en doublant deux fois, +38 par +40−2 — et les secrets du nombre 60.",
  prereqs: ["numbers.primary.mental-1000"],
  intuition:
    "Les procédures grandissent encore : **×100** fait glisser chaque chiffre de deux crans (724 × 10 = 7 240, et ×100 monte les centaines au rang des milliers).\n\nDeux perles nouvelles : **×4, c'est doubler deux fois** ; **×8, c'est doubler trois fois**. Et un nombre vedette : **60**, qui se décompose de six façons — l'horloge te dira pourquoi il a été choisi.",
  depths: {
    discovery:
      "**Avec les mains** : $4 \\times 37$ sur l'ardoise — je double : 74 ; je redouble : **148**. Pour $8 \\times 27$ : 54, 108, **216** — j'écris les étapes intermédiaires pour soulager ma mémoire, et je les abandonnerai quand je n'en aurai plus besoin.",
    standard:
      "**En image** : $+38$, c'est un grand saut $+40$ puis un retour $-2$ ; $-29$, c'est $-30$ puis $+1$ — la famille des +8, +9, +18, +19, +28, +29, +38, +39 se traite par la dizaine ronde voisine. Les **doubles** montent jusqu'à 20 (et 60, 75, 400, 600), les **moitiés** suivent (120, 150, 800, 1 200).",
    advanced:
      "**Dans la tête** : les **décompositions de 60** s'apprennent par cœur — $1 \\times 60$, $2 \\times 30$, $3 \\times 20$, $4 \\times 15$, $5 \\times 12$, $6 \\times 10$. Et la fluence devient un jeu : quinze calculs en trois minutes en fin d'année, douze égalités de tables ($7 \\times \\,? = 42$) en une minute. L'automatisme libère la pensée.",
  },
  keyIdea: "$\\times 4$ = doubler **deux fois** ; $\\times 8$ = doubler **trois fois** ; $+38$ = $+40 - 2$ ; et $60 = 4 \\times 15 = 5 \\times 12 = 6 \\times 10$…",
  why:
    "Pourquoi 60 plutôt que 100 sur nos horloges ? Parce que 60 se partage **généreusement** — en 2, 3, 4, 5, 6, 10, 12… — là où 100 refuse le partage en 3. Les Babyloniens l'avaient compris il y a quatre mille ans : un bon nombre rond est un nombre qui se divise bien.",
  examples: [
    { title: "8 × 27 en trois doublements", steps: [
      { p: "$2 \\times 27 = 54$ ; $2 \\times 54 = 108$ ; $2 \\times 108 = 216$." },
      { p: "$8 \\times 27 = $ **216** — trois doublements, zéro table de 8." },
    ] },
    { title: "Ajouter 38", steps: [
      { p: "$+38$, c'est presque $+40$." },
      { p: "$256 + 40 = 296$, puis $296 - 2 = $ **294**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi « multiplier par 4 » revient-il à doubler deux fois ?", solution: "Parce que $4 = 2 \\times 2$ : doubler, puis doubler le résultat, c'est bien multiplier par 4. (Et $8 = 2 \\times 2 \\times 2$ : trois doublements.)" },
    { tier: "warmup", prompt: "Calcule $724 \\times 10$, puis $58 \\times 100$.", solution: "$724 \\times 10 = $ **7 240** (un cran) ; $58 \\times 100 = $ **5 800** (deux crans) — les chiffres glissent." },
    { tier: "application", prompt: "Calcule $4 \\times 37$ par doublements.", solution: "$2 \\times 37 = 74$ ; $2 \\times 74 = $ **148**." },
    { tier: "challenge", prompt: "Calcule $256 + 38$ puis $403 - 29$ avec les dizaines rondes.", solution: "$256 + 40 - 2 = $ **294** ; $403 - 30 + 1 = $ **374**." },
    { tier: "exam", prompt: "Donne toutes les décompositions multiplicatives de 60. Que remarques-tu sur l'horloge ?", solution: "$1 \\times 60$, $2 \\times 30$, $3 \\times 20$, $4 \\times 15$, $5 \\times 12$, $6 \\times 10$ — voilà pourquoi l'heure se coupe si bien en demies (30), en tiers (20), en quarts (15), en cinq, en six…" },
  ],
  practice: [
    { tier: "warmup", label: "×10, ×100", make: (r) => {
      if (r() < 0.5) { const n = randint(r, 101, 999); return { prompt: `Calcule $${n} \\times 10$.`, answer: n * 10, solution: `Un cran vers la gauche : **${n * 10}**.` }; }
      const m = randint(r, 11, 99); return { prompt: `Calcule $${m} \\times 100$.`, answer: m * 100, solution: `Deux crans : **${m * 100}**.` };
    } },
    { tier: "application", label: "Doubler, redoubler", make: (r) => {
      if (r() < 0.5) { const n = randint(r, 13, 37); return { prompt: `Calcule $4 \\times ${n}$ par doublements.`, answer: 4 * n, solution: `$2 \\times ${n} = ${2 * n}$ ; $2 \\times ${2 * n} = $ **${4 * n}**.` }; }
      const m = randint(r, 13, 27); return { prompt: `Calcule $8 \\times ${m}$ par doublements.`, answer: 8 * m, solution: `${2 * m}, puis ${4 * m}, puis **${8 * m}** — trois doublements.` };
    } },
    { tier: "challenge", label: "Les presque-dizaines", make: (r) => {
      const n = randint(r, 125, 850); const k = pick(r, [18, 19, 28, 29, 38, 39]);
      if (r() < 0.5) { const round = Math.ceil(k / 10) * 10; return { prompt: `Calcule $${n} + ${k}$.`, answer: n + k, solution: `$${n} + ${round} - ${round - k} = $ **${n + k}**.` }; }
      const round2 = Math.ceil(k / 10) * 10; return { prompt: `Calcule $${n} - ${k}$.`, answer: n - k, solution: `$${n} - ${round2} + ${round2 - k} = $ **${n - k}**.` };
    } },
  ],
};

// — Problem structures (programme: comparaison 2 étapes, « fois plus », mixtes 2-3 étapes, vocabulaire) —
const problemsTenThousand = {
  id: "numbers.primary.problems-10000",
  level: "primary", domain: "numbers",
  title: "Problèmes : comparer, multiplier, enchaîner",
  tagline: "« Fois plus » n'est pas « de plus » — et les histoires gagnent une troisième étape.",
  prereqs: ["numbers.primary.problems-1000", "numbers.primary.division"],
  intuition:
    "Le vocabulaire se précise : « la **somme** de 12 et de 25 est 37 », « la **différence** entre 60 et 37 est 23 » — 12, 25, 60 et 37 sont des **termes**.\n\nEt une distinction capitale entre : « 75 **de plus** » (on ajoute) et « 4 **fois plus** » (on multiplie !). Une trottinette 4 fois plus chère qu'un casque à 32 € coûte $4 \\times 32 = 128$ € — pas 36 €.",
  depths: {
    discovery:
      "**Avec les mains** : toujours dix problèmes par semaine, dont des problèmes éclairs à l'oral, réponse sur l'ardoise — l'entraînement du sportif, version mathématique.",
    standard:
      "**En image** : la comparaison gagne une étape — « Léo a 188 billes, Lucie en a 75 **de plus**. Combien en ont-ils **en tout** ? » Barre de Léo (188), barre de Lucie (188 + 75 = 263), et le tout : $188 + 263 = $ **451**. Deux barres, deux étapes.",
    advanced:
      "**Dans la tête** : les problèmes **mixtes** enchaînent jusqu'à trois étapes — « 4 tables de 6 personnes et 7 tables de 4 : combien de clients ? » : $4 \\times 6 = 24$, $7 \\times 4 = 28$, $24 + 28 = $ **52**. Règle d'or du programme : plus la structure est complexe, plus les nombres restent **petits** — la difficulté ne s'additionne pas, elle se dose.",
  },
  keyIdea: "« De plus » → addition ; « **fois** plus » → multiplication. Et chaque étape redevient un problème simple.",
  why:
    "Pourquoi tant insister sur « fois plus » contre « de plus » ? Parce qu'un seul mot change l'opération — et la réponse du tout au tout : 4 de plus que 32, c'est 36 ; 4 fois plus, c'est 128. Lire un problème, c'est d'abord lire **chaque mot**.",
  examples: [
    { title: "La trottinette (comparaison multiplicative)", steps: [
      { p: "Le casque coûte 32 €. La trottinette coûte **quatre fois plus** cher." },
      { p: "« Fois » commande : $4 \\times 32 = $ **128 €** — et non $32 + 4$." },
    ] },
    { title: "Léo et Lucie (comparaison, puis le tout)", steps: [
      { p: "Étape 1 — Lucie : $188 + 75 = 263$ billes." },
      { p: "Étape 2 — le tout : $188 + 263 = $ **451 billes**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans « la somme de 12 et de 25 est 37 », comment s'appellent 12 et 25 ?", solution: "Les **termes** de l'addition — et 37 est leur **somme**. (Pour $60 - 37$ : des termes encore, et 23 est la **différence**.)" },
    { tier: "warmup", prompt: "Un casque coûte 32 €. Une trottinette coûte quatre fois plus cher. Prix de la trottinette ?", solution: "« Fois plus » multiplie : $4 \\times 32 = $ **128 €**." },
    { tier: "application", prompt: "Léo a 188 billes. Lucie en a 75 de plus. Combien les deux enfants en ont-ils en tout ?", solution: "Lucie : $188 + 75 = 263$ ; en tout : $188 + 263 = $ **451 billes** — la comparaison cache une deuxième étape." },
    { tier: "challenge", prompt: "Un restaurant a 4 tables de 6 personnes et 7 tables de 4. Combien de clients peut-il recevoir ?", solution: "$4 \\times 6 = 24$ ; $7 \\times 4 = 28$ ; $24 + 28 = $ **52 clients** — trois étapes, trois opérations." },
    { tier: "exam", prompt: "Zoé lit « 4 fois plus » et calcule $32 + 4 = 36$. Explique son erreur et corrige.", solution: "Elle a traité « **fois** plus » comme « **de** plus ». « Fois » appelle la multiplication : $4 \\times 32 = $ **128**. Un mot, une opération — toute la différence." },
  ],
  practice: [
    { tier: "application", label: "Fois plus, de plus", make: (r) => {
      const c = pick(r, [12, 15, 23, 32, 41]); const k = randint(r, 2, 5);
      if (r() < 0.5) return { prompt: `Un livre coûte ${c} €. Un coffret coûte ${k} fois plus cher. Prix du coffret ?`, answer: k * c, solution: `« Fois plus » multiplie : $${k} \\times ${c} = $ **${k * c} €**.` };
      return { prompt: `Un livre coûte ${c} €. Un album coûte ${k} € de plus. Prix de l'album ?`, answer: c + k, solution: `« De plus » ajoute : $${c} + ${k} = $ **${c + k} €**.` };
    } },
    { tier: "challenge", label: "Comparer puis totaliser", make: (r) => {
      const a = randint(r, 120, 240), d = randint(r, 35, 95);
      return { prompt: `Léo a ${a} billes. Lucie en a ${d} de plus que Léo. Combien en ont-ils en tout ?`, answer: 2 * a + d, solution: `Lucie : $${a} + ${d} = ${a + d}$ ; en tout : $${a} + ${a + d} = $ **${2 * a + d}**.` };
    } },
  ],
};

export default [
  toTenThousand, multiplyColumn, divisionSign, fractionsEqual, fractionRuler, mentalTenThousand, problemsTenThousand,
];
