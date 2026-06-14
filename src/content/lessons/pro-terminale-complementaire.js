// Field "Geometry / Analysis" — HIGH module (terminale-pro year), voie
// professionnelle. Official Tle pro programme: GÉOMÉTRIE (representing in
// a 3D coordinate system — the space repère; VECTEURS, groupement B,
// absorbed as displacement coordinates) and TRIGONOMÉTRIE (groupement A —
// solving trigonometric equations cos x = a and sin x = a, periodic
// modelling), plus the PROGRAMME COMPLÉMENTAIRE en vue d'une poursuite
// d'études: CALCUL INTÉGRAL (primitives by reverse reading of a derivative
// table, F + k, integral = F(b) − F(a), area under a positive curve,
// rectangle method, "aucune virtuosité calculatoire") and FONCTIONS
// LOGARITHME NÉPÉRIEN ET EXPONENTIELLE (ln variations and graph, the
// number e, operational properties, ln(x) = a ⟺ x = e^a, exp of base e).
// The complementary modules are chosen by orientation project; nombres
// complexes and produit scalaire (also in the complement) are mentioned as
// extensions. Singapore method: the circle solves before formulas (Diagrams),
// the integral measures (Measures), ln↔e^a is the inverse reading
// (Equivalence), CN-machine and flow-rate contexts as Readiness.
import { randint, pick } from "../../core/exercises.js";

