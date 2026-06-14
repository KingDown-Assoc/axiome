// Field "Geometry" — MIDDLE module (4e year), part 1: Pythagoras, logic and
// transformations. Official cycle-4 programme: the Pythagorean theorem, its
// CONVERSE and its CONTRAPOSITIVE with explicit logical work on the three
// statements; characterizing a right triangle by its circumscribed circle
// (inscription in a semicircle) and locating that circle's center; understanding
// the effect of a TRANSLATION, its link with parallelograms and angles, its
// conservation properties (Escher/Alhambra tilings); the three MIDPOINT-LINE
// theorems in a triangle, and building rectangles without a set square.
import { randint, pick } from "../../core/exercises.js";

// — Pythagoras (programme: théorème, calculs, racine en action) —
const pythagore = {
  id: "geometry.middle.pythagore",
  level: "middle", domain: "geometry",
  title: "Le théorème de Pythagore",
  tagline: "Le carré de l'hypoténuse — 2 500 ans de service, toujours exact.",
  prereqs: ["numbers.middle.racine-carree", "geometry.middle.triangle-droites"],
  intuition:
    "Dans un triangle **rectangle**, les trois côtés sont liés par une égalité d'aires : **le carré de l'hypoténuse égale la somme des carrés des deux autres côtés** — $BC^2 = AB^2 + AC^2$ (l'hypoténuse : le côté opposé à l'angle droit, le plus long).\n\nCôtés 3 et 4 ? Hypoténuse : $\\sqrt{9 + 16} = \\sqrt{25} = 5$ — le triangle 3-4-5, le plus célèbre du monde.",
  depths: {
    discovery:
      "**Avec les mains** : dessine les trois **carrés** posés sur les côtés du triangle 3-4-5 : aires 9, 16, 25 — et $9 + 16 = 25$ : le grand carré contient exactement les deux petits. Le théorème est une égalité d'**aires** avant d'être une formule.",
    standard:
      "**En image** : les deux calculs — l'**hypoténuse** : $BC^2 = 6^2 + 8^2 = 100$, $BC = \\sqrt{100} = 10$ ; un **côté de l'angle droit** (le problème inverse !) : hypoténuse 13, un côté 5 → $AC^2 = 13^2 - 5^2 = 144$, $AC = 12$. Addition vers l'hypoténuse, **soustraction** vers les côtés — et la racine carrée de 4e conclut chaque fois, exacte ($\\sqrt{144} = 12$) ou encadrée ($\\sqrt{50} \\approx 7{,}1$).",
    advanced:
      "**Dans la tête** : pourquoi est-ce vrai ? Le puzzle des aires — prends un grand carré de côté $a + b$ ; ranges-y quatre copies du triangle rectangle (côtés $a$, $b$) de deux façons : l'une laisse vides deux carrés ($a^2$ et $b^2$), l'autre un seul carré penché ($c^2$, construit sur l'hypoténuse). Même grand carré, mêmes quatre triangles : les vides sont égaux — $a^2 + b^2 = c^2$. Babyloniens et Chinois le savaient avant Pythagore ; les Grecs l'ont **démontré** — et ta diagonale du carré unité retrouve son $\\sqrt{2}$ : $1^2 + 1^2 = 2$.",
  },
  keyIdea: "Triangle rectangle : $\\text{hypoténuse}^2 = \\text{côté}^2 + \\text{côté}^2$. Vers l'hypoténuse : **additionner** les carrés ; vers un côté : **soustraire** — et $\\sqrt{\\;}$ conclut.",
  why:
    "À quoi sert une égalité sur des triangles rectangles ? À mesurer **sans aller voir** : la diagonale de l'écran, la longueur de la rampe, la distance entre deux points du repère — partout où un angle droit se cache, deux mesures donnent la troisième. Les arpenteurs égyptiens tendaient la corde 3-4-5 pour tracer leurs angles droits ; le GPS calcule encore des hypoténuses. C'est le théorème le plus utilisé de l'histoire humaine.",
  examples: [
    { title: "Vers l'hypoténuse", steps: [
      { p: "Côtés de l'angle droit : 6 et 8 — $BC^2 = 36 + 64 = 100$." },
      { p: "$BC = \\sqrt{100} = $ **10** — additionner les carrés, puis la racine." },
    ] },
    { title: "Vers un côté (l'inverse)", steps: [
      { p: "Hypoténuse 13, un côté 5 : $AC^2 = 13^2 - 5^2 = 169 - 25 = 144$." },
      { p: "$AC = \\sqrt{144} = $ **12** — soustraire du carré de l'hypoténuse : le triangle 5-12-13." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dessine (ou imagine) les carrés sur les côtés du triangle 3-4-5 : que dit le théorème en termes d'aires ?", solution: "Aires **9, 16, 25** — et $9 + 16 = 25$ : le carré de l'hypoténuse contient exactement la somme des deux autres. Pythagore est une égalité d'aires." },
    { tier: "warmup", prompt: "Triangle rectangle de côtés 6 et 8 : calcule l'hypoténuse.", solution: "$BC^2 = 6^2 + 8^2 = 100$ → $BC = \\sqrt{100} = $ **10** — le 3-4-5 doublé." },
    { tier: "application", prompt: "Hypoténuse 13, un côté 5 : calcule l'autre côté.", solution: "$AC^2 = 169 - 25 = 144$ → $AC = $ **12** — vers un côté, on **soustrait** : le problème inverse de Pythagore." },
    { tier: "challenge", prompt: "Une échelle de 5 m est posée à 1,4 m du mur. À quelle hauteur touche-t-elle le mur ? (arrondis au cm)", solution: "$h^2 = 5^2 - 1{,}4^2 = 25 - 1{,}96 = 23{,}04$ → $h = \\sqrt{23{,}04} = $ **4,8 m** — le mur, le sol et l'échelle font le triangle rectangle, l'échelle est l'hypoténuse." },
    { tier: "exam", prompt: "Explique la démonstration du puzzle : quatre triangles rectangles dans un carré de côté $a + b$, rangés de deux façons. Conclus.", solution: "Premier rangement : les quatre triangles laissent vides **deux carrés** d'aires $a^2$ et $b^2$. Second : ils laissent vide **un carré penché** d'aire $c^2$ (côté $=$ l'hypoténuse). Même grand carré, mêmes triangles → mêmes vides : $a^2 + b^2 = c^2$ — démontré par découpage, sans un seul calcul : les aires portent la preuve." },
  ],
  practice: [
    { tier: "warmup", label: "Vers l'hypoténuse", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
      return { prompt: `Triangle rectangle de côtés ${t[0]} et ${t[1]} : quelle hypoténuse ?`, answer: t[2], solution: `$\\sqrt{${t[0] * t[0]} + ${t[1] * t[1]}} = \\sqrt{${t[2] * t[2]}} = $ **${t[2]}**.` };
    } },
    { tier: "application", label: "Le côté manquant", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25]]);
      return { prompt: `Hypoténuse ${t[2]}, un côté ${t[0]} : quel est l'autre côté ?`, answer: t[1], solution: `$\\sqrt{${t[2] * t[2]} - ${t[0] * t[0]}} = \\sqrt{${t[1] * t[1]}} = $ **${t[1]}** — soustraire, puis la racine.` };
    } },
  ],
};

