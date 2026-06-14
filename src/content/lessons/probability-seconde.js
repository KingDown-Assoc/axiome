// Field "Probability" — HIGH module (seconde year): the probabilistic model and
// conditional probabilities. Official programme: a probability law (e.g. an
// equiprobability) is a HYPOTHESIS of the chosen model and is never proved;
// explicit equiprobability assumptions with P(A) = Card(A)/Card(Ω); models built
// from observed frequencies via the vulgarized law of large numbers ("when n is
// large, barring exceptions, the observed frequency is close to the
// probability") with Python/spreadsheet simulation; the sharp distinction
// between the abstract model and the real situation. Then: CONDITIONAL
// probability PA(B), weighted probability trees (branch weights are conditional
// probabilities, path products give intersections), computing conditional
// probabilities from two-way tables (equiprobable draw of one individual), and
// DISTINGUISHING PA(B) from PB(A) — false positives, sensitivity, specificity.
// The total-probability formula over a partition is explicitly NOT expected.
// History: the chevalier de Méré and the Pascal-Fermat letters, the duke of
// Tuscany; Bayes and de Moivre (in English!), Laplace.
import { randint, pick } from "../../core/exercises.js";

// — The probabilistic model (programme: la loi est une hypothèse du modèle) —
const modele = {
  id: "probability.high.modele",
  level: "high", domain: "probability",
  title: "Le modèle probabiliste",
  tagline: "Une loi de probabilité ne se démontre pas — elle se choisit, puis s'éprouve.",
  prereqs: ["probability.middle.union-intersection"],
  intuition:
    "D'où vient le $\\frac{1}{6}$ du dé ? D'aucun calcul : c'est une **hypothèse** — le dé est supposé équilibré. Une loi de probabilité **ne se démontre pas** : elle fait partie du modèle qu'on **choisit**.\n\nDeux sources pour ce choix : la **symétrie** supposée (dé, pièce, tirage au hasard — l'équiprobabilité, qu'il faut dire tout haut) ou les **fréquences observées** quand rien n'est symétrique (la punaise qui tombe pointe en l'air 62 fois sur 100).",
  depths: {
    discovery:
      "**Avec les mains** : sous équiprobabilité, compter suffit — $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$ : le cardinal de l'événement sur celui de l'univers. Tirer une carte : $P(\\text{cœur}) = \\frac{13}{52} = \\frac{1}{4}$ — mais la phrase complète est « **si** chaque carte a la même chance, **alors** $\\frac{1}{4}$ » : l'hypothèse d'abord, le calcul ensuite.",
    standard:
      "**En image** : quand la symétrie manque, les fréquences fabriquent le modèle — lance une punaise 1 000 fois : pointe en l'air 620 fois → on **adopte** $P \\approx 0{,}62$. La caution est la **loi des grands nombres**, version vulgarisée du programme : « lorsque $n$ est grand, sauf exception, la fréquence observée est proche de la probabilité » — ta stabilisation de 3e, promue au rang de pont officiel entre le réel qui se compte et le modèle qui se calcule.",
    advanced:
      "**Dans la tête** : la distinction cardinale — le **modèle** est abstrait, la **situation** est réelle, et l'on ne confond jamais les deux : « le dé est équilibré » est une hypothèse de travail, pas une vérité du monde (aucun dé réel n'est parfait) ; si les fréquences s'obstinent loin du modèle, on ne corrige pas le réel — on **change de modèle**. C'est exactement ainsi que la discipline est née : le chevalier de Méré perdait aux dés contre ses propres intuitions, posa le problème des partis à **Pascal**, qui en débattit par lettres avec **Fermat** (1654) — et le duc de Toscane demanda à Galilée pourquoi le 10 sort plus que le 9 avec trois dés (comptez les cas : 27 contre 25 !). Le hasard se mathématise depuis quatre siècles, et toujours par le même geste : choisir un modèle, le confronter aux fréquences.",
  },
  keyIdea: "Une loi de probabilité est une **hypothèse du modèle** — jamais un théorème. Équiprobabilité (à expliciter !) : $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$ ; sinon, les **fréquences observées** fournissent le modèle (loi des grands nombres vulgarisée). Modèle abstrait ≠ situation réelle.",
  why:
    "Pourquoi insister sur ce qui ne se démontre pas ? Parce que toute la rigueur probabiliste tient là : les calculs sont exacts **dans le modèle**, et le modèle est un choix qu'on assume et qu'on révise. Le sondeur, l'assureur, le médecin font tous ce geste — modéliser, calculer, confronter — et les pires erreurs statistiques viennent de l'oublier : prendre le modèle pour le monde. La seconde t'apprend à dire la phrase complète.",
  examples: [
    { title: "L'hypothèse dite tout haut", steps: [
      { p: "Tirage d'une carte parmi 52, **supposé équiprobable** : chaque carte pèse $\\frac{1}{52}$." },
      { p: "$P(\\text{cœur}) = \\dfrac{\\text{Card}(\\text{cœurs})}{\\text{Card}(\\Omega)} = \\dfrac{13}{52} = \\dfrac{1}{4}$ — le calcul vit sous l'hypothèse." },
    ] },
    { title: "La punaise sans symétrie", steps: [
      { p: "1 000 lancers : pointe en l'air 620 fois — aucune symétrie ne donne ce nombre." },
      { p: "On **adopte** $P(\\text{pointe en l'air}) \\approx 0{,}62$ : les fréquences ont écrit le modèle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi dit-on que $P(6) = \\frac{1}{6}$ pour un dé « ne se démontre pas » ? D'où vient ce nombre ?", solution: "C'est une **hypothèse du modèle** : on suppose le dé équilibré (symétrie des six faces), et l'équiprobabilité en découle — aucun calcul ne la prouve, aucun dé réel n'est parfait. Le $\\frac{1}{6}$ appartient au modèle choisi, pas au monde." },
    { tier: "warmup", prompt: "On tire une carte d'un jeu de 52, au hasard. Explicite l'hypothèse, puis calcule $P(\\text{as})$ avec les cardinaux.", solution: "Hypothèse : **équiprobabilité** (« au hasard » = chaque carte a la même chance). Alors $P(\\text{as}) = \\dfrac{\\text{Card}(\\text{as})}{\\text{Card}(\\Omega)} = \\dfrac{4}{52} = \\dfrac{1}{13}$ — l'hypothèse d'abord, le quotient ensuite." },
    { tier: "application", prompt: "Une punaise lancée 1 000 fois tombe pointe en l'air 620 fois. Quel modèle adopter pour $P(\\text{pointe en l'air})$, et quelle loi le justifie ?", solution: "On adopte $P \\approx $ **0,62** — pas de symétrie ici, ce sont les **fréquences** qui fabriquent le modèle, cautionnées par la loi des grands nombres (version vulgarisée) : « lorsque $n$ est grand, sauf exception, la fréquence observée est proche de la probabilité »." },
    { tier: "challenge", prompt: "Décris une simulation Python (en français structuré) pour observer la loi des grands nombres sur un dé : que trace-t-on, et qu'attend-on de la courbe ?", solution: "« Pour $n$ de 1 à 10 000 : tirer un entier au hasard entre 1 et 6 ; compter les 6 ; tracer la **fréquence** des 6 en fonction de $n$ » — la courbe tangue fort au début puis **se stabilise** vers $\\frac{1}{6} \\approx 0{,}167$ : la loi des grands nombres, vue à l'écran. (Ton tant que de 3e sait l'écrire.)" },
    { tier: "exam", prompt: "Le duc de Toscane s'étonnait : avec trois dés, la somme 10 sort plus souvent que la somme 9, alors que chacune s'écrit de six façons (10 = 1+3+6 = 1+4+5 = 2+2+6 = 2+3+5 = 2+4+4 = 3+3+4 ; 9 = 1+2+6 = 1+3+5 = 1+4+4 = 2+2+5 = 2+3+4 = 3+3+3). Résous son paradoxe en comptant les vrais cas équiprobables.", solution: "L'univers équiprobable est celui des **triplets ordonnés** ($6^3 = 216$ cas), pas des écritures : $1+3+6$ se réalise en $3! = 6$ ordres, $2+2+6$ en 3, $3+3+3$ en **1** seul. Compte : somme 10 → $6+6+3+6+3+3 = $ **27** cas ; somme 9 → $6+6+3+3+6+1 = $ **25** cas. $\\frac{27}{216} > \\frac{25}{216}$ : le duc observait juste, son modèle comptait mal — Galilée a résolu l'affaire en choisissant le **bon** univers équiprobable : tout le métier probabiliste tient dans ce choix." },
  ],
  practice: [
    { tier: "warmup", label: "Les cardinaux au travail", make: (r) => {
      const tot = pick(r, [20, 30, 40, 50]); const k = pick(r, [2, 4, 5, 10]); const fav = tot / k;
      return { prompt: `Tirage équiprobable parmi ${tot} boules dont ${fav} rouges : $P(\\text{rouge}) = \\frac{1}{?}$`, answer: k, solution: `$\\dfrac{\\text{Card}(R)}{\\text{Card}(\\Omega)} = \\dfrac{${fav}}{${tot}} = \\dfrac{1}{${k}}$ — sous l'hypothèse d'équiprobabilité, dite tout haut.` };
    } },
    { tier: "application", label: "Équiprobable ou pas ?", make: (r) => {
      const cas = pick(r, [["un dé équilibré : chaque face", 1], ["une punaise : pointe en l'air ou pas", 0], ["une pièce équilibrée : pile ou face", 1], ["la météo de demain : pluie ou pas", 0], ["un tirage au sort dans une classe : chaque élève", 1]]);
      return { prompt: `Modèle équiprobable raisonnable pour « ${cas[0]} » ? (1 = oui, 0 = non)`, answer: cas[1], solution: `**${cas[1] ? "Oui" : "Non"}** — ${cas[1] ? "une symétrie soutient l'hypothèse (à expliciter quand même !)" : "aucune symétrie : seules les fréquences observées peuvent fabriquer le modèle"}.` };
    } },
    { tier: "challenge", label: "Le modèle des fréquences", make: (r) => {
      const n = pick(r, [200, 500, 1000]); const f = pick(r, [12, 35, 62, 78]);
      return { prompt: `Sur ${n} essais, un événement survient ${n * f / 100} fois. Quelle probabilité (en %) le modèle fréquentiste adopte-t-il ?`, answer: f, solution: `Fréquence $= \\dfrac{${n * f / 100}}{${n}} = $ **${f} %** — adoptée comme probabilité du modèle, au nom de la loi des grands nombres.` };
    } },
  ],
};

// — Conditional probabilities (programme: PA(B), arbres, inversion) —
const conditionnelles = {
  id: "probability.high.conditionnelles",
  level: "high", domain: "probability",
  title: "Probabilités conditionnelles et arbres",
  tagline: "PA(B) n'est pas PB(A) — l'inversion qui piège les tests médicaux.",
  prereqs: ["probability.high.modele", "discrete.high.tableaux-croises"],
  intuition:
    "« Sachant que l'élève est interne, quelle chance que ce soit une fille ? » — l'information **rétrécit l'univers** : on ne tire plus parmi tous, mais parmi les internes.\n\nC'est la **probabilité conditionnelle** : $P_A(B) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ — la part de $B$ **dans** $A$ : ta fréquence conditionnelle des tableaux croisés, passée côté probabilités.",
  depths: {
    discovery:
      "**Avec les mains** : sur le tableau croisé du lycée (200 élèves, 60 internes, 24 filles internes), tire un élève au hasard — $P(F) = \\frac{90}{200}$ mais $P_I(F) = \\dfrac{\\text{Card}(I \\cap F)}{\\text{Card}(I)} = \\dfrac{24}{60} = 0{,}4$ : **sachant interne**, l'univers se réduit à la colonne des 60 — la fréquence conditionnelle de tes statistiques **est** la probabilité conditionnelle du tirage au sort.",
    standard:
      "**En image** : l'**arbre pondéré** — premier étage : $P(I) = 0{,}3$ et $P(\\bar{I}) = 0{,}7$ ; second étage, **les branches portent des conditionnelles** : $P_I(F) = 0{,}4$ sur la branche fille-sachant-interne. Et la règle d'or : **multiplier le long d'un chemin** donne l'intersection — $P(I \\cap F) = P(I) \\times P_I(F) = 0{,}3 \\times 0{,}4 = 0{,}12$ : c'est la définition même, lue à l'envers. Chaque nœud a ses branches qui somment à 1 : l'arbre est un traducteur entre la langue naturelle et le calcul.",
    advanced:
      "**Dans la tête** : le piège royal — $P_A(B) \\neq P_B(A)$ : la part des internes parmi les filles ($\\frac{24}{90} \\approx 27\\,\\%$) n'est pas la part des filles parmi les internes ($40\\,\\%$) — même intersection, univers différents. L'inversion des conditionnements est l'erreur la plus lourde de conséquences du raisonnement courant : « la plupart des malades sont positifs » ne dit **pas** « la plupart des positifs sont malades » — et c'est de Moivre puis **Bayes** (en anglais, au XVIIIe) qui ont posé le problème de remonter les conditionnements, **Laplace** qui en a fait une théorie. Deux phrases qui se ressemblent, deux nombres qui peuvent être à des années-lumière : savoir lequel on calcule est toute la compétence.",
  },
  keyIdea: "$P_A(B) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ : la part de $B$ dans l'univers **rétréci** à $A$. Arbre : branches $=$ conditionnelles, **chemin** $=$ **produit** ($P(A \\cap B) = P(A) \\times P_A(B)$). Et toujours : $P_A(B) \\neq P_B(A)$.",
  why:
    "Pourquoi ce chapitre est-il le plus cité hors des maths ? Parce que toute information **conditionne** : un test médical, un filtre anti-spam, un verdict judiciaire sont des probabilités conditionnelles — et l'inversion sauvage ($P_{\\text{malade}}(\\text{positif})$ confondu avec $P_{\\text{positif}}(\\text{malade})$) a réellement condamné des innocents et affolé des patients sains. Distinguer les deux sens n'est pas une subtilité : c'est une compétence de survie civique.",
  examples: [
    { title: "L'univers rétréci", steps: [
      { p: "Lycée : 200 élèves, 60 internes dont 24 filles — tirage au sort équiprobable." },
      { p: "$P_I(F) = \\dfrac{\\text{Card}(I \\cap F)}{\\text{Card}(I)} = \\dfrac{24}{60} = 0{,}4$ — on ne compte plus que dans la colonne des internes." },
    ] },
    { title: "Le chemin qui multiplie", steps: [
      { p: "Arbre : $P(I) = 0{,}3$, puis branche $P_I(F) = 0{,}4$." },
      { p: "$P(I \\cap F) = 0{,}3 \\times 0{,}4 = 0{,}12$ — multiplier le long du chemin **est** la définition, lue à l'envers." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Lycée : 200 élèves, 60 internes, 24 filles internes. On tire un élève au hasard. Calcule $P_I(F)$ et dis ce que l'indice $I$ change à l'univers.", solution: "$P_I(F) = \\dfrac{\\text{Card}(I \\cap F)}{\\text{Card}(I)} = \\dfrac{24}{60} = $ **0,4** — le « sachant interne » **rétrécit l'univers** aux 60 internes : on ne compte plus que dans cette colonne du tableau croisé." },
    { tier: "warmup", prompt: "Sur un arbre : $P(A) = 0{,}3$ et $P_A(B) = 0{,}4$. Que vaut $P(A \\cap B)$, et quelle règle appliques-tu ?", solution: "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}3 \\times 0{,}4 = $ **0,12** — la **multiplication le long du chemin** : c'est la définition de $P_A(B)$ réarrangée, et la règle d'or des arbres pondérés." },
    { tier: "application", prompt: "Avec les mêmes 200 élèves (90 filles, 24 filles internes) : calcule $P_F(I)$ et compare à $P_I(F) = 0{,}4$. Conclusion ?", solution: "$P_F(I) = \\dfrac{24}{90} \\approx $ **0,27** — différent de $0{,}4$ : même intersection (les 24 filles internes), **univers différents** (90 filles contre 60 internes). $P_A(B) \\neq P_B(A)$ : l'ordre du conditionnement change tout." },
    { tier: "challenge", prompt: "Traduis en arbre pondéré : « 30 % des élèves sont internes ; parmi les internes, 40 % sont des filles ; parmi les externes, 50 % » — puis calcule la probabilité de tirer une fille interne et celle de tirer une fille externe.", solution: "Premier étage : $P(I) = 0{,}3$, $P(\\bar{I}) = 0{,}7$ ; second étage : $P_I(F) = 0{,}4$, $P_{\\bar{I}}(F) = 0{,}5$ — chaque nœud somme à 1. Chemins : $P(I \\cap F) = 0{,}3 \\times 0{,}4 = $ **0,12** ; $P(\\bar{I} \\cap F) = 0{,}7 \\times 0{,}5 = $ **0,35** — l'arbre traduit la langue naturelle en produits, branche par branche." },
    { tier: "exam", prompt: "Un test dépiste une maladie touchant 1 personne sur 100. Sur 10 000 personnes : 100 malades dont 99 positifs ; 9 900 saines dont 198 positives (faux positifs). Calcule la sensibilité $P_M(+)$ puis $P_+(M)$, et explique pourquoi leur confusion est dangereuse.", solution: "Sensibilité : $P_M(+) = \\frac{99}{100} = $ **99 %** — le test détecte presque tous les malades. Mais les positifs sont $99 + 198 = 297$, dont 99 malades : $P_+(M) = \\frac{99}{297} = $ **33 %** — deux positifs sur trois sont **sains** ! Même intersection (les 99 vrais positifs), univers opposés (100 malades contre 297 positifs) : annoncer « 99 % » à un patient positif serait confondre $P_M(+)$ et $P_+(M)$ — l'inversion des conditionnements, l'erreur que Bayes et Laplace ont appris au monde à éviter, et que la rareté de la maladie rend spectaculaire." },
  ],
  practice: [
    { tier: "warmup", label: "L'univers rétréci", make: (r) => {
      const cardA = pick(r, [40, 50, 60, 80]); const k = pick(r, [2, 4, 5]); const inter = cardA / k;
      return { prompt: `Card$(A) = ${cardA}$, Card$(A \\cap B) = ${inter}$ : $P_A(B) = \\frac{1}{?}$`, answer: k, solution: `$\\dfrac{${inter}}{${cardA}} = \\dfrac{1}{${k}}$ — la part de $B$ dans l'univers rétréci à $A$.` };
    } },
    { tier: "application", label: "Le chemin multiplié", make: (r) => {
      const pa = pick(r, [2, 3, 4]); const pb = pick(r, [2, 3, 5]);
      return { prompt: `Arbre : $P(A) = \\frac{1}{${pa}}$ puis $P_A(B) = \\frac{1}{${pb}}$. Alors $P(A \\cap B) = \\frac{1}{?}$`, answer: pa * pb, solution: `Multiplier le long du chemin : $\\frac{1}{${pa}} \\times \\frac{1}{${pb}} = \\frac{1}{${pa * pb}}$ — **${pa * pb}**.` };
    } },
    { tier: "challenge", label: "Les deux sens du tableau", make: (r) => {
      const inter = pick(r, [12, 20, 24, 30]); const ca = inter * pick(r, [2, 3]); const cb = inter * pick(r, [4, 5]);
      const sens = r() < 0.5;
      const denom = sens ? ca : cb;
      return { prompt: `Card$(A) = ${ca}$, Card$(B) = ${cb}$, Card$(A \\cap B) = ${inter}$ : que vaut $${sens ? "P_A(B)" : "P_B(A)"}$ en pourcentage ?`, answer: Math.round(100 * inter / denom), solution: `$\\dfrac{${inter}}{${denom}} = $ **${Math.round(100 * inter / denom)} %** — l'univers est $${sens ? "A" : "B"}$ : même intersection, mais le dénominateur dit *parmi qui* — l'autre sens donnerait ${Math.round(100 * inter / (sens ? cb : ca))} %.` };
    } },
  ],
};

export default [modele, conditionnelles];
