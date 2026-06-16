// Field "Geometry / Applied / Logic" — HIGH module (seconde-pro year), voie
// professionnelle. Official 2de pro programme: GÉOMÉTRIE (mobilize plane
// configurations and solids knowledge: Pythagoras, Thales, usual solids,
// decomposing composite solids) with AIRES ET VOLUMES (formulas, unit
// conversions, capacity); the transversal INFORMATION CHIFFRÉE block
// (proportionality, percentages — the Singapore BAR MODEL showcase) present
// throughout the automatismes; ALGORITHMIQUE ET PROGRAMMATION (variables,
// instructions, loops, flowcharts formalizing trade procedures). Singapore
// method: Concrete contexts from worksites, Pictorial bar models for every
// percentage, big ideas Measures and Proportionality named, problem solving
// in every exam tier.
import { randint, pick } from "../../core/exercises.js";

// — Figures and solids (programme: Pythagore, Thalès, solides usuels) —
const figuresSolides = {
  id: "geometry.high.figures-solides",
  level: "high", domain: "geometry",
  title: "Figures et solides du métier",
  tagline: "Pythagore et Thalès appliqués au tracé et à la mesure sur un chantier.",
  prereqs: ["geometry.middle.thales", "geometry.middle.sphere"],
  intuition:
    "Le maçon vérifie son angle droit avec la corde **3-4-5**, le charpentier calcule sa diagonale, le couvreur mesure une hauteur sans y monter — la géométrie du collège est l'outillage silencieux de tous les métiers.\n\nCette leçon la remet en main : **Pythagore** (l'angle droit et les diagonales), **Thalès** (l'agrandissement et l'inaccessible), et les **solides usuels** qui composent les objets réels.",
  depths: {
    discovery:
      "**Avec les mains** : la corde à 13 nœuds — tends un triangle de côtés 3, 4 et 5 intervalles : l'angle est **droit**, garanti par $3^2 + 4^2 = 5^2$ — les bâtisseurs de cathédrales équerraient ainsi, et le carreleur d'aujourd'hui vérifie sa pose pareil : Pythagore est d'abord un **outil de contrôle** ($a^2 + b^2 = c^2$ ? droit ; sinon, faux).",
    standard:
      "**En image** : Thalès au chantier — pour la hauteur du pylône, plante un piquet de 2 m : son ombre fait 1,50 m quand celle du pylône fait 9 m — le croquis montre **deux triangles emboîtés** (même soleil, mêmes angles) : les côtés sont proportionnels — $\\dfrac{h}{2} = \\dfrac{9}{1{,}5}$ ⟹ $h = 12$ m : le schéma EST le calcul — mesurer l'inaccessible, c'est dessiner l'emboîtement.",
    advanced:
      "**Dans la tête** : les **solides usuels** — cube, pavé, prisme, cylindre, pyramide, cône, boule — sont l'alphabet des objets : une cuve = cylindre + deux demi-boules, un hangar = pavé + prisme (le toit), un silo = cylindre + cône — **décomposer** un objet en solides connus est le geste qui prépare tous les calculs d'aires et de volumes (leçon suivante) : le professionnel ne voit pas « une cuve », il voit la somme de formes qu'il sait calculer — lire le réel en solides, c'est déjà le métrer.",
  },
  keyIdea: "**Pythagore** : $a^2 + b^2 = c^2$ — contrôle d'angle droit (3-4-5) et calcul de diagonales ; **Thalès** : triangles emboîtés ⟹ côtés proportionnels — mesurer l'inaccessible par un croquis ; **solides usuels** : l'alphabet — décomposer l'objet réel en formes connues avant tout calcul.",
  why:
    "Pourquoi reprendre la géométrie du collège ? Parce qu'au métier, elle change de statut : ce n'était que des exercices, c'est devenu des **contrôles engageants** — une équerre fausse, c'est un mur qui penche ; une hauteur mal estimée, c'est une nacelle sous-dimensionnée. Le programme de 2de pro consolide exprès ces acquis dans des situations professionnelles : la géométrie y gagne ce qui lui manquait — des conséquences.",
  examples: [
    { title: "La corde 3-4-5", steps: [
      { p: "Triangle de côtés 3, 4, 5 : $9 + 16 = 25$ ✓ — l'angle opposé au 5 est droit, garanti." },
      { p: "Le contrôle inverse aussi : côtés 5, 7, 9 ? $25 + 49 = 74 \\neq 81$ — pas droit : reprends la pose." },
    ] },
    { title: "Le pylône par l'ombre", steps: [
      { p: "Piquet 2 m, ombre 1,50 m ; ombre du pylône 9 m — deux triangles emboîtés (Thalès)." },
      { p: "$h = 2 \\times \\dfrac{9}{1{,}5} = 12$ m — mesuré sans grimper : le croquis a tout fait." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une porte fait 0,9 m de large et 2,1 m de haut. Un panneau rigide de 2,2 m de long passe-t-il en diagonale ? (Calcule la diagonale de la porte.)", solution: "Diagonale $= \\sqrt{0{,}9^2 + 2{,}1^2} = \\sqrt{0{,}81 + 4{,}41} = \\sqrt{5{,}22} \\approx $ **2,28 m** — le panneau de 2,2 m **passe** (avec 8 cm de jeu) : Pythagore au déménagement — la diagonale est toujours le plus grand gabarit." },
    { tier: "warmup", prompt: "Contrôle d'équerre : un cadre a pour côtés 60 cm et 80 cm, et sa diagonale mesure 100 cm. L'angle est-il droit ? Et si la diagonale faisait 102 cm ?", solution: "$60^2 + 80^2 = 3600 + 6400 = 10\\,000 = 100^2$ ✓ : **droit** — c'est le 3-4-5 multiplié par 20 ; à 102 cm : $102^2 = 10\\,404 \\neq 10\\,000$ — **faux** : le cadre est en losange, reprends — la réciproque de Pythagore est l'équerre du métier." },
    { tier: "application", prompt: "Pour mesurer la hauteur d'un mât, on plante un piquet de 1,8 m dont l'ombre fait 1,2 m ; au même instant, l'ombre du mât fait 8,4 m. Croquis (décris-le) et hauteur.", solution: "Croquis : deux triangles rectangles **emboîtés** — même angle du soleil : Thalès donne $\\dfrac{h}{1{,}8} = \\dfrac{8{,}4}{1{,}2} = 7$ ⟹ $h = $ **12,6 m** — le rapport des ombres est le rapport des hauteurs : l'inaccessible mesuré par proportionnalité dessinée." },
    { tier: "challenge", prompt: "Décompose ces objets en solides usuels : (a) une cuve à fioul (corps arrondi, extrémités bombées), (b) un hangar à toit en pente, (c) un crayon taillé. Pourquoi ce geste précède-t-il tout calcul ?", solution: "(a) **Cylindre + deux demi-boules** (= une boule complète) ; (b) **pavé + prisme triangulaire** (le toit) ; (c) **cylindre + cône** (la pointe) — décomposer transforme l'objet inconnu en somme de formules connues : aires et volumes s'additionneront pièce par pièce — on ne calcule jamais « une cuve », on calcule ses morceaux." },
    { tier: "exam", prompt: "Un escalier doit relier deux niveaux distants de 2,7 m (hauteur), avec un encombrement au sol de 3,6 m. (1) Longueur de la rampe (la pente de l'escalier). (2) L'angle est-il raisonnable ? On contrôle avec le rapport hauteur/encombrement et la règle métier « entre 0,5 et 1 ». (3) Le limon (la planche porteuse) se vend en 4 m ou en 4,5 m : laquelle commander, en justifiant ?", solution: "(1) Pythagore : $\\sqrt{2{,}7^2 + 3{,}6^2} = \\sqrt{7{,}29 + 12{,}96} = \\sqrt{20{,}25} = $ **4,5 m** — c'est un 3-4-5 multiplié par 0,9 ! (2) Rapport $= \\dfrac{2{,}7}{3{,}6} = 0{,}75$ : **dans la fourchette** [0,5 ; 1] ✓ — pente confortable. (3) La rampe fait exactement 4,5 m : la planche de 4 m est **trop courte** — commander la **4,5 m** (et en pratique prévoir la chute de coupe : on ne commande jamais au millimètre) — Pythagore a dimensionné, la règle métier a validé, le bon sens a commandé : le calcul professionnel complet." },
  ],
  practice: [
    { tier: "warmup", label: "L'hypoténuse du chantier", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
      return { prompt: `Côtés de l'angle droit : ${t[0]} m et ${t[1]} m — la diagonale ?`, answer: t[2], solution: `$\\sqrt{${t[0] ** 2} + ${t[1] ** 2}} = $ **${t[2]} m** — un triplet du métier.` };
    } },
    { tier: "application", label: "Droit ou pas ?", make: (r) => {
      const t = pick(r, [[3, 4, 5, 1], [6, 8, 10, 1], [5, 7, 9, 0], [4, 5, 7, 0], [5, 12, 13, 1]]);
      return { prompt: `Côtés ${t[0]}, ${t[1]}, ${t[2]} : l'angle est-il droit ? (1 = oui, 0 = non)`, answer: t[3], solution: `$${t[0] ** 2} + ${t[1] ** 2} = ${t[0] ** 2 + t[1] ** 2}$ ${t[3] ? "= " + t[2] ** 2 + " ✓ — **droit**" : "\\neq " + t[2] ** 2 + " — **faux** : reprends"}.` };
    } },
    { tier: "challenge", label: "Thalès par l'ombre", make: (r) => {
      const k = pick(r, [4, 5, 6, 7]); const piquet = pick(r, [1.5, 2]);
      const h = piquet * k;
      return { prompt: `Piquet ${String(piquet).replace(".", ",")} m, ombre 1 m ; ombre de l'objet : ${k} m — hauteur de l'objet ? (décimal)`, answer: h, solution: `Rapport des ombres $= ${k}$ : $h = ${String(piquet).replace(".", ",")} \\times ${k} = $ **${String(h).replace(".", ",")} m**.` };
    } },
  ],
};

// — Areas, volumes, units (programme: formules, grandeurs, conversions) —
const airesVolumes = {
  id: "geometry.high.aires-volumes",
  level: "high", domain: "geometry",
  title: "Aires, volumes et unités",
  tagline: "Métrer pour commander — la formule chiffre, l'unité facture.",
  prereqs: ["geometry.high.figures-solides"],
  intuition:
    "« Combien de pots de peinture ? Combien de béton ? La cuve contient combien ? » — trois questions du lundi matin, trois calculs : **aire** (les surfaces à couvrir), **volume** (les quantités à couler), **conversion** (les litres de la facture).\n\nLa grande idée : un nombre qui **mesure** — big idea *Measures* : quantifier une propriété pour comparer, commander, facturer.",
  depths: {
    discovery:
      "**Avec les mains** : l'aire se **carrelle** — un mur de 4 m sur 2,5 m : pose mentalement des carreaux de 1 m² : 4 colonnes de 2,5 — **10 m²** ($L \\times l$ n'est que ce carrelage compté) ; le volume s'**empile** : une fosse de 4 × 2,5 × 0,8 m, c'est la dalle de 10 m² montée sur 0,8 m : **8 m³** — les formules sont des gestes de comptage avant d'être des lettres.",
    standard:
      "**En image** : le formulaire du métier, dessiné — rectangle $L \\times l$, triangle $\\dfrac{b \\times h}{2}$ (la moitié du rectangle : le croquis le montre !), disque $\\pi r^2$, et côté volumes : pavé $L \\times l \\times h$, **cylindre** $\\pi r^2 \\times h$ (le disque empilé sur la hauteur — la cuve !), et les solides composés s'**additionnent** pièce par pièce (ta décomposition de la leçon passée) — chaque formule a son schéma, et le schéma justifie la formule.",
    advanced:
      "**Dans la tête** : les **unités** font la facture — les aires convertissent par **100** (1 m² = 100 dm² : le carré de 10), les volumes par **1 000** (1 m³ = 1 000 dm³ : le cube de 10), et la passerelle d'or du métier : **1 dm³ = 1 L** donc **1 m³ = 1 000 L** — la cuve de 2 m³ contient 2 000 L. L'erreur d'unité est l'erreur professionnelle par excellence (un devis × 100…) : le réflexe est de toujours convertir **avant** de calculer, et d'estimer l'ordre de grandeur **après** (une baignoire ≈ 0,2 m³ : si ton calcul de cuve donne 0,002 m³, recommence) — mesurer, c'est aussi savoir se méfier du nombre.",
  },
  keyIdea: "Aire = carrelage ($L \\times l$, $\\frac{bh}{2}$, $\\pi r^2$) ; volume = empilement (pavé, **cylindre** $\\pi r^2 h$) ; composés : on **additionne les morceaux**. Conversions : aires ×100, volumes ×1 000, et **1 m³ = 1 000 L** — big idea *Measures* : convertir avant, estimer après.",
  why:
    "Pourquoi des formules qu'on trouve sur internet ? Parce que le métier ne demande pas de les réciter mais de les **mobiliser juste** : choisir la bonne (aire ou volume ? l'éternelle confusion), décomposer l'objet, convertir vers l'unité de la facture, et flairer l'absurde — quatre compétences qu'aucune recherche web ne remplace. Peinture, béton, chauffage, cuves, emballages : métrer correctement, c'est littéralement ce qui sépare le devis juste du devis qui ruine.",
  examples: [
    { title: "Le mur carrelé", steps: [
      { p: "Mur 4 × 2,5 m : 10 m² — un pot couvre 12 m² par couche, deux couches : $\\dfrac{20}{12} \\approx 1{,}7$." },
      { p: "On commande **2 pots** — l'aire calcule, l'arrondi commercial monte toujours." },
    ] },
    { title: "La cuve en litres", steps: [
      { p: "Cylindre $r = 0{,}5$ m, $h = 2$ m : $V = \\pi \\times 0{,}25 \\times 2 \\approx 1{,}57$ m³." },
      { p: "$\\times 1000$ : **1 570 L** — la passerelle dm³ = L transforme le métré en facture." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une chambre de 4 m sur 3,5 m : quelle aire de sol ? Le parquet se vend en paquets de 2 m² : combien de paquets (sans les chutes) ?", solution: "Aire $= 4 \\times 3{,}5 = $ **14 m²** — paquets : $\\dfrac{14}{2} = $ **7** (et le pro en prend 8 : les chutes de coupe existent) — carreler mentalement, puis commander au-dessus : le métré de base." },
    { tier: "warmup", prompt: "Convertis : 3 m² en dm² ; 2,5 m³ en L ; 750 cm³ en L. Pourquoi les aires et les volumes ne convertissent-ils pas comme les longueurs ?", solution: "3 m² $= $ **300 dm²** (×100 : le carré de 10), 2,5 m³ $= 2\\,500$ dm³ $= $ **2 500 L**, 750 cm³ $= $ **0,75 L** — une aire est un carré d'unité (10² = 100 par étage), un volume un cube (10³ = 1 000) : la dimension de la grandeur dicte le facteur — l'erreur ×10 au lieu de ×100 est LA faute de devis." },
    { tier: "application", prompt: "Une dalle de béton : 6 m de long, 4 m de large, 12 cm d'épaisseur. Volume en m³ ? Le béton est livré par toupie de 6 m³ : que commander, et quel pourcentage de la toupie restera ?", solution: "Convertis d'abord : 12 cm $= 0{,}12$ m — $V = 6 \\times 4 \\times 0{,}12 = $ **2,88 m³** : une toupie de 6 m³ suffit, il en restera $\\dfrac{6 - 2{,}88}{6} = 52$ % — convertir AVANT (le 12 resté en cm aurait donné 288 m³ : 48 toupies !), estimer APRÈS : 2,88 m³ ≈ 14 baignoires, plausible pour une dalle ✓." },
    { tier: "challenge", prompt: "Un silo = cylindre ($r = 1{,}5$ m, $h = 4$ m) surmonté d'un cône de même rayon et de 1,2 m de haut ($V_{\\text{cône}} = \\frac{1}{3}\\pi r^2 h$). Volume total arrondi au m³, puis en litres.", solution: "Cylindre : $\\pi \\times 2{,}25 \\times 4 \\approx 28{,}3$ m³ ; cône : $\\dfrac{1}{3}\\pi \\times 2{,}25 \\times 1{,}2 \\approx 2{,}8$ m³ — total $\\approx$ **31 m³ = 31 000 L** — la décomposition de la leçon passée paie : l'objet composé s'additionne morceau par morceau, et la passerelle ×1 000 livre les litres de la fiche technique." },
    { tier: "exam", prompt: "Tu repeins un local : 2 murs de 5 m × 2,6 m, 2 murs de 4 m × 2,6 m, en déduisant une porte (0,9 × 2,1 m) et deux fenêtres (1,2 × 1 m chacune). Deux couches ; un pot de 2,5 L couvre 12 m² par couche et coûte 34 €. (1) Surface à peindre. (2) Nombre de pots et budget. (3) Cite les deux réflexes d'unités/ordre de grandeur qui sécurisent ce devis.", solution: "(1) Murs : $2(5 \\times 2{,}6) + 2(4 \\times 2{,}6) = 26 + 20{,}8 = 46{,}8$ m² ; ouvertures : $1{,}89 + 2 \\times 1{,}2 = 4{,}29$ m² — surface $= $ **42,51 m²**. (2) Deux couches : $85{,}02$ m² à couvrir ⟹ $\\dfrac{85{,}02}{12} \\approx 7{,}1$ : **8 pots** (l'arrondi commercial monte), budget $= 8 \\times 34 = $ **272 €**. (3) Réflexes : tout est resté en **mètres** (aucun mélange cm/m), et l'ordre de grandeur valide (≈ 43 m² pour un local de 5 × 4 : plausible — un résultat de 4 m² ou 400 m² aurait crié l'erreur) — métré, déduction des ouvertures, double couche, arrondi fournisseur : le devis peinture complet, la routine du métier." },
  ],
  practice: [
    { tier: "warmup", label: "L'aire carrelée", make: (r) => {
      const L = randint(r, 3, 8); const l = randint(r, 2, 5);
      return { prompt: `Mur de ${L} m sur ${l} m : l'aire ?`, answer: L * l, solution: `$${L} \\times ${l} = $ **${L * l} m²** — le carrelage compté.` };
    } },
    { tier: "application", label: "La passerelle des litres", make: (r) => {
      const v = pick(r, [0.5, 1.2, 2, 3.5]);
      return { prompt: `${String(v).replace(".", ",")} m³ en litres ?`, answer: v * 1000, solution: `× 1 000 : **${v * 1000} L** — 1 m³ = 1 000 L, la passerelle du métier.` };
    } },
    { tier: "challenge", label: "Le volume empilé", make: (r) => {
      const L = randint(r, 3, 6); const l = randint(r, 2, 4); const hcm = pick(r, [10, 20, 25, 50]);
      return { prompt: `Dalle ${L} m × ${l} m × ${hcm} cm : volume en m³ ? (convertis d'abord ! décimal)`, answer: L * l * hcm / 100, solution: `${hcm} cm $= ${String(hcm / 100).replace(".", ",")}$ m : $${L} \\times ${l} \\times ${String(hcm / 100).replace(".", ",")} = $ **${String(L * l * hcm / 100).replace(".", ",")} m³**.` };
    } },
  ],
};

// — Proportionality and percentages (the bar-model showcase) —
const proportionnalitePourcentages = {
  id: "applied.high.proportionnalite-pourcentages",
  level: "high", domain: "applied",
  title: "Proportionnalité et pourcentages au travail",
  tagline: "La barre découpée en cent — remises, TVA et échelles tombent d'un seul geste.",
  prereqs: ["applied.middle.evolutions", "numbers.middle.irreductible"],
  intuition:
    "Remise de 30 %, TVA à 20 %, plan au 1/50, dosage à 3 % — le métier parle **proportion** du matin au soir.\n\nLa méthode Singapour donne l'arme absolue : la **barre découpée** — le prix entier est une barre de 100 parts ; 30 % de remise = retirer 30 parts : ce qui reste (70 parts) se **voit** avant de se calculer — big idea *Proportionality*.",
  depths: {
    discovery:
      "**Avec les mains** : un article à 80 €, remise 25 % — découpe la barre des 80 € en **4 parts** (25 % = un quart) : chaque part vaut 20 € ; retire-en une : reste **60 €** — aucun calcul savant : la barre, le découpage, le comptage — et le passage par l'unité (la valeur d'UNE part) résout tout problème de proportionnalité : 3 kg coûtent 7,50 € → 1 kg coûte 2,50 € → 5 kg coûtent 12,50 €.",
    standard:
      "**En image** : la barre des pourcentages, systématique — [▰▰▰▰▰▰▰▱▱▱] : prix initial = 10 parts de 10 % ; remise de 30 % = 3 parts grisées ; le **schéma dit la formule** : payer 70 % ⟺ multiplier par **0,70** — le coefficient multiplicateur n'est que la barre résumée en un nombre : $\\times 0{,}7$ pour −30 %, $\\times 1{,}2$ pour +20 % (la TVA : la barre ENTIÈRE plus 2 parts) — une image, un coefficient, tous les pourcentages.",
    advanced:
      "**Dans la tête** : les pièges du métier, désarmés par la barre — **le sens inverse** : prix TTC 144 € avec TVA 20 % : le HT n'est PAS 144 − 20 % ! La barre montre pourquoi : 144 = la barre HT **plus** 2 parts ⟹ 144 représente 120 % ⟹ HT $= \\dfrac{144}{1{,}2} = 120$ € (on **divise** par le coefficient pour remonter) ; **les évolutions successives** : +20 % puis −20 % ne reviennent pas au départ ($\\times 1{,}2 \\times 0{,}8 = \\times 0{,}96$ : −4 %) — les coefficients se **multiplient**, jamais les pourcentages ne s'additionnent ; et l'**échelle** du plan (1/50 : 1 cm dessine 50 cm) est la même proportionnalité, en géomètre — trois pièges, une seule barre.",
  },
  keyIdea: "**La barre découpée** : le tout = 100 parts — remise = parts retirées, TVA = parts ajoutées ⟹ **coefficient multiplicateur** ($\\times 0{,}7$ pour −30 %, $\\times 1{,}2$ pour +20 %). Sens inverse : on **divise** par le coefficient ; successifs : les coefficients se **multiplient** — big idea *Proportionality*.",
  why:
    "Pourquoi tant d'égards pour un pourcentage ? Parce que c'est LE calcul professionnel universel — devis, paie, soldes, marges, dosages, plans — et le plus piégeux : « TTC moins 20 % » coûte de l'argent réel chaque jour à qui le croit. La barre de Singapour rend le piège **visible** : on ne se trompe plus sur ce qu'on dessine — et le coefficient multiplicateur, son résumé, est l'outil que les suites géométriques et les intérêts composés réutiliseront tel quel en première.",
  examples: [
    { title: "La barre de la remise", steps: [
      { p: "80 € − 25 % : barre en 4 parts de 20 € ; retire 1 part — reste 60 €." },
      { p: "En coefficient : $80 \\times 0{,}75 = 60$ — la barre résumée en un nombre." },
    ] },
    { title: "Remonter le TTC", steps: [
      { p: "TTC 144 €, TVA 20 % : la barre fait 120 % du HT — pas 100 + une remise !" },
      { p: "HT $= 144 \\div 1{,}2 = 120$ € — remonter, c'est **diviser** par le coefficient." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un blouson à 90 € est soldé à −30 %. Dessine la barre (décris ton découpage) et donne le prix soldé, sans poser de multiplication décimale.", solution: "Barre de 90 € en **10 parts** de 9 € (10 % chacune) ; retire 3 parts (27 €) : reste 7 parts $= $ **63 €** — le découpage en dixièmes rend le pourcentage comptable sur les doigts : la barre d'abord, le coefficient ($\\times 0{,}7$) ensuite, même résultat." },
    { tier: "warmup", prompt: "Donne le coefficient multiplicateur de : −30 % ; +20 % ; −5 % ; +100 %. Et traduis « ×0,85 » en pourcentage.", solution: "$\\times 0{,}7$ ; $\\times 1{,}2$ ; $\\times 0{,}95$ ; $\\times 2$ — et $\\times 0{,}85$ ⟺ **−15 %** : le coefficient est la barre entière relue (ce qui reste ou ce que devient le tout) — la traduction dans les deux sens est l'automatisme du métier." },
    { tier: "application", prompt: "3 kg de visserie coûtent 7,50 €. Par le passage à l'unité (la valeur d'une part), trouve le prix de 8 kg, puis le nombre de kilos pour 20 €.", solution: "1 kg $= \\dfrac{7{,}50}{3} = 2{,}50$ € (la part unitaire — le pivot de toute proportionnalité) — 8 kg $= $ **20 €** ; et pour 20 € : $\\dfrac{20}{2{,}5} = $ **8 kg** — les deux questions se rejoignent : passer par l'unité résout dans les deux sens, c'est le cœur de la méthode de Singapour." },
    { tier: "challenge", prompt: "Une facture TTC s'élève à 660 € (TVA 20 %). Le client exige le détail HT/TVA. Pourquoi « 660 − 20 % = 528 € » est-il FAUX, et quel est le vrai HT ? (La barre tranche.)", solution: "La barre : 660 € = HT **+ 2 parts de 10 %** = 120 % du HT — retirer 20 % de 660, c'est retirer 20 % *du TTC* (132 €), pas la TVA (qui vaut 20 % *du HT*) : HT $= \\dfrac{660}{1{,}2} = $ **550 €**, TVA $= $ **110 €** (vérifie : $550 \\times 1{,}2 = 660$ ✓) — l'erreur classique coûte 22 € sur cette seule facture : remonter = diviser, la barre le montre, le métier l'exige." },
    { tier: "exam", prompt: "Un commerçant achète un article 120 € HT. Il applique une marge de 40 %, puis la TVA de 20 % ; en fin de saison, il solde l'étiquette de 25 %. (1) Chaîne des coefficients et prix soldé TTC. (2) Le solde annule-t-il la marge ? Calcule l'évolution globale depuis le prix d'achat. (3) Un plan de la boutique est au 1/50 : la vitrine mesure 6,4 cm sur le plan — longueur réelle ?", solution: "(1) Chaîne : $120 \\times 1{,}4 \\times 1{,}2 \\times 0{,}75$ — étiquette TTC $= 201{,}60$ €, soldé $= $ **151,20 €**. (2) Coefficient global $= 1{,}4 \\times 1{,}2 \\times 0{,}75 = 1{,}26$ : **+26 %** depuis l'achat — le solde de 25 % n'a PAS annulé la marge de 40 % (les pourcentages ne s'additionnent jamais : les coefficients se multiplient, et $0{,}75 \\times 1{,}4 = 1{,}05$ laisse 5 % de marge avant TVA). (3) Échelle 1/50 : $6{,}4 \\times 50 = 320$ cm $= $ **3,20 m** — marge, TVA, solde, échelle : quatre habits de la même proportionnalité, une seule barre dans la tête." },
  ],
  practice: [
    { tier: "warmup", label: "La barre des dixièmes", make: (r) => {
      const prix = pick(r, [50, 80, 90, 120]); const rem = pick(r, [10, 20, 30, 50]);
      return { prompt: `${prix} € soldés à −${rem} % : prix payé ?`, answer: prix * (100 - rem) / 100, solution: `Barre en 10 parts de ${prix / 10} € ; retire ${rem / 10} : **${prix * (100 - rem) / 100} €** ($\\times ${String((100 - rem) / 100).replace(".", ",")}$).` };
    } },
    { tier: "application", label: "Le coefficient traduit", make: (r) => {
      const cas = pick(r, [[20, 1.2, 1], [30, 0.7, 0], [15, 1.15, 1], [25, 0.75, 0], [5, 0.95, 0]]);
      return { prompt: `${cas[2] ? "+" : "−"}${cas[0]} % : coefficient multiplicateur ? (décimal)`, answer: cas[1], solution: `$\\times ${String(cas[1]).replace(".", ",")}$ — la barre ${cas[2] ? "plus" : "moins"} ${cas[0]} parts sur 100.` };
    } },
    { tier: "challenge", label: "Remonter au HT", make: (r) => {
      const ht = pick(r, [100, 150, 200, 350]);
      return { prompt: `TTC $= ${ht * 1.2}$ € avec TVA 20 % : le HT ? (divise !)`, answer: ht, solution: `$\\dfrac{${ht * 1.2}}{1{,}2} = $ **${ht} €** — remonter = diviser par le coefficient, jamais retrancher.` };
    } },
  ],
};

// — Flowchart algorithmics (programme: variables, boucles, organigrammes) —
const organigrammes = {
  id: "logic.high.organigrammes",
  level: "high", domain: "logic",
  title: "Algorithmes et organigrammes",
  tagline: "La procédure du métier, dessinée case par case — puis confiée à la machine.",
  prereqs: ["logic.middle.boucle-conditionnelle"],
  intuition:
    "Toute procédure d'atelier est déjà un algorithme : « contrôler la pièce ; SI hors tolérance, écarter ; SINON, valider ; recommencer pour chaque pièce » — des étapes, des tests, des répétitions.\n\nL'**organigramme** les dessine : rectangles (actions), losanges (tests oui/non), flèches (l'enchaînement) — la procédure devient lisible, vérifiable, programmable.",
  depths: {
    discovery:
      "**Avec les mains** : prends ta résolution de $ax + b = c$ — écris-la en cases : [lire $a$, $b$, $c$] → [calculer $c - b$] → [diviser par $a$] → [afficher $x$] — quatre rectangles, des flèches : l'algèbre du chapitre premier degré, devenue **procédure** que n'importe qui (ou n'importe quoi) exécute sans réfléchir — c'est exactement le but.",
    standard:
      "**En image** : le **losange** décide — « budget restant $\\geq$ prix ? » : la branche OUI achète, la branche NON s'arrête — et la **boucle** revient en arrière : la flèche qui remonte du bas du traitement vers le test (« encore des pièces à contrôler ? ») dessine la répétition — trois symboles (rectangle, losange, flèche-retour) suffisent à dessiner toute procédure du métier, du tri de colis au dosage itératif.",
    advanced:
      "**Dans la tête** : la **variable** est la case mémoire — `total ← 0` puis, dans la boucle, `total ← total + prix` : le total s'accumule pas après pas (le compteur de caisse !) ; et la traduction en programme est mot à mot : le rectangle devient une instruction, le losange un `si … sinon`, la flèche-retour un `tant que` — ton tableur et Python exécutent l'organigramme tel quel. Le réflexe professionnel : **dérouler à la main** sur un petit exemple (la « trace » : noter la valeur des variables ligne par ligne) avant de faire confiance — on ne livre jamais une procédure qu'on n'a pas fait tourner soi-même sur un cas connu.",
  },
  keyIdea: "Organigramme : **rectangles** (actions), **losanges** (tests oui/non), **flèche-retour** (boucle) — trois symboles, toutes les procédures. **Variable** = case mémoire qui s'accumule (`total ← total + prix`) ; et la **trace à la main** sur un petit cas valide avant de livrer.",
  why:
    "Pourquoi dessiner ce qu'on pourrait juste faire ? Parce que la procédure dessinée se **transmet** (le nouveau l'exécute sans toi), se **vérifie** (le losange oublié saute aux yeux) et se **programme** (le tableur de l'entreprise, la machine à commande numérique, le script de caisse parlent organigramme) — formaliser sa pratique est la compétence qui fait passer d'exécutant à organisateur : l'algorithmique du programme pro, c'est l'écriture des gestes du métier.",
  examples: [
    { title: "La résolution en cases", steps: [
      { p: "[lire $a, b, c$] → [$d \\leftarrow c - b$] → [$x \\leftarrow d \\div a$] → [afficher $x$]." },
      { p: "Quatre cases : l'équation du premier degré, prête pour la machine." },
    ] },
    { title: "Le compteur de caisse", steps: [
      { p: "`total ← 0` ; pour chaque article : `total ← total + prix` — la variable s'accumule." },
      { p: "Trace sur 3 articles (5, 8, 12) : total = 0, 5, 13, 25 — déroulé à la main : validé." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris l'organigramme du contrôle qualité : mesurer une pièce ; si le diamètre est dans [19,8 ; 20,2], la valider, sinon l'écarter. Quels symboles utilises-tu pour chaque étape ?", solution: "[**Rectangle** : mesurer le diamètre $d$] → [**losange** : $19{,}8 \\leq d \\leq 20{,}2$ ?] — branche OUI → [rectangle : valider] ; branche NON → [rectangle : écarter] — l'action en rectangle, la décision en losange : la procédure d'atelier, dessinée en quatre cases." },
    { tier: "warmup", prompt: "Déroule la trace : `total ← 0`, puis pour les prix 12, 7, 15 : `total ← total + prix`. Donne la valeur de `total` après chaque article.", solution: "0 → **12** → **19** → **34** — la variable est une case qu'on écrase à chaque tour : suivre ses valeurs ligne par ligne (la trace) est LE geste de vérification — tu viens d'exécuter la boucle comme la machine le fera." },
    { tier: "application", prompt: "Complète l'organigramme du devis : lire le métrage $x$ ; calculer $p \\leftarrow 15x + 40$ ; SI $p \\leq 190$ afficher « dans le budget », SINON afficher « dépassement ». Déroule pour $x = 9$ et $x = 12$.", solution: "$x = 9$ : $p = 175 \\leq 190$ → « **dans le budget** » ; $x = 12$ : $p = 220 > 190$ → « **dépassement** » — l'organigramme assemble tes deux chapitres : la fonction affine calcule (rectangle), l'inéquation décide (losange) — et la machine répondra au client en une milliseconde." },
    { tier: "challenge", prompt: "Dessine (décris) l'organigramme avec boucle : « tant qu'il reste des colis, peser le colis ; si poids > 30 kg, l'orienter vers la palette, sinon vers le tapis ». Où est la flèche-retour, et quand s'arrête-t-on ?", solution: "[losange : reste-t-il des colis ?] — NON → fin ; OUI → [peser] → [losange : $> 30$ ?] → palette ou tapis → **flèche-retour vers le premier losange** — la boucle est cette remontée, et l'arrêt arrive quand le test d'entrée répond NON : c'est le `tant que` dessiné — sans la flèche-retour, un seul colis serait traité ; sans le test, la boucle ne finirait jamais : les deux pièges classiques." },
    { tier: "exam", prompt: "Une boulangerie automatise sa caisse de fin de journée : pour chaque ticket, lire le montant ; l'ajouter au total ; s'il dépasse 50 €, incrémenter aussi un compteur « gros tickets ». (1) Liste les variables et leurs valeurs de départ. (2) Décris l'organigramme complet (boucle comprise). (3) Déroule la trace sur les tickets 23, 67, 12, 55 et donne les deux résultats. (4) Quelle ligne changerais-tu pour compter les tickets de plus de 80 € ?", solution: "(1) `total ← 0`, `gros ← 0` — toujours initialiser. (2) [losange : reste-t-il un ticket ?] OUI → [lire $m$] → [`total ← total + m`] → [losange : $m > 50$ ?] OUI → [`gros ← gros + 1`] → flèche-retour ; NON → flèche-retour directe ; le NON du premier losange → [afficher total, gros]. (3) Trace : total = 23, 90, 102, **157** ; gros = 0, 1, 1, **2** — recette 157 €, deux gros tickets. (4) Le seuil vit dans UN losange : remplacer « $> 50$ » par « $> 80$ » — une procédure bien dessinée se modifie en touchant une seule case : c'est toute la valeur de l'organigramme, et le programme de demain n'est que sa traduction." },
  ],
  practice: [
    { tier: "warmup", label: "La trace du total", make: (r) => {
      const a = randint(r, 5, 15); const b = randint(r, 5, 15); const c = randint(r, 5, 15);
      return { prompt: `\`total ← 0\` puis ajoute ${a}, ${b}, ${c} : valeur finale ?`, answer: a + b + c, solution: `0 → ${a} → ${a + b} → **${a + b + c}** — la case s'accumule.` };
    } },
    { tier: "application", label: "Quel symbole ?", make: (r) => {
      const cas = pick(r, [["calculer le prix", 0], ["le poids dépasse-t-il 30 kg ?", 1], ["afficher le résultat", 0], ["reste-t-il des pièces ?", 1]]);
      return { prompt: `« ${cas[0]} » : rectangle (0) ou losange (1) ?`, answer: cas[1], solution: `**${cas[1] ? "Losange" : "Rectangle"}** — ${cas[1] ? "une question oui/non décide" : "une action s'exécute"}.` };
    } },
    { tier: "challenge", label: "Combien de tours ?", make: (r) => {
      const n = randint(r, 3, 8);
      return { prompt: `La boucle traite ${n} colis (un par tour) : combien de passages par la flèche-retour ?`, answer: n, solution: `**${n}** tours — un par colis, et le test d'entrée arrête au ${n + 1}ᵉ passage.` };
    } },
  ],
};

export default [figuresSolides, airesVolumes, proportionnalitePourcentages, organigrammes];
