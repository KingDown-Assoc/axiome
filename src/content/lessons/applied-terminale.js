// Field "Applied mathematics" — HIGH module (terminale year): the Lorenz curve
// and the Gini index. Official terminale MATHS COMPLÉMENTAIRES programme, theme
// "Répartition des richesses, inégalités" (absent from the spécialité — the
// big non-spé exclusive, integrated here because it is the showcase of applied
// integral calculus and convexity): the LORENZ CURVE on real data —
// presentation, definition (cumulative share of total wealth held by the
// poorest fraction x of the population), reading, properties (increasing,
// convex, below the bisector y = x, from (0,0) to (1,1)); the GINI INDEX —
// definition as twice the area between the bisector and the Lorenz curve,
// computation 1 − 2∫L, interpretation as a degree-of-inequality measure
// (0 = perfect equality, →1 = extreme concentration). The spécialité lists the
// Lorenz curve as a possible deepening of convexity: both tracks meet here.
import { randint, pick } from "../../core/exercises.js";

const lorenzGini = {
  id: "applied.high.lorenz-gini",
  level: "high", domain: "applied",
  title: "Courbe de Lorenz et indice de Gini",
  tagline: "Les inégalités, dessinées par une courbe convexe — et mesurées par une aire.",
  prereqs: ["analysis.high.integrale", "analysis.high.convexite"],
  intuition:
    "Comment **dessiner** la répartition des richesses d'un pays ? La **courbe de Lorenz** : en abscisse, la part cumulée de la population (des plus pauvres aux plus riches) ; en ordonnée, la part cumulée de la richesse qu'elle détient.\n\nLecture : $L(0{,}5) = 0{,}2$ signifie « les 50 % les plus pauvres détiennent 20 % du total » — toute l'inégalité d'un pays, dans une courbe.",
  depths: {
    discovery:
      "**Avec les mains** : les deux repères — l'**égalité parfaite** serait la diagonale $y = x$ (chaque moitié détient sa moitié : la bissectrice) ; la réalité passe **en dessous** : les premiers déciles cumulent moins que leur part, les derniers rattrapent tout — la courbe part de $(0\\,;\\,0)$, arrive en $(1\\,;\\,1)$ (tout le monde détient tout), et **plus elle se creuse, plus l'inégalité règne**.",
    standard:
      "**En image** : pourquoi la courbe est-elle **convexe** ? Parce qu'on a rangé la population du plus pauvre au plus riche : chaque fraction supplémentaire de population ajoute *plus* de richesse que la précédente — la **pente croît** : c'est ta caractérisation de la convexité ($L'$ croissante), appliquée à l'économie : la forme de la courbe n'est pas un hasard, c'est un théorème de tri.",
    advanced:
      "**Dans la tête** : mesurer le creux — l'**indice de Gini** est le rapport de l'aire entre la bissectrice et la courbe à l'aire du triangle sous la bissectrice ($\\frac{1}{2}$) : $G = 2\\int_0^1 (x - L(x))\\,dx = 1 - 2\\int_0^1 L(x)\\,dx$ — ton calcul intégral, embauché par l'économie. $G = 0$ : égalité parfaite (la courbe colle à la diagonale) ; $G \\to 1$ : un seul détient tout (la courbe rase le sol puis bondit). Ordres de grandeur réels : revenus — Norvège $\\approx 0{,}25$, France $\\approx 0{,}30$, Brésil $\\approx 0{,}53$ ; et les **patrimoines** sont partout plus inégaux que les revenus ($G$ souvent $> 0{,}6$). Garde l'esprit critique du statisticien : Gini **résume** — deux pays de même indice peuvent différer du tout au tout (inégalité chez les pauvres ou chez les riches ?), et comparer des Gini exige les mêmes définitions (revenus avant ou après impôts ?) : un indice éclaire, il ne juge pas seul.",
  },
  keyIdea: "Lorenz : $L(x) = $ part de richesse des $100x\\,\\%$ les plus pauvres — croissante, **convexe** (le tri fait croître la pente), sous la bissectrice, de $(0\\,;\\,0)$ à $(1\\,;\\,1)$. **Gini** : $G = 2 \\times$ aire entre bissectrice et courbe $= 1 - 2\\int_0^1 L(x)\\,dx$ — de 0 (égalité) vers 1 (concentration extrême).",
  why:
    "Pourquoi une leçon d'économie en mathématiques ? Parce que c'est le plus beau cas d'école du programme : la **convexité** y est un théorème de tri, l'**intégrale** une mesure sociale — tes deux chapitres d'analyse, embauchés par le débat public. L'indice de Gini est cité dans chaque rapport sur les inégalités, chaque comparaison internationale : savoir d'où il vient — une aire entre deux courbes — c'est pouvoir lire ces débats en mathématicien, et repérer quand on lui fait dire plus qu'il ne mesure.",
  examples: [
    { title: "Lire la courbe", steps: [
      { p: "$L(0{,}5) = 0{,}2$ : les 50 % les plus pauvres détiennent **20 %** du total." },
      { p: "Et $1 - L(0{,}9) = 0{,}45$ : les 10 % les plus riches en détiennent 45 — la courbe se lit aux deux bouts." },
    ] },
    { title: "Gini par l'intégrale", steps: [
      { p: "$L(x) = x^2$ : $\\int_0^1 x^2\\,dx = \\frac{1}{3}$ — donc $G = 1 - \\frac{2}{3} = \\frac{1}{3}$." },
      { p: "Un tiers du chemin vers la concentration totale — l'aire a quantifié le creux." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur une courbe de Lorenz, on lit $L(0{,}5) = 0{,}2$ et $L(0{,}9) = 0{,}55$. Traduis ces deux valeurs en phrases, puis donne la part des 10 % les plus riches.", solution: "Les **50 % les plus pauvres** détiennent **20 %** de la richesse ; les 90 % les plus pauvres, 55 % — donc les **10 % les plus riches** détiennent $1 - 0{,}55 = $ **45 %** : la courbe se lit par cumul, et son complément raconte le sommet." },
    { tier: "warmup", prompt: "Pourquoi la courbe de Lorenz est-elle toujours sous la bissectrice $y = x$, et que signifierait une courbe confondue avec elle ?", solution: "La population est triée du plus pauvre au plus riche : les premiers $100x\\,\\%$ détiennent **au plus** leur part proportionnelle $x$ (sinon ils ne seraient pas les plus pauvres !) : $L(x) \\leq x$ ✓. Confondue avec la diagonale : chaque fraction détient exactement sa part — l'**égalité parfaite**, et $G = 0$." },
    { tier: "application", prompt: "Explique pourquoi la courbe de Lorenz est convexe, en invoquant ta caractérisation par la dérivée.", solution: "Le tri du plus pauvre au plus riche fait que chaque tranche de population supplémentaire apporte **plus** de richesse que la précédente : la pente $L'$ (la richesse marginale de la tranche) est **croissante** — et $L'$ croissante, c'est exactement ta caractérisation de la **convexité** ✓ : la forme de la courbe est un théorème de tri, pas un accident des données." },
    { tier: "challenge", prompt: "Calcule l'indice de Gini pour la courbe modèle $L(x) = x^2$, et interprète.", solution: "$G = 1 - 2\\int_0^1 x^2\\,dx = 1 - 2 \\times \\frac{1}{3} = \\frac{1}{3}$ — un pays où les 50 % les plus pauvres détiennent $0{,}5^2 = 25\\,\\%$ : inégalité modérée (entre la Norvège et le Brésil réels) — l'aire entre diagonale et parabole, devenue indicateur social." },
    { tier: "exam", prompt: "Un pays a pour courbe de Lorenz $L(x) = 0{,}3x + 0{,}7x^3$. Vérifie que $L(0) = 0$, $L(1) = 1$ et que $L$ est convexe sur $[0\\,;\\,1]$, calcule l'indice de Gini, puis la part détenue par les 50 % les plus pauvres — et compare à l'égalité parfaite.", solution: "$L(0) = 0$ ✓, $L(1) = 0{,}3 + 0{,}7 = 1$ ✓ ; $L''(x) = 4{,}2x \\geq 0$ sur $[0\\,;\\,1]$ : **convexe** ✓ — une courbe de Lorenz légitime. Gini : $\\int_0^1 L = \\left[0{,}15x^2 + 0{,}175x^4\\right]_0^1 = 0{,}325$, donc $G = 1 - 0{,}65 = $ **0,35** — l'ordre de grandeur de la France pour les revenus. Et $L(0{,}5) = 0{,}15 + 0{,}0875 \\approx $ **23,75 %** pour la moitié la plus pauvre — contre 50 % en égalité parfaite : convexité vérifiée par $L''$, inégalité mesurée par l'intégrale — tes deux chapitres d'analyse au service d'une question de société, et c'est tout l'esprit de cette leçon." },
  ],
  practice: [
    { tier: "warmup", label: "Lire Lorenz", make: (r) => {
      const x = pick(r, [50, 80, 90]); const l = x === 50 ? randint(r, 15, 30) : x === 80 ? randint(r, 40, 60) : randint(r, 55, 75);
      return { prompt: `$L(${String(x / 100).replace(".", ",")}) = ${String(l / 100).replace(".", ",")}$ : quelle part (en %) détiennent les ${100 - x} % les plus riches ?`, answer: 100 - l, solution: `$1 - ${String(l / 100).replace(".", ",")} = $ **${100 - l} %** — le complément raconte le sommet.` };
    } },
    { tier: "application", label: "Gini en deux camps", make: (r) => {
      const g = pick(r, [[0.25, 0.53], [0.3, 0.6], [0.27, 0.5]]);
      const quoi = r() < 0.5;
      return { prompt: `Pays A : $G = ${String(g[0]).replace(".", ",")}$ ; pays B : $G = ${String(g[1]).replace(".", ",")}$ — lequel est le plus inégalitaire ? (A = 0, B = 1)`, answer: 1, solution: `Gini plus **grand** = courbe plus creusée = plus inégalitaire : **B** — l'indice ordonne, de 0 (égalité) vers 1.` };
    } },
    { tier: "challenge", label: "Gini par l'aire", make: (r) => {
      const n = pick(r, [2, 3, 4]);
      const integ = 1 / (n + 1);
      const g = Math.round((1 - 2 * integ) * 100) / 100;
      return { prompt: `$L(x) = x^{${n}}$ : $\\displaystyle\\int_0^1 L = \\frac{1}{${n + 1}}$ — que vaut Gini $= 1 - 2\\int L$ ? (décimal)`, answer: g, solution: `$1 - \\frac{2}{${n + 1}} = $ **${String(g).replace(".", ",")}** — l'exposant creuse la courbe, Gini grimpe.` };
    } },
  ],
};

export default [lorenzGini];
