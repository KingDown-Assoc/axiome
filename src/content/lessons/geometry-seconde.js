// Field "Geometry" — HIGH module (seconde year): coordinate vectors,
// collinearity, lines. Official programme: vector equality, the null vector,
// representatives; product of a vector by a real, COLLINEARITY; decomposition on
// two non-collinear vectors; orthonormal basis, vector coordinates, the NORM;
// coordinates of AB from A and B; the DETERMINANT and the collinearity
// criterion, applied to alignment and parallelism; vector characterization of
// the midpoint; distance between two points and midpoint coordinates. Lines:
// DIRECTOR VECTOR, cartesian and reduced equations, slope; building an equation
// from two points / point + director / point + slope; parallel or secant lines,
// intersection point. REQUIRED PROOFS: collinearity ⟺ null determinant ⟺
// proportional coordinates; the general form of a line equation via the
// determinant.
import { randint, pick } from "../../core/exercises.js";

// — Vectors in coordinates (programme: coordonnées, norme, milieu) —
const vecteursCoordonnees = {
  id: "geometry.high.vecteurs-coordonnees",
  level: "high", domain: "geometry",
  title: "Vecteurs en coordonnées",
  tagline: "u = xi + yj — la flèche devient un couple de nombres, et Pythagore mesure sa norme.",
  prereqs: ["geometry.middle.vecteurs", "geometry.middle.pythagore"],
  intuition:
    "Tes vecteurs de 3e emménagent dans le repère : dans une base orthonormée $(\\vec{i}, \\vec{j})$, tout vecteur s'écrit $\\vec{u} = x\\vec{i} + y\\vec{j}$ — le couple $(x\\,;\\,y)$ **est** le vecteur.\n\nEt tout se calcule : $\\vec{AB}$ a pour coordonnées $(x_B - x_A\\,;\\,y_B - y_A)$ — l'arrivée moins le départ, ta règle de 3e devenue formule officielle.",
  depths: {
    discovery:
      "**Avec les mains** : les opérations deviennent des additions — somme : $\\vec{u} + \\vec{v} = (x + x'\\,;\\,y + y')$ (coordonnée par coordonnée) ; produit par un réel : $k\\vec{u} = (kx\\,;\\,ky)$ (chaque coordonnée étirée). Le dessin du parallélogramme et le calcul disent la même chose — mais le calcul ne dérape jamais.",
    standard:
      "**En image** : mesurer la flèche — la **norme** $\\lVert\\vec{u}\\rVert = \\sqrt{x^2 + y^2}$ : c'est Pythagore, le vecteur étant l'hypoténuse de ses deux composantes. D'où la **distance** : $AB = \\lVert\\vec{AB}\\rVert = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$ — soustraire, élever au carré, sommer, racine : la règle qui mesure tout le plan.",
    advanced:
      "**Dans la tête** : le **milieu** a deux visages — vectoriel : $M$ est le milieu de $[AB]$ quand $\\vec{AM} = \\frac{1}{2}\\vec{AB}$ (la moitié du chemin) ; en coordonnées, la formule tombe : $M\\left(\\frac{x_A + x_B}{2}\\,;\\,\\frac{y_A + y_B}{2}\\right)$ — la **moyenne** des coordonnées. Démonstration en une ligne : $\\vec{AM} = \\frac{1}{2}\\vec{AB}$ donne $x_M - x_A = \\frac{1}{2}(x_B - x_A)$, d'où $x_M = \\frac{x_A + x_B}{2}$ ✓. La géométrie de Descartes tient sa promesse : chaque énoncé géométrique a sa traduction calculatoire — et réciproquement.",
  },
  keyIdea: "$\\vec{AB} = (x_B - x_A\\,;\\,y_B - y_A)$ — arrivée moins départ. Somme et $k\\vec{u}$ : coordonnée par coordonnée. $\\lVert\\vec{u}\\rVert = \\sqrt{x^2 + y^2}$ (Pythagore) ; milieu $=$ **moyenne** des coordonnées.",
  why:
    "Pourquoi transformer la géométrie en calcul ? Parce que le calcul est **infaillible et automatisable** : une figure trompe (le trait épais, l'angle presque droit), un couple de nombres jamais. Descartes a fusionné deux mondes — depuis, chaque problème de géométrie a deux solutions (la figure ou les coordonnées), et le physicien, le programmeur de jeux, le GPS ont choisi : tout l'espace numérique du monde parle en coordonnées de vecteurs.",
  examples: [
    { title: "La flèche calculée", steps: [
      { p: "$A(1\\,;\\,2)$, $B(4\\,;\\,3)$ : $\\vec{AB} = (4 - 1\\,;\\,3 - 2) = (3\\,;\\,1)$." },
      { p: "Norme : $\\lVert\\vec{AB}\\rVert = \\sqrt{3^2 + 1^2} = \\sqrt{10}$ — Pythagore mesure la flèche." },
    ] },
    { title: "Le milieu en moyenne", steps: [
      { p: "$A(1\\,;\\,2)$, $B(5\\,;\\,8)$ : $M\\left(\\dfrac{1 + 5}{2}\\,;\\,\\dfrac{2 + 8}{2}\\right) = (3\\,;\\,5)$." },
      { p: "La moyenne des coordonnées — et $\\vec{AM} = (2\\,;\\,3) = \\frac{1}{2}\\vec{AB}$ ✓ : les deux visages concordent." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "$A(1\\,;\\,2)$ et $B(4\\,;\\,3)$ : calcule les coordonnées de $\\vec{AB}$, puis celles de $\\vec{BA}$. Que remarques-tu ?", solution: "$\\vec{AB} = (3\\,;\\,1)$ ; $\\vec{BA} = (-3\\,;\\,-1)$ — l'**opposé** : arrivée moins départ change de signe quand on inverse le trajet, exactement comme en 3e." },
    { tier: "warmup", prompt: "$\\vec{u} = (3\\,;\\,-1)$ et $\\vec{v} = (-1\\,;\\,4)$ : calcule $\\vec{u} + \\vec{v}$ et $2\\vec{u} - \\vec{v}$.", solution: "$\\vec{u} + \\vec{v} = (2\\,;\\,3)$ ; $2\\vec{u} - \\vec{v} = (6 + 1\\,;\\,-2 - 4) = (7\\,;\\,-6)$ — coordonnée par coordonnée : l'algèbre des flèches." },
    { tier: "application", prompt: "Calcule la distance $AB$ pour $A(1\\,;\\,2)$ et $B(4\\,;\\,6)$.", solution: "$\\vec{AB} = (3\\,;\\,4)$, donc $AB = \\sqrt{3^2 + 4^2} = \\sqrt{25} = $ **5** — le triangle 3-4-5 caché dans le repère : la norme est un Pythagore." },
    { tier: "challenge", prompt: "Détermine les coordonnées du milieu de $[AB]$ pour $A(-2\\,;\\,5)$ et $B(6\\,;\\,-1)$, et vérifie vectoriellement.", solution: "$M\\left(\\dfrac{-2 + 6}{2}\\,;\\,\\dfrac{5 - 1}{2}\\right) = (2\\,;\\,2)$. Vérification : $\\vec{AM} = (4\\,;\\,-3)$ et $\\vec{AB} = (8\\,;\\,-6)$ — bien $\\vec{AM} = \\frac{1}{2}\\vec{AB}$ ✓ : la formule et la caractérisation se répondent." },
    { tier: "exam", prompt: "Démontre la formule du milieu : si $\\vec{AM} = \\frac{1}{2}\\vec{AB}$, alors $x_M = \\frac{x_A + x_B}{2}$ (et de même en ordonnée).", solution: "$\\vec{AM} = (x_M - x_A\\,;\\,y_M - y_A)$ et $\\frac{1}{2}\\vec{AB} = \\left(\\frac{x_B - x_A}{2}\\,;\\,\\frac{y_B - y_A}{2}\\right)$. L'égalité des abscisses donne $x_M - x_A = \\frac{x_B - x_A}{2}$, d'où $x_M = x_A + \\frac{x_B - x_A}{2} = \\frac{2x_A + x_B - x_A}{2} = \\frac{x_A + x_B}{2}$ ✓ (idem en $y$) — la moyenne n'était pas une recette : c'est la moitié du chemin, traduite en coordonnées." },
  ],
  practice: [
    { tier: "warmup", label: "Arrivée moins départ", make: (r) => {
      const ax = randint(r, -5, 5); const ay = randint(r, -5, 5);
      const bx = ax + (randint(r, -6, 7) || 3); const by = ay + (randint(r, -6, 7) || 2);
      return { prompt: `$A(${ax}\\,;\\,${ay})$, $B(${bx}\\,;\\,${by})$ : abscisse de $\\vec{AB}$ ?`, answer: bx - ax, solution: `$${bx} - (${ax}) = $ **${bx - ax}**.` };
    } },
    { tier: "application", label: "La norme de Pythagore", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]); const sx = r() < 0.5 ? -1 : 1;
      return { prompt: `$\\vec{u} = (${sx * t[0]}\\,;\\,${t[1]})$ : que vaut $\\lVert\\vec{u}\\rVert$ ?`, answer: t[2], solution: `$\\sqrt{${t[0] * t[0]} + ${t[1] * t[1]}} = $ **${t[2]}** — le carré efface le signe : Pythagore mesure.` };
    } },
    { tier: "challenge", label: "Le milieu en moyenne", make: (r) => {
      const ax = randint(r, -6, 6); const bx = ax + 2 * randint(r, 1, 6) * (r() < 0.5 ? -1 : 1);
      return { prompt: `$A$ d'abscisse ${ax}, $B$ d'abscisse ${bx} : abscisse du milieu de $[AB]$ ?`, answer: (ax + bx) / 2, solution: `$\\dfrac{${ax} + ${bx}}{2} = $ **${(ax + bx) / 2}** — la moyenne, c'est la moitié du chemin.` };
    } },
  ],
};

