// Field "Geometry" — PRESCHOOL module (shapes, space) + one middle-school lesson (transition).
import { randint, pick } from "../../core/exercises.js";
const shapes = {
  id: "geometry.preschool.shapes",
  level: "preschool", domain: "geometry",
  title: "Reconnaître les formes",
  tagline: "Disque, carré, triangle, rectangle : les voir et les nommer.",
  prereqs: [],
  intuition:
    "Les objets ont des formes. Une assiette, une roue : c'est **rond** — en maths, on dit un **disque**. Une fenêtre : souvent un **carré** ou un **rectangle**. Un toit, une part de pizza : un **triangle**.\n\nPour reconnaître une forme, on regarde ses **côtés** (les bords droits) et ses **coins** (les pointes).",
  depths: {
    discovery: "Disque = tout rond, sans coin. Triangle = 3 côtés. Carré et rectangle = 4 côtés et des coins droits.",
    standard: "On classe les formes planes par le **nombre de côtés** et la nature des **angles**. Le carré a 4 côtés égaux et 4 angles droits ; le rectangle a aussi 4 angles droits mais des côtés deux à deux égaux ; le disque n'a ni côté ni coin.\n\nEt attention à l'orientation : un carré posé **sur la pointe** est toujours un carré — tourner une forme ne la change pas.",
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
    { tier: "discovery", prompt: "Quelle forme n'a aucun coin ?", solution: "Le **disque**." },
    { tier: "application", prompt: "Je tourne un carré pour le poser sur la pointe. Est-ce encore un carré ?", solution: "**Oui** : tourner une forme ne la change pas — ses 4 côtés égaux et ses 4 coins droits sont toujours là." },
    { tier: "warmup", prompt: "Combien de côtés a un carré ?", solution: "**4**." },
    { tier: "challenge", prompt: "Une forme a 3 côtés et 3 coins. Laquelle ?", solution: "Un **triangle**." },
    { tier: "exam", prompt: "Pourquoi peut-on dire qu'un carré est un rectangle particulier ?", solution: "Le rectangle a 4 angles droits ; le carré aussi, **et** ses 4 côtés sont égaux. Le carré est donc un rectangle « spécial »." },
  ],
  practice: [
    { tier: "application", label: "Compter les côtés", make: (r) => { const data = [["un triangle", 3], ["un carré", 4], ["un rectangle", 4], ["un disque", 0]]; const [nom, n] = data[Math.floor(r() * data.length)]; return { prompt: `Combien de côtés a ${nom} ?`, answer: n, solution: n === 0 ? `${nom} n'a **aucun** côté droit.` : `${nom} a **${n}** côtés.` }; } },
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

// — Grid coordinates (preschool) —
const gridLocation = {
  id: "geometry.preschool.grid",
  level: "preschool", domain: "geometry",
  title: "Se repérer sur un quadrillage",
  prereqs: ["geometry.preschool.position", "numbers.preschool.count"],
  tagline: "Trouver une case avec sa colonne et sa ligne.",
  intuition:
    "Un quadrillage, c'est une grille de cases, comme sur une feuille à carreaux ou à la bataille navale. Pour dire **où** se trouve une case, on donne deux repères : la **colonne** (on compte de gauche à droite) et la **ligne** (on compte de haut en bas). Avec ces deux nombres, on retrouve toujours la bonne case.",
  depths: {
    discovery:
      "On lit une case en deux temps :\n\n1. la **colonne** — on compte les cases de gauche → droite ;\n2. la **ligne** — on compte les cases de haut → bas.\n\nLa case « colonne $2$, ligne $1$ » est la $2^e$ case de la rangée du haut.",
    standard:
      "L'ordre compte : on dit toujours la colonne **puis** la ligne. « Colonne $3$, ligne $2$ » et « colonne $2$, ligne $3$ » ne désignent pas la même case.\n\nDeux cases sont **voisines** quand elles se touchent par un côté : leur colonne ou leur ligne change de $1$.",
    advanced:
      "Donner deux nombres pour repérer un point, c'est l'idée des **coordonnées** : plus tard, le couple $(x\\,;y)$ repérera un point dans le plan, avec un axe horizontal et un axe vertical.",
  },
  keyIdea: "Une case se repère par sa **colonne** (← →) puis sa **ligne** (↑ ↓).",
  why:
    "Pourquoi deux nombres, et pas un seul ? Parce qu'un seul ne suffit pas à se repérer sur une surface : il faut dire à la fois de combien on avance et de combien on descend. C'est ce qui évite de se tromper de case.",
  widgets: [
    { kind: "geometry", params: {
      height: 240,
      points: [{ id: "p", x: 60, y: 60, label: "●" }],
      readout: (pos) => { const p = pos.p || { x: 0, y: 0 }; const col = Math.floor(p.x / 40) + 1; const row = Math.floor(p.y / 40) + 1; return `Tu es sur la colonne ${col}, ligne ${row}.`; },
    }, caption: "Déplace le point : on lit sa colonne, puis sa ligne." },
  ],
  examples: [
    { title: "Trouver une case", steps: [
      { p: "On cherche la case « colonne $3$, ligne $2$ »." },
      { p: "Je compte 3 cases vers la droite, puis 2 cases vers le bas." },
      { p: "C'est la bonne case." },
    ] },
    { title: "Nommer une case", steps: [
      { p: "Un jeton est sur la $2^e$ colonne et la $1^{re}$ ligne." },
      { p: "On dit : « colonne $2$, ligne $1$ »." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour nommer une case sur un quadrillage, par quoi commence-t-on ?", solution: "Par la **colonne** (de gauche à droite), puis la ligne." },
    { tier: "warmup", prompt: "Où se trouve la case « colonne 1, ligne 1 » ?", solution: "Tout en **haut à gauche**." },
    { tier: "application", prompt: "Une fourmi est colonne $2$, ligne $3$. Elle descend d'une case. Où arrive-t-elle ?", solution: "La ligne augmente de 1 → colonne $2$, **ligne $4$**." },
    { tier: "challenge", prompt: "« Colonne 3, ligne 2 » et « colonne 2, ligne 3 » : est-ce la même case ?", solution: "**Non** : changer l'ordre colonne-ligne change la case." },
    { tier: "exam", prompt: "Un trésor est colonne $4$, ligne $2$. Tu es colonne $4$, ligne $5$. Combien de cases monter ?", solution: "De la ligne $5$ à la ligne $2$ : **3** cases vers le haut." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les cases", make: (r) => { const c = randint(r, 2, 3); const l = randint(r, 2, 3); return { prompt: `Un quadrillage a ${c} colonnes et ${l} lignes. Combien de cases en tout ?`, answer: c * l, solution: `On compte toutes les cases : ${c * l}.` }; } },
  ],
};

const solids = {
  id: "geometry.preschool.solids",
  level: "preschool", domain: "geometry",
  title: "Reconnaître les solides",
  tagline: "Cube, boule, cylindre, cône : les objets qui tiennent dans la main.",
  prereqs: ["geometry.preschool.shapes"],
  intuition:
    "Une forme dessinée sur une feuille est **plate**. Mais les vrais objets, eux, ont du **volume** : on peut les tenir dans la main, les poser, les faire rouler. Ce sont des **solides**.\n\nUn dé est un **cube**, une boîte de chaussures est un **pavé**, un ballon est une **boule**, une boîte de conserve est un **cylindre**, un chapeau de fête est un **cône**, et les monuments d'Égypte sont des **pyramides**.",
  depths: {
    discovery:
      "**Avec les mains** : six solides à connaître — le **cube** (un dé), le **pavé** (une boîte de chaussures), la **boule** (toute ronde), le **cylindre** (une boîte de conserve), le **cône** (un chapeau de fête) et la **pyramide** (des faces en triangle, une pointe).",
    standard:
      "**En image** : un solide a des **faces** (ses côtés plats), des **arêtes** (les bords) et des **sommets** (les coins). Trempe une face dans la peinture et tamponne : le cube laisse un **carré**, le pavé un **rectangle**, le cylindre posé debout un **disque** — l'**empreinte** d'un solide est une forme plate !\n\nUn solide **roule** s'il a une partie ronde (boule, cylindre, cône). Le cube, le pavé et la pyramide n'ont que des faces plates : ils ne roulent pas.",
    advanced:
      "**Dans la tête** : un solide est un objet de l'**espace** (trois dimensions). Cube, pavé et pyramide n'ont que des faces plates : ce sont des **polyèdres**. Et méfiance — une même empreinte peut venir de **plusieurs** solides : le cylindre et le cône laissent tous deux un **disque**. L'empreinte ne dit pas tout ; plus tard, on comptera sommets, arêtes et faces, toujours liés entre eux.",
  },
  keyIdea: "Un solide a un **volume** : on peut le tenir. Ses faces plates sont des **formes** qu'on connaît déjà.",
  why:
    "Pourquoi une boule roule-t-elle et pas un cube ? Parce que la boule est **ronde partout** : elle ne s'appuie jamais sur un côté plat. Le cube, lui, se pose sur une **face plate** et reste immobile. C'est la présence (ou non) d'une partie ronde qui décide.",
  widgets: [
    { kind: "solids", params: {}, caption: "Touche chaque solide pour le nommer et voir à quoi il ressemble." },
  ],
  examples: [
    { title: "Ça roule ou pas ?", steps: [
      { p: "Le cube n'a que des faces **plates** → il se pose et ne roule pas." },
      { p: "La boule est **ronde partout** → elle roule dans tous les sens." },
    ] },
    { title: "La face d'un cube", steps: [
      { p: "Je regarde une face du dé : c'est un **carré**." },
      { p: "Un solide est donc fait de formes plates qu'on connaît." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel solide est tout rond et roule dans tous les sens ?", solution: "La **boule**." },
    { tier: "warmup", prompt: "À quel solide ressemble une boîte de conserve ?", solution: "Un **cylindre**." },
    { tier: "application", prompt: "Combien de faces a un cube ?", solution: "**6** faces, toutes carrées (comme un dé)." },
    { tier: "application", prompt: "À quel solide ressemble une boîte de chaussures ?", solution: "Un **pavé** : 6 faces en rectangle." },
    { tier: "challenge", prompt: "Pourquoi un cube ne roule-t-il pas ?", solution: "Il n'a que des faces **plates** : il s'appuie sur une face et reste immobile, sans partie ronde." },
    { tier: "challenge", prompt: "Je trempe une face d'un pavé dans la peinture et je tamponne. Quelle forme apparaît ?", solution: "Un **rectangle** : l'empreinte d'une face plate est une forme plane." },
    { tier: "exam", prompt: "La face d'un cube, c'est quelle forme plate ?", solution: "Un **carré** — on retrouve les formes de la leçon précédente." },
    { tier: "exam", prompt: "Je vois une empreinte en forme de disque. Quels solides ont pu la laisser ?", solution: "Le **cylindre** ou le **cône** (posés sur leur face ronde) : une même empreinte peut venir de plusieurs solides." },
  ],
  practice: [
    { tier: "warmup", label: "Ça roule ?", make: (r) => {
      const data = [["un cube", "non"], ["un pavé", "non"], ["une boule", "oui"], ["un cylindre", "oui"], ["un cône", "oui"], ["une pyramide", "non"]];
      const [nom, ans] = data[Math.floor(r() * data.length)];
      return {
        prompt: `Est-ce que ${nom} roule ? (oui / non)`,
        answer: ans,
        check: { type: "exact" },
        solution: ans === "oui" ? `Oui : ${nom} a une partie **ronde**.` : `Non : ${nom} n'a que des faces **plates**.`,
      };
    } },
  ],
};

// — Reproducing assemblies: puzzles, pavings, constructions (programme: reproduire des assemblages) —
const assemble = {
  id: "geometry.preschool.assemble",
  level: "preschool", domain: "geometry",
  title: "Assembler des formes",
  tagline: "Reproduire un modèle : un puzzle, un pavage, une construction.",
  prereqs: ["geometry.preschool.shapes"],
  intuition:
    "Avec quelques formes, on fabrique des **images** : un carré, un triangle posé dessus — et voilà une **maison**. Reproduire un modèle, c'est un jeu de puzzle : trouver **quelles** pièces il faut, **où** les poser, et dans **quel sens**.\n\nLe secret des puzzles : si une pièce ne rentre pas, on a le droit de la **tourner** et de la **retourner**.",
  depths: {
    discovery:
      "**Avec les mains** : encastrer, empiler, poser des pièces sur un modèle. Si ça ne rentre pas : je **tourne** la pièce, je la **retourne**, j'essaie une autre place.",
    standard:
      "**En image** : pour reproduire un modèle, je le lis pièce par pièce — *quelle* forme, *où*, dans *quel sens*. Je commence par une pièce facile à repérer (le toit !) puis je complète autour. À la fin, je **compare** au modèle : rien ne manque, rien ne dépasse.",
    advanced:
      "**Dans la tête** : une même figure peut se construire de **plusieurs façons** — deux triangles collés font un carré, ou un grand triangle. Et le modèle n'est pas toujours à la taille de mes pièces : ce qui compte, c'est la **disposition des formes**, pas la taille. C'est aussi l'âge où l'on commence à tracer ses propres figures **à la règle**.",
  },
  keyIdea: "Reproduire un assemblage = trouver **quelles** pièces, **où**, et dans **quel sens** — quitte à tourner et retourner.",
  why:
    "Pourquoi a-t-on le droit de tourner les pièces ? Parce qu'une forme reste **la même** dans toutes les orientations — l'invariance vue avec les formes. C'est elle qui autorise tous les essais du puzzle : on peut manipuler sans rien casser.",
  widgets: [
    { kind: "assembly", params: { figure: "house" }, caption: "Touche chaque pièce de la maison : de quelles formes est-elle faite ?" },
    { kind: "assembly", params: { figure: "rocket" }, caption: "Et cette fusée ? Compte ses pièces et nomme chaque forme." },
  ],
  examples: [
    { title: "Lire la maison", steps: [
      { p: "Je repère la pièce la plus simple : le toit est un **triangle**." },
      { p: "Dessous, le mur est un **carré** ; la porte, un **rectangle**." },
      { p: "3 pièces, chacune à sa place : le modèle est lu, je peux le reproduire." },
    ] },
    { title: "Deux triangles, deux figures", steps: [
      { p: "Je colle deux triangles identiques par leur grand côté : un **carré** !" },
      { p: "Je les colle autrement : un **grand triangle**. Mêmes pièces, autre assemblage." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une pièce de puzzle ne rentre pas. Qu'ai-je le droit de faire ?", solution: "La **tourner** et la **retourner** : une forme ne change pas quand on la manipule." },
    { tier: "warmup", prompt: "Une maison dessinée : un carré, un triangle posé dessus, un rectangle pour la porte. Combien de pièces ?", solution: "**3** pièces : carré, triangle, rectangle." },
    { tier: "application", prompt: "Mon modèle a 5 pièces ; j'en ai déjà posé 3. Combien en reste-t-il à poser ?", solution: "**2** : je compare au modèle pour voir ce qui manque." },
    { tier: "challenge", prompt: "Avec deux triangles identiques, quelles figures peut-on assembler ?", solution: "Collés par le grand côté : un **carré**. Autrement : un **grand triangle**. Mêmes pièces, plusieurs figures !" },
    { tier: "exam", prompt: "Le modèle est dessiné en petit, mes pièces sont grandes. Puis-je quand même le reproduire ?", solution: "**Oui** : ce qui compte, c'est quelles formes s'assemblent et comment — pas la taille du modèle." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les pièces", make: (r) => {
      const t = randint(r, 1, 4), c = randint(r, 1, 4);
      return { prompt: `Mon assemblage contient ${t} triangle(s) et ${c} carré(s). Combien de pièces en tout ?`, answer: t + c, solution: `${t} et ${c}, ça fait **${t + c}** pièces.` };
    } },
  ],
};

export default [shapes, solids, assemble, positionLesson, gridLocation, pythagoras];
