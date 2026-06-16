// Fields "Analysis" & "Probability" — BACHELOR module (l2 year), licence de mathématiques.
// Official MP/MPI programme (arrêté 2021), chapters "Intégration sur un
// intervalle quelconque" (improper integrals, convergence iff bounded
// antiderivative for nonnegative f, integrability = absolute convergence,
// L¹(I), comparison o/O/~ for nonnegative functions, Riemann integrals at
// both infinity and a finite endpoint, integration of comparison relations,
// semi-convergence as a named phenomenon), "convergence dominée" section
// (dominated convergence theorem — proof OFF programme —, term-by-term
// integration in its two programme versions, integrals with a parameter:
// continuity and differentiation under the integral sign via domination on
// every segment; Γ as the flagship example) and "Variables aléatoires
// discrètes" (countability of N², Z, Q and uncountability of R — proofs not
// required —, σ-additivity, monotone continuity, sub-additivity, negligible
// and almost-sure events, conditioning and Bayes on countable spaces,
// geometric and Poisson laws, expectation via summability and transfer,
// E(XY) for independent variables, L², variance, covariance, Markov and
// Bienaymé-Tchebychev inequalities, weak law of large numbers for i.i.d.
// with finite variance). Singapore method: Concrete = the trumpet 1/x²
// computed by hand, the sliding bump, the first-heads game; Pictorial = the
// Riemann frontier α = 1, THE integrable umbrella, the infinite comb of
// masses summing to 1; Abstract = the theorems with programme-exact limits.
// Big ideas named; exam = colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Improper integrals (MP: intégration sur un intervalle quelconque, part 1) —
const integralesGeneralisees = {
  id: "analysis.bachelor.integrales-generalisees",
  level: "bachelor", domain: "analysis",
  title: "Intégrales généralisées",
  tagline: "L'aire peut être finie même quand la route est infinie.",
  prereqs: ["analysis.bachelor.integration", "analysis.bachelor.series-familles"],
  intuition:
    "En L1, l'intégrale vivait sur un segment $[a, b]$ : début, fin, aire. Mais $\\int_1^{+\\infty} \\frac{dx}{x^2}$ ? La route ne s'arrête jamais — et pourtant l'aire sous la courbe pourrait être finie, comme une somme de série peut l'être avec une infinité de termes.\n\nL'idée est la même qu'en séries : on calcule l'aire **partielle** jusqu'à $X$, puis on fait tendre $X$ vers l'infini. Si la limite existe, l'intégrale converge. Et comme pour les séries, la vraie question pratique n'est pas « combien ? » mais « converge-t-elle ? » — avec une échelle de référence pour comparer.",
  depths: {
    discovery:
      "Prends les deux trompettes jumelles : $\\frac{1}{x^2}$ et $\\frac{1}{x}$, à partir de $x = 1$. Elles se ressemblent — toutes deux décroissent vers $0$ — mais calcule les aires partielles à la main.\n\nPour $\\frac{1}{x^2}$ : $\\int_1^X \\frac{dx}{x^2} = \\left[-\\frac{1}{x}\\right]_1^X = 1 - \\frac{1}{X}$. Quand $X$ grandit, l'aire tend vers $1$ — une trompette infiniment longue, une aire **finie** d'exactement $1$.\n\nPour $\\frac{1}{x}$ : $\\int_1^X \\frac{dx}{x} = \\ln X$. Quand $X$ grandit, $\\ln X$ grandit sans fin — aire **infinie**. Deux courbes presque identiques à l'œil, deux destins opposés : tout se joue dans la vitesse de descente vers $0$. Descendre vers zéro ne suffit pas — il faut descendre assez vite.",
    standard:
      "Le dessin qui porte tout : le faisceau des courbes $\\frac{1}{x^{\\alpha}}$ sur $[1, +\\infty[$, avec la **frontière** $\\alpha = 1$. Au-dessus ($\\alpha > 1$), la courbe plonge assez vite : $\\int_1^{+\\infty} \\frac{dx}{x^{\\alpha}} = \\frac{1}{\\alpha - 1}$ converge. En dessous ($\\alpha \\leq 1$), trop lent : divergence. C'est l'exact parallèle des séries de Riemann $\\sum \\frac{1}{n^{\\alpha}}$ — même frontière, même raison.\n\nEt il y a un **miroir** : près d'une borne finie où la fonction explose, la situation s'inverse. $\\int_0^1 \\frac{dx}{x^{\\alpha}}$ converge si et seulement si $\\alpha < 1$ : la cheminée en $0$ peut être infiniment haute mais d'aire finie, pourvu qu'elle soit assez **étroite**. Au-dessus de la frontière en $+\\infty$, en dessous en $0$ — le dessin des deux faisceaux face à face est la carte de toutes les comparaisons à venir.",
    advanced:
      "Définitions propres. Pour $f$ continue par morceaux sur $[a, +\\infty[$ : l'intégrale converge si $X \\mapsto \\int_a^X f$ a une limite finie. Même jeu sur $]a, b]$ quand $f$ n'est pas définie en $a$. Premier réflexe : repérer les **faux** problèmes — si $f$ se prolonge par continuité à la borne, rien à démontrer.\n\nPour $f$ positive, la fonction $X \\mapsto \\int_a^X f$ croît : convergence si et seulement si elle est **majorée**. D'où les théorèmes de comparaison pour fonctions positives : si $f = O(g)$ ou $f \\sim g$ au voisinage de la borne, les natures se transmettent ($\\sim$ donne même nature). L'échelle de référence : Riemann aux deux bornes.\n\nDire que $f$ est **intégrable** sur $I$, c'est dire que $\\int_I |f|$ converge — et la convergence absolue implique la convergence. La réciproque est fausse : $\\int_1^{+\\infty} \\frac{\\sin t}{t}\\, dt$ converge (intégration par parties) mais $\\int_1^{+\\infty} \\frac{|\\sin t|}{t}\\, dt$ diverge — la **semi-convergence** existe aussi pour les intégrales. Enfin, les relations de comparaison s'intègrent : si $f \\sim g \\geq 0$ en $+\\infty$ avec convergence, les restes sont équivalents ; en cas de divergence, ce sont les intégrales partielles. La grande idée est celle des **mesures** : on étend la mesure d'aire au-delà du borné, et l'échelle de Riemann en est le mètre étalon.",
  },
  keyIdea:
    "La nature d'une intégrale généralisée se lit par comparaison à l'échelle de Riemann : $\\int_1^{+\\infty} \\frac{dx}{x^{\\alpha}}$ converge si et seulement si $\\alpha > 1$, et $\\int_0^1 \\frac{dx}{x^{\\alpha}}$ converge si et seulement si $\\alpha < 1$ — un équivalent à la borne suffit pour conclure.",
  why:
    "C'est la porte de l'analyse réelle moderne : la convergence dominée, la fonction $\\Gamma$, les transformées intégrales et toutes les probabilités à densité reposent sur des intégrales de ce type. Et la mécanique de comparaison — un équivalent à la borne, une échelle de référence — est exactement celle des séries : tu réinvestis tout l'arsenal asymptotique de L1.",
  examples: [
    { title: "La trompette d'aire 1", steps: [
      { p: "Étudions $\\int_1^{+\\infty} \\frac{dx}{x^2}$ par la définition : aire partielle puis limite." },
      { p: "$\\int_1^X \\frac{dx}{x^2} = \\left[-\\frac{1}{x}\\right]_1^X = 1 - \\frac{1}{X}$ — un calcul de Terminale, rien de neuf." },
      { p: "Quand $X \\to +\\infty$ : $1 - \\frac{1}{X} \\to 1$. La limite existe et vaut $1$ : l'intégrale **converge** et $\\int_1^{+\\infty} \\frac{dx}{x^2} = 1$." },
      { p: "Une région infiniment longue, d'aire exactement $1$ : l'infini en longueur n'interdit pas le fini en aire — c'est la même surprise que $\\sum \\frac{1}{2^n} = 1$ avec une infinité de termes." },
    ]},
    { title: "Le miroir en zéro", steps: [
      { p: "Étudions $\\int_0^1 \\frac{dx}{\\sqrt{x}}$ : la fonction explose en $0$, c'est là que tout se joue." },
      { p: "Aire partielle depuis $\\varepsilon > 0$ : $\\int_{\\varepsilon}^1 \\frac{dx}{\\sqrt{x}} = \\left[2\\sqrt{x}\\right]_{\\varepsilon}^1 = 2 - 2\\sqrt{\\varepsilon}$." },
      { p: "Quand $\\varepsilon \\to 0^+$ : limite $2$. L'intégrale **converge** et vaut $2$ — la cheminée infiniment haute en $0$ est assez étroite ($\\alpha = \\frac{1}{2} < 1$)." },
      { p: "Compare : $\\int_0^1 \\frac{dx}{x}$ donne $-\\ln \\varepsilon \\to +\\infty$, divergence. La frontière $\\alpha = 1$ sépare les deux mondes — dans le sens inverse de celui de $+\\infty$." },
    ]},
    { title: "Couper aux deux bornes", steps: [
      { p: "Nature de $\\int_0^{+\\infty} \\frac{dt}{\\sqrt{t}\\,(1 + t)}$ ? Deux bornes à problème : on **coupe** en deux, par exemple en $1$, et on traite chaque morceau." },
      { p: "En $0^+$ : $\\frac{1}{\\sqrt{t}\\,(1+t)} \\sim \\frac{1}{\\sqrt{t}}$ — Riemann avec $\\alpha = \\frac{1}{2} < 1$ : le morceau $\\int_0^1$ converge." },
      { p: "En $+\\infty$ : $\\frac{1}{\\sqrt{t}\\,(1+t)} \\sim \\frac{1}{t^{3/2}}$ — Riemann avec $\\alpha = \\frac{3}{2} > 1$ : le morceau $\\int_1^{+\\infty}$ converge." },
      { p: "Les deux morceaux convergent : l'intégrale converge ■. La méthode est toujours la même — couper, équivalent à chaque borne, verdict Riemann. (Et pour les curieux : elle vaut $\\pi$.)" },
    ]},
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule l'aire partielle $\\int_1^X \\frac{dx}{x^3}$, puis fais tendre $X$ vers $+\\infty$ : l'intégrale $\\int_1^{+\\infty} \\frac{dx}{x^3}$ converge-t-elle, et que vaut-elle ?", solution: "$\\int_1^X \\frac{dx}{x^3} = \\left[-\\frac{1}{2x^2}\\right]_1^X = \\frac{1}{2} - \\frac{1}{2X^2}$. Quand $X \\to +\\infty$, l'aire tend vers $\\frac{1}{2}$ : l'intégrale **converge** et vaut $\\frac{1}{2}$ — cohérent avec la formule générale $\\int_1^{+\\infty} \\frac{dx}{x^{\\alpha}} = \\frac{1}{\\alpha - 1}$ pour $\\alpha = 3$." },
    { tier: "warmup", prompt: "Par l'échelle de Riemann, donne la nature de : (a) $\\int_1^{+\\infty} \\frac{dx}{x\\sqrt{x}}$, (b) $\\int_0^1 \\frac{dx}{x^2}$, (c) $\\int_2^{+\\infty} \\frac{dx}{\\sqrt{x}}$.", solution: "(a) $\\frac{1}{x\\sqrt{x}} = \\frac{1}{x^{3/2}}$, $\\alpha = \\frac{3}{2} > 1$ en $+\\infty$ : **converge**. (b) $\\alpha = 2 \\geq 1$ en $0$ : **diverge** — la cheminée est trop large. (c) $\\alpha = \\frac{1}{2} \\leq 1$ en $+\\infty$ : **diverge** — trop lent. Trois verdicts, zéro calcul de primitive : l'échelle fait tout." },
    { tier: "application", prompt: "Nature de $\\int_1^{+\\infty} \\frac{t + 3}{t^3 + t + 1}\\, dt$ et de $\\int_0^1 \\frac{e^t}{\\sqrt{t}}\\, dt$, par équivalents aux bornes.", solution: "En $+\\infty$ : $\\frac{t + 3}{t^3 + t + 1} \\sim \\frac{t}{t^3} = \\frac{1}{t^2}$, positif, Riemann $\\alpha = 2 > 1$ : **converge**. En $0^+$ : $\\frac{e^t}{\\sqrt{t}} \\sim \\frac{1}{\\sqrt{t}}$ (car $e^t \\to 1$), positif, Riemann $\\alpha = \\frac{1}{2} < 1$ : **converge**. L'équivalent ne garde que le terme qui commande à la borne — tout le reste est du bruit." },
    { tier: "challenge", prompt: "Montre que $\\int_1^{+\\infty} \\frac{\\sin t}{t}\\, dt$ converge, puis explique pourquoi elle n'est pas absolument convergente. Comment appelle-t-on ce phénomène ?", solution: "Intégration par parties sur $[1, X]$ : $\\int_1^X \\frac{\\sin t}{t}\\, dt = \\left[\\frac{-\\cos t}{t}\\right]_1^X - \\int_1^X \\frac{\\cos t}{t^2}\\, dt$. Le crochet tend vers $\\cos 1$ (car $\\frac{\\cos X}{X} \\to 0$) et la dernière intégrale converge absolument ($\\left|\\frac{\\cos t}{t^2}\\right| \\leq \\frac{1}{t^2}$) : la limite existe, **convergence** ■. Mais sur chaque $[k\\pi, (k+1)\\pi]$, $\\int \\frac{|\\sin t|}{t}\\, dt \\geq \\frac{2}{(k+1)\\pi}$, et $\\sum \\frac{2}{(k+1)\\pi}$ diverge (harmonique) : $\\int_1^{+\\infty} \\frac{|\\sin t|}{t}\\, dt = +\\infty$. C'est la **semi-convergence** : les oscillations compensent, les valeurs absolues non — l'exact analogue de la série harmonique alternée." },
    { tier: "exam", prompt: "Colle. Pour $x \\in \\mathbb{R}$, on pose $\\Gamma(x) = \\int_0^{+\\infty} t^{x-1} e^{-t}\\, dt$. Détermine l'ensemble des $x$ pour lesquels cette intégrale converge.", solution: "Deux bornes à problème : on coupe en $1$. **Borne zéro** ($0^+$) : $t^{x-1} e^{-t} \\sim t^{x-1} = \\frac{1}{t^{1-x}}$ (car $e^{-t} \\to 1$), fonction positive — Riemann en $0$ : convergence si et seulement si $1 - x < 1$, c'est-à-dire $x > 0$. **Borne infinie** ($+\\infty$) : pour tout $x$, $t^{x-1} e^{-t} = o\\!\\left(\\frac{1}{t^2}\\right)$ car $t^{x+1} e^{-t} \\to 0$ (l'exponentielle écrase toute puissance) ; par comparaison à Riemann $\\alpha = 2$, le morceau $\\int_1^{+\\infty}$ converge **toujours**. Bilan : $\\Gamma(x)$ est définie exactement pour $x > 0$ ■. La borne infinie n'est jamais le problème — c'est la cheminée en $0$ qui impose $x > 0$. Cette fonction prolonge la factorielle : ce sera le théorème vedette de la leçon suivante." },
  ],
  practice: [
    { tier: "warmup", label: "Frontière en l'infini", make: (r) => {
      const a = pick(r, [[2, 1], [3, 1], [1, 0], [5, 1]]);
      return { prompt: `$\\int_1^{+\\infty} \\frac{dx}{x^{${a[0]}}}$ : converge (1) ou diverge (0) ?`, answer: a[1], solution: `**${a[1] ? "Converge" : "Diverge"}** — Riemann en $+\\infty$ : il faut $\\alpha > 1$, ici $\\alpha = ${a[0]}$.` };
    } },
    { tier: "warmup", label: "Frontière en zéro", make: (r) => {
      const c = pick(r, [["\\frac{1}{2}", 1], ["2", 0], ["\\frac{1}{3}", 1], ["1", 0]]);
      return { prompt: `$\\int_0^1 \\frac{dx}{x^{\\alpha}}$ avec $\\alpha = ${c[0]}$ : converge (1) ou diverge (0) ?`, answer: c[1], solution: `**${c[1] ? "Converge" : "Diverge"}** — Riemann en $0$ : il faut $\\alpha < 1$, le miroir de la borne infinie.` };
    } },
    { tier: "application", label: "L'aire exacte", make: (r) => {
      const p = randint(r, 2, 5);
      return { prompt: `$\\int_1^{+\\infty} \\frac{dx}{x^{${p + 1}}} = \\frac{1}{a}$ : que vaut $a$ ?`, answer: p, solution: `Primitive $-\\frac{1}{${p}\\,x^{${p}}}$, limite $\\frac{1}{${p}}$ — $a = ${p}$, conforme à $\\frac{1}{\\alpha - 1}$.` };
    } },
    { tier: "application", label: "Le terme qui commande", make: (r) => {
      const cas = pick(r, [["\\frac{t + 5}{t^4 + 1}", 1, "\\sim \\frac{1}{t^3}"], ["\\frac{t^2 + 1}{t^3 + t}", 0, "\\sim \\frac{1}{t}"], ["\\frac{3}{t^2 + \\sqrt{t}}", 1, "\\sim \\frac{3}{t^2}"]]);
      return { prompt: `$\\int_1^{+\\infty} ${cas[0]}\\, dt$ : converge (1) ou diverge (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Converge" : "Diverge"}** — équivalent $${cas[2]}$ en $+\\infty$, verdict Riemann.` };
    } },
    { tier: "challenge", label: "Couper en deux", make: (r) => {
      const cas = pick(r, [["\\frac{1}{\\sqrt{t}\\,(1+t^2)}", 1, "\\alpha = \\frac{1}{2} < 1 \\text{ en } 0, \\sim \\frac{1}{t^{5/2}} \\text{ en } +\\infty"], ["\\frac{1}{t\\,(1+t)}", 0, "\\sim \\frac{1}{t} \\text{ en } 0 : \\text{le morceau en } 0 \\text{ diverge}"]]);
      return { prompt: `$\\int_0^{+\\infty} ${cas[0]}\\, dt$ : converge (1) ou diverge (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Converge" : "Diverge"}** — on coupe en $1$ : $${cas[2]}$.` };
    } },
  ],
};

