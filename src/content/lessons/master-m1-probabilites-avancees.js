// Field "Probability" — MASTER module (m1 year), master de mathématiques.
// M1 canon: agrégation = FLOOR (Borel–Cantelli, espérance conditionnelle,
// martingales, chaînes de Markov sont au programme de l'agrégation) ;
// Sorbonne 4MA311 Probabilités + Polytechnique 2A = standard.
// (1) Borel–Cantelli (deux lemmes, dichotomie 0–1) et l'espérance
// conditionnelle comme projection L².
// (2) Martingales : jeu équitable, théorème d'arrêt, ruine du joueur,
// convergence.
// (3) Chaînes de Markov : propriété de Markov, matrice de transition, loi
// stationnaire, ergodicité, PageRank.
// Singapour au niveau master : Concret = UN objet explicite ; Pictural = le
// dessin (limsup, projection orthogonale, graphe d'états) ; Abstrait = les
// théorèmes, big idea nommée. Exam = colle ; pratique = réponses entières.
import { randint, pick } from "../../core/exercises.js";

// — Borel–Cantelli : une somme décide du destin ; conditionner = projeter —
const borelCantelliConditionnement = {
  id: "probability.master.borel-cantelli-conditionnement",
  level: "master", domain: "probability",
  title: "Borel–Cantelli et l'espérance conditionnelle",
  tagline: "Deux lemmes décident si un événement se répète infiniment souvent — et conditionner, c'est projeter sur l'information disponible.",
  prereqs: ["probability.bachelor.convergences-tcl", "analysis.bachelor.espaces-hilbert"],
  intuition:
    "Certains événements aléatoires se répètent encore et encore ; d'autres finissent par ne plus jamais arriver. L'événement « $A_n$ se produit pour une infinité de $n$ » s'écrit $\\limsup_n A_n = \\bigcap_N \\bigcup_{n \\ge N} A_n$ : quel que soit l'instant $N$, il reste un $A_n$ à venir. Borel–Cantelli tranche cette question par une simple somme.\n\nUne fois qu'on sait *si* un événement revient, on veut *prévoir* une grandeur à partir d'une information partielle. L'espérance conditionnelle $E[X \\mid \\mathcal{G}]$ est la meilleure prévision de $X$ quand on ne connaît que les événements de la sous-tribu $\\mathcal{G}$ — et cette « meilleure prévision » est, très précisément, une **projection orthogonale** dans l'espace $L^2$.",
  depths: {
    discovery:
      "**Avec les mains** : lance une pièce équilibrée indéfiniment, et pose $A_n = \\{\\text{pile au lancer } n\\}$. Alors $P(A_n) = \\tfrac{1}{2}$ et $\\sum_n P(A_n) = +\\infty$. Les lancers étant **indépendants**, le second lemme de Borel–Cantelli donne $P(A_n \\text{ infiniment souvent}) = 1$ : presque sûrement, on obtient une infinité de piles. À l'inverse, pose $B_n = \\{n \\text{ piles consécutifs à partir du lancer } n\\}$, de probabilité $2^{-n}$. Là $\\sum_n 2^{-n} = 1 < +\\infty$, et le **premier** lemme donne $P(B_n \\text{ infiniment souvent}) = 0$ : ce motif ne se produit qu'un nombre fini de fois. Une même pièce, deux verdicts opposés — selon que la somme des probabilités diverge ou converge.",
    standard:
      "**En image** : représente l'espace des tirages, et pour chaque issue $\\omega$ compte combien d'événements $A_n$ la contiennent. L'ensemble $\\limsup A_n$ est exactement celui des $\\omega$ couverts **une infinité** de fois. Borel–Cantelli I dit : si la masse totale $\\sum P(A_n)$ est finie, presque aucune issue n'est couverte infiniment souvent.\n\nPour l'espérance conditionnelle, change de dessin : $X$ est un vecteur de l'espace $L^2$ des variables d'énergie finie, et les variables $\\mathcal{G}$-mesurables forment un **sous-espace fermé**. $E[X \\mid \\mathcal{G}]$ est le pied de la perpendiculaire abaissée de $X$ sur ce sous-espace : la variable $\\mathcal{G}$-mesurable la plus proche de $X$ au sens de la distance quadratique. Conditionner, c'est projeter.",
    advanced:
      "**Dans la tête** : soit $(A_n)$ des événements. **Borel–Cantelli I** : si $\\sum_n P(A_n) < +\\infty$, alors $P(\\limsup A_n) = 0$. **Borel–Cantelli II** : si les $A_n$ sont **indépendants** et $\\sum_n P(A_n) = +\\infty$, alors $P(\\limsup A_n) = 1$. D'où une dichotomie *zéro–un* pour les suites indépendantes : l'événement « infiniment souvent » a probabilité $0$ ou $1$, jamais entre les deux.\n\n**Espérance conditionnelle** : pour $X \\in L^1$ et une sous-tribu $\\mathcal{G}$, $E[X \\mid \\mathcal{G}]$ est l'unique variable $\\mathcal{G}$-mesurable $Y$ (à égalité presque sûre près) vérifiant $\\int_A Y \\, dP = \\int_A X \\, dP$ pour tout $A \\in \\mathcal{G}$. Dans $L^2$, c'est la **projection orthogonale** sur le sous-espace $L^2(\\mathcal{G})$. Propriétés clés : linéarité, $E[E[X \\mid \\mathcal{G}]] = E[X]$ (tour), $E[ZX \\mid \\mathcal{G}] = Z \\, E[X \\mid \\mathcal{G}]$ si $Z$ est $\\mathcal{G}$-mesurable (on sort ce qui est connu), et $\\mathcal{G} = \\{\\emptyset, \\Omega\\}$ redonne $E[X]$.\n\nBig idea *Measures* : un événement est négligeable ou certain selon que sa masse cumulée converge ; et conditionner moyenne $X$ sur chaque atome d'information, exactement comme une projection redistribue la masse.",
  },
  keyIdea: "Borel–Cantelli relie le **destin** d'une suite d'événements à une seule somme : $\\sum P(A_n) < \\infty$ force « presque jamais à la fin » (lemme I), tandis que divergence et indépendance forcent « infiniment souvent presque sûrement » (lemme II). L'espérance conditionnelle $E[X \\mid \\mathcal{G}]$ est la **projection orthogonale** de $X$ sur les variables $\\mathcal{G}$-mesurables : la meilleure prévision au sens $L^2$. Big idea *Measures*.",
  why:
    "Ces deux outils irriguent toute la probabilité avancée. Borel–Cantelli est la clé des résultats « presque sûrs » : convergence p.s., loi forte des grands nombres, comportement asymptotique des suites. L'espérance conditionnelle est le socle des martingales et des chaînes de Markov : sans elle, impossible de formaliser « la meilleure prévision compte tenu du passé ». La vision projection rend ses propriétés transparentes — la tour n'est que la composition de deux projections orthogonales.",
  examples: [
    { title: "Convergence presque sûre par Borel–Cantelli", steps: [
      { p: "Soit $X_n \\to X$ en probabilité. Fixe $\\varepsilon_k = 2^{-k}$ et choisis des indices $n_k$ tels que $P(|X_{n_k} - X| > 2^{-k}) \\le 2^{-k}$ (possible par définition de la convergence en probabilité)." },
      { p: "La série $\\sum_k 2^{-k}$ converge, donc Borel–Cantelli I donne $P(|X_{n_k} - X| > 2^{-k} \\text{ infiniment souvent}) = 0$. Pour presque tout $\\omega$, on a donc $|X_{n_k}(\\omega) - X(\\omega)| \\le 2^{-k}$ à partir d'un rang : $X_{n_k} \\to X$ **presque sûrement**. La convergence en probabilité cache toujours une sous-suite p.s. convergente." },
    ] },
    { title: "Conditionner par la parité d'un dé", steps: [
      { p: "Soit $X$ le résultat d'un dé équilibré, et $\\mathcal{G}$ la tribu engendrée par la parité. Sur l'événement « pair » $= \\{2, 4, 6\\}$, la meilleure prévision est la moyenne $\\frac{2 + 4 + 6}{3} = 4$ ; sur « impair » $= \\{1, 3, 5\\}$, c'est $\\frac{1 + 3 + 5}{3} = 3$." },
      { p: "Donc $E[X \\mid \\mathcal{G}]$ vaut $4$ ou $3$ selon la parité observée. Vérifions la tour : $E[E[X \\mid \\mathcal{G}]] = \\tfrac{1}{2} \\cdot 4 + \\tfrac{1}{2} \\cdot 3 = 3{,}5 = E[X]$. La projection redonne bien la moyenne globale en moyenne." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour des événements $A_n$ de probabilité $1/n^2$, l'événement « $A_n$ infiniment souvent » est-il négligeable ?", solution: "Oui. La série $\\sum_n 1/n^2$ **converge** (série de Riemann, $2 > 1$), donc le premier lemme de Borel–Cantelli s'applique sans hypothèse d'indépendance : $P(\\limsup A_n) = 0$. L'événement ne se produit qu'un **nombre fini** de fois presque sûrement. La convergence de la somme suffit à le rendre négligeable." },
    { tier: "warmup", prompt: "On lance un dé équilibré indéfiniment, indépendamment, et $A_n = \\{\\text{le } 6 \\text{ sort au lancer } n\\}$. Combien de fois, presque sûrement, le $6$ sort-il ?", solution: "Une **infinité** de fois. Ici $P(A_n) = 1/6$, donc $\\sum_n P(A_n) = +\\infty$, et les lancers sont indépendants : le second lemme de Borel–Cantelli donne $P(\\limsup A_n) = 1$. Presque sûrement, le $6$ apparaît infiniment souvent — tout motif de probabilité fixe non nulle finit par se reproduire sans fin." },
    { tier: "application", prompt: "Soit $X$ uniforme sur $\\{1, 2, 3, 4\\}$ et $\\mathcal{G}$ engendrée par l'événement $\\{X \\le 2\\}$. Calcule $E[X \\mid \\mathcal{G}]$, puis vérifie la propriété de la tour.", solution: "La tribu $\\mathcal{G}$ partitionne en $\\{1, 2\\}$ et $\\{3, 4\\}$. Sur $\\{1, 2\\}$ : $E[X \\mid \\mathcal{G}] = \\frac{1 + 2}{2} = 1{,}5$ ; sur $\\{3, 4\\}$ : $\\frac{3 + 4}{2} = 3{,}5$. La tour : $E[E[X \\mid \\mathcal{G}]] = \\tfrac{1}{2}(1{,}5) + \\tfrac{1}{2}(3{,}5) = 2{,}5 = \\frac{1 + 2 + 3 + 4}{4} = E[X]$. La projection conserve la moyenne." },
    { tier: "challenge", prompt: "Montre que parmi toutes les variables $\\mathcal{G}$-mesurables $Y \\in L^2$, c'est $E[X \\mid \\mathcal{G}]$ qui minimise l'erreur quadratique $E[(X - Y)^2]$.", solution: "Notons $\\hat X = E[X \\mid \\mathcal{G}]$, qui est $\\mathcal{G}$-mesurable. Pour toute $Y$ $\\mathcal{G}$-mesurable dans $L^2$, écris $X - Y = (X - \\hat X) + (\\hat X - Y)$. Le second terme $\\hat X - Y$ est $\\mathcal{G}$-mesurable, et $X - \\hat X$ est **orthogonal** à $L^2(\\mathcal{G})$ : en effet $E[(X - \\hat X)Z] = 0$ pour toute $Z$ $\\mathcal{G}$-mesurable bornée (caractérisation de l'espérance conditionnelle). Le théorème de Pythagore donne donc $E[(X - Y)^2] = E[(X - \\hat X)^2] + E[(\\hat X - Y)^2] \\ge E[(X - \\hat X)^2]$, avec égalité ssi $Y = \\hat X$ presque sûrement. L'espérance conditionnelle est exactement la **projection orthogonale**, donc le minimiseur de l'erreur quadratique ■." },
    { tier: "exam", prompt: "(1) Énonce les deux lemmes de Borel–Cantelli. (2) Donne un exemple montrant que l'hypothèse d'indépendance est nécessaire dans le second. (3) Définis $E[X \\mid \\mathcal{G}]$ par sa propriété caractéristique. (4) Démontre la propriété de la tour $E[E[X \\mid \\mathcal{G}]] = E[X]$.", solution: "(1) **BC I** : si $\\sum_n P(A_n) < \\infty$, alors $P(\\limsup A_n) = 0$. **BC II** : si les $A_n$ sont indépendants et $\\sum_n P(A_n) = \\infty$, alors $P(\\limsup A_n) = 1$.\n\n(2) Prends un unique événement $A$ avec $0 < P(A) < 1$ et pose $A_n = A$ pour tout $n$. Alors $\\sum_n P(A_n) = \\infty$ mais $\\limsup A_n = A$, de probabilité $P(A) < 1$. Sans indépendance, la conclusion de BC II tombe.\n\n(3) $E[X \\mid \\mathcal{G}]$ est l'unique variable $\\mathcal{G}$-mesurable $Y \\in L^1$ telle que $\\int_A Y \\, dP = \\int_A X \\, dP$ pour tout $A \\in \\mathcal{G}$.\n\n(4) Applique la propriété caractéristique avec $A = \\Omega \\in \\mathcal{G}$ : $\\int_\\Omega E[X \\mid \\mathcal{G}] \\, dP = \\int_\\Omega X \\, dP$, c'est-à-dire $E[E[X \\mid \\mathcal{G}]] = E[X]$. La moyenne survit à la projection ■." },
  ],
  practice: [
    { tier: "discovery", label: "Borel–Cantelli : 0 ou 1 ?", make: (r) => {
      const cases = [
        { s: "\\frac{1}{n^2}", conv: 1 }, { s: "\\frac{1}{n}", conv: 0 },
        { s: "\\frac{1}{2^n}", conv: 1 }, { s: "\\frac{1}{n \\ln n}", conv: 0 },
        { s: "\\frac{1}{n^3}", conv: 1 }, { s: "\\frac{1}{\\sqrt{n}}", conv: 0 },
      ];
      const c = pick(r, cases);
      return { prompt: `Des événements **indépendants** vérifient $P(A_n) = ${c.s}$. L'événement « $A_n$ infiniment souvent » a-t-il probabilité $1$ ? (réponds $1$ pour oui, $0$ pour non)`, answer: c.conv ? 0 : 1, solution: c.conv ? "La série $\\sum P(A_n)$ **converge**, donc Borel–Cantelli I donne probabilité $0$ : l'événement ne se produit qu'un nombre fini de fois." : "La série $\\sum P(A_n)$ **diverge** et les événements sont indépendants, donc Borel–Cantelli II donne probabilité $1$ : infiniment souvent presque sûrement." };
    } },
    { tier: "warmup", label: "Espérance conditionnelle sur une cellule", make: (r) => {
      const a = randint(r, 1, 6), d = randint(r, 1, 3);
      const vals = [a, a + d, a + 2 * d];
      const mean = a + d;
      return { prompt: `Une variable $X$ est uniforme sur la cellule $\\{${vals.join(", ")}\\}$ d'une partition. Que vaut $E[X \\mid \\text{cette cellule}]$ ?`, answer: mean, solution: `Sur une cellule, l'espérance conditionnelle est la **moyenne** des valeurs : $\\frac{${vals[0]} + ${vals[1]} + ${vals[2]}}{3} = ${mean}$.` };
    } },
    { tier: "application", label: "Loi de l'espérance totale", make: (r) => {
      const m1 = 2 * randint(r, 1, 4);
      const m2 = 2 * randint(r, 1, 4);
      const tot = (m1 + m2) / 2;
      return { prompt: `Une partition a deux cellules équiprobables. Sur l'une $E[X \\mid \\cdot] = ${m1}$, sur l'autre $E[X \\mid \\cdot] = ${m2}$. Que vaut $E[X]$ ?`, answer: tot, solution: `Par la tour (loi de l'espérance totale) : $E[X] = \\tfrac{1}{2} \\cdot ${m1} + \\tfrac{1}{2} \\cdot ${m2} = ${tot}$.` };
    } },
  ],
};

// — Martingales : on ne bat pas un jeu équitable —
const martingales = {
  id: "probability.master.martingales",
  level: "master", domain: "probability",
  title: "Martingales : le jeu équitable",
  tagline: "Une martingale est l'idéalisation du jeu équitable — sa valeur présente est la meilleure prévision de l'avenir, et choisir quand s'arrêter n'y change rien.",
  prereqs: ["probability.master.borel-cantelli-conditionnement"],
  intuition:
    "Un jeu est *équitable* si, à chaque instant, l'espérance de votre fortune future — connaissant tout le passé — égale votre fortune présente. Une suite $(M_n)$ avec cette propriété s'appelle une **martingale** : $E[M_{n+1} \\mid \\mathcal{F}_n] = M_n$, où $\\mathcal{F}_n$ encode l'information disponible au temps $n$. Ni gain ni perte attendus : le présent est la meilleure prévision de l'avenir.\n\nDeux variantes : une **sous-martingale** ($E[M_{n+1} \\mid \\mathcal{F}_n] \\ge M_n$, jeu favorable) et une **sur-martingale** ($\\le$, jeu défavorable — la fortune du casino). Toute la théorie répond à une question de joueur : peut-on, en choisissant astucieusement *quand s'arrêter*, battre un jeu équitable ?",
  depths: {
    discovery:
      "**Avec les mains** : un joueur mise $1$€ à pile ou face équilibré, encaissant $+1$ ou $-1$ à chaque coup. Sa fortune relative est la **marche aléatoire** $S_n = X_1 + \\cdots + X_n$ avec $X_i = \\pm 1$ équiprobables et indépendants. Calculons : $E[S_{n+1} \\mid \\mathcal{F}_n] = S_n + E[X_{n+1}] = S_n + 0 = S_n$. C'est une martingale. Quelle que soit la séquence déjà jouée, l'espérance du prochain solde est le solde actuel : le jeu est exactement équitable, et aucune mise passée ne modifie cela.",
    standard:
      "**En image** : trace la marche $S_n$ comme une ligne brisée qui monte ou descend d'un cran à chaque pas. Une martingale, c'est une trajectoire « sans pente moyenne » : à chaque nœud, les deux branches se compensent.\n\nMaintenant fixe un **temps d'arrêt** $\\tau$ — une règle pour quitter le jeu qui ne lit que le passé (« je pars dès que je gagne $10$ » est licite ; « je pars juste avant de perdre » ne l'est pas). Le théorème d'arrêt dit que, pour un $\\tau$ borné, $E[M_\\tau] = E[M_0]$ : on ne peut pas incliner l'espérance en choisissant l'instant de sortie. C'est l'impossibilité mathématique du système de jeu miracle.",
    advanced:
      "**Dans la tête** : sur un espace filtré $(\\Omega, \\mathcal{F}, (\\mathcal{F}_n), P)$, une suite $(M_n)$ **adaptée** et intégrable est une **martingale** si $E[M_{n+1} \\mid \\mathcal{F}_n] = M_n$ pour tout $n$.\n\n**Théorème d'arrêt de Doob** : si $\\tau$ est un temps d'arrêt **borné** (ou si la martingale est uniformément intégrable), alors $E[M_\\tau] = E[M_0]$.\n\n**Théorème de convergence** : une martingale bornée dans $L^1$ ($\\sup_n E|M_n| < \\infty$) converge presque sûrement vers une limite intégrable.\n\n**Ruine du joueur** : marche symétrique partant de $k$, absorbée en $0$ et en $N$. Comme $S_n$ est une martingale et le temps d'absorption $\\tau$ est presque sûrement fini, l'arrêt donne $k = E[S_\\tau] = 0 \\cdot P(\\text{ruine}) + N \\cdot P(\\text{gain})$, d'où $P(\\text{atteindre } N) = \\tfrac{k}{N}$. Et comme $S_n^2 - n$ est *aussi* une martingale, $E[\\tau] = k(N - k)$.\n\nBig idea *Invariance* : l'espérance est la quantité **invariante** d'un jeu équitable — ni le temps écoulé, ni une stratégie d'arrêt admissible ne la déplacent.",
  },
  keyIdea: "Une **martingale** est l'idéalisation du jeu équitable : $E[M_{n+1} \\mid \\mathcal{F}_n] = M_n$. Le **théorème d'arrêt** de Doob garantit $E[M_\\tau] = E[M_0]$ pour tout temps d'arrêt borné — aucun système ne bat l'équité. Appliqué à la marche symétrique, il résout la **ruine du joueur** : $P(\\text{atteindre } N \\text{ depuis } k) = k/N$, et la durée moyenne vaut $k(N - k)$. Big idea *Invariance*.",
  why:
    "Les martingales sont l'outil central de la probabilité moderne : finance (un marché sans arbitrage est une martingale sous la probabilité risque-neutre), algorithmique (analyse de files d'attente, méthode probabiliste), statistique (tests séquentiels). Le théorème d'arrêt formalise l'intuition qu'on ne peut pas tricher avec le hasard équitable, et le théorème de convergence est le moteur de nombreux résultats asymptotiques. La marche aléatoire et la ruine du joueur en sont le laboratoire élémentaire.",
  examples: [
    { title: "Ruine du joueur : probabilité de gain", steps: [
      { p: "Une marche symétrique part de $k = 3$, avec barrières absorbantes en $0$ et $N = 10$. Le solde $S_n$ est une martingale, et le temps d'absorption $\\tau$ est fini presque sûrement." },
      { p: "L'arrêt donne $3 = E[S_\\tau] = 0 \\cdot P(\\text{ruine}) + 10 \\cdot P(\\text{gain})$, donc $P(\\text{atteindre } 10) = \\tfrac{3}{10}$ et $P(\\text{ruine}) = \\tfrac{7}{10}$. La probabilité de gain est simplement la fraction du chemin déjà parcourue vers la cible." },
    ] },
    { title: "Ruine du joueur : durée moyenne", steps: [
      { p: "Le processus $S_n^2 - n$ est une martingale : comme $E[X_{n+1}^2] = 1$, on a $E[S_{n+1}^2 \\mid \\mathcal{F}_n] = S_n^2 + 1$, donc $E[(S_{n+1}^2 - (n+1)) \\mid \\mathcal{F}_n] = S_n^2 - n$." },
      { p: "L'arrêt donne $E[S_\\tau^2 - \\tau] = S_0^2 = k^2$, soit $E[\\tau] = E[S_\\tau^2] - k^2$. Avec $S_\\tau \\in \\{0, N\\}$ et $P(S_\\tau = N) = k/N$, on a $E[S_\\tau^2] = N^2 \\cdot \\tfrac{k}{N} = Nk$. Donc $E[\\tau] = Nk - k^2 = k(N - k)$. Pour $k = 3$, $N = 10$ : $E[\\tau] = 21$ coups en moyenne." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La marche aléatoire symétrique $S_n$ est-elle une martingale ? Et le processus $S_n + n$ ?", solution: "$S_n$ **est** une martingale : $E[S_{n+1} \\mid \\mathcal{F}_n] = S_n + E[X_{n+1}] = S_n$ car $E[X_{n+1}] = 0$. En revanche $S_n + n$ vérifie $E[(S_{n+1} + (n+1)) \\mid \\mathcal{F}_n] = S_n + n + 1 > S_n + n$ : c'est une **sous-martingale** (dérive $+1$ par pas), pas une martingale. Ajouter une tendance déterministe brise l'équité." },
    { tier: "warmup", prompt: "Marche symétrique partant de $4$, barrières absorbantes en $0$ et $10$. Quelle est la probabilité d'atteindre $10$ avant la ruine ?", solution: "Le solde $S_n$ est une martingale, donc l'arrêt donne $4 = E[S_\\tau] = 10 \\cdot P(\\text{atteindre } 10)$, d'où $P(\\text{atteindre } 10) = \\frac{4}{10} = \\frac{2}{5} = 0{,}4$. La probabilité de gain est la fraction du chemin parcourue vers la cible : $40\\%$." },
    { tier: "application", prompt: "Marche symétrique partant de $2$, absorbée en $0$ et $6$. Calcule la durée moyenne $E[\\tau]$ avant absorption.", solution: "Comme $S_n^2 - n$ est une martingale, l'arrêt donne $E[\\tau] = k(N - k)$ avec $k = 2$, $N = 6$ : $E[\\tau] = 2 \\times 4 = 8$. Le jeu dure en moyenne $8$ coups. (On vérifie : la formule est maximale au centre, là où l'absorption est la plus lente.)" },
    { tier: "challenge", prompt: "Montre en détail que pour la marche symétrique, $M_n = S_n^2 - n$ est une martingale.", solution: "Écris $S_{n+1} = S_n + X_{n+1}$ avec $X_{n+1} = \\pm 1$ équiprobable, indépendant de $\\mathcal{F}_n$, donc $E[X_{n+1} \\mid \\mathcal{F}_n] = 0$ et $E[X_{n+1}^2 \\mid \\mathcal{F}_n] = 1$. Alors $S_{n+1}^2 = S_n^2 + 2 S_n X_{n+1} + X_{n+1}^2$, et en conditionnant : $E[S_{n+1}^2 \\mid \\mathcal{F}_n] = S_n^2 + 2 S_n \\cdot 0 + 1 = S_n^2 + 1$ (on a sorti $S_n$, qui est $\\mathcal{F}_n$-mesurable). Donc $E[M_{n+1} \\mid \\mathcal{F}_n] = E[S_{n+1}^2 \\mid \\mathcal{F}_n] - (n + 1) = S_n^2 + 1 - n - 1 = S_n^2 - n = M_n$. C'est bien une martingale : le terme $-n$ compense exactement la croissance de la variance ■." },
    { tier: "exam", prompt: "(1) Définis une martingale par rapport à une filtration. (2) Énonce le théorème d'arrêt de Doob. (3) Pour la marche symétrique partant de $k$, absorbée en $0$ et $N$, calcule $P(\\text{atteindre } N)$ via la martingale $S_n$. (4) Calcule $E[\\tau]$ via la martingale $S_n^2 - n$.", solution: "(1) Une suite intégrable $(M_n)$ adaptée à $(\\mathcal{F}_n)$ est une martingale si $E[M_{n+1} \\mid \\mathcal{F}_n] = M_n$ pour tout $n$.\n\n(2) Si $\\tau$ est un temps d'arrêt borné (ou la martingale uniformément intégrable et $\\tau < \\infty$ p.s.), alors $E[M_\\tau] = E[M_0]$.\n\n(3) $S_n$ est une martingale et $\\tau$ (absorption) est fini p.s. avec $S_\\tau \\in \\{0, N\\}$. L'arrêt : $k = E[S_\\tau] = N \\cdot P(S_\\tau = N)$, donc $P(\\text{atteindre } N) = \\frac{k}{N}$, et $P(\\text{ruine}) = \\frac{N - k}{N}$.\n\n(4) $S_n^2 - n$ est une martingale, donc $E[S_\\tau^2 - \\tau] = k^2$, soit $E[\\tau] = E[S_\\tau^2] - k^2$. Or $E[S_\\tau^2] = N^2 \\cdot \\frac{k}{N} = Nk$, d'où $E[\\tau] = Nk - k^2 = k(N - k)$. Les deux martingales donnent respectivement la probabilité et la durée ■." },
  ],
  practice: [
    { tier: "discovery", label: "Martingale ?", make: (r) => {
      const d = pick(r, [-1, 0, 0, 1, 2]);
      const expr = d === 0 ? "M_n" : (d > 0 ? `M_n + ${d}` : `M_n - ${-d}`);
      return { prompt: `Un processus adapté vérifie $E[M_{n+1} \\mid \\mathcal{F}_n] = ${expr}$. Est-ce une **martingale** ? (réponds $1$ pour oui, $0$ pour non)`, answer: d === 0 ? 1 : 0, solution: d === 0 ? "Oui : $E[M_{n+1} \\mid \\mathcal{F}_n] = M_n$ exactement, le jeu est équitable." : `Non : il y a une dérive de $${d}$, donc c'est une ${d > 0 ? "sous" : "sur"}-martingale, pas une martingale.` };
    } },
    { tier: "warmup", label: "Ruine du joueur (probabilité)", make: (r) => {
      const N = pick(r, [4, 5, 10, 20]);
      const k = randint(r, 1, N - 1);
      const pct = Math.round((k / N) * 100);
      return { prompt: `Marche symétrique partant de $${k}$, barrières absorbantes en $0$ et $${N}$. Quelle est la probabilité d'atteindre $${N}$ avant $0$, **en pourcentage** ?`, answer: pct, solution: `Le solde $S_n$ est une martingale, donc $E[S_\\tau] = ${k}$ donne $P(\\text{atteindre } ${N}) = \\frac{${k}}{${N}}$, soit $${pct}\\%$.` };
    } },
    { tier: "application", label: "Durée moyenne du jeu", make: (r) => {
      const N = randint(r, 5, 12);
      const k = randint(r, 1, N - 1);
      const dur = k * (N - k);
      return { prompt: `Marche symétrique partant de $${k}$, absorbée en $0$ et $${N}$. Quelle est la **durée moyenne** $E[\\tau]$ avant absorption ?`, answer: dur, solution: `Comme $S_n^2 - n$ est une martingale, l'arrêt donne $E[\\tau] = k(N - k) = ${k} \\times ${N - k} = ${dur}$.` };
    } },
  ],
};

// — Chaînes de Markov : mémoire courte, régime stationnaire, PageRank —
const chainesMarkov = {
  id: "probability.master.chaines-markov",
  level: "master", domain: "probability",
  title: "Chaînes de Markov et régime stationnaire",
  tagline: "L'avenir ne dépend que du présent ; itérer la matrice de transition conduit vers une loi stationnaire — c'est le moteur du PageRank.",
  prereqs: ["probability.master.martingales", "algebra.bachelor.reduction-diagonalisation"],
  intuition:
    "Une **chaîne de Markov** est un processus sans mémoire : pour prévoir l'état de demain, seul l'état d'aujourd'hui compte — tout le passé antérieur est sans effet. Formellement $P(X_{n+1} = j \\mid X_n = i, \\text{passé}) = P(X_{n+1} = j \\mid X_n = i) =: P_{ij}$. Ces probabilités forment la **matrice de transition** $P$, dont chaque ligne — la loi de départ d'un état — somme à $1$.\n\nFaire évoluer la loi du système, c'est multiplier par $P$ : si $\\mu_n$ est la loi au temps $n$ (un vecteur ligne), alors $\\mu_{n+1} = \\mu_n P$. La question centrale : cette suite se stabilise-t-elle ? Existe-t-il une loi $\\pi$ qui ne bouge plus, $\\pi P = \\pi$ ?",
  depths: {
    discovery:
      "**Avec les mains** : un modèle météo à deux états, *Soleil* ($S$) et *Pluie* ($P$). S'il fait soleil, il pleut le lendemain avec probabilité $\\tfrac{1}{2}$ ; s'il pleut, le soleil revient avec probabilité $\\tfrac{1}{3}$. La matrice de transition est $\\begin{pmatrix} \\tfrac{1}{2} & \\tfrac{1}{2} \\\\ \\tfrac{1}{3} & \\tfrac{2}{3} \\end{pmatrix}$ (lignes $S$ puis $P$). Cherchons la loi stationnaire $\\pi = (\\pi_S, \\pi_P)$ : la condition $\\pi P = \\pi$ avec $\\pi_S + \\pi_P = 1$ donne $\\pi_S = \\tfrac{1}{2}\\pi_S + \\tfrac{1}{3}\\pi_P$, soit $\\tfrac{1}{2}\\pi_S = \\tfrac{1}{3}\\pi_P$, d'où $\\pi_S = \\tfrac{2}{5}$ et $\\pi_P = \\tfrac{3}{5}$. À long terme, il fait soleil $40\\%$ du temps — quel que soit le temps du premier jour.",
    standard:
      "**En image** : dessine un **graphe** à deux sommets $S$ et $P$, avec sur chaque flèche la probabilité de transition. Itérer la chaîne, c'est suivre ces flèches au hasard ; la loi $\\mu_n$ est la « répartition de masse » sur les sommets après $n$ pas.\n\nPour une chaîne **irréductible** (on peut aller partout) et **apériodique** (pas de cycle forcé), cette masse se redistribue et **converge** vers la loi stationnaire $\\pi$, indépendamment du point de départ : $\\mu_n \\to \\pi$. Le système oublie ses conditions initiales. Algébriquement, $\\pi$ est le vecteur propre à gauche de $P$ pour la valeur propre $1$, et toutes les autres valeurs propres sont de module $< 1$ : elles s'éteignent quand on élève $P$ à la puissance $n$.",
    advanced:
      "**Dans la tête** : une chaîne de Markov sur un espace d'états fini est donnée par une **matrice stochastique** $P$ ($P_{ij} \\ge 0$, $\\sum_j P_{ij} = 1$). La loi évolue par $\\mu_n = \\mu_0 P^n$ (équation de Chapman–Kolmogorov : $P^{n+m} = P^n P^m$).\n\nUne loi $\\pi$ est **stationnaire** si $\\pi P = \\pi$ : c'est un vecteur propre à gauche pour la valeur propre $1$, qui existe toujours (théorème de **Perron–Frobenius** : $1$ est valeur propre dominante d'une matrice stochastique). Si la chaîne est **irréductible** et **apériodique** (donc *ergodique*), $\\pi$ est **unique** et $\\mu_n \\to \\pi$ pour toute loi initiale. Le lien avec la **diagonalisation** est direct : en décomposant $P = Q \\, \\mathrm{diag}(1, \\lambda_2, \\ldots, \\lambda_d) \\, Q^{-1}$ avec $|\\lambda_i| < 1$ pour $i \\ge 2$, on lit que $P^n$ tend vers la projection sur l'espace propre de la valeur propre $1$, c'est-à-dire $\\pi$.\n\n**PageRank** : Google modélise le surf aléatoire sur le web comme une chaîne de Markov dont les états sont les pages et $P$ la matrice des liens (régularisée par un facteur d'amortissement $\\alpha \\approx 0{,}85$, qui rend la chaîne irréductible et apériodique). Le classement d'une page est sa probabilité stationnaire $\\pi_i$ : l'importance, c'est la fréquence de visite à l'équilibre.\n\nBig idea *Invariance* : la loi stationnaire est l'état **invariant** de la dynamique ; itérer la transition efface tout le reste et ne laisse subsister que $\\pi$.",
  },
  keyIdea: "Une **chaîne de Markov** est sans mémoire : la loi évolue par $\\mu_{n+1} = \\mu_n P$ avec $P$ stochastique. La **loi stationnaire** $\\pi$ vérifie $\\pi P = \\pi$ — c'est le vecteur propre à gauche pour la valeur propre dominante $1$ (Perron–Frobenius). Si la chaîne est ergodique (irréductible et apériodique), $\\pi$ est unique et $\\mu_n \\to \\pi$ depuis n'importe quel départ. Le **PageRank** est exactement cette loi stationnaire du surf aléatoire. Big idea *Invariance*.",
  why:
    "Les chaînes de Markov modélisent une immensité de systèmes : files d'attente, génétique des populations, traitement du langage, algorithmes MCMC (qui échantillonnent une loi compliquée en construisant une chaîne dont elle est la stationnaire), et bien sûr le PageRank qui a fondé Google. Le lien spectral — stationnaire $=$ vecteur propre de $P$ pour $1$ — relie la probabilité à l'algèbre linéaire de licence, et explique *pourquoi* et *à quelle vitesse* (le « trou spectral » $1 - |\\lambda_2|$) la chaîne converge.",
  examples: [
    { title: "Régime stationnaire d'une chaîne à deux états", steps: [
      { p: "Soit $P = \\begin{pmatrix} 0{,}8 & 0{,}2 \\\\ 0{,}6 & 0{,}4 \\end{pmatrix}$. On cherche $\\pi = (\\pi_1, \\pi_2)$ avec $\\pi P = \\pi$ et $\\pi_1 + \\pi_2 = 1$." },
      { p: "La première équation $\\pi_1 = 0{,}8\\,\\pi_1 + 0{,}6\\,\\pi_2$ donne $0{,}2\\,\\pi_1 = 0{,}6\\,\\pi_2$, soit $\\pi_1 = 3\\pi_2$. Avec $\\pi_1 + \\pi_2 = 1$ : $\\pi = (\\tfrac{3}{4}, \\tfrac{1}{4})$. À l'équilibre, le système passe $75\\%$ du temps dans l'état $1$." },
    ] },
    { title: "PageRank d'un mini-web à trois pages", steps: [
      { p: "Trois pages : $1 \\to 2$, $2 \\to 3$, et $3 \\to 1$ ainsi que $3 \\to 2$. La matrice du surf (sans amortissement) est $\\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ \\tfrac{1}{2} & \\tfrac{1}{2} & 0 \\end{pmatrix}$ (ligne $i$ = liens sortants de la page $i$)." },
      { p: "Résoudre $\\pi P = \\pi$ avec $\\sum_i \\pi_i = 1$ : la colonne $3$ donne $\\pi_3 = \\pi_2$, la colonne $1$ donne $\\pi_1 = \\tfrac{1}{2}\\pi_3$, et la normalisation fournit $\\pi = (\\tfrac{1}{5}, \\tfrac{2}{5}, \\tfrac{2}{5})$. Les pages $2$ et $3$ sont en tête ; la page $1$, qui ne reçoit qu'un demi-lien, est la moins bien classée. C'est l'idée du PageRank : l'importance se mesure au temps passé par le surfeur aléatoire." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans une matrice de transition, est-ce les **lignes** ou les **colonnes** qui somment à $1$ ? Pourquoi ?", solution: "Ce sont les **lignes**. La ligne $i$ rassemble les probabilités $P_{ij}$ de transition depuis l'état $i$ vers chaque état $j$ : partant de $i$, on va forcément quelque part, donc $\\sum_j P_{ij} = 1$. C'est la définition d'une matrice **stochastique** (en lignes). Les colonnes, elles, n'ont aucune raison de sommer à $1$." },
    { tier: "warmup", prompt: "Soit $P = \\begin{pmatrix} 0{,}5 & 0{,}5 \\\\ 0{,}2 & 0{,}8 \\end{pmatrix}$. Trouve la loi stationnaire $\\pi$.", solution: "On résout $\\pi P = \\pi$ avec $\\pi_1 + \\pi_2 = 1$. La première colonne donne $\\pi_1 = 0{,}5\\,\\pi_1 + 0{,}2\\,\\pi_2$, soit $0{,}5\\,\\pi_1 = 0{,}2\\,\\pi_2$, donc $\\pi_1 = \\tfrac{2}{5}\\pi_2$. Avec $\\pi_1 + \\pi_2 = 1$ : $\\pi_2 = \\tfrac{5}{7}$ et $\\pi_1 = \\tfrac{2}{7}$. Donc $\\pi = (\\tfrac{2}{7}, \\tfrac{5}{7})$ : le second état, plus « collant », est visité plus souvent." },
    { tier: "application", prompt: "Pourquoi $1$ est-elle toujours valeur propre d'une matrice stochastique $P$ ? Quel en est un vecteur propre évident ?", solution: "Parce que les lignes de $P$ somment à $1$ : le vecteur colonne $\\mathbf{1} = (1, \\ldots, 1)^\\top$ vérifie $(P\\mathbf{1})_i = \\sum_j P_{ij} = 1 = \\mathbf{1}_i$, donc $P\\mathbf{1} = \\mathbf{1}$. Ainsi $1$ est valeur propre **à droite**, de vecteur propre $\\mathbf{1}$. Le vecteur propre **à gauche** associé à cette même valeur propre $1$ est la loi stationnaire $\\pi$ (avec $\\pi P = \\pi$), de norme $1$ en somme." },
    { tier: "challenge", prompt: "Montre que toute valeur propre $\\lambda$ d'une matrice stochastique vérifie $|\\lambda| \\le 1$.", solution: "Soit $v \\neq 0$ avec $Pv = \\lambda v$, et soit $i$ un indice où $|v_i|$ est maximal. La ligne $i$ donne $\\lambda v_i = \\sum_j P_{ij} v_j$, donc $|\\lambda| \\, |v_i| = \\left| \\sum_j P_{ij} v_j \\right| \\le \\sum_j P_{ij} |v_j| \\le \\sum_j P_{ij} |v_i| = |v_i|$ (on a utilisé $P_{ij} \\ge 0$, l'inégalité triangulaire, puis $|v_j| \\le |v_i|$ et $\\sum_j P_{ij} = 1$). En divisant par $|v_i| > 0$ : $|\\lambda| \\le 1$. La valeur propre $1$ est donc bien **dominante** : aucune ne la dépasse en module ■." },
    { tier: "exam", prompt: "(1) Définis une matrice stochastique et une loi stationnaire. (2) Énonce le théorème ergodique pour une chaîne irréductible apériodique finie. (3) Calcule la loi stationnaire de $P = \\begin{pmatrix} 0{,}7 & 0{,}3 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$. (4) Explique en une phrase le lien avec le PageRank.", solution: "(1) $P$ est **stochastique** si $P_{ij} \\ge 0$ et chaque ligne somme à $1$. Une loi $\\pi$ (vecteur de probabilité) est **stationnaire** si $\\pi P = \\pi$.\n\n(2) Si la chaîne finie est **irréductible** (tout état atteint tout état) et **apériodique**, alors il existe une **unique** loi stationnaire $\\pi$, et pour toute loi initiale $\\mu_0$ on a $\\mu_0 P^n \\to \\pi$ quand $n \\to \\infty$.\n\n(3) $\\pi P = \\pi$ : la colonne $1$ donne $\\pi_1 = 0{,}7\\,\\pi_1 + 0{,}4\\,\\pi_2$, soit $0{,}3\\,\\pi_1 = 0{,}4\\,\\pi_2$, donc $\\pi_1 = \\tfrac{4}{3}\\pi_2$. Avec $\\pi_1 + \\pi_2 = 1$ : $\\pi = (\\tfrac{4}{7}, \\tfrac{3}{7})$.\n\n(4) Le PageRank d'une page est sa probabilité stationnaire dans la chaîne du surfeur aléatoire : l'importance est la fréquence de visite à l'équilibre ■." },
  ],
  practice: [
    { tier: "discovery", label: "Compléter une ligne stochastique", make: (r) => {
      const a = randint(r, 1, 4), b = randint(r, 1, 4);
      const miss = 10 - a - b;
      return { prompt: `Une ligne d'une matrice de transition est $\\left(\\tfrac{${a}}{10},\\ \\tfrac{${b}}{10},\\ \\tfrac{?}{10}\\right)$. Quel numérateur manquant rend la ligne stochastique ?`, answer: miss, solution: `Une ligne stochastique somme à $1$ : le numérateur manquant est $10 - ${a} - ${b} = ${miss}$.` };
    } },
    { tier: "warmup", label: "Loi stationnaire (2 états)", make: (r) => {
      const pairs = [
        { a: 2, b: 3 }, { a: 1, b: 4 }, { a: 1, b: 1 }, { a: 3, b: 1 },
        { a: 1, b: 3 }, { a: 3, b: 2 }, { a: 4, b: 1 },
      ];
      const { a, b } = pick(r, pairs);
      const pct = Math.round((b / (a + b)) * 100);
      return { prompt: `Dans une chaîne à deux états, la probabilité de quitter l'état $1$ vaut $\\tfrac{${a}}{10}$ et celle de quitter l'état $2$ vaut $\\tfrac{${b}}{10}$. Quelle est la proportion stationnaire de l'état $1$, **en pourcentage** ?`, answer: pct, solution: `L'équilibre des flux donne $\\pi_1 \\cdot \\tfrac{${a}}{10} = \\pi_2 \\cdot \\tfrac{${b}}{10}$, donc $\\pi_1 = \\frac{${b}}{${a + b}}$, soit $${pct}\\%$.` };
    } },
    { tier: "application", label: "Visites à l'équilibre", make: (r) => {
      const pairs = [
        { a: 2, b: 3, N: 10 }, { a: 1, b: 4, N: 10 }, { a: 1, b: 1, N: 10 },
        { a: 3, b: 1, N: 20 }, { a: 1, b: 3, N: 20 }, { a: 3, b: 2, N: 10 },
        { a: 4, b: 1, N: 10 },
      ];
      const { a, b, N } = pick(r, pairs);
      const visits = Math.round((b / (a + b)) * N);
      return { prompt: `Une chaîne à deux états (probabilités de sortie $\\tfrac{${a}}{10}$ et $\\tfrac{${b}}{10}$) tourne longtemps. Sur $${N}$ pas, combien de fois en moyenne visite-t-elle l'état $1$ ?`, answer: visits, solution: `La fréquence stationnaire de l'état $1$ est $\\frac{${b}}{${a + b}}$, donc sur $${N}$ pas : $\\frac{${b}}{${a + b}} \\times ${N} = ${visits}$ visites.` };
    } },
  ],
};

export default [borelCantelliConditionnement, martingales, chainesMarkov];
