// Field "Algebra/Probability/Geometry" — BACHELOR module (l1 year).
// Official MPSI/MP2I programme (arrêté 2021), chapters "Groupe symétrique
// et déterminants" (permutations, cycles, transpositions, signature;
// n-linear alternating forms, determinant of a family/endomorphism/matrix,
// det(AB) = det(A)det(B), invertibility criterion, cofactor expansion,
// elementary operations, Vandermonde), "Dénombrement" + "Probabilités"
// (finite sample spaces, conditional probability: compound/total/Bayes,
// independence, random variables, joint and marginal laws, expectation
// with transfer formula, variance, covariance, Markov and
// Bienaymé-Tchebychev, weak law of large numbers non-asymptotically) and
// "Espaces préhilbertiens réels" (general inner products incl. integral
// ones, Cauchy-Schwarz, norms, orthogonality, Gram-Schmidt, orthonormal
// bases, orthogonal projection as best approximation, distance to a
// subspace, orthogonal polynomials as illustration). Singapore method:
// Concrete = the flattening parallelogram, the 36-cell dice table, the
// integral of cos·sin; Pictorial = oriented area, the weighted tree and
// joint-law table, the shadow/foot-of-perpendicular drawing; Abstract =
// the unique alternating form, (Ω, P) with concentration inequalities,
// Cauchy-Schwarz proved by a trinomial. Big ideas named; exam =
// colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Symmetric group and determinants (MPSI: groupe symétrique et déterminants) —
const determinants = {
  id: "algebra.bachelor.determinants",
  level: "bachelor", domain: "algebra",
  title: "Déterminants",
  tagline: "Un seul nombre dit si ta matrice écrase l'espace — et de combien elle dilate les volumes.",
  prereqs: ["algebra.bachelor.matrices-representations"],
  intuition:
    "Deux vecteurs du plan dessinent un parallélogramme ; son **aire orientée** vaut $ad - bc$ — le déterminant que tu connais.\n\nCette année, la formule devient théorie : le déterminant est l'unique façon de **mesurer les volumes orientés** en dimension $n$, et il répond d'un seul nombre à la grande question : ma matrice est-elle inversible, ou écrase-t-elle l'espace ?",
  depths: {
    discovery:
      "**Avec les mains** : prends $u = (3, 1)$ et $v = (1, 2)$ — le parallélogramme qu'ils dessinent a pour aire $3 \\times 2 - 1 \\times 1 = 5$. Échange $u$ et $v$ : $1 \\times 1 - 2 \\times 3 = -5$ — même aire, **orientation** renversée (le signe mémorise le sens de parcours). Maintenant écrase : $v = (6, 2) = 2u$ — aire $3 \\times 2 - 1 \\times 6 = 0$ : le parallélogramme s'est **aplati** en un segment. Trois calculs, trois leçons : le déterminant mesure, oriente, et détecte l'écrasement.",
    standard:
      "**En image** : le dessin du chapitre — le parallélogramme (le parallélépipède en dimension $3$) qui se **déforme** quand on bouge les colonnes : doubler une colonne double le volume (linéarité en chaque colonne), échanger deux colonnes retourne l'orientation (le signe bascule), et dès qu'une colonne devient combinaison des autres, le volume **s'aplatit** à zéro — famille liée $\\iff$ volume nul $\\iff$ déterminant nul. Big idea *Measures* : $\\det$ est la mesure des volumes orientés — et c'est pour préparer le signe des échanges que le chapitre s'ouvre sur le **groupe symétrique** $S_n$ : toute permutation se décompose en cycles à supports disjoints, tout cycle en transpositions, et la **signature** $\\varepsilon(\\sigma) = \\pm 1$ (l'unique morphisme de $S_n$ vers $\\{-1, 1\\}$ envoyant les transpositions sur $-1$) compte la parité des échanges.",
    advanced:
      "**Dans la tête** : sur un espace de dimension $n$, une forme $n$-linéaire **alternée** qui vaut $1$ sur une base $e$ est **unique** — c'est $\\det_e$, et toute autre forme alternée en est un multiple (*Invariance* : il n'y a qu'une seule façon de mesurer les volumes, à l'échelle près). Les théorèmes en cascade : $(x_1, \\ldots, x_n)$ est une base $\\iff \\det_e(x_1, \\ldots, x_n) \\neq 0$ ; pour les matrices, $\\det(AB) = \\det(A)\\det(B)$ (le morphisme vers $\\mathbb{K}^*$ : composer les transformations multiplie les facteurs de dilatation), $\\det(A^\\top) = \\det(A)$ (lignes et colonnes jouent le même jeu), $\\det(\\lambda A) = \\lambda^n \\det A$ (chaque colonne porte son facteur), et $A$ inversible $\\iff \\det A \\neq 0$. Côté calcul : développement par **cofacteurs** le long d'une ligne ou colonne, matrices triangulaires (produit des termes diagonaux), et les **opérations élémentaires** du pivot : $L_i \\leftarrow L_i + \\lambda L_j$ ne change rien, l'échange change le signe, la dilatation sort le facteur — ton pivot calcule aussi les déterminants. Joyau final : le **Vandermonde** $\\prod_{i < j}(a_j - a_i)$, non nul dès que les $a_i$ sont distincts — l'unicité du polynôme interpolateur de Lagrange, revue en un déterminant.",
  },
  keyIdea: "Le déterminant est l'**unique** forme $n$-linéaire alternée valant $1$ sur la base (*Invariance*) : il mesure le **volume orienté** (*Measures*). Verdicts : base $\\iff \\det \\neq 0$, $A$ inversible $\\iff \\det A \\neq 0$. Lois : $\\det(AB) = \\det A \\det B$, $\\det(\\lambda A) = \\lambda^n \\det A$, $\\det A^\\top = \\det A$. Calcul : cofacteurs, triangulaires, pivot ($L_i + \\lambda L_j$ gratuit, échange $= -1$, dilatation sort).",
  why:
    "Un nombre qui décide de l'inversibilité, c'est un test universel : le jacobien des changements de variables (L2) sera un déterminant — la dilatation locale des volumes par une transformation ; le polynôme caractéristique de la réduction (L2) naîtra de $\\det(A - \\lambda I)$ ; et la signature de $S_n$ resurgira partout où l'ordre des objets compte, du produit vectoriel aux formes différentielles. En infographie, chaque matrice de transformation 3D passe ce test : déterminant nul, l'image s'aplatit ; négatif, elle passe en miroir.",
  examples: [
    { title: "Le parallélogramme qui s'aplatit", steps: [
      { p: "$u = (3, 1)$, $v = (1, 2)$ : aire $3 \\times 2 - 1 \\times 1 = 5$ ; échange : $-5$ (orientation)." },
      { p: "$v = 2u$ : aire $0$ — liée $\\iff$ aplati $\\iff$ déterminant nul." },
    ] },
    { title: "Le pivot calcule aussi", steps: [
      { p: "$L_2 \\leftarrow L_2 - 2L_1$ : déterminant inchangé ; on triangularise." },
      { p: "Triangulaire : produit des diagonaux — le pivot rend tout déterminant lisible." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décompose la permutation $\\sigma = (1\\,2\\,3)(4\\,5)$ de $S_5$ en transpositions et donne sa signature. Rappel : un cycle de longueur $p$ se casse en $p - 1$ transpositions.", solution: "$(1\\,2\\,3) = (1\\,3)(1\\,2)$ : deux transpositions ; $(4\\,5)$ en est une — total **trois** transpositions : $\\varepsilon(\\sigma) = (-1)^3 = -1$, permutation **impaire**. La décomposition en transpositions n'est pas unique, mais la **parité** du nombre de transpositions l'est — c'est tout le contenu du théorème de la signature, et la raison pour laquelle le déterminant peut exister." },
    { tier: "warmup", prompt: "Calcule $\\det \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 3 & 5 \\\\ 0 & 0 & 4 \\end{pmatrix}$, puis $\\det(2A)$ pour cette matrice $A$, puis $\\det(A^{10})$. Trois réponses, zéro développement.", solution: "Triangulaire : $\\det A = 2 \\times 3 \\times 4 = 24$. $\\det(2A) = 2^3 \\det A = 192$ (chaque **colonne** porte son facteur $2$ — l'erreur classique est d'écrire $2 \\times 24$). $\\det(A^{10}) = (\\det A)^{10} = 24^{10}$ par le morphisme $\\det(AB) = \\det A \\det B$ itéré. Les lois structurelles évitent tout calcul — les connaître, c'est gagner dix minutes par colle." },
    { tier: "application", prompt: "Par opérations élémentaires (pivot), calcule $\\det \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 5 & 8 \\\\ 1 & 3 & 6 \\end{pmatrix}$ en notant l'effet de chaque opération.", solution: "$L_2 \\leftarrow L_2 - 2L_1$ et $L_3 \\leftarrow L_3 - L_1$ (gratuits) : $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 1 & 3 \\end{pmatrix}$ ; puis $L_3 \\leftarrow L_3 - L_2$ (gratuit) : triangulaire de diagonale $1, 1, 1$ — $\\det = 1$ ■ : la matrice est **inversible** (et de déterminant $1$ : elle préserve les volumes — orientation comprise). Le pivot de ton chapitre matrices fait double emploi : il résout les systèmes ET calcule les déterminants, en tenant la comptabilité des échanges et dilatations." },
    { tier: "challenge", prompt: "Sans le développer, montre que $\\det \\begin{pmatrix} 1 & 1 & 1 \\\\ a & b & c \\\\ b + c & a + c & a + b \\end{pmatrix} = 0$ pour tous $a, b, c$. Cherche une combinaison de lignes.", solution: "$L_2 + L_3 = (a + b + c)(1, 1, 1) = (a + b + c)\\,L_1$ : la famille des lignes est **liée** — déterminant **nul**, quel que soit le triplet ■. Le réflexe expert : avant tout cofacteur, chercher une relation entre lignes ou colonnes — un volume dont un côté est combinaison des autres est un volume aplati, et le voir économise tout le calcul (big idea *Diagrams* : lire la dépendance, pas développer)." },
    { tier: "exam", prompt: "Soit $V = \\det \\begin{pmatrix} 1 & 1 & 1 \\\\ a & b & c \\\\ a^2 & b^2 & c^2 \\end{pmatrix}$ (Vandermonde d'ordre 3). (1) Par opérations sur les colonnes ($C_2 \\leftarrow C_2 - C_1$, $C_3 \\leftarrow C_3 - C_1$) puis factorisation et développement, montre que $V = (b - a)(c - a)(c - b)$. (2) À quelle condition $V \\neq 0$ ? (3) Relie ce résultat à l'interpolation : pourquoi existe-t-il un unique polynôme de degré $\\leq 2$ passant par trois points d'abscisses distinctes $a, b, c$ ? (4) Quel chapitre de ton année venait de promettre ce théorème ?", solution: "(1) Colonnes corrigées : $C_2 - C_1 = (0, b - a, b^2 - a^2)$, $C_3 - C_1 = (0, c - a, c^2 - a^2)$ ; développe le long de la première ligne : $V = \\det \\begin{pmatrix} b - a & c - a \\\\ (b-a)(b+a) & (c-a)(c+a) \\end{pmatrix} = (b - a)(c - a) \\det \\begin{pmatrix} 1 & 1 \\\\ b + a & c + a \\end{pmatrix} = (b - a)(c - a)(c - b)$ ■. (2) $V \\neq 0 \\iff a, b, c$ **deux à deux distincts**. (3) Chercher $P = \\alpha + \\beta X + \\gamma X^2$ passant par trois points, c'est résoudre un système linéaire dont la matrice est la **transposée** du Vandermonde : abscisses distinctes $\\Rightarrow \\det \\neq 0 \\Rightarrow$ solution **unique** — existence et unicité d'un coup. (4) Le chapitre polynômes : l'interpolation de **Lagrange** — qui construisait la solution explicitement ; le déterminant en redémontre l'unicité par un seul nombre. Deux chapitres, un théorème : l'algèbre linéaire tient ses promesses." },
  ],
  practice: [
    { tier: "warmup", label: "Aire orientée 2×2", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 1, 4); const c = randint(r, 1, 4); const d = randint(r, 1, 5);
      return { prompt: `$\\det \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ ?`, answer: a * d - b * c, solution: `$${a} \\times ${d} - ${b} \\times ${c} = ${a * d - b * c}$ — l'aire orientée.` };
    } },
    { tier: "application", label: "Triangulaire express", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const c = randint(r, 1, 4);
      return { prompt: `Matrice triangulaire de diagonale $${a}, ${b}, ${c}$ : déterminant ?`, answer: a * b * c, solution: `Produit des diagonaux : $${a * b * c}$.` };
    } },
    { tier: "challenge", label: "Les lois structurelles", make: (r) => {
      const d = randint(r, 2, 5); const lam = randint(r, 2, 3); const n = 3;
      return { prompt: `$A$ de taille $3$ avec $\\det A = ${d}$ : que vaut $\\det(${lam}A)$ ?`, answer: Math.pow(lam, n) * d, solution: `$${lam}^3 \\times ${d} = ${Math.pow(lam, n) * d}$ — chaque colonne porte son facteur.` };
    } },
  ],
};

