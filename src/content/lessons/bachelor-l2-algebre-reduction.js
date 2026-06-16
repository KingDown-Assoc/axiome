// Field "Algebra" — BACHELOR module (l2 year), licence de mathématiques.
// Official MP/MPI programme (arrêté 2021), chapters "Structures algébriques
// usuelles" (generated subgroups, subgroups of Z, the group and ring Z/nZ,
// monogenous/cyclic groups and their classification, order of an element,
// Lagrange, ideals, gcd via ideals, invertibles of Z/nZ, Fp fields, Chinese
// remainder theorem, Euler's totient and theorem, ideals of K[X]) and
// "Réduction des endomorphismes" split in two lessons: the geometric face
// (stable subspaces, eigenvalues/eigenvectors/eigenspaces, characteristic
// polynomial, diagonalisability criteria) and the algebraic face
// (polynomials of endomorphisms, minimal polynomial, kernel-decomposition
// lemma, annihilating polynomials, trigonalisation, nilpotents,
// Cayley-Hamilton). Singapore method at university level: Concrete = ONE
// explicit object handled (the clock that generates, a 2x2 matrix whose
// eigenvectors are found by hand, A^2 computed against chi_A); Pictorial =
// THE drawing that carries the idea (the wheel of generators, the invariant
// axes that the matrix only stretches, the kernel-decomposition split);
// Abstract = statements and proofs where exigible. Big ideas named; exam
// tiers are full colle-style problems; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Cyclic groups and Z/nZ (MP: structures algébriques usuelles) —
const groupesCycliques = {
  id: "algebra.bachelor.groupes-cycliques",
  level: "bachelor", domain: "algebra",
  title: "Groupes cycliques et ℤ/nℤ",
  tagline: "Groupes cycliques et arithmétique modulaire : théorèmes d'Euler et Fermat, application à RSA.",
  prereqs: ["algebra.bachelor.structures-algebriques", "numbers.high.bezout-gauss"],
  intuition:
    "L'an dernier, l'horloge $\\mathbb{Z}/12\\mathbb{Z}$ était un exemple de groupe ; cette année elle devient un **théorème de classification** : tout groupe engendré par un seul élément est une copie de $\\mathbb{Z}$ ou d'une horloge.\n\nEt en superposant la multiplication, $\\mathbb{Z}/n\\mathbb{Z}$ devient un **anneau** dont les inversibles obéissent au théorème d'**Euler** — la clé mathématique de RSA.",
  depths: {
    discovery:
      "**Avec les mains** : dans $(\\mathbb{Z}/12\\mathbb{Z}, +)$, itère $+5$ : $5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0$ — les **douze** heures défilent : $5$ **engendre** tout le groupe ; itère $+4$ : $4, 8, 0, 4, \\ldots$ — seulement trois heures : $4$ engendre un petit sous-groupe d'**ordre** $3$. Le verdict se calcule : $5$ est premier avec $12$ (générateur), $4$ ne l'est pas — et l'ordre de $k$ vaut toujours $\\frac{12}{\\text{pgcd}(k, 12)}$ : ton arithmétique de Bézout pilote la géométrie du cercle.",
    standard:
      "**En image** : la **roue** à $n$ crans — itérer $+k$, c'est sauter de $k$ crans en tournant : si $\\text{pgcd}(k, n) = 1$, les sauts visitent **tous** les crans avant de boucler (générateur) ; sinon ils retombent sur un sous-cercle de $\\frac{n}{\\text{pgcd}(k,n)}$ crans — big idea *Diagrams* : l'ordre d'un élément se VOIT comme la taille de l'orbite dessinée. Et la classification s'impose : un groupe **monogène** (engendré par un seul élément) infini déroule la roue en droite — c'est $\\mathbb{Z}$ ; fini, c'est la roue $\\mathbb{Z}/n\\mathbb{Z}$ — il n'existe aucune autre forme : *Equivalence* au sommet, deux groupes monogènes de même cardinal sont le même groupe.",
    advanced:
      "**Dans la tête** : l'étage anneau — $\\mathbb{Z}/n\\mathbb{Z}$ muni de $+$ et $\\times$ : ses **inversibles** sont les classes premières avec $n$ (Bézout : $uk + vn = 1$ donne l'inverse $u$), au nombre de $\\varphi(n)$ — l'**indicatrice d'Euler**, multiplicative ($\\varphi(mn) = \\varphi(m)\\varphi(n)$ si premiers entre eux, $\\varphi(p^k) = p^k - p^{k-1}$) ; $\\mathbb{Z}/p\\mathbb{Z}$ est un **corps** exactement quand $p$ est premier — noté $\\mathbb{F}_p$, le premier corps fini de ta vie. Le **théorème chinois** recolle : $\\mathbb{Z}/mn\\mathbb{Z} \\simeq \\mathbb{Z}/m\\mathbb{Z} \\times \\mathbb{Z}/n\\mathbb{Z}$ quand $m \\wedge n = 1$ — résoudre modulo $15$, c'est résoudre modulo $3$ ET modulo $5$ séparément. Et le sommet : l'**ordre divise le cardinal** (Lagrange, démontré dans le cas commutatif), d'où le théorème d'**Euler** — $a^{\\varphi(n)} \\equiv 1 \\pmod n$ pour $a$ premier avec $n$ — dont le petit Fermat ($a^{p-1} \\equiv 1$) est le cas premier : l'exponentiation modulaire tourne en rond, et RSA chiffre dans cette ronde. Même squelette côté polynômes : les **idéaux** de $\\mathbb{Z}$ et de $K[X]$ sont tous engendrés par un seul élément — le pgcd se redéfinit en une ligne d'idéaux, et Bézout devient une évidence structurelle.",
  },
  keyIdea: "Monogène = engendré par un élément : infini $\\simeq \\mathbb{Z}$, fini $\\simeq \\mathbb{Z}/n\\mathbb{Z}$ (*Equivalence*). **Ordre** de $x$ : $x^n = e \\iff d \\mid n$, et l'ordre divise le cardinal (Lagrange). Anneau $\\mathbb{Z}/n\\mathbb{Z}$ : inversibles $\\iff$ premiers avec $n$, corps $\\iff n$ premier ($\\mathbb{F}_p$), **chinois** $\\mathbb{Z}/mn\\mathbb{Z} \\simeq \\mathbb{Z}/m \\times \\mathbb{Z}/n$, **Euler** $a^{\\varphi(n)} \\equiv 1$. Idéaux de $\\mathbb{Z}$ et $K[X]$ : monogènes — Bézout structurel.",
  why:
    "Toute la cryptographie à clé publique vit dans ce chapitre : RSA chiffre par $m \\mapsto m^e \\bmod n$ et déchiffre parce qu'Euler garantit $m^{ed} \\equiv m$ ; Diffie-Hellman échange des secrets dans le groupe cyclique $(\\mathbb{Z}/p\\mathbb{Z})^*$ ; les générateurs de la roue sont les racines primitives qui pilotent les LFSR et les corps de AES (L3). Côté pur : la classification des monogènes est ton premier théorème de structure — dire « tous les groupes de telle forme sont connus » est le geste que l'algèbre répétera jusqu'aux groupes simples.",
  examples: [
    { title: "La roue engendrée", steps: [
      { p: "Dans $\\mathbb{Z}/12\\mathbb{Z}$ : l'orbite de $5$ a $12$ crans (générateur), celle de $4$ en a $3$." },
      { p: "Ordre de $k$ : $\\frac{12}{\\text{pgcd}(k, 12)}$ — Bézout pilote la roue." },
    ] },
    { title: "Euler chiffre", steps: [
      { p: "$n = 15$, $\\varphi(15) = 8$ : pour $a$ premier avec $15$, $a^8 \\equiv 1 \\pmod{15}$." },
      { p: "$2^8 = 256 = 17 \\times 15 + 1$ ✓ — l'exponentiation tourne en rond : RSA s'y cache." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $(\\mathbb{Z}/10\\mathbb{Z}, +)$, calcule l'orbite de $3$ puis celle de $4$. Donne l'ordre de chacun et dis lequel est générateur — vérifie la formule $\\frac{10}{\\text{pgcd}(k, 10)}$.", solution: "Orbite de $3$ : $3, 6, 9, 2, 5, 8, 1, 4, 7, 0$ — **dix** éléments : ordre $10$, **générateur** ($\\text{pgcd}(3, 10) = 1$ ✓). Orbite de $4$ : $4, 8, 2, 6, 0$ — **cinq** éléments : ordre $5 = \\frac{10}{\\text{pgcd}(4, 10)} = \\frac{10}{2}$ ✓. La règle se lit deux fois : sur la roue (l'orbite dessinée) et dans Bézout (le pgcd) — quand les deux langues disent pareil, le chapitre est compris." },
    { tier: "warmup", prompt: "Liste les inversibles de $\\mathbb{Z}/8\\mathbb{Z}$, calcule $\\varphi(8)$, puis trouve l'inverse de $3$ modulo $8$ par Bézout. Enfin : pourquoi $\\mathbb{Z}/8\\mathbb{Z}$ n'est-il pas un corps ?", solution: "Inversibles = classes premières avec $8$ : $\\{1, 3, 5, 7\\}$ — $\\varphi(8) = 4$ (et la formule confirme : $\\varphi(2^3) = 2^3 - 2^2 = 4$). Bézout : $3 \\times 3 - 1 \\times 8 = 1$, donc $3^{-1} = 3$ ($3 \\times 3 = 9 \\equiv 1$ ✓ — son propre inverse). Pas un corps : $2$ n'est pas inversible ($\\text{pgcd}(2, 8) = 2 \\neq 1$) — pire, $2 \\times 4 = 8 \\equiv 0$ : des **diviseurs de zéro** vivent dans l'anneau ; corps $\\iff n$ premier, et $8$ ne l'est pas." },
    { tier: "application", prompt: "Théorème chinois en action : trouve tous les $x$ tels que $x \\equiv 2 \\pmod 3$ et $x \\equiv 3 \\pmod 5$. Donne la solution modulo $15$ et explique pourquoi elle est unique modulo $15$.", solution: "Balaye les $x \\equiv 3 \\pmod 5$ : $3, 8, 13$ — lequel vaut $2$ mod $3$ ? $3 \\equiv 0$, $8 \\equiv 2$ ✓ : $x \\equiv 8 \\pmod{15}$ ■. Unicité : le théorème chinois dit que $\\mathbb{Z}/15\\mathbb{Z} \\simeq \\mathbb{Z}/3\\mathbb{Z} \\times \\mathbb{Z}/5\\mathbb{Z}$ — la paire (reste mod 3, reste mod 5) détermine **une seule** classe mod $15$ : se donner les deux coordonnées, c'est se donner le point. C'est aussi un outil de calcul : pour travailler mod $15$, travaille mod $3$ et mod $5$ en parallèle — diviser pour régner, version anneaux." },
    { tier: "challenge", prompt: "Calcule $7^{222} \\bmod 11$ sans machine. Indice : petit théorème de Fermat, puis division euclidienne de l'exposant.", solution: "Fermat : $11$ premier et $7$ non multiple, donc $7^{10} \\equiv 1 \\pmod{11}$ — l'exposant vit **modulo** $10$ : $222 = 22 \\times 10 + 2$, donc $7^{222} = (7^{10})^{22} \\times 7^2 \\equiv 1 \\times 49 \\equiv 49 - 44 = $ **5** $\\pmod{11}$ ■. Le réflexe : devant $a^{\\text{énorme}} \\bmod p$, réduis l'**exposant** modulo $p - 1$ (ou $\\varphi(n)$ en général) — c'est exactement ce que fait ta bibliothèque crypto à chaque poignée de main TLS, en plus rapide (exponentiation rapide)." },
    { tier: "exam", prompt: "Mini-RSA complet. Alice choisit $p = 3$, $q = 11$, donc $n = 33$ et $\\varphi(n) = 20$ ; elle publie $(n, e) = (33, 3)$. (1) Vérifie que $e = 3$ est licite (premier avec $\\varphi(n)$) et calcule la clé privée $d$ telle que $ed \\equiv 1 \\pmod{20}$. (2) Bob chiffre $m = 4$ : calcule $c = m^e \\bmod 33$. (3) Alice déchiffre : calcule $c^d \\bmod 33$ et vérifie qu'elle retrouve $m$. (4) Énonce le théorème de ce chapitre qui garantit $m^{ed} \\equiv m \\pmod{n}$ et explique pourquoi la sécurité repose sur la difficulté de factoriser $n$.", solution: "(1) $\\text{pgcd}(3, 20) = 1$ ✓ ; Bézout : $3 \\times 7 - 1 \\times 20 = 1$ donc $d = $ **7**. (2) $c = 4^3 = 64 \\equiv 64 - 33 = $ **31** $\\pmod{33}$. (3) $31 \\equiv -2$ : $c^7 \\equiv (-2)^7 = -128$ ; $-128 + 4 \\times 33 = 4$ — $m = 4$ **retrouvé** ✓. (4) C'est **Euler** : $ed \\equiv 1 \\pmod{\\varphi(n)}$ s'écrit $ed = 1 + k\\varphi(n)$, donc $m^{ed} = m \\cdot (m^{\\varphi(n)})^k \\equiv m \\cdot 1^k = m$ pour $m$ premier avec $n$ (le cas général se recolle par le chinois sur $p$ et $q$). La sécurité : calculer $d$ exige $\\varphi(n) = (p-1)(q-1)$, donc la **factorisation** de $n$ — facile à $33$, hors de portée à $2048$ bits : toute la confiance du web tient dans l'écart entre multiplier (facile) et factoriser (dur), et tu viens d'exécuter le protocole entier à la main." },
  ],
  practice: [
    { tier: "warmup", label: "L'ordre sur la roue", make: (r) => {
      const n = pick(r, [8, 10, 12]); const k = randint(r, 2, n - 1);
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      return { prompt: `Dans $(\\mathbb{Z}/${n}\\mathbb{Z}, +)$ : ordre de l'élément $${k}$ ?`, answer: n / gcd(k, n), solution: `$\\frac{${n}}{\\text{pgcd}(${k}, ${n})} = \\frac{${n}}{${gcd(k, n)}} = $ **${n / gcd(k, n)}**.` };
    } },
    { tier: "application", label: "Compter les inversibles", make: (r) => {
      const cas = pick(r, [[7, 6], [11, 10], [9, 6], [15, 8], [16, 8]]);
      return { prompt: `$\\varphi(${cas[0]})$ = nombre d'inversibles de $\\mathbb{Z}/${cas[0]}\\mathbb{Z}$ ?`, answer: cas[1], solution: `$\\varphi(${cas[0]}) = ${cas[1]}$ — les classes premières avec $${cas[0]}$.` };
    } },
    { tier: "challenge", label: "Fermat réduit l'exposant", make: (r) => {
      const p = pick(r, [5, 7, 11]); const a = randint(r, 2, p - 1); const k = randint(r, 2, 9);
      return { prompt: `Modulo $${p}$ (premier) : $${a}^{${k * (p - 1)}} \\equiv \\,?$`, answer: 1, solution: `Fermat : $${a}^{${p - 1}} \\equiv 1$, et $${k * (p - 1)} = ${k} \\times ${p - 1}$ — réponse **1**.` };
    } },
  ],
};

// — Reduction: eigenvalues and diagonalisation (MP: réduction, faces géométrique) —
const reductionDiagonalisation = {
  id: "algebra.bachelor.reduction-diagonalisation",
  level: "bachelor", domain: "algebra",
  title: "Réduction : valeurs propres et diagonalisation",
  tagline: "Chercher les axes que la matrice ne fait qu'étirer — et lire toute sa dynamique d'un coup d'œil.",
  prereqs: ["algebra.bachelor.matrices-representations", "algebra.bachelor.determinants"],
  intuition:
    "L'an dernier, changer de base transformait le portrait ; la question de cette année : existe-t-il une base où le portrait est **diagonal** ?\n\nLa réponse passe par les directions que l'endomorphisme se contente d'**étirer** — les vecteurs propres : $u(x) = \\lambda x$ — et par un polynôme détecteur, le **polynôme caractéristique**.",
  depths: {
    discovery:
      "**Avec les mains** : prends $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$ — teste $u = (1, 0)$ : $Au = (3, 0) = 3u$ — étiré par $3$, sans tourner : **vecteur propre**, valeur propre $3$ ; teste $v = (1, -1)$ : $Av = (2, -2) = 2v$ — valeur propre $2$. Dans la base $(u, v)$, la matrice devient $\\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}$ : tu l'avais fait « sur indice » au chapitre des représentations — cette année tu apprends à **trouver** $u$ et $v$ toi-même.",
    standard:
      "**En image** : le dessin du chapitre — le plan quadrillé que la matrice déforme : presque tous les vecteurs **tournent**, mais quelques **axes invariants** ne font que s'étirer (facteur $\\lambda$) — les directions propres ; diagonaliser, c'est prendre ces axes pour repère, et la dynamique entière se lit : $A^n$ étire chaque axe par $\\lambda^n$ — big idea *Invariance* : les valeurs propres sont LA carte d'identité, communes à toutes les matrices semblables. Et le détecteur calcule : $\\lambda$ est valeur propre $\\iff A - \\lambda I$ écrase quelqu'un $\\iff \\det(A - \\lambda I) = 0$ — le **polynôme caractéristique** $\\chi_A$, dont les racines sont les valeurs propres, et qui cache la trace et le déterminant dans ses coefficients.",
    advanced:
      "**Dans la tête** : la structure — chaque valeur propre $\\lambda$ porte son **sous-espace propre** $E_\\lambda = \\ker(u - \\lambda\\,\\text{id})$ ; ces sous-espaces sont en **somme directe** (des vecteurs propres de valeurs propres distinctes sont libres — la démonstration par récurrence est un classique de colle), donc le spectre compte au plus $n$ valeurs. Le critère complet : $u$ est **diagonalisable** $\\iff$ la somme des $E_\\lambda$ remplit $E$ $\\iff$ $\\chi_u$ est **scindé** et chaque $\\dim E_\\lambda$ égale la **multiplicité** de $\\lambda$ dans $\\chi_u$ (toujours $\\dim E_\\lambda \\leq$ multiplicité — l'inégalité-clé) ; cas confortable : $n$ valeurs propres **distinctes** $\\Rightarrow$ diagonalisable d'office. Les contre-exemples instruisent : $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ a $\\chi = (X-1)^2$ scindé mais $\\dim E_1 = 1 < 2$ — non diagonalisable (le cisaillement n'a qu'un axe) ; et une rotation réelle n'a aucune valeur propre réelle ($\\chi$ non scindé sur $\\mathbb{R}$) — le corps de base décide. Compléments structurels au passage : sommes directes de plusieurs sous-espaces, bases adaptées, matrices par **blocs** (déterminant d'une triangulaire par blocs = produit des blocs) — l'outillage de toute la suite.",
  },
  keyIdea: "Vecteur propre : $u(x) = \\lambda x$ — l'axe seulement étiré (*Invariance* : le spectre survit à la similitude). Détecteur : $\\chi_A(\\lambda) = \\det(A - \\lambda I)$, racines = valeurs propres ; trace = somme, det = produit (cas scindé). **Diagonalisable** $\\iff \\sum E_\\lambda = E \\iff \\chi$ scindé et $\\dim E_\\lambda = $ multiplicité ($\\leq$ toujours) ; $n$ valeurs propres distinctes suffit. Cisaillement : scindé mais déficient — non diagonalisable.",
  why:
    "Diagonaliser, c'est découpler : un système de suites couplées $X_{n+1} = AX_n$ explose en $n$ suites géométriques indépendantes le long des axes propres, un système différentiel $X' = AX$ en exponentielles (leçon systèmes !), une chaîne de Markov converge vers son vecteur propre de valeur $1$ — le PageRank de Google est littéralement un calcul de vecteur propre sur le graphe du web. Et la mécanique quantique mesure des valeurs propres : le spectre n'est pas une métaphore, c'est le spectre lumineux des atomes.",
  examples: [
    { title: "Les axes trouvés, pas devinés", steps: [
      { p: "$\\chi_A = \\det(A - \\lambda I) = (3 - \\lambda)(2 - \\lambda)$ : valeurs propres $3$ et $2$." },
      { p: "$E_3 = \\ker(A - 3I)$ : résoudre le système — les axes sortent du pivot." },
    ] },
    { title: "La dynamique lue sur la diagonale", steps: [
      { p: "$A = PDP^{-1}$ avec $D$ diagonale : $A^n = PD^nP^{-1}$ — chaque axe à la puissance $n$." },
      { p: "Le terme dominant : la plus grande valeur propre impose sa loi quand $n$ grandit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour $A = \\begin{pmatrix} 2 & 2 \\\\ 1 & 3 \\end{pmatrix}$ : calcule $\\chi_A$, ses racines, puis un vecteur propre pour chaque valeur propre (résous $(A - \\lambda I)X = 0$).", solution: "$\\chi_A = (2-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 5\\lambda + 4 = (\\lambda - 1)(\\lambda - 4)$ : valeurs propres **1 et 4**. $E_1$ : $(A - I)X = 0 \\iff x + 2y = 0$ — vecteur $(2, -1)$ ; $E_4$ : $-2x + 2y = 0$ — vecteur $(1, 1)$. Vérifie ! $A(1,1) = (4, 4)$ ✓. Deux valeurs propres distinctes en dimension $2$ : **diagonalisable** d'office, base propre $((2,-1), (1,1))$ — le rituel complet en quatre gestes : $\\chi$, racines, noyaux, base." },
    { tier: "warmup", prompt: "Sans résoudre de système : la trace de $A = \\begin{pmatrix} 5 & 1 \\\\ 2 & 1 \\end{pmatrix}$ vaut $6$ et son déterminant $3$. Écris $\\chi_A$, et encadre mentalement les valeurs propres. Quel contrôle gratuit ces deux nombres offrent-ils dans tout exercice de réduction ?", solution: "En dimension 2 : $\\chi_A = \\lambda^2 - (\\text{tr})\\lambda + \\det = \\lambda^2 - 6\\lambda + 3$ — racines $3 \\pm \\sqrt{6}$ (somme $6$ ✓, produit $3$ ✓). Le contrôle : **somme des valeurs propres = trace, produit = déterminant** (pour $\\chi$ scindé) — après tout calcul de spectre, vérifie ces deux comptes en cinq secondes ; une erreur de pivot meurt presque toujours à ce contrôle. La trace et le déterminant sont les invariants de similitude visibles à l'œil nu." },
    { tier: "application", prompt: "Montre que $N = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ (le cisaillement) n'est PAS diagonalisable, bien que son polynôme caractéristique soit scindé. Où exactement le critère échoue-t-il ?", solution: "$\\chi_N = (1 - \\lambda)^2$ : scindé, valeur propre $1$ de **multiplicité 2**. Mais $E_1 = \\ker(N - I)$ : $N - I = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$, noyau = l'axe $(x, 0)$ — **dimension 1** $< 2$ : la somme des sous-espaces propres ne remplit pas le plan, $N$ n'est pas diagonalisable ■. Géométriquement : le cisaillement n'a qu'**un** axe invariant (l'horizontale) — impossible d'en faire une base. Le critère a deux étages : scindé (nécessaire) ET dimensions = multiplicités — l'inégalité $\\dim E_\\lambda \\leq m_\\lambda$ peut être stricte, et c'est là que naîtront les nilpotents de la leçon suivante." },
    { tier: "challenge", prompt: "Suites couplées : $a_{n+1} = 2a_n + 2b_n$, $b_{n+1} = a_n + 3b_n$, avec $a_0 = 1$, $b_0 = 0$. En diagonalisant la matrice de l'exercice 1, donne une formule close pour $a_n$ et le comportement quand $n \\to +\\infty$.", solution: "$X_{n+1} = AX_n$ avec $A$ de spectre $\\{1, 4\\}$ et base propre $u_1 = (2, -1)$, $u_4 = (1, 1)$. Décompose $X_0 = (1, 0) = \\alpha u_1 + \\beta u_4$ : $2\\alpha + \\beta = 1$, $-\\alpha + \\beta = 0$ — $\\alpha = \\beta = \\frac{1}{3}$. Alors $X_n = \\frac{1}{3} \\cdot 1^n u_1 + \\frac{1}{3} \\cdot 4^n u_4$ : $a_n = \\frac{2 + 4^n}{3}$ (vérifie : $a_0 = 1$ ✓, $a_1 = 2$ ✓). Quand $n \\to \\infty$ : le mode $4^n$ **domine**, $X_n \\sim \\frac{4^n}{3}(1, 1)$ — la trajectoire s'aligne sur l'axe propre dominant, et $\\frac{a_n}{b_n} \\to 1$. Diagonaliser = découpler : deux suites enchevêtrées sont devenues deux géométriques indépendantes, et la plus grande valeur propre a dicté l'asymptotique." },
    { tier: "exam", prompt: "Soit $A = \\begin{pmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}$. (1) Calcule $A \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}$ : valeur propre apparente ? (2) Montre que si $x + y + z = 0$ alors $A(x, y, z) = -(x, y, z)$ : second sous-espace propre et sa dimension ? (3) Conclus que $A$ est diagonalisable, écris $D$, et vérifie trace et déterminant. (4) Donne $A^n$ en fonction de $n$ sur chaque sous-espace, et la limite de $\\frac{1}{2^n}A^n X$ pour $X$ quelconque.", solution: "(1) $A(1,1,1) = (2,2,2)$ : valeur propre **2**, axe $u = (1,1,1)$. (2) Si $x + y + z = 0$ : première coordonnée de $AX$ : $y + z = -x$ — idem partout : $AX = -X$ ✓ — $E_{-1}$ est le **plan** $x + y + z = 0$, dimension **2**. (3) $1 + 2 = 3$ : la somme des sous-espaces propres remplit $\\mathbb{R}^3$ — **diagonalisable**, $D = \\text{diag}(2, -1, -1)$ ; contrôles : trace $= 0 = 2 - 1 - 1$ ✓, $\\det = 2 \\times (-1) \\times (-1) = 2$ ✓ (et tu connais ce plan : c'est ton supplémentaire de L1, devenu sous-espace propre !). (4) $A^n = 2^n$ sur la droite $u$, $(-1)^n$ sur le plan : décompose $X = \\frac{x+y+z}{3}u + (X - \\cdots)$ — alors $\\frac{1}{2^n}A^n X \\to \\frac{x + y + z}{3}\\,u$ : la dynamique **projette** sur l'axe dominant, à la moyenne près. C'est le squelette de toute chaîne de Markov : le mode dominant gagne, les autres s'éteignent géométriquement — PageRank en miniature." },
  ],
  practice: [
    { tier: "warmup", label: "Tester un vecteur propre", make: (r) => {
      const lam = randint(r, 2, 5);
      return { prompt: `$A u = (${lam}, ${2 * lam})$ et $u = (1, 2)$ : valeur propre associée ?`, answer: lam, solution: `$Au = ${lam}u$ : valeur propre **${lam}** — l'axe est juste étiré.` };
    } },
    { tier: "application", label: "Trace et déterminant contrôlent", make: (r) => {
      const l1 = randint(r, 1, 4); const l2 = randint(r, 1, 4);
      return { prompt: `Spectre $\\{${l1}, ${l2}\\}$ en dimension 2 : la trace ?`, answer: l1 + l2, solution: `Somme des valeurs propres : $${l1} + ${l2} = ${l1 + l2}$.` };
    } },
    { tier: "challenge", label: "Le critère des distinctes", make: (r) => {
      const distinct = r() < 0.5; const a = randint(r, 1, 3);
      return { prompt: `$\\chi_A = (X - ${a})(X - ${distinct ? a + 2 : a})$ en dim 2 : diagonalisable d'office (1) ou il faut vérifier les dimensions (0) ?`, answer: distinct ? 1 : 0, solution: distinct ? `Deux racines **distinctes** : diagonalisable d'office — **1**.` : `Racine **double** : il faut vérifier $\\dim E_{${a}} = 2$ — **0** (le cisaillement guette).` };
    } },
  ],
};

// — Annihilating polynomials and Cayley-Hamilton (MP: réduction, face algébrique) —
const polynomesAnnulateurs = {
  id: "algebra.bachelor.polynomes-annulateurs",
  level: "bachelor", domain: "algebra",
  title: "Polynômes annulateurs et Cayley-Hamilton",
  tagline: "Nourrir la matrice à son propre polynôme — et toute la réduction tient dans les racines.",
  prereqs: ["algebra.bachelor.reduction-diagonalisation", "algebra.bachelor.polynomes-fractions"],
  intuition:
    "On peut **évaluer un polynôme sur une matrice** : $P(A) = a_k A^k + \\cdots + a_1 A + a_0 I$. Surprise : certaines équations polynomiales s'annulent — $p^2 = p$ pour un projecteur, $s^2 = I$ pour une symétrie.\n\nCes **polynômes annulateurs** encodent toute la géométrie : leurs racines capturent le spectre, leur forme décide de la diagonalisabilité — c'est la face algébrique de la réduction.",
  depths: {
    discovery:
      "**Avec les mains** : prends $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ (l'échange des coordonnées) — calcule $A^2 = I$ : le polynôme $X^2 - 1$ **annule** $A$. Ses racines : $1$ et $-1$ — et en effet $\\text{Sp}(A) = \\{1, -1\\}$ (vérifie : $A(1,1) = (1,1)$, $A(1,-1) = -(1,-1)$). Le polynôme savait : toute valeur propre d'une matrice est **racine de chacun de ses annulateurs** — la preuve tient en une ligne : si $Ax = \\lambda x$, alors $P(A)x = P(\\lambda)x$, et $P(A) = 0$ force $P(\\lambda) = 0$.",
    standard:
      "**En image** : le **lemme de décomposition des noyaux** se dessine — si $P = P_1 P_2$ avec $P_1 \\wedge P_2 = 1$, alors $\\ker P(u)$ se **fend** en deux blocs étanches : $\\ker P_1(u) \\oplus \\ker P_2(u)$ — l'espace se partitionne le long des facteurs premiers entre eux (Bézout fournit les projecteurs : c'est ton arithmétique de $K[X]$ qui découpe la géométrie). Big idea *Equivalence* : factoriser le polynôme $=$ décomposer l'espace — appliqué à un annulateur scindé simple $(X - \\lambda_1)\\cdots(X - \\lambda_r)$, l'espace éclate en sous-espaces propres : la **diagonalisabilité se lit sur le polynôme**.",
    advanced:
      "**Dans la tête** : le **polynôme minimal** $\\pi_u$ — l'annulateur unitaire de plus petit degré, qui divise tous les autres ; ses racines sont **exactement** les valeurs propres. Les deux théorèmes-critères : $u$ **diagonalisable** $\\iff$ $u$ annule un polynôme **scindé à racines simples** $\\iff$ $\\pi_u$ est scindé simple (projecteurs : $X^2 - X = X(X-1)$ — diagonalisables d'office, valeurs propres dans $\\{0, 1\\}$ : le tri garde/jette de L1, redémontré en une ligne !) ; et $u$ **trigonalisable** $\\iff$ $\\chi_u$ scindé $\\iff$ annule un scindé. Les **nilpotents** incarnent l'échec extrême : $u^k = 0$ — annulateur $X^k$, spectre $\\{0\\}$, $\\chi = X^n$, indice $\\leq n$, et pourtant $u \\neq 0$ : trigonalisable, jamais diagonalisable (sauf $0$). Sommet du chapitre : **Cayley-Hamilton** — $\\chi_u(u) = 0$ : tout endomorphisme annule son propre polynôme caractéristique (démonstration non exigible, mais l'énoncé est un séisme : $A^n$ s'exprime en les puissances inférieures) ; combiné au lemme des noyaux sur $\\chi$ scindé, il fend l'espace en **sous-espaces caractéristiques** $\\ker(u - \\lambda\\,\\text{id})^{m_\\lambda}$ — la matrice devient diagonale **par blocs triangulaires** : à défaut de diagonaliser, on bloque-diagonalise toujours (sur $\\mathbb{C}$).",
  },
  keyIdea: "$P(A)$ a un sens ; $P(A) = 0 \\Rightarrow \\text{Sp}(A) \\subset$ racines de $P$ (et $\\pi_u$ : racines = spectre exactement). **Lemme des noyaux** : facteurs premiers entre eux $\\Rightarrow$ noyaux en somme directe (*Equivalence* : factoriser = décomposer). Diagonalisable $\\iff$ annulateur **scindé simple** ; trigonalisable $\\iff \\chi$ scindé ; nilpotent : $\\chi = X^n$, jamais diagonalisable. **Cayley-Hamilton** : $\\chi_u(u) = 0$ — d'où les sous-espaces caractéristiques.",
  why:
    "La face algébrique paie deux fois. En calcul : Cayley-Hamilton borne tout — $A^{100}$ se réduit modulo $\\chi_A$ à un polynôme de degré $< n$ (division euclidienne de $X^{100}$ par $\\chi_A$ : ton arithmétique de $K[X]$ calcule des puissances de matrices), et l'inverse de $A$ sort de son annulateur sans pivot. En théorie : le critère « annulateur scindé simple » diagonalise des familles entières d'un coup (projecteurs, symétries, matrices de permutation…) là où le calcul du spectre serait impraticable — et les sous-espaces caractéristiques sont l'antichambre de la décomposition de Jordan que tu croiseras plus tard.",
  examples: [
    { title: "Le polynôme savait", steps: [
      { p: "$A^2 = I$ : l'annulateur $X^2 - 1 = (X-1)(X+1)$, scindé simple." },
      { p: "Verdict immédiat : $A$ diagonalisable, spectre $\\subset \\{1, -1\\}$ — zéro pivot." },
    ] },
    { title: "Cayley-Hamilton calcule", steps: [
      { p: "$\\chi_A = X^2 - 5X + 4$ : donc $A^2 = 5A - 4I$ — les puissances retombent." },
      { p: "Et $A(5I - A) = 4I$ : l'inverse $A^{-1} = \\frac{5I - A}{4}$, offert par l'annulateur." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une symétrie vérifie $s^2 = \\text{id}$. Donne un annulateur, ses racines, et conclus en une ligne : $s$ est-elle diagonalisable, avec quel spectre possible ? Relie aux sous-espaces géométriques de $s$.", solution: "$X^2 - 1 = (X - 1)(X + 1)$ annule $s$ : **scindé à racines simples** — $s$ est **diagonalisable** d'office, spectre $\\subset \\{1, -1\\}$ ■. Géométrie : $E_1 = \\ker(s - \\text{id})$ = les vecteurs **fixés** (l'axe/le plan de symétrie), $E_{-1}$ = les vecteurs **retournés** (la direction de symétrie) — et $E = E_1 \\oplus E_{-1}$ : le lemme des noyaux sur $(X-1)(X+1)$ redonne la décomposition géométrique. Même argument pour un projecteur ($X^2 - X$) : la famille entière des projecteurs et symétries est diagonalisée **sans un seul calcul** — c'est la puissance du critère." },
    { tier: "warmup", prompt: "Pour $A = \\begin{pmatrix} 2 & 2 \\\\ 1 & 3 \\end{pmatrix}$ ($\\chi_A = X^2 - 5X + 4$, leçon précédente) : vérifie Cayley-Hamilton en calculant $A^2 - 5A + 4I$, puis déduis-en $A^{-1}$ sans pivot.", solution: "$A^2 = \\begin{pmatrix} 6 & 10 \\\\ 5 & 11 \\end{pmatrix}$ ; $5A = \\begin{pmatrix} 10 & 10 \\\\ 5 & 15 \\end{pmatrix}$ ; $A^2 - 5A + 4I = \\begin{pmatrix} 6-10+4 & 0 \\\\ 0 & 11-15+4 \\end{pmatrix} = 0$ ✓ — la matrice annule son propre $\\chi$. Inverse : de $A^2 - 5A + 4I = 0$, isole $I$ : $A\\left(\\frac{5I - A}{4}\\right) = I$, donc $A^{-1} = \\frac{1}{4}\\begin{pmatrix} 3 & -2 \\\\ -1 & 2 \\end{pmatrix}$ — l'annulateur a fait le travail du pivot, et la méthode marche en toute dimension : isoler le terme constant, factoriser $A$." },
    { tier: "application", prompt: "Calcule $A^{10}$ pour $A = \\begin{pmatrix} 2 & 2 \\\\ 1 & 3 \\end{pmatrix}$ par division euclidienne de $X^{10}$ par $\\chi_A = (X-1)(X-4)$. Indice : le reste $aX + b$ se détermine en évaluant aux racines.", solution: "$X^{10} = Q \\cdot \\chi_A + aX + b$ — évalue en $1$ : $1 = a + b$ ; en $4$ : $4^{10} = 4a + b$. Soustrais : $a = \\frac{4^{10} - 1}{3} = 349525$, $b = 1 - a = -349524$. Cayley-Hamilton tue $Q\\chi_A(A)$ : $A^{10} = aA + bI = \\begin{pmatrix} 2a + b & 2a \\\\ a & 3a + b \\end{pmatrix}$ ■ — dix multiplications de matrices remplacées par **une division de polynômes** évaluée en deux points : l'arithmétique de $K[X]$ au service du calcul matriciel, et la méthode s'étend à $e^{tA}$ (leçon systèmes différentiels, bientôt)." },
    { tier: "challenge", prompt: "Soit $N$ nilpotente d'indice $3$ en dimension $3$ ($N^3 = 0$, $N^2 \\neq 0$). (1) Montre que $\\text{Sp}(N) = \\{0\\}$. (2) Montre que $I + N$ est inversible et calcule son inverse comme un polynôme en $N$ (pense série géométrique tronquée). (3) Pourquoi $N$ n'est-elle pas diagonalisable ?", solution: "(1) $X^3$ annule $N$ : le spectre vit dans ses racines — $\\text{Sp}(N) \\subset \\{0\\}$, et $0$ en fait partie ($N$ non inversible : $\\det N = 0$ car $\\chi_N = X^3$) ■. (2) Série géométrique tronquée : $(I + N)(I - N + N^2) = I + N^3 = I$ — inverse $= I - N + N^2$ ✓ : la nilpotence **tronque** les séries infinies en sommes finies, c'est son confort caché. (3) Si $N$ était diagonalisable avec spectre $\\{0\\}$, elle serait semblable à la matrice nulle, donc **nulle** — or $N^2 \\neq 0$ : contradiction ■. Les nilpotents sont l'obstruction pure à la diagonalisation : spectre trivial, action non triviale — tout ce que la diagonale ne voit pas." },
    { tier: "exam", prompt: "Soit $A \\in \\mathcal{M}_3(\\mathbb{R})$ vérifiant $A^3 = A$ (et $A \\neq 0$, $A^2 \\neq I$). (1) Donne un annulateur scindé simple et conclus : $A$ est diagonalisable — quel est le spectre possible ? (2) Par le lemme des noyaux, écris la décomposition de $\\mathbb{R}^3$ associée. (3) On suppose $\\text{tr}(A) = 0$ et $\\text{rg}(A) = 2$ : détermine les dimensions des trois sous-espaces et écris $D$. (4) Calcule $A^{2026}$ en fonction de $A$ et $A^2$. (5) Bonus structure : que dit ce résultat sur TOUTE matrice vérifiant $A^3 = A$, sans jamais calculer un seul vecteur propre ?", solution: "(1) $X^3 - X = X(X-1)(X+1)$ : **scindé simple** — $A$ diagonalisable, $\\text{Sp}(A) \\subset \\{0, 1, -1\\}$ ■. (2) Lemme des noyaux : $\\mathbb{R}^3 = \\ker A \\oplus \\ker(A - I) \\oplus \\ker(A + I)$ — trois blocs étanches. (3) $\\text{rg}(A) = 2 \\Rightarrow \\dim\\ker A = 1$ (théorème du rang, ton L1) ; restent $2$ dimensions pour $E_1$ et $E_{-1}$, et $\\text{tr} = 0 = \\dim E_1 - \\dim E_{-1}$ : donc $\\dim E_1 = \\dim E_{-1} = 1$ — $D = \\text{diag}(0, 1, -1)$ ■ (contrôle : trace $0$ ✓, rang $2$ ✓). (4) $2026$ pair : sur chaque axe, $0^{2026} = 0$, $1^{2026} = 1$, $(-1)^{2026} = 1$ — donc $A^{2026}$ agit comme $A^2$ : $A^{2026} = A^2$ (ou directement : $A^3 = A \\Rightarrow A^{k+2} = A^k$, les puissances oscillent avec période 2 dès $k = 1$). (5) Le critère a classé une **équation matricielle entière** : toute solution de $A^3 = A$ est diagonalisable de spectre dans $\\{0, 1, -1\\}$ — une infinité de matrices comprises d'un coup, zéro pivot : c'est exactement ce que la face algébrique de la réduction sait faire et que la face géométrique ne peut pas." },
  ],
  practice: [
    { tier: "warmup", label: "Le spectre dans les racines", make: (r) => {
      const k = pick(r, [[2, "X^2 - X", "\\{0, 1\\}", 1], [3, "X^2 - 1", "\\{-1, 1\\}", 1], [4, "X^2", "\\{0\\}", 0]]);
      return { prompt: `$P = ${k[1]}$ annule $A$, $P$ scindé simple ? $A$ diagonalisable d'office (1/0) ?`, answer: k[3], solution: k[3] ? `$${k[1]}$ scindé **simple** : diagonalisable, spectre $\\subset ${k[2]}$ — **1**.` : `$${k[1]}$ a une racine **double** : le critère ne conclut pas (nilpotents !) — **0**.` };
    } },
    { tier: "application", label: "Cayley-Hamilton réduit", make: (r) => {
      const t = randint(r, 3, 6); const d = randint(r, 1, 4);
      return { prompt: `$\\chi_A = X^2 - ${t}X + ${d}$ : alors $A^2 = aA + bI$ avec $a = \\,?$`, answer: t, solution: `Cayley-Hamilton : $A^2 = ${t}A - ${d}I$ — $a = ${t}$.` };
    } },
    { tier: "challenge", label: "L'inverse par l'annulateur", make: (r) => {
      const t = randint(r, 2, 5); const d = randint(r, 1, 4);
      return { prompt: `$A^2 - ${t}A + ${d}I = 0$ : alors $A^{-1} = \\frac{${t}I - A}{c}$ avec $c = \\,?$`, answer: d, solution: `$A(${t}I - A) = ${d}I$ : diviser par $${d}$ — $c = ${d}$.` };
    } },
  ],
};

export default [groupesCycliques, reductionDiagonalisation, polynomesAnnulateurs];
