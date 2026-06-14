// Field "Geometry" — HIGH module (terminale year): space geometry. Official
// terminale spécialité programme. VECTORS AND PLANES: vectors of space,
// translations, linear combinations, lines (direction vectors, collinearity),
// planes characterized by a point and two non-collinear vectors, BASES and
// frames of space, decomposition of a vector, relative positions of
// lines/planes. ORTHOGONALITY AND DISTANCES: 3D dot product (bilinearity,
// symmetry), orthogonality of vectors/lines/plane-line, orthonormal bases,
// coordinates/norm, NORMAL vector to a plane, ORTHOGONAL PROJECTION of a point
// onto a line or plane — REQUIRED PROOF: the projection onto a plane is the
// closest point —, perpendicular planes. PARAMETRIC REPRESENTATIONS AND
// CARTESIAN EQUATIONS: parametric line, cartesian plane equation — REQUIRED
// PROOF: equation of the plane normal to a given vector —, projected
// coordinates, linear systems for intersections.
import { randint, pick } from "../../core/exercises.js";

// — Vectors and planes of space (programme: bases, décomposition, positions) —
const vecteursEspace = {
  id: "geometry.high.vecteurs-espace",
  level: "high", domain: "geometry",
  title: "Vecteurs et plans de l'espace",
  tagline: "Trois coordonnées, des plans qui se croisent — la géométrie quitte la feuille.",
  prereqs: ["geometry.high.vecteurs-coordonnees"],
  intuition:
    "Tes vecteurs gagnent une dimension : $\\vec{u}(x\\,;\\,y\\,;\\,z)$ — trois coordonnées, et les règles du plan suivent à l'identique (somme, produit par un réel, Chasles).\n\nMais l'espace invente un objet : le **plan**, déterminé par un point et **deux vecteurs non colinéaires** — et trois vecteurs bien choisis forment une **base** où tout se décompose.",
  depths: {
    discovery:
      "**Avec les mains** : les droites se prolongent telles quelles — un point, un vecteur directeur, la colinéarité inchangée ; le **plan**, lui, exige un point $A$ et un **couple** $(\\vec{u}, \\vec{v})$ non colinéaires : tout point du plan s'écrit $A + s\\vec{u} + t\\vec{v}$ — deux curseurs balaient la surface, comme un seul balayait la droite.",
    standard:
      "**En image** : la **base** de l'espace — trois vecteurs non coplanaires $(\\vec{i}, \\vec{j}, \\vec{k})$, et tout vecteur se **décompose** de façon unique : $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k}$ — les coordonnées sont les doses de la recette, lisibles sur un cube (la grande diagonale : $\\vec{i} + \\vec{j} + \\vec{k}$). Une **combinaison linéaire** mélange : $2\\vec{u} - 3\\vec{v} + \\vec{w}$ — le mot qui gouvernera tout le supérieur.",
    advanced:
      "**Dans la tête** : les positions relatives — deux droites de l'espace peuvent être sécantes, parallèles… ou **non coplanaires** (elles s'évitent sans se croiser ni s'aligner : les ponts d'autoroute !) ; une droite et un plan : sécants (un point), parallèles, ou la droite **dans** le plan ; deux plans : sécants (leur intersection est une **droite** !), parallèles, ou confondus. Le test de coplanarité fait tout : $\\vec{w}$ est dans le plan de $(\\vec{u}, \\vec{v})$ ⟺ $\\vec{w} = s\\vec{u} + t\\vec{v}$ pour des réels $s, t$ — l'alignement de 2de, monté d'un étage : la géométrie de l'espace est un calcul de décompositions.",
  },
  keyIdea: "Plan : un point + **deux vecteurs non colinéaires** ($A + s\\vec{u} + t\\vec{v}$). Base de l'espace : trois vecteurs non coplanaires — décomposition **unique** $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k}$. Positions : droites non coplanaires possibles ; deux plans sécants se coupent en une **droite**.",
  why:
    "Pourquoi quitter le plan, où tout marchait si bien ? Parce que le monde a trois dimensions : la 3D du jeu vidéo, la CAO de l'ingénieur, la trajectoire du satellite, la molécule du chimiste — tous calculent dans l'espace, avec exactement ces décompositions. Et le vocabulaire appris ici — base, combinaison linéaire, décomposition unique — est mot pour mot celui de l'algèbre linéaire du supérieur : la terminale t'offre la version géométrique de la matière reine de la licence.",
  examples: [
    { title: "La décomposition sur le cube", steps: [
      { p: "Cube $ABCDEFGH$, base $(\\vec{AB}, \\vec{AD}, \\vec{AE})$ : la grande diagonale $\\vec{AG} = \\vec{AB} + \\vec{AD} + \\vec{AE}$." },
      { p: "Coordonnées $(1\\,;\\,1\\,;\\,1)$ — la recette du vecteur, lue sur la figure." },
    ] },
    { title: "Deux droites qui s'évitent", steps: [
      { p: "Dans le cube : $(AB)$ et $(HG)$ sont parallèles ; $(AB)$ et $(GC)$ sécantes ?" },
      { p: "Non — ni sécantes ni parallèles : **non coplanaires** — l'espace permet l'évitement, le plan jamais." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que faut-il pour caractériser une droite de l'espace ? Et un plan ? Donne les deux recettes.", solution: "Droite : un **point** et un **vecteur directeur** (comme dans le plan) ; plan : un **point** et **deux vecteurs non colinéaires** — tout point s'écrit $A + s\\vec{u} + t\\vec{v}$ : un curseur balaie la droite, deux balaient le plan." },
    { tier: "warmup", prompt: "Dans le cube $ABCDEFGH$ muni de la base $(\\vec{AB}, \\vec{AD}, \\vec{AE})$, décompose $\\vec{AG}$ (grande diagonale) et $\\vec{BH}$.", solution: "$\\vec{AG} = \\vec{AB} + \\vec{AD} + \\vec{AE}$ : coordonnées $(1\\,;\\,1\\,;\\,1)$ ; $\\vec{BH} = \\vec{BA} + \\vec{AD} + \\vec{AE} = -\\vec{AB} + \\vec{AD} + \\vec{AE}$ : $(-1\\,;\\,1\\,;\\,1)$ — Chasles décompose, la base encode." },
    { tier: "application", prompt: "Les vecteurs $\\vec{u}(1\\,;\\,2\\,;\\,0)$, $\\vec{v}(0\\,;\\,1\\,;\\,1)$ et $\\vec{w}(2\\,;\\,5\\,;\\,1)$ : montre que $\\vec{w}$ est combinaison linéaire de $\\vec{u}$ et $\\vec{v}$. Que dit ce résultat géométriquement ?", solution: "Cherche $\\vec{w} = s\\vec{u} + t\\vec{v}$ : $s = 2$ (première coordonnée), $t = 1$ (troisième), vérification médiane $2 \\times 2 + 1 = 5$ ✓ — $\\vec{w} = 2\\vec{u} + \\vec{v}$ : les trois vecteurs sont **coplanaires** — $\\vec{w}$ vit dans le plan dirigé par $(\\vec{u}, \\vec{v})$." },
    { tier: "challenge", prompt: "Dans le cube, examine $(AB)$ et $(GC)$ : sécantes, parallèles, ou non coplanaires ? Justifie — et explique pourquoi ce troisième cas n'existe pas dans le plan.", solution: "$\\vec{AB}$ et $\\vec{GC}$ ne sont pas colinéaires (directions différentes : **pas parallèles**) et les droites ne se rencontrent pas ($(GC)$ est verticale sur la face arrière, $(AB)$ horizontale devant) : **non coplanaires** — dans le plan, deux droites non parallèles se croisent *toujours* ; l'espace offre la troisième voie : s'éviter — la dimension supplémentaire est un couloir d'évitement." },
    { tier: "exam", prompt: "Dans le tétraèdre $ABCD$, soit $I$ le milieu de $[AB]$ et $J$ celui de $[CD]$. Décompose $\\vec{IJ}$ dans la base $(\\vec{AB}, \\vec{AC}, \\vec{AD})$, et déduis-en que $\\vec{IJ}$ est combinaison linéaire de $\\vec{AC}$, $\\vec{AD}$ et $\\vec{AB}$ aux coefficients $-\\frac{1}{2}, \\frac{1}{2}, \\frac{1}{2}$.", solution: "Chasles : $\\vec{IJ} = \\vec{IA} + \\vec{AC} + \\vec{CJ} = -\\frac{1}{2}\\vec{AB} + \\vec{AC} + \\frac{1}{2}\\vec{CD}$ ; or $\\vec{CD} = \\vec{AD} - \\vec{AC}$, donc $\\vec{IJ} = -\\frac{1}{2}\\vec{AB} + \\vec{AC} + \\frac{1}{2}\\vec{AD} - \\frac{1}{2}\\vec{AC} = -\\frac{1}{2}\\vec{AB} + \\frac{1}{2}\\vec{AC} + \\frac{1}{2}\\vec{AD}$ ✓ — coordonnées $\\left(-\\frac{1}{2}\\,;\\,\\frac{1}{2}\\,;\\,\\frac{1}{2}\\right)$ : Chasles décompose, la base réordonne, et le segment des milieux du tétraèdre se calcule sans une seule figure — la géométrie de l'espace est devenue de l'algèbre." },
  ],
  practice: [
    { tier: "warmup", label: "Somme en 3D", make: (r) => {
      const u = [randint(r, -3, 4), randint(r, -3, 4), randint(r, -3, 4)];
      const v = [randint(r, -3, 4), randint(r, -3, 4), randint(r, -3, 4)];
      const i = randint(r, 0, 2);
      return { prompt: `$\\vec{u}(${u.join("\\,;\\,")}) + \\vec{v}(${v.join("\\,;\\,")})$ : la ${["première", "deuxième", "troisième"][i]} coordonnée ?`, answer: u[i] + v[i], solution: `Coordonnée par coordonnée : $${u[i]} + ${v[i]} = $ **${u[i] + v[i]}**.` };
    } },
    { tier: "application", label: "La décomposition lue", make: (r) => {
      const x = randint(r, -3, 4); const y = randint(r, -3, 4); const z = randint(r, -3, 4);
      const i = randint(r, 0, 2);
      return { prompt: `$\\vec{u} = ${x}\\vec{i} ${y >= 0 ? "+ " + y : "- " + (-y)}\\vec{j} ${z >= 0 ? "+ " + z : "- " + (-z)}\\vec{k}$ : sa ${["première", "deuxième", "troisième"][i]} coordonnée ?`, answer: [x, y, z][i], solution: `La décomposition **est** les coordonnées : **${[x, y, z][i]}**.` };
    } },
    { tier: "challenge", label: "Coplanaire ?", make: (r) => {
      const s = randint(r, 1, 3); const t = randint(r, 1, 3); const ok = r() < 0.5;
      const u = [1, 2, 0]; const v = [0, 1, 1];
      const w = [s * u[0] + t * v[0], s * u[1] + t * v[1] + (ok ? 0 : 1), s * u[2] + t * v[2]];
      return { prompt: `$\\vec{w}(${w.join("\\,;\\,")})$ est-il combinaison de $\\vec{u}(1\\,;\\,2\\,;\\,0)$ et $\\vec{v}(0\\,;\\,1\\,;\\,1)$ ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `Coordonnées 1 et 3 forcent $s = ${w[0]}$, $t = ${w[2]}$ ; la médiane exige $${2 * w[0] + w[2]}$ — ${ok ? "✓ **coplanaires**" : "✗ (" + w[1] + ") : **non coplanaires**"}.` };
    } },
  ],
};

// — Orthogonality in space (programme: scalaire 3D, normal, projeté) —
const orthogonaliteEspace = {
  id: "geometry.high.orthogonalite-espace",
  level: "high", domain: "geometry",
  title: "Le produit scalaire dans l'espace",
  tagline: "Une coordonnée de plus, les mêmes réflexes — et le projeté qui minimise les distances.",
  prereqs: ["geometry.high.produit-scalaire", "geometry.high.vecteurs-espace"],
  intuition:
    "Le produit scalaire monte en dimension sans changer de visage : en base orthonormée, $\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$ — un terme de plus, les mêmes théorèmes.\n\nNouveauté de l'espace : le **vecteur normal à un plan** — perpendiculaire à *toutes* les directions du plan — et le **projeté orthogonal**, point le plus proche, **démontré**.",
  depths: {
    discovery:
      "**Avec les mains** : tout suit — $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$ (Pythagore deux fois !), orthogonalité ⟺ produit nul, bilinéarité, symétrie : tes réflexes de première montent d'un étage sans frais. Deux **droites** sont orthogonales si leurs directeurs le sont — même sans se croiser (les non coplanaires aussi ont des angles !).",
    standard:
      "**En image** : une droite est **orthogonale à un plan** si elle l'est à *deux* directions non colinéaires du plan — et alors à toutes (la bilinéarité distribue !) : c'est le **vecteur normal** $\\vec{n}$ — le mât perpendiculaire au pont. Deux plans sont **perpendiculaires** si l'un contient une normale de l'autre — et les normales testent tout : plans parallèles ⟺ normales colinéaires, perpendiculaires ⟺ normales orthogonales — l'étude des plans se réduit à celle de leurs mâts.",
    advanced:
      "**Dans la tête** : le théorème de la distance, **démontré** — le projeté orthogonal $H$ de $M$ sur un plan $\\mathcal{P}$ est le point de $\\mathcal{P}$ **le plus proche** de $M$ : pour tout autre point $P$ du plan, le triangle $MHP$ est rectangle en $H$ (car $\\vec{HM} \\perp \\vec{HP}$ : $\\vec{HM}$ est normal, $\\vec{HP}$ dans le plan !), et Pythagore donne $MP^2 = MH^2 + HP^2 \\geq MH^2$ — l'égalité seulement si $P = H$ ✓. La **distance** d'un point à un plan est donc $MH$, le long de la normale — c'est l'altitude du drone au-dessus du sol, l'épaisseur minimale de matière en CAO : trois lignes de Pythagore vectoriel, et toutes les distances de l'espace tombent.",
  },
  keyIdea: "En orthonormé : $\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$, $\\|\\vec{u}\\| = \\sqrt{x^2+y^2+z^2}$. **Normal à un plan** : orthogonal à deux directions non colinéaires (donc à toutes). Le **projeté orthogonal** est le point le plus proche — démontré par Pythagore sur $MP^2 = MH^2 + HP^2$.",
  why:
    "Pourquoi refaire le produit scalaire ? Parce que l'orthogonalité est la **structure** de l'espace physique : la gravité normale au sol, l'antenne normale au toit, la lumière incidente et sa surface — et parce que « le projeté minimise la distance » est l'un des théorèmes les plus exploités des mathématiques appliquées : moindres carrés, compression, apprentissage automatique — tous projettent orthogonalement pour approcher au mieux. Ta première rencontre avec l'optimisation géométrique pure.",
  examples: [
    { title: "Le test en trois coordonnées", steps: [
      { p: "$\\vec{u}(1\\,;\\,2\\,;\\,-2)$ et $\\vec{v}(2\\,;\\,1\\,;\\,2)$ : $\\vec{u} \\cdot \\vec{v} = 2 + 2 - 4 = 0$." },
      { p: "Orthogonaux — et $\\|\\vec{u}\\| = \\sqrt{1 + 4 + 4} = 3$ : Pythagore, deux fois plié." },
    ] },
    { title: "Le projeté qui minimise", steps: [
      { p: "$H$ projeté de $M$ sur $\\mathcal{P}$, $P$ quelconque dans $\\mathcal{P}$ : $\\vec{HM} \\perp \\vec{HP}$." },
      { p: "$MP^2 = MH^2 + HP^2 \\geq MH^2$ — $H$ gagne, tout autre point paie l'écart au carré." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\vec{u} \\cdot \\vec{v}$ et $\\|\\vec{u}\\|$ pour $\\vec{u}(1\\,;\\,2\\,;\\,-2)$ et $\\vec{v}(2\\,;\\,1\\,;\\,2)$. Conclusion ?", solution: "$1 \\times 2 + 2 \\times 1 + (-2) \\times 2 = $ **0** : **orthogonaux** ; $\\|\\vec{u}\\| = \\sqrt{1 + 4 + 4} = $ **3** — les formules du plan, un terme de plus : les réflexes montent d'étage gratuitement." },
    { tier: "warmup", prompt: "Pourquoi suffit-il qu'une droite soit orthogonale à **deux** directions non colinéaires d'un plan pour l'être à toutes ?", solution: "Toute direction du plan s'écrit $s\\vec{u} + t\\vec{v}$ (la décomposition !) — alors $\\vec{n} \\cdot (s\\vec{u} + t\\vec{v}) = s\\,(\\vec{n}\\cdot\\vec{u}) + t\\,(\\vec{n}\\cdot\\vec{v}) = 0 + 0 = 0$ : la **bilinéarité** distribue l'orthogonalité — deux tests, l'infini couvert : c'est la définition même du vecteur normal." },
    { tier: "application", prompt: "Le plan $\\mathcal{P}$ passe par $A(1\\,;\\,0\\,;\\,2)$ et $B(2\\,;\\,1\\,;\\,3)$, et $\\vec{n}(1\\,;\\,1\\,;\\,-2)$ : vérifie que $\\vec{n}$ est orthogonal à $\\vec{AB}$, et teste si $\\vec{n}$ peut être normal à $\\mathcal{P}$ sachant que $\\vec{v}(2\\,;\\,0\\,;\\,1)$ dirige aussi le plan.", solution: "$\\vec{AB}(1\\,;\\,1\\,;\\,1)$ : $\\vec{n} \\cdot \\vec{AB} = 1 + 1 - 2 = 0$ ✓ ; $\\vec{n} \\cdot \\vec{v} = 2 + 0 - 2 = 0$ ✓ — orthogonal à **deux** directions non colinéaires : $\\vec{n}$ est **normal** au plan — deux produits scalaires, et le mât est planté." },
    { tier: "challenge", prompt: "Deux plans ont pour normales $\\vec{n_1}(1\\,;\\,2\\,;\\,0)$ et $\\vec{n_2}(2\\,;\\,-1\\,;\\,3)$. Sont-ils parallèles ? Perpendiculaires ? Justifie par les normales.", solution: "Parallèles ⟺ normales **colinéaires** : $(2\\,;\\,-1\\,;\\,3) \\neq k(1\\,;\\,2\\,;\\,0)$ ✗ ; perpendiculaires ⟺ normales **orthogonales** : $\\vec{n_1} \\cdot \\vec{n_2} = 2 - 2 + 0 = 0$ ✓ — **perpendiculaires** : l'étude des plans se réduit à celle de leurs mâts, deux calculs remplacent toute la figure." },
    { tier: "exam", prompt: "Démontre que le projeté orthogonal $H$ d'un point $M$ sur un plan $\\mathcal{P}$ est le point de $\\mathcal{P}$ le plus proche de $M$.", solution: "Soit $P$ un point quelconque de $\\mathcal{P}$ : $\\vec{HM}$ est normal au plan (définition du projeté) et $\\vec{HP}$ est **dans** le plan — donc $\\vec{HM} \\cdot \\vec{HP} = 0$ : le triangle $MHP$ est rectangle en $H$, et Pythagore (version scalaire : $MP^2 = \\|\\vec{HM} - \\vec{HP}\\|^2 = MH^2 + HP^2$, le double produit étant nul) donne $MP^2 = MH^2 + HP^2 \\geq MH^2$, avec égalité **seulement si** $HP = 0$, c'est-à-dire $P = H$ ✓ — la démonstration exigible : la perpendiculaire est le plus court chemin, et toute la théorie de l'approximation (moindres carrés compris) descend de ces trois lignes." },
  ],
  practice: [
    { tier: "warmup", label: "Le scalaire 3D", make: (r) => {
      const u = [randint(r, -3, 4), randint(r, -3, 4), randint(r, -3, 4)];
      const v = [randint(r, -3, 4), randint(r, -3, 4), randint(r, -3, 4)];
      return { prompt: `$\\vec{u}(${u.join("\\,;\\,")}) \\cdot \\vec{v}(${v.join("\\,;\\,")}) = \\,?$`, answer: u[0] * v[0] + u[1] * v[1] + u[2] * v[2], solution: `$${u[0] * v[0]} + ${u[1] * v[1]} + ${u[2] * v[2]} = $ **${u[0] * v[0] + u[1] * v[1] + u[2] * v[2]}**.` };
    } },
    { tier: "application", label: "La norme pliée", make: (r) => {
      const t = pick(r, [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11]]);
      return { prompt: `$\\|\\vec{u}\\|$ pour $\\vec{u}(${t[0]}\\,;\\,${t[1]}\\,;\\,${t[2]})$ ?`, answer: t[3], solution: `$\\sqrt{${t[0] ** 2} + ${t[1] ** 2} + ${t[2] ** 2}} = \\sqrt{${t[3] ** 2}} = $ **${t[3]}** — Pythagore, deux fois.` };
    } },
    { tier: "challenge", label: "La distance au plan", make: (r) => {
      const mh = randint(r, 2, 6); const hp = randint(r, 1, 5);
      return { prompt: `$H$ projeté de $M$ sur le plan, $MH = ${mh}$ ; $P$ dans le plan avec $HP = ${hp}$ : que vaut $MP^2$ ?`, answer: mh * mh + hp * hp, solution: `Triangle rectangle en $H$ : $MP^2 = ${mh}^2 + ${hp}^2 = $ **${mh * mh + hp * hp}** — toujours $\\geq MH^2 = ${mh * mh}$ : le projeté gagne.` };
    } },
  ],
};

// — Plane equations and parametric lines (programme: ax+by+cz+d, paramétrique) —
const plansEquations = {
  id: "geometry.high.plans-equations",
  level: "high", domain: "geometry",
  title: "Équations de plans, droites paramétriques",
  tagline: "ax + by + cz + d = 0 — le mât dans les coefficients, et le temps dans la droite.",
  prereqs: ["geometry.high.orthogonalite-espace", "geometry.high.geometrie-reperee"],
  intuition:
    "Ta droite du plan avait son équation ; le **plan de l'espace** a la sienne : $ax + by + cz + d = 0$ — et comme en première, **les coefficients sont le vecteur normal** $\\vec{n}(a\\,;\\,b\\,;\\,c)$.\n\nLa droite de l'espace, elle, préfère le **paramétrique** : $x = x_A + ta$, $y = y_A + tb$, $z = z_A + tc$ — un point, un directeur, et le paramètre $t$ qui voyage.",
  depths: {
    discovery:
      "**Avec les mains** : la représentation **paramétrique** est un film — à chaque instant $t$, un point de la droite : $t = 0$ donne $A$, $t = 1$ avance d'un $\\vec{u}$ ; reconnaître une droite paramétrée, c'est lire le point ($t = 0$) et le directeur (les coefficients de $t$) — la trajectoire du drone, équation comprise.",
    standard:
      "**En image** : l'équation du plan se **démontre** comme en première, un étage plus haut — le plan passant par $A$, normal à $\\vec{n}(a\\,;\\,b\\,;\\,c)$ : $M(x\\,;\\,y\\,;\\,z)$ y appartient ⟺ $\\vec{AM} \\cdot \\vec{n} = 0$ ⟺ $a(x - x_A) + b(y - y_A) + c(z - z_A) = 0$ — développe : $ax + by + cz + d = 0$ ✓ avec $d = -(ax_A + by_A + cz_A)$ : l'orthogonalité écrit l'équation, les coefficients gardent le mât.",
    advanced:
      "**Dans la tête** : les intersections deviennent des **systèmes** — un point sur la droite ET dans le plan ? Injecte le paramétrique dans l'équation du plan : une équation en $t$, une solution (sécants), aucune (parallèles stricts), une infinité (droite incluse) — le trio de cas, arbitré par un calcul. Le **projeté orthogonal** se calcule de même : la droite passant par $M$ dirigée par $\\vec{n}$, injectée dans le plan — $t$ sort, $H$ tombe, la distance avec. Deux plans sécants ? Leur droite d'intersection résout le système des deux équations — la géométrie de l'espace est devenue de l'algèbre linéaire, et le supérieur l'appellera exactement ainsi.",
  },
  keyIdea: "Plan : $ax + by + cz + d = 0$, normal $\\vec{n}(a\\,;\\,b\\,;\\,c)$ dans les coefficients — démontré par $\\vec{AM} \\cdot \\vec{n} = 0$. Droite : **paramétrique** (point + $t \\times$ directeur). Intersections : **injecter** le paramétrique dans l'équation — une équation en $t$ arbitre les trois cas.",
  why:
    "Pourquoi deux langages — cartésien pour les plans, paramétrique pour les droites ? Parce que chacun épouse son objet : le plan est une **contrainte** (une équation tue une dimension : 3 − 1 = 2), la droite est une **trajectoire** (un paramètre la parcourt : 1 dimension). Le lancer de rayon des jeux vidéo, le GPS, la robotique passent leur temps à injecter des trajectoires dans des contraintes — exactement le calcul d'intersection de cette leçon, des millions de fois par seconde.",
  examples: [
    { title: "L'équation du plan, démontrée", steps: [
      { p: "Plan par $A(1\\,;\\,0\\,;\\,2)$, normal $\\vec{n}(2\\,;\\,-1\\,;\\,3)$ : $\\vec{AM} \\cdot \\vec{n} = 0$." },
      { p: "$2(x-1) - y + 3(z-2) = 0$, soit $2x - y + 3z - 8 = 0$ — le mât dans les coefficients." },
    ] },
    { title: "L'injection qui arbitre", steps: [
      { p: "Droite $x = 1 + t$, $y = 2t$, $z = 3 - t$ dans le plan $x + y + z - 6 = 0$ : $(1+t) + 2t + (3-t) = 6$." },
      { p: "$2t = 2$ : $t = 1$ — un point d'intersection : $(2\\,;\\,2\\,;\\,2)$ : sécants, arbitré par une équation." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne une représentation paramétrique de la droite passant par $A(1\\,;\\,0\\,;\\,3)$ dirigée par $\\vec{u}(2\\,;\\,1\\,;\\,-1)$, et le point obtenu pour $t = 2$.", solution: "$x = 1 + 2t$, $y = t$, $z = 3 - t$ — pour $t = 2$ : $(5\\,;\\,2\\,;\\,1)$ : le paramètre voyage le long du directeur, $t = 0$ rend $A$." },
    { tier: "warmup", prompt: "Donne un vecteur normal au plan $2x - y + 3z - 8 = 0$, et teste si $A(1\\,;\\,0\\,;\\,2)$ lui appartient.", solution: "$\\vec{n}(2\\,;\\,-1\\,;\\,3)$ — les coefficients, comme pour les droites de première ; $A$ : $2 - 0 + 6 - 8 = 0$ ✓ — **dedans** : substituer, comparer, conclure." },
    { tier: "application", prompt: "Démontre l'équation cartésienne du plan passant par $A(1\\,;\\,0\\,;\\,2)$ de vecteur normal $\\vec{n}(2\\,;\\,-1\\,;\\,3)$.", solution: "$M(x\\,;\\,y\\,;\\,z) \\in \\mathcal{P}$ ⟺ $\\vec{AM} \\perp \\vec{n}$ ⟺ $\\vec{AM} \\cdot \\vec{n} = 0$ : $2(x - 1) - (y - 0) + 3(z - 2) = 0$, soit $2x - y + 3z - 8 = 0$ ✓ — la démonstration exigible : l'orthogonalité écrit l'équation, et le mât reste lisible dans les coefficients." },
    { tier: "challenge", prompt: "La droite $x = 1 + t$, $y = 2t$, $z = 3 - t$ et le plan $x + y + z - 6 = 0$ : sécants, parallèles, ou droite incluse ? Calcule.", solution: "Injecte : $(1 + t) + 2t + (3 - t) - 6 = 0$ ⟺ $2t - 2 = 0$ ⟺ $t = 1$ — **une** solution : sécants au point $(2\\,;\\,2\\,;\\,2)$. (Zéro solution aurait dit parallèles stricts, « $0 = 0$ » droite incluse : une équation en $t$ arbitre les trois cas.)" },
    { tier: "exam", prompt: "Calcule les coordonnées du projeté orthogonal $H$ de $M(3\\,;\\,1\\,;\\,2)$ sur le plan $\\mathcal{P} : x + 2y - 2z + 1 = 0$, puis la distance de $M$ à $\\mathcal{P}$.", solution: "La droite $(MH)$ suit la normale $\\vec{n}(1\\,;\\,2\\,;\\,-2)$ : $x = 3 + t$, $y = 1 + 2t$, $z = 2 - 2t$ — injecte dans $\\mathcal{P}$ : $(3 + t) + 2(1 + 2t) - 2(2 - 2t) + 1 = 0$ ⟺ $9t + 2 = 0$ ⟺ $t = -\\frac{2}{9}$ : $H\\left(\\frac{25}{9}\\,;\\,\\frac{5}{9}\\,;\\,\\frac{22}{9}\\right)$ — et $MH = |t| \\times \\|\\vec{n}\\| = \\frac{2}{9} \\times 3 = \\frac{2}{3}$ : paramétrer le long du mât, injecter, lire $t$ — le projeté de la leçon précédente (le point le plus proche !), désormais **calculé** : la boîte à outils de l'espace est complète." },
  ],
  practice: [
    { tier: "warmup", label: "Le point du paramètre", make: (r) => {
      const a = randint(r, -2, 3); const u = randint(r, 1, 3); const t = randint(r, 1, 4);
      return { prompt: `Droite $x = ${a} + ${u}t$ : que vaut $x$ pour $t = ${t}$ ?`, answer: a + u * t, solution: `$${a} + ${u} \\times ${t} = $ **${a + u * t}** — le paramètre avance le long du directeur.` };
    } },
    { tier: "application", label: "Dans le plan ?", make: (r) => {
      const n = [randint(r, 1, 3), randint(r, -2, 3), randint(r, 1, 3)]; const d = randint(r, -5, 5);
      const ok = r() < 0.5;
      const z0 = randint(r, -2, 3);
      const reste = -(d + n[2] * z0);
      const P = [0, 0, z0];
      if (n[1] !== 0 && reste % n[1] === 0) { P[1] = reste / n[1]; } else { P[0] = 0; P[1] = 0; P[2] = z0; }
      const val = n[0] * P[0] + n[1] * P[1] + n[2] * P[2] + d + (ok ? 0 : (n[1] !== 0 && reste % n[1] === 0 ? 2 : 0));
      const Q = ok && n[1] !== 0 && reste % n[1] === 0 ? P : [1, 1, 1];
      const test = n[0] * Q[0] + n[1] * Q[1] + n[2] * Q[2] + d;
      return { prompt: `Plan $${n[0]}x ${n[1] >= 0 ? "+ " + n[1] : "- " + (-n[1])}y + ${n[2]}z ${d >= 0 ? "+ " + d : "- " + (-d)} = 0$ : le point $(${Q.join("\\,;\\,")})$ y est-il ? (1 = oui, 0 = non)`, answer: test === 0 ? 1 : 0, solution: `Substitue : $${test}$ — **${test === 0 ? "dedans" : "dehors"}**.` };
    } },
    { tier: "challenge", label: "Le t de l'intersection", make: (r) => {
      const k = randint(r, 2, 4); const c = k * randint(r, 1, 3);
      return { prompt: `L'injection de la droite dans le plan donne $${k}t - ${c} = 0$ : que vaut $t$ à l'intersection ?`, answer: c / k, solution: `$t = \\frac{${c}}{${k}} = $ **${c / k}** — une solution : sécants.` };
    } },
  ],
};

export default [vecteursEspace, orthogonaliteEspace, plansEquations];
