// Field "Numbers" — HIGH module (expertes year): arithmetic. Official terminale
// MATHS EXPERTES programme. DIVISIBILITY in ℤ, EUCLIDEAN DIVISION of an
// integer by a positive integer, CONGRUENCES in ℤ and their compatibility with
// operations; divisibility tests, solving ax ≡ b [n]. GCD of two integers,
// EUCLID's algorithm, COPRIME integers, BÉZOUT's theorem — REQUIRED PROOF:
// writing gcd(a,b) as ax + by —, GAUSS's theorem (REQUIRED PROOF), modular
// inverse of a when gcd(a, n) = 1, simple DIOPHANTINE equations. PRIME numbers
// — REQUIRED PROOF: their set is infinite —, existence and uniqueness of the
// prime factorization, FERMAT's little theorem; algorithms: Euclid + extended
// Bézout, sieve of Eratosthenes, factorization; problems: check digits (ISBN,
// RIB), ciphers (affine, RSA), Mersenne primes.
import { randint, pick } from "../../core/exercises.js";

const pgcd = (a, b) => b ? pgcd(b, a % b) : a;

// — Divisibility and congruences (programme: division euclidienne, modulo) —
const divisibiliteCongruences = {
  id: "numbers.high.divisibilite-congruences",
  level: "high", domain: "numbers",
  title: "Divisibilité et congruences",
  tagline: "Compter en cercle — le reste devient un calcul à part entière.",
  prereqs: ["numbers.high.arithmetique", "logic.high.ensembles-logique"],
  intuition:
    "Ta division euclidienne de CM revient en majesté : $a = bq + r$ avec $0 \\leq r < b$ — existence et unicité du couple (quotient, **reste**).\n\nEt l'idée neuve : ne garder **que le reste** — $a \\equiv b \\; [n]$ (« $a$ congru à $b$ modulo $n$ ») signifie que $n$ divise $a - b$ : même reste, même classe — l'horloge calcule ainsi depuis toujours (17 h ≡ 5 h [12]).",
  depths: {
    discovery:
      "**Avec les mains** : la divisibilité s'étend à $\\mathbb{Z}$ — $b$ divise $a$ s'il existe $k$ entier avec $a = bk$ (les négatifs jouent : $-3$ divise 12) — et elle se transmet : si $b \\mid a$ et $c \\mid b$, alors $c \\mid a$ ; si $d$ divise $a$ et $b$, il divise toute combinaison $au + bv$ — le lemme passe-partout du chapitre.",
    standard:
      "**En image** : le théorème moteur, **démontré** — les congruences sont **compatibles avec les opérations** : si $a \\equiv b$ et $c \\equiv d \\; [n]$, alors $a + c \\equiv b + d$ et $ac \\equiv bd \\; [n]$ (pour le produit : $ac - bd = c(a - b) + b(c - d)$, deux multiples de $n$ ✓) — donc aussi $a^k \\equiv b^k$ : **on peut calculer sur les restes** — $7^{100} \\; [4]$ : $7 \\equiv 3 \\equiv -1$, donc $7^{100} \\equiv (-1)^{100} = 1$ : cent multiplications, évitées par un reste bien choisi.",
    advanced:
      "**Dans la tête** : la compatibilité au travail — les **tests de divisibilité** se démontrent : $10 \\equiv 1 \\; [9]$, donc $10^k \\equiv 1$, donc un nombre est congru à la **somme de ses chiffres** modulo 9 — la preuve par neuf de l'école, démontrée en deux lignes (et $10 \\equiv -1 \\; [11]$ donne le test alterné du 11). Les **clés de contrôle** vivent du même principe : le 13e chiffre d'un ISBN, la clé de ton RIB, le dernier chiffre du numéro INSEE sont des restes calculés pour que toute faute de frappe casse la congruence — chaque code-barres scanné vérifie un modulo. Et résoudre $ax \\equiv b \\; [n]$ se fait en tournant : $3x \\equiv 2 \\; [7]$ — teste $x = 0, \\ldots, 6$ : $x \\equiv 3$ ✓ (la méthode générale, l'inverse modulaire, attend Bézout à la leçon suivante).",
  },
  keyIdea: "Division euclidienne : $a = bq + r$, $0 \\leq r < b$ — unique. $a \\equiv b \\; [n]$ ⟺ $n \\mid a - b$ : **compatible** avec $+$, $\\times$, les puissances (démontré) — on calcule sur les restes : $7^{100} \\equiv (-1)^{100} \\; [4]$. Tests de divisibilité (9, 11) et clés de contrôle : des congruences déguisées.",
  why:
    "Pourquoi calculer en cercle ? Parce que l'informatique entière y vit : un octet calcule modulo 256, une heure modulo 24, un hachage modulo un grand premier — et surtout parce que la **cryptographie** est de l'arithmétique modulaire : chiffrer, c'est élever à une puissance modulo $n$ ; ta carte bancaire exécute cette leçon à chaque paiement. L'arithmétique, « reine des mathématiques » selon Gauss et longtemps jugée gratuite, est devenue l'infrastructure du secret numérique.",
  examples: [
    { title: "Calculer sur les restes", steps: [
      { p: "$7^{100} \\; [4]$ : $7 \\equiv -1 \\; [4]$, et la compatibilité donne $7^{100} \\equiv (-1)^{100} = 1$." },
      { p: "Cent multiplications de sept chiffres, remplacées par une puissance de $-1$." },
    ] },
    { title: "La preuve par neuf, démontrée", steps: [
      { p: "$10 \\equiv 1 \\; [9]$ ⟹ $10^k \\equiv 1$ ⟹ $\\overline{c_p \\ldots c_0} \\equiv c_p + \\cdots + c_0 \\; [9]$." },
      { p: "Un nombre et la somme de ses chiffres partagent leur reste — le test de l'école, certifié." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Effectue la division euclidienne de 47 par 5 et de $-13$ par 4 (attention : le reste est positif !).", solution: "$47 = 5 \\times 9 + 2$ (reste **2**) ; $-13 = 4 \\times (-4) + 3$ (reste **3**, pas $-1$ ! Le reste vit dans $\\{0, \\ldots, b-1\\}$ : on descend le quotient d'un cran) — l'unicité du couple exige cette convention." },
    { tier: "warmup", prompt: "Vrai ou faux : $17 \\equiv 5 \\; [12]$ ; $25 \\equiv -3 \\; [7]$ ; $100 \\equiv 2 \\; [7]$ — justifie par la différence.", solution: "$17 - 5 = 12$ : **vrai** (l'horloge !) ; $25 - (-3) = 28 = 4 \\times 7$ : **vrai** ; $100 - 2 = 98 = 14 \\times 7$ : **vrai** — $a \\equiv b \\; [n]$ ⟺ $n$ divise $a - b$ : une seule définition, trois vérifications." },
    { tier: "application", prompt: "Démontre la compatibilité du produit : si $a \\equiv b$ et $c \\equiv d \\; [n]$, alors $ac \\equiv bd \\; [n]$ — puis calcule $7^{100} \\; [4]$.", solution: "$ac - bd = c(a - b) + b(c - d)$ : deux multiples de $n$, donc $n \\mid ac - bd$ ✓ — et par récurrence, les puissances suivent. **Application** : $7 \\equiv -1 \\; [4]$, donc $7^{100} \\equiv (-1)^{100} = $ **1** $[4]$ — la démonstration exigible du chapitre, et son super-pouvoir : calculer sur les restes." },
    { tier: "challenge", prompt: "Démontre le test de divisibilité par 9, puis vérifie : 7 425 est-il divisible par 9 ?", solution: "$10 \\equiv 1 \\; [9]$ ⟹ $10^k \\equiv 1 \\; [9]$ (compatibilité des puissances) ⟹ tout nombre est congru à la **somme de ses chiffres** modulo 9 ✓. $7 + 4 + 2 + 5 = 18 \\equiv 0 \\; [9]$ : **divisible** — la preuve par neuf de l'école primaire, démontrée par la congruence $10 \\equiv 1$ : douze ans pour boucler la boucle." },
    { tier: "exam", prompt: "Résous $3x \\equiv 2 \\; [7]$ (essaie les sept restes), puis explique le principe d'une clé de contrôle : pourquoi le 13e chiffre d'un ISBN, calculé pour que la somme pondérée soit $\\equiv 0 \\; [10]$, détecte-t-il toute erreur sur un chiffre ?", solution: "Table des $3x \\; [7]$ : $0, 3, 6, 2, 5, 1, 4$ — la valeur 2 sort pour $x \\equiv $ **3** $[7]$ (solutions : $3, 10, 17, \\ldots$). **Clé** : si un chiffre change, la somme pondérée change d'une quantité non divisible par 10 (les poids 1 et 3 de l'ISBN sont premiers avec 10) : la congruence $\\equiv 0 \\; [10]$ **casse**, le scanner refuse — toute faute de frappe simple est détectée : la congruence est un détecteur d'erreurs, et chaque bip de caisse en exécute une." },
  ],
  practice: [
    { tier: "warmup", label: "Le reste positif", make: (r) => {
      const b = pick(r, [5, 7, 9]); const q = randint(r, 3, 12); const reste = randint(r, 0, b - 1);
      return { prompt: `Reste de la division de $${b * q + reste}$ par $${b}$ ?`, answer: reste, solution: `$${b * q + reste} = ${b} \\times ${q} + ${reste}$ — reste **${reste}**.` };
    } },
    { tier: "application", label: "Congrus ?", make: (r) => {
      const n = pick(r, [5, 7, 9]); const a = randint(r, 10, 40); const ok = r() < 0.5;
      const b = ok ? a - n * randint(r, 1, 3) : a - n * randint(r, 1, 3) + 1;
      return { prompt: `$${a} \\equiv ${b} \\; [${n}]$ ? (1 = oui, 0 = non)`, answer: (a - b) % n === 0 ? 1 : 0, solution: `$${a} - ${b} = ${a - b}$ : ${(a - b) % n === 0 ? "multiple de " + n + " — **oui**" : "pas multiple de " + n + " — **non**"}.` };
    } },
    { tier: "challenge", label: "La puissance modulo", make: (r) => {
      const n = pick(r, [[4, 7], [3, 8], [5, 11]]); const k = pick(r, [100, 50, 2026]);
      return { prompt: `$${n[1] - 1} \\equiv -1 \\; [${n[1]}]$ : que vaut $${n[1] - 1}^{${k}} \\; [${n[1]}]$ ?`, answer: 1, solution: `$(-1)^{${k}} = $ **1** (exposant pair) — calculer sur les restes écrase les puissances.` };
    } },
  ],
};

// — GCD, Bézout, Gauss (programme: Euclide, ax + by, théorème de Gauss) —
const bezoutGauss = {
  id: "numbers.high.bezout-gauss",
  level: "high", domain: "numbers",
  title: "PGCD, Bézout et Gauss",
  tagline: "L'algorithme d'Euclide remonte le temps — et ax + by = 1 signe la coprimalité.",
  prereqs: ["numbers.high.divisibilite-congruences"],
  intuition:
    "Le **PGCD** de deux entiers — le plus grand diviseur commun — se calcule sans factoriser : l'**algorithme d'Euclide** enchaîne les divisions ($\\text{pgcd}(a, b) = \\text{pgcd}(b, r)$) jusqu'au reste nul : le dernier reste non nul gagne.\n\nEt le théorème de **Bézout** révèle le secret : le PGCD s'écrit toujours $au + bv$ — une combinaison des deux nombres.",
  depths: {
    discovery:
      "**Avec les mains** : Euclide sur $252$ et $105$ — $252 = 2 \\times 105 + 42$, puis $105 = 2 \\times 42 + 21$, puis $42 = 2 \\times 21 + 0$ : **pgcd** $= 21$ — trois divisions, là où la factorisation aurait peiné : l'algorithme survit depuis vingt-trois siècles parce qu'il est *rapide* — ta carte bancaire l'exécute encore.",
    standard:
      "**En image** : Bézout, **démontré** en remontant Euclide — chaque reste est combinaison des deux précédents : $42 = 252 - 2 \\times 105$, puis $21 = 105 - 2 \\times 42 = 105 - 2(252 - 2 \\times 105) = 5 \\times 105 - 2 \\times 252$ ✓ — le PGCD de $a$ et $b$ s'écrit $au + bv$, et l'algorithme **étendu** fournit le couple. Cas roi : $a$ et $b$ **premiers entre eux** (pgcd 1) ⟺ il existe $u, v$ avec $au + bv = 1$ — la coprimalité, signée par une équation.",
    advanced:
      "**Dans la tête** : le théorème de **Gauss**, démontré par Bézout — si $a \\mid bc$ et $\\text{pgcd}(a, b) = 1$, alors $a \\mid c$ : écris $au + bv = 1$, multiplie par $c$ — $acu + bcv = c$ : $a$ divise $acu$ (évident) et $bcv$ (car $a \\mid bc$) : il divise leur somme $c$ ✓ — le lemme de séparation : un diviseur étranger à $b$ traverse le produit pour atteindre $c$. Deux récoltes immédiates : l'**inverse modulaire** ($\\text{pgcd}(a, n) = 1$ ⟹ $au \\equiv 1 \\; [n]$ : le $u$ de Bézout *est* l'inverse — $ax \\equiv b$ se résout enfin en général !) et les **équations diophantiennes** $ax + by = c$ : solubles ⟺ $\\text{pgcd}(a, b) \\mid c$, Bézout amorce, Gauss décrit toutes les solutions — Bachet (1612) puis Bézout (1766) ont forgé ces outils pour les énigmes ; RSA en a fait des serrures.",
  },
  keyIdea: "Euclide : $\\text{pgcd}(a, b) = \\text{pgcd}(b, r)$ jusqu'au reste nul — rapide, sans factoriser. **Bézout** : $\\text{pgcd}(a, b) = au + bv$ (remonter l'algorithme — démontré) ; premiers entre eux ⟺ $au + bv = 1$. **Gauss** : $a \\mid bc$ et $\\text{pgcd}(a, b) = 1$ ⟹ $a \\mid c$ (démontré par Bézout) — d'où l'inverse modulo $n$ et les diophantiennes.",
  why:
    "Pourquoi remonter des divisions ? Parce que l'inverse modulaire — ce $u$ tel que $au \\equiv 1 \\; [n]$ — est la **clé privée** des cryptosystèmes : générer une paire de clés RSA, c'est exécuter Euclide étendu ; déchiffrer, c'est multiplier par l'inverse de Bézout. Le plus vieil algorithme du monde (Euclide, ~300 av. J.-C.) protège aujourd'hui chaque connexion HTTPS : aucune autre ligne de mathématiques n'a eu une seconde carrière pareille.",
  examples: [
    { title: "Euclide en trois divisions", steps: [
      { p: "$252 = 2 \\times 105 + 42$ ; $105 = 2 \\times 42 + 21$ ; $42 = 2 \\times 21 + 0$." },
      { p: "Dernier reste non nul : **pgcd** $= 21$ — sans factoriser personne." },
    ] },
    { title: "Gauss par Bézout", steps: [
      { p: "$\\text{pgcd}(a, b) = 1$ : $au + bv = 1$ — multiplie par $c$ : $acu + bcv = c$." },
      { p: "$a$ divise chaque terme (le second car $a \\mid bc$) : $a \\mid c$ ✓ — trois lignes." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule pgcd(252, 105) par l'algorithme d'Euclide, en détaillant les divisions.", solution: "$252 = 2 \\times 105 + 42$ → $105 = 2 \\times 42 + 21$ → $42 = 2 \\times 21 + 0$ : pgcd $= $ **21** — chaque étape remplace le couple par (diviseur, reste) : le dernier reste non nul gagne, en trois divisions." },
    { tier: "warmup", prompt: "Remonte l'algorithme précédent pour écrire 21 sous la forme $252u + 105v$.", solution: "$21 = 105 - 2 \\times 42$ et $42 = 252 - 2 \\times 105$ : substitue — $21 = 105 - 2(252 - 2 \\times 105) = 5 \\times 105 - 2 \\times 252$ ✓ — la démonstration exigible en acte : remonter Euclide fabrique le couple de Bézout ($u = -2$, $v = 5$)." },
    { tier: "application", prompt: "Démontre le théorème de Gauss : si $a$ divise $bc$ et $\\text{pgcd}(a, b) = 1$, alors $a$ divise $c$.", solution: "Bézout : il existe $u, v$ avec $au + bv = 1$ — multiplie par $c$ : $acu + bcv = c$ ; or $a \\mid acu$ (facteur $a$) et $a \\mid bcv$ (car $a \\mid bc$ par hypothèse) : $a$ divise la somme, donc $a \\mid c$ ✓ — la démonstration exigible : trois lignes, et Bézout porte tout — le diviseur étranger à $b$ traverse le produit." },
    { tier: "challenge", prompt: "Trouve l'inverse de 3 modulo 7 par Bézout ($3u + 7v = 1$), et résous enfin $3x \\equiv 2 \\; [7]$ proprement.", solution: "$3 \\times 5 + 7 \\times (-2) = 15 - 14 = 1$ : l'inverse de 3 modulo 7 est **5** ($3 \\times 5 = 15 \\equiv 1$ ✓). Alors $3x \\equiv 2$ ⟹ $x \\equiv 5 \\times 2 = 10 \\equiv $ **3** $[7]$ — la table d'essais de la leçon précédente, remplacée par une vraie division modulaire : Bézout fournit les inverses, et $ax \\equiv b$ se résout en général." },
    { tier: "exam", prompt: "Résous dans $\\mathbb{Z}^2$ l'équation diophantienne $5x + 7y = 1$ : trouve une solution par Bézout, puis toutes les solutions par Gauss.", solution: "**Bézout** : $5 \\times 3 + 7 \\times (-2) = 1$ : $(x_0, y_0) = (3, -2)$ ✓. **Toutes** : si $(x, y)$ est solution, soustrais — $5(x - 3) = -7(y + 2)$ : 7 divise $5(x - 3)$ et $\\text{pgcd}(7, 5) = 1$ : **Gauss** donne $7 \\mid x - 3$, soit $x = 3 + 7k$ — et alors $y = -2 - 5k$ : solutions $\\{(3 + 7k\\,;\\,-2 - 5k), k \\in \\mathbb{Z}\\}$ ✓ — Bézout amorce, Gauss balaie : le couple de théorèmes résout toute la famille, et c'est exactement la mécanique des clés RSA." },
  ],
  practice: [
    { tier: "warmup", label: "Euclide en marche", make: (r) => {
      const g = pick(r, [3, 6, 7]); const a = g * pick(r, [12, 15, 35]); const b = g * pick(r, [5, 8]);
      return { prompt: `pgcd($${Math.max(a, b)}$, $${Math.min(a, b)}$) $= \\,?$`, answer: pgcd(a, b), solution: `Euclide : dernier reste non nul $= $ **${pgcd(a, b)}**.` };
    } },
    { tier: "application", label: "Premiers entre eux ?", make: (r) => {
      const cas = pick(r, [[15, 28, 1], [12, 18, 0], [35, 22, 1], [21, 14, 0], [9, 16, 1]]);
      return { prompt: `$${cas[0]}$ et $${cas[1]}$ : premiers entre eux ? (1 = oui, 0 = non)`, answer: cas[2], solution: `pgcd $= ${pgcd(cas[0], cas[1])}$ : **${cas[2] ? "oui — Bézout signe au + bv = 1" : "non"}**.` };
    } },
    { tier: "challenge", label: "L'inverse de Bézout", make: (r) => {
      const cas = pick(r, [[3, 7, 5], [2, 5, 3], [3, 5, 2], [5, 7, 3], [2, 7, 4]]);
      return { prompt: `L'inverse de $${cas[0]}$ modulo $${cas[1]}$ ? ($${cas[0]}u \\equiv 1 \\; [${cas[1]}]$)`, answer: cas[2], solution: `$${cas[0]} \\times ${cas[2]} = ${cas[0] * cas[2]} \\equiv 1 \\; [${cas[1]}]$ — **${cas[2]}** : le $u$ de Bézout.` };
    } },
  ],
};

// — Prime numbers (programme: infinité, décomposition, petit Fermat) —
const nombresPremiers = {
  id: "numbers.high.nombres-premiers",
  level: "high", domain: "numbers",
  title: "Les nombres premiers",
  tagline: "Les atomes de l'arithmétique — infinis, démontré, et gardiens du secret.",
  prereqs: ["numbers.high.bezout-gauss"],
  intuition:
    "Tes nombres premiers de toujours — divisibles par 1 et eux seuls — reçoivent leurs trois théorèmes de structure : ils sont **infinis** (démontré !), tout entier se **décompose** en produit de premiers de façon **unique**, et le petit théorème de **Fermat** gouverne leurs puissances.\n\nLes atomes de l'arithmétique, enfin certifiés.",
  depths: {
    discovery:
      "**Avec les mains** : l'existence de la décomposition — descends : si $n$ n'est pas premier, casse-le en deux facteurs plus petits, recommence — la descente s'arrête (les entiers ne descendent pas sans fin !) sur des premiers : $84 = 2^2 \\times 3 \\times 7$ — le **crible d'Ératosthène** liste les atomes (barre les multiples de 2, de 3, de 5… les survivants sont premiers), vieux de vingt-deux siècles et toujours codé.",
    standard:
      "**En image** : l'**unicité** de la décomposition tient par Gauss — si un premier $p$ divise un produit $ab$, alors $p \\mid a$ ou $p \\mid b$ (sinon $p$ est premier avec $a$, et Gauss le force dans $b$) : deux décompositions du même nombre auraient les mêmes atomes, appariés un à un ✓ — c'est le **théorème fondamental de l'arithmétique** : chaque entier a une empreinte digitale unique en facteurs premiers, et PGCD ou divisibilité se lisent dessus.",
    advanced:
      "**Dans la tête** : l'infinité, **démontrée** par Euclide — suppose les premiers en nombre fini $p_1, \\ldots, p_k$ et considère $N = p_1 p_2 \\cdots p_k + 1$ : aucun $p_i$ ne divise $N$ (le reste vaut 1 !) — or $N$ a un diviseur premier (la décomposition !) : un premier **hors liste** — contradiction ✓ : la plus célèbre preuve par l'absurde des mathématiques, vingt-trois siècles d'âge. Le petit théorème de **Fermat** complète : si $p$ est premier et $p \\nmid a$, alors $a^{p-1} \\equiv 1 \\; [p]$ — les puissances modulo un premier tournent en cycle. Et le tout s'assemble en **RSA** : choisis deux premiers géants $p, q$ ; publie $n = pq$ — chiffrer est facile (une puissance modulo $n$), déchiffrer exige les facteurs, et *factoriser un produit de deux premiers de 300 chiffres dépasse tous les ordinateurs* : l'asymétrie entre multiplier (instantané) et factoriser (intraitable) protège tes paiements — les questions « gratuites » de Fermat et Mersenne sont devenues l'infrastructure du secret mondial.",
  },
  keyIdea: "Décomposition en facteurs premiers : **existence** (descente) et **unicité** (par Gauss : $p \\mid ab \\Rightarrow p \\mid a$ ou $p \\mid b$). **Infinité démontrée** (Euclide : $p_1\\cdots p_k + 1$ échappe à la liste). **Petit Fermat** : $p$ premier, $p \\nmid a$ ⟹ $a^{p-1} \\equiv 1 \\; [p]$ — et RSA vit de l'écart multiplier/factoriser.",
  why:
    "Pourquoi les atomes méritent-ils trois théorèmes ? Parce que toute l'arithmétique s'y ramène : divisibilité, PGCD, congruences se lisent sur les décompositions — et parce que leur irrégularité même est devenue un trésor : on sait *tester* la primalité vite, mais pas *factoriser* vite — cet écart, conjectural depuis quatre siècles, porte RSA et la confiance numérique mondiale. Hardy se vantait en 1940 que la théorie des nombres ne servirait jamais à rien : c'est aujourd'hui la branche la plus stratégique des mathématiques.",
  examples: [
    { title: "L'empreinte unique", steps: [
      { p: "$84 = 2^2 \\times 3 \\times 7$ — descends en cassant, l'unicité (par Gauss) garantit l'empreinte." },
      { p: "pgcd, divisibilité, nombre de diviseurs : tout se lit sur les exposants." },
    ] },
    { title: "Euclide et le +1", steps: [
      { p: "Premiers supposés finis : $N = p_1 \\cdots p_k + 1$ — chaque $p_i$ laisse le reste 1." },
      { p: "Or $N$ a un facteur premier : hors liste — contradiction : les premiers sont **infinis**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décompose 84 et 360 en facteurs premiers, puis lis leur pgcd sur les décompositions.", solution: "$84 = 2^2 \\times 3 \\times 7$ ; $360 = 2^3 \\times 3^2 \\times 5$ — pgcd : les facteurs **communs aux exposants minimaux** : $2^2 \\times 3 = $ **12** — l'empreinte digitale des entiers, et le PGCD lu dessus (Euclide reste plus rapide pour les géants !)." },
    { tier: "warmup", prompt: "Déroule le crible d'Ératosthène jusqu'à 30 : quels nombres survivent ?", solution: "Barre les multiples de 2 (sauf 2), de 3 (sauf 3), de 5 (sauf 5) — inutile d'aller plus loin que $\\sqrt{30}$ : survivants **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** — dix premiers, et l'algorithme officiel : vingt-deux siècles, toujours au programme et toujours codé." },
    { tier: "application", prompt: "Démontre que l'ensemble des nombres premiers est infini (la preuve d'Euclide).", solution: "Par l'absurde : supposons-les en nombre fini, $p_1, \\ldots, p_k$ — pose $N = p_1 p_2 \\cdots p_k + 1$ : la division de $N$ par chaque $p_i$ laisse le **reste 1** — aucun ne le divise ; or $N \\geq 2$ admet un diviseur premier (l'existence de la décomposition) : ce premier est **hors de la liste** — contradiction ✓ : les premiers sont infinis — la démonstration exigible, et la plus élégante preuve par l'absurde du programme : le $+1$ fait tout." },
    { tier: "challenge", prompt: "Vérifie le petit théorème de Fermat pour $a = 2$, $p = 7$, puis utilise-le : que vaut $2^{100} \\; [7]$ ?", solution: "$2^6 = 64 = 9 \\times 7 + 1 \\equiv $ **1** $[7]$ ✓ — Fermat tient. Alors $2^{100} = 2^{96} \\times 2^4 = (2^6)^{16} \\times 16 \\equiv 1 \\times 16 \\equiv $ **2** $[7]$ — le théorème transforme l'exposant 100 en exposant 4 : les puissances modulo un premier tournent en cycle de $p - 1$, et c'est ce cycle que RSA exploite." },
    { tier: "exam", prompt: "Le principe de RSA : Alice choisit $p = 5$, $q = 11$, publie $n = 55$ et $e = 3$. (1) Pourquoi multiplier $p$ et $q$ est-il facile, mais retrouver $p$ et $q$ depuis $n$ difficile (à grande échelle) ? (2) Bob chiffre $m = 7$ : calcule $c = m^3 \\; [55]$. (3) Quel théorème du chapitre garantit qu'un déchiffrement existe ?", solution: "(1) Multiplier est **instantané** ; factoriser exige d'essayer les diviseurs — pour des premiers de 300 chiffres, l'univers entier de calcul n'y suffit pas : l'**asymétrie** multiplier/factoriser est le verrou. (2) $7^3 = 343 = 6 \\times 55 + 13$ : $c = $ **13**. (3) L'inverse de $e$ modulo $(p-1)(q-1) = 40$ existe car $\\text{pgcd}(3, 40) = 1$ — **Bézout** le fournit ($d = 27$), et **Fermat** garantit que $c^d$ restitue $m$ — tout le chapitre (premiers, Bézout, Fermat, congruences) assemblé en une serrure : chaque connexion HTTPS rejoue cet exercice avec des nombres de 600 chiffres." },
  ],
  practice: [
    { tier: "warmup", label: "Premier ?", make: (r) => {
      const cas = pick(r, [[17, 1], [21, 0], [29, 1], [51, 0], [37, 1], [91, 0], [41, 1]]);
      return { prompt: `$${cas[0]}$ est-il premier ? (1 = oui, 0 = non)`, answer: cas[1], solution: `**${cas[1] ? "Oui" : "Non" + (cas[0] === 21 ? " : 3 × 7" : cas[0] === 51 ? " : 3 × 17" : " : 7 × 13")}** — tester les diviseurs jusqu'à $\\sqrt{${cas[0]}}$ suffit.` };
    } },
    { tier: "application", label: "L'empreinte lue", make: (r) => {
      const p = pick(r, [2, 3]); const e = randint(r, 2, 4); const autre = p === 2 ? 3 : 2;
      const n = p ** e * autre;
      return { prompt: `$${n} = ${p}^{?} \\times ${autre}$ : quel exposant ?`, answer: e, solution: `$${n} = ${p}^{${e}} \\times ${autre}$ — exposant **${e}** : l'empreinte unique.` };
    } },
    { tier: "challenge", label: "Fermat raccourcit", make: (r) => {
      const cas = pick(r, [[2, 7, 6], [3, 7, 6], [2, 11, 10], [2, 5, 4]]);
      return { prompt: `Petit Fermat : $${cas[0]}^{?} \\equiv 1 \\; [${cas[1]}]$ — quel exposant ($p - 1$) ?`, answer: cas[2], solution: `$p - 1 = $ **${cas[2]}** — les puissances modulo ${cas[1]} tournent en cycle de ${cas[2]}.` };
    } },
  ],
};

export default [divisibiliteCongruences, bezoutGauss, nombresPremiers];
