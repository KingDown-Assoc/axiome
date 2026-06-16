// Field "Analysis" — BACHELOR module (l1 year), licence de mathématiques.
// Official MPSI/MP2I programme (arrêté 2021), chapters "Intégration"
// (piecewise-continuous functions on a segment, Riemann sums, fundamental
// theorem, integral Taylor formulas), "Procédés sommatoires discrets"
// (series: geometric, telescoping, positive-term comparison, Riemann
// series, absolute convergence, alternating series, exp(z) as a sum;
// summable families: unordered summation, grouping, discrete Fubini) and
// "Fonctions de deux variables" (open sets, partial derivatives, C^1,
// order-1 expansion, chain rule, gradient, critical points — strictly
// practical as the programme demands). Singapore method at university
// level: Concrete = hand-computed Riemann sums, the halving pie, slicing
// a landscape; Pictorial = the staircase melting under the curve, the
// rectangle-vs-curve comparison, the contour map with its gradient;
// Abstract = the definitions and theorems, proofs sketched where exigible.
// Big ideas named; exam = colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Integral on a segment (MPSI: intégration) —
const integration = {
  id: "analysis.bachelor.integration",
  level: "bachelor", domain: "analysis",
  title: "L'intégrale construite",
  tagline: "Au lycée tu l'utilisais ; cette année tu la fabriques — rectangle par rectangle.",
  prereqs: ["analysis.high.integrale", "analysis.bachelor.continuite-derivabilite"],
  intuition:
    "En terminale, l'intégrale était une aire admise et le théorème fondamental un cadeau : primitive, crochet, fini.\n\nCette année on renverse l'ordre : on **construit** l'intégrale avec des marches d'escalier, on la **mesure** par des rectangles de plus en plus fins — et le lien dérivée-aire cesse d'être un cadeau pour devenir un **théorème**.",
  depths: {
    discovery:
      "**Avec les mains** : découpe $[0, 1]$ en $4$ et empile des rectangles sous $f(x) = x^2$ — hauteurs prises à gauche : $\\frac{1}{4}\\left(0 + \\frac{1}{16} + \\frac{4}{16} + \\frac{9}{16}\\right) = \\frac{14}{64} = 0{,}21875$ ; à droite : $\\frac{30}{64} = 0{,}46875$ — l'aire vraie est coincée entre les deux. Passe à $n = 10$, $n = 100$ : l'étau se resserre vers $\\frac{1}{3}$ — la formule $\\frac{(n-1)n(2n-1)}{6n^3} \\to \\frac{1}{3}$ fait le travail, et tu viens de calculer ta première intégrale **sans primitive**.",
    standard:
      "**En image** : le dessin qui porte tout — la courbe, et dessous un **escalier** de rectangles dont le pas fond ; un deuxième escalier par au-dessus ; entre les deux, l'aire est prise en étau et les deux escaliers se rejoignent quand le pas tend vers $0$ (c'est la continuité qui garantit la jonction : sur chaque petite marche, $f$ varie aussi peu qu'on veut — l'uniforme continuité de Heine, admise, dit « aussi peu » d'un coup sur tout le segment). Big idea *Measures* : intégrer, c'est **mesurer** une aire algébrique — comptée positive au-dessus de l'axe, négative en dessous — et les sommes de Riemann $\\frac{b-a}{n}\\sum_{k=0}^{n-1} f\\left(a + k\\frac{b-a}{n}\\right)$ sont les mesures approchées qui convergent vers elle.",
    advanced:
      "**Dans la tête** : l'intégrale des fonctions **continues par morceaux** sur un segment hérite de l'escalier ses lois — linéarité, positivité, croissance, relation de Chasles, et l'inégalité triangulaire intégrale $\\left|\\int_{[a,b]} f\\right| \\leq \\int_{[a,b]} |f|$ (la version continue de l'inégalité triangulaire des sommes). Deux théorèmes structurent le chapitre : si $f$ est continue, positive, d'intégrale nulle, alors $f$ est la fonction **nulle** (une bosse, si petite soit-elle, laisserait une aire) ; et le **théorème fondamental** : pour $f$ continue, $x \\mapsto \\int_a^x f(t)\\,dt$ est dérivable de dérivée $f$ — toute fonction continue possède des primitives, et le crochet du lycée est démontré. En bonus global : la formule de **Taylor avec reste intégral** et l'inégalité de Taylor-Lagrange — les versions à reste contrôlé du développement limité, locales devenues globales.",
  },
  keyIdea: "L'intégrale d'une fonction continue par morceaux sur un segment se construit par **escaliers** ; les sommes de Riemann $\\frac{b-a}{n}\\sum f\\left(a + k\\frac{b-a}{n}\\right)$ convergent vers elle (*Measures*). Lois : linéarité, Chasles, croissance, $\\left|\\int f\\right| \\leq \\int |f|$. Théorème fondamental : $x \\mapsto \\int_a^x f$ dérive sur $f$ — le pont aire-dérivée est **démontré**.",
  why:
    "Pourquoi reconstruire ce qui marchait ? Parce que la construction dit ce que l'intégrale **est** — une limite de mesures — et non ce qu'elle calcule. C'est elle qui justifie les méthodes numériques (rectangles, trapèzes : tes sommes de Riemann sont déjà des algorithmes), elle qui permet d'intégrer des fonctions sans primitive explicite ($e^{-x^2}$ n'attend que toi), elle qui prépare la grande générale du L3 : l'intégrale de Lebesgue reprendra exactement ce chantier avec des outils plus puissants. Construire une fois pour calculer toujours.",
  examples: [
    { title: "L'étau des rectangles", steps: [
      { p: "Sous $x^2$ sur $[0, 1]$, $n = 4$ : escalier bas $0{,}21875$, escalier haut $0{,}46875$." },
      { p: "Le pas fond, l'étau se ferme : limite commune $\\frac{1}{3}$ — l'intégrale est née." },
    ] },
    { title: "Le théorème fondamental en marche", steps: [
      { p: "$F(x) = \\int_0^x \\cos(t)\\,dt$ : par construction, $F'(x) = \\cos(x)$." },
      { p: "Donc $F = \\sin$ (même dérivée, même valeur en $0$) : le crochet du lycée, démontré." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Découpe $[0, 2]$ en $4$ morceaux et calcule la somme de Riemann à gauche pour $f(x) = x$. Compare à l'aire vraie du triangle. Que se passe-t-il avec $8$ morceaux ?", solution: "Pas $\\frac{1}{2}$, hauteurs $0, \\frac{1}{2}, 1, \\frac{3}{2}$ : somme $\\frac{1}{2}\\left(0 + \\frac{1}{2} + 1 + \\frac{3}{2}\\right) = \\frac{3}{2} = 1{,}5$ — l'aire vraie du triangle vaut $\\frac{2 \\times 2}{2} = 2$ : il manque $0{,}5$, exactement les $4$ petits triangles au-dessus des marches. Avec $8$ morceaux : $\\frac{1}{4}\\left(0 + \\frac{1}{4} + \\cdots + \\frac{7}{4}\\right) = \\frac{7}{4} = 1{,}75$ — l'erreur a été **divisée par deux** : l'escalier monte vers l'aire, pas après pas." },
    { tier: "warmup", prompt: "Sans calculer : pourquoi $\\int_{-3}^{3} t^5\\,dt = 0$ et $\\int_0^{4\\pi} \\cos(t)\\,dt = 0$ ? Quels arguments de symétrie le programme te donne-t-il ?", solution: "$t^5$ est **impaire** sur un segment centré en $0$ : les aires de gauche et de droite se compensent algébriquement (la mesure est signée !) — intégrale nulle. $\\cos$ est $2\\pi$-périodique et $[0, 4\\pi]$ couvre deux périodes complètes : sur chaque période, bosse positive et creux négatif s'annulent — intégrale nulle. Parité et périodicité : deux réflexes à tester **avant** toute primitive, big idea *Invariance* appliquée à la mesure." },
    { tier: "application", prompt: "Soit $f$ continue sur $[0, 1]$ avec $f \\geq 0$ et $\\int_0^1 f = 0$. Montre que $f = 0$ — raisonne par l'absurde avec une bosse.", solution: "Suppose $f(c) > 0$ en un point $c$. Par **continuité**, $f$ reste $> \\frac{f(c)}{2}$ sur un petit segment $[c - \\delta, c + \\delta] \\cap [0, 1]$ de longueur $\\ell > 0$ — alors par croissance et Chasles, $\\int_0^1 f \\geq \\int_{\\text{segment}} f \\geq \\ell \\cdot \\frac{f(c)}{2} > 0$ : contradiction ■. La continuité est essentielle : une fonction nulle partout sauf en un point isolé (continue par morceaux !) a aussi une intégrale nulle sans être nulle — la bosse doit avoir de la **largeur** pour peser." },
    { tier: "challenge", prompt: "Calcule $\\lim_{n \\to +\\infty} \\sum_{k=1}^{n} \\frac{n}{n^2 + k^2}$ en reconnaissant une somme de Riemann. Indice : factorise $n^2$ au dénominateur.", solution: "$\\frac{n}{n^2 + k^2} = \\frac{1}{n} \\cdot \\frac{1}{1 + (k/n)^2}$ : c'est $\\frac{1}{n}\\sum_{k=1}^{n} f\\left(\\frac{k}{n}\\right)$ avec $f(x) = \\frac{1}{1 + x^2}$ — une somme de Riemann sur $[0, 1]$ ! Limite : $\\int_0^1 \\frac{dx}{1 + x^2} = [\\arctan x]_0^1 = \\frac{\\pi}{4} \\approx 0{,}785$ ■. Le réflexe de colle : une somme avec $\\frac{k}{n}$ partout et un facteur $\\frac{1}{n}$ devant **est** une intégrale qui s'ignore — lis le $f$ et conclus." },
    { tier: "exam", prompt: "Pour $n \\in \\mathbb{N}$, pose $I_n = \\int_0^1 x^n e^x\\,dx$. (1) Calcule $I_0$. (2) Montre par intégration par parties que $I_{n+1} = e - (n+1) I_n$. (3) Montre que $0 \\leq I_n \\leq \\frac{e}{n+1}$ et déduis-en $\\lim I_n$. (4) En divisant la relation de récurrence par $(n+1)$ d'un côté ou en l'itérant, que vaut $\\lim n I_n$ ? Interprète.", solution: "(1) $I_0 = \\int_0^1 e^x dx = e - 1 \\approx 1{,}72$. (2) IPP avec $u = x^{n+1}$, $v' = e^x$ : $I_{n+1} = [x^{n+1} e^x]_0^1 - (n+1)\\int_0^1 x^n e^x dx = e - (n+1) I_n$ ■. (3) Sur $[0, 1]$ : $0 \\leq x^n e^x \\leq x^n e$, donc par croissance $0 \\leq I_n \\leq e \\int_0^1 x^n dx = \\frac{e}{n+1}$ — gendarmes : $I_n \\to 0$ ■ (la masse de $x^n$ s'écrase contre $x = 1$). (4) La récurrence donne $(n+1) I_n = e - I_{n+1} \\to e - 0$ : donc $n I_n \\to e \\approx 2{,}72$ — $I_n$ tend vers $0$ **à la vitesse précise** $\\frac{e}{n}$ : l'analyse asymptotique raffine la limite, et la suite d'intégrales se comporte comme une suite explicite. Schéma de colle complet : valeur initiale, récurrence par IPP, encadrement, limite, équivalent." },
  ],
  practice: [
    { tier: "warmup", label: "Riemann à la main", make: (r) => {
      const b = randint(r, 2, 5);
      return { prompt: `Aire sous $f(x) = x$ sur $[0, ${b}]$ (le triangle) : que vaut $\\int_0^{${b}} x\\,dx$ ? (réponse décimale si besoin)`, answer: b * b / 2, solution: `Triangle : $\\frac{${b} \\times ${b}}{2} = ${b * b / 2}$ — les sommes de Riemann y convergent.` };
    } },
    { tier: "application", label: "Le crochet démontré", make: (r) => {
      const n = randint(r, 2, 4); const b = randint(r, 1, 2);
      const val = (Math.pow(b, n + 1)) / (n + 1);
      return { prompt: `$\\int_0^{${b}} ${n === 2 ? "x^2" : n === 3 ? "x^3" : "x^4"}\\,dx$ ? (fraction décimale acceptée)`, answer: val, solution: `Primitive $\\frac{x^{${n + 1}}}{${n + 1}}$ : valeur $\\frac{${Math.pow(b, n + 1)}}{${n + 1}} = ${val}$.` };
    } },
    { tier: "challenge", label: "Symétries d'abord", make: (r) => {
      const k = randint(r, 1, 4) * 2 + 1; const a = randint(r, 1, 4);
      return { prompt: `$\\int_{-${a}}^{${a}} x^{${k}}\\,dx$ ? (pense parité)`, answer: 0, solution: `Exposant ${k} **impair** sur un segment centré : aires signées compensées — $0$.` };
    } },
  ],
};

// — Series and summable families (MPSI: procédés sommatoires discrets) —
const seriesFamilles = {
  id: "analysis.bachelor.series-familles",
  level: "bachelor", domain: "analysis",
  title: "Séries et familles sommables",
  tagline: "Séries : quand une somme infinie converge, et comment le décider.",
  prereqs: ["analysis.bachelor.reels-suites", "algebra.high.suites-sommes"],
  intuition:
    "Coupe une tarte en deux, mange une moitié ; coupe le reste en deux, mange encore : $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots$ — une infinité de bouchées, une seule tarte.\n\nMais $1 + \\frac{1}{2} + \\frac{1}{3} + \\cdots$ déborde de toute assiette. Une **série** rend ce tri rigoureux : sommer l'infini, c'est prendre la **limite des sommes partielles** — et les **familles sommables** libèreront même la somme de l'ordre des termes.",
  depths: {
    discovery:
      "**Avec les mains** : la tarte d'abord — $S_n = \\frac{1}{2} + \\cdots + \\frac{1}{2^n} = 1 - \\frac{1}{2^n} \\to 1$ : la série géométrique converge et tu connais sa somme exacte. La série **harmonique** ensuite, par paquets : $\\frac{1}{3} + \\frac{1}{4} \\geq \\frac{2}{4} = \\frac{1}{2}$, puis $\\frac{1}{5} + \\cdots + \\frac{1}{8} \\geq \\frac{4}{8} = \\frac{1}{2}$ — chaque paquet de longueur doublée pèse au moins $\\frac{1}{2}$, la somme dépasse tout : **divergence**, alors même que $\\frac{1}{n} \\to 0$. Le terme général qui tend vers zéro est **nécessaire** (sinon divergence grossière) mais jamais suffisant : voilà la leçon fondatrice du chapitre.",
    standard:
      "**En image** : le dessin décisif — les rectangles de hauteurs $\\frac{1}{1^2}, \\frac{1}{2^2}, \\frac{1}{3^2}, \\ldots$ posés sous (ou sur) la courbe $\\frac{1}{x^2}$ : la somme des aires des rectangles se **compare** à l'aire sous la courbe, finie ici — la série $\\sum \\frac{1}{n^2}$ converge ; le même dessin avec $\\frac{1}{x}$ donne une aire infinie ($\\ln$ déborde) — l'harmonique diverge. Big idea *Equivalence* : une série n'est rien d'autre que **la suite de ses sommes partielles** — tout ton chapitre suites s'applique ; et pour les termes positifs, la suite des sommes partielles est croissante : elle converge si et seulement si elle est **majorée** — d'où les théorèmes de comparaison ($0 \\leq u_n \\leq v_n$ et $\\sum v_n$ converge $\\Rightarrow$ $\\sum u_n$ converge ; $u_n \\sim v_n$ positifs : même nature) et les **séries de Riemann** : $\\sum \\frac{1}{n^{\\alpha}}$ converge $\\iff \\alpha > 1$.",
    advanced:
      "**Dans la tête** : pour les signes quelconques, la **convergence absolue** ($\\sum |u_n|$ converge) entraîne la convergence — la moitié des exercices s'y ramène par comparaison ou par $u_n = O(v_n)$ ; l'autre arme est le **théorème des séries alternées** : si $(u_n)$ décroît vers $0$, alors $\\sum (-1)^n u_n$ converge, avec le reste majoré par son premier terme et du signe de celui-ci. Joyau du chapitre : $e^z = \\sum_{n=0}^{+\\infty} \\frac{z^n}{n!}$ pour **tout** complexe $z$. Puis le cadre s'élargit : une **famille sommable** $(u_i)_{i \\in I}$ se somme « en vrac », sans ordre — pour des termes positifs, la somme dans $[0, +\\infty]$ est la borne supérieure des sommes finies, **invariante par permutation** (big idea *Invariance*) ; on regroupe par **paquets**, on somme un tableau ligne par ligne ou colonne par colonne (**Fubini discret**) — confort total, justifié par la seule positivité. Pour les signes quelconques : sommable signifie $\\sum |u_i| < +\\infty$, et alors tout le confort reste — mais hors sommabilité, gare : réordonner une série semi-convergente peut changer sa somme.",
  },
  keyIdea: "Série = **suite des sommes partielles** (*Equivalence*). Terme général $\\to 0$ : nécessaire, pas suffisant (harmonique !). Termes positifs : comparaison, équivalents, Riemann ($\\alpha > 1$). Signes quelconques : **convergence absolue**, ou séries alternées (décroît vers $0$). Familles sommables : la somme « en vrac », paquets et Fubini, invariante par permutation — la positivité ou la sommabilité paie le confort.",
  why:
    "Sommer l'infini est le geste central de l'analyse : les développements en série entière du L2 écriront toutes les fonctions usuelles comme des polynômes infinis, les probabilités sur $\\mathbb{N}$ exigeront des familles sommables pour donner un sens à l'espérance, les séries de Fourier du L3 décomposeront les signaux — et ton processeur, qui calcule $e^x$ et $\\sin x$ par sommes partielles tronquées, applique le théorème des séries alternées chaque fois qu'il borne son erreur par le premier terme négligé. Trancher converge-diverge, c'est décider ce qui est calculable.",
  examples: [
    { title: "La tarte et le gouffre", steps: [
      { p: "$\\sum \\frac{1}{2^n}$ : sommes partielles $1 - \\frac{1}{2^n} \\to 1$ — converge." },
      { p: "$\\sum \\frac{1}{n}$ : paquets dyadiques $\\geq \\frac{1}{2}$ chacun — diverge, malgré $\\frac{1}{n} \\to 0$." },
    ] },
    { title: "Fubini discret sur un tableau", steps: [
      { p: "Sommer $u_{i,j} = \\frac{1}{2^i 3^j}$ sur $\\mathbb{N}^2$ : positifs, donc en vrac." },
      { p: "Lignes puis colonnes : $\\left(\\sum \\frac{1}{2^i}\\right)\\left(\\sum \\frac{1}{3^j}\\right) = 2 \\times \\frac{3}{2} = 3$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La série $\\sum \\frac{n}{n + 1}$ converge-t-elle ? Et $\\sum \\frac{1}{n(n+1)}$ ? Pour la seconde, écris $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ et regarde les sommes partielles fondre.", solution: "Première : $\\frac{n}{n+1} \\to 1 \\neq 0$ — **divergence grossière**, le couperet tombe avant tout calcul. Seconde : télescopage — $S_N = \\sum_{n=1}^{N}\\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = 1 - \\frac{1}{N+1} \\to 1$ : **converge**, somme $1$ ■. Deux réflexes d'ouverture : le terme tend-il vers $0$ ? la somme se télescope-t-elle ? — la moitié des séries de colle tombent à l'un des deux." },
    { tier: "warmup", prompt: "Nature de $\\sum \\frac{1}{n^2 + n + 1}$, de $\\sum \\frac{1}{\\sqrt{n}}$, de $\\sum \\frac{n + 1}{n^3 + 5}$ — équivalents puis Riemann.", solution: "$\\frac{1}{n^2 + n + 1} \\sim \\frac{1}{n^2}$ : Riemann $\\alpha = 2 > 1$, **converge**. $\\frac{1}{\\sqrt{n}} = \\frac{1}{n^{1/2}}$ : $\\alpha = \\frac{1}{2} \\leq 1$, **diverge** (plus gros que l'harmonique !). $\\frac{n+1}{n^3 + 5} \\sim \\frac{1}{n^2}$ : **converge**. La routine des termes positifs : équivalent du terme général, lecture de l'exposant, verdict — trois lignes par série." },
    { tier: "application", prompt: "Montre que $\\sum \\frac{(-1)^n}{n}$ converge alors que $\\sum \\left|\\frac{(-1)^n}{n}\\right|$ diverge — on dit que la convergence est semi-convergente. Puis borne l'erreur commise en s'arrêtant à $n = 100$.", solution: "$\\frac{1}{n}$ **décroît** vers $0$ : le théorème des séries alternées s'applique — $\\sum \\frac{(-1)^n}{n}$ converge ■ ; en valeur absolue c'est l'harmonique : divergence. La convergence ici n'est pas absolue : elle tient à la **compensation** des signes, pas à la petitesse des termes. Reste : $|R_{100}| \\leq \\frac{1}{101} < 0{,}01$ — et le reste est du signe du premier terme négligé : l'erreur est non seulement bornée mais **orientée** — exactement ce que fait ta calculatrice quand elle tronque." },
    { tier: "challenge", prompt: "En sommant la famille positive $u_{i,j} = \\frac{1}{2^{i+j}}$ sur $\\mathbb{N}^2$ de deux façons (Fubini, puis paquets diagonaux $i + j = k$), retrouve deux fois la même somme. Que valide cette double lecture ?", solution: "Fubini : $\\sum_i \\frac{1}{2^i} \\times \\sum_j \\frac{1}{2^j} = 2 \\times 2 = 4$. Paquets diagonaux : sur $i + j = k$ il y a $k + 1$ couples, chacun pesant $\\frac{1}{2^k}$ — somme $\\sum_k \\frac{k+1}{2^k} = 4$ ✓ (série arithmético-géométrique). Même nombre par deux découpages : c'est le théorème de **sommation par paquets** en action — pour une famille positive, la somme en vrac ne dépend ni de l'ordre ni du regroupement (big idea *Invariance*), et la double lecture d'un même tableau devient une **technique de calcul** : compter de deux façons, égaler." },
    { tier: "exam", prompt: "(1) Justifie que pour tout $n \\geq 2$ : $\\frac{1}{n^2} \\leq \\frac{1}{n(n-1)}$. (2) En sommant et en télescopant le majorant, montre que $\\sum_{n \\geq 1} \\frac{1}{n^2}$ converge et que sa somme $S$ vérifie $S \\leq 2$. (3) Minore $S$ par une somme partielle pour encadrer : $1{,}25 \\leq S \\leq 2$. (4) La valeur exacte est $\\frac{\\pi^2}{6}$ (Euler, admis) — vérifie la cohérence numérique et explique pourquoi ta méthode donne la convergence mais pas la valeur.", solution: "(1) $n^2 \\geq n(n-1)$ pour $n \\geq 1$, inverser renverse ■. (2) $\\sum_{n=2}^{N} \\frac{1}{n(n-1)} = \\sum_{n=2}^{N}\\left(\\frac{1}{n-1} - \\frac{1}{n}\\right) = 1 - \\frac{1}{N} \\leq 1$ : les sommes partielles de $\\sum \\frac{1}{n^2}$ sont majorées par $1 + 1 = 2$ — termes positifs et sommes majorées : **convergence**, $S \\leq 2$ ■. (3) $S \\geq 1 + \\frac{1}{4} = 1{,}25$ (toute somme partielle minore $S$, par positivité). (4) $\\frac{\\pi^2}{6} \\approx 1{,}645$ : bien dans $[1{,}25\\,;\\,2]$ ✓. La comparaison établit que la limite **existe** — elle ne dit pas où elle est : trouver $\\frac{\\pi^2}{6}$ exigera les séries de Fourier du L3. Toute la dialectique du chapitre tient là : converger d'abord, calculer ensuite — et parfois beaucoup plus tard." },
  ],
  practice: [
    { tier: "warmup", label: "Le couperet du terme général", make: (r) => {
      const conv = r() < 0.5; const k = randint(r, 2, 5);
      return { prompt: conv ? `$\\sum \\frac{1}{n^{${k}}}$ : converge (1) ou diverge (0) ?` : `$\\sum \\frac{n}{n + ${k}}$ : converge (1) ou diverge (0) ?`, answer: conv ? 1 : 0, solution: conv ? `Riemann $\\alpha = ${k} > 1$ : **converge**.` : `Terme général $\\to 1 \\neq 0$ : divergence **grossière**.` };
    } },
    { tier: "application", label: "Géométriques exactes", make: (r) => {
      const q = randint(r, 2, 5);
      return { prompt: `$\\sum_{n=0}^{+\\infty} \\frac{1}{${q}^n}$ : somme exacte ? (décimale acceptée)`, answer: q / (q - 1), solution: `$\\frac{1}{1 - 1/${q}} = \\frac{${q}}{${q - 1}} = ${q / (q - 1)}$.` };
    } },
    { tier: "challenge", label: "Riemann : l'exposant tranche", make: (r) => {
      const num = pick(r, [[1, 2, 0], [3, 2, 1], [2, 3, 0], [5, 2, 1], [1, 3, 0], [4, 3, 1]]);
      return { prompt: `$\\sum \\frac{1}{n^{${num[0]}/${num[1]}}}$ : converge (1) ou diverge (0) ?`, answer: num[2], solution: `$\\alpha = \\frac{${num[0]}}{${num[1]}}$ ${num[2] === 1 ? "> 1 : **converge**" : "\\leq 1 : **diverge**"}.` };
    } },
  ],
};

// — Functions of two variables (MPSI: fonctions de deux variables) —
const fonctionsDeuxVariables = {
  id: "analysis.bachelor.fonctions-deux-variables",
  level: "bachelor", domain: "analysis",
  title: "Fonctions de deux variables",
  tagline: "Fonctions de deux variables : surfaces, lignes de niveau et dérivées partielles.",
  prereqs: ["analysis.bachelor.continuite-derivabilite", "geometry.high.vecteurs-coordonnees"],
  intuition:
    "Température d'une plaque, altitude d'un terrain, profit selon deux leviers : $f(x, y)$ associe un nombre à un **point du plan** — son graphe est une **surface**, un paysage au-dessus de la carte.\n\nLa dérivée éclate alors en deux **dérivées partielles** (la pente vers l'est, la pente vers le nord), et un vecteur les rassemble : le **gradient**, boussole de la plus forte pente.",
  depths: {
    discovery:
      "**Avec les mains** : prends $f(x, y) = x^2 + y^2$ — le bol. Fige $y = 1$ : la tranche $x \\mapsto x^2 + 1$ est une parabole, sa dérivée en $x = 2$ vaut $4$ — c'est $\\frac{\\partial f}{\\partial x}(2, 1) = 4$ : dériver **en gelant l'autre variable**. Fige $x = 2$ : $\\frac{\\partial f}{\\partial y}(2, 1) = 2$. Deux tranches perpendiculaires du paysage, deux pentes — aucune théorie nouvelle : la dérivée du chapitre précédent, appliquée tranche par tranche.",
    standard:
      "**En image** : la **carte topographique** porte tout le chapitre — les **lignes de niveau** $f(x, y) = c$ (les courbes d'altitude constante : pour le bol, des cercles concentriques) et le **gradient** $\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$, flèche **perpendiculaire aux lignes de niveau**, pointée vers la montée la plus raide — l'eau de pluie dévale selon $-\\nabla f$. Et l'approximation linéaire se dessine : près de $(x_0, y_0)$, la surface se confond avec son **plan tangent** $z = f(x_0, y_0) + \\frac{\\partial f}{\\partial x}(x_0, y_0)(x - x_0) + \\frac{\\partial f}{\\partial y}(x_0, y_0)(y - y_0)$ — big idea *Diagrams* : lire la carte, c'est faire du calcul différentiel sans calcul.",
    advanced:
      "**Dans la tête** : le cadre propre — un **ouvert** de $\\mathbb{R}^2$ (autour de chaque point, une boule entière : on peut bouger dans toutes les directions), une fonction de classe $C^1$ (dérivées partielles continues), et le **développement limité d'ordre 1** : $f(x_0 + h, y_0 + k) = f(x_0, y_0) + \\frac{\\partial f}{\\partial x}(x_0, y_0)\\,h + \\frac{\\partial f}{\\partial y}(x_0, y_0)\\,k + o(\\|(h, k)\\|)$ — soit, en condensé, $f(a + v) \\approx f(a) + \\langle \\nabla f(a), v \\rangle$. Tout en découle : la **dérivée selon un vecteur** $u$ vaut $\\langle \\nabla f(a), u \\rangle$ ; la **règle de la chaîne** le long d'un arc $\\gamma(t) = (x(t), y(t))$ donne $(f \\circ \\gamma)'(t) = \\langle \\nabla f(\\gamma(t)), \\gamma'(t) \\rangle$ — et appliquée à un arc qui suit une ligne de niveau ($f \\circ \\gamma$ constante), elle **démontre** le dessin : gradient orthogonal aux lignes de niveau. Enfin l'optimisation s'amorce : en un extremum local sur un ouvert, les deux pentes s'annulent — **point critique** $\\nabla f = 0$, condition nécessaire (jamais suffisante : le col existe). Le programme est volontairement pratique — la différentiabilité générale attendra le L2.",
  },
  keyIdea: "Dérivée partielle = dériver une **tranche** (l'autre variable gelée). Le **gradient** $\\nabla f$ les rassemble : DL d'ordre 1 $f(a + v) \\approx f(a) + \\langle \\nabla f(a), v \\rangle$, plan tangent, plus forte pente, **orthogonal aux lignes de niveau** (*Diagrams*). Règle de la chaîne : $(f \\circ \\gamma)' = \\langle \\nabla f(\\gamma), \\gamma' \\rangle$. Extremum local sur un ouvert $\\Rightarrow$ **point critique** $\\nabla f = 0$ — nécessaire, pas suffisant.",
  why:
    "Le monde a rarement une seule variable : un réseau de neurones en a des milliards, et son apprentissage **est** une descente de gradient — la flèche $-\\nabla f$ de ce chapitre, suivie pas à pas dans un paysage de dimension monstrueuse ; la thermodynamique dérive partiellement ses potentiels, l'économie optimise sous deux leviers, la météo lit des cartes de niveau de pression. Deux variables suffisent pour apprendre tous les gestes — le L2 les rejouera en dimension $n$ sans rien changer aux idées.",
  examples: [
    { title: "Le bol tranché", steps: [
      { p: "$f(x, y) = x^2 + y^2$ : $\\frac{\\partial f}{\\partial x} = 2x$ ($y$ gelé), $\\frac{\\partial f}{\\partial y} = 2y$." },
      { p: "$\\nabla f(2, 1) = (4, 2)$ : perpendiculaire au cercle de niveau, pointé vers l'extérieur — la montée." },
    ] },
    { title: "La chaîne sur un cercle", steps: [
      { p: "$\\gamma(t) = (\\cos t, \\sin t)$ sur le bol : $f(\\gamma(t)) = 1$ constante." },
      { p: "Chaîne : $\\langle \\nabla f, \\gamma' \\rangle = -2\\cos t \\sin t + 2 \\sin t \\cos t = 0$ ✓ — gradient ⊥ niveau, démontré." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule les deux dérivées partielles de $f(x, y) = x^3 y + y^2$ puis évalue $\\nabla f(1, 2)$. Rappel : pour $\\frac{\\partial f}{\\partial x}$, traite $y$ comme une constante.", solution: "$\\frac{\\partial f}{\\partial x} = 3x^2 y$ (le $y^2$ gelé disparaît), $\\frac{\\partial f}{\\partial y} = x^3 + 2y$ — en $(1, 2)$ : $\\nabla f(1, 2) = (6, 5)$. Aucun théorème neuf : la dérivation du lycée, une variable à la fois — la seule erreur possible est d'oublier **laquelle** est gelée." },
    { tier: "warmup", prompt: "Dessine (ou décris) les lignes de niveau de $f(x, y) = x^2 + y^2$ et de $g(x, y) = y - x^2$. À quoi ressemble chaque paysage ?", solution: "$f = c$ : **cercles** concentriques de rayon $\\sqrt{c}$ (vide si $c < 0$) — le paysage est un bol, fond en $(0, 0)$. $g = c$ : la famille de **paraboles** $y = x^2 + c$, translatées verticalement — le paysage est une gouttière parabolique inclinée, qui monte plein nord sans jamais s'arrêter : pas d'extremum. Lire les niveaux, c'est déjà connaître le relief — big idea *Diagrams*." },
    { tier: "application", prompt: "Donne l'équation du plan tangent à la surface $z = x^2 + y^2$ au point $(1, 1, 2)$, puis estime $f(1{,}1\\,;\\,0{,}9)$ par l'approximation linéaire et compare à la valeur exacte.", solution: "$\\nabla f(1, 1) = (2, 2)$ : plan tangent $z = 2 + 2(x - 1) + 2(y - 1)$. Approximation : $f(1{,}1\\,;\\,0{,}9) \\approx 2 + 2(0{,}1) + 2(-0{,}1) = 2$ — valeur exacte : $1{,}21 + 0{,}81 = 2{,}02$ : erreur $0{,}02$, en $o(\\|(h,k)\\|)$ comme promis (les termes carrés $h^2 + k^2 = 0{,}02$, justement). Le plan tangent est à la surface ce que la tangente était à la courbe : la meilleure approximation **linéaire** locale — big idea *Proportionality*." },
    { tier: "challenge", prompt: "La température d'une plaque est $T(x, y) = 20 + x^2 - y^2$. Une fourmi suit l'arc $\\gamma(t) = (t, t^2)$. Par la règle de la chaîne, à quelle vitesse la température qu'elle ressent varie-t-elle en $t = 1$ ? Vérifie en composant d'abord.", solution: "$\\nabla T = (2x, -2y)$, $\\gamma'(t) = (1, 2t)$ — en $t = 1$ : $\\gamma(1) = (1, 1)$, $\\nabla T(1, 1) = (2, -2)$, $\\gamma'(1) = (1, 2)$ : $(T \\circ \\gamma)'(1) = \\langle (2, -2), (1, 2) \\rangle = 2 - 4 = -2$ — elle se **refroidit** de $2$ degrés par unité de temps. Vérification directe : $T(\\gamma(t)) = 20 + t^2 - t^4$, dérivée $2t - 4t^3$, en $1$ : $-2$ ✓. La chaîne évite de composer : on assemble pente du terrain et vitesse du marcheur — produit scalaire, fini." },
    { tier: "exam", prompt: "Soit $f(x, y) = x^3 - 3x + y^2$ sur $\\mathbb{R}^2$. (1) Détermine tous les points critiques. (2) Au voisinage de $(1, 0)$, étudie le signe de $f(1 + h, k) - f(1, 0)$ pour décider de sa nature. (3) Même question en $(-1, 0)$ en examinant les tranches $k = 0$ et $h = 0$ séparément. (4) Conclus : que rappelle ce second point sur la condition « point critique » ?", solution: "(1) $\\nabla f = (3x^2 - 3, 2y) = (0, 0) \\iff x = \\pm 1, y = 0$ : deux points critiques, $(1, 0)$ et $(-1, 0)$. (2) $f(1, 0) = -2$ ; $f(1 + h, k) + 2 = (1+h)^3 - 3(1+h) + k^2 + 2 = 3h^2 + h^3 + k^2 = h^2(3 + h) + k^2$ : **positif** pour $|h| < 3$ — minimum **local** ■ (pas global : $f(x, 0) \\to -\\infty$ quand $x \\to -\\infty$). (3) En $(-1, 0)$, $f(-1, 0) = 2$ : tranche $k = 0$ — $f(-1 + h, 0) - 2 = 3(-1)h^2 + \\cdots = -3h^2 + h^3 < 0$ pour $h$ petit : **maximum** le long de $x$ ; tranche $h = 0$ — $f(-1, k) - 2 = k^2 > 0$ : **minimum** le long de $y$ — un **col** (point selle) : ni max ni min. (4) Point critique est **nécessaire**, jamais suffisant : le gradient nul signale un terrain plat, qui peut être fond de vallée, sommet… ou col de montagne — le tri fin (hessienne) attendra le L2, mais l'étude par tranches tranche déjà." },
  ],
  practice: [
    { tier: "warmup", label: "Geler, dériver", make: (r) => {
      const a = randint(r, 2, 5); const x0 = randint(r, 1, 3); const y0 = randint(r, 1, 3);
      return { prompt: `$f(x, y) = ${a}x^2 y$ : que vaut $\\frac{\\partial f}{\\partial x}(${x0}, ${y0})$ ?`, answer: 2 * a * x0 * y0, solution: `$\\frac{\\partial f}{\\partial x} = ${2 * a}xy$ : en $(${x0}, ${y0})$, $${2 * a * x0 * y0}$.` };
    } },
    { tier: "application", label: "La boussole du gradient", make: (r) => {
      const x0 = randint(r, 1, 4); const y0 = randint(r, 1, 4);
      return { prompt: `Le bol $f = x^2 + y^2$ : première composante de $\\nabla f(${x0}, ${y0})$ ?`, answer: 2 * x0, solution: `$\\nabla f = (2x, 2y)$ : composante $${2 * x0}$ — flèche vers la montée.` };
    } },
    { tier: "challenge", label: "Chaîne express", make: (r) => {
      const a = randint(r, 1, 3);
      return { prompt: `$f(x, y) = ${a}xy$, $\\gamma(t) = (t, t)$ : que vaut $(f \\circ \\gamma)'(1)$ ?`, answer: 2 * a, solution: `$f(\\gamma(t)) = ${a}t^2$, dérivée $${2 * a}t$ : en $1$, $${2 * a}$ — ou $\\langle \\nabla f, \\gamma' \\rangle = ${a}(1) + ${a}(1)$.` };
    } },
  ],
};

export default [integration, seriesFamilles, fonctionsDeuxVariables];
