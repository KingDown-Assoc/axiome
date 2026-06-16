// Field "Analysis" — MIDDLE module (3e year): functions in full. Official
// cycle-4 programme: using the different REPRESENTATIONS of a function, defining
// the vocabulary IMAGE and ANTECEDENTS, defining and using LINEAR functions
// (relating them to proportionality), solving linear equations and inequalities
// GRAPHICALLY, defining and using AFFINE functions, determining their
// coefficients graphically, and REPRESENTING the square function — with the
// parabola, its focus (satellite dishes) and the simple false-position method as
// official extensions.
import { randint, pick } from "../../core/exercises.js";

// — Function notation (programme: représentations, image, antécédents) —
const fonctionsNotation = {
  id: "analysis.middle.fonctions-notation",
  level: "middle", domain: "analysis",
  title: "Fonctions : image et antécédents",
  tagline: "f(x) — une machine, quatre visages, et un vocabulaire à double sens.",
  prereqs: ["analysis.middle.fonction-de"],
  intuition:
    "Ta machine de 4e reçoit son nom officiel : la **fonction** $f$, et sa notation — $f(x) = 2x + 3$ se lit « $f$ de $x$ » : la machine $f$ appliquée au nombre $x$.\n\nDeux mots gouvernent tout : l'**image** de 5 est $f(5) = 13$ (la sortie — toujours **unique**) ; les **antécédents** de 13 sont les entrées qui y mènent (il peut y en avoir zéro, un ou plusieurs !).",
  depths: {
    discovery:
      "**Avec les mains** : le sens des flèches — image : on **avance** dans la machine ($5 \\to 13$ : un calcul) ; antécédent : on **remonte** ($13 \\to \\,?$ : une équation, $2x + 3 = 13$, donc $x = 5$). Avancer est facile, remonter se mérite — toute ta 4e le savait déjà.",
    standard:
      "**En image** : la dissymétrie cruciale — chaque entrée a **une seule** image (la machine ne bafouille pas), mais une sortie peut avoir **plusieurs** antécédents : pour $g(x) = x^2$, l'image de 9 par la machine inverse ? Les antécédents de 9 sont $3$ **et** $-3$ — et 9 n'a aucun antécédent par… $-5$ : ton équation $x^2 = a$ comptait déjà les antécédents sans le dire.",
    advanced:
      "**Dans la tête** : une fonction a **quatre visages** — la formule ($f(x) = 2x + 3$), le tableau de valeurs, le **graphique** (tous les points $(x\\,;\\,f(x))$), et le programme de calcul. Sur le graphique, le vocabulaire devient gymnastique : l'image de 5 se lit en montant **verticalement** puis en lisant à gauche ; les antécédents de 13 se lisent en partant **horizontalement** de 13 et en notant tous les $x$ où la courbe croise — vertical pour l'image, horizontal pour les antécédents : les deux sens du même dessin.",
  },
  keyIdea: "$f(x)$ : la machine $f$ appliquée à $x$. **Image** : la sortie (unique — un calcul) ; **antécédents** : les entrées qui mènent à une sortie (zéro, une ou plusieurs — une équation). Quatre visages : formule, tableau, graphique, programme.",
  why:
    "Pourquoi deux mots savants pour « entrée » et « sortie » ? Parce que la dissymétrie qu'ils portent — image unique, antécédents multiples — est le cœur de la notion de fonction : c'est elle qui distingue une vraie dépendance d'un simple nuage, elle qui compte les solutions des équations ($f(x) = k$ a autant de solutions que $k$ a d'antécédents !). Le vocabulaire n'habille pas l'idée : il **est** l'idée.",
  examples: [
    { title: "Avancer, remonter", steps: [
      { p: "$f(x) = 2x + 3$ : l'image de 5 est $f(5) = 13$ — un calcul." },
      { p: "Les antécédents de 13 : résoudre $2x + 3 = 13$ → $x = 5$ — une équation." },
    ] },
    { title: "Plusieurs antécédents", steps: [
      { p: "$g(x) = x^2$ : les antécédents de 9 sont $3$ et $-3$ — deux entrées, même sortie." },
      { p: "Et $-5$ n'a **aucun** antécédent : un carré n'atteint jamais le négatif." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "$f(x) = 2x + 3$ : calcule l'image de 5, puis trouve le ou les antécédents de 13. Quelle opération chaque question cache-t-elle ?", solution: "Image : $f(5) = $ **13** — un **calcul** (avancer). Antécédent : $2x + 3 = 13 \\to x = $ **5** — une **équation** (remonter) : les deux sens de la machine." },
    { tier: "warmup", prompt: "Pourquoi l'image est-elle toujours unique, alors que les antécédents peuvent être plusieurs ?", solution: "La machine ne bafouille pas : une entrée, **une** sortie — c'est la définition d'une fonction. Mais rien n'interdit à deux entrées de viser la même sortie : $3$ et $-3$ ont tous deux 9 pour image par le carré." },
    { tier: "application", prompt: "$g(x) = x^2$ : donne les antécédents de 9, de 0, de $-5$.", solution: "De 9 : **3 et −3** (deux) ; de 0 : **0** (un seul) ; de $-5$ : **aucun** — ton équation $x^2 = a$ comptait déjà les antécédents : deux, un, zéro selon le signe." },
    { tier: "challenge", prompt: "Sur un graphique, décris le geste qui donne l'image de 5, puis celui qui donne les antécédents de 13.", solution: "Image : partir de **5 sur l'axe horizontal**, monter verticalement jusqu'à la courbe, lire à gauche. Antécédents : partir de **13 sur l'axe vertical**, tracer l'horizontale, noter **tous** les $x$ des croisements — vertical pour avancer, horizontal pour remonter." },
    { tier: "exam", prompt: "Une fonction $h$ donne la hauteur (en m) d'une balle en fonction du temps (en s) : $h(1) = 5$ et $h(3) = 5$. Traduis ces égalités avec le vocabulaire image/antécédents, et explique pourquoi deux antécédents sont ici naturels.", solution: "L'**image** de 1 est 5, et celle de 3 aussi — autrement dit, 1 et 3 sont deux **antécédents** de 5. C'est physique : la balle passe à 5 m **en montant** (à 1 s) puis **en redescendant** (à 3 s) — deux instants, une même hauteur : les antécédents multiples racontent l'aller-retour, et la courbe en cloche le dessine." },
  ],
  practice: [
    { tier: "warmup", label: "Avancer dans la machine", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 9); const x = randint(r, 2, 10);
      return { prompt: `$f(x) = ${a}x + ${b}$ : quelle est l'image de ${x} ?`, answer: a * x + b, solution: `$f(${x}) = ${a} \\times ${x} + ${b} = $ **${a * x + b}** — un calcul.` };
    } },
    { tier: "application", label: "Remonter la machine", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 9); const x = randint(r, 2, 10);
      return { prompt: `$f(x) = ${a}x + ${b}$ : quel est l'antécédent de ${a * x + b} ?`, answer: x, solution: `$${a}x + ${b} = ${a * x + b} \\to x = $ **${x}** — une équation.` };
    } },
    { tier: "challenge", label: "Compter les antécédents", make: (r) => {
      const v = pick(r, [randint(r, 1, 50), 0, -randint(r, 1, 20)]);
      const n = v > 0 ? 2 : v === 0 ? 1 : 0;
      return { prompt: `$g(x) = x^2$ : combien d'antécédents pour ${v} ?`, answer: n, solution: `$x^2 = ${v}$ : **${n === 2 ? "deux ($\\pm\\sqrt{" + v + "}$)" : n === 1 ? "un (zéro)" : "aucun — un carré n'est jamais négatif"}**.` };
    } },
  ],
};

