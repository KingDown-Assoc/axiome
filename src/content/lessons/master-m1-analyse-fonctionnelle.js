// Field "Analysis" — MASTER module (m1 year), master de mathématiques.
// M1 canon: agrégation = FLOOR (Baire, Hahn–Banach, Ascoli are agreg staples);
// Sorbonne 4MA xxx analyse fonctionnelle + Polytechnique 2A "Analyse
// fonctionnelle" = standard.
// (1) Baire's theorem and its three pillars — Banach–Steinhaus, open mapping,
// closed graph: completeness forces automatic continuity.
// (2) Hahn–Banach and duality — extension, norming functionals, the geometric
// (separation) form, the bidual embedding and reflexivity.
// (3) Ascoli–Arzelà and Stone–Weierstrass — relative compactness via
// equicontinuity, density of separating subalgebras in C(K).
// Singapore at master level: Concrete = ONE explicit object; Pictorial = the
// category/separation/equicontinuity picture; Abstract = the theorems, big
// idea named. Exam = colle; practice = integer answers.
import { randint, pick } from "../../core/exercises.js";

// — Baire: in a complete space you cannot be meager everywhere —
const bairePiliers = {
  id: "analysis.master.baire-piliers",
  level: "master", domain: "analysis",
  title: "Le théorème de Baire et ses trois piliers",
  tagline: "Dans un espace complet, on ne peut pas être maigre partout — et cette simple idée de « taille » force la continuité automatique.",
  prereqs: ["analysis.bachelor.metriques-completude", "analysis.bachelor.continuite-lineaire"],
  intuition:
    "Un espace métrique complet a une forme de robustesse cachée : il n'est jamais « petit » au sens topologique. Précisément, il n'est pas réunion dénombrable de parties d'intérieur vide. Dans $\\mathbb{R}$, un singleton est d'intérieur vide ; les rationnels, réunion dénombrable de singletons, sont donc « maigres » — mais $\\mathbb{R}$ tout entier ne peut pas l'être, sinon il serait maigre en lui-même.\n\nCette idée d'une notion de taille — maigre contre comaigre, l'analogue topologique de « négligeable » contre « presque tout » — paraît modeste. Elle est pourtant le moteur de trois théorèmes qui structurent toute l'analyse fonctionnelle : Banach–Steinhaus, le théorème de l'application ouverte, le théorème du graphe fermé. Chacun déduit une régularité automatique de la seule complétude.",
  depths: {
    discovery:
      "**Avec les mains** : prends la droite réelle $\\mathbb{R}$, qui est complète. Suppose un instant qu'elle soit dénombrable : on pourrait écrire $\\mathbb{R} = \\{x_1, x_2, x_3, \\ldots\\}$. Chaque singleton $\\{x_n\\}$ est fermé et d'intérieur vide (aucun intervalle ouvert n'y tient). On aurait donc $\\mathbb{R}$ comme **réunion dénombrable de fermés d'intérieur vide** — c'est exactement ce que Baire interdit dans un complet. Contradiction. En une ligne, Baire prouve que $\\mathbb{R}$ est **non dénombrable** : la complétude est trop « grosse » pour tenir dans une liste.",
    standard:
      "**En image** : reformule Baire par le complémentaire. Dire qu'un complet n'est pas réunion dénombrable de fermés d'intérieur vide revient à dire qu'une **intersection dénombrable d'ouverts denses** y reste dense. Imagine une suite de cibles $U_1, U_2, \\ldots$, chacune un ouvert dense (elle « touche partout »). Baire garantit que $\\bigcap_n U_n$ touche encore partout : on ne peut pas évider tout l'espace en retirant une infinité dénombrable de fermés minces. Les ensembles de cette forme — les $G_\\delta$ denses — sont les parties « génériques », celles où vivent les propriétés typiques.",
    advanced:
      "**Dans la tête** : le théorème de **Baire** affirme qu'un espace métrique complet n'est pas maigre — où une partie est *maigre* si elle est réunion dénombrable de parties d'intérieur d'adhérence vide. Le complémentaire d'un maigre est *comaigre* : « topologiquement presque tout ». Sur ce socle, trois piliers.\n\n**Banach–Steinhaus** (bornitude uniforme) : une famille $(T_i)$ d'applications linéaires continues d'un espace de Banach $E$ dans un normé, **bornée point par point** ($\\sup_i \\lVert T_i x \\rVert < \\infty$ pour chaque $x$), est **uniformément bornée** ($\\sup_i \\lVert T_i \\rVert < \\infty$).\n\n**Application ouverte** : une application linéaire continue **surjective** entre Banach est ouverte ; si elle est de plus bijective, sa réciproque est continue (théorème de l'inverse borné).\n\n**Graphe fermé** : une application linéaire entre Banach dont le **graphe est fermé** est continue — on n'a plus à vérifier la continuité, seulement que « $x_n \\to x$ et $T x_n \\to y$ entraînent $y = Tx$ ».\n\nBig idea *Measures* : la catégorie de Baire est une **notion de taille**. La complétude est la mesure cachée qui rend les pathologies impossibles — et chaque pilier convertit cette taille en une régularité gratuite.",
  },
  keyIdea: "Un espace métrique complet n'est jamais maigre : une intersection dénombrable d'ouverts denses y reste dense (Baire). De là, trois piliers — Banach–Steinhaus, application ouverte, graphe fermé — déduisent une régularité **automatique** de la seule complétude. Big idea *Measures*.",
  why:
    "Ces trois théorèmes sont le squelette de l'analyse fonctionnelle. Banach–Steinhaus explique, par exemple, qu'il existe une fonction continue dont la série de Fourier diverge en un point : c'est une conséquence directe de la divergence des normes des sommes partielles. L'application ouverte fonde le caractère bien posé de nombreux problèmes linéaires (inverser un opérateur continu surjectif donne un inverse continu). Le graphe fermé épargne d'innombrables vérifications de continuité. Une seule idée de taille, trois leviers.",
  examples: [
    { title: "ℝ est non dénombrable, par Baire", steps: [
      { p: "$\\mathbb{R}$ est complet pour la distance usuelle. Si $\\mathbb{R}$ était dénombrable, on l'écrirait $\\bigcup_n \\{x_n\\}$, réunion dénombrable des fermés $\\{x_n\\}$." },
      { p: "Chaque $\\{x_n\\}$ est d'intérieur vide. Baire interdit qu'un complet soit une telle réunion : $\\mathbb{R}$ serait maigre en lui-même, absurde. Donc $\\mathbb{R}$ est non dénombrable — sans argument diagonal." },
    ] },
    { title: "Banach–Steinhaus en action", steps: [
      { p: "Soit $(T_n)$ des applications linéaires continues de Banach $E$ vers $F$, telles que $T_n x \\to T x$ pour tout $x$. Pour chaque $x$, la suite $(T_n x)$ converge donc est bornée : $\\sup_n \\lVert T_n x \\rVert < \\infty$." },
      { p: "Banach–Steinhaus donne $M = \\sup_n \\lVert T_n \\rVert < \\infty$. En passant à la limite dans $\\lVert T_n x \\rVert \\le \\lVert T_n \\rVert \\, \\lVert x \\rVert$, la limite $T$ est linéaire **continue** avec $\\lVert T \\rVert \\le M$. La limite simple d'opérateurs continus est continue — pourvu que l'espace de départ soit complet." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi $\\mathbb{Q}$ est-il maigre dans $\\mathbb{R}$ ? Et $\\mathbb{R} \\setminus \\mathbb{Q}$ est-il maigre ?", solution: "$\\mathbb{Q} = \\bigcup_{q} \\{q\\}$ est une réunion **dénombrable** de fermés d'intérieur vide : il est maigre par définition. En revanche $\\mathbb{R} \\setminus \\mathbb{Q}$ est **comaigre** (c'est le complémentaire d'un maigre dans un complet) : il ne peut pas être maigre, sinon $\\mathbb{R} = \\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q})$ serait maigre, ce que Baire interdit. Les irrationnels forment donc l'ensemble « générique »." },
    { tier: "warmup", prompt: "Un espace vectoriel normé de dimension dénombrable infinie peut-il être complet ?", solution: "Non. Si $(e_n)_{n \\ge 1}$ est une base (de Hamel) dénombrable, alors $E = \\bigcup_n F_n$ avec $F_n = \\mathrm{Vect}(e_1, \\ldots, e_n)$. Chaque $F_n$ est un sous-espace de dimension finie, donc **fermé**, et **strict** donc d'intérieur vide. $E$ serait réunion dénombrable de fermés d'intérieur vide : maigre, donc non complet par Baire. Conséquence : un espace de Banach de dimension infinie a une base de Hamel **non dénombrable**." },
    { tier: "application", prompt: "Soit $T : E \\to F$ linéaire entre Banach telle que : $x_n \\to 0$ et $T x_n \\to y$ entraînent $y = 0$. Montre que $T$ est continue.", solution: "C'est exactement la fermeture du graphe. Le graphe $\\Gamma = \\{(x, Tx)\\}$ est fermé ssi pour toute suite $(x_n, T x_n) \\to (x, y)$ on a $y = Tx$. Quitte à translater par $x$ (linéarité), il suffit de traiter $x = 0$ : si $x_n \\to 0$ et $T x_n \\to y$, l'hypothèse donne $y = 0 = T(0)$. Le graphe est donc fermé, et le **théorème du graphe fermé** conclut : $T$ est continue." },
    { tier: "challenge", prompt: "Montre que l'ensemble des points de continuité d'une limite simple $f = \\lim_n f_n$ de fonctions continues $f_n : \\mathbb{R} \\to \\mathbb{R}$ est un $G_\\delta$ dense.", solution: "On écrit l'ensemble $C$ des points de continuité comme $C = \\bigcap_k \\{x : \\mathrm{osc}(f)(x) < 1/k\\}$, où l'oscillation $\\mathrm{osc}(f)(x) = \\inf_{V \\ni x} \\mathrm{diam}\\, f(V)$ ; chaque $\\{ \\mathrm{osc} < 1/k\\}$ est ouvert, donc $C$ est un $G_\\delta$. La densité vient de Baire appliqué aux ensembles $E_{N} = \\{x : |f_p(x) - f_q(x)| \\le \\varepsilon \\ \\forall p,q \\ge N\\}$ : ils sont fermés, de réunion $\\mathbb{R}$, donc l'un au moins est d'intérieur non vide sur chaque intervalle. On en déduit que $f$ est continue sur un ouvert dense pour chaque $\\varepsilon$, puis sur leur intersection. Une limite simple de fonctions continues (fonction de **classe de Baire 1**) est donc continue sur un $G_\\delta$ dense — jamais partout discontinue ■." },
    { tier: "exam", prompt: "(1) Énonce le théorème de Banach–Steinhaus. (2) On admet que les normes des noyaux de Dirichlet vérifient $\\lVert D_n \\rVert_{L^1} \\to +\\infty$. En considérant les formes linéaires $f \\mapsto S_n f(0)$ (valeur en $0$ de la somme partielle de Fourier) sur l'espace de Banach $C(\\mathbb{T})$ des fonctions continues $2\\pi$-périodiques, montre qu'il existe $f \\in C(\\mathbb{T})$ dont la série de Fourier **diverge** en $0$. (3) Que peut-on dire de l'ensemble de telles $f$ ?", solution: "(1) Soit $E$ un Banach, $F$ un normé, $(T_i)_{i \\in I}$ une famille d'applications linéaires continues $E \\to F$. Si $\\sup_i \\lVert T_i x \\rVert < \\infty$ pour tout $x \\in E$, alors $\\sup_i \\lVert T_i \\rVert < \\infty$.\n\n(2) La forme $\\varphi_n : f \\mapsto S_n f(0) = \\frac{1}{2\\pi}\\int_{\\mathbb{T}} f(t) D_n(t)\\, dt$ est linéaire continue sur $C(\\mathbb{T})$, et sa norme d'opérateur vaut $\\lVert \\varphi_n \\rVert = \\frac{1}{2\\pi}\\lVert D_n \\rVert_{L^1} \\to +\\infty$. Si la série de Fourier de **toute** $f$ continue convergeait en $0$, alors $\\sup_n |\\varphi_n(f)| < \\infty$ pour chaque $f$ ; Banach–Steinhaus donnerait $\\sup_n \\lVert \\varphi_n \\rVert < \\infty$ — contradiction. Donc il existe $f \\in C(\\mathbb{T})$ avec $\\sup_n |S_n f(0)| = +\\infty$ : sa série de Fourier diverge en $0$.\n\n(3) L'argument de Baire montre plus : l'ensemble des $f$ dont la série de Fourier diverge en $0$ est **comaigre** (un $G_\\delta$ dense) dans $C(\\mathbb{T})$. La divergence est le cas **générique** ; la convergence ponctuelle pour toute fonction continue est l'exception, pas la règle ■." },
  ],
  practice: [
    { tier: "discovery", label: "Maigre dans ℝ ?", make: (r) => {
      const opts = [
        { s: "\\mathbb{Z}", m: 1 }, { s: "\\mathbb{Q}", m: 1 },
        { s: "\\mathbb{R} \\setminus \\mathbb{Q}", m: 0 }, { s: "[0, 1]", m: 0 },
        { s: "\\text{l'ensemble de Cantor}", m: 1 }, { s: "\\mathbb{R}", m: 0 },
      ];
      const o = pick(r, opts);
      return { prompt: `L'ensemble $${o.s}$ est-il **maigre** dans $\\mathbb{R}$ ? (réponds $1$ pour oui, $0$ pour non)`, answer: o.m, solution: o.m ? "Oui : il est réunion dénombrable de fermés d'intérieur vide (donc d'intérieur d'adhérence vide), c'est un maigre." : "Non : il contient un ouvert non vide ou il est comaigre, il ne peut donc être maigre dans le complet $\\mathbb{R}$." };
    } },
    { tier: "warmup", label: "La borne uniforme (Banach–Steinhaus)", make: (r) => {
      const k = randint(r, 3, 4);
      const ns = Array.from({ length: k }, () => randint(r, 1, 12));
      const M = Math.max(...ns);
      return { prompt: `Une famille d'opérateurs continus $(T_1, \\ldots, T_${k})$ sur un Banach a pour normes $${ns.join(",\\ ")}$. Bornée point par point, elle est uniformément bornée : quelle est la borne $\\sup_i \\lVert T_i \\rVert$ ?`, answer: M, solution: `Pour une famille **finie**, le sup des normes est simplement le maximum : $\\sup_i \\lVert T_i \\rVert = ${M}$. (Banach–Steinhaus garantit la finitude même pour une famille infinie bornée point par point.)` };
    } },
    { tier: "application", label: "Quel pilier ?", make: (r) => {
      const opts = [
        { s: "une famille d'opérateurs continus bornée en chaque point", k: 1 },
        { s: "une bijection linéaire continue entre Banach, dont on veut la continuité de l'inverse", k: 2 },
        { s: "un opérateur linéaire entre Banach dont on sait seulement le graphe fermé", k: 3 },
        { s: "une suite d'opérateurs continus convergeant simplement, dont on veut borner les normes", k: 1 },
        { s: "une surjection linéaire continue entre Banach, dont on veut le caractère ouvert", k: 2 },
      ];
      const o = pick(r, opts);
      return { prompt: `Quel pilier de Baire invoquer pour : ${o.s} ? (réponds $1$ = Banach–Steinhaus, $2$ = application ouverte, $3$ = graphe fermé)`, answer: o.k, solution: `Réponse : $${o.k}$. ${o.k === 1 ? "La bornitude point par point est l'hypothèse de Banach–Steinhaus." : o.k === 2 ? "Surjectivité ou inverse d'une bijection relèvent de l'application ouverte / inverse borné." : "Connaître seulement la fermeture du graphe relève du théorème du graphe fermé."}` };
    } },
  ],
};

// — Hahn–Banach: always enough functionals to see everything —
const hahnBanachDualite = {
  id: "analysis.master.hahn-banach-dualite",
  level: "master", domain: "analysis",
  title: "Hahn–Banach et la dualité",
  tagline: "Il y a toujours assez de formes linéaires pour tout voir — et c'est ce qui fait vivre un espace à travers son dual.",
  prereqs: ["analysis.master.baire-piliers", "analysis.bachelor.normes-topologie"],
  intuition:
    "Une forme linéaire continue lit un espace selon une direction. La question fondamentale est : en a-t-on assez ? Le théorème de Hahn–Banach répond oui, et de façon spectaculaire : toute forme définie sur un sous-espace se **prolonge** à l'espace entier sans augmenter sa norme.\n\nDe ce prolongement découle tout l'attirail de la dualité : on peut séparer deux points par une forme, calculer une norme « du côté du dual » ($\\lVert x \\rVert = \\sup_{\\lVert f \\rVert \\le 1} |f(x)|$), séparer un convexe d'un point par un hyperplan, et plonger un espace dans son **bidual**. Un espace et son dual deviennent deux faces d'un même objet.",
  depths: {
    discovery:
      "**Avec les mains** : place-toi dans $\\mathbb{R}^2$ muni de la norme $\\lVert (x, y) \\rVert_\\infty = \\max(|x|, |y|)$. Sur la droite $D = \\mathbb{R} \\cdot (1, 0)$, considère la forme $f(t, 0) = t$. Sa norme sur $D$ vaut $1$ (car $|f(t,0)| = |t| = \\lVert (t,0) \\rVert_\\infty$). Hahn–Banach promet un prolongement $\\tilde f$ à $\\mathbb{R}^2$ de **même norme** $1$. Ici $\\tilde f(x, y) = x$ convient : sa norme duale (pour $\\lVert \\cdot \\rVert_\\infty$, le dual est $\\lVert \\cdot \\rVert_1$) vaut $\\lVert (1, 0) \\rVert_1 = 1$. On a étendu sans rien payer : la forme « voit » maintenant tout le plan, sans grossir.",
    standard:
      "**En image** : la forme géométrique de Hahn–Banach sépare. Dessine un **convexe** fermé $C$ et un point $a$ à l'extérieur. Il existe une forme linéaire $f$ et un réel $\\alpha$ tels que $f(a) > \\alpha \\ge f(c)$ pour tout $c \\in C$ : l'hyperplan $\\{f = \\alpha\\}$ glisse entre le convexe et le point, comme une vitre. C'est le même théorème : prolonger une forme, c'est trouver un hyperplan d'appui. Toute la géométrie convexe en dimension infinie repose sur cette image de séparation par des hyperplans fermés.",
    advanced:
      "**Dans la tête** : **Hahn–Banach** (forme analytique) : si $p$ est sous-linéaire sur $E$ et $f$ une forme sur un sous-espace $G$ avec $f \\le p$ sur $G$, alors $f$ se prolonge à $E$ en gardant $\\tilde f \\le p$. Le corollaire normé : toute forme continue sur un sous-espace se prolonge avec **même norme**.\n\nDeux conséquences structurent la dualité. D'abord le **calcul de norme par le dual** : pour tout $x$, $\\lVert x \\rVert = \\max_{\\lVert f \\rVert \\le 1} |f(x)|$, et le max est **atteint** (prolonger la forme $\\lambda x \\mapsto \\lambda \\lVert x \\rVert$ définie sur $\\mathbb{R}x$). Ensuite le **plongement canonique** $J : E \\to E^{\\ast\\ast}$, $J(x)(f) = f(x)$, qui est une **isométrie** : $\\lVert J(x) \\rVert = \\lVert x \\rVert$. L'espace $E$ est *réflexif* lorsque $J$ est surjective — c'est le cas des Hilbert et des $L^p$ pour $1 < p < \\infty$, mais pas de $L^1$, $L^\\infty$ ni $c_0$.\n\nBig idea *Equivalence* : un espace et son dual sont deux descriptions équivalentes d'un même objet. Le plongement bidual permet de mesurer, de séparer et de raisonner indifféremment d'un côté ou de l'autre.",
  },
  keyIdea: "Hahn–Banach prolonge toute forme linéaire continue d'un sous-espace à l'espace entier sans augmenter sa norme. D'où la norme calculée par le dual $\\lVert x \\rVert = \\max_{\\lVert f \\rVert \\le 1} |f(x)|$, la séparation des convexes par des hyperplans, et le plongement isométrique $J : E \\to E^{\\ast\\ast}$ (réflexivité si $J$ surjective). Big idea *Equivalence*.",
  why:
    "Sans Hahn–Banach, le dual pourrait être trop pauvre pour décrire l'espace. Avec lui, la dualité devient un outil de calcul : on majore une norme en exhibant une seule forme bien choisie, on prouve l'existence de solutions par des arguments de séparation, on étudie les topologies faibles. C'est l'autre pilier — non topologique celui-là, purement linéaire-algébrique au cœur — de l'analyse fonctionnelle, complémentaire de Baire.",
  examples: [
    { title: "Prolonger sans grossir", steps: [
      { p: "Sur $G = \\{(x, x) : x \\in \\mathbb{R}\\} \\subset (\\mathbb{R}^2, \\lVert \\cdot \\rVert_1)$, soit $f(x, x) = x$. Comme $\\lVert (x,x) \\rVert_1 = 2|x|$, on a $|f| = |x| = \\tfrac{1}{2}\\lVert (x,x) \\rVert_1$, donc $\\lVert f \\rVert_{G} = \\tfrac{1}{2}$." },
      { p: "Hahn–Banach prolonge en gardant la norme $\\tfrac{1}{2}$. La forme $\\tilde f(x, y) = \\tfrac{1}{2}(x + y)$ convient : sa norme duale (dual de $\\lVert \\cdot \\rVert_1$ = $\\lVert \\cdot \\rVert_\\infty$) vaut $\\lVert (\\tfrac12, \\tfrac12) \\rVert_\\infty = \\tfrac12$, et $\\tilde f(x,x) = x$. Prolongement de même norme." },
    ] },
    { title: "La forme qui norme", steps: [
      { p: "Dans $\\ell^1$, prends $x = (3, -2, 0, \\ldots)$, de norme $\\lVert x \\rVert_1 = 5$. On cherche $f \\in \\ell^\\infty$ avec $\\lVert f \\rVert_\\infty \\le 1$ atteignant $f(x) = \\lVert x \\rVert_1$." },
      { p: "Le choix $f = (\\mathrm{sgn}(x_n))_n = (1, -1, 1, 1, \\ldots)$ a $\\lVert f \\rVert_\\infty = 1$ et $f(x) = 3 \\cdot 1 + (-2)(-1) = 5 = \\lVert x \\rVert_1$. Le max $\\lVert x \\rVert = \\max_{\\lVert f \\rVert \\le 1} |f(x)|$ est bien atteint, comme le promet Hahn–Banach." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Soit $x \\neq 0$ dans un espace normé $E$. Montre qu'il existe une forme continue $f$ avec $\\lVert f \\rVert = 1$ et $f(x) = \\lVert x \\rVert$.", solution: "Sur la droite $G = \\mathbb{R} x$, pose $g(\\lambda x) = \\lambda \\lVert x \\rVert$. Alors $|g(\\lambda x)| = |\\lambda| \\lVert x \\rVert = \\lVert \\lambda x \\rVert$, donc $\\lVert g \\rVert_G = 1$. Hahn–Banach prolonge $g$ en $f$ sur $E$ avec $\\lVert f \\rVert = 1$, et $f(x) = g(x) = \\lVert x \\rVert$. Cette **forme normante** sépare $x$ de $0$ et montre que le dual est assez riche pour distinguer les vecteurs." },
    { tier: "warmup", prompt: "Quels espaces parmi $\\ell^2$, $\\ell^1$, $\\ell^\\infty$, $c_0$ sont réflexifs ? Justifie par les duaux.", solution: "$\\ell^2$ est **réflexif** (Hilbert : $(\\ell^2)^* \\simeq \\ell^2$, et le bidual revient sur lui-même). $\\ell^1$ : $(\\ell^1)^* \\simeq \\ell^\\infty$ mais $(\\ell^\\infty)^* \\supsetneq \\ell^1$, donc $J$ n'est pas surjective — **non réflexif**. $\\ell^\\infty$ : son dual est strictement plus gros que $\\ell^1$ — **non réflexif**. $c_0$ : $(c_0)^* \\simeq \\ell^1$, $(\\ell^1)^* \\simeq \\ell^\\infty \\neq c_0$ — **non réflexif**. Seul $\\ell^2$ l'est : la réflexivité est l'exception, liée à la dualité $L^p$–$L^q$ avec $1 < p < \\infty$." },
    { tier: "application", prompt: "Soit $F \\subsetneq E$ un sous-espace fermé et $a \\notin F$. Montre qu'il existe une forme continue $f$ nulle sur $F$ et telle que $f(a) = 1$.", solution: "Sur $G = F \\oplus \\mathbb{R} a$, définis $g(u + \\lambda a) = \\lambda$ pour $u \\in F$. Elle est continue : $|g| = |\\lambda|$ et la distance $d = d(a, F) > 0$ (car $F$ fermé, $a \\notin F$) donne $\\lVert u + \\lambda a \\rVert \\ge |\\lambda| \\, d$, d'où $\\lVert g \\rVert_G \\le 1/d < \\infty$. Hahn–Banach prolonge $g$ en $f$ continue sur $E$, avec $f|_F = 0$ et $f(a) = 1$. C'est la **séparation** d'un point fermé hors d'un sous-espace : le dual sépare points et sous-espaces fermés." },
    { tier: "challenge", prompt: "Montre que si le dual $E^*$ est séparable, alors $E$ est séparable. (La réciproque est fausse : $\\ell^1$ est séparable, $\\ell^\\infty$ non.)", solution: "Soit $(f_n)$ une suite dense dans la sphère unité de $E^*$. Pour chaque $n$, choisis $x_n$ avec $\\lVert x_n \\rVert = 1$ et $f_n(x_n) \\ge \\tfrac12$ (possible car $\\lVert f_n \\rVert = 1$). Soit $D$ l'ensemble (dénombrable) des combinaisons rationnelles des $x_n$, et $V = \\overline{\\mathrm{Vect}}(x_n)$. Si $V \\neq E$, Hahn–Banach fournit $f \\neq 0$, $\\lVert f \\rVert = 1$, nulle sur $V$. Par densité, $\\lVert f - f_n \\rVert < \\tfrac14$ pour un $n$ ; alors $\\tfrac12 \\le f_n(x_n) = (f_n - f)(x_n) + f(x_n) \\le \\tfrac14 + 0$, contradiction. Donc $V = E$ et $D$ est dense : $E$ est séparable ■." },
    { tier: "exam", prompt: "(1) Énonce la forme normée de Hahn–Banach. (2) Démontre que pour tout $x \\in E$, $\\lVert x \\rVert = \\sup_{\\lVert f \\rVert \\le 1} |f(x)|$ et que le sup est **atteint**. (3) En déduire que le plongement canonique $J : E \\to E^{\\ast\\ast}$, $J(x)(f) = f(x)$, est une **isométrie**. (4) Qu'est-ce qui distingue un espace réflexif ?", solution: "(1) Toute forme linéaire continue $g$ définie sur un sous-espace $G \\subset E$ se prolonge en une forme continue $f$ sur $E$ avec $\\lVert f \\rVert = \\lVert g \\rVert_G$.\n\n(2) Pour $\\lVert f \\rVert \\le 1$, $|f(x)| \\le \\lVert f \\rVert \\lVert x \\rVert \\le \\lVert x \\rVert$, donc $\\sup \\le \\lVert x \\rVert$. Réciproquement, la forme normante construite en exercice (prolongement de $\\lambda x \\mapsto \\lambda \\lVert x \\rVert$) vérifie $\\lVert f \\rVert = 1$ et $f(x) = \\lVert x \\rVert$ : le sup vaut $\\lVert x \\rVert$ et il est **atteint** (c'est un max).\n\n(3) $\\lVert J(x) \\rVert_{E^{\\ast\\ast}} = \\sup_{\\lVert f \\rVert \\le 1} |J(x)(f)| = \\sup_{\\lVert f \\rVert \\le 1} |f(x)| = \\lVert x \\rVert$ par (2). Donc $J$ préserve la norme : c'est une **isométrie** (en particulier injective).\n\n(4) $E$ est **réflexif** lorsque $J$ est de plus **surjective** : tout élément du bidual provient d'un vecteur de $E$. Hilbert et $L^p$ ($1 < p < \\infty$) le sont ; $L^1$, $L^\\infty$, $c_0$ ne le sont pas. L'isométrie $J$ est gratuite (Hahn–Banach) ; la surjectivité est une propriété forte ■." },
  ],
  practice: [
    { tier: "warmup", label: "La forme qui norme (dual ℓ¹)", make: (r) => {
      const a = randint(r, 1, 6), b = randint(r, 1, 6);
      const sa = pick(r, [1, -1]), sb = pick(r, [1, -1]);
      const x1 = sa * a, x2 = sb * b, val = a + b;
      return { prompt: `Pour $x = (${x1}, ${x2}, 0, \\ldots) \\in \\ell^1$, la dualité donne $\\lVert x \\rVert_1 = \\max_{\\lVert f \\rVert_\\infty \\le 1} f(x)$, atteint par $f = (\\mathrm{sgn}(x_n))$. Quelle est cette valeur maximale ?`, answer: val, solution: `Avec $f = (${sa}, ${sb}, \\ldots)$ de norme $\\infty$ égale à $1$, $f(x) = ${x1 < 0 ? "(" + x1 + ")" : x1} \\cdot ${sa} + ${x2 < 0 ? "(" + x2 + ")" : x2} \\cdot ${sb} = ${a} + ${b} = ${val} = \\lVert x \\rVert_1$.` };
    } },
    { tier: "warmup", label: "Réflexif ?", make: (r) => {
      const opts = [
        { s: "\\ell^2", m: 1 }, { s: "\\ell^1", m: 0 }, { s: "\\ell^\\infty", m: 0 },
        { s: "c_0", m: 0 }, { s: "L^3([0,1])", m: 1 }, { s: "\\mathbb{R}^n", m: 1 },
        { s: "\\text{un espace de Hilbert}", m: 1 },
      ];
      const o = pick(r, opts);
      return { prompt: `L'espace $${o.s}$ est-il **réflexif** ? (réponds $1$ pour oui, $0$ pour non)`, answer: o.m, solution: o.m ? "Oui : le plongement canonique $J$ y est surjectif (Hilbert, ou $L^p$ avec $1 < p < \\infty$, ou dimension finie)." : "Non : le bidual est strictement plus gros que l'espace, $J$ n'est pas surjective." };
    } },
    { tier: "application", label: "Dimension du dual (fini)", make: (r) => {
      const n = randint(r, 2, 7);
      return { prompt: `Pour $E = \\mathbb{R}^${n}$, quelle est la dimension de son dual $E^*$ ?`, answer: n, solution: `En dimension finie, $\\dim E^* = \\dim E = ${n}$ : toute forme s'écrit $x \\mapsto \\sum a_i x_i$, et $(E^*$, $E^{\\ast\\ast}) $ ramène à $E$ — la dimension finie est toujours réflexive.` };
    } },
  ],
};

// — Ascoli & Stone–Weierstrass: compactness and density in C(K) —
const ascoliStoneWeierstrass = {
  id: "analysis.master.ascoli-stone-weierstrass",
  level: "master", domain: "analysis",
  title: "Ascoli et Stone–Weierstrass : compacité et densité dans C(K)",
  tagline: "Quand une famille de fonctions est-elle relativement compacte, et quand une sous-algèbre est-elle dense ? Deux critères, une même idée d'approximation.",
  prereqs: ["analysis.master.hahn-banach-dualite", "analysis.bachelor.compacite-connexite"],
  intuition:
    "Dans l'espace $C(K)$ des fonctions continues sur un compact, muni de la norme uniforme, deux questions reviennent sans cesse. La première : une famille de fonctions a-t-elle une sous-suite uniformément convergente ? La seconde : une famille de fonctions « simples » suffit-elle à approcher toutes les autres ?\n\nDeux théorèmes répondent. **Ascoli–Arzelà** caractérise la compacité relative : il faut et il suffit que la famille soit **équicontinue** et bornée. **Stone–Weierstrass** caractérise la densité : une sous-algèbre qui sépare les points et contient les constantes est dense. Chacun ramène une question de dimension infinie à un critère vérifiable à la main — c'est la même idée d'approximation contrôlée.",
  depths: {
    discovery:
      "**Avec les mains** : compare deux familles sur $[0, 2\\pi]$. D'abord $f_n(x) = \\sin(nx)$ : entre deux points proches, $f_n$ oscille de plus en plus vite, donc aucun $\\delta$ ne contrôle $|f_n(x) - f_n(y)|$ uniformément en $n$ — la famille **n'est pas équicontinue**. Et de fait, $(\\sin(nx))$ n'a aucune sous-suite uniformément convergente. Ensuite $g_n(x) = x/n$ : $|g_n(x) - g_n(y)| = |x - y|/n \\le |x - y|$, un même $\\delta = \\varepsilon$ marche pour tous — **équicontinue**, et $g_n \\to 0$ uniformément. L'équicontinuité fait toute la différence.",
    standard:
      "**En image** : l'équicontinuité, c'est un **tube de largeur uniforme**. Pour un $\\varepsilon$ donné, il existe un $\\delta$ tel que, pour **toutes** les fonctions de la famille à la fois, rester dans une fenêtre horizontale de largeur $\\delta$ garde la fonction dans une bande verticale de hauteur $\\varepsilon$. Le même $\\delta$ sert tout le monde. Couplée à la bornitude, cette régularité commune permet de construire un $\\varepsilon$-réseau fini de $C(K)$ : on découpe $K$ et l'axe des valeurs en grilles, et un nombre fini de fonctions « en escalier » approche toute la famille. Côté densité, l'image jumelle : les polynômes recouvrent uniformément le graphe de n'importe quelle fonction continue sur $[a, b]$.",
    advanced:
      "**Dans la tête** : **Ascoli–Arzelà** : une partie $\\mathcal{F} \\subset C(K)$, $K$ compact, est **relativement compacte** (pour $\\lVert \\cdot \\rVert_\\infty$) si et seulement si elle est **équicontinue** et **ponctuellement bornée**. L'équicontinuité est l'hypothèse cruciale : elle convertit la bornitude ponctuelle en bornitude uniforme et fournit, via un procédé diagonal, des sous-suites uniformément convergentes.\n\n**Stone–Weierstrass** : une sous-**algèbre** $A \\subset C(K, \\mathbb{R})$ qui **sépare les points** et **contient les constantes** est **dense** pour $\\lVert \\cdot \\rVert_\\infty$. (Cas complexe : ajouter la stabilité par conjugaison.) Le théorème de Weierstrass — les polynômes denses dans $C([a, b])$ — en est le corollaire historique.\n\nBig idea *Equivalence* : chaque théorème **réduit une question infinie-dimensionnelle à un critère fini à vérifier**. Compacité $\\iff$ équicontinuité + bornitude ; densité $\\iff$ séparer les points + constantes. Ces équivalences nourrissent les théorèmes d'existence (Peano par Ascoli, familles normales de Montel) et d'approximation partout en analyse.",
  },
  keyIdea: "Ascoli–Arzelà : dans $C(K)$ ($K$ compact), une famille est relativement compacte $\\iff$ équicontinue + ponctuellement bornée. Stone–Weierstrass : une sous-algèbre séparant les points et contenant les constantes est dense (uniformément) — d'où Weierstrass (polynômes denses). Big idea *Equivalence* : compacité et densité se ramènent à un critère vérifiable.",
  why:
    "Ces deux critères sont des moteurs d'existence et d'approximation. Ascoli extrait des limites là où la seule bornitude ne suffit pas : on l'emploie pour les solutions d'équations différentielles (Peano, Cauchy–Péano), les familles holomorphes (Montel), les problèmes variationnels. Stone–Weierstrass justifie qu'on approche toute fonction continue par des polynômes, des polynômes trigonométriques, ou toute algèbre assez riche — fondement du calcul numérique et de l'analyse de Fourier.",
  examples: [
    { title: "Pourquoi sin(nx) n'a pas de sous-suite convergente", steps: [
      { p: "La famille $f_n(x) = \\sin(nx)$ sur $[0, 2\\pi]$ est bornée par $1$. Mais elle n'est pas équicontinue : $f_n'(x) = n\\cos(nx)$ a une pente qui explose, donc aucun $\\delta$ uniforme ne contrôle les variations." },
      { p: "Par Ascoli, elle n'est **pas relativement compacte** : aucune sous-suite ne converge uniformément. (En effet $\\lVert \\sin(nx) - \\sin(mx) \\rVert_\\infty$ ne tend pas vers $0$.) Bornée mais sans limite : l'équicontinuité manquait." },
    ] },
    { title: "Les polynômes trigonométriques sont denses", steps: [
      { p: "Sur le cercle $\\mathbb{T}$, l'ensemble $A$ des polynômes trigonométriques $\\sum_{|k| \\le N} c_k e^{ikx}$ est une **algèbre** (stable par produit), **sépare les points** (par $e^{ix}$) et contient les constantes ; il est stable par conjugaison." },
      { p: "Stone–Weierstrass (cas complexe) conclut : $A$ est **dense** dans $C(\\mathbb{T})$ pour $\\lVert \\cdot \\rVert_\\infty$. Toute fonction continue périodique est uniformément approchée par des polynômes trigonométriques — un fondement de l'analyse de Fourier (que le théorème de Fejér rend constructif)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La famille $f_n(x) = x^n$ sur $[0, 1]$ est-elle équicontinue ? relativement compacte dans $C([0,1])$ ?", solution: "**Non équicontinue** : près de $x = 1$, les $x^n$ passent de valeurs proches de $0$ à $1$ sur un intervalle qui rétrécit avec $n$, donc aucun $\\delta$ uniforme ne marche. La limite simple $\\mathbf{1}_{\\{1\\}}$ est discontinue, ce qui interdit toute convergence uniforme. Par Ascoli, la famille n'est **pas relativement compacte** dans $C([0,1])$. (Elle est bornée par $1$ : la bornitude seule ne suffit jamais.)" },
    { tier: "warmup", prompt: "Une famille de fonctions $C$-lipschitziennes ($|f(x) - f(y)| \\le C|x-y|$) sur $[0,1]$, toutes majorées par $M$ en valeur absolue, est-elle relativement compacte ?", solution: "**Oui**. L'équicontinuité est immédiate et uniforme : pour $\\varepsilon$ donné, $\\delta = \\varepsilon / C$ donne $|f(x) - f(y)| \\le C\\delta = \\varepsilon$ pour **toute** $f$ de la famille. La bornitude $|f| \\le M$ est l'hypothèse de bornitude ponctuelle. Les deux conditions d'Ascoli étant réunies sur le compact $[0,1]$, la famille est relativement compacte : toute suite admet une sous-suite uniformément convergente." },
    { tier: "application", prompt: "Les fonctions paires sont-elles denses dans $C([-1, 1])$ par Stone–Weierstrass ? Et les polynômes en $x^2$ ?", solution: "**Non**, dans les deux cas, car ces familles ne **séparent pas les points** : une fonction paire (ou un polynôme en $x^2$) prend la même valeur en $x$ et $-x$, donc ne distingue jamais $1$ et $-1$. Stone–Weierstrass exige la séparation des points ; son défaut est rédhibitoire. L'adhérence des polynômes en $x^2$ est exactement le sous-espace **fermé des fonctions paires** — dense dans les fonctions paires, mais pas dans tout $C([-1,1])$." },
    { tier: "challenge", prompt: "Soit $K$ compact et $(f_n) \\subset C(K)$ une suite équicontinue qui converge **simplement** vers $f$. Montre que $f$ est continue et que la convergence est en fait **uniforme**.", solution: "**Continuité de la limite** : par équicontinuité, pour $\\varepsilon > 0$ il existe $\\delta$ tel que $d(x,y) < \\delta \\Rightarrow |f_n(x) - f_n(y)| \\le \\varepsilon$ pour tout $n$ ; en passant à la limite simple, $|f(x) - f(y)| \\le \\varepsilon$, donc $f$ est (uniformément) continue. **Uniformité** : $K$ compact se couvre par un nombre fini de boules $B(x_i, \\delta)$. La convergence simple en chaque $x_i$ donne $N$ tel que $|f_n(x_i) - f(x_i)| \\le \\varepsilon$ pour $n \\ge N$, tous les $i$. Pour $x \\in B(x_i, \\delta)$ : $|f_n(x) - f(x)| \\le |f_n(x) - f_n(x_i)| + |f_n(x_i) - f(x_i)| + |f(x_i) - f(x)| \\le 3\\varepsilon$. Donc $\\lVert f_n - f \\rVert_\\infty \\le 3\\varepsilon$ pour $n \\ge N$ : convergence **uniforme**. L'équicontinuité transforme le simple en uniforme ■." },
    { tier: "exam", prompt: "(1) Énonce le théorème d'Ascoli–Arzelà. (2) Montre que la boule unité de $C^1([0,1])$ (fonctions avec $\\lVert f \\rVert_\\infty + \\lVert f' \\rVert_\\infty \\le 1$) est relativement compacte dans $C([0,1])$. (3) En déduire que l'inclusion $C^1([0,1]) \\hookrightarrow C([0,1])$ est un **opérateur compact**. (4) Pourquoi l'inclusion $C([0,1]) \\hookrightarrow C([0,1])$ (identité) n'est-elle, elle, pas compacte ?", solution: "(1) Une partie $\\mathcal{F} \\subset C(K)$ ($K$ compact) est relativement compacte pour $\\lVert \\cdot \\rVert_\\infty$ si et seulement si elle est **équicontinue** et **ponctuellement bornée**.\n\n(2) Soit $\\mathcal{B}$ la boule unité de $C^1$. Bornitude : $\\lVert f \\rVert_\\infty \\le 1$. Équicontinuité : par les accroissements finis, $|f(x) - f(y)| \\le \\lVert f' \\rVert_\\infty |x - y| \\le |x - y|$ pour toute $f \\in \\mathcal{B}$ ; le même $\\delta = \\varepsilon$ marche pour toutes — équicontinuité uniforme. Ascoli donne la **compacité relative** dans $C([0,1])$.\n\n(3) L'inclusion $\\iota : C^1 \\to C$ est linéaire continue, et elle envoie la boule unité de $C^1$ sur une partie **relativement compacte** de $C$ (par (2)). C'est exactement la définition d'un **opérateur compact**. La gain d'une dérivée bornée compactifie.\n\n(4) L'identité de $C([0,1])$ envoie la boule unité sur elle-même. Or en dimension infinie, la boule unité **n'est jamais compacte** (théorème de Riesz) — par exemple la famille $\\sin(nx)$ y vit sans sous-suite convergente. L'identité d'un espace de dimension infinie n'est donc jamais compacte ■." },
  ],
  practice: [
    { tier: "discovery", label: "Équicontinue sur [0,1] ?", make: (r) => {
      const opts = [
        { s: "f_n(x) = x/n", m: 1 }, { s: "f_n(x) = \\sin(nx)", m: 0 },
        { s: "f_n(x) = x^2/n", m: 1 }, { s: "f_n(x) = n\\,x", m: 0 },
        { s: "f_n(x) = \\cos(x)/n", m: 1 }, { s: "f_n(x) = x^n", m: 0 },
      ];
      const o = pick(r, opts);
      return { prompt: `La famille $${o.s}$ est-elle **équicontinue** sur $[0,1]$ ? (réponds $1$ pour oui, $0$ pour non)`, answer: o.m, solution: o.m ? "Oui : la pente est uniformément contrôlée (un même $\\delta$ marche pour tous les $n$), donc équicontinue." : "Non : la pente ou l'oscillation explose avec $n$, aucun $\\delta$ uniforme ne convient." };
    } },
    { tier: "warmup", label: "Borne uniforme de la famille", make: (r) => {
      const k = randint(r, 3, 4);
      const ns = Array.from({ length: k }, () => randint(r, 1, 9));
      const M = Math.max(...ns);
      return { prompt: `Une famille équicontinue $(f_1, \\ldots, f_${k})$ sur $[0,1]$ a pour normes uniformes $${ns.join(",\\ ")}$. Quelle est la borne $\\sup_i \\lVert f_i \\rVert_\\infty$ qui complète l'hypothèse d'Ascoli ?`, answer: M, solution: `La famille étant finie, la borne uniforme est le maximum des normes : $${M}$. Avec l'équicontinuité, Ascoli donne la compacité relative.` };
    } },
    { tier: "application", label: "Sépare les points ?", make: (r) => {
      const opts = [
        { s: "\\text{les polynômes sur } [0,1]", m: 1 },
        { s: "\\text{les fonctions paires sur } [-1,1]", m: 0 },
        { s: "\\text{les polynômes en } x^2 \\text{ sur } [-1,1]", m: 0 },
        { s: "\\text{les fonctions constantes}", m: 0 },
        { s: "\\text{les polynômes trigonométriques sur } \\mathbb{T}", m: 1 },
      ];
      const o = pick(r, opts);
      return { prompt: `Pour Stone–Weierstrass : la famille « $${o.s}$ » **sépare-t-elle les points** ? (réponds $1$ pour oui, $0$ pour non)`, answer: o.m, solution: o.m ? "Oui : pour deux points distincts, un élément de la famille prend des valeurs différentes — la condition clé de Stone–Weierstrass est satisfaite." : "Non : deux points distincts y reçoivent toujours la même valeur, la séparation échoue, donc la densité n'est pas garantie." };
    } },
  ],
};

export default [bairePiliers, hahnBanachDualite, ascoliStoneWeierstrass];
