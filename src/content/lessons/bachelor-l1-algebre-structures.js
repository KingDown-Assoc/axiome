// Field "Algebra" — BACHELOR module (l1 year), licence de mathématiques.
// Official MPSI/MP2I programme (arrêté 2021), chapters "Structures
// algébriques usuelles" (internal composition laws, groups and subgroups,
// group morphisms, rings, fields — quotient structures are off-programme),
// "Calcul matriciel et systèmes linéaires" (matrix operations, invertible
// matrices, elementary row operations, Gaussian pivot, linear systems:
// structure of the solution set) and "Polynômes et fractions rationnelles"
// (the ring K[X], arithmetic mirroring Z: euclidean division, gcd,
// irreducibles; roots and multiplicities, factorization over C and R,
// Lagrange interpolation; rational fractions and partial-fraction
// decomposition in simple cases). Singapore method at university level:
// Concrete = ONE explicit object handled (the clock Z/12, a 3x3 pivot run,
// X^4 - 1 factored); Pictorial = the drawing that carries the idea (the
// symmetry square, the staircase of the pivot, the root-multiplicity graph
// contact); Abstract = the axioms and theorems. Big ideas named; exam =
// colle-style problems; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Algebraic structures (MPSI: structures algébriques usuelles) —
const structuresAlgebriques = {
  id: "algebra.bachelor.structures-algebriques",
  level: "bachelor", domain: "algebra",
  title: "Groupes, anneaux, corps",
  tagline: "Une table, des axiomes — et mille situations traitées d'un seul geste.",
  prereqs: ["logic.bachelor.raisonnement-ensembles", "numbers.high.bezout-gauss"],
  intuition:
    "Les heures de l'horloge s'additionnent (9 + 5 = 2), les rotations se composent, les matrices inversibles se multiplient, les réels non nuls aussi — quatre mondes, **une même grammaire** : une loi, l'associativité, un neutre, des inverses.\n\nDonner un nom à cette grammaire — **groupe** — c'est démontrer une fois pour toutes ce qui vaut dans les quatre mondes à la fois : l'algèbre des structures commence ici.",
  depths: {
    discovery:
      "**Avec les mains** : prends l'horloge — $\\{0, 1, \\ldots, 11\\}$ avec l'addition modulo 12 : vérifie les axiomes sur la table : associative ✓, neutre $0$ ✓, et chaque heure a son inverse ($5 + 7 = 0$ : l'inverse de 5 est 7) — un **groupe** de douze éléments que tu portes au poignet ; puis casse un axiome pour le sentir : $(\\mathbb{N}, +)$ a un neutre mais **aucun inverse** (impossible de défaire $+3$) : pas un groupe — l'axiome manquant se touche.",
    standard:
      "**En image** : le groupe des **symétries** — les 4 transformations qui préservent un rectangle (identité, deux réflexions, demi-tour) : compose-les sur le dessin et dresse la **table de Cayley** $4 \\times 4$ : chaque ligne est une permutation des éléments (le « sudoku » des groupes — conséquence de l'inversibilité !), la table est symétrique (groupe abélien) — la structure se VOIT ; et un **sous-groupe** se teste en trois points : non vide, stable par la loi, stable par inverse — $\\{$identité, demi-tour$\\}$ passe le test : un petit groupe vivant dans le grand.",
    advanced:
      "**Dans la tête** : l'échelle des structures — un **anneau** $(A, +, \\times)$ superpose deux lois (groupe abélien pour $+$, associativité et distributivité pour $\\times$) : $\\mathbb{Z}$, $\\mathbb{R}[X]$, les matrices carrées — attention : $\\times$ n'y est pas toujours inversible ni même commutatif (les matrices !), et un produit nul n'impose pas un facteur nul hors des anneaux **intègres** ; un **corps** exige l'inverse de tout élément non nul : $\\mathbb{Q}, \\mathbb{R}, \\mathbb{C}$ — la maison du calcul fractionnaire. Et les **morphismes** transportent : $\\exp : (\\mathbb{R}, +) \\to (\\mathbb{R}_+^*, \\times)$ vérifie $\\exp(a + b) = \\exp(a)\\exp(b)$ — un dictionnaire entre deux groupes qui traduit les structures l'une dans l'autre — big idea *Equivalence* : reconnaître la même structure sous deux habits, c'est tout le métier de l'algèbre (le programme s'arrête aux définitions et premiers exemples : les quotients attendent la suite).",
  },
  keyIdea: "**Groupe** : loi associative, neutre, inverses (l'horloge, les symétries, $GL_n$) ; **sous-groupe** : non vide, stable loi et inverse. **Anneau** : deux lois superposées ($\\mathbb{Z}$, $K[X]$, matrices — produit pas toujours inversible ni intègre) ; **corps** : tout non-nul inversible ($\\mathbb{Q}, \\mathbb{R}, \\mathbb{C}$). **Morphisme** : $f(a \\star b) = f(a) \\diamond f(b)$ — le dictionnaire entre structures (*Equivalence*).",
  why:
    "Pourquoi des axiomes plutôt que des exemples ? Pour l'**économie démonstrative** : « l'inverse est unique », « le neutre est unique », $(ab)^{-1} = b^{-1}a^{-1}$ — prouvés une fois dans le groupe abstrait, vrais pour les heures, les rotations, les matrices, les permutations et tous les groupes à venir. C'est le geste fondateur de l'algèbre moderne — et ton monde le confirme : la cryptographie entière (RSA des expertes, courbes elliptiques, AES) calcule dans des groupes et des corps finis : la structure EST l'outil.",
  examples: [
    { title: "L'horloge est un groupe", steps: [
      { p: "$\\{0, \\ldots, 11\\}$, addition mod 12 : associative, neutre 0, inverse de $k$ : $12 - k$." },
      { p: "$9 + 5 = 2$ : le calcul circulaire — ton arithmétique des congruences, devenue structure." },
    ] },
    { title: "exp, le dictionnaire", steps: [
      { p: "$\\exp(a + b) = \\exp(a)\\exp(b)$ : morphisme de $(\\mathbb{R}, +)$ vers $(\\mathbb{R}_+^*, \\times)$." },
      { p: "Il traduit les additions en multiplications — bijectif : les deux groupes sont jumeaux." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Parmi ces ensembles munis de leur loi, lesquels sont des groupes ? $(\\mathbb{Z}, +)$ ; $(\\mathbb{N}, +)$ ; $(\\mathbb{R}, \\times)$ ; $(\\mathbb{R}^*, \\times)$. Pour chaque échec, nomme l'axiome fautif.", solution: "$(\\mathbb{Z}, +)$ : **groupe** ✓ ; $(\\mathbb{N}, +)$ : **non** — pas d'inverses (rien ne défait $+3$ dans $\\mathbb{N}$) ; $(\\mathbb{R}, \\times)$ : **non** — $0$ n'a pas d'inverse ; $(\\mathbb{R}^*, \\times)$ : **groupe** ✓ (retirer le zéro suffit) — le diagnostic axiome par axiome : c'est l'exercice fondateur, et l'échec instruit autant que la réussite." },
    { tier: "warmup", prompt: "Dans un groupe $(G, \\star)$, démontre que le neutre est unique, puis que l'inverse de chaque élément est unique.", solution: "Deux neutres $e, e'$ : $e \\star e' = e'$ (car $e$ neutre) et $e \\star e' = e$ (car $e'$ neutre) — donc $e = e'$ ■ ; deux inverses $b, c$ de $a$ : $b = b \\star e = b \\star (a \\star c) = (b \\star a) \\star c = e \\star c = c$ ■ — deux lignes chacune, valables dans TOUS les groupes d'un coup : l'économie démonstrative en acte — note où l'associativité travaille : sans elle, rien ne tient." },
    { tier: "application", prompt: "Montre que $H = \\{2^k : k \\in \\mathbb{Z}\\}$ est un sous-groupe de $(\\mathbb{R}_+^*, \\times)$ par le test en trois points, puis exhibe le morphisme naturel de $(\\mathbb{Z}, +)$ vers $H$.", solution: "Non vide ($1 = 2^0$) ✓ ; stable : $2^k \\times 2^l = 2^{k+l} \\in H$ ✓ ; inverses : $(2^k)^{-1} = 2^{-k} \\in H$ ✓ — sous-groupe ■. Le morphisme : $\\varphi(k) = 2^k$ — $\\varphi(k + l) = \\varphi(k)\\varphi(l)$ : il traduit l'addition des exposants en multiplication des puissances — c'est TON logarithme binaire lu à l'envers, et le dictionnaire est bijectif : $(\\mathbb{Z}, +)$ et $H$ sont le même groupe sous deux habits." },
    { tier: "challenge", prompt: "Dans l'anneau $\\mathcal{M}_2(\\mathbb{R})$ : trouve deux matrices non nulles $A, B$ avec $AB = 0$, et conclus sur l'intégrité. Pourquoi « $AB = 0 \\Rightarrow A = 0$ ou $B = 0$ », si confortable dans $\\mathbb{R}$, est-il un PRIVILÈGE et non un droit ?", solution: "$A = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$, $B = \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}$ : $AB = 0$ avec $A, B \\neq 0$ — $\\mathcal{M}_2(\\mathbb{R})$ n'est **pas intègre** : des diviseurs de zéro y vivent. La règle du produit nul est un privilège des anneaux **intègres** (et des corps) : dans $\\mathbb{R}$ on l'utilise pour résoudre les équations-produits ; dans les matrices, simplifier par $A$ dans $AB = AC$ est INTERDIT sans inversibilité — l'axiomatique délimite les gestes permis : c'est exactement son travail." },
    { tier: "exam", prompt: "Soit $U_n = \\{z \\in \\mathbb{C} : z^n = 1\\}$ l'ensemble des racines $n$-ièmes de l'unité. (1) Montre que $(U_n, \\times)$ est un groupe (test sous-groupe de $(\\mathbb{C}^*, \\times)$). (2) Montre que $\\varphi : k \\mapsto e^{2ik\\pi/n}$ est un morphisme surjectif de $(\\mathbb{Z}, +)$ sur $U_n$. (3) Pour quels $k$ a-t-on $\\varphi(k) = 1$ ? (4) En quoi cette situation — l'horloge, les racines de l'unité, les congruences — est-elle trois fois le MÊME groupe ?", solution: "(1) Non vide ($1 \\in U_n$) ; stable : $(zw)^n = z^n w^n = 1$ ✓ ; inverse : $(z^{-1})^n = (z^n)^{-1} = 1$ ✓ — sous-groupe de $(\\mathbb{C}^*, \\times)$ ■. (2) $\\varphi(k + l) = e^{2i(k+l)\\pi/n} = \\varphi(k)\\varphi(l)$ ✓ morphisme ; surjectif : toute racine $n$-ième s'écrit $e^{2ik\\pi/n}$ (tes expertes !). (3) $\\varphi(k) = 1 \\iff n \\mid k$ — les **multiples** de $n$. (4) Les trois mondes calculent **modulo** $n$ : ajouter des heures, multiplier des racines, additionner des classes — le morphisme $\\varphi$ replie $\\mathbb{Z}$ sur le cercle en enroulant par tours de $n$ : un seul groupe cyclique à $n$ éléments sous trois habits — *Equivalence* au sommet : reconnaître la structure commune, c'est avoir compris le chapitre (et c'est le groupe où vivront Diffie-Hellman et les logarithmes discrets de la crypto)." },
  ],
  practice: [
    { tier: "warmup", label: "L'inverse de l'horloge", make: (r) => {
      const n = pick(r, [12, 24, 60]); const k = randint(r, 1, n - 1);
      return { prompt: `Dans $(\\mathbb{Z}/${n}\\mathbb{Z}, +)$ (l'horloge à ${n}) : l'inverse de $${k}$ ?`, answer: n - k, solution: `$${k} + ${n - k} = ${n} \\equiv 0$ — **${n - k}**.` };
    } },
    { tier: "application", label: "Le diagnostic d'axiome", make: (r) => {
      const cas = pick(r, [["(\\mathbb{N}, +)", 0, "pas d'inverses"], ["(\\mathbb{Z}, +)", 1, "groupe"], ["(\\mathbb{R}, \\times)", 0, "0 sans inverse"], ["(\\mathbb{Q}^*, \\times)", 1, "groupe"]]);
      return { prompt: `$${cas[0]}$ : groupe (1) ou pas (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Groupe" : "Non"}** — ${cas[2]}.` };
    } },
    { tier: "challenge", label: "Le morphisme calcule", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4);
      return { prompt: `$\\varphi(k) = 2^k$ morphisme de $(\\mathbb{Z},+)$ : $\\varphi(${a})\\times\\varphi(${b}) = \\varphi(\\,?\\,)$`, answer: a + b, solution: `$2^{${a}} \\times 2^{${b}} = 2^{${a + b}}$ — $\\varphi(${a + b})$ : l'addition traduite en multiplication.` };
    } },
  ],
};

// — Matrix calculus and linear systems (MPSI: calcul matriciel, pivot) —
const matricesSystemes = {
  id: "algebra.bachelor.matrices-systemes",
  level: "bachelor", domain: "algebra",
  title: "Calcul matriciel et pivot de Gauss",
  tagline: "Le pivot de Gauss : un algorithme pour résoudre tout système linéaire.",
  prereqs: ["algebra.high.matrices", "algebra.high.systemes"],
  intuition:
    "Tes systèmes 2×2 se résolvaient à la main ; la licence affronte le $n \\times n$ — et il faut un **algorithme** : le **pivot de Gauss**, qui transforme tout système en escalier par trois opérations élémentaires.\n\nDerrière l'algorithme, une structure : le système EST une équation matricielle $AX = B$, et le pivot dialogue avec l'**inversibilité** de $A$.",
  depths: {
    discovery:
      "**Avec les mains** : déroule un pivot $3 \\times 3$ — $\\begin{cases} x + 2y + z = 5 \\\\ 2x + 5y + 3z = 12 \\\\ x + 3y + 4z = 11 \\end{cases}$ : $L_2 \\leftarrow L_2 - 2L_1$ et $L_3 \\leftarrow L_3 - L_1$ tuent les $x$ du bas ; puis $L_3 \\leftarrow L_3 - L_2$ tue le $y$ : l'**escalier** $\\begin{cases} x + 2y + z = 5 \\\\ y + z = 2 \\\\ 2z = 4 \\end{cases}$ — la remontée livre $z = 2, y = 0, x = 3$ : trois gestes, et n'importe quelle taille suit le même rituel.",
    standard:
      "**En image** : le pivot **dessine un escalier** — les coefficients s'annulent sous la diagonale, marche après marche : visualise la matrice se vider par le bas-gauche — big idea *Diagrams* : la forme échelonnée se LIT ; et trois issues seulement : escalier complet (pivots partout : **solution unique**), une ligne $0 = c$ avec $c \\neq 0$ (**aucune solution** : contraintes incompatibles — tes droites parallèles, en dimension $n$), une ligne $0 = 0$ (**une infinité** : un paramètre libre par marche manquante) — l'escalier diagnostique avant de résoudre.",
    advanced:
      "**Dans la tête** : le système devient **objet** — $AX = B$ : une équation dans l'anneau des matrices (ton chapitre structures : produit non commutatif, pas toujours inversible !) ; si $A$ est **inversible**, la solution s'écrit $X = A^{-1}B$ — unique, et le pivot le détecte (pivots non nuls partout) ET calcule $A^{-1}$ (mener le pivot sur $[A \\mid I_n]$ jusqu'à $[I_n \\mid A^{-1}]$ : chaque opération élémentaire est une multiplication à gauche par une matrice inversible — l'algorithme EST un produit de matrices). Les opérations élémentaires préservent l'ensemble des solutions (*Equivalence* : transformer sans rien perdre) — et ce dialogue pivot ↔ inversibilité ↔ structure des solutions est exactement ce que le **rang** formalisera au chapitre des applications linéaires : l'escalier d'aujourd'hui compte déjà les dimensions de demain.",
  },
  keyIdea: "**Pivot de Gauss** : trois opérations élémentaires ($L_i \\leftrightarrow L_j$, $L_i \\leftarrow \\lambda L_i$, $L_i \\leftarrow L_i + \\lambda L_j$) qui préservent les solutions (*Equivalence*) → forme **échelonnée** : unique / vide / infinité se lisent sur l'escalier (*Diagrams*). $AX = B$ avec $A$ inversible ⟺ pivots partout ⟺ $X = A^{-1}B$ — et $[A \\mid I] \\to [I \\mid A^{-1}]$ calcule l'inverse.",
  why:
    "Pourquoi un algorithme quand la formule $X = A^{-1}B$ existe ? Parce que la formule est un théorème, le pivot un **outil de production** : $O(n^3)$ opérations, programmable en dix lignes — c'est lui qui tourne dans chaque solveur numérique, chaque moindre carré, chaque simulation. Et conceptuellement, le pivot est le microscope du linéaire : il révèle le rang, l'inversibilité, les dépendances entre équations — la moitié de l'algèbre linéaire de L1 est une relecture de cet escalier.",
  examples: [
    { title: "L'escalier en trois gestes", steps: [
      { p: "$L_2 \\leftarrow L_2 - 2L_1$, $L_3 \\leftarrow L_3 - L_1$, puis $L_3 \\leftarrow L_3 - L_2$ : l'escalier apparaît." },
      { p: "Remontée : $z = 2$, puis $y = 0$, puis $x = 3$ — le rituel, valable en toute taille." },
    ] },
    { title: "L'inverse par le pivot", steps: [
      { p: "$[A \\mid I] \\xrightarrow{\\text{pivot}} [I \\mid A^{-1}]$ : les mêmes gestes, appliqués au témoin $I$." },
      { p: "Chaque opération = une matrice inversible à gauche : l'algorithme est un produit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Échelonne et résous : $\\begin{cases} x + y = 4 \\\\ 2x + 3y + z = 11 \\\\ x + 2y + 2z = 9 \\end{cases}$ — annonce chaque opération élémentaire.", solution: "$L_2 \\leftarrow L_2 - 2L_1$ : $y + z = 3$ ; $L_3 \\leftarrow L_3 - L_1$ : $y + 2z = 5$ ; $L_3 \\leftarrow L_3 - L_2$ : $z = 2$ — remontée : $y = 1$, $x = $ **3** : solution $(3, 1, 2)$ — annoncer les opérations n'est pas du zèle : c'est la trace qui rend le calcul vérifiable, et la rédaction de colle l'exige." },
    { tier: "warmup", prompt: "Échelonne $\\begin{cases} x + y + z = 1 \\\\ 2x + 2y + 2z = 5 \\end{cases}$ puis $\\begin{cases} x + y = 2 \\\\ 2x + 2y = 4 \\end{cases}$ : diagnostique chacun par sa ligne révélatrice.", solution: "Premier : $L_2 - 2L_1$ donne $0 = 3$ — **aucune solution** (deux plans parallèles : contraintes incompatibles) ; second : $L_2 - 2L_1$ donne $0 = 0$ — **une infinité** : $y$ libre, $x = 2 - y$ : la droite entière — les deux lignes-verdict de l'escalier : $0 = c$ tue, $0 = 0$ libère un paramètre." },
    { tier: "application", prompt: "Calcule $A^{-1}$ par la méthode $[A \\mid I]$ pour $A = \\begin{pmatrix} 1 & 2 \\\\ 1 & 3 \\end{pmatrix}$, et vérifie par le produit.", solution: "$\\left[\\begin{smallmatrix} 1 & 2 & | & 1 & 0 \\\\ 1 & 3 & | & 0 & 1 \\end{smallmatrix}\\right]$ — $L_2 \\leftarrow L_2 - L_1$ : $\\left[\\begin{smallmatrix} 1 & 2 & | & 1 & 0 \\\\ 0 & 1 & | & -1 & 1 \\end{smallmatrix}\\right]$ — $L_1 \\leftarrow L_1 - 2L_2$ : $A^{-1} = \\begin{pmatrix} 3 & -2 \\\\ -1 & 1 \\end{pmatrix}$ — vérification : $AA^{-1} = I$ ✓ — le pivot poussé jusqu'à l'identité : descendre PUIS remonter, et le témoin $I$ enregistre tous les gestes." },
    { tier: "challenge", prompt: "Pour quelle(s) valeur(s) de $a$ le système $\\begin{cases} x + y = 1 \\\\ x + ay = 2 \\end{cases}$ admet-il : une solution unique ? aucune ? une infinité ? (Échelonne avec le paramètre.)", solution: "$L_2 - L_1$ : $(a - 1)y = 1$ — si $a \\neq 1$ : pivot vivant, **unique** ($y = \\frac{1}{a-1}$) ; si $a = 1$ : la ligne devient $0 = 1$ — **aucune** solution (et jamais d'infinité ici : le second membre l'interdit) — discuter selon le paramètre, c'est regarder OÙ le pivot peut mourir : l'exercice-type de colle, et le déterminant du chapitre suivant ($a - 1$ justement !) en sera le raccourci." },
    { tier: "exam", prompt: "Soit $A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$. (1) Calcule $A^2$ : que constates-tu ? (2) Montre que $A$ n'est pas inversible de deux façons : par l'absurde avec $A^2$, puis par le pivot. (3) Calcule $(I + A)(I - A)$ et déduis-en que $I + A$ EST inversible, avec son inverse. (4) Morale : dans l'anneau $\\mathcal{M}_2(\\mathbb{R})$, que dire des règles « $x^2 = 0 \\Rightarrow x = 0$ » et « somme d'inversibles » ?", solution: "(1) $A^2 = 0$ : $A$ est **nilpotente** — non nulle, de carré nul. (2) Absurde : si $A^{-1}$ existait, $A = A^{-1}A^2 = A^{-1} \\cdot 0 = 0$, contradiction ■ ; pivot : la première colonne de $A$ est nulle — pas de pivot en colonne 1, l'escalier est incomplet. (3) $(I + A)(I - A) = I - A^2 = I$ ✓ — donc $I + A$ inversible d'inverse $I - A$ ■. (4) « $x^2 = 0 \\Rightarrow x = 0$ » : **fausse** dans $\\mathcal{M}_2$ (les nilpotents la violent) — encore un privilège des anneaux intègres perdu ; et $I + A$ inversible alors que $A$ ne l'est pas : l'inversibilité ne se transmet par AUCUNE addition — l'anneau des matrices enseigne la prudence : chaque règle de $\\mathbb{R}$ doit re-passer l'examen — c'est le chapitre structures appliqué au calcul, et la nilpotence reviendra en force avec la réduction de L2." },
  ],
  practice: [
    { tier: "warmup", label: "Le geste du pivot", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 6); const c = randint(r, 1, 9);
      return { prompt: `$L_2 = (${a * 1}, ${b + a * 2}, ${c + a * 3})$ et $L_1 = (1, 2, 3)$ : après $L_2 \\leftarrow L_2 - ${a}L_1$, le premier coefficient de $L_2$ ?`, answer: 0, solution: `$${a} - ${a} \\times 1 = $ **0** — le pivot tue la colonne.` };
    } },
    { tier: "application", label: "Le verdict de l'escalier", make: (r) => {
      const cas = pick(r, [["0 = 0", 2, "infinité — un paramètre libre"], ["0 = 3", 0, "aucune — contraintes incompatibles"], ["2z = 4", 1, "unique — pivots partout"]]);
      return { prompt: `Dernière ligne après échelonnement : « $${cas[0]}$ » — solutions : aucune (0), unique (1), infinité (2) ?`, answer: cas[1], solution: `**${cas[2]}**.` };
    } },
    { tier: "challenge", label: "La remontée", make: (r) => {
      const z = randint(r, 1, 4); const y = randint(r, 1, 5); const c2 = y + 2 * z;
      return { prompt: `Escalier : $y + 2z = ${c2}$ et $z = ${z}$ — remonte : $y = \\,?$`, answer: y, solution: `$y = ${c2} - ${2 * z} = $ **${y}** — l'escalier se remonte marche à marche.` };
    } },
  ],
};

// — Polynomials and rational fractions (MPSI: K[X], arithmétique, fractions) —
const polynomesFractions = {
  id: "algebra.bachelor.polynomes-fractions",
  level: "bachelor", domain: "algebra",
  title: "Polynômes : l'arithmétique de K[X]",
  tagline: "Division, factorisation, interpolation : les polynômes, un anneau analogue à ℤ.",
  prereqs: ["algebra.high.equations-polynomiales", "numbers.high.nombres-premiers"],
  intuition:
    "Les entiers ont une division euclidienne, un pgcd, des nombres premiers, une factorisation unique — et les **polynômes ont exactement la même arithmétique** : $K[X]$ rejoue $\\mathbb{Z}$, le degré remplaçant la valeur absolue.\n\nAvec un bonus que $\\mathbb{Z}$ n'a pas : les **racines** — l'arithmétique de $K[X]$ dialogue avec la géométrie des graphes.",
  depths: {
    discovery:
      "**Avec les mains** : divise $X^3 + 2X^2 - 5X + 1$ par $X^2 + 1$ — pose la division comme à l'école primaire : quotient $X + 2$, et le reste $-6X - 1$ a un degré **strictement plus petit** que le diviseur : $A = BQ + R$ avec $\\deg R < \\deg B$ — exactement la division des entiers, le degré jouant le rôle de la taille : l'algorithme d'Euclide, Bézout, le pgcd suivent à l'identique (tes expertes, transposées).",
    standard:
      "**En image** : la **multiplicité** d'une racine se DESSINE — $a$ racine simple : le graphe **traverse** l'axe ; racine double ($( X - a)^2$ divise) : le graphe **rebondit**, tangent à l'axe ; triple : traversée aplatie — le contact du graphe avec l'axe code l'exposant du facteur : big idea *Diagrams* ; et la caractérisation différentielle le confirme : $a$ est racine de multiplicité $m$ ⟺ $P(a) = P'(a) = \\cdots = P^{(m-1)}(a) = 0$ et $P^{(m)}(a) \\neq 0$ — le graphe, le facteur, les dérivées : trois langues pour le même contact.",
    advanced:
      "**Dans la tête** : les **irréductibles** — les nombres premiers de $K[X]$ — dépendent du corps : sur $\\mathbb{C}$, d'Alembert-Gauss les réduit aux degrés 1 (tout polynôme se factorise en $(X - a_i)$ : les expertes l'admettaient, la licence l'exploite) ; sur $\\mathbb{R}$ : degrés 1 et degrés 2 à discriminant négatif (les racines complexes conjuguées se recollent par paires : $X^2 + 1$ refuse de se casser dans $\\mathbb{R}$) — un polynôme réel se factorise donc en produit de $(X - a)$ et de trinômes sans racines. Et l'**interpolation de Lagrange** renverse la machine : $n + 1$ points imposent un unique polynôme de degré $\\leq n$ qui passe par tous — la base $L_i(X) = \\prod_{j \\neq i} \\frac{X - x_j}{x_i - x_j}$ (qui vaut 1 en $x_i$, 0 ailleurs) le construit — c'est le polynôme retrouvé depuis ses valeurs : l'outil de l'approximation, des codes correcteurs (Reed-Solomon !) et du partage de secret de Shamir — l'arithmétique de $K[X]$ est une infrastructure de ton monde.",
  },
  keyIdea: "$K[X]$ rejoue $\\mathbb{Z}$ : division euclidienne ($\\deg R < \\deg B$), pgcd-Bézout, **irréductibles** = degré 1 sur $\\mathbb{C}$ (d'Alembert-Gauss), degrés 1 et 2 sans racines sur $\\mathbb{R}$. **Multiplicité** : facteur $(X-a)^m$ ⟺ $P(a) = \\cdots = P^{(m-1)}(a) = 0$ ⟺ le contact du graphe (*Diagrams*). **Lagrange** : $n+1$ points, un unique polynôme de degré $\\leq n$.",
  why:
    "Pourquoi refaire l'arithmétique sur des polynômes ? Parce que la répétition révèle la structure : le couple (division euclidienne → pgcd → factorisation unique) ne dépend pas des entiers — il vaut dans tout anneau euclidien, et K[X] en est le deuxième exemple fondateur (les corps finis de L3, où vit AES, seront construits exactement ainsi : $\\mathbb{F}_2[X]$ modulo un irréductible). Et l'interpolation paie comptant : reconstruire un polynôme depuis ses valeurs, c'est Reed-Solomon sur tes QR codes et Shamir sur les secrets partagés — du L1 directement utile au cyber.",
  examples: [
    { title: "La division posée", steps: [
      { p: "$X^3 + 2X^2 - 5X + 1 = (X^2 + 1)(X + 2) + (-6X - 1)$ — $\\deg R = 1 < 2$ ✓." },
      { p: "Le degré remplace la taille : Euclide, pgcd, Bézout suivent tels quels." },
    ] },
    { title: "Le rebond de la racine double", steps: [
      { p: "$P = (X - 1)^2(X + 2)$ : en $1$, le graphe rebondit (tangent à l'axe) ; en $-2$, il traverse." },
      { p: "Et $P(1) = P'(1) = 0$, $P''(1) \\neq 0$ : les dérivées comptent le contact." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pose la division euclidienne de $X^3 - 3X + 2$ par $X - 1$, et conclus : $1$ est-il racine ? Quel théorème relie le reste et la valeur $P(1)$ ?", solution: "Quotient $X^2 + X - 2$, reste **0** : $X^3 - 3X + 2 = (X - 1)(X^2 + X - 2)$ — donc $1$ est racine ✓. Le lien : le reste de la division par $(X - a)$ vaut $P(a)$ (évalue $A = (X-a)Q + R$ en $a$ : $R = P(a)$, le reste étant constant) — racine ⟺ reste nul ⟺ $(X - a)$ divise : le pont arithmétique-racines du chapitre." },
    { tier: "warmup", prompt: "Détermine la multiplicité de la racine $1$ dans $P = X^4 - 2X^3 + 2X - 1$ par les dérivées successives, et décris le contact du graphe avec l'axe en ce point.", solution: "$P(1) = 0$ ✓ ; $P' = 4X^3 - 6X^2 + 2$ : $P'(1) = 0$ ✓ ; $P'' = 12X^2 - 12X$ : $P''(1) = 0$ ✓ ; $P''' = 24X - 12$ : $P'''(1) = 12 \\neq 0$ — multiplicité **3** : le graphe **traverse en s'aplatissant** (contact d'ordre 3, comme $x^3$ en zéro) — et en effet $P = (X-1)^3(X+1)$ : les dérivées ont compté le facteur sans factoriser." },
    { tier: "application", prompt: "Factorise $X^4 - 1$ en irréductibles sur $\\mathbb{C}$, puis sur $\\mathbb{R}$ — et explique pourquoi $X^2 + 1$ est irréductible sur $\\mathbb{R}$ mais pas sur $\\mathbb{C}$.", solution: "Sur $\\mathbb{C}$ : les quatre racines quatrièmes de l'unité — $(X-1)(X+1)(X-i)(X+i)$ ; sur $\\mathbb{R}$ : les conjuguées $\\pm i$ se **recollent** : $(X - i)(X + i) = X^2 + 1$ — d'où $(X-1)(X+1)(X^2+1)$ — et $X^2 + 1$ est irréductible sur $\\mathbb{R}$ car sans racine réelle (discriminant $< 0$) et de degré 2 : sur $\\mathbb{C}$, d'Alembert-Gauss casse tout en degrés 1 ; sur $\\mathbb{R}$, les paires conjuguées résistent en trinômes — le corps de base décide des atomes." },
    { tier: "challenge", prompt: "Construis par Lagrange le polynôme $P$ de degré $\\leq 2$ tel que $P(0) = 1$, $P(1) = 3$, $P(2) = 7$ — écris les trois briques $L_i$, assemble, développe, et vérifie.", solution: "$L_0 = \\frac{(X-1)(X-2)}{2}$, $L_1 = \\frac{X(X-2)}{-1}$, $L_2 = \\frac{X(X-1)}{2}$ (chacune vaut 1 chez elle, 0 chez les autres) — $P = 1 \\cdot L_0 + 3 \\cdot L_1 + 7 \\cdot L_2 = \\frac{(X-1)(X-2)}{2} - 3X(X-2) + \\frac{7X(X-1)}{2}$ — développe : $P = X^2 + X + 1$ ; vérification : $P(0) = 1$ ✓, $P(1) = 3$ ✓, $P(2) = 7$ ✓ — trois points, un polynôme : la base de Lagrange assemble la réponse valeur par valeur, et l'unicité (deux candidats différeraient d'un degré $\\leq 2$ à trois racines : nul) verrouille." },
    { tier: "exam", prompt: "Le partage de secret de Shamir (2-parmi-3) : un secret $s = P(0)$ est caché dans un polynôme de degré 1, et trois parts sont distribuées : $P(1) = 5$, $P(2) = 8$, $P(3) = 11$. (1) Pourquoi UNE part seule ne révèle rien sur $s$ ? (2) Reconstruis $P$ par Lagrange avec les parts 1 et 2, et donne le secret. (3) Vérifie avec la part 3. (4) Généralise : pour un seuil « $k$ parts nécessaires », quel degré choisir et quel théorème du chapitre garantit le schéma ?", solution: "(1) Une part = un point : il passe une **infinité** de droites par un point — toutes les valeurs de $P(0)$ restent possibles : zéro information. (2) Degré 1, points $(1, 5)$ et $(2, 8)$ : $P = 5\\frac{X - 2}{-1} + 8\\frac{X - 1}{1} = 3X + 2$ — secret $s = P(0) = $ **2**. (3) $P(3) = 11$ ✓ — la part 3 est cohérente : n'importe quelle paire reconstruit le même secret. (4) Seuil $k$ ⟹ degré $k - 1$ : $k$ points déterminent un **unique** polynôme de degré $\\leq k - 1$ (Lagrange : existence ; unicité : la différence aurait $k$ racines pour un degré $< k$, donc nulle) — et $k - 1$ points laissent un degré de liberté entier : tout secret reste équiprobable — l'interpolation de Lagrange EST le schéma de Shamir : ton L1 d'algèbre protège des secrets réels." },
  ],
  practice: [
    { tier: "warmup", label: "Le reste est P(a)", make: (r) => {
      const a = randint(r, 1, 3); const b = randint(r, 1, 5); const c = randint(r, 1, 6);
      return { prompt: `Reste de la division de $X^2 + ${b}X + ${c}$ par $X - ${a}$ ? (évalue !)`, answer: a * a + b * a + c, solution: `$P(${a}) = ${a * a} + ${b * a} + ${c} = $ **${a * a + b * a + c}** — le reste, sans poser la division.` };
    } },
    { tier: "application", label: "Compter le contact", make: (r) => {
      const m = pick(r, [[1, "traverse franchement"], [2, "rebondit, tangent à l'axe"], [3, "traverse en s'aplatissant"]]);
      return { prompt: `Le graphe ${m[1]} en $a$ : multiplicité de la racine ?`, answer: m[0], solution: `**${m[0]}** — le contact code l'exposant du facteur $(X-a)^{${m[0]}}$.` };
    } },
    { tier: "challenge", label: "Les atomes selon le corps", make: (r) => {
      const cas = pick(r, [["X^2 + 1", "\\mathbb{R}", 1], ["X^2 + 1", "\\mathbb{C}", 0], ["X^2 - 1", "\\mathbb{R}", 0], ["X^2 + 4", "\\mathbb{R}", 1]]);
      return { prompt: `$${cas[0]}$ est-il irréductible sur $${cas[1]}$ ? (1 = oui, 0 = non)`, answer: cas[2], solution: `**${cas[2] ? "Oui" : "Non"}** — ${cas[2] ? "degré 2 sans racine dans" : "il se factorise dans"} $${cas[1]}$.` };
    } },
  ],
};

export default [structuresAlgebriques, matricesSystemes, polynomesFractions];
