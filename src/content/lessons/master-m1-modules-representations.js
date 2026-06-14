// Field "Algebra" — MASTER module (m1 year), master de mathématiques.
// M1 canon: agrégation = FLOOR; Sorbonne 4MA303 (modules, facteurs invariants)
// and Polytechnique 3A "Groupes, anneaux, modules et représentations" = standard.
// (1) Finitely generated modules over a PID — the structure theorem, invariant
// factors and elementary divisors, Smith normal form.
// (2) Similarity invariants — k^n as a k[X]-module via A, rational canonical
// (Frobenius) form, Jordan form; A ~ B iff same invariant factors.
// (3) Representations of finite groups — Maschke, Schur, characters and their
// orthogonality, the character table, sum of squares of dimensions = |G|.
// Singapore at master level: Concrete = ONE explicit object; Pictorial = Smith
// form / Young diagrams / the character table; Abstract = the theorems, big
// idea named. Exam = colle; practice = integer answers.
import { randint, pick } from "../../core/exercises.js";

// — Modules over a PID: vector spaces where you can no longer divide —
const modulesFacteursInvariants = {
  id: "algebra.master.modules-facteurs-invariants",
  level: "master", domain: "algebra",
  title: "Modules sur un anneau principal : facteurs invariants",
  tagline: "Un espace vectoriel dont les scalaires forment un anneau — et un seul théorème classe tous ceux de type fini.",
  prereqs: ["algebra.bachelor.anneaux-quotients", "algebra.bachelor.ideaux-divisibilite"],
  intuition:
    "Un **module** sur un anneau $A$, c'est un espace vectoriel où les scalaires vivent dans $A$ au lieu d'un corps. Une seule chose change — mais elle change tout : dans un anneau on ne peut plus diviser. Sur $\\mathbb{Z}$, un module n'est rien d'autre qu'un **groupe abélien** ($n \\cdot x$ = additionner $x$ $n$ fois), et $\\mathbb{Z}/6$ est un $\\mathbb{Z}$-module qui n'a pas de base : aucune famille libre ne l'engendre, car $6 \\cdot \\bar{1} = 0$.\n\nLa perte de la division crée la **torsion** — des éléments tués par un scalaire non nul. Le miracle du M1 : sur un anneau **principal** (où tout idéal est engendré par un élément, comme $\\mathbb{Z}$ ou $k[X]$), un seul théorème range tous les modules de type fini. La torsion s'organise en une suite de « tailles » $d_1 \\mid d_2 \\mid \\cdots$ — les **facteurs invariants** — qui caractérisent le module à isomorphisme près.",
  depths: {
    discovery:
      "**Avec les mains** : prends le groupe abélien $G = \\mathbb{Z}/4 \\times \\mathbb{Z}/6$. Le théorème chinois casse $\\mathbb{Z}/6 \\simeq \\mathbb{Z}/2 \\times \\mathbb{Z}/3$, donc $G \\simeq \\mathbb{Z}/4 \\times \\mathbb{Z}/2 \\times \\mathbb{Z}/3$. Ce sont les **diviseurs élémentaires** (puissances de premiers : $4 = 2^2$, $2$, $3$). Pour lire les **facteurs invariants**, on regroupe en colonnes par premier et on prend les plus grosses puissances ensemble : la plus grosse part rassemble $2^2$ et $3$, soit $12$ ; reste $2$. La condition de divisibilité $2 \\mid 12$ est respectée, donc $G \\simeq \\mathbb{Z}/2 \\times \\mathbb{Z}/12$ — **deux** facteurs invariants, $2$ et $12$. Le plus gros, $12$, est l'**exposant** du groupe (l'ordre maximal d'un élément), et $|G| = 2 \\times 12 = 24$.",
    standard:
      "**En image** : tout module de type fini sur un anneau principal $A$ se présente par une matrice de relations. On la réduit par opérations sur les lignes **et** les colonnes (autorisées car réversibles dans $A$) jusqu'à une forme **diagonale** $\\mathrm{diag}(d_1, \\ldots, d_r)$ avec $d_1 \\mid d_2 \\mid \\cdots \\mid d_r$ : c'est la **forme normale de Smith**. Le tableau diagonal se lit directement : chaque $d_i$ non inversible donne un facteur $A/(d_i)$, chaque colonne nulle donne un facteur libre $A$. Sur $\\mathbb{Z}$, réduire $\\begin{pmatrix} 2 & 0 \\\\ 0 & 6 \\end{pmatrix}$ produit $\\mathrm{diag}(2, 6)$ déjà ordonnée — d'où $\\mathbb{Z}/2 \\times \\mathbb{Z}/6$. La diagonalisation entière **est** le calcul des facteurs invariants : c'est l'algorithme universel.",
    advanced:
      "**Dans la tête** : le **théorème de structure** dit que tout module de type fini $M$ sur un anneau principal $A$ se décompose de façon unique\n\n$$M \\simeq A^r \\oplus A/(d_1) \\oplus \\cdots \\oplus A/(d_s), \\qquad d_1 \\mid d_2 \\mid \\cdots \\mid d_s,$$\n\noù $r$ est le **rang** (la partie libre) et les $d_i$ — les **facteurs invariants** — sont déterminés à association près. La forme équivalente par les **diviseurs élémentaires** regroupe la torsion en $A/(p^k)$ pour $p$ premier : les deux listes se déduisent l'une de l'autre par le théorème chinois. Big idea *Invariance* : les facteurs invariants forment un **système complet d'invariants** — deux modules sont isomorphes **si et seulement si** ils ont les mêmes. C'est le sommet de l'algèbre linéaire généralisée : on a remplacé « dimension » (un seul nombre, qui suffit sur un corps) par une **liste divisible** qui encode exactement la rigidité due à l'absence de division.",
  },
  keyIdea: "Sur un anneau principal, tout module de type fini est $A^r \\oplus A/(d_1) \\oplus \\cdots \\oplus A/(d_s)$ avec $d_1 \\mid \\cdots \\mid d_s$ : le rang $r$ et les facteurs invariants $d_i$ (calculés par la forme normale de Smith) forment un système complet d'invariants — big idea *Invariance*.",
  why:
    "Ce théorème unique paie deux fois. Sur $A = \\mathbb{Z}$ il classe **tous** les groupes abéliens de type fini — la colonne vertébrale de l'arithmétique. Sur $A = k[X]$ il classera, à la leçon suivante, **toutes** les matrices à similitude près (formes de Frobenius et de Jordan). Une même machine, deux mondes : c'est l'exemple parfait du gain qu'apporte l'abstraction au bon niveau.",
  examples: [
    { title: "Décomposer un groupe abélien", steps: [
      { p: "Soit $G = \\mathbb{Z}/12 \\times \\mathbb{Z}/18$. Diviseurs élémentaires : $12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$, donc $G \\simeq (\\mathbb{Z}/4 \\times \\mathbb{Z}/2) \\times (\\mathbb{Z}/3 \\times \\mathbb{Z}/9)$." },
      { p: "On regroupe les plus grosses puissances : $4$ et $9$ ensemble donnent $36$ ; restent $2$ et $3$, soit $6$. Comme $6 \\mid 36$, les facteurs invariants sont $6$ et $36$ : $G \\simeq \\mathbb{Z}/6 \\times \\mathbb{Z}/36$, d'ordre $216$." },
    ] },
    { title: "Le rang d'un sous-groupe de Z²", steps: [
      { p: "Soit $H \\subset \\mathbb{Z}^2$ engendré par $(2, 4)$ et $(6, 8)$. La matrice $\\begin{pmatrix} 2 & 6 \\\\ 4 & 8 \\end{pmatrix}$ se réduit : $C_2 \\leftarrow C_2 - 3C_1$ donne $\\begin{pmatrix} 2 & 0 \\\\ 4 & -4 \\end{pmatrix}$, puis $L_2 \\leftarrow L_2 - 2L_1$ donne $\\begin{pmatrix} 2 & 0 \\\\ 0 & -4 \\end{pmatrix}$." },
      { p: "Forme de Smith $\\mathrm{diag}(2, 4)$ : $H$ est libre de rang $2$, et $\\mathbb{Z}^2 / H \\simeq \\mathbb{Z}/2 \\times \\mathbb{Z}/4$, d'ordre $|\\det| = 8$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décompose $\\mathbb{Z}/2 \\times \\mathbb{Z}/3$ et $\\mathbb{Z}/2 \\times \\mathbb{Z}/4$ : lequel est cyclique ?", solution: "$\\mathbb{Z}/2 \\times \\mathbb{Z}/3$ : comme $\\gcd(2,3) = 1$, le théorème chinois donne $\\mathbb{Z}/2 \\times \\mathbb{Z}/3 \\simeq \\mathbb{Z}/6$ — **cyclique**, un seul facteur invariant ($6$). $\\mathbb{Z}/2 \\times \\mathbb{Z}/4$ : ici $\\gcd(2,4) = 2 \\neq 1$, le regroupement donne les facteurs invariants $2 \\mid 4$ — **non cyclique** (aucun élément d'ordre $8$ ; l'ordre maximal est $4$). Le test : un produit de cycliques est cyclique ssi les ordres sont deux à deux premiers entre eux." },
    { tier: "warmup", prompt: "Donne les facteurs invariants de $G = \\mathbb{Z}/8 \\times \\mathbb{Z}/4 \\times \\mathbb{Z}/3$ et l'ordre maximal d'un élément.", solution: "Diviseurs élémentaires : $8 = 2^3$, $4 = 2^2$, $3$. On regroupe par premier en colonnes des plus grandes puissances : la plus grosse part prend $2^3$ et $3$, soit $24$ ; reste $2^2 = 4$. Divisibilité $4 \\mid 24$ : facteurs invariants $\\boxed{4 \\mid 24}$, donc $G \\simeq \\mathbb{Z}/4 \\times \\mathbb{Z}/24$. L'ordre maximal d'un élément est l'exposant = le plus grand facteur invariant = $24$." },
    { tier: "application", prompt: "Soit $H \\subset \\mathbb{Z}^2$ le sous-groupe engendré par $(4, 0)$ et $(0, 6)$ et $(2, 2)$. Calcule la structure de $\\mathbb{Z}^2 / H$.", solution: "Matrice des générateurs (en colonnes) $\\begin{pmatrix} 4 & 0 & 2 \\\\ 0 & 6 & 2 \\end{pmatrix}$. Mettons la 3ᵉ colonne en tête (pivot $2$) : $C_1 \\leftarrow C_1 - 2C_3$, $C_2 \\leftarrow C_2 - C_3$ donne $\\begin{pmatrix} 2 & 0 & 0 \\\\ 2 & 4 & -2 \\end{pmatrix}$ après réordonnancement ; en nettoyant la ligne (Smith) on obtient $\\mathrm{diag}(2, 6)$. Donc $\\mathbb{Z}^2 / H \\simeq \\mathbb{Z}/2 \\times \\mathbb{Z}/6$, d'ordre $12$. (Vérification : l'indice $[\\mathbb{Z}^2 : H]$ est le pgcd des mineurs $2\\times 2$ ramené par Smith — ici $12$.)" },
    { tier: "challenge", prompt: "Combien y a-t-il de groupes abéliens d'ordre $72$ à isomorphisme près ? Liste-les par facteurs invariants.", solution: "$72 = 2^3 \\cdot 3^2$. Le nombre de groupes abéliens d'ordre $p^a$ est le nombre de **partitions** de $a$ ; le total est multiplicatif sur les premiers. Partitions de $3$ : $3,\\ 2{+}1,\\ 1{+}1{+}1$ → $3$ groupes en la part $2$. Partitions de $2$ : $2,\\ 1{+}1$ → $2$ groupes en la part $3$. Total $3 \\times 2 = 6$. Par facteurs invariants : $\\mathbb{Z}/72$ ; $\\mathbb{Z}/2 \\times \\mathbb{Z}/36$ ; $\\mathbb{Z}/6 \\times \\mathbb{Z}/12$ ; $\\mathbb{Z}/3 \\times \\mathbb{Z}/24$ ; $\\mathbb{Z}/2 \\times \\mathbb{Z}/6 \\times \\mathbb{Z}/6$ ; $\\mathbb{Z}/2 \\times \\mathbb{Z}/2 \\times \\mathbb{Z}/18$ ■." },
    { tier: "exam", prompt: "Soit $M = \\mathbb{Z}^3 / \\mathrm{Im}(\\varphi)$ où $\\varphi : \\mathbb{Z}^2 \\to \\mathbb{Z}^3$ a pour matrice $\\begin{pmatrix} 2 & 4 \\\\ 2 & 6 \\\\ 0 & 4 \\end{pmatrix}$. (1) Calcule la forme normale de Smith. (2) En déduire la structure de $M$ (rang libre + torsion). (3) $M$ est-il sans torsion ? cyclique ?", solution: "(1) Opérations sur $\\begin{pmatrix} 2 & 4 \\\\ 2 & 6 \\\\ 0 & 4 \\end{pmatrix}$ : $C_2 \\leftarrow C_2 - 2C_1$ donne $\\begin{pmatrix} 2 & 0 \\\\ 2 & 2 \\\\ 0 & 4 \\end{pmatrix}$ ; $L_2 \\leftarrow L_2 - L_1$ donne $\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\\\ 0 & 4 \\end{pmatrix}$ ; $L_3 \\leftarrow L_3 - 2L_2$ donne $\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\\\ 0 & 0 \\end{pmatrix}$. Forme de Smith $\\mathrm{diag}(2, 2)$ avec une ligne nulle. (2) Les deux facteurs $2 \\mid 2$ donnent de la torsion $\\mathbb{Z}/2 \\times \\mathbb{Z}/2$ ; la ligne nulle (3 lignes pour 2 colonnes pivots) donne un facteur libre $\\mathbb{Z}$. Donc $M \\simeq \\mathbb{Z} \\times \\mathbb{Z}/2 \\times \\mathbb{Z}/2$ : rang $1$, torsion $(\\mathbb{Z}/2)^2$. (3) **Non sans torsion** (il y a de la $2$-torsion) ; **non cyclique** (la torsion n'est pas cyclique, deux facteurs invariants égaux à $2$). Le rang $1$ est le nombre de colonnes nulles après Smith — la dimension de la partie libre ■." },
  ],
  practice: [
    { tier: "warmup", label: "Le plus gros facteur invariant", make: (r) => {
      const m = pick(r, [4, 6, 8, 9, 12]); const n = pick(r, [6, 8, 9, 10, 15]);
      const g = (a, b) => (b ? g(b, a % b) : a); const lcm = (m * n) / g(m, n);
      return { prompt: `Le groupe $\\mathbb{Z}/${m} \\times \\mathbb{Z}/${n}$ : quel est son plus grand facteur invariant (= l'ordre maximal d'un élément) ?`, answer: lcm, solution: `L'exposant du produit est $\\mathrm{lcm}(${m}, ${n}) = ${lcm}$ : c'est le plus grand facteur invariant.` };
    } },
    { tier: "warmup", label: "L'ordre du groupe", make: (r) => {
      const a = pick(r, [2, 3, 4]); const b = pick(r, [3, 5, 6]); const c = pick(r, [2, 4, 7]);
      return { prompt: `Quel est l'ordre du groupe abélien $\\mathbb{Z}/${a} \\times \\mathbb{Z}/${b} \\times \\mathbb{Z}/${c}$ ?`, answer: a * b * c, solution: `L'ordre est le produit $${a} \\times ${b} \\times ${c} = ${a * b * c}$ (invariant par regroupement en facteurs invariants).` };
    } },
    { tier: "application", label: "L'indice par le déterminant", make: (r) => {
      let a, b, c, d, det;
      do { a = randint(r, 1, 5); b = randint(r, 0, 4); c = randint(r, 0, 4); d = randint(r, 1, 5); det = Math.abs(a * d - b * c); } while (det === 0);
      return { prompt: `Le sous-groupe $H \\subset \\mathbb{Z}^2$ engendré par les colonnes de $\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$ : quel est l'indice $[\\mathbb{Z}^2 : H] = |\\mathbb{Z}^2/H|$ ?`, answer: det, solution: `L'indice est la valeur absolue du déterminant : $|${a} \\cdot ${d} - ${b} \\cdot ${c}| = ${det}$ (le produit des facteurs invariants de la forme de Smith).` };
    } },
  ],
};

// — Similarity invariants: the same theorem, now over k[X] —
const invariantsSimilitudeJordan = {
  id: "algebra.master.invariants-similitude-jordan",
  level: "master", domain: "algebra",
  title: "Invariants de similitude : Frobenius et Jordan",
  tagline: "Une matrice transforme l'espace en un module sur l'anneau des polynômes — et le théorème de structure devient la théorie des formes réduites.",
  prereqs: ["algebra.master.modules-facteurs-invariants", "algebra.bachelor.reduction-diagonalisation"],
  intuition:
    "Deux matrices sont-elles **semblables** ($B = P A P^{-1}$) ? Le polynôme caractéristique ne suffit pas : $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ et $\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$ ont le même ($X^2$) sans être semblables. Le polynôme minimal non plus, en dimension assez grande. Il faut un invariant **complet**.\n\nL'idée décisive : une matrice $A$ de taille $n$ transforme $k^n$ en un **module** sur l'anneau $k[X]$, en posant $X \\cdot v = A v$ (un polynôme agit par $P(A)$). Et $k[X]$ est principal — exactement comme $\\mathbb{Z}$. Le théorème de structure de la leçon précédente, appliqué ici, **est** la classification des matrices à similitude près. Les facteurs invariants de ce module sont les **invariants de similitude** : la réponse complète.",
  depths: {
    discovery:
      "**Avec les mains** : prends une matrice **nilpotente** $4 \\times 4$. Son seul invariant est la taille de ses blocs de Jordan, et les tailles possibles sont les **partitions** de $4$ : $(4)$, $(3,1)$, $(2,2)$, $(2,1,1)$, $(1,1,1,1)$ — soit $5$ classes de similitude. Concrètement, $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix} \\oplus 0_2$ (partition $(2,1,1)$) et $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}^{\\oplus 2}$ (partition $(2,2)$) ont **toutes deux** $A^2 = 0$ (même polynôme minimal $X^2$) et même caractéristique $X^4$ — mais des **rangs** différents ($2$ contre $2$... non : rang $1$ contre $2$). Le rang distingue les blocs : c'est la première fois qu'on voit le caractéristique et le minimal **échouer** ensemble là où les blocs réussissent.",
    standard:
      "**En image** : le **bloc de Jordan** $J_m(\\lambda)$ est une image — $\\lambda$ sur la diagonale, une échelle de $1$ juste au-dessus :\n\n$$J_3(\\lambda) = \\begin{pmatrix} \\lambda & 1 & 0 \\\\ 0 & \\lambda & 1 \\\\ 0 & 0 & \\lambda \\end{pmatrix}.$$\n\nUne matrice (sur un corps algébriquement clos) est une **juxtaposition diagonale** de tels blocs. Pour chaque valeur propre $\\lambda$, la liste des tailles de blocs se lit comme un **diagramme de Young** : la multiplicité algébrique = le nombre total de cases, la multiplicité géométrique $\\dim \\ker(A - \\lambda I)$ = le nombre de **colonnes** (de blocs), et le degré du facteur $(X - \\lambda)$ dans le minimal = la plus **longue** ligne (le plus gros bloc). Compter les cases, c'est lire la matrice.",
    advanced:
      "**Dans la tête** : via $X \\cdot v = Av$, l'espace $k^n$ devient un $k[X]$-module de torsion, et le théorème de structure donne\n\n$$k^n \\simeq k[X]/(P_1) \\oplus \\cdots \\oplus k[X]/(P_r), \\qquad P_1 \\mid P_2 \\mid \\cdots \\mid P_r,$$\n\noù les $P_i$ unitaires sont les **invariants de similitude**. Conséquences immédiates : $P_r$ est le **polynôme minimal**, le produit $P_1 \\cdots P_r$ est le **caractéristique** (d'où Cayley-Hamilton, transparent), et chaque $k[X]/(P_i)$ est une **matrice compagnon** — leur juxtaposition est la **forme de Frobenius** (forme rationnelle, valable sur tout corps). Sur un corps algébriquement clos, on raffine par diviseurs élémentaires $(X - \\lambda)^m$ : chaque facteur donne un **bloc de Jordan**, d'où la forme de Jordan. Big idea *Equivalence* : classer les matrices à similitude près **est** classer les $k[X]$-modules à isomorphisme près — le même théorème que pour les groupes abéliens, relu dans un autre anneau. $A \\sim B$ si et seulement si elles ont les mêmes invariants de similitude.",
  },
  keyIdea: "Via $X \\cdot v = Av$, $k^n$ est un $k[X]$-module ; ses facteurs invariants $P_1 \\mid \\cdots \\mid P_r$ sont les invariants de similitude ($P_r = $ minimal, $\\prod P_i = $ caractéristique). Forme de Frobenius (compagnons) sur tout corps, forme de Jordan sur un corps clos. $A \\sim B \\iff$ mêmes invariants — big idea *Equivalence* : c'est le théorème des modules sur $k[X]$.",
  why:
    "C'est le couronnement de la réduction des endomorphismes. Diagonaliser n'est possible que parfois ; **réduire** l'est toujours, et la forme de Jordan dit exactement « à quel point » une matrice rate la diagonalisabilité — un seul bloc non trivial mesure le défaut. Le même cadre donne Cayley-Hamilton gratuitement et un critère décidable de similitude : à l'agrégation comme en calcul formel, c'est l'outil qui tranche.",
  examples: [
    { title: "Lire une forme de Jordan", steps: [
      { p: "Soit $A$ avec valeur propre $\\lambda = 2$ de multiplicité algébrique $3$ et $\\dim \\ker(A - 2I) = 2$. Le nombre de blocs pour $\\lambda = 2$ est la multiplicité géométrique $= 2$ ; ils totalisent $3$ cases." },
      { p: "Deux blocs sommant à $3$ : forcément des tailles $2$ et $1$. La forme de Jordan pour cette valeur propre est $J_2(2) \\oplus J_1(2)$, et le facteur $(X-2)$ dans le minimal a degré $2$ (plus gros bloc)." },
    ] },
    { title: "Forme de Frobenius sans valeurs propres", steps: [
      { p: "Sur $\\mathbb{Q}$, une matrice de polynôme minimal $= $ caractéristique $= X^2 + 1$ (irréductible) n'a aucune valeur propre rationnelle : pas de Jordan." },
      { p: "Mais elle a une forme de Frobenius : un seul invariant $P_1 = X^2 + 1$, donc la matrice compagnon $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. La forme rationnelle existe toujours, c'est sa force." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Les matrices $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ et $\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$ ont le même polynôme caractéristique $X^2$. Sont-elles semblables ?", solution: "**Non.** Une matrice semblable à la matrice nulle est nulle (si $P\\, 0\\, P^{-1} = 0$). Or $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix} \\neq 0$. On le voit aussi par les invariants : la première a un seul bloc de Jordan $J_2(0)$ (polynôme minimal $X^2$), la seconde a deux blocs $J_1(0)$ (minimal $X$). Mêmes valeurs propres, mais des **tailles de blocs** différentes — d'où le besoin d'un invariant plus fin que le caractéristique : les invariants de similitude tranchent." },
    { tier: "warmup", prompt: "Combien y a-t-il de classes de similitude de matrices nilpotentes $3 \\times 3$ sur $\\mathbb{C}$ ? Donne-les.", solution: "Une nilpotente est déterminée par les tailles de ses blocs de Jordan (tous de valeur propre $0$), qui forment une **partition** de $3$. Partitions de $3$ : $(3)$, $(2,1)$, $(1,1,1)$ — soit **trois** classes. Elles correspondent à $J_3(0)$ (minimal $X^3$, rang $2$), $J_2(0) \\oplus J_1(0)$ (minimal $X^2$, rang $1$), et $0_3$ (minimal $X$, rang $0$). Le rang $= 3 - (\\text{nombre de blocs})$ les distingue." },
    { tier: "application", prompt: "Une matrice $5 \\times 5$ a pour polynôme caractéristique $(X-1)^3 (X-2)^2$ et pour minimal $(X-1)^2 (X-2)$. Donne sa forme de Jordan.", solution: "Valeur propre $1$ (mult. alg. $3$) : le minimal contient $(X-1)^2$, donc le plus gros bloc a taille $2$ ; les tailles partitionnent $3$ avec un max de $2$ : c'est $(2,1)$, soit $J_2(1) \\oplus J_1(1)$. Valeur propre $2$ (mult. alg. $2$) : le minimal contient $(X-2)^1$, donc tous les blocs ont taille $1$ ; partition de $2$ avec max $1$ : $(1,1)$, soit $J_1(2) \\oplus J_1(2)$ (i.e. $2$ est diagonalisable sur son espace). Forme de Jordan : $J_2(1) \\oplus J_1(1) \\oplus J_1(2) \\oplus J_1(2)$." },
    { tier: "challenge", prompt: "Soit $A$ une matrice $4 \\times 4$ avec $A^2 = A$ (idempotente, $A \\neq 0, I$). (1) Quel est son polynôme minimal possible ? (2) Quelles sont les formes de Jordan possibles ? (3) Combien de classes de similitude ?", solution: "(1) $A^2 = A$ donne $A(A - I) = 0$, donc le minimal divise $X(X-1)$. Comme $A \\neq 0$ et $A \\neq I$, le minimal est exactement $X(X-1)$ (les deux facteurs présents) : il est **scindé à racines simples**, donc $A$ est **diagonalisable**, valeurs propres dans $\\{0, 1\\}$. (2) $A$ est semblable à $\\mathrm{diag}(1, \\ldots, 1, 0, \\ldots, 0)$ avec $k$ uns ($k = \\mathrm{rg}\\, A$), $1 \\le k \\le 3$. Aucun bloc de taille $> 1$. (3) Les classes sont indexées par $k \\in \\{1, 2, 3\\}$ : **trois** classes (le projecteur sur un sous-espace de dimension $k$). Un idempotent est un projecteur, classé par son rang ■." },
    { tier: "exam", prompt: "Soit $A \\in M_4(\\mathbb{C})$ nilpotente avec $\\mathrm{rg}(A) = 2$ et $\\mathrm{rg}(A^2) = 1$. (1) Détermine les tailles des blocs de Jordan. (2) Donne le polynôme minimal et le caractéristique. (3) Cette donnée détermine-t-elle $A$ à similitude près ?", solution: "(1) Pour une nilpotente, $\\mathrm{rg}(A^k)$ compte les cases du diagramme de Young au-delà de la $k$-ième colonne. Notons les tailles de blocs $\\lambda_1 \\ge \\lambda_2 \\ge \\cdots$ Le nombre de blocs $= 4 - \\mathrm{rg}(A) = 4 - 2 = 2$ blocs. $\\mathrm{rg}(A^2) = 1$ signifie qu'**un seul** bloc a taille $\\ge 3$... vérifions : $\\mathrm{rg}(A^2) = \\sum_i \\max(\\lambda_i - 2, 0)$. Avec $2$ blocs sommant à $4$ : candidats $(3,1)$ et $(2,2)$. Pour $(3,1)$ : $\\mathrm{rg}(A^2) = (3-2) + 0 = 1$ ✓. Pour $(2,2)$ : $\\mathrm{rg}(A^2) = 0 + 0 = 0$ ✗. Donc les blocs sont $(3, 1)$ : $J_3(0) \\oplus J_1(0)$. (2) Plus gros bloc $= 3$ donc minimal $= X^3$ ; caractéristique $= X^4$. (3) **Oui** : les rangs successifs $\\mathrm{rg}(A^k)$ déterminent entièrement le diagramme de Young, donc la classe de similitude. Ici une seule forme de Jordan répond ■." },
  ],
  practice: [
    { tier: "warmup", label: "Classes de nilpotentes", make: (r) => {
      const parts = { 2: 2, 3: 3, 4: 5, 5: 7, 6: 11 }; const n = pick(r, [2, 3, 4, 5, 6]);
      return { prompt: `Combien y a-t-il de classes de similitude de matrices nilpotentes $${n} \\times ${n}$ sur $\\mathbb{C}$ ? (= nombre de partitions de $${n}$)`, answer: parts[n], solution: `Une nilpotente est classée par les tailles de ses blocs de Jordan, soit une partition de $${n}$ : il y en a $p(${n}) = ${parts[n]}$.` };
    } },
    { tier: "application", label: "Degré du minimal", make: (r) => {
      const blocks = pick(r, [[3, 1], [2, 2], [4], [2, 1, 1], [3, 2], [2, 2, 1]]);
      const mx = Math.max(...blocks);
      return { prompt: `Une matrice a un seul bloc de valeurs propres $\\lambda$, de tailles de blocs $(${blocks.join(", ")})$. Quel est le degré de $(X - \\lambda)$ dans le polynôme minimal ?`, answer: mx, solution: `Le degré dans le minimal = taille du **plus gros** bloc = $${mx}$.` };
    } },
    { tier: "application", label: "Taille de la matrice", make: (r) => {
      const blocks = pick(r, [[3, 1], [2, 2, 1], [4, 2], [3, 3], [2, 1, 1], [5]]);
      const s = blocks.reduce((a, b) => a + b, 0);
      return { prompt: `Une forme de Jordan a pour tailles de blocs $(${blocks.join(", ")})$ (toutes valeurs propres confondues). Quelle est la dimension $n$ de la matrice ?`, answer: s, solution: `La dimension = somme des tailles de blocs = $${blocks.join(" + ")} = ${s}$.` };
    } },
  ],
};

// — Representations of finite groups: linearizing symmetry —
const representationsCaracteres = {
  id: "algebra.master.representations-caracteres",
  level: "master", domain: "algebra",
  title: "Représentations et caractères des groupes finis",
  tagline: "Transformer un groupe abstrait en matrices — et résumer chaque représentation par une simple trace.",
  prereqs: ["algebra.master.invariants-similitude-jordan", "algebra.bachelor.actions-groupes-sylow"],
  intuition:
    "Un groupe fini $G$ est abstrait. Une **représentation** le rend concret : un morphisme $\\rho : G \\to GL(V)$ envoie chaque élément sur une matrice inversible, en respectant la loi ($\\rho(gh) = \\rho(g)\\rho(h)$). On peut alors **calculer** avec les symétries : un groupe devient de l'algèbre linéaire.\n\nMais une matrice dépend de la base choisie. L'invariant qui n'en dépend pas, c'est la **trace** : le **caractère** $\\chi_\\rho(g) = \\mathrm{tr}\\, \\rho(g)$. Miracle : ce simple nombre, calculé sur chaque classe de conjugaison, **détermine entièrement** la représentation (à isomorphisme près) et obéit à des relations d'orthogonalité d'une élégance parfaite. Toute la théorie tient dans un petit tableau carré — la **table des caractères**.",
  depths: {
    discovery:
      "**Avec les mains** : prends $G = \\mathbb{Z}/3 = \\{0, 1, 2\\}$. Une représentation de dimension $1$ envoie le générateur $1$ sur un nombre $z$ avec $z^3 = 1$ : les trois choix sont les **racines cubiques de l'unité** $1, \\omega, \\omega^2$ (où $\\omega = e^{2i\\pi/3}$). On obtient donc **trois** représentations irréductibles de dimension $1$, $\\chi_k(j) = \\omega^{kj}$ pour $k = 0, 1, 2$. Leur table : trois lignes, trois colonnes (une par élément, qui est sa propre classe car $G$ est abélien). On vérifie « à la main » l'orthogonalité : $\\sum_{j} \\chi_k(j)\\overline{\\chi_\\ell(j)} = 0$ si $k \\neq \\ell$ (somme géométrique de racines), $= 3 = |G|$ si $k = \\ell$. Tout le squelette de la théorie est déjà là.",
    standard:
      "**En image** : la **table des caractères** est un tableau **carré** — autant de lignes (représentations irréductibles) que de colonnes (classes de conjugaison). Pour $S_3$ (trois classes : $\\{e\\}$, les transpositions, les $3$-cycles) :\n\n$$\\begin{array}{c|ccc} & e & (12) & (123) \\\\ \\hline \\text{triv} & 1 & 1 & 1 \\\\ \\text{sgn} & 1 & -1 & 1 \\\\ \\text{std} & 2 & 0 & -1 \\end{array}$$\n\nLa première colonne donne les **dimensions** ($1, 1, 2$). Les **lignes** sont orthonormées, les **colonnes** aussi (pondérées par la taille des classes). On lit la décomposition de n'importe quelle représentation comme on lirait des coordonnées dans une base orthonormée : projeter le caractère sur chaque ligne.",
    advanced:
      "**Dans la tête** : trois théorèmes structurent tout. **Maschke** — si $\\mathrm{car}(k) \\nmid |G|$ (en particulier $k = \\mathbb{C}$), toute représentation est **somme directe d'irréductibles** (complète réductibilité). **Schur** — entre deux irréductibles, les seuls morphismes sont $0$ ou des isomorphismes, et sur $\\mathbb{C}$ un endomorphisme d'une irréductible est scalaire. **Orthogonalité** — pour le produit hermitien $\\langle \\chi, \\psi \\rangle = \\frac{1}{|G|} \\sum_{g} \\chi(g)\\overline{\\psi(g)}$, les caractères irréductibles forment une **base orthonormée** des fonctions centrales. Deux corollaires-clés : le **nombre d'irréductibles = le nombre de classes de conjugaison**, et $\\sum_i d_i^2 = |G|$ (la représentation régulière contient chaque irréductible $d_i$ fois). Big idea *Notations* : encoder une représentation par son caractère est le **bon système de coordonnées** — les questions difficiles sur les modules ($G$-modules) deviennent des calculs d'orthogonalité, une simple algèbre linéaire dans l'espace des fonctions centrales.",
  },
  keyIdea: "Maschke (complète réductibilité sur $\\mathbb{C}$) + Schur + orthogonalité : les caractères irréductibles forment une base orthonormée des fonctions centrales pour $\\langle \\chi, \\psi \\rangle = \\frac{1}{|G|}\\sum_g \\chi(g)\\overline{\\psi(g)}$. D'où #irréductibles = #classes de conjugaison et $\\sum_i d_i^2 = |G|$. Big idea *Notations* : le caractère est le bon système de coordonnées.",
  why:
    "Les représentations sont partout : spectroscopie et cristallographie (les symétries d'une molécule contraignent ses modes de vibration), mécanique quantique (les particules **sont** des représentations irréductibles d'un groupe de symétrie), théorie des nombres (les caractères de Dirichlet pavent la voie aux fonctions $L$). Linéariser une symétrie, puis la résumer par une trace : c'est l'un des ponts les plus féconds des mathématiques.",
  examples: [
    { title: "Vérifier une dimension par la somme des carrés", steps: [
      { p: "$S_4$ a $5$ classes de conjugaison (types de cycles : $1^4, 2\\,1^2, 2^2, 3\\,1, 4$), donc $5$ représentations irréductibles." },
      { p: "Leurs dimensions $d_i$ vérifient $\\sum d_i^2 = |S_4| = 24$. La solution est $1^2 + 1^2 + 2^2 + 3^2 + 3^2 = 1 + 1 + 4 + 9 + 9 = 24$ : triviale, signature, une de dim $2$, deux de dim $3$." },
    ] },
    { title: "Décomposer la représentation de permutation", steps: [
      { p: "$S_3$ agit sur $\\mathbb{C}^3$ en permutant les coordonnées : $\\chi(g) = $ nombre de points fixes de $g$. Donc $\\chi(e) = 3$, $\\chi((12)) = 1$, $\\chi((123)) = 0$." },
      { p: "Multiplicité de la triviale : $\\langle \\chi, \\mathbf{1} \\rangle = \\frac{1}{6}(3 \\cdot 1 + 3 \\cdot 1 + 2 \\cdot 0) = 1$. On retire la droite des vecteurs constants : il reste la représentation **standard** de dimension $2$ — la permutation se décompose en triviale $\\oplus$ standard." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien le groupe $\\mathbb{Z}/5$ a-t-il de représentations irréductibles complexes, et de quelles dimensions ?", solution: "$\\mathbb{Z}/5$ est abélien d'ordre $5$, donc il a $5$ **classes** de conjugaison (chaque élément est sa propre classe) et donc $5$ représentations irréductibles. Pour un groupe abélien, toutes les irréductibles sont de **dimension** $1$ (Schur : un endomorphisme commutant à tout est scalaire, et ici tout commute). Vérification : $\\sum d_i^2 = 5 \\times 1^2 = 5 = |G|$ ✓. Elles sont données par $\\chi_k(j) = e^{2i\\pi k j/5}$, $k = 0, \\ldots, 4$." },
    { tier: "warmup", prompt: "Le groupe $S_3$ a trois représentations irréductibles de dimensions $1, 1, 2$. Vérifie la relation $\\sum d_i^2 = |G|$ et explique ce qu'elle traduit.", solution: "$\\sum d_i^2 = 1^2 + 1^2 + 2^2 = 1 + 1 + 4 = 6 = |S_3|$ ✓. Cette relation traduit la décomposition de la **représentation régulière** (l'action de $G$ sur $\\mathbb{C}[G]$, de dimension $|G|$) : chaque irréductible $V_i$ y apparaît avec multiplicité exactement $d_i = \\dim V_i$. En prenant les dimensions : $|G| = \\sum d_i \\cdot d_i = \\sum d_i^2$." },
    { tier: "application", prompt: "Le groupe quaternionique $Q_8 = \\{\\pm 1, \\pm i, \\pm j, \\pm k\\}$ a $5$ classes de conjugaison. Trouve les dimensions de ses représentations irréductibles.", solution: "$5$ classes $\\Rightarrow$ $5$ irréductibles, de dimensions $d_1, \\ldots, d_5$ avec $\\sum d_i^2 = |Q_8| = 8$. Le nombre de représentations de dimension $1$ est l'ordre de l'abélianisé $Q_8/[Q_8, Q_8]$ ; ici $[Q_8, Q_8] = \\{\\pm 1\\}$ donc l'abélianisé est $\\mathbb{Z}/2 \\times \\mathbb{Z}/2$, d'ordre $4$ : quatre représentations de dimension $1$. Reste $8 - 4 = 4 = d_5^2$, donc $d_5 = 2$. Dimensions : $\\boxed{1, 1, 1, 1, 2}$ (la représentation de dim $2$ est l'inclusion $Q_8 \\hookrightarrow SU(2)$)." },
    { tier: "challenge", prompt: "Une représentation $\\rho$ de $S_3$ a pour caractère $\\chi(e) = 4$, $\\chi((12)) = 0$, $\\chi((123)) = 1$. Décompose-la en irréductibles (table : triv $(1,1,1)$, sgn $(1,-1,1)$, std $(2,0,-1)$ ; tailles de classes $1, 3, 2$).", solution: "Produits hermitiens $\\langle \\chi, \\chi_i \\rangle = \\frac{1}{6}\\sum_C |C| \\chi(C)\\overline{\\chi_i(C)}$. Avec la triviale : $\\frac{1}{6}(1 \\cdot 4 \\cdot 1 + 3 \\cdot 0 \\cdot 1 + 2 \\cdot 1 \\cdot 1) = \\frac{4 + 2}{6} = 1$. Avec la signature : $\\frac{1}{6}(1 \\cdot 4 \\cdot 1 + 3 \\cdot 0 \\cdot (-1) + 2 \\cdot 1 \\cdot 1) = \\frac{4 + 2}{6} = 1$. Avec la standard : $\\frac{1}{6}(1 \\cdot 4 \\cdot 2 + 3 \\cdot 0 \\cdot 0 + 2 \\cdot 1 \\cdot (-1)) = \\frac{8 - 2}{6} = 1$. Donc $\\rho \\simeq \\text{triv} \\oplus \\text{sgn} \\oplus \\text{std}$. Contrôle des dimensions : $1 + 1 + 2 = 4 = \\chi(e)$ ✓ ■." },
    { tier: "exam", prompt: "Soit $G$ un groupe fini non abélien d'ordre $10$ (donc le diédral $D_5$). (1) Combien $D_5$ a-t-il de classes de conjugaison ? (2) En déduire le nombre et les dimensions des représentations irréductibles. (3) Combien sont de dimension $1$ ?", solution: "(1) $D_5 = \\langle r, s \\mid r^5 = s^2 = e,\\ srs = r^{-1} \\rangle$. Classes : $\\{e\\}$ ; $\\{r, r^4\\}$ ; $\\{r^2, r^3\\}$ (les rotations s'apparient $r^k \\sim r^{-k}$) ; et toutes les $5$ symétries forment **une seule** classe (car $5$ impair). Total : $\\boxed{4}$ classes. (2) Donc $4$ représentations irréductibles, de dimensions vérifiant $\\sum d_i^2 = 10$. (3) Le nombre de représentations de dimension $1$ = ordre de l'abélianisé $D_5/[D_5, D_5]$. Ici $[D_5, D_5] = \\langle r \\rangle$ (les commutateurs engendrent les rotations), donc l'abélianisé est $\\mathbb{Z}/2$, d'ordre $2$ : **deux** représentations de dimension $1$ (triviale et signe-de-la-symétrie). Reste $10 - 2 = 8 = d_3^2 + d_4^2$, résolu par $4 + 4$ : **deux** représentations de dimension $2$. Dimensions : $1, 1, 2, 2$ ■." },
  ],
  practice: [
    { tier: "warmup", label: "Irréductibles d'un groupe abélien", make: (r) => {
      const n = pick(r, [3, 4, 5, 6, 7, 8]);
      return { prompt: `Combien le groupe abélien $\\mathbb{Z}/${n}$ a-t-il de représentations irréductibles complexes ?`, answer: n, solution: `Un groupe abélien d'ordre $${n}$ a $${n}$ classes de conjugaison, donc $${n}$ représentations irréductibles (toutes de dimension $1$).` };
    } },
    { tier: "application", label: "L'ordre par la somme des carrés", make: (r) => {
      const tbl = pick(r, [[[1, 1, 2], 6], [[1, 1, 2, 2], 10], [[1, 1, 1, 1, 2], 8], [[1, 1, 2, 3, 3], 24], [[1, 1, 1, 1, 1], 5]]);
      const dims = tbl[0];
      return { prompt: `Un groupe a des représentations irréductibles de dimensions $(${dims.join(", ")})$. Quel est son ordre $|G|$ ?`, answer: tbl[1], solution: `$|G| = \\sum d_i^2 = ${dims.map((d) => d + "^2").join(" + ")} = ${tbl[1]}$.` };
    } },
    { tier: "application", label: "Irréductibles = classes", make: (r) => {
      const tbl = pick(r, [["\\mathbb{Z}/6", 6], ["S_3", 3], ["S_4", 5], ["D_4", 5], ["Q_8", 5], ["S_5", 7], ["A_4", 4]]);
      return { prompt: `Le groupe $${tbl[0]}$ a $${tbl[1]}$ classes de conjugaison. Combien a-t-il de représentations irréductibles complexes ?`, answer: tbl[1], solution: `Le nombre d'irréductibles égale le nombre de classes de conjugaison : $${tbl[1]}$.` };
    } },
  ],
};

export default [modulesFacteursInvariants, invariantsSimilitudeJordan, representationsCaracteres];
