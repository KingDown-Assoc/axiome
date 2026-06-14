// Field "Topology" — MASTER module (m2 year), master de mathématiques.
// Porte 2/6 du M2 : topologie algébrique.
// Ancrage : M2 fonda Paris Centre, cours introductifs « Homologie, cohomologie
// et faisceaux » (Keller), « Homotopie I » (Vallette), « Topologie algébrique
// des variétés I » (Itenberg) ; Polytechnique 3A « Topologie algébrique »
// (Ginot) ; Sorbonne 4MA359.
// (1) Groupe fondamental : lacets, homotopie, pi_1, fonctorialité, pi_1(S^1)=Z.
// (2) Revêtements et van Kampen : relèvement, correspondance de Galois des
// revêtements, revêtement universel, produit libre amalgamé.
// (3) Homologie : complexes de chaînes, cycles/bords, H_n, caractéristique
// d'Euler, H_0 composantes, H_1 = abélianisé de pi_1.
// Singapour au niveau master : Concret = UN objet explicite (le cercle ; l'hélice
// sur le cercle ; le cercle triangulé) ; Pictural = le dessin (lacets qui se
// rétractent, feuillets d'un revêtement, membrane sans bord) ; Abstrait = les
// théorèmes, big idea nommée. Exam = colle ; pratique = réponses entières.
import { randint, pick } from "../../core/exercises.js";

