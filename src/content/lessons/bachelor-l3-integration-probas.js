// Fields "Analysis / Probability" — BACHELOR module (l3 year), licence de
// mathématiques. L3 canon, bounded by the agrégation externe 2026 syllabus
// (section 10, "mesure et intégration"; section 6 tail for probability)
// and the standard Sorbonne LU3MA measure-theory track:
// (1) Lebesgue integral — simple functions, integral of nonnegative
// measurable functions by sup, linearity, monotone convergence (Beppo
// Levi, proof ideas), Fatou, dominated convergence (measure version),
// almost-everywhere language, comparison with Riemann: Riemann-integrable
// implies Lebesgue with same value; absolutely convergent improper
// integrals agree; sin(t)/t is the classic semi-convergent NON-example.
// (2) Lp spaces — Lp as a quotient by a.e. equality, Hölder and Minkowski
// inequalities, Riesz-Fischer (Lp is complete — proof sketch via
// absolutely convergent series, tying back to metriques-completude),
// inclusions on finite measure spaces (L-infinity in L2 in L1), the
// power-function scale x^(-alpha) as the universal test family, density
// of continuous functions (stated).
// (3) Probability with densities — Kolmogorov axioms as a measure of total
// mass 1, random variables as measurable maps, law as pushforward,
// densities, cumulative distribution function, expectation as a Lebesgue
// integral + transfer formula, uniform / exponential (memoryless) /
// Gaussian laws.
// Singapore method at university level: Concrete = integrating the
// Dirichlet function, one triangular signal measured three ways, the
// machine's random() as a uniform variable; Pictorial = slicing
// horizontally vs vertically (Lebesgue's coins), nested Lp boxes on
// [0,1], the bell curve and its cumulative S-curve; Abstract =
// syllabus-exact statements. Big ideas named; exam = colle-style;
// practice = numeric answers.
import { randint, pick } from "../../core/exercises.js";

