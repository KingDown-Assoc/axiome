// Field "Geometry" — PRIMARY module (CE1 year): polyhedra described by faces, edges and vertices
// (pyramid joins in), right/acute/obtuse angles with the set square. Official cycle-2 programme.
import { randint, pick } from "../../core/exercises.js";

// — Faces, edges, vertices (programme: décrire et dénombrer ; pyramide ; construire) —
const solidsEdges = {
  id: "geometry.primary.solids-edges",
  level: "primary", domain: "geometry",
  title: "Faces, arêtes, sommets",
  tagline: "Trois mots pour décrire n'importe quel polyèdre — et la pyramide entre en scène.",
  prereqs: ["geometry.primary.solids-faces"],
  intuition:
    "Aux **faces** du CP s'ajoutent deux mots : les **arêtes** (les bords où deux faces se rencontrent) et les **sommets** (les pointes où les arêtes se rejoignent).\n\nCompte sur un dé : **6 faces, 12 arêtes, 8 sommets**. Et la **pyramide** rejoint officiellement la bande — celle à base carrée porte un carré et quatre triangles.",
  depths: {
    discovery:
      "**Avec les mains** : je construis le **squelette** d'un cube — douze pailles pour les arêtes, huit boules de pâte pour les sommets. Un solide se construit par ses faces… ou par ses arêtes et ses sommets !",
    standard:
      "**En image** : je dénombre méthodiquement — faces d'abord, arêtes ensuite, sommets enfin. La pyramide à base carrée : **5 faces** (1 carré + 4 triangles), **8 arêtes**, **5 sommets**. Et j'apprends à reconnaître un solide sur un dessin en perspective — on lit ces dessins, on ne les trace pas encore.",
    advanced:
      "**Dans la tête** : le jeu du portrait — « j'ai 5 faces, dont 4 triangles et un carré : qui suis-je ? » La description **suffit** à identifier. Surprise : le cube et le pavé ont exactement les mêmes nombres (6, 12, 8) — c'est la **nature des faces** qui les distingue, pas les comptes. Décrire, c'est choisir les bonnes propriétés.",
  },
  keyIdea: "**Face** = côté plat ; **arête** = bord entre deux faces ; **sommet** = pointe. Cube : 6, 12, 8. Pyramide à base carrée : 5, 8, 5.",
  why:
    "Pourquoi compter les arêtes alors qu'on voit bien le solide ? Parce que les nombres se **transmettent** : au téléphone, « 5 faces, 8 arêtes, 5 sommets, des triangles et un carré » suffit pour que l'autre construise ta pyramide. Décrire par les nombres, c'est communiquer sans montrer.",
  examples: [
    { title: "Le compte du cube", steps: [
      { p: "Faces : je pose le dé sur chacune — **6**." },
      { p: "Arêtes : quatre en haut, quatre en bas, quatre verticales — **12**." },
      { p: "Sommets : quatre en haut, quatre en bas — **8**." },
    ] },
    { title: "Le portrait de la pyramide", steps: [
      { p: "« J'ai un carré pour base et quatre faces en triangle qui se rejoignent en un point. »" },
      { p: "5 faces, 8 arêtes, 5 sommets : la **pyramide à base carrée**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qu'une arête ? Et un sommet ?", solution: "L'**arête** est le bord où deux faces se rencontrent ; le **sommet** est la pointe où des arêtes se rejoignent." },
    { tier: "warmup", prompt: "Combien de faces, d'arêtes et de sommets a un cube ?", solution: "**6 faces, 12 arêtes, 8 sommets** — à vérifier sur un dé." },
    { tier: "application", prompt: "Quelles sont les faces d'une pyramide à base carrée ?", solution: "**Un carré** (la base) et **quatre triangles** : 5 faces en tout." },
    { tier: "challenge", prompt: "Jeu du portrait : « j'ai 5 faces, 8 arêtes et 5 sommets ». Qui suis-je ?", solution: "La **pyramide à base carrée** — la description suffit, sans la voir." },
    { tier: "exam", prompt: "Le cube et le pavé ont les mêmes nombres de faces, d'arêtes et de sommets. Comment les distinguer ?", solution: "Par la **nature des faces** : 6 carrés pour le cube, 6 rectangles pour le pavé. Les comptes ne disent pas tout — les formes, si." },
  ],
  practice: [
    { tier: "warmup", label: "Dénombrer F, A, S", make: (r) => {
      const s = pick(r, [["un cube", 6, 12, 8], ["un pavé", 6, 12, 8], ["une pyramide à base carrée", 5, 8, 5]]);
      const q = pick(r, [["faces", 1], ["arêtes", 2], ["sommets", 3]]);
      return { prompt: `Combien ${q[0] === "arêtes" ? "d'" : "de "}${q[0]} a ${s[0]} ?`, answer: s[q[1]], solution: `${s[0]} : ${s[1]} faces, ${s[2]} arêtes, ${s[3]} sommets → **${s[q[1]]} ${q[0]}**.` };
    } },
  ],
};

// — The right angle and its friends (programme: angle droit/aigu/obtus, équerre, propriétés) —
const rightAngle = {
  id: "geometry.primary.angles",
  level: "primary", domain: "geometry",
  title: "L'angle droit (et les autres)",
  tagline: "L'équerre entre en scène : vérifier, tracer, et décrire les figures par leurs angles.",
  prereqs: ["geometry.primary.figures"],
  intuition:
    "Regarde le coin d'une feuille : voilà un **angle droit** — l'angle de référence. Plus **fermé** que lui : un angle **aigu**. Plus **ouvert** : un angle **obtus**.\n\nL'outil qui ne se trompe jamais : l'**équerre**. On la pose dans le coin — ça coïncide ? Angle droit. Et un triangle qui possède un angle droit gagne un nom : le **triangle rectangle**.",
  depths: {
    discovery:
      "**Avec les mains** : je fabrique un gabarit d'angle droit en pliant une feuille deux fois, puis je chasse les angles droits de la classe — coins de table, fenêtres, carreaux. L'équerre confirme. Et le **compas** trace ses premiers cercles autour de leur **centre** — un apprentissage à part entière, qui demande de l'entraînement.",
    standard:
      "**En image** : je classe les angles d'une figure — droit, aigu (plus fermé), obtus (plus ouvert). Le **carré** et le **rectangle** ont chacun **4 angles droits** ; ce qui les départage, ce sont les longueurs : 4 côtés égaux pour le carré, côtés égaux deux à deux pour le rectangle. Et le **milieu** d'un segment le coupe en deux parts égales — une moitié, encore une fraction !",
    advanced:
      "**Dans la tête** : les propriétés deviennent des **cartes d'identité** — « 4 angles droits et 4 côtés de même longueur » désigne le carré, sans dessin. Dans le Tangram, je repère les triangles rectangles à leur angle droit. Décrire par les angles **et** les longueurs : la géométrie commence à prouver.",
  },
  keyIdea: "Angle **droit** = le coin de la feuille ; **aigu** = plus fermé ; **obtus** = plus ouvert. L'**équerre** vérifie et trace.",
  why:
    "Pourquoi l'angle droit est-il la référence, et pas un autre ? Parce que c'est l'angle de l'**équilibre** : le mur droit sur le sol, la croix des quadrillages. Tous les autres angles se décrivent par rapport à lui — plus fermé, plus ouvert. Une référence commune, et tout le monde se comprend.",
  examples: [
    { title: "Vérifier à l'équerre", steps: [
      { p: "Je pose l'équerre dans le coin de la figure." },
      { p: "Les deux côtés coïncident avec ceux de l'équerre → l'angle est **droit**." },
    ] },
    { title: "Carré ou rectangle ?", steps: [
      { p: "Les deux ont 4 angles droits — l'équerre ne suffit pas à les départager." },
      { p: "Je mesure : 4 côtés **égaux** → carré ; côtés égaux **deux à deux** → rectangle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel outil permet de vérifier qu'un angle est droit ?", solution: "L'**équerre** — ou, à défaut, le coin d'une feuille pliée." },
    { tier: "warmup", prompt: "Comment appelle-t-on un angle plus ouvert que l'angle droit ? Et plus fermé ?", solution: "Plus ouvert : **obtus**. Plus fermé : **aigu**." },
    { tier: "application", prompt: "Qu'est-ce qu'un triangle rectangle ?", solution: "Un triangle qui possède **un angle droit** — repérable à l'équerre, par exemple dans les pièces du Tangram." },
    { tier: "challenge", prompt: "Le milieu d'un segment de 8 cm est à quelle distance de chaque extrémité ?", solution: "**4 cm** : le milieu coupe le segment en deux parts **égales** — la moitié de 8." },
    { tier: "exam", prompt: "« 4 angles droits et 4 côtés de même longueur » : quelle figure ? Pourquoi pas un rectangle quelconque ?", solution: "Un **carré**. Le rectangle a bien 4 angles droits, mais ses côtés ne sont égaux que **deux à deux** : la deuxième propriété fait toute la différence." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les angles droits", make: (r) => {
      const f = pick(r, [["un carré", 4], ["un rectangle", 4], ["un triangle rectangle", 1]]);
      return { prompt: `Combien d'angles droits possède ${f[0]} ?`, answer: f[1], solution: `${f[0]} possède **${f[1]} angle${f[1] > 1 ? "s" : ""} droit${f[1] > 1 ? "s" : ""}** — l'équerre le confirme.` };
    } },
  ],
};

export default [solidsEdges, rightAngle];
