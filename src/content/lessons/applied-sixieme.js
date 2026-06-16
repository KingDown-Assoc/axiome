// Field "Applied" — MIDDLE module (6e year): the perimeter of a disc proportional
// to its diameter (π discovered by measurement), formulas as a first taste of
// literal calculus (substituting a value for a letter, decimal area conversions),
// the cm³ and volumes counted by layers of cubes, and proportionality FORMALIZED:
// return to the unit, the table now allowed (with named quantities and units),
// arrows, and scale problems — cross products still not taught. Official programme.
import { randint, pick } from "../../core/exercises.js";

// — The perimeter of a disc (programme: proportionnel au diamètre, formule, π) —
const circlePerimeter = {
  id: "applied.middle.circle-perimeter",
  level: "middle", domain: "applied",
  title: "Le périmètre du disque",
  tagline: "Le tour vaut toujours environ 3,14 fois le diamètre — voici π.",
  prereqs: ["applied.primary.perimeter", "numbers.middle.decimal-product"],
  intuition:
    "Mesure à la ficelle le tour d'une assiette, d'une boîte, d'une roue — puis leur diamètre. Divise : le rapport tombe **toujours** autour de 3,14. Le tour d'un disque est **proportionnel** à son diamètre, et le coefficient porte un nom grec : **π** (pi).\n\nD'où la formule : $P = \\pi \\times d$ — ou, le diamètre valant deux rayons, $P = 2 \\times \\pi \\times r$.",
  depths: {
    discovery:
      "**Avec les mains** : l'expérience de la ficelle est la proportionnalité **vécue** — trois objets ronds, trois mesures, trois quotients : 3,1 ; 3,15 ; 3,14… Le rapport constant saute aux yeux avant toute formule : c'est exactement « identifier une situation de proportionnalité ».",
    standard:
      "**En image** : la formule est une machine à **substituer** — une roue de diamètre $d = 60$ cm : $P = \\pi \\times 60 \\approx 3{,}14 \\times 60 = 188{,}4$ cm. Remplacer la lettre par sa valeur, puis calculer : ton premier calcul littéral. Les figures composées s'assemblent : un demi-cercle de diamètre 10 fermé par son diamètre : $\\frac{3{,}14 \\times 10}{2} + 10 = 25{,}7$.",
    advanced:
      "**Dans la tête** : π est un nombre extraordinaire — comme $\\frac{1}{3}$, il n'est **pas décimal** : $3{,}14159265…$ sans fin ni motif (pire que $\\frac{1}{3}$ : même la fraction ne peut pas l'écrire exactement — il est *irrationnel*, mot du lycée). On calcule donc avec une **valeur approchée** ($\\approx 3{,}14$) et on l'assume : tout périmètre de disque est un arrondi honnête. Les Babyloniens prenaient 3 ; Archimède l'a coincé entre $3 + \\frac{10}{71}$ et $3 + \\frac{1}{7}$ — la chasse à π a deux mille ans et tu viens d'y entrer.",
  },
  keyIdea: "$P = \\pi \\times d = 2 \\times \\pi \\times r$, avec $\\pi \\approx 3{,}14$ — le tour est **proportionnel** au diamètre, et π est le coefficient universel.",
  why:
    "Pourquoi le même π pour la pièce de monnaie et la roue de camion ? Parce que tous les cercles sont **le même dessin à des échelles différentes** : agrandir multiplie le tour et le diamètre par le même facteur — leur rapport ne bronche pas. π n'appartient à aucun cercle : il appartient à la rondeur elle-même.",
  examples: [
    { title: "L'expérience de la ficelle", steps: [
      { p: "Assiette : tour 78,5 cm, diamètre 25 cm — $78{,}5 \\div 25 = 3{,}14$." },
      { p: "Boîte : tour 26 cm, diamètre 8,3 cm — $\\approx 3{,}13$ : le rapport résiste — c'est π." },
    ] },
    { title: "Substituer dans la formule", steps: [
      { p: "Roue de diamètre 60 cm : $P = \\pi \\times d$." },
      { p: "$P \\approx 3{,}14 \\times 60 = $ **188,4 cm** — la lettre reçoit sa valeur, la formule calcule." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "On mesure le tour et le diamètre de trois objets ronds : les quotients donnent 3,13 ; 3,14 ; 3,15. Que conclure ?", solution: "Le tour est **proportionnel** au diamètre — le rapport est constant (aux erreurs de mesure près) : c'est **π** ≈ 3,14, le même pour tous les cercles." },
    { tier: "warmup", prompt: "Calcule le périmètre d'un disque de diamètre 10 cm (π ≈ 3,14).", solution: "$P = \\pi \\times d \\approx 3{,}14 \\times 10 = $ **31,4 cm**." },
    { tier: "application", prompt: "Une roue a un rayon de 30 cm. Quel est son périmètre ?", solution: "$P = 2 \\times \\pi \\times r \\approx 2 \\times 3{,}14 \\times 30 = $ **188,4 cm** — le diamètre vaut deux rayons." },
    { tier: "challenge", prompt: "Calcule le périmètre d'une figure formée d'un demi-cercle de diamètre 10 cm, fermé par son diamètre.", solution: "Demi-tour : $\\frac{3{,}14 \\times 10}{2} = 15{,}7$ ; plus le diamètre : $15{,}7 + 10 = $ **25,7 cm** — ne pas oublier le segment qui ferme !" },
    { tier: "exam", prompt: "Pourquoi tous les périmètres de disques calculés avec 3,14 sont-ils des valeurs approchées ?", solution: "Parce que π **n'est pas un nombre décimal** : $3{,}14159…$ continue sans fin ni motif — 3,14 n'est qu'un arrondi au centième. Tout résultat hérite de cette approximation : l'exactitude appartient à la formule $P = \\pi d$, pas à son évaluation." },
  ],
  practice: [
    { tier: "application", label: "La formule substituée", make: (r) => {
      if (r() < 0.5) { const d = pick(r, [10, 20, 30, 40, 50, 100]); return { prompt: `Périmètre d'un disque de diamètre ${d} cm (π ≈ 3,14) ?`, answer: Math.round(3.14 * d * 100) / 100, solution: `$3{,}14 \\times ${d} = $ **${String(Math.round(3.14 * d * 100) / 100).replace(".", ",")} cm**.` }; }
      const rr = pick(r, [5, 10, 15, 20, 50]);
      return { prompt: `Périmètre d'un disque de rayon ${rr} cm (π ≈ 3,14) ?`, answer: Math.round(2 * 3.14 * rr * 100) / 100, solution: `$2 \\times 3{,}14 \\times ${rr} = $ **${String(Math.round(2 * 3.14 * rr * 100) / 100).replace(".", ",")} cm**.` };
    } },
  ],
};

// — Formulas and area conversions (programme: formules, calcul littéral, 1 cm² = 0,01 dm²) —
const formulas = {
  id: "applied.middle.formulas",
  level: "middle", domain: "applied",
  title: "Des formules pour calculer",
  tagline: "P = 4 × c : la lettre est une place vide qui attend sa valeur.",
  prereqs: ["applied.primary.area-units"],
  intuition:
    "Les règles que tu construisais deviennent des **formules officielles** : $P = 4 \\times c$ (carré), $P = 2 \\times (L + l)$ (rectangle), $A = c \\times c$, $A = L \\times l$. La lettre n'est pas un mystère : c'est une **place vide** — donne-lui une valeur, la formule calcule.\n\nC'est ta première rencontre avec le **calcul littéral** : écrire une fois, calculer mille fois.",
  depths: {
    discovery:
      "**Avec les mains** : la formule du carré, tu l'avais établie toi-même au CM1 (« le périmètre est le quadruple du côté ») — elle gagne juste son habit de lettres : $P = 4 \\times c$. Substituer $c = 7$ : $P = 4 \\times 7 = 28$ cm. La lettre se remplace, rien d'autre.",
    standard:
      "**En image** : les conversions d'aires s'écrivent désormais en décimal — $1$ m² $= 100$ dm², donc $1$ dm² $= \\frac{1}{100}$ m² $= 0{,}01$ m² ; et $1$ cm² $= 0{,}01$ dm². Convertir descend aussi : $350$ dm² $= 3{,}5$ m² (÷100). Le saut de **cent** par étage, dans les deux sens.",
    advanced:
      "**Dans la tête** : les figures **composées** se découpent — un L de 8 sur 6 amputé d'un coin de 3 sur 2 : $A = 8 \\times 6 - 3 \\times 2 = 42$ cm². Additionner ou soustraire des aires de rectangles couvre une infinité de formes. Et la formule révèle sa vraie nature : une **fonction** avant l'heure — à chaque valeur de $c$, elle associe un périmètre. Le mot attendra ; l'idée est là.",
  },
  keyIdea: "**Substituer** : remplacer la lettre par sa valeur, puis calculer. Aires : $1$ cm² $= 0{,}01$ dm², $1$ dm² $= 0{,}01$ m² — le cent dans les deux sens.",
  why:
    "Pourquoi des lettres plutôt que des phrases (« le quadruple du côté ») ? Pour la **densité** : $P = 4 \\times c$ tient sur un timbre, se substitue sans relecture, et se manipulera bientôt (au cycle 4, on transformera les formules elles-mêmes). La phrase explique ; la formule travaille.",
  examples: [
    { title: "Substituer c = 7", steps: [
      { p: "Carré de côté 7 cm : $P = 4 \\times c$." },
      { p: "$P = 4 \\times 7 = $ **28 cm** — et $A = c \\times c = 49$ cm²." },
    ] },
    { title: "Convertir en descendant", steps: [
      { p: "$350$ dm² en m² : un étage vers le haut de l'échelle = ÷100." },
      { p: "$350 \\div 100 = $ **3,5 m²** — et l'écriture mémo : $1$ dm² $= 0{,}01$ m²." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans la formule $P = 4 \\times c$, que représente la lettre $c$, et que fait-on pour calculer ?", solution: "Le **côté** du carré — une place vide : on **substitue** sa valeur ($c = 7$ → $P = 28$ cm) et la formule calcule." },
    { tier: "warmup", prompt: "Calcule le périmètre et l'aire d'un rectangle de 9 cm sur 4 cm avec les formules.", solution: "$P = 2 \\times (9 + 4) = $ **26 cm** ; $A = 9 \\times 4 = $ **36 cm²**." },
    { tier: "application", prompt: "Convertis 350 dm² en m², puis 2,7 m² en dm².", solution: "$350 \\div 100 = $ **3,5 m²** ; $2{,}7 \\times 100 = $ **270 dm²** — le cent, dans les deux sens." },
    { tier: "challenge", prompt: "Une figure en L : un rectangle de 8 cm sur 6 cm amputé d'un coin rectangulaire de 3 cm sur 2 cm. Quelle aire ?", solution: "$8 \\times 6 - 3 \\times 2 = 48 - 6 = $ **42 cm²** — les composées se découpent en rectangles." },
    { tier: "exam", prompt: "Complète : $1$ cm² $= …$ dm² (écriture décimale), et explique pourquoi ce n'est pas 0,1.", solution: "$1$ cm² $= $ **0,01 dm²** — l'aire a **deux dimensions** : le côté est dix fois plus petit, l'aire cent fois ($10 \\times 10$) : le centième, jamais le dixième." },
  ],
  practice: [
    { tier: "warmup", label: "Substituer dans la formule", make: (r) => {
      if (r() < 0.5) { const c = randint(r, 3, 15); return { prompt: `Carré de côté ${c} cm : calcule $P = 4 \\times c$.`, answer: 4 * c, solution: `$4 \\times ${c} = $ **${4 * c} cm**.` }; }
      const L = randint(r, 5, 14), l = randint(r, 2, 9);
      return { prompt: `Rectangle de ${L} sur ${l} cm : calcule $P = 2 \\times (L + l)$.`, answer: 2 * (L + l), solution: `$2 \\times (${L} + ${l}) = 2 \\times ${L + l} = $ **${2 * (L + l)} cm**.` };
    } },
    { tier: "application", label: "Le cent des aires", make: (r) => {
      const v = randint(r, 2, 9) * 100 + randint(r, 1, 9) * 10;
      if (r() < 0.5) return { prompt: `Convertis ${v} dm² en m².`, answer: v / 100, solution: `$${v} \\div 100 = $ **${String(v / 100).replace(".", ",")} m²**.` };
      const w = randint(r, 1, 8) + randint(r, 1, 9) / 10;
      return { prompt: `Convertis $${String(w).replace(".", ",")}$ m² en dm².`, answer: 100 * w, solution: `$\\times 100$ : **${Math.round(100 * w)} dm²**.` };
    } },
  ],
};

// — Volume in cm³ (programme: l'unité centimètre cube, comparer, déterminer, vision espace) —
const volume = {
  id: "applied.middle.volume",
  level: "middle", domain: "applied",
  title: "Le volume : compter en cubes",
  tagline: "Le cm³, et le volume d'un assemblage compté couche par couche.",
  prereqs: ["applied.primary.area-units"],
  intuition:
    "Après la longueur (le trait) et l'aire (la surface), la **troisième dimension** : le **volume** — la place dans l'espace. Son unité : le **centimètre cube** (cm³), un cube de 1 cm d'arête.\n\nDéterminer un volume, c'est **compter des cubes** — et le truc des grands assemblages : compter une **couche**, puis multiplier par le nombre de couches.",
  depths: {
    discovery:
      "**Avec les mains** : un assemblage de cubes — la couche du bas : 4 rangées de 3 cubes, soit 12 ; deux couches identiques : $12 \\times 2 = 24$ cubes : **24 cm³**. L'aire comptait des carreaux ; le volume empile des étages de carreaux.",
    standard:
      "**En image** : la **vision dans l'espace** se muscle — sur une perspective, certains cubes se **cachent** derrière d'autres : un assemblage en escalier vu de face en montre 6, mais la profondeur en dissimule 3 de plus. Compter exige de reconstruire mentalement les trois dimensions : couche par couche, jamais à l'œil.",
    advanced:
      "**Dans la tête** : pour un pavé plein, la couche est un rectangle ($L \\times l$ cubes) et les couches s'empilent ($\\times h$) — un pavé de 5 sur 3 sur 4 contient $5 \\times 3 \\times 4 = 60$ cm³. Trois facteurs, trois dimensions : le « cube » du nom annonce le facteur trois, comme le « carré » annonçait le deux — au prochain saut d'unité, devine : $\\times 1\\,000$.",
  },
  keyIdea: "$1$ cm³ = un cube d'1 cm d'arête. Compter par **couches** : une couche, fois le nombre d'étages — et gare aux cubes cachés en perspective.",
  why:
    "Pourquoi un cube comme unité, après le carré pour les aires ? Même raison : les cubes **remplissent** l'espace sans trou ni chevauchement — l'espace se carrelle en 3D, et compter redevient mesurer. Trait, carreau, cube : à chaque dimension son pavé élémentaire.",
  examples: [
    { title: "Compter par couches", steps: [
      { p: "Couche du bas : 4 rangées de 3 cubes $= 12$ cm³." },
      { p: "Deux couches identiques : $12 \\times 2 = $ **24 cm³**." },
    ] },
    { title: "Les cubes cachés", steps: [
      { p: "Un escalier : 3 cubes au sol, 2 dessus, 1 au sommet — vu de face : 6 cubes." },
      { p: "Mais l'assemblage a 2 cubes de **profondeur** : $6 \\times 2 = $ **12 cm³** — la perspective cache la moitié." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qu'un centimètre cube ?", solution: "Le volume d'un **cube de 1 cm d'arête** — l'unité qui pave l'espace, comme le cm² pavait la feuille." },
    { tier: "warmup", prompt: "Un assemblage : des couches de 4 × 3 cubes, sur 2 étages. Quel volume ?", solution: "Une couche : $4 \\times 3 = 12$ ; deux étages : $12 \\times 2 = $ **24 cm³**." },
    { tier: "application", prompt: "Un pavé plein mesure 5 cm sur 3 cm sur 4 cm. Combien de cm³ ?", solution: "Couche : $5 \\times 3 = 15$ ; quatre étages : $15 \\times 4 = $ **60 cm³** — trois dimensions, trois facteurs." },
    { tier: "challenge", prompt: "Compare sans calcul précis : un pavé de 10 × 1 × 1 et un cube de 3 × 3 × 3. Lequel a le plus grand volume ?", solution: "$10 \\times 1 \\times 1 = 10$ cm³ contre $3 \\times 3 \\times 3 = 27$ cm³ : **le cube gagne** largement — le volume aime les trois dimensions équilibrées, pas la longueur seule." },
    { tier: "exam", prompt: "Un escalier de cubes : 3 au sol, 2 au deuxième niveau, 1 au sommet, le tout sur 2 cubes de profondeur. Quel volume — et pourquoi la vue de face ne suffit-elle pas ?", solution: "Face : $3 + 2 + 1 = 6$ ; profondeur 2 : $6 \\times 2 = $ **12 cm³**. La vue de face écrase la troisième dimension : des cubes entiers se cachent derrière — compter exige de **voir dans l'espace**, couche par couche." },
  ],
  practice: [
    { tier: "application", label: "Couches empilées", make: (r) => {
      const L = randint(r, 3, 7), l = randint(r, 2, 5), h = randint(r, 2, 5);
      return { prompt: `Un pavé de cubes : couches de ${L} × ${l}, sur ${h} étages. Quel volume en cm³ ?`, answer: L * l * h, solution: `Couche : $${L} \\times ${l} = ${L * l}$ ; $\\times ${h}$ étages : **${L * l * h} cm³**.` };
    } },
    { tier: "challenge", label: "L'escalier en profondeur", make: (r) => {
      const base = randint(r, 3, 5); const prof = randint(r, 2, 4);
      const face = (base * (base + 1)) / 2;
      return { prompt: `Un escalier de face : ${base} cubes au sol, puis ${base - 1}, … jusqu'à 1. Profondeur : ${prof} cubes. Quel volume ?`, answer: face * prof, solution: `Face : $${Array.from({length: base}, (_, i) => base - i).join(" + ")} = ${face}$ ; $\\times ${prof}$ de profondeur : **${face * prof} cm³**.` };
    } },
  ],
};

// — Proportionality formalized (programme: retour à l'unité, tableau, échelles) —
const proportionalityUnit = {
  id: "applied.middle.proportionality-unit",
  level: "middle", domain: "applied",
  title: "Proportionnalité : le retour à l'unité",
  tagline: "Le prix au kilo, le tableau enfin permis — et les cartes à l'échelle.",
  prereqs: ["applied.primary.proportionality-add"],
  intuition:
    "Une troisième procédure rejoint tes deux leviers : le **retour à l'unité** — 3 kg de pommes coûtent 7,50 € ; **un** kilo coûte $7{,}50 \\div 3 = 2{,}50$ € ; donc 5 kg coûtent $5 \\times 2{,}50 = 12{,}50$ €. Passer par **un**, puis remonter.\n\nLe « prix au kilo » devient une grandeur à part entière — celle qu'affichent toutes les étiquettes du supermarché.",
  depths: {
    discovery:
      "**Avec les mains** : compare deux paquets au supermarché — 3 kg à 7,50 € contre 5 kg à 13 € : prix au kilo 2,50 € contre 2,60 € : le **gros paquet est le moins avantageux** ! Le retour à l'unité est l'arme du consommateur.",
    standard:
      "**En image** : le **tableau de proportionnalité** est enfin permis — à une condition : chaque ligne porte le **nom de sa grandeur et son unité** (« masse (kg) : 3 | 1 | 5 » ; « prix (€) : 7,50 | 2,50 | 12,50 »), et les flèches verbalisent (÷3, ×5). Le tableau range le raisonnement, il ne le remplace pas. Le produit en croix, lui, reste interdit : le sens d'abord, la recette jamais.",
    advanced:
      "**Dans la tête** : les **échelles** sont une proportionnalité déguisée — un plan au $\\frac{1}{100}$ : 1 cm sur le papier représente 100 cm réels ; une carte au $\\frac{1}{25\\,000}$ : 1 cm = 25 000 cm = 250 m. Mesurer 4 cm sur la carte : $4 \\times 250 = 1\\,000$ m réels. Le papier et le monde sont proportionnels — l'échelle est leur coefficient, et le retour à l'unité (que vaut **1 cm** ?) en est la clé.",
  },
  keyIdea: "Retour à l'unité : diviser jusqu'à **un**, remonter par multiplication. Le tableau (grandeurs + unités nommées !) range ; les flèches verbalisent ; le produit en croix attend toujours.",
  why:
    "Pourquoi autoriser le tableau maintenant, après l'avoir banni trois ans ? Parce que le raisonnement est devenu **incassable** : tu sais dire « 3 fois plus », « j'ajoute les raisons », « je reviens à un » — le tableau n'est plus une recette magique mais un rangement de phrases que tu possèdes. Les outils se méritent.",
  examples: [
    { title: "Le retour à l'unité", steps: [
      { p: "3 kg coûtent 7,50 € → 1 kg coûte $7{,}50 \\div 3 = 2{,}50$ €." },
      { p: "5 kg : $5 \\times 2{,}50 = $ **12,50 €** — par l'unité, toutes les quantités s'ouvrent." },
    ] },
    { title: "La carte au 1/25 000", steps: [
      { p: "1 cm sur la carte $= 25\\,000$ cm réels $= 250$ m." },
      { p: "4 cm mesurés : $4 \\times 250 = $ **1 000 m** — le monde est proportionnel au papier." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "3 kg de pommes coûtent 7,50 €. Trouve le prix de 5 kg par le retour à l'unité.", solution: "1 kg : $7{,}50 \\div 3 = 2{,}50$ € ; 5 kg : $5 \\times 2{,}50 = $ **12,50 €** — passer par un, remonter." },
    { tier: "warmup", prompt: "Quelle procédure choisir pour : (a) 4 pains 7 €, prix de 12 pains ; (b) 3 kg 7,50 €, prix de 5 kg ?", solution: "(a) **linéarité ×** ($12 = 3 \\times 4$ → $21$ €) ; (b) **retour à l'unité** (5 n'est pas un multiple commode de 3) — la procédure s'adapte aux nombres." },
    { tier: "application", prompt: "Dresse le tableau de proportionnalité (avec grandeurs et unités !) pour : masse 3 kg → 7,50 € ; puis 1 kg et 5 kg.", solution: "masse (kg) : 3 | 1 | 5 — prix (€) : 7,50 | 2,50 | 12,50 — flèches : ÷3 puis ×5. Le tableau **nomme** ce qu'il range." },
    { tier: "challenge", prompt: "Sur un plan au 1/100, le salon mesure 4,5 cm de long. Quelle longueur réelle ?", solution: "1 cm représente 100 cm : $4{,}5 \\times 100 = 450$ cm $= $ **4,50 m** — l'échelle est le coefficient entre papier et monde." },
    { tier: "exam", prompt: "Sur une carte au 1/25 000, deux villages sont à 6 cm. Quelle distance réelle, en km ? Et pourquoi le « produit en croix » n'a-t-il pas été nécessaire ?", solution: "1 cm $= 25\\,000$ cm $= 250$ m ; $6 \\times 250 = 1\\,500$ m $= $ **1,5 km**. Le retour à l'unité a suffi — le produit en croix est une recette qu'on n'apprendra que lorsque le sens n'aura plus besoin d'elle." },
  ],
  practice: [
    { tier: "application", label: "Par l'unité", make: (r) => {
      const k1 = pick(r, [2, 3, 4]); const unit = randint(r, 4, 24) / 2; const k2 = pick(r, [5, 7, 9].filter((x) => x !== k1));
      const p1 = Math.round(k1 * unit * 100) / 100;
      return { prompt: `${k1} kg coûtent ${String(p1).replace(".", ",")} €. Combien pour ${k2} kg ? (retour à l'unité)`, answer: Math.round(k2 * unit * 100) / 100, solution: `1 kg : $${String(p1).replace(".", ",")} \\div ${k1} = ${String(unit).replace(".", ",")}$ € ; ${k2} kg : $${k2} \\times ${String(unit).replace(".", ",")} = $ **${String(Math.round(k2 * unit * 100) / 100).replace(".", ",")} €**.` };
    } },
    { tier: "challenge", label: "Lire la carte", make: (r) => {
      const ech = pick(r, [[100, "cm", 1], [1000, "m", 10], [25000, "m", 250]]);
      const mes = randint(r, 2, 9);
      return { prompt: `Plan au 1/${ech[0]} : une mesure de ${mes} cm sur le papier. Distance réelle en ${ech[1]} ?`, answer: mes * ech[2], solution: `1 cm $= ${ech[2]}$ ${ech[1]} : $${mes} \\times ${ech[2]} = $ **${mes * ech[2]} ${ech[1]}**.` };
    } },
  ],
};

export default [circlePerimeter, formulas, volume, proportionalityUnit];
