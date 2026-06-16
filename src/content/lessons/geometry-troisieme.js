// Field "Geometry" — MIDDLE module (3e year), part 1: Thales, trigonometry,
// vectors. Official cycle-4 programme: knowing and applying THALES' theorem,
// its converse and its contrapositive (nested-triangle and butterfly
// configurations); knowing and using the trigonometric lines in the right
// triangle — COSINE, SINE, TANGENT; defining the translation pointwise with the
// parallelogram, defining VECTORS (equal, null, opposite), the SUM of two
// vectors as chained translations, and the CHASLES relation — with Thales'
// history, ruler-and-compass polygons, and Koch/Sierpinski fractals as
// extensions.
import { randint, pick } from "../../core/exercises.js";

// — Thales' theorem (programme: théorème, réciproque, contraposée, papillon) —
const thales = {
  id: "geometry.middle.thales",
  level: "middle", domain: "geometry",
  title: "Le théorème de Thalès",
  tagline: "Des parallèles, des rapports égaux — et une pyramide mesurée par son ombre.",
  prereqs: ["geometry.middle.droite-milieux", "applied.middle.ratio"],
  intuition:
    "Deux droites sécantes en A, coupées par **deux parallèles** : les triangles emboîtés AMN et ABC ont leurs côtés **proportionnels** — $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\nC'est le théorème de **Thalès** : les parallèles fabriquent des rapports égaux — ta droite des milieux en était le cas $\\frac{1}{2}$ ; voici tous les rapports d'un coup.",
  depths: {
    discovery:
      "**Avec les mains** : AM $= 3$, AB $= 5$, AC $= 10$ — si (MN) ∥ (BC), alors $\\dfrac{AN}{10} = \\dfrac{3}{5}$ : $AN = 6$. Le rapport $\\frac{3}{5}$ est le **coefficient de réduction** du grand triangle vers le petit : Thalès est ta quatrième proportionnelle devenue géométrie.",
    standard:
      "**En image** : la configuration **papillon** — les parallèles de part et d'autre du point d'intersection : les deux triangles se font face par le sommet (les ailes), et les rapports tiennent toujours ($\\frac{AM}{AB} = \\frac{AN}{AC}$ avec M, N **de l'autre côté**). Et le trio logique de 4e s'applique : la **réciproque** (rapports égaux **et points alignés dans le bon ordre** ⟹ parallèles) certifie le parallélisme ; la **contraposée** (rapports inégaux ⟹ pas parallèles) l'exclut.",
    advanced:
      "**Dans la tête** : la légende fondatrice — Thalès de Milet (vers -600), défié de mesurer la Grande Pyramide, planta un bâton : *quand l'ombre du bâton égale sa hauteur, l'ombre de la pyramide égale la sienne* — les rayons du soleil, parallèles, découpent des triangles emboîtés, et le rapport fait le reste. Mesurer l'inaccessible par les rapports : c'est le geste que la trigonométrie va industrialiser — et l'ironie de l'histoire : hors de France, ce théorème porte d'autres noms (« théorème d'intersection » en Allemagne, « basic proportionality theorem » ailleurs) — les mathématiques sont universelles, leurs baptêmes non.",
  },
  keyIdea: "Parallèles sur deux sécantes : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$ (emboîtés ou papillon). Réciproque : rapports égaux + bon ordre ⟹ **parallèles** ; contraposée : rapports inégaux ⟹ pas parallèles.",
  why:
    "Pourquoi Thalès est-il le théorème de la mesure indirecte ? Parce qu'il échange une longueur **inaccessible** contre un rapport **mesurable** : la hauteur de la pyramide contre l'ombre d'un bâton, la largeur d'un fleuve contre quelques pas sur la rive. Trois longueurs prises au sol, une division — et l'inaccessible tombe. Toute la cartographie ancienne a vécu de ce troc.",
  examples: [
    { title: "Triangles emboîtés", steps: [
      { p: "(MN) ∥ (BC), AM $= 3$, AB $= 5$, AC $= 10$ : $\\dfrac{AN}{AC} = \\dfrac{AM}{AB} = \\dfrac{3}{5}$." },
      { p: "$AN = \\dfrac{3 \\times 10}{5} = $ **6** — la quatrième proportionnelle, version géométrie." },
    ] },
    { title: "Certifier des parallèles", steps: [
      { p: "$\\dfrac{AM}{AB} = \\dfrac{2}{6} = \\dfrac{1}{3}$ et $\\dfrac{AN}{AC} = \\dfrac{3}{9} = \\dfrac{1}{3}$ — rapports égaux, points dans le même ordre." },
      { p: "**Réciproque** de Thalès : (MN) ∥ (BC) — le parallélisme certifié par le calcul." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans la configuration emboîtée ((MN) ∥ (BC)), écris les trois rapports égaux de Thalès.", solution: "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$ — petit triangle sur grand triangle, côté par côté : le coefficient de réduction est partout le même." },
    { tier: "warmup", prompt: "(MN) ∥ (BC), AM $= 3$, AB $= 5$, AC $= 10$ : calcule AN.", solution: "$\\dfrac{AN}{10} = \\dfrac{3}{5}$ → $AN = \\dfrac{3 \\times 10}{5} = $ **6** — Thalès, c'est la quatrième proportionnelle dessinée." },
    { tier: "application", prompt: "AM $= 2$, AB $= 6$, AN $= 3$, AC $= 9$, M et N du même côté de A dans le bon ordre : (MN) et (BC) sont-elles parallèles ? Quel énoncé conclut ?", solution: "$\\dfrac{2}{6} = \\dfrac{1}{3} = \\dfrac{3}{9}$ : rapports **égaux**, ordre respecté — la **réciproque** de Thalès certifie : (MN) ∥ (BC)." },
    { tier: "challenge", prompt: "Configuration papillon : les droites (MB) et (NC) se coupent en A, avec (MN) ∥ (BC), AM $= 4$, AB $= 6$, MN $= 5$. Calcule BC.", solution: "Les ailes du papillon sont proportionnelles : $\\dfrac{BC}{MN} = \\dfrac{AB}{AM} = \\dfrac{6}{4}$ → $BC = \\dfrac{5 \\times 6}{4} = $ **7,5** — les rapports traversent le point d'intersection." },
    { tier: "exam", prompt: "Refais le calcul de Thalès : un bâton de 1,80 m projette une ombre de 1,20 m ; au même instant, la pyramide projette une ombre de 96 m (mesurée depuis le centre de sa base). Quelle est sa hauteur, et pourquoi le procédé est-il légitime ?", solution: "Les rayons du soleil sont **parallèles** : bâton et pyramide forment des triangles emboîtés de même rapport — $\\dfrac{h}{96} = \\dfrac{1{,}80}{1{,}20} = 1{,}5$ → $h = $ **144 m**. Le bâton mesurable a prêté son rapport à l'inaccessible : Thalès troquait déjà une hauteur de pharaon contre une ombre de promeneur." },
  ],
  practice: [
    { tier: "warmup", label: "La longueur manquante", make: (r) => {
      const k = pick(r, [2, 3]); const am = randint(r, 2, 6); const an = randint(r, 2, 6);
      return { prompt: `(MN) ∥ (BC), AM $= ${am}$, AB $= ${am * k}$, AN $= ${an}$ : que vaut AC ?`, answer: an * k, solution: `Rapport $\\frac{1}{${k}}$ : $AC = ${an} \\times ${k} = $ **${an * k}**.` };
    } },
    { tier: "application", label: "Parallèles ou pas ?", make: (r) => {
      const am = randint(r, 2, 5); const k = pick(r, [2, 3]); const an = randint(r, 2, 5);
      const ok = r() < 0.5; const ac = ok ? an * k : an * k + 1;
      return { prompt: `AM $= ${am}$, AB $= ${am * k}$, AN $= ${an}$, AC $= ${ac}$ (bon ordre) : (MN) ∥ (BC) ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `$\\frac{${am}}{${am * k}} = \\frac{1}{${k}}$ et $\\frac{${an}}{${ac}}$ — ${ok ? "égaux : **parallèles** (réciproque)" : "inégaux : **pas parallèles** (contraposée)"}.` };
    } },
  ],
};

// — Trigonometry (programme: cosinus, sinus, tangente) —
const trigonometrie = {
  id: "geometry.middle.trigonometrie",
  level: "middle", domain: "geometry",
  title: "Cosinus, sinus, tangente",
  tagline: "Trois rapports qui ne dépendent que de l'angle — la mesure de l'inaccessible.",
  prereqs: ["geometry.middle.pythagore", "applied.middle.ratio"],
  intuition:
    "Dans un triangle rectangle, fixe un angle aigu : les rapports entre côtés ne dépendent **que de cet angle** — pas de la taille du triangle (Thalès le garantit : tous les triangles rectangles de même angle sont emboîtables).\n\nTrois rapports, trois noms : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, $\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.",
  depths: {
    discovery:
      "**Avec les mains** : repérer les côtés depuis l'angle choisi — l'**hypoténuse** (face à l'angle droit, toujours elle), l'**opposé** (face à ton angle), l'**adjacent** (le côté de ton angle qui n'est pas l'hypoténuse). Change d'angle aigu : opposé et adjacent échangent leurs rôles — le repérage est la moitié du métier.",
    standard:
      "**En image** : les deux calculs — un **côté** : angle de $35°$, hypoténuse 10 : opposé $= 10 \\times \\sin 35° \\approx 5{,}7$ (le sinus, car opposé/hypoténuse) ; un **angle** : adjacent 4, hypoténuse 5 : $\\cos \\widehat{A} = \\frac{4}{5} = 0{,}8$, et la calculatrice remonte : $\\widehat{A} = \\arccos(0{,}8) \\approx 37°$ — choisir le rapport qui relie les deux côtés en jeu, puis avancer ou remonter.",
    advanced:
      "**Dans la tête** : Pythagore se cache dans la trigonométrie — divise $a^2 + b^2 = c^2$ par $c^2$ : $\\left(\\frac{a}{c}\\right)^2 + \\left(\\frac{b}{c}\\right)^2 = 1$, c'est-à-dire $\\cos^2 \\widehat{A} + \\sin^2 \\widehat{A} = 1$ pour tout angle — les deux rapports sont liés à jamais. Et $\\tan = \\frac{\\sin}{\\cos}$ (divise opposé/hyp par adjacent/hyp). Trois noms, une seule géométrie — et la **pente** d'une route à 10 % est une tangente qui s'ignore : monter 10 m pour 100 m d'avancée.",
  },
  keyIdea: "Depuis l'angle : $\\cos = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\sin = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\tan = \\dfrac{\\text{opp}}{\\text{adj}}$ — des rapports qui ne dépendent que de l'angle. Côté : multiplier ; angle : remonter ($\\arccos$, $\\arcsin$, $\\arctan$).",
  why:
    "Pourquoi trois rapports plutôt qu'un ? Parce que selon les données (quel côté connu, quel côté cherché), c'est l'un ou l'autre qui relie le trio angle-côté-côté — et avec eux, **deux mesures suffisent toujours** : l'arpenteur vise un angle et mesure une distance, la hauteur de la falaise tombe. La trigonométrie est l'industrialisation du bâton de Thalès : l'inaccessible mesuré en série — GPS, astronomie et jeux vidéo en vivent encore.",
  examples: [
    { title: "Calculer un côté", steps: [
      { p: "Angle $35°$, hypoténuse 10, on cherche l'**opposé** : le sinus les relie." },
      { p: "opposé $= 10 \\times \\sin 35° \\approx $ **5,7** — choisir le rapport, puis multiplier." },
    ] },
    { title: "Calculer un angle", steps: [
      { p: "Adjacent 4, hypoténuse 5 : $\\cos \\widehat{A} = \\dfrac{4}{5} = 0{,}8$." },
      { p: "$\\widehat{A} = \\arccos(0{,}8) \\approx $ **37°** — la calculatrice remonte le rapport." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans un triangle rectangle, depuis un angle aigu choisi : nomme les trois côtés et donne les trois rapports.", solution: "**Hypoténuse** (face à l'angle droit), **opposé** (face à l'angle choisi), **adjacent** (l'autre côté de l'angle) — $\\cos = \\frac{\\text{adj}}{\\text{hyp}}$, $\\sin = \\frac{\\text{opp}}{\\text{hyp}}$, $\\tan = \\frac{\\text{opp}}{\\text{adj}}$." },
    { tier: "warmup", prompt: "Angle de $35°$, hypoténuse 10 cm : calcule le côté opposé (arrondi au mm ; $\\sin 35° \\approx 0{,}574$).", solution: "opposé $= 10 \\times \\sin 35° \\approx $ **5,7 cm** — le sinus relie opposé et hypoténuse : on multiplie." },
    { tier: "application", prompt: "Adjacent 4 cm, hypoténuse 5 cm : calcule l'angle (arrondi au degré).", solution: "$\\cos \\widehat{A} = \\frac{4}{5} = 0{,}8$ → $\\widehat{A} = \\arccos(0{,}8) \\approx $ **37°** — et l'opposé vaudrait 3 (le 3-4-5 !) : $\\sin \\approx 0{,}6$, cohérent." },
    { tier: "challenge", prompt: "Une route monte avec une pente de 10 % (10 m de montée pour 100 m horizontaux). Quel rapport trigonométrique est-ce, et quel angle fait la route ?", solution: "C'est la **tangente** : $\\tan \\alpha = \\frac{10}{100} = 0{,}1$ → $\\alpha = \\arctan(0{,}1) \\approx $ **5,7°** — les panneaux routiers affichent des tangentes sans le dire." },
    { tier: "exam", prompt: "Démontre que $\\cos^2 \\widehat{A} + \\sin^2 \\widehat{A} = 1$ pour tout angle aigu d'un triangle rectangle, à partir de Pythagore.", solution: "Côtés $a$ (opposé), $b$ (adjacent), $c$ (hypoténuse) : Pythagore donne $a^2 + b^2 = c^2$. Divise par $c^2$ : $\\left(\\frac{a}{c}\\right)^2 + \\left(\\frac{b}{c}\\right)^2 = 1$, soit $\\sin^2 \\widehat{A} + \\cos^2 \\widehat{A} = $ **1** — les deux rapports sont prisonniers du même cercle : Pythagore, divisé par l'hypoténuse, devient la première formule de la trigonométrie." },
  ],
  practice: [
    { tier: "warmup", label: "Choisir le rapport", make: (r) => {
      const cas = pick(r, [["l'opposé et l'hypoténuse", 2], ["l'adjacent et l'hypoténuse", 1], ["l'opposé et l'adjacent", 3]]);
      return { prompt: `Quel rapport relie ${cas[0]} ? (1 = cosinus, 2 = sinus, 3 = tangente)`, answer: cas[1], solution: `**${["", "cosinus (adj/hyp)", "sinus (opp/hyp)", "tangente (opp/adj)"][cas[1]]}**.` };
    } },
    { tier: "application", label: "Le 3-4-5 trigonométrique", make: (r) => {
      const k = pick(r, [1, 2, 10]); const quoi = pick(r, [["cosinus", 4], ["sinus", 3]]);
      return { prompt: `Triangle rectangle de côtés ${3 * k}, ${4 * k}, ${5 * k} : que vaut le ${quoi[0]} de l'angle dont le côté opposé mesure ${3 * k} ? (réponds en décimal)`, answer: quoi[1] / 5, solution: `$\\frac{${quoi[1] * k}}{${5 * k}} = $ **${String(quoi[1] / 5).replace(".", ",")}** — le rapport ignore la taille : seul l'angle compte.` };
    } },
  ],
};

// — Vectors (programme: vecteur, somme, relation de Chasles) —
const vecteurs = {
  id: "geometry.middle.vecteurs",
  level: "middle", domain: "geometry",
  title: "Vecteurs et relation de Chasles",
  tagline: "Le vecteur comme objet, et la relation de Chasles AB + BC = AC.",
  prereqs: ["geometry.middle.translation"],
  intuition:
    "Ta translation de 4e avait une flèche : direction, sens, longueur. Cette flèche devient un objet à part entière — le **vecteur** $\\vec{AB}$ : la translation qui amène A sur B.\n\nDeux vecteurs sont **égaux** s'ils portent la même translation (ABDC parallélogramme ⟺ $\\vec{AB} = \\vec{CD}$) — peu importe d'où part la flèche : seul compte le déplacement.",
  depths: {
    discovery:
      "**Avec les mains** : enchaîne deux translations — glisse de $\\vec{AB}$, puis de $\\vec{BC}$ : le bilan est un seul glissement, de A vers C. La **somme** des vecteurs est née : $\\vec{AB} + \\vec{BC} = \\vec{AC}$ — deux trajets bout à bout font un trajet.",
    standard:
      "**En image** : la **relation de Chasles** — quand l'extrémité du premier est l'origine du second, la somme se lit sans dessin : $\\vec{AB} + \\vec{BC} = \\vec{AC}$ (le B du milieu s'évapore). Le vecteur **nul** $\\vec{0} = \\vec{AA}$ (la translation qui ne bouge rien), l'**opposé** $-\\vec{AB} = \\vec{BA}$ (le retour) — et l'aller-retour confirme : $\\vec{AB} + \\vec{BA} = \\vec{AA} = \\vec{0}$.",
    advanced:
      "**Dans la tête** : Chasles raccourcit les chaînes — $\\vec{MA} + \\vec{AT} + \\vec{TH} = \\vec{MH}$ : les relais intérieurs s'effacent, seuls comptent le départ et l'arrivée. Et tu reconnais une vieille amie : additionner des vecteurs dans le repère, c'est additionner leurs **flèches coordonnée par coordonnée** — tes relatifs de 5e, en deux dimensions. Le vecteur est le premier objet mathématique qui **est** un mouvement : la physique entière (forces, vitesses) parlera cette langue au lycée.",
  },
  keyIdea: "$\\vec{AB}$ : la translation de A vers B. Égaux ⟺ même translation (parallélogramme). **Chasles** : $\\vec{AB} + \\vec{BC} = \\vec{AC}$ — le point relais s'efface ; $\\vec{BA} = -\\vec{AB}$, $\\vec{AA} = \\vec{0}$.",
  why:
    "Pourquoi transformer une flèche en objet de calcul ? Parce qu'additionner des **déplacements** est le besoin le plus universel qui soit — le bateau qui subit le courant, l'avion dans le vent, le personnage de jeu vidéo qui cumule ses mouvements : tous additionnent des vecteurs. La géométrie de 3e donne le nom et la règle ; le monde appliquait déjà.",
  examples: [
    { title: "Chasles en action", steps: [
      { p: "$\\vec{AB} + \\vec{BC}$ : l'arrivée du premier est le départ du second — le B s'évapore." },
      { p: "$= \\vec{AC}$ — deux glissements bout à bout, un seul bilan." },
    ] },
    { title: "Vecteurs égaux", steps: [
      { p: "$\\vec{AB} = \\vec{CD}$ : même direction, même sens, même longueur." },
      { p: "Exactement quand **ABDC** est un parallélogramme — la figure de 5e certifie l'égalité." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que faut-il pour que deux vecteurs $\\vec{AB}$ et $\\vec{CD}$ soient égaux ? Quelle figure le garantit ?", solution: "Même **direction**, même **sens**, même **longueur** — c'est-à-dire la même translation : exactement quand **ABDC est un parallélogramme** ([AB] et [CD] parallèles, égaux, de même sens)." },
    { tier: "warmup", prompt: "Simplifie avec Chasles : $\\vec{AB} + \\vec{BC}$ ; puis $\\vec{MA} + \\vec{AT} + \\vec{TH}$.", solution: "$\\vec{AC}$ ; $\\vec{MH}$ — les points relais s'évaporent : seuls restent le départ et l'arrivée." },
    { tier: "application", prompt: "Que valent $\\vec{AB} + \\vec{BA}$ et $\\vec{AA}$ ? Comment s'appellent ces objets ?", solution: "$\\vec{AB} + \\vec{BA} = \\vec{AA} = \\vec{0}$, le **vecteur nul** (la translation immobile) — et $\\vec{BA}$ est l'**opposé** de $\\vec{AB}$ : l'aller plus le retour ne bougent rien." },
    { tier: "challenge", prompt: "Simplifie $\\vec{AB} + \\vec{CD} + \\vec{BC}$ (indice : l'addition de vecteurs se réordonne).", solution: "Réordonne : $\\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AC} + \\vec{CD} = \\vec{AD}$ — Chasles s'applique dès qu'on remet les relais dans l'ordre : l'addition des déplacements est commutative." },
    { tier: "exam", prompt: "Dans un repère, A$(1\\,;\\,2)$ et B$(4\\,;\\,3)$. Donne la flèche de $\\vec{AB}$, puis les coordonnées de l'image de M$(-2\\,;\\,5)$ par la translation de vecteur $\\vec{AB}$. Quel lien avec ta 4e ?", solution: "Flèche : $(4 - 1\\,;\\,3 - 2) = (3\\,;\\,1)$ — arrivée moins départ. Image de M : $(-2 + 3\\,;\\,5 + 1) = (1\\,;\\,6)$ — translater, c'est additionner la flèche : exactement ton calcul de 4e, qui portait déjà un vecteur sans le nommer. Le vecteur est la flèche promue au rang d'objet." },
  ],
  practice: [
    { tier: "warmup", label: "Chasles évapore", make: (r) => {
      const pts = ["A", "B", "C", "D", "E", "M", "N"];
      const i = randint(r, 0, 4);
      return { prompt: `$\\vec{${pts[i]}${pts[i + 1]}} + \\vec{${pts[i + 1]}${pts[i + 2]}} = \\vec{${pts[i]}\\,?}$ : quelle lettre d'arrivée ? (1 = ${pts[i + 1]}, 2 = ${pts[i + 2]})`, answer: 2, solution: `Le relais ${pts[i + 1]} s'évapore : $\\vec{${pts[i]}${pts[i + 2]}}$ — réponse **2**.` };
    } },
    { tier: "application", label: "La flèche en coordonnées", make: (r) => {
      const ax = randint(r, -5, 6); const bx = ax + (randint(r, -6, 7) || 3);
      const ay = randint(r, -5, 6); const by = ay + (randint(r, -6, 7) || 2);
      return { prompt: `A$(${ax}\\,;\\,${ay})$, B$(${bx}\\,;\\,${by})$ : quelle est la composante horizontale de $\\vec{AB}$ ?`, answer: bx - ax, solution: `Arrivée moins départ : $${bx} - (${ax}) = $ **${bx - ax}** — la soustraction de relatifs fabrique la flèche.` };
    } },
  ],
};

export default [thales, trigonometrie, vecteurs];
