// Field "Discrete mathematics" — HIGH module (expertes year): graphs and
// Markov chains. Official terminale MATHS EXPERTES programme. GRAPHS: vertices,
// edges, the complete graph, adjacent vertices, DEGREE, order, CHAIN and its
// length, connected graph; the ADJACENCY MATRIX — REQUIRED PROOF: the number
// of paths of length n between two vertices is the (i,j) coefficient of the
// n-th power of the adjacency matrix. MARKOV CHAINS with two or three states:
// weighted directed graph, TRANSITION matrix — REQUIRED PROOF: the probability
// of going from state i to state j in n transitions, and the row matrix of the
// distribution after n transitions (π_n = π_0 T^n) —, INVARIANT probability;
// problems: Euler walks (Königsberg), random walks, the Ehrenfest diffusion
// model, PAGERANK.
import { randint, pick } from "../../core/exercises.js";

const graphesMarkov = {
  id: "discrete.high.graphes-markov",
  level: "high", domain: "discrete",
  title: "Graphes et chaînes de Markov",
  tagline: "Graphes et matrices de transition : l'avenir ne dépend que de l'état présent.",
  prereqs: ["algebra.high.matrices", "probability.high.conditionnelles"],
  intuition:
    "Un **graphe** : des **sommets** reliés par des **arêtes** — le réseau social, le plan de métro, la molécule : tout ce qui connecte se dessine ainsi.\n\nEt sa carte d'identité calculable : la **matrice d'adjacence** $A$ — un 1 en ligne $i$, colonne $j$ si l'arête existe — le dessin devenu tableau, prêt pour tes puissances de matrices.",
  depths: {
    discovery:
      "**Avec les mains** : le vocabulaire — sommets **adjacents** (reliés), **degré** d'un sommet (son nombre d'arêtes), **ordre** du graphe (son nombre de sommets), **chaîne** (une promenade d'arête en arête, sa **longueur** : le nombre de pas), graphe **connexe** (tout le monde joignable), **complet** (chacun relié à chacun) — Euler fonda la discipline en 1736 sur les sept ponts de Königsberg : peut-on tous les traverser une fois ? Non — il suffit de compter les **degrés impairs** : la première démonstration de la théorie des graphes tient dans une parité.",
    standard:
      "**En image** : le théorème des chemins, **démontré** — le nombre de chaînes de longueur $n$ entre les sommets $i$ et $j$ est le coefficient $(i, j)$ de $A^n$ : par récurrence — pour $n = 1$, c'est la définition de $A$ ; pour passer de $n$ à $n + 1$, toute chaîne de longueur $n + 1$ vers $j$ est une chaîne de longueur $n$ vers un voisin $k$, prolongée d'une arête : le coefficient de $A^{n+1} = A^n \\times A$ somme exactement $\\sum_k (A^n)_{ik}A_{kj}$ — la **ligne contre colonne** compte les prolongements ✓ : le produit matriciel *est* un dénombrement de chemins.",
    advanced:
      "**Dans la tête** : oriente, pondère par des probabilités — la **chaîne de Markov** : un système saute d'état en état, et l'avenir ne dépend que du **présent** (pas du chemin parcouru : la propriété de Markov) — météo beau/pluie, machine marche/panne : la matrice de **transition** $T$ range les $P(\\text{état } i \\to \\text{état } j)$ (chaque ligne somme à 1 !), et le même théorème, **démontré** pareil, donne tout : la probabilité d'aller de $i$ à $j$ en $n$ pas est $(T^n)_{ij}$, et la **distribution** après $n$ pas est $\\pi_n = \\pi_0\\,T^n$ — tes puissances de matrices, devenues machine à prédire. Le long terme fascine : la distribution **invariante** $\\pi = \\pi T$ (l'équilibre que la chaîne rejoint, souvent quel que soit le départ) — c'est elle que **PageRank** calcule : le surfeur aléatoire saute de page en page, et la probabilité invariante d'être sur une page *est* son importance — Google a classé le web avec une chaîne de Markov, et l'**urne d'Ehrenfest** (des molécules qui diffusent entre deux compartiments) modèle l'irréversibilité thermodynamique avec la même matrice.",
  },
  keyIdea: "Graphe → matrice d'**adjacence** $A$ — et le nombre de chaînes de longueur $n$ de $i$ à $j$ est $(A^n)_{ij}$ (démontré : ligne contre colonne = prolonger d'un pas). **Markov** : matrice de transition $T$ (lignes sommant à 1), $\\pi_n = \\pi_0\\,T^n$ (démontré pareil), distribution **invariante** $\\pi = \\pi T$ — PageRank est son calcul à l'échelle du web.",
  why:
    "Pourquoi marier graphes et matrices ? Parce que la traduction rend le réseau **calculable** : compter des itinéraires, prédire une météo, classer le web — trois questions, une seule opération : élever une matrice à une puissance. Et la propriété de Markov (« l'avenir ne dépend que du présent ») est l'hypothèse de modélisation la plus rentable du XXe siècle : files d'attente, génétique, finance, prédiction de texte — partout où l'histoire se résume à un état, une chaîne de Markov tourne — et ton clavier prédictif en exécute une à chaque mot.",
  examples: [
    { title: "Les chemins comptés par A²", steps: [
      { p: "Triangle 1–2–3 : $(A^2)_{11} = $ ligne 1 · colonne 1 $= 2$ — les allers-retours 1→2→1 et 1→3→1." },
      { p: "Le produit ligne-colonne énumère les prolongements : multiplier, c'est compter." },
    ] },
    { title: "La météo de Markov", steps: [
      { p: "Beau→beau 0,8 ; pluie→beau 0,4 : $T = \\begin{pmatrix} 0{,}8 & 0{,}2 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$, lignes sommant à 1." },
      { p: "$\\pi_n = \\pi_0\\,T^n$ — demain, après-demain, dans un an : une puissance de matrice." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dessine le graphe complet à 4 sommets : combien d'arêtes, quel degré pour chaque sommet ? Et le triangle (complet à 3) ?", solution: "Complet à 4 : chaque sommet relié aux 3 autres — degré **3** partout, et $\\binom{4}{2} = $ **6** arêtes (tes combinaisons : une arête = une paire !) ; le triangle : degrés 2, arêtes 3 — le graphe complet est un dénombrement dessiné." },
    { tier: "warmup", prompt: "Écris la matrice d'adjacence du triangle 1–2–3 (chaque paire reliée), et calcule $(A^2)_{11}$ par ligne contre colonne. Interprète.", solution: "$A = \\begin{pmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}$ — $(A^2)_{11} = 0 \\times 0 + 1 \\times 1 + 1 \\times 1 = $ **2** : les deux allers-retours $1 \\to 2 \\to 1$ et $1 \\to 3 \\to 1$ — le produit matriciel a compté des chemins de longueur 2." },
    { tier: "application", prompt: "Démontre par récurrence que le nombre de chaînes de longueur $n$ entre $i$ et $j$ est $(A^n)_{ij}$.", solution: "**Init** : $n = 1$ — $(A)_{ij}$ vaut 1 ou 0 selon l'arête : la définition ✓. **Hérédité** : une chaîne de longueur $n + 1$ de $i$ à $j$ est une chaîne de longueur $n$ de $i$ à un sommet $k$, prolongée par l'arête $k \\to j$ — somme sur les $k$ : $\\sum_k (A^n)_{ik}\\,A_{kj}$, qui est exactement le coefficient $(i, j)$ de $A^n \\times A = A^{n+1}$ ✓ — la démonstration exigible : la **ligne contre colonne** énumère les prolongements — le produit matriciel est un dénombrement." },
    { tier: "challenge", prompt: "Météo : beau→beau 0,8, pluie→beau 0,4. Écris $T$, puis trouve la distribution invariante $\\pi = (b\\,;\\,p)$ (résous $\\pi T = \\pi$ avec $b + p = 1$).", solution: "$T = \\begin{pmatrix} 0{,}8 & 0{,}2 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$ — l'invariance : $0{,}8b + 0{,}4p = b$ ⟺ $0{,}4p = 0{,}2b$ ⟺ $b = 2p$, et $b + p = 1$ : $\\pi = \\left(\\frac{2}{3}\\,;\\,\\frac{1}{3}\\right)$ — à long terme, deux jours de beau pour un de pluie, *quel que soit le temps de départ* : l'équilibre que la chaîne rejoint — c'est la quantité que PageRank calcule sur le web entier." },
    { tier: "exam", prompt: "Une machine est en marche (M) ou en panne (P) : $P(M \\to M) = 0{,}9$, $P(P \\to M) = 0{,}5$. (1) Écris $T$ et démontre que la distribution après $n$ jours est $\\pi_n = \\pi_0\\,T^n$. (2) La machine marche aujourd'hui : probabilité qu'elle marche dans 2 jours ? (3) Donne la distribution invariante et interprète.", solution: "(1) $T = \\begin{pmatrix} 0{,}9 & 0{,}1 \\\\ 0{,}5 & 0{,}5 \\end{pmatrix}$ — par récurrence : $\\pi_{n+1} = \\pi_n T$ (les probabilités totales sur l'état présent : chaque coefficient de $\\pi_n T$ somme les chemins d'arrivée — la propriété de Markov fait que seul le présent compte), donc $\\pi_n = \\pi_0\\,T^n$ ✓ — la démonstration exigible. (2) $\\pi_0 = (1\\,;\\,0)$ : $(T^2)_{MM} = 0{,}9 \\times 0{,}9 + 0{,}1 \\times 0{,}5 = $ **0,86** — les deux chemins M→M→M et M→P→M, sommés par la ligne contre colonne. (3) $\\pi T = \\pi$ : $0{,}9m + 0{,}5(1 - m) = m$ ⟺ $m = \\frac{5}{6}$ — $\\left(\\frac{5}{6}\\,;\\,\\frac{1}{6}\\right)$ : à long terme la machine tourne cinq jours sur six, quel que soit son état initial — l'invariante est le destin de la chaîne, et tout le chapitre (matrices, puissances, probabilités totales) travaille dans cette ligne." },
  ],
  practice: [
    { tier: "warmup", label: "Le degré compté", make: (r) => {
      const n = randint(r, 3, 7);
      return { prompt: `Graphe complet à ${n} sommets : quel est le degré de chaque sommet ?`, answer: n - 1, solution: `Relié aux $${n} - 1$ autres : degré **${n - 1}** (et $\\binom{${n}}{2} = ${n * (n - 1) / 2}$ arêtes).` };
    } },
    { tier: "application", label: "Les chemins de A²", make: (r) => {
      const voisins = randint(r, 2, 4);
      return { prompt: `Le sommet 1 a ${voisins} voisins, tous reliés à lui : combien de chaînes de longueur 2 de 1 vers 1 (les allers-retours) ?`, answer: voisins, solution: `Un aller-retour par voisin : $(A^2)_{11} = $ **${voisins}** — la ligne contre colonne les compte.` };
    } },
    { tier: "challenge", label: "La ligne qui somme à 1", make: (r) => {
      const p = pick(r, [[0.7, "0{,}7"], [0.8, "0{,}8"], [0.6, "0{,}6"]]);
      return { prompt: `Matrice de transition : $P(M \\to M) = ${p[1]}$ — que vaut $P(M \\to P)$ ? (décimal)`, answer: Math.round((1 - p[0]) * 10) / 10, solution: `Chaque ligne somme à 1 : $1 - ${p[1]} = $ **${String(Math.round((1 - p[0]) * 10) / 10).replace(".", ",")}** — on va bien quelque part.` };
    } },
  ],
};

export default [graphesMarkov];
