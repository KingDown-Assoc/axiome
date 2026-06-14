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
    discovery: "**Avec les mains** : pose 3 jetons sur la table — tu *vois* trois, sans compter. 1, 2, 3 se reconnaissent d'un seul regard ; pour 4 ou 5, on voit des petits paquets.",
    standard: "**En image** : reconnaître une quantité sans compter s'appelle le **subitizing**. Il est fiable jusqu'à 3–4 objets ; au-delà, on s'appuie sur des images de nombres — constellations du dé, doigts levés — pour aller plus vite que le comptage un-à-un.",
    advanced: "**Dans la tête** : c'est la première rencontre avec l'idée de **cardinal** : une collection « porte » un nombre, indépendamment de la façon dont ses objets sont disposés. Voir $5$ comme $4+1$ ou $3+2$ est déjà une décomposition — la graine de toute l'arithmétique additive.",
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
    discovery: "**Avec les mains** : je récite en levant un doigt à chaque mot — les nombres se disent toujours dans le même ordre. Après 6 vient 7 ; avant 9 vient 8.",
    standard: "**En image** : posée sur la bande numérique, la comptine se *voit* — chaque mot a sa case. Et elle grandit : **jusqu'à trente**, **à rebours** de dix à un (le décomptage), **de deux en deux** jusqu'à vingt, et **en partant de n'importe quel nombre** (pour surcompter). Maîtriser « le nombre d'après » (le successeur) et « le nombre d'avant » (le prédécesseur) prépare l'addition et la soustraction de 1.",
    advanced: "**Dans la tête** : chaque nombre a un **successeur** unique : c'est l'idée qui fonde $\\mathbb{N}$. « Commencer à $0$, et toujours pouvoir ajouter $1$ » est, formalisé, l'axiome qui engendre tous les entiers (Peano). La comptine est la version chantée de cet axiome.",
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
    { tier: "application", prompt: "Compte de 2 en 2, en partant de 2, jusqu'à 10.", solution: "2, 4, 6, 8, 10." },
    { tier: "application", prompt: "Compte de 2 en 2, en partant de 1, jusqu'à 9.", solution: "1, 3, 5, 7, 9." },
    { tier: "challenge", prompt: "Récite à rebours de 10 jusqu'à 1.", solution: "10, 9, 8, 7, 6, 5, 4, 3, 2, 1 — c'est le **décomptage**." },
    { tier: "challenge", prompt: "Continue la comptine : 27, 28…", solution: "**29, 30** : après vingt-huit viennent vingt-neuf, puis trente." },
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
    discovery: "**Avec les mains** : je touche chaque objet en disant un mot de la comptine — un objet = un nombre dit. Le **dernier** mot, c'est la quantité.",
    standard: "**En image** : le comptage relie la comptine et les objets par une correspondance « un pour un ». Le dernier nombre énoncé donne le **cardinal** (la quantité) — c'est le principe cardinal.\n\nEncore faut-il **parcourir** la collection en passant par chaque objet **une et une seule fois** : je déplace les objets déjà comptés, je les pointe ou je les marque — les comptés d'un côté, les autres de l'autre.",
    advanced: "**Dans la tête** : dénombrer une collection finie, c'est exhiber une bijection avec un segment $\\{1,\\dots,n\\}$ de $\\mathbb{N}$ ; l'entier $n$ est le cardinal. Que le résultat ne dépende pas de l'ordre du comptage est déjà un petit théorème.",
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
    { tier: "application", prompt: "Les jetons sont éparpillés sur la table. Quelle astuce pour n'en compter aucun deux fois ?", solution: "**Séparer** : je pousse de côté chaque jeton déjà compté — les comptés d'un côté, les autres de l'autre." },
    { tier: "challenge", prompt: "Une boîte à œufs fermée a 12 fentes. Comment glisser un jeton, et un seul, dans chaque fente, sans en oublier ?", solution: "Je suis un **chemin** qui passe par chaque fente **une et une seule fois** — par exemple ligne par ligne — et je repère où j'en suis." },
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
    discovery: "**Avec les mains** : cinq doigts levés, et le signe « 5 » sur l'étiquette — chaque quantité a un signe. On apprend à lire et à écrire ces dix signes.",
    standard: "**En image** : il y a dix **chiffres** (0 à 9). Il ne faut pas confondre *chiffre* (le signe) et *nombre* (la quantité) : 12 est un nombre écrit avec deux chiffres. Associer mot ↔ quantité ↔ chiffre, dans les deux sens, est la base.",
    advanced: "**Dans la tête** : dix chiffres suffisent grâce à la **numération de position** : la place d'un chiffre lui donne sa valeur (puissances de $10$). Le $0$ y joue un rôle clé — marquer une place vide — ce qui en fait l'une des inventions mathématiques les plus puissantes.",
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
    discovery: "**Avec les mains** : je range les objets face à face, un contre un. S'il en reste d'un côté → ce côté a le plus.",
    standard: "**En image** : comparer revient à apparier — ou à dénombrer chacune et à verbaliser : « quatre voitures, six vélos : il y a **plus** de vélos ». On note la relation avec les signes : $3 < 5$, $5 > 3$, $4 = 4$.",
    advanced: "**Dans la tête** : « avoir au plus autant d'éléments » se définit par l'existence d'une **injection** d'une collection dans l'autre — l'appariement, qui fonde l'ordre sur les cardinaux et se prolonge, bien plus tard, aux ensembles infinis.",
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
    discovery: "**Avec les mains** : je range les tours de cubes de la plus petite à la plus grande — les nombres se mettent en file. Chacun a une place : 1er, 2e, 3e…",
    standard: "**En image** : ordonner, c'est utiliser la comparaison entre **tous** les nombres à la fois. On distingue le **cardinal** (combien : trois) de l'**ordinal** (le rang : troisième).",
    advanced: "**Dans la tête** : l'ordre sur les entiers est **total** : deux nombres sont toujours comparables. C'est une *relation d'ordre* (réflexive, antisymétrique, transitive) — la même structure qu'on retrouvera partout, des réels aux ensembles ordonnés abstraits.",
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
    discovery: "**Avec les mains** : 5 jetons, deux paquets — et je verbalise : « cinq, c'est quatre et un ; cinq, c'est trois et deux ».",
    standard: "**En image** : décomposer, c'est écrire un nombre comme une **somme** de plus petits. Les « maisons des nombres » et le dix-cadre montrent toutes les décompositions d'un total fixé — et l'**ordre ne compte pas** : 4 et 1, ou 1 et 4, c'est le même cinq.",
    advanced: "**Dans la tête** : compter le nombre de façons d'écrire $n$ comme une somme, c'est la théorie des **partitions** d'un entier — un sujet d'arithmétique encore vivant en recherche. À l'éveil, on en touche le tout premier étage.",
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
    discovery: "**Avec les mains** : 4 bonbons, j'en ajoute 3 — je continue sur mes doigts : « cinq, six, sept ». Ajouter = avancer dans les nombres. Retirer = reculer.",
    standard: "**En image** : le geste malin pour ajouter est le **surcomptage** : partir du **plus grand** et compter le reste sur ses doigts. Pour $4 + 5$ : « je mets **5 dans ma tête** et je compte 4 : six, sept, huit, **neuf** ». Ajouter $b$, c'est avancer de $b$ crans ($+b$) ; retirer $b$, reculer d'autant ($-b$) : l'**addition** et la **soustraction**.",
    advanced: "**Dans la tête** : ajouter et retirer sont des opérations **inverses** : si $a + b = c$, alors $c - b = a$. Cette réversibilité est ce qui, plus tard, permet de « passer de l'autre côté » dans une équation.",
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
    { title: "4 + 5 en surcomptant", steps: [
      { p: "Je mets le plus grand, **5**, dans ma tête." },
      { p: "Je compte 4 sur mes doigts : « six, sept, huit, neuf »." },
      { p: "Donc $4 + 5 = 9$ — sans repartir de un !" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Il y a 3 oiseaux, 1 arrive. Combien ?", solution: "$3 + 1 = $ **4**." },
    { tier: "warmup", prompt: "Calcule $5 + 2$.", solution: "Je mets **5 dans ma tête** et je compte 2 : « six, sept » → **7**." },
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
    discovery: "**Avec les mains** : 7 doigts levés… combien de couchés ? Le complément, c'est « ce qu'il manque » pour atteindre le total. Pour 10 : 7 → il manque 3.",
    standard: "**En image** : sur le dix-cadre, cases pleines et cases vides racontent le complément. Le **complément** de $a$ à $n$ est le nombre $b$ tel que $a + b = n$ ; les compléments à 10 ($3+7$, $4+6$…) sont les briques du calcul mental rapide.",
    advanced: "**Dans la tête** : chercher $b$ tel que $a + b = n$, c'est résoudre une mini-équation : $b = n - a$. Le complément est la **soustraction** vue « par en dessous » — et le passage de la dizaine s'appuie entièrement sur lui.",
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
    discovery: "**Avec les mains** : après 10, la comptine continue : 11, 12… 19, 20. Et on fait des **paquets de dix** : 23, c'est 2 paquets de dix et 3 tout seuls.",
    standard: "**En image** : au-delà de 10, on s'appuie sur les **dizaines** : 20 = 2 dizaines, 30 = 3 dizaines. Un nombre à deux chiffres se lit « tant de dizaines et tant d'unités » — c'est la porte d'entrée vers la numération du CP.",
    advanced: "**Dans la tête** : quand on écrit **23**, c'est la **place** du chiffre qui dit sa valeur : le **2** est du côté des dizaines (il vaut $20$) et le **3** du côté des unités (il vaut $3$). Range les nombres en deux colonnes — dizaines à gauche, unités à droite — et tu lis leur valeur d'un coup d'œil. C'est le tout début de la numération.",
  },
  keyIdea: "Un nombre à deux chiffres = des **dizaines** + des **unités** ($23 = 20 + 3$).",
  why:
    "Pourquoi 23 et 32 ne sont-ils pas le même nombre, avec les mêmes chiffres ? Parce que la **place** compte : dans 23, le 2 est dans la colonne des dizaines (il vaut 20) ; dans 32, c'est le 3 qui vaut 30. Le même chiffre vaut différemment selon où il est posé.",
  widgets: [
    { kind: "odometer", params: { value: 13 }, caption: "Bouge les roues : 13, c'est 1 dizaine et 3 unités. À 9, les unités reviennent à 0 et une dizaine s'ajoute." },
    { kind: "numberline", params: { mode: "line", max: 20, value: 14 }, caption: "Et la comptine continue après 10, sans s'arrêter." },
  ],
  examples: [
    { title: "Lire le nombre 23", steps: [
      { p: "Deux paquets de dix : $10$ et encore $10$, donc $20$." },
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
    { tier: "challenge", label: "Dizaines et unités", make: (r) => { const d = randint(r, 1, 3), u = randint(r, 0, 9); return { prompt: `J'ai ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""}. Quel nombre ?`, answer: d * 10 + u, solution: `${d} dizaine${d > 1 ? "s" : ""} font ${d * 10}, et ${u} de plus : ${d * 10 + u}.` }; } },
  ],
};

// — Transition to primary (kept from the skeleton) —

// — Doubles & halves (preschool) —
const doubles = {
  id: "numbers.preschool.doubles",
  level: "preschool", domain: "numbers",
  title: "Les doubles et les moitiés",
  prereqs: ["numbers.preschool.add-subtract"],
  tagline: "Ajouter un nombre à lui-même, et partager en deux parts égales.",
  intuition:
    "Un double, c'est quand on a deux fois la même chose : $2$ et encore $2$, ça fait $4$. Ta paire de chaussures est un double : un pied, puis l'autre pied.\n\nLa moitié, c'est l'inverse : on partage en deux parts égales. Si tu partages $4$ bonbons entre deux enfants, chacun en a $2$.",
  depths: {
    discovery:
      "**Avec les mains** : deux mains pareilles, et je verbalise — « deux et deux font quatre ». Le double d'un nombre, c'est ce nombre **plus lui-même**.\n\nDouble de $1$ → $1+1=2$. Double de $2$ → $2+2=4$. Double de $3$ → $3+3=6$.\n\nPour la moitié, on coupe en **deux parts égales**. La moitié de $4$, c'est $2$ (car $2+2=4$).",
    standard:
      "**En image** : les doubles avancent de deux en deux : $2, 4, 6, 8, 10$. Ce sont les **nombres pairs**.\n\nLa moitié ne tombe juste que si le nombre est pair : la moitié de $6$ est $3$, mais $5$ ne se partage pas en deux parts égales entières (il reste $1$ tout seul).",
    advanced:
      "**Dans la tête** : range les doubles l'un sous l'autre : $1+1, 2+2, 3+3$… leurs résultats $2, 4, 6, 8, 10$ forment l'escalier des **nombres pairs** (on saute une marche à chaque fois). Plus tard, ces « paquets tout pareils » porteront un nom — mais l'idée est déjà là : deux fois la même quantité.",
  },
  keyIdea: "Double = le nombre + lui-même. Moitié = partagé en deux parts égales.",
  why:
    "Pourquoi les doubles sont-ils utiles ? Parce qu'ils servent de **points d'appui** pour calculer vite : si tu sais que $4+4=8$, tu trouves $4+5$ en ajoutant juste $1$ → $9$.",
  widgets: [
    { kind: "numberline", params: { mode: "counters", count: 3 }, caption: "Pose des jetons, puis pose la même quantité à nouveau : ensemble, ça fait le double." },
  ],
  examples: [
    { title: "Le double de 3", steps: [
      { p: "On part de $3$." },
      { p: "On ajoute encore $3$.", tex: "3+3=6" },
      { p: "Le double de $3$ est $6$." },
    ] },
    { title: "La moitié de 8", steps: [
      { p: "On partage $8$ en deux parts égales." },
      { p: "Chaque part vaut $4$.", tex: "4+4=8" },
      { p: "La moitié de $8$ est $4$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel est le double de $2$ ?", solution: "$2+2=$ **4**." },
    { tier: "warmup", prompt: "Quel est le double de $5$ ?", solution: "$5+5=$ **10**." },
    { tier: "application", prompt: "Partage $6$ fraises entre deux enfants. Combien chacun ?", solution: "La moitié de $6$ : **3** chacun." },
    { tier: "challenge", prompt: "Tu sais que $4+4=8$. Combien font $4+5$ ?", solution: "Un de plus que $8$ → **9**." },
    { tier: "exam", prompt: "Le double d'un nombre vaut $10$. Quel est ce nombre ?", solution: "La moitié de $10$ → **5** (car $5+5=10$)." },
  ],
  practice: [
    { tier: "warmup", label: "Trouver un double", make: (r) => { const n = randint(r, 1, 5); return { prompt: `Quel est le double de ${n} ?`, answer: 2 * n, solution: `${n} + ${n} = ${2 * n}.` }; } },
    { tier: "application", label: "Trouver une moitié", make: (r) => { const k = randint(r, 1, 5); const n = 2 * k; return { prompt: `Quelle est la moitié de ${n} ?`, answer: k, solution: `On partage ${n} en deux : ${k} et ${k}. Moitié = ${k}.` }; } },
  ],
};

// — Crossing a ten while counting (preschool) —
const crossingTen = {
  id: "numbers.preschool.crossing-ten",
  level: "preschool", domain: "numbers",
  title: "Passer la dizaine en comptant",
  prereqs: ["numbers.preschool.tens-and-ones"],
  tagline: "Après 9 vient 10, après 19 vient 20 : une nouvelle dizaine se forme.",
  intuition:
    "Quand on compte et qu'on arrive à **9**, le nombre d'après n'a plus un seul chiffre : c'est **10**, une dizaine toute neuve. Pareil après 19 → 20, après 29 → 30.\n\nImagine un compteur à deux roues : la roue des **unités** tourne $0, 1, 2, …, 9$ ; en dépassant 9 elle **revient à 0** et pousse la roue des **dizaines** d'un cran.",
  depths: {
    discovery:
      "**Avec les mains** : dix doigts, tous levés — plein ! On compte : 7, 8, **9**… et après ? Les unités ne peuvent pas aller plus loin que 9 : on remplit **une dizaine** et on repart à 0 → **10**.\n\nDe 10, on continue : 11, 12… 19, puis **20**.",
    standard:
      "**En image** : chaque fois qu'on passe un nombre qui finit par 9 (9, 19, 29…), une dizaine de plus se forme et les unités repartent de 0. C'est toujours le **même geste**, un cran plus haut.",
    advanced:
      "**Dans la tête** : compter, c'est ajouter $1$ encore et encore. Le « retour à 0 des unités + une dizaine en plus » est exactement ce que fait un **compteur de kilomètres** — et, bien plus tard, ce sera la **retenue** d'une addition posée.",
  },
  keyIdea: "Quand les unités dépassent 9, elles repartent à 0 et **une dizaine** s'ajoute.",
  why:
    "Pourquoi 10 s'écrit-il avec deux chiffres ? Parce qu'on n'a que dix chiffres (de $0$ à $9$). Une fois les dix premiers utilisés, on note les paquets de dix à gauche et ce qui reste à droite : c'est ça, passer la dizaine.",
  widgets: [
    { kind: "odometer", params: { value: 9 }, caption: "Clique sur ▲ au-dessus des unités : à 9, elles reviennent à 0 et les dizaines avancent de 1." },
  ],
  examples: [
    { title: "Après 9", steps: [
      { p: "On est à 9, on ajoute 1." },
      { p: "Les unités sont pleines : elles repartent à 0…" },
      { p: "…et une dizaine apparaît : **10**." },
    ] },
    { title: "Après 19", steps: [
      { p: "On est à 19, on ajoute 1." },
      { p: "Les unités passent de 9 à 0, les dizaines de 1 à 2." },
      { p: "On obtient **20**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quel nombre vient juste après 9 ?", solution: "**10** (une dizaine, zéro unité)." },
    { tier: "warmup", prompt: "Quel nombre vient juste après 19 ?", solution: "**20**." },
    { tier: "application", prompt: "Sur le compteur, les unités passent de 9 à 0. Qu'arrive-t-il aux dizaines ?", solution: "Elles **avancent de 1** (une dizaine de plus)." },
    { tier: "challenge", prompt: "Quel nombre vient juste après 29 ?", solution: "**30**." },
    { tier: "exam", prompt: "On est à 39. Combien faut-il ajouter pour atteindre 40 ?", solution: "**1** : $39 + 1 = 40$." },
  ],
  practice: [
    { tier: "warmup", label: "Compter encore un", make: (r) => { const x = randint(r, 10, 28); return { prompt: `Quel nombre vient juste après ${x} ?`, answer: x + 1, solution: `${x}, puis ${x + 1}.` }; } },
    { tier: "application", label: "Passer la dizaine", make: (r) => { const t = randint(r, 0, 8); const x = t * 10 + 9; return { prompt: `Quel nombre vient juste après ${x} ?`, answer: x + 1, solution: `Les unités reviennent à 0 et une dizaine s'ajoute → ${x + 1}.` }; } },
  ],
};

// — Ordinal numbers: rank / position (preschool, programme cycle 1 — "exprimer un rang") —
const rank = {
  id: "numbers.preschool.rank",
  level: "preschool", domain: "numbers",
  title: "Le rang : premier, deuxième… dernier",
  tagline: "Dire à quelle place se trouve quelqu'un dans une file.",
  prereqs: ["numbers.preschool.count"],
  intuition:
    "Un nombre peut dire deux choses différentes. Il peut dire **combien** il y en a — « il y a 3 enfants ». Mais il peut aussi dire **à quelle place** se trouve quelqu'un — « le 3e enfant de la file ». Cette place s'appelle le **rang** : premier, deuxième, troisième… et tout au bout, le **dernier**.\n\nPour trouver le rang, on compte les places depuis le **début**.",
  depths: {
    discovery:
      "**Avec les mains** : on se met en file — chacun a une place : **premier**, **deuxième**, **troisième**, et ainsi de suite jusqu'au **dernier**. Pour trouver le rang de quelqu'un, on compte les places depuis le début.",
    standard:
      "**En image** : le nombre a deux emplois. Dire **combien** (« 3 billes »), c'est le **cardinal**. Dire **à quelle place** (« la 3e bille »), c'est l'**ordinal**, le rang. Le rang dépend de l'endroit où l'on commence à compter et du sens dans lequel on avance.",
    advanced:
      "**Dans la tête** : c'est la **fonction ordinale** du nombre, à côté de sa fonction cardinale : le même nombre sert à compter une quantité **et** à repérer une position dans une suite. On la retrouve ensuite dans les listes, les rangs et tout ce qui est numéroté.",
  },
  keyIdea: "Un nombre dit **combien** (cardinal) ou **à quelle place** (ordinal). Le rang se compte depuis le début.",
  why:
    "Pourquoi « le 3e » n'est-il pas la même chose que « 3 enfants » ? Parce que « 3 enfants » compte un **groupe**, alors que « le 3e » désigne **un seul** enfant, à une place précise. Quantité et position sont deux idées différentes portées par le même mot-nombre.",
  examples: [
    { title: "Qui est deuxième ?", steps: [
      { p: "Une file de 4 enfants." },
      { p: "Je compte depuis le début : 1er, 2e… → le **2e** est le deuxième de la file." },
    ] },
    { title: "Premier et dernier", steps: [
      { p: "Celui qui est en tête est le **premier**." },
      { p: "Celui qui est tout au bout est le **dernier**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment appelle-t-on celui qui est tout au bout de la file ?", solution: "Le **dernier**." },
    { tier: "warmup", prompt: "Juste après le premier de la file vient le… ?", solution: "Le **deuxième**." },
    { tier: "application", prompt: "5 enfants en file. Léa est la 3e. Combien d'enfants devant elle ?", solution: "**2** : le 1er et le 2e." },
    { tier: "challenge", prompt: "« Il y a 4 billes » et « la 4e bille » : est-ce la même chose ?", solution: "**Non** : « 4 billes » dit combien (la quantité) ; « la 4e bille » dit la place (le rang)." },
    { tier: "exam", prompt: "Dans une file de 5, si on compte depuis l'autre bout, le premier devient quel rang ?", solution: "Le **5e** : le rang change quand on change de sens ou de point de départ." },
  ],
  practice: [
    { tier: "application", label: "Combien devant ?", make: (r) => { const n = randint(r, 3, 6); const pos = randint(r, 2, n); return { prompt: `Une file de ${n} enfants. L'enfant à la place ${pos} a combien d'enfants devant lui ?`, answer: pos - 1, solution: `Avant la place ${pos}, il y a ${pos - 1} enfant(s).` }; } },
  ],
};

// — First word problems (preschool, programme cycle 1 — "utiliser les nombres pour résoudre des problèmes") —
const firstProblems = {
  id: "numbers.preschool.first-problems",
  level: "preschool", domain: "numbers",
  title: "Résoudre un petit problème",
  tagline: "Comprendre une petite histoire de nombres et trouver la réponse.",
  prereqs: ["numbers.preschool.add-subtract"],
  intuition:
    "Un problème, c'est une **petite histoire** qui se termine par une **question**. La réponse ne saute pas aux yeux : il faut réfléchir un peu.\n\nLa méthode : je me fais l'**image** de l'histoire (avec des jetons ou un dessin), je regarde si on **ajoute** ou si on **retire**, puis je donne la réponse.",
  depths: {
    discovery:
      "**Avec les mains** : un problème raconte une histoire et pose une question. Pour répondre : je **joue** l'histoire avec des jetons, je vois si j'**ajoute** (on me donne) ou si je **retire** (on enlève), et je compte le résultat.",
    standard:
      "**En image** : la question dit ce qu'on cherche. « J'avais 3 bonbons, on m'en donne 2 » → on **réunit** → j'ajoute. « J'avais 5, j'en mange 2 » → il en **reste** moins → je retire. Ici, une seule étape suffit pour répondre.",
    advanced:
      "**Dans la tête** : résoudre, c'est d'abord **modéliser** — traduire l'histoire en une action sur les nombres, puis **calculer**. Gare aux histoires **piégeuses** : « Pierre a 3 billes *de moins* que Julie »… et pour trouver Julie, on **ajoute** ! Les mots ne décident pas de l'opération : c'est l'**image** de l'histoire qui décide. Ce sont déjà les étapes du CP : comprendre, modéliser, calculer, répondre.",
  },
  keyIdea: "Un problème = une histoire + une question. Je me fais l'image, je décide d'ajouter ou de retirer, puis je réponds.",
  why:
    "Pourquoi se faire l'image avant de calculer ? Parce que le calcul dépend de l'histoire : on **réunit** (ajouter) ou on **enlève** (retirer). Bien comprendre l'histoire, c'est déjà avoir fait la moitié du problème.",
  examples: [
    { title: "On m'en donne", steps: [
      { p: "« J'ai 3 billes, on m'en donne 2. »" },
      { p: "On réunit ce que j'ai et ce qu'on me donne → **5 billes**." },
    ] },
    { title: "On en enlève", steps: [
      { p: "« Il y a 5 oiseaux, 2 s'envolent. »" },
      { p: "Il en reste : je retire 2 → **3 oiseaux**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans un problème, qu'est-ce qui dit ce qu'on cherche ?", solution: "La **question**." },
    { tier: "warmup", prompt: "J'ai 2 pommes, on m'en donne 3. Combien en tout ?", solution: "**5**." },
    { tier: "application", prompt: "Dans une boîte, je mets 3 cubes rouges, 1 cube bleu et 2 cubes verts. Combien de cubes dans la boîte ?", solution: "$3 + 1 + 2 = $ **6** : un tout fait de **trois** parties." },
    { tier: "application", prompt: "Il y a 6 ballons, 2 éclatent. Combien en reste-t-il ?", solution: "**4**." },
    { tier: "challenge", prompt: "« J'ai 4 bonbons, on m'en donne 2. » Faut-il ajouter ou retirer ? Pourquoi ?", solution: "**Ajouter** : on **réunit** ce que j'avais et ce qu'on me donne." },
    { tier: "challenge", prompt: "Pierre a 5 billes. Julie a 3 billes de plus que Pierre. Combien Julie a-t-elle de billes ?", solution: "$5 + 3 = $ **8** : « de plus » et on ajoute — l'énoncé et le calcul vont dans le même sens." },
    { tier: "exam", prompt: "Pierre a 5 billes. Il a 3 billes de moins que Julie. Combien Julie a-t-elle de billes ?", solution: "**8** ! L'énoncé dit « de moins »… mais c'est Pierre qui en a moins : Julie en a **plus**, donc $5 + 3 = 8$. Fais l'image avant de calculer." },
    { tier: "exam", prompt: "Léa avait 3 billes ; après avoir joué, elle en a 5. Combien en a-t-elle gagné ?", solution: "**2** : il faut compléter de 3 jusqu'à 5." },
  ],
  practice: [
    { tier: "application", label: "Petit problème", make: (r) => {
      if (r() < 0.5) { const a = randint(r, 1, 5), b = randint(r, 1, 5); return { prompt: `J'ai ${a} jetons, on m'en donne ${b}. Combien en tout ?`, answer: a + b, solution: `On réunit : ${a} et ${b} → ${a + b}.` }; }
      const a = randint(r, 3, 8), b = randint(r, 1, a - 1); return { prompt: `Il y a ${a} jetons, j'en retire ${b}. Combien en reste-t-il ?`, answer: a - b, solution: `Il en reste ${a - b}.` };
    } },
  ],
};

// — The number strip: numbers as positions, moves as operations (programme: bande numérique) —
const numberStrip = {
  id: "numbers.preschool.number-strip",
  level: "preschool", domain: "numbers",
  title: "La bande numérique",
  tagline: "Chaque nombre a sa case : avancer, c'est ajouter ; reculer, c'est retirer.",
  prereqs: ["numbers.preschool.rank", "numbers.preschool.add-subtract"],
  intuition:
    "Range les nombres en file, de gauche à droite, chacun dans **sa** case : 1, 2, 3… C'est la **bande numérique** — celle des jeux de l'oie !\n\nEn classe, on la construit pour de vrai : des boîtes à trésors alignées, avec sur chaque boîte le nombre écrit de plusieurs façons (points du dé, doigts, chiffre). Puis on la dessine. Puis on la garde **dans sa tête** : des mains, à l'image, au calcul.",
  depths: {
    discovery:
      "**Avec les mains** : sur un jeu de l'oie, mon pion est sur une case ; je lance le dé et j'avance d'autant de cases, une par une. Chaque nombre a sa case, toujours à la même place.",
    standard:
      "**En image** : sur la bande de 1 à 10, avancer de 2 depuis la case 4, c'est surcompter « cinq, six » → case **6**. **Avancer = ajouter**, **reculer = retirer**. Et si la bande a un trou (5, ?, 7), le nombre caché est celui d'entre les deux : **6**.",
    advanced:
      "**Dans la tête** : sur la bande, deux voisins diffèrent toujours de **1** — les nombres sont régulièrement espacés. Un même calcul a donc deux histoires : $4 + 2$, c'est « réunir 4 et 2 » (des quantités) **ou** « partir de la case 4 et avancer de 2 » (des positions). Deux images, une seule opération. La bande deviendra la **droite numérique**, qui accueillera plus tard fractions et décimaux.",
  },
  keyIdea: "Sur la bande : **avancer = ajouter**, **reculer = retirer**. Deux voisins diffèrent toujours de 1.",
  why:
    "Pourquoi la bande aide-t-elle autant ? Parce qu'elle rend le nombre **visible comme une position** : on *voit* que 7 est après 5, on *voit* le chemin de 4 à 6. Quantité et position racontent la même histoire — et cette double lecture rend le calcul solide.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 10, value: 4 }, caption: "Pose-toi sur une case, puis avance (ajoute) ou recule (retire) en comptant tes pas." },
  ],
  examples: [
    { title: "Avancer de 2 depuis la case 4", steps: [
      { p: "Je pose le doigt sur la case 4." },
      { p: "J'avance en comptant : « cinq, six »." },
      { p: "J'arrive case **6** — c'est $4 + 2$." },
    ] },
    { title: "La bande à trous", steps: [
      { p: "La bande montre : 5, ?, 7." },
      { p: "Entre 5 et 7 se cache **6** : d'une case à l'autre, on ajoute 1." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur la bande, la case 7 est-elle avant ou après la case 5 ?", solution: "**Après** : 7 vient plus loin que 5 quand on avance." },
    { tier: "warmup", prompt: "Mon pion est sur la case 4 et j'avance de 2. Sur quelle case suis-je ?", solution: "Je surcompte « cinq, six » → case **6**." },
    { tier: "application", prompt: "La bande montre : 5, ?, 7. Quel nombre manque ?", solution: "**6** : d'une case à la suivante, on ajoute toujours 1." },
    { tier: "challenge", prompt: "Mon pion est sur la case 8 et je recule de 3. Sur quelle case ? Que veut dire « reculer » ?", solution: "« sept, six, cinq » → case **5**. Reculer, c'est **retirer**." },
    { tier: "exam", prompt: "J'avance de 2 et j'arrive sur la case 9. De quelle case suis-je parti ?", solution: "Je refais le chemin **à l'envers** : je recule de 2 depuis 9 → case **7**." },
  ],
  practice: [
    { tier: "application", label: "Avancer, reculer", make: (r) => {
      const fwd = r() < 0.6;
      if (fwd) { const a = randint(r, 1, 7), b = randint(r, 1, 3); return { prompt: `Pion sur la case ${a} : avance de ${b}. Quelle case ?`, answer: a + b, solution: `Je mets ${a} dans ma tête et je compte ${b} pas en avant : case **${a + b}**.` }; }
      const a = randint(r, 4, 10), b = randint(r, 1, 3); return { prompt: `Pion sur la case ${a} : recule de ${b}. Quelle case ?`, answer: a - b, solution: `Reculer = retirer : case **${a - b}**.` };
    } },
  ],
};

// — Sharing & grouping: equal parts, leftovers (programme: problèmes de partage et de groupements) —
const share = {
  id: "numbers.preschool.share",
  level: "preschool", domain: "numbers",
  title: "Partager et grouper",
  tagline: "Distribuer en parts égales, faire des paquets — et parfois, il en reste.",
  prereqs: ["numbers.preschool.first-problems"],
  intuition:
    "Six gâteaux pour deux poupées, et chacune doit avoir **pareil**. Le geste sûr : distribuer **un à un** — un pour toi, un pour moi, un pour toi… À la fin : trois chacune. C'est le **partage équitable**.\n\nL'autre sens existe aussi : ranger dix images **deux par enveloppe** et compter les enveloppes. Ça, c'est **grouper**.",
  depths: {
    discovery:
      "**Avec les mains** : pour partager équitablement, je distribue un à un, comme on distribue des cartes. À la fin, chacun a autant — et je peux le vérifier en comptant les parts.",
    standard:
      "**En image** : parfois ça ne tombe pas juste. Sept billes pour deux enfants : trois chacun… et il en **reste une**. Le reste n'est la part de personne. Grouper, c'est l'autre sens : 10 images, 2 par enveloppe → je dessine des paquets de 2 → **5** enveloppes.",
    advanced:
      "**Dans la tête** : « combien chacun ? » (partage) et « combien de paquets ? » (groupement) sont les **deux visages d'une même idée** — celle qu'on appellera un jour la division. À l'éveil, on la vit avec les mains et les dessins, sans aucun symbole : le sens d'abord, l'écriture bien plus tard.",
  },
  keyIdea: "Partager = distribuer **un à un**. Grouper = faire des **paquets de même taille**. Ce qui dépasse, c'est le **reste**.",
  why:
    "Pourquoi distribuer un à un garantit-il l'équité ? Parce qu'à chaque tour, **chacun reçoit exactement un** : personne ne prend d'avance. Et quand il n'y a plus de quoi faire un tour complet, ce qui reste… reste. Toute la justice du partage tient dans ce petit geste.",
  examples: [
    { title: "6 gâteaux, 2 poupées", steps: [
      { p: "Un pour la première, un pour la deuxième ; encore un, encore un ; encore un, encore un." },
      { p: "Chaque poupée a **3** gâteaux — parts égales, rien ne reste." },
    ] },
    { title: "7 billes, 2 enfants", steps: [
      { p: "Je distribue un à un : 3 pour chacun." },
      { p: "Il **reste 1** bille : plus assez pour un tour complet." },
    ] },
    { title: "10 images, 2 par enveloppe", steps: [
      { p: "Je fais des paquets de 2, et je compte les paquets." },
      { p: "**5** enveloppes." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour partager des cartes équitablement entre 2 enfants, quel est le geste sûr ?", solution: "Distribuer **un à un**, à tour de rôle, jusqu'au bout." },
    { tier: "warmup", prompt: "6 gâteaux à partager également entre 2 poupées. Combien chacune ?", solution: "**3** : un à un, trois tours complets." },
    { tier: "application", prompt: "10 images, 2 par enveloppe. Combien d'enveloppes ?", solution: "Des paquets de 2 : **5** enveloppes." },
    { tier: "challenge", prompt: "7 billes à partager entre 2 enfants. Combien chacun, et combien en reste-t-il ?", solution: "**3** chacun et il **reste 1** : plus assez pour un tour complet." },
    { tier: "exam", prompt: "4 assiettes, et je veux 2 gâteaux par assiette. Combien de gâteaux dois-je aller chercher, en un seul voyage ?", solution: "2 et 2 et 2 et 2 → **8** gâteaux." },
  ],
  practice: [
    { tier: "application", label: "Combien d'enveloppes ?", make: (r) => {
      const k = randint(r, 2, 5); const n = k + k;
      return { prompt: `J'ai ${n} images et je range 2 images par enveloppe. Combien d'enveloppes ?`, answer: k, solution: `Je fais des paquets de 2 : **${k}** enveloppes.` };
    } },
  ],
};

export default [
  recognizeQuantities, numberSequence, countObjects, digits, compareNumbers, orderNumbers, rank, numberStrip,
  decompose, addSubtract, complements, firstProblems, share, tensAndOnes, crossingTen, doubles,
];
