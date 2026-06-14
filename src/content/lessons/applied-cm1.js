// Field "Applied" — PRIMARY module (CM1 year): decimal conversions (mg to tonne,
// mL to hL, no conversion tables), the introduction of AREA (cm², no memorised
// formulas), the angle as a magnitude (compared, not measured — no degrees in CM1),
// and proportionality (multiplicative linearity in natural language only — no
// tables, no coefficient, no cross products). Official cycle-3 programme (2025).
import { randint, pick } from "../../core/exercises.js";

// — Decimal conversions (programme: 3,5 m = 350 cm ; mg ; mL → hL ; piège des durées) —
const convertDecimal = {
  id: "applied.primary.convert-decimal",
  level: "primary", domain: "applied",
  title: "Convertir avec la virgule",
  tagline: "3,5 m = 350 cm — les décimaux mesurent enfin, et le temps résiste.",
  prereqs: ["applied.primary.metric", "applied.primary.capacity", "numbers.primary.decimals"],
  intuition:
    "Les décimaux sortent du porte-monnaie : « **3,5 m est égal à 350 cm, car 1 m est égal à 100 cm** ». La relation connue fait tout le travail — toujours pas de tableau de conversion (un tableau peut *présenter* les unités, jamais convertir à ta place).\n\nLes familles se complètent : le **milligramme** (1 g = 1 000 mg) et l'**hectolitre** (1 hL = 100 L).",
  depths: {
    discovery:
      "**Avec les mains** : 3,5 m au mètre ruban — trois mètres et la moitié d'un quatrième : 300 cm + 50 cm. La virgule décrit le geste : trois unités et cinq dixièmes.",
    standard:
      "**En image** : la relation, puis le calcul — $2{,}4$ kg $= 2\\,400$ g (car 1 kg $= 1\\,000$ g) ; $3{,}5$ hL $= 350$ L (car 1 hL $= 100$ L) ; $0{,}75$ L $= 75$ cL. Multiplier par 10, 100 ou 1 000 : les chiffres montent de rang — exactement ton calcul mental.",
    advanced:
      "**Dans la tête** : un piège célèbre garde la frontière — **1,5 h = 90 min, pas 150 !** Le temps compte en base **60** : la virgule décimale n'y a pas cours ($1{,}5$ h = une heure et **demie** = 60 + 30). Les unités métriques parlent décimal ; les heures parlent babylonien. Savoir quelle langue parle chaque grandeur, c'est déjà la moitié de la conversion.",
  },
  keyIdea: "La **relation** convertit ($1$ m $= 100$ cm → $3{,}5$ m $= 350$ cm) — sauf le temps, qui compte en base 60 : $1{,}5$ h $= 90$ min.",
  why:
    "Pourquoi le système métrique épouse-t-il si bien les décimaux ? Parce qu'il a été **conçu pour** : à la Révolution française, on a bâti des unités en facteurs de 10 exprès pour que convertir soit un glissement de chiffres. Les heures, elles, sont plus vieilles que le système — d'où leur accent babylonien.",
  examples: [
    { title: "3,5 m en centimètres", steps: [
      { p: "La relation : $1$ m $= 100$ cm." },
      { p: "Donc $3{,}5$ m $= 3{,}5 \\times 100$ cm $= $ **350 cm** — les chiffres montent de deux rangs." },
    ] },
    { title: "Le piège de 1,5 h", steps: [
      { p: "$1{,}5$ h = une heure **et demie** — et la demi-heure vaut 30 min." },
      { p: "$60 + 30 = $ **90 min** (jamais 150 : le temps n'est pas décimal !)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Convertis 3,5 m en centimètres en citant la relation utilisée.", solution: "« $1$ m $= 100$ cm, donc $3{,}5$ m $= $ **350 cm** » — la relation d'abord, le tableau jamais." },
    { tier: "warmup", prompt: "Combien de milligrammes dans un gramme ? De litres dans un hectolitre ?", solution: "$1$ g $= $ **1 000 mg** ; $1$ hL $= $ **100 L** — la famille s'étend aux deux bouts." },
    { tier: "application", prompt: "Convertis 2,4 kg en grammes, puis 0,75 L en centilitres.", solution: "$2{,}4 \\times 1\\,000 = $ **2 400 g** ; $0{,}75 \\times 100 = $ **75 cL**." },
    { tier: "challenge", prompt: "Convertis 1,5 h en minutes. Pourquoi pas 150 ?", solution: "**90 min** : une heure (60) et une demie (30). Le temps compte en base **60** — la virgule décimale ne s'y applique pas." },
    { tier: "exam", prompt: "Un sirop indique 12,5 cL par dose. Combien de doses dans une bouteille d'un litre ? Estime la vraisemblance.", solution: "$1$ L $= 100$ cL ; $100 \\div 12{,}5 = $ **8 doses** — vraisemblable pour une bouteille de sirop ✓." },
  ],
  practice: [
    { tier: "application", label: "La relation convertit", make: (r) => {
      const kind = r();
      if (kind < 0.34) { const e = randint(r, 1, 8), d = randint(r, 1, 9); return { prompt: `Convertis $${e}{,}${d}$ m en centimètres.`, answer: 100 * e + 10 * d, solution: `$1$ m $= 100$ cm → **${100 * e + 10 * d} cm**.` }; }
      if (kind < 0.67) { const e = randint(r, 1, 5), d = randint(r, 1, 9); return { prompt: `Convertis $${e}{,}${d}$ kg en grammes.`, answer: 1000 * e + 100 * d, solution: `$1$ kg $= 1\\,000$ g → **${1000 * e + 100 * d} g**.` }; }
      const h = pick(r, [[1, 30, 90], [2, 30, 150], [1, 15, 75], [2, 15, 135], [3, 30, 210]]);
      return { prompt: `Convertis ${h[0]} h ${h[1]} min en minutes.`, answer: h[2], solution: `$${h[0]} \\times 60 + ${h[1]} = $ **${h[2]} min** — base 60, pas de virgule ici !` };
    } },
  ],
};

// — Area (programme: comparer, quadrillage, cm², pas de formule mémorisée) —
const area = {
  id: "applied.primary.area",
  level: "primary", domain: "applied",
  title: "L'aire : la place sur la feuille",
  tagline: "Une grandeur nouvelle — qui n'est pas le périmètre, et qui se compte en carreaux.",
  prereqs: ["applied.primary.perimeter"],
  intuition:
    "Combien de **place** occupe une figure sur la feuille ? C'est son **aire** — une grandeur nouvelle, différente du périmètre (le tour) : deux figures peuvent avoir le même tour et des places très différentes !\n\nComme toute grandeur, l'aire se compare d'abord sans nombres (superposer, découper-recoller), puis se mesure avec une **unité** : le carreau du quadrillage, et bientôt le **centimètre carré** (cm²) — un carré de 1 cm de côté.",
  depths: {
    discovery:
      "**Avec les mains** : deux figures découpées — je superpose, je découpe l'une et je recolle ses morceaux sur l'autre : si tout se recouvre exactement, **même aire**. Recoller ne change pas la place occupée.",
    standard:
      "**En image** : sur quadrillage, je **compte les carreaux** — un rectangle de 5 carreaux sur 3 en couvre 15. Tiens : compter 3 rangées de 5, c'est multiplier… Si chaque carreau est un cm², l'aire vaut 15 cm². Aucune formule à apprendre par cœur au CM1 — mais celle que tu viens de découvrir toi-même t'appartient.",
    advanced:
      "**Dans la tête** : le grand piège — aire et périmètre sont **indépendants**. Un rectangle 5 × 3 et un rectangle 6 × 2 ont le même périmètre (16) mais des aires différentes (15 et 12 carreaux). Allonger une figure à périmètre constant l'**amincit** : le tour ne dit rien de la place. Deux grandeurs, deux mesures, zéro confusion.",
  },
  keyIdea: "L'**aire** = la place couverte, comptée en carreaux puis en **cm²**. Même périmètre n'implique pas même aire !",
  why:
    "Pourquoi un carré comme unité d'aire, et pas un rond ? Parce que les carrés **pavent** sans trou ni recouvrement — la feuille se carrelle exactement, et compter devient mesurer. Les ronds laisseraient des interstices : on ne saurait jamais combien de place ils ratent.",
  examples: [
    { title: "Compter, puis multiplier", steps: [
      { p: "Un rectangle de 5 carreaux sur 3 : je compte rangée par rangée." },
      { p: "Trois rangées de cinq : $3 \\times 5 = 15$ carreaux — soit **15 cm²** si le carreau fait 1 cm de côté." },
    ] },
    { title: "Même tour, places différentes", steps: [
      { p: "Rectangle 5 × 3 : périmètre $16$, aire $15$. Rectangle 6 × 2 : périmètre $16$, aire $12$." },
      { p: "Le périmètre n'a pas bougé ; l'aire, si — deux grandeurs **indépendantes**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle différence entre l'aire et le périmètre d'une figure ?", solution: "Le périmètre est la longueur du **tour** ; l'aire est la **place couverte** — un fil contre un tapis." },
    { tier: "warmup", prompt: "Un rectangle couvre 5 carreaux sur 3. Quelle est son aire en carreaux ?", solution: "$3$ rangées de $5$ : $3 \\times 5 = $ **15 carreaux** — compter, c'est multiplier." },
    { tier: "application", prompt: "Chaque carreau mesure 1 cm de côté. Exprime l'aire précédente en cm².", solution: "**15 cm²** — le centimètre carré est le carreau officiel : un carré de 1 cm de côté." },
    { tier: "challenge", prompt: "Compare les rectangles 5 × 3 et 6 × 2 : périmètres ? aires ?", solution: "Périmètres : $5+3+5+3 = 16$ et $6+2+6+2 = 16$ — **égaux**. Aires : **15** et **12** carreaux — différentes ! Même tour, places différentes." },
    { tier: "exam", prompt: "Une figure en L couvre un rectangle de 4 × 3 carreaux plus un carré de 2 × 2. Quelle est son aire ?", solution: "$4 \\times 3 = 12$, plus $2 \\times 2 = 4$ : **16 carreaux** — l'aire d'un assemblage est la somme des aires (recoller ne change rien)." },
  ],
  practice: [
    { tier: "application", label: "Compter les carreaux", make: (r) => {
      const L = randint(r, 3, 9), l = randint(r, 2, 7);
      return { prompt: `Un rectangle couvre ${L} carreaux sur ${l} (carreaux de 1 cm de côté). Quelle est son aire en cm² ?`, answer: L * l, solution: `${l} rangées de ${L} : $${l} \\times ${L} = $ **${L * l} cm²**.` };
    } },
    { tier: "challenge", label: "L'assemblage", make: (r) => {
      const a = randint(r, 3, 7), b = randint(r, 2, 5), c = randint(r, 2, 4);
      return { prompt: `Une figure réunit un rectangle de ${a} × ${b} carreaux et un carré de ${c} × ${c}. Aire totale ?`, answer: a * b + c * c, solution: `$${a * b} + ${c * c} = $ **${a * b + c * c} carreaux** — les aires s'additionnent.` };
    } },
  ],
};

// — The angle as a magnitude (programme: comparer des angles, notations, pas de degrés) —
const angleSize = {
  id: "applied.primary.angle-size",
  level: "primary", domain: "applied",
  title: "Les angles se comparent",
  tagline: "L'angle est une ouverture — pas une longueur de côtés.",
  prereqs: ["geometry.primary.angles"],
  intuition:
    "L'angle droit du CE1 était un cas particulier. Au CM1, l'angle devient une **grandeur** à part entière : l'**ouverture** entre deux côtés — qui se compare, comme les longueurs et les aires.\n\nLe piège fondateur : l'angle ne dépend **pas** de la longueur des côtés ! Deux ciseaux ouverts pareil font le même angle, lames courtes ou longues.",
  depths: {
    discovery:
      "**Avec les mains** : je décalque un angle et je le pose sur l'autre, sommet sur sommet, un côté sur un côté — le deuxième côté départage : celui qui dépasse est le plus **ouvert**. Le gabarit d'angle droit reste l'arbitre des aigus et des obtus.",
    standard:
      "**En image** : l'angle se note avec trois lettres et un chapeau — $\\widehat{ABC}$, le **sommet au milieu** (ici B). On peut aussi marquer un petit arc et l'appeler $\\widehat{a}$. Au cours moyen, tous les angles fréquentés sont **saillants** (moins ouverts qu'un demi-tour).",
    advanced:
      "**Dans la tête** : comparer sans mesurer suffit au CM1 — aucun degré, aucun rapporteur encore. Classer une collection d'angles du plus fermé au plus ouvert, situer chacun par rapport au droit (aigu en dessous, obtus au-dessus) : la grandeur s'installe avant sa mesure, exactement comme l'aire avant le cm² — c'est la méthode de toutes les grandeurs.",
  },
  keyIdea: "L'angle = l'**ouverture**, indépendante de la longueur des côtés. Notation : $\\widehat{ABC}$, sommet au **milieu**.",
  why:
    "Pourquoi l'angle ignore-t-il la longueur des côtés ? Parce que les côtés d'un angle sont des **demi-droites** — infinies en pensée : ce qu'on en dessine n'est qu'un échantillon. Allonger le dessin n'ouvre rien ; seul le pivot compte. C'est l'erreur la plus commune du chapitre — la voir, c'est l'éviter.",
  examples: [
    { title: "Comparer au calque", steps: [
      { p: "Je décalque $\\widehat{ABC}$ et je le superpose à $\\widehat{DEF}$ : sommets confondus, un côté commun." },
      { p: "Le côté libre de $\\widehat{DEF}$ dépasse : $\\widehat{DEF}$ est **plus ouvert**." },
    ] },
    { title: "Lire la notation", steps: [
      { p: "$\\widehat{ABC}$ : trois points, le sommet est la lettre du **milieu** — B." },
      { p: "Les côtés sont les demi-droites partant de B vers A et vers C." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Deux angles ont la même ouverture, mais l'un a des côtés deux fois plus longs. Lequel est le plus grand ?", solution: "**Aucun** : ils sont égaux. L'angle mesure l'**ouverture** — la longueur dessinée des côtés ne compte pas." },
    { tier: "warmup", prompt: "Dans la notation $\\widehat{ABC}$, où est le sommet de l'angle ?", solution: "À la lettre du **milieu** : **B** — les côtés partent de B vers A et vers C." },
    { tier: "application", prompt: "Comment comparer deux angles sans aucun instrument de mesure ?", solution: "Par **superposition** (calque ou découpage) : sommet sur sommet, un côté sur un côté — le côté libre qui dépasse désigne le plus ouvert." },
    { tier: "challenge", prompt: "Classe par rapport à l'angle droit : un angle aigu, un angle obtus.", solution: "L'**aigu** est plus fermé que le droit ; l'**obtus** plus ouvert — le droit reste l'étalon de la famille." },
    { tier: "exam", prompt: "Pourquoi n'utilise-t-on pas encore de degrés au CM1 ?", solution: "Parce que la grandeur s'installe **avant sa mesure** : comparer, classer, estimer — comme l'aire avant le cm². La mesure en degrés viendra quand l'ouverture sera une évidence." },
  ],
  practice: [
    { tier: "warmup", label: "Aigu, droit, obtus", make: (r) => {
      const q = pick(r, [["plus fermé qu'un angle droit", "aigu"], ["plus ouvert qu'un angle droit", "obtus"], ["exactement comme le coin d'une feuille", "droit"]]);
      return { prompt: `Un angle ${q[0]} est un angle…`, answer: q[1], check: { type: "exact" }, solution: `Un angle ${q[0]} est **${q[1]}** — le droit sert d'étalon.` };
    } },
  ],
};

// — Proportionality (programme: linéarité multiplicative en langage naturel, sans tableau) —
const proportionality = {
  id: "applied.primary.proportionality",
  level: "primary", domain: "applied",
  title: "La proportionnalité : fois plus, fois moins",
  tagline: "3 fois plus de pains, 3 fois plus cher — un raisonnement, pas un tableau.",
  prereqs: ["numbers.primary.problems-10000"],
  intuition:
    "« 4 pains aux raisins coûtent 7 €. Combien coûtent 12 pains ? » — 12, c'est **3 fois** 4 : alors le prix est **3 fois** 7, soit 21 €. Pas besoin du prix d'un pain !\n\nC'est la **proportionnalité** : quand deux grandeurs sont liées de sorte que « $k$ fois plus de l'une » donne « $k$ fois plus de l'autre ». Tout le raisonnement tient en une phrase : « si j'achète 3 fois plus, je paie 3 fois plus. »",
  depths: {
    discovery:
      "**Avec les mains** : une pile de 100 feuilles mesure 1 cm. Et 4 fois moins de feuilles ? Une pile **4 fois moins** épaisse. Le raisonnement se dit à voix haute — et c'est ainsi qu'il doit rester : **pas de tableau de proportionnalité au cours moyen**, pas de recette ; des phrases.",
    standard:
      "**En image** : d'abord **reconnaître**. Le prix des pains : proportionnel ✓ (2 fois plus de pains, 2 fois plus cher). L'âge et la taille : non ✗ (à 10 ans on ne mesure pas deux fois sa taille de 5 ans !). Le prix avec livraison fixe : non plus ✗ (doubler la commande ne double pas les 5 € de port). Identifier la situation **avant** de calculer.",
    advanced:
      "**Dans la tête** : la linéarité **multiplicative** est le seul outil du CM1 — ni coefficient, ni produit en croix (ils viendront bien plus tard, quand le sens sera solide). Si le facteur ne tombe pas rond d'un coup, on enchaîne : 4 pains → 7 € ; donc 8 pains → 14 € (×2) ; donc 24 pains → 42 € (×3). Des « fois » en cascade, toujours dits avec des mots.",
  },
  keyIdea: "Proportionnel = « $k$ fois plus de l'une → $k$ fois plus de l'autre ». On **raisonne en phrases** — jamais de tableau, jamais de recette.",
  why:
    "Pourquoi interdire le tableau de proportionnalité, pourtant si pratique ? Parce qu'il fait calculer **sans penser** : on remplit des cases et on oublie de se demander si la situation est proportionnelle. Le programme protège le sens : d'abord des années de phrases — les outils mécaniques attendront que le raisonnement soit incassable.",
  examples: [
    { title: "Les pains aux raisins", steps: [
      { p: "4 pains coûtent 7 €. J'en veux 12 : c'est $3$ fois plus de pains." },
      { p: "« 3 fois plus de pains, 3 fois plus cher » : $3 \\times 7 = $ **21 €** — sans prix unitaire." },
    ] },
    { title: "Reconnaître l'imposteur", steps: [
      { p: "Tee-shirts à 12 € + livraison 5 € : 2 tee-shirts coûtent 29 €." },
      { p: "4 tee-shirts : $53$ € — pas $58$ ! La livraison fixe casse la proportionnalité." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "4 pains coûtent 7 €. Combien coûtent 12 pains — sans calculer le prix d'un pain ?", solution: "12 = 3 fois 4 : « 3 fois plus de pains, 3 fois plus cher » → $3 \\times 7 = $ **21 €**." },
    { tier: "warmup", prompt: "Une pile de 100 feuilles mesure 1 cm. Que dire d'une pile de 25 feuilles ?", solution: "4 fois moins de feuilles → pile **4 fois moins épaisse** — la linéarité marche aussi en « fois moins »." },
    { tier: "application", prompt: "L'âge et la taille d'un enfant sont-ils proportionnels ? Justifie.", solution: "**Non** : à 10 ans, on ne mesure pas le double de sa taille de 5 ans. « Fois plus » d'un côté ne donne pas « fois plus » de l'autre — la situation n'est pas proportionnelle." },
    { tier: "challenge", prompt: "4 pains coûtent 7 €. Trouve le prix de 24 pains en enchaînant des « fois ».", solution: "8 pains : $14$ € (×2) ; 24 pains : $3 \\times 14 = $ **42 €** (×3) — des fois en cascade, toujours en phrases." },
    { tier: "exam", prompt: "Avec livraison fixe de 5 € et tee-shirts à 12 €, le prix total est-il proportionnel au nombre de tee-shirts ?", solution: "**Non** : 1 tee-shirt → 17 €, 2 tee-shirts → 29 € (pas 34 !). Le terme fixe casse le « fois plus » — d'ailleurs la formule $(N \\times 12) + 5$ n'est pas un simple « $N$ fois quelque chose »." },
  ],
  practice: [
    { tier: "application", label: "Fois plus, en phrases", make: (r) => {
      const n = pick(r, [3, 4, 5, 6]), p = randint(r, 5, 14), k = randint(r, 2, 5);
      return { prompt: `${n} cahiers coûtent ${p} €. Combien coûtent ${k * n} cahiers ? (raisonne en « fois plus »)`, answer: k * p, solution: `${k * n} = ${k} fois ${n} : « ${k} fois plus de cahiers, ${k} fois plus cher » → $${k} \\times ${p} = $ **${k * p} €**.` };
    } },
    { tier: "challenge", label: "Fois moins", make: (r) => {
      const k = pick(r, [2, 3, 4]), base = randint(r, 3, 8); const n = k * base; const ep = k * randint(r, 2, 6);
      return { prompt: `Une pile de ${n} livres mesure ${ep} cm. Quelle hauteur pour ${base} livres ?`, answer: ep / k, solution: `${base} = ${n} divisé par ${k} : « ${k} fois moins de livres, pile ${k} fois moins haute » → $${ep} \\div ${k} = $ **${ep / k} cm**.` };
    } },
  ],
};

export default [convertDecimal, area, angleSize, proportionality];
