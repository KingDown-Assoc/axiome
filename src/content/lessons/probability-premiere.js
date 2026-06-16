// Field "Probability" — HIGH module (premiere year), part 1: independence and
// repeated trials. Official première spécialité programme. INDEPENDENCE of two
// events (P_A(B) = P(B) for P(A) ≠ 0, equivalently P(A ∩ B) = P(A)P(B) — an
// independence hypothesis is part of the MODEL, as stressed since seconde);
// PARTITION of the universe (complete systems of events) and the LAW OF TOTAL
// PROBABILITY — explicitly excluded in seconde, now licit; SUCCESSION of two
// independent trials represented by a tree or a table; for n ≤ 4, REPETITION of
// n identical independent BERNOULLI trials, the 2^n tree and path counting (the
// binomial in germ). Official algorithm: MONTE-CARLO method — estimating the
// area under a parabola, estimating π. Possible deepenings: random walks.
import { randint, pick } from "../../core/exercises.js";

// — Independence and total probability (programme: indépendance, partition) —
const independance = {
  id: "probability.high.independance",
  level: "high", domain: "probability",
  title: "Indépendance et probabilités totales",
  tagline: "Indépendance : A n'influe pas sur B, et la formule des probabilités totales.",
  prereqs: ["probability.high.conditionnelles"],
  intuition:
    "Deux événements sont **indépendants** quand savoir l'un ne renseigne en rien sur l'autre : $P_A(B) = P(B)$ — l'information A laisse B de marbre.\n\nEn multipliant par $P(A)$, la définition devient symétrique : $P(A \\cap B) = P(A) \\times P(B)$ — l'intersection se calcule par le produit, **si et seulement si** indépendance.",
  depths: {
    discovery:
      "**Avec les mains** : tire une carte — « as » et « cœur » sont indépendants : parmi les cœurs, la part d'as est $\\frac{1}{13}$, comme dans tout le paquet : $P_{\\text{cœur}}(\\text{as}) = P(\\text{as})$ ✓. Mais « as » et « figure » ne le sont pas : sachant figure, plus aucun as ! L'indépendance se **teste** : comparer $P(A \\cap B)$ et $P(A)P(B)$ — égaux ou pas, le verdict tombe.",
    standard:
      "**En image** : ne confonds jamais **indépendants** et **incompatibles** — incompatibles ($A \\cap B = \\varnothing$) est presque le contraire : savoir A *interdit* B, l'information est totale ! Et comme en seconde, l'indépendance est une **hypothèse du modèle** : « les deux lancers sont indépendants » se *suppose* (la pièce n'a pas de mémoire), ne se démontre pas — l'expérimentateur la pose, le calcul la consomme.",
    advanced:
      "**Dans la tête** : la formule interdite de seconde devient licite — une **partition** découpe l'univers en morceaux disjoints qui le recouvrent ($A$ et $\\bar{A}$, ou les trois usines d'un fournisseur) ; tout événement B se découpe alors le long des morceaux : $P(B) = P(A \\cap B) + P(\\bar{A} \\cap B) = P(A)\\,P_A(B) + P(\\bar{A})\\,P_{\\bar{A}}(B)$ — la **formule des probabilités totales** : sur l'arbre, *additionner tous les chemins qui mènent à B*. Une usine produit 60 % chez A (2 % de défauts) et 40 % chez B (5 %) : $P(\\text{défaut}) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 3{,}2\\,\\%$ — la moyenne pondérée des branches : l'arbre complet livre enfin toutes ses récoltes.",
  },
  keyIdea: "Indépendants : $P_A(B) = P(B)$, c'est-à-dire $P(A \\cap B) = P(A)P(B)$ — une **hypothèse de modèle**, à ne pas confondre avec incompatibles. **Probabilités totales** sur une partition : $P(B) = P(A)P_A(B) + P(\\bar{A})P_{\\bar{A}}(B)$ — sommer les chemins de l'arbre.",
  why:
    "Pourquoi ces deux notions ensemble ? Parce qu'elles sont les deux gestes du calcul sur arbre : **multiplier** le long d'un chemin (et l'indépendance dit quand les poids ne changent pas d'étage), **additionner** les chemins qui aboutissent (les probabilités totales). Épidémiologie, contrôle qualité, fiabilité des systèmes : tout calcul probabiliste réel enchaîne ces deux opérations — la première page de l'arbre était en seconde, le livre complet s'ouvre ici.",
  examples: [
    { title: "Tester l'indépendance", steps: [
      { p: "Carte : $P(\\text{as} \\cap \\text{cœur}) = \\frac{1}{52}$ et $P(\\text{as})P(\\text{cœur}) = \\frac{4}{52} \\times \\frac{13}{52} = \\frac{1}{52}$." },
      { p: "Égaux : **indépendants** — la couleur ne renseigne pas sur la hauteur." },
    ] },
    { title: "Sommer les chemins", steps: [
      { p: "Usines A (60 %, défauts 2 %) et B (40 %, défauts 5 %) : deux chemins mènent au défaut." },
      { p: "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = $ **0,032** — les probabilités totales additionnent l'arbre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "On tire une carte d'un jeu de 52. Les événements « as » et « cœur » sont-ils indépendants ? Teste par la formule du produit.", solution: "$P(\\text{as} \\cap \\text{cœur}) = \\frac{1}{52}$ (l'as de cœur) et $P(\\text{as}) \\times P(\\text{cœur}) = \\frac{1}{13} \\times \\frac{1}{4} = \\frac{1}{52}$ — **égaux : indépendants** ✓. Savoir la couleur ne dit rien de la hauteur : l'information glisse." },
    { tier: "warmup", prompt: "Indépendants ou incompatibles ? Donne un exemple de chaque avec un dé, et explique pourquoi ce sont presque des contraires.", solution: "**Incompatibles** : « pair » et « impair » — $A \\cap B = \\varnothing$ : savoir A *interdit* B (information maximale !). **Indépendants** : sur deux lancers, « le 1er donne 6 » et « le 2e donne 6 » — savoir l'un ne change rien à l'autre (information nulle). L'incompatibilité est une dépendance extrême : ne jamais les confondre." },
    { tier: "application", prompt: "Une usine s'approvisionne chez A (60 % des pièces, 2 % défectueuses) et B (40 %, 5 % défectueuses). Dresse l'arbre et calcule la probabilité qu'une pièce soit défectueuse.", solution: "Deux chemins vers D : $0{,}6 \\times 0{,}02 = 0{,}012$ et $0{,}4 \\times 0{,}05 = 0{,}02$ — **probabilités totales** : $P(D) = 0{,}012 + 0{,}02 = $ **0,032** (3,2 %) : multiplier le long, additionner au bout — la partition {A, B} découpe le calcul." },
    { tier: "challenge", prompt: "Avec l'usine précédente : une pièce est défectueuse — quelle est la probabilité qu'elle vienne de B ? Que remarques-tu ?", solution: "$P_D(B) = \\dfrac{P(B \\cap D)}{P(D)} = \\dfrac{0{,}02}{0{,}032} = $ **0,625** — B fournit 40 % des pièces mais **62,5 % des défauts** : l'inversion du conditionnement (ta leçon de seconde !) remonte l'arbre, et les probabilités totales fournissent le dénominateur — c'est le raisonnement de Bayes en marche." },
    { tier: "exam", prompt: "Un test dépiste une maladie touchant 1 % de la population, avec une sensibilité de 99 % ($P_M(+) = 0{,}99$) et 2 % de faux positifs ($P_{\\bar{M}}(+) = 0{,}02$). Par la formule des probabilités totales, calcule $P(+)$, puis $P_+(M)$, et commente.", solution: "Partition {M, $\\bar{M}$} : $P(+) = 0{,}01 \\times 0{,}99 + 0{,}99 \\times 0{,}02 = 0{,}0099 + 0{,}0198 = $ **0,0297**. Alors $P_+(M) = \\dfrac{0{,}0099}{0{,}0297} = \\frac{1}{3}$ — un positif sur trois seulement est malade : la formule des probabilités totales transforme le calcul à la main de seconde (les 10 000 personnes) en deux lignes d'arbre, et la rareté de la maladie (1 %) noie les vrais positifs sous les faux — le paradoxe du dépistage, désormais démontrable en toute généralité." },
  ],
  practice: [
    { tier: "warmup", label: "Le produit qui teste", make: (r) => {
      const pa = pick(r, [2, 4, 5]); const pb = pick(r, [2, 3, 4]); const ok = r() < 0.5;
      const inter = ok ? 1 / (pa * pb) : 1 / (pa * pb) * 2;
      return { prompt: `$P(A) = \\frac{1}{${pa}}$, $P(B) = \\frac{1}{${pb}}$, $P(A \\cap B) = \\frac{${ok ? 1 : 2}}{${pa * pb}}$ : indépendants ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$P(A)P(B) = \\frac{1}{${pa * pb}}$ — ${ok ? "égal à l'intersection : **indépendants**" : "différent : **dépendants**"}.` };
    } },
    { tier: "application", label: "Les chemins qui somment", make: (r) => {
      const pa = pick(r, [50, 60, 70]); const d1 = pick(r, [2, 4]); const d2 = pick(r, [5, 10]);
      const tot = (pa * d1 + (100 - pa) * d2) / 100;
      return { prompt: `Fournisseur A : ${pa} % des pièces, ${d1} % de défauts ; B : ${100 - pa} %, ${d2} %. $P(\\text{défaut})$ en % ? (décimal)`, answer: tot, solution: `$${pa / 100} \\times ${d1} + ${(100 - pa) / 100} \\times ${d2} = $ **${String(tot).replace(".", ",")} %** — additionner les chemins.` };
    } },
    { tier: "challenge", label: "L'intersection indépendante", make: (r) => {
      const pa = pick(r, [2, 3, 4]); const pb = pick(r, [2, 5]);
      return { prompt: `A et B indépendants, $P(A) = \\frac{1}{${pa}}$, $P(B) = \\frac{1}{${pb}}$ : $P(A \\cap B) = \\frac{1}{?}$`, answer: pa * pb, solution: `Indépendance : le produit — $\\frac{1}{${pa * pb}}$ → **${pa * pb}**.` };
    } },
  ],
};

// — Bernoulli trials and Monte-Carlo (programme: répétition, n ⩽ 4) —
const bernoulli = {
  id: "probability.high.bernoulli",
  level: "high", domain: "probability",
  title: "Épreuves répétées et Monte-Carlo",
  tagline: "Épreuves de Bernoulli répétées, l'arbre à 2ⁿ issues (et l'estimation de π par simulation).",
  prereqs: ["probability.high.independance"],
  intuition:
    "L'expérience la plus simple du monde : **deux issues** — succès (probabilité $p$) ou échec ($1 - p$). C'est l'**épreuve de Bernoulli** : pile/face, gagné/perdu, défectueux/conforme.\n\nRépète-la $n$ fois, **à l'identique et indépendamment** : l'arbre à $2^n$ chemins déploie tout l'univers — et l'indépendance fait de chaque chemin un simple produit.",
  depths: {
    discovery:
      "**Avec les mains** : deux épreuves indépendantes se croisent en arbre ou en **tableau** — lancer un dé puis une pièce : $6 \\times 2 = 12$ issues, chacune pesant $\\frac{1}{6} \\times \\frac{1}{2}$ : l'indépendance **multiplie** étage par étage, et le tableau à double entrée dessine le produit cartésien — tes deux représentations de toujours, désormais pondérées.",
    standard:
      "**En image** : trois Bernoulli de paramètre $p$ — l'arbre a $2^3 = 8$ chemins ; le chemin SSE (succès-succès-échec) pèse $p \\times p \\times (1-p) = p^2(1-p)$ : **l'ordre ne change pas le poids**, seul compte le nombre de succès. Alors « exactement 2 succès » = **compter les chemins** à 2 succès (SSE, SES, ESS : il y en a 3) et multiplier : $3\\,p^2(1-p)$ — dénombrer puis peser : tout le calcul sur arbre tient dans ce geste, et le triangle des comptes (1, 3, 3, 1 pour $n = 3$) annonce la binomiale de terminale.",
    advanced:
      "**Dans la tête** : le hasard renversé en outil de calcul — la méthode de **Monte-Carlo** : pour estimer une aire, fais pleuvoir $n$ points au hasard dans un carré et compte la proportion qui tombe *dedans* — la fréquence approche la probabilité (loi des grands nombres !), donc le rapport des aires. Pluie dans le carré $[-1\\,;\\,1]^2$, cible le disque unité : la proportion approche $\\frac{\\pi}{4}$ — **le hasard calcule π**. Née à Los Alamos (Ulam et von Neumann, 1946, baptisée du nom du casino), la méthode estime aujourd'hui les intégrales impossibles de la physique et de la finance : chaque point est une épreuve de Bernoulli, et ta répétition d'épreuves devient un instrument de mesure. Les **marches aléatoires** (pile : un pas à droite ; face : à gauche) prolongent le jeu — la bourse et le pollen de Brown marchent ainsi.",
  },
  keyIdea: "Bernoulli : succès $p$, échec $1 - p$. Répétition **identique et indépendante** : chaque chemin de l'arbre $2^n$ pèse $p^{(\\text{succès})}(1-p)^{(\\text{échecs})}$ — l'ordre est indifférent : **compter les chemins, puis peser**. Monte-Carlo : la fréquence d'impact estime une aire (et π).",
  why:
    "Pourquoi tant d'honneurs pour pile ou face ? Parce que la répétition de Bernoulli est l'atome de toute statistique : sondage (pour/contre), contrôle qualité (conforme/défectueux), essai clinique (guéri/non) — $n$ individus, deux issues, indépendance supposée. La loi binomiale de terminale, les intervalles de confiance, les tests d'hypothèse : tout l'édifice inférentiel repose sur cet arbre à $2^n$ branches — et Monte-Carlo montre qu'on peut même *calculer* avec.",
  examples: [
    { title: "Le poids d'un chemin", steps: [
      { p: "Trois Bernoulli, $p = 0{,}7$ : le chemin SSE pèse $0{,}7 \\times 0{,}7 \\times 0{,}3 = 0{,}147$." },
      { p: "SES et ESS pèsent pareil — l'ordre est indifférent : seuls comptent les succès." },
    ] },
    { title: "π sous la pluie", steps: [
      { p: "10 000 points au hasard dans le carré $[-1\\,;\\,1]^2$ : 7 854 tombent dans le disque unité." },
      { p: "$\\frac{7854}{10000} \\approx \\frac{\\pi}{4}$ → $\\pi \\approx 3{,}14$ — la fréquence a mesuré l'aire." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "On lance un dé puis une pièce. Représente l'expérience par un tableau, donne le nombre d'issues et la probabilité de (6, pile).", solution: "Tableau $6 \\times 2$ : **12** issues équiprobables ; indépendance : $P(6 \\text{ et pile}) = \\frac{1}{6} \\times \\frac{1}{2} = \\frac{1}{12}$ — la succession d'épreuves indépendantes multiplie les probabilités, le tableau dessine le produit." },
    { tier: "warmup", prompt: "Une épreuve de Bernoulli a pour paramètre $p = 0{,}7$. On la répète 3 fois. Que pèse le chemin succès-succès-échec ? Et échec-succès-succès ?", solution: "$0{,}7 \\times 0{,}7 \\times 0{,}3 = $ **0,147** — et ESS pèse **pareil** : la multiplication est commutative, l'ordre des succès est indifférent : seul leur *nombre* compte. C'est la clé de tout le calcul sur arbre." },
    { tier: "application", prompt: "Avec 3 répétitions ($p = 0{,}7$) : calcule la probabilité d'obtenir exactement 2 succès (compte les chemins !).", solution: "Chemins à 2 succès : SSE, SES, ESS — **3** chemins, chacun pesant $0{,}7^2 \\times 0{,}3 = 0{,}147$ : $P(2 \\text{ succès}) = 3 \\times 0{,}147 = $ **0,441** — dénombrer puis peser : le triangle 1, 3, 3, 1 fait le reste." },
    { tier: "challenge", prompt: "On lance 4 fois une pièce équilibrée. Quelle est la probabilité d'obtenir au moins un pile ? (pense au contraire !)", solution: "Le contraire de « au moins un pile » est « **que des faces** » : un seul chemin, pesant $\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$ — donc $P = 1 - \\frac{1}{16} = \\frac{15}{16}$ : l'événement contraire évite de compter quinze chemins — le réflexe le plus rentable du chapitre." },
    { tier: "exam", prompt: "Décris la méthode de Monte-Carlo pour estimer π : l'expérience de Bernoulli répétée, la quantité comptée, le lien fréquence-aire, et l'estimation si 7 854 points sur 10 000 tombent dans le disque unité inscrit dans $[-1\\,;\\,1]^2$.", solution: "Chaque point tiré au hasard dans le carré est une **épreuve de Bernoulli** : succès = tomber dans le disque, de probabilité $\\frac{\\text{aire du disque}}{\\text{aire du carré}} = \\frac{\\pi}{4}$ ($\\pi \\times 1^2$ sur $2 \\times 2$). On répète $n = 10\\,000$ fois, identiquement et indépendamment, et la **fréquence** des succès approche la probabilité (loi des grands nombres, vue en seconde) : $\\frac{7854}{10000} \\approx \\frac{\\pi}{4}$, d'où $\\pi \\approx 4 \\times 0{,}7854 = $ **3,1416** — le hasard, transformé en instrument de calcul : l'algorithme officiel du programme, et la méthode de Los Alamos qui estime aujourd'hui ce qu'aucune formule n'atteint." },
  ],
  practice: [
    { tier: "warmup", label: "Le poids du chemin", make: (r) => {
      const p = pick(r, [[1, 2], [1, 3]]); const n = randint(r, 2, 3);
      return { prompt: `Bernoulli $p = \\frac{1}{${p[1]}}$, ${n} succès d'affilée : probabilité $= \\frac{1}{?}$`, answer: p[1] ** n, solution: `$\\left(\\frac{1}{${p[1]}}\\right)^{${n}} = \\frac{1}{${p[1] ** n}}$ — **${p[1] ** n}** : l'indépendance multiplie.` };
    } },
    { tier: "application", label: "Compter les chemins", make: (r) => {
      const n = randint(r, 2, 4); const k = randint(r, 1, n - 1);
      const binom = [[],[],[1,2,1],[1,3,3,1],[1,4,6,4,1]][n][k];
      return { prompt: `${n} épreuves de Bernoulli : combien de chemins comptent exactement ${k} succès ?`, answer: binom, solution: `Sur l'arbre $2^{${n}}$ : **${binom}** chemins — le triangle des comptes (1, ${n === 2 ? "2, 1" : n === 3 ? "3, 3, 1" : "4, 6, 4, 1"}).` };
    } },
    { tier: "challenge", label: "π sous la pluie", make: (r) => {
      const n = pick(r, [1000, 2000, 4000]); const dedans = Math.round(n * Math.PI / 4 / 10) * 10;
      return { prompt: `Monte-Carlo : ${dedans} points sur ${n} tombent dans le disque unité (carré $[-1\\,;\\,1]^2$). Estimation de π ? (au centième)`, answer: Math.round(4 * dedans / n * 100) / 100, solution: `$4 \\times \\frac{${dedans}}{${n}} = $ **${String(Math.round(4 * dedans / n * 100) / 100).replace(".", ",")}** — la fréquence × 4 vise π.` };
    } },
  ],
};

export default [independance, bernoulli];
