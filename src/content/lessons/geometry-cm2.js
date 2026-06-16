// Field "Geometry" — PRIMARY module (CM2 year): new reference figures (trapèze,
// trapèze rectangle, pentagone, hexagone) with their properties; construction
// programs ELABORATED by the pupil; symmetry across a DIAGONAL grid axis (the
// row↔column exchange); and cube nets — recognised and constructed. Official
// cycle-3 programme (2025), crossed with Singapore P5.
import { randint, pick } from "../../core/exercises.js";

// — New figures and construction programs (programme: trapèze, pentagone, hexagone, élaborer) —
const polygonsCm2 = {
  id: "geometry.primary.polygons-cm2",
  level: "primary", domain: "geometry",
  title: "Trapèzes, pentagones, hexagones",
  tagline: "De nouveaux polygones, et des programmes de construction à écrire soi-même.",
  prereqs: ["geometry.primary.perp-parallel"],
  intuition:
    "Trois figures rejoignent la galerie : le **trapèze** (un quadrilatère avec **au moins une paire de côtés parallèles**), le **pentagone** (5 côtés) et l'**hexagone** (6 côtés). Le trapèze **rectangle** ajoute deux angles droits.\n\nEt un renversement : au CM1 tu **suivais** les programmes de construction ; au CM2 tu les **écris** — dire une figure assez précisément pour qu'un camarade la trace sans la voir.",
  depths: {
    discovery:
      "**Avec les mains** : coupe un rectangle en biais (un seul coup de ciseaux non parallèle aux côtés) — il reste deux côtés parallèles : un **trapèze**. La famille des parallèles se hiérarchise : deux paires (le rectangle, le losange…), ou une seule (le trapèze).",
    standard:
      "**En image** : les propriétés trient la galerie — le rectangle a ses deux paires de côtés opposés parallèles et égaux ; le trapèze n'en garantit qu'**une** ; le trapèze rectangle y ajoute deux angles droits (sur un même côté). Pentagone et hexagone se nomment au comptage des côtés — l'hexagone **régulier** (côtés et angles tous égaux) pave le plan, demande aux abeilles.",
    advanced:
      "**Dans la tête** : écrire un programme de construction est un exercice d'**algorithme** — chaque instruction doit être exécutable sans deviner : « Trace un rectangle ABCD tel que AB = 5 cm et BC = 3 cm. Trace le cercle de centre A passant par le milieu du côté [AB]. » Ordre des étapes, mesures explicites, points nommés : si deux camarades obtiennent deux figures différentes, le programme — pas eux — a fauté. La précision du langage devient une vertu mathématique.",
  },
  keyIdea: "Trapèze : **au moins une paire** de côtés parallèles. Un programme de construction réussi : n'importe qui obtient la **même** figure.",
  why:
    "Pourquoi apprendre à écrire des programmes de construction ? Parce que c'est la répétition générale de la **démonstration** : décrire sans ambiguïté, ordonner ses étapes, nommer ses objets. Le collège demandera de prouver ; le CM2 apprend déjà à dire exactement — la rigueur commence par le vocabulaire.",
  examples: [
    { title: "Trier un quadrilatère", steps: [
      { p: "Une seule paire de côtés parallèles, et deux angles droits sur le côté gauche." },
      { p: "C'est un **trapèze rectangle** — la propriété nomme la figure." },
    ] },
    { title: "Écrire un programme", steps: [
      { p: "« Trace un carré ABCD de 4 cm de côté. Trace le cercle de centre A passant par C. »" },
      { p: "Deux instructions, zéro ambiguïté : tout exécutant obtient la même figure." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qu'un trapèze ? Et un trapèze rectangle ?", solution: "Un quadrilatère avec **au moins une paire de côtés parallèles** ; le trapèze **rectangle** possède en plus **deux angles droits**." },
    { tier: "warmup", prompt: "Combien de côtés ont le pentagone et l'hexagone ?", solution: "Pentagone : **5** ; hexagone : **6** — le grec compte pour nous (*penta*, *hexa*)." },
    { tier: "application", prompt: "Un rectangle est-il un trapèze ? Justifie.", solution: "**Oui** : il possède au moins une paire de côtés parallèles (il en a même deux !) — les définitions par « au moins » emboîtent les familles." },
    { tier: "challenge", prompt: "Écris un programme de construction pour : un rectangle ABCD avec AB = 5 cm et BC = 3 cm, puis le cercle de centre A passant par le milieu de [AB].", solution: "« 1) Trace un segment [AB] de 5 cm. 2) En B, trace la perpendiculaire à (AB) ; place C à 3 cm. 3) Complète le rectangle ABCD. 4) Place M, milieu de [AB] (à 2,5 cm de A). 5) Trace le cercle de centre A passant par M. » — chaque étape exécutable sans deviner." },
    { tier: "exam", prompt: "Deux camarades exécutent le même programme et obtiennent des figures différentes. Qui est en faute, et que vérifier ?", solution: "Le **programme** : une instruction ambiguë (mesure absente, point non nommé, ordre flou) a permis deux lectures. Vérifier que chaque étape n'a qu'**une** exécution possible — c'est le critère de réussite d'un programme." },
  ],
  practice: [
    { tier: "warmup", label: "Nommer au comptage", make: (r) => {
      const q = pick(r, [["5 côtés", "pentagone"], ["6 côtés", "hexagone"], ["4 côtés dont au moins deux parallèles", "trapèze"], ["3 côtés", "triangle"]]);
      return { prompt: `Comment s'appelle un polygone à ${q[0]} ?`, answer: q[1], check: { type: "exact" }, solution: `C'est un **${q[1]}**.` };
    } },
    { tier: "application", label: "Compter sur les figures", make: (r) => {
      const q = pick(r, [["pentagone", "sommets", 5], ["hexagone", "sommets", 6], ["hexagone", "côtés", 6], ["pentagone", "côtés", 5]]);
      return { prompt: `Combien de ${q[1]} possède un ${q[0]} ?`, answer: q[2], solution: `Un ${q[0]} : **${q[2]} ${q[1]}** — autant que de côtés.` };
    } },
  ],
};

// — Symmetry across a diagonal axis (programme: droite verticale, horizontale OU diagonale) —
const symmetryDiagonal = {
  id: "geometry.primary.symmetry-diagonal",
  level: "primary", domain: "geometry",
  title: "La symétrie en diagonale",
  tagline: "L'axe se penche à 45° — et les cases échangent leurs rôles.",
  prereqs: ["geometry.primary.symmetry"],
  intuition:
    "Au CM1, l'axe était sage : horizontal ou vertical. Au CM2, il se penche : la **diagonale du quadrillage**. La règle d'or ne change pas — même distance, perpendiculairement, de l'autre côté — mais le comptage des cases prend un tour nouveau.\n\nLe secret de la diagonale : les déplacements **s'échangent** — un point à « 3 cases à droite » de l'axe se reflète à « 3 cases au-dessus ». Droite ↔ haut : le miroir penché permute les directions.",
  depths: {
    discovery:
      "**Avec les mains** : plie le quadrillage le long d'une diagonale — les lignes horizontales tombent **sur** les lignes verticales ! Le pliage révèle l'échange : ce qui allait vers la droite va maintenant vers le haut.",
    standard:
      "**En image** : pour construire le symétrique d'un sommet, lis son adresse **depuis l'axe** — « 2 cases dans le sens de l'axe, puis 3 cases perpendiculairement » — et reporte de l'autre côté : les 3 cases perpendiculaires basculent dans l'autre direction. Sommet par sommet, on relie : la figure réapparaît, **pivotée d'un quart de tour en apparence** — c'est l'effet visuel du miroir à 45°.",
    advanced:
      "**Dans la tête** : vérification souveraine — le **pliage** (ou le calque retourné le long de l'axe) doit superposer figure et image exactement. Et les points **sur** la diagonale restent fixes, comme toujours. La symétrie diagonale prépare un grand classique du collège : dans un repère, le miroir penché échange les deux coordonnées — tu viens d'en faire l'expérience avec des cases.",
  },
  keyIdea: "Axe diagonal : les déplacements **perpendiculaires à l'axe basculent** de l'autre côté — sur quadrillage, « vers la droite » devient « vers le haut ».",
  why:
    "Pourquoi la figure semble-t-elle tourner alors qu'on ne fait que la refléter ? Parce que le miroir penché à 45° échange horizontal et vertical — l'œil lit cet échange comme une rotation. C'est une illusion instructive : symétrie et rotation sont des transformations **différentes** (le pliage superpose, le tourné non — vérifie avec une figure asymétrique comme un L).",
  examples: [
    { title: "Refléter un sommet", steps: [
      { p: "Le sommet est à 3 cases de l'axe diagonal, du côté droit, perpendiculairement." },
      { p: "Son image : à **3 cases de l'autre côté**, perpendiculairement — le pliage les superpose." },
    ] },
    { title: "Le L qui bascule", steps: [
      { p: "Un L collé sous la diagonale, je reflète sommet par sommet." },
      { p: "Le L réapparaît **couché** au-dessus — l'échange droite ↔ haut a tout basculé." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que deviennent les lignes horizontales du quadrillage quand on plie le long d'une diagonale ?", solution: "Elles tombent sur les lignes **verticales** — la diagonale échange les deux directions : c'est tout le secret de cette symétrie." },
    { tier: "warmup", prompt: "Un sommet est à 4 cases de l'axe diagonal (perpendiculairement). Où est son symétrique ?", solution: "À **4 cases de l'autre côté** de l'axe, perpendiculairement — la règle d'or ne change jamais, seul l'axe a pivoté." },
    { tier: "application", prompt: "Que devient un point situé exactement sur la diagonale ?", solution: "Il **ne bouge pas** — sur l'axe, chaque point est son propre reflet, diagonale ou non." },
    { tier: "challenge", prompt: "Comment vérifier qu'une construction de symétrique diagonal est juste ?", solution: "Par **pliage** le long de la diagonale (ou calque retourné sur l'axe) : figure et image doivent se **superposer exactement** — le juge de paix de toutes les symétries." },
    { tier: "exam", prompt: "Après une symétrie diagonale, Zoé dit : « la figure a tourné d'un quart de tour ». A-t-elle raison ?", solution: "**Non** — l'effet visuel y ressemble, mais le miroir **retourne** : avec une figure asymétrique (un L), le symétrique est le L *retourné*, pas le L *tourné* — le pliage superpose l'un, pas l'autre. Symétrie ≠ rotation." },
  ],
  practice: [
    { tier: "warmup", label: "La distance bascule", make: (r) => {
      const d = randint(r, 1, 6);
      return { prompt: `Un sommet est à ${d} case${d > 1 ? "s" : ""} de l'axe diagonal, perpendiculairement. À quelle distance (en cases) se trouve son symétrique, de l'autre côté ?`, answer: d, solution: `Même distance : **${d} case${d > 1 ? "s" : ""}** — perpendiculairement à l'axe, de l'autre côté.` };
    } },
  ],
};

// — Cube nets (programme: reconnaître et construire un patron du cube) —
const cubeNets = {
  id: "geometry.primary.cube-nets",
  level: "primary", domain: "geometry",
  title: "Les patrons du cube",
  tagline: "Quels assemblages de six carrés se replient bien en cube ?",
  prereqs: ["geometry.primary.solids-nets"],
  intuition:
    "Un **patron** de cube : six carrés attachés, posés à plat, qui se replient en cube sans trou ni recouvrement. Tu sais déjà les reconnaître — au CM2, tu les **construis**.\n\nMais attention : six carrés collés ne font pas toujours un patron ! Le carré 2×3 (six carrés en rectangle) se replie… en écrasant deux faces l'une sur l'autre. La forme des six compte autant que leur nombre.",
  depths: {
    discovery:
      "**Avec les mains** : découpe, plie, scotche — le verdict est immédiat. La fameuse **croix** (quatre carrés en colonne, deux ailes) se referme parfaitement : chaque carré trouve sa face. Le bloc 2×3 échoue : deux carrés se battent pour la même place.",
    standard:
      "**En image** : construire un patron, c'est penser le pliage **avant** de plier — quelle face deviendra le fond ? lesquelles seront les murs ? Le test mental : suivre chaque carré dans sa rotation et vérifier que les six faces du cube (fond, couvercle, quatre murs) sont servies **une fois chacune**. Un patron juste = une bijection entre carrés et faces.",
    advanced:
      "**Dans la tête** : combien de patrons différents pour un cube ? **Onze** — pas un de plus (à retournement et rotation près). Quatre carrés en colonne avec deux ailes mobiles, des escaliers, des T… Onze solutions sur des centaines d'arrangements possibles : un beau problème de dénombrement géométrique, que tu peux explorer aux ciseaux. Le collège fera pareil avec le pavé.",
  },
  keyIdea: "Un patron du cube : **six carrés** dont le pliage sert chaque face **exactement une fois** — la croix marche, le bloc 2×3 échoue.",
  why:
    "Pourquoi le bloc 2×3 échoue-t-il alors qu'il a bien six carrés ? Replie-le mentalement : les carrés d'une même rangée tournent autour du même pli et **s'empilent** sur deux faces seulement — quatre faces restent nues, deux sont doublées. Le nombre ne suffit pas : c'est la **chorégraphie du pliage** qui fait le patron.",
  examples: [
    { title: "Valider la croix", steps: [
      { p: "Quatre carrés en colonne : le fond, deux murs, le couvercle s'enroulent." },
      { p: "Les deux ailes se rabattent sur les murs restants : **six faces, six carrés** ✓." },
    ] },
    { title: "Réfuter le bloc 2×3", steps: [
      { p: "Chaque rangée de trois s'enroule autour des mêmes plis…" },
      { p: "…et **s'empile** : deux faces doublées, quatre nues — pas un patron ✗." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qu'un patron de cube ?", solution: "**Six carrés attachés** à plat qui, repliés, forment le cube **sans trou ni recouvrement** — chaque carré devient exactement une face." },
    { tier: "warmup", prompt: "Le rectangle de 6 carrés (2 × 3) est-il un patron de cube ?", solution: "**Non** : au pliage, les carrés s'empilent sur deux faces et en laissent quatre nues — six carrés ne suffisent pas, il faut la bonne disposition." },
    { tier: "application", prompt: "Décris un patron de cube qui fonctionne.", solution: "La **croix** : quatre carrés en colonne (fond, mur, couvercle, mur) et deux ailes de part et d'autre du deuxième carré (les murs latéraux) — au pliage, chaque face est servie une fois." },
    { tier: "challenge", prompt: "Sur un patron en croix, le fond est le carré central. Où se trouve le couvercle ?", solution: "À **deux carrés du fond dans la colonne** : fond → mur → couvercle — les faces opposées d'un cube sont séparées par une face sur le patron." },
    { tier: "exam", prompt: "Combien existe-t-il de patrons différents du cube (aux rotations et retournements près) ? Comment pourrait-on s'en convaincre ?", solution: "**Onze** — en testant systématiquement les arrangements de six carrés aux ciseaux (ou mentalement), et en éliminant doublons et pliages impossibles : un dénombrement géométrique complet, à la portée d'une après-midi obstinée." },
  ],
  practice: [
    { tier: "application", label: "Le compte des faces", make: (r) => {
      const q = pick(r, [
        ["faces possède un cube (et donc carrés dans son patron)", 6],
        ["arêtes possède un cube", 12],
        ["sommets possède un cube", 8],
        ["patrons différents existent pour le cube", 11],
      ]);
      return { prompt: `Combien de ${q[0]} ?`, answer: q[1], solution: `**${q[1]}** — le cube se connaît par cœur.` };
    } },
  ],
};

export default [polygonsCm2, symmetryDiagonal, cubeNets];
