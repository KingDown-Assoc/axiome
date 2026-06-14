// Field "Geometry" — PRIMARY module (CM1 year): perpendicular and parallel lines,
// the circle as a set of points at a given distance, isoceles and equilateral
// triangles, the right prism (parallel lateral edges!), and line symmetry —
// recognised, completed, and constructed on grid paper. Official cycle-3 programme.
import { randint, pick } from "../../core/exercises.js";

// — Perpendiculars, parallels, and the geometry of relations (programme CM1) —
const perpParallel = {
  id: "geometry.primary.perp-parallel",
  level: "primary", domain: "geometry",
  title: "Perpendiculaires et parallèles",
  tagline: "Les droites entrent en relation — et le cercle révèle sa vraie définition.",
  prereqs: ["geometry.primary.plane-figures"],
  intuition:
    "Deux droites peuvent se rencontrer en formant un angle droit : elles sont **perpendiculaires** (l'équerre en juge). Ou ne jamais se rencontrer, gardant partout le même écart : elles sont **parallèles** — les rails du train.\n\nEt le cercle gagne sa définition de grand : c'est l'**ensemble de tous les points** situés à une même distance (le rayon) d'un point donné (le centre). Le compas ne dessine pas un rond — il **fabrique** cette définition.",
  depths: {
    discovery:
      "**Avec les mains** : l'équerre vérifie la perpendicularité ; pour tracer une parallèle, l'équerre **glisse le long d'une règle** — l'angle ne change pas, la droite se déplace sans tourner. Deux gestes d'artisan à répéter jusqu'à l'aisance.",
    standard:
      "**En image** : les figures se relisent par leurs relations — le **rectangle** a ses côtés opposés **parallèles** (et égaux) ; le triangle **isocèle** a deux côtés égaux **et deux angles égaux** ; l'**équilatéral**, trois et trois. Les codes (petits traits, petits carrés, arcs d'angles) affichent tout. Le professeur note (AB) la droite et [AB] le segment — tu n'as pas à retenir ces conventions : les consignes les expliqueront toujours.",
    advanced:
      "**Dans la tête** : les relations montent en 3D avec le **prisme droit** — deux bases polygonales superposables, reliées par des rectangles : ses arêtes latérales sont **parallèles entre elles** et **perpendiculaires aux bases**. Base à $n$ côtés : $n + 2$ faces, $3n$ arêtes, $2n$ sommets. La perpendicularité et le parallélisme ne décrivent pas que des droites — ils structurent les solides.",
  },
  keyIdea: "**Perpendiculaires** : angle droit au croisement. **Parallèles** : écart constant, jamais de rencontre. Le cercle = tous les points à distance $r$ du centre.",
  why:
    "Pourquoi dire que le cercle est un « ensemble de points » plutôt qu'un rond ? Parce que la définition **fabrique** l'objet : ouvre le compas de 4 cm, et chaque point tracé est exactement à 4 cm du centre — ni un de plus. Définir par une propriété, c'est le geste fondateur de la géométrie : les objets deviennent des lois.",
  examples: [
    { title: "Tracer une parallèle", steps: [
      { p: "Je pose l'équerre sur la droite, une règle contre l'autre bord de l'équerre." },
      { p: "L'équerre **glisse** le long de la règle : son côté trace une droite qui n'a pas tourné — une parallèle." },
    ] },
    { title: "Le prisme droit en chiffres", steps: [
      { p: "Base triangulaire ($n = 3$) : $3 + 2 = 5$ faces, $3 \\times 3 = 9$ arêtes, $2 \\times 3 = 6$ sommets." },
      { p: "Ses trois arêtes latérales sont parallèles entre elles — et perpendiculaires aux deux bases." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quand dit-on que deux droites sont perpendiculaires ? Parallèles ?", solution: "**Perpendiculaires** : elles se coupent en formant un **angle droit**. **Parallèles** : elles gardent partout le même écart et ne se rencontrent jamais." },
    { tier: "warmup", prompt: "Qu'est-ce qu'un cercle de centre O et de rayon 4 cm, dit avec des points ?", solution: "L'**ensemble de tous les points** situés à exactement **4 cm de O** — ce que le compas fabrique, point par point." },
    { tier: "application", prompt: "Quelle propriété de parallélisme possède un rectangle ?", solution: "Ses **côtés opposés sont parallèles** (et de même longueur) — c'est ce qui le rend si stable." },
    { tier: "challenge", prompt: "Un triangle isocèle a deux côtés égaux. Quelle autre égalité possède-t-il ?", solution: "**Deux angles égaux** — ceux qui font face aux côtés égaux. L'équilatéral pousse au bout : trois côtés, trois angles égaux." },
    { tier: "exam", prompt: "Un prisme droit a une base pentagonale. Donne ses nombres de faces, d'arêtes et de sommets, et une propriété de ses arêtes latérales.", solution: "$5 + 2 = $ **7 faces**, $3 \\times 5 = $ **15 arêtes**, $2 \\times 5 = $ **10 sommets** — et ses arêtes latérales sont **parallèles entre elles**, perpendiculaires aux bases." },
  ],
  practice: [
    { tier: "warmup", label: "Relations entre droites", make: (r) => {
      const q = pick(r, [["se coupent en formant un angle droit", "perpendiculaires"], ["gardent partout le même écart sans jamais se couper", "parallèles"]]);
      return { prompt: `Deux droites qui ${q[0]} sont…`, answer: q[1], check: { type: "exact" }, solution: `Elles sont **${q[1]}**.` };
    } },
    { tier: "application", label: "Le prisme en chiffres", make: (r) => {
      const base = pick(r, [["triangulaire", 3], ["carrée", 4], ["pentagonale", 5], ["hexagonale", 6]]);
      const q = pick(r, [["faces", (n) => n + 2], ["arêtes", (n) => 3 * n], ["sommets", (n) => 2 * n]]);
      const n = base[1], val = q[1](n);
      return { prompt: `Un prisme droit à base ${base[0]} : combien ${q[0] === "arêtes" ? "d'" : "de "}${q[0]} ?`, answer: val, solution: `Base à ${n} côtés : ${n + 2} faces, ${3 * n} arêtes, ${2 * n} sommets → **${val} ${q[0]}**.` };
    } },
  ],
};

// — Symmetry: recognise, complete, construct (programme CM1: axe horizontal ou vertical, quadrillage) —
const symmetry = {
  id: "geometry.primary.symmetry",
  level: "primary", domain: "geometry",
  title: "La symétrie : plier, compléter, construire",
  tagline: "Du pliage du CE2 au tracé du symétrique — case par case.",
  prereqs: ["geometry.primary.plane-figures"],
  intuition:
    "Au CE2, tu **reconnaissais** un axe de symétrie par pliage. Au CM1, tu passes à l'action : **compléter** une figure pour la rendre symétrique, puis **construire** sur quadrillage le symétrique entier d'une figure, par rapport à une droite horizontale ou verticale.\n\nLa règle du jeu tient en une phrase : chaque point traverse l'axe **perpendiculairement**, à **distance égale** de l'autre côté.",
  depths: {
    discovery:
      "**Avec les mains** : le pliage reste le juge — si les deux moitiés se superposent exactement, le pli est un axe. Pour vérifier une construction : plier (ou décalquer et retourner), et tout doit coïncider.",
    standard:
      "**En image** : sur quadrillage, on **compte les cases** — un sommet à 3 cases à gauche de l'axe vertical a son symétrique à 3 cases **à droite**, sur la même ligne. Sommet par sommet, puis on relie : la figure miroir apparaît. Un point posé **sur** l'axe ne bouge pas — il est son propre symétrique.",
    advanced:
      "**Dans la tête** : compter les axes révèle les figures — le **carré** en a **4** (deux médianes, deux diagonales), le **rectangle** seulement **2** (ses diagonales n'en sont PAS : plie pour t'en convaincre !), l'équilatéral 3, l'isocèle 1, le cercle une infinité. Le nombre d'axes est une carte d'identité — et le piège du rectangle, un classique des contrôles.",
  },
  keyIdea: "Symétrique d'un point : **même distance de l'axe, de l'autre côté, perpendiculairement** — sur quadrillage, on compte les cases.",
  why:
    "Pourquoi les diagonales du rectangle ne sont-elles pas des axes ? Plie un rectangle (non carré) le long d'une diagonale : les deux triangles ont la même **aire**… mais ne se **superposent** pas — un côté long tombe sur un côté court. La symétrie exige la superposition exacte, pas l'égalité des moitiés : nuance capitale.",
  examples: [
    { title: "Construire case par case", steps: [
      { p: "Axe vertical. Un sommet est à 3 cases à gauche, 2 cases au-dessus du bas de l'axe." },
      { p: "Son symétrique : **3 cases à droite**, même hauteur. Sommet par sommet, puis je relie." },
    ] },
    { title: "Les axes du carré et du rectangle", steps: [
      { p: "Carré : 2 médianes + 2 diagonales = **4 axes**." },
      { p: "Rectangle : 2 médianes seulement — pliez sur une diagonale : ça **dépasse** !" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment vérifier qu'une droite est un axe de symétrie d'une figure ?", solution: "Par **pliage** le long de la droite : les deux moitiés doivent se **superposer exactement**." },
    { tier: "warmup", prompt: "Sur quadrillage, un sommet est à 4 cases à gauche de l'axe vertical. Où est son symétrique ?", solution: "À **4 cases à droite** de l'axe, sur la **même ligne** — même distance, de l'autre côté." },
    { tier: "application", prompt: "Que devient un point situé exactement sur l'axe de symétrie ?", solution: "Il **ne bouge pas** : à distance zéro de l'axe, il est son propre symétrique — c'est le pivot du miroir." },
    { tier: "challenge", prompt: "Combien d'axes de symétrie ont le carré, le rectangle, le triangle équilatéral et le triangle isocèle ?", solution: "Carré : **4** ; rectangle : **2** (pas les diagonales !) ; équilatéral : **3** ; isocèle : **1**." },
    { tier: "exam", prompt: "Zoé affirme que la diagonale d'un rectangle est un axe de symétrie « car elle le coupe en deux triangles égaux ». Réfute.", solution: "Égalité d'aires ≠ symétrie : en pliant sur la diagonale, les triangles ne se **superposent pas** (le grand côté tombe sur le petit). Un axe exige la superposition exacte — le rectangle n'a que ses **2 médianes**." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les cases", make: (r) => {
      const d = randint(r, 1, 6);
      return { prompt: `Un sommet est à ${d} case${d > 1 ? "s" : ""} à gauche de l'axe vertical. À combien de cases à droite se trouve son symétrique ?`, answer: d, solution: `Même distance, de l'autre côté : **${d} case${d > 1 ? "s" : ""}** à droite, sur la même ligne.` };
    } },
    { tier: "application", label: "Les axes des figures", make: (r) => {
      const f = pick(r, [["un carré", 4], ["un rectangle (non carré)", 2], ["un triangle équilatéral", 3], ["un triangle isocèle (non équilatéral)", 1]]);
      return { prompt: `Combien d'axes de symétrie possède ${f[0]} ?`, answer: f[1], solution: `${f[0]} : **${f[1]} axe${f[1] > 1 ? "s" : ""}** — le pliage le confirme.` };
    } },
  ],
};

export default [perpParallel, symmetry];
