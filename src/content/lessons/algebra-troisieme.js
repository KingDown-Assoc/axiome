// Field "Algebra" — MIDDLE module (3e year): identities, product equations,
// inequalities. Official cycle-4 programme: using DOUBLE DISTRIBUTIVITY to
// expand and factor, manipulating the THREE remarkable identities
// (a+b)² = a²+2ab+b², (a−b)² = a²−2ab+b², a²−b² = (a−b)(a+b) for expanding and
// factoring; solving a ZERO-PRODUCT equation and practising analysis-synthesis
// reasoning; solving first-degree INEQUALITIES of the form ax ≥ b analytically
// and graphically — Sophie Germain's identity as the official extension.
import { randint, pick } from "../../core/exercises.js";

// — Double distributivity and identities (programme: les trois identités) —
const identites = {
  id: "algebra.middle.identites",
  level: "middle", domain: "algebra",
  title: "Les identités remarquables",
  tagline: "(a + b)² = a² + 2ab + b² — le rectangle découpé l'avait toujours su.",
  prereqs: ["algebra.middle.calcul-litteral", "algebra.middle.demonstrations"],
  intuition:
    "La distributivité **double** : $(a + b)(c + d) = ac + ad + bc + bd$ — chaque terme du premier facteur visite chaque terme du second : quatre produits.\n\nAppliquée à des carrés, elle livre trois égalités si utiles qu'on les sait par cœur — les **identités remarquables** : $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, et $(a-b)(a+b) = a^2 - b^2$.",
  depths: {
    discovery:
      "**Avec les mains** : dessine le carré de côté $a + b$ — il se découpe en quatre régions : un carré $a^2$, un carré $b^2$, et **deux** rectangles $ab$ : l'aire totale est $a^2 + 2ab + b^2$. Le double produit $2ab$ que tout le monde oublie est là, sous tes yeux : deux rectangles, pas un.",
    standard:
      "**En image** : les identités travaillent dans les **deux sens** — développer : $(x + 5)^2 = x^2 + 10x + 25$ ; **factoriser** (le sens payant !) : $x^2 - 9 = x^2 - 3^2 = (x - 3)(x + 3)$ — reconnaître une différence de deux carrés, c'est tenir une factorisation gratuite. Le piège mortel : $(a + b)^2 \\neq a^2 + b^2$ — le double produit n'est pas optionnel ($(3+4)^2 = 49 \\neq 25$).",
    advanced:
      "**Dans la tête** : les identités calculent de tête — $101^2 = (100 + 1)^2 = 10\\,000 + 200 + 1 = 10\\,201$ ; $99 \\times 101 = (100 - 1)(100 + 1) = 100^2 - 1 = 9\\,999$ ; $98^2 = 10\\,000 - 400 + 4 = 9\\,604$. Et elles **démontrent** : la différence des carrés de deux entiers consécutifs ? $(n+1)^2 - n^2 = 2n + 1$ — toujours impair, et c'est leur somme ! Sophie Germain, qui étudiait clandestinement sous un nom d'homme, a poussé le jeu plus loin avec sa célèbre identité sur $a^4 + 4b^4$ — les identités sont l'atelier du théoricien des nombres.",
  },
  keyIdea: "$(a+b)(c+d) = ac + ad + bc + bd$. Les trois identités : $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$ (jamais sans le **double produit** !) et $a^2 - b^2 = (a-b)(a+b)$ — développer ↔ factoriser.",
  why:
    "Pourquoi mémoriser trois égalités qu'on peut redémontrer ? Pour la **reconnaissance** : factoriser exige de voir $x^2 - 9$ comme $x^2 - 3^2$ en une seconde — et la factorisation est la clé des équations à venir (produit nul !), des simplifications, des démonstrations. Les identités sont aux algébristes ce que les tables sont aux calculateurs : pas du savoir, des réflexes.",
  examples: [
    { title: "Le carré découpé", steps: [
      { p: "$(x + 5)^2$ : le carré $x^2$, le carré $25$, et **deux** rectangles $5x$." },
      { p: "$= x^2 + 10x + 25$ — le double produit est géométrique, pas décoratif." },
    ] },
    { title: "Factoriser une différence de carrés", steps: [
      { p: "$x^2 - 9 = x^2 - 3^2$ — reconnaître les deux carrés." },
      { p: "$= (x - 3)(x + 3)$ — la troisième identité, lue à l'envers : une factorisation gratuite." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Développe $(a + b)(c + d)$ et explique le découpage du rectangle correspondant.", solution: "$ac + ad + bc + bd$ — le rectangle de côtés $a + b$ et $c + d$ se coupe en **quatre** régions : chaque morceau du premier côté rencontre chaque morceau du second." },
    { tier: "warmup", prompt: "Développe avec les identités : $(x + 5)^2$ ; $(x - 3)^2$ ; $(x - 4)(x + 4)$.", solution: "$x^2 + 10x + 25$ ; $x^2 - 6x + 9$ ; $x^2 - 16$ — carré, double produit, carré ; et la troisième fait disparaître les termes croisés." },
    { tier: "application", prompt: "Factorise : $x^2 - 49$ ; $x^2 + 6x + 9$ ; $4x^2 - 25$.", solution: "$(x-7)(x+7)$ ; $(x+3)^2$ ; $(2x-5)(2x+5)$ — reconnaître les carrés ($4x^2 = (2x)^2$ !), puis lire l'identité à l'envers." },
    { tier: "challenge", prompt: "Calcule de tête avec les identités : $101^2$ ; $99 \\times 101$ ; $98^2$.", solution: "$(100+1)^2 = $ **10 201** ; $(100-1)(100+1) = 10\\,000 - 1 = $ **9 999** ; $(100-2)^2 = 10\\,000 - 400 + 4 = $ **9 604** — les identités sont des raccourcis de calcul mental." },
    { tier: "exam", prompt: "Démontre avec une identité que la différence des carrés de deux entiers consécutifs est toujours impaire — et précise quel impair.", solution: "$(n+1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1$ : un **impair** (le costume de 4e !), et précisément **la somme des deux entiers** ($n + (n+1) = 2n + 1$) — exemple : $26^2 - 25^2 = 51 = 25 + 26$, sans poser un seul carré. L'identité démontre et calcule d'un même geste." },
  ],
  practice: [
    { tier: "warmup", label: "Le double produit", make: (r) => {
      const b = randint(r, 2, 9);
      return { prompt: `Développe $(x + ${b})^2 = x^2 + ?x + ${b * b}$ : quel coefficient pour $x$ ?`, answer: 2 * b, solution: `Double produit : $2 \\times ${b} = $ **${2 * b}** — les deux rectangles du carré découpé.` };
    } },
    { tier: "application", label: "La différence de carrés", make: (r) => {
      const b = randint(r, 2, 12);
      return { prompt: `Factorise $x^2 - ${b * b} = (x - ?)(x + ?)$ : quelle valeur ?`, answer: b, solution: `$${b * b} = ${b}^2$ → $(x - ${b})(x + ${b})$ : **${b}**.` };
    } },
    { tier: "challenge", label: "Le calcul mental des identités", make: (r) => {
      const n = pick(r, [10, 20, 30, 50, 100]); const d = pick(r, [1, 2]);
      return { prompt: `Calcule de tête $${n - d} \\times ${n + d}$ (identité !).`, answer: n * n - d * d, solution: `$(${n} - ${d})(${n} + ${d}) = ${n}^2 - ${d * d} = $ **${n * n - d * d}**.` };
    } },
  ],
};

// — The zero-product equation (programme: équation produit nul, analyse-synthèse) —
const equationProduit = {
  id: "algebra.middle.equation-produit",
  level: "middle", domain: "algebra",
  title: "L'équation produit nul",
  tagline: "Un produit nul a forcément un facteur nul — factoriser, c'est résoudre.",
  prereqs: ["algebra.middle.identites", "algebra.middle.equations-degre1"],
  intuition:
    "Le théorème le plus simple et le plus puissant du chapitre : **un produit est nul si et seulement si l'un de ses facteurs est nul**.\n\nD'où une méthode : $(x - 3)(x + 5) = 0$ se casse en deux mini-équations — $x - 3 = 0$ **ou** $x + 5 = 0$ : solutions $3$ et $-5$. Une équation de degré 2, résolue avec les outils du degré 1.",
  depths: {
    discovery:
      "**Avec les mains** : pourquoi le théorème est-il vrai ? Multiplie deux nombres **non nuls** : le résultat n'est jamais zéro (la règle des signes ne fabrique pas de zéro). Donc si le produit vaut zéro, au moins un facteur a craqué — pas d'autre issue. Le « ou » est inclusif : les deux peuvent être nuls.",
    standard:
      "**En image** : le pipeline complet — $x^2 = 49$ : ramène tout à gauche ($x^2 - 49 = 0$), **factorise** par l'identité ($\\,(x-7)(x+7) = 0\\,$), casse en deux ($x = 7$ ou $x = -7$) — tes deux solutions de $x^2 = a$, retrouvées par l'algèbre pure. Factoriser n'était pas un exercice de style : c'était la **clé des équations**.",
    advanced:
      "**Dans la tête** : la méthode a un nom — l'**analyse-synthèse** : *analyse* (« si $x$ est solution, alors le produit est nul, alors un facteur est nul, alors $x = 3$ ou $x = -5$ » — on déduit les candidats) puis *synthèse* (« réciproquement, $3$ et $-5$ vérifient bien l'équation » — on les confirme). Deux mouvements : restreindre, puis valider. C'est le squelette logique de toute résolution rigoureuse — la contraposée de 4e avait des cousins, voici le raisonnement complet.",
  },
  keyIdea: "Produit nul ⟺ **un facteur nul** : $(x-3)(x+5) = 0 \\Leftrightarrow x = 3$ ou $x = -5$. Pipeline : tout à gauche, **factoriser**, casser en équations de degré 1.",
  why:
    "Pourquoi se réjouir d'un théorème aussi évident ? Parce qu'il **change de degré** : sans lui, $x^2 - 4x - 5 = 0$ est hors de portée du collège ; factorisée en $(x-5)(x+1) = 0$, elle tombe en deux lignes. Toute la résolution des équations polynomiales — collège, lycée, et au-delà — repose sur ce levier : ramener au produit nul. C'est petit, et ça soulève tout.",
  examples: [
    { title: "Casser le produit", steps: [
      { p: "$(x - 3)(x + 5) = 0$ : un facteur doit être nul." },
      { p: "$x - 3 = 0$ ou $x + 5 = 0$ : solutions **3** et **−5** — deux mini-équations de 4e." },
    ] },
    { title: "x² = 49 par l'algèbre", steps: [
      { p: "$x^2 - 49 = 0 \\to (x - 7)(x + 7) = 0$ — l'identité factorise." },
      { p: "$x = 7$ ou $x = -7$ — les deux solutions, démontrées sans le graphique." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi un produit de deux nombres non nuls ne peut-il jamais valoir zéro ?", solution: "La règle des signes ne fabrique que du positif ou du négatif à partir de non-nuls — jamais zéro. Donc produit nul ⟹ **au moins un facteur nul** : le théorème n'a pas d'échappatoire." },
    { tier: "warmup", prompt: "Résous $(x - 3)(x + 5) = 0$.", solution: "$x - 3 = 0$ **ou** $x + 5 = 0$ : $x = $ **3** ou $x = $ **−5** — le produit se casse en deux équations du premier degré." },
    { tier: "application", prompt: "Résous $x^2 = 49$ en passant par une factorisation.", solution: "$x^2 - 49 = 0 \\to (x - 7)(x + 7) = 0 \\to x = $ **7** ou $x = $ **−7** — l'identité remarquable transforme le degré 2 en deux degrés 1." },
    { tier: "challenge", prompt: "Résous $x^2 + 6x + 9 = 0$. Combien de solutions, et pourquoi ?", solution: "$x^2 + 6x + 9 = (x + 3)^2 = 0$ : un carré nul exige $x + 3 = 0$ → **une seule** solution, $-3$ — les deux facteurs du produit sont le même : la solution « double » du lycée pointe déjà." },
    { tier: "exam", prompt: "Résous $(2x - 6)(x + 1) = 0$ en rédigeant l'analyse puis la synthèse.", solution: "**Analyse** : si $x$ est solution, un facteur est nul — $2x - 6 = 0$ (donc $x = 3$) ou $x + 1 = 0$ (donc $x = -1$) : les seuls candidats sont $3$ et $-1$. **Synthèse** : $(2 \\times 3 - 6)(3 + 1) = 0 \\times 4 = 0$ ✓ et $(2 \\times (-1) - 6)((-1) + 1) = (-8) \\times 0 = 0$ ✓ — les deux candidats sont solutions. Restreindre puis valider : le raisonnement complet, en deux mouvements." },
  ],
  practice: [
    { tier: "warmup", label: "Casser le produit", make: (r) => {
      const a = randint(r, 1, 9); const b = randint(r, 1, 9);
      return { prompt: `$(x - ${a})(x + ${b}) = 0$ : donne la solution positive.`, answer: a, solution: `$x = ${a}$ ou $x = -${b}$ — la positive : **${a}**.` };
    } },
    { tier: "application", label: "Factoriser puis casser", make: (r) => {
      const b = randint(r, 2, 11);
      return { prompt: `Résous $x^2 - ${b * b} = 0$ : donne la solution négative.`, answer: -b, solution: `$(x - ${b})(x + ${b}) = 0$ → $x = \\pm ${b}$ — la négative : **−${b}**.` };
    } },
  ],
};

// — First-degree inequalities (programme: inéquation ax ⩾ b, résolution graphique) —
const inequations = {
  id: "algebra.middle.inequations",
  level: "middle", domain: "algebra",
  title: "Les inéquations",
  tagline: "Une infinité de solutions — et le sens qui s'inverse en divisant par un négatif.",
  prereqs: ["algebra.middle.equations-degre1", "numbers.middle.relatifs"],
  intuition:
    "Une **inéquation** remplace le $=$ par une comparaison : $3x + 5 \\geq 17$. La réponse n'est plus **un** nombre mais une **demi-droite** : tous les $x \\geq 4$.\n\nLa résolution copie celle des équations — mêmes marches, mêmes gestes des deux côtés — avec **un** piège : multiplier ou diviser par un **négatif** retourne le sens.",
  depths: {
    discovery:
      "**Avec les mains** : pourquoi le retournement ? Prends $2 < 5$ (vrai) et multiplie par $-1$ : $-2$ et $-5$… or $-2 > -5$ ! Passer aux opposés **reflète** la droite graduée : la gauche devient la droite, et toute comparaison s'inverse. Le piège n'est pas une convention : c'est la symétrie des relatifs.",
    standard:
      "**En image** : résoudre et **représenter** — $3x + 5 \\geq 17 \\to 3x \\geq 12 \\to x \\geq 4$ : sur la droite graduée, un crochet en 4 ([ fermé : 4 est solution) et tout ce qui suit en surbrillance. Avec un négatif : $-2x > 6 \\to x < -3$ (division par $-2$ : le $>$ devient $<$) — vérifie avec $x = -4$ : $-2 \\times (-4) = 8 > 6$ ✓.",
    advanced:
      "**Dans la tête** : la résolution **graphique** boucle avec les fonctions — $2x + 3 \\geq 9$ : trace la droite de $x \\to 2x + 3$ et la droite horizontale $y = 9$ : la solution est l'ensemble des $x$ où la première passe **au-dessus** : à partir de leur intersection ($x = 3$). L'équation cherchait le point de croisement ; l'inéquation demande tout un côté — la même image répond aux deux questions, et c'est ainsi que tu liras les seuils du monde réel : à partir de quand l'offre A bat-elle l'offre B ?",
  },
  keyIdea: "Mêmes gestes que l'équation, **sauf** : multiplier/diviser par un négatif **retourne le sens**. La solution est une demi-droite — à dessiner sur la droite graduée, ou à lire sur le graphique.",
  why:
    "Pourquoi des inéquations, quand les équations répondaient si bien ? Parce que le monde pose plus souvent des questions de **seuil** que d'égalité — à partir de combien de films l'abonnement gagne-t-il ? quelle vitesse maximale pour arriver à l'heure ? quel budget suffit ? L'égalité est un point ; la vie se joue dans les intervalles, et l'inéquation est leur langue.",
  examples: [
    { title: "La demi-droite solution", steps: [
      { p: "$3x + 5 \\geq 17 \\to 3x \\geq 12 \\to x \\geq 4$ — les marches de l'équation." },
      { p: "Solutions : **tous** les nombres à partir de 4 — un crochet et une demi-droite, pas un point." },
    ] },
    { title: "Le retournement", steps: [
      { p: "$-2x > 6$ : division par $-2$, négatif — le sens s'inverse." },
      { p: "$x < -3$ — contrôle avec $-4$ : $-2 \\times (-4) = 8 > 6$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Multiplie l'inégalité vraie $2 < 5$ par $-1$ : que constates-tu, et pourquoi ?", solution: "$-2 > -5$ — le sens s'est **retourné** : passer aux opposés reflète la droite graduée (la gauche devient la droite). D'où la règle : multiplier/diviser par un négatif inverse la comparaison." },
    { tier: "warmup", prompt: "Résous $3x + 5 \\geq 17$ et décris la représentation sur la droite graduée.", solution: "$3x \\geq 12 \\to x \\geq $ **4** — crochet fermé en 4 (le 4 est solution), demi-droite surlignée vers la droite : une infinité de solutions." },
    { tier: "application", prompt: "Résous $-2x > 6$ et vérifie avec une valeur.", solution: "Division par $-2$ : le sens s'inverse — $x < $ **−3**. Contrôle : $x = -4$ donne $-2 \\times (-4) = 8 > 6$ ✓ ; et $x = 0$ donne $0 > 6$ ✗ : la demi-droite est du bon côté." },
    { tier: "challenge", prompt: "Résous $5x - 2 < 2x + 10$.", solution: "$-2x$ des deux côtés : $3x - 2 < 10 \\to 3x < 12 \\to x < $ **4** — rassembler comme en 4e ; aucun négatif n'a divisé : le sens tient." },
    { tier: "exam", prompt: "Un forfait A coûte $2x + 3$ € pour $x$ Go, un forfait B coûte $9$ € fixes. Résous $2x + 3 \\geq 9$, interprète, et explique ce que la résolution graphique montrerait.", solution: "$2x \\geq 6 \\to x \\geq $ **3 Go** : à partir de 3 Go, A coûte au moins autant que B — B devient avantageux. Graphiquement : la droite de $2x + 3$ croise l'horizontale $y = 9$ en $x = 3$ et passe **au-dessus** ensuite — l'équation donnait le point de bascule, l'inéquation colorie tout le côté gagnant." },
  ],
  practice: [
    { tier: "warmup", label: "Les marches, version seuil", make: (r) => {
      const a = randint(r, 2, 6); const x = randint(r, 2, 10); const b = randint(r, 1, 9);
      return { prompt: `Résous $${a}x + ${b} \\geq ${a * x + b}$ : la solution est $x \\geq \\,?$`, answer: x, solution: `$${a}x \\geq ${a * x}$ → $x \\geq $ **${x}** — les marches de l'équation, le crochet en plus.` };
    } },
    { tier: "application", label: "Le retournement", make: (r) => {
      const a = pick(r, [2, 3, 4]); const x = randint(r, 1, 8);
      return { prompt: `Résous $-${a}x > -${a * x}$ : la solution est $x < \\,?$`, answer: x, solution: `Division par $-${a}$ : le sens s'inverse — $x < $ **${x}**.` };
    } },
    { tier: "challenge", label: "Solution ou pas ?", make: (r) => {
      const seuil = randint(r, -5, 8); const v = seuil + pick(r, [-3, -1, 0, 2, 4]);
      return { prompt: `$x \\geq ${seuil}$ : le nombre ${v} est-il solution ? (1 = oui, 0 = non)`, answer: v >= seuil ? 1 : 0, solution: `$${v} ${v >= seuil ? "\\geq" : "<"} ${seuil}$ → **${v >= seuil ? "oui" : "non"}** — le crochet ferme la frontière : ${seuil} lui-même est solution.` };
    } },
  ],
};

export default [identites, equationProduit, inequations];
