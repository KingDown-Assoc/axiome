// Fields "Algebra / Probability / Analysis" — BACHELOR module (l2 year),
// licence de mathématiques. Official MP/MPI programme (arrêté 2021), three
// closing chapters:
// (1) "Structures algébriques" tail — ideals of a commutative ring, ideals
// of Z (all nZ; gcd and Bézout read through ideals), ideals of K[X] (all
// principal, generator = nonzero element of minimal degree), gcd of
// polynomials, irreducibles of C[X] (degree 1, d'Alembert-Gauss admitted)
// and of R[X] (degree 1, degree 2 with negative discriminant), algebras
// (definition and examples only). Omitted by the June-12 wave, required by
// the programme — this lesson fills the gap.
// (2) "Fonctions génératrices" — G_X(t) = E(t^X), radius >= 1, G determines
// the law (uniqueness of power-series coefficients), E(X) = G'(1) when X
// has finite expectation (converse admitted), independence turns sums of
// variables into products of functions, generating functions of
// Bernoulli / binomial / geometric / Poisson.
// (3) "Calcul différentiel" — differential as best linear approximation
// (DL1), Jacobian matrix, gradient and steepest slope, chain rule and
// derivative along an arc, C1 iff continuous partials (admitted), integral
// increment formula, constant on a connected open set, tangent vectors
// T_xX = ker dg(x) (implicit function theorem off-programme), first-order
// optimisation (critical points; constrained: grad f parallel to grad g),
// Schwarz, Hessian + order-2 Taylor-Young, classification via the spectral
// theorem (S+ necessary, S++ sufficient; n = 2 read on rt - s^2 and r).
// Singapore method at university level: Concrete = the comb of multiples
// merged by hand, one die encoded as a polynomial, one surface pushed at a
// point; Pictorial = two combs becoming the gcd comb, the multiplication
// table as convolution, level curves tangent to the constraint; Abstract =
// programme-exact statements. Big ideas named; exam = colle-style;
// practice = systematic variation with numeric answers.
import { randint, pick } from "../../core/exercises.js";

