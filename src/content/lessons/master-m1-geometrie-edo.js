// Fields "Geometry" + "Analysis" — MASTER module (m1 year), master de
// mathématiques. Deux leçons partagent ce fichier (domaines mixtes : sans
// importance pour le hub du curriculum, le champ est porté par chaque leçon).
// M1 canon: agrégation = PLANCHER (sous-variétés de R^n, théorème des extrema
// liés, systèmes différentiels linéaires, exponentielle de matrice sont au
// programme de l'agrégation) ; Sorbonne + Polytechnique 2A = standard.
// (1) Sous-variétés de R^n : valeur régulière, espace tangent, multiplicateurs
// de Lagrange — PAS de courbes (courbes et repère de Frenet vivent désormais
// dans analysis.bachelor.inversion-locale).
// (2) Systèmes différentiels linéaires : exponentielle de matrice, résolvante,
// solution fondamentale, wronskien et formule de Liouville.
// Singapour au niveau master : Concret = UN objet explicite (la sphère ; la
// rotation du plan) ; Pictural = le dessin (gradient normal, champ de
// vecteurs) ; Abstrait = les théorèmes, big idea nommée. Exam = colle ;
// pratique = réponses entières.
import { randint, pick } from "../../core/exercises.js";

// — Sous-variétés : un lieu d'équations devient lisse là où le gradient ne
// meurt pas ; optimiser sous contrainte, c'est aligner les gradients —
const sousVarietesLagrange = {
  id: "geometry.master.sous-varietes-lagrange",
  level: "master", domain: "geometry",
  title: "Sous-variétés et multiplicateurs de Lagrange",
  tagline: "Un lieu défini par des équations devient une surface lisse là où le gradient ne s'annule pas — et optimiser sous contrainte revient à aligner les gradients.",
  prereqs: ["analysis.bachelor.inversion-locale", "analysis.bachelor.fonctions-deux-variables"],
  intuition:
    "Une **sous-variété** de $\\mathbb{R}^n$ est une partie qui, vue de près, ressemble à un morceau d'espace plat $\\mathbb{R}^k$ : une surface lisse dans l'espace, une figure de dimension $k$ sans coin ni singularité. Deux façons de la décrire coexistent : par **équations** (le lieu où une fonction s'annule, comme la sphère $\\{x^2 + y^2 + z^2 = 1\\}$) ou par **paramétrage** (l'image d'une carte).\n\nLe pont entre les deux est le théorème des fonctions implicites, et son corollaire géométrique — le **théorème de la valeur régulière** — dit exactement quand un lieu d'équations est lisse. Une fois la sous-variété en main, optimiser une fonction *en restant dessus* obéit à une règle limpide : à l'optimum, le gradient de la fonction est **orthogonal** à la surface, donc combinaison des gradients des contraintes. Ce sont les **multiplicateurs de Lagrange**.",
  depths: {
    discovery:
      "**Avec les mains** : prends la sphère unité $S^2 = \\{(x, y, z) : x^2 + y^2 + z^2 = 1\\}$ dans $\\mathbb{R}^3$. Pose $g(x, y, z) = x^2 + y^2 + z^2 - 1$, de sorte que $S^2 = g^{-1}(0)$. Son gradient $\\nabla g = (2x, 2y, 2z)$ ne s'annule **jamais** sur la sphère (il faudrait $x = y = z = 0$, qui n'y est pas). La valeur $0$ est donc *régulière*, et le théorème de la valeur régulière garantit que $S^2$ est une sous-variété de dimension $3 - 1 = 2$ : une vraie surface lisse. Mieux : en un point $p$, le **plan tangent** est exactement l'orthogonal du gradient, $T_p S^2 = \\{v : \\langle p, v \\rangle = 0\\} = p^\\perp$. Le gradient pointe droit vers l'extérieur, le plan tangent lui est perpendiculaire.",
    standard:
      "**En image** : dessine une surface de niveau $\\{g = c\\}$ et, en un point, la flèche du gradient $\\nabla g$ qui lui est **normale**. Toute la géométrie locale tient dans cette image : la surface est lisse là où le gradient ne meurt pas, et l'espace tangent est le plan perpendiculaire à $\\nabla g$ — autrement dit le **noyau** de la différentielle $dg$.\n\nPour l'optimisation, superpose les **lignes de niveau** de la fonction $f$ à maximiser et la contrainte $\\{g = 0\\}$. Tant qu'une ligne de niveau coupe transversalement la contrainte, on peut progresser le long de celle-ci vers une valeur plus haute. On ne peut plus bouger quand la ligne de niveau de $f$ devient **tangente** à la contrainte : là, $\\nabla f$ et $\\nabla g$ sont colinéaires. C'est l'instant de l'extremum lié.",
    advanced:
      "**Dans la tête** : soit $g : \\mathbb{R}^n \\to \\mathbb{R}^p$ de classe $C^1$. Un point $c$ est une **valeur régulière** si la différentielle $dg_x$ est **surjective** en tout $x \\in g^{-1}(c)$.\n\n**Théorème de la valeur régulière** : si $c$ est régulière, alors $M = g^{-1}(c)$ est une sous-variété de classe $C^1$ et de dimension $n - p$, et son **espace tangent** en $x$ est $T_x M = \\ker dg_x$. (La preuve est le théorème des fonctions implicites : autour de chaque point, $p$ des coordonnées s'expriment en fonction des $n - p$ autres.)\n\n**Multiplicateurs de Lagrange** : pour extrémiser $f$ sur $M = \\{g_1 = \\cdots = g_p = 0\\}$, en un extremum $x$ où les $\\nabla g_i(x)$ sont indépendants, il existe des réels $\\lambda_1, \\ldots, \\lambda_p$ tels que $\\nabla f(x) = \\sum_{i=1}^p \\lambda_i \\, \\nabla g_i(x)$. Géométriquement : $\\nabla f$ est orthogonal à $T_x M = \\bigcap_i \\ker dg_i$, donc dans l'espace engendré par les gradients des contraintes.\n\nBig idea *Equivalence* : une sous-variété admet deux descriptions **équivalentes** — implicite ($g^{-1}(c)$) et paramétrique (image d'une carte) — que le théorème des fonctions implicites fait basculer localement de l'une à l'autre. C'est cette équivalence qui rend l'espace tangent calculable des deux côtés : noyau de $dg$ ou image de la différentielle d'une carte.",
  },
  keyIdea: "Le **théorème de la valeur régulière** transforme un lieu d'équations en sous-variété : si $0$ est valeur régulière de $g : \\mathbb{R}^n \\to \\mathbb{R}^p$ (différentielle surjective), alors $g^{-1}(0)$ est lisse, de dimension $n - p$, d'espace tangent $T_x M = \\ker dg_x$. Optimiser $f$ dessus donne les **multiplicateurs de Lagrange** : $\\nabla f = \\sum_i \\lambda_i \\nabla g_i$ à l'optimum. Big idea *Equivalence*.",
  why:
    "Les sous-variétés sont le cadre de toute la géométrie différentielle : surfaces, groupes de Lie, espaces de configuration de la mécanique. Le théorème de la valeur régulière est l'outil qui *fabrique* des exemples (sphères, tores, groupe orthogonal $O(n) = \\{M : M^\\top M = I\\}$) sans paramétrage explicite. Et les multiplicateurs de Lagrange sont l'algorithme universel de l'optimisation sous contrainte — de l'économie à l'apprentissage automatique, en passant par la physique où ils encodent les forces de liaison.",
  examples: [
    { title: "La sphère est une surface lisse", steps: [
      { p: "Sur $S^2 = \\{x^2 + y^2 + z^2 = 1\\}$, on a $g(x, y, z) = x^2 + y^2 + z^2 - 1$ et $\\nabla g = (2x, 2y, 2z)$. En tout point de la sphère, $\\nabla g \\neq 0$, donc $0$ est valeur régulière : $S^2$ est une sous-variété de dimension $2$." },
      { p: "Au pôle nord $p = (0, 0, 1)$, $\\nabla g(p) = (0, 0, 2)$ est vertical. Le plan tangent est $T_p S^2 = \\{(v_1, v_2, v_3) : v_3 = 0\\}$, le plan horizontal — exactement l'orthogonal de $p$. Le tangent ne dépend que de la direction du gradient." },
    ] },
    { title: "Optimiser une somme sur la sphère", steps: [
      { p: "Cherchons les extrema de $f(x, y, z) = x + y + z$ sur $S^2$. La condition de Lagrange $\\nabla f = \\lambda \\nabla g$ s'écrit $(1, 1, 1) = \\lambda (2x, 2y, 2z)$, donc $x = y = z = \\frac{1}{2\\lambda}$." },
      { p: "La contrainte $x^2 + y^2 + z^2 = 1$ donne $3x^2 = 1$, soit $x = \\pm \\frac{1}{\\sqrt{3}}$. Le maximum est $f = 3 \\cdot \\frac{1}{\\sqrt{3}} = \\sqrt{3}$, atteint en $(\\tfrac{1}{\\sqrt{3}}, \\tfrac{1}{\\sqrt{3}}, \\tfrac{1}{\\sqrt{3}})$ ; le minimum vaut $-\\sqrt{3}$. C'est l'inégalité de Cauchy–Schwarz $\\langle (1,1,1), x \\rangle \\le \\sqrt{3}\\, \\|x\\|$ rendue géométrique." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le cercle $\\{x^2 + y^2 = 1\\}$ dans $\\mathbb{R}^2$ est-il une sous-variété ? De quelle dimension ?", solution: "Oui. Avec $g(x, y) = x^2 + y^2 - 1$, le gradient $\\nabla g = (2x, 2y)$ ne s'annule qu'à l'origine, qui n'est pas sur le cercle. Donc $0$ est valeur régulière et le cercle est une sous-variété de dimension $2 - 1 = 1$ : une courbe lisse. Son espace tangent en $p$ est la droite orthogonale à $p$." },
    { tier: "warmup", prompt: "Pour quelles valeurs de $c$ le lieu $\\{x^2 + y^2 - z^2 = c\\}$ est-il une sous-variété lisse de $\\mathbb{R}^3$ ?", solution: "Avec $g = x^2 + y^2 - z^2$, on a $\\nabla g = (2x, 2y, -2z)$, qui ne s'annule **qu'à l'origine**. Or $g(0,0,0) = 0$ : la seule valeur non régulière est $c = 0$ (le cône, qui présente une singularité en son sommet). Pour tout $c \\neq 0$, la valeur est régulière et le lieu est une surface lisse de dimension $2$ (un hyperboloïde, à une ou deux nappes selon le signe de $c$)." },
    { tier: "application", prompt: "Donne l'espace tangent à la sphère $\\{x^2 + y^2 + z^2 = 1\\}$ au point $p = (\\tfrac{1}{\\sqrt{2}}, \\tfrac{1}{\\sqrt{2}}, 0)$.", solution: "Le gradient en $p$ est $\\nabla g(p) = (2 \\cdot \\tfrac{1}{\\sqrt{2}}, 2 \\cdot \\tfrac{1}{\\sqrt{2}}, 0) = (\\sqrt{2}, \\sqrt{2}, 0)$, colinéaire à $(1, 1, 0)$. L'espace tangent est son orthogonal : $T_p S^2 = \\{(v_1, v_2, v_3) : v_1 + v_2 = 0\\}$, un plan engendré par $(1, -1, 0)$ et $(0, 0, 1)$. C'est bien un plan de dimension $2$." },
    { tier: "challenge", prompt: "Montre que le groupe orthogonal $O(n) = \\{M \\in M_n(\\mathbb{R}) : M^\\top M = I\\}$ est une sous-variété de $M_n(\\mathbb{R})$, et calcule sa dimension.", solution: "Considère $g : M_n(\\mathbb{R}) \\to \\mathrm{Sym}_n(\\mathbb{R})$, $g(M) = M^\\top M - I$, à valeurs dans l'espace des matrices **symétriques** (car $(M^\\top M)^\\top = M^\\top M$). Sa différentielle en $M$ est $dg_M(H) = H^\\top M + M^\\top H$. Pour $M \\in O(n)$ et $S$ symétrique donnée, le choix $H = \\tfrac{1}{2} M S$ donne $dg_M(H) = \\tfrac{1}{2}(S^\\top M^\\top M + M^\\top M S) = \\tfrac{1}{2}(S + S) = S$ : $dg_M$ est **surjective** sur $\\mathrm{Sym}_n$. Donc $0$ est valeur régulière et $O(n) = g^{-1}(0)$ est une sous-variété de dimension $\\dim M_n - \\dim \\mathrm{Sym}_n = n^2 - \\frac{n(n+1)}{2} = \\frac{n(n-1)}{2}$. Son espace tangent en $I$ est $\\ker dg_I = \\{H : H^\\top + H = 0\\}$, les matrices **antisymétriques** ■." },
    { tier: "exam", prompt: "(1) Définis une valeur régulière et énonce le théorème de la valeur régulière. (2) Donne l'espace tangent à $M = g^{-1}(0)$ en un point. (3) Énonce le théorème des multiplicateurs de Lagrange. (4) Applique-le pour trouver le maximum de $f(x, y) = xy$ sur le cercle $x^2 + y^2 = 1$.", solution: "(1) $c$ est **valeur régulière** de $g : \\mathbb{R}^n \\to \\mathbb{R}^p$ ($C^1$) si $dg_x$ est surjective pour tout $x \\in g^{-1}(c)$. **Théorème** : alors $g^{-1}(c)$ est une sous-variété $C^1$ de dimension $n - p$.\n\n(2) $T_x M = \\ker dg_x$ : les vecteurs annulés par la différentielle des contraintes.\n\n(3) Si $f$ admet un extremum sur $M = \\{g = 0\\}$ en $x$ où $dg_x$ est de rang $p$, alors $\\nabla f(x) = \\sum_i \\lambda_i \\nabla g_i(x)$ pour des réels $\\lambda_i$.\n\n(4) $\\nabla f = (y, x)$, $\\nabla g = (2x, 2y)$. Lagrange : $y = 2\\lambda x$ et $x = 2\\lambda y$, d'où $y = 4\\lambda^2 y$, donc $\\lambda = \\pm \\tfrac{1}{2}$ et $x = \\pm y$. Avec $x^2 + y^2 = 1$ : $x = y = \\tfrac{1}{\\sqrt{2}}$ donne $f = \\tfrac{1}{2}$, le **maximum**. (Les points $x = -y$ donnent le minimum $-\\tfrac{1}{2}$.) ■" },
  ],
  practice: [
    { tier: "discovery", label: "Dimension d'une sous-variété", make: (r) => {
      const n = randint(r, 3, 7);
      const p = randint(r, 1, n - 1);
      return { prompt: `Une sous-variété de $\\mathbb{R}^{${n}}$ est l'image réciproque d'une valeur régulière par une submersion $g : \\mathbb{R}^{${n}} \\to \\mathbb{R}^{${p}}$. Quelle est sa **dimension** ?`, answer: n - p, solution: `Le théorème de la valeur régulière donne $\\dim = n - p = ${n} - ${p} = ${n - p}$ : chaque contrainte indépendante retire une dimension.` };
    } },
    { tier: "warmup", label: "Maximum d'une forme linéaire sur la sphère", make: (r) => {
      const k = randint(r, 2, 3);
      const cs = Array.from({ length: k }, () => randint(r, 1, 4));
      const S = cs.reduce((acc, c) => acc + c * c, 0);
      return { prompt: `On maximise $f(x) = ${cs.map((c, i) => `${c}x_{${i + 1}}`).join(" + ")}$ sur la sphère unité de $\\mathbb{R}^{${k}}$. Le maximum est la racine carrée d'un entier — lequel ?`, answer: S, solution: `Par Lagrange (équivalent à Cauchy–Schwarz), le maximum vaut $\\|c\\| = \\sqrt{${cs.map((c) => `${c}^2`).join(" + ")}} = \\sqrt{${S}}$, donc l'entier cherché est $${S}$.` };
    } },
    { tier: "application", label: "Produit maximal à somme fixée", make: (r) => {
      const m = randint(r, 2, 6);
      return { prompt: `On maximise le produit $xy$ sous la contrainte $x + y = ${2 * m}$ (avec $x, y > 0$). Quelle est la valeur maximale ?`, answer: m * m, solution: `Lagrange donne $\\nabla(xy) = \\lambda \\nabla(x + y)$, soit $y = \\lambda$ et $x = \\lambda$, donc $x = y = ${m}$. Le produit maximal est $${m} \\times ${m} = ${m * m}$ — c'est l'inégalité arithmético-géométrique.` };
    } },
  ],
};

// — Systèmes linéaires : une matrice exponentielle est tout le flot ; un
// déterminant, le wronskien, dit si les solutions restent indépendantes —
const edoLineairesResolvante = {
  id: "analysis.master.edo-lineaires-resolvante",
  level: "master", domain: "analysis",
  title: "Systèmes différentiels linéaires et exponentielle de matrice",
  tagline: "Une seule matrice exponentielle encode tout le flot d'un système linéaire — et un déterminant, le wronskien, dit si les solutions restent indépendantes.",
  prereqs: ["analysis.bachelor.cauchy-lipschitz", "algebra.bachelor.reduction-diagonalisation"],
  intuition:
    "Un **système différentiel linéaire** s'écrit $X'(t) = A(t) X(t)$, où $X(t) \\in \\mathbb{R}^n$ est un vecteur d'état et $A(t)$ une matrice. C'est le modèle de toute dynamique au premier ordre : ressorts couplés, circuits, populations en interaction — et, par linéarisation, le comportement local de n'importe quel système au voisinage d'un équilibre.\n\nQuand $A$ est **constante**, la solution a une forme miraculeusement compacte : $X(t) = e^{tA} X(0)$, où $e^{tA}$ est l'**exponentielle de matrice**. Cette unique matrice encode tout le flot. Quand $A$ dépend du temps, l'exponentielle cède la place à la **résolvante** $R(t, s)$, qui transporte l'état de l'instant $s$ à l'instant $t$. Et un déterminant — le **wronskien** — mesure si un paquet de solutions reste indépendant, avec une loi d'évolution étonnamment simple.",
  depths: {
    discovery:
      "**Avec les mains** : prends le système plan $X' = AX$ avec $A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. Calculons l'exponentielle par la série : $A^2 = -I$, $A^3 = -A$, $A^4 = I$, et le cycle recommence. En regroupant les puissances paires et impaires, $e^{tA} = \\sum_k \\frac{t^k A^k}{k!} = (\\cos t)\\, I + (\\sin t)\\, A = \\begin{pmatrix} \\cos t & -\\sin t \\\\ \\sin t & \\cos t \\end{pmatrix}$. C'est la **rotation** d'angle $t$ ! La solution partant de $X(0)$ tourne autour de l'origine à vitesse angulaire $1$ : on retrouve l'oscillateur harmonique $x'' + x = 0$ écrit comme système. L'exponentielle de matrice *est* le flot.",
    standard:
      "**En image** : dessine le **champ de vecteurs** $X \\mapsto AX$ dans le plan — en chaque point, une flèche donnant la vitesse. Les solutions sont les trajectoires qui suivent ces flèches. Pour le système rotation, les flèches sont tangentes à des cercles, et les trajectoires sont des cercles parcourus à vitesse constante.\n\nPour résoudre, on regroupe $n$ solutions indépendantes en colonnes d'une **matrice fondamentale** $\\Phi(t)$, chaque colonne étant une trajectoire. La solution générale est $X(t) = \\Phi(t)\\, c$ pour un vecteur constant $c$. Le **wronskien** $W(t) = \\det \\Phi(t)$ mesure le « volume » porté par ces solutions : non nul à un instant, il l'est partout, et les solutions restent indépendantes pour toujours.",
    advanced:
      "**Dans la tête** : l'**exponentielle de matrice** est $e^{tA} = \\sum_{k \\ge 0} \\frac{t^k A^k}{k!}$, série qui converge pour toute matrice. Elle résout le problème de Cauchy à coefficients constants : $\\Phi(t) = e^{tA}$ vérifie $\\Phi' = A\\Phi$, $\\Phi(0) = I$, donc $X(t) = e^{tA} X_0$. Trois propriétés clés : le **groupe à un paramètre** $e^{(s + t)A} = e^{sA} e^{tA}$ (avec $e^{0 \\cdot A} = I$ et $(e^{tA})^{-1} = e^{-tA}$) ; le calcul par **diagonalisation** $A = P D P^{-1} \\Rightarrow e^{tA} = P e^{tD} P^{-1}$, où $e^{tD} = \\mathrm{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})$ ; et le traitement des blocs de Jordan pour les valeurs propres multiples (termes polynomiaux en $t$).\n\nPour $A(t)$ **variable**, la solution fondamentale est la **résolvante** $R(t, s)$ : l'unique matrice vérifiant $\\partial_t R(t, s) = A(t) R(t, s)$ et $R(s, s) = I$, qui donne $X(t) = R(t, s) X(s)$.\n\n**Wronskien et formule de Liouville** : $W(t) = \\det \\Phi(t)$ évolue selon $W'(t) = \\mathrm{tr}(A(t))\\, W(t)$, d'où $W(t) = W(t_0) \\exp\\!\\left( \\int_{t_0}^t \\mathrm{tr}\\, A(s)\\, ds \\right)$. Le wronskien ne s'annule jamais s'il est non nul une fois : l'indépendance des solutions est **préservée** par le flot.\n\nBig idea *Invariance* : le flot d'un système linéaire est un **groupe** ($e^{(s+t)A} = e^{sA} e^{tA}$), structure invariante qui rend la composition des évolutions triviale ; et le wronskien évolue par une loi déterministe — sa nullité est un invariant qualitatif de l'indépendance.",
  },
  keyIdea: "Le système $X' = AX$ à coefficients constants se résout par l'**exponentielle de matrice** : $X(t) = e^{tA} X_0$, avec $e^{tA} = \\sum_k \\frac{t^k A^k}{k!}$, calculable par diagonalisation $e^{tA} = P e^{tD} P^{-1}$. Le flot forme un **groupe à un paramètre** $e^{(s+t)A} = e^{sA} e^{tA}$. Le **wronskien** $W = \\det \\Phi$ suit la formule de Liouville $W' = \\mathrm{tr}(A)\\, W$, donc reste non nul s'il l'est une fois. Big idea *Invariance*.",
  why:
    "Les systèmes linéaires sont le socle de la théorie des équations différentielles : tout système non linéaire se lit, au voisinage d'un équilibre, à travers sa **linéarisation** $X' = AX$, et le signe des parties réelles des valeurs propres de $A$ décide de la stabilité. L'exponentielle de matrice est centrale en automatique (commande de systèmes), en traitement du signal et en physique quantique (évolution unitaire $e^{-itH}$). La formule de Liouville, elle, est l'ancêtre de la conservation des volumes dans l'espace des phases — le théorème de Liouville de la mécanique hamiltonienne.",
  examples: [
    { title: "Exponentielle par diagonalisation", steps: [
      { p: "Soit $A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$, déjà diagonale. L'exponentielle se calcule terme à terme : $e^{tA} = \\begin{pmatrix} e^{2t} & 0 \\\\ 0 & e^{3t} \\end{pmatrix}$." },
      { p: "La solution de $X' = AX$ partant de $X_0 = (x_0, y_0)$ est $X(t) = (x_0 e^{2t}, y_0 e^{3t})$ : chaque coordonnée croît à son propre taux, la valeur propre. Pour une matrice non diagonale $A = P D P^{-1}$, on calcule de même $e^{tA} = P e^{tD} P^{-1}$ après diagonalisation." },
    ] },
    { title: "Le wronskien par la formule de Liouville", steps: [
      { p: "Pour $X' = AX$ avec $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix}$, la trace vaut $\\mathrm{tr}\\, A = 1 + 3 = 4$. La formule de Liouville donne $W'(t) = 4\\, W(t)$." },
      { p: "Donc $W(t) = W(0)\\, e^{4t}$ : en choisissant une matrice fondamentale avec $W(0) = 1$, on a $W(t) = e^{4t}$, jamais nul. Les deux solutions de base restent indépendantes à tout instant — sans avoir eu à les calculer. La trace seule pilote le volume." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que vaut $e^{tA}$ quand $A$ est la matrice nulle ? Et quand $A = \\lambda I$ ?", solution: "Si $A = 0$, tous les termes de la série après le premier s'annulent : $e^{tA} = I$ (le système $X' = 0$ a des solutions constantes). Si $A = \\lambda I$, alors $A^k = \\lambda^k I$ et $e^{tA} = \\sum_k \\frac{(\\lambda t)^k}{k!} I = e^{\\lambda t} I$ : chaque coordonnée est multipliée par le même facteur $e^{\\lambda t}$." },
    { tier: "warmup", prompt: "Calcule $e^{tN}$ pour la matrice nilpotente $N = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$.", solution: "On a $N^2 = 0$, donc la série s'arrête au terme linéaire : $e^{tN} = I + tN = \\begin{pmatrix} 1 & t \\\\ 0 & 1 \\end{pmatrix}$. Le flot d'une matrice nilpotente est **polynomial** en $t$, pas exponentiel : c'est la signature des valeurs propres nulles (ici la seule valeur propre est $0$, double)." },
    { tier: "application", prompt: "Résous $X' = AX$ pour $A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ avec $X(0) = (1, 0)$.", solution: "Comme vu, $e^{tA}$ est la rotation d'angle $t$ : $e^{tA} = \\begin{pmatrix} \\cos t & -\\sin t \\\\ \\sin t & \\cos t \\end{pmatrix}$. La solution est $X(t) = e^{tA}(1, 0)^\\top = (\\cos t, \\sin t)$ : le point part de $(1, 0)$ et parcourt le cercle unité à vitesse angulaire $1$. C'est exactement l'oscillateur harmonique." },
    { tier: "challenge", prompt: "Pour $A$ constante, démontre la propriété de groupe $e^{(s + t)A} = e^{sA}\\, e^{tA}$ en utilisant l'unicité du problème de Cauchy.", solution: "Fixe $s$ et considère les deux fonctions de $t$ : $\\Phi_1(t) = e^{(s + t)A}$ et $\\Phi_2(t) = e^{tA}\\, e^{sA}$. Chacune est une fonction matricielle dérivable. On a $\\Phi_1'(t) = A\\, e^{(s+t)A} = A\\, \\Phi_1(t)$ (en dérivant la série), et $\\Phi_2'(t) = A\\, e^{tA}\\, e^{sA} = A\\, \\Phi_2(t)$ : les deux vérifient la **même** équation $Y' = AY$. De plus $\\Phi_1(0) = e^{sA} = \\Phi_2(0)$ : même condition initiale. Le théorème de Cauchy–Lipschitz (le système linéaire est globalement lipschitzien) garantit l'**unicité** de la solution, donc $\\Phi_1 = \\Phi_2$ pour tout $t$ : $e^{(s+t)A} = e^{tA} e^{sA} = e^{sA} e^{tA}$ (les deux facteurs commutent, étant des polynômes en $A$) ■." },
    { tier: "exam", prompt: "(1) Définis l'exponentielle d'une matrice et justifie sa convergence. (2) Montre que $X(t) = e^{tA} X_0$ résout $X' = AX$, $X(0) = X_0$. (3) Comment calcule-t-on $e^{tA}$ quand $A$ est diagonalisable ? (4) Énonce la formule de Liouville pour le wronskien.", solution: "(1) $e^{A} = \\sum_{k \\ge 0} \\frac{A^k}{k!}$. La série converge **absolument** car $\\left\\| \\frac{A^k}{k!} \\right\\| \\le \\frac{\\|A\\|^k}{k!}$ (norme sous-multiplicative), et $\\sum_k \\frac{\\|A\\|^k}{k!} = e^{\\|A\\|} < \\infty$. L'espace $M_n(\\mathbb{R})$ étant complet, la série converge.\n\n(2) En dérivant terme à terme $e^{tA} = \\sum_k \\frac{t^k A^k}{k!}$ : $\\frac{d}{dt} e^{tA} = \\sum_{k \\ge 1} \\frac{t^{k-1} A^k}{(k-1)!} = A \\sum_{j \\ge 0} \\frac{t^j A^j}{j!} = A\\, e^{tA}$. Donc $X(t) = e^{tA} X_0$ vérifie $X' = AX$, et $X(0) = e^{0} X_0 = X_0$.\n\n(3) Si $A = P D P^{-1}$ avec $D = \\mathrm{diag}(\\lambda_i)$, alors $A^k = P D^k P^{-1}$, d'où $e^{tA} = P\\, e^{tD}\\, P^{-1}$ avec $e^{tD} = \\mathrm{diag}(e^{\\lambda_i t})$. On exponentie sur la diagonale.\n\n(4) $W(t) = \\det \\Phi(t)$ vérifie $W'(t) = \\mathrm{tr}(A(t))\\, W(t)$, donc $W(t) = W(t_0)\\, \\exp\\!\\left( \\int_{t_0}^t \\mathrm{tr}\\, A(s)\\, ds \\right)$ : le wronskien est gouverné par la seule trace ■." },
  ],
  practice: [
    { tier: "discovery", label: "Taux de croissance du wronskien", make: (r) => {
      const a = randint(r, 1, 5), d = randint(r, 1, 5);
      const b = randint(r, 0, 4), c = randint(r, 0, 4);
      return { prompt: `Pour le système $X' = AX$ avec $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$, la formule de Liouville donne $W' = (\\mathrm{tr}\\, A)\\, W$. Que vaut $\\mathrm{tr}\\, A$ ?`, answer: a + d, solution: `La trace est la somme des coefficients diagonaux : $\\mathrm{tr}\\, A = ${a} + ${d} = ${a + d}$. C'est le taux de croissance exponentielle du wronskien.` };
    } },
    { tier: "warmup", label: "Dimension de l'espace des solutions", make: (r) => {
      const n = randint(r, 2, 6);
      return { prompt: `Combien de solutions linéairement indépendantes possède un système différentiel linéaire homogène $X' = AX$ avec $X(t) \\in \\mathbb{R}^{${n}}$ ?`, answer: n, solution: `L'espace des solutions d'un système linéaire homogène d'ordre $1$ en dimension $${n}$ est de dimension $${n}$ : une matrice fondamentale a $${n}$ colonnes indépendantes.` };
    } },
    { tier: "application", label: "Wronskien à un instant", make: (r) => {
      const a = randint(r, 1, 4), d = randint(r, 1, 4), b = randint(r, 0, 3);
      const T = randint(r, 1, 4);
      const tr = a + d;
      return { prompt: `Un système $X' = AX$ a pour matrice $A = \\begin{pmatrix} ${a} & ${b} \\\\ 0 & ${d} \\end{pmatrix}$ et un wronskien $W(0) = 1$. Que vaut $\\ln W(${T})$ ?`, answer: T * tr, solution: `Liouville donne $W(t) = e^{t\\, \\mathrm{tr}\\, A}$ avec $W(0) = 1$, donc $\\ln W(${T}) = ${T} \\times \\mathrm{tr}\\, A = ${T} \\times ${tr} = ${T * tr}$.` };
    } },
  ],
};

export default [sousVarietesLagrange, edoLineairesResolvante];