// — Finite probability spaces (MPSI: dénombrement + probabilités) —
const probabilitesFinies = {
  id: "probability.bachelor.probabilites-finies",
  level: "bachelor", domain: "probability",
  title: "Probabilités sur un univers fini",
  tagline: "Le hasard du lycée passe à l'axiome — et gagne ses premières inégalités de concentration.",
  prereqs: ["probability.high.variables-aleatoires", "discrete.high.combinaisons"],
  intuition:
    "Au lycée, le hasard vivait dans les arbres pondérés ; ici on le formalise : un univers fini $\\Omega$, une probabilité $P$ — masse totale $1$ répartie sur les issues — et des **variables aléatoires** qui en extraient des nombres.\n\nLe gain est immédiat : des théorèmes généraux (Bayes, transfert, Bienaymé-Tchebychev) remplacent les recomptages, et la fréquence observée devient un théorème.",
  depths: {
    discovery:
      "**Avec les mains** : deux dés — l'univers est le tableau des $36$ couples, **explicite**, chaque case pesant $\\frac{1}{36}$. La variable $S = $ somme des dés s'y lit case par case : $P(S = 7) = \\frac{6}{36} = \\frac{1}{6}$ (la diagonale la plus longue), $P(S = 12) = \\frac{1}{36}$ (un coin). Tout le chapitre tient dans ce tableau : l'univers porte l'aléa, la variable le **résume** en nombres, et compter des cases équiprobables — ton dénombrement : listes, permutations, combinaisons $\\binom{n}{p}$ — calcule les lois.",
    standard:
      "**En image** : deux dessins structurent le conditionnement — l'**arbre pondéré** du lycée, dont les règles deviennent théorèmes : multiplier le long d'une branche (probabilités **composées**), sommer les branches arrivant au même événement (probabilités **totales** sur un système complet), et **remonter** l'arbre à contre-sens — la formule de **Bayes** $P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}$, qui échange cause et conséquence ; et le **tableau de loi conjointe** d'un couple $(X, Y)$ : les lois **marginales** se lisent en sommant lignes et colonnes (dans la marge du tableau, littéralement), et l'**indépendance** $P(X = x, Y = y) = P(X = x)P(Y = y)$ se voit : chaque case est le produit de ses marges. Big idea *Measures* : $P$ est une mesure de masse totale $1$ — conditionner, c'est remettre à l'échelle la masse de $B$.",
    advanced:
      "**Dans la tête** : l'**espérance** $E(X) = \\sum_x x\\,P(X = x)$ — le barycentre de la loi — est **linéaire** ($E(X + Y) = E(X) + E(Y)$, toujours, sans indépendance : l'outil le plus sous-coté du chapitre), et la **formule de transfert** $E(f(X)) = \\sum_x f(x)P(X = x)$ évite de calculer la loi de $f(X)$. La **variance** $V(X) = E(X^2) - E(X)^2$ mesure l'étalement ($V(aX + b) = a^2 V(X)$ : décaler ne disperse pas), la **covariance** détecte la liaison — indépendantes $\\Rightarrow E(XY) = E(X)E(Y) \\Rightarrow$ décorrélées (réciproque fausse !), et la variance d'une somme de variables décorrélées **s'additionne**. Lois au programme : uniforme, Bernoulli $\\mathcal{B}(p)$ ($E = p$, $V = p(1-p)$), binomiale $\\mathcal{B}(n, p)$ = somme de $n$ Bernoulli indépendantes ($E = np$, $V = np(1-p)$ — la linéarité et l'additivité en deux lignes là où le lycée suait). Sommet du chapitre, les **inégalités de concentration** : **Markov** $P(X \\geq a) \\leq \\frac{E(X)}{a}$ (pour $X \\geq 0$), puis **Bienaymé-Tchebychev** $P(|X - E(X)| \\geq a) \\leq \\frac{V(X)}{a^2}$ — appliquée à une moyenne de $n$ variables indépendantes de même loi, elle borne $P\\left(\\left|\\frac{S_n}{n} - p\\right| \\geq \\varepsilon\\right) \\leq \\frac{V}{n\\varepsilon^2} \\to 0$ : la fréquence observée converge vers la probabilité — la **loi faible des grands nombres**, non asymptotique : l'approche fréquentiste du lycée, enfin démontrée.",
  },
  keyIdea: "Espace probabilisé fini $(\\Omega, P)$ : masse $1$ répartie (*Measures*). Arbre = composées, totales, **Bayes** (remonter) ; tableau conjoint = marginales en marge, indépendance = cases produits. **Espérance linéaire** (toujours !), transfert $E(f(X)) = \\sum f(x)P(X = x)$, variance $E(X^2) - E(X)^2$, somme décorrélée additive. **Markov** puis **Bienaymé-Tchebychev** $P(|X - E(X)| \\geq a) \\leq \\frac{V(X)}{a^2}$ : la fréquence converge — loi faible démontrée.",
  why:
    "Formaliser le hasard, c'est pouvoir le borner : Bienaymé-Tchebychev dit combien de lancers garantissent une fréquence fiable — le cœur de tout sondage, de tout test statistique, de toute estimation Monte-Carlo ; Bayes est l'algorithme des diagnostics médicaux et des filtres anti-spam (remonter du symptôme à la cause) ; et tes marches aléatoires, permutations aléatoires et graphes aléatoires sont le pain quotidien de l'analyse d'algorithmes. Le L2 ouvrira l'univers à l'infini dénombrable — les familles sommables t'y attendent déjà.",
  examples: [
    { title: "Bayes remonte l'arbre", steps: [
      { p: "Test fiable à $99\\,\\%$, maladie à $1\\,\\%$ : $P(M \\mid +) = \\frac{0{,}99 \\times 0{,}01}{0{,}99 \\times 0{,}01 + 0{,}01 \\times 0{,}99} = 0{,}5$." },
      { p: "Test positif : une chance sur deux — l'intuition échoue, l'arbre remonté tranche." },
    ] },
    { title: "La binomiale en deux lignes", steps: [
      { p: "$X = X_1 + \\cdots + X_n$, Bernoulli indépendantes : $E(X) = np$ (linéarité)." },
      { p: "$V(X) = np(1 - p)$ (variances qui s'additionnent) — zéro somme binomiale calculée." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Deux dés équilibrés. Dresse (mentalement) le tableau des $36$ issues et calcule $P(S = 8)$, $P(\\max = 4)$ et $P(S = 8 \\mid \\max = 4)$ où $S$ est la somme.", solution: "$S = 8$ : les couples $(2,6), (3,5), (4,4), (5,3), (6,2)$ — $P = \\frac{5}{36}$. $\\max = 4$ : les couples où le plus grand vaut $4$ : $(4, 1..4)$ et $(1..3, 4)$ — $7$ cases, $P = \\frac{7}{36}$. Conditionnelle : parmi ces $7$ cases, $S = 8$ exige $(4, 4)$ — $P(S = 8 \\mid \\max = 4) = \\frac{1}{7}$ : conditionner, c'est **rétrécir l'univers** aux cases de l'événement connu et remettre la masse à l'échelle." },
    { tier: "warmup", prompt: "Une urne : $3$ rouges, $2$ noires. Deux tirages sans remise. Par l'arbre : $P(\\text{deux rouges})$, puis $P(\\text{rouge au 2}^{\\text{e}})$ — surprise au rendez-vous.", solution: "Composées le long de la branche : $P(R_1 \\cap R_2) = \\frac{3}{5} \\times \\frac{2}{4} = \\frac{3}{10}$. Totales sur le premier tirage : $P(R_2) = \\frac{3}{5} \\times \\frac{2}{4} + \\frac{2}{5} \\times \\frac{3}{4} = \\frac{3}{10} + \\frac{3}{10} = \\frac{3}{5}$ — **identique** à $P(R_1)$ ! Sans information sur le premier tirage, le second est « comme le premier » (symétrie des tirages) : l'arbre démontre ce que l'intuition n'osait pas affirmer." },
    { tier: "application", prompt: "$X$ uniforme sur $\\{1, 2, 3, 4, 5, 6\\}$ (un dé). Par la formule de transfert, calcule $E(X^2)$ puis $V(X)$. Pourquoi le transfert t'évite-t-il un calcul de loi ?", solution: "Transfert : $E(X^2) = \\sum_{k=1}^{6} k^2 \\cdot \\frac{1}{6} = \\frac{91}{6}$. $E(X) = \\frac{7}{2}$, donc $V(X) = \\frac{91}{6} - \\frac{49}{4} = \\frac{182 - 147}{12} = \\frac{35}{12} \\approx 2{,}92$. Sans transfert, il aurait fallu déterminer la **loi** de $X^2$ (valeurs $1, 4, 9, \\ldots$, probabilités associées) puis sommer — le transfert court-circuite : on somme $f(x)$ contre la loi de $X$, point. C'est l'outil de calcul numéro un du chapitre." },
    { tier: "challenge", prompt: "On lance $n = 100$ fois une pièce équilibrée ; $F = \\frac{S_n}{100}$ est la fréquence de pile. Par Bienaymé-Tchebychev, borne $P(|F - 0{,}5| \\geq 0{,}1)$. Combien de lancers pour garantir cette borne sous $1\\,\\%$ ?", solution: "$S_n \\sim \\mathcal{B}(100, \\frac{1}{2})$ : $E(F) = \\frac{1}{2}$, $V(F) = \\frac{V(S_n)}{100^2} = \\frac{25}{10000} = \\frac{1}{400}$. Tchebychev : $P(|F - 0{,}5| \\geq 0{,}1) \\leq \\frac{1/400}{0{,}01} = \\frac{1}{4}$. Pour passer sous $1\\,\\%$ : $\\frac{1/(4n)}{0{,}01} \\leq 0{,}01 \\iff n \\geq 2500$ — la précision coûte **quadratiquement** : diviser l'incertitude par $5$ multiplie les lancers par $25$. Voilà la loi faible **non asymptotique** : pas seulement « ça converge », mais « combien d'essais pour quelle garantie » — le contrat de tout sondage." },
    { tier: "exam", prompt: "Marche aléatoire sur $\\{0, 1, 2, 3\\}$ : départ en $1$ ; à chaque pas, $+1$ ou $-1$ équiprobables ; les bords $0$ et $3$ sont absorbants. Soit $A$ = « absorption en $3$ ». (1) Par l'arbre sur deux pas, calcule la probabilité d'être absorbé (en $0$ ou $3$) en au plus $2$ pas. (2) Note $p_1 = P(A \\mid \\text{départ en } 1)$ et $p_2 = P(A \\mid \\text{départ en } 2)$ : justifie par les probabilités totales le système $p_1 = \\frac{1}{2} p_2$ et $p_2 = \\frac{1}{2} + \\frac{1}{2} p_1$. (3) Résous et interprète la valeur de $p_1$. (4) Sans calcul : que vaudrait $p_1$ si le départ était au milieu d'un segment symétrique ? Pourquoi ?", solution: "(1) Depuis $1$ : pas 1 vers $0$ (absorbé, $\\frac{1}{2}$) ou vers $2$ ; depuis $2$ : vers $3$ (absorbé) ou vers $1$ — absorbé en $\\leq 2$ pas : $\\frac{1}{2} + \\frac{1}{2} \\times \\frac{1}{2} = \\frac{3}{4}$. (2) Conditionner sur le **premier pas** (système complet) : de $1$, soit $0$ (perdu, contribution nulle à $A$), soit $2$ — $p_1 = \\frac{1}{2} \\cdot 0 + \\frac{1}{2} p_2$ ; de $2$ : soit $3$ (gagné), soit $1$ — $p_2 = \\frac{1}{2} \\cdot 1 + \\frac{1}{2} p_1$ ■. (3) Substitution : $p_1 = \\frac{1}{2}\\left(\\frac{1}{2} + \\frac{1}{2} p_1\\right) \\iff \\frac{3}{4} p_1 = \\frac{1}{4} \\iff p_1 = \\frac{1}{3}$ — parti de $1$, à un pas du gouffre et deux du sommet : une chance sur trois, **proportionnelle à la position** ($p_2 = \\frac{2}{3}$ en écho). (4) Au milieu exact : $\\frac{1}{2}$ par **symétrie** — l'argument d'invariance dispense de tout système. La méthode (conditionner sur le premier pas, résoudre le système) est LE schéma des chaînes de Markov : tu viens d'en résoudre une." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les cases", make: (r) => {
      const s = randint(r, 3, 11);
      const count = s <= 7 ? s - 1 : 13 - s;
      return { prompt: `Deux dés : combien de couples donnent une somme de $${s}$ ?`, answer: count, solution: `Sur le tableau des $36$ : **${count}** cases (la diagonale $S = ${s}$).` };
    } },
    { tier: "application", label: "Binomiale en deux lignes", make: (r) => {
      const n = pick(r, [10, 20, 50, 100]); const pnum = pick(r, [[1, 2], [1, 4], [1, 5]]);
      const e = n * pnum[0] / pnum[1];
      return { prompt: `$X \\sim \\mathcal{B}(${n}, \\frac{${pnum[0]}}{${pnum[1]}})$ : $E(X)$ ? (décimale acceptée)`, answer: e, solution: `$np = ${n} \\times \\frac{${pnum[0]}}{${pnum[1]}} = ${e}$ — linéarité, zéro somme.` };
    } },
    { tier: "challenge", label: "Tchebychev borne", make: (r) => {
      const v = pick(r, [1, 2, 4]); const a = pick(r, [2, 4]);
      return { prompt: `$V(X) = ${v}$ : Bienaymé-Tchebychev borne $P(|X - E(X)| \\geq ${a})$ par ? (décimale)`, answer: v / (a * a), solution: `$\\frac{V}{a^2} = \\frac{${v}}{${a * a}} = ${v / (a * a)}$.` };
    } },
  ],
};

// — Real pre-Hilbert spaces (MPSI: espaces préhilbertiens réels) —
const prehilbertiens = {
  id: "geometry.bachelor.prehilbertiens",
  level: "bachelor", domain: "geometry",
  title: "Espaces préhilbertiens réels",
  tagline: "Angles et distances pour des polynômes et des signaux — l'intuition du plan, exportée partout.",
  prereqs: ["geometry.high.produit-scalaire", "algebra.bachelor.espaces-vectoriels"],
  intuition:
    "Ton produit scalaire du lycée mesurait angles et longueurs entre flèches. Axiomatise-le — bilinéaire, symétrique, défini positif — et il s'installe **partout** : sur $\\mathbb{R}^n$, sur les matrices, sur les fonctions avec $\\langle f, g \\rangle = \\int f g$.\n\nD'un coup, des polynômes sont **orthogonaux**, un signal a une **norme**, et « le point le plus proche » devient un théorème de projection.",
  depths: {
    discovery:
      "**Avec les mains** : calcule $\\langle \\cos, \\sin \\rangle = \\int_0^{2\\pi} \\cos t \\sin t\\,dt = \\left[\\frac{\\sin^2 t}{2}\\right]_0^{2\\pi} = 0$ — les fonctions $\\cos$ et $\\sin$ sont **orthogonales** : deux signaux qui ne se voient pas, exactement comme deux flèches perpendiculaires. Mesure aussi $\\|\\cos\\|^2 = \\int_0^{2\\pi} \\cos^2 = \\pi$ : une « longueur » de fonction. Mêmes axiomes, mêmes formules, nouveau monde — l'intuition de $\\mathbb{R}^2$ vient d'être exportée dans l'espace des signaux.",
    standard:
      "**En image** : le dessin qui porte le chapitre — l'**ombre portée**. Projeter $x$ orthogonalement sur un sous-espace $F$, c'est lâcher la perpendiculaire : le pied $p(x)$ est l'**unique** point de $F$ le plus proche de $x$, et $x - p(x)$ est orthogonal à tout $F$ — la distance $d(x, F) = \\|x - p(x)\\|$ se lit sur la figure, Pythagore la calcule. Sur une base orthonormée $(e_1, \\ldots, e_p)$ de $F$, l'ombre se **décompose coordonnée par coordonnée** : $p(x) = \\sum \\langle x, e_i \\rangle\\,e_i$ — chaque axe reçoit sa part, indépendamment des autres. Big idea *Diagrams* : tout théorème du chapitre est d'abord ce dessin du triangle rectangle — fait dans le plan, valable pour des polynômes.",
    advanced:
      "**Dans la tête** : un **produit scalaire** est une forme bilinéaire symétrique définie positive ; il fabrique la norme $\\|x\\| = \\sqrt{\\langle x, x \\rangle}$ et la distance. Pierre angulaire : **Cauchy-Schwarz** $|\\langle x, y \\rangle| \\leq \\|x\\|\\,\\|y\\|$ (égalité $\\iff$ colinéaires) — démonstration culte : le trinôme $t \\mapsto \\|x + ty\\|^2$ est positif pour tout $t$, donc son discriminant est négatif ; l'inégalité **triangulaire** en découle, et la norme mérite son nom. Toute famille orthogonale de vecteurs non nuls est **libre** (orthogonal $\\Rightarrow$ indépendant : la géométrie paie l'algèbre), **Pythagore** s'étend ($\\|x + y\\|^2 = \\|x\\|^2 + \\|y\\|^2$ si orthogonaux), et l'algorithme de **Gram-Schmidt** redresse n'importe quelle base en base **orthonormée** : retirer à chaque vecteur ses ombres sur les précédents, normer, recommencer — d'où l'existence de bases orthonormées en dimension finie, où coordonnées et produit scalaire deviennent transparents : $x = \\sum \\langle x, e_i \\rangle e_i$. Le théorème de **projection** couronne : $F$ de dimension finie, $F^{\\perp}$ son supplémentaire orthogonal, et $p_F(x)$ réalise la distance — big idea *Equivalence* : « meilleur approximant » $=$ « pied de la perpendiculaire », l'optimisation devenue géométrie.",
  },
  keyIdea: "Produit scalaire = bilinéaire symétrique défini positif — sur $\\mathbb{R}^n$, les matrices, les fonctions ($\\int fg$). **Cauchy-Schwarz** $|\\langle x, y \\rangle| \\leq \\|x\\|\\|y\\|$ (trinôme positif !), d'où l'inégalité triangulaire. Orthogonal $\\Rightarrow$ libre, Pythagore, **Gram-Schmidt** redresse en base orthonormée. **Projection** : $p_F(x) = \\sum \\langle x, e_i \\rangle e_i$ = l'unique point de $F$ le plus proche (*Equivalence* : approximer $=$ projeter).",
  why:
    "« Approximer, c'est projeter » est peut-être la formule la plus rentable des mathématiques appliquées : la régression par moindres carrés projette tes données sur l'espace des droites, la compression JPEG et le MP3 projettent l'image ou le son sur quelques fonctions orthogonales bien choisies, et les séries de Fourier du L3 ne feront que projeter les signaux sur la famille orthogonale $(\\cos(nt), \\sin(nt))$ que tu viens de découvrir. Les polynômes orthogonaux (Legendre en tête, que Gram-Schmidt fabrique sur $\\int_{-1}^{1}$) pilotent l'intégration numérique — chaque fois qu'une machine approche, elle projette.",
  examples: [
    { title: "Des signaux orthogonaux", steps: [
      { p: "$\\langle \\cos, \\sin \\rangle = \\int_0^{2\\pi} \\cos t \\sin t\\,dt = 0$ : perpendiculaires au sens intégral." },
      { p: "La famille $(\\cos(nt), \\sin(nt))$ est orthogonale — la scène est prête pour Fourier." },
    ] },
    { title: "L'ombre coordonnée par coordonnée", steps: [
      { p: "Base orthonormée $(e_1, e_2)$ de $F$ : $p(x) = \\langle x, e_1 \\rangle e_1 + \\langle x, e_2 \\rangle e_2$." },
      { p: "Chaque axe reçoit sa part — et $d(x, F)^2 = \\|x\\|^2 - \\|p(x)\\|^2$ par Pythagore." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $\\mathbb{R}^3$ canonique : $u = (1, 2, 2)$, $v = (2, 1, -2)$. Calcule $\\langle u, v \\rangle$, $\\|u\\|$, $\\|v\\|$, et vérifie Cauchy-Schwarz. Les vecteurs sont-ils orthogonaux ?", solution: "$\\langle u, v \\rangle = 2 + 2 - 4 = 0$ : **orthogonaux** ! $\\|u\\| = \\sqrt{1 + 4 + 4} = 3$, $\\|v\\| = 3$. Cauchy-Schwarz : $|0| \\leq 3 \\times 3$ ✓ — largement : l'inégalité est d'autant plus lâche que les vecteurs sont proches de la perpendiculaire, serrée (égalité) quand ils sont colinéaires. Bonus Pythagore : $\\|u + v\\|^2 = \\|(3, 3, 0)\\|^2 = 18 = 9 + 9$ ✓." },
    { tier: "warmup", prompt: "Sur $\\mathcal{C}([0, 1], \\mathbb{R})$ muni de $\\langle f, g \\rangle = \\int_0^1 fg$ : calcule $\\langle 1, x \\rangle$, $\\|1\\|$, $\\|x\\|$, puis l'angle… non — vérifie simplement que Cauchy-Schwarz donne $\\left(\\int_0^1 x\\,dx\\right)^2 \\leq \\int_0^1 1\\,dx \\times \\int_0^1 x^2\\,dx$.", solution: "$\\langle 1, x \\rangle = \\int_0^1 x = \\frac{1}{2}$ ; $\\|1\\|^2 = 1$, $\\|x\\|^2 = \\frac{1}{3}$. Cauchy-Schwarz : $\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\leq 1 \\times \\frac{1}{3}$ ✓. Tu viens d'écrire une **inégalité intégrale** non triviale en une ligne — c'est le métier de Cauchy-Schwarz version intégrale : la moitié des inégalités d'analyse en sortent, et les fonctions $1$ et $x$ ne sont pas orthogonales (l'ombre de $x$ sur les constantes : sa valeur moyenne $\\frac{1}{2}$)." },
    { tier: "application", prompt: "Gram-Schmidt sur la famille $u_1 = (1, 1, 0)$, $u_2 = (1, 0, 1)$ de $\\mathbb{R}^3$ : construis une base orthonormée $(e_1, e_2)$ du plan $F = \\text{Vect}(u_1, u_2)$.", solution: "Norme : $e_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0)$. Retire l'ombre : $\\langle u_2, e_1 \\rangle = \\frac{1}{\\sqrt{2}}$, donc $v_2 = u_2 - \\frac{1}{\\sqrt{2}} e_1 = (1, 0, 1) - \\frac{1}{2}(1, 1, 0) = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$ ; norme $\\sqrt{\\frac{3}{2}}$ : $e_2 = \\frac{1}{\\sqrt{6}}(1, -1, 2)$. Vérification : $\\langle e_1, e_2 \\rangle = \\frac{1 - 1 + 0}{\\sqrt{12}} = 0$ ✓, normes $1$ ✓. Le geste de l'algorithme tient en une phrase : **retirer les ombres, normer** — et il marchera tel quel sur des polynômes." },
    { tier: "challenge", prompt: "Dans $\\mathbb{R}^3$, projette $x = (1, 2, 3)$ orthogonalement sur le plan $F$ de base orthonormée $e_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0)$, $e_2 = \\frac{1}{\\sqrt{6}}(1, -1, 2)$ (l'exercice précédent !), puis calcule $d(x, F)$.", solution: "Coordonnées de l'ombre : $\\langle x, e_1 \\rangle = \\frac{3}{\\sqrt{2}}$, $\\langle x, e_2 \\rangle = \\frac{1 - 2 + 6}{\\sqrt{6}} = \\frac{5}{\\sqrt{6}}$ — $p(x) = \\frac{3}{\\sqrt{2}} e_1 + \\frac{5}{\\sqrt{6}} e_2 = \\left(\\frac{3}{2}, \\frac{3}{2}, 0\\right) + \\left(\\frac{5}{6}, -\\frac{5}{6}, \\frac{10}{6}\\right) = \\left(\\frac{7}{3}, \\frac{2}{3}, \\frac{5}{3}\\right)$. Pythagore : $d(x, F)^2 = \\|x\\|^2 - \\|p(x)\\|^2 = 14 - \\frac{49 + 4 + 25}{9} = 14 - \\frac{78}{9} = \\frac{16}{3}$ — $d(x, F) = \\frac{4}{\\sqrt{3}} \\approx 2{,}31$. Le point $p(x)$ est LE point du plan le plus proche de $x$ : l'optimisation s'est faite toute seule, par produit scalaire — pas une dérivée en vue." },
    { tier: "exam", prompt: "Sur $\\mathbb{R}_2[X]$ muni de $\\langle P, Q \\rangle = \\int_{-1}^{1} P(t)Q(t)\\,dt$. (1) Vérifie que $1$ et $X$ sont orthogonaux et calcule leurs normes. (2) Par Gram-Schmidt, orthogonalise $(1, X, X^2)$ — montre que le troisième vecteur est proportionnel à $X^2 - \\frac{1}{3}$ (les polynômes de Legendre naissent). (3) Détermine la projection de $X^2$ sur $\\mathbb{R}_1[X]$ et déduis-en $\\min_{a, b} \\int_{-1}^{1} (t^2 - at - b)^2\\,dt$. (4) En une phrase : que vient de faire la géométrie pour l'approximation ?", solution: "(1) $\\langle 1, X \\rangle = \\int_{-1}^1 t\\,dt = 0$ ✓ (imparité !) ; $\\|1\\|^2 = 2$, $\\|X\\|^2 = \\frac{2}{3}$. (2) $1$ et $X$ déjà orthogonaux ; retire à $X^2$ ses ombres : $\\langle X^2, 1 \\rangle = \\frac{2}{3}$, $\\langle X^2, X \\rangle = 0$ (imparité) — $v_3 = X^2 - \\frac{2/3}{2} \\cdot 1 = X^2 - \\frac{1}{3}$ ■ : la famille de **Legendre** $\\left(1, X, X^2 - \\frac{1}{3}\\right)$, fabriquée par l'algorithme. (3) Projection de $X^2$ sur $\\mathbb{R}_1[X] = \\text{Vect}(1, X)$ : $p(X^2) = \\frac{\\langle X^2, 1 \\rangle}{\\|1\\|^2} \\cdot 1 + 0 = \\frac{1}{3}$ — et le minimum **est** $d(X^2, \\mathbb{R}_1[X])^2 = \\|X^2 - \\frac{1}{3}\\|^2 = \\int_{-1}^1 \\left(t^2 - \\frac{1}{3}\\right)^2 dt = \\frac{2}{5} - \\frac{2}{3} \\cdot \\frac{2}{3} + \\frac{2}{9} = \\frac{8}{45}$ — atteint en $a = 0$, $b = \\frac{1}{3}$. (4) Un problème de **minimisation d'intégrale** (calcul des variations en herbe) s'est résolu **sans dérivée** : meilleur approximant $=$ projeté orthogonal — la géométrie a fait l'optimisation, et Fourier fera pareil avec les signaux en L3." },
  ],
  practice: [
    { tier: "warmup", label: "Produit scalaire canonique", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const c = randint(r, 1, 4); const d = randint(r, 1, 4);
      return { prompt: `$\\langle (${a}, ${b}), (${c}, ${d}) \\rangle$ ?`, answer: a * c + b * d, solution: `$${a} \\times ${c} + ${b} \\times ${d} = ${a * c + b * d}$.` };
    } },
    { tier: "application", label: "Pythagore étendu", make: (r) => {
      const a = randint(r, 2, 6); const b = randint(r, 2, 6);
      return { prompt: `$x \\perp y$, $\\|x\\| = ${a}$, $\\|y\\| = ${b}$ : $\\|x + y\\|^2$ ?`, answer: a * a + b * b, solution: `Pythagore : $${a}^2 + ${b}^2 = ${a * a + b * b}$.` };
    } },
    { tier: "challenge", label: "L'ombre sur un axe", make: (r) => {
      const x1 = randint(r, 1, 5); const x2 = randint(r, 1, 5);
      return { prompt: `Projection de $(${x1}, ${x2})$ sur l'axe $\\text{Vect}((1, 0))$ : première coordonnée du projeté ?`, answer: x1, solution: `$\\langle x, e_1 \\rangle e_1 = (${x1}, 0)$ : coordonnée $${x1}$ — l'ombre garde la part de l'axe.` };
    } },
  ],
};

export default [determinants, probabilitesFinies, prehilbertiens];