// — Ideals and divisibility (MP: structures algébriques, idéaux) —
const ideauxDivisibilite = {
  id: "algebra.bachelor.ideaux-divisibilite",
  level: "bachelor", domain: "algebra",
  title: "Idéaux : la divisibilité vue de haut",
  tagline: "Tous les multiples d'un coup — et Bézout devient une évidence de structure.",
  prereqs: ["algebra.bachelor.structures-algebriques", "algebra.bachelor.polynomes-fractions"],
  intuition:
    "Tu connais Bézout : il existe $u, v$ tels que $au + bv = a \\wedge b$ — démontré en remontant l'algorithme d'Euclide, division après division.\n\nVoici la version **structurelle** : au lieu de chercher UN couple $(u, v)$, considère TOUS les nombres $au + bv$ d'un seul coup. Cet ensemble a une forme remarquable — et sa forme EST le théorème.",
  depths: {
    discovery:
      "**Avec les mains** : liste les nombres $6u + 10v$ — $6 + 10 = 16$, $10 - 6 = 4$, $6 + 6 - 10 = 2$, $2 + 2 = 4$, $16 - 6 = 10$… Deux constats : tout ce qui sort est **pair** (somme de pairs), et $2$ lui-même est atteint ($2 = 6 \\cdot 2 - 10$) — donc tous ses multiples aussi : l'ensemble est exactement $2\\mathbb{Z}$, les multiples du pgcd. Vérifie la double stabilité qui rend ça possible : la **somme** de deux combinaisons est une combinaison, et un **multiple** d'une combinaison est une combinaison — cette double stabilité a un nom : un **idéal** de $\\mathbb{Z}$.",
    standard:
      "**En image** : dessine la droite des entiers ; surligne le peigne des multiples de $6$ (un trait toutes les $6$ unités), puis le peigne des multiples de $10$. L'ensemble $6\\mathbb{Z} + 10\\mathbb{Z}$ contient les deux peignes et toutes leurs sommes : c'est encore un peigne, dont le **pas** est le plus petit élément strictement positif atteint — ici $2$. Pourquoi un peigne parfait ? **Division euclidienne** : si un élément $x$ de l'idéal n'était pas multiple du pas $d$, son reste $x - qd$ serait dans l'idéal (stabilité), strictement positif et **plus petit** que $d$ — contradiction avec la minimalité. Le dessin porte la preuve : le pas du peigne fusionné, c'est le pgcd, et il est **atteint** — Bézout est devenu une évidence géométrique.",
    advanced:
      "**Dans la tête** : un **idéal** $I$ d'un anneau commutatif $A$ est un sous-groupe additif qui **absorbe** la multiplication : $a \\in A$, $x \\in I \\Rightarrow ax \\in I$ (le noyau d'un morphisme d'anneaux en est toujours un). Dans $\\mathbb{Z}$ comme dans $K[X]$, la division euclidienne rend tout idéal **principal** : engendré par un seul élément — le plus petit positif dans $\\mathbb{Z}$, l'unitaire de plus bas degré dans $K[X]$. Traductions immédiates (big idea *Equivalence*) : $a \\mid b \\iff b\\mathbb{Z} \\subset a\\mathbb{Z}$ — la divisibilité est une **inclusion renversée** ; $a\\mathbb{Z} + b\\mathbb{Z} = (a \\wedge b)\\mathbb{Z}$ (Bézout) ; $a\\mathbb{Z} \\cap b\\mathbb{Z} = (a \\vee b)\\mathbb{Z}$ (ppcm). Même grammaire pour les polynômes : pgcd de deux polynômes, relation de Bézout, algorithme d'Euclide — tout passe. Les **irréductibles** : dans $\\mathbb{C}[X]$, exactement les degrés $1$ (d'Alembert-Gauss, admis) ; dans $\\mathbb{R}[X]$, les degrés $1$ et les degrés $2$ à discriminant strictement négatif (les racines complexes d'un polynôme réel viennent par paires conjuguées). Enfin une **algèbre** : un espace vectoriel muni d'un produit compatible — $K[X]$, $\\mathcal{M}_n(K)$, $\\mathcal{C}(I, \\mathbb{R})$ : tu en manipules depuis le début.",
  },
  keyIdea: "Idéal : stable par somme, **absorbe** le produit. Dans $\\mathbb{Z}$ et $K[X]$, tous **principaux** — la division euclidienne fabrique le générateur (plus petit positif, plus bas degré). Divisibilité $=$ inclusion renversée : $a \\mid b \\iff b\\mathbb{Z} \\subset a\\mathbb{Z}$ (*Equivalence*). Bézout structurel : $a\\mathbb{Z} + b\\mathbb{Z} = (a \\wedge b)\\mathbb{Z}$. Irréductibles : degré $1$ sur $\\mathbb{C}$, degrés $1$ et $2$ (discriminant négatif) sur $\\mathbb{R}$.",
  why:
    "Les idéaux sont la lunette qui unifie TOUTE l'arithmétique — celle de $\\mathbb{Z}$ et celle de $K[X]$ d'un seul geste : ce parallèle fait tourner les codes correcteurs (les CRC de tes trames réseau sont des restes de divisions polynomiales) et la cryptographie sur anneaux. En L3, **quotienter** par un idéal fabriquera des mondes neufs : $\\mathbb{Z}/p\\mathbb{Z}$ tu connais — $\\mathbb{R}[X]/(X^2 + 1)$ reconstruit $\\mathbb{C}$, et les corps finis $\\mathbb{F}_{p^n}$ de l'AES sortiront de la même machine.",
  examples: [
    { title: "Le peigne fusionné", steps: [
      { p: "$6\\mathbb{Z} + 10\\mathbb{Z}$ : tout élément est pair, et $2 = 6 \\cdot 2 - 10 \\cdot 1$ est atteint." },
      { p: "Donc l'idéal est exactement $2\\mathbb{Z}$ — le peigne de pas $\\text{pgcd}(6, 10)$." },
    ] },
    { title: "La divisibilité renversée", steps: [
      { p: "$3 \\mid 12$ : tout multiple de $12$ est multiple de $3$, donc $12\\mathbb{Z} \\subset 3\\mathbb{Z}$." },
      { p: "Plus le nombre divise, plus son idéal est **gros** — l'inclusion va à rebours de la divisibilité." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Montre que $6\\mathbb{Z} + 10\\mathbb{Z} = 2\\mathbb{Z}$ : exhibe $2$ comme combinaison, explique pourquoi seuls des pairs apparaissent, et conclus par double inclusion.", solution: "$2 = 6 \\cdot 2 - 10 \\cdot 1$ ✓ — donc $2 \\in I$, et par absorption tous ses multiples : $2\\mathbb{Z} \\subset I$. Réciproquement, $6u + 10v = 2(3u + 5v)$ est toujours **pair** : $I \\subset 2\\mathbb{Z}$. Double inclusion : égalité ■. Le générateur est le pgcd — et la combinaison qui l'atteint est une relation de **Bézout**." },
    { tier: "warmup", prompt: "Parmi ces parties de $\\mathbb{Z}$, lesquelles sont des idéaux : les nombres pairs ; les nombres impairs ; $\\{0\\}$ ; la réunion des multiples de $3$ et des multiples de $5$ ?", solution: "Les pairs : **oui** — c'est $2\\mathbb{Z}$. Les impairs : **non** — $1 + 1 = 2$ sort de l'ensemble (et $0$ manque : pas un sous-groupe). $\\{0\\}$ : **oui** — l'idéal nul, principal engendré par $0$. La réunion : **non** — $3 + 5 = 8$ n'est multiple ni de $3$ ni de $5$ : une **réunion** d'idéaux n'est presque jamais un idéal ; c'est la **somme** $3\\mathbb{Z} + 5\\mathbb{Z} = \\mathbb{Z}$ (Bézout : $3$ et $5$ premiers entre eux) qui en est un." },
    { tier: "application", prompt: "Calcule $\\text{pgcd}(X^4 - 1,\\, X^3 - 1)$ par l'algorithme d'Euclide dans $\\mathbb{R}[X]$, puis décris l'idéal $(X^4 - 1) + (X^3 - 1)$.", solution: "Division : $X^4 - 1 = X(X^3 - 1) + (X - 1)$ — reste $X - 1$. Puis $X^3 - 1 = (X^2 + X + 1)(X - 1) + 0$ : l'algorithme s'arrête, $\\text{pgcd} = X - 1$ (unitaire ✓). L'idéal somme est donc $(X - 1) \\cdot \\mathbb{R}[X]$ : tous les polynômes s'annulant en $1$ — logique : $1$ est la racine **commune** de $X^4 - 1$ et $X^3 - 1$, et un polynôme de l'idéal s'annule partout où les deux générateurs s'annulent." },
    { tier: "challenge", prompt: "Démontre que tout idéal $I$ de $K[X]$ est principal — la démonstration du cours, à refaire les mains dans le moteur.", solution: "Si $I = \\{0\\}$ : principal, engendré par $0$. Sinon, choisis $P_0 \\in I$ non nul de **degré minimal** (l'ensemble des degrés des éléments non nuls de $I$ est une partie non vide de $\\mathbb{N}$ : elle a un plus petit élément). Soit $P \\in I$ : division euclidienne $P = QP_0 + R$ avec $\\deg R < \\deg P_0$. Alors $R = P - QP_0 \\in I$ (stabilité par somme et **absorption** : $QP_0 \\in I$) — par minimalité du degré de $P_0$, c'est que $R = 0$, donc $P \\in (P_0)$. Réciproquement $(P_0) \\subset I$ par absorption : $I = (P_0)$ ■. La division euclidienne est le seul moteur — c'est elle qui rend $\\mathbb{Z}$ et $K[X]$ principaux, par le même argument mot pour mot." },
    { tier: "exam", prompt: "Le polynôme $X^4 + 1$. (1) Montre qu'il n'a pas de racine réelle. (2) Explique pourquoi il n'est pourtant PAS irréductible dans $\\mathbb{R}[X]$ — cite le théorème de structure. (3) Trouve ses racines dans $\\mathbb{C}$ et regroupe les conjuguées pour le factoriser dans $\\mathbb{R}[X]$. (4) Vérifie ton produit en le développant.", solution: "(1) Pour tout $x$ réel, $x^4 + 1 \\geq 1 > 0$ : aucune racine ✓. (2) Les irréductibles de $\\mathbb{R}[X]$ sont de degré $1$ ou $2$ : un degré $4$, même sans racine, se factorise en deux quadratiques réelles — l'absence de racine n'interdit que les facteurs de degré $1$. (3) $z^4 = -1 = e^{i\\pi}$ : racines $e^{i\\pi/4}, e^{3i\\pi/4}, e^{5i\\pi/4}, e^{7i\\pi/4}$. Paires conjuguées : $(X - e^{i\\pi/4})(X - e^{-i\\pi/4}) = X^2 - 2\\cos\\frac{\\pi}{4}X + 1 = X^2 - \\sqrt{2}X + 1$, et de même $X^2 + \\sqrt{2}X + 1$. (4) $(X^2 + \\sqrt{2}X + 1)(X^2 - \\sqrt{2}X + 1) = (X^2 + 1)^2 - (\\sqrt{2}X)^2 = X^4 + 2X^2 + 1 - 2X^2 = X^4 + 1$ ✓ ■ — l'identité remarquable fait la vérification en une ligne." },
  ],
  practice: [
    { tier: "warmup", label: "Le pas du peigne", make: (r) => {
      const d = pick(r, [2, 3, 4]); const a = d * pick(r, [2, 3]); const b = d * pick(r, [5, 7]);
      return { prompt: `Quel est le pas du peigne $${a}\\mathbb{Z} + ${b}\\mathbb{Z}$ — autrement dit, son générateur positif ?`, answer: d, solution: `$a\\mathbb{Z} + b\\mathbb{Z} = (a \\wedge b)\\mathbb{Z}$ : ici $\\text{pgcd}(${a}, ${b}) = ${d}$ — le pas du peigne fusionné.` };
    } },
    { tier: "warmup", label: "Somme ou intersection", make: (r) => {
      const a = pick(r, [4, 6]); const b = pick(r, [6, 10, 15]);
      const g = (x, y) => (y === 0 ? x : g(y, x % y)); const d = g(a, b); const m = (a * b) / d;
      return { prompt: `L'intersection $${a}\\mathbb{Z} \\cap ${b}\\mathbb{Z}$ vaut $n\\mathbb{Z}$ : donne $n$.`, answer: m, solution: `Être dans l'intersection, c'est être multiple de $${a}$ ET de $${b}$ — donc du ppcm : $n = ${m}$. (La somme donnerait le pgcd $${d}$ : somme $=$ pgcd, intersection $=$ ppcm.)` };
    } },
    { tier: "application", label: "Bézout explicite", make: (r) => {
      const k = pick(r, [[7, 5, 3, -4], [9, 4, 1, -2], [11, 3, -1, 4], [8, 5, 2, -3]]);
      return { prompt: `Trouve $u$ tel que $${k[0]}u + ${k[1]} \\times (${k[3]}) = 1$.`, answer: k[2], solution: `$u = \\dfrac{1 - ${k[1]} \\times (${k[3]})}{${k[0]}} = ${k[2]}$ — vérifie : $${k[0]} \\times ${k[2]} + ${k[1]} \\times (${k[3]}) = 1$ ✓. C'est une relation de Bézout : possible car $\\text{pgcd}(${k[0]}, ${k[1]}) = 1$.` };
    } },
    { tier: "challenge", label: "Racine multiple et dérivée", make: (r) => {
      const k = randint(r, 2, 4);
      return { prompt: `$P = (X - 1)^{${k}}(X + 2)$. Quel est le degré de $\\text{pgcd}(P, P')$ ?`, answer: k - 1, solution: `Une racine d'ordre $${k}$ de $P$ est racine d'ordre $${k - 1}$ de $P'$ ; la racine simple $-2$ disparaît dans $P'$. Donc $\\text{pgcd}(P, P') = (X - 1)^{${k - 1}}$ : degré $${k - 1}$ — le pgcd avec la dérivée détecte les racines multiples.` };
    } },
    { tier: "challenge", label: "Irréductible sur les réels ?", make: (r) => {
      const b = randint(r, 0, 4); const c = randint(r, 1, 6); const disc = b * b - 4 * c;
      return { prompt: `$X^2 + ${b}X + ${c}$ est-il irréductible dans $\\mathbb{R}[X]$ ? (1 oui, 0 non)`, answer: disc < 0 ? 1 : 0, solution: `Discriminant : $${b}^2 - 4 \\times ${c} = ${disc}$ — ${disc < 0 ? "strictement négatif : pas de racine réelle, degré $2$ : **irréductible** (1)" : "positif ou nul : racines réelles, il se factorise en deux degrés $1$ — réductible (0)"}.` };
    } },
  ],
};

// — Generating functions (MP: variables aléatoires, fonctions génératrices) —
const fonctionsGeneratrices = {
  id: "probability.bachelor.fonctions-generatrices",
  level: "bachelor", domain: "probability",
  title: "Fonctions génératrices : la loi en une formule",
  tagline: "Encode toute une loi dans une série — l'indépendance devient un produit.",
  prereqs: ["probability.bachelor.variables-discretes", "analysis.bachelor.series-entieres"],
  intuition:
    "Une variable aléatoire à valeurs dans $\\mathbb{N}$, c'est une **infinité** de nombres : $P(X = 0)$, $P(X = 1)$, $P(X = 2)$… Comment manipuler cette infinité d'un seul geste ?\n\nRange-les comme **coefficients d'une série** : $G_X(t) = \\sum P(X = n)\\, t^n$. Toute l'information dans une seule fonction — et les opérations sur les variables deviennent des opérations sur les fonctions.",
  depths: {
    discovery:
      "**Avec les mains** : code un dé équilibré en polynôme — $G(t) = \\frac{1}{6}(t + t^2 + t^3 + t^4 + t^5 + t^6)$ : le coefficient de $t^k$ est la probabilité de la face $k$. Maintenant lance **deux** dés et multiplie : développe $G(t)^2$ juste assez pour le terme en $t^7$ — il reçoit $t^1 t^6$, $t^2 t^5$, $t^3 t^4$, $t^4 t^3$, $t^5 t^2$, $t^6 t^1$ : six produits, coefficient $\\frac{6}{36}$. Le produit des polynômes **compte les façons** tout seul : multiplier les codes, c'est additionner les variables.",
    standard:
      "**En image** : dessine la table $6 \\times 6$ du produit — la case $(i, j)$ porte $\\frac{1}{36} t^{i+j}$. Les **diagonales** $i + j = s$ regroupent les cases de même somme : la diagonale $s = 7$ traverse toute la table (six cases), les coins $s = 2$ et $s = 12$ sont seuls — le triangle des probabilités des deux dés apparaît dans la géométrie de la table. Ce dessin EST le théorème : quand $X$ et $Y$ sont **indépendantes**, chaque case vaut $P(X = i)\\, P(Y = j)$ et la diagonale somme exactement la formule de convolution — d'où $G_{X+Y} = G_X \\cdot G_Y$ : la convolution des lois, opération pénible, devient une multiplication de fonctions, opération de collège.",
    advanced:
      "**Dans la tête** : $G_X(t) = E(t^X) = \\sum_{n \\geq 0} P(X = n)\\, t^n$ — série entière de rayon $\\geq 1$ (en $t = 1$, elle converge vers $\\sum P(X = n) = 1$). Elle **détermine la loi** : par unicité des coefficients d'une série entière, $P(X = n) = \\frac{G^{(n)}(0)}{n!}$ — ton chapitre séries entières travaille ici. **Espérance** : $X$ admet une espérance si et seulement si $G$ est dérivable en $1$, et alors $E(X) = G'(1)$ (la réciproque est admise) ; la variance suit : $V(X) = G''(1) + G'(1) - G'(1)^2$. **Indépendance** : $G_{X+Y} = G_X G_Y$ — et les quatre lois du programme s'encodent : Bernoulli $1 - p + pt$ ; binomiale $(1 - p + pt)^n$ (produit de $n$ Bernoulli : la formule tombe sans calcul) ; géométrique $\\frac{pt}{1 - (1-p)t}$ ; Poisson $e^{\\lambda(t - 1)}$. Big idea *Notations* : changer d'écriture change la difficulté — la loi entière tient dans une formule, et le problème dur (sommer des variables) devient facile (multiplier des fonctions).",
  },
  keyIdea: "$G_X(t) = E(t^X) = \\sum P(X = n)\\, t^n$, rayon $\\geq 1$. La série **détermine** la loi (unicité des coefficients). $E(X) = G'(1)$ quand elle existe ; $V(X) = G''(1) + G'(1) - G'(1)^2$. Indépendance : $G_{X+Y} = G_X \\cdot G_Y$ (*Notations* : la convolution devient un produit). Quatre codes à connaître : Bernoulli, binomiale, géométrique, Poisson.",
  why:
    "C'est l'outil des processus de comptage : files d'attente, paquets sur un réseau, mutations sur un brin d'ADN — dès que des sources indépendantes s'additionnent, leurs génératrices se multiplient et le calcul tombe. La somme de deux flux poissonniens est poissonnienne : l'argument tient en une ligne de produit d'exponentielles — c'est pour ça qu'on superpose les trafics sans casser le modèle. Et les processus de branchement (combien de descendants à la génération $n$ ?) s'analysent en **composant** des génératrices : $G \\circ G \\circ \\cdots \\circ G$ — l'extinction d'un nom de famille ou d'une épidémie se lit sur le point fixe.",
  examples: [
    { title: "Deux dés, coefficient de la somme", steps: [
      { p: "$G(t)^2$ : le terme en $t^7$ reçoit six produits $t^i t^{7-i}$ — probabilité $\\frac{6}{36} = \\frac{1}{6}$." },
      { p: "Multiplier les polynômes compte les façons : le produit fait la convolution tout seul." },
    ] },
    { title: "Poisson plus Poisson", steps: [
      { p: "$e^{\\lambda(t-1)} \\cdot e^{\\mu(t-1)} = e^{(\\lambda + \\mu)(t - 1)}$ — une ligne." },
      { p: "Par unicité, $X + Y$ suit une loi de Poisson de paramètre $\\lambda + \\mu$ ■." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris la génératrice $G_X$ d'un dé équilibré (uniforme sur $\\{1, \\ldots, 6\\}$). Calcule $G_X(1)$ puis $G_X'(1)$, et interprète chacune des deux valeurs.", solution: "$G_X(t) = \\frac{1}{6}(t + t^2 + \\cdots + t^6)$. En $t = 1$ : $G_X(1) = \\frac{6}{6} = 1$ — les probabilités somment à $1$, c'est le test de cohérence de toute génératrice. Dérivée : $G_X'(t) = \\frac{1}{6}(1 + 2t + 3t^2 + 4t^3 + 5t^4 + 6t^5)$, d'où $G_X'(1) = \\frac{21}{6} = 3{,}5$ — c'est $E(X)$ : la dérivée en $1$ **pèse** chaque valeur $n$ par sa probabilité, exactement la définition de l'espérance." },
    { tier: "warmup", prompt: "Bernoulli : $G_X(t) = 1 - p + pt$. Déduis-en la génératrice d'une binomiale $\\mathcal{B}(n, p)$ SANS calculer de somme, puis retrouve $E = np$ en dérivant.", solution: "Une binomiale est une somme de $n$ Bernoulli **indépendantes** : la génératrice est le produit des $n$ génératrices identiques — $G(t) = (1 - p + pt)^n$ ■, zéro somme calculée. Dérivée : $G'(t) = np\\,(1 - p + pt)^{n-1}$, et en $t = 1$ : $G'(1) = np \\cdot 1 = np = E(X)$ ✓ — la structure (somme d'indépendantes) a fait tout le travail." },
    { tier: "application", prompt: "$X$ suit une loi géométrique de paramètre $p$ (rang du premier succès). Montre que $G_X(t) = \\dfrac{pt}{1 - (1-p)t}$, précise le rayon, et retrouve $E(X) = \\dfrac{1}{p}$.", solution: "$G_X(t) = \\sum_{n \\geq 1} p(1-p)^{n-1} t^n = pt \\sum_{n \\geq 1} \\big((1-p)t\\big)^{n-1} = \\dfrac{pt}{1 - (1-p)t}$ — série géométrique de raison $(1-p)t$, qui converge pour $|t| < \\frac{1}{1-p}$ : rayon $\\frac{1}{1-p} > 1$ ✓ (cohérent : toute génératrice a un rayon au moins $1$). Dérivée d'un quotient : $G_X'(t) = \\dfrac{p}{(1 - (1-p)t)^2}$, et en $t = 1$ : $G_X'(1) = \\dfrac{p}{p^2} = \\dfrac{1}{p}$ ■ — en moyenne, le premier succès arrive au rang $\\frac{1}{p}$ : plus l'événement est rare, plus on l'attend." },
    { tier: "challenge", prompt: "Montre soigneusement que la génératrice détermine la loi : si $G_X = G_Y$ sur $]-1, 1[$, alors $X$ et $Y$ ont même loi. Quel théorème du chapitre « séries entières » fait tout le travail ?", solution: "$G_X$ et $G_Y$ sont des séries entières de rayon $\\geq 1$ : elles sont de classe $\\mathcal{C}^\\infty$ sur $]-1, 1[$ et leurs coefficients sont déterminés par les dérivées en $0$ — c'est l'**unicité du développement en série entière** : $a_n = \\frac{G^{(n)}(0)}{n!}$. Donc $P(X = n) = \\frac{G_X^{(n)}(0)}{n!} = \\frac{G_Y^{(n)}(0)}{n!} = P(Y = n)$ pour tout $n$ : même loi ■. Conséquence pratique : pour identifier la loi d'une variable, il **suffit** de reconnaître sa génératrice — c'est l'argument-clé de tous les exercices de somme." },
    { tier: "exam", prompt: "$X \\sim \\mathcal{P}(\\lambda)$ et $Y \\sim \\mathcal{P}(\\mu)$ indépendantes. (1) Montre que $G_X(t) = e^{\\lambda(t-1)}$. (2) Retrouve $E(X) = \\lambda$ et $V(X) = \\lambda$ par les dérivées. (3) Détermine la loi de $X + Y$. (4) Calcule $P(X = k \\mid X + Y = n)$ et reconnais une loi connue — interprète.", solution: "(1) $G_X(t) = \\sum_{n \\geq 0} e^{-\\lambda} \\frac{\\lambda^n}{n!} t^n = e^{-\\lambda} \\sum \\frac{(\\lambda t)^n}{n!} = e^{-\\lambda} e^{\\lambda t} = e^{\\lambda(t-1)}$ ✓. (2) $G' = \\lambda e^{\\lambda(t-1)}$ donc $E(X) = G'(1) = \\lambda$ ; $G'' = \\lambda^2 e^{\\lambda(t-1)}$ donc $V(X) = G''(1) + G'(1) - G'(1)^2 = \\lambda^2 + \\lambda - \\lambda^2 = \\lambda$ ■ — la loi de Poisson a son espérance égale à sa variance, signature qu'on teste sur les données réelles. (3) Indépendance : $G_{X+Y}(t) = e^{\\lambda(t-1)} e^{\\mu(t-1)} = e^{(\\lambda+\\mu)(t-1)}$ — c'est la génératrice de $\\mathcal{P}(\\lambda + \\mu)$, et la génératrice détermine la loi : $X + Y \\sim \\mathcal{P}(\\lambda + \\mu)$ ■. (4) $P(X = k \\mid X+Y = n) = \\dfrac{P(X = k)\\, P(Y = n-k)}{P(X+Y = n)} = \\dfrac{e^{-\\lambda} \\frac{\\lambda^k}{k!} \\cdot e^{-\\mu} \\frac{\\mu^{n-k}}{(n-k)!}}{e^{-(\\lambda+\\mu)} \\frac{(\\lambda+\\mu)^n}{n!}} = \\binom{n}{k} \\Big(\\frac{\\lambda}{\\lambda+\\mu}\\Big)^k \\Big(\\frac{\\mu}{\\lambda+\\mu}\\Big)^{n-k}$ : une **binomiale** $\\mathcal{B}\\big(n, \\frac{\\lambda}{\\lambda+\\mu}\\big)$ ■ — sachant le total $n$, chaque événement choisit son origine comme une pièce truquée par les intensités : le conditionnement a transformé deux Poisson en un tirage de pile ou face." },
  ],
  practice: [
    { tier: "warmup", label: "L'espérance par la dérivée", make: (r) => {
      const n = pick(r, [10, 20]); const p = pick(r, [[ "0{,}2", 0.2 ], [ "0{,}5", 0.5 ]]);
      return { prompt: `$X \\sim \\mathcal{B}(${n},\\, ${p[0]})$ : calcule $E(X) = G'(1)$.`, answer: n * p[1], solution: `$G(t) = (1 - p + pt)^{${n}}$, $G'(1) = np = ${n} \\times ${p[0]} = ${n * p[1]}$ — l'espérance d'une binomiale, lue sur la dérivée de son code.` };
    } },
    { tier: "warmup", label: "Le coefficient en zéro", make: (r) => {
      const n = pick(r, [2, 3]); const v = n === 2 ? 0.25 : 0.125;
      return { prompt: `$X \\sim \\mathcal{B}(${n},\\, 0{,}5)$ : que vaut $G_X(0) = P(X = 0)$ ?`, answer: v, solution: `$G(0) = (1 - 0{,}5)^{${n}} = 0{,}5^{${n}} = ${n === 2 ? "0{,}25" : "0{,}125"}$ — le terme constant d'une génératrice est toujours $P(X = 0)$.` };
    } },
    { tier: "application", label: "Somme de Poisson", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 1, 5);
      return { prompt: `$X \\sim \\mathcal{P}(${a})$ et $Y \\sim \\mathcal{P}(${b})$ indépendantes : $X + Y$ suit une Poisson de quel paramètre ?`, answer: a + b, solution: `$G_{X+Y} = e^{${a}(t-1)} e^{${b}(t-1)} = e^{${a + b}(t-1)}$ : Poisson de paramètre $${a + b}$ — les intensités s'additionnent.` };
    } },
    { tier: "application", label: "Deux dés font la somme", make: (r) => {
      const s = randint(r, 2, 12); const w = 6 - Math.abs(s - 7);
      return { prompt: `Combien de façons d'obtenir $${s}$ avec deux dés — le coefficient de $t^{${s}}$ dans $36\\, G(t)^2$ ?`, answer: w, solution: `La diagonale $i + j = ${s}$ de la table $6 \\times 6$ compte $6 - |${s} - 7| = ${w}$ cases — le triangle des sommes, lu sur le produit des polynômes.` };
    } },
    { tier: "challenge", label: "La signature de Poisson", make: (r) => {
      const l = randint(r, 2, 9);
      return { prompt: `$X \\sim \\mathcal{P}(${l})$ : calcule $V(X) = G''(1) + G'(1) - G'(1)^2$.`, answer: l, solution: `$G'' (1) = ${l * l}$, $G'(1) = ${l}$ : $V = ${l * l} + ${l} - ${l * l} = ${l}$ — variance égale à l'espérance, la signature de Poisson.` };
    } },
  ],
};

// — Differential calculus (MP: calcul différentiel) —
const calculDifferentiel = {
  id: "analysis.bachelor.calcul-differentiel",
  level: "bachelor", domain: "analysis",
  title: "Calcul différentiel : le linéaire local",
  tagline: "Approcher toute fonction par une application linéaire — et lire l'optimum dans la hessienne.",
  prereqs: ["analysis.bachelor.fonctions-deux-variables", "geometry.bachelor.theoreme-spectral"],
  intuition:
    "En L1 tu as rencontré les dérivées partielles : la pente selon $x$, la pente selon $y$. Mais une surface a une **infinité** de directions — et un objet unique les contient toutes.\n\nLa **différentielle** : l'application linéaire qui colle le mieux à $f$ près du point. Le calcul différentiel entier tient en un slogan — localement, tout est linéaire.",
  depths: {
    discovery:
      "**Avec les mains** : prends $f(x, y) = x^2 + 2y^2$ au point $(1, 1)$ et pousse : $f(1 + h,\\, 1 + k) = 1 + 2h + h^2 + 2(1 + 2k + k^2) = 3 + (2h + 4k) + (h^2 + 2k^2)$. Trois étages : la **valeur** $f(1,1) = 3$, la partie **linéaire** $2h + 4k$, et un reste quadratique — négligeable quand $h, k$ sont petits. La partie linéaire est la différentielle $df(1,1)$ ; ses coefficients $(2, 4)$ sont les dérivées partielles : c'est le **gradient**. Teste la plus grande pente : avance de $0{,}1$ dans la direction du gradient normalisé, puis dans la direction $(1, 0)$ — compare les deux gains : le gradient gagne.",
    standard:
      "**En image** : dessine les lignes de niveau de $f$ — des ellipses concentriques pour $x^2 + 2y^2$. Le gradient en un point est **perpendiculaire** à la ligne de niveau qui y passe, et pointe vers la montée : sur la carte IGN, le ruisseau descend en coupant les courbes de niveau à angle droit. Maintenant l'optimisation **sous contrainte** $g = 0$ : trace la courbe contrainte par-dessus les niveaux de $f$ — tant que la contrainte **traverse** les niveaux, on peut encore monter en la suivant ; à l'optimum, elle leur devient **tangente**. Deux courbes tangentes, deux gradients perpendiculaires à la même droite : $\\nabla f \\parallel \\nabla g$. Le théorème de Lagrange EST ce dessin — apprends le dessin, la formule suit.",
    advanced:
      "**Dans la tête** : $f$ est **différentiable** en $a$ si $f(a + h) = f(a) + df(a) \\cdot h + o(\\|h\\|)$ avec $df(a)$ linéaire — la **jacobienne** est sa matrice (les partielles), le **gradient** son vecteur pour $f$ scalaire : $df(a) \\cdot v = \\langle \\nabla f(a), v \\rangle$. Règle de la **chaîne** : $(f \\circ \\gamma)'(t) = \\langle \\nabla f(\\gamma(t)), \\gamma'(t) \\rangle$ — d'où la formule intégrale $f(b) - f(a) = \\int_0^1 \\langle \\nabla f(\\gamma(t)), \\gamma'(t) \\rangle\\, dt$ et : différentielle nulle sur un ouvert **connexe par arcs** $\\Rightarrow$ constante. $\\mathcal{C}^1 \\iff$ partielles continues (admis). Ligne de niveau $X = \\{g = 0\\}$ : les **vecteurs tangents** forment $T_x X = \\ker dg(x)$ — la normale est $\\nabla g$. Optimisation : extremum **intérieur** $\\Rightarrow \\nabla f = 0$ (point critique) ; sous contrainte $\\Rightarrow \\nabla f \\parallel \\nabla g$. Ordre 2 : **Schwarz** ($\\partial^2_{xy} = \\partial^2_{yx}$ pour $f$ de classe $\\mathcal{C}^2$), la **hessienne** $H$ est symétrique — ton théorème spectral entre en scène : $H$ se diagonalise en base orthonormée, et Taylor-Young donne $f(a + h) = f(a) + \\langle \\nabla f, h \\rangle + \\frac{1}{2}\\langle Hh, h \\rangle + o(\\|h\\|^2)$. En un point critique, les **valeurs propres** décident : toutes strictement positives ($S^{++}$) $\\Rightarrow$ minimum local strict ; toutes négatives $\\Rightarrow$ maximum ; signes mêlés $\\Rightarrow$ col ; et la condition nécessaire est large : minimum local $\\Rightarrow H \\in S^+$. En dimension $2$ : le déterminant $rt - s^2$ et le signe de $r$ tranchent. Big idea *Proportionality* : remplacer localement le compliqué par sa meilleure approximation linéaire — la tangente de première année, portée en toute dimension.",
  },
  keyIdea: "$f(a + h) = f(a) + df(a) \\cdot h + o(\\|h\\|)$ : la différentielle est le **linéaire local** (*Proportionality*). Gradient $\\perp$ lignes de niveau, direction de plus grande pente. Extremum intérieur $\\Rightarrow \\nabla f = 0$ ; sous contrainte $\\Rightarrow \\nabla f \\parallel \\nabla g$ (les niveaux **tangents** à la contrainte). Hessienne symétrique $+$ théorème spectral : $S^{++}$ donne le minimum strict — en dimension $2$, lis $rt - s^2$ puis le signe de $r$.",
  why:
    "C'est le moteur de l'optimisation moderne : la **descente de gradient** qui entraîne les réseaux de neurones suit littéralement $-\\nabla f$, la plus grande pente vers le bas ; les multiplicateurs de Lagrange font tourner l'économie (maximiser sous contrainte de budget) et la mécanique (équilibres sous liaison) ; la hessienne nourrit les méthodes de Newton et dit si ton minimum est un vrai creux ou un col — le cauchemar de l'optimiseur. Et $T_x X = \\ker dg(x)$, c'est le plan tangent de tes moteurs 3D : la normale d'éclairage d'une surface implicite, c'est $\\nabla g$ normalisé.",
  examples: [
    { title: "La plus grande pente", steps: [
      { p: "$f = x^2 + 2y^2$ : $\\nabla f(1, 1) = (2, 4)$ — perpendiculaire à l'ellipse de niveau $3$." },
      { p: "Avancer le long du gradient rapporte $\\|\\nabla f\\| = \\sqrt{20}$ par unité — toute autre direction rapporte moins." },
    ] },
    { title: "Lagrange en un dessin", steps: [
      { p: "Sur la contrainte, $f$ varie tant que la courbe traverse les niveaux ; à l'optimum, tangence." },
      { p: "Deux courbes tangentes : leurs normales sont parallèles — $\\nabla f \\parallel \\nabla g$, le théorème est dessiné." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "$f(x, y) = x^2 + 2y^2$. Calcule $\\nabla f(1, 1)$, l'équation du plan tangent au graphe au-dessus de $(1, 1)$, puis la dérivée directionnelle de $f$ en $(1,1)$ selon $v = \\frac{1}{\\sqrt{2}}(1, -1)$.", solution: "$\\nabla f = (2x, 4y)$ donc $\\nabla f(1,1) = (2, 4)$. Plan tangent : $z = f(1,1) + \\langle \\nabla f(1,1), (x - 1, y - 1) \\rangle = 3 + 2(x - 1) + 4(y - 1)$ — le graphe de l'approximation affine. Dérivée directionnelle : $D_v f = \\langle \\nabla f(1,1), v \\rangle = \\frac{2 - 4}{\\sqrt{2}} = -\\sqrt{2}$ — négative : dans cette direction, ça **descend** ; le signe du produit scalaire avec le gradient dit la pente de chaque direction." },
    { tier: "warmup", prompt: "Schwarz à la main : $f(x, y) = x^3 y^2 + x y^4$. Calcule $\\dfrac{\\partial^2 f}{\\partial y\\, \\partial x}$ puis $\\dfrac{\\partial^2 f}{\\partial x\\, \\partial y}$, et constate.", solution: "$\\dfrac{\\partial f}{\\partial x} = 3x^2 y^2 + y^4$, puis en dérivant en $y$ : $6x^2 y + 4y^3$. Dans l'autre ordre : $\\dfrac{\\partial f}{\\partial y} = 2x^3 y + 4xy^3$, puis en dérivant en $x$ : $6x^2 y + 4y^3$ — **égales** ✓. C'est le théorème de Schwarz : $f$ est polynomiale donc $\\mathcal{C}^2$, l'ordre des dérivations ne compte pas — et c'est lui qui rend la hessienne **symétrique**, donc justiciable du théorème spectral." },
    { tier: "application", prompt: "Trouve les points critiques de $f(x, y) = x^3 - 3x + y^2$ et détermine leur nature par la hessienne.", solution: "$\\nabla f = (3x^2 - 3,\\, 2y) = (0, 0) \\iff x = \\pm 1,\\, y = 0$ : deux points critiques. Hessienne : $H(x, y) = \\begin{pmatrix} 6x & 0 \\\\ 0 & 2 \\end{pmatrix}$. En $(1, 0)$ : valeurs propres $6$ et $2$, toutes strictement positives ($S^{++}$) — **minimum local strict**, de valeur $f(1, 0) = -2$. En $(-1, 0)$ : valeurs propres $-6$ et $2$, signes opposés — **col** (point-selle) : on monte dans une direction, on descend dans l'autre ■. Lecture en dimension $2$ : $rt - s^2 = 12 > 0$ puis $r = 6 > 0$ au premier point ; $rt - s^2 = -12 < 0$ au second — le déterminant a tranché." },
    { tier: "challenge", prompt: "Soit $f$ différentiable sur $\\mathbb{R}^2$ avec $df = 0$ partout. Démontre que $f$ est constante, via la formule de l'accroissement intégral le long d'un segment. Où l'hypothèse de connexité travaille-t-elle ?", solution: "Soient $a, b \\in \\mathbb{R}^2$ et $\\gamma(t) = a + t(b - a)$ le segment. La fonction $t \\mapsto f(\\gamma(t))$ est dérivable de dérivée $\\langle \\nabla f(\\gamma(t)),\\, b - a \\rangle = 0$ : donc $f(b) - f(a) = \\int_0^1 0\\, dt = 0$ — $f(b) = f(a)$ pour tous $a, b$ : constante ■. La connexité : $\\mathbb{R}^2$ est **convexe**, le segment reste dedans — sur un ouvert connexe par arcs quelconque, on chaîne des segments le long d'un chemin polygonal (et le programme ne te demande la démonstration que dans le cas convexe). Sur un ouvert **non connexe**, le résultat tombe : une fonction valant $0$ sur un morceau et $1$ sur l'autre a une différentielle nulle sans être constante." },
    { tier: "exam", prompt: "Optimisation sous contrainte : maximiser $f(x, y) = xy$ sur le cercle $g(x, y) = x^2 + y^2 - 2 = 0$. (1) Justifie l'EXISTENCE d'un maximum. (2) Écris la condition $\\nabla f \\parallel \\nabla g$ et résous le système. (3) Conclus : maximum, minimum, et les points où ils sont atteints. (4) Vérifie en paramétrant le cercle par $(\\sqrt{2}\\cos\\theta, \\sqrt{2}\\sin\\theta)$. (5) Décris l'espace tangent $T_{(1,1)}X$ au cercle.", solution: "(1) Le cercle est **fermé borné** dans $\\mathbb{R}^2$, donc compact ; $f$ est continue (polynomiale) : le théorème des bornes atteintes garantit un maximum et un minimum — ton chapitre topologie travaille ici. (2) $\\nabla f = (y, x)$ et $\\nabla g = (2x, 2y)$ : la colinéarité donne $y = 2\\lambda x$ et $x = 2\\lambda y$, d'où $y = 4\\lambda^2 y$ — si $y \\neq 0$, $\\lambda = \\pm\\frac{1}{2}$ et $x = \\pm y$ ; le cas $y = 0$ force $x = 0$, hors du cercle. Avec la contrainte $2x^2 = 2$ : les quatre points $(\\pm 1, \\pm 1)$. (3) $f(1,1) = f(-1,-1) = 1$ ; $f(1,-1) = f(-1,1) = -1$ : maximum $1$ en $\\pm(1,1)$, minimum $-1$ en $\\pm(1,-1)$ ■. (4) $f = 2\\cos\\theta\\sin\\theta = \\sin(2\\theta)$ : maximum $1$ atteint en $\\theta = \\frac{\\pi}{4}$, soit le point $(1,1)$ ✓ — la paramétrisation confirme. (5) $T_{(1,1)}X = \\ker dg(1,1)$ : les vecteurs $v$ tels que $\\langle (2, 2), v \\rangle = 0$ — la droite dirigée par $(1, -1)$, tangente au cercle, perpendiculaire au rayon ■. Et note la géométrie de l'optimum : en $(1,1)$, $\\nabla f = (1,1)$ est bien colinéaire à $\\nabla g = (2,2)$ — l'hyperbole de niveau $xy = 1$ **embrasse** le cercle sans le traverser." },
  ],
  practice: [
    { tier: "warmup", label: "Le gradient au point", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4);
      return { prompt: `$f(x, y) = ${a}x^2 + ${b}y^2$ : donne la première composante de $\\nabla f(1, 1)$.`, answer: 2 * a, solution: `$\\nabla f = (${2 * a}x,\\, ${2 * b}y)$ : en $(1, 1)$, première composante $${2 * a}$ — la partielle en $x$, pente du profil à $y$ figé.` };
    } },
    { tier: "warmup", label: "La pente dans une direction", make: (r) => {
      const g1 = randint(r, 1, 3); const g2 = randint(r, 1, 3); const v1 = randint(r, -2, 2); const v2 = randint(r, 1, 2);
      return { prompt: `$\\nabla f(a) = (${g1}, ${g2})$ et $v = (${v1}, ${v2})$ : calcule la dérivée directionnelle $\\langle \\nabla f(a), v \\rangle$.`, answer: g1 * v1 + g2 * v2, solution: `$${g1} \\times (${v1}) + ${g2} \\times ${v2} = ${g1 * v1 + g2 * v2}$ — le produit scalaire avec le gradient donne la pente de chaque direction.` };
    } },
    { tier: "application", label: "Le déterminant de la hessienne", make: (r) => {
      const a = randint(r, 1, 3); const b = randint(r, 0, 4); const c = randint(r, 1, 3);
      return { prompt: `$f(x, y) = ${a}x^2 + ${b}xy + ${c}y^2$ : calcule $rt - s^2$, le déterminant de la hessienne.`, answer: 4 * a * c - b * b, solution: `$H = \\begin{pmatrix} ${2 * a} & ${b} \\\\ ${b} & ${2 * c} \\end{pmatrix}$ : $rt - s^2 = ${2 * a} \\times ${2 * c} - ${b}^2 = ${4 * a * c - b * b}$.` };
    } },
    { tier: "application", label: "Minimum ou col ?", make: (r) => {
      const a = randint(r, 1, 3); const b = randint(r, 1, 5); const c = randint(r, 1, 3); const d = 4 * a * c - b * b;
      return { prompt: `$f(x, y) = ${a}x^2 + ${b}xy + ${c}y^2$ : l'origine est-elle un minimum local strict ? (1 oui, 0 non)`, answer: d > 0 ? 1 : 0, solution: `$rt - s^2 = ${d}$ ${d > 0 ? `> 0$ et $r = ${2 * a} > 0$ : hessienne dans $S^{++}$, **minimum** strict (1)` : `\\leq 0$ : ${d < 0 ? "valeurs propres de signes opposés — un **col** (0)" : "cas dégénéré — pas de conclusion par la hessienne, et ici pas un minimum strict (0)"}`}.` };
    } },
    { tier: "challenge", label: "Lagrange sur le cercle", make: (r) => {
      const k = randint(r, 1, 5);
      return { prompt: `Maximum de $f(x, y) = xy$ sous la contrainte $x^2 + y^2 = ${2 * k}$ ?`, answer: k, solution: `$\\nabla f \\parallel \\nabla g$ donne $x^2 = y^2$ ; la contrainte force $2x^2 = ${2 * k}$, donc $xy = \\pm ${k}$ : maximum $${k}$, atteint en $x = y = \\pm\\sqrt{${k}}$ — l'hyperbole de niveau tangente au cercle.` };
    } },
  ],
};

export default [ideauxDivisibilite, fonctionsGeneratrices, calculDifferentiel];
