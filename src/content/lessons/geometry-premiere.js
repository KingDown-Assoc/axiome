// Field "Geometry" — HIGH module (premiere year): the dot product and analytic
// geometry. Official première spécialité programme. DOT PRODUCT: defined via
// orthogonal projection and via the cosine formula, characterization of
// ORTHOGONALITY, bilinearity and symmetry, expression in an orthonormal basis
// (xx' + yy') and the norm, expansion of ‖u ± v‖² — REQUIRED PROOFS: AL-KASHI's
// formula (with the dot product) and the set of points M with MA⃗·MB⃗ = 0 (the
// circle of diameter [AB]). ANALYTIC GEOMETRY: normal vector (a, b) to the line
// ax + by + c = 0, orthogonal projection of a point onto a line, circle
// equations (recognize center and radius), using a frame to study a
// configuration.
import { randint, pick } from "../../core/exercises.js";

// — The dot product (programme: projection, cosinus, coordonnées) —
const produitScalaire = {
  id: "geometry.high.produit-scalaire",
  level: "high", domain: "geometry",
  title: "Le produit scalaire",
  tagline: "Deux vecteurs, un nombre — et l'orthogonalité devient un calcul.",
  prereqs: ["geometry.high.vecteurs-coordonnees", "geometry.middle.trigonometrie"],
  intuition:
    "Multiplier deux **vecteurs** ? Le produit scalaire $\\vec{u} \\cdot \\vec{v}$ donne un **nombre** qui mesure leur accord : positif s'ils tirent dans le même sens, négatif s'ils s'opposent, **nul s'ils sont perpendiculaires**.\n\nTrois définitions équivalentes, trois outils : la projection, le cosinus, les coordonnées.",
  depths: {
    discovery:
      "**Avec les mains** : la **projection** — projette $\\vec{v}$ orthogonalement sur la direction de $\\vec{u}$ : le produit scalaire est $\\|\\vec{u}\\|$ fois la longueur projetée (signée !). En physique, c'est le **travail** d'une force : seule compte la composante qui pousse *dans le sens* du déplacement — tirer une luge à l'horizontale ou en biais, le scalaire fait le tri.",
    standard:
      "**En image** : la formule du **cosinus** — $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$ : les longueurs pondérées par l'angle. $\\theta = 0$ : produit des normes ; $\\theta = \\frac{\\pi}{2}$ : **zéro** (le cosinus s'annule) ; $\\theta = \\pi$ : l'opposé. D'où le critère roi : $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$ — la perpendicularité, qui exigeait équerre et démonstration, devient une **équation**.",
    advanced:
      "**Dans la tête** : en base **orthonormée**, le miracle du calcul — $\\vec{u}(x\\,;\\,y) \\cdot \\vec{v}(x'\\,;\\,y') = xx' + yy'$ : multiplier les abscisses, les ordonnées, additionner. Cohérence immédiate : $\\vec{u} \\cdot \\vec{u} = x^2 + y^2 = \\|\\vec{u}\\|^2$ — le scalaire d'un vecteur avec lui-même est le carré de sa norme : Pythagore se cachait dedans. Et l'opération est **bilinéaire** et **symétrique** ($\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$, et chaque facteur distribue : $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$) — un calcul littéral sur les flèches : les identités remarquables vectorielles arrivent, et Al-Kashi avec.",
  },
  keyIdea: "Trois visages d'un même nombre : projection signée × norme ; $\\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$ ; $xx' + yy'$ en base orthonormée. **Orthogonaux ⟺ produit scalaire nul** ; $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ ; bilinéaire et symétrique.",
  why:
    "Pourquoi inventer un produit qui rend un nombre ? Parce que l'angle était le dernier rebelle de la géométrie repérée : les longueurs se calculaient (norme), les directions (colinéarité)… mais la perpendicularité résistait. Le scalaire la capture — et avec elle le travail du physicien, la similarité des vecteurs en informatique, la projection en statistique : la moitié des sciences calcule des produits scalaires sans le dire.",
  examples: [
    { title: "L'orthogonalité testée", steps: [
      { p: "$\\vec{u}(3\\,;\\,2)$ et $\\vec{v}(-4\\,;\\,6)$ : $\\vec{u} \\cdot \\vec{v} = 3 \\times (-4) + 2 \\times 6 = 0$." },
      { p: "Produit nul : **perpendiculaires** — l'équerre remplacée par une addition." },
    ] },
    { title: "Le cosinus extrait", steps: [
      { p: "$\\vec{u} \\cdot \\vec{v} = 6$, $\\|\\vec{u}\\| = 2$, $\\|\\vec{v}\\| = 6$ : $\\cos\\theta = \\dfrac{6}{12} = \\dfrac{1}{2}$." },
      { p: "$\\theta = \\dfrac{\\pi}{3}$ — l'angle entre deux flèches, calculé sans rapporteur." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\vec{u} \\cdot \\vec{v}$ pour $\\vec{u}(3\\,;\\,2)$ et $\\vec{v}(-4\\,;\\,6)$. Que conclus-tu ?", solution: "$3 \\times (-4) + 2 \\times 6 = -12 + 12 = $ **0** : les vecteurs sont **orthogonaux** — la perpendicularité est devenue une équation : $xx' + yy' = 0$." },
    { tier: "warmup", prompt: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 4$ et $\\theta = \\frac{\\pi}{3}$ ; puis avec $\\theta = \\frac{\\pi}{2}$ ; puis $\\theta = \\pi$.", solution: "$3 \\times 4 \\times \\frac{1}{2} = $ **6** ; $12 \\times 0 = $ **0** (perpendiculaires) ; $12 \\times (-1) = $ **−12** (opposés) — le cosinus module l'accord des directions." },
    { tier: "application", prompt: "Vérifie que $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ pour $\\vec{u}(3\\,;\\,4)$, et explique pourquoi c'est général.", solution: "$3 \\times 3 + 4 \\times 4 = 25 = 5^2 = \\|\\vec{u}\\|^2$ ✓ — en général $\\vec{u} \\cdot \\vec{u} = x^2 + y^2$, qui **est** le carré de la norme (Pythagore !) : le scalaire contient la longueur." },
    { tier: "challenge", prompt: "$\\vec{u} \\cdot \\vec{v} = 6$, $\\|\\vec{u}\\| = 2$, $\\|\\vec{v}\\| = 6$ : calcule l'angle entre $\\vec{u}$ et $\\vec{v}$.", solution: "$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|} = \\dfrac{6}{12} = \\dfrac{1}{2}$ → $\\theta = \\dfrac{\\pi}{3}$ (tes valeurs remarquables !) — la formule du cosinus, lue à l'envers : l'angle sort du produit." },
    { tier: "exam", prompt: "Choisis la bonne définition pour chaque calcul, et justifie : (1) montrer que les diagonales d'un losange de côtés $\\vec{u}$ et $\\vec{v}$ (donc $\\vec{u} + \\vec{v}$ et $\\vec{u} - \\vec{v}$, avec $\\|\\vec{u}\\| = \\|\\vec{v}\\|$) sont perpendiculaires ; (2) calculer l'angle entre $\\vec{a}(1\\,;\\,2)$ et $\\vec{b}(3\\,;\\,1)$.", solution: "(1) **Bilinéarité** : $(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) = \\vec{u} \\cdot \\vec{u} - \\vec{v} \\cdot \\vec{v} = \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2 = 0$ (côtés égaux !) — l'identité remarquable vectorielle démontre le théorème du losange en une ligne. (2) **Coordonnées puis cosinus** : $\\vec{a} \\cdot \\vec{b} = 5$, normes $\\sqrt{5}$ et $\\sqrt{10}$ : $\\cos\\theta = \\frac{5}{\\sqrt{50}} = \\frac{\\sqrt{2}}{2}$ → $\\theta = \\frac{\\pi}{4}$. Trois visages, et choisir le bon est la moitié du métier." },
  ],
  practice: [
    { tier: "warmup", label: "Le calcul en coordonnées", make: (r) => {
      const x = randint(r, -4, 5); const y = randint(r, -4, 5); const xx = randint(r, -4, 5); const yy = randint(r, -4, 5);
      return { prompt: `$\\vec{u}(${x}\\,;\\,${y}) \\cdot \\vec{v}(${xx}\\,;\\,${yy}) = \\,?$`, answer: x * xx + y * yy, solution: `$${x} \\times ${xx} + ${y} \\times ${yy} = $ **${x * xx + y * yy}**${x * xx + y * yy === 0 ? " — orthogonaux !" : ""}.` };
    } },
    { tier: "application", label: "Perpendiculaires ?", make: (r) => {
      const x = randint(r, 1, 5); const y = randint(r, 1, 5); const ok = r() < 0.5;
      const vx = ok ? -y : -y + pick(r, [1, 2]); const vy = x;
      return { prompt: `$\\vec{u}(${x}\\,;\\,${y})$ et $\\vec{v}(${vx}\\,;\\,${vy})$ : orthogonaux ? (1 = oui, 0 = non)`, answer: x * vx + y * vy === 0 ? 1 : 0, solution: `$\\vec{u} \\cdot \\vec{v} = ${x * vx + y * vy}$ : **${x * vx + y * vy === 0 ? "nul — perpendiculaires" : "non nul — pas perpendiculaires"}**.` };
    } },
    { tier: "challenge", label: "L'angle extrait", make: (r) => {
      const cas = pick(r, [[6, 2, 6, 3, "\\frac{\\pi}{3}"], [0, 3, 5, 2, "\\frac{\\pi}{2}"], [-12, 3, 4, 1, "\\pi"]]);
      return { prompt: `$\\vec{u} \\cdot \\vec{v} = ${cas[0]}$, $\\|\\vec{u}\\| = ${cas[1]}$, $\\|\\vec{v}\\| = ${cas[2]}$ : l'angle vaut (1 = π/3, 2 = π/2, 3 = π) ?`, answer: cas[3], solution: `$\\cos\\theta = \\dfrac{${cas[0]}}{${cas[1] * cas[2]}}$ → $\\theta = ${cas[4]}$ — réponse **${cas[3]}**.` };
    } },
  ],
};

// — Al-Kashi (programme: ‖u ± v‖², formule d'Al-Kashi démontrée) —
const alKashi = {
  id: "geometry.high.al-kashi",
  level: "high", domain: "geometry",
  title: "Le théorème d'Al-Kashi",
  tagline: "Pythagore généralisé — le triangle quelconque livre enfin ses longueurs.",
  prereqs: ["geometry.high.produit-scalaire"],
  intuition:
    "Pythagore exigeait l'angle droit. **Al-Kashi** libère le triangle quelconque : $a^2 = b^2 + c^2 - 2bc\\cos\\widehat{A}$ — le carré du côté opposé, corrigé par l'angle.\n\nSi $\\widehat{A} = \\dfrac{\\pi}{2}$, le cosinus s'annule : Pythagore réapparaît — il n'était qu'un cas particulier.",
  depths: {
    discovery:
      "**Avec les mains** : l'outil préalable — les **identités remarquables vectorielles** : $\\|\\vec{u} + \\vec{v}\\|^2 = (\\vec{u} + \\vec{v}) \\cdot (\\vec{u} + \\vec{v}) = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ — la bilinéarité développe comme en 3e, le double produit devient un double **scalaire** ; et $\\|\\vec{u} - \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
    standard:
      "**En image** : la démonstration exigible — dans le triangle $ABC$, pose $a = BC$, $b = AC$, $c = AB$ : alors $\\vec{BC} = \\vec{AC} - \\vec{AB}$ (Chasles !), donc $a^2 = \\|\\vec{AC} - \\vec{AB}\\|^2 = b^2 + c^2 - 2\\,\\vec{AB} \\cdot \\vec{AC} = b^2 + c^2 - 2bc\\cos\\widehat{A}$ ✓ — trois lignes : Chasles, l'identité, la formule du cosinus. Le terme correctif $-2bc\\cos\\widehat{A}$ mesure l'écart à l'angle droit.",
    advanced:
      "**Dans la tête** : la formule travaille dans les deux sens — un **côté** : $b = 5$, $c = 7$, $\\widehat{A} = \\frac{\\pi}{3}$ : $a^2 = 25 + 49 - 2 \\times 35 \\times \\frac{1}{2} = 39$, $a = \\sqrt{39}$ ; un **angle** : les trois côtés 5, 6, 7 donnent $\\cos\\widehat{A} = \\dfrac{b^2 + c^2 - a^2}{2bc}$ — l'arpenteur mesure trois longueurs et déduit tous les angles. Ghiyath al-Kashi (Samarcande, XVe siècle) calcula aussi $\\pi$ à seize décimales — un record tenu deux siècles ; en France la formule porte son nom, ailleurs « law of cosines » : comme Thalès, les théorèmes voyagent sous des passeports différents. Et la **loi des sinus** ($\\frac{a}{\\sin\\widehat{A}} = \\frac{b}{\\sin\\widehat{B}} = \\frac{c}{\\sin\\widehat{C}}$) complète la trousse du triangle quelconque.",
  },
  keyIdea: "$\\|\\vec{u} \\pm \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 \\pm 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$ — d'où **Al-Kashi** : $a^2 = b^2 + c^2 - 2bc\\cos\\widehat{A}$ (démo : Chasles + identité + cosinus). Angle droit → Pythagore ; trois côtés → tous les angles.",
  why:
    "Pourquoi généraliser Pythagore, qui marchait si bien ? Parce que le monde n'est pas rectangle : le géomètre borne des parcelles quelconques, le navigateur triangule des caps obliques, le GPS résout des triangles sphériques — tous ont besoin du triangle **général**. Al-Kashi est l'outil de terrain par excellence : trois mesures accessibles, toute la figure déduite — la trigonométrie de 3e, armée du produit scalaire, conquiert tous les triangles.",
  examples: [
    { title: "La démonstration en trois lignes", steps: [
      { p: "$\\vec{BC} = \\vec{AC} - \\vec{AB}$ (Chasles), donc $a^2 = \\|\\vec{AC} - \\vec{AB}\\|^2$." },
      { p: "$= b^2 + c^2 - 2\\,\\vec{AB} \\cdot \\vec{AC} = b^2 + c^2 - 2bc\\cos\\widehat{A}$ ✓ — l'identité puis le cosinus." },
    ] },
    { title: "Le côté manquant", steps: [
      { p: "$b = 5$, $c = 7$, $\\widehat{A} = \\frac{\\pi}{3}$ : $a^2 = 25 + 49 - 70 \\times \\frac{1}{2} = 39$." },
      { p: "$a = \\sqrt{39} \\approx 6{,}2$ — le triangle quelconque rend son troisième côté." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Développe $\\|\\vec{u} + \\vec{v}\\|^2$ avec la bilinéarité du produit scalaire.", solution: "$(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} + \\vec{v}) = \\vec{u}\\cdot\\vec{u} + 2\\,\\vec{u}\\cdot\\vec{v} + \\vec{v}\\cdot\\vec{v} = \\|\\vec{u}\\|^2 + 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$ — l'identité remarquable de 3e, version vectorielle : la bilinéarité distribue, la symétrie fusionne les doubles." },
    { tier: "warmup", prompt: "Dans un triangle, $b = 5$, $c = 7$, $\\widehat{A} = \\frac{\\pi}{3}$ : calcule $a$.", solution: "$a^2 = 25 + 49 - 2 \\times 5 \\times 7 \\times \\frac{1}{2} = 39$ → $a = \\sqrt{39} \\approx $ **6,2** — Al-Kashi rend le côté que Pythagore refusait (pas d'angle droit ici)." },
    { tier: "application", prompt: "Un triangle a pour côtés 5, 6 et 7. Calcule le cosinus de l'angle opposé au côté 7, puis l'angle (arrondi au degré).", solution: "$\\cos\\widehat{A} = \\dfrac{5^2 + 6^2 - 7^2}{2 \\times 5 \\times 6} = \\dfrac{12}{60} = 0{,}2$ → $\\widehat{A} \\approx $ **78°** — trois longueurs au sol, tous les angles déduits : la formule lue à l'envers est l'outil de l'arpenteur." },
    { tier: "challenge", prompt: "Vérifie qu'Al-Kashi redonne Pythagore quand l'angle vaut $\\frac{\\pi}{2}$, et sa réciproque quand $a^2 = b^2 + c^2$.", solution: "$\\widehat{A} = \\frac{\\pi}{2}$ : $\\cos\\widehat{A} = 0$, le correctif meurt — $a^2 = b^2 + c^2$ ✓ : Pythagore est le **cas particulier** droit. Réciproquement, $a^2 = b^2 + c^2$ force $\\cos\\widehat{A} = 0$, donc $\\widehat{A} = \\frac{\\pi}{2}$ : théorème **et** réciproque de 4e, absorbés d'un coup." },
    { tier: "exam", prompt: "Démontre la formule d'Al-Kashi dans le triangle $ABC$ (notations $a = BC$, $b = AC$, $c = AB$) à partir de $\\vec{BC} = \\vec{AC} - \\vec{AB}$.", solution: "$a^2 = \\|\\vec{BC}\\|^2 = \\|\\vec{AC} - \\vec{AB}\\|^2 = \\|\\vec{AC}\\|^2 - 2\\,\\vec{AC}\\cdot\\vec{AB} + \\|\\vec{AB}\\|^2$ (l'identité vectorielle) $= b^2 + c^2 - 2bc\\cos\\widehat{A}$ (la formule du cosinus, l'angle en $A$ étant celui des deux vecteurs) ✓ — Chasles décompose, la bilinéarité développe, le cosinus conclut : trois outils du chapitre, une démonstration exigible, et Pythagore en cas particulier." },
  ],
  practice: [
    { tier: "warmup", label: "Le correctif d'angle", make: (r) => {
      const b = randint(r, 3, 7); const c = randint(r, 3, 7);
      return { prompt: `$b = ${b}$, $c = ${c}$, $\\widehat{A} = \\frac{\\pi}{3}$ (cos $= \\frac{1}{2}$) : que vaut $a^2$ ?`, answer: b * b + c * c - b * c, solution: `$${b * b} + ${c * c} - 2 \\times ${b * c} \\times \\frac{1}{2} = $ **${b * b + c * c - b * c}**.` };
    } },
    { tier: "application", label: "Pythagore en cas limite", make: (r) => {
      const b = pick(r, [3, 6]); const c = b === 3 ? 4 : 8;
      return { prompt: `$b = ${b}$, $c = ${c}$, angle droit en A (cos $= 0$) : que vaut $a$ ?`, answer: Math.sqrt(b * b + c * c), solution: `Le correctif meurt : $a^2 = ${b * b + c * c}$ → $a = $ **${Math.sqrt(b * b + c * c)}** — Pythagore, cas particulier d'Al-Kashi.` };
    } },
    { tier: "challenge", label: "L'angle remonté", make: (r) => {
      const cas = pick(r, [[5, 6, 7, 12, 60], [4, 5, 6, 5, 40], [3, 5, 6, -2, 30]]);
      return { prompt: `Côtés $a = ${cas[2]}$, $b = ${cas[0]}$, $c = ${cas[1]}$ : le numérateur de $\\cos\\widehat{A} = \\frac{b^2 + c^2 - a^2}{2bc}$ vaut ?`, answer: cas[3], solution: `$${cas[0] ** 2} + ${cas[1] ** 2} - ${cas[2] ** 2} = $ **${cas[3]}** — puis diviser par $${2 * cas[0] * cas[1]}$ pour le cosinus.` };
    } },
  ],
};

// — Analytic geometry (programme: vecteur normal, projeté, cercle) —
const geometrieReperee = {
  id: "geometry.high.geometrie-reperee",
  level: "high", domain: "geometry",
  title: "Vecteur normal et équation de cercle",
  tagline: "(a ; b) perpendiculaire à ax + by + c = 0 — et le cercle de Thalès en équation.",
  prereqs: ["geometry.high.produit-scalaire", "geometry.high.droites-equations"],
  intuition:
    "Ta droite $ax + by + c = 0$ de seconde cachait un secret : le vecteur $\\vec{n}(a\\,;\\,b)$ — **lu dans les coefficients** — lui est **perpendiculaire** : c'est son vecteur **normal**.\n\nEt le cercle entre en géométrie repérée : centre $\\Omega(a\\,;\\,b)$, rayon $r$ — équation $(x - a)^2 + (y - b)^2 = r^2$ : la distance au centre, fixée par Pythagore.",
  depths: {
    discovery:
      "**Avec les mains** : pourquoi $\\vec{n}(a\\,;\\,b)$ est-il normal ? Le vecteur directeur de la droite est $\\vec{u}(-b\\,;\\,a)$ (ta seconde !) : $\\vec{n} \\cdot \\vec{u} = a(-b) + ba = 0$ — orthogonaux, par le critère du scalaire. Inversement, connaître un point et un vecteur normal **écrit** la droite : $M(x\\,;\\,y)$ y appartient ⟺ $\\vec{AM} \\cdot \\vec{n} = 0$ — l'équation cartésienne, régénérée par l'orthogonalité.",
    standard:
      "**En image** : le **projeté orthogonal** — le point H d'une droite le plus proche de M : $\\vec{MH}$ suit le vecteur normal, H vérifie l'équation — deux conditions, un système, et la **distance de M à la droite** tombe avec ($MH$, la plus courte par Pythagore : toute autre oblique est l'hypoténuse d'un triangle dont $MH$ est un côté). Le cercle, lui, se reconnaît à sa forme : $x^2 + y^2 - 6x + 4y - 3 = 0$ ? **Complète les carrés** (ta forme canonique !) : $(x - 3)^2 + (y + 2)^2 = 16$ — centre $(3\\,;\\,-2)$, rayon 4.",
    advanced:
      "**Dans la tête** : la démonstration exigible boucle vingt-cinq siècles — l'ensemble des points M tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ : introduis le **milieu** I de $[AB]$ et décompose par Chasles — $\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} + \\vec{IB}) = MI^2 + \\vec{MI} \\cdot (\\vec{IA} + \\vec{IB}) + \\vec{IA} \\cdot \\vec{IB}$ ; or $\\vec{IA} + \\vec{IB} = \\vec{0}$ (I milieu !) et $\\vec{IA} \\cdot \\vec{IB} = -\\dfrac{AB^2}{4}$ : il reste $MI^2 - \\dfrac{AB^2}{4} = 0$, soit $MI = \\dfrac{AB}{2}$ — le **cercle de diamètre [AB]** ✓. « L'angle inscrit dans un demi-cercle est droit » : Thalès de Milet l'avait vu, Descartes l'a mis en coordonnées, le produit scalaire le démontre en cinq lignes — trois époques, une figure.",
  },
  keyIdea: "$\\vec{n}(a\\,;\\,b)$ **normal** à $ax + by + c = 0$ (lu dans les coefficients !). Cercle : $(x - a)^2 + (y - b)^2 = r^2$ — reconnaître : **compléter les carrés**. Et $\\vec{MA} \\cdot \\vec{MB} = 0 \\iff$ M sur le **cercle de diamètre [AB]** (démontré par le milieu).",
  why:
    "Pourquoi marier le scalaire et le repère ? Parce que l'orthogonalité était le chaînon manquant de la géométrie repérée de seconde : avec le vecteur normal, les perpendiculaires, les projetés, les distances point-droite deviennent des calculs — et le cercle, figure reine depuis l'Antiquité, reçoit enfin son équation. C'est la boîte à outils complète de la géométrie analytique : tout problème de configuration se traduit, se calcule, se conclut.",
  examples: [
    { title: "Le normal dans les coefficients", steps: [
      { p: "Droite $3x - 2y + 1 = 0$ : vecteur normal $\\vec{n}(3\\,;\\,-2)$, directeur $\\vec{u}(2\\,;\\,3)$." },
      { p: "$\\vec{n} \\cdot \\vec{u} = 6 - 6 = 0$ ✓ — les coefficients portaient la perpendiculaire." },
    ] },
    { title: "Compléter les carrés du cercle", steps: [
      { p: "$x^2 + y^2 - 6x + 4y - 3 = 0$ : $(x - 3)^2 - 9 + (y + 2)^2 - 4 - 3 = 0$." },
      { p: "$(x - 3)^2 + (y + 2)^2 = 16$ — centre $(3\\,;\\,-2)$, rayon **4** : la canonique au service du cercle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne un vecteur normal à la droite $3x - 2y + 1 = 0$ et vérifie son orthogonalité avec un vecteur directeur.", solution: "$\\vec{n}(3\\,;\\,-2)$ — lu dans les coefficients ; directeur $\\vec{u}(2\\,;\\,3)$ : $\\vec{n} \\cdot \\vec{u} = 6 - 6 = 0$ ✓ — l'équation cartésienne portait sa perpendiculaire depuis la seconde." },
    { tier: "warmup", prompt: "Détermine une équation cartésienne de la droite passant par $A(1\\,;\\,2)$ de vecteur normal $\\vec{n}(3\\,;\\,4)$.", solution: "$M(x\\,;\\,y)$ sur la droite ⟺ $\\vec{AM} \\cdot \\vec{n} = 0$ : $3(x - 1) + 4(y - 2) = 0$, soit $3x + 4y - 11 = 0$ — l'orthogonalité écrit l'équation, les coefficients sont le normal." },
    { tier: "application", prompt: "Donne l'équation du cercle de centre $(3\\,;\\,-2)$ et de rayon 4, puis reconnais le cercle $x^2 + y^2 - 6x + 4y - 3 = 0$.", solution: "$(x - 3)^2 + (y + 2)^2 = 16$. Réciproquement, **compléter les carrés** : $(x - 3)^2 + (y + 2)^2 = 3 + 9 + 4 = 16$ — même cercle ! Centre $(3\\,;\\,-2)$, rayon **4** : la forme canonique, recyclée en géométrie." },
    { tier: "challenge", prompt: "Calcule les coordonnées du projeté orthogonal de $M(4\\,;\\,3)$ sur la droite $d : y = x$ (directeur $(1\\,;\\,1)$), et la distance de M à $d$.", solution: "H$(t\\,;\\,t)$ sur $d$ avec $\\vec{MH}(t - 4\\,;\\,t - 3) \\perp (1\\,;\\,1)$ : $(t - 4) + (t - 3) = 0$ → $t = 3{,}5$ — H$(3{,}5\\,;\\,3{,}5)$ et $MH = \\sqrt{0{,}25 + 0{,}25} = \\dfrac{\\sqrt{2}}{2} \\approx $ **0,71** : le pied de la perpendiculaire, point le plus proche — l'orthogonalité minimise." },
    { tier: "exam", prompt: "Démontre que l'ensemble des points M tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ est le cercle de diamètre $[AB]$ (introduis le milieu I de $[AB]$). Quel théorème antique retrouves-tu ?", solution: "Chasles par I : $\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA})(\\vec{MI} + \\vec{IB}) = MI^2 + \\vec{MI}\\cdot(\\vec{IA} + \\vec{IB}) + \\vec{IA}\\cdot\\vec{IB}$ — or $\\vec{IA} + \\vec{IB} = \\vec{0}$ (milieu) et $\\vec{IA}\\cdot\\vec{IB} = -\\frac{AB^2}{4}$ (vecteurs opposés de norme $\\frac{AB}{2}$) : la condition devient $MI^2 = \\frac{AB^2}{4}$, soit $MI = \\frac{AB}{2}$ — le **cercle de diamètre [AB]** ✓. C'est le théorème du **demi-cercle de Thalès** (l'angle inscrit dans un demi-cercle est droit, et réciproquement) : vu par Thalès, repéré par Descartes, démontré par le scalaire — la boucle de vingt-cinq siècles, fermée en cinq lignes." },
  ],
  practice: [
    { tier: "warmup", label: "Lire le normal", make: (r) => {
      const a = randint(r, 1, 6); const b = randint(r, -5, 6) || 2; const c = randint(r, -7, 8);
      return { prompt: `Droite $${a}x ${b >= 0 ? "+ " + b : "- " + (-b)}y ${c >= 0 ? "+ " + c : "- " + (-c)} = 0$ : la première coordonnée d'un vecteur normal ?`, answer: a, solution: `$\\vec{n}(${a}\\,;\\,${b})$ — les coefficients de $x$ et $y$ : **${a}**.` };
    } },
    { tier: "application", label: "Centre et rayon", make: (r) => {
      const a = randint(r, -4, 5); const b = randint(r, -4, 5); const ray = randint(r, 2, 6);
      return { prompt: `Cercle $(x ${a >= 0 ? "- " + a : "+ " + (-a)})^2 + (y ${b >= 0 ? "- " + b : "+ " + (-b)})^2 = ${ray * ray}$ : quel rayon ?`, answer: ray, solution: `$r^2 = ${ray * ray}$ → $r = $ **${ray}** (et centre $(${a}\\,;\\,${b})$).` };
    } },
    { tier: "challenge", label: "Sur le cercle de Thalès ?", make: (r) => {
      const d = pick(r, [4, 6, 10]); const ok = r() < 0.5;
      const mi = ok ? d / 2 : d / 2 + randint(r, 1, 3);
      return { prompt: `$AB = ${d}$, I milieu de $[AB]$, et $MI = ${mi}$ : a-t-on $\\vec{MA} \\cdot \\vec{MB} = 0$ ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `Condition : $MI = \\frac{AB}{2} = ${d / 2}$ — ${ok ? "**oui** : M est sur le cercle de diamètre [AB], l'angle en M est droit" : "**non** : M est hors du cercle (" + mi + " ≠ " + d / 2 + ")"}.` };
    } },
  ],
};

export default [produitScalaire, alKashi, geometrieReperee];
