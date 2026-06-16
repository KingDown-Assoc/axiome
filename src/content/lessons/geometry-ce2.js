// Field "Geometry" — PRIMARY module (CE2 year): perspective drawings (dashed hidden edges),
// nets of the cube, polygonal-base pyramids; widened plane vocabulary (rhombus, diagonal,
// radius/diameter), justification by properties, coding marks, axis of symmetry. Official programme.
import { randint, pick } from "../../core/exercises.js";

// — Nets and perspectives (programme: pointillés, patron du cube, pyramide à base polygonale) —
const solidsNets = {
  id: "geometry.primary.solids-nets",
  level: "primary", domain: "geometry",
  title: "Patrons et perspectives",
  tagline: "Mettre un solide à plat — et lire les arêtes qu'on ne voit pas.",
  prereqs: ["geometry.primary.solids-edges"],
  intuition:
    "Deux nouvelles façons de voir un solide. La **perspective** : un dessin où certaines faces se cachent — les arêtes invisibles s'y tracent en **pointillés**. Le **patron** : le solide déplié, mis à plat, prêt à se replier.\n\nEt la pyramide se généralise : sa base peut être **n'importe quel polygone** — triangle, carré, pentagone, hexagone… — coiffée de triangles qui se rejoignent en un sommet.",
  depths: {
    discovery:
      "**Avec les mains** : je découpe un assemblage de six carrés et je **plie** — le cube se referme… ou pas ! Je construis aussi par les arêtes : des tiges assemblées dessinent le squelette du solide.",
    standard:
      "**En image** : sur la perspective d'un cube, je vois **3 faces** ; les 3 autres se devinent, et les **3 arêtes cachées** sont en pointillés. Je sais identifier un solide connu sur un tel dessin — les construire moi-même attendra. Une pyramide à base hexagonale ? Six triangles à sommet commun, plus l'hexagone : sa carte d'identité.",
    advanced:
      "**Dans la tête** : six carrés ne font pas toujours un patron ! Alignés en ruban, ils se superposent au pliage et le cube reste ouvert. Pour argumenter sans plier, trois critères : le **nombre** de faces, leur **nature**, et leur **position** les unes par rapport aux autres. La géométrie devient un raisonnement — le pliage n'est plus que la vérification.",
  },
  keyIdea: "Pointillés = arêtes **cachées**. Patron = le solide **déplié** — nombre, nature et **position** des faces décident s'il se referme.",
  why:
    "Pourquoi s'entraîner à juger un patron sans le plier ? Parce que c'est le premier pas vers la **preuve** : prévoir par le raisonnement ce que l'expérience confirmera. Anticiper le pliage dans sa tête, c'est faire tourner un solide qui n'existe pas encore — un superpouvoir de géomètre.",
  examples: [
    { title: "Lire une perspective de cube", steps: [
      { p: "Trois faces visibles, dessinées pleines." },
      { p: "Trois arêtes en pointillés : celles que le cube nous cache — elles existent, on ne les voit pas." },
    ] },
    { title: "La pyramide à base pentagonale", steps: [
      { p: "Une base : un pentagone (5 côtés)." },
      { p: "Cinq triangles se rejoignent en un sommet : **6 faces, 10 arêtes, 6 sommets**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur un dessin en perspective, que signifient les traits en pointillés ?", solution: "Ce sont les **arêtes cachées** — bien réelles, mais invisibles depuis ce point de vue." },
    { tier: "warmup", prompt: "Qu'est-ce qu'un patron d'un cube ?", solution: "Un assemblage de **six carrés** qui, une fois plié, **referme** exactement le cube — le solide mis à plat." },
    { tier: "application", prompt: "Quelles sont les faces d'une pyramide à base hexagonale ?", solution: "**Un hexagone** (la base) et **six triangles** à sommet commun : 7 faces en tout." },
    { tier: "challenge", prompt: "Six carrés alignés en ruban forment-ils un patron de cube ? Argumente sans plier.", solution: "**Non** : au pliage, les carrés s'enroulent et se **superposent** — quatre suffisent à fermer le tour, les deux derniers retombent sur des faces déjà prises. Le nombre et la nature conviennent, la **position** ne convient pas." },
    { tier: "exam", prompt: "Sur la perspective d'un cube : combien de faces visibles, de faces cachées, d'arêtes en pointillés ?", solution: "**3 faces visibles, 3 cachées, 3 arêtes en pointillés** — la perspective montre la moitié et fait deviner l'autre." },
  ],
  practice: [
    { tier: "application", label: "Pyramides à base polygonale", make: (r) => {
      const base = pick(r, [["triangulaire", 3], ["carrée", 4], ["pentagonale", 5], ["hexagonale", 6]]);
      const q = pick(r, [["faces", (n) => n + 1], ["arêtes", (n) => 2 * n], ["sommets", (n) => n + 1]]);
      const n = base[1], val = q[1](n);
      return { prompt: `Une pyramide à base ${base[0]} : combien ${q[0] === "arêtes" ? "d'" : "de "}${q[0]} ?`, answer: val, solution: `Base à ${n} côtés : ${n + 1} faces (${n} triangles + la base), ${2 * n} arêtes, ${n + 1} sommets → **${val} ${q[0]}**.` };
    } },
  ],
};

// — Widened plane geometry (programme: losange, diagonale, rayon/diamètre, codage, symétrie) —
const planeFigures = {
  id: "geometry.primary.plane-figures",
  level: "primary", domain: "geometry",
  title: "Polygones, losange, cercle",
  tagline: "Plus de vocabulaire, le codage des figures, et la symétrie par pliage.",
  prereqs: ["geometry.primary.angles"],
  intuition:
    "La famille s'agrandit : **quadrilatère** (4 côtés), **pentagone** (5), **hexagone** (6) — et un nouveau venu, le **losange** : quatre côtés de même longueur.\n\nLe cercle se précise aussi : son **rayon** (du centre au bord) et son **diamètre** (qui traverse par le centre — le double du rayon). Et les figures apprennent à porter leurs propriétés sur elles : c'est le **codage**.",
  depths: {
    discovery:
      "**Avec les mains** : je **plie** une figure — si les deux moitiés se superposent exactement, le pli est un **axe de symétrie**. Je construis aussi sur papier uni : un rectangle de 7 cm sur 3, un carré de côté 6 avec un cercle de rayon 4 centré sur l'un de ses sommets — règle graduée, équerre, compas.",
    standard:
      "**En image** : le **codage** parle sans mots — un petit carré dans un coin dit « angle droit », des petits traits identiques disent « côtés de même longueur ». Sur un rectangle codé : quatre petits carrés, et les côtés opposés marqués égaux deux à deux. La **diagonale** d'un quadrilatère relie deux sommets opposés.",
    advanced:
      "**Dans la tête** : la justification devient une arme — « Ce **n'est pas** un carré, car l'un de ses angles n'est pas droit ; or un carré a ses quatre angles droits. » Une seule propriété manquante suffit à réfuter ! Le losange a 4 côtés égaux mais pas forcément d'angle droit : voisin du carré, pas jumeau.",
  },
  keyIdea: "Diamètre $= 2 \\times$ rayon. Le **codage** affiche les propriétés ; une propriété **manquante** suffit à réfuter une nature.",
  why:
    "Pourquoi coder une figure alors qu'on peut la mesurer ? Parce qu'un dessin est toujours **imparfait** — le codage dit l'intention : « ces côtés SONT égaux, cet angle EST droit ». La géométrie commence quand on raisonne sur ce qui est déclaré, plus seulement sur ce qu'on voit.",
  examples: [
    { title: "Réfuter par une propriété", steps: [
      { p: "Cette figure a 4 côtés de même longueur… mais un angle non droit." },
      { p: "Ce n'est **pas un carré** (il lui faudrait 4 angles droits) — c'est un **losange**." },
    ] },
    { title: "Du rayon au diamètre", steps: [
      { p: "Le compas est ouvert de 4 cm : le rayon du cercle tracé vaut 4 cm." },
      { p: "Le diamètre traverse par le centre : $2 \\times 4 = $ **8 cm**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de côtés ont un quadrilatère, un pentagone et un hexagone ?", solution: "**4**, **5** et **6** — le nom grec compte les côtés." },
    { tier: "warmup", prompt: "Qu'est-ce qu'un losange ?", solution: "Un quadrilatère dont les **quatre côtés ont la même longueur** — quatre sommets, quatre côtés égaux." },
    { tier: "application", prompt: "Un cercle a un rayon de 4 cm. Quel est son diamètre ?", solution: "Le diamètre traverse par le centre : $2 \\times 4 = $ **8 cm**." },
    { tier: "challenge", prompt: "Une figure a 4 côtés de même longueur, mais un de ses angles n'est pas droit. Carré ? Losange ? Justifie.", solution: "**Pas un carré** — « or un carré a ses quatre angles droits » : une propriété manque. C'est un **losange** : les côtés égaux suffisent à sa définition." },
    { tier: "exam", prompt: "À quoi servent le petit carré et les petits traits sur une figure codée ? Et comment vérifier qu'une figure a un axe de symétrie ?", solution: "Le petit carré code l'**angle droit**, les traits identiques codent l'**égalité de longueurs** — la figure déclare ses propriétés. Pour la symétrie : on **plie** ; si les deux moitiés se superposent, le pli est un axe." },
  ],
  practice: [
    { tier: "warmup", label: "Côtés, diagonales, diamètres", make: (r) => {
      const kind = r();
      if (kind < 0.5) { const p = pick(r, [["un quadrilatère", 4], ["un pentagone", 5], ["un hexagone", 6]]); return { prompt: `Combien de côtés a ${p[0]} ?`, answer: p[1], solution: `${p[0]} a **${p[1]} côtés** (et autant de sommets).` }; }
      const rr = randint(r, 2, 9); return { prompt: `Un cercle a un rayon de ${rr} cm. Quel est son diamètre ?`, answer: 2 * rr, solution: `$2 \\times ${rr} = $ **${2 * rr} cm** — le diamètre traverse par le centre.` };
    } },
  ],
};

export default [solidsNets, planeFigures];
