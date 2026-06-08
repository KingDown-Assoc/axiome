// Field "Geometry" — PRESCHOOL module (shapes, space) + one middle-school lesson (transition).
import { pick } from "../../core/exercises.js";
const shapes = {
  id: "geometry.preschool.shapes",
  level: "preschool", domain: "geometry",
  title: "Reconnaître les formes",
  tagline: "Cercle, carré, triangle, rectangle : les voir et les nommer.",
  prereqs: [],
  intuition:
    "Les objets ont des formes. Une assiette, une roue : c'est **rond** (un cercle). Une fenêtre : souvent un **carré** ou un **rectangle**. Un toit, une part de pizza : un **triangle**.\n\nPour reconnaître une forme, on regarde ses **côtés** (les bords droits) et ses **coins** (les pointes).",
  depths: {
    discovery: "Cercle = tout rond, sans coin. Triangle = 3 côtés. Carré et rectangle = 4 côtés et des coins droits.",
    standard: "On classe les formes planes par le **nombre de côtés** et la nature des **angles**. Le carré a 4 côtés égaux et 4 angles droits ; le rectangle a aussi 4 angles droits mais des côtés deux à deux égaux ; le cercle n'a ni côté ni coin.",
    advanced: "Les figures à côtés droits sont des **polygones** (triangle = 3 côtés, quadrilatère = 4…). Le carré est un cas très particulier de rectangle, lui-même un parallélogramme : on entre dans une **classification** emboîtée, idée centrale de toute la géométrie.",
  },
  keyIdea: "On reconnaît une forme à ses **côtés** et ses **coins**.",
  why:
    "Pourquoi un carré est-il aussi un rectangle ? Parce qu'un rectangle, c'est « 4 angles droits » — et le carré en a 4. Le carré coche juste une case en plus (tous les côtés égaux). Trier les formes par leurs propriétés, c'est déjà faire des mathématiques : on range le monde en familles.",
  widgets: [
    { kind: "shapes", params: {}, caption: "Touche chaque forme pour la nommer et voir ce qui la caractérise." },
  ],
  examples: [
    { title: "Est-ce un triangle ?", steps: [
      { p: "Je compte les côtés droits : 3." },
      { p: "Je compte les coins : 3. → C'est bien un **triangle**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle forme n'a aucun coin ?", solution: "Le **cercle**." },
    { tier: "warmup", prompt: "Combien de côtés a un carré ?", solution: "**4**." },
    { tier: "challenge", prompt: "Une forme a 3 côtés et 3 coins. Laquelle ?", solution: "Un **triangle**." },
    { tier: "exam", prompt: "Pourquoi peut-on dire qu'un carré est un rectangle particulier ?", solution: "Le rectangle a 4 angles droits ; le carré aussi, **et** ses 4 côtés sont égaux. Le carré est donc un rectangle « spécial »." },
  ],
  practice: [
    { tier: "application", label: "Compter les côtés", make: (r) => { const data = [["un triangle", 3], ["un carré", 4], ["un rectangle", 4], ["un cercle", 0]]; const [nom, n] = data[Math.floor(r() * data.length)]; return { prompt: `Combien de côtés a ${nom} ?`, answer: n, solution: n === 0 ? `${nom} n'a **aucun** côté droit.` : `${nom} a **${n}** côtés.` }; } },
  ],
};

const positionLesson = {
  id: "geometry.preschool.position",
  level: "preschool", domain: "geometry",
  title: "Se repérer dans l'espace",
  tagline: "Sur, sous, devant, derrière, entre, à gauche, à droite.",
  prereqs: [],
  intuition:
    "Pour dire **où** est quelque chose, on a des mots de position : le chat est **sur** la table, la balle est **sous** la chaise, je suis **devant** la porte, le livre est **entre** les deux boîtes.\n\nCes mots disent une chose par rapport à une autre. « À gauche » et « à droite » dépendent même de quel côté on regarde !",
  depths: {
    discovery: "Des mots disent la position : sur/sous, devant/derrière, entre, à gauche/à droite.",
    standard: "Se repérer, c'est situer un objet **par rapport à un autre** (ou à soi). Les positions vont souvent par paires opposées (sur/sous, devant/derrière) ; gauche/droite dépendent du point de vue.",
    advanced: "Donner une position, c'est se choisir un **repère**. Plus tard, on remplacera les mots par des nombres : des **coordonnées** $(x, y)$. Le repérage de l'éveil est la version sans chiffres du plan repéré et, au-delà, de la géométrie analytique.",
  },
  keyIdea: "Une position se dit **par rapport à** quelque chose d'autre.",
  why:
    "Pourquoi « à gauche » peut-il changer ? Parce que la gauche dépend de l'orientation de celui qui regarde : ta gauche et celle de la personne en face de toi sont opposées. Une position n'a de sens qu'avec un **point de repère** — c'est exactement pourquoi, plus tard, on fixera un repère avec des axes.",
  examples: [
    { title: "Où est la balle ?", steps: [
      { p: "La balle est posée par-dessus la boîte → elle est **sur** la boîte." },
      { p: "Le chat est caché en dessous → il est **sous** la boîte." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le contraire de « sur » ?", solution: "**sous**." },
    { tier: "warmup", prompt: "Le contraire de « devant » ?", solution: "**derrière**." },
    { tier: "challenge", prompt: "Trois boîtes en ligne : A, B, C. Quelle boîte est entre les deux autres ?", solution: "**B**." },
    { tier: "exam", prompt: "Pourquoi « à droite » n'est-il pas toujours le même côté pour deux personnes face à face ?", solution: "Parce que gauche/droite dépendent de l'**orientation** : face à face, vos côtés droits pointent en sens opposés." },
  ],
};

// — Transition to middle school (kept from the skeleton) —
const pythagoras = {
  id: "geometry.middle.pythagoras",
  level: "middle", domain: "geometry",
  title: "Le théorème de Pythagore",
  tagline: "Relier les trois côtés d'un triangle rectangle.",
  prereqs: ["numbers.primary.column-addition"],
  intuition:
    "Dans un triangle rectangle (un angle droit, marqué par un petit carré), le plus long côté s'appelle l'**hypoténuse** — il est toujours en face de l'angle droit.\n\nPythagore dit : si on construit un carré sur chaque côté, le grand carré (sur l'hypoténuse) a exactement la même aire que les deux petits réunis. En nombres : on additionne les carrés des deux petits côtés pour obtenir le carré du grand.",
  depths: {
    discovery: "Dans un triangle rectangle : $(\\text{grand côté})^2 = (\\text{côté}_1)^2 + (\\text{côté}_2)^2$.",
    standard: "Si le triangle est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$, où $BC$ est l'hypoténuse. On s'en sert pour calculer un côté manquant, ou (réciproque) pour prouver qu'un triangle est rectangle.",
    advanced: "Le théorème et sa réciproque caractérisent l'orthogonalité dans le plan euclidien : $BC^2 = AB^2 + AC^2 \\iff$ l'angle en $A$ est droit. C'est le cas $C = 90^\\circ$ de la loi des cosinus $c^2 = a^2 + b^2 - 2ab\\cos C$, et la trace élémentaire du produit scalaire.",
  },
  formulas: [
    { tex: "BC^2 = AB^2 + AC^2", legend: "rectangle en A : l'hypoténuse au carré = somme des carrés" },
    { tex: "BC = \\sqrt{AB^2 + AC^2}", legend: "pour trouver l'hypoténuse" },
  ],
  why:
    "Pourquoi additionner des **carrés** et pas les longueurs ? Parce que la relation porte sur des **aires** : le carré bâti sur l'hypoténuse se découpe (on le prouve par un puzzle d'aires) exactement en les deux carrés des autres côtés. Ce sont les aires qui s'additionnent — d'où les « au carré ».",
  widgets: [
    { kind: "geometry", params: {
      points: [ { id: "A", x: 120, y: 240, label: "A" }, { id: "B", x: 420, y: 240, label: "B" }, { id: "C", x: 120, y: 80, label: "C" } ],
      segments: [["A", "B"], ["A", "C"], ["B", "C"]],
      readout: (p) => { const ab = Math.hypot(p.B.x - p.A.x, p.B.y - p.A.y) / 40, ac = Math.hypot(p.C.x - p.A.x, p.C.y - p.A.y) / 40, bc = Math.hypot(p.C.x - p.B.x, p.C.y - p.B.y) / 40; return `AB² + AC² = ${(ab * ab).toFixed(1)} + ${(ac * ac).toFixed(1)} = ${(ab * ab + ac * ac).toFixed(1)}    ·    BC² = ${(bc * bc).toFixed(1)}`; },
    }, caption: "Garde l'angle droit en A et déplace les points : AB² + AC² reste égal à BC²." },
  ],
  examples: [
    { title: "Hypoténuse d'un triangle 3–4", steps: [
      { p: "Côtés de l'angle droit : 3 et 4." },
      { p: "On applique le théorème :", tex: "BC^2 = 3^2 + 4^2 = 9 + 16 = 25" },
      { p: "Donc $BC = \\sqrt{25} = 5$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment s'appelle le plus long côté d'un triangle rectangle ?", solution: "L'**hypoténuse**, en face de l'angle droit." },
    { tier: "challenge", prompt: "Côtés de l'angle droit : 5 et 12. Quelle est l'hypoténuse ?", solution: "$\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$." },
    { tier: "exam", prompt: "L'hypoténuse mesure 10, un côté mesure 6. Quel est l'autre côté ?", solution: "$\\text{autre}^2 = 10^2 - 6^2 = 64$, donc **8**." },
  ],
  practice: [
    { tier: "application", label: "Trouver l'hypoténuse", make: (r) => { const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]); return { prompt: `Triangle rectangle, côtés de l'angle droit ${t[0]} et ${t[1]}. Quelle est l'hypoténuse ?`, answer: t[2], solution: `$h^2 = ${t[0]}^2 + ${t[1]}^2 = ${t[0] * t[0] + t[1] * t[1]}$, donc $h = ${t[2]}$.` }; } },
  ],
};

export default [shapes, positionLesson, pythagoras];