// — Collinearity and the determinant (programme: déterminant, critère, démo) —
const colinearite = {
  id: "geometry.high.colinearite",
  level: "high", domain: "geometry",
  title: "Colinéarité et déterminant",
  tagline: "xy′ − yx′ = 0 — le nombre qui détecte l'alignement.",
  prereqs: ["geometry.high.vecteurs-coordonnees"],
  intuition:
    "Deux vecteurs sont **colinéaires** quand l'un est un multiple de l'autre : $\\vec{v} = k\\vec{u}$ — mêmes direction, flèches parallèles.\n\nLe **déterminant** les juge d'un calcul : $\\det(\\vec{u}, \\vec{v}) = xy' - yx'$ — **nul si et seulement si** $\\vec{u}$ et $\\vec{v}$ sont colinéaires : quatre nombres, une multiplication croisée, le verdict.",
  depths: {
    discovery:
      "**Avec les mains** : $\\vec{u} = (2\\,;\\,3)$ et $\\vec{v} = (4\\,;\\,6)$ — $\\det = 2 \\times 6 - 3 \\times 4 = 0$ : colinéaires (et en effet $\\vec{v} = 2\\vec{u}$). Avec $\\vec{w} = (4\\,;\\,5)$ : $\\det = 10 - 12 = -2 \\neq 0$ : pas colinéaires — le produit en croix de tes proportions, recyclé en détecteur géométrique.",
    standard:
      "**En image** : les deux applications majeures — **alignement** : $A$, $B$, $C$ sont alignés $\\iff$ $\\vec{AB}$ et $\\vec{AC}$ colinéaires $\\iff \\det(\\vec{AB}, \\vec{AC}) = 0$ ; **parallélisme** : $(AB) \\parallel (CD) \\iff \\det(\\vec{AB}, \\vec{CD}) = 0$. Plus de règle qui dérape, plus de « ça a l'air aligné » : le déterminant tranche au nombre près.",
    advanced:
      "**Dans la tête** : la démonstration exigible — pourquoi $\\det = 0 \\iff$ colinéaires ? **Sens facile** : si $\\vec{v} = k\\vec{u}$, alors $xy' - yx' = x(ky) - y(kx) = 0$ ✓. **Sens retour** (pour $\\vec{u} \\neq \\vec{0}$, disons $x \\neq 0$) : si $xy' - yx' = 0$, alors $y' = \\frac{y}{x}x'$ — pose $k = \\frac{x'}{x}$ : alors $x' = kx$ et $y' = \\frac{y}{x} \\cdot kx = ky$ — donc $\\vec{v} = k\\vec{u}$ ✓. Le déterminant nul **équivaut** à la proportionnalité des coordonnées : ton tableau de proportionnalité de 5e et l'alignement de la géométrie sont le même phénomène, vu par le même nombre. Et un bonus en germe : $|\\det|$ mesure l'**aire** du parallélogramme construit sur les deux vecteurs — nul exactement quand le parallélogramme s'aplatit.",
  },
  keyIdea: "$\\det(\\vec{u}, \\vec{v}) = xy' - yx'$ — nul $\\iff$ **colinéaires** $\\iff$ coordonnées proportionnelles (démontré). Alignement de $A, B, C$ : $\\det(\\vec{AB}, \\vec{AC}) = 0$ ; parallélisme : déterminant des directeurs nul.",
  why:
    "Pourquoi un nombre pour une propriété qu'on voit ? Parce qu'on la voit **mal** : trois points presque alignés trompent l'œil et la règle, jamais le déterminant. Et ce petit calcul est un géant en devenir : généralisé en dimension supérieure, il gouvernera les systèmes d'équations, les aires et volumes, les changements de bases — la moitié de l'algèbre linéaire de la licence tient dans $xy' - yx'$.",
  examples: [
    { title: "Le verdict du déterminant", steps: [
      { p: "$\\vec{u} = (2\\,;\\,3)$, $\\vec{v} = (4\\,;\\,6)$ : $\\det = 2 \\times 6 - 3 \\times 4 = 0$ — colinéaires." },
      { p: "$\\vec{w} = (4\\,;\\,5)$ : $\\det(\\vec{u}, \\vec{w}) = 10 - 12 = -2 \\neq 0$ — pas colinéaires : le nombre tranche." },
    ] },
    { title: "Trois points au tribunal", steps: [
      { p: "$A(1\\,;\\,1)$, $B(3\\,;\\,4)$, $C(7\\,;\\,10)$ : $\\vec{AB} = (2\\,;\\,3)$, $\\vec{AC} = (6\\,;\\,9)$." },
      { p: "$\\det = 2 \\times 9 - 3 \\times 6 = 0$ — **alignés** : l'œil hésitait, le calcul signe." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "$\\vec{u} = (2\\,;\\,3)$, $\\vec{v} = (4\\,;\\,6)$, $\\vec{w} = (4\\,;\\,5)$ : calcule $\\det(\\vec{u}, \\vec{v})$ et $\\det(\\vec{u}, \\vec{w})$, et conclus.", solution: "$\\det(\\vec{u}, \\vec{v}) = 12 - 12 = 0$ : **colinéaires** ($\\vec{v} = 2\\vec{u}$) ; $\\det(\\vec{u}, \\vec{w}) = 10 - 12 = -2 \\neq 0$ : **pas colinéaires** — le produit croisé juge en une ligne." },
    { tier: "warmup", prompt: "Les points $A(1\\,;\\,1)$, $B(3\\,;\\,4)$ et $C(7\\,;\\,10)$ sont-ils alignés ?", solution: "$\\vec{AB} = (2\\,;\\,3)$, $\\vec{AC} = (6\\,;\\,9)$ : $\\det = 18 - 18 = 0$ → **alignés** — trois points s'alignent quand leurs flèches depuis l'un d'eux sont colinéaires." },
    { tier: "application", prompt: "$A(0\\,;\\,1)$, $B(2\\,;\\,5)$, $C(3\\,;\\,0)$, $D(4\\,;\\,2)$ : les droites $(AB)$ et $(CD)$ sont-elles parallèles ?", solution: "$\\vec{AB} = (2\\,;\\,4)$, $\\vec{CD} = (1\\,;\\,2)$ : $\\det = 4 - 4 = 0$ → **parallèles** (et même $\\vec{AB} = 2\\vec{CD}$) — le parallélisme est une colinéarité de directeurs." },
    { tier: "challenge", prompt: "Pour quelle valeur de $m$ les vecteurs $(2\\,;\\,3)$ et $(m\\,;\\,6)$ sont-ils colinéaires ?", solution: "$\\det = 2 \\times 6 - 3m = 12 - 3m = 0 \\iff m = $ **4** — le déterminant transforme une question géométrique en équation : la condition devient calculable." },
    { tier: "exam", prompt: "Démontre l'équivalence : $\\vec{u} = (x\\,;\\,y)$ non nul et $\\vec{v} = (x'\\,;\\,y')$ sont colinéaires $\\iff xy' - yx' = 0$ (traite les deux sens ; pour le retour, suppose $x \\neq 0$).", solution: "**Sens direct** : si $\\vec{v} = k\\vec{u}$, alors $x' = kx$ et $y' = ky$, d'où $xy' - yx' = xky - ykx = 0$ ✓. **Sens retour** : supposons $xy' - yx' = 0$ avec $x \\neq 0$ ; alors $y' = \\frac{y x'}{x}$. Posons $k = \\frac{x'}{x}$ : on a $x' = kx$, et $y' = \\frac{y}{x}x' = y \\cdot \\frac{x'}{x} = ky$ — donc $\\vec{v} = k\\vec{u}$ ✓ (si $x = 0$, échanger les rôles avec $y \\neq 0$). Nullité du déterminant et proportionnalité des coordonnées sont **le même énoncé** : la démonstration exigible relie le produit en croix de 4e à la géométrie du plan." },
  ],
  practice: [
    { tier: "warmup", label: "Le produit croisé", make: (r) => {
      const x = randint(r, 1, 6); const y = randint(r, 1, 6); const xx = randint(r, 1, 6); const yy = randint(r, 1, 6);
      return { prompt: `$\\det\\big((${x}\\,;\\,${y}), (${xx}\\,;\\,${yy})\\big) = ?$`, answer: x * yy - y * xx, solution: `$${x} \\times ${yy} - ${y} \\times ${xx} = $ **${x * yy - y * xx}**${x * yy - y * xx === 0 ? " — colinéaires !" : ""}.` };
    } },
    { tier: "application", label: "Colinéaires ?", make: (r) => {
      const x = randint(r, 1, 5); const y = randint(r, 1, 5); const ok = r() < 0.5; const k = randint(r, 2, 4);
      const xx = k * x; const yy = ok ? k * y : k * y + 1;
      return { prompt: `$(${x}\\,;\\,${y})$ et $(${xx}\\,;\\,${yy})$ : colinéaires ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$\\det = ${x * yy - y * xx}$ — ${ok ? "**nul : colinéaires**" : "**non nul : pas colinéaires**"}.` };
    } },
    { tier: "challenge", label: "Forcer la colinéarité", make: (r) => {
      const x = randint(r, 2, 5); const y = randint(r, 1, 5); const k = randint(r, 2, 4);
      return { prompt: `Pour quel $m$ les vecteurs $(${x}\\,;\\,${y})$ et $(m\\,;\\,${k * y})$ sont-ils colinéaires ?`, answer: k * x, solution: `$${x} \\times ${k * y} - ${y}m = 0 \\iff m = $ **${k * x}** — le déterminant nul se résout.` };
    } },
  ],
};

// — Lines (programme: vecteur directeur, équations, intersection) —
const droitesEquations = {
  id: "geometry.high.droites-equations",
  level: "high", domain: "geometry",
  title: "Équations de droites",
  tagline: "ax + by + c = 0 — chaque droite a sa carte d'identité, et deux droites se croisent en calculant.",
  prereqs: ["geometry.high.colinearite", "analysis.middle.lineaire-affine"],
  intuition:
    "Une droite est un **ensemble de points** : ceux dont les coordonnées vérifient une équation. Deux cartes d'identité : l'équation **réduite** $y = mx + p$ (ta 3e — pente $m$, ordonnée à l'origine $p$) et l'équation **cartésienne** $ax + by + c = 0$, plus générale (elle accepte même les droites verticales !).\n\nLa clé secrète : le vecteur **directeur** — pour $ax + by + c = 0$, c'est $\\vec{u} = (-b\\,;\\,a)$.",
  depths: {
    discovery:
      "**Avec les mains** : construire l'équation depuis deux points — $A(1\\,;\\,2)$, $B(3\\,;\\,5)$ : un point $M(x\\,;\\,y)$ est sur $(AB)$ exactement quand $\\vec{AM}$ et $\\vec{AB}$ sont **colinéaires** — déterminant nul : $(x - 1) \\times 3 - (y - 2) \\times 2 = 0$, soit $3x - 2y + 1 = 0$ : l'équation cartésienne est un déterminant qui s'annule.",
    standard:
      "**En image** : circuler entre les formes — de $3x - 2y + 1 = 0$ à la réduite : isoler $y = \\frac{3}{2}x + \\frac{1}{2}$ (pente $\\frac{3}{2}$, et le directeur $(-b\\,;\\,a) = (2\\,;\\,3)$ confirme : avancer de 2, monter de 3). Construire depuis un point et une pente : $y - y_A = m(x - x_A)$. Et le cas que la réduite ne sait pas dire : la verticale $x = 4$ — cartésienne $x - 4 = 0$, sans pente, mais avec un directeur $(0\\,;\\,1)$ : la forme cartésienne couvre **toutes** les droites.",
    advanced:
      "**Dans la tête** : deux droites se rencontrent par le calcul — parallèles ou sécantes ? Le **déterminant des directeurs** tranche ; sécantes, leur point commun vérifie les **deux** équations : $y = 2x + 1$ et $y = -x + 7$ donnent $2x + 1 = -x + 7$, $x = 2$, $y = 5$ — l'intersection est la solution d'un système, et ton point de bascule de 4e devient méthode générale. Trois points alignés ? Le troisième vérifie l'équation des deux premiers — ou le déterminant de 3e… pardon, de la leçon précédente : tout se recoupe, c'est le signe qu'on tient la bonne théorie.",
  },
  keyIdea: "Cartésienne $ax + by + c = 0$, directeur $(-b\\,;\\,a)$ ; réduite $y = mx + p$ (pente, ordonnée à l'origine — verticales exclues). Construire : déterminant nul de $\\vec{AM}$ et $\\vec{AB}$. Intersection : résoudre le **système**.",
  why:
    "Pourquoi deux équations pour une même droite ? Parce qu'elles répondent à deux besoins : la réduite **lit** (pente et départ d'un coup d'œil — l'économiste, le physicien), la cartésienne **couvre** (toutes les droites, verticales comprises, et la porte ouverte aux dimensions supérieures — le géomètre, l'informaticien). Savoir circuler entre les deux, c'est choisir son outil — et l'intersection de deux droites est le premier système d'équations d'une longue série : toute la modélisation linéaire du monde commence ici.",
  examples: [
    { title: "L'équation par le déterminant", steps: [
      { p: "$A(1\\,;\\,2)$, $B(3\\,;\\,5)$ : $M(x\\,;\\,y) \\in (AB) \\iff \\det(\\vec{AM}, \\vec{AB}) = 0$." },
      { p: "$(x - 1) \\times 3 - (y - 2) \\times 2 = 0 \\iff 3x - 2y + 1 = 0$ — la droite est un déterminant nul." },
    ] },
    { title: "Le croisement calculé", steps: [
      { p: "$y = 2x + 1$ et $y = -x + 7$ : égaler — $2x + 1 = -x + 7$, donc $x = 2$." },
      { p: "$y = 5$ : intersection $(2\\,;\\,5)$ — le système résolu, le point trouvé." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne un vecteur directeur et la pente de la droite $3x - 2y + 1 = 0$, puis sa forme réduite.", solution: "Directeur $(-b\\,;\\,a) = (2\\,;\\,3)$ ; en isolant : $y = \\dfrac{3}{2}x + \\dfrac{1}{2}$ — pente $\\dfrac{3}{2}$ (avancer de 2, monter de 3 : le directeur le disait déjà), ordonnée à l'origine $\\dfrac{1}{2}$." },
    { tier: "warmup", prompt: "Détermine une équation de la droite passant par $A(1\\,;\\,2)$ de pente 3, puis celle de la droite verticale passant par $A$.", solution: "$y - 2 = 3(x - 1)$, soit $y = 3x - 1$ ; la verticale : $x = 1$ — sans pente ni forme réduite : seule la cartésienne ($x - 1 = 0$) sait la dire." },
    { tier: "application", prompt: "Détermine une équation cartésienne de $(AB)$ pour $A(1\\,;\\,2)$ et $B(3\\,;\\,5)$, par le déterminant.", solution: "$M(x\\,;\\,y) \\in (AB) \\iff \\det(\\vec{AM}, \\vec{AB}) = 0$ : $(x - 1) \\times 3 - (y - 2) \\times 2 = 0$, soit $3x - 2y + 1 = 0$ — vérification : $A$ et $B$ la satisfont ✓." },
    { tier: "challenge", prompt: "Les droites $y = 2x + 1$ et $y = -x + 7$ sont-elles sécantes ? Si oui, calcule leur point d'intersection.", solution: "Pentes $2 \\neq -1$ : **sécantes**. Égaler : $2x + 1 = -x + 7 \\Rightarrow 3x = 6 \\Rightarrow x = 2$, puis $y = 5$ — intersection $(2\\,;\\,5)$, qui vérifie les deux équations ✓ : croiser des droites, c'est résoudre un système." },
    { tier: "exam", prompt: "Démontre que toute droite du plan admet une équation de la forme $ax + by + c = 0$ avec $(a\\,;\\,b) \\neq (0\\,;\\,0)$ (pars d'un point $A$ et d'un directeur $\\vec{u} = (\\alpha\\,;\\,\\beta)$, et traduis l'appartenance par le déterminant).", solution: "$M(x\\,;\\,y)$ est sur la droite $\\iff \\vec{AM}$ et $\\vec{u}$ sont colinéaires $\\iff \\det(\\vec{AM}, \\vec{u}) = 0 \\iff (x - x_A)\\beta - (y - y_A)\\alpha = 0$ — en développant : $\\beta x - \\alpha y + (\\alpha y_A - \\beta x_A) = 0$ : la forme $ax + by + c = 0$ avec $a = \\beta$, $b = -\\alpha$, non tous deux nuls (le directeur n'est pas nul) ✓. Toute droite **est** un déterminant annulé — et l'on relit au passage le directeur $(-b\\,;\\,a) = (\\alpha\\,;\\,\\beta)$ : la boucle est bouclée, démonstration exigible comprise." },
  ],
  practice: [
    { tier: "warmup", label: "Le directeur caché", make: (r) => {
      const a = randint(r, 1, 6); const b = randint(r, 1, 6); const c = randint(r, -8, 8);
      return { prompt: `Droite $${a}x ${b >= 0 ? "+ " + b : "- " + (-b)}y ${c >= 0 ? "+ " + c : "- " + (-c)} = 0$ : abscisse du directeur $(-b\\,;\\,a)$ ?`, answer: -b, solution: `Directeur $(${-b}\\,;\\,${a})$ — abscisse **${-b}**.` };
    } },
    { tier: "application", label: "Sur la droite ?", make: (r) => {
      const m = randint(r, 1, 4); const p = randint(r, -5, 6); const x = randint(r, -3, 5); const ok = r() < 0.5;
      const y = ok ? m * x + p : m * x + p + randint(r, 1, 3);
      return { prompt: `Le point $(${x}\\,;\\,${y})$ est-il sur la droite $y = ${m}x ${p >= 0 ? "+ " + p : "- " + (-p)}$ ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$${m} \\times ${x} ${p >= 0 ? "+ " + p : "- " + (-p)} = ${m * x + p}$ — ${ok ? "le point vérifie l'équation : **oui**" : "≠ " + y + " : **non**"}.` };
    } },
    { tier: "challenge", label: "Le croisement", make: (r) => {
      const m1 = randint(r, 1, 3); const m2 = m1 + randint(r, 1, 3); const x = randint(r, 1, 6); const p1 = randint(r, 0, 5);
      const p2 = (m1 - m2) * x + p1;
      return { prompt: `Intersection de $y = ${m1}x + ${p1}$ et $y = ${m2}x ${p2 >= 0 ? "+ " + p2 : "- " + (-p2)}$ : quelle abscisse ?`, answer: x, solution: `$${m1}x + ${p1} = ${m2}x ${p2 >= 0 ? "+ " + p2 : "- " + (-p2)} \\Rightarrow x = $ **${x}** — égaler, résoudre.` };
    } },
  ],
};

export default [vecteursCoordonnees, colinearite, droitesEquations];