// — Converse and contrapositive (programme: réciproque, contraposée, logique) —
const pythagoreReciproque = {
  id: "geometry.middle.pythagore-reciproque",
  level: "middle", domain: "geometry",
  title: "Réciproque et contraposée",
  tagline: "Si A alors B : trois énoncés pour un théorème — la logique entre en scène.",
  prereqs: ["geometry.middle.pythagore"],
  intuition:
    "Un théorème « si A alors B » cache deux frères : la **réciproque** (« si B alors A » — vraie ou fausse, à démontrer à part !) et la **contraposée** (« si non-B alors non-A » — toujours **aussi vraie** que l'original).\n\nPour Pythagore : la réciproque est vraie — si $c^2 = a^2 + b^2$, alors le triangle **est** rectangle. C'est le détecteur d'angles droits.",
  depths: {
    discovery:
      "**Avec les mains** : la corde des arpenteurs — 13 nœuds réguliers, tendue en triangle 3-4-5 : $9 + 16 = 25$ ✓, donc l'angle est **droit** (réciproque !). Quatre mille ans que les bâtisseurs tracent leurs équerres sans équerre.",
    standard:
      "**En image** : les trois usages — côtés 5, 12, 13 : $25 + 144 = 169 = 13^2$ → **rectangle** (réciproque). Côtés 4, 7, 9 : $16 + 49 = 65 \\neq 81$ → **pas rectangle** (contraposée : si l'égalité échoue, l'angle droit est impossible). Et le sens direct calcule les longueurs. Trois énoncés, trois métiers : calculer, certifier, exclure.",
    advanced:
      "**Dans la tête** : pourquoi la contraposée est-elle « gratuite » ? « Si A alors B » et « si non-B alors non-A » disent **la même chose** par des portes différentes — s'il pleut, le sol est mouillé ⟺ si le sol est sec, il ne pleut pas. Mais la **réciproque** (« sol mouillé ⟹ pluie » : faux, un arrosoir suffit !) est un énoncé **neuf**, à prouver séparément — Pythagore a la chance d'avoir une réciproque vraie, beaucoup de théorèmes ne l'ont pas. Distinguer les trois est un savoir-faire qui dépasse la géométrie : tout raisonnement du monde s'y plie.",
  },
  keyIdea: "Direct : rectangle ⟹ $c^2 = a^2 + b^2$ (calculer). **Réciproque** (vraie ici) : l'égalité ⟹ rectangle (certifier). **Contraposée** : pas d'égalité ⟹ pas rectangle (exclure) — toujours équivalente au direct.",
  why:
    "Pourquoi tant de cérémonie logique ? Parce que confondre un théorème et sa réciproque est l'erreur de raisonnement la plus répandue — en maths comme ailleurs (« les champions s'entraînent dur, je m'entraîne dur, donc… »). La géométrie de 4e est le premier endroit où l'école nomme ces trois énoncés et t'apprend à ne jamais les échanger sans preuve. C'est une leçon de pensée, déguisée en triangle.",
  examples: [
    { title: "Certifier un angle droit", steps: [
      { p: "Côtés 5, 12, 13 : $5^2 + 12^2 = 169$ et $13^2 = 169$ — égalité ✓." },
      { p: "**Réciproque** : le triangle est rectangle (en l'angle opposé au 13) — certifié sans rapporteur." },
    ] },
    { title: "Exclure un angle droit", steps: [
      { p: "Côtés 4, 7, 9 : $16 + 49 = 65$ mais $9^2 = 81$ — pas d'égalité." },
      { p: "**Contraposée** : le triangle n'est **pas** rectangle — exclu sans dessin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Énonce le théorème de Pythagore, puis sa réciproque, puis sa contraposée.", solution: "**Direct** : si rectangle, alors $c^2 = a^2 + b^2$. **Réciproque** : si $c^2 = a^2 + b^2$, alors rectangle. **Contraposée** : si $c^2 \\neq a^2 + b^2$, alors pas rectangle — trois énoncés, trois rôles." },
    { tier: "warmup", prompt: "Le triangle 5-12-13 est-il rectangle ? Quel énoncé utilises-tu ?", solution: "$25 + 144 = 169 = 13^2$ ✓ → **rectangle**, par la **réciproque** — l'égalité certifie l'angle droit." },
    { tier: "application", prompt: "Le triangle 4-7-9 est-il rectangle ? Quel énoncé conclut ?", solution: "$16 + 49 = 65 \\neq 81$ → **pas rectangle**, par la **contraposée** — l'égalité ratée exclut l'angle droit." },
    { tier: "challenge", prompt: "« S'il pleut, le sol est mouillé. » Donne la réciproque et la contraposée, et dis laquelle est forcément vraie.", solution: "Réciproque : « sol mouillé ⟹ pluie » — **pas forcément** (un arrosoir suffit) ; contraposée : « sol sec ⟹ pas de pluie » — **toujours vraie**, c'est le même énoncé retourné. La logique de Pythagore sort du triangle." },
    { tier: "exam", prompt: "Un maçon vérifie un coin de mur : il mesure 60 cm sur un bord, 80 cm sur l'autre, et 99 cm en diagonale. Le coin est-il droit ? Rédige avec l'énoncé exact employé.", solution: "$60^2 + 80^2 = 3\\,600 + 6\\,400 = 10\\,000$ ; or $99^2 = 9\\,801 \\neq 10\\,000$ — par la **contraposée** du théorème de Pythagore, le coin n'est **pas** droit (il faudrait une diagonale de $\\sqrt{10\\,000} = 100$ cm : le maçon doit pousser le mur d'un centimètre de diagonale)." },
  ],
  practice: [
    { tier: "application", label: "Rectangle ou pas ?", make: (r) => {
      const t = pick(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]); const ok = r() < 0.5;
      const c = ok ? t[2] : t[2] + 1;
      return { prompt: `Triangle de côtés ${t[0]}, ${t[1]}, ${c} : rectangle ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$${t[0] * t[0]} + ${t[1] * t[1]} = ${t[0] * t[0] + t[1] * t[1]}$ et $${c}^2 = ${c * c}$ — ${ok ? "égalité : **rectangle** (réciproque)" : "pas d'égalité : **pas rectangle** (contraposée)"}.` };
    } },
    { tier: "challenge", label: "La diagonale qui certifie", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [9, 12, 15], [5, 12, 13]]); const k = pick(r, [10, 20]);
      return { prompt: `Un cadre de ${t[0] * k} cm sur ${t[1] * k} cm : quelle diagonale (en cm) certifie les angles droits ?`, answer: t[2] * k, solution: `$\\sqrt{${t[0] * k}^2 + ${t[1] * k}^2} = $ **${t[2] * k} cm** — la diagonale juste, et la réciproque certifie.` };
    } },
  ],
};