// — Dominated convergence and integrals with a parameter (MP: same chapter, part 2) —
const convergenceDominee = {
  id: "analysis.bachelor.convergence-dominee",
  level: "bachelor", domain: "analysis",
  title: "Convergence dominée et intégrales à paramètre",
  tagline: "Théorème de convergence dominée : sous quelle hypothèse échanger limite et intégrale.",
  prereqs: ["analysis.bachelor.integrales-generalisees", "analysis.bachelor.suites-series-fonctions"],
  intuition:
    "La question la plus naturelle du monde : si $f_n \\to f$, a-t-on $\\int f_n \\to \\int f$ ? Tu as déjà vu la réponse pour la convergence uniforme sur un segment. Mais sur un intervalle infini, l'uniforme ne suffit même plus — et exiger l'uniforme est souvent trop cher.\n\nLe théorème de convergence dominée donne un permis bien plus maniable : il suffit que toutes les $f_n$ tiennent sous un même **parapluie** intégrable. Une seule hypothèse à vérifier, et l'échange $\\lim \\int = \\int \\lim$ devient légal — c'est l'outil le plus utilisé de toute l'analyse de deuxième année.",
  depths: {
    discovery:
      "D'abord le crime, pour comprendre la loi. La **bosse glissante** : $f_n$ vaut $n$ sur $\\left]0, \\frac{1}{n}\\right]$ et $0$ ailleurs. Calcule : $\\int_0^1 f_n = n \\times \\frac{1}{n} = 1$ pour tout $n$ — la suite des intégrales est constante égale à $1$.\n\nMais fixe un $x > 0$ : dès que $n > \\frac{1}{x}$, la bosse est passée à gauche de $x$ et $f_n(x) = 0$. Donc $f_n \\to 0$ en tout point. Résultat : $\\lim \\int f_n = 1$ alors que $\\int \\lim f_n = 0$. L'échange est **faux** ici — la masse s'est échappée dans une bosse de plus en plus haute et fine. Tout le théorème consiste à interdire ce scénario.",
    standard:
      "Le dessin : un **parapluie** $\\varphi$, fonction positive intégrable fixée, et toutes les courbes $f_n$ qui restent dessous : $|f_n(t)| \\leq \\varphi(t)$ pour tout $n$ et tout $t$. Sous le parapluie, la masse ne peut pas s'échapper — ni monter en pointe infinie, ni filer vers l'infini — car l'aire totale disponible est plafonnée par $\\int \\varphi$, qui est finie.\n\nRegarde la bosse glissante avec ce dessin : pour la dominer, il faudrait $\\varphi(t) \\geq n$ sur $\\left]0, \\frac{1}{n}\\right]$ pour tout $n$, donc $\\varphi(t) \\geq \\frac{1}{2t}$ près de $0$ — et $\\int_0^1 \\frac{dt}{2t}$ diverge. La bosse **perce** tout parapluie intégrable : voilà pourquoi l'échange échouait. Le dessin du parapluie est le théorème ; le contre-exemple est la preuve qu'on ne peut pas s'en passer.",
    advanced:
      "**Théorème de convergence dominée** : si les $f_n$ sont continues par morceaux, convergent simplement vers $f$ continue par morceaux, et s'il existe $\\varphi$ intégrable sur $I$ avec $|f_n| \\leq \\varphi$ pour tout $n$, alors toutes les intégrales existent et $\\int_I f_n \\to \\int_I f$. La démonstration est hors programme — l'hypothèse de domination, elle, se vérifie à chaque usage, et c'est elle qu'on te demandera.\n\nDeux corollaires au programme. **Intégration terme à terme** : pour une série $\\sum f_n$ de fonctions intégrables convergeant simplement, si $\\sum \\int_I |f_n|$ converge, alors $\\int_I \\sum f_n = \\sum \\int_I f_n$. **Intégrales à paramètre** : pour $F(x) = \\int_I f(x, t)\\, dt$, la continuité de $F$ s'obtient en dominant $|f(x, t)| \\leq \\varphi(t)$ — et la dérivabilité en dominant $\\left|\\frac{\\partial f}{\\partial x}(x, t)\\right|$, avec $F'(x) = \\int_I \\frac{\\partial f}{\\partial x}(x, t)\\, dt$. Subtilité du programme : la domination peut n'être vérifiée que sur **tout segment** de l'intervalle des $x$ — c'est presque toujours ainsi qu'on l'applique. La vedette de tout le chapitre : $\\Gamma(x) = \\int_0^{+\\infty} t^{x-1} e^{-t}\\, dt$, de classe $\\mathcal{C}^{\\infty}$ sur $]0, +\\infty[$, qui vérifie $\\Gamma(x + 1) = x\\,\\Gamma(x)$ et prolonge la factorielle : $\\Gamma(n + 1) = n!$. La grande idée reste celle des **mesures** : une aire finie fixée d'avance verrouille toutes les aires sous elle.",
  },
  keyIdea:
    "Si $f_n \\to f$ simplement et si un même $\\varphi$ intégrable domine tous les $|f_n|$, alors $\\int f_n \\to \\int f$ — et le même principe de domination donne la continuité et la dérivation sous le signe intégrale.",
  why:
    "C'est le théorème le plus utilisé du programme : calculs de limites d'intégrales, sommes de séries par intégration terme à terme, étude de $\\Gamma$, transformées de Laplace et de Fourier plus tard. En probabilités, en physique, en théorie du signal — partout où une intégrale dépend d'un paramètre, la domination est le réflexe central.",
  examples: [
    { title: "La bosse qui perce le parapluie", steps: [
      { p: "Reprenons $f_n = n$ sur $\\left]0, \\frac{1}{n}\\right]$, $0$ ailleurs, et vérifions chaque hypothèse du théorème pour comprendre laquelle casse." },
      { p: "Convergence simple : pour $x > 0$ fixé, $f_n(x) = 0$ dès que $n > \\frac{1}{x}$ — donc $f_n \\to 0$ simplement ✓." },
      { p: "Domination : il faudrait $\\varphi$ intégrable avec $\\varphi(t) \\geq f_n(t)$ pour tout $n$. En $t \\in \\left]\\frac{1}{n+1}, \\frac{1}{n}\\right]$, on a $f_n(t) = n \\geq \\frac{1}{2t}$ : donc $\\varphi(t) \\geq \\frac{1}{2t}$, non intégrable en $0$ ✗." },
      { p: "L'hypothèse de domination est violée — et de fait $\\int f_n = 1 \\not\\to 0 = \\int \\lim f_n$. Le théorème ne se contourne pas : pas de parapluie, pas d'échange." },
    ]},
    { title: "Un échange légal", steps: [
      { p: "Calculons $\\lim_{n \\to +\\infty} \\int_0^{+\\infty} e^{-t} \\cos\\!\\left(\\frac{t}{n}\\right) dt$ — sans calculer aucune primitive." },
      { p: "Convergence simple : à $t$ fixé, $\\frac{t}{n} \\to 0$ donc $e^{-t} \\cos\\!\\left(\\frac{t}{n}\\right) \\to e^{-t}$." },
      { p: "Domination : $\\left|e^{-t} \\cos\\!\\left(\\frac{t}{n}\\right)\\right| \\leq e^{-t}$, et $\\varphi(t) = e^{-t}$ est intégrable sur $[0, +\\infty[$ — le parapluie est trouvé, indépendant de $n$ ✓." },
      { p: "Le théorème conclut : la limite vaut $\\int_0^{+\\infty} e^{-t}\\, dt = 1$ ■. Deux lignes de vérification remplacent un calcul exact impossible — c'est toute la puissance de l'outil." },
    ]},
    { title: "Gamma prolonge la factorielle", steps: [
      { p: "Pour $x > 0$, partons de $\\Gamma(x + 1) = \\int_0^{+\\infty} t^{x} e^{-t}\\, dt$ et intégrons par parties sur $[\\varepsilon, X]$ : $u = t^x$, $v' = e^{-t}$." },
      { p: "$\\int_{\\varepsilon}^X t^x e^{-t}\\, dt = \\left[-t^x e^{-t}\\right]_{\\varepsilon}^X + x \\int_{\\varepsilon}^X t^{x-1} e^{-t}\\, dt$. Le crochet tend vers $0$ aux deux bornes ($X^x e^{-X} \\to 0$ et $\\varepsilon^x \\to 0$ car $x > 0$)." },
      { p: "À la limite : $\\Gamma(x + 1) = x\\,\\Gamma(x)$ — l'équation fonctionnelle de la factorielle." },
      { p: "Avec $\\Gamma(1) = \\int_0^{+\\infty} e^{-t}\\, dt = 1$, la récurrence donne $\\Gamma(n + 1) = n!$ pour tout entier $n$ : la factorielle, définie sur les entiers, vient d'être prolongée en une fonction lisse sur tout $]0, +\\infty[$." },
    ]},
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour la bosse glissante $f_n = n$ sur $\\left]0, \\frac{1}{n}\\right]$ et $0$ ailleurs : calcule $\\int_0^1 f_n$, la limite simple de $f_n$, et constate le désaccord.", solution: "$\\int_0^1 f_n = n \\times \\frac{1}{n} = 1$ pour tout $n$. Pour $x > 0$ fixé, $f_n(x) = 0$ dès que $n > \\frac{1}{x}$, donc $f_n \\to 0$ simplement. Ainsi $\\lim \\int f_n = 1 \\neq 0 = \\int \\lim f_n$ : la masse $1$ s'est concentrée dans une bosse de plus en plus fine et haute, puis a « disparu » à la limite — c'est exactement le scénario que la domination interdit." },
    { tier: "warmup", prompt: "Calcule $\\lim_{n \\to +\\infty} \\int_0^{+\\infty} \\frac{e^{-t}}{1 + \\frac{t}{n}}\\, dt$ en citant précisément le théorème utilisé et en vérifiant ses hypothèses.", solution: "À $t$ fixé : $\\frac{e^{-t}}{1 + t/n} \\to e^{-t}$ (convergence simple). Domination : $\\left|\\frac{e^{-t}}{1 + t/n}\\right| \\leq e^{-t}$ car le dénominateur dépasse $1$, et $e^{-t}$ est intégrable sur $[0, +\\infty[$. Par **convergence dominée** : la limite vaut $\\int_0^{+\\infty} e^{-t}\\, dt = 1$ ■." },
    { tier: "application", prompt: "Montre que $F(x) = \\int_0^{+\\infty} \\frac{e^{-xt}}{1 + t^2}\\, dt$ est continue sur $[0, +\\infty[$.", solution: "$f(x, t) = \\frac{e^{-xt}}{1 + t^2}$ est continue en $x$ pour chaque $t$, et pour $x \\geq 0$ : $|f(x, t)| \\leq \\frac{1}{1 + t^2} = \\varphi(t)$, intégrable sur $[0, +\\infty[$ (Riemann $\\alpha = 2$ en $+\\infty$, pas de problème en $0$). La domination est uniforme en $x$ : par le théorème de continuité des intégrales à paramètre, $F$ est continue sur $[0, +\\infty[$ ■. Une seule majoration — le parapluie $\\frac{1}{1+t^2}$ — règle tous les $x$ d'un coup." },
    { tier: "challenge", prompt: "Justifie l'intégration terme à terme $\\int_0^1 \\frac{\\ln t}{t - 1}\\, dt = \\sum_{n=1}^{+\\infty} \\frac{1}{n^2}$, sachant $\\int_0^1 t^n (-\\ln t)\\, dt = \\frac{1}{(n+1)^2}$.", solution: "Sur $]0, 1[$ : $\\frac{\\ln t}{t - 1} = \\frac{-\\ln t}{1 - t} = \\sum_{n \\geq 0} t^n\\,(-\\ln t)$ — série géométrique, licite car $0 < t < 1$, et chaque terme $f_n(t) = t^n(-\\ln t)$ est **positif**. Alors $\\sum \\int_0^1 |f_n| = \\sum_{n \\geq 0} \\frac{1}{(n+1)^2}$ converge : le théorème d'intégration terme à terme s'applique et $\\int_0^1 \\frac{\\ln t}{t-1}\\, dt = \\sum_{n \\geq 0} \\frac{1}{(n+1)^2} = \\sum_{n \\geq 1} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$ ■ — l'intégrale de Bâle, par échange légalisé." },
    { tier: "exam", prompt: "Colle. On pose $\\Gamma(x) = \\int_0^{+\\infty} t^{x-1} e^{-t}\\, dt$ pour $x > 0$. (1) Montre que $\\Gamma$ est continue sur $]0, +\\infty[$. (2) Établis $\\Gamma(x+1) = x\\,\\Gamma(x)$ et déduis-en $\\Gamma(n+1) = n!$.", solution: "**(1)** Soit $[a, b] \\subset\\, ]0, +\\infty[$. Pour $x \\in [a, b]$ : si $t \\leq 1$, $t^{x-1} \\leq t^{a-1}$ ; si $t > 1$, $t^{x-1} \\leq t^{b-1}$. Donc $|t^{x-1} e^{-t}| \\leq \\varphi(t)$ avec $\\varphi(t) = t^{a-1} e^{-t}$ sur $]0, 1]$ et $t^{b-1} e^{-t}$ sur $]1, +\\infty[$ — intégrable (Riemann $1 - a < 1$ en $0$, croissance comparée en $+\\infty$). Domination sur **tout segment** : $\\Gamma$ est continue sur chaque $[a, b]$, donc sur $]0, +\\infty[$ ■. **(2)** Intégration par parties sur $[\\varepsilon, X]$ : $\\int_{\\varepsilon}^X t^x e^{-t} dt = \\left[-t^x e^{-t}\\right]_{\\varepsilon}^X + x \\int_{\\varepsilon}^X t^{x-1} e^{-t} dt$ ; le crochet s'évanouit aux deux bornes ($x > 0$ en $0$, croissance comparée en $+\\infty$), d'où $\\Gamma(x+1) = x\\,\\Gamma(x)$. Avec $\\Gamma(1) = 1$ : $\\Gamma(n+1) = n\\,\\Gamma(n) = \\cdots = n!\\,\\Gamma(1) = n!$ ■ — la factorielle a désormais une courbe lisse qui passe par tous ses points." },
  ],
  practice: [
    { tier: "warmup", label: "La bosse têtue", make: (r) => {
      const n = randint(r, 3, 12);
      return { prompt: `Bosse glissante : $f_{${n}} = ${n}$ sur $\\left]0, \\frac{1}{${n}}\\right]$, $0$ ailleurs. Que vaut $\\int_0^1 f_{${n}}$ ?`, answer: 1, solution: `$${n} \\times \\frac{1}{${n}} = $ **1** — pour tout $n$ : la masse ne varie pas, elle se concentre.` };
    } },
    { tier: "application", label: "Permis ou pas ?", make: (r) => {
      const cas = pick(r, [["e^{-t}\\cos\\!\\left(\\frac{t}{n}\\right)", 1, "dominée par $e^{-t}$"], ["n\\,\\mathbf{1}_{]0,\\,1/n]}(t)", 0, "la bosse perce tout parapluie intégrable"], ["\\frac{e^{-t}}{1 + \\frac{t}{n}}", 1, "dominée par $e^{-t}$"]]);
      return { prompt: `Sur $[0, +\\infty[$, la suite $f_n(t) = ${cas[0]}$ vérifie-t-elle l'hypothèse de domination (1 = oui, 0 = non) ?`, answer: cas[1], solution: `**${cas[1] ? "Oui" : "Non"}** — ${cas[2]}.` };
    } },
    { tier: "application", label: "L'échange en action", make: (r) => {
      const k = randint(r, 2, 6);
      return { prompt: `$\\lim_{n \\to +\\infty} \\int_0^{+\\infty} ${k}\\, e^{-t} \\cos\\!\\left(\\frac{t}{n}\\right) dt = $ ?`, answer: k, solution: `Domination par $${k}\\,e^{-t}$ intégrable : la limite passe sous l'intégrale, $${k} \\int_0^{+\\infty} e^{-t}\\, dt = ${k}$.` };
    } },
    { tier: "challenge", label: "Gamma aux entiers", make: (r) => {
      const n = randint(r, 3, 6);
      const fact = [1, 1, 2, 6, 24, 120, 720][n];
      return { prompt: `$\\Gamma(${n + 1}) = $ ?`, answer: fact, solution: `$\\Gamma(n+1) = n!$ : $\\Gamma(${n + 1}) = ${n}! = ${fact}$ — la factorielle prolongée.` };
    } },
    { tier: "challenge", label: "L'équation fonctionnelle", make: (r) => {
      const x = randint(r, 2, 9);
      return { prompt: `Sachant $\\Gamma(x + 1) = x\\,\\Gamma(x)$ : si $\\Gamma(a) = ${x}\\,\\Gamma(${x})$ avec $a$ entier, que vaut $a$ ?`, answer: x + 1, solution: `$\\Gamma(${x + 1}) = ${x}\\,\\Gamma(${x})$ — $a = ${x + 1}$, lecture directe de l'équation fonctionnelle.` };
    } },
  ],
};

