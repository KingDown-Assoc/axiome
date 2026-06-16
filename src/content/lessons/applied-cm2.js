// Field "Applied" — PRIMARY module (CM2 year): area units (cm², dm², m²) with
// conversions (×100 per step!) and the rectangle area determined; the degree
// introduced from the right angle = 90° (no protractor before collège — sums,
// multiples, halving by folding); seconds and the analog clock; proportionality
// enriched with ADDITIVE linearity (still no tables, no coefficient, no cross
// products). Official cycle-3 programme (2025).
import { randint, pick } from "../../core/exercises.js";

// — Area units and conversions (programme: cm², dm², m², convertir, aire du rectangle) —
const areaUnits = {
  id: "applied.primary.area-units",
  level: "primary", domain: "applied",
  title: "Aires : le mètre carré et le piège du cent",
  tagline: "1 m² = 100 dm² — les aires convertissent au carré.",
  prereqs: ["applied.primary.area"],
  intuition:
    "Le carreau officiel s'agrandit : après le **cm²**, voici le **dm²** et le **m²**. Et le piège fondateur : $1$ m $= 10$ dm, mais $1$ m² $= \\textbf{100}$ dm² ! Un carré d'un mètre de côté contient 10 rangées de 10 petits carrés — cent, pas dix.\n\nEt l'aire du rectangle se **détermine** : longueur × largeur — la règle que tu avais construite toi-même au CM1 devient un outil officiel.",
  depths: {
    discovery:
      "**Avec les mains** : un mètre carré tracé à la craie au sol, quadrillé en décimètres — compte : 10 rangées de 10 : **100 carrés** d'un décimètre de côté. Le « carré » du nom double l'échelle de conversion.",
    standard:
      "**En image** : la chaîne des aires saute de cent en cent — $1$ m² $= 100$ dm² $= 10\\,000$ cm². Convertir suit la relation, comme toujours : $3{,}5$ m² $= 350$ dm² (« car 1 m² = 100 dm² »). Et le rectangle se calcule : $7$ cm $\\times 4$ cm $= 28$ cm² — la multiplication compte les carreaux d'un coup.",
    advanced:
      "**Dans la tête** : pourquoi ×100 ? Parce qu'une aire a **deux dimensions** — agrandir le côté ×10 agrandit la longueur ×10 **et** la largeur ×10 : l'aire encaisse les deux, $10 \\times 10 = 100$. Ce raisonnement (le facteur s'applique à chaque dimension) reviendra pour les volumes, où il fera ×1 000. Comprendre le carré du nom, c'est comprendre la dimension.",
  },
  keyIdea: "Aires : chaque saut d'unité vaut **×100** ($1$ m² $= 100$ dm² $= 10\\,000$ cm²). Aire du rectangle : **longueur × largeur**.",
  why:
    "Pourquoi l'aire du rectangle est-elle un produit ? Regarde le quadrillage : $4$ rangées de $7$ carreaux — compter rangée par rangée, c'est exactement multiplier. La formule n'est pas un décret : c'est le comptage du CM1, compacté. Les meilleures formules sont des comptages qu'on a compris.",
  examples: [
    { title: "Le mètre carré décortiqué", steps: [
      { p: "Côté : $1$ m $= 10$ dm. Le carré : $10$ rangées de $10$ carrés d'un dm." },
      { p: "$10 \\times 10 = 100$ : $1$ m² $= $ **100 dm²** — le carré du nom double l'échelle." },
    ] },
    { title: "L'aire d'un rectangle de 7 cm × 4 cm", steps: [
      { p: "4 rangées de 7 carreaux d'un cm² : $7 \\times 4$." },
      { p: "Aire $= $ **28 cm²** — la formule compte les carreaux d'un coup." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "1 m = 10 dm. Pourquoi 1 m² vaut-il 100 dm² et non 10 ?", solution: "Parce que l'aire a **deux dimensions** : 10 rangées de 10 carrés — $10 \\times 10 = $ **100 dm²**." },
    { tier: "warmup", prompt: "Calcule l'aire d'un rectangle de 7 cm sur 4 cm.", solution: "$7 \\times 4 = $ **28 cm²** — longueur × largeur." },
    { tier: "application", prompt: "Convertis 3,5 m² en dm², puis 2 m² en cm².", solution: "$3{,}5 \\times 100 = $ **350 dm²** ; $2 \\times 10\\,000 = $ **20 000 cm²** — deux sauts de cent." },
    { tier: "challenge", prompt: "Un carré a 9 cm de côté. Donne son aire et son périmètre — et vérifie que ce sont deux grandeurs différentes.", solution: "Aire : $9 \\times 9 = $ **81 cm²** ; périmètre : $4 \\times 9 = $ **36 cm**. Des cm² contre des cm : deux unités, deux grandeurs." },
    { tier: "exam", prompt: "Une chambre rectangulaire mesure 4 m sur 3 m. Combien de dalles carrées de 1 dm de côté pour couvrir le sol ?", solution: "Aire : $4 \\times 3 = 12$ m² $= 12 \\times 100 = $ **1 200 dalles** d'un dm² — la conversion ×100 fait tout le travail." },
  ],
  practice: [
    { tier: "warmup", label: "L'aire du rectangle", make: (r) => {
      const L = randint(r, 4, 12), l = randint(r, 2, 9);
      return { prompt: `Calcule l'aire d'un rectangle de ${L} cm sur ${l} cm.`, answer: L * l, solution: `$${L} \\times ${l} = $ **${L * l} cm²**.` };
    } },
    { tier: "application", label: "Le saut de cent", make: (r) => {
      const e = randint(r, 1, 8), d = randint(r, 0, 9);
      const v = e + d / 10;
      return { prompt: `Convertis $${e}${d ? "{,}" + d : ""}$ m² en dm².`, answer: 100 * v, solution: `$1$ m² $= 100$ dm² → **${100 * v} dm²**.` };
    } },
  ],
};

// — The degree (programme: 90° depuis l'angle droit, sommes et multiples, pas de rapporteur) —
const degrees = {
  id: "applied.primary.degrees",
  level: "primary", domain: "applied",
  title: "Le degré : 90 pour commencer",
  tagline: "L'angle droit vaut 90°, et on en déduit les autres par pliage et addition.",
  prereqs: ["applied.primary.angle-size"],
  intuition:
    "L'angle gagne enfin son unité : le **degré**. Point d'ancrage unique : **l'angle droit mesure 90°**. Tout le reste s'en déduit — sans rapporteur (il attendra le collège) !\n\nPlie un angle droit en deux : chaque moitié fait **45°**. Accole un droit et sa moitié : **135°**. Deux droits : 180° — le demi-tour, l'angle plat.",
  depths: {
    discovery:
      "**Avec les mains** : le coin d'une feuille = 90°. Plié en deux coin sur coin : 45°. Replié : 22,5°… Le pliage divise, l'accolement additionne — les angles se **construisent** avant de se mesurer.",
    standard:
      "**En image** : les angles s'additionnent comme des grandeurs — accoler un angle de 90° et un de 45° (sommet commun, un côté partagé) fabrique un angle de $90 + 45 = 135°$. Et les multiples : trois fois 30°, c'est 90° — donc l'angle de 30° est le **tiers** du droit. L'arithmétique des angles, sans aucun instrument.",
    advanced:
      "**Dans la tête** : l'étalon 90° **classe** tout — l'aigu vit sous 90°, l'obtus entre 90° et 180°, le plat fait pile 180° (deux droits alignés). Et une question d'avance : pourquoi 90, pourquoi pas 100 ? Héritage babylonien — le tour complet vaut 360°, nombre adoré pour ses innombrables diviseurs (le voilà, ton chapitre des diviseurs !). Le rapporteur du collège ne fera que lire ce que tu sais déjà construire.",
  },
  keyIdea: "**Angle droit = 90°** — l'unique fait à retenir. Pliages (moitiés), accolements (sommes) et multiples déduisent tout le reste.",
  why:
    "Pourquoi introduire le degré sans donner le rapporteur ? Pour que le nombre ait un **sens** avant d'avoir un instrument : 45° doit évoquer « la moitié d'un droit », pas « la graduation lue ». Mesurer sans comprendre fabrique des lecteurs de cadrans ; construire d'abord fabrique des géomètres.",
  examples: [
    { title: "Fabriquer 135° sans rapporteur", steps: [
      { p: "Un angle droit (90°) ; contre lui, sa moitié pliée (45°), sommet commun." },
      { p: "Ensemble : $90 + 45 = $ **135°** — l'accolement additionne les ouvertures." },
    ] },
    { title: "Situer 30°", steps: [
      { p: "$3 \\times 30 = 90$ : trois angles de 30° remplissent un droit." },
      { p: "30° est donc le **tiers de l'angle droit** — un aigu bien fermé." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien mesure un angle droit ? Et sa moitié, obtenue par pliage ?", solution: "**90°** — et la moitié pliée : **45°**. Tout le chapitre tient sur ce seul fait et des pliages." },
    { tier: "warmup", prompt: "Quel angle obtient-on en accolant un angle droit et un angle de 45° ?", solution: "$90 + 45 = $ **135°** — un bel obtus." },
    { tier: "application", prompt: "Un angle de 30° : quelle fraction de l'angle droit représente-t-il ?", solution: "$3 \\times 30 = 90$ : c'est le **tiers** de l'angle droit." },
    { tier: "challenge", prompt: "Classe avec l'étalon 90° : un angle de 72°, un de 90°, un de 154°, un de 180°.", solution: "72° : **aigu** (sous le droit) ; 90° : **droit** ; 154° : **obtus** (entre droit et plat) ; 180° : **plat** — deux droits alignés." },
    { tier: "exam", prompt: "Sans rapporteur, explique comment construire un angle de 45° exact, puis un de 135°.", solution: "45° : plier un angle droit (coin de feuille) **en deux**, côtés superposés. 135° : **accoler** ce 45° contre un angle droit, sommet commun, un côté partagé — $90 + 45 = 135°$. Construire, c'est déjà mesurer." },
  ],
  practice: [
    { tier: "warmup", label: "L'arithmétique des angles", make: (r) => {
      const q = pick(r, [
        ["un angle droit et un angle de 45°", 135],
        ["deux angles droits", 180],
        ["la moitié d'un angle droit", 45],
        ["un angle droit et un angle de 30°", 120],
        ["le tiers d'un angle droit", 30],
        ["un angle plat et un angle droit", 270],
      ]);
      return { prompt: `Combien de degrés font ${q[0]} (accolés) ?`, answer: q[1], solution: `À partir de 90° : **${q[1]}°**.` };
    } },
  ],
};

// — Seconds and the analog clock (programme: les secondes, lire l'heure, h/min/s) —
const seconds = {
  id: "applied.primary.seconds",
  level: "primary", domain: "applied",
  title: "Les secondes",
  tagline: "Les secondes : la base 60 d'un cran plus bas, avec la trotteuse.",
  prereqs: ["applied.primary.time-minutes"],
  intuition:
    "La minute se découpe à son tour : **1 min = 60 s** — la même base 60 qui liait l'heure à la minute. Trois étages désormais : $1$ h $= 60$ min $= 3\\,600$ s.\n\nSur l'horloge, la **trotteuse** fait un tour par minute — l'aiguille la plus rapide, la seule qu'on voit vraiment bouger.",
  depths: {
    discovery:
      "**Avec les mains** : compte « une seconde » à voix posée — c'est le battement de la trotteuse. Soixante battements : la grande aiguille saute d'une graduation. La base 60 se vit avant de se calcule.",
    standard:
      "**En image** : lire l'heure complète — petite aiguille (heures), grande (minutes), trotteuse (secondes) : 10 h 24 min 37 s. Et les conversions enchaînent les ×60 : $2$ min $30$ s $= 150$ s ; $200$ s $= 3$ min $20$ s (trois paquets de 60 et un reste de 20 — ta division euclidienne !).",
    advanced:
      "**Dans la tête** : les calculs de durées traversent les étages — un footing commence à 9 h 47 min 20 s et dure 25 min 50 s : les secondes d'abord ($20 + 50 = 70$ s $= 1$ min $10$ s : retenue !), puis les minutes ($47 + 25 + 1 = 73 = 1$ h $13$ : retenue encore) → fin à **10 h 13 min 10 s**. Les retenues passent à 60, jamais à 10 — la virgule reste bannie du temps.",
  },
  keyIdea: "$1$ min $= 60$ s, $1$ h $= 3\\,600$ s — les retenues du temps passent à **60**. La division euclidienne convertit les secondes en min + s.",
  why:
    "Pourquoi la trotteuse s'appelle-t-elle ainsi ? Parce qu'elle **trotte** — visible à l'œil nu, elle rend le temps tangible : une minute d'attente se compte sur elle. Les horlogers l'ont ajoutée pour les médecins (compter un pouls !) — la seconde est née d'un besoin de précision, comme toute unité.",
  examples: [
    { title: "200 secondes en min + s", steps: [
      { p: "Combien de paquets de 60 dans 200 ? $200 \\div 60 = 3$, reste $20$." },
      { p: "$200$ s $= $ **3 min 20 s** — la division euclidienne au service du temps." },
    ] },
    { title: "Le footing à retenues", steps: [
      { p: "Départ 9 h 47 min 20 s + durée 25 min 50 s. Secondes : $70$ s $= 1$ min $10$ s." },
      { p: "Minutes : $47 + 25 + 1 = 73 = 1$ h $13$ min → arrivée **10 h 13 min 10 s**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de secondes dans une minute ? Dans une heure ?", solution: "$1$ min $= $ **60 s** ; $1$ h $= 60 \\times 60 = $ **3 600 s** — la base 60, deux étages." },
    { tier: "warmup", prompt: "Convertis 2 min 30 s en secondes.", solution: "$2 \\times 60 + 30 = $ **150 s**." },
    { tier: "application", prompt: "Convertis 200 s en minutes et secondes.", solution: "$200 \\div 60 = 3$ reste $20$ : **3 min 20 s** — la division euclidienne fait la monnaie du temps." },
    { tier: "challenge", prompt: "Un footing commence à 9 h 47 min 20 s et dure 25 min 50 s. À quelle heure finit-il ?", solution: "Secondes : $70 = 1$ min $10$ s ; minutes : $47 + 25 + 1 = 73 = 1$ h $13$ → **10 h 13 min 10 s** — deux retenues, toutes à 60." },
    { tier: "exam", prompt: "Lina écrit : « 1,5 min = 1 min 5 s ». Corrige et explique.", solution: "$1{,}5$ min = une minute **et demie** = 1 min **30 s** — la demi-minute vaut 30 s, pas 5. Le temps compte en base 60 : la virgule décimale y est une étrangère." },
  ],
  practice: [
    { tier: "warmup", label: "Les étages du temps", make: (r) => {
      if (r() < 0.5) { const m = randint(r, 1, 5), s = randint(r, 1, 59); return { prompt: `Convertis ${m} min ${s} s en secondes.`, answer: 60 * m + s, solution: `$${m} \\times 60 + ${s} = $ **${60 * m + s} s**.` }; }
      const m = randint(r, 2, 8), s = randint(r, 1, 59); const total = 60 * m + s;
      return { prompt: `Convertis ${total} s en minutes et secondes. Réponds par le nombre de secondes restantes.`, answer: s, solution: `$${total} \\div 60 = ${m}$ reste **${s}** : ${m} min ${s} s.` };
    } },
    { tier: "application", label: "Les retenues à 60", make: (r) => {
      const m1 = randint(r, 10, 45), s1 = randint(r, 25, 55); const m2 = randint(r, 5, 30), s2 = randint(r, 20, 55);
      const totalS = s1 + s2; const sFin = totalS % 60; const mFin = m1 + m2 + Math.floor(totalS / 60);
      return { prompt: `Une durée de ${m1} min ${s1} s suivie d'une durée de ${m2} min ${s2} s : combien en tout ? Réponds par le nombre total de minutes.`, answer: mFin, solution: `Secondes : $${s1} + ${s2} = ${totalS}$ s $= ${Math.floor(totalS / 60)}$ min $${sFin}$ s ; minutes : $${m1} + ${m2} + ${Math.floor(totalS / 60)} = $ **${mFin} min** (et ${sFin} s).` };
    } },
  ],
};

// — Additive linearity (programme: linéarité pour la multiplication ET l'addition) —
const proportionalityAdd = {
  id: "applied.primary.proportionality-add",
  level: "primary", domain: "applied",
  title: "Proportionnalité : additionner les raisons",
  tagline: "4 pains + 8 pains = 12 pains — alors 7 € + 14 € = 21 €.",
  prereqs: ["applied.primary.proportionality"],
  intuition:
    "Au CM1, le « fois plus ». Au CM2, un deuxième levier : l'**addition**. Si 4 pains coûtent 7 € et 8 pains coûtent 14 €, alors **12 pains** (= 4 + 8) coûtent **21 €** (= 7 + 14) — les quantités s'ajoutent, les prix suivent.\n\nDeux leviers combinables à volonté — et toujours en phrases : ni tableau, ni coefficient, ni produit en croix au cours moyen.",
  depths: {
    discovery:
      "**Avec les mains** : deux sachets sur la table — celui de 4 pains (7 €) et celui de 8 (14 €). Les réunir, c'est réunir les prix : la linéarité additive se touche.",
    standard:
      "**En image** : les leviers s'enchaînent — 4 pains : 7 €. Alors 8 pains : 14 € (**×2**). Alors 12 pains : $7 + 14 = 21$ € (**addition**). Alors 2 pains : 3,50 € (**÷2**). Alors 14 pains : $21 + 3{,}50 = 24{,}50$ € (**addition encore**) — de proche en proche, tout devient accessible, sans jamais calculer le prix d'un pain.",
    advanced:
      "**Dans la tête** : le levier additif **démasque** aussi les imposteurs — tee-shirts à 12 € + livraison 5 € : 1 tee-shirt → 17 €, 2 → 29 €. Si c'était proportionnel, $17 + 17 = 34$ devrait être le prix de $1 + 2 = 3$ tee-shirts… or 3 tee-shirts coûtent 41 €. L'addition des quantités n'additionne pas les prix : la situation avoue. Deux tests valent mieux qu'un.",
  },
  keyIdea: "Si les quantités s'**ajoutent**, les valeurs s'ajoutent — second levier, combinable avec le « fois plus », toujours en phrases.",
  why:
    "Pourquoi deux leviers quand le « fois plus » suffisait souvent ? Parce que 14 n'est ni le double ni le triple de 4 — mais $14 = 4 + 8 + 2$ : l'addition atteint ce que la multiplication seule manque. Ensemble, les deux leviers couvrent **tous** les nombres — c'est leur somme qui fait la puissance.",
  examples: [
    { title: "12 pains par l'addition", steps: [
      { p: "4 pains : 7 €. 8 pains : 14 € (le double)." },
      { p: "$12 = 4 + 8$ pains → $7 + 14 = $ **21 €** — les prix suivent l'addition." },
    ] },
    { title: "14 pains de proche en proche", steps: [
      { p: "2 pains : $7 \\div 2 = 3{,}50$ € (fois moins)." },
      { p: "$14 = 12 + 2$ → $21 + 3{,}50 = $ **24,50 €** — leviers combinés." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "4 pains coûtent 7 € et 8 pains coûtent 14 €. Combien coûtent 12 pains, par l'addition ?", solution: "$12 = 4 + 8$, donc $7 + 14 = $ **21 €** — les quantités s'ajoutent, les prix suivent." },
    { tier: "warmup", prompt: "5 cahiers coûtent 8 € et 10 cahiers coûtent 16 €. Combien coûtent 15 cahiers ?", solution: "$15 = 5 + 10$ → $8 + 16 = $ **24 €**." },
    { tier: "application", prompt: "4 pains coûtent 7 €. Trouve le prix de 14 pains en combinant les deux leviers.", solution: "8 pains : 14 € (×2) ; 2 pains : 3,50 € (÷2) ; $14 = 8 + 4 + 2$ → $14 + 7 + 3{,}50 = $ **24,50 €** — multiplication et addition main dans la main." },
    { tier: "challenge", prompt: "1 tee-shirt (avec livraison) coûte 17 €, 2 coûtent 29 €. Utilise l'addition pour montrer que ce n'est pas proportionnel.", solution: "Si c'était proportionnel : $1 + 2 = 3$ tee-shirts coûteraient $17 + 29 = 46$ €. Or 3 tee-shirts coûtent $3 \\times 12 + 5 = 41$ € — l'addition **dément** : la livraison fixe casse la linéarité." },
    { tier: "exam", prompt: "Une pile de 100 feuilles mesure 1 cm, une pile de 50 en mesure 0,5. Quelle hauteur pour 150 feuilles ? Et pour 250 ?", solution: "$150 = 100 + 50$ → $1 + 0{,}5 = $ **1,5 cm**. $250 = 100 + 100 + 50$ → $1 + 1 + 0{,}5 = $ **2,5 cm** — l'addition empile les raisons comme les feuilles." },
  ],
  practice: [
    { tier: "application", label: "Additionner les raisons", make: (r) => {
      const q1 = pick(r, [3, 4, 5]); const p1 = randint(r, 5, 12); const k = 2;
      return { prompt: `${q1} croissants coûtent ${p1} € et ${k * q1} croissants coûtent ${k * p1} €. Combien coûtent ${q1 + k * q1} croissants ?`, answer: p1 + k * p1, solution: `$${q1 + k * q1} = ${q1} + ${k * q1}$ → $${p1} + ${k * p1} = $ **${p1 + k * p1} €** — les prix suivent l'addition.` };
    } },
    { tier: "challenge", label: "Leviers combinés", make: (r) => {
      const q = pick(r, [4, 6, 8]); const p = q * randint(r, 2, 5) / 2; // prix pour q, demi-prix propre
      const cible = q + q / 2;
      return { prompt: `${q} gâteaux coûtent ${String(p).replace(".", ",")} €. Combien coûtent ${cible} gâteaux ? (combine ÷2 et addition)`, answer: p + p / 2, solution: `${q / 2} gâteaux : $${String(p / 2).replace(".", ",")}$ € (÷2) ; $${cible} = ${q} + ${q / 2}$ → $${String(p).replace(".", ",")} + ${String(p / 2).replace(".", ",")} = $ **${String(p + p / 2).replace(".", ",")} €**.` };
    } },
  ],
};

export default [areaUnits, degrees, seconds, proportionalityAdd];
