// Fields "Logic / Analysis" — BACHELOR module (l3 year), licence de
// mathématiques. L3 canon, bounded by the agrégation externe 2026 syllabus
// (sections 8.1, 10.1) and the standard Sorbonne LU3MA programme:
// (1) Countability and Cantor — equipotence, countable sets (Z, N^2 by the
// zigzag, Q), Cantor's diagonal argument (R uncountable, proof required),
// Cantor's general theorem E < P(E), algebraic numbers countable hence
// transcendental numbers exist in bulk. Echoes Turing's halting argument.
// (2) Metric spaces and completeness — distance axioms, examples, Cauchy
// sequences, complete spaces (R^n; C([a,b]) with the sup norm), Banach
// fixed-point theorem (full proof required — the geometric series of
// steps), Banach spaces, absolutely convergent series converge in a
// Banach space.
// (3) Measure theory — sigma-algebras (same structure as L2 probability),
// Borel sets, positive measures, Lebesgue measure on R (construction
// ADMITTED per the agreg syllabus; characterised by length of intervals
// and translation invariance), negligible sets (Q is null; the triadic
// Cantor set is null yet uncountable), measurable functions (stable under
// pointwise limits). Non-measurable sets exist (Vitali, stated only).
// Singapore method at university level: Concrete = Hilbert's hotel, the
// calculator iterating cos, covering Q by intervals of total length eps;
// Pictorial = the zigzag and THE diagonal, the contracting spiral, the
// triadic Cantor set; Abstract = syllabus-exact statements. Big ideas
// named; exam = colle-style; practice = numeric answers.
import { randint, pick } from "../../core/exercises.js";