// — The Lebesgue integral —
const integraleLebesgue = {
  id: "analysis.bachelor.integrale-lebesgue",
  level: "bachelor", domain: "analysis",
  title: "L'intégrale de Lebesgue : trancher autrement",
  tagline: "Découper les valeurs au lieu des abscisses — et les théorèmes de convergence deviennent naturels.",
  prereqs: ["analysis.bachelor.theorie-mesure", "analysis.bachelor.convergence-dominee"],
  intuition:
    "Riemann découpe l'axe des $x$ : des rectangles debout, côte à côte. Ça marche pour les fonctions sages — et ça casse dès que la fonction oscille trop.\n\nLebesgue retourne le couteau : découper l'axe des $y$ — pour chaque valeur, mesurer **combien de temps** la fonction la prend. Là où Riemann demandait de la régularité, Lebesgue ne demande que de la mesurabilité — et les passages à la limite deviennent des théorèmes au lieu d'être des batailles.",
  depths: {
    discovery:
      "**Avec les mains** : intègre la fonction de **Dirichlet** — $f = 1$ sur les rationnels de $[0, 1]$, $0$ ailleurs. Riemann d'abord : sur n'importe quel petit intervalle, il y a des rationnels (sup $= 1$) et des irrationnels (inf $= 0$) — sommes de Darboux supérieures $= 1$, inférieures $= 0$ : elles ne se rejoindront **jamais**, $f$ n'est pas Riemann-intégrable. Lebesgue maintenant : $f$ vaut $1$ sur un ensemble de mesure nulle ($\\mathbb{Q}$ est dénombrable, ton chapitre mesure) et $0$ ailleurs — intégrale $= 1 \\times 0 + 0 \\times 1 = 0$. Une ligne. La fonction n'a pas changé : le **couteau** a changé.",
    standard:
      "**En image** : la monnaie de Lebesgue. Pour compter une poignée de pièces, Riemann les prend **dans l'ordre** où elles viennent (de gauche à droite sur l'axe des $x$, valeur après valeur) ; Lebesgue les **trie par valeur** — toutes les pièces de $1$ ensemble, toutes celles de $2$ ensemble — puis multiplie valeur $\\times$ quantité. Dessine-le sur un graphe : Riemann hachure en tranches **verticales** ; Lebesgue hachure en tranches **horizontales** — pour chaque bande de valeurs $[y, y + dy]$, il mesure l'ensemble $\\{f \\geq y\\}$ au sol. Même aire, mais le tri par valeur ne demande à $f$ que d'avoir des ensembles de niveau **mesurables** — c'est toute la différence.",
    advanced:
      "**Dans la tête** : la construction monte en trois marches (big idea *Measures* : intégrer, c'est mesurer pondéré). (1) Fonctions **étagées** positives $\\sum a_i \\mathbf{1}_{A_i}$ : intégrale $= \\sum a_i\\, \\mu(A_i)$ — la définition évidente. (2) $f$ mesurable positive : $\\int f = \\sup$ des intégrales des étagées sous $f$ — et le théorème de **convergence monotone** (Beppo Levi) verrouille la cohérence : $f_n \\nearrow f \\Rightarrow \\int f_n \\to \\int f$, sans aucune hypothèse de domination. (3) $f$ de signe quelconque : $f = f^+ - f^-$, intégrable quand $\\int |f| < \\infty$. Les outils suivent : lemme de **Fatou** ($\\int \\liminf \\leq \\liminf \\int$), **convergence dominée** — ta version L2 était le cas particulier, voici l'énoncé natif. Le langage **presque partout** : deux fonctions égales hors d'un négligeable ont la même intégrale — l'intégrale ne voit pas les ensembles de mesure nulle. Et la **comparaison** : Riemann-intégrable sur un segment $\\Rightarrow$ Lebesgue-intégrable, mêmes valeurs ; les intégrales généralisées **absolument** convergentes coïncident aussi — mais $\\int_0^{+\\infty} \\frac{\\sin t}{t}\\, dt$, semi-convergente, n'est PAS une intégrale de Lebesgue ($\\int \\frac{|\\sin t|}{t} = +\\infty$) : Lebesgue intègre $|f|$ ou rien.",
  },
  keyIdea: "Trancher les **valeurs**, pas les abscisses : étagées, puis sup pour les mesurables positives, puis $f^+ - f^-$ (*Measures*). Convergence **monotone** : $f_n \\nearrow f \\Rightarrow \\int f_n \\to \\int f$, gratuit. Fatou, puis convergence dominée — version native. Le **presque partout** : l'intégrale ignore les négligeables (Dirichlet vaut $0$). Riemann $\\Rightarrow$ Lebesgue avec la même valeur ; semi-convergent $\\neq$ Lebesgue : on intègre $|f|$ ou rien.",
  why:
    "C'est l'intégrale des probabilités (l'espérance en est une, chapitre suivant), du signal (les espaces $L^2$ de Fourier n'existent qu'avec elle) et de toute l'analyse moderne : la complétude des $L^p$ — impossible avec Riemann — repose sur ses théorèmes de convergence. La philosophie est profonde : en acceptant d'ignorer les ensembles négligeables, on gagne des théorèmes de passage à la limite robustes — l'analyste échange une précision illusoire (la valeur en CHAQUE point) contre une puissance réelle (la convergence). Tout le machine learning probabiliste calcule des $\\int f\\, d\\mu$ au sens de Lebesgue sans le dire.",
  examples: [
    { title: "Dirichlet, réglé en une ligne", steps: [
      { p: "$\\mathbb{Q} \\cap [0,1]$ est de mesure nulle : $\\int f = 1 \\times 0 + 0 \\times 1 = 0$." },
      { p: "Riemann ne convergeait jamais (Darboux $0$ contre $1$) : le tri par valeurs a réglé le cas." },
    ] },
    { title: "La convergence monotone au travail", steps: [
      { p: "$f_n = \\mathbf{1}_{[0, n]} \\cdot e^{-x} \\nearrow e^{-x}$ : Beppo Levi donne $\\int_0^n e^{-x} \\to \\int_0^{+\\infty} e^{-x} = 1$." },
      { p: "Aucune domination à chercher : la croissance suffit — c'est le théorème des positives." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La fonction de Dirichlet $f = \\mathbf{1}_{\\mathbb{Q} \\cap [0,1]}$. (1) Montre que toute somme de Darboux supérieure vaut $1$ et toute inférieure vaut $0$. (2) Donne son intégrale de Lebesgue. (3) Quelle propriété de $\\mathbb{Q}$ chaque approche utilise-t-elle ?", solution: "(1) Sur tout sous-intervalle non trivial, la **densité** de $\\mathbb{Q}$ place un rationnel ($\\sup f = 1$) et celle des irrationnels un irrationnel ($\\inf f = 0$) : sommes supérieures $= 1$, inférieures $= 0$ — l'écart ne se referme jamais, $f$ n'est pas Riemann-intégrable. (2) $f = \\mathbf{1}_A$ avec $\\mu(A) = 0$ ($\\mathbb{Q}$ dénombrable) : $\\int f\\, d\\mu = \\mu(A) = 0$ ■. (3) Riemann bute sur la **densité** (propriété topologique : ils sont partout) ; Lebesgue exploite la **dénombrabilité** (propriété de mesure : ils ne pèsent rien). Même ensemble, deux lunettes — et la mesure voit ce que la topologie cache." },
    { tier: "warmup", prompt: "Calcule l'intégrale de l'étagée $f = 3 \\cdot \\mathbf{1}_{[0, 2]} + 5 \\cdot \\mathbf{1}_{[1, 4]}$ (pour la mesure de Lebesgue), de deux façons : par linéarité, puis en réécrivant $f$ avec des indicatrices disjointes.", solution: "Linéarité : $3\\, \\mu([0,2]) + 5\\, \\mu([1,4]) = 3 \\times 2 + 5 \\times 3 = 21$. Disjoint : $f = 3$ sur $[0, 1[$, $8$ sur $[1, 2]$, $5$ sur $]2, 4]$ — intégrale $3 \\times 1 + 8 \\times 1 + 5 \\times 2 = 21$ ✓. Les deux écritures coïncident : c'est la cohérence de la définition sur les étagées — l'intégrale ne dépend pas de la décomposition choisie, premier lemme (non spectaculaire mais indispensable) de toute la construction." },
    { tier: "application", prompt: "Par convergence monotone, calcule $\\lim_n \\int_0^1 \\frac{n x^{n}}{1 + x}\\, dx$… non — plus instructif : montre que $\\int_0^1 \\frac{dx}{\\sqrt{x}} = 2$ au sens de Lebesgue, en utilisant $f_n = \\frac{1}{\\sqrt{x}} \\mathbf{1}_{[1/n, 1]}$ et Beppo Levi.", solution: "Les $f_n$ sont mesurables positives et croissent vers $f(x) = \\frac{1}{\\sqrt{x}}$ sur $]0, 1]$ (le seuil $\\frac{1}{n}$ descend). Chaque $\\int f_n = \\int_{1/n}^1 x^{-1/2} dx = [2\\sqrt{x}]_{1/n}^1 = 2 - \\frac{2}{\\sqrt{n}}$ — un calcul de Riemann ordinaire. Beppo Levi : $\\int f = \\lim \\int f_n = 2$ ■. La fonction **explose** en $0$ mais reste intégrable : la singularité est intégrable au sens de Riemann généralisé ET de Lebesgue, et les valeurs coïncident — la convergence monotone est l'outil qui recolle les deux théories sur les positives." },
    { tier: "challenge", prompt: "Montre que $t \\mapsto \\frac{\\sin t}{t}$ n'est PAS Lebesgue-intégrable sur $[1, +\\infty[$, en minorant $\\int_{k\\pi}^{(k+1)\\pi} \\frac{|\\sin t|}{t}\\, dt$. Quelle est la morale vis-à-vis de l'intégrale généralisée ?", solution: "Sur $[k\\pi, (k+1)\\pi]$ : $t \\leq (k+1)\\pi$, donc $\\frac{|\\sin t|}{t} \\geq \\frac{|\\sin t|}{(k+1)\\pi}$, et $\\int_{k\\pi}^{(k+1)\\pi} |\\sin t|\\, dt = 2$ : chaque arche pèse au moins $\\frac{2}{(k+1)\\pi}$. Sommer : $\\int_\\pi^{N\\pi} \\frac{|\\sin t|}{t} \\geq \\frac{2}{\\pi} \\sum_{k=2}^{N} \\frac{1}{k} \\to +\\infty$ (série harmonique) ■. Morale : $\\int_0^{+\\infty} \\frac{\\sin t}{t}\\, dt$ existe comme **limite** ($= \\frac{\\pi}{2}$, semi-convergence par compensation des signes), mais Lebesgue exige $\\int |f| < \\infty$ : pour lui, cette intégrale **n'existe pas**. Lebesgue est plus puissant sur les limites, plus exigeant sur les signes — les deux théories ne se contiennent pas l'une l'autre." },
    { tier: "exam", prompt: "Énumère $\\mathbb{Q} \\cap [0,1] = \\{r_1, r_2, \\ldots\\}$ et pose $f_n = \\mathbf{1}_{\\{r_1, \\ldots, r_n\\}}$. (1) Montre que chaque $f_n$ est Riemann-intégrable d'intégrale nulle. (2) Montre que $f_n \\nearrow$ la fonction de Dirichlet $f$. (3) Que donne le théorème de convergence monotone ? (4) Pourquoi ce raisonnement prouve-t-il que la classe des fonctions Riemann-intégrables n'est PAS stable par limite simple croissante — et en quoi Lebesgue répare-t-il ce défaut ?", solution: "(1) $f_n$ est nulle sauf en $n$ points : ses sommes de Darboux inférieures valent $0$, et les supérieures tendent vers $0$ (encadrer chaque point par un intervalle de longueur $\\frac{\\varepsilon}{n}$) — Riemann-intégrable, $\\int f_n = 0$ ✓. (2) Croissance claire (on ajoute des points) et pour tout $x$ : si $x = r_k$, alors $f_n(x) = 1$ dès $n \\geq k$ ; si $x$ irrationnel, $f_n(x) = 0$ toujours — convergence simple vers $f = \\mathbf{1}_{\\mathbb{Q} \\cap [0,1]}$ ✓. (3) Beppo Levi : $\\int f\\, d\\mu = \\lim \\int f_n\\, d\\mu = 0$ — cohérent avec le calcul direct. (4) La limite simple croissante de fonctions Riemann-intégrables ($f$) n'est **pas** Riemann-intégrable : la classe de Riemann fuit par les limites — c'est son vice structurel, celui qui empêchait les théorèmes de convergence propres. La classe de Lebesgue est **stable** (les mesurables le sont par limite simple, ton chapitre mesure) et la convergence monotone y est un théorème : l'intégrale de Lebesgue n'est pas une généralisation gratuite, c'est la **fermeture** de Riemann sous les limites — la réparation exacte du défaut ■." },
  ],
  practice: [
    { tier: "warmup", label: "Intégrer une étagée", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const l1 = randint(r, 1, 3); const l2 = randint(r, 1, 3);
      return { prompt: `$f = ${a} \\cdot \\mathbf{1}_{[0, ${l1}]} + ${b} \\cdot \\mathbf{1}_{[${l1}, ${l1 + l2}]}$ : calcule $\\int f\\, d\\mu$.`, answer: a * l1 + b * l2, solution: `Valeur $\\times$ mesure : $${a} \\times ${l1} + ${b} \\times ${l2} = ${a * l1 + b * l2}$ — la définition sur les étagées.` };
    } },
    { tier: "warmup", label: "Le presque-partout efface", make: (r) => {
      const c = randint(r, 2, 6);
      return { prompt: `$f = ${c}$ sur $[0, 1]$ sauf sur $\\mathbb{Q}$ où $f = 100$ : que vaut $\\int_0^1 f\\, d\\mu$ ?`, answer: c, solution: `$f = ${c}$ presque partout ($\\mathbb{Q}$ est négligeable) : $\\int f = ${c} \\times 1 = ${c}$ — l'intégrale ne voit pas les négligeables.` };
    } },
    { tier: "application", label: "Beppo Levi calcule", make: (r) => {
      const a = randint(r, 1, 4);
      return { prompt: `$f_n = e^{-${a}x} \\mathbf{1}_{[0, n]} \\nearrow e^{-${a}x}$ sur $[0, +\\infty[$ : que vaut $\\lim \\int f_n$, multiplié par $${a}$ ?`, answer: 1, solution: `Convergence monotone : $\\lim \\int f_n = \\int_0^{+\\infty} e^{-${a}x} dx = \\frac{1}{${a}}$ — multiplié par $${a}$ : $1$.` };
    } },
    { tier: "application", label: "Riemann contre Lebesgue", make: (r) => {
      const k = pick(r, [["\\mathbf{1}_{\\mathbb{Q} \\cap [0,1]} \\text{ (Dirichlet)}", 0], ["x^2 \\text{ sur } [0,1] \\text{ (continue)}", 1], ["\\frac{\\sin t}{t} \\text{ sur } [1, +\\infty[ \\text{ (semi-convergente)}", 0], ["e^{-x} \\text{ sur } [0, +\\infty[ \\text{ (positive intégrable)}", 1]]);
      return { prompt: `$f = ${k[0]}$ : Riemann (éventuellement généralisé absolument) et Lebesgue donnent-ils le même verdict d'intégrabilité ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] ? "Les deux théories coïncident sur ce cas : Riemann absolu $\\Rightarrow$ Lebesgue, mêmes valeurs (1)" : "Désaccord : l'une des deux théories rejette cette fonction — Dirichlet échappe à Riemann, le semi-convergent échappe à Lebesgue (0)"}.` };
    } },
    { tier: "challenge", label: "La singularité intégrable", make: (r) => {
      const k = pick(r, [[0.5, 1], [2, 0], [0.25, 1], [1, 0], [3, 0]]);
      return { prompt: `$x^{-${k[0]}}$ est-elle Lebesgue-intégrable sur $]0, 1]$ ? (1 oui, 0 non)`, answer: k[1], solution: `Critère de Riemann en $0$ : intégrable $\\iff$ exposant $< 1$ — ici $${k[0]} ${k[1] ? "< 1$ : oui (1), Beppo Levi recolle les seuils" : "\\geq 1$ : non (0), la masse près de zéro diverge"}.` };
    } },
  ],
};

// — Lp spaces —
const espacesLp = {
  id: "analysis.bachelor.espaces-lp",
  level: "bachelor", domain: "analysis",
  title: "Les espaces Lp : des fonctions complètes",
  tagline: "Hölder, Minkowski, Riesz-Fischer — les espaces de fonctions deviennent des Banach.",
  prereqs: ["analysis.bachelor.integrale-lebesgue", "analysis.bachelor.metriques-completude"],
  intuition:
    "En L2, les normes fonctionnelles $\\|f\\|_1$, $\\|f\\|_2$, $\\|f\\|_\\infty$ t'ont montré la dimension infinie — mais sur les fonctions continues, ces espaces ont un vice caché : ils ne sont **pas complets** (sauf pour la norme infinie). Des suites de Cauchy sans limite : l'analyse y boite.\n\nL'intégrale de Lebesgue répare tout : les espaces $L^p$ — fonctions mesurables avec $\\int |f|^p < \\infty$ — sont **complets**. Le théorème de Riesz-Fischer est la récompense de tout le chapitre précédent.",
  depths: {
    discovery:
      "**Avec les mains** : la famille-test universelle, $f_\\alpha(x) = x^{-\\alpha}$ sur $]0, 1]$. Pour quel $p$ est-elle dans $L^p$ ? Calcule : $\\int_0^1 x^{-\\alpha p}\\, dx$ converge $\\iff \\alpha p < 1$. Prends $\\alpha = \\frac{1}{2}$ : dans $L^1$ ($\\frac{1}{2} < 1$ ✓) mais PAS dans $L^2$ ($1 \\not< 1$ ✗) — une fonction peut avoir une aire finie et une énergie infinie. La même famille sur $[1, +\\infty[$ inverse le critère ($\\alpha p > 1$) : les exposants $p$ trient les fonctions par la **vitesse** de leurs singularités et de leurs queues.",
    standard:
      "**En image** : sur $[0, 1]$ (mesure finie), dessine les trois boîtes **emboîtées** : $L^\\infty \\subset L^2 \\subset L^1$ — être borné implique avoir une énergie finie, qui implique avoir une aire finie ; et la famille $x^{-\\alpha}$ peuple chaque couronne entre deux boîtes ($x^{-1/2}$ vit dans $L^1$ hors de $L^2$). Attention au piège que le dessin rend visible : sur $\\mathbb{R}$ tout entier (mesure **infinie**), les boîtes ne s'emboîtent plus — $\\frac{1}{1 + |x|}$ est dans $L^2(\\mathbb{R})$ mais pas dans $L^1(\\mathbb{R})$ : la queue lente passe au carré, pas en aire. Les inclusions sont un privilège de la mesure finie.",
    advanced:
      "**Dans la tête** : $L^p = \\{f \\text{ mesurable} : \\int |f|^p\\, d\\mu < \\infty\\}$, **quotienté** par l'égalité presque partout (big idea *Equivalence* : on décrète égales les fonctions que l'intégrale ne distingue pas — sans ce quotient, $\\|\\cdot\\|_p$ ne serait pas une norme, la séparation échouerait). Les deux inégalités fondatrices : **Hölder** — $\\int |fg| \\leq \\|f\\|_p \\|g\\|_q$ pour $\\frac{1}{p} + \\frac{1}{q} = 1$ (exposants conjugués ; $p = q = 2$ est Cauchy-Schwarz) — et **Minkowski** — $\\|f + g\\|_p \\leq \\|f\\|_p + \\|g\\|_p$, l'inégalité triangulaire qui fait de $\\|\\cdot\\|_p$ une norme. Le sommet : **Riesz-Fischer** — $L^p$ est **complet**, un espace de Banach. Schéma de preuve (le critère de ton chapitre complétude) : il suffit que toute série absolument convergente converge ; pour $\\sum \\|f_n\\|_p < \\infty$, la convergence monotone montre que $\\sum |f_n|$ est finie presque partout, la somme existe p.p., et la convergence dominée conclut en norme — les théorèmes de Lebesgue sont exactement les outils qu'il fallait. En prime sur la mesure finie : $L^\\infty \\subset L^2 \\subset L^1$ (Hölder contre la fonction $1$), et la **densité** des fonctions continues dans $L^p$ ($p < \\infty$, énoncé) : on approche toujours le mesurable par du continu.",
  },
  keyIdea: "$L^p$ : intégrale de $|f|^p$ finie, **quotient** par le presque-partout (*Equivalence* — sans lui, pas de séparation). **Hölder** $\\int |fg| \\leq \\|f\\|_p \\|g\\|_q$ ($\\frac{1}{p} + \\frac{1}{q} = 1$), **Minkowski** $=$ l'inégalité triangulaire. **Riesz-Fischer** : $L^p$ est complet — la preuve enchaîne convergence monotone puis dominée : Lebesgue livre la complétude. Mesure finie : $L^\\infty \\subset L^2 \\subset L^1$ ; mesure infinie : plus d'inclusions — la famille $x^{-\\alpha}$ teste tout.",
  why:
    "Les $L^p$ sont l'habitat naturel de l'analyse appliquée : $L^2$ porte le signal (l'énergie), Fourier et la mécanique quantique (les fonctions d'onde sont des éléments de $L^2$ de norme $1$) ; $L^1$ porte les probabilités (les densités) et le traitement d'image ; $L^\\infty$ porte les garanties au pire cas. La **complétude** n'est pas un luxe d'esthète : toutes les constructions par limite — séries de Fourier, solutions d'équations, espérances conditionnelles — exigent un espace où les suites de Cauchy aboutissent ; Riesz-Fischer est le certificat qui autorise l'analyse fonctionnelle à exister, et le chapitre Hilbert l'encaisse dès la page suivante.",
  examples: [
    { title: "La famille-test", steps: [
      { p: "$x^{-1/2}$ sur $]0,1]$ : $\\int x^{-1/2} = 2$ (dans $L^1$) mais $\\int x^{-1} = +\\infty$ (hors $L^2$)." },
      { p: "Les exposants trient les singularités : $x^{-\\alpha} \\in L^p(]0,1]) \\iff \\alpha p < 1$." },
    ] },
    { title: "Hölder en action", steps: [
      { p: "Sur $[0,1]$ : $\\|f\\|_1 = \\int |f| \\cdot 1 \\leq \\|f\\|_2 \\|1\\|_2 = \\|f\\|_2$ — l'inclusion $L^2 \\subset L^1$." },
      { p: "La fonction constante $1$ est l'arme secrète : Hölder contre elle donne toutes les inclusions." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour quelles valeurs de $\\alpha > 0$ la fonction $x^{-\\alpha}$ appartient-elle à $L^1(]0, 1])$ ? à $L^2(]0, 1])$ ? Donne une fonction dans $L^1 \\setminus L^2$ et explique en une phrase ce qu'elle « possède » et ce qui lui « manque ».", solution: "$\\int_0^1 x^{-\\alpha p}\\, dx < \\infty \\iff \\alpha p < 1$ (Riemann en $0$). Donc : $L^1 \\iff \\alpha < 1$ ; $L^2 \\iff \\alpha < \\frac{1}{2}$. La fonction $x^{-1/2}$ : aire finie ($\\int = 2$) mais énergie infinie ($\\int x^{-1} = +\\infty$) — elle **possède** une aire, il lui **manque** une énergie : élever au carré aggrave la singularité, et $L^2$ est plus exigeant que $L^1$ près des explosions. (Sur $[1, +\\infty[$, tout s'inverse : ce sont les **queues** que le carré améliore.)" },
    { tier: "warmup", prompt: "Démontre l'inégalité de Cauchy-Schwarz intégrale $\\big(\\int fg\\big)^2 \\leq \\int f^2 \\int g^2$ (fonctions réelles de $L^2$), par le discriminant du trinôme $t \\mapsto \\int (f + tg)^2$.", solution: "Pose $\\varphi(t) = \\int (f + tg)^2 = \\int f^2 + 2t \\int fg + t^2 \\int g^2$ : un trinôme en $t$, **positif** pour tout $t$ (intégrale d'un carré). Si $\\int g^2 = 0$ alors $g = 0$ p.p. et l'inégalité est triviale ; sinon le trinôme positif a un discriminant négatif ou nul : $4\\big(\\int fg\\big)^2 - 4 \\int f^2 \\int g^2 \\leq 0$ ■ — c'est mot pour mot la preuve de prépa sur les sommes, transportée par la linéarité et la positivité de l'intégrale : Hölder pour $p = q = 2$, le cas dont tout le chapitre Hilbert vivra." },
    { tier: "application", prompt: "Sur $[0, 1]$ : déduis de Cauchy-Schwarz que $L^2([0,1]) \\subset L^1([0,1])$ avec $\\|f\\|_1 \\leq \\|f\\|_2$. Puis montre que l'inclusion est FAUSSE sur $\\mathbb{R}$, avec $f(x) = \\frac{1}{1 + |x|}$.", solution: "Cauchy-Schwarz contre la constante $1$ : $\\|f\\|_1 = \\int_0^1 |f| \\times 1 \\leq \\big(\\int f^2\\big)^{1/2} \\big(\\int 1^2\\big)^{1/2} = \\|f\\|_2$ ■ — la mesure finie ($\\|1\\|_2 = 1$) est l'ingrédient secret. Sur $\\mathbb{R}$ : $\\int \\frac{dx}{(1+|x|)^2} = 2 < \\infty$ (dans $L^2$) mais $\\int \\frac{dx}{1+|x|} = +\\infty$ (logarithme : hors $L^1$) — la constante $1$ n'est plus de carré intégrable, Hölder n'a plus de levier, et les queues lentes séparent les espaces : les inclusions $L^p$ sont un théorème de mesure **finie**, jamais un réflexe universel." },
    { tier: "challenge", prompt: "Schéma de Riesz-Fischer : soit $(f_n)$ dans $L^1$ avec $\\sum \\|f_n\\|_1 < \\infty$. (1) Montre par convergence monotone que $g = \\sum |f_n|$ est intégrable, donc finie presque partout. (2) Conclus que $S = \\sum f_n$ est définie p.p. et que $\\int S = \\sum \\int f_n$. (3) Pourquoi est-ce exactement le critère de complétude du chapitre métrique ?", solution: "(1) Les sommes partielles $g_N = \\sum_{n \\leq N} |f_n|$ croissent vers $g$ : Beppo Levi donne $\\int g = \\lim \\int g_N = \\sum \\|f_n\\|_1 < \\infty$ — $g$ intégrable, donc $g < \\infty$ presque partout (un intégrable est fini p.p.). (2) Là où $g(x) < \\infty$, la série $\\sum f_n(x)$ converge **absolument** : $S$ est définie p.p., et $|S_N| \\leq g$ domine — convergence dominée : $\\int S = \\lim \\int S_N = \\sum \\int f_n$, et même $\\|S - S_N\\|_1 \\to 0$ (dominer $|S - S_N| \\leq 2g$) ■. (3) Ton chapitre complétude l'a montré : un espace normé est complet $\\iff$ toute série absolument convergente y converge — on vient de le vérifier pour $L^1$ : **Riesz-Fischer**. Les deux théorèmes de Lebesgue (monotone puis dominée) sont précisément les deux étages de la preuve : la complétude des $L^p$ est le dividende de la théorie de la mesure." },
    { tier: "exam", prompt: "Exposants conjugués. (1) Énonce Hölder et vérifie que $p = q = 2$ redonne Cauchy-Schwarz. (2) Pour $f \\in L^3([0,1])$ : montre que $f \\in L^2([0,1])$ et exhibe la constante (Hölder avec le bon couple). (3) Donne $\\alpha$ tel que $x^{-\\alpha} \\in L^2(]0,1]) \\setminus L^3(]0,1])$. (4) Résume : sur $[0,1]$, dans quel sens les $L^p$ s'emboîtent-ils quand $p$ croît, et quelle famille de fonctions sépare chaque étage ?", solution: "(1) $\\int |fg| \\leq \\|f\\|_p \\|g\\|_q$, $\\frac{1}{p} + \\frac{1}{q} = 1$ ; pour $p = q = 2$ : Cauchy-Schwarz ✓. (2) $\\|f\\|_2^2 = \\int |f|^2 \\times 1$ : Hölder sur le produit avec les exposants $\\frac{3}{2}$ et $3$ (conjugués : $\\frac{2}{3} + \\frac{1}{3} = 1$) — $\\int |f|^2 \\cdot 1 \\leq \\big(\\int |f|^3\\big)^{2/3} \\big(\\int 1\\big)^{1/3} = \\|f\\|_3^2$ : donc $\\|f\\|_2 \\leq \\|f\\|_3$, et $L^3 \\subset L^2$ ■. (3) Critère $\\alpha p < 1$ : il faut $\\alpha < \\frac{1}{2}$ (dans $L^2$) et $\\alpha \\geq \\frac{1}{3}$ (hors $L^3$) — $\\alpha = \\frac{2}{5}$ convient : $\\frac{2}{5} < \\frac{1}{2}$ ✓ et $\\frac{6}{5} > 1$ ✓. (4) Sur mesure finie, les espaces **décroissent** quand $p$ croît : $L^\\infty \\subset \\cdots \\subset L^3 \\subset L^2 \\subset L^1$ — plus $p$ est grand, plus la norme punit les singularités, et la famille $x^{-\\alpha}$ peuple **strictement** chaque couronne : un étage par valeur de $\\alpha$, l'échelle complète des explosions intégrables ■." },
  ],
  practice: [
    { tier: "warmup", label: "L'exposant conjugué", make: (r) => {
      const k = pick(r, [[2, 2], [3, 1.5], [4, 4 / 3], [1.5, 3]]);
      return { prompt: `Quel est l'exposant conjugué de $p = ${k[0]}$ (tel que $\\frac{1}{p} + \\frac{1}{q} = 1$) ?`, answer: k[1], solution: `$q = \\frac{p}{p - 1} = ${k[1] === 4 / 3 ? "\\frac{4}{3} \\approx 1{,}33" : k[1]}$ — et $p = 2$ est le seul exposant auto-conjugué : la racine de Cauchy-Schwarz.` };
    } },
    { tier: "warmup", label: "La famille-test en zéro", make: (r) => {
      const k = pick(r, [[0.25, 2, 1], [0.5, 2, 0], [0.4, 2, 1], [0.3, 3, 1], [0.5, 3, 0]]);
      return { prompt: `$x^{-${k[0]}}$ est-elle dans $L^{${k[1]}}(]0, 1])$ ? (1 oui, 0 non)`, answer: k[2], solution: `Critère $\\alpha p < 1$ : $${k[0]} \\times ${k[1]} = ${k[0] * k[1]}$ ${k[2] ? "< 1$ : oui (1)" : "\\geq 1$ : non (0)"} — le produit des exposants tranche.` };
    } },
    { tier: "application", label: "Hölder borne le produit", make: (r) => {
      const a = pick(r, [2, 3, 4]); const b = pick(r, [2, 5]);
      return { prompt: `$\\|f\\|_2 = ${a}$ et $\\|g\\|_2 = ${b}$ sur $[0,1]$ : quelle borne Cauchy-Schwarz donne-t-elle pour $\\int |fg|$ ?`, answer: a * b, solution: `$\\int |fg| \\leq \\|f\\|_2 \\|g\\|_2 = ${a} \\times ${b} = ${a * b}$ — Hölder avec $p = q = 2$.` };
    } },
    { tier: "application", label: "L'inclusion sur mesure finie", make: (r) => {
      const k = pick(r, [["L^2([0,1]) \\subset L^1([0,1])", 1], ["L^2(\\mathbb{R}) \\subset L^1(\\mathbb{R})", 0], ["L^3([0,1]) \\subset L^2([0,1])", 1], ["L^1([0,1]) \\subset L^2([0,1])", 0]]);
      return { prompt: `L'inclusion $${k[0]}$ est-elle vraie ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] ? "Vraie : mesure finie + Hölder contre la constante $1$, les grands exposants s'incluent dans les petits (1)" : "Fausse : soit la mesure est infinie (les queues lentes échappent), soit l'inclusion va dans le mauvais sens — $x^{-\\alpha}$ fournit le contre-exemple (0)"}.` };
    } },
    { tier: "challenge", label: "L'étage exact", make: (r) => {
      const k = pick(r, [[0.4, 2], [0.3, 3], [0.45, 2], [0.2, 5]]);
      return { prompt: `$\\alpha = ${k[0]}$ : quel est le plus grand entier $p$ avec $x^{-${k[0]}} \\in L^p(]0,1])$ ?`, answer: k[1], solution: `Il faut $${k[0]}\\, p < 1$, soit $p < ${(1 / k[0]).toFixed(2)}$ : le plus grand entier est $${k[1]}$ — chaque $\\alpha$ fixe son étage dans l'échelle des $L^p$.` };
    } },
  ],
};

