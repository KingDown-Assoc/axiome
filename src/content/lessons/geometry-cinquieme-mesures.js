// Field "Geometry" — MIDDLE module (5e year), part 2: triangle lines and solid
// volumes. Official cycle-4 programme: constructing triangles from partial data,
// the triangle AREA (half a parallelogram), HEIGHTS (concurrent) and MEDIANS
// (proving a median splits the triangle into two equal areas), perpendicular
// bisectors and circumscribed circle on particular triangles (Euler line as
// extension); cavalier perspective and nets of prisms and cylinders, volume as
// base area × height (cube, cuboid, prism, cylinder), the DISC AREA πr², and
// volume/capacity unit conversions (1 L = 1 dm³).
import { randint, pick } from "../../core/exercises.js";

// — Triangle lines (programme: aire, hauteurs, médianes, cercle circonscrit) —
const triangleDroites = {
  id: "geometry.middle.triangle-droites",
  level: "middle", domain: "geometry",
  title: "Les droites du triangle",
  tagline: "Aire = base × hauteur ÷ 2 — et la médiane partage en deux aires égales, démontré.",
  prereqs: ["geometry.middle.triangles", "geometry.middle.parallelogramme"],
  intuition:
    "Le triangle livre son **aire** : duplique-le par demi-tour autour du milieu d'un côté — un **parallélogramme** apparaît, d'aire base × hauteur. Le triangle en est la moitié : $A = \\dfrac{b \\times h}{2}$.\n\nEt deux nouvelles droites entrent en scène : la **hauteur** (du sommet, perpendiculaire au côté opposé) et la **médiane** (du sommet au **milieu** du côté opposé).",
  depths: {
    discovery:
      "**Avec les mains** : construire un triangle avec des données partielles — deux côtés et l'angle entre eux (compas + rapporteur), ou deux angles et le côté commun : chaque jeu de données suffisant fige la figure. Trois longueurs (6e), deux côtés + un angle, deux angles + un côté : trois recettes, une figure unique à chaque fois.",
    standard:
      "**En image** : les trois **hauteurs** d'un triangle sont **concourantes** (comme les médiatrices de 6e !) — leur point commun s'appelle l'orthocentre. Attention au triangle obtus : deux hauteurs tombent **hors** du triangle, il faut prolonger les côtés. Et l'aire se calcule avec **n'importe quel** côté comme base, pourvu qu'on prenne **sa** hauteur — trois calculs, un même résultat.",
    advanced:
      "**Dans la tête** : une démonstration élégante — la **médiane** issue de A coupe [BC] en son milieu M : les deux triangles ABM et ACM ont des bases **égales** (BM $=$ MC) et la **même hauteur** (la distance de A à la droite (BC) ne dépend pas du morceau de base) : leurs aires sont égales — $\\frac{b \\times h}{2}$ des deux côtés. La médiane est la ligne de partage équitable du triangle. Et pour les gourmets : médiatrices, hauteurs et médianes de tout triangle livrent trois centres… **alignés** sur une même droite, la droite d'Euler — découverte en 1765, à ta portée au compas.",
  },
  keyIdea: "$A = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ — le demi-parallélogramme. **Hauteur** : perpendiculaire au côté opposé (concourantes) ; **médiane** : vers le milieu — elle partage le triangle en deux aires **égales** (démontré).",
  why:
    "Pourquoi tant de droites dans un simple triangle ? Parce que chacune répond à une question différente : la médiatrice cherche l'équidistance des sommets (le cercle circonscrit), la hauteur mesure (l'aire), la médiane équilibre (le partage équitable — et le point d'équilibre physique : un triangle en carton tient sur la pointe au croisement de ses médianes). Le triangle est un petit monde ; ses droites en sont les lois.",
  examples: [
    { title: "L'aire par le demi-parallélogramme", steps: [
      { p: "Base 8 cm, hauteur 5 cm : le triangle dupliqué fait un parallélogramme de $8 \\times 5 = 40$ cm²." },
      { p: "Le triangle en est la moitié : $A = \\dfrac{8 \\times 5}{2} = $ **20 cm²**." },
    ] },
    { title: "La médiane équitable", steps: [
      { p: "La médiane de A coupe [BC] en M : bases BM $=$ MC, et la **même** hauteur depuis A." },
      { p: "Aires $\\dfrac{BM \\times h}{2} = \\dfrac{MC \\times h}{2}$ : **égales** — démontré par la formule." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Définis la hauteur et la médiane issues d'un sommet A dans un triangle ABC.", solution: "La **hauteur** : la droite passant par A **perpendiculaire** à (BC) ; la **médiane** : la droite (ou le segment) joignant A au **milieu** de [BC] — angle droit pour l'une, milieu pour l'autre." },
    { tier: "warmup", prompt: "Calcule l'aire d'un triangle de base 8 cm et de hauteur 5 cm. D'où vient le ÷ 2 ?", solution: "$A = \\dfrac{8 \\times 5}{2} = $ **20 cm²** — le triangle est la **moitié** du parallélogramme de même base et même hauteur (duplication par demi-tour)." },
    { tier: "application", prompt: "Un triangle a une aire de 27 cm² et une base de 9 cm. Quelle est la hauteur associée ?", solution: "$h = \\dfrac{2 \\times 27}{9} = $ **6 cm** — la formule se remonte : $A = \\frac{b \\times h}{2}$ donne $h = \\frac{2A}{b}$." },
    { tier: "challenge", prompt: "Démontre que la médiane issue de A partage le triangle ABC en deux triangles d'aires égales.", solution: "Elle coupe [BC] en son milieu M : **BM $=$ MC** (bases égales) et les deux triangles ABM, ACM ont la **même hauteur** issue de A (la distance de A à la droite (BC)). Donc aires $= \\frac{BM \\times h}{2} = \\frac{MC \\times h}{2}$ : **égales** — la formule fait la preuve." },
    { tier: "exam", prompt: "Dans un triangle rectangle, où se trouve le centre du cercle circonscrit ? Indice : prends les médiatrices des deux côtés de l'angle droit.", solution: "Au **milieu de l'hypoténuse** — les médiatrices des deux côtés perpendiculaires se croisent en ce point (chacune passe à mi-distance, parallèlement à l'autre côté). L'hypoténuse est donc un **diamètre** du cercle circonscrit : un cas particulier qui deviendra théorème en 4e." },
  ],
  practice: [
    { tier: "warmup", label: "Le demi-parallélogramme", make: (r) => {
      const b = randint(r, 4, 16); const h = randint(r, 3, 12);
      return { prompt: `Triangle : base ${b} cm, hauteur ${h} cm. Quelle aire ?`, answer: (b * h) / 2, solution: `$\\dfrac{${b} \\times ${h}}{2} = $ **${String((b * h) / 2).replace(".", ",")} cm²**.` };
    } },
    { tier: "application", label: "L'aire à l'envers", make: (r) => {
      const b = pick(r, [4, 6, 8, 10, 12]); const h = randint(r, 3, 12);
      return { prompt: `Un triangle a une aire de ${(b * h) / 2} cm² et une base de ${b} cm. Quelle hauteur ?`, answer: h, solution: `$h = \\dfrac{2 \\times ${(b * h) / 2}}{${b}} = $ **${h} cm** — la formule remontée.` };
    } },
  ],
};

// — Solids and volumes (programme: perspectives, V = aire de base × h, aire du disque) —
const solidesVolumes = {
  id: "geometry.middle.solides-volumes",
  level: "middle", domain: "geometry",
  title: "Prismes, cylindres et volumes",
  tagline: "Volume = aire de base × hauteur — une tranche, empilée.",
  prereqs: ["applied.middle.volume", "applied.middle.circle-perimeter"],
  intuition:
    "Tes couches de cubes de 6e deviennent une **formule universelle** : pour tout **prisme droit** (et le pavé en est un !), $V = $ **aire de base × hauteur** — la tranche du bas, recopiée à chaque étage.\n\nEt le **cylindre** obéit à la même loi : sa base est un **disque**, d'aire $\\pi r^2$ — d'où $V = \\pi r^2 \\times h$.",
  depths: {
    discovery:
      "**Avec les mains** : la **perspective cavalière** dessine la 3D — la face avant en vraie grandeur, les fuyantes obliques et raccourcies, les arêtes cachées en pointillés. Et le **patron** déplie : celui du cylindre est un **rectangle enroulé** (largeur $= $ le tour, $2\\pi r$ !) entre deux disques — la boîte de conserve mise à plat.",
    standard:
      "**En image** : la formule à l'œuvre — prisme à base triangulaire (base 6 cm, hauteur du triangle 4 cm, longueur 10 cm) : aire de base $\\frac{6 \\times 4}{2} = 12$ cm², volume $12 \\times 10 = 120$ cm³. Cylindre ($r = 5$, $h = 10$) : base $\\pi \\times 5^2 \\approx 78{,}5$ cm², volume $\\approx 785$ cm³. Une seule idée, toutes les formes droites.",
    advanced:
      "**Dans la tête** : d'où vient $\\pi r^2$ ? Découpe le disque en parts de tarte très fines et alterne-les tête-bêche : un **presque-rectangle** apparaît — largeur $\\approx$ le demi-tour ($\\pi r$), hauteur $\\approx$ le rayon ($r$) : aire $\\approx \\pi r \\times r = \\pi r^2$. Plus les parts sont fines, plus le « presque » s'efface — tu viens de frôler le calcul infinitésimal. Et la **capacité** rejoint le volume : $1$ L $= 1$ dm³ (le litre est un cube de 10 cm !), donc $1$ m³ $= 1\\,000$ L : la bouteille et le cube parlent la même langue.",
  },
  keyIdea: "$V = $ **aire de base × hauteur** (prisme, cylindre — le pavé inclus). Aire du disque : $\\pi r^2$. Capacité : $1$ L $= 1$ dm³, $1$ m³ $= 1\\,000$ L.",
  why:
    "Pourquoi une seule formule pour des solides si différents ? Parce qu'ils partagent une structure : une **tranche constante**, translatée le long d'une hauteur — peu importe la forme de la tranche (carré, triangle, disque), le volume est tranche × épaisseur totale. Les solides qui s'affinent (pyramide, cône) désobéissent : leur heure viendra en 4e, avec un mystérieux ÷ 3.",
  examples: [
    { title: "Le prisme triangulaire", steps: [
      { p: "Base : triangle d'aire $\\dfrac{6 \\times 4}{2} = 12$ cm² ; longueur du prisme : 10 cm." },
      { p: "$V = 12 \\times 10 = $ **120 cm³** — la tranche, empilée dix fois." },
    ] },
    { title: "La boîte de conserve", steps: [
      { p: "Cylindre : $r = 5$ cm, $h = 10$ cm. Base : $\\pi \\times 5^2 \\approx 78{,}5$ cm²." },
      { p: "$V \\approx 78{,}5 \\times 10 = 785$ cm³ — soit $0{,}785$ L : le volume parle capacité." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle idée commune donne le volume du pavé, du prisme et du cylindre ?", solution: "**Aire de base × hauteur** — une tranche constante, recopiée le long de la hauteur : la forme de la tranche (rectangle, triangle, disque) ne change pas la loi." },
    { tier: "warmup", prompt: "Calcule l'aire d'un disque de rayon 5 cm (π ≈ 3,14).", solution: "$\\pi r^2 \\approx 3{,}14 \\times 25 = $ **78,5 cm²** — attention : le rayon au **carré**, pas le diamètre." },
    { tier: "application", prompt: "Un prisme droit a pour base un triangle d'aire 12 cm² et mesure 10 cm de long. Volume ? Et un cylindre de rayon 5 cm, hauteur 10 cm ?", solution: "Prisme : $12 \\times 10 = $ **120 cm³** ; cylindre : $\\approx 78{,}5 \\times 10 = $ **785 cm³** — même formule, bases différentes." },
    { tier: "challenge", prompt: "Un aquarium pavé de 50 cm × 30 cm × 40 cm : combien de litres contient-il ?", solution: "$V = 50 \\times 30 \\times 40 = 60\\,000$ cm³ $= 60$ dm³ $= $ **60 L** — $1$ L $= 1$ dm³ : le volume se boit." },
    { tier: "exam", prompt: "Explique, par le découpage en parts de tarte, pourquoi l'aire du disque vaut π r².", solution: "Découpe le disque en parts très fines, alterne-les tête-bêche : un **presque-rectangle** de largeur $\\approx$ le demi-tour ($\\pi r$) et de hauteur $\\approx r$ — aire $\\approx \\pi r \\times r = \\pi r^2$. En affinant les parts, l'approximation devient exacte : la formule sort du périmètre, et tu entrevois la méthode des infiniment petits." },
  ],
  practice: [
    { tier: "warmup", label: "Tranche × hauteur", make: (r) => {
      const base = randint(r, 8, 40); const h = randint(r, 3, 15);
      return { prompt: `Prisme droit : aire de base ${base} cm², hauteur ${h} cm. Quel volume ?`, answer: base * h, solution: `$${base} \\times ${h} = $ **${base * h} cm³**.` };
    } },
    { tier: "application", label: "Le volume à l'envers", make: (r) => {
      const base = pick(r, [10, 12, 15, 20, 25]); const h = randint(r, 4, 12);
      return { prompt: `Un prisme de ${base * h} cm³ a une base de ${base} cm². Quelle hauteur ?`, answer: h, solution: `$h = ${base * h} \\div ${base} = $ **${h} cm** — la formule remontée, façon équation.` };
    } },
    { tier: "challenge", label: "Du cube au litre", make: (r) => {
      const dm3 = randint(r, 2, 80);
      return { prompt: `Un récipient de ${dm3 * 1000} cm³ : combien de litres ?`, answer: dm3, solution: `$${dm3 * 1000}$ cm³ $= ${dm3}$ dm³ $= $ **${dm3} L** — le litre est un cube de 10 cm.` };
    } },
  ],
};

export default [triangleDroites, solidesVolumes];
