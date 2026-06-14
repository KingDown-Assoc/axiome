// Field "Geometry" — MIDDLE module (4e year), part 2: pyramids and cones.
// Official cycle-4 programme: recognizing pyramids and cones of revolution,
// building and relating different representations of solids (cuboid, cube,
// cylinder, prism, pyramids, cones), and knowing the VOLUME of the pyramid and
// of the cone of revolution — with the Louvre pyramid and the Egyptian pyramids
// as the official cultural extension.
import { randint, pick } from "../../core/exercises.js";

const pyramideCone = {
  id: "geometry.middle.pyramide-cone",
  level: "middle", domain: "geometry",
  title: "Pyramides et cônes",
  tagline: "Le tiers mystérieux — trois pyramides remplissent exactement le prisme.",
  prereqs: ["geometry.middle.solides-volumes"],
  intuition:
    "Tes solides « en tranche constante » (prisme, cylindre) rencontrent les solides **qui pointent** : la **pyramide** (base polygonale, un sommet) et le **cône de révolution** (base disque, un sommet).\n\nLeur volume partage une loi : $V = \\dfrac{\\text{aire de base} \\times \\text{hauteur}}{3}$ — la formule du prisme, **divisée par trois**.",
  depths: {
    discovery:
      "**Avec les mains** : l'expérience du remplissage — prends une pyramide creuse et le prisme de **même base et même hauteur** : remplis la pyramide d'eau, verse dans le prisme… il en faut exactement **trois** pour le remplir. Même jeu pour le cône dans le cylindre. Le ÷ 3 se mesure avant de se calculer.",
    standard:
      "**En image** : les calculs — pyramide à base carrée de côté 6, hauteur 10 : $V = \\dfrac{6^2 \\times 10}{3} = \\dfrac{360}{3} = 120$ cm³. Cône de rayon 3, hauteur 7 : $V = \\dfrac{\\pi \\times 3^2 \\times 7}{3} = \\pi \\times 3 \\times 7 \\approx 66$ cm³. La **hauteur** tombe perpendiculairement du sommet sur la base — dans un cône penché en dessin, ne pas confondre hauteur et flanc.",
    advanced:
      "**Dans la tête** : d'où vient ce 3 ? Du nombre de **dimensions** — découpe un **cube** par ses diagonales depuis un sommet : il se partage en **trois pyramides identiques** (chacune a pour base une face et pour sommet le coin opposé) : chaque pyramide vaut le tiers du cube — et le cas général suit en déformant. Le segment se divisait en 1, le carré en 2 triangles (le ÷ 2 de ton aire !), le cube en 3 pyramides : la dimension signe le diviseur. Khéops l'illustre à l'échelle des dieux : base de 230 m, hauteur 139 m — environ 2,5 millions de m³, du tiers exactement.",
  },
  keyIdea: "Pyramide et cône : $V = \\dfrac{\\text{aire de base} \\times \\text{hauteur}}{3}$ — le prisme divisé par 3 (trois pyramides remplissent le prisme). La hauteur : du sommet, **perpendiculaire** à la base.",
  why:
    "Pourquoi les solides pointus valent-ils le tiers ? Le triangle valait déjà la **moitié** du rectangle — pointer fait perdre du volume, et la perte est réglée par la dimension : ÷ 2 en aire, ÷ 3 en volume. Cette régularité n'est pas un hasard d'école : elle annonce que les mathématiques savent mesurer ce qui s'effile — la rampe, le tas de sable, le cornet — et le calcul intégral du lycée ne fera que généraliser ce geste.",
  examples: [
    { title: "La pyramide du Louvre (presque)", steps: [
      { p: "Base carrée de côté 6 cm, hauteur 10 cm : aire de base $= 36$ cm²." },
      { p: "$V = \\dfrac{36 \\times 10}{3} = $ **120 cm³** — le prisme aurait fait 360 : le tiers." },
    ] },
    { title: "Le cornet", steps: [
      { p: "Cône : rayon 3 cm, hauteur 7 cm — base $\\pi \\times 9$ cm²." },
      { p: "$V = \\dfrac{\\pi \\times 9 \\times 7}{3} = 21\\pi \\approx $ **66 cm³** — le cylindre divisé par trois." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris l'expérience qui montre le ÷ 3 de la pyramide.", solution: "Une pyramide creuse et le **prisme de même base et même hauteur** : il faut verser exactement **trois** pyramides d'eau pour remplir le prisme — le tiers se constate avant de se démontrer." },
    { tier: "warmup", prompt: "Pyramide à base carrée de côté 6 cm, hauteur 10 cm : calcule le volume.", solution: "$V = \\dfrac{6^2 \\times 10}{3} = \\dfrac{360}{3} = $ **120 cm³** — la formule du prisme, divisée par 3." },
    { tier: "application", prompt: "Cône de rayon 3 cm et de hauteur 7 cm : volume exact (en π) puis arrondi.", solution: "$V = \\dfrac{\\pi \\times 9 \\times 7}{3} = 21\\pi \\approx 66$ cm³ — πr² pour la base, ÷ 3 pour la pointe." },
    { tier: "challenge", prompt: "Une pyramide a un volume de 80 cm³ et une base de 24 cm². Quelle est sa hauteur ?", solution: "$h = \\dfrac{3V}{\\text{base}} = \\dfrac{3 \\times 80}{24} = $ **10 cm** — la formule remontée : multiplier par 3 d'abord, l'équation de 4e en action." },
    { tier: "exam", prompt: "Explique, par le découpage du cube, pourquoi la pyramide vaut le tiers du prisme — et relie au ÷ 2 du triangle.", solution: "Un cube se découpe en **trois pyramides identiques** (base : une face ; sommet : le coin opposé) : chacune vaut le **tiers** du cube, et la déformation étend le résultat. Le parallèle : le carré se coupait en **2 triangles** (÷ 2 des aires), le cube en **3 pyramides** (÷ 3 des volumes) — pointer coûte un facteur égal à la **dimension** : 2 en aire, 3 en volume." },
  ],
  practice: [
    { tier: "warmup", label: "Le tiers du prisme", make: (r) => {
      const base = pick(r, [12, 18, 24, 30, 36]); const h = pick(r, [4, 5, 7, 10]);
      return { prompt: `Pyramide : base ${base} cm², hauteur ${h} cm. Quel volume ?`, answer: (base * h) / 3, solution: `$\\dfrac{${base} \\times ${h}}{3} = $ **${String((base * h) / 3).replace(".", ",")} cm³**.` };
    } },
    { tier: "application", label: "La hauteur remontée", make: (r) => {
      const base = pick(r, [12, 15, 24, 30]); const h = randint(r, 3, 12);
      return { prompt: `Une pyramide de ${(base * h) / 3} cm³ a une base de ${base} cm². Quelle hauteur ?`, answer: h, solution: `$h = \\dfrac{3 \\times ${(base * h) / 3}}{${base}} = $ **${h} cm** — ×3 d'abord, puis ÷ la base.` };
    } },
    { tier: "challenge", label: "Pointu contre droit", make: (r) => {
      const base = pick(r, [9, 12, 15, 21]); const h = pick(r, [4, 6, 8]);
      return { prompt: `Un prisme et une pyramide ont la même base (${base} cm²) et la même hauteur (${h} cm). De combien de cm³ le prisme dépasse-t-il la pyramide ?`, answer: (2 * base * h) / 3, solution: `Prisme $${base * h}$, pyramide $${(base * h) / 3}$ : écart $= \\dfrac{2}{3}$ du prisme $= $ **${String((2 * base * h) / 3).replace(".", ",")} cm³**.` };
    } },
  ],
};

export default [pyramideCone];