// — The 3D coordinate space (programme: repère de l'espace + vecteurs B) —
const espaceRepere = {
  id: "geometry.high.espace-repere",
  level: "high", domain: "geometry",
  title: "L'espace repéré",
  tagline: "Trois nombres, une adresse — le langage natal des machines à commande numérique.",
  prereqs: ["geometry.high.espace-representations"],
  intuition:
    "En première, tu donnais des adresses de perçage $(x\\,;\\,y\\,;\\,z)$ sur UNE face — la terminale installe le **repère complet** : une origine au coin de la table, trois axes, et tout point de l'espace de travail reçoit ses trois coordonnées.\n\nC'est le langage natal de la fraiseuse CN, du bras robotisé, de l'imprimante 3D : *« va en (120 ; 45 ; 30) »* — trois nombres, zéro ambiguïté.",
  depths: {
    discovery:
      "**Avec les mains** : repère un objet dans l'atelier — la perceuse posée sur l'établi : 3 m depuis le mur du fond, 2 m depuis le mur de gauche, 0,9 m de hauteur : **trois nombres suffisent toujours** — change un seul des trois et tu désignes un autre point : l'espace entier tient dans des triplets, et placer un point, c'est faire le **parcours en trois étapes** : avancer de $x$, glisser de $y$, monter de $z$.",
    standard:
      "**En image** : le repère dessiné en perspective cavalière (ta première !) — l'origine $O$ au coin, trois axes fléchés, et le point $M(4\\,;\\,3\\,;\\,2)$ se construit comme le **coin opposé d'un pavé** posé en $O$ : 4 de long, 3 de large, 2 de haut — le pavé fantôme rend le point lisible ; et le **milieu** d'un segment se calcule coordonnée par coordonnée : la moyenne des $x$, des $y$, des $z$ — le centre de gravité de deux perçages, par trois additions.",
    advanced:
      "**Dans la tête** : le **vecteur** entre en scène (le module du groupement B, absorbé ici) — le déplacement de l'outil de $A(10\\,;\\,25\\,;\\,5)$ vers $B(40\\,;\\,25\\,;\\,17)$ se code $\\overrightarrow{AB}(30\\,;\\,0\\,;\\,12)$ : **les différences de coordonnées** — avancer de 30, ne pas glisser, monter de 12 : le vecteur EST l'ordre de déplacement, et deux ordres s'enchaînent en **additionnant** les triplets — big idea *Notations* : trois nombres codent un point (l'état) comme un déplacement (l'action), et la machine ne distingue les deux que par le contexte. Pour la poursuite d'études, le complémentaire ajoute le **produit scalaire** (mesurer les angles entre vecteurs) : la porte des trajectoires obliques — ici, on pose le repère qui rendra tout cela calculable.",
  },
  keyIdea: "Un point de l'espace $= (x\\,;\\,y\\,;\\,z)$ — le parcours en trois étapes, le coin opposé du pavé. **Milieu** : la moyenne coordonnée par coordonnée ; **vecteur** $\\overrightarrow{AB}$ : les différences (l'ordre de déplacement) — big idea *Notations* : trois nombres, une adresse ou une action.",
  why:
    "Pourquoi repérer l'espace alors que la pièce est sous tes yeux ? Parce que la machine, elle, ne voit rien : elle exécute des nombres — et tout l'usinage moderne (CN, robots, impression 3D, métrologie laser) vit dans ce repère : programmer une trajectoire, c'est écrire une suite de triplets. La poursuite d'études en fera la géométrie analytique complète (droites, plans, distances obliques) ; le métier en exige déjà la lecture courante : le repère de l'espace est le trait d'union entre ton plan coté et le G-code de la machine.",
  examples: [
    { title: "Le pavé fantôme", steps: [
      { p: "$M(4\\,;\\,3\\,;\\,2)$ : avance de 4, glisse de 3, monte de 2 — le coin opposé du pavé posé en $O$." },
      { p: "Change un nombre, change de point : le triplet est une adresse exacte." },
    ] },
    { title: "L'ordre de déplacement", steps: [
      { p: "De $A(10\\,;\\,25\\,;\\,5)$ à $B(40\\,;\\,25\\,;\\,17)$ : $\\overrightarrow{AB}(30\\,;\\,0\\,;\\,12)$ — les différences." },
      { p: "« Avance de 30, monte de 12 » : le vecteur est l'instruction que la CN exécute." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans le repère de l'atelier (en mètres), place mentalement $P(2\\,;\\,4\\,;\\,1)$ : décris le parcours en trois étapes, puis donne le point situé juste au sol à sa verticale.", solution: "Parcours : **avancer de 2, glisser de 4, monter de 1** — le pavé fantôme de 2 × 4 × 1 ; à la verticale au sol : même $x$, même $y$, hauteur nulle : $(2\\,;\\,4\\,;\\,0)$ — annuler la troisième coordonnée, c'est projeter au sol : chaque coordonnée pilote UN axe, indépendamment des autres." },
    { tier: "warmup", prompt: "Deux perçages : $A(10\\,;\\,30\\,;\\,0)$ et $B(50\\,;\\,30\\,;\\,0)$ (mm). Donne le milieu $I$ du segment, et la distance $AB$ (regarde quelles coordonnées changent !).", solution: "Milieu : moyennes — $I\\left(\\dfrac{10 + 50}{2}\\,;\\,30\\,;\\,0\\right) = (30\\,;\\,30\\,;\\,0)$ ; distance : seule $x$ change : $AB = 50 - 10 = $ **40 mm** — quand un seul axe bouge, la distance se lit dessus : le perçage intermédiaire tombe au milieu arithmétique." },
    { tier: "application", prompt: "L'outil est en $A(15\\,;\\,20\\,;\\,8)$ et doit rejoindre $B(45\\,;\\,50\\,;\\,8)$. (1) Coordonnées du vecteur déplacement. (2) Que signifie sa troisième coordonnée pour l'opérateur ? (3) Depuis $B$, on applique le MÊME vecteur : où arrive l'outil ?", solution: "(1) $\\overrightarrow{AB}(45 - 15\\,;\\,50 - 20\\,;\\,8 - 8) = (30\\,;\\,30\\,;\\,0)$. (2) Troisième coordonnée nulle : **l'outil reste à hauteur constante** — un déplacement plan, sans plongée : aucune retouche de profondeur. (3) Depuis $B$ : ajouter le triplet — $(45 + 30\\,;\\,50 + 30\\,;\\,8) = (75\\,;\\,80\\,;\\,8)$ — le même ordre répété : c'est ainsi qu'on programme une rangée de perçages régulière." },
    { tier: "challenge", prompt: "Quatre perçages doivent former un rectangle sur la face $z = 0$ : trois sont faits — $A(10\\,;\\,10\\,;\\,0)$, $B(70\\,;\\,10\\,;\\,0)$, $C(70\\,;\\,50\\,;\\,0)$. Trouve le quatrième $D$ par le raisonnement vectoriel ($\\overrightarrow{AD}$ doit égaler $\\overrightarrow{BC}$), et vérifie par le milieu des diagonales.", solution: "$\\overrightarrow{BC} = (0\\,;\\,40\\,;\\,0)$ — appliquer depuis $A$ : $D = (10\\,;\\,50\\,;\\,0)$ ; vérification : milieu de $[AC] = (40\\,;\\,30\\,;\\,0)$ et milieu de $[BD] = (40\\,;\\,30\\,;\\,0)$ ✓ — **les diagonales d'un rectangle se coupent en leur milieu** : deux routes (le vecteur copié, les milieux égaux) vers le même perçage — la géométrie de collège, devenue contrôle qualité en coordonnées." },
    { tier: "exam", prompt: "Une imprimante 3D fabrique un support : la buse part de l'origine $O(0\\,;\\,0\\,;\\,0)$, rejoint $A(60\\,;\\,0\\,;\\,0)$, puis $B(60\\,;\\,40\\,;\\,0)$, puis monte d'une couche vers $C(60\\,;\\,40\\,;\\,0{,}2)$. (1) Donne les trois vecteurs déplacements successifs. (2) Quel vecteur unique aurait mené $O$ à $C$ directement, et vérifie qu'il est la somme des trois. (3) Le milieu de la diagonale $[OC]$ doit recevoir un renfort : ses coordonnées ? (4) La couche suivante répète le circuit à $z = 0{,}4$ : sans calcul, donne les coordonnées du point homologue de $B$ — et explique pourquoi le repère rend cette répétition triviale à programmer.", solution: "(1) $\\overrightarrow{OA}(60\\,;\\,0\\,;\\,0)$, $\\overrightarrow{AB}(0\\,;\\,40\\,;\\,0)$, $\\overrightarrow{BC}(0\\,;\\,0\\,;\\,0{,}2)$ — trois ordres purs, un par axe. (2) $\\overrightarrow{OC}(60\\,;\\,40\\,;\\,0{,}2)$ — et la somme : $(60 + 0 + 0\\,;\\,0 + 40 + 0\\,;\\,0 + 0 + 0{,}2)$ ✓ : **enchaîner des déplacements, c'est additionner des triplets**. (3) Milieu : $(30\\,;\\,20\\,;\\,0{,}1)$ — les moyennes. (4) $B$ homologue : $(60\\,;\\,40\\,;\\,0{,}4)$ — mêmes $x, y$, le $z$ de la couche : tout le circuit se répète en incrémentant UNE coordonnée — c'est exactement l'architecture du G-code : le repère transforme « refaire pareil un cran plus haut » en une addition — la fabrication additive entière repose sur ce triplet." },
  ],
  practice: [
    { tier: "warmup", label: "Le parcours en trois pas", make: (r) => {
      const x = randint(r, 2, 8); const y = randint(r, 2, 8); const z = randint(r, 1, 5); const axe = pick(r, [["avancée (x)", x], ["glissée (y)", y], ["montée (z)", z]]);
      return { prompt: `Point $(${x}\\,;\\,${y}\\,;\\,${z})$ : que vaut la ${axe[0]} du parcours ?`, answer: axe[1], solution: `**${axe[1]}** — chaque coordonnée pilote son axe.` };
    } },
    { tier: "application", label: "Le milieu des perçages", make: (r) => {
      const x1 = randint(r, 5, 20); const x2 = x1 + 2 * randint(r, 5, 20); const y = randint(r, 10, 40);
      return { prompt: `$A(${x1}\\,;\\,${y}\\,;\\,0)$ et $B(${x2}\\,;\\,${y}\\,;\\,0)$ : abscisse du milieu ?`, answer: (x1 + x2) / 2, solution: `$\\dfrac{${x1} + ${x2}}{2} = $ **${(x1 + x2) / 2}** — la moyenne, coordonnée par coordonnée.` };
    } },
    { tier: "challenge", label: "L'ordre de déplacement", make: (r) => {
      const a = randint(r, 5, 30); const d = pick(r, [10, 20, 35]); const quoi = pick(r, [0, 1, 2]);
      const A = [a, a + 5, randint(r, 0, 10)]; const V = [d, 0, pick(r, [0, 4])];
      return { prompt: `$A(${A.join("\\,;\\,")})$ puis déplacement $\\overrightarrow{v}(${V.join("\\,;\\,")})$ : la coordonnée n°${quoi + 1} de l'arrivée ?`, answer: A[quoi] + V[quoi], solution: `$${A[quoi]} + ${V[quoi]} = $ **${A[quoi] + V[quoi]}** — additionner les triplets.` };
    } },
  ],
};

// — Trigonometric equations (programme: cos x = a, sin x = a — groupement A) —
const equationsTrigonometriques = {
  id: "geometry.high.equations-trigonometriques",
  level: "high", domain: "geometry",
  title: "Équations trigonométriques",
  tagline: "cos x = a se résout SUR le cercle — une règle verticale, deux points, toutes les solutions.",
  prereqs: ["geometry.high.trigonometrie-signal"],
  intuition:
    "Le signal de première : $u(t) = 325\\sin(100\\pi t)$ — question du technicien : **à quels instants** la tension vaut-elle exactement 230 V ?\n\nC'est résoudre $\\sin x = a$ : et la réponse ne vit pas dans une formule mais **sur le cercle** — là où la hauteur du point tournant vaut $a$ : le cercle qui fabriquait le signal sait aussi le résoudre.",
  depths: {
    discovery:
      "**Avec les mains** : pose une règle sur le cercle trigonométrique — **verticale** en abscisse $a$ pour $\\cos x = a$ : elle coupe le cercle en **deux points**, symétriques par rapport à l'axe horizontal — deux angles opposés $x_0$ et $-x_0$ ; **horizontale** en hauteur $a$ pour $\\sin x = a$ : deux points symétriques par rapport à l'axe vertical — $x_0$ et $\\pi - x_0$ : la résolution est un geste de règle, comme ta résolution graphique de première — le cercle EST le graphique.",
    standard:
      "**En image** : big idea *Diagrams* — le cercle montre TOUT : le **nombre** de solutions (deux si $-1 < a < 1$, une si $a = \\pm 1$ : la règle tangente, zéro si $|a| > 1$ : la règle rate le cercle — une tension de 400 V sur un signal de 325 n'arrive jamais !), leur **position** (les deux symétries), et les valeurs phares se lisent : $\\cos x = \\dfrac{1}{2}$ → la verticale en 0,5 coupe en $\\dfrac{\\pi}{3}$ et $-\\dfrac{\\pi}{3}$ — pour les autres valeurs, la calculatrice donne $x_0$, le cercle donne le **jumeau**.",
    advanced:
      "**Dans la tête** : la **périodicité** complète le tableau — le point repasse au même endroit à chaque tour : toute solution **revient** à $2\\pi$ près ($x_0 + 2k\\pi$) — sur un intervalle imposé (une période du signal, un tour de came), on liste : les deux solutions du cercle, puis leurs copies décalées qui restent dans l'intervalle. La méthode tient en trois gestes : **règle** (placer la droite, compter les contacts), **symétrie** (déduire le jumeau du $x_0$ de la calculatrice), **tours** (ajouter les $2k\\pi$ utiles) — et chaque instant de commutation d'un signal, chaque position angulaire d'une came se calcule ainsi : le module du groupement A, c'est l'horlogerie des machines tournantes.",
  },
  keyIdea: "Résoudre **sur le cercle** : $\\cos x = a$ → règle **verticale** en $a$, deux solutions opposées ($x_0$ et $-x_0$) ; $\\sin x = a$ → règle **horizontale**, jumelles $x_0$ et $\\pi - x_0$ — big idea *Diagrams*. Nombre de solutions : 2, 1 ou 0 selon $|a|$ ; puis la **périodicité** ajoute $+ 2k\\pi$ — règle, symétrie, tours.",
  why:
    "Pourquoi résoudre à l'envers ce que le cercle fabriquait ? Parce que le métier pose la question dans ce sens : le signal est connu, l'**instant** est cherché — quand la tension franchit le seuil du relais, quand la came libère le poussoir, quand la vibration culmine : autant d'équations trigonométriques. Et la méthode du cercle vaut mieux qu'une formule apprise : elle montre *pourquoi* il y a deux solutions par tour, *quand* il n'y en a aucune — la poursuite d'études (électrotechnique, maintenance, mesures physiques) la réutilisera telle quelle.",
  examples: [
    { title: "La règle verticale", steps: [
      { p: "$\\cos x = \\dfrac{1}{2}$ : verticale en 0,5 — deux contacts : $x = \\dfrac{\\pi}{3}$ et $x = -\\dfrac{\\pi}{3}$." },
      { p: "Les jumeaux opposés : même abscisse, hauteurs miroir — la symétrie du cosinus." },
    ] },
    { title: "La règle qui rate", steps: [
      { p: "$\\sin x = 1{,}4$ : l'horizontale en 1,4 passe **au-dessus** du cercle — aucun contact." },
      { p: "Zéro solution : le sinus ne dépasse jamais 1 — le cercle dit non avant tout calcul." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous sur le cercle (décris la règle et les contacts) : $\\cos x = 0$, puis $\\sin x = 1$, puis $\\sin x = 2$.", solution: "$\\cos x = 0$ : verticale **sur l'axe** — contacts en haut et en bas : $x = \\dfrac{\\pi}{2}$ et $x = -\\dfrac{\\pi}{2}$ ; $\\sin x = 1$ : horizontale **tangente au sommet** — un seul contact : $x = \\dfrac{\\pi}{2}$ ; $\\sin x = 2$ : la règle passe au-dessus — **aucune solution** : deux, une, zéro — le cercle compte avant de localiser, exactement comme ta règle horizontale de première." },
    { tier: "warmup", prompt: "La calculatrice donne : $\\cos x = 0{,}8$ a pour solution $x_0 \\approx 0{,}64$ rad. Donne l'autre solution dans $]-\\pi\\,;\\,\\pi]$, et justifie par la symétrie du cercle.", solution: "Le **jumeau** : $x = -0{,}64$ rad — la verticale en 0,8 coupe le cercle en deux points **symétriques par rapport à l'axe horizontal** : même abscisse (même cosinus), hauteurs opposées — la calculatrice ne donne qu'un contact, le cercle offre toujours l'autre : ne jamais rendre une solution seule sans avoir regardé le cercle." },
    { tier: "application", prompt: "Résous $\\sin x = 0{,}5$ dans $[0\\,;\\,2\\pi]$ : la calculatrice donne $x_0 = \\dfrac{\\pi}{6}$ — trouve la jumelle par la symétrie du sinus, et vérifie qu'aucune copie périodique supplémentaire ne rentre dans l'intervalle.", solution: "Horizontale en 0,5 : contacts en $x_0 = \\dfrac{\\pi}{6}$ et sa jumelle $\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$ (symétrie par rapport à l'axe vertical : même hauteur) — copies périodiques : $\\dfrac{\\pi}{6} + 2\\pi > 2\\pi$ : hors intervalle — **deux solutions** : $\\dfrac{\\pi}{6}$ et $\\dfrac{5\\pi}{6}$ — règle, symétrie, tours : la méthode complète en trois lignes." },
    { tier: "challenge", prompt: "Une came tourne : le poussoir se déclenche quand $\\cos\\theta = -0{,}5$. (1) Les deux angles de déclenchement par tour (valeurs exactes : pense à $\\dfrac{\\pi}{3}$). (2) La came fait 3 tours : liste TOUS les angles de déclenchement entre 0 et $6\\pi$ (structure $+ 2k\\pi$).", solution: "(1) Verticale en $-0{,}5$ : contacts à $\\dfrac{2\\pi}{3}$ et $-\\dfrac{2\\pi}{3}$ — soit dans $[0\\,;\\,2\\pi]$ : $\\dfrac{2\\pi}{3}$ et $\\dfrac{4\\pi}{3}$. (2) Trois tours : ajouter $2\\pi$ puis $4\\pi$ — $\\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}, \\dfrac{8\\pi}{3}, \\dfrac{10\\pi}{3}, \\dfrac{14\\pi}{3}, \\dfrac{16\\pi}{3}$ : **six déclenchements** — deux par tour, le cercle l'avait dit : la périodicité ne crée rien, elle photocopie — l'horlogerie de la came, réglée par une équation." },
    { tier: "exam", prompt: "Le secteur : $u(t) = 325\\sin(100\\pi t)$ — un relais commute quand la tension atteint $230$ V, soit $\\sin(100\\pi t) = \\dfrac{230}{325} \\approx 0{,}71$. La calculatrice donne $\\arcsin(0{,}71) \\approx 0{,}79$ rad. (1) Pose $X = 100\\pi t$ : les deux solutions en $X$ sur un tour $[0\\,;\\,2\\pi]$. (2) Reviens aux instants $t$ (divise par $100\\pi$) : les deux commutations de la première période (en millisecondes, $\\pi \\approx 3{,}14$). (3) La période vaut 20 ms : les deux commutations suivantes, sans calculatrice. (4) Pourquoi le cercle garantit-il qu'il n'y a JAMAIS plus de deux commutations montantes par période ?", solution: "(1) Horizontale en 0,71 : $X_1 \\approx 0{,}79$ et la jumelle $X_2 = \\pi - 0{,}79 \\approx $ **2,35 rad**. (2) $t = \\dfrac{X}{100\\pi}$ : $t_1 \\approx \\dfrac{0{,}79}{314} \\approx $ **2,5 ms** et $t_2 \\approx \\dfrac{2{,}35}{314} \\approx $ **7,5 ms** — le relais colle à 2,5 ms, décolle à 7,5 (symétriques autour du sommet à 5 ms ✓). (3) Période 20 ms : **22,5 ms et 27,5 ms** — les copies $+ 2k\\pi$, traduites en millisecondes. (4) La règle horizontale ne peut couper un cercle qu'en **deux points au plus** : deux franchissements par tour, point final — le cercle borne le possible avant tout calcul : c'est lui qui certifie le chronogramme du relais — règle, symétrie, tours : l'équation trigonométrique au service du tableau électrique." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les contacts", make: (r) => {
      const cas = pick(r, [["\\cos x = 0{,}6", 2], ["\\sin x = 1", 1], ["\\cos x = -1{,}2", 0], ["\\sin x = -0{,}4", 2], ["\\cos x = 1", 1]]);
      return { prompt: `$${cas[0]}$ : combien de solutions sur un tour ?`, answer: cas[1], solution: `**${cas[1]}** — la règle ${cas[1] === 0 ? "rate le cercle" : cas[1] === 1 ? "est tangente" : "coupe en deux points"}.` };
    } },
    { tier: "application", label: "Le jumeau du cosinus", make: (r) => {
      const x0 = pick(r, [[3, "\\dfrac{\\pi}{3}"], [4, "\\dfrac{\\pi}{4}"], [6, "\\dfrac{\\pi}{6}"]]);
      return { prompt: `$\\cos x = a$ a pour solution $x_0 = ${x0[1]}$ : l'autre solution est $-\\dfrac{\\pi}{n}$ avec $n = \\,?$`, answer: x0[0], solution: `Le jumeau opposé : $-${x0[1]}$ — $n = $ **${x0[0]}** : symétrie horizontale du cercle.` };
    } },
    { tier: "challenge", label: "La jumelle du sinus", make: (r) => {
      const sixths = pick(r, [[1, 5], [2, 4]]);
      return { prompt: `$\\sin x = a$ a pour solution $\\dfrac{${sixths[0]}\\pi}{6}$ : la jumelle est $\\dfrac{k\\pi}{6}$ avec $k = \\,?$ (symétrie $\\pi - x_0$)`, answer: sixths[1], solution: `$\\pi - \\dfrac{${sixths[0]}\\pi}{6} = \\dfrac{${sixths[1]}\\pi}{6}$ — $k = $ **${sixths[1]}** : même hauteur, miroir vertical.` };
    } },
  ],
};

// — Primitives and the integral (programme complémentaire: calcul intégral) —
const primitivesIntegrale = {
  id: "analysis.high.primitives-integrale",
  level: "high", domain: "analysis",
  title: "Primitives et intégrale",
  tagline: "Lire le tableau des dérivées à l'envers — et l'aire sous la courbe devient un calcul.",
  prereqs: ["analysis.high.derivee-optimisation"],
  intuition:
    "Le débitmètre affiche le **débit** de la pompe heure par heure — mais la facture demande le **volume total** écoulé : il faut remonter du taux à la quantité — l'inverse exact de la dérivée.\n\nCe module de la poursuite d'études donne les deux outils : la **primitive** (la fonction retrouvée depuis sa dérivée) et l'**intégrale** (l'aire sous la courbe — le volume sous le débit).",
  depths: {
    discovery:
      "**Avec les mains** : lis ton tableau de première **à l'envers** — qui a pour dérivée $2x$ ? Réponse : $x^2$ (puisque $(x^2)' = 2x$) ; qui a pour dérivée $3x^2$ ? $x^3$ ; pour dérivée $5$ ? $5x$ — la **primitive** est ce jeu de lecture inverse : aucune formule neuve, le tableau connu parcouru de droite à gauche — et le programme le dit en toutes lettres : *aucune virtuosité calculatoire* n'est exigée — c'est un jeu de reconnaissance.",
    standard:
      "**En image** : deux dessins portent le module — d'abord la **famille** $F + k$ : si $F$ est une primitive de $f$, alors $F + 3$, $F - 7$ aussi (la constante s'évapore en dérivant !) : toutes les primitives sont la même courbe **glissée verticalement** — même pente partout, hauteurs libres ; ensuite l'**aire** : pour $f$ positive sur $[a\\,;\\,b]$, l'intégrale $\\int_a^b f(x)\\,\\mathrm{d}x$ est l'**aire sous la courbe** — et la **méthode des rectangles** la fait toucher : pave l'aire de rectangles fins, somme leurs aires — l'escalier approche la courbe, et le tableur affine en serrant le pas : big idea *Measures* — l'intégrale est un nombre qui mesure une surface.",
    advanced:
      "**Dans la tête** : le théorème qui relie les deux outils — $$\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$$ : l'aire sous la courbe se calcule par une **soustraction de primitive** — la variation de $F$ entre les bornes : le débit intégré EST le volume (la primitive du débit est la quantité !) — vérifie sur un cas d'école : $f(x) = 2x$ sur $[0\\,;\\,3]$ : la primitive $x^2$ donne $9 - 0 = 9$, et l'aire du triangle (base 3, hauteur 6) vaut $\\dfrac{3 \\times 6}{2} = 9$ ✓ — la géométrie confirme l'analyse. Le complémentaire réserve le calcul d'aire au **secteur industriel** (énergies, quantités de matière, travaux) ; et selon ton projet d'orientation, ses autres modules t'attendent : **nombres complexes** et **produit scalaire** — l'intégrale, elle, est le passage obligé de tout BTS technique.",
  },
  keyIdea: "**Primitive** : le tableau des dérivées lu à l'envers ($2x \\to x^2$, $3x^2 \\to x^3$) — toutes de la forme $F + k$ (translations verticales). **Intégrale** : $\\int_a^b f = F(b) - F(a)$ — pour $f$ positive, c'est l'**aire sous la courbe** (*Measures*), que la **méthode des rectangles** approche — aucune virtuosité : de la reconnaissance.",
  why:
    "Pourquoi remonter la dérivée ? Parce que le métier mesure souvent le **taux** et veut la **quantité** : le débit → le volume, la puissance → l'énergie (ton compteur électrique intègre !), la vitesse → la distance, le courant → la charge — l'intégrale est l'opération qui transforme la courbe de l'enregistreur en chiffre de la facture. Et pour la poursuite d'études, c'est LE prérequis : tout BTS industriel, toute prépa, toute L1 scientifique l'utilise dès septembre — ce module complémentaire est un billet d'entrée, pris en avance.",
  examples: [
    { title: "Le tableau à l'envers", steps: [
      { p: "Qui a pour dérivée $2x$ ? — $x^2$ : la lecture inverse, sans formule neuve." },
      { p: "Et $x^2 + 5$ aussi ($+ k$ s'évapore) : la famille $F + k$ — même pente, hauteurs libres." },
    ] },
    { title: "L'aire vérifiée au triangle", steps: [
      { p: "$\\displaystyle\\int_0^3 2x\\,\\mathrm{d}x = [x^2]_0^3 = 9$ — la soustraction de primitive." },
      { p: "Le triangle sous la droite : $\\dfrac{3 \\times 6}{2} = 9$ ✓ — l'analyse et la géométrie d'accord." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Par lecture inverse du tableau : donne une primitive de $f(x) = 2x$, de $g(x) = 3x^2$, de $h(x) = 4$ — puis donne TROIS primitives différentes de $f$.", solution: "$F(x) = x^2$, $G(x) = x^3$, $H(x) = 4x$ — et pour $f$ : $x^2$, $x^2 + 1$, $x^2 - 12$… **toutes** les $x^2 + k$ : la constante meurt en dérivant, donc elle est libre en remontant — la famille entière glisse verticalement, même pente partout." },
    { tier: "warmup", prompt: "Calcule $\\displaystyle\\int_1^4 2x\\,\\mathrm{d}x$ par la primitive, puis explique pourquoi le résultat ne dépend PAS du $k$ choisi dans $F(x) = x^2 + k$.", solution: "$F(4) - F(1) = 16 - 1 = $ **15** — et avec $x^2 + k$ : $(16 + k) - (1 + k) = 15$ : le $k$ **se soustrait à lui-même** — l'intégrale est une *variation* de primitive : peu importe l'altitude de départ, seule la dénivelée compte — c'est pourquoi « une » primitive suffit toujours." },
    { tier: "application", prompt: "Une pompe débite $f(t) = 3t$ litres par minute ($t$ en minutes, sur $[0\\,;\\,10]$). (1) Volume total écoulé en 10 min, par l'intégrale. (2) Vérifie par l'aire du triangle. (3) Pourquoi la primitive du débit est-elle « la bonne grandeur » ?", solution: "(1) Primitive : $F(t) = \\dfrac{3t^2}{2}$ — $\\displaystyle\\int_0^{10} 3t\\,\\mathrm{d}t = F(10) - F(0) = $ **150 L**. (2) Triangle : base 10, hauteur $f(10) = 30$ : $\\dfrac{10 \\times 30}{2} = 150$ ✓. (3) Dériver le volume donne le débit (le taux de remplissage !) — donc **remonter le débit donne le volume** : la primitive n'est pas un jeu formel, c'est le passage du compteur instantané au total facturé." },
    { tier: "challenge", prompt: "Approche $\\displaystyle\\int_0^2 x^2\\,\\mathrm{d}x$ par la méthode des rectangles : quatre rectangles de largeur 0,5, hauteurs prises à gauche ($f(0), f(0{,}5), f(1), f(1{,}5)$). Compare à la valeur exacte par la primitive $\\dfrac{x^3}{3}$ — et comment réduire l'écart ?", solution: "Rectangles : $0{,}5 \\times (0 + 0{,}25 + 1 + 2{,}25) = 0{,}5 \\times 3{,}5 = $ **1,75** ; exact : $\\dfrac{2^3}{3} - 0 = \\dfrac{8}{3} \\approx $ **2,67** — l'escalier à gauche sous-estime une courbe croissante (chaque rectangle rate le coin) ; réduire l'écart : **serrer le pas** (8, 100, 1 000 rectangles — le tableur s'en charge : à 1 000 pas, l'écart devient invisible) — la méthode des rectangles est l'intégrale rendue tangible, et c'est elle que la machine calcule quand aucune primitive n'est lisible." },
    { tier: "exam", prompt: "Un enregistreur trace la puissance d'un four : $P(t) = 6t - t^2$ kW sur $[0\\,;\\,6]$ (heures) — positive sur tout l'intervalle ($P(0) = P(6) = 0$, sommet à $t = 3$). L'énergie consommée est l'aire sous la courbe (en kWh). (1) Donne une primitive de $P$ (terme à terme). (2) Énergie totale sur les 6 heures. (3) Énergie sur la seule plage $[0\\,;\\,3]$ : la moitié du total ? Commente avec la forme de la courbe. (4) À $0{,}25$ €/kWh, le coût de la cuisson — et pourquoi ton compteur électrique fait ce calcul en continu.", solution: "(1) $F(t) = 3t^2 - \\dfrac{t^3}{3}$ (lecture inverse terme à terme : $6t \\to 3t^2$, $t^2 \\to \\frac{t^3}{3}$). (2) $F(6) - F(0) = 108 - 72 = $ **36 kWh**. (3) $F(3) = 27 - 9 = $ **18 kWh** : exactement la moitié — la courbe (parabole) est **symétrique** autour de $t = 3$ : l'aire se partage en deux moitiés égales — la forme l'annonçait, la primitive le confirme. (4) $36 \\times 0{,}25 = $ **9 €** — et le compteur **intègre en continu** : il accumule la puissance instantanée seconde par seconde — la méthode des rectangles au pas d'une seconde : ton abonnement électrique est une intégrale qui tourne — du tableau lu à l'envers à la facture EDF : le module complémentaire au complet." },
  ],
  practice: [
    { tier: "warmup", label: "Le tableau à l'envers", make: (r) => {
      const n = pick(r, [[2, "2x", "x^2"], [3, "3x^2", "x^3"], [4, "4x^3", "x^4"]]);
      return { prompt: `Une primitive de $${n[1]}$ est $x^k$ avec $k = \\,?$`, answer: n[0], solution: `$(${n[2]})' = ${n[1]}$ ✓ — $k = $ **${n[0]}** : la lecture inverse.` };
    } },
    { tier: "application", label: "F(b) − F(a)", make: (r) => {
      const b = randint(r, 2, 5);
      return { prompt: `$\\displaystyle\\int_0^{${b}} 2x\\,\\mathrm{d}x = \\,?$ (primitive $x^2$)`, answer: b * b, solution: `$${b}^2 - 0 = $ **${b * b}** — la soustraction de primitive.` };
    } },
    { tier: "challenge", label: "Le volume sous le débit", make: (r) => {
      const a = pick(r, [2, 4, 6]); const T = pick(r, [4, 5, 10]);
      return { prompt: `Débit $f(t) = ${a}t$ L/min sur $[0\\,;\\,${T}]$ : volume total ? (primitive $${a / 2 === Math.floor(a / 2) ? a / 2 : "\\frac{" + a + "}{2}"}t^2$)`, answer: a / 2 * T * T, solution: `$\\dfrac{${a}}{2} \\times ${T}^2 = $ **${a / 2 * T * T} L** — l'aire du triangle confirme : $\\dfrac{${T} \\times ${a * T}}{2}$ ✓.` };
    } },
  ],
};

// — ln and exp base e (programme complémentaire: logarithme népérien, exponentielle) —
const lnExpBaseE = {
  id: "analysis.high.ln-exp-base-e",
  level: "high", domain: "analysis",
  title: "ln et e pour la suite",
  tagline: "Le logarithme du supérieur et son nombre fétiche — la passerelle est posée.",
  prereqs: ["analysis.high.exponentielles-log-decimal", "analysis.high.primitives-integrale"],
  intuition:
    "Ton log décimal comptait les étages de 10 — mais ouvre n'importe quel cours de BTS ou de fac : c'est **ln** qui règne, le logarithme *népérien*, bâti sur un nombre étrange : $e \\approx 2{,}718$.\n\nMême squelette, autre base : ce module complémentaire te donne la **clé du supérieur** — propriétés identiques, et le va-et-vient $\\ln(x) = a \\Leftrightarrow x = e^a$.",
  depths: {
    discovery:
      "**Avec les mains** : apprivoise ln à la calculatrice comme tu l'as fait pour log — $\\ln(1) = 0$ (le départ commun à tous les logarithmes !), $\\ln(e) = 1$ (ln compte les étages de **e**), $\\ln(e^2) = 2$ — et les **propriétés opératoires voyagent** intactes : $\\ln(ab) = \\ln a + \\ln b$, $\\ln(a^n) = n\\ln a$ : vérifie — $\\ln 2 \\approx 0{,}693$ et $\\ln 4 \\approx 1{,}386$ : le double ✓ — même squelette que log, seule la graduation change.",
    standard:
      "**En image** : les deux courbes en **miroir** — $\\ln(x)$ : croissante, passe par $(1\\,;\\,0)$, grimpe de plus en plus lentement (elle écrase les grands nombres : son métier) ; $e^x$ : croissante, passe par $(0\\,;\\,1)$, décolle de plus en plus vite — et les deux courbes sont **symétriques par rapport à la diagonale** $y = x$ : l'une défait ce que l'autre fait — le dessin DIT l'équivalence $\\ln(x) = a \\Leftrightarrow x = e^a$ : big idea *Equivalence* — lire en miroir, c'est résoudre.",
    advanced:
      "**Dans la tête** : pourquoi $e$ plutôt que 10 ? Le secret se dévoilera pleinement dans le supérieur, mais le voici en avant-première : $e^x$ est l'exponentielle **qui se dérive elle-même** — $(e^x)' = e^x$ : sa pente en chaque point égale sa hauteur — aucune autre base n'a ce privilège, et c'est lui qui rend $e$ « naturel » : toutes les croissances continues (intérêts capitalisés en continu, charges de condensateurs, populations) s'écrivent spontanément en base $e$ — ton $q^x$ de terminale s'y convertit ($q^x = e^{x\\ln q}$ : une seule famille, déguisée). Et la résolution devient bilingue : $e^x = 5 \\Leftrightarrow x = \\ln 5 \\approx 1{,}61$ ; $\\ln x = 2 \\Leftrightarrow x = e^2 \\approx 7{,}39$ — le va-et-vient que tout cours de BTS suppose acquis dès la première semaine : ce module te le donne en avance.",
  },
  keyIdea: "**ln** : le logarithme de base $e \\approx 2{,}718$ — $\\ln 1 = 0$, $\\ln e = 1$, **mêmes propriétés** que log ($\\ln(ab) = \\ln a + \\ln b$, $\\ln(a^n) = n\\ln a$). Courbes de $\\ln$ et $e^x$ en **miroir** sur $y = x$ : $\\ln(x) = a \\Leftrightarrow x = e^a$ (*Equivalence*) — et $e^x$ se dérive lui-même : la base naturelle du supérieur.",
  why:
    "Pourquoi apprendre un second logarithme ? Parce que le premier servait le métier (pH, décibels, durées de placement) et que celui-ci sert **la suite** : physique appliquée, électrotechnique, chimie, biologie de BTS — tous écrivent leurs lois en $e^{-t/\\tau}$ et résolvent en ln. Arriver en sachant déjà basculer $\\ln \\leftrightarrow e$ — c'est précisément l'objectif du programme complémentaire : des « renforts notionnels » choisis selon ton projet d'orientation — change le premier trimestre : ce module est un investissement, au sens propre de ta leçon sur les placements.",
  examples: [
    { title: "Le squelette commun", steps: [
      { p: "$\\ln 1 = 0$, $\\ln e = 1$, $\\ln(e^2) = 2$ — ln compte les étages de $e$, comme log ceux de 10." },
      { p: "Et $\\ln(a^n) = n\\ln a$ voyage : $\\ln 8 = 3\\ln 2 \\approx 2{,}08$ ✓ — mêmes règles, autre base." },
    ] },
    { title: "Le miroir qui résout", steps: [
      { p: "$\\ln x = 2$ : lire en miroir — $x = e^2 \\approx 7{,}39$ ; et $e^x = 5$ : $x = \\ln 5 \\approx 1{,}61$." },
      { p: "Les deux courbes symétriques sur $y = x$ : l'une défait l'autre — résoudre, c'est traverser." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sans calculatrice : $\\ln(1)$, $\\ln(e)$, $\\ln(e^3)$ — puis encadre $\\ln(10)$ entre deux entiers sachant $e^2 \\approx 7{,}4$ et $e^3 \\approx 20$.", solution: "$\\ln 1 = $ **0**, $\\ln e = $ **1**, $\\ln(e^3) = $ **3** — et $e^2 < 10 < e^3$ donc $2 < \\ln 10 < 3$ (la calculatrice dira 2,30) — le même jeu d'étages que ton log décimal, gradué en $e$ : un logarithme s'apprivoise toujours par ses puissances." },
    { tier: "warmup", prompt: "Utilise les propriétés opératoires ($\\ln 2 \\approx 0{,}69$, $\\ln 3 \\approx 1{,}10$) pour calculer sans calculatrice : $\\ln 6$, $\\ln 9$, $\\ln\\left(\\dfrac{3}{2}\\right)$.", solution: "$\\ln 6 = \\ln 2 + \\ln 3 \\approx $ **1,79** ; $\\ln 9 = 2\\ln 3 \\approx $ **2,20** ; $\\ln\\dfrac{3}{2} = \\ln 3 - \\ln 2 \\approx $ **0,41** — les trois propriétés (produit → somme, puissance → multiple, quotient → différence) : le squelette de log, intact en base $e$ — deux valeurs mémorisées engendrent toute la table." },
    { tier: "application", prompt: "Résous en basculant dans le bon sens : (a) $\\ln x = 1{,}5$ ; (b) $e^x = 12$ ; (c) $\\ln x = 0$ — et nomme le geste graphique qui justifie chaque bascule.", solution: "(a) $x = e^{1{,}5} \\approx $ **4,48** ; (b) $x = \\ln 12 \\approx $ **2,48** ; (c) $x = e^0 = $ **1** — le geste : **lire en miroir** sur la diagonale $y = x$ — chaque équation traverse vers la courbe symétrique : $\\ln$ et $e$ se défont mutuellement, l'équivalence $\\ln(x) = a \\Leftrightarrow x = e^a$ n'est que ce miroir écrit en symboles." },
    { tier: "challenge", prompt: "Un condensateur se décharge : sa tension suit $u(t) = 12\\,e^{-t/4}$ volts ($t$ en secondes). (1) Tension à $t = 0$. (2) À quel instant $u = 6$ V (la demi-décharge) ? Résous $e^{-t/4} = 0{,}5$ par ln ($\\ln 0{,}5 \\approx -0{,}69$). (3) Pourquoi ce module rend-il ce calcul « de BTS » accessible dès maintenant ?", solution: "(1) $u(0) = 12\\,e^0 = $ **12 V**. (2) $e^{-t/4} = 0{,}5$ ⟺ $-\\dfrac{t}{4} = \\ln 0{,}5 \\approx -0{,}69$ ⟺ $t \\approx $ **2,76 s** — la bascule en ln a fait descendre l'exposant, ton réflexe du log décimal en base $e$. (3) Parce que la loi du condensateur s'écrit **nativement** en $e$ (la décharge continue est le royaume de la base naturelle) : sans ln, l'équation est muette ; avec, c'est une ligne — exactement le « renfort notionnel » que le programme complémentaire promet à qui vise l'électrotechnique." },
    { tier: "exam", prompt: "Une culture en bioréacteur suit une croissance continue : $N(t) = 200\\,e^{0{,}3t}$ (milliers de cellules, $t$ en heures). (1) Effectif initial et effectif à $t = 5$ ($e^{1{,}5} \\approx 4{,}48$). (2) Temps de doublement : résous $e^{0{,}3t} = 2$ ($\\ln 2 \\approx 0{,}69$). (3) Le protocole impose la récolte à 1 600 milliers de cellules : à quel instant ? ($\\ln 8 \\approx 2{,}08$ — ou rusé : $8 = 2^3$.) (4) Montre que la réponse du (3) vaut exactement trois fois celle du (2), et explique pourquoi c'était prévisible sans calcul.", solution: "(1) $N(0) = $ **200** ; $N(5) = 200\\,e^{1{,}5} \\approx $ **896 milliers**. (2) $0{,}3t = \\ln 2$ ⟹ $t = \\dfrac{0{,}69}{0{,}3} = $ **2,3 h** — le doublement, par la bascule ln. (3) $e^{0{,}3t} = 8$ ⟹ $t = \\dfrac{\\ln 8}{0{,}3} = \\dfrac{2{,}08}{0{,}3} \\approx $ **6,9 h**. (4) $\\ln 8 = \\ln(2^3) = 3\\ln 2$ — donc $t_{\\times 8} = 3 \\times t_{\\times 2}$ ✓ : **octupler, c'est doubler trois fois** — la propriété $\\ln(a^n) = n\\ln a$ transforme l'évidence biologique (2 → 4 → 8 : trois doublements) en identité de calcul : ln ne fait que compter les doublements — la croissance continue, le miroir $\\ln \\leftrightarrow e$, et la propriété phare : la passerelle vers le supérieur, franchie sur un bioréacteur." },
  ],
  practice: [
    { tier: "warmup", label: "Les étages de e", make: (r) => {
      const n = randint(r, 1, 4);
      return { prompt: `$\\ln(e^{${n}}) = \\,?$`, answer: n, solution: `**${n}** — ln compte les étages de $e$.` };
    } },
    { tier: "application", label: "Les propriétés qui voyagent", make: (r) => {
      const cas = pick(r, [[4, 2, "2\\ln 2", 1.38], [8, 2, "3\\ln 2", 2.07], [9, 3, "2\\ln 3", 2.2], [27, 3, "3\\ln 3", 3.3]]);
      return { prompt: `$\\ln ${cas[0]} = k\\ln ${cas[1]}$ : $k = \\,?$`, answer: cas[0] === 4 || cas[0] === 9 ? 2 : 3, solution: `$${cas[0]} = ${cas[1]}^{${cas[0] === 4 || cas[0] === 9 ? 2 : 3}}$ : $\\ln ${cas[0]} = ${cas[2]}$ — $k = $ **${cas[0] === 4 || cas[0] === 9 ? 2 : 3}** : la puissance descend.` };
    } },
    { tier: "challenge", label: "Basculer dans le miroir", make: (r) => {
      const a = randint(r, 1, 3); const sens = r() < 0.5;
      return { prompt: sens ? `$\\ln x = ${a}$ : $x = e^k$ avec $k = \\,?$` : `$e^x = e^{${a}}$ : $x = \\,?$`, answer: a, solution: `**${a}** — ${sens ? "lire en miroir : $x = e^{" + a + "}$" : "les exposants s'identifient"} : ln et $e$ se défont mutuellement.` };
    } },
  ],
};

export default [espaceRepere, equationsTrigonometriques, primitivesIntegrale, lnExpBaseE];
