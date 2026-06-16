// Field "Probability" — HIGH module (premiere year), part 2: random variables
// and sampling. Official première spécialité programme. RANDOM VARIABLES:
// modelling the numerical outcome of a random experiment, FORMALIZED as a
// function defined on the universe with real values; notations {X = a},
// {X ⩽ a}, P(X = a), P(X ⩽ a); the LAW of a random variable; EXPECTATION,
// VARIANCE, STANDARD DEVIATION; LINEARITY of expectation; KÖNIG-HUYGENS
// formula; fair-game stakes; official algorithms: E/V/σ of a random variable,
// frequency of letters in a French or English text. EXPERIMENTATIONS section:
// simulating samples with Python, the mean of a size-n sample of a random
// variable, the distance between sample mean and expectation, the proportion of
// samples whose mean deviates from μ by at most 2σ/√n — the principle of
// estimating an expectation by an observed mean.
import { randint, pick } from "../../core/exercises.js";

// — Random variables (programme: loi, espérance, variance, König-Huygens) —
const variablesAleatoires = {
  id: "probability.high.variables-aleatoires",
  level: "high", domain: "probability",
  title: "Variables aléatoires : espérance et écart type",
  tagline: "Le hasard prend des valeurs — et sa moyenne de long terme se calcule d'avance.",
  prereqs: ["probability.high.bernoulli", "discrete.high.ecart-type"],
  intuition:
    "Un jeu rapporte $+5$ € ou $-2$ € selon le dé : le **gain** est une **variable aléatoire** $X$ — formellement, une *fonction* qui à chaque issue de l'univers associe un nombre réel.\n\nSa **loi** liste les valeurs possibles et leurs probabilités ; son **espérance** $E(X)$ — la moyenne pondérée par les probabilités — prédit la moyenne de long terme.",
  depths: {
    discovery:
      "**Avec les mains** : le vocabulaire au travail — $\\{X = 5\\}$ est l'**événement** « le gain vaut 5 » (l'ensemble des issues que $X$ envoie sur 5), et $P(X = 5)$ sa probabilité ; $\\{X \\leq 0\\}$ regroupe les issues perdantes. La **loi** se dresse en tableau : valeurs en haut, probabilités en bas — somme des probabilités : 1, toujours.",
    standard:
      "**En image** : l'espérance pèse — $E(X) = \\sum x_i\\,p_i$ : chaque valeur, multipliée par sa probabilité, sommée. Le jeu « $+5$ si le dé donne 6, $-2$ sinon » : $E(X) = 5 \\times \\frac{1}{6} + (-2) \\times \\frac{5}{6} = -\\frac{5}{6}$ — **défavorable** : en moyenne, tu perds 83 centimes par partie. Un jeu est **équitable** si $E(X) = 0$ : l'espérance fixe la mise juste — et la **loi de Bernoulli** (valeurs 0 et 1, paramètre $p$) donne le cas le plus pur : $E(X) = p$.",
    advanced:
      "**Dans la tête** : la dispersion du hasard — la **variance** $V(X) = E\\big((X - E(X))^2\\big)$ moyenne les carrés des écarts à l'espérance (ton écart type de seconde, version probabiliste !), et $\\sigma(X) = \\sqrt{V(X)}$ revient à l'unité : deux jeux de même espérance peuvent différer du tout au tout en *risque* — c'est $\\sigma$ qui les départage, et la finance entière mesure le risque ainsi. Deux théorèmes huilent les calculs : la **linéarité de l'espérance** ($E(aX + b) = a\\,E(X) + b$ — doubler les gains double l'espérance, une prime fixe s'ajoute telle quelle), et **König-Huygens** : $V(X) = E(X^2) - E(X)^2$ — la moyenne des carrés moins le carré de la moyenne : la formule qui évite de calculer chaque écart, héritée de la mécanique (Huygens calculait des moments d'inertie). Et l'algorithme officiel le plus élégant : la **fréquence des lettres** d'un texte — le E écrase tout en français, et cette loi de probabilité empirique a cassé tous les chiffrements par substitution.",
  },
  keyIdea: "$X$ : une **fonction** de l'univers vers $\\mathbb{R}$ ; sa loi : valeurs et probabilités (somme 1). $E(X) = \\sum x_i p_i$ — la moyenne de long terme ; jeu équitable : $E = 0$. $V(X) = E\\big((X - E(X))^2\\big) = E(X^2) - E(X)^2$ (König-Huygens), $\\sigma = \\sqrt{V}$ ; et $E(aX + b) = aE(X) + b$.",
  why:
    "Pourquoi formaliser le gain d'un jeu ? Parce que la variable aléatoire est le pont entre probabilités et **décisions** : l'assureur tarife à l'espérance des sinistres, le casino vit d'espérances négatives pour le joueur, l'investisseur arbitre espérance contre écart type. Quantifier *combien* le hasard rapporte et *combien* il secoue — c'est exactement ce que E et σ font, et la moitié de l'économie moderne repose sur ce couple.",
  examples: [
    { title: "L'espérance du jeu", steps: [
      { p: "Gain : $+5$ si le dé fait 6, $-2$ sinon — loi : $5$ avec $\\frac{1}{6}$, $-2$ avec $\\frac{5}{6}$." },
      { p: "$E(X) = \\frac{5}{6} - \\frac{10}{6} = -\\frac{5}{6} \\approx -0{,}83$ € — le long terme est écrit d'avance." },
    ] },
    { title: "König-Huygens au travail", steps: [
      { p: "$X$ : valeurs 0 et 10, équiprobables — $E(X) = 5$, $E(X^2) = \\frac{0 + 100}{2} = 50$." },
      { p: "$V(X) = 50 - 25 = 25$, $\\sigma = 5$ — la moyenne des carrés moins le carré de la moyenne." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un jeu : $+5$ € si le dé donne 6, $-2$ € sinon. Dresse la loi de $X$ (le gain) et vérifie que les probabilités somment à 1.", solution: "Loi : $X = 5$ avec $P = \\frac{1}{6}$, $X = -2$ avec $P = \\frac{5}{6}$ — somme : $\\frac{1}{6} + \\frac{5}{6} = 1$ ✓. La variable aléatoire est la *fonction* qui traduit chaque issue en euros ; sa loi, le tableau valeurs-probabilités." },
    { tier: "warmup", prompt: "Calcule $E(X)$ pour ce jeu, et dis s'il est favorable au joueur. Quelle mise d'entrée le rendrait équitable ?", solution: "$E(X) = 5 \\times \\frac{1}{6} + (-2) \\times \\frac{5}{6} = -\\frac{5}{6} \\approx $ **−0,83 €** : défavorable — sur mille parties, environ 830 € de perte. Équitable ⟺ $E = 0$ : il faudrait *recevoir* $\\frac{5}{6}$ € par partie — l'espérance fixe le juste prix." },
    { tier: "application", prompt: "$X$ suit une loi de Bernoulli de paramètre $p$ (valeurs 0 et 1). Démontre que $E(X) = p$, puis calcule $V(X)$ par König-Huygens.", solution: "$E(X) = 0 \\times (1 - p) + 1 \\times p = p$ ✓. Et $X^2 = X$ (0² = 0, 1² = 1 !) donc $E(X^2) = p$ : $V(X) = p - p^2 = p(1-p)$ — maximale en $p = \\frac{1}{2}$ : le pile-ou-face équilibré est le hasard le plus dispersé." },
    { tier: "challenge", prompt: "Un billet de loterie coûte 2 € ; le gain brut $G$ a pour espérance $E(G) = 1{,}20$ €. Avec la linéarité, calcule l'espérance du gain net $N = G - 2$, puis celle de $10N$ (dix billets).", solution: "$E(N) = E(G) - 2 = $ **−0,80 €** (la constante glisse hors de l'espérance) ; $E(10N) = 10 \\times (-0{,}8) = $ **−8 €** — la linéarité enchaîne sans recalculer la loi : multiplier les billets multiplie la perte attendue, jamais ne l'inverse." },
    { tier: "exam", prompt: "Deux placements de même espérance $E = 5$ % : A donne 4 % ou 6 % équiprobables, B donne $-10$ % ou $+20$ % équiprobables. Calcule $\\sigma$ pour chacun (König-Huygens) et explique ce que l'écart type ajoute à l'espérance dans la décision.", solution: "A : $E(X^2) = \\frac{16 + 36}{2} = 26$, $V = 26 - 25 = 1$, $\\sigma_A = $ **1 %**. B : $E(X^2) = \\frac{100 + 400}{2} = 250$, $V = 250 - 25 = 225$, $\\sigma_B = $ **15 %**. Même espérance, risques sans commune mesure : A fluctue d'un point, B peut perdre 10 % — l'espérance dit le *rendement moyen*, l'écart type dit la *secousse* : la finance appelle ça le couple rendement-risque, et c'est exactement E et σ. König-Huygens a fait tous les calculs en deux lignes." },
  ],
  practice: [
    { tier: "warmup", label: "L'espérance pesée", make: (r) => {
      const g = pick(r, [6, 10, 12]); const p = pick(r, [2, 3]);
      return { prompt: `$X = ${g}$ avec probabilité $\\frac{1}{${p}}$, sinon $X = 0$ : que vaut $E(X)$ ?`, answer: g / p, solution: `$${g} \\times \\frac{1}{${p}} = $ **${g / p}** — la valeur, pondérée par sa chance.` };
    } },
    { tier: "application", label: "La linéarité", make: (r) => {
      const e = randint(r, 2, 8); const a = pick(r, [2, 3, 5]); const b = randint(r, -4, 6);
      return { prompt: `$E(X) = ${e}$ : que vaut $E(${a}X ${b >= 0 ? "+ " + b : "- " + (-b)})$ ?`, answer: a * e + b, solution: `Linéarité : $${a} \\times ${e} ${b >= 0 ? "+ " + b : "- " + (-b)} = $ **${a * e + b}**.` };
    } },
    { tier: "challenge", label: "König-Huygens", make: (r) => {
      const e = pick(r, [2, 3, 5]); const e2 = e * e + pick(r, [1, 4, 9, 16]);
      return { prompt: `$E(X) = ${e}$ et $E(X^2) = ${e2}$ : que vaut $V(X)$ ?`, answer: e2 - e * e, solution: `$V = E(X^2) - E(X)^2 = ${e2} - ${e * e} = $ **${e2 - e * e}** — la moyenne des carrés moins le carré de la moyenne.` };
    } },
  ],
};

// — Sampling and estimation (programme: Expérimentations, 2σ/√n) —
const echantillonnage = {
  id: "probability.high.echantillonnage",
  level: "high", domain: "probability",
  title: "Échantillonnage et estimation",
  tagline: "La moyenne d'un échantillon approche l'espérance, avec une précision en 1/√n.",
  prereqs: ["probability.high.variables-aleatoires", "logic.high.listes"],
  intuition:
    "L'espérance prédit le long terme — mais en pratique, on observe un **échantillon** : $n$ réalisations de $X$, et leur **moyenne** $m$.\n\nLa simulation montre le miracle : $m$ **vise** $E(X)$, d'autant plus précisément que $n$ grandit — c'est le principe de l'**estimation** : observer un échantillon pour deviner l'espérance cachée.",
  depths: {
    discovery:
      "**Avec les mains** : simule — une fonction Python tire $n$ valeurs de $X$ (tes listes !) et renvoie leur moyenne ; lance-la pour $n = 10$, $100$, $10\\,000$ : la moyenne tangue, puis se stabilise vers $E(X)$ — la loi des grands nombres de seconde, revue depuis le sommet : tu *connais* maintenant la cible ($E(X) = 3{,}5$ pour le dé) et tu *regardes* l'échantillon la viser.",
    standard:
      "**En image** : la précision se mesure — simule $N$ échantillons de taille $n$ et regarde la **dispersion des moyennes** : elles s'étalent autour de $\\mu = E(X)$ avec un écart type d'environ $\\dfrac{\\sigma}{\\sqrt{n}}$ — diviser l'erreur par 10 exige **cent fois** plus de données : la racine est le prix de la précision, gravé dans toutes les sciences expérimentales.",
    advanced:
      "**Dans la tête** : l'expérimentation officielle du programme — compte la **proportion des échantillons** dont la moyenne s'écarte de $\\mu$ d'au plus $\\dfrac{2\\sigma}{\\sqrt{n}}$ : la simulation s'obstine autour de **95 %** — l'immense majorité des échantillons tombe dans ce couloir. Renverse la lecture : si 95 % des moyennes sont près de $\\mu$, alors $\\mu$ est près de la moyenne *observée* — voilà pourquoi un sondage de 1 000 personnes annonce « ±3 points » (c'est $\\frac{1}{\\sqrt{1000}}$ !), pourquoi le physicien répète ses mesures, pourquoi le contrôle qualité échantillonne : **estimer, c'est encadrer l'invisible par le visible**, et la terminale donnera à ce 95 % ses lettres de noblesse (concentration, intervalles de fluctuation).",
  },
  keyIdea: "La moyenne $m$ d'un échantillon de taille $n$ **estime** $\\mu = E(X)$ — dispersion des moyennes $\\approx \\dfrac{\\sigma}{\\sqrt{n}}$ : précision en racine ($\\times 100$ données pour $\\div 10$ d'erreur). Environ **95 %** des échantillons vérifient $|m - \\mu| \\leq \\dfrac{2\\sigma}{\\sqrt{n}}$.",
  why:
    "Pourquoi simuler ce que la théorie prédit ? Parce que l'estimation est le geste fondateur de toute science empirique : on ne connaît jamais $\\mu$ — on l'**encadre** par des observations. Sondages, essais cliniques, mesures de constantes physiques : tous répondent à la même question (combien d'observations pour quelle précision ?), et la réponse — $\\frac{2\\sigma}{\\sqrt{n}}$ — est la formule la plus utilisée de la statistique mondiale : ce chapitre est ton premier pas d'expérimentateur quantitatif.",
  examples: [
    { title: "La moyenne qui vise", steps: [
      { p: "Dé : $E(X) = 3{,}5$ — échantillons simulés : $n = 10$ donne $m = 4{,}1$ ; $n = 10\\,000$ donne $m = 3{,}502$." },
      { p: "La moyenne observée converge vers l'espérance — la loi des grands nombres, vue d'en haut." },
    ] },
    { title: "Le couloir des 95 %", steps: [
      { p: "$\\sigma \\approx 1{,}71$ pour le dé, $n = 100$ : couloir $3{,}5 \\pm \\frac{2 \\times 1{,}71}{10} = 3{,}5 \\pm 0{,}34$." },
      { p: "Simule 1 000 échantillons : environ **950** moyennes tombent dedans — le hasard respecte son couloir." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris une fonction Python (en français structuré) qui simule la moyenne d'un échantillon de $n$ lancers de dé. Que renvoie-t-elle pour $n$ petit, pour $n$ immense ?", solution: "« Fonction moyenne(n) : créer la liste de $n$ tirages entiers entre 1 et 6 ; renvoyer la somme divisée par $n$ » — pour $n = 10$, des valeurs qui tanguent (3,1… 4,2…) ; pour $n = 100\\,000$, des valeurs collées à **3,5** $= E(X)$ : la moyenne observée vise l'espérance." },
    { tier: "warmup", prompt: "Pour le dé, $\\sigma \\approx 1{,}71$. Calcule la demi-largeur du couloir $\\frac{2\\sigma}{\\sqrt{n}}$ pour $n = 100$, puis $n = 10\\,000$. Que constates-tu ?", solution: "$n = 100$ : $\\frac{2 \\times 1{,}71}{10} \\approx $ **0,34** ; $n = 10\\,000$ : $\\frac{3{,}42}{100} \\approx $ **0,034** — cent fois plus de données, erreur divisée par **10** seulement : la précision se paie en racine carrée." },
    { tier: "application", prompt: "On simule 1 000 échantillons de taille 100 d'une variable d'espérance $\\mu$ et d'écart type $\\sigma$. Environ combien d'échantillons auront une moyenne dans $\\left[\\mu - \\frac{2\\sigma}{\\sqrt{100}}\\,;\\,\\mu + \\frac{2\\sigma}{\\sqrt{100}}\\right]$ ?", solution: "Environ **950** — la proportion des écarts inférieurs à $\\frac{2\\sigma}{\\sqrt{n}}$ s'obstine autour de **95 %** : c'est l'observation centrale de l'expérimentation du programme, et le futur « intervalle de fluctuation » de terminale." },
    { tier: "challenge", prompt: "Un sondage interroge 1 000 personnes : 52 % votent A. Avec $\\sigma \\leq 0{,}5$ pour une proportion, calcule la demi-largeur $\\frac{2\\sigma}{\\sqrt{n}}$ et discute : A est-il sûr de gagner ?", solution: "$\\frac{2 \\times 0{,}5}{\\sqrt{1000}} \\approx $ **0,032** — le fameux « ±3 points » : le vrai score est vraisemblablement entre 49 et 55 % — **non**, 52 % à ±3 ne garantit rien : l'intervalle chevauche les 50 %. Tout sondage honnête publie cette marge ; tout lecteur armé la vérifie." },
    { tier: "exam", prompt: "Explique le principe de l'estimation : pourquoi la moyenne d'un échantillon renseigne-t-elle sur l'espérance inconnue, quel rôle joue $\\frac{2\\sigma}{\\sqrt{n}}$, et pourquoi quadrupler $n$ ne fait que doubler la précision ? Illustre avec le sondage.", solution: "Si l'on connaissait $\\mu$, 95 % des moyennes d'échantillons tomberaient à moins de $\\frac{2\\sigma}{\\sqrt{n}}$ d'elle — **renversement** : ayant observé $m$, on parie (à 95 %) que $\\mu$ est à moins de $\\frac{2\\sigma}{\\sqrt{n}}$ de $m$ : l'invisible encadré par le visible. La largeur décroît en $\\frac{1}{\\sqrt{n}}$ : quadrupler l'échantillon divise l'erreur par $\\sqrt{4} = 2$ seulement — c'est pourquoi les sondages plafonnent vers 1 000 personnes (±3 points suffisent, et 100 fois plus cher n'achèterait qu'un facteur 10). Estimer = observer + encadrer + payer la racine : le métier de toute science quantitative." },
  ],
  practice: [
    { tier: "warmup", label: "Le couloir calculé", make: (r) => {
      const sig = pick(r, [1, 2, 3]); const n = pick(r, [4, 16, 100]);
      return { prompt: `$\\sigma = ${sig}$, $n = ${n}$ : demi-largeur $\\frac{2\\sigma}{\\sqrt{n}}$ ? (décimal)`, answer: 2 * sig / Math.sqrt(n), solution: `$\\frac{2 \\times ${sig}}{${Math.sqrt(n)}} = $ **${String(2 * sig / Math.sqrt(n)).replace(".", ",")}**.` };
    } },
    { tier: "application", label: "Les 95 %", make: (r) => {
      const N = pick(r, [200, 1000, 2000]);
      return { prompt: `On simule ${N} échantillons : environ combien ont leur moyenne dans le couloir $\\mu \\pm \\frac{2\\sigma}{\\sqrt{n}}$ ?`, answer: N * 0.95, solution: `Environ 95 % : **${N * 0.95}** — le couloir des deux sigmas.` };
    } },
    { tier: "challenge", label: "Payer la racine", make: (r) => {
      const k = pick(r, [4, 9, 100]);
      return { prompt: `On multiplie la taille d'échantillon par ${k} : l'erreur d'estimation est divisée par combien ?`, answer: Math.sqrt(k), solution: `Par $\\sqrt{${k}} = $ **${Math.sqrt(k)}** — la précision se paie en racine carrée.` };
    } },
  ],
};

export default [variablesAleatoires, echantillonnage];
