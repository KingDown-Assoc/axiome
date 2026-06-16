// Field "Numbers" — HIGH module (expertes year), part 1: complex numbers.
// Official terminale MATHS EXPERTES programme. ALGEBRAIC viewpoint: the set ℂ,
// real and imaginary parts, operations, CONJUGATION and its algebraic
// properties — REQUIRED PROOFS: conjugate of a product, of an inverse, of an
// integer power —, inverse of a nonzero complex number, the BINOMIAL FORMULA
// in ℂ (required proof); solving az = b and simple equations mixing z and z̄.
// GEOMETRIC viewpoint: image of a complex number, affix of a point/vector,
// MODULUS and its geometric meaning — REQUIRED PROOFS: |z|² = z·z̄, modulus of
// a product, of a power —, the set 𝕌 of unit-modulus numbers (stable under
// product and inverse), ARGUMENTS, trigonometric form; possible problems:
// sequences z_{n+1} = az_n + b, triangle inequality, Mandelbrot and Julia sets.
import { randint, pick } from "../../core/exercises.js";

// — Algebraic viewpoint (programme: ℂ, conjugaison, binôme) —
const complexes = {
  id: "numbers.high.complexes",
  level: "high", domain: "numbers",
  title: "Les nombres complexes",
  tagline: "Le nombre impossible",
  prereqs: ["numbers.high.ensembles-nombres", "algebra.high.calcul-algebrique"],
  intuition:
    "Ton récit des ensembles s'achève : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$… et chaque étage réparait une impossibilité. Il en restait une : $x^2 = -1$.\n\nDécrète un nombre $i$ tel que $i^2 = -1$ : l'ensemble $\\mathbb{C}$ des $z = a + bi$ ($a, b$ réels) naît — **partie réelle** $a$, **partie imaginaire** $b$ — et plus aucune équation polynomiale ne restera sans racine.",
  depths: {
    discovery:
      "**Avec les mains** : on calcule comme en 3e, en remplaçant $i^2$ par $-1$ — somme : $(2 + 3i) + (1 - i) = 3 + 2i$ ; produit : $(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 5 + i$ — la double distributivité, et le réflexe $i^2 = -1$ : tout le calcul littéral du collège fonctionne tel quel.",
    standard:
      "**En image** : le **conjugué** $\\bar{z} = a - bi$ (le signe de la partie imaginaire bascule) — et il respecte tout : $\\overline{z + z'} = \\bar{z} + \\bar{z'}$, $\\overline{z \\times z'} = \\bar{z} \\times \\bar{z'}$ (**démontré** : développe les deux membres et compare), $\\overline{z^n} = \\bar{z}^n$ (récurrence sur le produit !). Son chef-d'œuvre : $z\\bar{z} = a^2 + b^2$ — un **réel positif** : pour inverser, multiplie haut et bas par le conjugué : $\\dfrac{1}{2 + 3i} = \\dfrac{2 - 3i}{13}$ — l'expression conjuguée de tes racines de 3e, recyclée.",
    advanced:
      "**Dans la tête** : la **formule du binôme** passe dans $\\mathbb{C}$ — $(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k$ : la démonstration par récurrence n'utilise que la commutativité et la relation de Pascal (chaque terme du rang $n+1$ reçoit deux parents : la relation de Pascal **est** l'hérédité) — tes combinaisons de terminale, embauchées par l'algèbre : $(1 + i)^4 = 1 + 4i + 6i^2 + 4i^3 + i^4 = -4$. L'histoire éclaire le nom : Cardan et Bombelli (XVIe) croisèrent ces « quantités impossibles » en résolvant le **troisième degré** — des racines carrées de négatifs apparaissaient en cours de route puis s'annulaient, livrant des solutions bien réelles : les complexes furent des intermédiaires clandestins deux siècles avant d'être des nombres — la découverte ne passe jamais par le chemin rétrospectivement le plus direct.",
  },
  keyIdea: "$\\mathbb{C}$ : les $z = a + bi$ avec $i^2 = -1$ — on calcule comme en 3e. **Conjugué** $\\bar{z} = a - bi$ : compatible avec somme, produit, puissances (démontré) ; $z\\bar{z} = a^2 + b^2$ réel — d'où l'**inverse** : $\\frac{1}{z} = \\frac{\\bar{z}}{z\\bar{z}}$. Et le **binôme** vaut dans $\\mathbb{C}$ (Pascal fait l'hérédité).",
  why:
    "Pourquoi inventer un nombre dont le carré est négatif ? Parce que l'algèbre l'exigeait — sans lui, le troisième degré restait muet — et parce que la nature l'a adopté : l'électricité (impédances), le traitement du signal (Fourier), la mécanique quantique entière calculent dans $\\mathbb{C}$ : le nombre « imaginaire » est aujourd'hui le plus physique de tous — et ton récit des ensembles, commencé en seconde, trouve ici son dernier étage.",
  examples: [
    { title: "Calculer avec i", steps: [
      { p: "$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$ — la double distributivité, puis $i^2 = -1$." },
      { p: "Re $= 5$, Im $= 1$ — un complexe, deux coordonnées réelles." },
    ] },
    { title: "L'inverse par le conjugué", steps: [
      { p: "$\\dfrac{1}{2 + 3i} = \\dfrac{2 - 3i}{(2 + 3i)(2 - 3i)} = \\dfrac{2 - 3i}{13}$ — le dénominateur devient réel." },
      { p: "$z\\bar{z} = a^2 + b^2$ : l'expression conjuguée de 3e, promue outil fondamental." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $(2 + 3i) + (1 - i)$, $(2 + 3i)(1 - i)$ et $i^3$, $i^4$.", solution: "Somme : $3 + 2i$ ; produit : $2 - 2i + 3i - 3i^2 = 5 + i$ ; $i^3 = i^2 \\times i = -i$ et $i^4 = $ **1** — les puissances de $i$ tournent en cycle de quatre : le calcul de 3e, plus un réflexe." },
    { tier: "warmup", prompt: "Écris $\\dfrac{1}{2 + 3i}$ sous forme algébrique $a + bi$.", solution: "Multiplie haut et bas par le conjugué : $\\dfrac{2 - 3i}{(2+3i)(2-3i)} = \\dfrac{2 - 3i}{4 + 9} = \\dfrac{2}{13} - \\dfrac{3}{13}i$ — $z\\bar{z}$ est réel : le conjugué nettoie le dénominateur, comme la quantité conjuguée nettoyait tes racines." },
    { tier: "application", prompt: "Démontre que $\\overline{z \\times z'} = \\bar{z} \\times \\bar{z'}$ (pose $z = a + bi$, $z' = c + di$).", solution: "$zz' = (ac - bd) + (ad + bc)i$, donc $\\overline{zz'} = (ac - bd) - (ad + bc)i$ ; et $\\bar{z}\\,\\bar{z'} = (a - bi)(c - di) = (ac - bd) - (ad + bc)i$ — **égaux** ✓ : la démonstration exigible — la conjugaison traverse le produit, et par récurrence les puissances ($\\overline{z^n} = \\bar{z}^n$)." },
    { tier: "challenge", prompt: "Résous dans $\\mathbb{C}$ : $(1 + i)z = 3 - i$, puis l'équation $z + 2\\bar{z} = 6 + i$ (pose $z = a + bi$).", solution: "$z = \\dfrac{3 - i}{1 + i} = \\dfrac{(3-i)(1-i)}{2} = \\dfrac{2 - 4i}{2} = 1 - 2i$. Pour la seconde : $a + bi + 2a - 2bi = 3a - bi = 6 + i$ — identifie : $a = 2$, $b = -1$ : $z = 2 - i$ — séparer réel et imaginaire : deux équations réelles pour une complexe." },
    { tier: "exam", prompt: "Démontre la formule du binôme dans $\\mathbb{C}$ par récurrence (l'hérédité passe par la relation de Pascal), puis calcule $(1 + i)^4$.", solution: "**Init** : $n = 0$ : $(a+b)^0 = 1 = \\binom{0}{0}$ ✓. **Hérédité** : $(a+b)^{n+1} = (a+b)\\sum_k \\binom{n}{k}a^{n-k}b^k$ — distribue : le coefficient de $a^{n+1-k}b^k$ reçoit $\\binom{n}{k} + \\binom{n}{k-1}$, qui vaut $\\binom{n+1}{k}$ par la **relation de Pascal** ✓ — la formule passe au rang suivant : le triangle de Pascal est littéralement l'hérédité du binôme. **Application** : $(1+i)^4 = 1 + 4i + 6i^2 + 4i^3 + i^4 = 1 + 4i - 6 - 4i + 1 = -4$ — un réel négatif, quatrième puissance d'un complexe : $i$ tient ses promesses." },
  ],
  practice: [
    { tier: "warmup", label: "Le cycle de i", make: (r) => {
      const n = randint(r, 2, 9);
      const cyc = [[1, "1"], [0, "i"], [-1, "-1"], [0, "-i"]][n % 4];
      return { prompt: `$i^{${n}}$ vaut $1$, $i$, $-1$ ou $-i$ : donne sa partie réelle.`, answer: cyc[0], solution: `$i^{${n}} = ${cyc[1]}$ (cycle de 4 : reste ${n % 4}) — partie réelle **${cyc[0]}**.` };
    } },
    { tier: "application", label: "Le produit développé", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 3); const c = randint(r, 1, 4); const d = pick(r, [1, -1, 2]);
      return { prompt: `$(${a} + ${b}i)(${c} ${d >= 0 ? "+ " + (d === 1 ? "" : d) : "- " + (-d === 1 ? "" : -d)}i)$ : la partie réelle ?`, answer: a * c - b * d, solution: `$${a} \\times ${c} - ${b} \\times ${d} = $ **${a * c - b * d}** — le $i^2 = -1$ ramène $bd$ en négatif.` };
    } },
    { tier: "challenge", label: "z fois son conjugué", make: (r) => {
      const a = randint(r, 1, 5); const b = randint(r, 1, 5);
      return { prompt: `$z = ${a} + ${b}i$ : que vaut $z\\bar{z}$ ?`, answer: a * a + b * b, solution: `$a^2 + b^2 = ${a * a} + ${b * b} = $ **${a * a + b * b}** — toujours un réel positif : la clé de l'inverse.` };
    } },
  ],
};

// — Geometric viewpoint (programme: module, arguments, forme trigonométrique) —
const planComplexe = {
  id: "numbers.high.plan-complexe",
  level: "high", domain: "numbers",
  title: "Le plan complexe",
  tagline: "Chaque nombre devient un point — le module mesure, l'argument oriente.",
  prereqs: ["numbers.high.complexes", "geometry.high.produit-scalaire"],
  intuition:
    "Un complexe $z = a + bi$, c'est deux réels — donc un **point** $M(a\\,;\\,b)$ du plan : $z$ est l'**affixe** de $M$, $M$ l'**image** de $z$ — Argand et Gauss ont marié le nombre et le plan.\n\nDeux mesures naturelles : le **module** $|z| = \\sqrt{a^2 + b^2}$ (la distance à l'origine) et l'**argument** $\\arg z$ (l'angle avec l'axe réel) — la position polaire du nombre.",
  depths: {
    discovery:
      "**Avec les mains** : la géométrie se lit — le conjugué $\\bar{z}$ est le **symétrique** de $z$ par rapport à l'axe réel (le signe de $b$ bascule : reflet horizontal) ; l'affixe d'un vecteur $\\vec{AB}$ est $z_B - z_A$, et $|z_B - z_A|$ est la **distance** $AB$ : tes formules de repérage, condensées en un nombre.",
    standard:
      "**En image** : le théorème pivot, **démontré** — $|z|^2 = z\\bar{z}$ : en effet $z\\bar{z} = a^2 + b^2 = |z|^2$ ✓ (ton calcul de la leçon précédente, relu géométriquement) — et il offre le **module d'un produit** : $|zz'|^2 = zz'\\overline{zz'} = z\\bar{z} \\times z'\\bar{z'} = |z|^2|z'|^2$, donc $|zz'| = |z|\\,|z'|$ ✓ — **les modules se multiplient** (et $|z^n| = |z|^n$ par récurrence) : multiplier des complexes multiplie les longueurs.",
    advanced:
      "**Dans la tête** : la **forme trigonométrique** — tout $z \\neq 0$ s'écrit $z = r(\\cos\\theta + i\\sin\\theta)$ avec $r = |z|$ et $\\theta = \\arg z$ : ton cercle trigonométrique de première, devenu système de coordonnées — et l'ensemble $\\mathbb{U}$ des complexes de **module 1** est exactement ce cercle : **stable** par produit ($|zz'| = 1 \\times 1$) et par inverse — un monde fermé où multiplier, c'est tourner. L'**inégalité triangulaire** $|z + z'| \\leq |z| + |z'|$ (le détour ne raccourcit jamais — égalité quand les images sont alignées du même côté) complète la panoplie. Et la suite $z_{n+1} = z_n^2 + c$, itérée depuis 0 : selon que $|z_n|$ explose ou reste borné, le point $c$ est dehors ou dedans — colorie : l'ensemble de **Mandelbrot** apparaît, frontière fractale infiniment ciselée — deux opérations de cette leçon, et le plan complexe engendre l'objet le plus célèbre des mathématiques visuelles.",
  },
  keyIdea: "$z = a + bi \\leftrightarrow M(a\\,;\\,b)$ : affixe et image — $|z| = \\sqrt{a^2 + b^2}$ (distance), $\\arg z$ (angle), $\\bar{z}$ : reflet horizontal. $|z|^2 = z\\bar{z}$ (démontré) ⟹ $|zz'| = |z|\\,|z'|$, $|z^n| = |z|^n$ — et $\\mathbb{U}$ (module 1) : le cercle trigonométrique, stable par produit.",
  why:
    "Pourquoi géométriser des nombres ? Parce que la traduction marche dans les deux sens : les configurations du plan deviennent des calculs (distances, alignements, cercles — une ligne de module chacun), et les calculs deviennent des images (Mandelbrot !). C'est le programme d'Erlangen en germe : la géométrie comme étude des transformations — et l'ingénieur en électricité, qui représente ses signaux par des complexes tournants, vit dans ce plan tous les jours.",
  examples: [
    { title: "Le nombre devenu point", steps: [
      { p: "$z = 3 + 4i$ : image $M(3\\,;\\,4)$, module $|z| = \\sqrt{9 + 16} = 5$ — la distance à l'origine." },
      { p: "Et $\\bar{z} = 3 - 4i$ : le reflet de $M$ sous l'axe réel — la conjugaison, dessinée." },
    ] },
    { title: "Les modules se multiplient", steps: [
      { p: "$|zz'|^2 = zz'\\,\\overline{zz'} = (z\\bar{z})(z'\\bar{z'}) = |z|^2\\,|z'|^2$ — le conjugué du produit fait tout." },
      { p: "$|zz'| = |z|\\,|z'|$ ✓ — multiplier les nombres multiplie les longueurs." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Place les images de $z_1 = 3 + 4i$, $z_2 = -2i$ et $\\bar{z_1}$, puis calcule $|z_1|$ et $|z_2|$.", solution: "$M_1(3\\,;\\,4)$, $M_2(0\\,;\\,-2)$, et $\\bar{z_1}$ en $(3\\,;\\,-4)$ — le reflet sous l'axe réel ; $|z_1| = \\sqrt{9 + 16} = $ **5**, $|z_2| = $ **2** — le module est la distance à l'origine : Pythagore, en notation complexe." },
    { tier: "warmup", prompt: "$A$ et $B$ ont pour affixes $1 + i$ et $4 + 5i$ : calcule l'affixe de $\\vec{AB}$ et la distance $AB$.", solution: "$z_{\\vec{AB}} = z_B - z_A = 3 + 4i$, et $AB = |z_B - z_A| = \\sqrt{9 + 16} = $ **5** — la soustraction des affixes encode le vecteur, son module la distance : la géométrie repérée, en un nombre." },
    { tier: "application", prompt: "Démontre que $|z|^2 = z\\bar{z}$, puis déduis-en que $|zz'| = |z| \\times |z'|$.", solution: "$z\\bar{z} = (a + bi)(a - bi) = a^2 + b^2 = |z|^2$ ✓. Alors $|zz'|^2 = zz'\\,\\overline{zz'} = zz'\\,\\bar{z}\\,\\bar{z'} = (z\\bar{z})(z'\\bar{z'}) = |z|^2|z'|^2$ — racines (positives) : $|zz'| = |z|\\,|z'|$ ✓ — les démonstrations exigibles : le conjugué du produit (leçon précédente) porte toute la preuve, et $|z^n| = |z|^n$ suit par récurrence." },
    { tier: "challenge", prompt: "Écris $z = 1 + i$ sous forme trigonométrique, et vérifie que $\\frac{z}{|z|}$ appartient à $\\mathbb{U}$. Pourquoi $\\mathbb{U}$ est-il stable par produit ?", solution: "$|z| = \\sqrt{2}$ et l'image est sur la bissectrice : $\\theta = \\frac{\\pi}{4}$ — $z = \\sqrt{2}\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$ ; $\\frac{z}{|z|}$ a pour module 1 : il vit sur $\\mathbb{U}$, **ton cercle trigonométrique** ✓. Stabilité : $|zz'| = 1 \\times 1 = 1$ — le produit de deux points du cercle reste sur le cercle : un monde fermé où multiplier, c'est tourner." },
    { tier: "exam", prompt: "La suite $z_{n+1} = z_n^2 + c$ part de $z_0 = 0$. Pour $c = -1$, calcule $z_1, z_2, z_3, z_4$ et conjecture ; pour $c = 1$, calcule les modules $|z_1|, |z_2|, |z_3|$ et conjecture — puis explique le lien avec l'ensemble de Mandelbrot.", solution: "$c = -1$ : $z_1 = -1$, $z_2 = 0$, $z_3 = -1$, $z_4 = 0$ — la suite **oscille**, bornée : $c = -1$ est *dans* l'ensemble. $c = 1$ : $|z_1| = 1$, $|z_2| = 2$, $|z_3| = 5$ — les modules **explosent** : $c = 1$ est *dehors*. L'ensemble de **Mandelbrot** est exactement l'ensemble des $c$ pour lesquels la suite reste bornée — colorier chaque pixel $c$ selon la vitesse de fuite dessine la fractale la plus célèbre du monde : deux opérations (carré, addition) et un module — tout cette leçon, itérée des millions de fois par ton GPU." },
  ],
  practice: [
    { tier: "warmup", label: "Le module-distance", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
      return { prompt: `$|${t[0]} + ${t[1]}i| = \\,?$`, answer: t[2], solution: `$\\sqrt{${t[0] ** 2} + ${t[1] ** 2}} = $ **${t[2]}** — Pythagore, en notation complexe.` };
    } },
    { tier: "application", label: "Les modules se multiplient", make: (r) => {
      const m1 = pick(r, [2, 3, 5]); const m2 = pick(r, [2, 4]);
      return { prompt: `$|z| = ${m1}$ et $|z'| = ${m2}$ : que vaut $|zz'|$ ?`, answer: m1 * m2, solution: `$|zz'| = |z| \\times |z'| = $ **${m1 * m2}** — démontré par $z\\bar{z}$.` };
    } },
    { tier: "challenge", label: "Sur le cercle 𝕌 ?", make: (r) => {
      const t = pick(r, [[0.6, 0.8, 1], [1, 1, 0], [0.8, 0.6, 1], [1, 2, 0], [0, 1, 1]]);
      return { prompt: `$z = ${String(t[0]).replace(".", ",")} + ${String(t[1]).replace(".", ",")}i$ : appartient-il à $\\mathbb{U}$ (module 1) ? (1 = oui, 0 = non)`, answer: t[2], solution: `$|z|^2 = ${String(t[0] ** 2 + t[1] ** 2).replace(".", ",")}$ — **${t[2] ? "oui : sur le cercle unité" : "non"}**.` };
    } },
  ],
};

export default [complexes, planComplexe];
