// Field "Analysis" — HIGH module (seconde year): functions in earnest.
// Official seconde programme (2019): functions with real values on an interval
// or finite union of intervals, DOMAIN of definition, the curve y = f(x) as the
// SET of points whose coordinates satisfy the equation (membership, coordinate
// computation); the REFERENCE functions — square, inverse, absolute value,
// square root, cube — with equations/inequalities f(x) = k, f(x) < k solved
// graphically or algebraically, and the REQUIRED PROOF of the relative position
// of y = x and y = x² on [0 ; +∞[; monotonicity DEFINED formally, variation
// tables, extremums, the REQUIRED PROOFS (variations of affine functions, of the
// square and inverse functions), optimization problems, and the official
// bisection/sweep algorithms for approximating an extremum.
import { randint, pick } from "../../core/exercises.js";

// — Domain and curve (programme: ensemble de définition, courbe = ensemble) —
const ensembleDefinition = {
  id: "analysis.high.ensemble-definition",
  level: "high", domain: "analysis",
  title: "Domaine de définition et courbe",
  tagline: "Où la formule a-t-elle le droit de calculer ? Et la courbe devient un ensemble de points.",
  prereqs: ["analysis.middle.fonctions-notation", "numbers.high.intervalles-valeur-absolue"],
  intuition:
    "Toute formule n'accepte pas tout réel : $f(x) = \\dfrac{1}{x - 2}$ refuse $x = 2$ (division par zéro), $g(x) = \\sqrt{x - 3}$ refuse tout $x < 3$ (racine d'un négatif).\n\nL'**ensemble de définition** $D_f$ est le territoire légal de la fonction — et il s'écrit en intervalles : $D_f = \\,]-\\infty\\,;\\,2[ \\,\\cup\\, ]2\\,;\\,+\\infty[$, $D_g = [3\\,;\\,+\\infty[$.",
  depths: {
    discovery:
      "**Avec les mains** : deux interdits seulement — **diviser par zéro** (chasser les valeurs qui annulent un dénominateur) et **extraire la racine d'un négatif** (exiger que le contenu de $\\sqrt{\\phantom{x}}$ soit $\\geq 0$). Tout le reste est permis : un polynôme vit sur $\\mathbb{R}$ entier.",
    standard:
      "**En image** : la courbe reçoit sa **définition officielle** — la courbe de $f$ est l'**ensemble des points** $M(x\\,;\\,y)$ dont les coordonnées vérifient $y = f(x)$. D'où deux gestes : **appartenance** — $A(3\\,;\\,7)$ est-il sur la courbe de $f(x) = 2x + 1$ ? Teste : $f(3) = 7$ ✓, il y est ; **calcul** — le point d'abscisse 5 de cette courbe a pour ordonnée $f(5) = 11$. La courbe n'est plus un dessin : c'est un ensemble qui se calcule.",
    advanced:
      "**Dans la tête** : le domaine se lit **sur** la courbe — elle n'existe qu'au-dessus (ou au-dessous) de $D_f$ : la courbe de $\\frac{1}{x - 2}$ a un **trou vertical** en $x = 2$ (elle s'enfuit vers l'infini de part et d'autre), celle de $\\sqrt{x - 3}$ **naît** en $x = 3$ et ignore tout ce qui précède. Et la modélisation impose ses propres frontières : l'aire d'un carré de côté $x$ est $x^2$ pour $x \\geq 0$ — la formule accepterait les négatifs, le **contexte** les refuse : $D$ se négocie entre l'algèbre et le réel.",
  },
  keyIdea: "$D_f$ : les $x$ où la formule calcule — chasser les **dénominateurs nuls**, exiger les **radicandes positifs**. La courbe $= \\{M(x\\,;\\,y) \\mid y = f(x)\\}$ : appartenance par test, coordonnées par calcul.",
  why:
    "Pourquoi formaliser « là où ça marche » ? Parce que les pannes de domaine sont les bugs les plus sournois — la division par zéro qui plante le programme, la racine de négatif qui renvoie NaN, l'asymptote que le tracé saute. Déclarer $D_f$ avant d'étudier $f$, c'est le réflexe professionnel : on borne le terrain avant d'y jouer — et toute l'analyse du lycée commencera chaque exercice par ces deux mots : « $f$ est définie sur… ».",
  examples: [
    { title: "Chasser l'interdit", steps: [
      { p: "$f(x) = \\dfrac{1}{x - 2}$ : le dénominateur s'annule en $x = 2$ — exclu." },
      { p: "$D_f = \\,]-\\infty\\,;\\,2[ \\,\\cup\\, ]2\\,;\\,+\\infty[$ — la réunion d'intervalles raconte le trou." },
    ] },
    { title: "Appartenir à la courbe", steps: [
      { p: "$A(3\\,;\\,7)$ et la courbe de $f(x) = 2x + 1$ : teste $f(3) = 7$ ✓." },
      { p: "A est **sur** la courbe — l'appartenance est un calcul, pas une lecture d'écran." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne l'ensemble de définition de $f(x) = \\dfrac{1}{x - 2}$ et de $g(x) = \\sqrt{x - 3}$.", solution: "$D_f = \\,]-\\infty\\,;\\,2[ \\,\\cup\\, ]2\\,;\\,+\\infty[$ (le dénominateur s'annule en 2) ; $D_g = [3\\,;\\,+\\infty[$ ($x - 3 \\geq 0$) — deux interdits, deux gestes." },
    { tier: "warmup", prompt: "Le point $A(3\\,;\\,7)$ appartient-il à la courbe d'équation $y = 2x + 1$ ? Et $B(5\\,;\\,10)$ ?", solution: "$f(3) = 7$ ✓ : A **est** sur la courbe ; $f(5) = 11 \\neq 10$ : B n'y est **pas** — l'appartenance se teste en substituant, jamais à l'œil." },
    { tier: "application", prompt: "Détermine l'ensemble de définition de $h(x) = \\dfrac{3}{x^2 - 9}$.", solution: "$x^2 - 9 = 0 \\Leftrightarrow x = 3$ ou $x = -3$ (ton équation produit !) : $D_h = \\mathbb{R}$ privé de $-3$ et $3$, soit $]-\\infty\\,;\\,-3[ \\,\\cup\\, ]-3\\,;\\,3[ \\,\\cup\\, ]3\\,;\\,+\\infty[$ — deux trous, trois intervalles." },
    { tier: "challenge", prompt: "Détermine $D_f$ pour $f(x) = \\sqrt{2x - 8} + \\dfrac{1}{x - 7}$.", solution: "Racine : $2x - 8 \\geq 0 \\Leftrightarrow x \\geq 4$ ; quotient : $x \\neq 7$ — intersection des deux contraintes : $D_f = [4\\,;\\,7[ \\,\\cup\\, ]7\\,;\\,+\\infty[$ : chaque morceau de formule impose sa loi, le domaine est leur **intersection**." },
    { tier: "exam", prompt: "Un rectangle a un périmètre de 20 : si $x$ est sa largeur, son aire est $A(x) = x(10 - x)$. Quel est le domaine de définition **mathématique** de la formule, et quel est le domaine imposé par le **contexte** ? Justifie.", solution: "La formule $x(10 - x)$ calcule sur $\\mathbb{R}$ entier — mais une largeur est positive ($x > 0$) et la longueur $10 - x$ aussi ($x < 10$) : le contexte impose $D = \\,]0\\,;\\,10[$. Modéliser, c'est croiser **deux** domaines : celui de l'algèbre et celui du réel — et c'est le second qui commande (une aire pour $x = 12$ serait un calcul juste sur un rectangle impossible)." },
  ],
  practice: [
    { tier: "warmup", label: "La valeur interdite", make: (r) => {
      const a = randint(r, -8, 9) || 3;
      return { prompt: `Quelle valeur est interdite pour $f(x) = \\dfrac{1}{x ${a >= 0 ? "- " + a : "+ " + (-a)}}$ ?`, answer: a, solution: `Le dénominateur s'annule en $x = $ **${a}** — la division par zéro chasse cette valeur de $D_f$.` };
    } },
    { tier: "application", label: "La naissance de la racine", make: (r) => {
      const a = randint(r, 2, 6); const b = a * randint(r, 1, 8);
      return { prompt: `$g(x) = \\sqrt{${a}x - ${a * (b / a)}}$ : à partir de quelle valeur de $x$ (incluse) la fonction est-elle définie ?`, answer: b / a, solution: `$${a}x - ${b} \\geq 0 \\Leftrightarrow x \\geq $ **${b / a}** — $D_g = [${b / a}\\,;\\,+\\infty[$.` };
    } },
    { tier: "challenge", label: "Sur la courbe ?", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, -4, 6); const x = randint(r, 1, 7);
      const ok = r() < 0.5; const y = a * x + b + (ok ? 0 : pick(r, [-2, -1, 1, 3]));
      return { prompt: `Le point $(${x}\\,;\\,${y})$ est-il sur la courbe $y = ${a}x ${b >= 0 ? "+ " + b : "- " + (-b)}$ ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$f(${x}) = ${a * x + b}$ — ${ok ? "égal à l'ordonnée : **oui**" : "différent de " + y + " : **non**"} : on substitue, on compare.` };
    } },
  ],
};

// — Reference functions (programme: carré, inverse, valeur absolue, racine, cube) —
const fonctionsReference = {
  id: "analysis.high.fonctions-reference",
  level: "high", domain: "analysis",
  title: "Les fonctions de référence",
  tagline: "Parabole, hyperbole, V, demi-parabole couchée — le répertoire d'images mentales.",
  prereqs: ["analysis.middle.fonction-carre", "analysis.high.ensemble-definition"],
  intuition:
    "Après la parabole de 3e, la collection se complète : l'**inverse** $x \\mapsto \\frac{1}{x}$ (l'hyperbole, interdite en 0), la **valeur absolue** $x \\mapsto |x|$ (le V), la **racine carrée** $x \\mapsto \\sqrt{x}$ (née en 0), le **cube** $x \\mapsto x^3$.\n\nCinq courbes à connaître **par cœur des yeux** : ce répertoire d'images mentales résoudra la moitié des équations du lycée d'un regard.",
  depths: {
    discovery:
      "**Avec les mains** : dresse les portraits — le **carré** : U symétrique, jamais négatif ; l'**inverse** : deux branches qui fuient les axes sans jamais les toucher (l'hyperbole — $D = \\mathbb{R}$ privé de 0) ; la **valeur absolue** : un V parfait, pointe à l'origine ; la **racine** : une demi-parabole couchée, née en $(0\\,;\\,0)$, qui monte en ralentissant ; le **cube** : un S qui traverse l'origine, négatif à gauche, positif à droite.",
    standard:
      "**En image** : chaque courbe résout ses équations — $\\frac{1}{x} = 2$ ? Un seul croisement : $x = \\frac{1}{2}$. $|x| = 3$ ? Le V coupé à hauteur 3 : **deux** solutions, $-3$ et $3$. $\\sqrt{x} = 4$ ? Une seule : $x = 16$ (la demi-parabole ne repasse jamais). $x^3 = -8$ ? Une seule : $-2$ (le cube garde le signe !). Compter les croisements, c'est compter les solutions — et le signe se lit de même : $x^2 \\geq 0$ toujours, $\\frac{1}{x}$ du signe de $x$, $x^3$ du signe de $x$.",
    advanced:
      "**Dans la tête** : la démonstration exigible — qui l'emporte, $x$ ou $x^2$, sur $[0\\,;\\,+\\infty[$ ? Calcule la différence : $x^2 - x = x(x - 1)$ — un produit dont le tableau de signes répond : **négatif** sur $]0\\,;\\,1[$ (la parabole passe **sous** la droite : $0{,}5^2 = 0{,}25 < 0{,}5$ !), **positif** après 1 (elle repasse dessus). Les deux courbes se croisent en 0 et en 1, et l'intuition « le carré agrandit » est **fausse** entre 0 et 1 — démontré par factorisation : tes tableaux de signes ne servaient pas qu'à résoudre, ils départagent les courbes.",
  },
  keyIdea: "Cinq portraits : U (carré), hyperbole (inverse, trou en 0), V (valeur absolue), demi-parabole couchée (racine), S (cube). Résoudre $f(x) = k$ : **compter les croisements**. Position relative : étudier le **signe de la différence**.",
  why:
    "Pourquoi mémoriser cinq dessins ? Parce qu'une image mentale répond plus vite que tout calcul : combien de solutions à $|x| = -2$ ? Zéro — le V ne descend pas sous l'axe, vu en un éclair. Le lycée bâtira toutes ses fonctions en déformant ces cinq-là (translations, dilatations) : qui connaît les originaux reconnaît les copies — c'est l'alphabet visuel de l'analyse.",
  examples: [
    { title: "Compter les croisements", steps: [
      { p: "$|x| = 3$ : le V coupé à hauteur 3 — deux branches, **deux** solutions : $-3$ et $3$." },
      { p: "$\\sqrt{x} = 4$ : la demi-parabole, un seul passage — **une** solution : $16$." },
    ] },
    { title: "x contre x² (la démo)", steps: [
      { p: "$x^2 - x = x(x - 1)$ : négatif sur $]0\\,;\\,1[$, positif sur $]1\\,;\\,+\\infty[$." },
      { p: "La parabole passe **sous** la droite entre 0 et 1, puis dessus — croisements en 0 et 1." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris les courbes des cinq fonctions de référence (carré, inverse, valeur absolue, racine carrée, cube) et leur ensemble de définition.", solution: "Carré : **U** symétrique sur $\\mathbb{R}$ ; inverse : **hyperbole** à deux branches sur $\\mathbb{R}$ privé de 0 ; valeur absolue : **V** sur $\\mathbb{R}$ ; racine : **demi-parabole couchée** sur $[0\\,;\\,+\\infty[$ ; cube : **S** croissant sur $\\mathbb{R}$ — cinq silhouettes à connaître des yeux." },
    { tier: "warmup", prompt: "Résous graphiquement (en comptant les croisements) : $|x| = 3$ ; $\\frac{1}{x} = 2$ ; $\\sqrt{x} = 4$ ; $x^2 = -1$.", solution: "$|x| = 3$ : **deux** solutions ($\\pm 3$) ; $\\frac{1}{x} = 2$ : **une** ($\\frac{1}{2}$) ; $\\sqrt{x} = 4$ : **une** ($16$) ; $x^2 = -1$ : **aucune** (le U ne descend pas sous l'axe) — la silhouette compte avant le calcul." },
    { tier: "application", prompt: "Résous $x^3 = -8$ puis $|x| < 2$. En quoi le cube diffère-t-il du carré pour les négatifs ?", solution: "$x^3 = -8 \\Leftrightarrow x = -2$ — **une seule** solution : le cube **garde le signe** (le S traverse), là où le carré l'efface (le U remonte). $|x| < 2$ : le V sous la hauteur 2 — $x \\in \\,]-2\\,;\\,2[$ : un intervalle centré (ta valeur absolue-distance !)." },
    { tier: "challenge", prompt: "Sans calculatrice, compare $0{,}7$ et $0{,}7^2$, puis $1{,}3$ et $1{,}3^2$. Quelle « évidence » ces exemples démolissent-ils ?", solution: "$0{,}7^2 = 0{,}49 < 0{,}7$ mais $1{,}3^2 = 1{,}69 > 1{,}3$ — l'« évidence » que **le carré agrandit toujours** est fausse : entre 0 et 1, élever au carré **rapetisse** (multiplier par un nombre plus petit que 1 !). La parabole passe sous la droite $y = x$ sur $]0\\,;\\,1[$." },
    { tier: "exam", prompt: "Démontre la position relative des courbes $y = x$ et $y = x^2$ sur $[0\\,;\\,+\\infty[$ : étudie le signe de $x^2 - x$ par factorisation et conclus intervalle par intervalle.", solution: "$x^2 - x = x(x - 1)$ — tableau de signes : $x \\geq 0$ partout sur le domaine, $x - 1$ négatif avant 1, positif après. Produit : **négatif** sur $]0\\,;\\,1[$ ($x^2 < x$ : la parabole **sous** la droite), **nul** en 0 et 1 (croisements), **positif** sur $]1\\,;\\,+\\infty[$ ($x^2 > x$ : dessus). La factorisation et le tableau de signes démontrent ce que l'œil suggère — c'est la première « position relative » d'une longue série au lycée." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les solutions", make: (r) => {
      const cas = pick(r, [["|x| = " + randint(r, 1, 9), 2], ["|x| = -" + randint(r, 1, 5), 0], ["\\sqrt{x} = " + randint(r, 1, 6), 1], ["x^3 = -" + [8, 27, 64][randint(r, 0, 2)], 1], ["x^2 = " + randint(r, 1, 50), 2], ["x^2 = -" + randint(r, 1, 9), 0]]);
      return { prompt: `Combien de solutions pour $${cas[0]}$ ? (pense à la silhouette !)`, answer: cas[1], solution: `**${cas[1]}** — ${cas[1] === 2 ? "la courbe symétrique repasse deux fois" : cas[1] === 1 ? "une silhouette qui ne repasse jamais" : "la courbe n'atteint pas cette hauteur"}.` };
    } },
    { tier: "application", label: "L'inverse en pratique", make: (r) => {
      const k = pick(r, [2, 4, 5, 8, 10]);
      return { prompt: `Résous $\\dfrac{1}{x} = ${k}$ : donne $x$ en décimal.`, answer: 1 / k, solution: `$x = \\dfrac{1}{${k}} = $ **${String(1 / k).replace(".", ",")}** — l'hyperbole croise chaque hauteur non nulle une fois.` };
    } },
    { tier: "challenge", label: "Le carré qui rapetisse", make: (r) => {
      const v = pick(r, [0.3, 0.5, 0.7, 0.9, 1.2, 1.5, 2]);
      return { prompt: `$x = ${String(v).replace(".", ",")}$ : a-t-on $x^2 > x$ ? (1 = oui, 0 = non)`, answer: v > 1 ? 1 : 0, solution: `$${String(v).replace(".", ",")}^2 = ${String(Math.round(v * v * 100) / 100).replace(".", ",")}$ — ${v > 1 ? "**oui** : après 1, la parabole domine" : "**non** : entre 0 et 1, le carré rapetisse"}.` };
    } },
  ],
};

// — Variations and extremums (programme: monotonie, tableaux, démos, optimisation) —
const variations = {
  id: "analysis.high.variations",
  level: "high", domain: "analysis",
  title: "Variations, extremums, optimisation",
  tagline: "Croissante se définit, se démontre, se tabule — et l'optimum se traque par dichotomie.",
  prereqs: ["analysis.high.fonctions-reference", "algebra.high.inequations-signes"],
  intuition:
    "« Ça monte » devient une définition : $f$ est **croissante** sur $I$ si pour tous $a < b$ de $I$, $f(a) \\leq f(b)$ — la fonction **respecte l'ordre**. Décroissante : elle le renverse.\n\nLe **tableau de variations** condense tout : flèches qui montent et descendent, et aux sommets des flèches, les **extremums** — maximum, minimum.",
  depths: {
    discovery:
      "**Avec les mains** : lire et traduire — une courbe qui descend de $-\\infty$ à 2 puis monte donne un tableau : flèche ↘ jusqu'à $x = 2$, flèche ↗ après ; la valeur $f(2)$ au creux est le **minimum**. Le tableau est la courbe **compressée** : on perd les détails, on garde le squelette — et le squelette suffit presque toujours.",
    standard:
      "**En image** : les démonstrations exigibles — **affine** $f(x) = mx + p$ : pour $a < b$, $f(b) - f(a) = m(b - a)$ avec $b - a > 0$ : le signe de la différence est celui de $m$ — croissante si $m > 0$, décroissante si $m < 0$, démontré en une ligne. **Carré** sur $[0\\,;\\,+\\infty[$ : $b^2 - a^2 = (b - a)(b + a)$ — deux facteurs positifs pour $0 \\leq a < b$ : croissante ✓ (et décroissante sur $]-\\infty\\,;\\,0]$ par le même calcul). **Inverse** sur $]0\\,;\\,+\\infty[$ : $\\frac{1}{b} - \\frac{1}{a} = \\frac{a - b}{ab}$ — numérateur négatif, dénominateur positif : décroissante ✓. Trois preuves, une méthode : le **signe** de $f(b) - f(a)$.",
    advanced:
      "**Dans la tête** : les variations **optimisent** — l'enclos de 20 m de grillage contre un mur : aire $A(x) = x(20 - 2x)$, et le tableau de variations de cette parabole tournée vers le bas culmine en $x = 5$ : aire maximale **50 m²**, lue au sommet de la flèche. Et quand la formule résiste, l'algorithme traque : le **balayage** teste pas à pas, la **dichotomie** coupe l'intervalle en deux à chaque tour et garde la moitié prometteuse — vingt coups suffisent pour un millionième de précision : ta boucle tant que de 3e, promue chasseuse d'optimum. Comparer $f(a)$ et $f(b)$ sans calculer devient aussi un réflexe : sur $[0\\,;\\,+\\infty[$, $\\sqrt{3} < \\sqrt{5}$ **parce que** la racine est croissante — la monotonie transporte les inégalités.",
  },
  keyIdea: "Croissante : $a < b \\Rightarrow f(a) \\leq f(b)$ (l'ordre respecté) — se démontre par le **signe** de $f(b) - f(a)$. Le tableau de variations compresse la courbe ; les extremums vivent aux pointes des flèches ; l'optimisation les lit, la dichotomie les approche.",
  why:
    "Pourquoi définir « ça monte », que tout le monde voit ? Parce que l'œil ne voit que l'intervalle dessiné — la définition, elle, **prouve** sur l'infini, compare sans calculer, et résout les problèmes d'optimisation dont l'économie, la physique et l'ingénierie vivent : maximiser une aire, minimiser un coût. La question « où est le meilleur ? » est la plus rentable des mathématiques — la dérivée de première en fera une industrie, la seconde en pose les fondations.",
  examples: [
    { title: "L'affine, démontrée", steps: [
      { p: "$a < b$ : $f(b) - f(a) = (mb + p) - (ma + p) = m(b - a)$, avec $b - a > 0$." },
      { p: "Le signe est celui de $m$ — croissante si $m > 0$ : une ligne, toute la droite couverte." },
    ] },
    { title: "L'enclos optimal", steps: [
      { p: "20 m de grillage, un mur : $A(x) = x(20 - 2x)$ — parabole vers le bas, sommet en $x = 5$." },
      { p: "Tableau : ↗ jusqu'à 5, ↘ après — maximum $A(5) = $ **50 m²**, lu à la pointe de la flèche." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris la définition de « $f$ est croissante sur $I$ », puis traduis en tableau de variations : une courbe qui descend jusqu'à $x = 2$ (où elle vaut $-1$) puis monte.", solution: "Pour **tous** $a < b$ dans $I$, $f(a) \\leq f(b)$ — l'ordre des entrées se retrouve dans les sorties. Tableau : flèche ↘ vers la valeur $-1$ en $x = 2$, puis flèche ↗ — et $-1$ est le **minimum**, logé au creux." },
    { tier: "warmup", prompt: "Démontre que $f(x) = 3x + 1$ est croissante sur $\\mathbb{R}$, avec la définition.", solution: "Soit $a < b$ : $f(b) - f(a) = 3(b - a) > 0$ car $b - a > 0$ — donc $f(a) < f(b)$ : **croissante**, démontré pour toutes les paires de réels en une ligne." },
    { tier: "application", prompt: "Démontre que la fonction carré est croissante sur $[0\\,;\\,+\\infty[$.", solution: "Pour $0 \\leq a < b$ : $b^2 - a^2 = (b - a)(b + a)$ — l'identité remarquable ! — avec $b - a > 0$ et $b + a > 0$ : produit **positif**, donc $a^2 < b^2$ : croissante ✓ (et sur les négatifs, $b + a < 0$ renverse tout : décroissante)." },
    { tier: "challenge", prompt: "Sans calculer, compare $\\frac{1}{3{,}1}$ et $\\frac{1}{3{,}2}$, puis $(-2{,}1)^2$ et $(-2{,}2)^2$. Quelle propriété utilises-tu ?", solution: "L'inverse est **décroissante** sur $]0\\,;\\,+\\infty[$ : $3{,}1 < 3{,}2 \\Rightarrow \\frac{1}{3{,}1} > \\frac{1}{3{,}2}$ ; le carré est **décroissant** sur les négatifs : $-2{,}2 < -2{,}1 \\Rightarrow (-2{,}2)^2 > (-2{,}1)^2$ — la monotonie transporte les inégalités sans poser une seule opération : c'est sa raison d'être." },
    { tier: "exam", prompt: "Avec 20 m de grillage et un mur (qui ferme un côté), on construit un enclos rectangulaire de largeur $x$. Exprime l'aire $A(x)$, précise le domaine, dresse le tableau de variations (sommet de parabole en $x = 5$ admis ou retrouvé), et conclus. Comment une dichotomie retrouverait-elle ce maximum sans la formule ?", solution: "$A(x) = x(20 - 2x)$ sur $]0\\,;\\,10[$ (largeur et longueur positives). Parabole vers le bas, sommet en $x = 5$ (entre les racines 0 et 10) : tableau ↗ jusqu'à 5, ↘ après — **maximum 50 m²** pour un enclos $5 \\times 10$. Sans formule : la **dichotomie** encadre le sommet — on coupe l'intervalle en deux, on compare l'aire de part et d'autre du milieu, on garde la moitié qui monte ; vingt itérations donnent $x = 5$ au millionième : la boucle tant que au service de l'optimum, exactement l'algorithme du programme." },
  ],
  practice: [
    { tier: "warmup", label: "Le sens de l'affine", make: (r) => {
      const m = (r() < 0.5 ? -1 : 1) * randint(r, 1, 6); const p = randint(r, -5, 6);
      return { prompt: `$f(x) = ${m}x ${p >= 0 ? "+ " + p : "- " + (-p)}$ : croissante sur ℝ ? (1 = oui, 0 = non)`, answer: m > 0 ? 1 : 0, solution: `$f(b) - f(a) = ${m}(b - a)$ : signe de $m = ${m}$ — **${m > 0 ? "croissante" : "décroissante"}**.` };
    } },
    { tier: "application", label: "La monotonie compare", make: (r) => {
      const a = randint(r, 2, 8); const b = a + randint(r, 1, 4);
      const cas = pick(r, [["carré (sur les positifs)", 1], ["inverse (sur les positifs)", 0]]);
      return { prompt: `${a} < ${b} : la fonction ${cas[0]} donne-t-elle $f(${a}) < f(${b})$ ? (1 = oui, 0 = non)`, answer: cas[1], solution: `${cas[1] === 1 ? "Le carré est **croissant** sur les positifs : l'ordre est respecté — oui" : "L'inverse est **décroissante** : l'ordre se renverse — non, $\\frac{1}{" + a + "} > \\frac{1}{" + b + "}$"}.` };
    } },
    { tier: "challenge", label: "Le sommet de l'enclos", make: (r) => {
      const L = pick(r, [12, 16, 20, 24, 40]);
      return { prompt: `${L} m de grillage contre un mur : $A(x) = x(${L} - 2x)$. En quel $x$ l'aire est-elle maximale ? (le sommet est au milieu des racines)`, answer: L / 4, solution: `Racines 0 et $${L / 2}$ → sommet en $x = $ **${L / 4}** — aire maximale $${(L / 4) * (L - 2 * (L / 4))}$ m².` };
    } },
  ],
};

export default [ensembleDefinition, fonctionsReference, variations];
