// Field "Algebra" — HIGH module (premiere year), part 2: the second degree.
// Official première spécialité programme: second-degree polynomial functions in
// FACTORED form (roots, sign, sum and product of the roots), CANONICAL form,
// DISCRIMINANT, possible factorization, equation solving — with the REQUIRED
// PROOF: the resolution of the second-degree equation (from the canonical
// form); choosing the adapted form (expanded, canonical, factored); strategies
// (evident root, sum/product detection). The function-level content (vertex,
// symmetry axis, parabola features without any formula) is the techno-track
// core and lives in the lower tiers of the first lesson.
import { randint, pick } from "../../core/exercises.js";

// — The quadratic function (programme: forme canonique, parabole) —
const fonctionSecondDegre = {
  id: "algebra.high.fonction-second-degre",
  level: "high", domain: "algebra",
  title: "La fonction du second degré",
  tagline: "ax² + bx + c : les trois formes (développée, canonique, factorisée) d'une parabole.",
  prereqs: ["analysis.high.fonctions-reference", "algebra.high.calcul-algebrique"],
  intuition:
    "Ta parabole de 3e généralise : $f(x) = ax^2 + bx + c$ ($a \\neq 0$) — un U déformé, déplacé, parfois renversé.\n\nTrois écritures du même polynôme, chacune avec son talent : la **développée** ($ax^2 + bx + c$ : lire $c$, calculer les images), la **canonique** ($a(x - \\alpha)^2 + \\beta$ : lire le **sommet**), la **factorisée** ($a(x - x_1)(x - x_2)$ : lire les **racines**).",
  depths: {
    discovery:
      "**Avec les mains** : la silhouette se lit sur $a$ — positif : le U sourit (vers le haut), négatif : il boude (vers le bas) ; plus $|a|$ est grand, plus la parabole est étroite. Et la courbe garde un **axe de symétrie** vertical passant par le sommet : les deux branches sont jumelles, comme en 3e.",
    standard:
      "**En image** : la forme **canonique** $a(x - \\alpha)^2 + \\beta$ avoue tout — le sommet est $(\\alpha\\,;\\,\\beta)$ : le carré $(x - \\alpha)^2$ est minimal (nul) en $x = \\alpha$, donc $f$ y atteint $\\beta$ — minimum si $a > 0$, maximum si $a < 0$. Tableau de variations : ↘ puis ↗ (ou l'inverse), pivot en $\\alpha$ — la parabole de référence, translatée de $\\alpha$ et $\\beta$, dilatée par $a$.",
    advanced:
      "**Dans la tête** : la forme **factorisée** $a(x - x_1)(x - x_2)$ règne sur le signe — le produit s'annule en $x_1$ et $x_2$ (les **racines**), et le tableau de signes de 2de tranche : $f$ est du signe de $a$ **à l'extérieur** des racines, du signe contraire entre elles. Bonus : développe $a(x - x_1)(x - x_2)$ et compare — la **somme** des racines vaut $-\\frac{b}{a}$, leur **produit** $\\frac{c}{a}$ : deux nombres de somme $s$ et de produit $p$ sont les racines de $x^2 - sx + p$, l'outil de détection mentale ($x^2 - 5x + 6$ : somme 5, produit 6 → racines 2 et 3, sans calcul). L'axe de symétrie tombe pile au **milieu des racines** : $\\alpha = \\frac{x_1 + x_2}{2}$ — les trois costumes racontent la même courbe.",
  },
  keyIdea: "Trois formes, trois lectures : développée → $c$ (ordonnée à l'origine), **canonique** $a(x-\\alpha)^2 + \\beta$ → sommet $(\\alpha\\,;\\,\\beta)$, **factorisée** → racines et **signe** ($a$ à l'extérieur). Somme des racines $-\\frac{b}{a}$, produit $\\frac{c}{a}$.",
  why:
    "Pourquoi trois écritures du même objet ? Parce que chaque question a sa forme reine — un maximum d'aire ? canonique ; les zéros d'une trajectoire ? factorisée ; une valeur en 0 ? développée. Savoir **choisir la forme adaptée** est la compétence affichée du programme — et le réflexe de tout calculateur : on ne résout pas avec la forme qu'on a, on passe à celle qu'il faut.",
  examples: [
    { title: "Le sommet dans la canonique", steps: [
      { p: "$f(x) = 2(x - 3)^2 + 1$ : le carré est nul en $x = 3$, minimal partout ailleurs." },
      { p: "Sommet $(3\\,;\\,1)$, minimum 1, parabole vers le haut ($a = 2 > 0$) — tout est lu." },
    ] },
    { title: "Le signe dans la factorisée", steps: [
      { p: "$f(x) = -(x - 1)(x - 4)$ : racines 1 et 4, $a = -1 < 0$." },
      { p: "Signe de $a$ à l'**extérieur** : négatif avant 1 et après 4, **positif entre** — le tableau de 2de tranche." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour $f(x) = 2(x - 3)^2 + 1$ : donne le sommet, le sens de la parabole et le tableau de variations.", solution: "Sommet $(3\\,;\\,1)$ (le carré s'annule en 3, $f$ y vaut 1) ; $a = 2 > 0$ : parabole **vers le haut** — tableau : ↘ jusqu'à 3, ↗ après, minimum 1 : la forme canonique avoue tout." },
    { tier: "warmup", prompt: "Pour $g(x) = -(x - 1)(x - 4)$ : racines, signe de $g$, et allure de la parabole.", solution: "Racines **1 et 4** ; $a = -1 < 0$ : du signe de $a$ (négatif) à l'**extérieur**, **positif entre** 1 et 4 — parabole vers le bas, sommet au milieu des racines ($x = 2{,}5$)." },
    { tier: "application", prompt: "Vérifie que 2 est racine de $f(x) = x^2 - 5x + 6$, puis factorise et donne l'autre racine — sans discriminant.", solution: "$f(2) = 4 - 10 + 6 = 0$ ✓. Produit des racines $= \\frac{c}{a} = 6$, donc l'autre vaut $\\frac{6}{2} = $ **3** : $f(x) = (x - 2)(x - 3)$ — la racine évidente plus le produit : la stratégie maligne avant la machinerie." },
    { tier: "challenge", prompt: "Trouve mentalement deux nombres de somme 7 et de produit 12, et explique le lien avec le polynôme $x^2 - 7x + 12$.", solution: "**3 et 4** — ils sont exactement les **racines** de $x^2 - sx + p = x^2 - 7x + 12$ : somme $-\\frac{b}{a} = 7$ ✓, produit $\\frac{c}{a} = 12$ ✓ — la détection somme-produit factorise de tête ce que le calcul ferait en dix lignes." },
    { tier: "exam", prompt: "Une entreprise modélise son bénéfice par $B(x) = -2x^2 + 80x - 600$ ($x$ : prix en €). Sachant que $B(x) = -2(x - 10)(x - 30)$ et $B(x) = -2(x - 20)^2 + 200$, exploite chaque forme : seuils de rentabilité, prix optimal, bénéfice maximal — et justifie le choix de forme à chaque question.", solution: "**Factorisée** → racines 10 et 30 : le bénéfice est positif **entre** ($a < 0$ : signe de $a$ dehors) — rentable pour un prix entre 10 et 30 €. **Canonique** → sommet $(20\\,;\\,200)$ : prix optimal **20 €**, bénéfice maximal **200**. **Développée** → $B(0) = -600$ : la perte à prix nul (les coûts fixes). Trois questions, trois formes — choisir l'écriture est la moitié de la résolution : c'est la leçon du second degré." },
  ],
  practice: [
    { tier: "warmup", label: "Lire le sommet", make: (r) => {
      const al = randint(r, -5, 6); const be = randint(r, -8, 9); const a = pick(r, [1, 2, 3, -1, -2]);
      return { prompt: `$f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${al >= 0 ? "- " + al : "+ " + (-al)})^2 ${be >= 0 ? "+ " + be : "- " + (-be)}$ : quelle est l'abscisse du sommet ?`, answer: al, solution: `Le carré s'annule en $x = $ **${al}** — sommet $(${al}\\,;\\,${be})$.` };
    } },
    { tier: "application", label: "Le signe entre les racines", make: (r) => {
      const x1 = randint(r, -4, 2); const x2 = x1 + randint(r, 2, 6); const a = pick(r, [1, -1, 2, -2]);
      const x = x1 + 1 <= x2 - 1 ? randint(r, x1 + 1, x2 - 1) : x1 + 1;
      const signe = a > 0 ? -1 : 1;
      return { prompt: `$f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${x1 >= 0 ? "- " + x1 : "+ " + (-x1)})(x ${x2 >= 0 ? "- " + x2 : "+ " + (-x2)})$ : en $x = ${x}$ (entre les racines), $f$ est-elle positive ? (1 = oui, 0 = non)`, answer: signe > 0 ? 1 : 0, solution: `Entre les racines : signe **contraire** de $a = ${a}$ → **${signe > 0 ? "positive" : "négative"}**.` };
    } },
    { tier: "challenge", label: "Somme et produit", make: (r) => {
      const x1 = randint(r, 1, 6); const x2 = x1 + randint(r, 1, 6);
      return { prompt: `Deux nombres ont pour somme ${x1 + x2} et pour produit ${x1 * x2} : donne le plus petit.`, answer: x1, solution: `Racines de $x^2 - ${x1 + x2}x + ${x1 * x2}$ : **${x1}** et ${x2} — la détection somme-produit.` };
    } },
  ],
};

// — The quadratic equation (programme: discriminant, démo exigible) —
const equationSecondDegre = {
  id: "algebra.high.equation-second-degre",
  level: "high", domain: "algebra",
  title: "L'équation du second degré",
  tagline: "Δ = b² − 4ac détermine le nombre de racines (avec démonstration).",
  prereqs: ["algebra.high.fonction-second-degre", "algebra.high.inequations-signes"],
  intuition:
    "Résoudre $ax^2 + bx + c = 0$ dans **tous** les cas — fini les racines évidentes : la machinerie générale.\n\nLe **discriminant** $\\Delta = b^2 - 4ac$ rend le verdict : $\\Delta > 0$, deux racines $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ ; $\\Delta = 0$, une racine double $-\\dfrac{b}{2a}$ ; $\\Delta < 0$, aucune racine réelle.",
  depths: {
    discovery:
      "**Avec les mains** : le verdict en pratique — $x^2 - 5x + 6 = 0$ : $\\Delta = 25 - 24 = 1 > 0$, racines $\\dfrac{5 \\pm 1}{2}$ : **2 et 3** ✓ (la détection somme-produit confirmait). $x^2 + x + 1 = 0$ : $\\Delta = 1 - 4 = -3 < 0$ : **aucune** solution réelle — la parabole flotte entièrement au-dessus de l'axe.",
    standard:
      "**En image** : ton $x^2 = a$ de 3e était le cas d'école — la règle des trois cas (deux, une, zéro solutions selon un signe) revient, généralisée : $\\Delta$ joue le rôle du $a$. Et géométriquement, $\\Delta$ compte les **intersections de la parabole avec l'axe** : deux traversées, un effleurement (la racine double : le sommet pose sur l'axe), ou aucun contact. Quand $\\Delta \\geq 0$, la factorisation suit : $a(x - x_1)(x - x_2)$ — l'équation résolue offre la forme factorisée, et le signe avec.",
    advanced:
      "**Dans la tête** : la démonstration exigible, joyau du chapitre — pars de la forme canonique : $ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{b^2 - 4ac}{4a}$ (complète le carré : c'est l'identité remarquable de 3e à l'envers). L'équation devient $\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{\\Delta}{4a^2}$ — un **carré égale un nombre** : ton $x^2 = a$ ! Trois cas selon le signe de $\\Delta$, et si $\\Delta \\geq 0$, extraire la racine donne $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ ✓. Toute la formule sort du carré complété — Al-Khwarizmi le faisait en mots et en figures il y a douze siècles : son *al-jabr* a donné son nom à l'algèbre, et sa méthode est exactement celle-ci.",
  },
  keyIdea: "$\\Delta = b^2 - 4ac$ : deux racines $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ si $\\Delta > 0$, une double $-\\dfrac{b}{2a}$ si $\\Delta = 0$, aucune si $\\Delta < 0$. La **démonstration** : forme canonique → un carré égale $\\dfrac{\\Delta}{4a^2}$ → tes trois cas de 3e.",
  why:
    "Pourquoi une formule, quand somme-produit suffit souvent ? Parce que la formule **ne rate jamais** : racines irrationnelles, coefficients quelconques, problèmes de physique aux constantes sales — $\\Delta$ traite tout, uniformément. C'est le premier algorithme complet de résolution que tu rencontres : entrée $(a, b, c)$, sortie les racines, zéro improvisation — la promesse algébrique tenue, douze siècles après Al-Khwarizmi.",
  examples: [
    { title: "Le verdict de Δ", steps: [
      { p: "$x^2 - 5x + 6 = 0$ : $\\Delta = 25 - 24 = 1$ — deux racines $\\dfrac{5 \\pm 1}{2} = 2$ et $3$." },
      { p: "$x^2 + x + 1 = 0$ : $\\Delta = -3 < 0$ — la parabole ne touche jamais l'axe : aucune solution." },
    ] },
    { title: "Le carré complété", steps: [
      { p: "$ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{\\Delta}{4a}$ — la canonique générale." },
      { p: "L'équation devient un **carré égale un nombre** : tes trois cas de 3e, et la formule en sort." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous $x^2 - 5x + 6 = 0$ par le discriminant, et vérifie avec la somme et le produit des racines.", solution: "$\\Delta = 25 - 24 = 1 > 0$ : $x = \\dfrac{5 \\pm 1}{2}$ → **2 et 3**. Contrôle : somme $5 = -\\frac{b}{a}$ ✓, produit $6 = \\frac{c}{a}$ ✓ — la formule et la détection se confirment." },
    { tier: "warmup", prompt: "Résous : $2x^2 - 4x + 2 = 0$ puis $x^2 + x + 1 = 0$. Interprète chaque cas sur la parabole.", solution: "$\\Delta = 16 - 16 = 0$ : racine **double** $x = 1$ — le sommet **pose** sur l'axe. $\\Delta = 1 - 4 = -3 < 0$ : **aucune** racine — la parabole flotte au-dessus sans contact : $\\Delta$ compte les intersections." },
    { tier: "application", prompt: "Résous $3x^2 + 5x - 2 = 0$ et donne la forme factorisée.", solution: "$\\Delta = 25 + 24 = 49$ : $x = \\dfrac{-5 \\pm 7}{6}$ → $\\dfrac{1}{3}$ et $-2$ — factorisée : $3\\left(x - \\frac{1}{3}\\right)(x + 2)$ : l'équation résolue offre la factorisation, et le tableau de signes avec." },
    { tier: "challenge", prompt: "Pour quelles valeurs de $m$ l'équation $x^2 + mx + 9 = 0$ admet-elle exactement une solution ?", solution: "Racine double ⟺ $\\Delta = m^2 - 36 = 0$ ⟺ $m = $ **6 ou −6** — le discriminant devient lui-même une équation : penser $\\Delta$ comme fonction de $m$, c'est le second degré au carré." },
    { tier: "exam", prompt: "Démontre la formule des racines : pars de la forme canonique de $ax^2 + bx + c$, ramène l'équation à un carré égal à un nombre, et conclus selon le signe de $\\Delta$.", solution: "Canonique : $ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a}$ (compléter le carré). L'équation équivaut à $\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{\\Delta}{4a^2}$ — un carré égale un nombre : si $\\Delta < 0$, **impossible** (un carré n'est pas négatif) ; si $\\Delta = 0$, $x = -\\frac{b}{2a}$, **une** racine ; si $\\Delta > 0$, $x + \\frac{b}{2a} = \\pm\\frac{\\sqrt{\\Delta}}{2a}$, soit $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ ✓ — la formule entière repose sur ton $x^2 = a$ de 3e et l'identité remarquable : Al-Khwarizmi complétait déjà ce carré, en mots, au IXe siècle." },
  ],
  practice: [
    { tier: "warmup", label: "Le verdict de Δ", make: (r) => {
      const cas = pick(r, [[1, -5, 6, 2], [1, 2, 1, 1], [1, 1, 3, 0], [2, -4, 2, 1], [1, -3, -4, 2], [1, 0, 5, 0]]);
      return { prompt: `$${cas[0] === 1 ? "" : cas[0]}x^2 ${cas[1] >= 0 ? "+ " + (cas[1] === 1 ? "" : cas[1]) + "x" : "- " + (-cas[1] === 1 ? "" : -cas[1]) + "x"} ${cas[2] >= 0 ? "+ " + cas[2] : "- " + (-cas[2])} = 0$ : combien de solutions ?`, answer: cas[3], solution: `$\\Delta = ${cas[1] ** 2 - 4 * cas[0] * cas[2]}$ → **${cas[3]}** solution${cas[3] > 1 ? "s" : cas[3] === 0 ? " (Δ < 0)" : " (double)"}.` };
    } },
    { tier: "application", label: "Calculer Δ", make: (r) => {
      const a = pick(r, [1, 2, 3]); const b = randint(r, -6, 7); const c = randint(r, -5, 6);
      return { prompt: `$${a === 1 ? "" : a}x^2 ${b >= 0 ? "+ " + (b === 1 ? "" : b) + "x" : "- " + (-b === 1 ? "" : -b) + "x"} ${c >= 0 ? "+ " + c : "- " + (-c)} = 0$ : que vaut $\\Delta$ ?`, answer: b * b - 4 * a * c, solution: `$\\Delta = (${b})^2 - 4 \\times ${a} \\times (${c}) = $ **${b * b - 4 * a * c}**.` };
    } },
    { tier: "challenge", label: "La racine par la formule", make: (r) => {
      const x1 = randint(r, -3, 4); const x2 = x1 + randint(r, 1, 5);
      const b = -(x1 + x2); const c = x1 * x2;
      return { prompt: `$x^2 ${b >= 0 ? "+ " + (b === 1 ? "" : b) + "x" : "- " + (-b === 1 ? "" : -b) + "x"} ${c >= 0 ? "+ " + c : "- " + (-c)} = 0$ : donne la plus grande racine.`, answer: x2, solution: `$\\Delta = ${b * b - 4 * c}$, racines $\\dfrac{${-b} \\pm ${x2 - x1}}{2}$ : ${x1} et **${x2}**.` };
    } },
  ],
};

export default [fonctionSecondDegre, equationSecondDegre];
