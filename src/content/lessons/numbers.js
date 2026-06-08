// Field "Numbers & arithmetic" — PRESCHOOL module (school readiness) + one primary lesson (transition).
import { randint, pick } from "../../core/exercises.js";

const WORDS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];

const recognizeQuantities = {
  id: "numbers.preschool.subitize",
  level: "preschool", domain: "numbers",
  title: "Voir les petites quantités d'un coup d'œil",
  tagline: "Reconnaître 1, 2, 3 (et un peu plus) sans compter un par un.",
  prereqs: [],
  intuition:
    "Quand tu vois deux yeux, tu ne comptes pas « un, deux » : tu vois **deux**, tout de suite. Pareil pour les points d'un dé. Cette reconnaissance immédiate marche bien jusqu'à 3 ou 4.\n\nAu-delà, l'astuce des grands : on **groupe**. Cinq points, c'est souvent vu comme « 4 et encore 1 », ou « 3 et 2 ». On reconnaît des petits paquets, puis on les assemble.",
  depths: {
    discovery: "1, 2, 3 se reconnaissent d'un seul regard. Pour 4 ou 5, on voit des petits paquets.",
    standard: "Reconnaître une quantité sans compter s'appelle le **subitizing**. Il est fiable jusqu'à 3–4 objets ; au-delà, on s'appuie sur des regroupements (les constellations du dé, les doigts) pour aller plus vite que le comptage un-à-un.",
    advanced: "C'est la première rencontre avec l'idée de **cardinal** : une collection « porte » un nombre, indépendamment de la façon dont ses objets sont disposés. Voir $5$ comme $4+1$ ou $3+2$ est déjà une décomposition — la graine de toute l'arithmétique additive.",
  },
  keyIdea: "Reconnaître **sans compter** : 1, 2, 3 d'un coup ; au-delà, on groupe.",
  why:
    "Pourquoi grouper plutôt que compter ? Parce que compter un par un est lent et on peut se tromper. En reconnaissant des paquets familiers (la face « 5 » d'un dé, une main = 5 doigts), on lit la quantité comme on lit un mot : d'un bloc.",
  widgets: [
    { kind: "numberline", params: { mode: "counters", count: 3, max: 6 }, caption: "Regarde, puis dis combien sans pointer. Ajoute un rond et recommence." },
  ],
  examples: [
    { title: "Le dé montre ⚄", steps: [
      { p: "Je ne compte pas point par point." },
      { p: "Je reconnais la constellation du **5** : quatre coins et un point au centre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de points ? ● ●", solution: "**2** — on le voit d'un coup." },
    { tier: "application", prompt: "Sur un dé, la face avec un point à chaque coin et un au milieu, c'est quel nombre ?", solution: "C'est le **5**." },
    { tier: "exam", prompt: "Tu vois ●●● ●● (un paquet de 3 et un paquet de 2). Combien en tout, sans tout recompter ?", solution: "$3$ et $2$ → **5**." },
  ],
  practice: [
    { tier: "warmup", label: "Lire une quantité d'un coup", make: (r) => { const n = randint(r, 1, 4); return { prompt: "Combien de points (sans compter un par un) ?\n\n" + "● ".repeat(n).trim(), answer: n, solution: `Il y en a **${n}**.` }; } },
  ],
};

const numberSequence = {
  id: "numbers.preschool.number-sequence",
  level: "preschool", domain: "numbers",
  title: "La comptine des nombres",
  tagline: "Dire les nombres dans l'ordre : avant, après, jusqu'où ?",
  prereqs: [],
  intuition:
    "Les nombres ont un ordre fixe : un, deux, trois, quatre… toujours le même. C'est comme une chanson qu'on apprend par cœur.\n\nQuand tu connais bien la chanson, tu peux répondre à : « quel nombre vient **juste après** 6 ? » (sept) ou « **juste avant** 9 ? » (huit), sans repartir de un.",
  depths: {
    discovery: "Les nombres se disent toujours dans le même ordre. Après 6 vient 7 ; avant 9 vient 8.",
    standard: "Réciter la **comptine numérique** dans l'ordre est une compétence à part entière. Maîtriser « le nombre d'après » (le successeur) et « le nombre d'avant » (le prédécesseur) prépare l'addition et la soustraction de 1.",
    advanced: "Chaque nombre a un **successeur** unique : c'est l'idée qui fonde $\\mathbb{N}$. « Commencer à $0$, et toujours pouvoir ajouter $1$ » est, formalisé, l'axiome qui engendre tous les entiers (Peano). La comptine est la version chantée de cet axiome.",
  },
  keyIdea: "Chaque nombre a **un suivant** (+1) et **un précédent** (−1).",
  why:
    "Pourquoi insister sur « juste après » et « juste avant » ? Parce qu'avancer d'un cran, c'est ajouter 1, et reculer d'un cran, c'est enlever 1. Toute l'addition commence là : compter, c'est déjà calculer.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 10, value: 6 }, caption: "Avance d'un cran : c'est le nombre « d'après ». Recule : le nombre « d'avant »." },
  ],
  examples: [
    { title: "Le nombre juste après 6", steps: [
      { p: "Je continue la comptine à partir de 6 : « …six, **sept** »." },
      { p: "Le nombre d'après 6 est **7** (c'est $6 + 1$)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel nombre vient juste après 3 ?", solution: "**4**." },
    { tier: "warmup", prompt: "Quel nombre vient juste avant 5 ?", solution: "**4**." },
    { tier: "challenge", prompt: "Récite à rebours de 5 jusqu'à 1.", solution: "5, 4, 3, 2, 1." },
    { tier: "exam", prompt: "Entre 7 et 9, quel nombre se cache ?", solution: "**8** (c'est le suivant de 7 et le précédent de 9)." },
  ],
  practice: [
    { tier: "application", label: "Le nombre d'après / d'avant", make: (r) => { const apres = r() < 0.5; const x = randint(r, apres ? 0 : 1, apres ? 9 : 10); return apres ? { prompt: `Quel nombre vient juste APRÈS ${x} ?`, answer: x + 1, solution: `${x} + 1 = **${x + 1}**.` } : { prompt: `Quel nombre vient juste AVANT ${x} ?`, answer: x - 1, solution: `${x} − 1 = **${x - 1}**.` }; } },
  ],
};

const countObjects = {
  id: "numbers.preschool.count",
  level: "preschool", domain: "numbers",
  title: "Compter les objets jusqu'à 10",
  tagline: "Associer une quantité à un nombre, un objet à la fois.",
  prereqs: ["numbers.preschool.subitize", "numbers.preschool.number-sequence"],
  intuition:
    "Compter, c'est dire la comptine en touchant un objet à chaque nombre. Le tout dernier nombre que tu dis, c'est *combien il y en a*.\n\nAstuce : range les objets en ligne et pose le doigt sur chacun. Comme ça tu n'oublies personne et tu ne comptes personne deux fois.",
  depths: {
    discovery: "Un objet = un nombre dit. Le **dernier** mot, c'est la quantité.",
    standard: "Le comptage relie la comptine et les objets par une correspondance « un pour un ». Le dernier nombre énoncé donne le **cardinal** (la quantité) — c'est le principe cardinal.",
    advanced: "Dénombrer une collection finie, c'est exhiber une bijection avec un segment $\\{1,\\dots,n\\}$ de $\\mathbb{N}$ ; l'entier $n$ est le cardinal. Que le résultat ne dépende pas de l'ordre du comptage est déjà un petit théorème.",
  },
  keyIdea: "Le **dernier nombre dit** = la quantité totale.",
  why:
    "Pourquoi « le dernier nombre = la quantité » ? Parce qu'à chaque objet on a avancé le compteur d'exactement un. Si on n'oublie personne et qu'on ne compte personne deux fois, le compteur a forcément grimpé autant de fois qu'il y a d'objets.",
  widgets: [
    { kind: "numberline", params: { mode: "counters", count: 5, max: 10 }, caption: "Pointe chaque rond en disant la comptine ; le dernier mot = le total." },
  ],
  examples: [
    { title: "Compter 4 pommes", steps: [
      { p: "Je pointe la 1re : « un ». 2e : « deux ». 3e : « trois ». 4e : « quatre »." },
      { p: "Dernier mot : « quatre » → il y a **4** pommes." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Il y a ★ ★ ★. Combien d'étoiles ?", solution: "Un, deux, trois → **3**." },
    { tier: "application", prompt: "J'ai compté des billes ; le dernier nombre dit était « huit ». Combien de billes ?", solution: "Le dernier nombre dit donne la quantité → **8**." },
    { tier: "exam", prompt: "Léa compte 5 jetons, puis en ajoute 2 en continuant de compter. Combien en a-t-elle ?", solution: "Elle repart de 5 : six, sept → **7**." },
  ],
  practice: [
    { tier: "warmup", label: "Compter des étoiles", make: (r) => { const n = randint(r, 3, 10); return { prompt: "Combien d'étoiles ?\n\n" + "★ ".repeat(n).trim(), answer: n, solution: `On compte une à une : **${n}**.` }; } },
  ],
};

const digits = {
  id: "numbers.preschool.digits",
  level: "preschool", domain: "numbers",
  title: "Les chiffres de 0 à 9",
  tagline: "Relier le mot, la quantité et le signe écrit.",
  prereqs: ["numbers.preschool.count"],
  intuition:
    "Un même nombre a trois visages : le **mot** qu'on dit (« cinq »), la **quantité** qu'on voit (✋), et le **chiffre** qu'on écrit (5). Apprendre les chiffres, c'est savoir passer de l'un à l'autre.\n\nAvec dix signes seulement — 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 — on peut écrire tous les nombres du monde. C'est une invention géniale.",
  depths: {
    discovery: "Chaque quantité a un signe : ✋ = 5. On apprend à lire et à écrire ces dix signes.",
    standard: "Il y a dix **chiffres** (0 à 9). Il ne faut pas confondre *chiffre* (le signe) et *nombre* (la quantité) : 12 est un nombre écrit avec deux chiffres. Associer mot ↔ quantité ↔ chiffre, dans les deux sens, est la base.",
    advanced: "Dix chiffres suffisent grâce à la **numération de position** : la place d'un chiffre lui donne sa valeur (puissances de $10$). Le $0$ y joue un rôle clé — marquer une place vide — ce qui en fait l'une des inventions mathématiques les plus puissantes.",
  },
  keyIdea: "**Chiffre** = un signe (il y en a 10). **Nombre** = une quantité.",
  why:
    "Pourquoi seulement dix chiffres ? Parce qu'on réutilise les mêmes signes en changeant leur place : le 1 de « 1 » et le 1 de « 10 » ne valent pas pareil. Cette idée de *position* permet d'écrire des nombres aussi grands qu'on veut sans inventer de nouveaux signes.",
  widgets: [
    { kind: "tenframe", params: { count: 5, target: 10 }, caption: "Mets le nombre de jetons qui correspond au chiffre, et lis combien il en manque pour 10." },
  ],
  examples: [
    { title: "Le chiffre pour « sept »", steps: [
      { p: "Je dis le mot : « sept »." },
      { p: "Je compte sur mes doigts : 7." },
      { p: "Je l'écris avec le signe **7**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris en chiffres le nombre « trois ».", solution: "**3**." },
    { tier: "warmup", prompt: "Combien de doigts sur deux mains ? Écris-le en chiffres.", solution: "**10** (deux chiffres : 1 et 0)." },
    { tier: "challenge", prompt: "Le mot « zéro » veut dire combien ? Pourquoi est-il utile ?", solution: "**0** : aucune chose. Il sert à marquer « rien », et plus tard une place vide dans un nombre (comme dans 10)." },
    { tier: "exam", prompt: "Combien de chiffres différents existe-t-il en tout ?", solution: "**10** : de 0 à 9." },
  ],
  practice: [
    { tier: "application", label: "Écrire un nombre en chiffres", make: (r) => { const n = randint(r, 1, 9); return { prompt: `Écris en chiffres : « ${WORDS[n]} ».`, answer: n, solution: `« ${WORDS[n]} » s'écrit **${n}**.` }; } },
  ],
};

const compareNumbers = {
  id: "numbers.preschool.compare",
  level: "preschool", domain: "numbers",
  title: "Comparer : plus, moins, autant",
  tagline: "Décider quelle collection est la plus grande — parfois sans compter.",
  prereqs: ["numbers.preschool.count"],
  intuition:
    "Pour savoir qui a le plus, on associe les objets deux par deux : un des tiens avec un des miens. Celui à qui il en reste « en trop » en a le plus. Si tout s'associe pile-poil, il y en a **autant**.",
  depths: {
    discovery: "On range face à face. S'il en reste d'un côté → ce côté a le plus.",
    standard: "Comparer deux quantités revient à les apparier. On note la relation avec les signes : $3 < 5$, $5 > 3$, $4 = 4$.",
    advanced: "« Avoir au plus autant d'éléments » se définit par l'existence d'une **injection** d'une collection dans l'autre — l'appariement, qui fonde l'ordre sur les cardinaux et se prolonge, bien plus tard, aux ensembles infinis.",
  },
  keyIdea: "Le signe ouvre sa grande bouche vers le **plus grand** : $5 > 3$.",
  why:
    "Le signe vise toujours le plus petit avec sa pointe ($5 > 3$). C'est un moyen mnémotechnique, mais derrière il y a l'appariement : il *reste* des objets du côté du plus grand.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 10, value: 5 }, caption: "Plus on va vers la droite, plus c'est grand." },
  ],
  examples: [
    { title: "Comparer 6 et 4", steps: [
      { p: "J'associe : 4 paires se forment, il reste 2 du côté du 6." },
      { p: "Donc $6 > 4$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Complète avec < ou > :", tex: "2 \\;\\square\\; 7", solution: "$2 < 7$." },
    { tier: "challenge", prompt: "Range du plus petit au plus grand : 8, 3, 5.", solution: "$3 < 5 < 8$." },
    { tier: "exam", prompt: "Tom a 9 billes. Léa en a « autant que Tom, moins 2 ». Qui en a le plus ? Écris la comparaison.", solution: "Léa en a 7. $9 > 7$ : **Tom**." },
  ],
  practice: [
    { tier: "application", label: "Mettre le bon signe", make: (r) => { let a = randint(r, 0, 12), b = randint(r, 0, 12); while (a === b) b = randint(r, 0, 12); const s = a < b ? "<" : ">"; return { prompt: `Quel signe va entre ${a} et ${b} ? (tape < ou >)`, answer: s, check: { type: "exact" }, solution: `${a} ${s} ${b}.` }; } },
  ],
};

const orderNumbers = {
  id: "numbers.preschool.order",
  level: "preschool", domain: "numbers",
  title: "Ranger et classer les nombres",
  tagline: "Du plus petit au plus grand — et la place de chacun (1er, 2e, 3e…).",
  prereqs: ["numbers.preschool.compare", "numbers.preschool.digits"],
  intuition:
    "Quand on compare deux à deux, on peut tout mettre en file : du plus petit au plus grand. C'est **ranger**.\n\nUne fois la file faite, chacun a une **place** : le premier, le deuxième, le troisième… Attention : « trois » (combien) et « troisième » (la place) ne disent pas la même chose.",
  depths: {
    discovery: "On met les nombres en file, du plus petit au plus grand. Chacun a une place : 1er, 2e, 3e…",
    standard: "Ordonner, c'est utiliser la comparaison entre **tous** les nombres à la fois. On distingue le **cardinal** (combien : trois) de l'**ordinal** (le rang : troisième).",
    advanced: "L'ordre sur les entiers est **total** : deux nombres sont toujours comparables. C'est une *relation d'ordre* (réflexive, antisymétrique, transitive) — la même structure qu'on retrouvera partout, des réels aux ensembles ordonnés abstraits.",
  },
  keyIdea: "**Cardinal** = combien (trois). **Ordinal** = quel rang (troisième).",
  why:
    "Pourquoi peut-on toujours tout ranger en file ? Parce qu'entre deux nombres différents, l'un est toujours plus petit que l'autre — jamais d'égalité douteuse. Cette comparabilité « de tout avec tout » est ce qui permet une file unique, sans hésitation.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 10, value: 4 }, caption: "La droite numérique EST déjà un rangement : les petits à gauche, les grands à droite." },
  ],
  examples: [
    { title: "Ranger 5, 2, 8, 1", steps: [
      { p: "Le plus petit d'abord : 1, puis 2, puis 5, puis 8." },
      { p: "File rangée : $1 < 2 < 5 < 8$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel est le plus petit : 6, 2, 9 ?", solution: "**2**." },
    { tier: "warmup", prompt: "Range du plus grand au plus petit : 3, 7, 1.", solution: "7, 3, 1." },
    { tier: "challenge", prompt: "Dans la file A–B–C–D, qui est en 3e position ?", solution: "**C** (le troisième)." },
    { tier: "exam", prompt: "Cinq coureurs : tu finis juste derrière le 2e. Quelle est ta place ?", solution: "**3e**." },
  ],
  practice: [
    { tier: "application", label: "Trouver le plus petit / le plus grand", make: (r) => { const xs = []; while (xs.length < 3) { const v = randint(r, 0, 15); if (!xs.includes(v)) xs.push(v); } const grand = r() < 0.5; const ans = grand ? Math.max(...xs) : Math.min(...xs); return { prompt: `Parmi ${xs.join(", ")}, quel est le plus ${grand ? "GRAND" : "PETIT"} ?`, answer: ans, solution: `C'est **${ans}**.` }; } },
  ],
};

const decompose = {
  id: "numbers.preschool.decompose",
  level: "preschool", domain: "numbers",
  title: "Décomposer les petits nombres",
  tagline: "Casser un nombre en morceaux : 5, c'est 4 et 1, ou 3 et 2…",
  prereqs: ["numbers.preschool.count", "numbers.preschool.digits"],
  intuition:
    "Un nombre peut se fabriquer de plusieurs façons. **5**, par exemple : 4 et 1, ou 3 et 2, ou 2 et 3, ou 1 et 4. C'est la « maison du 5 » : toutes les paires qui font 5.\n\nConnaître ces décompositions par cœur, c'est le secret pour calculer vite plus tard.",
  depths: {
    discovery: "Un nombre = deux morceaux réunis. Ex. : 5 = 4 + 1 = 3 + 2.",
    standard: "Décomposer, c'est écrire un nombre comme une **somme** de deux (ou plus) nombres plus petits. Les « maisons des nombres » listent toutes les décompositions d'un total fixé.",
    advanced: "Compter le nombre de façons d'écrire $n$ comme une somme, c'est la théorie des **partitions** d'un entier — un sujet d'arithmétique encore vivant en recherche. À l'éveil, on en touche le tout premier étage.",
  },
  keyIdea: "Plusieurs additions donnent le même total : $5 = 4+1 = 3+2$.",
  why:
    "Pourquoi apprendre toutes les façons de faire 5, et pas juste une ? Parce qu'en calcul, on choisit la décomposition la plus pratique. Pour faire $7 + 5$, on casse le 5 en $3 + 2$ pour d'abord compléter $7$ à $10$ : $7+3=10$, puis $10+2=12$. Décomposer, c'est se donner des chemins.",
  widgets: [
    { kind: "tenframe", params: { count: 3, target: 5 }, caption: "Mets une partie des jetons : le cadre montre l'autre partie qui complète le total." },
  ],
  examples: [
    { title: "La maison du 4", steps: [
      { p: "Toutes les paires qui font 4 :" },
      { p: "$0+4$, $1+3$, $2+2$, $3+1$, $4+0$.", tex: "4 = 1+3 = 2+2 = 3+1" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Complète : 3 = 2 + ?", solution: "**1** (car $2 + 1 = 3$)." },
    { tier: "warmup", prompt: "Donne deux façons de faire 5.", solution: "Par exemple $4 + 1$ et $3 + 2$." },
    { tier: "challenge", prompt: "Complète : 6 = 4 + ?", solution: "**2** ($4 + 2 = 6$)." },
    { tier: "exam", prompt: "Combien de paires (a + b), avec a et b de 0 à 4, font 4 ? Liste-les.", solution: "Cinq : $0+4, 1+3, 2+2, 3+1, 4+0$." },
  ],
  practice: [
    { tier: "application", label: "Compléter une décomposition", make: (r) => { const n = randint(r, 3, 10); const a = randint(r, 0, n); return { prompt: `Complète : ${n} = ${a} + ?`, answer: n - a, solution: `$${a} + ${n - a} = ${n}$, donc **${n - a}**.` }; } },
  ],
};

const addSubtract = {
  id: "numbers.preschool.add-subtract",
  level: "preschool", domain: "numbers",
  title: "Ajouter et retirer",
  tagline: "Il y en avait tant, on en ajoute (ou on en enlève)… combien maintenant ?",
  prereqs: ["numbers.preschool.decompose"],
  intuition:
    "Ajouter, c'est avancer dans la comptine : 4 bonbons, j'en ajoute 3 → je continue « cinq, six, sept ». Retirer, c'est reculer : 8 bonbons, j'en mange 2 → « sept, six ».\n\nSur la droite numérique, ajouter = aller à droite, retirer = aller à gauche.",
  depths: {
    discovery: "Ajouter = avancer dans les nombres. Retirer = reculer.",
    standard: "Ajouter $b$ revient à avancer de $b$ crans ($+b$) ; retirer $b$, à reculer de $b$ ($-b$). Ce sont les deux premières opérations : l'**addition** et la **soustraction**.",
    advanced: "Ajouter et retirer sont des opérations **inverses** : si $a + b = c$, alors $c - b = a$. Cette réversibilité est ce qui, plus tard, permet de « passer de l'autre côté » dans une équation.",
  },
  keyIdea: "Ajouter → on avance (+). Retirer → on recule (−).",
  why:
    "Pourquoi ajouter et retirer vont-ils ensemble ? Parce que l'un défait l'autre. Si j'ajoute 3 puis j'en retire 3, je reviens au départ. C'est pour ça qu'on peut *vérifier* une addition par une soustraction — et inversement.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 12, value: 4 }, caption: "Place-toi sur le premier nombre, puis avance (ajouter) ou recule (retirer)." },
  ],
  examples: [
    { title: "4 + 3 sur la droite", steps: [
      { p: "Je me place sur 4." },
      { p: "J'avance de 3 crans : 5, 6, 7." },
      { p: "Donc $4 + 3 = 7$." },
    ] },
    { title: "8 − 2", steps: [
      { p: "Je pars de 8 et je recule de 2 : 7, 6." },
      { p: "Donc $8 - 2 = 6$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Il y a 3 oiseaux, 1 arrive. Combien ?", solution: "$3 + 1 = $ **4**." },
    { tier: "warmup", prompt: "Calcule $5 + 2$.", solution: "On avance de 2 depuis 5 → **7**." },
    { tier: "challenge", prompt: "Il y avait 7 bonbons, on en mange 3. Combien reste-t-il ?", solution: "$7 - 3 = $ **4**." },
    { tier: "exam", prompt: "J'ajoute 4 à un nombre et j'obtiens 9. Quel était ce nombre ?", solution: "On fait l'inverse : $9 - 4 = $ **5**." },
  ],
  practice: [
    { tier: "application", label: "Ajouter ou retirer", make: (r) => { const plus = r() < 0.5; if (plus) { const a = randint(r, 1, 7), b = randint(r, 1, 5); return { prompt: `Calcule ${a} + ${b}.`, answer: a + b, solution: `$${a} + ${b} = ${a + b}$.` }; } const a = randint(r, 4, 12), b = randint(r, 1, a); return { prompt: `Calcule ${a} − ${b}.`, answer: a - b, solution: `$${a} - ${b} = ${a - b}$.` }; } },
  ],
};

const complements = {
  id: "numbers.preschool.complements",
  level: "preschool", domain: "numbers",
  title: "Compléter jusqu'à 5, jusqu'à 10",
  tagline: "Combien faut-il ajouter pour arriver pile à 10 ?",
  prereqs: ["numbers.preschool.add-subtract"],
  intuition:
    "Tu as 7. Combien te manque-t-il pour avoir 10 ? Le cadre de dix le montre d'un coup : il reste 3 cases vides, donc **3**.\n\nLes compléments à 10 sont à connaître par cœur : 1 et 9, 2 et 8, 3 et 7, 4 et 6, 5 et 5. Ce sont les meilleurs amis du calcul.",
  depths: {
    discovery: "Le complément, c'est « ce qu'il manque » pour atteindre un total. Pour 10 : 7 → il manque 3.",
    standard: "Le **complément** de $a$ à $n$ est le nombre $b$ tel que $a + b = n$. Les compléments à 10 ($3+7$, $4+6$…) sont les briques du calcul mental rapide.",
    advanced: "Chercher $b$ tel que $a + b = n$, c'est résoudre une mini-équation : $b = n - a$. Le complément est la **soustraction** vue « par en dessous » — et le passage de la dizaine s'appuie entièrement sur lui.",
  },
  keyIdea: "Compléter à 10 : 7 et **3**, 6 et **4**, 8 et **2**…",
  why:
    "Pourquoi les compléments à 10 sont-ils si précieux ? Parce que notre numération est en base dix : franchir une dizaine, c'est la clé de toutes les additions un peu grandes. Savoir que $8$ veut $2$ pour faire $10$ rend $8 + 5$ immédiat : $8+2=10$, puis $+3 = 13$.",
  widgets: [
    { kind: "tenframe", params: { count: 7, target: 10 }, caption: "Compte les cases vides : c'est le complément à 10." },
  ],
  examples: [
    { title: "Compléter 6 à 10", steps: [
      { p: "Je remplis 6 cases ; il reste 4 cases vides." },
      { p: "Il manque **4** : $6 + 4 = 10$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien manque-t-il à 8 pour faire 10 ?", solution: "**2** ($8 + 2 = 10$)." },
    { tier: "warmup", prompt: "Complète à 5 : 3 + ? = 5.", solution: "**2**." },
    { tier: "challenge", prompt: "Donne tous les compléments à 10 (les paires).", solution: "$1+9, 2+8, 3+7, 4+6, 5+5$." },
    { tier: "exam", prompt: "Utilise un complément à 10 pour calculer $8 + 5$.", solution: "$8 + 2 = 10$, il reste $3$ → $10 + 3 = $ **13**." },
  ],
  practice: [
    { tier: "application", label: "Compléter à 10", make: (r) => { const a = randint(r, 0, 10); return { prompt: `Combien faut-il ajouter à ${a} pour faire 10 ?`, answer: 10 - a, solution: `$${a} + ${10 - a} = 10$, donc **${10 - a}**.` }; } },
    { tier: "challenge", label: "Compléter à un total", make: (r) => { const n = pick(r, [5, 10, 20]); const a = randint(r, 0, n); return { prompt: `Combien faut-il ajouter à ${a} pour faire ${n} ?`, answer: n - a, solution: `$${a} + ${n - a} = ${n}$, donc **${n - a}**.` }; } },
  ],
};

const tensAndOnes = {
  id: "numbers.preschool.tens-and-ones",
  level: "preschool", domain: "numbers",
  title: "Vers 20, vers 30 : les grands nombres arrivent",
  tagline: "Continuer la comptine au-delà de 10, et entrevoir les dizaines.",
  prereqs: ["numbers.preschool.digits", "numbers.preschool.order"],
  intuition:
    "Après 10, la comptine continue pareil : onze, douze… puis « dix-sept, dix-huit, dix-neuf, **vingt** ». À partir de vingt, on entend même la structure : *vingt*-et-un, *vingt*-deux…\n\nUn nombre comme 23, c'est **2 paquets de dix et 3 tout seuls**. On commence à voir que les grands nombres sont faits de dizaines et d'unités.",
  depths: {
    discovery: "Après 10, on continue : 11, 12… 19, 20. 23, c'est 2 dizaines et 3 unités.",
    standard: "Au-delà de 10, on s'appuie sur les **dizaines** : 20 = 2 dizaines, 30 = 3 dizaines. Un nombre à deux chiffres se lit « tant de dizaines et tant d'unités » — c'est la porte d'entrée vers la numération du CP.",
    advanced: "Écrire $23 = 2\\times 10 + 3$ rend visible la **base dix** : la position d'un chiffre fixe sa valeur (les dizaines pèsent $10$, les unités $1$). Cette idée, étendue, donne l'écriture de tous les entiers — et, changée de base, l'écriture binaire des ordinateurs.",
  },
  keyIdea: "Un nombre à deux chiffres = des **dizaines** + des **unités** ($23 = 20 + 3$).",
  why:
    "Pourquoi 23 et 32 ne sont-ils pas le même nombre, avec les mêmes chiffres ? Parce que la **place** compte : dans 23, le 2 est dans la colonne des dizaines (il vaut 20) ; dans 32, c'est le 3 qui vaut 30. Le même chiffre vaut différemment selon où il est posé.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 20, value: 14 }, caption: "Continue à avancer après 10 : la comptine ne s'arrête pas." },
  ],
  examples: [
    { title: "Lire le nombre 23", steps: [
      { p: "Deux dizaines : $2 \\times 10 = 20$." },
      { p: "Trois unités : $+3$." },
      { p: "Total : **23** = vingt-trois." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel nombre vient juste après 19 ?", solution: "**20**." },
    { tier: "warmup", prompt: "Combien d'unités dans 1 dizaine ?", solution: "**10**." },
    { tier: "challenge", prompt: "Dans le nombre 25, que vaut le chiffre 2 ?", solution: "Il vaut **20** (2 dizaines)." },
    { tier: "exam", prompt: "J'ai 3 dizaines et 4 unités. Quel nombre est-ce ?", solution: "$30 + 4 = $ **34**." },
  ],
  practice: [
    { tier: "application", label: "Le nombre suivant (après 10)", make: (r) => { const x = randint(r, 10, 29); return { prompt: `Quel nombre vient juste après ${x} ?`, answer: x + 1, solution: `$${x} + 1 = ${x + 1}$.` }; } },
    { tier: "challenge", label: "Dizaines et unités", make: (r) => { const d = randint(r, 1, 3), u = randint(r, 0, 9); return { prompt: `J'ai ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""}. Quel nombre ?`, answer: d * 10 + u, solution: `$${d} \\times 10 + ${u} = ${d * 10 + u}$.` }; } },
  ],
};

// — Transition to primary (kept from the skeleton) —
const columnAddition = {
  id: "numbers.primary.column-addition",
  level: "primary", domain: "numbers",
  title: "L'addition posée (avec retenue)",
  tagline: "Additionner colonne par colonne en gérant la retenue.",
  prereqs: ["numbers.preschool.complements", "numbers.preschool.tens-and-ones"],
  intuition:
    "Quand les nombres sont grands, on les pose l'un sous l'autre, bien alignés : unités sous unités, dizaines sous dizaines.\n\nOn additionne colonne par colonne, **de droite à gauche**. Si une colonne dépasse 9, on « garde » une dizaine pour la colonne suivante : c'est la **retenue** — exactement le complément à 10 qu'on a appris à l'éveil.",
  depths: {
    discovery: "On aligne, on additionne par colonnes de droite à gauche, et on reporte la retenue.",
    standard: "L'addition posée s'appuie sur la numération de position. Quand la somme d'une colonne $\\geq 10$, on écrit le chiffre des unités et on reporte $1$ sur la colonne de gauche.",
    advanced: "La retenue traduit le passage à la base dix : on somme les chiffres pondérés par des puissances de $10$, puis on « normalise » pour que chaque chiffre reste dans $\\{0,\\dots,9\\}$. C'est ce que fait un additionneur à propagation de retenue.",
  },
  keyIdea: "Une colonne à gauche vaut **dix fois** plus : 10 unités = 1 dizaine.",
  why:
    "Pourquoi reporter $1$ et pas $10$ ? Parce qu'une colonne plus à gauche vaut dix fois plus. $10$ unités, c'est $1$ dizaine : on remplace dix petites cases par une seule case de la colonne voisine.",
  examples: [
    { title: "Poser 27 + 48", steps: [
      { p: "Unités : $7 + 8 = 15$ → j'écris **5**, je retiens **1**." },
      { p: "Dizaines : $2 + 4 + 1 = 7$ → **75**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien font 6 + 7 ?", solution: "$6 + 7 = 13$." },
    { tier: "challenge", prompt: "Pose et calcule 38 + 47.", solution: "$8+7=15$ (5, retenue 1) ; $3+4+1=8$ → **85**." },
    { tier: "exam", prompt: "Calcule 156 + 247.", solution: "$6+7=13$ (3, r1) ; $5+4+1=10$ (0, r1) ; $1+2+1=4$ → **403**." },
  ],
  practice: [
    { tier: "warmup", label: "Petites additions", make: (r) => { const a = randint(r, 2, 9), b = randint(r, 2, 9); return { prompt: `Combien font ${a} + ${b} ?`, answer: a + b, solution: `$${a} + ${b} = ${a + b}$.` }; } },
    { tier: "application", label: "Additions à deux chiffres", make: (r) => { const a = randint(r, 12, 89), b = randint(r, 12, 89); return { prompt: `Calcule ${a} + ${b}.`, answer: a + b, solution: `$${a} + ${b} = ${a + b}$.` }; } },
  ],
};

export default [
  recognizeQuantities, numberSequence, countObjects, digits, compareNumbers, orderNumbers,
  decompose, addSubtract, complements, tensAndOnes,
  columnAddition,
];