// — The translation (programme: effet, lien parallélogramme, conservations) —
const translation = {
  id: "geometry.middle.translation",
  level: "middle", domain: "geometry",
  title: "La translation",
  tagline: "Glisser sans tourner — le parallélogramme est sa trace.",
  prereqs: ["geometry.middle.parallelogramme", "geometry.middle.symetrie-centrale"],
  intuition:
    "Après le pli (axiale) et le pivot (centrale), le **glissement** : la **translation** déplace chaque point de la même distance, dans la même direction, dans le même sens — comme les cabines d'un téléphérique.\n\nSa carte d'identité est un parallélogramme : M' est l'image de M par la translation qui amène A sur B lorsque **ABM'M est un parallélogramme**.",
  depths: {
    discovery:
      "**Avec les mains** : pose un calque, fais-le **glisser** sans le tourner : chaque point parcourt la même flèche. Les touches d'un clavier, les fenêtres d'un immeuble, les motifs d'un papier peint : des translations les uns des autres.",
    standard:
      "**En image** : construire l'image de M — trace la parallèle à (AB) passant par M, reporte la longueur AB dans le même sens : ABM'M se referme en parallélogramme (les côtés [AB] et [MM'] sont parallèles **et** égaux : la double caractérisation de 5e au travail). La translation **conserve tout** — longueurs, angles, aires, alignements — et l'image d'une droite est une droite **parallèle**.",
    advanced:
      "**Dans la tête** : les trois transformations du collège forment une famille — le pli **retourne** (miroir), le pivot **tourne tête en bas**, le glissement **ne change rien d'autre que la place**. Les pavages de l'Alhambra et d'Escher les combinent : un motif unique, translaté-tourné-réfléchi, couvre le plan sans trou ni chevauchement — et les mathématiciens ont démontré qu'il n'existe que **17** manières fondamentalement différentes de paver ainsi. Les artisans de Grenade les avaient toutes trouvées, sept siècles avant la preuve.",
  },
  keyIdea: "Translation : même distance, même direction, même sens pour **tous** les points — ABM'M **parallélogramme**. Conservation totale ; l'image d'une droite est une droite parallèle.",
  why:
    "Pourquoi une transformation qui « ne fait rien » ? Parce que répéter, c'est créer : toute frise, tout pavage, tout cristal est un motif translaté — et la physique entière repose sur l'idée que les lois de la nature sont **invariantes par translation** (une expérience donne le même résultat ici ou à Tokyo). La transformation la plus discrète est celle qui structure le monde.",
  examples: [
    { title: "Construire l'image", steps: [
      { p: "Translation qui amène A sur B ; point M à déplacer." },
      { p: "Parallèle à (AB) par M, longueur AB, même sens : **ABM'M est un parallélogramme** — M' est posé." },
    ] },
    { title: "Reconnaître le glissement", steps: [
      { p: "Deux motifs identiques, ni tournés ni retournés, décalés de la même flèche." },
      { p: "C'est une translation — le calque glisse, tout se conserve." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Cite trois objets du quotidien dont les motifs se déduisent par translation.", solution: "Les **touches d'un clavier**, les **fenêtres** d'une façade, les motifs d'un **papier peint** (ou les lattes du parquet, les wagons d'un train…) — même flèche pour tous les points." },
    { tier: "warmup", prompt: "M' est l'image de M par la translation qui amène A sur B : quel quadrilatère se forme, et que dit-il de [MM'] ?", solution: "**ABM'M est un parallélogramme** — donc [MM'] est **parallèle à [AB] et de même longueur** : la flèche du glissement, recopiée." },
    { tier: "application", prompt: "Que conserve une translation ? L'image d'une droite ? Compare au demi-tour.", solution: "Tout : **longueurs, angles, aires, alignements** ; l'image d'une droite est une droite **parallèle** — comme pour le demi-tour, mais sans retournement : la figure garde même son orientation tête en haut." },
    { tier: "challenge", prompt: "Translation amenant A$(1\\,;\\,2)$ sur B$(4\\,;\\,3)$ : quelle est l'image de M$(-2\\,;\\,5)$ ?", solution: "La flèche : $+3$ en abscisse, $+1$ en ordonnée — M'$(1\\,;\\,6)$ : dans le repère, **translater, c'est additionner** la même flèche à chaque point." },
    { tier: "exam", prompt: "Dans un pavage d'Escher, le même lézard se répète sans trou. Quelles transformations du collège peuvent relier deux lézards, et à quoi reconnaît-on celle qui est une translation ?", solution: "**Symétrie axiale** (lézard retourné en miroir), **symétrie centrale** (tête en bas), **translation** (simplement décalé). La translation se reconnaît à ceci : le second lézard est **identique et de même orientation** — ni miroir ni rotation, juste la même flèche pour chaque écaille. Dix-sept familles de pavages existent ; l'Alhambra les connaissait toutes." },
  ],
  practice: [
    { tier: "application", label: "Additionner la flèche", make: (r) => {
      const dx = randint(r, -5, 6) || 3; const dy = randint(r, -5, 6) || 2;
      const x = randint(r, -6, 7); const y = randint(r, -6, 7);
      return { prompt: `Translation de flèche $(${dx}\\,;\\,${dy})$ : abscisse de l'image de $(${x}\\,;\\,${y})$ ?`, answer: x + dx, solution: `$${x} + (${dx}) = $ **${x + dx}** — translater, c'est additionner la flèche.` };
    } },
    { tier: "challenge", label: "Retrouver la flèche", make: (r) => {
      const ax = randint(r, -4, 5); const bx = ax + (randint(r, -5, 6) || 4);
      return { prompt: `La translation amène A d'abscisse ${ax} sur B d'abscisse ${bx}. Quelle est la composante horizontale de la flèche ?`, answer: bx - ax, solution: `$${bx} - ${ax} = $ **${bx - ax}** — la flèche est l'arrivée moins le départ : une soustraction de relatifs.` };
    } },
  ],
};

// — The midpoint theorems (programme: droite des milieux, demi-cercle) —
const droiteMilieux = {
  id: "geometry.middle.droite-milieux",
  level: "middle", domain: "geometry",
  title: "La droite des milieux",
  tagline: "Joindre deux milieux : parallèle au troisième côté, et moitié de sa longueur.",
  prereqs: ["geometry.middle.triangle-droites", "geometry.middle.parallelogramme"],
  intuition:
    "Dans un triangle, la droite qui joint les **milieux de deux côtés** cache trois théorèmes : elle est **parallèle** au troisième côté ; le segment des milieux mesure **la moitié** du troisième côté ; et réciproquement, la parallèle menée d'un milieu **coupe l'autre côté en son milieu**.\n\nTrois énoncés, un trio inséparable.",
  depths: {
    discovery:
      "**Avec les mains** : trace un grand triangle, marque les milieux de deux côtés, joins-les — mesure : le segment est parallèle au troisième côté et en vaut **la moitié**, au millimètre. Recommence avec un triangle difforme : toujours vrai.",
    standard:
      "**En image** : les trois usages — milieux connus ⟹ **parallélisme gratuit** (théorème 1) ; milieux connus ⟹ **longueur gratuite** (théorème 2 : MN $= \\frac{BC}{2}$) ; un milieu + une parallèle ⟹ **l'autre milieu trouvé** (théorème 3, la réciproque — ta leçon de logique en action : ce troisième énoncé exige sa propre démonstration). Et en joignant les milieux des **trois** côtés : quatre petits triangles égaux — le triangle se quarte.",
    advanced:
      "**Dans la tête** : le demi-cercle entre en scène — trace un cercle, un diamètre [BC], un point A **sur** le cercle : le triangle ABC est toujours **rectangle en A**. Pourquoi ? Le centre O est équidistant des trois sommets (rayons !) : la médiane AO vaut la **moitié** de BC — et un triangle dont une médiane vaut la moitié du côté qu'elle rejoint est rectangle (ton cas particulier de 5e, devenu caractérisation). Double sens : rectangle ⟺ inscrit dans le demi-cercle de diamètre l'hypoténuse — d'où les **rectangles sans équerre** : deux diamètres d'un même cercle, leurs quatre extrémités reliées, et les quatre angles droits tombent tout seuls.",
  },
  keyIdea: "Milieux de deux côtés : segment **parallèle** au troisième et de longueur **moitié**. Réciproque : milieu + parallèle ⟹ milieu. Et : rectangle ⟺ **inscrit dans le demi-cercle** dont l'hypoténuse est un diamètre.",
  why:
    "Pourquoi ce trio discret est-il si aimé des démonstrations ? Parce qu'il **fabrique** du parallélisme et des longueurs sans mesurer — deux milieux suffisent. Joins les milieux des côtés de n'importe quel quadrilatère, même tordu : il apparaît toujours un parallélogramme (théorème de Varignon, prouvé en deux coups de droite des milieux). Les figures cachent des régularités ; ce théorème est le passe-partout qui les ouvre.",
  examples: [
    { title: "Le segment des milieux", steps: [
      { p: "M et N milieux de [AB] et [AC] ; BC $= 12$ cm." },
      { p: "(MN) ∥ (BC) et MN $= \\dfrac{12}{2} = $ **6 cm** — parallélisme et longueur, gratuits." },
    ] },
    { title: "Le rectangle sans équerre", steps: [
      { p: "Trace un cercle et **deux diamètres** ; relie leurs quatre extrémités." },
      { p: "Chaque sommet voit un diamètre : quatre angles **droits** — un rectangle, sans équerre ni rapporteur." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Énonce les trois théorèmes de la droite des milieux.", solution: "1) Le segment des **milieux de deux côtés** est **parallèle** au troisième ; 2) il en mesure **la moitié** ; 3) (réciproque) la **parallèle** au troisième côté menée d'un **milieu** coupe l'autre côté en son **milieu**." },
    { tier: "warmup", prompt: "M, N milieux de [AB] et [AC], BC $= 12$ cm : que dire de (MN) et que vaut MN ?", solution: "(MN) **∥** (BC) et MN $= 12 \\div 2 = $ **6 cm** — les théorèmes 1 et 2 d'un coup." },
    { tier: "application", prompt: "M milieu de [AB] ; la parallèle à (BC) passant par M coupe [AC] en N. Que dire de N, et quel théorème l'affirme ?", solution: "N est le **milieu de [AC]** — théorème 3, la **réciproque** : milieu + parallèle ⟹ milieu. Un énoncé distinct des deux premiers, démontré à part (ta leçon de logique le rappelle)." },
    { tier: "challenge", prompt: "A est sur le cercle de diamètre [BC]. Démontre que ABC est rectangle en A, via la médiane AO.", solution: "O, centre, est équidistant de A, B, C (rayons) : AO $=$ OB $=$ OC $= \\frac{BC}{2}$ — la **médiane** issue de A vaut la moitié du côté qu'elle rejoint, ce qui caractérise le triangle **rectangle en A** (le cercle circonscrit a son centre au milieu de l'hypoténuse, comme vu en 5e — ici en sens inverse)." },
    { tier: "exam", prompt: "Joins les milieux des quatre côtés d'un quadrilatère quelconque ABCD. Démontre que le quadrilatère obtenu est un parallélogramme (théorème de Varignon ; indice : la diagonale [AC] et deux triangles).", solution: "Dans le triangle ABC, le segment des milieux de [AB] et [BC] est **parallèle à (AC)** et vaut $\\frac{AC}{2}$ ; dans le triangle ACD, celui des milieux de [CD] et [DA] aussi. Deux côtés opposés **parallèles et égaux** (à $\\frac{AC}{2}$) : c'est un **parallélogramme** — la droite des milieux, appliquée deux fois de part et d'autre d'une diagonale, ordonne n'importe quel quadrilatère." },
  ],
  practice: [
    { tier: "warmup", label: "La moitié gratuite", make: (r) => {
      const bc = 2 * randint(r, 3, 18);
      return { prompt: `M, N milieux de deux côtés ; le troisième côté mesure ${bc} cm. Que vaut MN ?`, answer: bc / 2, solution: `MN $= ${bc} \\div 2 = $ **${bc / 2} cm** — le segment des milieux vaut la moitié.` };
    } },
    { tier: "application", label: "La moitié remontée", make: (r) => {
      const mn = randint(r, 3, 15);
      return { prompt: `Le segment des milieux mesure ${mn} cm. Que vaut le troisième côté ?`, answer: 2 * mn, solution: `$2 \\times ${mn} = $ **${2 * mn} cm** — le théorème se remonte en doublant.` };
    } },
  ],
};

export default [pythagore, pythagoreReciproque, translation, droiteMilieux];