// — Probability with densities —
const probabilitesDensite = {
  id: "probability.bachelor.probabilites-densite",
  level: "bachelor", domain: "probability",
  title: "Probabilités à densité : l'aléa continu",
  tagline: "La probabilité est une mesure, l'espérance une intégrale de Lebesgue — Kolmogorov unifie tout.",
  prereqs: ["analysis.bachelor.integrale-lebesgue", "probability.bachelor.variables-discretes"],
  intuition:
    "Tes probas vivaient sur des univers dénombrables : des sommes. Mais `random()` renvoie un réel de $[0, 1]$ — et la probabilité de chaque valeur **exacte** est nulle. Sommer ne sert plus à rien.\n\nLa réponse de Kolmogorov (1933) : une probabilité est une **mesure** de masse totale $1$, et l'espérance une **intégrale de Lebesgue**. Le discret et le continu deviennent deux cas du même théorème — ton chapitre d'intégration était un investissement.",
  depths: {
    discovery:
      "**Avec les mains** : prends le `random()` de ta machine — une variable $X$ uniforme sur $[0, 1]$ : $P(X \\in [a, b]) = b - a$, la probabilité **est** la longueur. Calcule trois choses : $P(X \\in [0{,}2,\\, 0{,}7]) = 0{,}5$ ; $P(X = 0{,}5) = 0$ (un point est de longueur nulle — et pourtant une valeur sort à chaque appel : « probabilité nulle » ne veut pas dire « impossible ») ; $P(X^2 < 0{,}25) = P(X < 0{,}5) = 0{,}5$. Tu viens de manipuler une mesure image sans le savoir.",
    standard:
      "**En image** : la **densité** $f$ est la courbe dont l'**aire** fait la probabilité — $P(a \\leq X \\leq b) = \\int_a^b f(t)\\, dt$, l'aire sous la courbe entre $a$ et $b$ ; aire totale $= 1$. Et la **fonction de répartition** $F(x) = P(X \\leq x)$ est l'aire **cumulée** depuis la gauche : une courbe en S qui monte de $0$ à $1$, dont la pente est la densité ($F' = f$ aux points de continuité). Dessine la cloche gaussienne et son S : les deux graphes disent la même loi — la cloche montre **où** la masse se concentre, le S montre les **quantiles** (la médiane est l'abscisse où le S coupe $\\frac{1}{2}$).",
    advanced:
      "**Dans la tête** : un espace probabilisé est un espace mesuré $(\\Omega, \\mathcal{A}, P)$ avec $P(\\Omega) = 1$ — les axiomes de Kolmogorov SONT les axiomes d'une mesure (big idea *Measures* : la probabilité est une mesure de masse un, point final). Une **variable aléatoire** est une fonction mesurable $X : \\Omega \\to \\mathbb{R}$ ; sa **loi** est la mesure image $P_X(A) = P(X \\in A)$. Elle est à **densité** quand $P_X(A) = \\int_A f$ avec $f \\geq 0$, $\\int f = 1$. L'**espérance** est l'intégrale de Lebesgue $E(X) = \\int_\\Omega X\\, dP$, et le théorème de **transfert** la ramène sur $\\mathbb{R}$ : $E(g(X)) = \\int g(x) f(x)\\, dx$ — la formule discrète $\\sum g(n) P(X = n)$ et la formule continue sont le **même** théorème, pour deux mesures différentes. Variance : $V(X) = E(X^2) - E(X)^2$, inchangée. Les trois lois du quotidien : **uniforme** sur $[a, b]$ (densité $\\frac{1}{b-a}$, $E = \\frac{a+b}{2}$, $V = \\frac{(b-a)^2}{12}$) ; **exponentielle** $\\lambda e^{-\\lambda x}$ ($E = \\frac{1}{\\lambda}$, **sans mémoire** : $P(X > s + t \\mid X > s) = P(X > t)$ — la version continue de la géométrique) ; **gaussienne** $\\mathcal{N}(\\mu, \\sigma^2)$, densité $\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-(x-\\mu)^2 / 2\\sigma^2}$ — la cloche dont le chapitre suivant fera la reine universelle.",
  },
  keyIdea: "Kolmogorov : une probabilité est une **mesure** de masse $1$ (*Measures*), une variable aléatoire une fonction mesurable, sa loi la mesure image. Densité : $P(X \\in A) = \\int_A f$, aire totale $1$ ; répartition $F$ croissante de $0$ à $1$, $F' = f$. **Transfert** : $E(g(X)) = \\int g(x) f(x)\\, dx$ — la somme discrète et l'intégrale continue, même théorème. Trois lois : uniforme, exponentielle (**sans mémoire**), gaussienne.",
  why:
    "C'est l'unification qui rend les probabilités modernes possibles : un seul cadre pour le dé et le bruit thermique, une seule définition de l'espérance pour le discret et le continu — et les théorèmes (linéarité, transfert, inégalités) se démontrent une fois pour toutes. La loi exponentielle modélise les pannes sans usure et les temps d'attente (sa propriété sans mémoire est testée sur les durées de vie réelles : les composants électroniques la suivent, les organismes vieillissants non) ; la gaussienne est la loi des erreurs de mesure et des moyennes — le chapitre suivant démontre pourquoi elle est partout. Tes simulations Monte-Carlo reposent entièrement sur ce chapitre : `random()`, transfert, espérance.",
  examples: [
    { title: "L'uniforme et la mesure image", steps: [
      { p: "$X$ uniforme sur $[0,1]$ : $P(X^2 < \\tfrac{1}{4}) = P(X < \\tfrac{1}{2}) = \\tfrac{1}{2}$ — on remonte par l'image réciproque." },
      { p: "La loi de $X^2$ a pour répartition $F(y) = \\sqrt{y}$ sur $[0,1]$ : densité $\\frac{1}{2\\sqrt{y}}$ — non uniforme !" },
    ] },
    { title: "Le S de la répartition", steps: [
      { p: "$F$ monte de $0$ à $1$ ; la médiane est l'abscisse où $F = \\tfrac{1}{2}$, la pente est la densité." },
      { p: "Pour l'exponentielle : $F(x) = 1 - e^{-\\lambda x}$ — médiane $\\frac{\\ln 2}{\\lambda}$, plus petite que la moyenne $\\frac{1}{\\lambda}$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "$X$ uniforme sur $[0, 1]$. (1) Calcule $P(X \\in [0{,}3,\\, 0{,}8])$, $P(X = 0{,}5)$ et commente ce dernier résultat. (2) Calcule $E(X)$ et $E(X^2)$ par transfert, puis $V(X)$.", solution: "(1) $P = 0{,}8 - 0{,}3 = 0{,}5$ ; $P(X = 0{,}5) = 0$ — un singleton est de mesure nulle, mais « négligeable » n'est pas « impossible » : chaque appel de `random()` réalise un événement de probabilité nulle. La langue de la mesure distingue ce que l'intuition confond. (2) Transfert : $E(X) = \\int_0^1 x\\, dx = \\frac{1}{2}$ ; $E(X^2) = \\int_0^1 x^2 dx = \\frac{1}{3}$ ; $V(X) = \\frac{1}{3} - \\frac{1}{4} = \\frac{1}{12}$ ✓ — la formule générale $\\frac{(b-a)^2}{12}$ pour $[0,1]$." },
    { tier: "warmup", prompt: "Vérifie que $f(x) = \\lambda e^{-\\lambda x}$ sur $[0, +\\infty[$ est une densité, calcule sa fonction de répartition $F$, et lis $P(X > t)$.", solution: "Positivité claire ; masse : $\\int_0^{+\\infty} \\lambda e^{-\\lambda x} dx = [-e^{-\\lambda x}]_0^{+\\infty} = 1$ ✓. Répartition : $F(x) = \\int_0^x \\lambda e^{-\\lambda t} dt = 1 - e^{-\\lambda x}$ pour $x \\geq 0$ ($0$ avant) — le S exponentiel, qui monte vite puis sature. Queue : $P(X > t) = 1 - F(t) = e^{-\\lambda t}$ — la décroissance exponentielle de la survie, la formule qu'on lit directement dans tous les calculs de fiabilité." },
    { tier: "application", prompt: "$X$ exponentielle de paramètre $\\lambda$. Calcule $E(X)$ par une intégration par parties, puis la médiane (le $t$ tel que $F(t) = \\frac{1}{2}$). Pourquoi la médiane est-elle plus petite que la moyenne ?", solution: "IPP : $E(X) = \\int_0^{+\\infty} x\\, \\lambda e^{-\\lambda x} dx = [-x e^{-\\lambda x}]_0^{+\\infty} + \\int_0^{+\\infty} e^{-\\lambda x} dx = 0 + \\frac{1}{\\lambda}$ ■. Médiane : $1 - e^{-\\lambda t} = \\frac{1}{2} \\iff t = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0{,}69}{\\lambda} < \\frac{1}{\\lambda}$. La loi est **asymétrique** : une longue queue à droite tire la moyenne vers le haut (les rares pannes très tardives pèsent), tandis que la médiane — l'abscisse qui coupe la masse en deux — reste insensible aux extrêmes : c'est l'écart moyenne-médiane qu'on observe sur les salaires comme sur les durées de vie." },
    { tier: "challenge", prompt: "Démontre l'absence de mémoire de la loi exponentielle : $P(X > s + t \\mid X > s) = P(X > t)$ pour tous $s, t \\geq 0$. Interprète sur une panne de composant, et compare à la loi géométrique.", solution: "$P(X > s + t \\mid X > s) = \\dfrac{P(X > s + t)}{P(X > s)} = \\dfrac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(X > t)$ ■ — l'exponentielle de la somme se factorise, c'est tout le mystère. Interprétation : un composant qui a survécu $s$ heures est **statistiquement neuf** — pas d'usure, pas de rodage ; le modèle convient aux pannes accidentelles (un serveur foudroyé), pas au vieillissement (un disque qui fatigue). C'est l'analogue continu exact de la géométrique — « le dé n'a pas de mémoire » — et on démontre que ce sont les **seules** lois sans mémoire de leurs mondes respectifs : la propriété caractérise la loi." },
    { tier: "exam", prompt: "La loi du carré. $X$ est uniforme sur $[0, 1]$ et $Y = X^2$. (1) Calcule la fonction de répartition $F_Y$ de $Y$. (2) Déduis-en la densité $f_Y$, et vérifie sa masse totale. (3) Calcule $E(Y)$ de deux façons : par transfert depuis $X$, puis directement avec $f_Y$. (4) La densité $f_Y$ explose en $0$ : est-ce un problème ? Relie à ton chapitre $L^p$.", solution: "(1) Pour $y \\in [0, 1]$ : $F_Y(y) = P(X^2 \\leq y) = P(X \\leq \\sqrt{y}) = \\sqrt{y}$ — la mesure image se calcule en remontant l'événement. (2) $f_Y = F_Y' = \\frac{1}{2\\sqrt{y}}$ sur $]0, 1]$ ; masse : $\\int_0^1 \\frac{dy}{2\\sqrt{y}} = [\\sqrt{y}]_0^1 = 1$ ✓ (Beppo Levi recolle la singularité). (3) Transfert : $E(Y) = E(X^2) = \\int_0^1 x^2 dx = \\frac{1}{3}$ ; direct : $\\int_0^1 y \\cdot \\frac{1}{2\\sqrt{y}}\\, dy = \\int_0^1 \\frac{\\sqrt{y}}{2} dy = \\frac{1}{3}$ ✓ — les deux routes coïncident : c'est le théorème de transfert vérifié à la main. (4) Aucun problème : $f_Y = \\frac{1}{2} y^{-1/2}$ est ta famille-test avec $\\alpha = \\frac{1}{2}$ — intégrable ($\\alpha < 1$ : la masse est finie), mais hors $L^2$ : une densité doit vivre dans $L^1$ et n'a aucune obligation d'être bornée ni de carré intégrable. Le carré **concentre** l'uniforme près de $0$ (la moitié des valeurs de $X$ donne $Y < \\frac{1}{4}$) : l'explosion de la densité est l'image fidèle de cette concentration ■." },
  ],
  practice: [
    { tier: "warmup", label: "L'aire fait la probabilité", make: (r) => {
      const a = randint(r, 1, 4); const b = a + randint(r, 2, 5);
      return { prompt: `$X$ uniforme sur $[0, ${b}]$ : que vaut $P(X \\leq ${a})$ ? (en décimal)`, answer: a / b, solution: `Longueur relative : $\\frac{${a}}{${b}} = ${(a / b).toFixed(a / b === Math.round(a / b * 100) / 100 ? 2 : 3).replace(/0+$/, "").replace(/\\.$/, "")}$ — la probabilité uniforme est une mesure de longueur normalisée.` };
    } },
    { tier: "warmup", label: "Normaliser la densité", make: (r) => {
      const L = pick(r, [2, 4, 5, 8]);
      return { prompt: `$f = c$ constante sur $[0, ${L}]$, nulle ailleurs : quel $c$ en fait une densité ? (en décimal)`, answer: 1 / L, solution: `Masse totale $1$ : $c \\times ${L} = 1$, donc $c = \\frac{1}{${L}} = ${1 / L}$ — l'uniforme sur $[0, ${L}]$.` };
    } },
    { tier: "application", label: "L'espérance de l'uniforme", make: (r) => {
      const a = randint(r, 0, 4) * 2; const b = a + pick(r, [2, 4, 6]);
      return { prompt: `$X$ uniforme sur $[${a}, ${b}]$ : calcule $E(X)$.`, answer: (a + b) / 2, solution: `Le centre de masse du segment : $\\frac{${a} + ${b}}{2} = ${(a + b) / 2}$ — par transfert, $\\int_{${a}}^{${b}} \\frac{x}{${b - a}}\\, dx$ donne la même chose.` };
    } },
    { tier: "application", label: "La survie exponentielle", make: (r) => {
      const k = pick(r, [[1, "\\ln 2", 0.5], [2, "\\ln 2", 0.25], [1, "\\ln 4", 0.25]]);
      return { prompt: `$X$ exponentielle de paramètre $${k[0]}$ : que vaut $P(X > ${k[1]})$ ? (en décimal)`, answer: k[2], solution: `$P(X > t) = e^{-${k[0]} t} = e^{-${k[0]} ${k[1]}} = ${k[2]}$ — la queue exponentielle se lit sur les logarithmes.` };
    } },
    { tier: "challenge", label: "La variance de l'uniforme", make: (r) => {
      const b = pick(r, [6, 12]);
      return { prompt: `$X$ uniforme sur $[0, ${b}]$ : calcule $V(X) = \\frac{(b - a)^2}{12}$.`, answer: b * b / 12, solution: `$V = \\frac{${b}^2}{12} = ${b * b / 12}$ — et la formule vient de $E(X^2) - E(X)^2 = \\frac{b^2}{3} - \\frac{b^2}{4}$ : le transfert deux fois.` };
    } },
  ],
};

export default [integraleLebesgue, espacesLp, probabilitesDensite];
