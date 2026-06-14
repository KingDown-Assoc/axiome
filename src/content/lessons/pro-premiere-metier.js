// Field "Applied / Geometry / Logic" — HIGH module (premiere-pro year), voie
// professionnelle. Official 1re pro programme: CALCULS COMMERCIAUX ET
// FINANCIERS (for specialties without physics-chemistry — SIMPLE INTEREST,
// proportional rates, costs: purchase cost, margin, selling price; reinvests
// arithmetic sequences), GÉOMÉTRIE DANS L'ESPACE (groupements A, B, C —
// composite solids, representations, sections, technical drawings),
// TRIGONOMÉTRIE (groupements A and B — the unit circle, cosine and sine as
// coordinates of the turning point, periodic phenomena: amplitude, period)
// and ALGORITHMIQUE (structuring programs with FUNCTIONS, iterating over
// list elements). Singapore method: bar models for interest blocks and cost
// chains (Proportionality), nets and perspective as Pictorial geometry
// (Diagrams), the circle read before formalized, trade contexts throughout.
import { randint, pick } from "../../core/exercises.js";

// — Simple interest, rates and costs (programme: calculs commerciaux et financiers) —
const interetsCouts = {
  id: "applied.high.interets-couts",
  level: "high", domain: "applied",
  title: "Intérêts simples, taux et coûts",
  tagline: "Le placement qui empile des blocs égaux — et la chaîne achat → marge → prix.",
  prereqs: ["applied.high.proportionnalite-pourcentages", "algebra.high.suites-evolutions"],
  intuition:
    "Tu places 2 000 € à 3 % d'**intérêts simples** : chaque année, la banque verse 3 % **du capital de départ** — toujours 60 €, le même bloc.\n\nDessine la barre : le capital, puis un petit bloc de 60 € qui s'empile chaque année — c'est ta suite **arithmétique** en costume financier : $I = C \\times t \\times n$.",
  depths: {
    discovery:
      "**Avec les mains** : déroule le placement — fin d'année 1 : $2000 + 60 = 2060$ ; année 2 : $2120$ ; année 3 : $2180$ — le même bloc de 60 € s'ajoute (l'intérêt se calcule TOUJOURS sur les 2 000 de départ : c'est la définition du *simple*) : capital acquis $= C + C \\times t \\times n = 2000 + 60n$ — une fonction affine du temps : la droite du placement.",
    standard:
      "**En image** : les **taux proportionnels** se découpent en barre — 6 % **annuel** = barre de l'année en 12 parts : $0{,}5$ % **mensuel** (et 1,5 % trimestriel) : un placement de 4 mois à 6 % l'an rapporte $C \\times 0{,}06 \\times \\dfrac{4}{12}$ — le temps se met en fraction d'année, la barre du taux se découpe pareil : big idea *Proportionality* — intérêt proportionnel au capital ET à la durée.",
    advanced:
      "**Dans la tête** : la **chaîne des coûts** du commerçant — coût d'achat (achat + frais), puis la **marge** s'ajoute : prix de vente HT $=$ coût d'achat $\\times (1 + \\text{taux de marge})$, puis la TVA coiffe : PV TTC $=$ PV HT $\\times 1{,}2$ — trois barres emboîtées, trois coefficients qui se **multiplient** (ta leçon de seconde, devenue chaîne professionnelle) ; et chaque maillon se **remonte en divisant** : du prix étiqueté au coût d'achat, la chaîne se lit dans les deux sens — le gestionnaire passe sa journée à monter et descendre cette barre.",
  },
  keyIdea: "**Intérêts simples** : $I = C \\times t \\times n$ — le même bloc chaque période (suite arithmétique, capital acquis affine en $n$) ; **taux proportionnels** : le taux se découpe comme le temps (annuel ÷ 12 = mensuel). **Chaîne des coûts** : achat $\\xrightarrow{\\times(1 + \\text{marge})}$ PV HT $\\xrightarrow{\\times 1{,}2}$ PV TTC — et on remonte en divisant : *Proportionality* de bout en bout.",
  why:
    "Pourquoi un module financier en maths ? Parce que les spécialités tertiaires en vivent : devis, paie, gestion de caisse, négociation fournisseur — et parce que les maths y sont déjà toutes : l'intérêt simple EST la suite arithmétique, la chaîne des coûts EST la composition de coefficients, remonter un prix EST diviser par le coefficient. Ce module ne crée rien : il montre que tes outils calculent de l'argent réel — et l'intérêt *composé* de terminale (le bloc qui grossit !) attend la suite géométrique au tournant.",
  examples: [
    { title: "Les blocs du placement", steps: [
      { p: "2 000 € à 3 % simple : $I = 2000 \\times 0{,}03 = 60$ €/an — le bloc constant." },
      { p: "Sur 5 ans : $60 \\times 5 = 300$ € — capital acquis $2300$ € : l'arithmétique encaisse." },
    ] },
    { title: "La chaîne du commerçant", steps: [
      { p: "Achat 50 € → marge 40 % : PV HT $= 50 \\times 1{,}4 = 70$ € → TVA : TTC $= 70 \\times 1{,}2 = 84$ €." },
      { p: "Coefficient global $\\times 1{,}68$ — et l'étiquette se remonte : $84 \\div 1{,}2 \\div 1{,}4 = 50$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un livret rémunère 1 500 € à 2 % d'intérêts simples. Dessine la barre des trois premières années (décris les blocs) et donne le capital acquis après 3 ans.", solution: "Bloc annuel : $1500 \\times 0{,}02 = 30$ € — barre : [1 500 | 30 | 30 | 30] : capital acquis $= 1500 + 90 = $ **1 590 €** — le même bloc s'empile (l'intérêt regarde toujours le capital *initial*) : la suite arithmétique de raison 30, en euros." },
    { tier: "warmup", prompt: "Quel est le taux mensuel proportionnel à 6 % annuel ? Et combien rapporte un placement de 3 000 € pendant 5 mois à ce taux ?", solution: "Taux mensuel $= \\dfrac{6}{12} = $ **0,5 %** — la barre annuelle découpée en 12 ; intérêt $= 3000 \\times 0{,}005 \\times 5 = $ **75 €** (ou directement $3000 \\times 0{,}06 \\times \\frac{5}{12}$ ✓) — le temps en fraction d'année, le taux suit en proportion." },
    { tier: "application", prompt: "Un grossiste achète un article 80 € et veut une marge de 35 %, puis applique la TVA de 20 %. Déroule la chaîne (HT, TTC), donne le coefficient global, et vérifie en remontant depuis le TTC.", solution: "PV HT $= 80 \\times 1{,}35 = 108$ € ; TTC $= 108 \\times 1{,}2 = $ **129,60 €** — coefficient global $= 1{,}35 \\times 1{,}2 = $ **1,62** ; remontée : $129{,}60 \\div 1{,}2 = 108$ puis $\\div 1{,}35 = 80$ ✓ — la chaîne monte en multipliant, descend en divisant : jamais d'addition de pourcentages." },
    { tier: "challenge", prompt: "Deux livrets pour 4 000 € : A — 2,5 % d'intérêts simples ; B — 2 % simples plus une prime fixe de 50 € versée immédiatement. Exprime les deux capitaux acquis en fonction de $n$ (années), et trouve à partir de quand A dépasse B.", solution: "A : $4000 + 100n$ ; B : $4050 + 80n$ — deux droites (tes affines !) : égalité quand $100n = 50 + 80n$ ⟹ $20n = 50$ ⟹ $n = 2{,}5$ : **A dépasse B à partir de la 3ᵉ année** — la prime immédiate de B gagne le sprint, le meilleur taux de A gagne le fond : le point de bascule des placements, c'est ton croisement de droites de seconde, en euros." },
    { tier: "exam", prompt: "Une boutique gère un produit : achat fournisseur 45 € l'unité, frais d'approche 5 € l'unité, marge visée 50 %, TVA 20 %. La trésorerie excédentaire (6 000 €) est placée à 3 % d'intérêts simples. (1) Coût d'achat complet et prix de vente TTC. (2) Le concurrent affiche 95 € TTC : que vaut SON prix HT, et sa marge si son coût d'achat complet est aussi 50 € ? (3) Combien la trésorerie rapporte-t-elle en 8 mois ? (4) La boutique solde l'article de 20 % en fin de saison : prix soldé, et la marge survit-elle ?", solution: "(1) Coût $= 45 + 5 = 50$ € ; PV HT $= 50 \\times 1{,}5 = 75$ € ; **TTC** $= 90$ €. (2) Concurrent : HT $= 95 \\div 1{,}2 \\approx 79{,}17$ € — marge $= \\dfrac{79{,}17}{50} - 1 \\approx $ **58 %** : il marge PLUS en affichant plus cher. (3) $I = 6000 \\times 0{,}03 \\times \\dfrac{8}{12} = $ **120 €** — le taux au prorata du temps. (4) Soldé : $90 \\times 0{,}8 = $ **72 €** TTC, soit $60$ € HT : marge restante $= \\dfrac{60}{50} - 1 = $ **20 %** — la chaîne complète (coût, marge, TVA, solde, placement) : quatre coefficients, une division de remontée, un prorata — la gestion d'une boutique tient dans cette leçon." },
  ],
  practice: [
    { tier: "warmup", label: "Le bloc annuel", make: (r) => {
      const C = pick(r, [1000, 2000, 5000]); const t = pick(r, [2, 3, 4]);
      return { prompt: `${C} € à ${t} % d'intérêts simples : l'intérêt d'UNE année ?`, answer: C * t / 100, solution: `$${C} \\times 0{,}0${t} = $ **${C * t / 100} €** — le bloc constant.` };
    } },
    { tier: "application", label: "I = C·t·n", make: (r) => {
      const C = pick(r, [2000, 3000, 4000]); const t = pick(r, [2, 3]); const n = randint(r, 2, 5);
      return { prompt: `${C} € à ${t} % simple pendant ${n} ans : intérêts totaux ?`, answer: C * t * n / 100, solution: `$${C} \\times 0{,}0${t} \\times ${n} = $ **${C * t * n / 100} €** — ${n} blocs de ${C * t / 100}.` };
    } },
    { tier: "challenge", label: "Remonter la chaîne", make: (r) => {
      const cout = pick(r, [40, 50, 60, 80]); const marge = pick(r, [25, 50]);
      const ttc = cout * (1 + marge / 100) * 1.2;
      return { prompt: `TTC $= ${String(ttc).replace(".", ",")}$ €, TVA 20 %, marge ${marge} % : le coût d'achat ? (divise deux fois)`, answer: cout, solution: `$${String(ttc).replace(".", ",")} \\div 1{,}2 \\div ${String(1 + marge / 100).replace(".", ",")} = $ **${cout} €** — la chaîne descendue.` };
    } },
  ],
};

// — Space geometry (programme: solides composés, représentations, sections) —
const espaceRepresentations = {
  id: "geometry.high.espace-representations",
  level: "high", domain: "geometry",
  title: "Représenter l'espace",
  tagline: "Perspective, patron, section — trois regards sur le même objet à fabriquer.",
  prereqs: ["geometry.high.figures-solides", "geometry.high.aires-volumes"],
  intuition:
    "L'objet à fabriquer n'existe pas encore — il faut le **représenter** : la perspective cavalière (le voir en volume), le **patron** (le mettre à plat pour découper), la **section** (le couper pour voir dedans).\n\nTrois dessins, un seul objet : big idea *Diagrams* — chaque représentation montre ce que les autres cachent.",
  depths: {
    discovery:
      "**Avec les mains** : démonte une boîte de céréales — déplie-la : voilà le **patron** du pavé : six rectangles attachés, et les arêtes qui se recollent deux à deux ; replie : le volume renaît — le patron est l'objet *avant fabrication* : le chaudronnier, le couturier, l'emballeur travaillent à plat ce qui vivra en volume — savoir déplier, c'est savoir tracer la tôle.",
    standard:
      "**En image** : la **perspective cavalière** a ses règles — les faces frontales en vraies grandeurs, les fuyantes à 45° et réduites de moitié, les arêtes cachées en **pointillés** : un code, pas un dessin d'artiste — et la **section** révèle l'intérieur : couper un cylindre parallèlement à sa base donne un **disque**, le long de son axe un **rectangle** ; couper un cube parallèlement à une face : un carré — la forme de la coupe dépend du plan de coupe : le plombier qui scie un tube et le pâtissier qui tranche un gâteau le savent dans les mains.",
    advanced:
      "**Dans la tête** : le **repérage** prépare la machine — un point de l'espace se donne par trois nombres $(x\\,;\\,y\\,;\\,z)$ : longueur, largeur, hauteur depuis un coin-origine — c'est l'adresse du perçage sur la pièce, et les machines à commande numérique ne parlent que ce langage : « percer en (120 ; 45 ; 10) » — ton repère du plan, monté d'un étage. Et les trois regards collaborent : la perspective situe, le patron fabrique, la section contrôle, le repère pilote — le dossier technique d'une pièce, c'est exactement ces quatre documents.",
  },
  keyIdea: "**Perspective cavalière** (fuyantes à 45°, réduites, cachées en pointillés), **patron** (l'objet à plat — la fabrication), **section** (la coupe : disque, rectangle, carré… selon le plan), **repère** $(x\\,;\\,y\\,;\\,z)$ (l'adresse machine) — big idea *Diagrams* : quatre regards, un objet.",
  why:
    "Pourquoi quatre représentations du même objet ? Parce que chaque métier en consomme une : le commercial montre la perspective, l'atelier découpe le patron, le contrôle vérifie la section, la CN exécute les coordonnées — et l'erreur de lecture entre deux regards (un patron mal replié, une cote de section mal lue) se paie en matière gâchée. Lire et produire ces dessins est la **langue commune** du dossier technique : la géométrie de l'espace pro est d'abord une compétence de communication.",
  examples: [
    { title: "La boîte dépliée", steps: [
      { p: "Pavé 20 × 8 × 30 : le patron étale six rectangles — deux 20×8, deux 8×30, deux 20×30." },
      { p: "Aire du patron $= 2(160 + 240 + 600) = 2000$ cm² — le carton à commander, lu à plat." },
    ] },
    { title: "Le tube scié", steps: [
      { p: "Cylindre scié perpendiculairement à l'axe : section **disque** ; scié le long de l'axe : **rectangle**." },
      { p: "Même tube, deux coupes, deux formes — le plan de coupe décide." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris le patron d'un cylindre de rayon 5 cm et de hauteur 12 cm (formes et dimensions de chaque pièce) — quelle longueur cruciale relie le rectangle au disque ?", solution: "Deux **disques** de rayon 5 (les fonds) et un **rectangle** de hauteur 12 sur longueur $2\\pi \\times 5 \\approx 31{,}4$ cm — la longueur du rectangle est le **périmètre du disque** : c'est la condition de recollement — la tôle s'enroule exactement sur le bord : rater cette cote, c'est une cuve qui ne ferme pas." },
    { tier: "warmup", prompt: "En perspective cavalière d'un cube de 6 cm d'arête : quelles arêtes sont en vraie grandeur, lesquelles sont réduites, et pourquoi certaines sont-elles en pointillés ?", solution: "La face frontale : 4 arêtes en **vraie grandeur** (6 cm) ; les fuyantes : à 45°, **réduites** (≈ 3 cm dessinées) ; les **pointillés** marquent les arêtes cachées derrière l'objet — la perspective est un code de lecture partagé, pas un dessin libre : tout l'atelier doit lire le même volume." },
    { tier: "application", prompt: "On coupe : (a) un cube parallèlement à une face ; (b) un cylindre par un plan contenant son axe ; (c) une boule par n'importe quel plan. Donne la forme de chaque section, et l'usage métier d'une telle coupe.", solution: "(a) **Carré** (identique à la face) ; (b) **rectangle** (hauteur × diamètre) ; (c) **disque** — toujours, c'est la signature de la sphère. Usage : la section est le dessin de **contrôle** — vérifier une épaisseur de paroi, une soudure interne, un alésage : on dessine la coupe avant de scier, et le contrôleur compare la coupe réelle au plan." },
    { tier: "challenge", prompt: "Une pièce doit être percée en trois points donnés en coordonnées machine (mm) : A(40 ; 25 ; 0), B(40 ; 85 ; 0), C(100 ; 25 ; 0). (1) Que dire des points A et B ? A et C ? (2) Calcule les distances AB et AC. (3) Pourquoi la machine exige-t-elle ce langage plutôt qu'un croquis coté ?", solution: "(1) A et B : même $x$ (alignés parallèlement à l'axe des $y$) ; A et C : même $y$ (parallèles à l'axe des $x$) — et tous en $z = 0$ : sur la face supérieure. (2) $AB = 85 - 25 = $ **60 mm**, $AC = 100 - 40 = $ **60 mm** — les distances se lisent sur la coordonnée qui change. (3) La machine ne **lit pas** un croquis : elle exécute des nombres — le repère est sans ambiguïté (une adresse, un point), reproductible et programmable : le croquis communique entre humains, les coordonnées commandent les machines — les deux langages du dossier technique." },
    { tier: "exam", prompt: "Une entreprise fabrique des boîtes cylindriques (rayon 4 cm, hauteur 10 cm) à partir de plaques de métal. (1) Décris le patron complet avec ses dimensions exactes. (2) Aire de métal par boîte (disques + rectangle, arrondi au cm²). (3) Une plaque fait 100 cm × 35 cm : combien de rectangles de corps y découpe-t-on (un seul sens de découpe, rectangles de 10 cm de haut) ? (4) Le client demande une vue en coupe le long de l'axe pour vérifier l'épaisseur : quelle forme dessines-tu, avec quelles cotes ?", solution: "(1) Deux disques de rayon 4 + un **rectangle** 10 × $2\\pi \\times 4 \\approx 25{,}1$ cm (la circonférence : la cote de recollement). (2) $2\\pi \\times 16 + 10 \\times 25{,}1 \\approx 100{,}5 + 251{,}3 \\approx $ **352 cm²**. (3) Sur 100 cm de long : $\\lfloor 100 \\div 25{,}1 \\rfloor = 3$ rectangles par bande ; sur 35 cm de haut : 3 bandes de 10 cm — $3 \\times 3 = $ **9 corps par plaque** (avec des chutes : l'optimisation de découpe est un métier entier). (4) Un **rectangle** de 10 cm sur 8 cm (hauteur × diamètre), parois cotées en épaisseur — patron pour fabriquer, aire pour chiffrer, découpe pour optimiser, section pour contrôler : le cycle complet du dossier technique." },
  ],
  practice: [
    { tier: "warmup", label: "La section devinée", make: (r) => {
      const cas = pick(r, [["un cylindre, coupe perpendiculaire à l'axe", 0, "Disque"], ["un cube, coupe parallèle à une face", 1, "Carré"], ["une boule, coupe quelconque", 0, "Disque"], ["un cylindre, coupe le long de l'axe", 2, "Rectangle"]]);
      return { prompt: `Section de ${cas[0]} : disque (0), carré (1) ou rectangle (2) ?`, answer: cas[1], solution: `**${cas[2]}** — le plan de coupe décide.` };
    } },
    { tier: "application", label: "La cote de recollement", make: (r) => {
      const d = pick(r, [10, 20, 30]);
      return { prompt: `Patron d'un cylindre de diamètre ${d} cm : longueur du rectangle ? (arrondi entier, $\\pi \\approx 3{,}14$)`, answer: Math.round(Math.PI * d), solution: `$\\pi \\times ${d} \\approx $ **${Math.round(Math.PI * d)} cm** — le périmètre du fond.` };
    } },
    { tier: "challenge", label: "L'adresse machine", make: (r) => {
      const y1 = randint(r, 10, 40); const dy = pick(r, [30, 50, 60]); const x = randint(r, 20, 80);
      return { prompt: `Perçages A($${x}$ ; $${y1}$ ; 0) et B($${x}$ ; $${y1 + dy}$ ; 0) : distance AB ?`, answer: dy, solution: `Même $x$, même $z$ : $AB = ${y1 + dy} - ${y1} = $ **${dy} mm** — la coordonnée qui change porte la distance.` };
    } },
  ],
};

// — Trigonometry of signals (programme: cercle trigonométrique — groupements A, B) —
const trigonometrieSignal = {
  id: "geometry.high.trigonometrie-signal",
  level: "high", domain: "geometry",
  title: "Le cercle trigonométrique et les signaux",
  tagline: "Un point qui tourne, une hauteur qui ondule — le sinus est né, le signal aussi.",
  prereqs: ["geometry.middle.trigonometrie", "analysis.high.fonctions-affines"],
  intuition:
    "Ton cosinus de 3e vivait dans un triangle rectangle — il déménage : sur un **cercle de rayon 1**, un point tourne depuis (1 ; 0), et pour un angle $x$, ses coordonnées **sont** $(\\cos x\\,;\\,\\sin x)$.\n\nLaisse tourner et note la hauteur du point au fil du temps : elle monte, descend, remonte — une **onde** : le courant alternatif, la vibration, le son — tout signal périodique sort de ce cercle.",
  depths: {
    discovery:
      "**Avec les mains** : suis une nacelle de grande roue — départ à l'horizontale, la hauteur grimpe jusqu'au sommet (quart de tour), redescend, passe au plus bas, remonte : trace cette hauteur en fonction du temps — la **sinusoïde** apparaît toute seule : le sinus n'est que la hauteur d'un point qui tourne, et tu viens de le dessiner sans formule.",
    standard:
      "**En image** : le cercle gradué en **radians** — le tour complet vaut $2\\pi$ (le périmètre du cercle de rayon 1 !), le quart $\\dfrac{\\pi}{2}$ — et les valeurs phares se **lisent** : en $x = 0$ : $\\cos = 1$, $\\sin = 0$ ; en $\\dfrac{\\pi}{2}$ : $\\cos = 0$, $\\sin = 1$ ; en $\\pi$ : $\\cos = -1$ — le cercle EST la table de valeurs : big idea *Diagrams* — et la symétrie offre le reste ($\\cos(-x) = \\cos x$ : même abscisse en miroir).",
    advanced:
      "**Dans la tête** : le signal se paramètre — $u(t) = A\\sin(\\omega t)$ : l'**amplitude** $A$ (la hauteur de crête : le rayon de la roue), la **période** $T$ (la durée d'un tour : $T = \\dfrac{2\\pi}{\\omega}$) — le secteur électrique français oscille à 50 tours par seconde (période $\\dfrac{1}{50} = 0{,}02$ s) avec une amplitude de 325 V : lire $A$ et $T$ sur un oscillogramme, c'est identifier le signal — la compétence des groupements industriels : l'électricien, le technicien de maintenance et le soudeur haute fréquence lisent des sinusoïdes toute la journée, et toutes sortent du même cercle.",
  },
  keyIdea: "Cercle de rayon 1 : le point d'angle $x$ a pour coordonnées $(\\cos x\\,;\\,\\sin x)$ — le tour vaut $2\\pi$ **radians**, et le cercle est la table de valeurs (*Diagrams*). La hauteur du point qui tourne trace la **sinusoïde** : amplitude $A$ (la crête), période $T$ (la durée d'un tour) — tout signal périodique en sort.",
  why:
    "Pourquoi faire tourner un point ? Parce que le monde industriel **tourne et vibre** : moteurs, alternateurs, courants, sons, vibrations de machines — tous périodiques, tous sinusoïdaux ou presque. Le cercle trigonométrique est leur acte de naissance commun : comprendre qu'une onde n'est qu'une rotation vue de profil, c'est pouvoir lire un oscilloscope, régler une fréquence, diagnostiquer une vibration anormale — la trigonométrie du triangle mesurait des toits ; celle du cercle pilote des machines.",
  examples: [
    { title: "La nacelle qui ondule", steps: [
      { p: "La hauteur de la nacelle au fil du temps : monte, culmine, descend, creuse, remonte — la sinusoïde." },
      { p: "Hauteur de crête = rayon de la roue ; durée d'un motif = durée d'un tour : $A$ et $T$ sont nés." },
    ] },
    { title: "Le cercle-table de valeurs", steps: [
      { p: "Quart de tour ($\\frac{\\pi}{2}$) : le point culmine en (0 ; 1) — $\\cos = 0$, $\\sin = 1$, lus sur l'axe." },
      { p: "Demi-tour ($\\pi$) : (−1 ; 0) — le cercle répond sans calculatrice." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Place sur le cercle trigonométrique les points d'angles $0$, $\\dfrac{\\pi}{2}$, $\\pi$ et $\\dfrac{3\\pi}{2}$, et lis pour chacun le couple $(\\cos\\,;\\,\\sin)$.", solution: "$(1\\,;\\,0)$, $(0\\,;\\,1)$, $(-1\\,;\\,0)$, $(0\\,;\\,-1)$ — les quatre points cardinaux du cercle : l'abscisse est le cosinus, l'ordonnée le sinus — le cercle est ta table de valeurs : quatre angles, huit valeurs, zéro calculatrice." },
    { tier: "warmup", prompt: "Convertis : un tour complet, un demi-tour et un quart de tour en radians — et pourquoi le tour vaut-il exactement $2\\pi$ ?", solution: "Tour $= 2\\pi$, demi $= \\pi$, quart $= \\dfrac{\\pi}{2}$ — le radian mesure l'angle par la **longueur d'arc** parcourue sur le cercle de rayon 1 : un tour complet parcourt le périmètre $2\\pi \\times 1 = 2\\pi$ — l'angle devient une distance : c'est ce qui rendra les formules de signaux naturelles." },
    { tier: "application", prompt: "Un oscillogramme montre une tension qui culmine à 12 V, creuse à −12 V, et dont le motif se répète toutes les 0,04 s. Donne l'amplitude et la période du signal, et la grandeur « tours par seconde » (fréquence).", solution: "Amplitude $A = $ **12 V** (la crête — le rayon de la roue), période $T = $ **0,04 s** (la durée d'un tour) — fréquence $= \\dfrac{1}{0{,}04} = $ **25 tours/s** — lire $A$ et $T$ sur l'écran, c'est identifier le signal : le geste quotidien du technicien de maintenance." },
    { tier: "challenge", prompt: "Deux signaux sur le même écran : $u_1$ culmine à 5 V avec un motif de 0,02 s ; $u_2$ culmine à 5 V avec un motif de 0,01 s. Qu'ont-ils en commun, en quoi diffèrent-ils — et lequel correspond à une rotation plus rapide du point sur le cercle ?", solution: "Même **amplitude** (5 V : même rayon), mais $u_2$ a une **période moitié** (0,01 s) : son point fait le tour deux fois plus vite — à l'écran, deux ondes de même hauteur, l'une deux fois plus serrée : amplitude = taille du cercle, période = vitesse de rotation — les deux boutons indépendants du signal, et le diagnostic vibratoire compare exactement ces deux réglages." },
    { tier: "exam", prompt: "Le secteur électrique : $u(t) = 325\\sin(100\\pi t)$ (volts, secondes). (1) Amplitude du signal. (2) Période $T = \\dfrac{2\\pi}{100\\pi}$ : calcule, puis la fréquence — retrouve la valeur célèbre. (3) Que vaut $u(0)$ ? Et le signal culmine pour la première fois quand le point a fait un quart de tour : à quel instant ? (4) Pourquoi le « 230 V » de la prise diffère-t-il du 325 calculé ? (Réponse qualitative attendue.)", solution: "(1) $A = $ **325 V** — la crête. (2) $T = \\dfrac{2\\pi}{100\\pi} = $ **0,02 s**, fréquence $= \\dfrac{1}{T} = $ **50 Hz** — le 50 du réseau européen, retrouvé par le calcul. (3) $u(0) = 325\\sin(0) = $ **0 V** (le point part de l'horizontale) ; quart de tour $= \\dfrac{T}{4} = $ **0,005 s** : première crête à 5 millisecondes. (4) Le 230 V est une valeur **moyenne efficace** : l'onde passe plus de temps loin de sa crête qu'à la crête — la tension « utile » est plus basse que le maximum (le rapport exact relève de la terminale) — amplitude, période, fréquence, départ : la carte d'identité du signal le plus distribué de France, lue sur le cercle." },
  ],
  practice: [
    { tier: "warmup", label: "Le cercle répond", make: (r) => {
      const cas = pick(r, [["\\cos(0)", 1], ["\\sin(0)", 0], ["\\cos(\\pi)", -1], ["\\sin\\left(\\dfrac{\\pi}{2}\\right)", 1], ["\\cos\\left(\\dfrac{\\pi}{2}\\right)", 0]]);
      return { prompt: `$${cas[0]} = \\,?$`, answer: cas[1], solution: `**${cas[1]}** — lu sur le cercle, point cardinal.` };
    } },
    { tier: "application", label: "Période et fréquence", make: (r) => {
      const f = pick(r, [10, 20, 25, 50]);
      return { prompt: `Un signal fait ${f} tours par seconde : sa période en secondes ? (décimal)`, answer: 1 / f, solution: `$T = \\dfrac{1}{${f}} = $ **${String(1 / f).replace(".", ",")} s** — la durée d'un tour.` };
    } },
    { tier: "challenge", label: "Lire l'oscillogramme", make: (r) => {
      const A = pick(r, [5, 12, 24]); const quoi = r() < 0.5;
      const T = pick(r, [2, 4, 5]);
      return { prompt: `Signal : crête à ${A} V, creux à −${A} V, motif répété toutes les 0,0${T} s : ${quoi ? "l'amplitude (V)" : "la période (en centièmes de s)"} ?`, answer: quoi ? A : T, solution: `${quoi ? "$A = $ **" + A + " V** — la crête" : "$T = $ **0,0" + T + " s** — soit " + T + " centièmes"}.` };
    } },
  ],
};

// — Programming with functions (programme: fonctions, itération sur listes) —
const programmesFonctions = {
  id: "logic.high.programmes-fonctions",
  level: "high", domain: "logic",
  title: "Programmer : fonctions et listes",
  tagline: "L'organigramme devient code — la fonction encapsule, la boucle parcourt la liste.",
  prereqs: ["logic.high.organigrammes", "logic.middle.boucle-conditionnelle"],
  intuition:
    "Ton organigramme du devis tourne — mais à chaque nouveau client, tu le redessines ? Non : **encapsule-le** dans une fonction : `devis(metrage)` qui rend le prix — écrite une fois, appelée mille fois.\n\nEt les tickets de la journée vivent dans une **liste** : la boucle `pour chaque ticket` les parcourt tous — tes deux outils de production logicielle.",
  depths: {
    discovery:
      "**Avec les mains** : traduis l'organigramme case par case — [lire $x$] devient le **paramètre**, [calculer $15x + 40$] devient une ligne, [afficher] devient `renvoyer` : `def devis(x): renvoyer 15*x + 40` — trois lignes, et `devis(10)` répond 190, `devis(24)` répond 400 : la procédure dessinée est devenue une **machine à réponses** qu'on appelle par son nom.",
    standard:
      "**En image** : la **liste** se dessine en casiers numérotés — `prix = [23, 67, 12, 55]` : quatre casiers, indices 0 à 3 — et la boucle `pour chaque p dans prix` ouvre les casiers l'un après l'autre : ta trace de seconde (`total ← total + p`) parcourt maintenant une vraie structure : le total de caisse, le maximum de la journée, le comptage des gros tickets — tous suivent le même squelette : initialiser, parcourir, conclure.",
    advanced:
      "**Dans la tête** : la **composition** fait les programmes réels — les fonctions s'appellent entre elles : `ttc(ht)` appelle `tva(ht)`, `total_journee(liste)` appelle `devis(x)` pour chaque commande — chaque fonction fait UNE chose, et le programme les assemble (le principe qui rend le code lisible, testable, réparable : on remplace une brique sans toucher au mur). Le réflexe professionnel reste la **trace** : avant de faire confiance, dérouler `total_journee([10, 20])` à la main, ligne par ligne, valeur par valeur — le programme de 1re pro veut exactement ça : structurer en fonctions, itérer sur les listes, vérifier sur un petit cas — les trois gestes du technicien qui automatise son poste.",
  },
  keyIdea: "**Fonction** : l'organigramme encapsulé — paramètre en entrée, `renvoyer` en sortie, écrite une fois, appelée partout. **Liste** : les casiers numérotés ; `pour chaque élément` les parcourt — squelette : initialiser, parcourir, conclure. Et la **trace à la main** sur un petit cas valide avant l'usage.",
  why:
    "Pourquoi passer du dessin au code ? Parce que l'organigramme convainc l'humain mais ne tourne pas — la fonction, si : le tableur de gestion, le script de caisse, la macro de découpe sont des fonctions qui itèrent sur des listes. Savoir encapsuler sa procédure métier et la dérouler sur les données du jour, c'est automatiser son propre poste — la compétence qui transforme « celui qui subit l'outil » en « celui qui le fabrique ».",
  examples: [
    { title: "L'organigramme encapsulé", steps: [
      { p: "`def devis(x): renvoyer 15*x + 40` — le dessin de seconde, en trois lignes." },
      { p: "`devis(10)` → 190 ; `devis(24)` → 400 — écrite une fois, appelée sans fin." },
    ] },
    { title: "Le squelette du parcours", steps: [
      { p: "`total ← 0` ; `pour chaque p dans [23, 67, 12, 55] : total ← total + p` ; afficher." },
      { p: "Initialiser, parcourir, conclure — trace : 23, 90, 102, 157 ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris (en pseudo-code) la fonction `prix_ttc(ht)` qui renvoie le prix TTC avec une TVA de 20 %, puis donne `prix_ttc(50)` et `prix_ttc(120)`.", solution: "`def prix_ttc(ht): renvoyer ht * 1,2` — appels : `prix_ttc(50)` → **60**, `prix_ttc(120)` → **144** — ton coefficient multiplicateur, encapsulé : le calcul de seconde est devenu un outil qu'on appelle par son nom." },
    { tier: "warmup", prompt: "Déroule la trace : `maxi ← 0`, puis pour chaque p dans [23, 67, 12, 55] : si p > maxi, alors maxi ← p. Valeurs successives de `maxi` ?", solution: "0 → **23** (23 > 0) → **67** (67 > 23) → 67 (12 ne passe pas) → 67 (55 non plus) : maximum **67** — le squelette initialiser-parcourir-conclure, avec un losange dans la boucle : la recherche du plus gros ticket, déroulée casier par casier." },
    { tier: "application", prompt: "Écris la fonction `total(liste)` qui renvoie la somme des éléments, puis utilise-la : que renvoie `total([12, 7, 15, 6])` ? Pourquoi vaut-il mieux une fonction qu'un calcul refait chaque soir ?", solution: "`def total(liste): t ← 0 ; pour chaque p dans liste : t ← t + p ; renvoyer t` — `total([12, 7, 15, 6])` → **40** — la fonction s'écrit UNE fois et s'appelle chaque soir sur la liste du jour : le calcul refait à la main se trompe un soir sur dix, la fonction jamais (si la trace l'a validée une fois) — automatiser, c'est fiabiliser." },
    { tier: "challenge", prompt: "Compose : `def devis(x): renvoyer 15*x + 40` et `def total_chantiers(liste): t ← 0 ; pour chaque m dans liste : t ← t + devis(m) ; renvoyer t`. Déroule `total_chantiers([10, 4])` en suivant chaque appel.", solution: "Parcours : $m = 10$ → appel `devis(10)` → 190 → $t = 190$ ; $m = 4$ → `devis(4)` → 100 → $t = $ **290** — une fonction qui en appelle une autre : `total_chantiers` ne sait PAS calculer un devis, elle délègue — chaque brique fait une chose, l'assemblage fait le programme : si le tarif change, on ne touche QUE `devis` — la maintenabilité, en deux fonctions." },
    { tier: "exam", prompt: "La caisse d'un food-truck : les montants du midi sont `[8,50 ; 12 ; 23 ; 9,50 ; 31 ; 12]`. (1) Écris `compte_gros(liste, seuil)` qui renvoie le nombre de tickets strictement supérieurs au seuil. (2) Trace `compte_gros(liste, 20)` valeur par valeur. (3) Le patron veut AUSSI le total : écris `bilan(liste, seuil)` qui renvoie les deux nombres en réutilisant tes fonctions. (4) En une phrase : pourquoi cette architecture en fonctions est-elle celle qu'on te demandera en entreprise ?", solution: "(1) `def compte_gros(liste, seuil): c ← 0 ; pour chaque p dans liste : si p > seuil : c ← c + 1 ; renvoyer c` — le seuil en **paramètre** : la fonction sert pour 20 € comme pour 80. (2) Trace : 8,50 non ; 12 non ; **23 oui** (c = 1) ; 9,50 non ; **31 oui** (c = 2) ; 12 non → renvoie **2**. (3) `def bilan(liste, seuil): renvoyer (total(liste), compte_gros(liste, seuil))` — total $= 96$ € et 2 gros tickets : **la composition réutilise**, zéro ligne dupliquée. (4) Parce qu'un programme en petites fonctions se **lit, se teste et se répare** brique par brique — celui qui le modifie dans six mois (souvent toi) ne casse rien : c'est l'organigramme de seconde devenu méthode de travail." },
  ],
  practice: [
    { tier: "warmup", label: "L'appel de fonction", make: (r) => {
      const a = pick(r, [10, 12, 15]); const b = pick(r, [20, 40]); const x = randint(r, 3, 9);
      return { prompt: `\`def devis(x): renvoyer ${a}*x + ${b}\` — que renvoie \`devis(${x})\` ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b}** — la machine à réponses.` };
    } },
    { tier: "application", label: "Le parcours qui compte", make: (r) => {
      const seuil = pick(r, [10, 20]); const vals = [randint(r, 3, 9), seuil + randint(r, 1, 10), randint(r, 3, 9), seuil + randint(r, 1, 15)];
      return { prompt: `Liste [${vals.join(" ; ")}], seuil ${seuil} : combien d'éléments strictement supérieurs ?`, answer: vals.filter((v) => v > seuil).length, solution: `**${vals.filter((v) => v > seuil).length}** — le losange dans la boucle a compté.` };
    } },
    { tier: "challenge", label: "La trace du maximum", make: (r) => {
      const a = randint(r, 10, 30); const b = a + randint(r, 5, 20); const c = randint(r, 5, Math.max(6, a - 1));
      return { prompt: `\`maxi ← 0\` puis parcours de [${a}, ${b}, ${c}] : valeur finale de \`maxi\` ?`, answer: b, solution: `0 → ${a} → **${b}** → ${b} (${c} ne passe pas) — le plus gros casier gagne.` };
    } },
  ],
};

export default [interetsCouts, espaceRepresentations, trigonometrieSignal, programmesFonctions];