// — Linear and affine functions (programme: linéaires, affines, coefficients) —
const lineaireAffine = {
  id: "analysis.middle.lineaire-affine",
  level: "middle", domain: "analysis",
  title: "Fonctions linéaires et affines",
  tagline: "f(x) = ax + b : une pente et une ordonnée à l'origine décrivent toute droite.",
  prereqs: ["analysis.middle.fonctions-notation", "applied.middle.coefficient"],
  intuition:
    "La **fonction linéaire** $f(x) = ax$ est la proportionnalité devenue fonction : sa courbe est la **droite par l'origine**, et $a$ est ton coefficient de 5e.\n\nLa **fonction affine** $f(x) = ax + b$ la décale : même pente $a$, mais elle démarre à $b$ — l'**ordonnée à l'origine** : ton taxi $2x + 3$ en était une.",
  depths: {
    discovery:
      "**Avec les mains** : lire les coefficients **sur le graphique** — $b$ : là où la droite **coupe l'axe vertical** ($x = 0$) ; $a$ : la **pente** — avance de 1 vers la droite, compte de combien la droite monte (ou descend : $a$ négatif !). Deux lectures, et la formule est reconstruite : le graphique avoue son équation.",
    standard:
      "**En image** : reconnaître la famille — linéaire ⟺ droite **par l'origine** ⟺ proportionnalité (tableau à coefficient !) ; affine ⟺ droite quelconque ⟺ « accroissements proportionnels » (quand $x$ augmente de 1, $f(x)$ augmente toujours de $a$). Et $a$ pilote le sens : positif, la droite **monte** ; négatif, elle **descend** ; nul, elle est plate ($f(x) = b$ : la fonction constante).",
    advanced:
      "**Dans la tête** : la résolution **graphique** couronne le collège — $2x + 3 = 9$ : l'intersection de la droite de $f$ avec l'horizontale $y = 9$ donne $x = 3$ ; deux abonnements $f(x) = 2x + 3$ et $g(x) = 3x$ : leur **croisement** est l'équation $2x + 3 = 3x$ — ton point de bascule de 4e a trouvé sa figure définitive ; et l'inéquation $f(x) \\geq g(x)$ se lit en repérant **où une droite domine l'autre**. Équations, inéquations, comparaisons : tout devient géométrie de droites — la moitié du lycée tiendra dans cette image.",
  },
  keyIdea: "Linéaire $f(x) = ax$ : droite **par l'origine** $=$ proportionnalité. Affine $f(x) = ax + b$ : pente $a$ (lire : +1 à droite, +$a$ en haut), ordonnée à l'origine $b$ (la coupure de l'axe vertical). Croisement de droites $=$ équation.",
  why:
    "Pourquoi la droite mérite-t-elle deux chapitres ? Parce qu'elle est le **modèle le plus utile du monde** : tarifs, vitesses constantes, conversions, abonnements — tout ce qui croît régulièrement est affine, et le réflexe « pente + ordonnée à l'origine » décode chacun (le coût fixe, le coût marginal). Le lycée appellera cela modéliser ; la 3e t'en donne l'alphabet.",
  examples: [
    { title: "Lire une droite", steps: [
      { p: "La droite coupe l'axe vertical en 3 : $b = 3$ ; de $x = 0$ à $x = 1$, elle monte de 2 : $a = 2$." },
      { p: "$f(x) = 2x + 3$ — le graphique a avoué sa formule." },
    ] },
    { title: "Linéaire ou affine ?", steps: [
      { p: "$g(x) = 3x$ : par l'origine — **linéaire**, la proportionnalité en personne (coefficient 3)." },
      { p: "$f(x) = 2x + 3$ : décalée de 3 — **affine** : même famille de droites, origine ratée." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle est la différence entre $f(x) = 2x + 3$ et $g(x) = 3x$, sur la formule et sur le graphique ?", solution: "$g$ est **linéaire** ($b = 0$) : droite **par l'origine** — la proportionnalité de coefficient 3 ; $f$ est **affine** : même type de droite, décalée pour couper l'axe vertical en **3**." },
    { tier: "warmup", prompt: "Une droite coupe l'axe vertical en 3 et monte de 2 quand on avance de 1. Donne sa fonction.", solution: "$f(x) = 2x + 3$ — ordonnée à l'origine $b = 3$ (la coupure), pente $a = 2$ (+1 à droite, +2 en haut) : deux lectures, une formule." },
    { tier: "application", prompt: "Sans tracer : les droites de $f(x) = -2x + 5$ et $g(x) = 4$ montent-elles, descendent-elles ? Où coupent-elles l'axe vertical ?", solution: "$f$ : pente $-2$ → elle **descend**, coupure en 5 ; $g$ : pente nulle → droite **horizontale** (fonction constante), à hauteur 4 — le signe de $a$ donne le sens, $b$ donne le départ." },
    { tier: "challenge", prompt: "Résous graphiquement (en décrivant la figure) puis par le calcul : $2x + 3 = 3x$.", solution: "Graphiquement : les droites de $2x + 3$ et de $3x$ se **croisent** en un point — son abscisse est la solution. Calcul : $3 = x$ → $x = $ **3** (les deux valent 9) — le point de bascule de 4e a trouvé son image : résoudre, c'est croiser deux droites." },
    { tier: "exam", prompt: "Forfait A : $f(x) = 0{,}5x + 10$ (10 € fixes, 0,50 €/Go) ; forfait B : $g(x) = 1{,}5x$ (1,50 €/Go). Lis sur les formules les coefficients de chaque droite, calcule leur point de croisement, et conclus sur le choix du forfait selon la consommation.", solution: "A : pente $0{,}5$, ordonnée à l'origine **10** (le coût fixe) ; B : **linéaire**, pente $1{,}5$, par l'origine. Croisement : $0{,}5x + 10 = 1{,}5x \\to x = $ **10 Go** (les deux coûtent 15 €). Avant 10 Go, la droite de B est **dessous** : B gagne ; après, A gagne — la pente faible finit toujours par battre le départ gratuit : les droites racontent l'économie entière du choix." },
  ],
  practice: [
    { tier: "warmup", label: "Lire la coupure", make: (r) => {
      const a = randint(r, -4, 5) || 2; const b = randint(r, -8, 9);
      return { prompt: `$f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + (-b)}$ : où la droite coupe-t-elle l'axe vertical ?`, answer: b, solution: `En $x = 0$ : $f(0) = $ **${b}** — l'ordonnée à l'origine, à l'œil nu dans la formule.` };
    } },
    { tier: "application", label: "La pente mesurée", make: (r) => {
      const a = randint(r, -4, 6) || 3; const b = randint(r, -5, 6); const x = randint(r, 1, 5);
      return { prompt: `Pour $f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + (-b)}$ : de combien $f$ varie-t-elle quand $x$ passe de ${x} à ${x + 1} ?`, answer: a, solution: `Toujours de $a = $ **${a}** — la pente est la variation par pas de 1, partout la même.` };
    } },
    { tier: "challenge", label: "Le croisement", make: (r) => {
      const a1 = randint(r, 1, 3); const a2 = a1 + randint(r, 1, 3); const x = randint(r, 2, 9); const b = (a2 - a1) * x;
      return { prompt: `Où se croisent les droites de $f(x) = ${a1}x + ${b}$ et $g(x) = ${a2}x$ ? (donne l'abscisse)`, answer: x, solution: `$${a1}x + ${b} = ${a2}x \\to x = $ **${x}** — le croisement est l'équation.` };
    } },
  ],
};

// — The square function (programme: représenter la fonction carré) —
const fonctionCarre = {
  id: "analysis.middle.fonction-carre",
  level: "middle", domain: "analysis",
  title: "La fonction carré",
  tagline: "La fonction carré et sa parabole : symétrique, toujours positive, utile aux antennes.",
  prereqs: ["analysis.middle.fonctions-notation", "numbers.middle.equation-carre"],
  intuition:
    "Première fonction **courbe** du parcours : $f(x) = x^2$. Sa table de valeurs surprend — $f(-3) = 9 = f(3)$ : les opposés ont la **même image**.\n\nSa courbe est la **parabole** : un U parfait, symétrique par rapport à l'axe vertical, sommet en l'origine — et jamais sous l'axe : un carré n'est pas négatif.",
  depths: {
    discovery:
      "**Avec les mains** : dresse la table — $-3 \\to 9$, $-2 \\to 4$, $-1 \\to 1$, $0 \\to 0$, $1 \\to 1$, $2 \\to 4$, $3 \\to 9$ — et place les points : le U se dessine, **symétrique** (chaque point a son jumeau de l'autre côté), de plus en plus raide en s'éloignant : entre 2 et 3, la fonction saute de 5 ; entre 9 et 10, de 19.",
    standard:
      "**En image** : la parabole **résout** — $x^2 = a$ se lit en coupant la courbe par l'horizontale $y = a$ : deux points pour $a > 0$ (les antécédents $\\pm\\sqrt{a}$ !), le sommet seul pour $a = 0$, rien pour $a < 0$ — ta règle des trois cas, dessinée une fois pour toutes. Le sens de variation se lit aussi : la fonction **descend** sur les négatifs, **monte** sur les positifs — le contraire des droites, qui ne changent jamais d'avis.",
    advanced:
      "**Dans la tête** : la parabole a un secret physique — tournée vers le ciel, elle possède un point intérieur, le **foyer**, où convergent **tous** les rayons qui l'abordent parallèlement à son axe : c'est pourquoi les antennes satellites et les fours solaires sont des paraboles (le capteur trône au foyer), et pourquoi les phares inversent le jeu (l'ampoule au foyer, le faisceau sort parallèle). Et la balle que tu lances dessine une parabole tête en bas — Galilée l'a démontré : la fonction carré est la première courbe que la nature trace toute seule.",
  },
  keyIdea: "$f(x) = x^2$ : la **parabole** — symétrique ($f(-x) = f(x)$), sommet à l'origine, jamais négative ; descend sur les négatifs, monte sur les positifs. Couper par $y = a$ : les antécédents $\\pm\\sqrt{a}$.",
  why:
    "Pourquoi finir le collège sur cette courbe ? Parce qu'elle est la **porte du non-linéaire** : après quatre ans de droites, voici une fonction dont la vitesse de croissance change — le monde réel (chutes, aires, freinages, intérêts) est plein de ces accélérations, et la parabole en est le plus simple portrait. Le lycée l'appellera « second degré » et en fera son chapitre roi ; tu en connais déjà le visage.",
  examples: [
    { title: "La table symétrique", steps: [
      { p: "$f(-3) = 9$, $f(-2) = 4$, $f(0) = 0$, $f(2) = 4$, $f(3) = 9$ — les opposés, mêmes images." },
      { p: "Le U se dessine : symétrique, sommet en bas, de plus en plus raide." },
    ] },
    { title: "x² = a, version dessin", steps: [
      { p: "Horizontale $y = 7$ : deux croisements avec la parabole — les antécédents $\\pm\\sqrt{7}$." },
      { p: "Horizontale $y = -2$ : aucun — la parabole ne descend jamais sous l'axe." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dresse la table de $f(x) = x^2$ pour $x$ de $-3$ à $3$, et décris la forme de la courbe.", solution: "$9, 4, 1, 0, 1, 4, 9$ — un **U symétrique** (la parabole) : sommet à l'origine, les opposés partagent leur image, la pente se raidit en s'éloignant." },
    { tier: "warmup", prompt: "Pourquoi $f(-3) = f(3)$ pour la fonction carré, et que cela donne-t-il à la courbe ?", solution: "$(-3)^2 = 9 = 3^2$ — la règle des signes : les opposés ont le même carré. La courbe en hérite une **symétrie** par rapport à l'axe vertical : chaque point a son jumeau." },
    { tier: "application", prompt: "En coupant la parabole par une droite horizontale, retrouve le nombre de solutions de $x^2 = 7$, $x^2 = 0$, $x^2 = -2$.", solution: "$y = 7$ : **deux** croisements ($\\pm\\sqrt{7}$) ; $y = 0$ : **un** (le sommet) ; $y = -2$ : **aucun** (la parabole ne descend pas sous l'axe) — ta règle des trois cas, en image." },
    { tier: "challenge", prompt: "Sur quel ensemble la fonction carré descend-elle ? Monte-t-elle ? En quoi est-ce nouveau par rapport aux fonctions affines ?", solution: "Elle **descend** sur les négatifs et **monte** sur les positifs — minimum au sommet $(0\\,;\\,0)$. Les affines, elles, gardent un seul sens pour toujours : la parabole est ta première fonction qui **change d'avis** — le non-linéaire commence ici." },
    { tier: "exam", prompt: "Explique pourquoi les antennes satellites sont paraboliques, et pourquoi les phares de voiture le sont aussi — dans l'autre sens.", solution: "La parabole possède un **foyer** : tous les rayons arrivant parallèlement à son axe s'y **concentrent** après réflexion — l'antenne place donc son capteur au foyer et récolte tout le signal du satellite. Le phare inverse le trajet : l'ampoule au foyer, les rayons ressortent **parallèles** — un faisceau droit. Une seule propriété géométrique, deux sens de lecture : la fonction carré éclaire les routes et capte la télévision." },
  ],
  practice: [
    { tier: "warmup", label: "La table du carré", make: (r) => {
      const x = randint(r, -9, 9);
      return { prompt: `$f(x) = x^2$ : que vaut $f(${x})$ ?`, answer: x * x, solution: `$(${x})^2 = $ **${x * x}** — ${x < 0 ? "le négatif remonte : même image que son opposé" : "le carré, tout simplement"}.` };
    } },
    { tier: "application", label: "Le jumeau symétrique", make: (r) => {
      const x = randint(r, 1, 9);
      return { prompt: `Sur la parabole, le point d'abscisse ${x} est à hauteur ${x * x}. Quelle autre abscisse est à la même hauteur ?`, answer: -x, solution: `**−${x}** — la symétrie de la parabole : $f(-x) = f(x)$.` };
    } },
    { tier: "challenge", label: "Couper la parabole", make: (r) => {
      const a = pick(r, [randint(r, 1, 60), 0, -randint(r, 1, 25)]);
      const n = a > 0 ? 2 : a === 0 ? 1 : 0;
      return { prompt: `On coupe la parabole de $x^2$ par la droite $y = ${a}$ : combien de points d'intersection ?`, answer: n, solution: `**${n}** — ${a > 0 ? "deux antécédents $\\pm\\sqrt{" + a + "}$" : a === 0 ? "le sommet seul" : "la parabole ne descend jamais sous l'axe"}.` };
    } },
  ],
};

export default [fonctionsNotation, lineaireAffine, fonctionCarre];
