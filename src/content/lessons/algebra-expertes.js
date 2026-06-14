// Field "Algebra" — HIGH module (expertes year): polynomial equations and
// matrices. Official terminale MATHS EXPERTES programme. POLYNOMIAL EQUATIONS:
// complex solutions of a second-degree equation with real coefficients
// (conjugate roots when Δ < 0), factorization of z^n − a^n by z − a, if
// P(a) = 0 then z − a divides P, a degree-n polynomial has AT MOST n roots —
// REQUIRED PROOFS: both factorizations and the root-count bound —, solving a
// degree-3 equation with a known root. MATRICES: matrix as a table of numbers,
// square/column/row matrices, operations (sum, scalar multiple, PRODUCT — not
// commutative!), identity, INVERSE, POWERS of a square matrix; using matrix
// calculus to solve a linear system (X = A⁻¹B), study coupled linear
// recurrent sequences (U_{n+1} = A U_n, hence U_n = A^n U_0), represent
// geometric transformations.
import { randint, pick } from "../../core/exercises.js";

// — Polynomial equations (programme: Δ < 0, factorisations, ⩽ n racines) —
const equationsPolynomiales = {
  id: "algebra.high.equations-polynomiales",
  level: "high", domain: "algebra",
  title: "Équations polynomiales dans ℂ",
  tagline: "Δ négatif livre ses racines conjuguées — et un degré n plafonne à n racines.",
  prereqs: ["algebra.high.equation-second-degre", "numbers.high.complexes"],
  intuition:
    "Ton discriminant de première butait sur $\\Delta < 0$ : « pas de solution réelle ». Dans $\\mathbb{C}$, le verdict change : $\\sqrt{\\Delta}$ devient $i\\sqrt{-\\Delta}$, et **deux racines complexes conjuguées** apparaissent : $z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.\n\nPlus aucune équation du second degré n'est muette — et le phénomène est général : tout polynôme se factorise par ses racines.",
  depths: {
    discovery:
      "**Avec les mains** : $z^2 + z + 1 = 0$ — $\\Delta = -3$ : racines $\\dfrac{-1 \\pm i\\sqrt{3}}{2}$ — vérifie : leur somme vaut $-1 = -\\frac{b}{a}$ ✓, leur produit $1 = \\frac{c}{a}$ ✓ (somme et produit survivent dans $\\mathbb{C}$ !) — et les deux racines sont **conjuguées** : pour des coefficients réels, les racines complexes vont toujours par paires miroir.",
    standard:
      "**En image** : la factorisation pivot, **démontrée** — $z^n - a^n = (z - a)(z^{n-1} + az^{n-2} + \\cdots + a^{n-1})$ : développe le membre de droite — télescopage, tout s'annule sauf $z^n - a^n$ ✓ (ta somme géométrique, déguisée !). Conséquence majeure : si $P(a) = 0$, alors $z - a$ **divise** $P$ — écris $P(z) = P(z) - P(a)$ : chaque monôme donne un $c_k(z^k - a^k)$, tous divisibles par $z - a$ ✓ — **une racine, un facteur** : le principe qui guidait ton degré 3 de première, désormais démontré.",
    advanced:
      "**Dans la tête** : le plafond, **démontré** — un polynôme de degré $n$ admet **au plus** $n$ racines : par récurrence sur $n$ — si $P$ de degré $n$ a une racine $a$, alors $P = (z - a)Q$ avec $Q$ de degré $n - 1$, qui a au plus $n - 1$ racines (hypothèse !) ; toute racine de $P$ annule $z - a$ ou $Q$ : au plus $1 + (n - 1) = n$ ✓. La pratique suit : un **degré 3 dont on connaît une racine** se factorise ($P = (z - a)(\\text{second degré})$ par identification) et le discriminant achève — réel ou complexe, les trois racines tombent. Et l'horizon s'ouvre : dans $\\mathbb{C}$, tout polynôme de degré $n$ a *exactement* $n$ racines (comptées avec multiplicité) — le **théorème fondamental de l'algèbre**, conjecturé par Girard, démontré par Gauss : $\\mathbb{C}$ est l'ensemble où l'algèbre s'achève — aucune équation n'y reste sans réponse.",
  },
  keyIdea: "$\\Delta < 0$ : deux racines **complexes conjuguées** $\\frac{-b \\pm i\\sqrt{-\\Delta}}{2a}$. $z^n - a^n = (z - a)(\\cdots)$ (télescopage, démontré) ⟹ $P(a) = 0 \\Rightarrow (z - a)$ divise $P$ — et un degré $n$ a **au plus** $n$ racines (récurrence sur le facteur).",
  why:
    "Pourquoi compter les racines ? Parce que « une racine, un facteur, degré $n$ ⟹ au plus $n$ » est le théorème de structure de toute l'algèbre : il garantit qu'un polynôme est déterminé par ses racines, que deux polynômes de degré $n$ coïncidant en $n + 1$ points sont égaux (l'interpolation !), que les codes correcteurs détectent les erreurs. Et le passage à $\\mathbb{C}$ ferme la quête ouverte par Cardan : l'ensemble où *toute* équation polynomiale capitule existe, et tu y calcules.",
  examples: [
    { title: "Δ négatif, racines conjuguées", steps: [
      { p: "$z^2 + z + 1 = 0$ : $\\Delta = -3$ — racines $\\dfrac{-1 \\pm i\\sqrt{3}}{2}$, conjuguées l'une de l'autre." },
      { p: "Somme $-1$, produit $1$ : tes vérifications de première survivent dans $\\mathbb{C}$." },
    ] },
    { title: "Une racine, un facteur", steps: [
      { p: "$P(z) = z^3 - 1$ et $P(1) = 0$ : alors $z - 1$ divise — $z^3 - 1 = (z - 1)(z^2 + z + 1)$." },
      { p: "Le second facteur livre les deux racines complexes : trois racines pour un degré 3 — le compte est plein." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous $z^2 + z + 1 = 0$ dans $\\mathbb{C}$, et vérifie la somme et le produit des racines.", solution: "$\\Delta = 1 - 4 = -3$ : $z = \\dfrac{-1 \\pm i\\sqrt{3}}{2}$ — deux racines **conjuguées** ; somme $= -1 = -\\frac{b}{a}$ ✓, produit $= \\frac{1 + 3}{4} = 1 = \\frac{c}{a}$ ✓ — le discriminant négatif a cessé d'être une impasse : $i\\sqrt{-\\Delta}$ remplace $\\sqrt{\\Delta}$, tout le reste suit." },
    { tier: "warmup", prompt: "Démontre que $z^3 - a^3 = (z - a)(z^2 + az + a^2)$, et généralise l'idée à $z^n - a^n$.", solution: "Développe : $z^3 + az^2 + a^2z - az^2 - a^2z - a^3 = z^3 - a^3$ ✓ — tout se **télescope** sauf les extrêmes ; en général, $(z - a)(z^{n-1} + az^{n-2} + \\cdots + a^{n-1}) = z^n - a^n$ par le même télescopage (ta somme géométrique !) — la démonstration exigible : la factorisation mère de tout le chapitre." },
    { tier: "application", prompt: "Démontre : si $P(a) = 0$, alors $z - a$ divise $P$ (écris $P(z) = P(z) - P(a)$ monôme par monôme).", solution: "$P(z) = \\sum c_k z^k$ et $P(a) = 0$ : donc $P(z) = P(z) - P(a) = \\sum c_k(z^k - a^k)$ — or chaque $z^k - a^k$ est divisible par $z - a$ (la factorisation précédente !) : leur combinaison aussi — $P(z) = (z - a)Q(z)$ ✓ avec $\\deg Q = n - 1$ : la démonstration exigible — **une racine, un facteur**, et le degré descend d'un cran." },
    { tier: "challenge", prompt: "Résous $z^3 - 6z^2 + 11z - 6 = 0$ sachant que 1 est racine (factorise, puis discriminant).", solution: "$z - 1$ divise : identifie $z^3 - 6z^2 + 11z - 6 = (z - 1)(z^2 - 5z + 6)$ — le second facteur : $\\Delta = 1$, racines 2 et 3 : solutions $\\{1, 2, 3\\}$ — la racine connue casse le degré 3 en degré 2, le discriminant achève : la méthode du programme, exactement ton approfondissement de première — désormais démontré." },
    { tier: "exam", prompt: "Démontre par récurrence qu'un polynôme de degré $n \\geq 1$ admet au plus $n$ racines.", solution: "**Init** : degré 1 — $az + b = 0$ a exactement une racine ($-\\frac{b}{a}$) : au plus 1 ✓. **Hérédité** : soit $P$ de degré $n + 1$ ; s'il n'a aucune racine, fini ($0 \\leq n + 1$) ; sinon, $a$ racine : $P = (z - a)Q$ avec $\\deg Q = n$ — par hypothèse, $Q$ a au plus $n$ racines ; or toute racine de $P$ annule le produit, donc vaut $a$ ou annule $Q$ : au plus $1 + n$ racines ✓. **Conclusion** : pour tout degré ✓ — la démonstration exigible : la factorisation fait descendre le degré, la récurrence empile — et c'est ce plafond qui fonde l'interpolation, l'identification des coefficients et les codes correcteurs : un polynôme ne ment jamais plus de $n$ fois." },
  ],
  practice: [
    { tier: "warmup", label: "Δ négatif apprivoisé", make: (r) => {
      const b = pick(r, [2, 4]); const extra = randint(r, 1, 4);
      const c = (b * b + 4 * extra) / 4 + (b % 2 === 0 ? 0 : 0);
      const cc = b * b / 4 + extra;
      return { prompt: `$z^2 + ${b}z + ${cc} = 0$ : que vaut $-\\Delta$ ?`, answer: 4 * cc - b * b, solution: `$\\Delta = ${b * b} - ${4 * cc} = ${b * b - 4 * cc}$ : $-\\Delta = $ **${4 * cc - b * b}** — racines $\\frac{-${b} \\pm i\\sqrt{${4 * cc - b * b}}}{2}$, conjuguées.` };
    } },
    { tier: "application", label: "Une racine, un facteur", make: (r) => {
      const a = randint(r, 1, 3); const s = a + randint(r, 1, 4); const p = a * (s - a);
      return { prompt: `$z^2 - ${s}z + ${p} = 0$ admet la racine $${a}$ : quelle est l'autre ? (somme $= ${s}$)`, answer: s - a, solution: `Somme des racines $= ${s}$ : l'autre vaut **${s - a}** — somme-produit survit dans $\\mathbb{C}$.` };
    } },
    { tier: "challenge", label: "Le plafond des racines", make: (r) => {
      const n = randint(r, 2, 6);
      return { prompt: `Un polynôme de degré ${n} : combien de racines au maximum ?`, answer: n, solution: `Au plus **${n}** — chaque racine consomme un facteur $(z - a)$, le degré plafonne.` };
    } },
  ],
};

// — Matrices (programme: opérations, inverse, puissances, systèmes) —
const matrices = {
  id: "algebra.high.matrices",
  level: "high", domain: "algebra",
  title: "Le calcul matriciel",
  tagline: "Des tableaux qui se multiplient — et les systèmes tombent en une inversion.",
  prereqs: ["geometry.high.vecteurs-espace", "algebra.high.suites"],
  intuition:
    "Une **matrice** est un tableau de nombres — $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ : deux lignes, deux colonnes — et l'idée de Cayley : en faire un **objet de calcul**, qu'on additionne, qu'on multiplie, qu'on inverse.\n\nLe produit a sa règle propre : **ligne contre colonne** — et il encode d'un coup les systèmes, les transformations et les évolutions couplées.",
  depths: {
    discovery:
      "**Avec les mains** : la somme et le multiple vont de soi (case par case) ; le **produit** demande le geste : le coefficient ligne $i$, colonne $j$ de $AB$ est le **produit scalaire** de la ligne $i$ de $A$ par la colonne $j$ de $B$ — $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix} = \\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$ : ton scalaire de première, industrialisé.",
    standard:
      "**En image** : le produit **n'est pas commutatif** — $AB \\neq BA$ en général (teste deux matrices : l'ordre des transformations compte, comme tourner-puis-pousser diffère de pousser-puis-tourner) ; la **matrice identité** $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ joue le rôle du 1, et l'**inverse** $A^{-1}$ (quand il existe) vérifie $AA^{-1} = I$ — pour le format $2 \\times 2$ : $A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$, à condition que $ad - bc \\neq 0$ : ce nombre, le **déterminant**, arbitre l'inversibilité.",
    advanced:
      "**Dans la tête** : trois métiers pour un calcul — le **système linéaire** $\\begin{cases} x + 2y = 5 \\\\ 3x + 4y = 11 \\end{cases}$ s'écrit $AX = B$ : multiplie par $A^{-1}$ — $X = A^{-1}B$ : la résolution devient une division matricielle ; les **suites couplées** ($u_{n+1} = au_n + bv_n$, $v_{n+1} = cu_n + dv_n$ : le proie-prédateur discret !) s'écrivent $U_{n+1} = AU_n$, donc $U_n = A^nU_0$ — les **puissances** de matrices enchaînent les générations comme $q^n$ enchaînait les années ; et les **transformations** géométriques du plan (rotations, symétries) sont des matrices : composer, c'est multiplier — Cayley (1858) a inventé ce calcul pour elles, le XXe siècle l'a couronné : la mécanique quantique, les graphismes 3D et l'apprentissage profond sont du calcul matriciel à l'échelle industrielle.",
  },
  keyIdea: "Produit : **ligne contre colonne** (le scalaire industrialisé) — **non commutatif** ! Identité $I$, **inverse** $A^{-1}$ ($AA^{-1} = I$, existe ssi $ad - bc \\neq 0$ en $2 \\times 2$). Système : $AX = B \\Rightarrow X = A^{-1}B$ ; suites couplées : $U_{n+1} = AU_n \\Rightarrow U_n = A^nU_0$.",
  why:
    "Pourquoi des tableaux qui calculent ? Parce que le monde est **couplé** : deux populations qui interagissent, trois pixels qui se mélangent, mille neurones qui s'activent — chaque évolution linéaire à plusieurs variables est une matrice, et ses puissances sont l'avenir du système. Le format est si universel que les processeurs modernes ont des instructions dédiées : ton GPU passe sa vie à multiplier des matrices — l'objet de Cayley est devenu l'unité de calcul du XXIe siècle.",
  examples: [
    { title: "Ligne contre colonne", steps: [
      { p: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix}$ : ligne 1 · colonne — $1 \\times 5 + 2 \\times 6 = 17$." },
      { p: "Ligne 2 : $3 \\times 5 + 4 \\times 6 = 39$ — résultat $\\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$ : le scalaire, en série." },
    ] },
    { title: "Le système inversé", steps: [
      { p: "$AX = B$ avec $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ : $\\det = -2 \\neq 0$ — $A^{-1}$ existe." },
      { p: "$X = A^{-1}B$ — la résolution de système, devenue une multiplication." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix}$ — décris le geste ligne-colonne.", solution: "Ligne 1 contre la colonne : $1 \\times 5 + 2 \\times 6 = 17$ ; ligne 2 : $3 \\times 5 + 4 \\times 6 = 39$ — résultat $\\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$ : chaque coefficient est un **produit scalaire** ligne · colonne — ta première, en chaîne de montage." },
    { tier: "warmup", prompt: "Avec $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ et $B = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix}$ : calcule $AB$ et $BA$. Conclusion ?", solution: "$AB = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$ mais $BA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}$ — **différents** : le produit matriciel n'est **pas commutatif** — l'ordre des transformations compte, et c'est la première multiplication de ta scolarité qui désobéit." },
    { tier: "application", prompt: "Calcule l'inverse de $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ et vérifie $AA^{-1} = I$.", solution: "$\\det = 1 \\times 4 - 2 \\times 3 = -2 \\neq 0$ : $A^{-1} = -\\dfrac{1}{2}\\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1{,}5 & -0{,}5 \\end{pmatrix}$ — vérification ligne-colonne : $AA^{-1} = I$ ✓ — échanger la diagonale, nier l'antidiagonale, diviser par le déterminant : la recette $2 \\times 2$ complète." },
    { tier: "challenge", prompt: "Résous le système $x + 2y = 5$, $3x + 4y = 11$ par l'inverse de la matrice précédente.", solution: "$AX = B$ avec $B = \\begin{pmatrix} 5 \\\\ 11 \\end{pmatrix}$ : $X = A^{-1}B = \\begin{pmatrix} -2 \\times 5 + 11 \\\\ 7{,}5 - 5{,}5 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ — $x = 1$, $y = 2$ (vérifie !) — la résolution de système est devenue une multiplication : l'inverse calculé une fois sert pour tous les seconds membres." },
    { tier: "exam", prompt: "Deux populations couplées suivent $u_{n+1} = 0{,}8u_n + 0{,}3v_n$ et $v_{n+1} = 0{,}2u_n + 0{,}7v_n$. Écris l'évolution sous forme matricielle, exprime $U_n$ en fonction de $U_0$, et calcule $U_2$ pour $u_0 = 100$, $v_0 = 50$.", solution: "$U_{n+1} = AU_n$ avec $A = \\begin{pmatrix} 0{,}8 & 0{,}3 \\\\ 0{,}2 & 0{,}7 \\end{pmatrix}$ — par récurrence immédiate : $U_n = A^nU_0$ : **les puissances de la matrice enchaînent les générations**, comme $q^n$ enchaînait les années. $U_1 = \\begin{pmatrix} 95 \\\\ 55 \\end{pmatrix}$, puis $U_2 = AU_1 = \\begin{pmatrix} 0{,}8 \\times 95 + 0{,}3 \\times 55 \\\\ 0{,}2 \\times 95 + 0{,}7 \\times 55 \\end{pmatrix} = \\begin{pmatrix} 92{,}5 \\\\ 57{,}5 \\end{pmatrix}$ — le proie-prédateur discret du programme : une matrice, et les suites géométriques deviennent vectorielles — la chaîne de Markov de la leçon suivante n'est plus qu'à un pas." },
  ],
  practice: [
    { tier: "warmup", label: "Ligne contre colonne", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const x = randint(r, 1, 5); const y = randint(r, 1, 5);
      return { prompt: `Ligne $(${a}\\;\\;${b})$ contre colonne $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ : le coefficient ?`, answer: a * x + b * y, solution: `$${a} \\times ${x} + ${b} \\times ${y} = $ **${a * x + b * y}** — un produit scalaire.` };
    } },
    { tier: "application", label: "Le déterminant arbitre", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const c = randint(r, 1, 4); const d = randint(r, 1, 4);
      return { prompt: `$A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ : que vaut $ad - bc$ ?`, answer: a * d - b * c, solution: `$${a * d} - ${b * c} = $ **${a * d - b * c}** — ${a * d - b * c === 0 ? "nul : pas d'inverse !" : "non nul : $A^{-1}$ existe"}.` };
    } },
    { tier: "challenge", label: "Les puissances enchaînent", make: (r) => {
      const a = pick(r, [2, 3]); const n = randint(r, 2, 4); const u0 = randint(r, 1, 3);
      return { prompt: `$U_{n+1} = AU_n$ avec $A = ${a}I$ (homothétie) et $u_0 = ${u0}$ : que vaut $u_{${n}}$ ?`, answer: u0 * a ** n, solution: `$U_n = A^nU_0 = ${a}^{${n}}U_0$ : $u_{${n}} = $ **${u0 * a ** n}** — la suite géométrique, version matricielle.` };
    } },
  ],
};

export default [equationsPolynomiales, matrices];
