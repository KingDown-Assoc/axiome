// Field "Algebra / Analysis" — HIGH module (terminale-pro year), voie
// professionnelle. Official Tle pro programme, domain "Algèbre – Analyse":
// SUITES NUMÉRIQUES (expression of the RANK-n TERM for arithmetic and
// geometric sequences, the official LINK between geometric sequences and
// exponential functions, threshold problems), FONCTION DÉRIVÉE ET ÉTUDE DES
// VARIATIONS (degree-3 polynomials, variation table from the sign of the
// derivative, optimization) and FONCTIONS EXPONENTIELLES ET LOGARITHME
// DÉCIMAL (functions x ↦ q^x, variations by the position of q relative to
// 1, operational properties, the decimal logarithm log(x), solving q^n = k —
// PLACEMENT DURATION). Singapore method: the explicit formula as the
// shortcut ladder (skip the staircase), compound interest as the geometric
// bar that grows, log as the inverse reading (Equivalence big idea).
import { randint, pick } from "../../core/exercises.js";

// — Explicit sequences (programme: terme de rang n, lien suites-exponentielles) —
const suitesExplicites = {
  id: "algebra.high.suites-explicites",
  level: "high", domain: "algebra",
  title: "Le terme de rang n",
  tagline: "Sauter directement à l'année n — la formule explicite court-circuite l'escalier.",
  prereqs: ["algebra.high.suites-evolutions"],
  intuition:
    "« Que vaudra le contrat dans 20 ans ? » — dérouler 20 lignes de tableur marche… mais la formule **explicite** saute directement : arithmétique : $u_n = u_0 + n \\times r$ (le départ plus $n$ blocs) ; géométrique : $u_n = u_0 \\times q^n$ (le départ multiplié $n$ fois).\n\nL'escalier compté d'un coup d'œil — et la seconde formule cache une révélation : $q^n$, c'est une **exponentielle**.",
  depths: {
    discovery:
      "**Avec les mains** : compte les blocs — salaire 1 600 €, +35 €/an : en année $n$, combien de blocs de 35 ajoutés ? Exactement $n$ : $u_n = 1600 + 35n$ — vérifie sur l'escalier : $u_3 = 1705$ ✓ (trois blocs) — la formule ne fait que **compter les marches d'un coup** au lieu de les monter une à une : $u_{20} = 1600 + 700 = 2300$ €, sans dérouler.",
    standard:
      "**En image** : la barre géométrique — capital 2 000 € à 3 % **composés** (l'intérêt rejoint le capital : le bloc grossit !) : chaque année la barre fait ×1,03 — en année $n$ : $u_n = 2000 \\times 1{,}03^n$ — et compare au simple de première : simple $= 2000 + 60n$ (droite), composé $= 2000 \\times 1{,}03^n$ (la courbe qui décolle) : sur 10 ans, 2 600 contre 2 688 ; sur 30 ans, 3 800 contre 4 854 — **les blocs qui grossissent finissent toujours par battre les blocs constants**.",
    advanced:
      "**Dans la tête** : le **lien officiel** du programme — pose $f(x) = 2000 \\times 1{,}03^x$ : la suite géométrique est cette fonction **lue aux entiers** ($u_n = f(n)$) : les points de l'escalier vivent sur la courbe exponentielle — le pas à pas de première devient une fonction continue, dérivable, traçable : c'est le pont vers la leçon suivante. Et les **seuils** se posent : « quand le capital dépasse-t-il 3 000 € ? » — $2000 \\times 1{,}03^n \\geq 3000$ ⟺ $1{,}03^n \\geq 1{,}5$ : le tableur balaie (n = 14), et le logarithme de la leçon suivante répondra d'une ligne — la question est posée, l'outil arrive.",
  },
  keyIdea: "**Explicite** : $u_n = u_0 + nr$ (arithmétique : $n$ blocs comptés) ; $u_n = u_0 \\times q^n$ (géométrique : $n$ multiplications d'un coup) — sauter à l'année $n$ sans dérouler. **Lien officiel** : la géométrique est l'exponentielle $f(x) = u_0\\,q^x$ lue aux entiers — et les seuils $q^n \\geq k$ attendent le logarithme.",
  why:
    "Pourquoi une formule quand le tableur déroule ? Parce que la formule **répond en sens inverse** : le tableur donne $u_{20}$, la formule donne aussi « quel $u_0$ pour atteindre 3 000 en 10 ans ? » (diviser par $q^{10}$) et prépare « quel $n$ pour doubler ? » (le log) — l'explicite transforme la suite en équation manipulable. Et le lien suites-exponentielles est LA passerelle du programme : tes intérêts composés, ta croissance bactérienne et ta décote de machine sont la même courbe — savoir le voir, c'est ne plus apprendre trois chapitres mais un.",
  examples: [
    { title: "Sauter à l'année 20", steps: [
      { p: "$u_n = 1600 + 35n$ : $u_{20} = 1600 + 700 = 2300$ € — vingt marches comptées d'un regard." },
      { p: "Et le composé : $2000 \\times 1{,}03^{20} \\approx 3612$ € — vingt multiplications en une puissance." },
    ] },
    { title: "L'escalier sur la courbe", steps: [
      { p: "$u_n = 2000 \\times 1{,}03^n$ et $f(x) = 2000 \\times 1{,}03^x$ : $u_n = f(n)$ — les points sur la courbe." },
      { p: "La suite est l'exponentielle aux entiers : le lien officiel du programme." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une citerne de 5 000 L perd 250 L par jour : écris le terme explicite $u_n$, calcule $u_{12}$ directement, et trouve le jour où la citerne est vide.", solution: "$u_n = 5000 - 250n$ — $u_{12} = 5000 - 3000 = $ **2 000 L** sans dérouler douze lignes ; vide : $5000 - 250n = 0$ ⟹ $n = $ **20 jours** — l'explicite répond dans les deux sens : la valeur au jour $n$, ET le jour d'une valeur — ton premier degré au service des suites." },
    { tier: "warmup", prompt: "Un capital de 1 500 € est placé à 4 % composés. Écris $u_n$, calcule le capital après 10 ans, et compare au même taux en intérêts SIMPLES.", solution: "Composé : $u_n = 1500 \\times 1{,}04^n$ — $u_{10} = 1500 \\times 1{,}04^{10} \\approx $ **2 220,37 €** ; simple : $1500 + 60 \\times 10 = $ **2 100 €** — 120 € d'écart : les intérêts composés font travailler les intérêts (le bloc grossit), et l'écart ne fera que s'aggraver : la courbe contre la droite." },
    { tier: "application", prompt: "Justifie la formule $u_n = u_0 \\times q^n$ en comptant les multiplications, puis explique le lien avec la fonction $f(x) = u_0\\,q^x$ — et ce que la fonction offre de plus que la suite.", solution: "De $u_0$ à $u_n$ : on multiplie par $q$ à chaque pas, soit $n$ **fois** : $u_n = u_0 \\times q \\times \\cdots \\times q = u_0\\,q^n$ ✓. La suite est $f$ **lue aux entiers** ($u_n = f(n)$) : la fonction relie les points — elle offre les valeurs **entre** les rangs (le capital à 2 ans et demi), une **courbe** traçable, et bientôt une dérivée : le discret rejoint le continu — le lien officiel, et la porte de la leçon suivante." },
    { tier: "challenge", prompt: "Une machine achetée 24 000 € décote de 15 % par an. (1) Terme explicite. (2) Valeur après 5 ans. (3) Par balayage (calcule $u_4$ à $u_8$), trouve la première année où la valeur passe sous 8 000 € — et note la question qu'on aimerait résoudre sans balayer.", solution: "(1) $u_n = 24000 \\times 0{,}85^n$ (garder 85 %). (2) $u_5 = 24000 \\times 0{,}85^5 \\approx $ **10 649 €**. (3) Balayage : $u_6 \\approx 9052$, $u_7 \\approx $ **7 694** : sous 8 000 € **à l'année 7** — la question qui démange : résoudre $0{,}85^n \\leq \\dfrac{1}{3}$ d'une ligne au lieu de balayer — c'est exactement ce que le logarithme décimal fera à la leçon suivante : la question est posée, l'outil arrive." },
    { tier: "exam", prompt: "Un artisan hésite entre deux contrats d'entretien pour son parc machine : contrat A — 3 000 € la première année puis +120 €/an ; contrat B — 2 800 € puis +4 %/an. (1) Termes explicites $a_n$ et $b_n$. (2) Coûts à l'année 5 et à l'année 10 (déroule la formule, pas l'escalier). (3) Quelle est la nature de chaque suite et que prédit la forme des courbes ? (4) Total payé sur les années 0 à 3 pour chaque contrat : lequel coûte le moins à court terme, et la conclusion s'inverse-t-elle à long terme ?", solution: "(1) $a_n = 3000 + 120n$ ; $b_n = 2800 \\times 1{,}04^n$. (2) Année 5 : $a_5 = 3600$ ; $b_5 \\approx $ **3 407 €** — année 10 : $a_{10} = 4200$ ; $b_{10} \\approx $ **4 145 €** : B encore dessous, de peu. (3) A : arithmétique (droite) ; B : géométrique (exponentielle) — la courbe **finira par crever la droite** : c'est la nature de $q^n$ (vers l'année 12-13, B dépasse). (4) Cumuls 0→3 : A $= 3000 + 3120 + 3240 + 3360 = $ **12 720 €** ; B $= 2800 + 2912 + 3028{,}48 + 3149{,}62 \\approx $ **11 890 €** — **B gagne le court terme** (départ plus bas), mais la géométrique accélère : sur la durée de vie du parc (15 ans+), A redevient compétitif — l'explicite a permis de sauter aux années 5 et 10, la nature des suites a prédit le croisement : la décision d'achat complète, formules en main." },
  ],
  practice: [
    { tier: "warmup", label: "Sauter au rang n", make: (r) => {
      const u0 = pick(r, [500, 1000, 2000]); const raison = pick(r, [50, 100]); const n = randint(r, 5, 15);
      return { prompt: `$u_n = ${u0} + ${raison}n$ : que vaut $u_{${n}}$ ?`, answer: u0 + raison * n, solution: `$${u0} + ${raison * n} = $ **${u0 + raison * n}** — ${n} blocs comptés d'un coup.` };
    } },
    { tier: "application", label: "La puissance qui saute", make: (r) => {
      const u0 = pick(r, [10, 100]); const q = pick(r, [2, 3]); const n = randint(r, 3, 5);
      return { prompt: `$u_n = ${u0} \\times ${q}^n$ : que vaut $u_{${n}}$ ?`, answer: u0 * q ** n, solution: `$${u0} \\times ${q ** n} = $ **${u0 * q ** n}** — ${n} multiplications en une puissance.` };
    } },
    { tier: "challenge", label: "Simple contre composé", make: (r) => {
      const C = pick(r, [1000, 2000]); const t = pick(r, [5, 10]); const n = 2;
      const simple = C + C * t / 100 * n; const compose = C * (1 + t / 100) ** n;
      return { prompt: `${C} € à ${t} % sur 2 ans : écart composé − simple ? (le bloc qui grossit, en €, décimal)`, answer: Math.round((compose - simple) * 100) / 100, solution: `Composé ${String(compose).replace(".", ",")} − simple ${simple} $= $ **${String(Math.round((compose - simple) * 100) / 100).replace(".", ",")} €** — l'intérêt de l'intérêt.` };
    } },
  ],
};

// — Derivative for optimization (programme: degré 3, tableau, optimisation) —
const deriveeOptimisation = {
  id: "analysis.high.derivee-optimisation",
  level: "high", domain: "analysis",
  title: "Dériver pour optimiser",
  tagline: "Le tableau de variations complet — et le réglage optimal à la tangente horizontale.",
  prereqs: ["analysis.high.derivee-pente"],
  intuition:
    "Le coût, le volume, le rendement dépendent d'un réglage $x$ — et la question du métier est toujours la même : quel $x$ donne le **meilleur résultat** ?\n\nLa première a forgé l'outil : dériver, étudier le signe, dresser le tableau — la terminale l'industrialise sur les polynômes de degré 3 : le sommet de la courbe est là où la tangente s'allonge à l'horizontale.",
  depths: {
    discovery:
      "**Avec les mains** : sens l'optimum — une boîte sans couvercle taillée dans un carton de 12 × 12 : des carrés de côté $x$ coupés aux coins, les bords repliés — $x$ minuscule : boîte plate (volume ridicule) ; $x$ énorme : boîte étroite (ridicule aussi) — **quelque part entre les deux, un maximum** : le volume $V(x) = x(12 - 2x)^2$ monte puis descend : l'optimum existe, la dérivée va le localiser.",
    standard:
      "**En image** : la procédure complète, en tableau — $V(x) = 4x^3 - 48x^2 + 144x$ : dérive ($V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12)$), **annule** ($x = 2$ et $x = 6$ : racine évidente + produit — ta première !), **signe** (parabole vers le haut : positif, négatif, positif), **flèches** (↗ sur [0 ; 2], ↘ sur [2 ; 6]) — le tableau de variations est le résumé graphique de la fonction : une ligne de signes, une ligne de flèches, et le maximum saute aux yeux en $x = 2$.",
    advanced:
      "**Dans la tête** : lire l'optimum en professionnel — le maximum est en $x = 2$ : $V(2) = 2 \\times 8^2 = 128$ cm³ — mais le tableau dit PLUS : il certifie qu'aucun autre réglage ne fait mieux (les flèches descendent partout ailleurs), il borne le domaine utile ($x \\in\\,]0\\,;\\,6[$ : au-delà, la boîte n'existe plus), et il révèle la **sensibilité** (autour du sommet, la tangente est horizontale : une petite erreur de découpe coûte peu — l'optimum est tolérant) — optimiser, ce n'est pas trouver UN nombre : c'est dresser le tableau qui justifie le réglage devant le client, le chef et le contrôleur.",
  },
  keyIdea: "La procédure : **dériver** → **annuler** $f'$ (racine évidente + produit) → **signer** (la parabole de $f'$) → **flèches** — le tableau de variations complet. L'optimum vit à la **tangente horizontale**, et le tableau certifie qu'aucun réglage ne fait mieux — plus la sensibilité autour du sommet.",
  why:
    "Pourquoi le degré 3 ? Parce que c'est le premier degré où la vie devient intéressante : un volume (trois dimensions !), un coût avec effet de seuil, un rendement qui monte puis sature — tous polynomiaux de degré 3, tous avec un vrai optimum intérieur. Et la procédure apprise ici est **universelle** : la même chaîne dériver-annuler-signer-conclure optimisera les exponentielles, les coûts logistiques et les modèles de la poursuite d'études — le geste est acquis, les fonctions changeront.",
  examples: [
    { title: "La boîte optimale", steps: [
      { p: "$V(x) = x(12 - 2x)^2$ : plate si $x \\to 0$, étroite si $x \\to 6$ — le maximum est entre." },
      { p: "$V'(x) = 12(x - 2)(x - 6)$ : sommet en $x = 2$, volume 128 cm³ — localisé, certifié." },
    ] },
    { title: "Le tableau qui certifie", steps: [
      { p: "Signe de $V'$ : + sur [0 ; 2], − sur [2 ; 6] — flèches ↗ ↘ : le sommet est unique." },
      { p: "Aucun autre réglage ne fait mieux : le tableau est la preuve, pas juste le dessin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le bénéfice d'un atelier suit $B(x) = -x^2 + 80x - 700$ ($x$ : pièces produites par jour). Dérive, annule, et trouve la production qui maximise le bénéfice — puis le bénéfice maximal.", solution: "$B'(x) = -2x + 80$ — nul en $x = $ **40 pièces/jour** ; avant : $B' > 0$ (↗), après : $B' < 0$ (↘) : **maximum** $B(40) = -1600 + 3200 - 700 = $ **900 €** — la tangente horizontale a trouvé la cadence : ni sous-produire (frais fixes), ni sur-produire (surcoûts) — l'optimisation de première, échauffement du degré 3." },
    { tier: "warmup", prompt: "Dérive $f(x) = 2x^3 - 9x^2 + 12x$ et factorise $f'(x)$ (mise en facteur, puis racine évidente $x = 1$ et produit des racines).", solution: "$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2)$ — $x = 1$ est racine ($1 - 3 + 2 = 0$ ✓), produit $= 2$ : l'autre racine est **2** — $f'(x) = 6(x - 1)(x - 2)$ : la dérivée annulée et factorisée — ta résolution de première fait tout le travail du degré 3." },
    { tier: "application", prompt: "Avec $f'(x) = 6(x - 1)(x - 2)$ : dresse le tableau de signes de $f'$ et le tableau de variations de $f$ sur $[0\\,;\\,3]$, avec les valeurs aux points clés ($f(0) = 0$, $f(1) = 5$, $f(2) = 4$, $f(3) = 9$).", solution: "Parabole vers le haut, racines 1 et 2 : $f' > 0$ sur [0 ; 1], $< 0$ sur [1 ; 2], $> 0$ sur [2 ; 3] — flèches : **↗ 5 ↘ 4 ↗ 9** : sommet local en $x = 1$ (valeur 5), creux en $x = 2$ (valeur 4), et le maximum sur l'intervalle est au **bord** : $f(3) = 9$ — le tableau révèle ce que l'œil rate : le vrai maximum n'est pas toujours au sommet de la bosse — toujours regarder les bords." },
    { tier: "challenge", prompt: "Une gouttière se plie dans une tôle de 30 cm de large : deux bords relevés de $x$ cm, fond de $30 - 2x$. La section (l'aire) vaut $S(x) = x(30 - 2x)$. Optimise : quel pli maximise le débit, et pourquoi le résultat (le fond = double du bord) est-il élégant ?", solution: "$S(x) = 30x - 2x^2$ — $S'(x) = 30 - 4x$, nul en $x = $ **7,5 cm** : fond $= 15$ cm — section maximale $S(7{,}5) = 112{,}5$ cm² ; l'élégance : **le fond vaut exactement deux bords** (15 = 2 × 7,5) — l'optimum équilibre la matière entre largeur et hauteur : trop de fond, l'eau s'étale ; trop de bord, le canal s'étrangle — la dérivée a trouvé la proportion que les zingueurs connaissent d'instinct." },
    { tier: "exam", prompt: "Une boîte sans couvercle se fabrique dans un carton carré de 12 cm : on découpe des carrés de côté $x$ aux quatre coins et on replie. (1) Justifie $V(x) = 4x^3 - 48x^2 + 144x$ sur $]0\\,;\\,6[$ (développe $x(12 - 2x)^2$). (2) Dérive et factorise $V'$ (facteur 12, racines 2 et 6). (3) Tableau de signes et de variations complet. (4) Découpe optimale, volume maximal, et : l'opérateur découpe à 2,2 cm au lieu de 2 — gravité de l'erreur ? ($V(2{,}2) \\approx 127{,}8$.)", solution: "(1) $(12 - 2x)^2 = 144 - 48x + 4x^2$ : $V(x) = x(4x^2 - 48x + 144) = 4x^3 - 48x^2 + 144x$ ✓ — et $x < 6$ sinon plus de fond. (2) $V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)$ (racine évidente 2, produit 12). (3) Sur $]0\\,;\\,6[$ : $V' > 0$ avant 2, $< 0$ après — **↗ puis ↘** : maximum unique en $x = 2$. (4) Découpe **2 cm**, volume $V(2) = 8 \\times 16 \\times \\ldots$ recalculons : $2 \\times (12 - 4)^2 = 2 \\times 64 = $ **128 cm³** ; à 2,2 cm : 127,8 cm³ — perte de 0,2 cm³ (**0,16 %**) : l'optimum est **tolérant** (tangente horizontale : la courbe est plate au sommet) — l'erreur de découpe est sans gravité, et c'est le tableau qui permet de l'affirmer : optimiser ET quantifier la sensibilité — le dossier de fabrication complet." },
  ],
  practice: [
    { tier: "warmup", label: "Annuler la dérivée", make: (r) => {
      const s = pick(r, [40, 60, 80]);
      return { prompt: `$B'(x) = -2x + ${s}$ : la cadence optimale (où $B' = 0$) ?`, answer: s / 2, solution: `$x = \\dfrac{${s}}{2} = $ **${s / 2}** — la tangente horizontale.` };
    } },
    { tier: "application", label: "Factoriser f′", make: (r) => {
      const r1 = pick(r, [1, 2]); const r2 = r1 + randint(r, 1, 4);
      return { prompt: `$f'(x) = 6(x^2 - ${r1 + r2}x + ${r1 * r2})$ avec $x = ${r1}$ racine : l'autre racine ?`, answer: r2, solution: `Produit $= ${r1 * r2}$ : l'autre $= $ **${r2}** — la dérivée annulée par somme-produit.` };
    } },
    { tier: "challenge", label: "Lire le tableau", make: (r) => {
      const a = randint(r, 1, 3); const b = a + randint(r, 1, 3);
      return { prompt: `$f' > 0$ avant $${a}$, $< 0$ entre $${a}$ et $${b}$, $> 0$ après : où est le sommet LOCAL ?`, answer: a, solution: `En $x = $ **${a}** — ↗ puis ↘ : la bosse ; en ${b}, c'est le creux.` };
    } },
  ],
};

// — Exponentials of base q and decimal log (programme: q^x, log, durée de placement) —
const exponentiellesLogDecimal = {
  id: "analysis.high.exponentielles-log-decimal",
  level: "high", domain: "analysis",
  title: "Exponentielles et logarithme décimal",
  tagline: "q^x prolonge la suite en courbe — et log répond à « combien d'années ? ».",
  prereqs: ["algebra.high.suites-explicites", "analysis.high.derivee-pente"],
  intuition:
    "Ta suite $2000 \\times 1{,}03^n$ devient fonction : $f(x) = 2000 \\times 1{,}03^x$ — la courbe **exponentielle de base 1,03** passe par tous tes points et comble les trous.\n\nEt la question inverse — « en combien d'années le capital double-t-il ? » — reçoit enfin son outil : le **logarithme décimal**, la lecture à l'envers des puissances de 10.",
  depths: {
    discovery:
      "**Avec les mains** : apprivoise $\\log$ sur les puissances de 10 — $\\log(100) = 2$ (cent, c'est 10 **puissance 2**), $\\log(1000) = 3$, $\\log(10) = 1$, $\\log(1) = 0$ : le log **compte les étages** d'une puissance de 10 — et la calculatrice interpole entre : $\\log(500) \\approx 2{,}7$ (entre 2 et 3 étages, logique) — le log est l'altimètre des ordres de grandeur : pH, décibels et magnitudes sont des logs déguisés.",
    standard:
      "**En image** : la famille $q^x$ — trace $1{,}05^x$ (croissance douce), $2^x$ (l'explosion), $0{,}85^x$ (la décote qui fond) : toutes passent par $(0\\,;\\,1)$ ($q^0 = 1$ : le départ commun), et la **position** de $q$ par rapport à 1 dicte tout : $q > 1$ croissante, $0 < q < 1$ décroissante — ta règle des suites, devenue règle des courbes ; et les **propriétés opératoires** voyagent : $q^a \\times q^b = q^{a+b}$ (multiplier les valeurs, additionner les exposants — le moteur même de l'exponentielle).",
    advanced:
      "**Dans la tête** : le duo roi du programme — résoudre $q^n = k$ : applique le log des deux côtés — $\\log(q^n) = n\\log q$ (la propriété phare : **le log fait descendre l'exposant**) : $n = \\dfrac{\\log k}{\\log q}$ — la **durée de placement** tombe d'une ligne : doubler à 3 % ? $1{,}03^n = 2$ ⟹ $n = \\dfrac{\\log 2}{\\log 1{,}03} \\approx 23{,}4$ : **24 ans** — fini le balayage de la leçon des suites : big idea *Equivalence* — le log traduit une équation d'exposant en division, et toutes les questions « combien de temps ? » (placement, décote, contamination, désintégration) se rendent au même calcul.",
  },
  keyIdea: "$f(x) = q^x$ : par $(0\\,;\\,1)$, **croissante** si $q > 1$, **décroissante** si $q < 1$ — la suite géométrique prolongée. $\\log$ compte les étages de 10 ($\\log 100 = 2$) et **fait descendre l'exposant** : $\\log(q^n) = n\\log q$ ⟹ $q^n = k$ se résout $n = \\frac{\\log k}{\\log q}$ — la durée de placement en une ligne (*Equivalence*).",
  why:
    "Pourquoi le log au lycée pro ? Parce que la question « **combien de temps** ? » est partout — doubler un capital, amortir une machine, atteindre un seuil sanitaire, vider un condensateur — et qu'elle se formule toujours $q^n = k$ : sans log, on balaie au tableur ; avec, on répond d'une division. Et le log structure déjà ton monde professionnel : le pH du labo, les décibels du chantier, les magnitudes — partout où les grandeurs s'étagent en facteurs 10, le log est la graduation naturelle.",
  examples: [
    { title: "Le log compte les étages", steps: [
      { p: "$\\log(1000) = 3$ : mille, c'est trois étages de 10 — $\\log(500) \\approx 2{,}7$ : entre deux et trois." },
      { p: "pH, décibels, magnitudes : des compteurs d'étages — le log gradue les ordres de grandeur." },
    ] },
    { title: "Doubler le capital", steps: [
      { p: "$1{,}03^n = 2$ : le log descend l'exposant — $n\\log 1{,}03 = \\log 2$." },
      { p: "$n = \\dfrac{0{,}301}{0{,}0128} \\approx 23{,}4$ : **24 ans** — la durée de placement, en une ligne." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sans calculatrice : $\\log(10)$, $\\log(10\\,000)$, $\\log(1)$ — et encadre $\\log(300)$ entre deux entiers en justifiant.", solution: "$\\log 10 = $ **1**, $\\log 10\\,000 = $ **4**, $\\log 1 = $ **0** ($10^0 = 1$) — et $100 < 300 < 1000$ donc $2 < \\log 300 < 3$ (la calculatrice dira 2,48) — le log compte les étages de 10 : l'encadrement se lit sur les puissances voisines." },
    { tier: "warmup", prompt: "Classe les fonctions $1{,}04^x$, $0{,}9^x$ et $2^x$ : croissantes ou décroissantes ? Que valent-elles toutes en $x = 0$, et laquelle modélise une décote ?", solution: "$1{,}04^x$ et $2^x$ : **croissantes** ($q > 1$) ; $0{,}9^x$ : **décroissante** ($q < 1$) — toutes valent **1 en zéro** ($q^0 = 1$ : le départ commun) ; la décote, c'est $0{,}9^x$ : perdre 10 % par période — la position de $q$ par rapport à 1 raconte toute l'histoire." },
    { tier: "application", prompt: "Démontre que $\\log(q^n) = n\\log q$ en t'appuyant sur $\\log(ab) = \\log a + \\log b$, puis utilise-la : résous $1{,}05^n = 3$ ($\\log 3 \\approx 0{,}477$, $\\log 1{,}05 \\approx 0{,}0212$).", solution: "$q^n = q \\times q \\times \\cdots \\times q$ ($n$ facteurs) : le log transforme chaque × en + — $\\log(q^n) = \\log q + \\cdots + \\log q = n\\log q$ ✓ — la propriété phare. Application : $n = \\dfrac{\\log 3}{\\log 1{,}05} = \\dfrac{0{,}477}{0{,}0212} \\approx $ **22,5 : 23 périodes** pour tripler à 5 % — l'exposant est descendu, la division a fini." },
    { tier: "challenge", prompt: "La machine de la leçon précédente (24 000 €, décote 15 %/an) : résous PAR LE LOG « valeur sous 8 000 € », soit $0{,}85^n \\leq \\dfrac{1}{3}$ ($\\log(1/3) \\approx -0{,}477$, $\\log 0{,}85 \\approx -0{,}0706$ — attention au sens !).", solution: "$n\\log 0{,}85 \\leq \\log\\dfrac{1}{3}$ — les **deux logs sont négatifs** : diviser par $\\log 0{,}85 < 0$ **retourne le sens** : $n \\geq \\dfrac{-0{,}477}{-0{,}0706} \\approx 6{,}76$ ⟹ **dès l'année 7** ✓ (le balayage de la leçon passée confirmait !) — le log a remplacé sept calculs par une division, et ton réflexe d'inéquation de seconde (le sens qui bascule au négatif) a évité le piège classique." },
    { tier: "exam", prompt: "Un investissement de 5 000 € rapporte 6 % composés par an ; en parallèle, l'inflation érode les prix de 2 % par an (le pouvoir d'achat d'un euro suit $0{,}98^n$… on simplifie : la valeur RÉELLE du placement suit $5000 \\times \\left(\\frac{1{,}06}{1{,}02}\\right)^n \\approx 5000 \\times 1{,}039^n$). (1) Le capital nominal après 10 ans. (2) En combien d'années le capital NOMINAL double-t-il ? ($\\log 2 \\approx 0{,}301$, $\\log 1{,}06 \\approx 0{,}0253$.) (3) Et la valeur réelle, en combien d'années double-t-elle ? ($\\log 1{,}039 \\approx 0{,}0166$.) (4) Conclus en deux phrases pour l'épargnant.", solution: "(1) $5000 \\times 1{,}06^{10} \\approx $ **8 954 €**. (2) $1{,}06^n = 2$ ⟹ $n = \\dfrac{0{,}301}{0{,}0253} \\approx 11{,}9$ : **12 ans**. (3) $1{,}039^n = 2$ ⟹ $n = \\dfrac{0{,}301}{0{,}0166} \\approx 18{,}1$ : **un peu plus de 18 ans** — six ans de plus. (4) Le capital affiché double en 12 ans, mais son **pouvoir d'achat** ne double qu'en 18 : l'inflation mange une partie de la performance — comparer les placements en valeur réelle, pas en valeur nominale : le log a chiffré l'écart que le marketing bancaire ne montre jamais — exponentielles, quotient de coefficients, et deux durées de doublement : tout le module dans un livret d'épargne." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les étages", make: (r) => {
      const n = randint(r, 1, 5);
      return { prompt: `$\\log(${10 ** n}) = \\,?$`, answer: n, solution: `$10^{${n}}$ : **${n}** étages de 10.` };
    } },
    { tier: "application", label: "Croissante ou décroissante ?", make: (r) => {
      const cas = pick(r, [["1{,}07", 1], ["0{,}95", 0], ["2", 1], ["0{,}5", 0], ["1{,}002", 1]]);
      return { prompt: `$f(x) = ${cas[0]}^x$ : croissante (1) ou décroissante (0) ?`, answer: cas[1], solution: `$q ${cas[1] ? ">" : "<"} 1$ : **${cas[1] ? "croissante" : "décroissante"}**.` };
    } },
    { tier: "challenge", label: "Descendre l'exposant", make: (r) => {
      const cas = pick(r, [[2, 0.301, 0.0253, 12], [3, 0.477, 0.0253, 19], [2, 0.301, 0.0128, 24]]);
      return { prompt: `$${cas[2] === 0.0253 ? "1{,}06" : "1{,}03"}^n = ${cas[0]}$ : $n = \\dfrac{${String(cas[1]).replace(".", ",")}}{${String(cas[2]).replace(".", ",")}}$ — arrondi à l'année supérieure ?`, answer: cas[3], solution: `$\\approx ${String(Math.round(cas[1] / cas[2] * 10) / 10).replace(".", ",")}$ : **${cas[3]} ans** — le log a fait descendre l'exposant.` };
    } },
  ],
};

export default [suitesExplicites, deriveeOptimisation, exponentiellesLogDecimal];
