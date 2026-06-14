// Field "Geometry" — MIDDLE module (5e year), part 1: configurations and
// transformations. Official cycle-4 programme: reading/placing coordinates in an
// orthogonal frame of the plane (and abscissas of relatives on a line); defining
// the half-turn (central symmetry) and its conservation properties; alternate-
// interior and corresponding angles CHARACTERIZING parallelism, and the actual
// PROOF of the 180° triangle angle sum; the parallelogram defined, built, and
// characterized by its sides and diagonals (center of symmetry!), particular
// parallelograms (rectangle, rhombus, square), and the parallelogram area.
import { randint, pick } from "../../core/exercises.js";

// — Coordinates in the plane (programme: repérage sur une droite et dans le plan) —
const reperage = {
  id: "geometry.middle.reperage",
  level: "middle", domain: "geometry",
  title: "Le repère du plan",
  tagline: "Deux nombres suffisent pour nommer chaque point — Descartes l'a vu sur une mouche.",
  prereqs: ["numbers.middle.relatifs"],
  intuition:
    "La droite graduée s'est étendue aux négatifs ; croisons-en **deux**, perpendiculaires en zéro : voilà un **repère orthogonal** du plan. Chaque point y reçoit deux nombres — ses **coordonnées** $(x\\,;\\,y)$ : l'**abscisse** (horizontale) puis l'**ordonnée** (verticale).\n\nL'ordre est sacré : $(2\\,;\\,3)$ et $(3\\,;\\,2)$ sont deux points différents.",
  depths: {
    discovery:
      "**Avec les mains** : la bataille navale joue déjà au repère — B7 nomme une case par colonne et ligne. Le repère mathématique affine : il nomme des **points** (pas des cases), et il accepte les négatifs : $(-2\\,;\\,3)$ vit à gauche de l'axe vertical, en haut.",
    standard:
      "**En image** : lire et placer — pour lire un point, on descend (ou monte) verticalement vers l'axe horizontal : l'abscisse ; puis horizontalement vers l'axe vertical : l'ordonnée. Pour placer $(-3\\,;\\,2)$ : 3 vers la gauche, 2 vers le haut. Les axes découpent le plan en quatre **quadrants** — les signes des coordonnées disent lequel : $(+;+)$ en haut à droite, $(-;-)$ en bas à gauche.",
    advanced:
      "**Dans la tête** : la légende veut que Descartes (1637), alité, ait suivi une mouche au plafond et compris qu'il suffisait de **deux nombres** — distances aux deux murs — pour dire sa position à chaque instant. L'idée a fusionné deux mondes : toute figure devient des nombres, tout calcul devient une figure. La géométrie « cartésienne » porte son nom — et ton graphique de proportionnalité, tes futurs graphiques de fonctions, le GPS : tous habitent ce repère.",
  },
  keyIdea: "Repère orthogonal : deux axes gradués perpendiculaires. Un point $= (x\\,;\\,y)$ : **abscisse puis ordonnée** — l'ordre compte, les négatifs comptent.",
  why:
    "Pourquoi nommer les points par des nombres ? Pour faire calculer la géométrie : « ces trois points sont-ils alignés ? » devient une question d'arithmétique, et l'ordinateur — qui ne sait que calculer — peut dessiner. Chaque pixel de ton écran a ses coordonnées : le repère de Descartes est l'alphabet de toutes les images numériques.",
  examples: [
    { title: "Placer (−3 ; 2)", steps: [
      { p: "Abscisse $-3$ : trois unités vers la **gauche** sur l'axe horizontal." },
      { p: "Ordonnée $2$ : deux unités vers le **haut** — le point vit dans le quadrant haut-gauche." },
    ] },
    { title: "L'ordre est sacré", steps: [
      { p: "$(2\\,;\\,3)$ : abscisse 2, ordonnée 3 — à droite, puis en haut." },
      { p: "$(3\\,;\\,2)$ : un **autre** point — échanger les coordonnées déplace." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $(x\\,;\\,y)$, comment s'appellent les deux coordonnées, et laquelle se lit en premier ?", solution: "L'**abscisse** $x$ (sur l'axe horizontal) puis l'**ordonnée** $y$ (vertical) — toujours dans cet ordre : $(2\\,;\\,3) \\neq (3\\,;\\,2)$." },
    { tier: "warmup", prompt: "Décris comment placer le point $(-3\\,;\\,2)$ dans un repère.", solution: "Depuis l'origine : **3 vers la gauche** (abscisse négative), puis **2 vers le haut** — quadrant haut-gauche." },
    { tier: "application", prompt: "Donne les signes des coordonnées d'un point situé en bas à droite du repère.", solution: "Abscisse **positive** (à droite), ordonnée **négative** (en bas) : $(+\\,;\\,-)$ — les signes nomment le quadrant." },
    { tier: "challenge", prompt: "A$(2\\,;\\,3)$ et B$(2\\,;\\,-5)$ : que remarques-tu, et que dire de la droite (AB) ?", solution: "**Même abscisse** : les deux points sont à la même distance horizontale de l'origine — la droite (AB) est **verticale** (parallèle à l'axe des ordonnées). Une coordonnée commune, c'est un alignement." },
    { tier: "exam", prompt: "Le point M a pour coordonnées $(-4\\,;\\,-4)$. Son symétrique M' par rapport à l'origine a $(4\\,;\\,4)$. Que fait la symétrie sur les coordonnées ?", solution: "Elle prend l'**opposé de chacune** : $(x\\,;\\,y) \\to (-x\\,;\\,-y)$ — le demi-tour autour de l'origine traverse le zéro dans les deux directions à la fois : les relatifs et la géométrie se serrent la main." },
  ],
  practice: [
    { tier: "warmup", label: "Le quadrant des signes", make: (r) => {
      const x = (r() < 0.5 ? -1 : 1) * randint(r, 1, 8); const y = (r() < 0.5 ? -1 : 1) * randint(r, 1, 8);
      const quad = x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3);
      return { prompt: `Le point $(${x}\\,;\\,${y})$ : dans quel quadrant ? (1 = haut-droite, 2 = haut-gauche, 3 = bas-gauche, 4 = bas-droite)`, answer: quad, solution: `Abscisse ${x > 0 ? "positive (droite)" : "négative (gauche)"}, ordonnée ${y > 0 ? "positive (haut)" : "négative (bas)"} → quadrant **${quad}**.` };
    } },
    { tier: "application", label: "L'opposé du point", make: (r) => {
      const x = (r() < 0.5 ? -1 : 1) * randint(r, 1, 9); const y = (r() < 0.5 ? -1 : 1) * randint(r, 1, 9);
      return { prompt: `Quelle est l'abscisse du symétrique de $(${x}\\,;\\,${y})$ par rapport à l'origine ?`, answer: -x, solution: `$(x\\,;\\,y) \\to (-x\\,;\\,-y)$ : abscisse **${-x}**.` };
    } },
  ],
};

// — Central symmetry (programme: définir le demi-tour, propriétés) —
const symetrieCentrale = {
  id: "geometry.middle.symetrie-centrale",
  level: "middle", domain: "geometry",
  title: "La symétrie centrale",
  tagline: "Un demi-tour autour d'un point — et la figure retombe à l'envers, intacte.",
  prereqs: ["geometry.middle.distances"],
  intuition:
    "Après le pli (symétrie axiale), le **pivot** : la **symétrie centrale** de centre O est le **demi-tour** autour de O — pique un compas en O, tourne la feuille de 180°.\n\nLa définition tient en une phrase : M' est le symétrique de M par rapport à O lorsque **O est le milieu de [MM']** — aligné, à égale distance, de l'autre côté.",
  depths: {
    discovery:
      "**Avec les mains** : trace une figure sur calque, pique en O, tourne d'un demi-tour : l'image apparaît **tête en bas** mais rigoureusement identique. Le 2 de cœur d'un jeu de cartes survit au demi-tour : il a un centre de symétrie.",
    standard:
      "**En image** : construire au compas et à la règle — pour M' : trace la droite (MO), reporte la distance OM **de l'autre côté** de O. La symétrie centrale **conserve** tout : longueurs, angles, aires, alignements — c'est une figure déménagée, pas déformée. Et sa propriété maîtresse : **l'image d'une droite est une droite parallèle** (le demi-tour retourne sans incliner).",
    advanced:
      "**Dans la tête** : compare les deux symétries — l'axiale **retourne** (ta main droite devient gauche : les figures sont inversées comme dans un miroir) ; la centrale **ne retourne pas** (la main droite reste droite, juste tête en bas : c'est une rotation). C'est pour cela que l'écriture reste illisible dans un miroir mais se lit, à l'envers, après un demi-tour. Deux transformations, deux natures — et la parallèle-image de la centrale prépare en secret le parallélogramme.",
  },
  keyIdea: "M' symétrique de M par rapport à O ⟺ **O milieu de [MM']**. Conservation totale (longueurs, angles, aires) — et l'image d'une droite est une droite **parallèle**.",
  why:
    "Pourquoi une deuxième symétrie, l'axiale ne suffisait-elle pas ? Parce que la nature et l'art jouent les deux jeux : le papillon est axial, mais le carreau de carte, l'hélice à deux pales, le S, le Z et les pavages tournants sont **centraux** — aucun pli ne les superpose, un demi-tour si. Chaque symétrie capture une régularité du monde que l'autre ne voit pas.",
  examples: [
    { title: "Construire M'", steps: [
      { p: "Trace la droite (MO), puis reporte au compas la distance OM de l'autre côté de O." },
      { p: "O est le **milieu** de [MM'] : aligné, équidistant, opposé — M' est posé." },
    ] },
    { title: "Axiale ou centrale ?", steps: [
      { p: "Le papillon : un pli le superpose — symétrie **axiale**." },
      { p: "Le S : aucun pli ne marche, mais un demi-tour le ramène sur lui-même — symétrie **centrale**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne la définition du symétrique M' d'un point M par rapport à un point O.", solution: "M' est le point tel que **O soit le milieu de [MM']** — M, O, M' alignés, avec OM $=$ OM' : le demi-tour autour de O." },
    { tier: "warmup", prompt: "Décris la construction de M' au compas et à la règle.", solution: "Tracer la droite **(MO)**, prolonger au-delà de O, reporter au compas la distance **OM de l'autre côté** : le point obtenu est M'." },
    { tier: "application", prompt: "Que conserve la symétrie centrale ? Que devient une droite ?", solution: "Tout : **longueurs, angles, aires, alignements** — et l'image d'une droite est une droite **parallèle** : le demi-tour retourne sans incliner." },
    { tier: "challenge", prompt: "Parmi : papillon, lettre S, lettre A, carreau du 2 de cœur — qui a un axe de symétrie, qui a un centre ?", solution: "Papillon et A : **axe** (le pli marche). S et le 2 de cœur : **centre** (seul le demi-tour les superpose) — deux régularités différentes, deux outils." },
    { tier: "exam", prompt: "M$(3\\,;\\,1)$ et O l'origine du repère. Donne les coordonnées de M', symétrique de M par rapport à O, et justifie.", solution: "M'$(-3\\,;\\,-1)$ — O doit être le **milieu** de [MM'] : chaque coordonnée prend son **opposé** (le demi-tour traverse l'origine dans les deux directions). Le repère calcule la géométrie." },
  ],
  practice: [
    { tier: "application", label: "Le milieu impose", make: (r) => {
      const om = randint(r, 2, 15) + (r() < 0.3 ? 0.5 : 0);
      return { prompt: `OM $= ${String(om).replace(".", ",")}$ cm. Que vaut MM' (M' symétrique de M par rapport à O) ?`, answer: 2 * om, solution: `O milieu : MM' $= 2 \\times$ OM $= $ **${String(2 * om).replace(".", ",")} cm**.` };
    } },
    { tier: "challenge", label: "Coordonnées retournées", make: (r) => {
      const x = (r() < 0.5 ? -1 : 1) * randint(r, 1, 9); const y = (r() < 0.5 ? -1 : 1) * randint(r, 1, 9);
      return { prompt: `Symétrique de $(${x}\\,;\\,${y})$ par rapport à l'origine : quelle ordonnée ?`, answer: -y, solution: `Chaque coordonnée prend l'opposé : ordonnée **${-y}**.` };
    } },
  ],
};

// — Alternate-interior angles (programme: caractériser le parallélisme, démontrer 180°) —
const anglesParalleles = {
  id: "geometry.middle.angles-paralleles",
  level: "middle", domain: "geometry",
  title: "Angles alternes-internes",
  tagline: "Le Z qui détecte les parallèles — et qui démontre enfin les 180° du triangle.",
  prereqs: ["geometry.middle.angles-measure", "geometry.middle.triangles"],
  intuition:
    "Une sécante coupe deux droites : huit angles naissent. Deux familles comptent — les **alternes-internes** (de part et d'autre de la sécante, entre les deux droites : ils dessinent un **Z**) et les **correspondants** (même côté, même position : un **F**).\n\nLe théorème : les droites sont **parallèles si et seulement si** les alternes-internes sont **égaux** — l'angle devient un détecteur de parallélisme.",
  depths: {
    discovery:
      "**Avec les mains** : trace deux droites parallèles à la règle, coupe-les d'une sécante, mesure les deux angles du Z : égaux, au degré près. Incline une des droites : les angles divergent aussitôt — l'équivalence se touche.",
    standard:
      "**En image** : le double sens travaille — **savoir** que les droites sont parallèles donne les angles sans rapporteur (alternes-internes égaux, correspondants égaux) ; **mesurer** des alternes-internes égaux **prouve** le parallélisme. C'est ta propriété caractéristique de la médiatrice, version angles : une équivalence sert dans les deux directions.",
    advanced:
      "**Dans la tête** : voici enfin la **vraie démonstration** des 180° — soit un triangle ABC ; trace par A **la parallèle à (BC)**. De part et d'autre de A, deux paires d'alternes-internes naissent : l'angle en B se recopie contre A, l'angle en C aussi. Les trois angles du triangle se retrouvent **côte à côte sur la parallèle** : un angle plat, $180°$. Tes coins déchirés de 6e faisaient ce calcul avec du papier ; les alternes-internes le font avec de la logique — pour tous les triangles de l'univers, sans en déchirer un seul.",
  },
  keyIdea: "Alternes-internes (le **Z**) égaux ⟺ droites **parallèles**. Et la parallèle au sommet recopie les angles de la base : somme du triangle $= 180°$, **démontré**.",
  why:
    "Pourquoi démontrer ce qu'on a déjà vérifié en déchirant des coins ? Parce que mille expériences disent « ça a toujours marché » et qu'une démonstration dit « ça ne peut pas faire autrement ». Euclide a posé ce standard il y a 2 300 ans (Éléments, Livre I) : en mathématiques, la certitude ne se constate pas — elle se construit. La 5e te fait passer du côté des bâtisseurs.",
  examples: [
    { title: "Détecter les parallèles", steps: [
      { p: "Une sécante coupe deux droites : les angles du Z mesurent 57° et 57°." },
      { p: "Alternes-internes **égaux** ⟹ les droites sont **parallèles** — l'angle a tranché, pas la règle." },
    ] },
    { title: "La démonstration des 180°", steps: [
      { p: "Par le sommet A, la parallèle à (BC) : les angles de B et C se recopient contre A (alternes-internes)." },
      { p: "Les trois angles s'alignent sur un angle **plat** : $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°$ — pour tout triangle, à jamais." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dessine deux droites coupées par une sécante : où sont les alternes-internes, et quelle lettre dessinent-ils ?", solution: "De part et d'autre de la sécante, **entre** les deux droites — ils dessinent un **Z** (les correspondants, eux, dessinent un F)." },
    { tier: "warmup", prompt: "(d) et (d') sont parallèles ; un angle alterne-interne mesure 57°. Que vaut l'autre, et pourquoi ?", solution: "**57°** — droites parallèles ⟹ alternes-internes **égaux** : le sens direct de la caractérisation." },
    { tier: "application", prompt: "Deux alternes-internes mesurent 63° et 63°. Que peut-on affirmer des deux droites, et grâce à quel sens du théorème ?", solution: "Elles sont **parallèles** — le sens réciproque : alternes-internes égaux ⟹ parallélisme. L'équivalence détecte autant qu'elle prédit." },
    { tier: "challenge", prompt: "(d) ∥ (d') ; un angle correspondant mesure 124°. Que vaut son alterne-interne avec l'angle initial, situé de l'autre côté ?", solution: "L'alterne-interne vaut **124°** aussi (parallèles ⟹ égalité) — et son supplémentaire adjacent vaut $180 - 124 = 56°$ : la configuration entière se déduit d'une seule mesure." },
    { tier: "exam", prompt: "Rédige la démonstration : la somme des angles d'un triangle vaut 180°.", solution: "Soit ABC un triangle. Traçons par A la **parallèle à (BC)**. L'angle $\\widehat{B}$ et l'angle qu'il forme en A sont **alternes-internes** entre deux parallèles : égaux ; de même pour $\\widehat{C}$ de l'autre côté. En A, les trois angles ($\\widehat{B}$ recopié, $\\widehat{A}$, $\\widehat{C}$ recopié) forment un angle **plat** : $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°$ — démontré pour **tout** triangle : la logique remplace les coins déchirés." },
  ],
  practice: [
    { tier: "warmup", label: "Parallèles ⟹ égaux", make: (r) => {
      const a = randint(r, 25, 155);
      return { prompt: `(d) ∥ (d') ; un angle alterne-interne mesure ${a}°. Que vaut l'autre ?`, answer: a, solution: `Parallèles ⟹ alternes-internes **égaux** : **${a}°**.` };
    } },
    { tier: "application", label: "Le supplémentaire embarqué", make: (r) => {
      const a = randint(r, 30, 150);
      return { prompt: `(d) ∥ (d') ; un alterne-interne mesure ${a}°. Que vaut l'angle adjacent à son égal (sur la même droite) ?`, answer: 180 - a, solution: `L'égal vaut ${a}° ; son adjacent complète l'angle plat : $180 - ${a} = $ **${180 - a}°**.` };
    } },
  ],
};

// — The parallelogram (programme: définition, propriétés caractéristiques, aire) —
const parallelogramme = {
  id: "geometry.middle.parallelogramme",
  level: "middle", domain: "geometry",
  title: "Le parallélogramme",
  tagline: "Un quadrilatère bâti sur un centre de symétrie — ses diagonales avouent tout.",
  prereqs: ["geometry.middle.symetrie-centrale"],
  intuition:
    "Le **parallélogramme** : un quadrilatère dont les côtés opposés sont **parallèles** deux à deux. Son secret : il possède un **centre de symétrie** — le point où ses diagonales se croisent.\n\nDe ce centre découle tout : les côtés opposés sont **égaux**, et les diagonales **se coupent en leur milieu** — chaque moitié est le demi-tour de l'autre.",
  depths: {
    discovery:
      "**Avec les mains** : trace un triangle AOB, puis construis l'image de A et B par le demi-tour de centre O : les quatre points forment un parallélogramme — la symétrie centrale **fabrique** la figure, et chaque propriété (côtés égaux, parallèles) hérite de la conservation du demi-tour.",
    standard:
      "**En image** : les propriétés sont **caractéristiques** — elles marchent dans les deux sens : un quadrilatère dont les diagonales se coupent en leur milieu **est** un parallélogramme (réciproque !). D'où une méthode de construction au compas seul : trace deux segments qui se croisent en leurs milieux, relie les extrémités. Et les particuliers se trient par les diagonales : **égales** → rectangle ; **perpendiculaires** → losange ; les deux → **carré**.",
    advanced:
      "**Dans la tête** : l'**aire** — découpe le triangle qui dépasse à gauche, recolle-le à droite : le parallélogramme devient un **rectangle** de même base et même hauteur : $A = $ base $\\times$ hauteur. Attention : la hauteur est la distance **perpendiculaire** entre les côtés, pas le côté incliné ! Un parallélogramme qui s'affaisse garde sa base et son côté mais perd de la hauteur — et de l'aire : c'est pour cela que les grilles extensibles et les pieds de table pliants sont des parallélogrammes articulés.",
  },
  keyIdea: "Côtés opposés parallèles ⟺ centre de symétrie ⟺ **diagonales se coupant en leur milieu** (caractérisations !). Diagonales égales → rectangle ; ⊥ → losange ; les deux → carré. $A = $ base $\\times$ hauteur.",
  why:
    "Pourquoi tant d'amour pour ce quadrilatère penché ? Parce qu'il est l'atome des figures : tout triangle est un demi-parallélogramme (ton aire de triangle en découlera), toute translation le dessine, et rectangle, losange, carré n'en sont que des cas habillés. Comprendre le parallélogramme, c'est tenir la clé de toute la famille des quadrilatères.",
  examples: [
    { title: "Les diagonales avouent", steps: [
      { p: "ABCD a ses diagonales qui se coupent en leur **milieu** commun O." },
      { p: "C'est une caractérisation : ABCD **est** un parallélogramme — O est son centre de symétrie." },
    ] },
    { title: "L'aire par recollement", steps: [
      { p: "Base 8 cm, hauteur 5 cm : découpe le triangle qui dépasse, recolle-le de l'autre côté." },
      { p: "Un rectangle 8 × 5 apparaît : $A = 8 \\times 5 = $ **40 cm²** — base × hauteur, pas base × côté !" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Définis le parallélogramme et donne sa propriété de symétrie.", solution: "Quadrilatère dont les **côtés opposés sont parallèles** deux à deux — il possède un **centre de symétrie** : le point d'intersection de ses diagonales." },
    { tier: "warmup", prompt: "Cite les deux propriétés des diagonales et des côtés d'un parallélogramme.", solution: "Les diagonales **se coupent en leur milieu** ; les côtés opposés sont **égaux** (et parallèles) — tout découle du demi-tour autour du centre." },
    { tier: "application", prompt: "Un quadrilatère a ses diagonales qui se coupent en leur milieu. Conclus, et explique pourquoi c'est une « caractérisation ».", solution: "C'est un **parallélogramme** — la propriété marche dans les **deux sens** (définition ⟹ propriété ET propriété ⟹ définition) : elle reconnaît la figure autant qu'elle la décrit." },
    { tier: "challenge", prompt: "Trie par les diagonales : quel parallélogramme a des diagonales égales ? Perpendiculaires ? Les deux ?", solution: "Égales → **rectangle** ; perpendiculaires → **losange** ; égales **et** perpendiculaires → **carré** — les diagonales suffisent à nommer la figure." },
    { tier: "exam", prompt: "Un parallélogramme a une base de 8 cm, un côté incliné de 6 cm et une hauteur de 5 cm. Calcule son aire et explique pourquoi le 6 ne sert pas.", solution: "$A = $ base $\\times$ hauteur $= 8 \\times 5 = $ **40 cm²**. Le côté de 6 cm est **incliné** : seule compte la distance perpendiculaire entre les côtés — un parallélogramme qui s'affaisse garde ses côtés mais perd de la hauteur, donc de l'aire." },
  ],
  practice: [
    { tier: "application", label: "Base × hauteur", make: (r) => {
      const b = randint(r, 4, 15); const h = randint(r, 3, 12);
      return { prompt: `Parallélogramme : base ${b} cm, hauteur ${h} cm. Quelle aire ?`, answer: b * h, solution: `$${b} \\times ${h} = $ **${b * h} cm²** — la hauteur, jamais le côté incliné.` };
    } },
    { tier: "challenge", label: "L'aire à l'envers", make: (r) => {
      const b = randint(r, 4, 12); const h = randint(r, 3, 10);
      return { prompt: `Un parallélogramme a une aire de ${b * h} cm² et une base de ${b} cm. Quelle hauteur ?`, answer: h, solution: `$h = ${b * h} \\div ${b} = $ **${h} cm** — la formule se remonte par l'opération inverse.` };
    } },
  ],
};

export default [reperage, symetrieCentrale, anglesParalleles, parallelogramme];
