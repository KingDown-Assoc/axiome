// Field "Discrete mathematics" — HIGH module (premiere year): the affine fit.
// Official première TECHNOLOGIQUE programme (also in enseignement scientifique;
// absent from the spécialité — the one big non-spé exclusive, integrated here
// because it is universally useful): scatter plot of a two-quantitative-variable
// statistical series, the MEAN POINT, determining and using an AFFINE FIT
// (several fits presented: by eye, Mayer's line, LEAST SQUARES — the line
// minimizing the sum of the squared vertical gaps, no theory expected),
// INTERPOLATION and EXTRAPOLATION of unknown values, and critical thinking
// about the relevance of the fit. Real contexts: health, economics,
// physics-chemistry calibration lines.
import { randint, pick } from "../../core/exercises.js";

const ajustementAffine = {
  id: "discrete.high.ajustement-affine",
  level: "high", domain: "discrete",
  title: "L'ajustement affine",
  tagline: "Faire passer la meilleure droite dans le nuage — puis savoir quand s'arrêter de prédire.",
  prereqs: ["geometry.high.droites-equations", "discrete.high.ecart-type"],
  intuition:
    "Croise deux variables **quantitatives** — taille et pointure, température et consommation : chaque individu devient un point, la série un **nuage de points**.\n\nSi le nuage s'allonge, une **droite d'ajustement** $y = ax + b$ le résume — et permet de **prédire** : la statistique devient machine à anticiper.",
  depths: {
    discovery:
      "**Avec les mains** : le **point moyen** $G(\\bar{x}\\,;\\,\\bar{y})$ — moyenne des abscisses, moyenne des ordonnées : le centre de gravité du nuage, et toute droite d'ajustement digne de ce nom passe par lui. Premier ajustement : **au jugé** — la règle posée à l'œil le long du nuage, par G : grossier mais honnête.",
    standard:
      "**En image** : deux méthodes outillées — **Mayer** coupe le nuage en deux moitiés (gauche, droite), calcule le point moyen de chacune, et trace la droite des deux points : robuste, calculable à la main ; les **moindres carrés** font mieux — parmi toutes les droites, choisir celle qui minimise la **somme des carrés des écarts verticaux** entre points et droite : ta calculatrice la donne, et le carré des écarts est exactement le geste de l'écart type — punir les grands écarts, sommer, minimiser : Gauss et Legendre s'en disputèrent la paternité, les satellites et les sondages l'utilisent chaque seconde.",
    advanced:
      "**Dans la tête** : prédire, oui — mais où ? **Interpoler** (estimer *entre* les points observés : la consommation à 12 °C quand on a mesuré de 0 à 20) est raisonnable : le nuage cautionne. **Extrapoler** (prédire *au-delà* : à 40 °C, en 2080…) est un saut de foi : rien ne garantit que la droite continue — les croissances saturent, les tendances cassent, et les pires erreurs de prévision sont des extrapolations confiantes. L'esprit critique du programme : un ajustement n'est pertinent que si le nuage est *vraiment* allongé, dans la *zone* observée, et tant que le mécanisme sous-jacent tient.",
  },
  keyIdea: "Nuage de points + **point moyen** $G(\\bar{x}\\,;\\,\\bar{y})$ (toute droite d'ajustement y passe). Ajustements : au jugé, **Mayer** (deux demi-nuages), **moindres carrés** (minimiser la somme des **carrés des écarts**). **Interpoler** : sûr ; **extrapoler** : danger.",
  why:
    "Pourquoi une leçon entière pour tracer une droite ? Parce que l'ajustement affine est la **première brique de toute modélisation empirique** : la droite d'étalonnage du chimiste, la tendance de l'économiste, la courbe dose-réponse du biologiste — et son grand piège est philosophique autant que technique : un bon ajustement montre une **corrélation**, jamais une **causalité** (les ventes de glaces et les noyades montent ensemble… parce qu'il fait chaud). Tracer la droite est facile ; savoir ce qu'elle autorise à dire est la vraie compétence.",
  examples: [
    { title: "Le point moyen", steps: [
      { p: "Cinq relevés (température ; consommation) : abscisses de moyenne 10, ordonnées de moyenne 60." },
      { p: "$G(10\\,;\\,60)$ — le centre de gravité du nuage : toute droite d'ajustement le traverse." },
    ] },
    { title: "Interpoler vs extrapoler", steps: [
      { p: "Mesures entre 0 et 20 °C, droite $y = -2x + 80$ : à 12 °C, prédire 56 — **interpolation**, le nuage cautionne." },
      { p: "À 50 °C, la droite dit $-20$ : une consommation négative — l'**extrapolation** vient de casser le modèle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Relevés (heures de révision ; note) : $(2\\,;\\,8)$, $(4\\,;\\,10)$, $(6\\,;\\,13)$, $(8\\,;\\,17)$. Calcule le point moyen et décris le nuage.", solution: "$\\bar{x} = \\frac{2+4+6+8}{4} = 5$, $\\bar{y} = \\frac{8+10+13+17}{4} = 12$ : $G(5\\,;\\,12)$ — nuage **allongé et croissant** : un ajustement affine a du sens, et sa droite passera par G." },
    { tier: "warmup", prompt: "Avec les mêmes données, applique la méthode de Mayer : points moyens des deux moitiés, puis pente de la droite.", solution: "Moitié gauche : $G_1(3\\,;\\,9)$ ; droite : $G_2(7\\,;\\,15)$ — pente $\\dfrac{15 - 9}{7 - 3} = $ **1,5** (et la droite $(G_1G_2)$ passe par G ✓) : chaque heure de révision rapporte environ 1,5 point — Mayer, l'ajustement du géomètre sans calculatrice." },
    { tier: "application", prompt: "La droite des moindres carrés donne $y = 1{,}5x + 4{,}5$. Estime la note pour 5 h de révision, puis pour 30 h. Laquelle des deux prédictions est légitime ?", solution: "5 h : $y = 12$ — **interpolation** (entre 2 et 8 h observées) : légitime. 30 h : $y = 49{,}5$… sur 20 ! — **extrapolation** absurde : la droite ignore que les notes saturent. Prédire dans le nuage, se méfier au-delà : la moitié du métier." },
    { tier: "challenge", prompt: "Que minimise exactement la droite des moindres carrés, et pourquoi des **carrés** ? Quel parent cette idée a-t-elle dans ton cours de statistiques ?", solution: "La **somme des carrés des écarts verticaux** entre chaque point et la droite — les carrés rendent tout positif et **punissent les grands écarts** (un point très loin pèse énormément) : exactement le geste de l'**écart type**, qui moyenne des carrés d'écarts à la moyenne. La droite des moindres carrés est à un nuage ce que la moyenne est à une série : le résumé qui minimise les carrés — Gauss recyclait la même idée partout." },
    { tier: "exam", prompt: "Les ventes de glaces et le nombre de noyades, relevés mois par mois, donnent un nuage très allongé et un excellent ajustement affine croissant. Peut-on conclure que les glaces causent les noyades ? Analyse le piège et donne la variable cachée — puis énonce la règle générale.", solution: "**Non** — la corrélation est réelle, la causalité est fausse : la **chaleur estivale** (variable cachée) augmente *à la fois* les glaces et les baignades, donc les noyades — les deux variables montent ensemble sans que l'une agisse sur l'autre. Règle : un ajustement, même parfait, montre une **corrélation** ; la **causalité** exige un mécanisme, ou une expérience contrôlée. Confondre les deux est l'erreur statistique la plus exploitée du débat public — et le programme te demande explicitement cet esprit critique : la droite décrit, elle ne prouve pas." },
  ],
  practice: [
    { tier: "warmup", label: "Le point moyen", make: (r) => {
      const xs = [randint(r, 1, 4), randint(r, 5, 8)]; const ys = [randint(r, 4, 10), randint(r, 10, 18)];
      return { prompt: `Points $(${xs[0]}\\,;\\,${ys[0]})$ et $(${xs[1]}\\,;\\,${ys[1]})$ : abscisse du point moyen ? (décimal si besoin)`, answer: (xs[0] + xs[1]) / 2, solution: `$\\bar{x} = \\frac{${xs[0]} + ${xs[1]}}{2} = $ **${String((xs[0] + xs[1]) / 2).replace(".", ",")}**.` };
    } },
    { tier: "application", label: "Prédire par la droite", make: (r) => {
      const a = pick(r, [1.5, 2, 2.5, 3]); const b = randint(r, 2, 8); const x = randint(r, 2, 9);
      return { prompt: `Ajustement $y = ${String(a).replace(".", ",")}x + ${b}$ : prédiction pour $x = ${x}$ ? (décimal si besoin)`, answer: a * x + b, solution: `$${String(a).replace(".", ",")} \\times ${x} + ${b} = $ **${String(a * x + b).replace(".", ",")}** — légitime si ${x} est dans la zone observée.` };
    } },
    { tier: "challenge", label: "Interpoler ou extrapoler ?", make: (r) => {
      const lo = randint(r, 0, 4); const hi = lo + randint(r, 8, 15);
      const inside = r() < 0.5;
      const x = inside ? randint(r, lo + 1, hi - 1) : hi + randint(r, 5, 20);
      return { prompt: `Mesures entre $x = ${lo}$ et $x = ${hi}$ ; on prédit en $x = ${x}$ : interpolation (1) ou extrapolation (0) ?`, answer: inside ? 1 : 0, solution: `${x} est ${inside ? "**dans** la zone observée : interpolation — le nuage cautionne" : "**hors** de la zone : extrapolation — danger, rien ne garantit que la droite continue"}.` };
    } },
  ],
};

export default [ajustementAffine];
