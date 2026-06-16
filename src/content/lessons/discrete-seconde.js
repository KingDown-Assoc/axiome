// Field "Discrete mathematics" — HIGH module (seconde year): dispersion and
// crossed variables. Official seconde programme (2019): LINEARITY of the mean,
// the STANDARD DEVIATION as dispersion indicator, influence of adding/removing
// a value, series GROUPED in classes (histogram, weighted mean from class
// centers, median class and estimation), comparing series through indicator
// pairs (mean/standard deviation vs median/interquartile range); CROSSED tables
// of two qualitative variables, MARGINAL and CONDITIONAL frequencies, completing
// a crossed table, and the official filter algorithms (ET, OU, NON).
import { randint, pick } from "../../core/exercises.js";

// — Standard deviation and grouped data (programme: écart type, classes) —
const ecartType = {
  id: "discrete.high.ecart-type",
  level: "high", domain: "discrete",
  title: "L'écart type",
  tagline: "L'écart-type mesure la dispersion : même moyenne, séries très différentes.",
  prereqs: ["discrete.middle.quartiles"],
  intuition:
    "Deux classes à 12 de moyenne : l'une groupée entre 10 et 14, l'autre écartelée de 2 à 20 — la moyenne ne voit rien. L'**écart type** $\\sigma$ mesure ce qu'elle ignore : la dispersion **autour** de la moyenne.\n\nPetit $\\sigma$ : valeurs serrées ; grand $\\sigma$ : valeurs éparpillées — le second indicateur que toute moyenne devrait porter en bandoulière.",
  depths: {
    discovery:
      "**Avec les mains** : l'idée de la recette — mesure chaque **écart à la moyenne**, élève-le au carré (pour que les écarts négatifs ne compensent pas les positifs !), fais la moyenne de ces carrés, puis reprends la racine pour revenir à l'unité d'origine. Série 10, 12, 14 (moyenne 12) : écarts $-2, 0, 2$ ; carrés $4, 0, 4$ ; moyenne $\\frac{8}{3}$ ; $\\sigma = \\sqrt{\\frac{8}{3}} \\approx 1{,}6$ — contre $\\sigma \\approx 7{,}5$ pour 2, 12, 22 : même moyenne, dispersions sans rapport.",
    standard:
      "**En image** : la moyenne a une propriété de **linéarité** — ajoute 2 points à tout le monde : la moyenne gagne 2 (et $\\sigma$ ne bouge pas : les écarts sont intacts !) ; multiplie toutes les notes par 1,1 : la moyenne aussi (et $\\sigma$ aussi). En formule : la série $ax + b$ a pour moyenne $a\\bar{x} + b$ — l'enseignant qui « remonte » une classe le sait d'instinct, la linéarité le démontre. Et l'**influence d'une valeur** : ajouter un 20 à une série de 9 notes à 10 de moyenne tire la moyenne à 11 — la médiane, elle, bouge à peine : ton duel de 4e, requantifié.",
    advanced:
      "**Dans la tête** : les grandes séries se **regroupent en classes** — tailles $[150\\,;\\,160[$, $[160\\,;\\,170[$… : l'**histogramme** les dessine (aire proportionnelle à l'effectif), la moyenne s'estime par les **centres de classes** pondérés par les effectifs (en supposant la répartition uniforme dans chaque classe), et la **classe médiane** est celle où les effectifs cumulés franchissent la moitié. On résume alors une distribution par un **couple** : (moyenne ; écart type) pour le calcul, (médiane ; écart interquartile) pour la robustesse — deux paires de lunettes, et le statisticien choisit selon que les valeurs extrêmes méritent d'être vues ou neutralisées.",
  },
  keyIdea: "$\\sigma$ : racine de la moyenne des **carrés des écarts** à la moyenne — petit $=$ serré, grand $=$ dispersé. Linéarité : la série $ax + b$ a pour moyenne $a\\bar{x} + b$ ($\\sigma$ insensible au $+b$). Couples : (moyenne ; $\\sigma$) ou (médiane ; IQR).",
  why:
    "Pourquoi élever les écarts au carré plutôt que les additionner ? Parce que leur somme brute vaut toujours **zéro** — la moyenne est le point d'équilibre, les écarts se compensent exactement. Le carré rend tout positif et punit davantage les grands écarts : c'est le choix qui a gagné l'histoire (Gauss en a fait la pierre angulaire de la théorie des erreurs), et l'écart type est aujourd'hui l'unité de risque de la finance, de tolérance de l'industrie, de marge d'erreur des sondages — la dispersion gouverne le monde autant que la moyenne.",
  examples: [
    { title: "Même moyenne, deux mondes", steps: [
      { p: "10, 12, 14 : écarts $-2, 0, 2$ → $\\sigma = \\sqrt{\\frac{4 + 0 + 4}{3}} \\approx 1{,}6$." },
      { p: "2, 12, 22 : écarts $-10, 0, 10$ → $\\sigma \\approx 8{,}2$ — la moyenne 12 cachait tout." },
    ] },
    { title: "La linéarité au travail", steps: [
      { p: "Moyenne 12, on ajoute 2 points à tous : nouvelle moyenne $12 + 2 = 14$." },
      { p: "Et $\\sigma$ ne bouge pas — les écarts entre copies sont restés les mêmes." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi la somme des écarts à la moyenne vaut-elle toujours zéro ? Et que fait l'écart type pour contourner ce problème ?", solution: "La moyenne est le **point d'équilibre** : les écarts positifs compensent exactement les négatifs — leur somme est nulle par construction. L'écart type les élève **au carré** (tout devient positif), en fait la moyenne, puis reprend la **racine** pour retrouver l'unité d'origine." },
    { tier: "warmup", prompt: "Calcule l'écart type de la série 10, 12, 14 (moyenne 12), puis compare-le à celui de 2, 12, 22.", solution: "Écarts $-2, 0, 2$ → carrés $4, 0, 4$ → moyenne $\\frac{8}{3}$ → $\\sigma = \\sqrt{\\frac{8}{3}} \\approx $ **1,6** ; pour 2, 12, 22 : $\\sigma = \\sqrt{\\frac{200}{3}} \\approx $ **8,2** — même moyenne, dispersion quintuplée : $\\sigma$ voit ce que la moyenne ignore." },
    { tier: "application", prompt: "Une classe a 11,2 de moyenne. Le professeur ajoute 1,5 point à toutes les copies, puis (autre scénario) multiplie toutes les notes par 1,1. Donne la nouvelle moyenne dans chaque cas, et l'effet sur l'écart type.", solution: "Linéarité : $+1{,}5$ → moyenne **12,7** et $\\sigma$ **inchangé** (les écarts ne bougent pas) ; $\\times 1{,}1$ → moyenne **12,32** et $\\sigma$ multiplié par 1,1 (les écarts se dilatent) — la série $ax + b$ a pour moyenne $a\\bar{x} + b$." },
    { tier: "challenge", prompt: "Tailles regroupées : $[150\\,;\\,160[$ effectif 5, $[160\\,;\\,170[$ effectif 12, $[170\\,;\\,180[$ effectif 3. Estime la moyenne par les centres de classes et détermine la classe médiane.", solution: "Centres 155, 165, 175 : moyenne $\\approx \\dfrac{155 \\times 5 + 165 \\times 12 + 175 \\times 3}{20} = \\dfrac{3\\,280}{20} = $ **164 cm** (répartition supposée uniforme). Cumuls : 5, 17, 20 — la 10e valeur tombe dans $[160\\,;\\,170[$ : la **classe médiane** — les centres estiment, les cumuls localisent." },
    { tier: "exam", prompt: "Deux ateliers produisent des pièces de diamètre moyen 20 mm : atelier A, $\\sigma = 0{,}1$ mm ; atelier B, $\\sigma = 0{,}8$ mm. La tolérance est $|d - 20| \\leq 0{,}5$. Lequel choisir et pourquoi ? Quel couple d'indicateurs préférerais-tu si l'atelier B avait quelques pièces très aberrantes ?", solution: "**A** : son écart type ($0{,}1$) tient les pièces serrées autour de 20 — presque toutes dans la tolérance $[19{,}5\\,;\\,20{,}5]$ ; B disperse à $0{,}8$ : une grosse part sort des bornes malgré la **même moyenne** — la qualité industrielle est une affaire de $\\sigma$, pas de moyenne. Avec des valeurs aberrantes, le couple **(médiane ; écart interquartile)** serait plus honnête : insensible aux extrêmes, il décrit la production courante — deux paires de lunettes, à choisir selon ce qu'on veut voir." },
  ],
  practice: [
    { tier: "warmup", label: "Les écarts d'abord", make: (r) => {
      const m = pick(r, [10, 12, 15]); const e = randint(r, 1, 5);
      return { prompt: `Série $${m - e}, ${m}, ${m + e}$ (moyenne ${m}) : quelle est la moyenne des carrés des écarts ?`, answer: Math.round(((2 * e * e) / 3) * 100) / 100, solution: `Écarts $-${e}, 0, ${e}$ → carrés $${e * e}, 0, ${e * e}$ → moyenne $\\frac{${2 * e * e}}{3} \\approx $ **${String(Math.round(((2 * e * e) / 3) * 100) / 100).replace(".", ",")}** ($\\sigma$ en est la racine).` };
    } },
    { tier: "application", label: "La linéarité", make: (r) => {
      const m = pick(r, [9.5, 10.4, 11.2, 12.8]); const b = pick(r, [0.5, 1, 1.5, 2]);
      return { prompt: `Moyenne ${String(m).replace(".", ",")} ; on ajoute ${String(b).replace(".", ",")} point à toutes les notes : nouvelle moyenne ? (décimal)`, answer: Math.round((m + b) * 10) / 10, solution: `$${String(m).replace(".", ",")} + ${String(b).replace(".", ",")} = $ **${String(Math.round((m + b) * 10) / 10).replace(".", ",")}** — et l'écart type ne bronche pas.` };
    } },
    { tier: "challenge", label: "Le centre pondéré", make: (r) => {
      const c1 = pick(r, [155, 165]); const n1 = randint(r, 2, 8); const n2 = randint(r, 2, 8);
      const c2 = c1 + 10;
      const m = Math.round(((c1 * n1 + c2 * n2) / (n1 + n2)) * 10) / 10;
      return { prompt: `Classes de centres ${c1} (effectif ${n1}) et ${c2} (effectif ${n2}) : moyenne estimée ? (au dixième)`, answer: m, solution: `$\\dfrac{${c1} \\times ${n1} + ${c2} \\times ${n2}}{${n1 + n2}} = $ **${String(m).replace(".", ",")}** — les centres, pondérés par les effectifs.` };
    } },
  ],
};

// — Crossed tables and conditional frequencies (programme: tableaux croisés) —
const tableauxCroises = {
  id: "discrete.high.tableaux-croises",
  level: "high", domain: "discrete",
  title: "Tableaux croisés et fréquences conditionnelles",
  tagline: "« Parmi les… » change tout — la donnée croisée et ses trois lectures.",
  prereqs: ["probability.middle.union-intersection"],
  intuition:
    "Croise deux caractères — sexe × régime, par exemple — dans un **tableau croisé d'effectifs** : chaque case compte les individus qui cumulent les deux.\n\nTrois fréquences s'y lisent : la fréquence **globale** (sur le total), la **marginale** (les totaux de lignes et colonnes — la marge !), et la **conditionnelle** : « **parmi** les internes, quelle part de filles ? » — le dénominateur change, tout change.",
  depths: {
    discovery:
      "**Avec les mains** : un lycée de 200 élèves — 60 internes dont 24 filles, 140 externes dont 80 filles. Fréquence globale des filles internes : $\\frac{24}{200} = 12\\,\\%$ ; fréquence **conditionnelle** des filles **parmi les internes** : $\\frac{24}{60} = 40\\,\\%$ — même case, deux nombres : seul le **dénominateur** a changé, et c'est le mot « parmi » qui le choisit.",
    standard:
      "**En image** : compléter un tableau est un sudoku — les **marges** (totaux de lignes et colonnes) contraignent tout : si la ligne « internes » totalise 60 et que les filles internes sont 24, les garçons internes sont 36, sans qu'on te le dise ; et les marges elles-mêmes se somment au total général. Avec quelques cases et les marges, le tableau entier se déduit — l'algorithme officiel le fait en filtrant les individus par des conditions **ET / OU / NON** : interne ET fille, ta logique de 3e devenue requête de base de données.",
    advanced:
      "**Dans la tête** : la conditionnelle est le piège favori des manchettes — « 40 % des internes sont des filles » et « 12 % des élèves sont des filles internes » et « parmi les filles, 23 % sont internes » ($\\frac{24}{104}$) : **trois phrases vraies, trois nombres différents**, sur la même case du tableau. Lire une statistique, c'est d'abord demander : *fréquence de quoi, parmi qui ?* — et tu pressens la suite : remplace « fréquence parmi » par « probabilité sachant », et le tableau croisé devient l'antichambre des probabilités conditionnelles.",
  },
  keyIdea: "Conditionnelle $=$ la part **parmi un sous-groupe** : $\\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ — le mot « parmi » choisit le dénominateur. Marginales : les totaux des marges ; le tableau se complète par ses contraintes de sommes.",
  why:
    "Pourquoi tant de soin pour des pourcentages de tableau ? Parce que la confusion des dénominateurs est l'erreur statistique la plus exploitée du débat public — un même chiffre, rapporté au mauvais total, prouve n'importe quoi. Le tableau croisé est aussi ton premier contact avec les **bases de données** : des individus, des caractères, des filtres — l'INSEE, l'open data, les fichiers clients ont exactement cette forme, et savoir y calculer « parmi », c'est savoir les interroger.",
  examples: [
    { title: "Le mot « parmi »", steps: [
      { p: "24 filles internes, 60 internes, 200 élèves." },
      { p: "Globale : $\\frac{24}{200} = 12\\,\\%$ ; **parmi les internes** : $\\frac{24}{60} = 40\\,\\%$ — le dénominateur suit le « parmi »." },
    ] },
    { title: "Compléter par les marges", steps: [
      { p: "Internes : 60 au total, 24 filles → garçons internes $= 60 - 24 = 36$." },
      { p: "Les marges contraignent les cases — le tableau croisé est un sudoku de sommes." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Lycée de 200 élèves : 60 internes (dont 24 filles), 140 externes (dont 80 filles). Calcule la fréquence globale des filles internes, puis la fréquence des filles parmi les internes.", solution: "Globale : $\\frac{24}{200} = $ **12 %** ; conditionnelle : $\\frac{24}{60} = $ **40 %** — même case, deux dénominateurs : le total général, puis le sous-groupe désigné par « parmi »." },
    { tier: "warmup", prompt: "Avec les mêmes données, dresse le tableau croisé complet (filles/garçons × internes/externes) et ses marges.", solution: "Filles : 24 internes, 80 externes (total **104**) ; garçons : $60 - 24 = 36$ internes, $140 - 80 = 60$ externes (total **96**) ; marges : 60 + 140 = 200 ✓ — chaque case manquante se déduit des sommes." },
    { tier: "application", prompt: "Toujours le même lycée : calcule la fréquence des internes parmi les filles, et compare-la à la fréquence des filles parmi les internes. Pourquoi diffèrent-elles ?", solution: "Parmi les filles : $\\frac{24}{104} \\approx $ **23 %** ; parmi les internes : $\\frac{24}{60} = $ **40 %** — même numérateur (les 24 filles internes), dénominateurs différents : « parmi A » divise par A. Les deux conditionnelles d'une même case ne coïncident presque jamais." },
    { tier: "challenge", prompt: "Décris le filtre (conditions ET / OU / NON) qui sélectionne, dans le fichier des élèves : les filles internes ; les élèves ni filles ni internes ; les internes ou les filles.", solution: "« fille **ET** interne » (l'intersection — la case) ; « **NON** fille **ET NON** interne » (les garçons externes — le complémentaire des deux) ; « interne **OU** fille » (la réunion : $60 + 104 - 24 = 140$ élèves — le double comptage remboursé, ta formule de 3e en version effectifs !)." },
    { tier: "exam", prompt: "Un journal titre : « 40 % des internes sont des filles » ; un autre : « seulement 12 % des élèves sont des filles internes » ; un troisième : « à peine 23 % des filles sont internes ». Montre que les trois titres décrivent la même case du même tableau, et explique ce qu'un lecteur doit systématiquement vérifier.", solution: "Les trois rapportent les **24 filles internes** à trois dénominateurs : les 60 internes ($40\\,\\%$), les 200 élèves ($12\\,\\%$), les 104 filles ($23\\,\\%$) — trois phrases vraies, trois impressions opposées. Le lecteur doit demander : **fréquence de quoi, parmi qui ?** — c'est-à-dire identifier numérateur et dénominateur. La statistique ne ment pas ; le choix du dénominateur, parfois — et la probabilité conditionnelle de la leçon suivante héritera exactement de ce piège." },
  ],
  practice: [
    { tier: "warmup", label: "Le sudoku des marges", make: (r) => {
      const tot = pick(r, [60, 80, 100]); const a = randint(r, 10, tot - 15);
      return { prompt: `Une ligne du tableau totalise ${tot} ; une de ses deux cases vaut ${a}. Que vaut l'autre ?`, answer: tot - a, solution: `$${tot} - ${a} = $ **${tot - a}** — les marges contraignent les cases.` };
    } },
    { tier: "application", label: "Parmi qui ?", make: (r) => {
      const sg = pick(r, [40, 50, 60, 80]); const cas = randint(r, 1, Math.floor(sg / 2)) * 2;
      const tot = sg + pick(r, [60, 100, 140]);
      const cond = r() < 0.5;
      return { prompt: `${cas} filles internes ; ${sg} internes ; ${tot} élèves. Fréquence des filles internes **${cond ? "parmi les internes" : "dans le lycée"}** en % ? (arrondi à l'unité)`, answer: Math.round((cas / (cond ? sg : tot)) * 100), solution: `$\\frac{${cas}}{${cond ? sg : tot}} \\approx $ **${Math.round((cas / (cond ? sg : tot)) * 100)} %** — le « parmi » a choisi le dénominateur ${cond ? sg : tot}.` };
    } },
  ],
};

export default [ecartType, tableauxCroises];
