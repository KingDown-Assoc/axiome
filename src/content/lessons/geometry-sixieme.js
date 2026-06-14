// Field "Geometry" — MIDDLE module (6e year): the geometry of proof begins.
// Official cycle-3 programme (2025): distance and midpoint, circle/disc/radius/
// diameter/chord, the MÉDIATRICE with its characteristic property (equidistance,
// both ways) grounding formal axial symmetry on plain paper; the PROTRACTOR with
// the full angle lexicon (nul, plat, plein, opposés par le sommet, adjacents,
// supplémentaires) and the compass-built BISSECTRICE; triangles constructed from
// three lengths (triangle inequality discovered), angle properties, the 180° sum
// (first proof), concurrent perpendicular bisectors and the circumscribed circle.
import { randint, pick } from "../../core/exercises.js";

// — Distances, médiatrice, formal symmetry (programme: distances, cercles, médiatrice) —
const distances = {
  id: "geometry.middle.distances",
  level: "middle", domain: "geometry",
  title: "Distances et médiatrice",
  tagline: "La droite des points qui hésitent entre A et B — à égale distance des deux.",
  prereqs: ["geometry.primary.perp-parallel", "geometry.primary.symmetry-diagonal"],
  intuition:
    "La **distance** entre A et B, c'est la longueur du segment [AB] — le plus court chemin. Son **milieu** : le point qui la partage en deux.\n\nEt voici un objet nouveau : la **médiatrice** de [AB] — la droite perpendiculaire à [AB] passant par son milieu. Son secret, la **propriété caractéristique** : un point est sur la médiatrice **si et seulement si** il est à égale distance de A et de B.",
  depths: {
    discovery:
      "**Avec les mains** : plie une feuille pour amener A exactement sur B — le pli est la médiatrice ! Chaque point du pli touche A et B au même dépliage : l'équidistance se sent sous les doigts. Le cercle complète la famille : tous les points à distance $r$ du centre, et la **corde** relie deux points du cercle.",
    standard:
      "**En image** : la propriété marche dans les **deux sens** — sur la médiatrice ⟹ équidistant (pour trouver un point juste entre deux villes) ; équidistant ⟹ sur la médiatrice (pour **construire** : deux arcs de même rayon depuis A et depuis B se croisent en deux points équidistants — la droite qui les joint est la médiatrice, au compas seul, sur papier **uni**).",
    advanced:
      "**Dans la tête** : la symétrie axiale gagne sa définition formelle — M' est le symétrique de M par rapport à la droite (d) lorsque **(d) est la médiatrice de [MM']**. Tout ton savoir-faire des quadrillages (CM1, diagonale CM2) tenait là sans le dire : perpendiculaire à l'axe, distances égales de part et d'autre. Le compas et l'équerre remplacent les carreaux : la géométrie quitte le quadrillage pour le papier uni — et les définitions prennent le pouvoir.",
  },
  keyIdea: "Médiatrice de [AB] : perpendiculaire **au milieu** — et l'équivalence : sur la médiatrice ⟺ **équidistant de A et B**. La symétrie : (d) médiatrice de [MM'].",
  why:
    "Pourquoi « si et seulement si » est-il si précieux ? Parce que l'équivalence travaille dans les deux sens : elle **reconnaît** (ce point est équidistant, donc il est sur la médiatrice) et elle **garantit** (ce point est sur la médiatrice, donc il est équidistant). Une définition simple, une propriété double — c'est le modèle de tous les théorèmes à venir.",
  examples: [
    { title: "Construire au compas seul", steps: [
      { p: "Depuis A puis depuis B, deux arcs de même rayon (assez grand) — ils se croisent en deux points." },
      { p: "Chacun est équidistant de A et B : la droite qui les joint est la **médiatrice** — papier uni, zéro carreau." },
    ] },
    { title: "La symétrie, version définition", steps: [
      { p: "M' symétrique de M par rapport à (d) : (d) est la **médiatrice de [MM']**." },
      { p: "Donc (MM') ⊥ (d), et M, M' à égale distance de l'axe — tes carreaux du CM1, en langage de grand." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce que la médiatrice d'un segment [AB] ? Donne sa définition et sa propriété caractéristique.", solution: "La droite **perpendiculaire à [AB] en son milieu** — et un point est sur la médiatrice **si et seulement si** il est à égale distance de A et de B." },
    { tier: "warmup", prompt: "Comment construire la médiatrice de [AB] au compas, sur papier uni ?", solution: "Deux arcs de **même rayon** depuis A et depuis B : ils se croisent en deux points équidistants — la droite qui les relie est la médiatrice." },
    { tier: "application", prompt: "Une fontaine doit être à égale distance des maisons A et B. Où peut-elle être ?", solution: "N'importe où sur la **médiatrice de [AB]** — la propriété caractéristique transforme la condition en droite." },
    { tier: "challenge", prompt: "Le point M est à 5 cm de A et 5 cm de B. Que peut-on affirmer, et grâce à quel sens de la propriété ?", solution: "M est **sur la médiatrice de [AB]** — le sens « équidistant ⟹ sur la médiatrice » : la propriété reconnaît autant qu'elle garantit." },
    { tier: "exam", prompt: "Définis le symétrique M' d'un point M par rapport à une droite (d), sans parler de quadrillage.", solution: "M' est le point tel que **(d) soit la médiatrice de [MM']** : (MM') perpendiculaire à (d), et M, M' à égale distance de (d) — la définition remplace les carreaux, et le compas l'exécute sur papier uni." },
  ],
  practice: [
    { tier: "warmup", label: "L'équivalence dans les deux sens", make: (r) => {
      const d = randint(r, 3, 12);
      return { prompt: `M est sur la médiatrice de [AB], et MA $= ${d}$ cm. Que vaut MB ?`, answer: d, solution: `Sur la médiatrice ⟹ équidistant : MB $= $ **${d} cm**.` };
    } },
    { tier: "application", label: "Milieux et distances", make: (r) => {
      const ab = randint(r, 3, 20) * 2;
      return { prompt: `AB $= ${ab}$ cm et I est le milieu de [AB]. Que vaut AI ?`, answer: ab / 2, solution: `Le milieu partage en deux : AI $= ${ab} \\div 2 = $ **${ab / 2} cm**.` };
    } },
  ],
};

// — The protractor and the bissectrice (programme: mesurer, construire, lexique, bissectrice) —
const anglesMeasure = {
  id: "geometry.middle.angles-measure",
  level: "middle", domain: "geometry",
  title: "Mesurer et partager les angles",
  tagline: "Le rapporteur arrive enfin — et la bissectrice coupe l'angle en deux.",
  prereqs: ["applied.primary.degrees"],
  intuition:
    "Promis depuis le CM2 : voici le **rapporteur**. Centre sur le **sommet**, zéro sur un **côté**, lire où passe l'autre côté — l'ouverture devient un nombre.\n\nLe lexique se complète : angle **nul** (0°), **plat** (180°), **plein** (360°) ; deux angles **adjacents** (côte à côte, un côté commun), **supplémentaires** (somme 180°), **opposés par le sommet** (en croix — et toujours **égaux** !).",
  depths: {
    discovery:
      "**Avec les mains** : le piège du rapporteur — il porte **deux graduations** (de gauche à droite et l'inverse). Laquelle lire ? Celle dont le **zéro est sur le côté** de l'angle. Et le bon sens tranche : un angle visiblement aigu ne mesure pas 130° — l'estimation du CM1 reste ton garde-fou.",
    standard:
      "**En image** : construire un angle de 50° — tracer un côté, centre du rapporteur sur l'extrémité, marquer 50°, joindre. Et la **bissectrice** : la demi-droite qui partage l'angle en **deux angles égaux** — ton pliage du CM2 officialisé, constructible au compas (un arc depuis le sommet coupe les deux côtés ; deux arcs égaux depuis ces points se croisent ; joindre au sommet).",
    advanced:
      "**Dans la tête** : les angles **opposés par le sommet** offrent un premier raisonnement déductif — deux droites se croisent : l'angle bleu et son voisin sont supplémentaires (ensemble : un plat, 180°) ; le voisin et l'angle rouge aussi ; donc bleu et rouge complètent le **même** voisin à 180° : ils sont **égaux** — sans rapporteur, par pure logique. Mesurer constate ; raisonner **démontre** : la 6e bascule de l'un vers l'autre.",
  },
  keyIdea: "Rapporteur : centre au **sommet**, zéro sur un **côté**, lire la graduation qui part de ce zéro. Bissectrice : **deux angles égaux**. Opposés par le sommet : **égaux** — et ça se démontre.",
  why:
    "Pourquoi avoir attendu deux ans entre le degré (CM2) et le rapporteur (6e) ? Pour que le nombre précède l'instrument : qui sait que 45° est « la moitié d'un droit » lit le rapporteur en le contrôlant ; qui ne le sait pas lit la mauvaise graduation sans sourciller. L'instrument mesure ; le sens vérifie.",
  examples: [
    { title: "Lire la bonne graduation", steps: [
      { p: "Centre sur le sommet, zéro de la graduation **extérieure** sur un côté : l'autre côté passe à 50°." },
      { p: "Contrôle : l'angle est nettement aigu — 50° ✓ (pas 130°, l'autre graduation)." },
    ] },
    { title: "Opposés par le sommet : la preuve", steps: [
      { p: "Bleu + voisin $= 180°$ (angle plat) ; rouge + le même voisin $= 180°$." },
      { p: "Bleu et rouge complètent le même angle à 180° : ils sont **égaux** — démontré, pas mesuré." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne la mesure de l'angle nul, de l'angle plat et de l'angle plein.", solution: "**0°**, **180°** (la demi-rotation : deux droits alignés), **360°** (le tour complet)." },
    { tier: "warmup", prompt: "Au rapporteur, l'autre côté d'un angle passe sur 50° et sur 130°. Quelle est la bonne mesure, et comment trancher ?", solution: "Celle de la graduation dont le **zéro est posé sur le côté** de l'angle — et l'estimation confirme : un angle visiblement aigu mesure **50°**." },
    { tier: "application", prompt: "Deux angles adjacents sont supplémentaires. L'un mesure 68°. Combien l'autre ?", solution: "$180 - 68 = $ **112°** — supplémentaires : ensemble, un angle plat." },
    { tier: "challenge", prompt: "La bissectrice d'un angle de 76° le partage en deux angles de combien ? Décris sa construction au compas.", solution: "**38° chacun**. Construction : un arc depuis le sommet coupe les deux côtés ; depuis ces deux points, deux arcs de même rayon se croisent ; la demi-droite du sommet vers ce croisement est la bissectrice." },
    { tier: "exam", prompt: "Démontre que deux angles opposés par le sommet sont égaux, sans rapporteur.", solution: "Chacun est **supplémentaire du même angle voisin** (avec lui, il forme un plat de 180°) : tous deux valent $180° - $ voisin — donc ils sont **égaux**. Première démonstration : la logique remplace la mesure." },
  ],
  practice: [
    { tier: "warmup", label: "Supplémentaires", make: (r) => {
      const a = randint(r, 15, 165);
      return { prompt: `Deux angles sont supplémentaires ; l'un mesure ${a}°. Combien l'autre ?`, answer: 180 - a, solution: `$180 - ${a} = $ **${180 - a}°** — ensemble, un angle plat.` };
    } },
    { tier: "application", label: "La bissectrice partage", make: (r) => {
      const a = randint(r, 16, 88) * 2;
      return { prompt: `La bissectrice d'un angle de ${a}° crée deux angles de combien chacun ?`, answer: a / 2, solution: `$${a} \\div 2 = $ **${a / 2}°** — deux angles égaux, par définition.` };
    } },
  ],
};

// — Triangles: construct and prove (programme: inégalité triangulaire, somme 180°, cercle circonscrit) —
const triangles = {
  id: "geometry.middle.triangles",
  level: "middle", domain: "geometry",
  title: "Triangles : construire et prouver",
  tagline: "Trois côtés, 180 degrés, un cercle qui passe par les trois sommets.",
  prereqs: ["geometry.middle.distances", "geometry.middle.angles-measure"],
  intuition:
    "Construire un triangle de côtés 5, 4 et 3 cm : un segment de 5, puis le **compas** — arc de rayon 4 depuis un bout, arc de rayon 3 depuis l'autre : le croisement est le troisième sommet.\n\nMais essaie 3, 4 et 9 : les arcs **ne se touchent jamais** ($3 + 4 < 9$) ! Trois longueurs ne font pas toujours un triangle — chaque côté doit rester plus court que la somme des deux autres.",
  depths: {
    discovery:
      "**Avec les mains** : LA preuve culte — trace un triangle quelconque, **déchire** ses trois coins, pose-les côte à côte sommet contre sommet : ils s'alignent **exactement** sur une droite. Les trois angles d'un triangle font un angle plat : **180°**. Tout triangle, à chaque fois.",
    standard:
      "**En image** : la somme à 180° devient une machine à calculer — deux angles de 64° et 71° : le troisième vaut $180 - 64 - 71 = 45°$, sans rapporteur. Les particuliers livrent leurs secrets : l'**équilatéral** : $180 \\div 3 = $ **60°** partout ; l'**isocèle** : deux angles égaux à la base ; le **rectangle** : 90° déjà pris, les deux autres se partagent 90.",
    advanced:
      "**Dans la tête** : le bouquet final — les **trois médiatrices** d'un triangle se croisent en un **même point** ! Pourquoi ? Le point de croisement des médiatrices de [AB] et [BC] est équidistant de A et B (première), et de B et C (seconde) — donc de A et de C aussi : il est sur la **troisième** médiatrice, sans qu'on la trace. Et ce point, à égale distance des trois sommets, est le centre du **cercle circonscrit** — l'unique cercle qui passe par A, B et C. Une propriété, deux usages, une démonstration : la géométrie devient un jeu de dominos logiques.",
  },
  keyIdea: "Inégalité : chaque côté < somme des deux autres. **Somme des angles = 180°**. Médiatrices concourantes → centre du **cercle circonscrit** (équidistant des trois sommets).",
  why:
    "Pourquoi déchirer des coins prouve-t-il mieux que mesurer trois angles ? Parce que la mesure dit « 179,5° sur *ce* triangle » (erreurs comprises) ; le déchirage, répété sur n'importe quel triangle, montre une nécessité — et la vraie preuve (qui arrive au cycle 4) la rendra universelle. Constat, expérience, démonstration : les trois étages de la certitude — la 6e gravit le deuxième.",
  examples: [
    { title: "Le troisième angle, sans rapporteur", steps: [
      { p: "Deux angles : 64° et 71° — la somme des trois fait 180°." },
      { p: "$180 - 64 - 71 = $ **45°** — la propriété calcule à la place de l'instrument." },
    ] },
    { title: "Le point des trois médiatrices", steps: [
      { p: "Croisement des médiatrices de [AB] et [BC] : équidistant de A, B — et de B, C. Donc de A et C." },
      { p: "Il est sur la troisième médiatrice, et le cercle de centre ce point passe par **A, B et C** : le circonscrit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Peut-on construire un triangle de côtés 3 cm, 4 cm et 9 cm ? Justifie au compas.", solution: "**Non** : les arcs de rayons 3 et 4 tracés aux extrémités d'un segment de 9 ne se rencontrent jamais — $3 + 4 = 7 < 9$ : chaque côté doit rester **plus court que la somme** des deux autres." },
    { tier: "warmup", prompt: "Deux angles d'un triangle mesurent 64° et 71°. Calcule le troisième.", solution: "$180 - 64 - 71 = $ **45°** — la somme des angles d'un triangle vaut 180°." },
    { tier: "application", prompt: "Quels sont les angles d'un triangle équilatéral ? Et d'un triangle rectangle isocèle ?", solution: "Équilatéral : $180 \\div 3 = $ **60° partout**. Rectangle isocèle : 90° pris, le reste partagé : **45° et 45°**." },
    { tier: "challenge", prompt: "Explique l'expérience des coins déchirés et ce qu'elle montre.", solution: "On déchire les trois coins d'un triangle et on les aligne sommet contre sommet : ils forment exactement un **angle plat** — les trois angles totalisent **180°**, quel que soit le triangle." },
    { tier: "exam", prompt: "Démontre que les trois médiatrices d'un triangle ABC passent par un même point, et nomme le cercle associé.", solution: "Le croisement des médiatrices de [AB] et [BC] est équidistant de A et B, **et** de B et C — donc de A et C : il appartient à la médiatrice de [AC]. Équidistant des trois sommets, il est le centre du **cercle circonscrit** — la propriété caractéristique, utilisée trois fois, fait toute la preuve." },
  ],
  practice: [
    { tier: "warmup", label: "Le troisième angle", make: (r) => {
      const a = randint(r, 25, 85), b = randint(r, 25, Math.min(85, 170 - a));
      return { prompt: `Un triangle a des angles de ${a}° et ${b}°. Calcule le troisième.`, answer: 180 - a - b, solution: `$180 - ${a} - ${b} = $ **${180 - a - b}°**.` };
    } },
    { tier: "application", label: "Triangle possible ?", make: (r) => {
      const a = randint(r, 3, 8), b = randint(r, 3, 8);
      const possible = r() < 0.5;
      const c = possible ? randint(r, Math.abs(a - b) + 1, a + b - 1) : a + b + randint(r, 1, 4);
      return { prompt: `Côtés ${a}, ${b} et ${c} cm : combien vaut la somme des deux plus petits côtés ? (compare-la au plus grand pour conclure)`, answer: Math.min(a, b, c) + [a, b, c].sort((x, y) => x - y)[1], solution: `Somme des deux plus petits : **${[a, b, c].sort((x, y) => x - y)[0] + [a, b, c].sort((x, y) => x - y)[1]}** — ${possible ? "plus grande que " + Math.max(a, b, c) + " : le triangle existe ✓" : "trop courte face à " + Math.max(a, b, c) + " : triangle impossible ✗"}.` };
    } },
  ],
};

export default [distances, anglesMeasure, triangles];
