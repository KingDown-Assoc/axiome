// Field "Probability" — HIGH module (terminale year), part 1: the binomial law
// and sums of random variables. Official terminale spécialité programme.
// BINOMIAL: model of a succession of independent trials (the probability of an
// outcome is the product), Bernoulli trial and law, BERNOULLI SCHEME
// (repetition of n identical independent trials), the binomial law ℬ(n, p) as
// the law of the number of successes, expressed with binomial coefficients —
// REQUIRED PROOF: the probability of k successes —, threshold/comparison/
// optimization problems; official algorithms: GALTON board simulation, the
// OVERBOOKING problem (largest n with P(X > capacity) ≤ α), sample simulation.
// SUMS: E(X + Y) = E(X) + E(Y), E(aX) = aE(X); for independent variables,
// V(X + Y) = V(X) + V(Y); application to the binomial — REQUIRED PROOF:
// expectation and variance of ℬ(n, p) by decomposition into Bernoulli
// variables —; sample of size n of a law, the mean variable M_n with
// E(M_n) = μ and V(M_n) = V/n.
import { randint, pick } from "../../core/exercises.js";

const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
const binom = (n, k) => fact(n) / (fact(k) * fact(n - k));

// — The binomial law (programme: schéma de Bernoulli, P(X = k)) —
const binomiale = {
  id: "probability.high.binomiale",
  level: "high", domain: "probability",
  title: "La loi binomiale",
  tagline: "n épreuves, k succès — le triangle de Pascal pèse chaque destin.",
  prereqs: ["probability.high.bernoulli", "discrete.high.combinaisons"],
  intuition:
    "Répète $n$ fois la même épreuve de Bernoulli, indépendamment : c'est le **schéma de Bernoulli** — et compte les succès : la variable $X$ suit la **loi binomiale** $\\mathcal{B}(n, p)$.\n\nLa formule complète ce que ta première comptait à la main : $P(X = k) = \\dbinom{n}{k} p^k (1-p)^{n-k}$ — le nombre de chemins, fois le poids de chacun.",
  depths: {
    discovery:
      "**Avec les mains** : la première rencontrait ses limites à $n = 4$ (l'arbre à 16 branches…) — la binomiale les pulvérise : $P(X = k)$ pour $n = 50$, $k = 20$ se calcule sans dessiner une branche, car les deux ingrédients sont connus : tes **combinaisons** comptent les chemins, ton **schéma** pèse chacun.",
    standard:
      "**En image** : la loi au travail — un QCM de 10 questions à 4 choix, réponses au hasard ($p = 0{,}25$) : $P(X = 5) = \\binom{10}{5}(0{,}25)^5(0{,}75)^5 \\approx 0{,}058$ — et les **cumuls** répondent aux vraies questions : $P(X \\geq 5) \\approx 0{,}078$ : moins de 8 % de chances d'avoir la moyenne au hasard — les problèmes de **seuil** (combien d'essais pour garantir…), de comparaison, d'optimisation se traitent tous par ces sommes.",
    advanced:
      "**Dans la tête** : la démonstration exigible — pourquoi $\\dbinom{n}{k} p^k(1-p)^{n-k}$ ? Un chemin de l'arbre réalisant **exactement** $k$ succès traverse $k$ branches de probabilité $p$ et $n - k$ branches de probabilité $1 - p$ : l'indépendance multiplie — chaque tel chemin pèse $p^k(1-p)^{n-k}$, **quel que soit l'ordre** ; et combien de chemins ? Autant que de façons de **placer** les $k$ succès parmi les $n$ rangs : $\\dbinom{n}{k}$ — les chemins sont disjoints, le principe additif somme : $P(X = k) = \\dbinom{n}{k}p^k(1-p)^{n-k}$ ✓ : ta combinatoire et tes probabilités, mariées en une ligne. La **planche de Galton** rejoue la preuve en bois : chaque bille subit $n$ chocs gauche/droite équiprobables et atterrit dans la case de son nombre de droites — l'histogramme des billes **dessine** $\\mathcal{B}(n, \\frac{1}{2})$, cloche comprise.",
  },
  keyIdea: "$X \\sim \\mathcal{B}(n, p)$ : le nombre de succès de $n$ Bernoulli indépendantes — $P(X = k) = \\dbinom{n}{k}p^k(1-p)^{n-k}$ : **combien de chemins** (les combinaisons placent les succès) **× le poids commun** (l'indépendance multiplie). Démontrée — et la planche de Galton la joue en bois.",
  why:
    "Pourquoi cette loi règne-t-elle sur la statistique ? Parce que « compter les succès de $n$ essais identiques » est LE protocole universel : sondage ($n$ électeurs, succès = vote A), contrôle qualité ($n$ pièces, succès = défaut), essai clinique, génétique mendélienne, paquets perdus sur un réseau — chaque fois, $\\mathcal{B}(n, p)$. Et c'est elle qui portera les intervalles de fluctuation et les tests : la moitié de la statistique inférentielle est une étude de la binomiale.",
  examples: [
    { title: "Chemins × poids", steps: [
      { p: "$n = 3$, $p = 0{,}7$, $k = 2$ : chaque chemin à 2 succès pèse $0{,}7^2 \\times 0{,}3 = 0{,}147$." },
      { p: "$\\binom{3}{2} = 3$ chemins : $P(X = 2) = 3 \\times 0{,}147 = 0{,}441$ — ta première, généralisée." },
    ] },
    { title: "Le QCM au hasard", steps: [
      { p: "10 questions, $p = 0{,}25$ : $P(X = 5) = \\binom{10}{5}(0{,}25)^5(0{,}75)^5 \\approx 0{,}058$." },
      { p: "Et $P(X \\geq 5) \\approx 0{,}078$ — la moyenne au hasard : moins de 8 % : le bachotage reste rentable." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "On lance 5 fois une pièce équilibrée. Identifie la loi de $X$ (nombre de piles) et calcule $P(X = 3)$.", solution: "Schéma de Bernoulli : $X \\sim \\mathcal{B}(5\\,;\\,0{,}5)$ — $P(X = 3) = \\dbinom{5}{3}(0{,}5)^3(0{,}5)^2 = 10 \\times \\dfrac{1}{32} = \\dfrac{5}{16}$ : dix chemins, chacun pesant un trente-deuxième." },
    { tier: "warmup", prompt: "Un tireur réussit à 80 %. Sur 6 tirs indépendants, calcule $P(X = 6)$ et $P(X \\geq 5)$.", solution: "$P(X = 6) = 0{,}8^6 \\approx 0{,}262$ ; $P(X = 5) = \\binom{6}{5}(0{,}8)^5(0{,}2) \\approx 0{,}393$ — donc $P(X \\geq 5) \\approx $ **0,655** : le sans-faute est rare même pour l'expert, mais « presque parfait » domine — les cumuls répondent aux vraies questions." },
    { tier: "application", prompt: "Démontre la formule $P(X = k) = \\dbinom{n}{k}p^k(1-p)^{n-k}$ pour $X \\sim \\mathcal{B}(n, p)$.", solution: "Un chemin de l'arbre réalisant exactement $k$ succès enchaîne $k$ branches de probabilité $p$ et $n - k$ de probabilité $1 - p$ : l'**indépendance** multiplie — poids $p^k(1-p)^{n-k}$, identique pour tout ordre. Le nombre de ces chemins est le nombre de façons de **choisir les rangs** des $k$ succès parmi $n$ : $\\dbinom{n}{k}$. Chemins disjoints, principe **additif** : $P(X = k) = \\dbinom{n}{k}p^k(1-p)^{n-k}$ ✓ — la démonstration exigible : compter, peser, sommer." },
    { tier: "challenge", prompt: "Une compagnie vend 105 billets pour 100 places ; chaque passager se présente avec probabilité 0,9, indépendamment. Pose le problème de surréservation : quelle variable, quelle loi, quel événement redouté ?", solution: "$X$ = nombre de passagers présents : $X \\sim \\mathcal{B}(105\\,;\\,0{,}9)$ — l'événement redouté est $X > 100$ (plus de présents que de sièges), et le calcul donne $P(X > 100) \\approx 0{,}016$ : moins de 2 % de vols surbookés pour 5 % de billets en plus — la compagnie compare ce risque $\\alpha$ à son seuil : la **surréservation** est un problème de seuil binomial, et toute l'industrie le résout ainsi." },
    { tier: "exam", prompt: "Une urne donne un succès avec $p = 0{,}3$. Sur $n = 7$ tirages indépendants : calcule $P(X = 2)$ en détaillant chemins et poids, puis détermine le plus petit $n$ tel que $P(X \\geq 1) \\geq 0{,}99$ (passe par le contraire et le logarithme).", solution: "$P(X = 2) = \\dbinom{7}{2}(0{,}3)^2(0{,}7)^5 = 21 \\times 0{,}09 \\times 0{,}168 \\approx $ **0,318** — 21 chemins, poids commun $\\approx 0{,}0151$. Seuil : $P(X \\geq 1) = 1 - P(X = 0) = 1 - 0{,}7^n \\geq 0{,}99$ ⟺ $0{,}7^n \\leq 0{,}01$ ⟺ $n\\ln 0{,}7 \\leq \\ln 0{,}01$ ⟺ $n \\geq \\dfrac{\\ln 0{,}01}{\\ln 0{,}7} \\approx 12{,}9$ : $n = $ **13** — l'événement contraire simplifie, le logarithme date (attention au sens : $\\ln 0{,}7 < 0$ renverse l'inégalité !) : le problème de seuil complet, binomiale et logarithme main dans la main." },
  ],
  practice: [
    { tier: "warmup", label: "Le poids d'un chemin", make: (r) => {
      const n = randint(r, 3, 5); const k = randint(r, 1, n - 1);
      return { prompt: `$\\mathcal{B}(${n}\\,;\\,0{,}5)$ : combien de chemins réalisent exactement ${k} succès ?`, answer: binom(n, k), solution: `$\\dbinom{${n}}{${k}} = $ **${binom(n, k)}** — placer les ${k} succès parmi les ${n} rangs.` };
    } },
    { tier: "application", label: "P(X = k) sur pile ou face", make: (r) => {
      const n = randint(r, 3, 5); const k = randint(r, 1, n - 1);
      return { prompt: `$X \\sim \\mathcal{B}(${n}\\,;\\,0{,}5)$ : $P(X = ${k}) = \\dfrac{?}{${2 ** n}}$ (donne le numérateur)`, answer: binom(n, k), solution: `$\\dbinom{${n}}{${k}} \\times \\dfrac{1}{2^{${n}}} = \\dfrac{${binom(n, k)}}{${2 ** n}}$ — **${binom(n, k)}**.` };
    } },
    { tier: "challenge", label: "Au moins un succès", make: (r) => {
      const q = pick(r, [[0.9, "0{,}9"], [0.5, "0{,}5"], [0.8, "0{,}8"]]); const n = randint(r, 2, 4);
      const v = Math.round((1 - q[0] ** n) * 1000) / 1000;
      return { prompt: `$P(\\text{échec}) = ${q[1]}$ par épreuve, $n = ${n}$ : $P(X \\geq 1) = 1 - ${q[1]}^{${n}} = \\,?$ (décimal)`, answer: v, solution: `$1 - ${String(q[0] ** n).replace(".", ",")} = $ **${String(v).replace(".", ",")}** — le contraire évite tous les cumuls.` };
    } },
  ],
};

// — Sums of random variables (programme: linéarité, E et V de la binomiale) —
const sommesVariables = {
  id: "probability.high.sommes-variables",
  level: "high", domain: "probability",
  title: "Sommes de variables aléatoires",
  tagline: "Les espérances s'additionnent toujours — les variances, seulement si l'indépendance signe.",
  prereqs: ["probability.high.binomiale", "probability.high.variables-aleatoires"],
  intuition:
    "Additionne deux variables aléatoires — deux dés, deux actifs, deux mesures : que deviennent espérance et variance ?\n\nL'espérance est **linéaire**, sans condition : $E(X + Y) = E(X) + E(Y)$ et $E(aX) = aE(X)$ ; la variance exige l'**indépendance** : $V(X + Y) = V(X) + V(Y)$ **si** $X$ et $Y$ sont indépendantes.",
  depths: {
    discovery:
      "**Avec les mains** : deux dés — $E$ de chacun : $3{,}5$ : la somme espère $3{,}5 + 3{,}5 = 7$ ✓ (vérifie sur la loi de la somme : c'est bien le centre !) — la linéarité dispense de calculer la loi de $X + Y$ : on additionne les espérances, point. Et ta linéarité de première ($E(aX + b)$) se prolonge à toute somme.",
    standard:
      "**En image** : pourquoi l'indépendance pour la variance ? Prends $Y = X$ (dépendance totale !) : $V(X + X) = V(2X) = 4V(X)$, mais $V(X) + V(X) = 2V(X)$ — la formule additive **échoue** : les fluctuations corrélées s'amplifient au lieu de se compenser. Avec indépendance, les écarts de l'une ignorent ceux de l'autre, et les variances s'ajoutent ✓ — mais **jamais les écarts types** : $\\sigma(X + Y) = \\sqrt{\\sigma_X^2 + \\sigma_Y^2}$, le Pythagore du hasard.",
    advanced:
      "**Dans la tête** : la démonstration exigible, par décomposition — $X \\sim \\mathcal{B}(n, p)$ s'écrit $X = X_1 + X_2 + \\cdots + X_n$ où $X_i$ est la Bernoulli du $i$-ème essai (1 si succès) : la linéarité donne $E(X) = \\sum E(X_i) = np$ ✓, et l'**indépendance** des essais donne $V(X) = \\sum V(X_i) = np(1-p)$ ✓ (tes $E = p$ et $V = p(1-p)$ de première, sommés $n$ fois !) — la formule qui aurait demandé des pages par la loi tombe en deux lignes par la décomposition : **représenter une variable comme somme de plus simples** est le grand geste du chapitre. Et l'**échantillon** suit : $M_n = \\frac{X_1 + \\cdots + X_n}{n}$ a pour espérance $\\mu$ (la moyenne vise juste !) et pour variance $\\frac{V}{n}$ — d'où $\\sigma(M_n) = \\frac{\\sigma}{\\sqrt{n}}$ : ton $\\frac{2\\sigma}{\\sqrt{n}}$ de première **vient d'être démontré** — la racine carrée de la précision n'était pas empirique, c'était un théorème.",
  },
  keyIdea: "$E(X + Y) = E(X) + E(Y)$ — **toujours** ; $V(X + Y) = V(X) + V(Y)$ — **si indépendance** (et les $\\sigma$ ne s'additionnent jamais : racine de la somme des carrés). Binomiale par décomposition en Bernoulli : $E = np$, $V = np(1-p)$ (démontré) — et $M_n$ : $E = \\mu$, $V = \\frac{V}{n}$ : le $\\frac{\\sigma}{\\sqrt{n}}$ expliqué.",
  why:
    "Pourquoi sommer des variables ? Parce que le monde agrège : un portefeuille somme des actifs, une erreur de mesure somme des perturbations, un trafic somme des usagers — et la règle « espérances toujours, variances si indépendance » est LE théorème de gestion du risque : diversifier (sommer des indépendants) divise la fluctuation relative — c'est mathématiquement pourquoi l'assurance existe, et pourquoi mesurer dix fois vaut mieux qu'une.",
  examples: [
    { title: "Le piège de la dépendance", steps: [
      { p: "$Y = X$ : $V(X + Y) = V(2X) = 4V(X)$ — mais la formule additive prédisait $2V(X)$." },
      { p: "Les fluctuations corrélées s'amplifient : l'indépendance n'est pas décorative, elle est la condition." },
    ] },
    { title: "La binomiale décomposée", steps: [
      { p: "$X = X_1 + \\cdots + X_n$ (les Bernoulli des essais) : $E(X) = np$ par linéarité." },
      { p: "Indépendance : $V(X) = np(1-p)$ — deux lignes, là où la loi complète aurait sué des pages." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Deux dés équilibrés : donne $E$ de la somme sans calculer la loi de la somme. Quelle propriété utilises-tu ?", solution: "$E(X + Y) = E(X) + E(Y) = 3{,}5 + 3{,}5 = $ **7** — la **linéarité de l'espérance** : valable toujours, indépendance ou pas, et elle dispense de dresser les 36 cas." },
    { tier: "warmup", prompt: "$X$ et $Y$ indépendantes, $V(X) = 9$, $V(Y) = 16$ : calcule $V(X + Y)$ puis $\\sigma(X + Y)$. Pourquoi $\\sigma_X + \\sigma_Y = 7$ est-il faux ?", solution: "$V(X + Y) = 9 + 16 = 25$ : $\\sigma = $ **5** — et non $3 + 4 = 7$ : les **variances** s'additionnent (sous indépendance), jamais les écarts types — $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ : le Pythagore du hasard ($5 < 7$ : la diversification amortit)." },
    { tier: "application", prompt: "Montre par un contre-exemple que $V(X + Y) = V(X) + V(Y)$ exige l'indépendance (prends $Y = X$).", solution: "$Y = X$ : $V(X + Y) = V(2X) = 4V(X)$ — or la formule additive donnerait $2V(X)$ : **faux** dès que $V(X) \\neq 0$ ✓ — la dépendance totale double les écarts (qui se comptent au carré : ×4) au lieu de les compenser : l'hypothèse d'indépendance est la clause du contrat." },
    { tier: "challenge", prompt: "Un échantillon de taille $n$ d'une loi d'espérance $\\mu$ et de variance $V$ : démontre que la moyenne $M_n$ vérifie $E(M_n) = \\mu$ et $V(M_n) = \\frac{V}{n}$, et relie au $\\frac{2\\sigma}{\\sqrt{n}}$ de première.", solution: "$E(M_n) = \\frac{1}{n}\\sum E(X_i) = \\frac{n\\mu}{n} = \\mu$ (linéarité) ; indépendance : $V(M_n) = \\frac{1}{n^2}\\sum V(X_i) = \\frac{nV}{n^2} = \\frac{V}{n}$ — d'où $\\sigma(M_n) = \\frac{\\sigma}{\\sqrt{n}}$ : le couloir $\\frac{2\\sigma}{\\sqrt{n}}$ que ta première **observait** par simulation est désormais **démontré** — la moyenne vise juste, et sa dispersion fond en racine de $n$." },
    { tier: "exam", prompt: "Démontre que pour $X \\sim \\mathcal{B}(n, p)$ : $E(X) = np$ et $V(X) = np(1-p)$, par décomposition en variables de Bernoulli.", solution: "Écris $X = X_1 + X_2 + \\cdots + X_n$ où $X_i$ vaut 1 si le $i$-ème essai est un succès, 0 sinon : chaque $X_i$ suit une **Bernoulli** de paramètre $p$, avec $E(X_i) = p$ et $V(X_i) = p(1 - p)$ (ta première !). **Linéarité** : $E(X) = \\sum_{i=1}^{n} E(X_i) = np$ ✓ — sans aucune hypothèse ; **indépendance des essais** (le schéma de Bernoulli !) : $V(X) = \\sum_{i=1}^{n} V(X_i) = np(1-p)$ ✓ — la démonstration exigible : représenter la variable comme somme de briques simples, puis laisser les deux théorèmes du chapitre faire chacun leur part — c'est le modèle de toutes les décompositions du supérieur." },
  ],
  practice: [
    { tier: "warmup", label: "Les espérances s'additionnent", make: (r) => {
      const e1 = randint(r, 2, 8); const e2 = randint(r, 2, 8);
      return { prompt: `$E(X) = ${e1}$, $E(Y) = ${e2}$ : $E(X + Y) = \\,?$`, answer: e1 + e2, solution: `Linéarité, sans condition : **${e1 + e2}**.` };
    } },
    { tier: "application", label: "E et V de la binomiale", make: (r) => {
      const n = pick(r, [10, 20, 50, 100]); const p = pick(r, [[0.5, "0{,}5"], [0.2, "0{,}2"], [0.1, "0{,}1"]]);
      const quoi = r() < 0.5;
      return { prompt: `$X \\sim \\mathcal{B}(${n}\\,;\\,${p[1]})$ : que vaut ${quoi ? "E(X)" : "V(X)"} ? (décimal si besoin)`, answer: quoi ? n * p[0] : Math.round(n * p[0] * (1 - p[0]) * 100) / 100, solution: `${quoi ? "$np = " + n + " \\times " + p[1] + " = $ **" + String(n * p[0]).replace(".", ",") + "**" : "$np(1-p) = $ **" + String(Math.round(n * p[0] * (1 - p[0]) * 100) / 100).replace(".", ",") + "**"} — la décomposition en Bernoulli.` };
    } },
    { tier: "challenge", label: "La variance de la moyenne", make: (r) => {
      const V = pick(r, [4, 9, 16, 36]); const n = pick(r, [4, 9, 16]);
      return { prompt: `$V(X) = ${V}$, échantillon de taille $n = ${n}$ : $V(M_n) = \\dfrac{V}{n} = \\,?$ (décimal si besoin)`, answer: V / n, solution: `$\\dfrac{${V}}{${n}} = $ **${String(V / n).replace(".", ",")}** — la moyenne fluctue $\\sqrt{${n}}$ fois moins.` };
    } },
  ],
};

export default [binomiale, sommesVariables];