// — Discrete random variables (MP: variables aléatoires discrètes) —
const variablesDiscretes = {
  id: "probability.bachelor.variables-discretes",
  level: "bachelor", domain: "probability",
  title: "Variables aléatoires discrètes",
  tagline: "Variables aléatoires discrètes infinies : par exemple le rang du premier pile.",
  prereqs: ["probability.bachelor.probabilites-finies", "analysis.bachelor.series-familles"],
  intuition:
    "En L1, l'univers était fini : on listait, on comptait, on divisait. Mais la question la plus simple du monde — « combien de lancers jusqu'au premier pile ? » — fait exploser le cadre : la réponse peut être $1, 2, 3, \\ldots$ sans aucune borne. Il faut un univers **infini dénombrable**.\n\nLa bonne nouvelle : tout ton outillage de séries et de familles sommables est exactement ce qu'il faut. Les probabilités deviennent des sommes de séries, les espérances des séries à étudier — les deux mondes de L1, hasard fini et sommes infinies, fusionnent.",
  depths: {
    discovery:
      "Le jeu du premier pile, pièce équilibrée. $X$ = numéro du lancer où pile sort pour la première fois. Calcule à la main : $P(X = 1) = \\frac{1}{2}$ ; $P(X = 2) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$ (face puis pile) ; $P(X = k) = \\frac{1}{2^k}$ ($k - 1$ faces puis un pile).\n\nVérification vitale : $\\sum_{k \\geq 1} \\frac{1}{2^k} = 1$ — la série géométrique de L1 garantit que la masse totale vaut bien $1$, aucun scénario n'est perdu (la probabilité de ne **jamais** voir pile est nulle). Et l'attente moyenne ? $E(X) = \\sum_{k \\geq 1} \\frac{k}{2^k} = 2$ : en moyenne, deux lancers suffisent. Une loi infinie, entièrement domptée par tes séries.",
    standard:
      "Le dessin : le **peigne infini**. Sur l'axe des entiers, une barre de hauteur $P(X = k)$ au-dessus de chaque $k$ — pour la loi géométrique, les barres décroissent en raison géométrique, et l'aire totale du peigne vaut exactement $1$. Toute probabilité d'événement se lit en additionnant des barres : $P(X > n)$ = la queue du peigne à droite de $n$.\n\nDeuxième peigne à connaître : la loi de **Poisson** $\\mathcal{P}(\\lambda)$, $P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}$ — le peigne monte, culmine vers $k \\approx \\lambda$, puis la factorielle écrase tout. C'est le peigne des événements rares : nombre de fautes de frappe par page, de clients par minute, de désintégrations par seconde. Deux silhouettes de peignes à reconnaître au premier regard — toute la suite du chapitre les fait travailler.",
    advanced:
      "Le cadre propre exige une **tribu** : une famille d'événements stable par complémentaire et union dénombrable, et une probabilité $\\sigma$-additive — $P\\big(\\bigcup A_n\\big) = \\sum P(A_n)$ pour des $A_n$ deux à deux incompatibles. Il en découle la continuité monotone ($A_n \\nearrow A \\Rightarrow P(A_n) \\to P(A)$, et la version décroissante), la sous-additivité, et le vocabulaire **presque sûr** : un événement de probabilité $1$, comme « pile finit par sortir ». Le conditionnement, les probabilités totales et Bayes passent au dénombrable sans douleur — les sommes finies deviennent des séries.\n\nUne variable aléatoire discrète $X$ admet une espérance lorsque la famille $\\big(k\\,P(X = k)\\big)$ est **sommable** — pour la géométrique $\\mathcal{G}(p)$ : $E(X) = \\frac{1}{p}$, $V(X) = \\frac{1-p}{p^2}$ ; pour Poisson $\\mathcal{P}(\\lambda)$ : $E(X) = V(X) = \\lambda$. Le théorème de transfert calcule $E(g(X)) = \\sum g(k)\\,P(X = k)$ sans chercher la loi de $g(X)$ ; si $X$ et $Y$ sont indépendantes, $E(XY) = E(X)\\,E(Y)$. Dans $L^2$, Cauchy-Schwarz encadre, la variance et la covariance mesurent. Enfin les deux inégalités universelles : **Markov** ($P(X \\geq a) \\leq \\frac{E(X)}{a}$ pour $X \\geq 0$) et **Bienaymé-Tchebychev** ($P(|X - E(X)| \\geq a) \\leq \\frac{V(X)}{a^2}$), qui donnent en trois lignes la **loi faible des grands nombres** : la moyenne empirique de variables i.i.d. de variance finie converge en probabilité vers l'espérance — le pont rigoureux entre fréquences observées et probabilités. La grande idée est celle des **mesures** : une probabilité est une mesure de masse totale $1$, et la $\\sigma$-additivité est ce qui lui permet d'embrasser l'infini.",
  },
  keyIdea:
    "Sur un univers dénombrable, tout devient série : la loi est une famille sommable de somme $1$, l'espérance existe lorsque $\\sum k\\,P(X = k)$ converge absolument, et Bienaymé-Tchebychev transforme la variance en contrôle des écarts — jusqu'à la loi des grands nombres.",
  why:
    "C'est le socle de toutes les probabilités sérieuses : files d'attente, fiabilité, algorithmes randomisés, statistiques. La loi faible des grands nombres justifie enfin pourquoi « la fréquence tend vers la probabilité » — l'intuition fondatrice de toute la discipline devient un théorème. Et les fonctions génératrices, juste après, feront de ces lois des séries entières.",
  examples: [
    { title: "La loi géométrique, de bout en bout", steps: [
      { p: "Pièce de paramètre $p \\in\\, ]0, 1[$ : $X$ = rang du premier succès. Loi : $P(X = k) = (1-p)^{k-1}\\, p$ pour $k \\geq 1$ — c'est $\\mathcal{G}(p)$." },
      { p: "Masse totale : $\\sum_{k \\geq 1} (1-p)^{k-1} p = p \\times \\frac{1}{1 - (1-p)} = 1$ ✓ — la géométrique de raison $1 - p$ fait le travail." },
      { p: "Espérance : $E(X) = p \\sum_{k \\geq 1} k\\,(1-p)^{k-1} = p \\times \\frac{1}{p^2} = \\frac{1}{p}$, en reconnaissant la série dérivée $\\sum k x^{k-1} = \\frac{1}{(1-x)^2}$ en $x = 1 - p$." },
      { p: "Lecture : succès rare ($p$ petit) ⟹ attente longue ($\\frac{1}{p}$ grand). Un dé : premier six en $6$ lancers en moyenne — la formule confirme l'instinct." },
    ]},
    { title: "Poisson, la loi des événements rares", steps: [
      { p: "$X \\sim \\mathcal{P}(\\lambda)$ : $P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}$. Masse totale : $e^{-\\lambda} \\sum_{k \\geq 0} \\frac{\\lambda^k}{k!} = e^{-\\lambda}\\, e^{\\lambda} = 1$ ✓ — la série exponentielle en personne." },
      { p: "Espérance : $E(X) = e^{-\\lambda} \\sum_{k \\geq 1} k\\, \\frac{\\lambda^k}{k!} = \\lambda\\, e^{-\\lambda} \\sum_{k \\geq 1} \\frac{\\lambda^{k-1}}{(k-1)!} = \\lambda$." },
      { p: "Un calcul analogue (via $k^2 = k(k-1) + k$) donne $E(X^2) = \\lambda^2 + \\lambda$, donc $V(X) = \\lambda$ : pour Poisson, **espérance et variance coïncident** — sa signature." },
      { p: "Si un standard reçoit $\\lambda = 3$ appels par minute en moyenne, $P(\\text{aucun appel}) = e^{-3} \\approx 0{,}05$ : la formule chiffre le silence." },
    ]},
    { title: "De Tchebychev à la loi des grands nombres", steps: [
      { p: "Soient $X_1, \\ldots, X_n$ i.i.d. d'espérance $m$ et de variance $\\sigma^2$, et $\\overline{X}_n = \\frac{X_1 + \\cdots + X_n}{n}$ la moyenne empirique." },
      { p: "Par linéarité : $E(\\overline{X}_n) = m$. Par indépendance : $V(\\overline{X}_n) = \\frac{1}{n^2} \\times n\\sigma^2 = \\frac{\\sigma^2}{n}$ — la variance **fond** quand $n$ grandit." },
      { p: "Bienaymé-Tchebychev sur $\\overline{X}_n$ : $P\\big(|\\overline{X}_n - m| \\geq \\varepsilon\\big) \\leq \\frac{\\sigma^2}{n\\,\\varepsilon^2} \\xrightarrow[n \\to +\\infty]{} 0$." },
      { p: "C'est la **loi faible des grands nombres** ■ : la moyenne observée se concentre autour de l'espérance. Trois lignes — et la fréquence d'un événement converge vers sa probabilité : l'axiome intuitif de L1 est devenu un théorème." },
    ]},
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour le jeu du premier pile (pièce équilibrée), calcule $P(X = 3)$, $P(X > 3)$, et vérifie que $\\sum_{k \\geq 1} P(X = k) = 1$.", solution: "$P(X = 3) = \\left(\\frac{1}{2}\\right)^2 \\times \\frac{1}{2} = \\frac{1}{8}$ — deux faces puis pile. $P(X > 3)$ = « les trois premiers lancers sont face » $= \\frac{1}{8}$ aussi. Masse totale : $\\sum_{k \\geq 1} \\frac{1}{2^k} = \\frac{1/2}{1 - 1/2} = 1$ ✓ — la géométrique boucle le budget : ne jamais voir pile est de probabilité nulle (mais pas impossible : c'est la nuance du **presque sûr**)." },
    { tier: "warmup", prompt: "$X \\sim \\mathcal{G}(p)$ avec $p = \\frac{1}{6}$ (premier six d'un dé). Donne $E(X)$, $P(X > n)$, et montre la propriété d'absence de mémoire : $P(X > m + n \\mid X > m) = P(X > n)$.", solution: "$E(X) = \\frac{1}{p} = 6$. $P(X > n) = \\left(\\frac{5}{6}\\right)^n$ — $n$ échecs d'affilée. Alors $P(X > m + n \\mid X > m) = \\frac{P(X > m + n)}{P(X > m)} = \\frac{(5/6)^{m+n}}{(5/6)^m} = \\left(\\frac{5}{6}\\right)^n = P(X > n)$ ■ : le dé **oublie** — avoir déjà attendu $m$ lancers ne rapproche en rien le six. La géométrique est la seule loi discrète sans mémoire." },
    { tier: "application", prompt: "Un serveur reçoit en moyenne $\\lambda = 2$ requêtes par seconde, modélisées par $X \\sim \\mathcal{P}(2)$. Exprime $P(X = 0)$, $P(X \\geq 1)$, et donne $E(X)$ et $V(X)$.", solution: "$P(X = 0) = e^{-2} \\frac{2^0}{0!} = e^{-2} \\approx 0{,}135$. $P(X \\geq 1) = 1 - e^{-2} \\approx 0{,}865$ — passer par le complémentaire évite une série. $E(X) = V(X) = \\lambda = 2$ : la signature de Poisson. Modèle typique des **événements rares** : beaucoup d'instants, une petite probabilité chacun, un compte global de loi Poisson." },
    { tier: "challenge", prompt: "$X \\geq 0$ d'espérance $E(X) = 4$. (1) Que dit Markov sur $P(X \\geq 20)$ ? (2) Si de plus $V(X) = 4$, que dit Bienaymé-Tchebychev sur $P(|X - 4| \\geq 6)$ ? (3) Compare la finesse des deux outils.", solution: "**(1)** Markov : $P(X \\geq 20) \\leq \\frac{E(X)}{20} = \\frac{4}{20} = \\frac{1}{5}$. **(2)** Bienaymé-Tchebychev : $P(|X - 4| \\geq 6) \\leq \\frac{V(X)}{6^2} = \\frac{4}{36} = \\frac{1}{9}$. **(3)** Markov n'utilise que la moyenne — borne grossière mais universelle ; Tchebychev exploite la variance et contrôle les **deux** queues à la fois. Aucune hypothèse sur la loi dans les deux cas : c'est leur force (toujours vrais) et leur faiblesse (rarement fins) — Tchebychev suffit pourtant à prouver la loi des grands nombres." },
    { tier: "exam", prompt: "Colle. Pour $n \\geq 1$, soit $X_n \\sim \\mathcal{B}\\!\\left(n, \\frac{\\lambda}{n}\\right)$ (binomiale, $\\lambda > 0$ fixé). Montre que pour tout $k$ fixé, $P(X_n = k) \\xrightarrow[n \\to +\\infty]{} e^{-\\lambda} \\frac{\\lambda^k}{k!}$ — la loi de Poisson comme limite des binomiales rares.", solution: "$P(X_n = k) = \\binom{n}{k} \\left(\\frac{\\lambda}{n}\\right)^k \\left(1 - \\frac{\\lambda}{n}\\right)^{n-k}$. Développons : $\\binom{n}{k} \\frac{1}{n^k} = \\frac{n(n-1)\\cdots(n-k+1)}{k!\\, n^k} = \\frac{1}{k!} \\prod_{j=0}^{k-1} \\left(1 - \\frac{j}{n}\\right) \\xrightarrow[n \\to \\infty]{} \\frac{1}{k!}$ — produit **fini** de facteurs tendant vers $1$. Ensuite $\\left(1 - \\frac{\\lambda}{n}\\right)^{n} = e^{n \\ln(1 - \\lambda/n)} \\to e^{-\\lambda}$ car $n \\ln\\!\\left(1 - \\frac{\\lambda}{n}\\right) \\sim -\\lambda$, et $\\left(1 - \\frac{\\lambda}{n}\\right)^{-k} \\to 1$ ($k$ fixé). Produit des trois limites : $P(X_n = k) \\to \\frac{\\lambda^k}{k!}\\, e^{-\\lambda}$ ■. Lecture : $n$ épreuves de plus en plus nombreuses, chacune de plus en plus rare, à espérance constante $n \\times \\frac{\\lambda}{n} = \\lambda$ — le compte limite suit Poisson. C'est le théorème des événements rares, et la raison d'être de cette loi." },
  ],
  practice: [
    { tier: "warmup", label: "Le premier succès", make: (r) => {
      const k = randint(r, 2, 8);
      return { prompt: `Dé équilibré : premier six au rang $X \\sim \\mathcal{G}\\!\\left(\\frac{1}{6}\\right)$. Si la pièce devient un dé à $${k}$ faces, $E(X) = $ ?`, answer: k, solution: `$E(X) = \\frac{1}{p} = ${k}$ — succès de probabilité $\\frac{1}{${k}}$, attente moyenne $${k}$ lancers.` };
    } },
    { tier: "warmup", label: "La signature de Poisson", make: (r) => {
      const l = randint(r, 2, 9);
      return { prompt: `$X \\sim \\mathcal{P}(${l})$ : que vaut $V(X)$ ?`, answer: l, solution: `Pour Poisson, $E(X) = V(X) = \\lambda = ${l}$ — sa signature.` };
    } },
    { tier: "application", label: "Transfert affine", make: (r) => {
      const a = randint(r, 2, 5), b = randint(r, 1, 9), l = randint(r, 2, 6);
      return { prompt: `$X \\sim \\mathcal{P}(${l})$ : $E(${a}X + ${b}) = $ ?`, answer: a * l + b, solution: `Linéarité : $${a}\\,E(X) + ${b} = ${a} \\times ${l} + ${b} = ${a * l + b}$.` };
    } },
    { tier: "application", label: "La variance dilatée", make: (r) => {
      const a = randint(r, 2, 4), l = randint(r, 2, 6);
      return { prompt: `$X \\sim \\mathcal{P}(${l})$ : $V(${a}X) = $ ?`, answer: a * a * l, solution: `$V(${a}X) = ${a}^2\\, V(X) = ${a * a} \\times ${l} = ${a * a * l}$ — la variance prend le carré.` };
    } },
    { tier: "challenge", label: "Tchebychev encadre", make: (r) => {
      const cas = pick(r, [[16, 4, 8], [9, 4, 6], [4, 9, 6], [25, 4, 10]]);
      return { prompt: `$V(X) = ${cas[0]}$. Pour quel $a > 0$ la borne de Bienaymé-Tchebychev $P(|X - E(X)| \\geq a) \\leq \\frac{V(X)}{a^2}$ vaut-elle exactement $\\frac{1}{${cas[1]}}$ ?`, answer: cas[2], solution: `$\\frac{${cas[0]}}{a^2} = \\frac{1}{${cas[1]}} \\Leftrightarrow a^2 = ${cas[0] * cas[1]} \\Leftrightarrow a = ${cas[2]}$ — plus $a$ est grand, plus l'écart est improbable.` };
    } },
  ],
};

export default [integralesGeneralisees, convergenceDominee, variablesDiscretes];
