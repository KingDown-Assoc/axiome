// Field "Algebra / Analysis" — HIGH module (premiere-pro year), voie
// professionnelle. Official 1re pro programme, domain "Algèbre – Analyse":
// SUITES NUMÉRIQUES (groupements A, B, C — discrete phenomena, arithmetic
// and geometric sequences, recurrence relation u_{n+1}, direction of
// variation), RÉSOLUTION GRAPHIQUE D'ÉQUATIONS ET D'INÉQUATIONS (groupements
// A, B, C — solving f(x) = c and inequalities graphically, second-degree
// equations, finding the second root of a quadratic with one known root)
// and FONCTION DÉRIVÉE ET ÉTUDE DES VARIATIONS (groupements A, B, C —
// number derivative as tangent slope, derivative formulas for reference
// functions and polynomials, sign of f' gives the variations). Singapore
// method: salary/production/workshop contexts as Readiness; bar extensions
// picture arithmetic steps, the percentage coefficient links to geometric
// ratios (Proportionality); curves are read before computed (Diagrams);
// the tangent slope is the affine slope localized.
import { randint, pick } from "../../core/exercises.js";

// — Sequences as discrete evolutions (programme: arithmétiques, géométriques) —
const suitesEvolutions = {
  id: "algebra.high.suites-evolutions",
  level: "high", domain: "algebra",
  title: "Suites : les évolutions pas à pas",
  tagline: "+r chaque mois ou ×q chaque année — deux moteurs pour tous les phénomènes discrets.",
  prereqs: ["algebra.high.premier-degre", "applied.high.proportionnalite-pourcentages"],
  intuition:
    "Un salaire démarre à 1 600 € et gagne 35 € chaque année ; un loyer de 700 € augmente de 2 % chaque année — deux évolutions **pas à pas** : des termes $u_0, u_1, u_2, \\ldots$ numérotés par le temps.\n\nDeux moteurs seulement : **ajouter la même chose** (suite arithmétique, raison $r$) ou **multiplier par la même chose** (suite géométrique, raison $q$) — ton coefficient multiplicateur, embauché comme moteur.",
  depths: {
    discovery:
      "**Avec les mains** : déroule le salaire — 1 600, 1 635, 1 670, 1 705 : chaque année **+35** : pour passer d'un terme au suivant, un seul geste : $u_{n+1} = u_n + 35$ — la relation de **récurrence** dit le moteur, et la barre s'allonge d'un bloc identique à chaque pas : trois blocs ajoutés en trois ans, le dessin compte pour toi.",
    standard:
      "**En image** : le loyer en barres — 700, puis la barre **×1,02** (la barre entière plus 2 parts sur 100 : ta TVA de seconde !), puis encore ×1,02 : $u_{n+1} = 1{,}02 \\times u_n$ — et les deux familles se **distinguent au dessin** : l'arithmétique empile des blocs égaux (croissance en escalier régulier — des points alignés sur une droite !), la géométrique gonfle en proportion (l'escalier dont les marches grandissent) — big idea *Proportionality* : la géométrique est la proportionnalité itérée.",
    advanced:
      "**Dans la tête** : le **sens de variation** se lit sur le moteur — arithmétique : croissante si $r > 0$, décroissante si $r < 0$ ; géométrique (termes positifs) : croissante si $q > 1$, décroissante si $0 < q < 1$ (le stock qui perd 10 % par an : $q = 0{,}9$ — il fond sans jamais s'annuler !). Et le tableur **déroule** : une cellule, une formule tirée vers le bas (`=B2+35` ou `=B2*1,02`), cinquante ans d'évolution en une seconde — le programme veut ce réflexe outil : la suite répond à « que devient mon contrat dans $n$ ans ? » sans formule magique, juste le moteur répété — la formule du terme général attend la terminale.",
  },
  keyIdea: "Phénomène pas à pas → suite $u_0, u_1, \\ldots$ et son **moteur** : $u_{n+1} = u_n + r$ (**arithmétique** : blocs égaux, points alignés) ou $u_{n+1} = q \\times u_n$ (**géométrique** : le coefficient multiplicateur itéré — *Proportionality*). Sens de variation : signe de $r$, position de $q$ par rapport à 1 — et le tableur déroule.",
  why:
    "Pourquoi numéroter le temps ? Parce que les contrats du métier sont **discrets** : salaires annuels, loyers indexés, amortissements, productions mensuelles, stocks — rien n'évolue en continu, tout saute d'échéance en échéance. Reconnaître le moteur (+r ou ×q) répond du premier coup à la vraie question — « et dans cinq ans ? » — et la suite géométrique est la porte des intérêts composés (leçon suivante !) et des exponentielles de terminale : le pas à pas d'aujourd'hui devient la croissance continue de demain.",
  examples: [
    { title: "Le salaire en escalier", steps: [
      { p: "$u_0 = 1600$, $u_{n+1} = u_n + 35$ : 1 600 → 1 635 → 1 670 → 1 705 — blocs égaux." },
      { p: "Arithmétique de raison 35 : croissante ($r > 0$), points alignés sur une droite." },
    ] },
    { title: "Le loyer qui gonfle", steps: [
      { p: "$u_0 = 700$, $u_{n+1} = 1{,}02\\,u_n$ : 700 → 714 → 728,28 — la barre ×1,02 chaque année." },
      { p: "Géométrique de raison 1,02 : les marches grandissent — la proportionnalité itérée." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une citerne contient 5 000 L ; chaque jour, l'atelier en consomme 250 L. Écris $u_0$ et le moteur $u_{n+1}$, déroule trois jours, et nomme la suite.", solution: "$u_0 = 5000$, $u_{n+1} = u_n - 250$ : 5 000 → 4 750 → 4 500 → 4 250 — suite **arithmétique** de raison $-250$, décroissante ($r < 0$) : on retire le même bloc chaque jour — l'escalier descend régulièrement, et la citerne se vide en ligne droite." },
    { tier: "warmup", prompt: "Une machine achetée 12 000 € perd 20 % de sa valeur chaque année. Moteur de la suite, valeurs sur 3 ans, et nature de la suite ?", solution: "Perdre 20 % = garder 80 % : $u_{n+1} = 0{,}8\\,u_n$ — 12 000 → 9 600 → 7 680 → 6 144 € : suite **géométrique de raison 0,8**, décroissante ($0 < q < 1$) — le coefficient multiplicateur de seconde devenu moteur : la machine fond en proportion, jamais du même montant." },
    { tier: "application", prompt: "Deux propositions d'embauche : A — 1 700 € puis +40 €/an ; B — 1 650 € puis +2,5 %/an. Déroule les deux salaires sur 3 ans (au centime) et compare l'écart d'année en année.", solution: "A (arithmétique) : 1 700 ; 1 740 ; 1 780 ; 1 820. B (géométrique, ×1,025) : 1 650 ; 1 691,25 ; 1 733,53 ; 1 776,87 — A garde l'avantage… mais l'écart **fond** (50 → 48,75 → 46,47 → 43,13) : les augmentations de B grandissent (41,25 puis 42,28 puis 43,34 €) quand celles de A stagnent à 40 — l'escalier régulier contre les marches qui grandissent : la géométrique finira par gagner, c'est sa nature." },
    { tier: "challenge", prompt: "Au tableur, la cellule B2 contient 800 et tu tires la formule `=B3=B2*1,03` vers le bas… euh, `=B2*1,03`. (1) Quelle suite déroules-tu ? (2) En B7 (cinq tirages plus bas), quelle grandeur lis-tu, sans la calculer à la main ? (3) Pourquoi le tableur est-il l'outil naturel des suites ?", solution: "(1) Géométrique : $u_0 = 800$, $q = 1{,}03$ — une production qui gagne 3 % par période. (2) B7 affiche $u_5$ : la valeur **après 5 périodes** (≈ 927,42) — chaque ligne est un terme, le numéro de ligne suit le rang. (3) Le tableur **est** une récurrence : chaque cellule se calcule depuis la précédente — tirer la formule, c'est itérer le moteur : cinquante ans d'évolution en un glissement, et le graphique en prime — l'outil que le programme exige, et celui que l'entreprise utilise vraiment." },
    { tier: "exam", prompt: "Un artisan compare deux stratégies pour sa production annuelle de 2 000 pièces : plan P — produire 150 pièces de plus chaque année ; plan Q — augmenter la production de 6 % chaque année. (1) Écris les deux moteurs. (2) Déroule les deux plans sur 4 ans (arrondis à la pièce). (3) Sens de variation et nature de chaque suite. (4) Quel plan dépasse l'autre au bout de 4 ans, et qu'est-ce que la forme des deux escaliers t'aurait permis de prédire sans calculer ?", solution: "(1) P : $u_{n+1} = u_n + 150$ (arithmétique, $r = 150$) ; Q : $v_{n+1} = 1{,}06\\,v_n$ (géométrique, $q = 1{,}06$). (2) P : 2 000 ; 2 150 ; 2 300 ; 2 450 ; 2 600. Q : 2 000 ; 2 120 ; 2 247 ; 2 382 ; 2 525. (3) Toutes deux **croissantes** ($r > 0$ ; $q > 1$). (4) À 4 ans, **P mène encore** (2 600 contre 2 525) — mais les marches de Q grandissent (120, 127, 135, 143…) quand P ajoute toujours 150 : dès que la marche de Q dépasse 150 (vers l'an 6), Q rattrape puis distance P — l'escalier régulier contre l'escalier qui s'accélère : le dessin des deux suites prédit le croisement avant tout calcul, et c'est exactement le duel arithmétique/géométrique que les exponentielles de terminale trancheront définitivement." },
  ],
  practice: [
    { tier: "warmup", label: "Le moteur arithmétique", make: (r) => {
      const u0 = pick(r, [500, 800, 1200]); const raison = pick(r, [25, 50, 100]); const n = randint(r, 2, 4);
      return { prompt: `$u_0 = ${u0}$, $u_{n+1} = u_n + ${raison}$ : que vaut $u_${n}$ ?`, answer: u0 + n * raison, solution: `${n} blocs de ${raison} : $${u0} + ${n * raison} = $ **${u0 + n * raison}**.` };
    } },
    { tier: "application", label: "Le moteur géométrique", make: (r) => {
      const u0 = pick(r, [100, 200, 400]); const q = pick(r, [2, 3]); const n = randint(r, 2, 3);
      return { prompt: `$u_0 = ${u0}$, $u_{n+1} = ${q}\\,u_n$ : que vaut $u_${n}$ ?`, answer: u0 * q ** n, solution: `×${q} répété ${n} fois : **${u0 * q ** n}** — la proportionnalité itérée.` };
    } },
    { tier: "challenge", label: "Croissante ou pas ?", make: (r) => {
      const cas = pick(r, [["arithmétique de raison $-30$", 0], ["géométrique de raison $1{,}05$", 1], ["géométrique de raison $0{,}9$", 0], ["arithmétique de raison $12$", 1]]);
      return { prompt: `Suite ${cas[0]} (termes positifs) : croissante (1) ou décroissante (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Croissante" : "Décroissante"}** — le moteur dit le sens.` };
    } },
  ],
};

// — Graphical solving (programme: f(x)=c, inéquations, second degré) —
const resolutionGraphique = {
  id: "analysis.high.resolution-graphique",
  level: "high", domain: "analysis",
  title: "Résoudre par le graphique",
  tagline: "Résoudre graphiquement f(x) = c à l'aide d'une droite horizontale.",
  prereqs: ["analysis.high.fonctions-affines", "algebra.high.systemes"],
  intuition:
    "La courbe de consommation d'une machine est affichée au mur de l'atelier — question du chef : « à quel régime consomme-t-on 12 L/h ? »\n\nPas besoin de formule : trace la **droite horizontale** $y = 12$ — elle coupe la courbe : les abscisses des intersections **sont** les solutions de $f(x) = 12$ — la courbe répond, big idea *Diagrams*.",
  depths: {
    discovery:
      "**Avec les mains** : pose une règle horizontale à la hauteur $c$ sur la courbe affichée — chaque point de contact se projette verticalement sur l'axe des abscisses : tu **lis** les solutions au doigt — et le nombre de contacts compte les solutions : zéro (la règle passe au-dessus), une, deux… le graphique dit *combien* avant de dire *où*.",
    standard:
      "**En image** : les **inéquations** se colorient — $f(x) \\leq 12$ : surligne les portions de courbe **sous** la règle, projette : un ou plusieurs **intervalles** d'abscisses — et la comparaison de deux offres (tes droites de seconde !) se généralise : $f(x) = g(x)$ se lit aux **croisements des deux courbes**, $f(x) < g(x)$ là où la courbe de $f$ passe dessous — toute la résolution devient géométrie du regard : hauteur, dessus, dessous.",
    advanced:
      "**Dans la tête** : le **second degré** entre en scène — la courbe de $f(x) = x^2 - 6x + 5$ est une **parabole**, et $f(x) = 0$ se lit à ses traversées de l'axe : deux racines (ici 1 et 5), une (le sommet tangent), ou aucune (la parabole flotte) — et l'algèbre complète le regard : si une racine $x_1$ est connue (lue, donnée, ou évidente), la **deuxième se déduit** : le produit des racines vaut $\\dfrac{c}{a}$ (ici $x_1 x_2 = 5$ : avec $x_1 = 1$, $x_2 = 5$ ✓) — le programme veut ce duo : l'œil localise, somme-produit précise — la calculatrice graphique fait les deux d'un coup, mais comprendre ce qu'elle dessine reste ton travail.",
  },
  keyIdea: "$f(x) = c$ : règle horizontale à hauteur $c$, les abscisses des contacts sont les solutions (leur **nombre** se compte au regard) ; $f(x) \\leq c$ : les intervalles **sous** la règle ; $f = g$ : les croisements. Second degré : la **parabole** traverse l'axe 0, 1 ou 2 fois — racine connue ⟹ l'autre par le **produit** $x_1x_2 = \\frac{c}{a}$.",
  why:
    "Pourquoi lire quand on peut calculer ? Parce qu'au métier la courbe arrive **avant** la formule : relevés machine, abaques constructeur, courbes de charge, fiches techniques — des graphiques sans équation. Savoir y résoudre une équation ou une inéquation, c'est exploiter la documentation réelle ; et quand la formule existe, le graphique reste le **garde-fou** : une solution calculée qui ne se voit pas sur la courbe est une erreur démasquée — l'œil et l'algèbre se vérifient l'un l'autre.",
  examples: [
    { title: "La règle horizontale", steps: [
      { p: "Courbe de consommation, règle à $y = 12$ : deux contacts, abscisses 1 800 et 4 200 tr/min." },
      { p: "$f(x) = 12$ a deux solutions — lues, pas calculées : la doc machine a répondu." },
    ] },
    { title: "La deuxième racine offerte", steps: [
      { p: "$x^2 - 6x + 5 = 0$ et $x_1 = 1$ évident ($1 - 6 + 5 = 0$) : produit $= 5$ ⟹ $x_2 = 5$." },
      { p: "La parabole traverse en 1 et 5 — somme-produit a fini le travail de l'œil." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur la courbe de rendement d'un moteur, la règle horizontale à $y = 30$ touche la courbe en deux points d'abscisses 1 200 et 3 600 tr/min. Traduis : quelle équation viens-tu de résoudre, et quelles sont ses solutions ?", solution: "Tu as résolu $f(x) = 30$ : solutions $x = 1200$ et $x = 3600$ tr/min — deux régimes donnent ce rendement (un en montée, un en descente de courbe) — la règle horizontale transforme la question du chef en lecture : les contacts SONT les solutions." },
    { tier: "warmup", prompt: "Même courbe : le rendement dépasse 30 entre les deux contacts. Écris l'inéquation résolue et sa solution en intervalle — et que conseilles-tu comme plage de régime ?", solution: "$f(x) \\geq 30$ : solution $[1200\\,;\\,3600]$ — la portion de courbe AU-DESSUS de la règle, projetée sur l'axe : conseil d'exploitation : maintenir le moteur **entre 1 200 et 3 600 tr/min** — l'inéquation graphique est littéralement la plage de fonctionnement de la fiche technique." },
    { tier: "application", prompt: "Vérifie que 2 est racine de $x^2 - 7x + 10 = 0$, puis trouve l'autre racine par le produit — et décris ce que montre la parabole.", solution: "$4 - 14 + 10 = 0$ ✓ — produit des racines $= \\dfrac{10}{1} = 10$ : l'autre racine vaut $\\dfrac{10}{2} = $ **5** (et la somme confirme : $2 + 5 = 7$ ✓) — la parabole (tournée vers le haut) **traverse l'axe en 2 et 5**, négative entre les deux : une racine lue, l'autre déduite — le duo œil-algèbre du programme." },
    { tier: "challenge", prompt: "Deux machines : coût d'usage $f(x) = 0{,}5x + 200$ (location) et $g(x) = 2x + 50$ (achat amorti), $x$ en heures. Résous graphiquement puis algébriquement $f(x) = g(x)$, et conclus pour l'atelier en distinguant les deux zones.", solution: "Croisement : $0{,}5x + 200 = 2x + 50$ ⟹ $150 = 1{,}5x$ ⟹ $x = $ **100 h** — sur le graphique, la droite de $g$ part plus bas mais grimpe plus vite : **avant 100 h, l'achat amorti coûte moins** ($g$ sous $f$) ; **après, la location gagne** — l'équation donne le point de bascule, l'inéquation graphique (qui est dessous ?) donne la décision : le raisonnement d'investissement complet, lu sur deux droites." },
    { tier: "exam", prompt: "La hauteur d'un jet d'eau de fontaine suit $h(x) = -0{,}5x^2 + 3x$ ($x$ : distance horizontale en m, $h$ : hauteur en m). (1) Vérifie que $x = 0$ est racine et trouve l'autre : où retombe le jet ? (2) Résous graphiquement $h(x) = 4$ : la règle horizontale touche-t-elle ? (calcule $h(2)$, $h(3)$, $h(4)$ pour situer la courbe). (3) Une passerelle haute de 2,5 m doit enjamber le jet : sur quel intervalle le jet dépasse-t-il 2,5 m ? ($h(1) = 2{,}5$ aide.) (4) Conclus pour l'implantation.", solution: "(1) $h(0) = 0$ ✓ ; factorise : $h(x) = x(-0{,}5x + 3)$ — l'autre racine : $x = $ **6 m** : le jet retombe à 6 m. (2) $h(2) = 4$ ✓ ! et $h(3) = 4{,}5$ (le sommet), $h(4) = 4$ : la règle à $y = 4$ touche en $x = 2$ et $x = 4$ — deux solutions, symétriques autour du sommet. (3) $h(1) = 2{,}5$ et par symétrie $h(5) = 2{,}5$ : le jet dépasse 2,5 m sur $]1\\,;\\,5[$. (4) La passerelle doit éviter $]1\\,;\\,5[$ : l'implanter **avant 1 m ou après 5 m** du point de lancement — la parabole lue (racines, sommet, symétrie), la règle horizontale posée deux fois, et la décision de chantier tombe : la résolution graphique au complet." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les contacts", make: (r) => {
      const cas = pick(r, [["au-dessus du sommet de la bosse", 0], ["exactement au sommet", 1], ["sous le sommet, au-dessus des pieds", 2]]);
      return { prompt: `Courbe en bosse ; la règle horizontale passe ${cas[0]} : combien de solutions à $f(x) = c$ ?`, answer: cas[1], solution: `**${cas[1]}** contact${cas[1] > 1 ? "s" : ""} — le graphique compte avant de localiser.` };
    } },
    { tier: "application", label: "La racine évidente", make: (r) => {
      const x1 = pick(r, [1, 2]); const x2 = randint(r, 3, 8);
      return { prompt: `$x^2 - ${x1 + x2}x + ${x1 * x2} = 0$ : vérifie que $${x1}$ est racine — l'autre ?`, answer: x2, solution: `Produit $= ${x1 * x2}$ : l'autre racine $= \\dfrac{${x1 * x2}}{${x1}} = $ **${x2}**.` };
    } },
    { tier: "challenge", label: "Le croisement des coûts", make: (r) => {
      const a1 = pick(r, [1, 2]); const b1 = pick(r, [100, 200]); const a2 = a1 + pick(r, [1, 2]); 
      const x = pick(r, [20, 50, 100]); const b2 = b1 - (a2 - a1) * x;
      return { prompt: `$f(x) = ${a1}x + ${b1}$ et $g(x) = ${a2}x + ${b2}$ : croisement en $x = \\,?$`, answer: x, solution: `$${a2 - a1}x = ${b1 - b2}$ ⟹ $x = $ **${x}** — le point de bascule des deux offres.` };
    } },
  ],
};

// — The derivative as slope (programme: nombre dérivé, fonction dérivée, variations) —
const deriveePente = {
  id: "analysis.high.derivee-pente",
  level: "high", domain: "analysis",
  title: "La dérivée : la pente en chaque point",
  tagline: "La dérivée, pente de la tangente : sa valeur et son signe.",
  prereqs: ["analysis.high.resolution-graphique", "analysis.high.fonctions-affines"],
  intuition:
    "Sur une droite de tarif, la pente disait le prix unitaire — partout la même. Mais la courbe de consommation, elle, **change de pente** : raide ici, plate là.\n\nL'idée de la dérivée : en chaque point, coller la **tangente** — la droite qui épouse la courbe localement — et sa pente est le **nombre dérivé** $f'(a)$ : la pente de la courbe EN ce point.",
  depths: {
    discovery:
      "**Avec les mains** : zoome — prends la courbe de $f(x) = x^2$ autour de $x = 1$ et calcule la pente entre deux points qui se rapprochent : de 1 à 2 : pente $\\dfrac{4 - 1}{2 - 1} = 3$ ; de 1 à 1,5 : $2{,}5$ ; de 1 à 1,1 : $2{,}1$ ; de 1 à 1,01 : $2{,}01$ — les pentes **convergent vers 2** : le nombre dérivé $f'(1) = 2$ est la pente limite — zoomer assez fort rend toute courbe droite : voilà la tangente.",
    standard:
      "**En image** : trace la tangente en plusieurs points de la courbe — au sommet d'une bosse elle est **horizontale** (pente 0 !), dans une montée elle grimpe (pente positive), dans une descente elle plonge (pente négative) : la tangente est le niveau à bulle posé sur la courbe — et le tableau des **formules** évite de zoomer à chaque fois : $f(x) = ax + b \\Rightarrow f'(x) = a$ (une droite a sa pente partout !), $x^2 \\Rightarrow 2x$ (ton zoom : $f'(1) = 2$ ✓), $x^3 \\Rightarrow 3x^2$, $\\dfrac{1}{x} \\Rightarrow -\\dfrac{1}{x^2}$ — et somme et multiple se dérivent terme à terme : tout polynôme se dérive en une ligne.",
    advanced:
      "**Dans la tête** : le théorème pivot — le **signe** de $f'$ dicte le **sens** de $f$ : $f' > 0$ sur un intervalle ⟹ $f$ croissante (toutes les tangentes grimpent : la courbe grimpe), $f' < 0$ ⟹ décroissante, et $f'(a) = 0$ aux **sommets et creux** (tangente horizontale : les extremums !) — le **tableau de variations** s'assemble : ligne du signe de $f'$, ligne des flèches de $f$ : étudier une fonction = dériver, étudier un signe, dessiner les flèches — la procédure complète attend la terminale pour les polynômes de degré 3, mais le principe est entier ici : la dérivée est l'instrument de bord de la courbe — elle dit où ça monte, où ça descend, et où c'est le sommet.",
  },
  keyIdea: "$f'(a)$ = **pente de la tangente** en $a$ (la pente limite du zoom — l'affine localisée). Formules : $(ax+b)' = a$, $(x^2)' = 2x$, $(x^3)' = 3x^2$, $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}$, terme à terme pour les polynômes. **Signe** de $f'$ ⟹ **sens** de $f$ : positif-croissante, négatif-décroissante, nul aux extremums — le tableau de variations.",
  why:
    "Pourquoi une pente locale ? Parce que le métier vit de **taux instantanés** : la consommation à CE régime, le débit à CET instant, le coût marginal de CETTE unité — la moyenne globale ne suffit plus dès qu'on règle une machine. Et le signe de la dérivée est l'outil d'**optimisation** universel : le réglage qui minimise la consommation, le prix qui maximise la recette sont des tangentes horizontales — la terminale en fera son chapitre roi, cette leçon en forge l'instrument.",
  examples: [
    { title: "Le zoom qui converge", steps: [
      { p: "$f(x) = x^2$ en $x = 1$ : pentes 3 ; 2,5 ; 2,1 ; 2,01… → **2** : le nombre dérivé." },
      { p: "Et la formule confirme : $f'(x) = 2x$, donc $f'(1) = 2$ ✓ — le zoom et le tableau d'accord." },
    ] },
    { title: "Le niveau à bulle", steps: [
      { p: "Tangente horizontale au sommet : $f'(a) = 0$ — l'extremum se détecte à la pente nulle." },
      { p: "Avant : $f' > 0$ (ça monte) ; après : $f' < 0$ (ça descend) — le signe raconte la courbe." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur la courbe de $f(x) = x^2$, calcule les pentes entre $x = 3$ et $x = 4$, puis entre 3 et 3,5, puis entre 3 et 3,1. Vers quoi convergent-elles, et que vaut $f'(3)$ par la formule ?", solution: "Pentes : $\\dfrac{16 - 9}{1} = 7$ ; $\\dfrac{12{,}25 - 9}{0{,}5} = 6{,}5$ ; $\\dfrac{9{,}61 - 9}{0{,}1} = 6{,}1$ — elles convergent vers **6** : et $f'(x) = 2x$ donne $f'(3) = $ **6** ✓ — le zoom fabrique le nombre dérivé, la formule le livre d'un coup : deux routes, même pente." },
    { tier: "warmup", prompt: "Dérive : $f(x) = 5x + 3$ ; $g(x) = x^2 - 4x + 1$ ; $h(x) = 2x^3$. (Terme à terme !)", solution: "$f'(x) = $ **5** (la droite garde sa pente partout) ; $g'(x) = 2x - 4$ (le carré donne $2x$, l'affine donne $-4$, la constante s'évapore) ; $h'(x) = 6x^2$ — le tableau des formules + terme à terme : tout polynôme se dérive en une ligne." },
    { tier: "application", prompt: "La courbe de $g(x) = x^2 - 4x + 1$ : résous $g'(x) = 0$, donne le signe de $g'$ de part et d'autre, et dresse le tableau de variations. Où est le creux ?", solution: "$g'(x) = 2x - 4 = 0$ ⟺ $x = 2$ — avant : $g' < 0$ (décroissante ↘), après : $g' > 0$ (croissante ↗) : tableau ↘ puis ↗, **creux** en $x = 2$ où $g(2) = -3$ — la tangente horizontale a localisé le minimum : le signe de la dérivée a tout dit, c'est le théorème pivot en marche." },
    { tier: "challenge", prompt: "Le coût horaire d'une machine selon sa cadence $x$ (pièces/h) suit $C(x) = x + \\dfrac{100}{x}$ pour $x > 0$. Dérive (le tableau donne $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}$), résous $C'(x) = 0$ et trouve la cadence de coût minimal.", solution: "$C'(x) = 1 - \\dfrac{100}{x^2}$ — nul quand $x^2 = 100$ : $x = $ **10 pièces/h** ; avant, $C' < 0$ (le coût descend), après, $C' > 0$ (il remonte) : **minimum en 10**, où $C(10) = 20$ €/h — trop lent, les frais fixes pèsent ; trop vite, l'usure explose : la dérivée a trouvé le réglage optimal — l'optimisation du métier, première version." },
    { tier: "exam", prompt: "La trajectoire d'un bras de découpe suit $f(x) = x^3 - 6x^2 + 9x$ sur $[0\\,;\\,4]$ ($x$ : position, $f$ : hauteur en cm). (1) Calcule $f'(x)$. (2) Résous $f'(x) = 0$ (factorise par 3, puis racine évidente $x = 1$ et produit). (3) Tableau de signes de $f'$ et variations de $f$. (4) Donne les positions des sommets et creux avec leurs hauteurs, et la hauteur maximale atteinte sur le parcours.", solution: "(1) $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3)$. (2) $x = 1$ racine ($1 - 4 + 3 = 0$ ✓), produit $= 3$ ⟹ l'autre racine $= $ **3** : $f'$ s'annule en 1 et 3 — ta résolution graphique au service de la dérivée ! (3) Parabole vers le haut : $f' > 0$ avant 1, $< 0$ entre 1 et 3, $> 0$ après : $f$ **↗ ↘ ↗**. (4) **sommet** en $x = 1$ : $f(1) = 4$ cm ; **creux** en $x = 3$ : $f(3) = 0$ cm ; et au bord, $f(4) = 4$ cm : hauteur maximale **4 cm** (atteinte en 1 et en 4) — dériver, factoriser, signer, conclure : la chaîne complète de l'étude de fonction, et le bras de découpe est réglé — la terminale industrialisera ce geste." },
  ],
  practice: [
    { tier: "warmup", label: "Dériver le polynôme", make: (r) => {
      const a = randint(r, 2, 6); const b = randint(r, 1, 9);
      return { prompt: `$f(x) = x^2 + ${a}x + ${b}$ : que vaut $f'(0)$ ?`, answer: a, solution: `$f'(x) = 2x + ${a}$ : $f'(0) = $ **${a}** — la constante ${b} s'est évaporée.` };
    } },
    { tier: "application", label: "La pente au point", make: (r) => {
      const x = randint(r, 1, 5);
      return { prompt: `$f(x) = x^2$ : pente de la tangente en $x = ${x}$ ?`, answer: 2 * x, solution: `$f'(x) = 2x$ : $f'(${x}) = $ **${2 * x}** — la pente double de l'abscisse.` };
    } },
    { tier: "challenge", label: "La tangente horizontale", make: (r) => {
      const a = pick(r, [2, 4, 6, 8]);
      return { prompt: `$f(x) = x^2 - ${a}x + 1$ : en quel $x$ la tangente est-elle horizontale ?`, answer: a / 2, solution: `$f'(x) = 2x - ${a} = 0$ ⟹ $x = $ **${a / 2}** — le creux, à pente nulle.` };
    } },
  ],
};

export default [suitesEvolutions, resolutionGraphique, deriveePente];
