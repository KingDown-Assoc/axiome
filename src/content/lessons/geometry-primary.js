// Field "Geometry" — PRIMARY module (CP year): solids described by their faces, plane figures with
// vertices/sides, alignments and the ruler. Official cycle-2 programme.
import { randint, pick } from "../../core/exercises.js";

// — Solids at CP: recognize, describe by faces, build (programme: les solides) —
const solidsCp = {
  id: "geometry.primary.solids-faces",
  level: "primary", domain: "geometry",
  title: "Cube, pavé, et leurs faces",
  tagline: "Décrire un solide par ses faces — et les assembler pour le construire.",
  prereqs: ["geometry.preschool.solids"],
  intuition:
    "Tu reconnais déjà le cube, la boule, le cône, le cylindre et le pavé. Au CP, on apprend à les **décrire** : le mot-clé est **face**.\n\nUn **cube** a **6 faces**, toutes **carrées** (regarde un dé). Un **pavé** a **6 faces** aussi, mais en **rectangle** (regarde une boîte à chaussures). Et on peut les **construire** : six faces bien choisies, assemblées, et le solide apparaît.",
  depths: {
    discovery:
      "**Avec les mains** : je trie (« est-ce un cube ? » → deux groupes), je classe (les cubes, les pavés, les cylindres, les boules, les autres), je construis un cube en assemblant six faces carrées.",
    standard:
      "**En image** : je décris : « ce solide a 6 faces, toutes carrées → c'est un **cube** » ; « 6 faces en rectangle → un **pavé** ». L'empreinte de la maternelle devient un argument : la face **est** la forme plate qu'elle tamponne.",
    advanced:
      "**Dans la tête** : au CP, on classe **à l'œil** — le cube et le pavé font deux groupes séparés. Mais un secret t'attend : un jour, on dira que le cube **est** un pavé particulier (toutes ses faces rectangles sont devenues des carrés)… exactement comme le carré est un rectangle particulier. Les familles de la géométrie s'emboîtent.",
  },
  keyIdea: "On décrit un solide par ses **faces** : cube = 6 faces carrées ; pavé = 6 faces en rectangle.",
  why:
    "Pourquoi décrire par les faces plutôt que dire « ça ressemble à une boîte » ? Parce que « ressembler » dépend de l'œil de chacun, alors que « 6 faces carrées » se **vérifie** — n'importe qui, n'importe où, conclura pareil. Décrire par des propriétés, c'est le début de la preuve.",
  examples: [
    { title: "Décrire pour identifier", steps: [
      { p: "Mystère : 6 faces, toutes carrées, mêmes longueurs partout." },
      { p: "C'est un **cube** — la description suffit, pas besoin de le voir." },
    ] },
    { title: "Dans la maison", steps: [
      { p: "La boîte à chaussures ? Un **pavé**. La boîte de conserve ? Un **cylindre**. La balle de tennis ? Une **boule**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle forme ont les faces d'un cube ? Combien y en a-t-il ?", solution: "**6 faces**, toutes **carrées** — comme sur un dé." },
    { tier: "warmup", prompt: "Une boîte à chaussures a la forme de quel solide ?", solution: "Un **pavé** : 6 faces en rectangle." },
    { tier: "application", prompt: "Je veux construire un cube en assemblant des faces. Combien m'en faut-il, et lesquelles ?", solution: "**6 faces carrées**, toutes identiques." },
    { tier: "challenge", prompt: "Trier « est-ce un pavé ? » et classer les solides en familles : quelle différence ?", solution: "**Trier** : une règle, deux groupes (pavés / pas pavés). **Classer** : plusieurs familles (cubes, pavés, cylindres, boules…) — les mots du cycle 1, toujours valables." },
    { tier: "exam", prompt: "Pourquoi dira-t-on plus tard qu'un cube est un pavé particulier ?", solution: "Parce que ses 6 faces en rectangle sont **devenues des carrés** (le carré est un rectangle spécial). Au CP on les classe à l'œil dans deux groupes ; plus tard, les familles s'emboîteront." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les faces", make: (r) => {
      const s = pick(r, [["un cube", 6, "toutes carrées"], ["un pavé", 6, "en rectangle"]]);
      return { prompt: `Combien de faces a ${s[0]} ?`, answer: s[1], solution: `${s[0]} a **${s[1]} faces**, ${s[2]}.` };
    } },
  ],
};

// — Plane figures: vertices, sides, alignments, the ruler (programme: la géométrie plane) —
const figuresCp = {
  id: "geometry.primary.figures",
  level: "primary", domain: "geometry",
  title: "Sommets, côtés et la règle",
  tagline: "Décrire les figures avec les bons mots — et tracer avec le bon outil.",
  prereqs: ["geometry.preschool.shapes", "geometry.preschool.assemble"],
  intuition:
    "Les formes de la maternelle gagnent leurs mots de grands : les pointes s'appellent des **sommets**, les bords droits des **côtés**. Un triangle : 3 sommets, 3 côtés. Un carré : 4 côtés **de même longueur**.\n\nEt un nouvel outil entre en scène pour de bon : la **règle** — pour vérifier des alignements et pour tracer droit.",
  depths: {
    discovery:
      "**Avec les mains** : dans la cour, j'aligne des plots ; sur la feuille, je trace avec gabarits et pochoirs, puis à la règle — d'abord à main levée, ensuite proprement.",
    standard:
      "**En image** : je décris et je justifie : « c'est un carré : 4 côtés, tous de même longueur ». Dans un assemblage, je repère les figures : « deux triangles forment un rectangle », « un triangle est dans le carré, deux de ses sommets sont des sommets du carré ». Sur quadrillage, je complète un rectangle dont deux côtés sont déjà tracés.",
    advanced:
      "**Dans la tête** : trois points ont l'air alignés ? L'œil hésite, la **règle tranche** : si elle passe par les trois, c'est aligné. Les mots point, droite, segment s'installent en situation. Et une régularité à remarquer : un polygone a toujours **autant de sommets que de côtés** — compte, ça ne rate jamais.",
  },
  keyIdea: "**Sommet** = la pointe, **côté** = le bord droit. La règle vérifie les alignements et trace les segments.",
  why:
    "Pourquoi justifier (« 4 côtés de même longueur ») au lieu de juste nommer (« c'est un carré ») ? Parce que la justification marche aussi quand la figure est penchée, petite, ou mal dessinée — le nom s'appuie sur l'œil, la propriété s'appuie sur les faits.",
  examples: [
    { title: "Justifier un carré", steps: [
      { p: "Je compte : 4 côtés, 4 sommets." },
      { p: "Je vérifie : les 4 côtés ont la même longueur → c'est un **carré**, et je sais dire pourquoi." },
    ] },
    { title: "Alignés ou pas ?", steps: [
      { p: "Trois croix sur la feuille, l'œil hésite." },
      { p: "Je pose la règle : elle passe par les trois → **alignés**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de sommets et de côtés a un triangle ?", solution: "**3 sommets et 3 côtés** — toujours autant l'un que l'autre." },
    { tier: "warmup", prompt: "Le carré a 4 côtés. Que peut-on dire de leurs longueurs ?", solution: "Elles sont **toutes égales** — c'est ce qui distingue le carré du rectangle." },
    { tier: "application", prompt: "Dans un assemblage, deux triangles identiques collés peuvent former quel quadrilatère ?", solution: "Un **rectangle** (ou un carré) : les figures se cachent dans les assemblages." },
    { tier: "challenge", prompt: "Comment vérifier que trois points sont alignés quand l'œil hésite ?", solution: "Avec la **règle** : si son bord passe par les trois points, ils sont alignés." },
    { tier: "exam", prompt: "Un polygone a 5 côtés. Combien a-t-il de sommets, sans le voir ?", solution: "**5** : dans un polygone, il y a toujours autant de sommets que de côtés." },
  ],
  practice: [
    { tier: "warmup", label: "Sommets et côtés", make: (r) => {
      const f = pick(r, [["un triangle", 3], ["un carré", 4], ["un rectangle", 4]]);
      const q = r() < 0.5 ? "sommets" : "côtés";
      return { prompt: `Combien de ${q} a ${f[0]} ?`, answer: f[1], solution: `${f[0]} a **${f[1]} ${q}** (autant de sommets que de côtés).` };
    } },
  ],
};

export default [solidsCp, figuresCp];
