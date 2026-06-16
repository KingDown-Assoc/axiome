// Field "Probability & statistics" — HIGH module (terminale-pro year), voie
// professionnelle. Official Tle pro programme, domain "Statistique et
// probabilités": STATISTIQUE À DEUX VARIABLES approfondie (when the affine
// adjustment fails: curved clouds, modelling with the functions studied in
// terminale — exponential of base q, decimal logarithm —, choosing and
// CRITICIZING a model) and PROBABILITÉS (building a WEIGHTED PROBABILITY
// TREE for successive trials: multiply along a branch, add the useful
// paths). Singapore method: the tree IS the pictorial organizer (Diagrams
// big idea); maintenance and production contexts as Readiness; the exam
// tiers chain a full professional decision.
import { randint, pick } from "../../core/exercises.js";

// — Adjustments and models (programme: stat 2 variables approfondie) —
const ajustementsModeles = {
  id: "probability.high.ajustements-modeles",
  level: "high", domain: "probability",
  title: "Ajuster un modèle aux données",
  tagline: "Quand un nuage de points n'est pas linéaire, passer à un modèle exponentiel.",
  prereqs: ["probability.high.nuage-ajustement", "analysis.high.exponentielles-log-decimal"],
  intuition:
    "Le nombre d'utilisateurs d'une appli interne : 50, 110, 240, 530, 1 160 — trace le nuage : il **se courbe** vers le haut, la droite passe à côté de tout.\n\nRegarde autrement : chaque valeur fait environ **×2,2** la précédente — le bon modèle n'est pas affine mais **exponentiel** : $y = 50 \\times 2{,}2^x$ — choisir le modèle, c'est d'abord regarder la forme du nuage.",
  depths: {
    discovery:
      "**Avec les mains** : teste les deux moteurs sur les données — les **différences** : 60, 130, 290, 630 (rien de constant : pas affine) ; les **quotients** : 2,2 ; 2,18 ; 2,21 ; 2,19 (presque constant !) : le nuage avoue son moteur — différences constantes → droite, quotients constants → exponentielle : le diagnostic de seconde main, avant tout outil.",
    standard:
      "**En image** : la parade graphique du programme — le **changement de variable** : pose $Y = \\log(y)$ et retrace le nuage $(x\\,;\\,Y)$ : s'il s'**aligne**, le modèle exponentiel est confirmé (le log écrase les multiplications en additions : ta leçon d'analyse au service des stats !) — et la droite d'ajustement de CE nuage redonne le modèle : l'outil affine de première ressert, une marche plus haut — big idea *Equivalence* : changer de variable, c'est regarder les mêmes données sous l'angle qui les rend droites.",
    advanced:
      "**Dans la tête** : le métier du modélisateur tient en trois questions — **lequel ?** (la forme du nuage et le test différences/quotients choisissent affine ou exponentiel) ; **à quel point ?** (comparer les valeurs du modèle aux valeurs réelles : les écarts — résidus — doivent rester petits ET sans tendance) ; **jusqu'où ?** (ton garde-fou de première, durci : un modèle exponentiel extrapolé explose vite — ×2,2 par période double tous les 9 mois, aucune appli ne recrute l'humanité entière) — le modèle est un **outil de décision daté**, jamais une prophétie : on le choisit, on le critique, on le borne — dans cet ordre.",
  },
  keyIdea: "Diagnostic du moteur : **différences** constantes → modèle affine ; **quotients** constants → modèle **exponentiel** $y = a \\times q^x$. Changement de variable $Y = \\log y$ : si le nuage s'aligne, l'exponentiel est confirmé (*Equivalence*). Puis critiquer (écarts modèle-réel) et **borner** l'extrapolation.",
  why:
    "Pourquoi plusieurs modèles ? Parce que le réel a plusieurs moteurs : une usure s'accumule (affine), une épidémie ou une adoption se multiplie (exponentiel), une saturation plafonne — coller une droite sur une courbe, c'est prévoir faux avec assurance. Le programme de terminale arme le technicien du choix : tester, transformer, critiquer — la compétence qui distingue celui qui subit le tableur de celui qui sait ce que sa courbe de tendance raconte.",
  examples: [
    { title: "Le diagnostic des quotients", steps: [
      { p: "50, 110, 240, 530 : différences 60, 130, 290 (variables) — quotients ≈ 2,2 (constant !)." },
      { p: "Moteur multiplicatif : modèle $y = 50 \\times 2{,}2^x$ — l'exponentielle élue par les données." },
    ] },
    { title: "Le log qui redresse", steps: [
      { p: "$Y = \\log y$ : 1,70 ; 2,04 ; 2,38 ; 2,72 — différences ≈ 0,34 constantes : ALIGNÉ." },
      { p: "Le nuage courbé est devenu droit : l'exponentiel confirmé par le changement de variable." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Production de rebuts d'une machine vieillissante, par trimestre : 8, 12, 18, 27, 40. Calcule différences et quotients : quel moteur, quel modèle proposes-tu ?", solution: "Différences : 4, 6, 9, 13 — croissantes, pas affine ; quotients : 1,5 ; 1,5 ; 1,5 ; 1,48 — **constants** : moteur multiplicatif, modèle **exponentiel** $y = 8 \\times 1{,}5^x$ : les rebuts gagnent 50 % par trimestre — le diagnostic différences/quotients tranche en deux lignes de calcul." },
    { tier: "warmup", prompt: "Avec le modèle $y = 8 \\times 1{,}5^x$ : prédis les rebuts au trimestre 5 et au trimestre 6, et compare au réel si le trimestre 5 donne 62 rebuts : le modèle tient-il ?", solution: "$y(5) = 8 \\times 1{,}5^5 \\approx $ **61** et $y(6) \\approx $ **91** — le réel (62) colle à la prédiction (61) : écart ≈ 1,6 %, le modèle **tient** pour l'instant — comparer chaque nouvelle mesure au modèle est la maintenance du modèle lui-même : on le garde tant qu'il prédit juste." },
    { tier: "application", prompt: "Données : (0 ; 50), (1 ; 110), (2 ; 240), (3 ; 530). Passe en $Y = \\log y$ (valeurs : 1,70 ; 2,04 ; 2,38 ; 2,72), vérifie l'alignement, et explique POURQUOI le log redresse un nuage exponentiel.", solution: "Différences de $Y$ : 0,34 ; 0,34 ; 0,34 — **parfaitement alignées** : modèle exponentiel confirmé. Pourquoi : si $y = a \\times q^x$, alors $\\log y = \\log a + x\\log q$ — une fonction **affine** de $x$ (pente $\\log q$ !) : le log transforme les multiplications en additions, donc l'exponentielle en droite — le changement de variable du programme, et la raison d'être du papier semi-log des ateliers." },
    { tier: "challenge", prompt: "Sur le nuage redressé précédent, la droite d'ajustement donne $Y = 0{,}34x + 1{,}70$. Remonte au modèle exponentiel : retrouve $a$ et $q$ (rappel : $\\log a = 1{,}70 \\Leftrightarrow a = 10^{1{,}70} \\approx 50$ ; même jeu pour $q$).", solution: "$\\log a = 1{,}70$ ⟹ $a \\approx $ **50** ; $\\log q = 0{,}34$ ⟹ $q = 10^{0{,}34} \\approx $ **2,2** : modèle $y = 50 \\times 2{,}2^x$ ✓ — l'aller-retour complet : le log a redressé, la droite a ajusté, la puissance de 10 a remonté — l'outil affine de première travaille pour l'exponentielle de terminale : rien ne se perd." },
    { tier: "exam", prompt: "Une bactérie contamine une chaîne agroalimentaire ; relevés (jours ; colonies) : (0 ; 20), (1 ; 44), (2 ; 97), (3 ; 215). Norme sanitaire : arrêt de chaîne à 5 000 colonies. (1) Diagnostic du moteur (quotients). (2) Modèle, et prédiction à $j = 5$. (3) Avec le log : à partir de quel jour la norme est-elle franchie ? ($2{,}2^n \\geq 250$, et $\\dfrac{\\log 250}{\\log 2{,}2} \\approx 7$.) (4) Deux raisons professionnelles de ne PAS attendre ce jour 7 pour agir.", solution: "(1) Quotients : 2,2 ; 2,20 ; 2,22 — **constants** : croissance exponentielle. (2) $y = 20 \\times 2{,}2^x$ ; $y(5) = 20 \\times 2{,}2^5 \\approx $ **1 030 colonies**. (3) $20 \\times 2{,}2^n \\geq 5000$ ⟺ $2{,}2^n \\geq 250$ ⟺ $n \\geq \\dfrac{\\log 250}{\\log 2{,}2} \\approx 7$ : **norme franchie au jour 7** — le log a résolu l'inéquation exponentielle. (4) D'abord, le modèle est une **moyenne** : la fluctuation peut franchir la norme avant la prédiction ; ensuite, l'extrapolation suppose le moteur constant — un changement de température peut l'**accélérer** : en hygiène, on agit sur la tendance, pas sur la date prédite — le modèle a donné l'ordre de grandeur (quelques jours, pas quelques heures ni quelques mois), c'est exactement son travail." },
  ],
  practice: [
    { tier: "warmup", label: "Le diagnostic du moteur", make: (r) => {
      const expo = r() < 0.5; const u0 = pick(r, [10, 20]); const k = expo ? pick(r, [2, 3]) : pick(r, [15, 25]);
      const vals = expo ? [u0, u0 * k, u0 * k * k, u0 * k ** 3] : [u0, u0 + k, u0 + 2 * k, u0 + 3 * k];
      return { prompt: `Données : ${vals.join(", ")} — modèle affine (0) ou exponentiel (1) ?`, answer: expo ? 1 : 0, solution: `${expo ? "Quotients constants (×" + k + ")" : "Différences constantes (+" + k + ")"} : **${expo ? "exponentiel" : "affine"}**.` };
    } },
    { tier: "application", label: "Prédire avec le modèle", make: (r) => {
      const a = pick(r, [10, 20]); const q = pick(r, [2, 3]); const x = randint(r, 2, 4);
      return { prompt: `Modèle $y = ${a} \\times ${q}^x$ : prédiction pour $x = ${x}$ ?`, answer: a * q ** x, solution: `$${a} \\times ${q ** x} = $ **${a * q ** x}** — le moteur multiplicatif déroulé.` };
    } },
    { tier: "challenge", label: "Le log qui redresse", make: (r) => {
      const logq = pick(r, [[2, 0.3], [10, 1], [100, 2]]);
      return { prompt: `Si $y = 5 \\times ${logq[0]}^x$, le nuage $(x\\,;\\,\\log y)$ est une droite de pente $\\log ${logq[0]} ${logq[0] === 2 ? "\\approx" : "="} \\,?$ (décimal)`, answer: logq[1], solution: `Pente $= \\log ${logq[0]} ${logq[0] === 2 ? "\\approx" : "="} $ **${String(logq[1]).replace(".", ",")}** — l'exponentielle redressée en droite.` };
    } },
  ],
};

// — Weighted probability trees (programme: arbres pondérés, épreuves successives) —
const arbresProbabilites = {
  id: "probability.high.arbres-probabilites",
  level: "high", domain: "probability",
  title: "Les arbres de probabilités",
  tagline: "Multiplier le long des branches, additionner les chemins utiles — l'arbre organise le hasard.",
  prereqs: ["probability.high.evenements-ensembles"],
  intuition:
    "Deux contrôles successifs : la pièce passe au contrôle visuel (95 % de réussite), puis au contrôle dimensionnel (90 %) — quelle probabilité de passer les deux ?\n\nL'**arbre pondéré** dessine les scénarios : deux branches au premier contrôle, deux à chaque suite — quatre chemins, chacun avec sa probabilité : big idea *Diagrams* — l'arbre range TOUS les futurs possibles.",
  depths: {
    discovery:
      "**Avec les mains** : déroule 1 000 pièces fictives — 950 passent le visuel (50 recalées) ; sur ces 950, 90 % passent le dimensionnel : 855 — la proportion finale : $\\dfrac{855}{1000} = 0{,}855$ — tu viens de **multiplier** $0{,}95 \\times 0{,}9$ sans le savoir : prendre une fraction D'UNE fraction, c'est multiplier — l'effectif fictif rend la règle évidente.",
    standard:
      "**En image** : l'arbre et ses deux règles — chaque nœud porte ses branches dont les probabilités **somment à 1** (on va bien quelque part !) ; règle 1 : le long d'un chemin, on **multiplie** (passer PUIS passer : $0{,}95 \\times 0{,}9 = 0{,}855$) ; règle 2 : entre chemins qui réalisent le même événement, on **additionne** (« exactement un contrôle raté » = deux chemins : $0{,}95 \\times 0{,}1 + 0{,}05 \\times 0{,}9 = 0{,}14$) — l'arbre EST le tableau de seconde, déplié dans le temps.",
    advanced:
      "**Dans la tête** : la subtilité professionnelle — les probabilités du **deuxième étage dépendent de la branche** : après un défaut visuel détecté, la pièce part en retouche où le contrôle suivant n'a plus le même taux : l'arbre encode ces probabilités *conditionnelles* sans le dire (chaque branche du second niveau se lit « sachant d'où je viens ») — et le raccourci roi tient toujours : « au moins un défaut » se calcule par le **contraire** (« aucun » = le chemin tout-bon) : $1 - 0{,}855 = 0{,}145$ en une ligne, là où trois chemins s'additionnaient — l'arbre organise, les deux règles calculent, le contraire raccourcit : la panoplie complète des épreuves successives.",
  },
  keyIdea: "Arbre pondéré : à chaque nœud, les branches **somment à 1** ; le long d'un chemin on **multiplie**, entre chemins utiles on **additionne** (*Diagrams* : tous les futurs, rangés). Le second étage se lit « sachant d'où je viens » — et « au moins un » passe par le **contraire** (le chemin tout-bon).",
  why:
    "Pourquoi un arbre quand un tableau suffisait ? Parce que le tableau photographie UN tri, l'arbre déroule une **succession** : contrôles en chaîne, pannes en cascade, tests médicaux, fiabilité d'un process en plusieurs étapes — le quotidien industriel est séquentiel. Et l'arbre est honnête : il force à écrire TOUS les scénarios et leurs poids — la probabilité oubliée saute aux yeux (les branches ne somment plus à 1) : c'est l'outil anti-oubli du raisonnement sous incertitude.",
  examples: [
    { title: "Les 1 000 pièces fictives", steps: [
      { p: "1 000 pièces → 950 passent le visuel → 855 passent aussi le dimensionnel." },
      { p: "$0{,}95 \\times 0{,}9 = 0{,}855$ — multiplier le long du chemin : la fraction d'une fraction." },
    ] },
    { title: "Le contraire qui raccourcit", steps: [
      { p: "« Au moins un contrôle raté » : trois chemins à additionner… ou le contraire du tout-bon." },
      { p: "$1 - 0{,}855 = 0{,}145$ — une soustraction au lieu de trois produits : le réflexe d'or." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une machine démarre du premier coup 8 fois sur 10 ; si elle démarre, la production du jour est bonne 9 fois sur 10. Sur 100 journées fictives, combien de journées « démarrage + bonne production » ? Traduis en probabilité.", solution: "100 jours → 80 démarrages → 72 bonnes productions : $P = \\dfrac{72}{100} = $ **0,72** — et la règle confirme : $0{,}8 \\times 0{,}9 = 0{,}72$ ✓ — l'effectif fictif rend la multiplication des branches concrète : une fraction d'une fraction." },
    { tier: "warmup", prompt: "Dessine (décris) l'arbre complet de la machine : les quatre chemins et leurs probabilités. Vérifie que le total fait 1.", solution: "Démarre (0,8) → bonne (0,9) : **0,72** ; démarre → mauvaise (0,1) : **0,08** ; ne démarre pas (0,2) → bonne quand même après relance (disons 0,5) : **0,10** ; ne démarre pas → mauvaise : **0,10** — total $0{,}72 + 0{,}08 + 0{,}10 + 0{,}10 = 1$ ✓ — l'arbre range TOUS les futurs : si la somme n'est pas 1, un scénario s'est échappé." },
    { tier: "application", prompt: "Deux fournisseurs : A livre 70 % des pièces avec 2 % de défauts ; B livre 30 % avec 5 % de défauts. Arbre, puis : probabilité qu'une pièce prise au hasard soit défectueuse (deux chemins à additionner).", solution: "Chemins « défectueuse » : $A \\to D$ : $0{,}7 \\times 0{,}02 = 0{,}014$ ; $B \\to D$ : $0{,}3 \\times 0{,}05 = 0{,}015$ — somme : $P(D) = $ **0,029** (2,9 %) — multiplier le long, additionner entre : les deux règles enchaînées, et la surprise utile : B livre moins mais fournit plus de la moitié des défauts — l'arbre l'a montré chemin par chemin." },
    { tier: "challenge", prompt: "Un système d'alarme a deux détecteurs indépendants, chacun fiable à 90 %. Par l'arbre : probabilité qu'au moins UN détecteur fonctionne en cas d'intrusion — directement, puis par le contraire. Lequel généralise à 5 détecteurs ?", solution: "Contraire : « aucun ne fonctionne » $= 0{,}1 \\times 0{,}1 = 0{,}01$ ⟹ $P(\\text{au moins un}) = $ **0,99** — en direct : $0{,}9 \\times 0{,}9 + 0{,}9 \\times 0{,}1 + 0{,}1 \\times 0{,}9 = 0{,}99$ ✓ — mêmes 99 %, mais à 5 détecteurs le direct exige 31 chemins quand le contraire reste UNE ligne : $1 - 0{,}1^5 = 0{,}99999$ — la redondance industrielle se calcule toujours par le chemin tout-mauvais." },
    { tier: "exam", prompt: "Une chaîne d'embouteillage : le remplissage est conforme à 96 % ; une bouteille bien remplie est bien bouchée à 98 %, mais une bouteille mal remplie (mousse) n'est bien bouchée qu'à 80 %. (1) Arbre complet, quatre chemins. (2) Probabilité qu'une bouteille soit conforme sur les deux critères. (3) Probabilité qu'elle soit bien bouchée (deux chemins). (4) Le service qualité observe une bouteille MAL bouchée : des deux origines possibles (bien ou mal remplie), laquelle est la plus probable ? Compare les deux chemins menant à « mal bouchée » et conclus pour le réglage de la chaîne.", solution: "(1) Chemins : $R\\bar{?}$… posons R = bien remplie : $R \\to B$ : $0{,}96 \\times 0{,}98 = 0{,}9408$ ; $R \\to \\bar{B}$ : $0{,}96 \\times 0{,}02 = 0{,}0192$ ; $\\bar{R} \\to B$ : $0{,}04 \\times 0{,}8 = 0{,}032$ ; $\\bar{R} \\to \\bar{B}$ : $0{,}04 \\times 0{,}2 = 0{,}008$ — somme 1 ✓. (2) $P(R \\cap B) = $ **0,9408**. (3) $P(B) = 0{,}9408 + 0{,}032 = $ **0,9728**. (4) « Mal bouchée » vient de deux chemins : $0{,}0192$ (via bien remplie) contre $0{,}008$ (via mal remplie) — **l'origine « bien remplie » est plus de deux fois plus probable** ($\\frac{0{,}0192}{0{,}0272} \\approx 71$ %) : contre-intuitif (le mauvais remplissage bouche pourtant moins bien !) mais les 96 % de bouteilles bien remplies pèsent lourd — conclusion d'atelier : régler d'abord la **boucheuse**, pas le remplissage — l'arbre a comparé les chemins, et la décision de maintenance tombe du bon côté : c'est le raisonnement « sachant l'effet, chercher la cause », que la voie générale appelle Bayes — toi, tu l'as lu sur un arbre." },
  ],
  practice: [
    { tier: "warmup", label: "Multiplier le chemin", make: (r) => {
      const p1 = pick(r, [[0.8, "0{,}8"], [0.9, "0{,}9"]]); const p2 = pick(r, [[0.5, "0{,}5"], [0.9, "0{,}9"]]);
      return { prompt: `Chemin : branche $${p1[1]}$ puis branche $${p2[1]}$ — probabilité du chemin ? (décimal)`, answer: Math.round(p1[0] * p2[0] * 100) / 100, solution: `$${p1[1]} \\times ${p2[1]} = $ **${String(Math.round(p1[0] * p2[0] * 100) / 100).replace(".", ",")}** — le long du chemin, on multiplie.` };
    } },
    { tier: "application", label: "Les branches somment à 1", make: (r) => {
      const p = pick(r, [85, 92, 96]);
      return { prompt: `Au nœud, une branche porte $0{,}${p}$ : l'autre ? (en centièmes : réponds l'entier)`, answer: 100 - p, solution: `$1 - 0{,}${p} = 0{,}${String(100 - p).padStart(2, "0")}$ — **${100 - p}** centièmes : on va bien quelque part.` };
    } },
    { tier: "challenge", label: "Au moins un, par le contraire", make: (r) => {
      const p = pick(r, [[0.9, "0{,}9", 0.99], [0.8, "0{,}8", 0.96]]);
      return { prompt: `Deux dispositifs indépendants fiables à $${p[1]}$ : $P(\\text{au moins un marche})$ ? (décimal)`, answer: p[2], solution: `$1 - ${String(Math.round((1 - p[0]) * 100) / 100).replace(".", ",")}^2 = $ **${String(p[2]).replace(".", ",")}** — le contraire du tout-mauvais.` };
    } },
  ],
};

export default [ajustementsModeles, arbresProbabilites];
