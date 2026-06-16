// Field "Analysis" — BACHELOR module (l2 year), licence de mathématiques.
// Official MP/MPI programme (arrêté 2021), chapter "Topologie des espaces
// vectoriels normés": norms and balls (1, 2, infinity + functional norms),
// open/closed sets, interior/closure/density, sequential characterizations,
// equivalent norms; compactness DEFINED by Bolzano-Weierstrass
// (Borel-Lebesgue, metric spaces, Cauchy sequences and Banach spaces are
// all off-programme), Heine, extreme value theorem, path-connectedness
// (components, intervals of R, continuous images — the programme itself
// says "un dessin pertinent peut valoir preuve"); finite dimension:
// equivalence of norms (proof not required), compact iff closed+bounded,
// L = Lc; continuous linear maps: criterion ||u(x)|| <= C||x||, operator
// norm, submultiplicativity. Singapore method at university level:
// Concrete = three norms computed on one vector, BW played by hand on a
// segment, the differentiation operator blowing up; Pictorial = the three
// unit balls, the path between two points, the image of the unit sphere;
// Abstract = the theorems with programme-exact limits. Big ideas named;
// exam = colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Norms and topology (MP: topologie des evn, a-f) —
const normesTopologie = {
  id: "analysis.bachelor.normes-topologie",
  level: "bachelor", domain: "analysis",
  title: "Normes : la géométrie des espaces",
  tagline: "Mesurer un vecteur, une matrice, une fonction — et toute l'analyse suit la mesure.",
  prereqs: ["algebra.bachelor.espaces-vectoriels", "analysis.bachelor.reels-suites"],
  intuition:
    "Ton $\\varepsilon$ de première année mesurait des distances entre **réels**. Mais entre deux matrices ? Deux fonctions ? Deux signaux ?\n\nUne **norme** répond : une façon de mesurer la taille $\\|x\\|$ — et dès qu'on sait mesurer, tout suit : limites, continuité, ouverts, fermés. L'analyse entière s'exporte de $\\mathbb{R}$ vers n'importe quel espace vectoriel.",
  depths: {
    discovery:
      "**Avec les mains** : mesure le vecteur $(3, 4)$ de trois façons — la norme **un** (le taxi : $|3| + |4| = 7$ rues parcourues), la norme **deux** (l'oiseau : $\\sqrt{9 + 16} = 5$, ton Pythagore), la norme **infini** (le goulot : $\\max(3, 4) = 4$, la pire coordonnée) — trois règles de mesure légitimes (séparation, homogénéité, inégalité triangulaire : vérifie-les), trois tailles différentes pour le même vecteur : la « taille » est un **choix**.",
    standard:
      "**En image** : dessine les trois **boules unités** de $\\mathbb{R}^2$ — $\\{\\|x\\| \\leq 1\\}$ : un **losange** pour la norme un, le **disque** pour la deux, le **carré** pour l'infini — la géométrie de chaque norme se voit d'un coup d'œil (big idea *Diagrams* : la boule EST la norme) ; et le vocabulaire topologique se dessine pareil : un **ouvert** ne contient aucun point de son bord (autour de chaque point, une petite boule entière tient dedans), un **fermé** contient tout son bord, l'**adhérence** ajoute le bord, l'**intérieur** le retire, la **frontière** est le bord lui-même — et une partie **dense** s'approche de tout le monde ($\\mathbb{Q}$ dans $\\mathbb{R}$ : entre deux réels, toujours un rationnel).",
    advanced:
      "**Dans la tête** : tout se teste par les **suites** — un point est adhérent à $A$ s'il est limite d'une suite de $A$ ; un ensemble est fermé si et seulement s'il est **stable par passage à la limite** (le test fermé numéro un en exercice) ; une suite ayant deux **valeurs d'adhérence** (limites de suites extraites) diverge. Deux normes sont **équivalentes** si $c\\|x\\| \\leq N(x) \\leq C\\|x\\|$ : elles définissent alors les mêmes ouverts, les mêmes limites, la même topologie (big idea *Invariance*) — sur $\\mathbb{R}^n$, les trois normes le sont ($\\|x\\|_\\infty \\leq \\|x\\|_2 \\leq \\|x\\|_1 \\leq n\\|x\\|_\\infty$). Mais sur les espaces de **fonctions** — $\\|f\\|_\\infty = \\sup |f|$, $\\|f\\|_1 = \\int_a^b |f|$, $\\|f\\|_2 = \\sqrt{\\int_a^b f^2}$ — l'équivalence **meurt** : une bosse de plus en plus fine garde $\\|f_n\\|_\\infty = 1$ pendant que $\\|f_n\\|_1 \\to 0$ — en dimension infinie, le choix de la norme change la convergence : c'est LA frontière entre dimension finie et infinie, et la suite du chapitre en vit.",
  },
  keyIdea: "Norme : séparation, homogénéité, inégalité triangulaire — la **boule unité** la dessine (*Diagrams* : losange, disque, carré). Fermé $\\iff$ **stable par limites** (caractérisation séquentielle) ; adhérence, intérieur, densité. Normes **équivalentes** $c\\|x\\| \\leq N(x) \\leq C\\|x\\|$ : mêmes notions topologiques (*Invariance*) — vrai pour $\\|\\cdot\\|_1, \\|\\cdot\\|_2, \\|\\cdot\\|_\\infty$ sur $\\mathbb{R}^n$, **faux** entre normes fonctionnelles : la dimension infinie commence ici.",
  why:
    "Choisir une norme, c'est choisir ce que « proche » veut dire — et les applications en dépendent toutes : approximer un signal au sens $\\|\\cdot\\|_2$ (l'énergie, le choix de Fourier et du JPEG) n'est pas l'approximer au sens $\\|\\cdot\\|_\\infty$ (l'erreur maximale, le choix de l'ingénieur qui certifie) ; un algorithme d'apprentissage qui pénalise en norme un produit des solutions parcimonieuses, en norme deux des solutions lisses. Le L3 fera des espaces $L^p$ tout un chapitre — la grammaire s'apprend ici, sur trois boules dessinées.",
  examples: [
    { title: "Trois tailles pour un vecteur", steps: [
      { p: "$(3, 4)$ : norme un $= 7$ (taxi), norme deux $= 5$ (oiseau), norme infini $= 4$ (goulot)." },
      { p: "Trois boules unités : losange, disque, carré — la géométrie du « proche » est un choix." },
    ] },
    { title: "Le test séquentiel du fermé", steps: [
      { p: "$F = \\{(x, y) : xy = 1\\}$ : toute suite de $F$ qui converge a sa limite vérifiant $xy = 1$ (continuité du produit)." },
      { p: "Stable par limites $\\Rightarrow$ fermé — sans dessiner, sans complémentaire : le test roi." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\|u\\|_1$, $\\|u\\|_2$, $\\|u\\|_\\infty$ pour $u = (1, -2, 2)$ et vérifie la chaîne $\\|u\\|_\\infty \\leq \\|u\\|_2 \\leq \\|u\\|_1$. Pour quel type de vecteur a-t-on égalité partout ?", solution: "$\\|u\\|_1 = 1 + 2 + 2 = 5$ ; $\\|u\\|_2 = \\sqrt{1 + 4 + 4} = 3$ ; $\\|u\\|_\\infty = 2$ — chaîne : $2 \\leq 3 \\leq 5$ ✓. Égalité partout : les vecteurs portés par **un seul axe** ($u = (t, 0, 0)$ : les trois normes valent $|t|$) — dès que la masse se répartit sur plusieurs coordonnées, le taxi paie le détour et le goulot ne voit que la pire : les trois mesures divergent." },
    { tier: "warmup", prompt: "Dans $\\mathbb{R}^2$ (norme deux), classe : ouvert, fermé, ni l'un ni l'autre — $A = \\{(x,y) : x^2 + y^2 < 1\\}$ ; $B = \\{(x,y) : x \\geq 0\\}$ ; $C = \\{(x,y) : 0 < x \\leq 1\\}$. Donne l'adhérence et l'intérieur de $C$.", solution: "$A$ : **ouvert** (le disque sans bord : autour de chaque point, une boule tient — son rayon : $1 - \\|x\\|$) ; $B$ : **fermé** (stable par limites : si $x_n \\geq 0$ et $x_n \\to x$, alors $x \\geq 0$ — l'inégalité **large** passe à la limite) ; $C$ : **ni l'un ni l'autre** — la bande attrape un bord ($x = 1$) et rate l'autre ($x = 0$) : adhérence $\\bar{C} = \\{0 \\leq x \\leq 1\\}$ (on ferme), intérieur $\\{0 < x < 1\\}$ (on ouvre) — la frontière, ce sont les deux droites verticales." },
    { tier: "application", prompt: "Montre que $GL_n(\\mathbb{R})$ (les matrices inversibles) est un **ouvert** de $\\mathcal{M}_n(\\mathbb{R})$, en utilisant la continuité du déterminant. Que dit ce résultat sur la stabilité numérique de l'inversibilité ?", solution: "$GL_n = \\det^{-1}(\\mathbb{R}^*)$ : **image réciproque de l'ouvert** $\\mathbb{R}^* = \\mathbb{R} \\setminus \\{0\\}$ par l'application $\\det$, **continue** (polynomiale en les coefficients) — donc ouvert ■. Lecture numérique : autour de toute matrice inversible, une boule entière de matrices inversibles — **perturber un peu une matrice inversible la laisse inversible** : l'inversibilité résiste au bruit (alors que la non-inversibilité, elle, est fragile : $\\det = 0$ est un fermé d'intérieur vide — le moindre souffle la détruit)." },
    { tier: "challenge", prompt: "Sur $\\mathcal{C}([0,1], \\mathbb{R})$, considère la bosse $f_n$ : triangle de hauteur $1$ et de base $[0, \\frac{2}{n}]$, nulle ailleurs. Calcule $\\|f_n\\|_\\infty$ et $\\|f_n\\|_1$, conclus sur l'équivalence des normes — et explique pourquoi ce phénomène est impossible dans $\\mathbb{R}^n$.", solution: "$\\|f_n\\|_\\infty = 1$ (la hauteur, constante) ; $\\|f_n\\|_1 = \\int_0^1 |f_n| = \\frac{1}{2} \\times \\frac{2}{n} \\times 1 = \\frac{1}{n} \\to 0$ (l'aire du triangle fond). Si les normes étaient équivalentes, $\\|f_n\\|_\\infty \\leq C \\|f_n\\|_1 \\to 0$ : contradiction avec $\\|f_n\\|_\\infty = 1$ — **non équivalentes** ■ : la bosse converge vers zéro « en moyenne » mais pas « uniformément ». En dimension **finie**, impossible : toutes les normes y sont équivalentes (théorème admis du programme) — la bosse qui s'affine est un phénomène de dimension **infinie** : il faut une infinité de directions pour fuir ainsi." },
    { tier: "exam", prompt: "Sur $\\mathbb{R}^n$. (1) Montre $\\|x\\|_\\infty \\leq \\|x\\|_2 \\leq \\|x\\|_1$. (2) Montre $\\|x\\|_1 \\leq n \\|x\\|_\\infty$ et $\\|x\\|_2 \\leq \\sqrt{n}\\,\\|x\\|_\\infty$. (3) Conclus que les trois normes sont équivalentes, et donne pour chaque inégalité un vecteur qui la rend exacte (cas d'égalité). (4) Dessine les trois boules unités de $\\mathbb{R}^2$ emboîtées : quelle inclusion d'ensembles traduit chaque inégalité de normes ?", solution: "(1) $\\|x\\|_\\infty = |x_{i_0}| = \\sqrt{x_{i_0}^2} \\leq \\sqrt{\\sum x_i^2} = \\|x\\|_2$ ; et $\\|x\\|_2^2 = \\sum x_i^2 \\leq \\left(\\sum |x_i|\\right)^2 = \\|x\\|_1^2$ (les doubles produits sont positifs) ■. (2) $\\|x\\|_1 = \\sum |x_i| \\leq n \\max = n\\|x\\|_\\infty$ ; $\\|x\\|_2 = \\sqrt{\\sum x_i^2} \\leq \\sqrt{n \\max^2} = \\sqrt{n}\\,\\|x\\|_\\infty$ ■. (3) Chaîne complète $\\|x\\|_\\infty \\leq \\|x\\|_2 \\leq \\|x\\|_1 \\leq n\\|x\\|_\\infty$ : chaque paire est prise en sandwich par des constantes — **équivalentes** ■. Égalités : $(1, 0, \\ldots, 0)$ rend exactes celles de (1) (un seul axe) ; $(1, 1, \\ldots, 1)$ rend exactes celles de (2) (masse également répartie). (4) Une inégalité $N \\leq M$ équivaut à l'**inclusion inverse des boules** : boule de $M$ $\\subset$ boule de $N$ — d'où l'emboîtement losange $\\subset$ disque $\\subset$ carré : l'image résume les six inégalités d'un coup, et c'est elle qu'il faut retenir." },
  ],
  practice: [
    { tier: "warmup", label: "Trois normes, un vecteur", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 1, 5);
      const which = pick(r, [["_1", a + b, "le taxi additionne"], ["_\\infty", Math.max(a, b), "le goulot prend le max"]]);
      return { prompt: `$\\|(${a}, ${b})\\|${which[0]}$ ?`, answer: which[1], solution: `${which[2]} : $${which[1]}$.` };
    } },
    { tier: "application", label: "Le test du fermé", make: (r) => {
      const cas = pick(r, [["x \\geq 2", 1, "inégalité large : stable par limites"], ["x > 2", 0, "la suite $2 + 1/n$ converge vers $2$, dehors"], ["x^2 + y^2 \\leq 4", 1, "boule fermée"], ["0 < x < 1", 0, "ouvert : les bords fuient"]]);
      return { prompt: `$\\{(x, y) : ${cas[0]}\\}$ : fermé (1) ou pas (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Fermé" : "Pas fermé"}** — ${cas[2]}.` };
    } },
    { tier: "challenge", label: "La chaîne des normes", make: (r) => {
      const n = randint(r, 2, 6);
      return { prompt: `Dans $\\mathbb{R}^${n}$, la meilleure constante $C$ telle que $\\|x\\|_1 \\leq C\\|x\\|_\\infty$ ?`, answer: n, solution: `$C = ${n}$ — atteinte par $(1, \\ldots, 1)$ : chaque coordonnée paie plein tarif.` };
    } },
  ],
};

// — Compactness and connectedness (MP: topologie g-i + dimension finie) —
const compaciteConnexite = {
  id: "analysis.bachelor.compacite-connexite",
  level: "bachelor", domain: "analysis",
  title: "Compacité et connexité par arcs",
  tagline: "Les terrains où l'analyse gagne toujours : on y extrait, on y atteint, on y traverse.",
  prereqs: ["analysis.bachelor.normes-topologie"],
  intuition:
    "Pourquoi une fonction continue sur un **segment** atteint-elle ses bornes, alors que sur $]0, 1[$ ou sur $\\mathbb{R}$ elle peut fuir ? Parce que le segment est **compact** : rien ne s'en échappe.\n\nLa compacité est la propriété des terrains où les théorèmes d'existence réussissent — et la **connexité par arcs**, celle des terrains d'un seul tenant, où les valeurs intermédiaires passent.",
  depths: {
    discovery:
      "**Avec les mains** : joue à Bolzano-Weierstrass sur trois terrains — sur $[0, 1]$, prends n'importe quelle suite : coupe le segment en deux, garde la moitié qui contient une infinité de termes, recoupe, recoupe : la dichotomie fabrique une **sous-suite convergente** (dans le segment !) ; sur $\\mathbb{R}$, la suite $u_n = n$ **s'échappe à l'infini** : aucune sous-suite ne converge ; sur $]0, 1[$, la suite $\\frac{1}{n}$ converge… vers $0$, qui est **dehors** — trois échecs et réussites qui définissent le mot : compact $=$ toute suite y admet une sous-suite qui converge **dedans**.",
    standard:
      "**En image** : le programme l'écrit lui-même — « un dessin pertinent peut valoir preuve ». Dessin un : en dimension finie, compact $=$ **fermé et borné** — une patate avec son bord, qui ne fuit ni vers l'infini (bornée) ni par un trou de bord (fermée). Dessin deux : l'image continue d'un compact est compacte — le voyageur qui parcourt un terrain compact atteint réellement son **altitude maximale** (théorème des bornes atteintes : le sommet existe ET il est foulé). Dessin trois : une partie est **connexe par arcs** si deux points quelconques se relient par un **chemin continu** qui reste dedans — d'un seul tenant ; le plan privé d'un point l'est (contourne !), $\\mathbb{R}^*$ ne l'est pas (impossible d'enjamber $0$ en restant continu) — big idea *Diagrams*, à plein régime.",
    advanced:
      "**Dans la tête** : la définition officielle est **séquentielle** — compact $=$ propriété de Bolzano-Weierstrass (la caractérisation par recouvrements, dite de Borel-Lebesgue, est hors programme : on le dit et on passe). L'architecture : un compact est toujours fermé et borné ; la **réciproque vaut en dimension finie** (et seulement là — en dimension infinie, la boule unité fermée n'est plus compacte : la bosse glissante du chapitre précédent y vit sans sous-suite convergente). Sur un compact : l'image continue est compacte, **Heine** (continue $\\Rightarrow$ uniformément continue), bornes atteintes, et une suite converge si et seulement si elle a une **unique** valeur d'adhérence. Côté connexité : les parties connexes par arcs de $\\mathbb{R}$ sont exactement les **intervalles**, et l'image continue d'un connexe par arcs est connexe par arcs — d'où le **théorème des valeurs intermédiaires généralisé** : une fonction continue à valeurs réelles sur un connexe par arcs prend toutes les valeurs entre deux valeurs atteintes. Les **composantes** connexes par arcs partitionnent l'espace (classes d'une relation d'équivalence — ton chapitre 1 de L1, encore lui).",
  },
  keyIdea: "Compact $=$ **Bolzano-Weierstrass** : toute suite a une sous-suite convergente dedans (Borel-Lebesgue hors programme). Dimension finie : compact $\\iff$ **fermé + borné**. Sur un compact : bornes **atteintes**, Heine, image continue compacte. **Connexe par arcs** : un chemin continu entre deux points quelconques — sur $\\mathbb{R}$ : les intervalles ; image continue connexe $\\Rightarrow$ TVI généralisé (*Diagrams* : « un dessin pertinent peut valoir preuve »).",
  why:
    "La compacité est le théorème d'existence universel de l'**optimisation** : « minimiser une fonction continue » n'a de réponse garantie que sur un compact — c'est elle qui assure qu'un plus court chemin existe, qu'un meilleur estimateur existe, qu'une configuration d'énergie minimale existe ; tout le calcul différentiel de fin d'année cherchera des extremums que la compacité aura d'abord fait exister. Et la connexité par arcs est l'hypothèse cachée de tous les arguments « par continuité » : une quantité continue qui ne s'annule pas sur un connexe garde un signe constant — l'argument favori des démonstrations d'unicité.",
  examples: [
    { title: "Trois terrains pour BW", steps: [
      { p: "$[0, 1]$ : la dichotomie extrait toujours — compact. $\\mathbb{R}$ : $u_n = n$ fuit — pas compact." },
      { p: "$]0, 1[$ : $\\frac{1}{n} \\to 0 \\notin\\, ]0,1[$ — la limite fuit par le bord : pas compact." },
    ] },
    { title: "Le TVI généralisé", steps: [
      { p: "$f$ continue sur un connexe par arcs, $f(a) < 0 < f(b)$ : suis le chemin de $a$ à $b$." },
      { p: "$t \\mapsto f(\\gamma(t))$ est continue sur $[0,1]$ : le TVI de L1 donne un zéro sur le chemin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Compacts ou pas (dans $\\mathbb{R}^2$, dimension finie) ? $A = [0,1] \\times [0,1]$ ; $B = \\{(x, y) : x^2 + y^2 < 1\\}$ ; $C = \\{(x, y) : xy = 1\\}$ ; $D = \\{(x, y) : x^2 + y^2 = 1\\}$. Verdict par « fermé + borné ».", solution: "$A$ : fermé ✓ borné ✓ — **compact**. $B$ : borné mais **ouvert** (le bord fuit) — non. $C$ : fermé ✓ (image réciproque de $\\{1\\}$ par le produit, continu) mais **non borné** (l'hyperbole file à l'infini) — non. $D$ : le cercle, fermé ✓ borné ✓ — **compact**. En dimension finie, le verdict tient en deux cases à cocher — et chaque échec désigne le mode d'évasion : par le bord ($B$) ou par l'infini ($C$)." },
    { tier: "warmup", prompt: "Montre que $f(x) = \\frac{1}{x}$ sur $]0, 1]$ est continue mais non bornée, et explique précisément quelle hypothèse du théorème des bornes atteintes manque. Même question pour $g(x) = x$ sur $[0, +\\infty[$.", solution: "$f$ : continue sur $]0, 1]$, mais $f\\left(\\frac{1}{n}\\right) = n \\to +\\infty$ — non bornée : le domaine n'est **pas fermé** (le bord $0$ manque, et $f$ explose en s'en approchant). $g$ : continue, $g(n) = n \\to +\\infty$ — le domaine n'est **pas borné**. Les deux pannes du théorème, une par hypothèse : la compacité exige fermé ET borné, et chaque moitié bouche un mode d'évasion — la valeur du théorème se mesure à ses contre-exemples." },
    { tier: "application", prompt: "Soit $K$ un compact de $\\mathbb{R}^n$ et $f : K \\to \\mathbb{R}$ continue avec $f > 0$ sur $K$. Montre qu'il existe $m > 0$ tel que $f \\geq m$ sur $K$ — et donne un contre-exemple sur un non-compact.", solution: "Bornes atteintes : $f$ continue sur le compact $K$ atteint son minimum en un point $x_0$ — pose $m = f(x_0)$ ; comme $f > 0$ partout, $m = f(x_0) > 0$, et $f \\geq m$ sur $K$ ■ (être positif **partout** devient être minoré par un seuil **strictement positif** : la compacité transforme un fait ponctuel en fait uniforme — le geste le plus utilisé du chapitre). Contre-exemple : $f(x) = x$ sur $]0, 1[$ — strictement positive, d'infimum $0$ jamais atteint : sans compacité, le seuil s'évanouit." },
    { tier: "challenge", prompt: "$\\mathbb{R}^2$ privé de l'origine est-il connexe par arcs ? Et $\\mathbb{R}$ privé de l'origine ? Démontre les deux réponses (un chemin explicite ; un argument TVI).", solution: "$\\mathbb{R}^2 \\setminus \\{0\\}$ : **oui** — entre deux points, le segment direct convient sauf s'il passe par l'origine, auquel cas on **contourne** par un point hors de la droite (deux segments) : un chemin continu explicite existe toujours — le plan a la place de contourner. $\\mathbb{R} \\setminus \\{0\\} = \\mathbb{R}^* $ : **non** — un chemin continu $\\gamma$ de $-1$ à $1$ aurait $\\gamma(0) = -1 < 0 < 1 = \\gamma(1)$ : le **TVI** force un instant où $\\gamma(t) = 0$ — interdit ■. La dimension fait la différence : en dimension $1$, un point coupe la droite en deux composantes $]-\\infty, 0[$ et $]0, +\\infty[$ ; en dimension $2$, un point ne coupe rien." },
    { tier: "exam", prompt: "Soit $F$ un fermé non vide de $\\mathbb{R}^n$ et $a \\notin F$. On veut montrer que la distance $d(a, F) = \\inf_{x \\in F} \\|a - x\\|$ est **atteinte**. (1) Pourquoi ne peut-on pas appliquer directement les bornes atteintes à $x \\mapsto \\|a - x\\|$ sur $F$ ? (2) Pose $K = F \\cap \\bar{B}(a, R)$ pour $R = d(a, F) + 1$ : montre que $K$ est compact et non vide. (3) Conclus que l'infimum sur $F$ est atteint en un point de $K$. (4) Montre enfin que $d(a, F) > 0$ — et donne un exemple où $F$ est fermé, $a \\notin F$, mais $F$ non borné, pour mesurer ce que ton argument a contourné.", solution: "(1) $F$ est fermé mais **peut être non borné** : pas compact, pas de bornes atteintes directes. (2) $K$ : intersection du fermé $F$ et de la boule fermée — **fermé** ; inclus dans la boule — **borné** ; dimension finie : **compact** ✓ ; non vide : par définition de l'inf, un point de $F$ est à distance $< d(a, F) + 1 = R$ de $a$ ✓. (3) Sur le compact $K$, $x \\mapsto \\|a - x\\|$ (continue : inégalité triangulaire) atteint son minimum en $x_0$ — et les points de $F$ **hors** de $K$ sont à distance $> R > d(a, F)$ : ils ne concurrencent pas — l'inf sur $F$ entier est atteint en $x_0$ ■. (4) Si $d(a, F) = 0$, alors $\\|a - x_0\\| = 0$ : $a = x_0 \\in F$, contradiction — donc $d(a, F) > 0$ ■ (un fermé tient ses distances). Exemple : $F = \\{(x, y) : xy = 1\\}$, $a = (0,0)$ : fermé, non borné — la **troncature par une boule** est l'astuce qui fabrique de la compacité là où il n'y en avait pas : un grand classique de colle, à ranger dans la trousse." },
  ],
  practice: [
    { tier: "warmup", label: "Deux cases à cocher", make: (r) => {
      const cas = pick(r, [["[0, ${b}]", 1, "fermé borné"], ["]0, ${b}[", 0, "ouvert : le bord fuit"], ["[0, +\\infty[", 0, "non borné"], ["\\\\{0\\\\} \\cup [1, ${b}]", 1, "fermé borné (même en deux morceaux !)"]]);
      const b = randint(r, 2, 5);
      return { prompt: `$${cas[0].replace("${b}", String(b))}$ : compact (1) ou pas (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Compact" : "Pas compact"}** — ${cas[2]}.` };
    } },
    { tier: "application", label: "Qui s'échappe ?", make: (r) => {
      const cas = pick(r, [["u_n = n", 0, "fuite vers l'infini : aucune sous-suite ne converge"], ["u_n = (-1)^n", 1, "deux valeurs d'adhérence : la sous-suite paire converge"], ["u_n = \\cos(n)", 1, "bornée dans un compact : BW extrait"]]);
      return { prompt: `La suite $${cas[0]}$ admet-elle une sous-suite convergente ? (1/0)`, answer: cas[1], solution: `**${cas[1] ? "Oui" : "Non"}** — ${cas[2]}.` };
    } },
    { tier: "challenge", label: "D'un seul tenant ?", make: (r) => {
      const cas = pick(r, [["\\mathbb{R}^2 \\setminus \\\\{(0,0)\\\\}", 1, "on contourne le trou"], ["\\mathbb{R} \\setminus \\\\{0\\\\}", 0, "le TVI interdit d'enjamber"], ["\\\\{(x,y) : xy > 0\\\\}", 0, "deux quadrants séparés par les axes"]]);
      return { prompt: `$${cas[0]}$ : connexe par arcs ? (1/0)`, answer: cas[1], solution: `**${cas[1] ? "Oui" : "Non"}** — ${cas[2]}.` };
    } },
  ],
};

// — Continuous linear maps (MP: topologie f + dimension finie) —
const continuiteLineaire = {
  id: "analysis.bachelor.continuite-lineaire",
  level: "bachelor", domain: "analysis",
  title: "Applications linéaires continues",
  tagline: "Applications linéaires continues : critère, norme d'opérateur, contre-exemple en dimension infinie.",
  prereqs: ["analysis.bachelor.normes-topologie", "algebra.bachelor.applications-lineaires"],
  intuition:
    "Surprise de la dimension infinie : une application **linéaire** peut être **discontinue** — la dérivation, oui, ta dérivation, est un monstre qui amplifie sans borne.\n\nLe critère qui départage tient en une inégalité : $\\|u(x)\\| \\leq C\\|x\\|$ — et la meilleure constante $C$ devient une norme sur les opérateurs eux-mêmes.",
  depths: {
    discovery:
      "**Avec les mains** : rencontre le monstre — sur les polynômes munis de $\\|\\cdot\\|_\\infty$ sur $[0, 1]$, prends la **dérivation** $D : P \\mapsto P'$ et nourris-la de $P_n = X^n$ : $\\|P_n\\|_\\infty = 1$ (sage), mais $\\|D(P_n)\\|_\\infty = \\|nX^{n-1}\\|_\\infty = n$ — l'opérateur **amplifie** par $n$ des entrées de taille $1$ : aucune constante $C$ ne tient, $D$ est linéaire et **discontinue**. La dérivation amplifie les hautes fréquences sans limite — ton intuition « linéaire donc gentil » vient de mourir, et c'est la leçon.",
    standard:
      "**En image** : photographie la **sphère unité** envoyée par $u$ — l'image est une patate (un ellipsoïde pour les matrices), et la **norme d'opérateur** $\\|u\\|_{\\text{op}} = \\sup_{\\|x\\| = 1} \\|u(x)\\|$ est le **rayon de la patate** : le pire facteur d'amplification de $u$, lu sur le dessin (big idea *Diagrams*) ; et l'inégalité fondamentale $\\|u(x)\\| \\leq \\|u\\|_{\\text{op}} \\|x\\|$ dit simplement : aucun vecteur n'est amplifié plus que le pire — big idea *Proportionality* : la continuité linéaire, c'est une amplification **proportionnée**.",
    advanced:
      "**Dans la tête** : le théorème-pivot — pour $u$ linéaire, sont équivalents : $u$ continue, $u$ continue en $0$, $u$ bornée sur la sphère unité, et l'existence de $C$ avec $\\|u(x)\\| \\leq C\\|x\\|$ pour tout $x$ (la linéarité ramène tout à l'origine : $u(x) - u(y) = u(x - y)$, donc continue $\\iff$ **lipschitzienne**). L'espace $\\mathcal{L}_c(E, F)$ des applications linéaires continues porte la **norme subordonnée**, qui est **sous-multiplicative** : $\\|v \\circ u\\|_{\\text{op}} \\leq \\|v\\|_{\\text{op}} \\|u\\|_{\\text{op}}$ — l'outil de toutes les estimations d'itérées ($\\|u^n\\| \\leq \\|u\\|^n$ : la porte des séries d'opérateurs et de l'exponentielle de matrice à venir). Et le soulagement final : **en dimension finie, toute application linéaire est continue** ($\\mathcal{L} = \\mathcal{L}_c$) — ainsi que toute application polynomiale ($\\det$, le produit matriciel) et multilinéaire : le monstre n'habite que la dimension infinie, mais savoir qu'il existe t'oblige désormais à vérifier où tu travailles.",
  },
  keyIdea: "$u$ linéaire : continue $\\iff$ continue en $0$ $\\iff$ $\\exists C,\\ \\|u(x)\\| \\leq C\\|x\\|$ $\\iff$ lipschitzienne. **Norme d'opérateur** $\\|u\\|_{\\text{op}} = \\sup_{\\|x\\|=1} \\|u(x)\\|$ : le pire facteur d'amplification (*Proportionality*), **sous-multiplicative** ($\\|u^n\\| \\leq \\|u\\|^n$). Dimension finie : tout est continu ($\\mathcal{L} = \\mathcal{L}_c$, polynomiales incluses) — la dérivation en dimension infinie est le contre-exemple à méditer.",
  why:
    "La norme d'opérateur est le **conditionnement** caché de tout le calcul numérique : elle borne l'amplification des erreurs par une matrice ($\\|Ax - Ay\\| \\leq \\|A\\|_{\\text{op}} \\|x - y\\|$ : une donnée bruitée ressort bruitée au facteur $\\|A\\|$ près), elle gouverne la convergence des méthodes itératives ($\\|A\\| < 1$ : les itérées contractent), et la sous-multiplicativité fera converger l'exponentielle de matrice du chapitre systèmes différentiels. Quant au monstre de la dérivation : il explique pourquoi dériver un signal **amplifie son bruit** — tout ingénieur qui filtre avant de dériver applique ce chapitre.",
  examples: [
    { title: "Le monstre de la dérivation", steps: [
      { p: "$\\|X^n\\|_\\infty = 1$ sur $[0,1]$, mais $\\|(X^n)'\\|_\\infty = n$ : amplification sans borne." },
      { p: "Linéaire et discontinue — la dimension infinie autorise les monstres." },
    ] },
    { title: "L'amplification proportionnée", steps: [
      { p: "$\\|u(x)\\| \\leq \\|u\\|_{\\text{op}} \\|x\\|$ : personne n'est amplifié plus que le pire cas." },
      { p: "Et $\\|u^n\\| \\leq \\|u\\|^n$ : si $\\|u\\| < 1$, les itérées s'éteignent — la clef des séries d'opérateurs." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur $\\mathbb{R}^2$ muni de $\\|\\cdot\\|_\\infty$, soit $u(x, y) = (x + y, 2y)$. Établis $\\|u(v)\\|_\\infty \\leq 2\\|v\\|_\\infty$ pour tout $v$, puis trouve un vecteur unitaire qui réalise l'égalité. Que vaut $\\|u\\|_{\\text{op}}$ ?", solution: "$|x + y| \\leq |x| + |y| \\leq 2\\max(|x|, |y|)$ et $|2y| \\leq 2\\max$ : donc $\\|u(v)\\|_\\infty \\leq 2\\|v\\|_\\infty$ ✓. Témoin : $v = (1, 1)$ (unitaire pour $\\|\\cdot\\|_\\infty$) — $u(v) = (2, 2)$, de norme $2$ : égalité ✓. Conclusion $\\|u\\|_{\\text{op}} = 2$ — la méthode-type en deux temps : **majorer** (pour tous), puis **témoigner** (un vecteur qui sature) : sans le témoin, tu n'as qu'une borne ; avec, tu as la norme." },
    { tier: "warmup", prompt: "Montre l'équivalence : $u$ linéaire est continue sur $E$ $\\iff$ $u$ est continue en $0$. (Une implication est triviale ; pour l'autre, utilise $u(x) - u(a) = u(x - a)$.)", solution: "($\\Rightarrow$) immédiat. ($\\Leftarrow$) Soit $a \\in E$ et $(x_n) \\to a$ : alors $x_n - a \\to 0$, et la continuité en $0$ donne $u(x_n - a) \\to u(0) = 0$ — or $u(x_n) - u(a) = u(x_n - a)$ par **linéarité** : donc $u(x_n) \\to u(a)$ ■. La linéarité **téléporte** la continuité : un seul point à vérifier (l'origine), et tout l'espace suit — c'est elle aussi qui rend continue $\\iff$ lipschitzienne : les applications linéaires ne connaissent pas les demi-mesures." },
    { tier: "application", prompt: "Sur $\\mathcal{C}([0,1])$ muni de $\\|\\cdot\\|_\\infty$, l'application $\\varphi(f) = \\int_0^1 f(t)\\,dt$ est une forme linéaire. Montre qu'elle est continue et calcule $\\|\\varphi\\|_{\\text{op}}$ — puis compare au monstre de la dérivation : pourquoi intégrer est-il « gentil » quand dériver est « monstrueux » ?", solution: "$|\\varphi(f)| = \\left|\\int_0^1 f\\right| \\leq \\int_0^1 |f| \\leq \\|f\\|_\\infty$ : continue avec $C = 1$ ✓ ; témoin : $f = 1$ (constante, $\\|f\\|_\\infty = 1$) donne $\\varphi(f) = 1$ — $\\|\\varphi\\|_{\\text{op}} = 1$ ■. Le contraste : intégrer **moyenne** (les oscillations se compensent, rien ne s'amplifie), dériver **mesure les variations** (les oscillations rapides explosent : $\\sin(nx)$ est borné, sa dérivée vaut $n\\cos(nx)$) — moralité d'analyste : l'intégration lisse et régularise, la dérivation rugit et amplifie ; toute la théorie du signal vit sur ce déséquilibre." },
    { tier: "challenge", prompt: "Soit $A$ une matrice avec $\\|A\\|_{\\text{op}} = k < 1$. Montre que $\\|A^n x\\| \\leq k^n \\|x\\|$ pour tout $x$, et conclus que $A^n x \\to 0$ pour tout vecteur. Quel mot du chapitre fait tout le travail ?", solution: "Sous-multiplicativité itérée : $\\|A^n\\|_{\\text{op}} \\leq \\|A\\|_{\\text{op}}^n = k^n$, donc $\\|A^n x\\| \\leq k^n \\|x\\| \\to 0$ (géométrique de raison $< 1$) ■ — toute trajectoire $x, Ax, A^2x, \\ldots$ **spirale vers l'origine**. Le mot : **sous-multiplicativité** — une seule inégalité structurelle, et la dynamique entière est jugée. C'est le squelette des théorèmes de point fixe, des chaînes de Markov qui convergent, et de la stabilité des systèmes différentiels du chapitre à venir : $\\|A\\| < 1$, et le système oublie sa condition initiale." },
    { tier: "exam", prompt: "Sur $\\mathbb{R}^n$ muni de $\\|\\cdot\\|_\\infty$, soit $A = (a_{ij})$ une matrice carrée. (1) Montre que pour tout $x$ : $\\|Ax\\|_\\infty \\leq \\left(\\max_i \\sum_j |a_{ij}|\\right) \\|x\\|_\\infty$. (2) Construis un vecteur $x$ de coordonnées $\\pm 1$ qui réalise l'égalité pour la ligne maximale. (3) Conclus : $\\|A\\|_{\\text{op}, \\infty} = \\max_i \\sum_j |a_{ij}|$ (le max des sommes de lignes en valeur absolue). (4) Calcule cette norme pour $A = \\begin{pmatrix} 1 & -2 \\\\ 3 & 1 \\end{pmatrix}$, et vérifie sur le témoin.", solution: "(1) $|(Ax)_i| = \\left|\\sum_j a_{ij} x_j\\right| \\leq \\sum_j |a_{ij}| |x_j| \\leq \\left(\\sum_j |a_{ij}|\\right) \\|x\\|_\\infty$ — prends le max sur $i$ ■. (2) Soit $i_0$ la ligne de somme maximale : pose $x_j = \\text{signe}(a_{i_0 j})$ (et $1$ si nul) — alors $(Ax)_{i_0} = \\sum_j a_{i_0 j}\\,\\text{signe}(a_{i_0 j}) = \\sum_j |a_{i_0 j}|$ : la ligne paie plein tarif, et $\\|x\\|_\\infty = 1$ ✓. (3) Majoration (1) + témoin (2) : la borne est atteinte — **égalité** ■ : la norme subordonnée à l'infini se **lit** sur la matrice. (4) Sommes de lignes : $|1| + |-2| = 3$ et $|3| + |1| = 4$ — $\\|A\\|_{\\text{op}} = 4$ ; témoin pour la ligne $2$ : $x = (1, 1)$, $Ax = (-1, 4)$, $\\|Ax\\|_\\infty = 4$ ✓ — une formule fermée pour une norme d'opérateur : rare et précieuse (sa jumelle $\\|\\cdot\\|_{\\text{op}, 1}$ lit les colonnes — et la norme deux, elle, attendra le théorème spectral : c'est la plus grande valeur singulière)." },
  ],
  practice: [
    { tier: "warmup", label: "Le pire facteur", make: (r) => {
      const a = randint(r, 2, 5);
      return { prompt: `$u(x, y) = (${a}x, y)$ sur $(\\mathbb{R}^2, \\|\\cdot\\|_\\infty)$ : $\\|u\\|_{\\text{op}}$ ?`, answer: a, solution: `Le pire axe est dilaté par $${a}$ — témoin $(1, 0)$ : $\\|u\\|_{\\text{op}} = ${a}$.` };
    } },
    { tier: "application", label: "Lignes en valeur absolue", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const c = randint(r, 1, 3); const d = randint(r, 1, 3);
      const ans = Math.max(a + b, c + d);
      return { prompt: `$A = \\begin{pmatrix} ${a} & -${b} \\\\ ${c} & ${d} \\end{pmatrix}$ : $\\|A\\|_{\\text{op}, \\infty}$ (max des sommes de lignes) ?`, answer: ans, solution: `$\\max(${a + b}, ${c + d}) = ${ans}$.` };
    } },
    { tier: "challenge", label: "Les itérées jugées", make: (r) => {
      const k = pick(r, [[0.5, 1, "raison < 1 : extinction"], [2, 0, "raison > 1 : la borne explose"]]);
      return { prompt: `$\\|A\\|_{\\text{op}} = ${k[0]}$ : peut-on garantir $A^n x \\to 0$ pour tout $x$ ? (1/0)`, answer: k[1], solution: `**${k[1] ? "Oui" : "Non"}** — $\\|A^n x\\| \\leq ${k[0]}^n \\|x\\|$ : ${k[2]}.` };
    } },
  ],
};

export default [normesTopologie, compaciteConnexite, continuiteLineaire];