// — Countability and Cantor (agreg: ensembles, cardinaux) —
const denombrabiliteCantor = {
  id: "logic.bachelor.denombrabilite-cantor",
  level: "bachelor", domain: "logic",
  title: "L'infini de Cantor : compter l'incomptable",
  tagline: "Deux ensembles infinis peuvent ne pas avoir la même taille — et une diagonale le prouve.",
  prereqs: ["logic.bachelor.raisonnement-ensembles", "analysis.bachelor.reels-suites"],
  intuition:
    "Compter un ensemble fini, c'est le mettre en bijection avec $\\{1, \\ldots, n\\}$. Compter un ensemble infini ? Même idée : une **bijection** avec $\\mathbb{N}$ — on dit dénombrable.\n\nLa question vertigineuse : tous les infinis se valent-ils ? Cantor répond **non** — et sa preuve tient sur une diagonale.",
  depths: {
    discovery:
      "**Avec les mains** : l'hôtel de Hilbert — une infinité de chambres numérotées, toutes occupées. Un client arrive : impossible ? Non — chaque occupant décale d'une chambre ($n \\to n + 1$), la chambre $1$ se libère. Un car **infini** de clients arrive : chaque occupant double son numéro ($n \\to 2n$), toutes les chambres impaires se libèrent — l'infini absorbe l'infini. Range $\\mathbb{Z}$ dans l'hôtel : $0, 1, -1, 2, -2, 3, -3, \\ldots$ — une bijection explicite avec $\\mathbb{N}$ : $\\mathbb{Z}$ est **dénombrable**, alors qu'il semblait « deux fois plus gros ».",
    standard:
      "**En image**, deux dessins fondateurs. Le **zigzag** : range les couples $(i, j)$ de $\\mathbb{N}^2$ dans un tableau infini et parcours-le par diagonales montantes — chaque case reçoit un numéro : $\\mathbb{N}^2$ est dénombrable, et $\\mathbb{Q}$ suit (chaque rationnel est un couple numérateur-dénominateur). La **diagonale** : suppose les réels de $[0, 1]$ tous listés, $x_1, x_2, x_3, \\ldots$, écrits en décimales ; construis $x$ en changeant la $n$-ième décimale de $x_n$ (par exemple $+1$, et $9 \\to 0$) — $x$ diffère de **chaque** $x_n$ à la place $n$ : il n'est dans aucune ligne de la liste. Contradiction : aucune liste ne contient tous les réels — $\\mathbb{R}$ n'est **pas** dénombrable. Le premier dessin range, le second déborde : il y a au moins deux infinis.",
    advanced:
      "**Dans la tête** : deux ensembles sont **équipotents** s'il existe une bijection entre eux (big idea *Equivalence* : « même taille » est une relation d'équivalence entre ensembles, et les cardinaux en sont les classes). Dénombrable : équipotent à $\\mathbb{N}$. Stabilité : un produit **fini** de dénombrables est dénombrable (zigzag itéré), une union **dénombrable** de dénombrables aussi (zigzag encore — numérote les ensembles en lignes, leurs éléments en colonnes). $\\mathbb{Z}$, $\\mathbb{N}^2$, $\\mathbb{Q}$ : dénombrables ; $\\mathbb{R}$ : non (démonstration diagonale, exigible). Le théorème **général** de Cantor : aucun ensemble $E$ n'est équipotent à $\\mathcal{P}(E)$ — pour toute $f : E \\to \\mathcal{P}(E)$, la partie $A = \\{x \\in E : x \\notin f(x)\\}$ n'est l'image de personne (si $A = f(a)$ : $a \\in A \\iff a \\notin A$, absurde) — la diagonale, abstraite et nue. Conséquence : une **échelle infinie** d'infinis, $\\mathbb{N} < \\mathcal{P}(\\mathbb{N}) < \\mathcal{P}(\\mathcal{P}(\\mathbb{N})) < \\cdots$",
  },
  keyIdea: "Même taille $=$ **bijection** (*Equivalence*). Dénombrable : en bijection avec $\\mathbb{N}$ — stable par produit fini et union dénombrable (le zigzag). $\\mathbb{R}$ ne l'est **pas** : la diagonale fabrique un réel absent de toute liste. Théorème de Cantor : $E$ n'est jamais équipotent à $\\mathcal{P}(E)$ — l'échelle des infinis ne s'arrête pas.",
  why:
    "C'est l'argument fondateur de l'informatique théorique : les programmes sont des textes finis sur un alphabet fini — **dénombrables** ; les fonctions de $\\mathbb{N}$ dans $\\{0, 1\\}$ sont équipotentes à $\\mathcal{P}(\\mathbb{N})$ — **non dénombrables** : il existe donc des fonctions qu'aucun programme ne calcule, en masse. Et la preuve de Turing sur le problème de l'arrêt EST une diagonale de Cantor déguisée — le programme qui demande « est-ce que je m'arrête ? » et fait le contraire. La diagonale revient partout : théorème de Gödel, paradoxe de Russell, hiérarchies de complexité.",
  examples: [
    { title: "L'hôtel absorbe un car infini", steps: [
      { p: "Occupants : $n \\to 2n$ — les chambres impaires se libèrent, infinies." },
      { p: "Moralité : ajouter un infini dénombrable ne grossit pas l'infini dénombrable." },
    ] },
    { title: "La diagonale en deux lignes", steps: [
      { p: "Liste supposée des réels : change la $n$-ième décimale du $n$-ième réel." },
      { p: "Le nombre construit diffère de chacun — la liste était incomplète, toujours." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Construis une bijection explicite de $\\mathbb{N}$ sur $\\mathbb{Z}$ (donne la formule dans les deux sens), et vérifie-la sur les six premières valeurs.", solution: "Alterne les signes : $f(0) = 0$, $f(2k) = -k$ pour $k \\geq 1$, $f(2k - 1) = k$ — la liste $0, 1, -1, 2, -2, 3, \\ldots$ Réciproque : $g(m) = 2m - 1$ si $m > 0$, $g(m) = -2m$ si $m \\leq 0$. Vérification : $f(0), \\ldots, f(5) = 0, 1, -1, 2, -2, 3$ ✓ et $g$ les renvoie bien sur $0, \\ldots, 5$ ✓. Tout entier relatif a exactement un numéro : $\\mathbb{Z}$ est dénombrable — l'infini « double » n'est pas plus gros." },
    { tier: "warmup", prompt: "Le zigzag : numérote les couples $(i, j) \\in \\mathbb{N}^2$ par diagonales $i + j = 0, 1, 2, \\ldots$ Donne les sept premiers couples de l'énumération, puis déduis-en que $\\mathbb{Q}$ est dénombrable.", solution: "Diagonale $0$ : $(0,0)$ ; diagonale $1$ : $(0,1), (1,0)$ ; diagonale $2$ : $(0,2), (1,1), (2,0)$ ; début de la $3$ : $(0,3)$ — soit $(0,0), (0,1), (1,0), (0,2), (1,1), (2,0), (0,3)$. Chaque diagonale est finie : tout couple reçoit un numéro fini — $\\mathbb{N}^2$ est dénombrable ■. Pour $\\mathbb{Q}$ : l'application $(p, q) \\mapsto \\frac{p}{q}$ (couples d'entiers, $q \\geq 1$) est **surjective** depuis un ensemble dénombrable — quitte à sauter les doublons dans l'énumération, $\\mathbb{Q}$ est dénombrable : les fractions, pourtant denses dans $\\mathbb{R}$, se comptent." },
    { tier: "application", prompt: "Montre qu'une union dénombrable d'ensembles dénombrables est dénombrable. Indication : le zigzag, encore.", solution: "Soit $(A_n)$ une suite d'ensembles dénombrables : énumère $A_n = \\{a_{n,0}, a_{n,1}, a_{n,2}, \\ldots\\}$ — un tableau infini dont la ligne $n$ liste $A_n$. Le zigzag par diagonales $n + j$ constant parcourt **toutes** les cases : tout élément de l'union est atteint par un numéro fini, donc l'union est (au plus) dénombrable — quitte à sauter les répétitions ■. C'est exactement la stabilité qui rendra les tribus maniables : la dénombrabilité passe aux unions dénombrables, et c'est elle que la mesure exigera." },
    { tier: "challenge", prompt: "Théorème de Cantor (cas général) : montre qu'aucune application $f : E \\to \\mathcal{P}(E)$ n'est surjective. Indication : considère $A = \\{x \\in E : x \\notin f(x)\\}$.", solution: "Suppose $A = f(a)$ pour un certain $a \\in E$. Deux cas : si $a \\in A$, alors par définition de $A$, $a \\notin f(a) = A$ — contradiction ; si $a \\notin A$, alors $a \\notin f(a)$, donc par définition $a \\in A$ — contradiction encore. Donc $A$ n'a pas d'antécédent : $f$ n'est pas surjective ■. C'est la diagonale **abstraite** : $A$ est construit pour différer de $f(x)$ « à la place $x$ » — exactement comme le réel diagonal différait du $n$-ième réel à la $n$-ième décimale. Conséquence : $\\mathcal{P}(\\mathbb{N})$ est strictement plus gros que $\\mathbb{N}$, et l'échelle $E < \\mathcal{P}(E) < \\mathcal{P}(\\mathcal{P}(E)) < \\cdots$ ne s'arrête jamais." },
    { tier: "exam", prompt: "Les nombres algébriques (racines de polynômes à coefficients entiers). (1) Montre que l'ensemble des polynômes à coefficients entiers est dénombrable. (2) Déduis-en que les nombres algébriques forment un ensemble dénombrable. (3) Conclus qu'il existe des nombres transcendants — et même que « presque tous » les réels le sont, en un sens à préciser. (4) Que dit cette preuve d'étrange : a-t-on exhibé un seul transcendant ?", solution: "(1) Un polynôme de degré $n$ à coefficients entiers est un $(n+1)$-uplet d'entiers : pour chaque $n$, l'ensemble $\\mathbb{Z}^{n+1}$ est dénombrable (produit fini) ; l'ensemble de tous les polynômes est l'union dénombrable sur $n$ : dénombrable ■. (2) Chaque polynôme non nul a un nombre **fini** de racines (au plus son degré) : les algébriques sont une union dénombrable d'ensembles finis — dénombrable ■. (3) Si tous les réels étaient algébriques, $\\mathbb{R}$ serait dénombrable : faux par la diagonale. Donc les transcendants existent — et leur ensemble est non dénombrable (sinon $\\mathbb{R}$, union de deux dénombrables, le serait) : au sens des cardinaux, les transcendants sont l'écrasante majorité ■. (4) Non — pas un seul ! La preuve est **non constructive** : elle démontre l'existence en masse par comparaison de tailles, sans exhiber d'exemple. Exhiber $e$ ou $\\pi$ transcendants a demandé un siècle de plus (Hermite 1873, Lindemann 1882) — compter est parfois plus facile que montrer." },
  ],
  practice: [
    { tier: "warmup", label: "L'hôtel se décale", make: (r) => {
      const n = randint(r, 3, 20); const k = randint(r, 2, 5);
      return { prompt: `Un car de $${k}$ clients arrive à l'hôtel de Hilbert : chaque occupant passe de la chambre $n$ à la chambre $n + ${k}$. Où va l'occupant de la chambre $${n}$ ?`, answer: n + k, solution: `Chambre $${n} + ${k} = ${n + k}$ — et les chambres $1$ à $${k}$ se libèrent pour les nouveaux : l'infini absorbe les arrivées finies sans broncher.` };
    } },
    { tier: "warmup", label: "Le numéro du zigzag", make: (r) => {
      const i = randint(r, 0, 3); const j = randint(r, 0, 3); const d = i + j;
      const num = (d * (d + 1)) / 2 + i;
      return { prompt: `Zigzag par diagonales (numérotation depuis $0$, chaque diagonale lue par $i$ croissant) : quel numéro reçoit le couple $(${i}, ${j})$ ?`, answer: num, solution: `Les diagonales $0, \\ldots, ${d - 1 >= 0 ? d - 1 : 0}$ contiennent $1 + 2 + \\cdots + ${d}$ $= \\frac{${d}(${d}+1)}{2} = ${(d * (d + 1)) / 2}$ couples ; dans la diagonale $${d}$, le couple $(${i}, ${j})$ est en position $${i}$ : numéro $${(d * (d + 1)) / 2} + ${i} = ${num}$.` };
    } },
    { tier: "application", label: "Dénombrable ou pas", make: (r) => {
      const k = pick(r, [["\\mathbb{Q}", 1, "le zigzag des fractions le range"], ["\\mathbb{R}", 0, "la diagonale de Cantor l'interdit"], ["\\mathbb{Z}", 1, "l'alternance $0, 1, -1, 2, -2, \\ldots$ le range"], ["[0, 1]", 0, "la diagonale s'applique déjà à lui"], ["\\mathbb{N}^2", 1, "le zigzag par diagonales le range"], ["\\mathcal{P}(\\mathbb{N})", 0, "le théorème de Cantor l'interdit"]]);
      return { prompt: `L'ensemble $${k[0]}$ est-il dénombrable ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] === 1 ? "Oui" : "Non"} — ${k[2]}.` };
    } },
    { tier: "challenge", label: "Le chiffre diagonal", make: (r) => {
      const c = randint(r, 0, 9); const nc = (c + 1) % 10;
      return { prompt: `Règle diagonale : on remplace chaque chiffre $c$ par $c + 1$ (et $9$ par $0$). La $n$-ième décimale du $n$-ième réel listé vaut $${c}$ : quelle décimale écrit-on pour le nombre diagonal ?`, answer: nc, solution: `$${c} \\to ${nc}$ — le nombre construit diffère du $n$-ième réel à la place $n$ : il échappe à toute la liste, c'est le cœur de l'argument.` };
    } },
  ],
};

// — Metric spaces, completeness, fixed point (agreg 8.1, 8.2) —
const metriquesCompletude = {
  id: "analysis.bachelor.metriques-completude",
  level: "bachelor", domain: "analysis",
  title: "Espaces métriques : Cauchy, complétude, point fixe",
  tagline: "Une distance suffit — et dans un espace sans trous, toute suite qui se resserre converge.",
  prereqs: ["analysis.bachelor.normes-topologie", "analysis.bachelor.compacite-connexite"],
  intuition:
    "Ta norme de L2 exigeait un espace vectoriel. Mais une sphère, un graphe, un ensemble de mots n'en sont pas — et on veut quand même y parler de proximité : il suffit d'une **distance**.\n\nEt une question laissée ouverte : une suite dont les termes se **resserrent** indéfiniment converge-t-elle toujours ? Dans $\\mathbb{Q}$, non — $1 ; 1{,}4 ; 1{,}41 ; \\ldots$ se resserre vers un trou. Les espaces sans trous ont un nom : **complets**.",
  depths: {
    discovery:
      "**Avec les mains** : prends une calculatrice en radians et tape $\\cos$ en boucle depuis n'importe quel point de départ — les affichages se stabilisent vers $0{,}739\\ldots$ : le **point fixe** de $\\cos$ ($x$ tel que $\\cos x = x$). Pourquoi ça converge ? Sur $[0, 1]$, la pente de $\\cos$ est au plus $\\sin 1 \\approx 0{,}84 < 1$ : chaque itération **contracte** les distances d'un facteur $k < 1$ — deux points de départ différents se rapprochent à chaque appui sur la touche. La machine fait une démonstration.",
    standard:
      "**En image** : dessine les itérés $x_0, x_1 = f(x_0), x_2 = f(x_1), \\ldots$ d'une contraction — la **spirale** qui se resserre : le pas $d(x_{n+1}, x_n)$ est au plus $k$ fois le précédent, donc au plus $k^n d(x_1, x_0)$ — une suite géométrique de pas. La distance entre $x_n$ et $x_{n+p}$ est majorée par la **somme des pas restants** : queue de série géométrique, qui tend vers $0$ — la suite est de **Cauchy**. Et là, deux mondes : dans $\\mathbb{Q}$, une suite de Cauchy peut viser un trou ($\\sqrt{2}$ n'y est pas) ; dans un espace **complet**, elle converge — et la limite, par continuité de $f$, vérifie $f(\\ell) = \\ell$ : le point fixe existe. Le dessin de la spirale porte toute la preuve.",
    advanced:
      "**Dans la tête** : une **distance** sur $E$ : séparation ($d(x,y) = 0 \\iff x = y$), symétrie, inégalité triangulaire — exemples : la distance induite par une norme, la distance **discrète** ($1$ si différents), $d(f, g) = \\sup |f - g|$ sur les fonctions bornées. Suite de **Cauchy** : $d(x_p, x_q) \\to 0$ quand $p, q \\to \\infty$ — toute suite convergente l'est ; la réciproque définit la **complétude**. Complets : $\\mathbb{R}$, $\\mathbb{R}^n$, et $\\mathcal{C}([a,b])$ pour la norme sup (une suite de Cauchy uniforme converge uniformément, et la limite uniforme de continues est continue) ; non complet : $\\mathbb{Q}$. **Théorème du point fixe de Banach** (démonstration exigible) : $f : E \\to E$ contractante ($d(f(x), f(y)) \\leq k\\, d(x, y)$, $k < 1$) sur un espace complet a un **unique** point fixe, limite des itérés depuis n'importe quel départ — existence par la spirale ci-dessus, unicité car deux points fixes seraient à distance $\\leq k$ fois elle-même. Un espace de **Banach** : un espace vectoriel normé complet — et dans un Banach, toute série **absolument convergente** converge (les sommes partielles sont de Cauchy : la queue de $\\sum \\|u_n\\|$ les contrôle). Big idea *Proportionality* : la contraction réduit chaque pas d'un pourcentage fixe — et la série géométrique fait le reste.",
  },
  keyIdea: "Distance : séparation, symétrie, triangle. Cauchy : les termes se resserrent ; **complet** : toute Cauchy converge — $\\mathbb{R}^n$ et $\\mathcal{C}([a,b], \\|\\cdot\\|_\\infty)$ le sont, $\\mathbb{Q}$ non. **Point fixe de Banach** : une contraction d'un complet a un unique point fixe, limite des itérés — les pas forment une série géométrique (*Proportionality*). Banach $=$ evn complet : l'absolue convergence y implique la convergence.",
  why:
    "Le point fixe de Banach est le théorème le plus rentable de la licence : c'est lui qui démontrera **Cauchy-Lipschitz** (les solutions d'équations différentielles existent — méthode de Picard), lui qui fonde la méthode de Newton et les schémas itératifs du calcul numérique, lui que Google a utilisé pour PageRank (le classement du web est le point fixe d'une contraction sur les distributions), lui qui fait converger la compression fractale d'images. Et la complétude est la raison d'être de $\\mathbb{R}$ : on l'a construit exprès pour boucher les trous de $\\mathbb{Q}$.",
  examples: [
    { title: "La calculatrice qui démontre", steps: [
      { p: "$\\cos$ itéré converge vers $0{,}739\\ldots$ : pente $\\leq \\sin 1 < 1$, contraction." },
      { p: "Unique point fixe, atteint depuis tout départ — Banach sur $[0, 1]$ complet." },
    ] },
    { title: "Le trou de $\\mathbb{Q}$", steps: [
      { p: "$1 ; 1{,}4 ; 1{,}41 ; 1{,}414 ; \\ldots$ : de Cauchy dans $\\mathbb{Q}$, mais la cible $\\sqrt{2}$ manque." },
      { p: "$\\mathbb{Q}$ n'est pas complet — $\\mathbb{R}$ est précisément son bouchage de trous." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Vérifie que $d(x, y) = \\dfrac{|x - y|}{1 + |x - y|}$ est une distance sur $\\mathbb{R}$. Qu'a-t-elle de remarquable ? (Indication pour le triangle : la fonction $t \\mapsto \\frac{t}{1 + t}$ est croissante sur $\\mathbb{R}_+$.)", solution: "Séparation et symétrie : immédiates ($d(x,y) = 0 \\iff |x - y| = 0$). Triangle : $|x - z| \\leq |x - y| + |y - z|$ et la croissance de $t \\mapsto \\frac{t}{1+t}$ donnent $d(x,z) \\leq \\frac{|x-y| + |y-z|}{1 + |x-y| + |y-z|} = \\frac{|x-y|}{1 + |x-y| + |y-z|} + \\frac{|y-z|}{1 + |x-y| + |y-z|} \\leq d(x,y) + d(y,z)$ ✓. Remarquable : elle est **bornée** par $1$ — deux points peuvent être « à distance presque $1$ » mais jamais plus : une distance n'a pas besoin de ressembler à une norme, et le lointain peut être écrasé sans changer les limites (mêmes suites convergentes que $|x - y|$)." },
    { tier: "warmup", prompt: "Montre que $\\mathbb{Q}$ n'est pas complet : exhibe une suite de rationnels, de Cauchy, sans limite dans $\\mathbb{Q}$ — et justifie chacun des trois points.", solution: "Prends $x_n$ $=$ la troncature à $n$ décimales de $\\sqrt{2}$ : $1 ; 1{,}4 ; 1{,}41 ; \\ldots$ — rationnels ✓ (décimaux). De Cauchy : pour $p, q \\geq n$, $|x_p - x_q| \\leq 10^{-n} \\to 0$ ✓. Sans limite rationnelle : dans $\\mathbb{R}$, $x_n \\to \\sqrt{2}$ (encadrement $|x_n - \\sqrt{2}| \\leq 10^{-n}$) ; si une limite rationnelle $\\ell$ existait dans $\\mathbb{Q}$, l'unicité de la limite dans $\\mathbb{R}$ forcerait $\\ell = \\sqrt{2}$, irrationnel — contradiction ✓ ■. La suite se resserre vers un **trou** : c'est exactement le défaut que la complétude interdit." },
    { tier: "application", prompt: "Complétude de $\\mathcal{C}([0, 1])$ pour $\\|\\cdot\\|_\\infty$ : soit $(f_n)$ de Cauchy uniforme. Construis la limite candidate, montre la convergence uniforme vers elle, puis sa continuité.", solution: "(1) Pour chaque $x$ fixé, $|f_p(x) - f_q(x)| \\leq \\|f_p - f_q\\|_\\infty$ : la suite réelle $(f_n(x))$ est de Cauchy dans $\\mathbb{R}$ **complet** — elle converge ; nomme $f(x)$ sa limite. (2) Uniformité : pour $\\varepsilon$, prends $N$ tel que $\\|f_p - f_q\\|_\\infty \\leq \\varepsilon$ dès $p, q \\geq N$ ; fais $q \\to \\infty$ à $x$ fixé : $|f_p(x) - f(x)| \\leq \\varepsilon$ pour tout $x$ — donc $\\|f_p - f\\|_\\infty \\leq \\varepsilon$ : convergence **uniforme** ✓. (3) La limite uniforme d'une suite de fonctions continues est continue (ton théorème de L2) : $f \\in \\mathcal{C}([0,1])$ ■. Trois étages : la complétude de $\\mathbb{R}$ fournit le candidat, le passage à la limite dans Cauchy donne l'uniformité, le théorème de continuité conclut — ce schéma se rejoue dans toutes les preuves de complétude.", },
    { tier: "challenge", prompt: "Démontre le théorème du point fixe de Banach : $E$ complet, $f : E \\to E$ avec $d(f(x), f(y)) \\leq k\\, d(x, y)$ et $k < 1$. Existence, unicité, et vitesse de convergence des itérés.", solution: "**Existence** : pose $x_{n+1} = f(x_n)$. Pas : $d(x_{n+1}, x_n) \\leq k\\, d(x_n, x_{n-1}) \\leq \\cdots \\leq k^n d(x_1, x_0)$. Pour $p < q$, le triangle en chaîne : $d(x_p, x_q) \\leq \\sum_{n=p}^{q-1} k^n d(x_1, x_0) \\leq \\frac{k^p}{1 - k}\\, d(x_1, x_0) \\to 0$ — la suite est de Cauchy, et $E$ est **complet** : $x_n \\to \\ell$. Une contraction est continue (lipschitzienne) : $f(\\ell) = \\lim f(x_n) = \\lim x_{n+1} = \\ell$ ✓. **Unicité** : si $f(\\ell) = \\ell$ et $f(\\ell') = \\ell'$, alors $d(\\ell, \\ell') = d(f(\\ell), f(\\ell')) \\leq k\\, d(\\ell, \\ell')$ avec $k < 1$ : force $d(\\ell, \\ell') = 0$ ■. **Vitesse** : en faisant $q \\to \\infty$ ci-dessus, $d(x_p, \\ell) \\leq \\frac{k^p}{1 - k}\\, d(x_1, x_0)$ — géométrique : chaque itération gagne un facteur $k$ de précision, et la borne se calcule **avant** de connaître $\\ell$ : c'est un théorème qui livre un algorithme avec certificat d'erreur." },
    { tier: "exam", prompt: "Sur $E = \\mathcal{C}([0, 1])$ muni de $\\|\\cdot\\|_\\infty$, on définit $T(f)(x) = 1 + \\dfrac{1}{2} \\displaystyle\\int_0^x f(t)\\, dt$. (1) Justifie que $E$ est complet et que $T$ envoie $E$ dans $E$. (2) Montre que $T$ est contractante et précise son rapport. (3) Conclus à l'existence d'une unique $f$ telle que $T(f) = f$, et traduis cette équation en équation différentielle avec condition initiale. (4) Résous, et vérifie la cohérence.", solution: "(1) $E$ complet : démonstration de l'exercice précédent (Cauchy uniforme $\\to$ limite continue). $T(f)$ est continue (primitive d'une continue, plus une constante) : $T : E \\to E$ ✓. (2) $|T(f)(x) - T(g)(x)| = \\frac{1}{2}\\left|\\int_0^x (f - g)\\right| \\leq \\frac{1}{2} \\int_0^x \\|f - g\\|_\\infty\\, dt \\leq \\frac{x}{2}\\, \\|f - g\\|_\\infty \\leq \\frac{1}{2}\\, \\|f - g\\|_\\infty$ — en passant au sup : $\\|T(f) - T(g)\\|_\\infty \\leq \\frac{1}{2} \\|f - g\\|_\\infty$ : contraction de rapport $\\frac{1}{2}$ ✓. (3) Banach : unique point fixe $f$, limite des itérés depuis n'importe quel départ ■. L'équation $f(x) = 1 + \\frac{1}{2}\\int_0^x f$ donne, en dérivant : $f' = \\frac{1}{2} f$ avec $f(0) = 1$ — une équation différentielle déguisée en point fixe. (4) $f(x) = e^{x/2}$ : $f' = \\frac{1}{2}e^{x/2} = \\frac{f}{2}$ ✓ et $f(0) = 1$ ✓ ■. C'est la méthode de **Picard** en miniature — Cauchy-Lipschitz, au chapitre suivant, ne fera que rejouer cette colle en général." },
  ],
  practice: [
    { tier: "warmup", label: "Le point fixe de l'affine", make: (r) => {
      const c = randint(r, 1, 6);
      return { prompt: `$f(x) = \\dfrac{x}{2} + ${c}$ est contractante de rapport $\\dfrac{1}{2}$ sur $\\mathbb{R}$. Quel est son point fixe ?`, answer: 2 * c, solution: `$\\ell = \\frac{\\ell}{2} + ${c} \\iff \\frac{\\ell}{2} = ${c} \\iff \\ell = ${2 * c}$ — et Banach garantit que les itérés y convergent depuis tout départ.` };
    } },
    { tier: "warmup", label: "La distance discrète", make: (r) => {
      const a = randint(r, 1, 9); const same = pick(r, [0, 1]); const b = same === 1 ? a : a + randint(r, 1, 5);
      return { prompt: `Distance discrète sur $\\mathbb{R}$ ($1$ si différents, $0$ si égaux) : que vaut $d(${a}, ${b})$ ?`, answer: a === b ? 0 : 1, solution: `${a === b ? `$${a} = ${b}$ : distance $0$` : `$${a} \\neq ${b}$ : distance $1$`} — la distance discrète ne mesure que l'égalité : toute partie y est ouverte, et les seules suites convergentes sont les suites stationnaires.` };
    } },
    { tier: "application", label: "Deux itérations", make: (r) => {
      const c = randint(r, 1, 4); const x1 = c; const x2 = x1 / 2 + c;
      return { prompt: `$f(x) = \\dfrac{x}{2} + ${c}$, départ $x_0 = 0$ : calcule $x_2 = f(f(0))$.`, answer: x2, solution: `$x_1 = f(0) = ${c}$, puis $x_2 = \\frac{${c}}{2} + ${c} = ${x2 === Math.floor(x2) ? x2 : `${c / 2 + c}`.replace(".", "{,}")}$ — chaque pas divise par $2$ la distance au point fixe $${2 * c}$.` };
    } },
    { tier: "challenge", label: "Cauchy ou pas", make: (r) => {
      const k = pick(r, [["u_n = \\frac{1}{n}", 1, "elle converge (vers $0$), donc elle est de Cauchy"], ["u_n = (-1)^n", 0, "deux valeurs d'adhérence : les termes ne se resserrent pas, $|u_{n+1} - u_n| = 2$"], ["u_n = \\sqrt{n}", 0, "$|u_{2n} - u_n| = \\sqrt{n}(\\sqrt{2} - 1) \\to \\infty$ : les termes s'écartent"], ["u_n = \\frac{(-1)^n}{n}", 1, "convergente vers $0$, donc de Cauchy"]]);
      return { prompt: `Dans $\\mathbb{R}$, la suite $${k[0]}$ est-elle de Cauchy ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] === 1 ? "Oui" : "Non"} — ${k[2]}.` };
    } },
  ],
};

// — Measure theory (agreg 10.1: tribus, mesure de Lebesgue admise) —
const theorieMesure = {
  id: "analysis.bachelor.theorie-mesure",
  level: "bachelor", domain: "analysis",
  title: "La mesure de Lebesgue : une longueur pour presque tous",
  tagline: "Étendre la longueur des intervalles aux ensembles sauvages — la σ-additivité fait la loi.",
  prereqs: ["logic.bachelor.denombrabilite-cantor", "probability.bachelor.variables-discretes"],
  intuition:
    "La longueur d'un intervalle, facile : $b - a$. Mais la longueur de $\\mathbb{Q} \\cap [0, 1]$ ? De l'ensemble de Cantor ? La longueur naïve ne répond pas.\n\nIl faut une **théorie** : quelles parties peut-on mesurer, avec quelles règles ? La réponse — tribus et σ-additivité — est exactement celle que tes probabilités de L2 utilisaient déjà.",
  depths: {
    discovery:
      "**Avec les mains** : mesure $\\mathbb{Q} \\cap [0, 1]$. Les rationnels sont **dénombrables** (ta leçon Cantor) : énumère-les $r_1, r_2, r_3, \\ldots$ et couvre $r_n$ par un intervalle de longueur $\\dfrac{\\varepsilon}{2^n}$. Longueur totale du couvrement : au plus $\\varepsilon \\sum \\frac{1}{2^n} = \\varepsilon$ — aussi petit qu'on veut. Un ensemble **dense** dans $[0, 1]$, tenu dans une longueur arbitrairement petite : sa mesure est $0$. Le choc fondateur : dense ne veut pas dire gros.",
    standard:
      "**En image** : l'ensemble triadique de **Cantor** — pars de $[0, 1]$, retire le tiers central ouvert, puis le tiers central de chacun des deux segments restants, et itère. À l'étape $n$ : $2^n$ segments de longueur $3^{-n}$, longueur totale $\\left(\\frac{2}{3}\\right)^n \\to 0$ — l'ensemble limite est **négligeable**. Et pourtant : ses points sont les réels qui s'écrivent en base $3$ sans le chiffre $1$ — les suites de $0$ et de $2$, équipotentes à $\\mathcal{P}(\\mathbb{N})$ : **non dénombrable**. Le dessin dit tout : un ensemble peut être immense en cardinal et invisible en mesure — les deux infinis se découplent.",
    advanced:
      "**Dans la tête** : une **tribu** sur $\\Omega$ — contient $\\Omega$, stable par complémentaire et par union **dénombrable** (la structure exacte de tes probabilités discrètes : ce n'était pas un décor, c'était la mesure qui arrivait). La tribu **borélienne** de $\\mathbb{R}$ : la plus petite contenant les ouverts. Une **mesure** : $\\mu(\\varnothing) = 0$ et σ-additivité — $\\mu\\big(\\bigsqcup A_n\\big) = \\sum \\mu(A_n)$ pour les disjoints dénombrables ; en découlent croissance, continuité croissante et décroissante (sur mesure finie), sous-additivité. La mesure de **Lebesgue** $\\lambda$ : son existence est **admise** (la construction est hors programme) — on retient sa carte d'identité : $\\lambda([a, b]) = b - a$ et l'invariance par translation. Tout dénombrable est **négligeable** ($\\lambda$-nul) ; « presque partout » signifie : hors d'un négligeable. Il existe des parties **non mesurables** (Vitali — énoncé culturel : l'axiome du choix les fabrique, on ne peut pas mesurer tout le monde). Enfin les fonctions **mesurables** (image réciproque des boréliens dans la tribu) : stables par somme, produit, et surtout par **limite simple** — ce que la continuité ne savait pas faire, et c'est ce gain qui rendra l'intégrale de Lebesgue robuste. Big idea *Measures* : élargir au maximum ce qu'on sait mesurer, sans casser les règles.",
  },
  keyIdea: "Tribu : stable par complémentaire et union **dénombrable** — la structure de tes probas. Mesure : σ-additivité sur les disjoints. **Lebesgue** (existence admise) : prolonge la longueur, invariante par translation. Dénombrable $\\Rightarrow$ négligeable — et Cantor est négligeable **sans** être dénombrable (*Measures* : cardinal et mesure se découplent). Les mesurables sont stables par limite simple : le superpouvoir qui manquait à la continuité.",
  why:
    "C'est le socle de l'intégrale qui vient — et des probabilités continues : une variable uniforme sur $[0, 1]$ vérifie $P(X = x) = 0$ pour **tout** $x$ et pourtant $P(X \\in [a, b]) = b - a$ ; seul le langage des mesures dit cela sans contradiction (la σ-additivité ne s'applique qu'au dénombrable — les singletons ne se somment pas en un continu). « Presque partout » deviendra l'air que respirent le signal, les EDP et l'apprentissage : deux fonctions égales presque partout sont le même objet de $L^2$, et personne n'entend la différence.",
  examples: [
    { title: "Dense mais nul", steps: [
      { p: "$\\mathbb{Q} \\cap [0,1]$ couvert par des intervalles de longueurs $\\frac{\\varepsilon}{2^n}$ : total $\\leq \\varepsilon$." },
      { p: "Mesure nulle — la densité ne pèse rien : compter et mesurer sont deux métiers." },
    ] },
    { title: "Cantor, immense et invisible", steps: [
      { p: "Étape $n$ : longueur $\\left(\\frac{2}{3}\\right)^n \\to 0$ — négligeable." },
      { p: "Base $3$ sans chiffre $1$ : autant de points que $\\mathcal{P}(\\mathbb{N})$ — non dénombrable." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Rédige la preuve : tout ensemble dénombrable $A = \\{a_1, a_2, \\ldots\\} \\subset \\mathbb{R}$ est de mesure de Lebesgue nulle.", solution: "Soit $\\varepsilon > 0$. Couvre $a_n$ par l'intervalle ouvert $I_n$ de centre $a_n$ et de longueur $\\frac{\\varepsilon}{2^n}$ : alors $A \\subset \\bigcup I_n$ et, par sous-additivité puis série géométrique, $\\lambda(A) \\leq \\sum_n \\lambda(I_n) = \\sum_n \\frac{\\varepsilon}{2^n} = \\varepsilon$. Vrai pour tout $\\varepsilon > 0$ : $\\lambda(A) = 0$ ■. La σ-additivité (ici sa conséquence, la sous-additivité **dénombrable**) est le seul moteur — et c'est elle qui exige des tribus stables par unions dénombrables, pas plus, pas moins." },
    { tier: "warmup", prompt: "(1) Vérifie que $\\mathcal{T} = \\{\\varnothing, A, A^c, \\Omega\\}$ est une tribu sur $\\Omega$ (pour $A$ fixé). (2) Montre qu'une intersection quelconque de tribus est une tribu — et explique pourquoi cela donne un sens à « la plus petite tribu contenant les ouverts ».", solution: "(1) $\\Omega \\in \\mathcal{T}$ ✓ ; complémentaires : $\\varnothing \\leftrightarrow \\Omega$, $A \\leftrightarrow A^c$ ✓ ; unions : toute union d'éléments de $\\mathcal{T}$ retombe dans $\\mathcal{T}$ (cas par cas : $A \\cup A^c = \\Omega$, etc.) ✓ — c'est la tribu engendrée par l'événement $A$, la plus petite qui « sache » répondre à la question « $A$ ou pas ». (2) Si $(\\mathcal{T}_i)$ sont des tribus, leur intersection contient $\\Omega$, est stable par complémentaire et union dénombrable (chaque opération se vérifie dans **chaque** $\\mathcal{T}_i$) ■. Donc l'intersection de **toutes** les tribus contenant les ouverts est une tribu contenant les ouverts, et la plus petite : la tribu **borélienne** est bien définie — par le haut, sans construction explicite." },
    { tier: "application", prompt: "(1) Montre qu'un intervalle ouvert non vide n'est jamais négligeable. (2) Déduis-en qu'un ouvert non vide de $\\mathbb{R}$ n'est jamais négligeable, et que « négligeable » implique « d'intérieur vide ». La réciproque est-elle vraie ?", solution: "(1) Un intervalle ouvert non vide contient un segment $[a, b]$ avec $a < b$ : par croissance de la mesure, sa mesure est au moins $b - a > 0$ ✓. (2) Un ouvert non vide contient un intervalle ouvert non vide : mesure $> 0$ ■. Contraposée : si $\\lambda(A) = 0$, alors $A$ ne contient aucun intervalle ouvert — son intérieur est vide ■. Réciproque **fausse** : l'irrationnel $[0,1] \\setminus \\mathbb{Q}$ est d'intérieur vide (les rationnels sont denses) mais de mesure $1$ (complémentaire d'un négligeable dans $[0,1]$) — petit topologiquement, plein au sens de la mesure : encore un découplage." },
    { tier: "challenge", prompt: "L'ensemble triadique de Cantor $K$. (1) Calcule la longueur totale restante à l'étape $n$ et conclus $\\lambda(K) = 0$. (2) Montre que $K$ est exactement l'ensemble des réels de $[0,1]$ admettant une écriture en base $3$ sans le chiffre $1$, et déduis-en que $K$ n'est pas dénombrable.", solution: "(1) Chaque étape garde $\\frac{2}{3}$ de la longueur : à l'étape $n$, $2^n$ segments de longueur $3^{-n}$, total $\\left(\\frac{2}{3}\\right)^n$. $K$ est inclus dans chaque étape : $\\lambda(K) \\leq \\left(\\frac{2}{3}\\right)^n \\to 0$, donc $\\lambda(K) = 0$ ■ (continuité décroissante de la mesure sur $[0,1]$, de mesure finie ✓). (2) Retirer le tiers central, c'est interdire le chiffre $1$ en première position de l'écriture triadique ; itérer, c'est l'interdire à chaque position — $K$ correspond aux suites de chiffres dans $\\{0, 2\\}$. Ces suites sont en bijection avec les suites de $\\{0, 1\\}$ (divise les chiffres par $2$), équipotentes à $\\mathcal{P}(\\mathbb{N})$ : **non dénombrable** par le théorème de Cantor ■. Bilan : négligeable et pourtant aussi nombreux que $\\mathbb{R}$ — la mesure ne voit pas le cardinal." },
    { tier: "exam", prompt: "Portrait complet de l'ensemble de Cantor $K$ : (1) $K$ est fermé. (2) $K$ est d'intérieur vide. (3) $\\lambda(K) = 0$. (4) $K$ est non dénombrable. (5) Synthèse : en quoi $K$ casse-t-il l'intuition « petit $=$ peu de points $=$ courte longueur » ?", solution: "(1) Chaque étape $K_n$ est une union finie de segments : **fermée** ; $K = \\bigcap K_n$ est une intersection de fermés : fermé ■. (2) $K$ ne contient aucun intervalle : un intervalle de longueur $\\ell > 0$ ne survit pas à l'étape $n$ dès que $3^{-n} < \\ell$ (les segments de l'étape sont trop courts) — intérieur vide ■. (3) $\\lambda(K) \\leq \\left(\\frac{2}{3}\\right)^n \\to 0$ ■. (4) Écritures triadiques en $\\{0, 2\\}$ : équipotent à $\\mathcal{P}(\\mathbb{N})$, non dénombrable ■. (5) $K$ découple les trois tailles : **topologiquement** maigre (fermé d'intérieur vide), **métriquement** nul (mesure zéro), **cardinalement** maximal (autant de points que $\\mathbb{R}$). Les trois notions de « petit » sont indépendantes — et toute l'analyse moderne vit de ce découplage : un énoncé « presque partout » ignore royalement des ensembles aussi gros que $K$." },
  ],
  practice: [
    { tier: "warmup", label: "σ-additivité en acte", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 1, 5);
      return { prompt: `$A$ et $B$ disjoints, $\\lambda(A) = ${a}$ et $\\lambda(B) = ${b}$ : que vaut $\\lambda(A \\sqcup B)$ ?`, answer: a + b, solution: `Additivité sur les disjoints : $${a} + ${b} = ${a + b}$ — le cas fini de la σ-additivité.` };
    } },
    { tier: "warmup", label: "Invariance par translation", make: (r) => {
      const a = randint(r, 1, 4); const L = randint(r, 2, 7); const t = randint(r, 1, 9);
      return { prompt: `Que vaut $\\lambda\\big([${a}, ${a + L}] + ${t}\\big)$, la mesure de l'intervalle translaté de $${t}$ ?`, answer: L, solution: `La translation ne change pas la mesure : $\\lambda = ${a + L} - ${a} = ${L}$, avant comme après — c'est l'un des deux traits de la carte d'identité de Lebesgue.` };
    } },
    { tier: "application", label: "Négligeable ou pas", make: (r) => {
      const k = pick(r, [["\\mathbb{Q}", 1, "dénombrable, donc couvert par une longueur arbitrairement petite"], ["[0, 1]", 0, "sa mesure vaut $1$"], ["\\mathbb{Z}", 1, "dénombrable"], ["l'ensemble de Cantor", 1, "mesure $\\left(\\frac{2}{3}\\right)^n \\to 0$ — sans être dénombrable !"], ["]0, 1[", 0, "un ouvert non vide a une mesure strictement positive"], ["\\{42\\}", 1, "un singleton est de mesure nulle"]]);
      return { prompt: `Dans $\\mathbb{R}$ : $${k[0]}$ est-il négligeable ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] === 1 ? "Oui" : "Non"} — ${k[2]}.` };
    } },
    { tier: "challenge", label: "Les segments de Cantor", make: (r) => {
      const n = randint(r, 1, 5);
      return { prompt: `Construction de Cantor, étape $${n}$ : combien de segments restent ?`, answer: 2 ** n, solution: `Chaque étape double le nombre de segments : $2^{${n}} = ${2 ** n}$ segments, chacun de longueur $3^{-${n}}$ — longueur totale $\\left(\\frac{2}{3}\\right)^{${n}}$, qui fond vers $0$.` };
    } },
  ],
};

export default [denombrabiliteCantor, metriquesCompletude, theorieMesure];