// — Les lacets, à déformation près, forment un groupe qui détecte les trous —
const groupeFondamental = {
  id: "topology.master.groupe-fondamental",
  level: "master", domain: "topology",
  title: "Le groupe fondamental",
  tagline: "Les lacets d'un espace, à déformation près, forment un groupe qui détecte ses trous — et qui reste inchangé sous toute déformation continue.",
  prereqs: ["analysis.bachelor.metriques-completude", "algebra.bachelor.actions-groupes-sylow"],
  intuition:
    "La topologie demande ce qui survit à une **déformation continue** : étirer, plier, tordre sans déchirer ni recoller. Le premier invariant algébrique de cette géométrie souple, c'est le **groupe fondamental** $\\pi_1$. Il regarde les **lacets** basés en un point — les chemins qui reviennent à leur départ — à **homotopie** près, c'est-à-dire à déformation continue près.\n\nMettre deux lacets bout à bout définit une **multiplication**, et l'ensemble des classes de lacets devient un **groupe**. Sa richesse mesure les trous de l'espace : sur un disque, tout lacet se rétracte en un point, le groupe est trivial ; autour d'un trou (un anneau, le plan privé d'un point), un lacet ne peut plus se contracter, et le groupe devient non trivial. Mieux : toute application continue induit un morphisme de groupes — la topologie se traduit en algèbre.",
  depths: {
    discovery:
      "**Avec les mains** : prends le cercle $S^1$ et un point base. Un lacet peut faire le tour $n$ fois — $n \\in \\mathbb{Z}$, le signe disant le sens. Deux lacets sont **homotopes** (déformables l'un sur l'autre) si et seulement s'ils ont le même **nombre d'enroulements**. Mettre bout à bout un lacet qui tourne une fois, puis un qui tourne deux fois, donne un lacet qui tourne trois fois : la multiplication des classes correspond à l'addition des enroulements. Donc $\\pi_1(S^1) \\cong \\mathbb{Z}$, engendré par le lacet « un tour ». Le groupe fondamental du cercle, c'est les entiers, et l'isomorphisme est l'application « nombre d'enroulements ».",
    standard:
      "**En image** : dessine des lacets basés en $p$. Un lacet est **trivial** s'il peut se rétracter continûment sur le point $p$ sans quitter l'espace. Sur un disque (convexe), tout lacet se rétracte — le groupe est trivial, l'espace est **simplement connexe**. Sur un espace troué (un anneau, le plan privé d'un point), un lacet qui entoure le trou ne peut **pas** se rétracter : il représente une classe non triviale.\n\nPour la multiplication, image deux lacets parcourus l'un après l'autre, recollés bout à bout en $p$ ; l'inverse d'un lacet est le même parcouru à l'envers, et le composé d'un lacet avec son inverse se rétracte sur $p$ : c'est l'élément neutre.",
    advanced:
      "**Dans la tête** : pour un espace pointé $(X, x_0)$, le **groupe fondamental** $\\pi_1(X, x_0)$ est l'ensemble des classes d'**homotopie** de lacets basés en $x_0$, muni de la **concaténation**. C'est un groupe : neutre = lacet constant, inverse = lacet renversé, associativité à homotopie près. Faits clés : $\\pi_1(S^1) \\cong \\mathbb{Z}$ (le degré, ou nombre d'enroulements) ; $\\pi_1$ d'un convexe est **trivial** (simplement connexe) ; $\\pi_1(X \\times Y) \\cong \\pi_1(X) \\times \\pi_1(Y)$ ; $\\pi_1(S^n)$ est trivial pour $n \\ge 2$.\n\n**Fonctorialité** : une application continue $f \\colon X \\to Y$ induit un morphisme $f_* \\colon \\pi_1(X, x_0) \\to \\pi_1(Y, f(x_0))$, avec $(g \\circ f)_* = g_* \\circ f_*$ et $(\\mathrm{id})_* = \\mathrm{id}$. **Invariance par homotopie** : deux espaces homotopiquement équivalents ont des $\\pi_1$ isomorphes. Le groupe peut être **non abélien** : le bouquet de deux cercles a pour $\\pi_1$ le groupe **libre** à deux générateurs.\n\nBig idea *Invariance* : $\\pi_1$ est un **invariant d'homotopie** — il ne change pas quand on déforme continûment l'espace. Il distingue donc des espaces (un disque et un anneau diffèrent car leurs $\\pi_1$ diffèrent) et fournit le tout premier invariant algébrique de la topologie, traduisant les trous en structure de groupe.",
  },
  keyIdea: "Le **groupe fondamental** $\\pi_1(X, x_0)$ est l'ensemble des classes d'homotopie de lacets basés en $x_0$, sous concaténation. C'est un invariant d'homotopie : $\\pi_1(S^1) \\cong \\mathbb{Z}$ (enroulement), $\\pi_1$ d'un convexe trivial, $\\pi_1(S^n)$ trivial pour $n \\ge 2$. Toute application continue induit un morphisme $f_*$ (fonctorialité). Big idea *Invariance*.",
  why:
    "Le groupe fondamental ouvre l'algèbre topologique : il traduit la topologie en théorie des groupes. Il classe les revêtements, sous-tend les polygones fondamentaux des surfaces, obstrue (un espace de $\\pi_1$ non trivial n'est pas simplement connexe) et se relie à la théorie de Galois par l'analogie revêtements / extensions. En physique, il classe les vortex, les anyons et les défauts topologiques.",
  examples: [
    { title: "Le groupe fondamental du cercle est Z", steps: [
      { p: "Sur $S^1$, à chaque lacet on associe son **nombre d'enroulements** (le degré) : combien de fois, et dans quel sens, il fait le tour. Le lacet $t \\mapsto (\\cos 2\\pi n t, \\sin 2\\pi n t)$ a pour degré $n$." },
      { p: "Deux lacets sont homotopes ssi ils ont même degré, et concaténer ajoute les degrés. L'application degré $\\pi_1(S^1) \\to \\mathbb{Z}$ est donc un **isomorphisme** de groupes : $\\pi_1(S^1) \\cong \\mathbb{Z}$, engendré par le lacet de degré $1$." },
    ] },
    { title: "Le plan, troué ou non", steps: [
      { p: "Le plan $\\mathbb{R}^2$ est convexe : tout lacet se rétracte sur son point base, donc $\\pi_1(\\mathbb{R}^2)$ est **trivial**. C'est un espace simplement connexe." },
      { p: "Le plan privé d'un point $\\mathbb{R}^2 \\setminus \\{0\\}$ se rétracte sur le cercle : un lacet entourant le trou ne peut se contracter, et $\\pi_1(\\mathbb{R}^2 \\setminus \\{0\\}) \\cong \\mathbb{Z}$. Les deux espaces, indiscernables localement, sont distingués par leur groupe fondamental." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel est le groupe fondamental d'un disque $D^2$ ? Qu'appelle-t-on un espace simplement connexe ?", solution: "Le disque est convexe : tout lacet basé en un point se rétracte continûment sur ce point. Donc $\\pi_1(D^2)$ est **trivial** (réduit à l'élément neutre). Un espace connexe par arcs dont le groupe fondamental est trivial est dit **simplement connexe** : il n'a pas de trou de dimension $1$. Le disque, la boule, $\\mathbb{R}^n$ et $S^n$ ($n \\ge 2$) sont simplement connexes." },
    { tier: "warmup", prompt: "Sur $S^1$, on parcourt le lacet « trois tours dans le sens direct » puis « un tour dans le sens indirect ». Quelle classe obtient-on dans $\\pi_1(S^1) \\cong \\mathbb{Z}$ ?", solution: "Le nombre d'enroulements s'ajoute : trois tours directs valent $+3$, un tour indirect vaut $-1$. La concaténation donne la classe $3 + (-1) = 2 \\in \\mathbb{Z}$, soit un lacet homotope à « deux tours directs ». La structure de groupe de $\\pi_1(S^1)$ est exactement l'addition des entiers." },
    { tier: "application", prompt: "Calcule le groupe fondamental du tore $T^2 = S^1 \\times S^1$, puis du $n$-tore $T^n = (S^1)^n$.", solution: "Par la formule du produit, $\\pi_1(X \\times Y) \\cong \\pi_1(X) \\times \\pi_1(Y)$. Donc $\\pi_1(T^2) \\cong \\pi_1(S^1) \\times \\pi_1(S^1) \\cong \\mathbb{Z} \\times \\mathbb{Z} = \\mathbb{Z}^2$, **abélien** de rang $2$ : les deux lacets de base (le méridien et le parallèle) commutent. Plus généralement $\\pi_1(T^n) \\cong \\mathbb{Z}^n$, de rang $n$." },
    { tier: "challenge", prompt: "Montre que le bouquet de deux cercles $S^1 \\vee S^1$ (figure en huit) a un groupe fondamental **non abélien**. À quel groupe est-il isomorphe ?", solution: "Le bouquet $S^1 \\vee S^1$ a deux lacets de base $a$ et $b$ (un par cercle). Aucune relation ne les contraint : on peut parcourir $a$ puis $b$, ou $b$ puis $a$, et ces deux lacets ne sont **pas** homotopes (van Kampen, leçon suivante, le confirme). Donc $ab \\neq ba$ : le groupe est **non abélien**. C'est le **groupe libre** $F_2 = \\langle a, b \\rangle$ à deux générateurs sans relation. Contrairement au tore (où les deux lacets commutent), le bouquet laisse ses générateurs totalement libres — la différence entre coller deux cercles en un point ou les croiser en un tore ■." },
    { tier: "exam", prompt: "(1) Définis le groupe fondamental $\\pi_1(X, x_0)$ et justifie que c'est un groupe. (2) Énonce la fonctorialité. (3) Définis l'invariance par homotopie. (4) Donne $\\pi_1$ de $S^1$, du disque, et du tore $T^2$.", solution: "(1) $\\pi_1(X, x_0)$ = classes d'homotopie (à extrémités fixées en $x_0$) de lacets basés en $x_0$, avec la **concaténation** $[\\gamma][\\delta] = [\\gamma \\cdot \\delta]$. Neutre = lacet constant, inverse = lacet renversé, associativité à homotopie près : c'est un groupe.\n\n(2) Une application continue $f \\colon (X, x_0) \\to (Y, y_0)$ induit un morphisme $f_* \\colon \\pi_1(X, x_0) \\to \\pi_1(Y, y_0)$, $[\\gamma] \\mapsto [f \\circ \\gamma]$, avec $(g \\circ f)_* = g_* \\circ f_*$ : $\\pi_1$ est un **foncteur**.\n\n(3) Si $f \\colon X \\to Y$ est une **équivalence d'homotopie**, alors $f_*$ est un isomorphisme : des espaces homotopiquement équivalents ont des $\\pi_1$ isomorphes.\n\n(4) $\\pi_1(S^1) \\cong \\mathbb{Z}$ ; $\\pi_1(D^2) = \\{1\\}$ (trivial) ; $\\pi_1(T^2) \\cong \\mathbb{Z}^2$ ■." },
  ],
  practice: [
    { tier: "discovery", label: "Addition des enroulements", make: (r) => {
      const a = randint(r, 1, 5), b = randint(r, -4, -1);
      return { prompt: `Dans $\\pi_1(S^1) \\cong \\mathbb{Z}$, on concatène un lacet d'enroulement $${a}$ avec un lacet d'enroulement $${b}$. Quelle classe entière obtient-on ?`, answer: a + b, solution: `Les enroulements s'ajoutent : $${a} + (${b}) = ${a + b}$. La loi de groupe de $\\pi_1(S^1)$ est l'addition dans $\\mathbb{Z}$.` };
    } },
    { tier: "warmup", label: "Rang du groupe fondamental du tore", make: (r) => {
      const n = randint(r, 1, 6);
      return { prompt: `Quel est le rang du groupe fondamental du $${n}$-tore $T^{${n}} = (S^1)^{${n}}$ ?`, answer: n, solution: `$\\pi_1(T^{${n}}) \\cong \\mathbb{Z}^{${n}}$ par la formule du produit : rang $${n}$.` };
    } },
    { tier: "application", label: "Générateurs d'un bouquet de cercles", make: (r) => {
      const n = randint(r, 2, 6);
      return { prompt: `Le bouquet de $${n}$ cercles a pour groupe fondamental le groupe libre $F_{${n}}$. Combien a-t-il de générateurs ?`, answer: n, solution: `Un cercle apporte un générateur libre ; le bouquet de $${n}$ cercles donne $F_{${n}}$, libre à $${n}$ générateurs.` };
    } },
  ],
};

// — Revêtements ↔ sous-groupes de pi_1 : le pendant topologique de Galois —
const revetementsVanKampen = {
  id: "topology.master.revetements-van-kampen",
  level: "master", domain: "topology",
  title: "Revêtements et théorème de van Kampen",
  tagline: "Les revêtements d'un espace correspondent aux sous-groupes de son groupe fondamental — un écho de la correspondance de Galois — et van Kampen calcule ce groupe en recollant des morceaux.",
  prereqs: ["topology.master.groupe-fondamental", "algebra.master.correspondance-galois"],
  intuition:
    "Un **revêtement** est une version « déployée » d'un espace, qui s'enroule au-dessus de lui en restant localement identique — comme l'hélice infinie de la droite réelle au-dessus du cercle, $t \\mapsto e^{2\\pi i t}$. La propriété magique : les chemins et les homotopies se **relèvent** de façon unique vers le haut.\n\nLe miracle structurel est que les revêtements connexes d'un espace sont classés par les **sous-groupes** de son groupe fondamental — exactement comme la théorie de Galois classe les corps intermédiaires par les sous-groupes du groupe de Galois. Le **revêtement universel** (simplement connexe) joue le rôle de la clôture algébrique. Et le théorème de **van Kampen** calcule le $\\pi_1$ d'un espace recollé à partir de morceaux, par un produit libre amalgamé.",
  depths: {
    discovery:
      "**Avec les mains** : prends l'hélice $p \\colon \\mathbb{R} \\to S^1$, $t \\mapsto (\\cos 2\\pi t, \\sin 2\\pi t)$ — le **revêtement universel** du cercle. Au-dessus de chaque point du cercle, une infinité de points (les « étages » de l'hélice, espacés de $1$). Un lacet du cercle qui fait **un tour** se relève en un chemin de $\\mathbb{R}$ qui va de $0$ à $1$ : il ne se referme pas, il monte d'un étage. Le nombre d'étages gravis est précisément le nombre d'enroulements. Les **transformations de revêtement** (glisser l'hélice d'un entier) forment exactement $\\mathbb{Z} = \\pi_1(S^1)$. Relever un lacet, c'est lire son enroulement.",
    standard:
      "**En image** : visualise l'hélice au-dessus du cercle, ou un revêtement à deux feuillets (deux copies superposées). Un chemin en haut se projette en un chemin en bas ; un lacet en bas peut se refermer ou non en haut selon sa classe. L'image de Galois : le treillis des revêtements reflète, **à l'envers**, le treillis des sous-groupes de $\\pi_1$ — petit sous-groupe, grand revêtement.\n\nPour van Kampen, image deux morceaux ouverts qui se chevauchent et dont l'union est l'espace : tout lacet de l'union se découpe en morceaux vivant dans chaque ouvert, et les lacets du chevauchement fournissent les **relations** entre les générateurs venus de chaque côté.",
    advanced:
      "**Dans la tête** : un **revêtement** $p \\colon \\widetilde{X} \\to X$ est une surjection continue telle que tout point de $X$ a un voisinage **trivialement couvert** ($p^{-1}$ y est une union disjointe de copies homéomorphes). **Relèvement** : tout chemin et toute homotopie de $X$ se relèvent de manière unique une fois fixé un point de départ en haut.\n\n**Correspondance de Galois des revêtements** : pour $X$ raisonnable, les revêtements connexes pointés de $X$ correspondent aux **sous-groupes** $H \\le \\pi_1(X, x_0)$. Le $\\pi_1$ du revêtement s'envoie isomorphiquement sur $H$ ; le **nombre de feuillets** égale l'indice $[\\pi_1 : H]$ ; les revêtements **galoisiens** (normaux) correspondent aux sous-groupes **distingués**, avec groupe des automorphismes de revêtement (les **transformations de Deck**) isomorphe à $\\pi_1 / H$. Le **revêtement universel** (simplement connexe) correspond au sous-groupe trivial, et son groupe de Deck est $\\pi_1$ tout entier.\n\n**Théorème de van Kampen** : si $X = U \\cup V$ avec $U, V, U \\cap V$ ouverts connexes par arcs (contenant le point base), alors $\\pi_1(X)$ est le **produit libre amalgamé** $\\pi_1(U) \\ast_{\\pi_1(U \\cap V)} \\pi_1(V)$ — on recolle les groupes le long du chevauchement.\n\nBig idea *Equivalence* : la correspondance des revêtements est le **jumeau topologique** de la théorie de Galois — revêtements $\\leftrightarrow$ sous-groupes, revêtement universel $\\leftrightarrow$ clôture algébrique, transformations de Deck $\\leftrightarrow$ groupe de Galois. La même **équivalence renversant les treillis** gouverne les deux théories, révélant $\\pi_1$ comme un « groupe de Galois topologique ».",
  },
  keyIdea: "Un **revêtement** $p \\colon \\widetilde{X} \\to X$ (relèvement unique des chemins) connexe correspond à un sous-groupe $H \\le \\pi_1(X)$ : feuillets $= [\\pi_1 : H]$, revêtements normaux $\\leftrightarrow$ sous-groupes distingués (groupe de Deck $= \\pi_1/H$), revêtement universel $\\leftrightarrow$ sous-groupe trivial. C'est la **correspondance de Galois de la topologie**. **Van Kampen** calcule $\\pi_1$ d'un recollement comme produit libre amalgamé. Big idea *Equivalence*.",
  why:
    "La théorie des revêtements classe les « déroulements » symétriques d'un espace, calcule les groupes fondamentaux, et est le prototype de l'analogie profonde entre topologie et arithmétique (le $\\pi_1$ étale de Grothendieck, le dictionnaire revêtements / extensions de corps). Van Kampen est l'outil de calcul des groupes fondamentaux des surfaces et des CW-complexes.",
  examples: [
    { title: "L'hélice : revêtement universel du cercle", steps: [
      { p: "L'application $p \\colon \\mathbb{R} \\to S^1$, $t \\mapsto e^{2\\pi i t}$, est un revêtement : au-dessus de chaque point, les antécédents sont $\\{t + n : n \\in \\mathbb{Z}\\}$, espacés de $1$. Comme $\\mathbb{R}$ est simplement connexe, c'est le **revêtement universel**." },
      { p: "Un lacet de degré $n$ se relève en un chemin de $0$ à $n$ dans $\\mathbb{R}$. Les transformations de Deck sont les translations $t \\mapsto t + n$, formant un groupe isomorphe à $\\mathbb{Z} = \\pi_1(S^1)$ : le groupe de Deck du revêtement universel est bien $\\pi_1$ tout entier." },
    ] },
    { title: "Van Kampen sur la figure en huit", steps: [
      { p: "Le bouquet $S^1 \\vee S^1$ se couvre par deux ouverts $U, V$, chacun se rétractant sur un cercle ($\\pi_1 = \\mathbb{Z}$), dont l'intersection $U \\cap V$ est un voisinage du point de recollement, **contractile** ($\\pi_1$ trivial)." },
      { p: "Van Kampen donne $\\pi_1(S^1 \\vee S^1) = \\mathbb{Z} \\ast_{\\{1\\}} \\mathbb{Z} = \\mathbb{Z} \\ast \\mathbb{Z}$, le **produit libre** $F_2$ : amalgamer le long d'un groupe trivial, c'est ne poser aucune relation. On retrouve le groupe libre à deux générateurs, non abélien." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel est le revêtement universel du cercle $S^1$ ? Quel est son groupe de transformations de Deck ?", solution: "C'est la droite réelle $\\mathbb{R}$, via $t \\mapsto e^{2\\pi i t}$ : $\\mathbb{R}$ est simplement connexe, donc c'est le **revêtement universel**. Ses transformations de Deck sont les translations entières $t \\mapsto t + n$, formant un groupe isomorphe à $\\mathbb{Z}$ — qui est précisément $\\pi_1(S^1)$. Le groupe de Deck du revêtement universel égale toujours $\\pi_1$ de la base." },
    { tier: "warmup", prompt: "L'application $z \\mapsto z^n$ de $S^1$ dans $S^1$ est un revêtement. Combien a-t-il de feuillets ? À quel sous-groupe de $\\pi_1(S^1) = \\mathbb{Z}$ correspond-il ?", solution: "Chaque point a $n$ antécédents (les $n$ racines $n$-ièmes), donc le revêtement a $n$ **feuillets**. Il correspond au sous-groupe $n\\mathbb{Z} \\le \\mathbb{Z}$ : le lacet de base en bas se relève en un lacet ssi son enroulement est multiple de $n$. L'indice $[\\mathbb{Z} : n\\mathbb{Z}] = n$ est bien le nombre de feuillets, et comme $n\\mathbb{Z}$ est distingué, le revêtement est galoisien de groupe de Deck $\\mathbb{Z}/n\\mathbb{Z}$." },
    { tier: "application", prompt: "Avec van Kampen, calcule le groupe fondamental de la sphère $S^2$ en la recouvrant par deux disques.", solution: "Couvre $S^2$ par deux ouverts $U, V$ légèrement plus grands que les hémisphères, chacun **contractile** ($\\pi_1$ trivial), d'intersection $U \\cap V$ une bande équatoriale se rétractant sur un cercle ($\\pi_1 = \\mathbb{Z}$). Van Kampen donne $\\pi_1(S^2) = \\{1\\} \\ast_{\\mathbb{Z}} \\{1\\}$. Amalgamer deux groupes triviaux donne le **groupe trivial** : $\\pi_1(S^2) = \\{1\\}$. La sphère est simplement connexe — tout lacet s'y rétracte, on peut le faire glisser par-dessus un pôle." },
    { tier: "challenge", prompt: "Explique la correspondance de Galois pour le revêtement $z \\mapsto z^n$ de $S^1$ : quel sous-groupe, normal ou non, quel groupe de Deck ? Compare avec une extension de corps.", solution: "Le revêtement $z \\mapsto z^n$ correspond au sous-groupe $n\\mathbb{Z} \\le \\mathbb{Z}$. Comme $\\mathbb{Z}$ est **abélien**, tout sous-groupe est **distingué** : le revêtement est **galoisien (normal)**. Le groupe de Deck est le quotient $\\mathbb{Z}/n\\mathbb{Z}$ — cyclique d'ordre $n$, agissant par rotations $z \\mapsto \\zeta z$ ($\\zeta$ racine $n$-ième de l'unité), qui permutent les $n$ feuillets. L'analogie de Galois est exacte : ce revêtement est le pendant topologique de l'extension cyclotomique $\\mathbb{Q}(\\zeta_n)/\\mathbb{Q}$ de groupe de Galois $\\mathbb{Z}/n\\mathbb{Z}$ (ou de l'extension de Kummer $X^n - a$) — sous-groupe d'indice $n$, revêtement à $n$ feuillets, groupe quotient cyclique ■." },
    { tier: "exam", prompt: "(1) Définis un revêtement et la propriété de relèvement des chemins. (2) Énonce la correspondance de Galois entre revêtements et sous-groupes de $\\pi_1$. (3) Énonce le théorème de van Kampen. (4) Applique-le pour retrouver $\\pi_1(S^1 \\vee S^1)$.", solution: "(1) $p \\colon \\widetilde{X} \\to X$ est un **revêtement** si tout $x \\in X$ a un voisinage $U$ avec $p^{-1}(U)$ union disjointe d'ouverts homéomorphes à $U$ par $p$. **Relèvement des chemins** : tout chemin $\\gamma$ de $X$ et toute homotopie se relèvent uniquement à $\\widetilde{X}$ une fois fixé le point de départ au-dessus.\n\n(2) Les revêtements connexes pointés de $X$ correspondent bijectivement aux **sous-groupes** $H \\le \\pi_1(X, x_0)$ : le nombre de feuillets est $[\\pi_1 : H]$, les revêtements normaux correspondent aux sous-groupes distingués, de groupe de Deck $\\pi_1/H$ ; le sous-groupe trivial donne le revêtement universel.\n\n(3) **Van Kampen** : si $X = U \\cup V$, $U, V, U \\cap V$ ouverts connexes par arcs contenant $x_0$, alors $\\pi_1(X) \\cong \\pi_1(U) \\ast_{\\pi_1(U \\cap V)} \\pi_1(V)$ (produit libre amalgamé).\n\n(4) Pour $S^1 \\vee S^1$ : $U, V$ se rétractent chacun sur un cercle ($\\mathbb{Z}$), $U \\cap V$ contractile ($\\{1\\}$). Donc $\\pi_1 = \\mathbb{Z} \\ast_{\\{1\\}} \\mathbb{Z} = \\mathbb{Z} \\ast \\mathbb{Z} = F_2$ ■." },
  ],
  practice: [
    { tier: "discovery", label: "Feuillets du revêtement z puissance n", make: (r) => {
      const n = randint(r, 2, 8);
      return { prompt: `Le revêtement $z \\mapsto z^{${n}}$ du cercle $S^1$ a combien de feuillets ?`, answer: n, solution: `Chaque point a $${n}$ antécédents (les racines $${n}$-ièmes) : $${n}$ feuillets, correspondant au sous-groupe $${n}\\mathbb{Z}$ d'indice $${n}$.` };
    } },
    { tier: "warmup", label: "Ordre du groupe de Deck", make: (r) => {
      const n = randint(r, 2, 8);
      return { prompt: `Le revêtement galoisien $z \\mapsto z^{${n}}$ de $S^1$ a pour groupe de Deck $\\mathbb{Z}/${n}\\mathbb{Z}$. Quel est l'ordre de ce groupe ?`, answer: n, solution: `Le groupe de Deck est $\\mathbb{Z}/${n}\\mathbb{Z}$, cyclique d'ordre $${n}$ — autant que de feuillets, le revêtement étant normal.` };
    } },
    { tier: "application", label: "Générateurs du groupe de surface", make: (r) => {
      const g = randint(r, 1, 5);
      return { prompt: `Le groupe fondamental de la surface orientable de genre $${g}$ (calculé par van Kampen) a $2g$ générateurs. Combien cela fait-il ?`, answer: 2 * g, solution: `Chaque anse apporte deux générateurs ($a_i, b_i$) : le groupe de surface de genre $${g}$ a $2 \\times ${g} = ${2 * g}$ générateurs (avec la relation $\\prod [a_i, b_i] = 1$).` };
    } },
  ],
};

// — Homologie : à chaque dimension, un groupe compte les trous —
const homologie = {
  id: "topology.master.homologie",
  level: "master", domain: "topology",
  title: "Homologie : compter les trous",
  tagline: "À chaque dimension, un groupe compte les trous d'un espace en mesurant les bords qui ne bordent rien — et le calcul passe par des complexes de chaînes.",
  prereqs: ["topology.master.groupe-fondamental", "algebra.bachelor.anneaux-quotients"],
  intuition:
    "Le groupe fondamental ne voit que les trous de dimension $1$, et il est difficile à calculer (souvent non abélien). L'**homologie** $H_n$ généralise à **toutes les dimensions** un invariant abélien et calculable. L'idée : on forme des **chaînes** (sommes formelles de simplexes — segments, triangles, tétraèdres), on prend leur **bord** $\\partial$ (le bord d'un triangle, ce sont ses trois arêtes), et on observe que le **bord d'un bord est vide** : $\\partial^2 = 0$.\n\nUn **cycle** est une chaîne sans bord (un lacet, une surface fermée) ; un **bord** est ce qui borde quelque chose. Les cycles qui ne bordent rien détectent des trous. L'homologie $H_n = (\\text{cycles}) / (\\text{bords})$ mesure exactement les trous de dimension $n$ : $H_0$ compte les composantes connexes, $H_1$ les trous-lacets, $H_2$ les cavités. Et une simple somme alternée de leurs rangs donne la **caractéristique d'Euler**.",
  depths: {
    discovery:
      "**Avec les mains** : triangule le cercle $S^1$ en un triangle creux : $3$ sommets, $3$ arêtes. Les chaînes de dimension $0$ sont $C_0 = \\mathbb{Z}^3$ (combinaisons de sommets), celles de dimension $1$ sont $C_1 = \\mathbb{Z}^3$ (combinaisons d'arêtes). Le **bord** d'une arête est son extrémité moins son origine. La somme des trois arêtes parcourues dans le même sens a un bord **nul** (chaque sommet est compté $+1$ et $-1$) : c'est un **cycle**. Comme il n'y a aucune chaîne de dimension $2$ (pas de face), ce cycle n'est le bord de rien : il survit. Donc $H_1(S^1) = \\mathbb{Z}$ — un trou de dimension $1$. Et $H_0(S^1) = \\mathbb{Z}$ : une seule composante connexe.",
    standard:
      "**En image** : vois un $n$-cycle comme une « membrane » fermée de dimension $n$, sans bord. Elle représente un trou si elle ne **borde** elle-même aucune région de dimension $n+1$. Sur le cercle, le lacet ne borde rien (le disque manque) : c'est un trou. Sur la sphère $S^2$, l'équateur borde une calotte : ce n'est **pas** un trou ($H_1 = 0$) ; mais la sphère entière est un $2$-cycle qui ne borde aucune boule pleine : $H_2(S^2) = \\mathbb{Z}$, la cavité.\n\nLe calcul s'organise en un **complexe de chaînes** : $\\cdots \\to C_{n+1} \\xrightarrow{\\partial} C_n \\xrightarrow{\\partial} C_{n-1} \\to \\cdots$, avec $\\partial \\circ \\partial = 0$. On prend les cycles (noyau de $\\partial$), on quotiente par les bords (image de $\\partial$).",
    advanced:
      "**Dans la tête** : un **complexe de chaînes** est une suite de groupes abéliens $C_n$ et de morphismes de bord $\\partial_n \\colon C_n \\to C_{n-1}$ vérifiant $\\partial_n \\circ \\partial_{n+1} = 0$. On pose les **cycles** $Z_n = \\ker \\partial_n$ et les **bords** $B_n = \\mathrm{im}\\, \\partial_{n+1}$ ; comme $\\partial^2 = 0$, on a $B_n \\subseteq Z_n$, et l'**homologie** est le quotient $H_n = Z_n / B_n$. Pour l'homologie singulière d'un espace, on prend tous les simplexes continus ; pour un complexe simplicial ou cellulaire, le calcul est fini.\n\nFaits : $H_0(X) \\cong \\mathbb{Z}^{c}$ où $c$ est le nombre de composantes connexes ; $H_1(X) \\cong \\pi_1(X)^{\\mathrm{ab}}$ (théorème de Hurewicz : l'**abélianisé** du groupe fondamental) ; $H_n(S^n) = \\mathbb{Z}$ et $0$ sinon. La **caractéristique d'Euler** $\\chi(X) = \\sum_n (-1)^n \\mathrm{rang}\\, H_n = \\sum_n (-1)^n (\\#\\,n\\text{-cellules})$ est un invariant de déformation : $\\chi(S^2) = 2$, $\\chi(T^2) = 0$, $\\chi(\\Sigma_g) = 2 - 2g$.\n\nBig idea *Diagrams* : l'homologie vit dans le langage des **complexes de chaînes et des suites exactes** — le diagramme $\\partial^2 = 0$, la suite exacte longue d'une paire, la suite de Mayer–Vietoris — et les calculs sont des **chasses au diagramme**. La condition $\\partial^2 = 0$ (qui fait écho au $d^2 = 0$ des formes) érige « le bord d'un bord est vide » en moteur ; le théorème de de Rham identifie d'ailleurs cette homologie à la cohomologie des formes différentielles.",
  },
  keyIdea: "Un **complexe de chaînes** ($\\partial^2 = 0$) fournit l'**homologie** $H_n = (\\text{cycles}) / (\\text{bords}) = $ trous de dimension $n$ : $H_0$ compte les composantes, $H_1 = \\pi_1$ abélianisé, $H_n(S^n) = \\mathbb{Z}$. La **caractéristique d'Euler** $\\chi = \\sum (-1)^n \\mathrm{rang}\\, H_n$ est un invariant de déformation. Big idea *Diagrams*.",
  why:
    "L'homologie est l'invariant topologique le plus calculable et le plus fécond : elle alimente les théorèmes de point fixe (Lefschetz, Brouwer), la classification des surfaces, la théorie de l'intersection, et — via la cohomologie et de Rham — relie la topologie à l'analyse et à la géométrie algébrique. La formule d'Euler $V - E + F = 2$ en est le plus ancien avatar.",
  examples: [
    { title: "L'homologie du cercle triangulé", steps: [
      { p: "Triangule $S^1$ : $3$ sommets, $3$ arêtes, $C_0 = C_1 = \\mathbb{Z}^3$, et $\\partial(\\text{arête } [i, j]) = j - i$. Le cycle $e_1 + e_2 + e_3$ (le tour complet) a un bord nul : c'est un générateur de $Z_1 = \\ker \\partial_1 \\cong \\mathbb{Z}$." },
      { p: "Aucune $2$-chaîne n'existe ($B_1 = 0$), donc $H_1(S^1) = Z_1 / B_1 \\cong \\mathbb{Z}$. Par ailleurs $H_0 = \\mathbb{Z}$ (connexe). La caractéristique d'Euler $\\chi(S^1) = \\mathrm{rang}\\, H_0 - \\mathrm{rang}\\, H_1 = 1 - 1 = 0$, en accord avec $V - E = 3 - 3 = 0$." },
    ] },
    { title: "Caractéristique d'Euler des surfaces", steps: [
      { p: "Pour la sphère $S^2$ : $H_0 = \\mathbb{Z}$, $H_1 = 0$, $H_2 = \\mathbb{Z}$, donc $\\chi(S^2) = 1 - 0 + 1 = 2$. C'est la formule d'Euler $V - E + F = 2$ pour tout polyèdre convexe (un cube : $8 - 12 + 6 = 2$)." },
      { p: "Pour le tore $T^2$ : $H_0 = \\mathbb{Z}$, $H_1 = \\mathbb{Z}^2$, $H_2 = \\mathbb{Z}$, donc $\\chi(T^2) = 1 - 2 + 1 = 0$. Plus généralement, la surface de genre $g$ a $\\chi(\\Sigma_g) = 2 - 2g$ : chaque anse abaisse la caractéristique de $2$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que mesure le groupe $H_0(X)$ ? Que vaut-il pour un espace ayant $k$ composantes connexes ?", solution: "$H_0(X)$ mesure les **composantes connexes** par arcs : deux points sont homologues en degré $0$ s'ils sont reliés par un chemin (un $1$-bord). Pour un espace à $k$ composantes, $H_0(X) \\cong \\mathbb{Z}^k$, de rang $k$ : un générateur par composante. C'est le sens le plus simple de l'homologie — compter les morceaux." },
    { tier: "warmup", prompt: "Vérifie la formule d'Euler $\\chi(S^2) = 2$ sur un cube ($V$ sommets, $E$ arêtes, $F$ faces).", solution: "Un cube a $V = 8$ sommets, $E = 12$ arêtes, $F = 6$ faces. La caractéristique d'Euler est $\\chi = V - E + F = 8 - 12 + 6 = 2$. C'est indépendant de la triangulation choisie (tétraèdre : $4 - 6 + 4 = 2$ ; octaèdre : $6 - 12 + 8 = 2$) : $\\chi(S^2) = 2$ est un **invariant** de la sphère." },
    { tier: "application", prompt: "Sachant que $H_1(X) \\cong \\pi_1(X)^{\\mathrm{ab}}$, calcule $H_1$ du tore $T^2$ et du bouquet de deux cercles $S^1 \\vee S^1$.", solution: "Pour le tore, $\\pi_1(T^2) = \\mathbb{Z}^2$ est déjà abélien, donc $H_1(T^2) = (\\mathbb{Z}^2)^{\\mathrm{ab}} = \\mathbb{Z}^2$. Pour le bouquet, $\\pi_1 = F_2$ (groupe libre à deux générateurs, non abélien) ; son **abélianisé** est $F_2^{\\mathrm{ab}} = \\mathbb{Z}^2$, donc $H_1(S^1 \\vee S^1) = \\mathbb{Z}^2$. L'homologie ne distingue pas ces deux espaces en degré $1$ (l'information non abélienne de $\\pi_1$ est perdue), mais $H_2$ les sépare ($H_2(T^2) = \\mathbb{Z}$ contre $H_2(S^1 \\vee S^1) = 0$)." },
    { tier: "challenge", prompt: "Calcule l'homologie de la sphère $S^2$ : $H_0$, $H_1$, $H_2$. Montre au passage que $\\partial^2 = 0$ entraîne $B_n \\subseteq Z_n$.", solution: "**Bord d'un bord** ($\\partial^2 = 0 \\Rightarrow B_n \\subseteq Z_n$) : si $x \\in B_n = \\mathrm{im}\\,\\partial_{n+1}$, alors $x = \\partial_{n+1} y$, donc $\\partial_n x = \\partial_n \\partial_{n+1} y = 0$, soit $x \\in \\ker \\partial_n = Z_n$. Le quotient $H_n = Z_n/B_n$ a donc un sens.\n\n**Sphère** $S^2$ : avec une structure cellulaire minimale (une $0$-cellule, une $2$-cellule, pas de $1$-cellule), $C_0 = \\mathbb{Z}$, $C_1 = 0$, $C_2 = \\mathbb{Z}$, tous les $\\partial$ nuls. Donc $H_0 = \\mathbb{Z}$ (connexe), $H_1 = 0$ (simplement connexe : tout lacet se rétracte), $H_2 = \\mathbb{Z}$ (la cavité, le $2$-cycle fondamental). La caractéristique $\\chi(S^2) = 1 - 0 + 1 = 2$ ■." },
    { tier: "exam", prompt: "(1) Définis un complexe de chaînes, les cycles, les bords, et l'homologie $H_n$. (2) Que signifient $H_0$ et $H_1$ ? (3) Définis la caractéristique d'Euler et dis pourquoi c'est un invariant. (4) Calcule l'homologie et $\\chi$ de $S^2$ et de $T^2$.", solution: "(1) Un **complexe de chaînes** est une suite $(C_n, \\partial_n)$ de groupes abéliens avec $\\partial_n \\partial_{n+1} = 0$. **Cycles** $Z_n = \\ker \\partial_n$, **bords** $B_n = \\mathrm{im}\\, \\partial_{n+1}$ ; comme $B_n \\subseteq Z_n$, l'**homologie** est $H_n = Z_n / B_n$.\n\n(2) $H_0(X) = \\mathbb{Z}^{(\\#\\text{composantes})}$ compte les composantes connexes ; $H_1(X) = \\pi_1(X)^{\\mathrm{ab}}$ est l'abélianisé du groupe fondamental (trous de dimension $1$).\n\n(3) $\\chi(X) = \\sum_n (-1)^n \\mathrm{rang}\\, H_n = \\sum_n (-1)^n (\\#\\, n\\text{-cellules})$. L'égalité des deux sommes et l'invariance des $H_n$ par déformation font de $\\chi$ un **invariant topologique**.\n\n(4) $S^2$ : $H_0 = \\mathbb{Z}$, $H_1 = 0$, $H_2 = \\mathbb{Z}$, $\\chi = 2$. $T^2$ : $H_0 = \\mathbb{Z}$, $H_1 = \\mathbb{Z}^2$, $H_2 = \\mathbb{Z}$, $\\chi = 1 - 2 + 1 = 0$ ■." },
  ],
  practice: [
    { tier: "discovery", label: "Rang de H0 = composantes", make: (r) => {
      const k = randint(r, 1, 6);
      return { prompt: `Un espace topologique a $${k}$ composantes connexes par arcs. Quel est le rang de $H_0$ ?`, answer: k, solution: `$H_0 \\cong \\mathbb{Z}^{${k}}$ : un générateur par composante connexe, donc rang $${k}$.` };
    } },
    { tier: "warmup", label: "Caractéristique d'Euler d'une surface", make: (r) => {
      const g = randint(r, 0, 5);
      return { prompt: `Quelle est la caractéristique d'Euler de la surface orientable de genre $${g}$ ?`, answer: 2 - 2 * g, solution: `$\\chi(\\Sigma_g) = 2 - 2g = 2 - 2 \\times ${g} = ${2 - 2 * g}$ : chaque anse abaisse $\\chi$ de $2$.` };
    } },
    { tier: "application", label: "Nombre de Betti du n-tore", make: (r) => {
      const n = randint(r, 2, 6);
      const k = randint(r, 0, n);
      const fact = (m) => (m <= 1 ? 1 : m * fact(m - 1));
      const c = fact(n) / (fact(k) * fact(n - k));
      return { prompt: `Pour le $${n}$-tore $T^{${n}}$, le rang de $H_{${k}}$ vaut $\\binom{${n}}{${k}}$ (formule de Künneth). Que vaut ce nombre de Betti ?`, answer: c, solution: `$\\mathrm{rang}\\, H_{${k}}(T^{${n}}) = \\binom{${n}}{${k}} = ${c}$ : on choisit $${k}$ des $${n}$ cercles facteurs.` };
    } },
  ],
};

export default [groupeFondamental, revetementsVanKampen, homologie];
