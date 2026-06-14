// Field "Applied maths & computation" — PRESCHOOL module: comparing and ordering magnitudes.
import { randint, pick } from "../../core/exercises.js";
const magnitudes = {
  id: "applied.preschool.magnitudes",
  level: "preschool", domain: "applied",
  title: "Comparer des grandeurs : grand, long, lourd",
  tagline: "Plus grand, plus petit, plus long, plus lourd — et comment ranger.",
  prereqs: [],
  intuition:
    "On ne compare pas que des quantités, on compare aussi des **tailles**. Qui est le plus grand ? Quel crayon est le plus long ? Quel sac est le plus lourd ?\n\nPour comparer deux longueurs, on aligne les départs côte à côte et on regarde qui dépasse. Pour le poids, une balance penche du côté le plus lourd.",
  depths: {
    discovery: "**Avec les mains** : je pose les deux crayons côte à côte, même départ — on compare des tailles : grand/petit, long/court, lourd/léger. On peut aussi les ranger.",
    standard: "**En image** : une **grandeur** (longueur, masse, contenance) se compare directement (côte à côte, balance) avant de se mesurer avec des nombres. Comparer puis ranger des grandeurs prépare la **mesure**.",
    advanced: "**Dans la tête** : mesurer, c'est associer un **nombre** à une grandeur en choisissant une **unité** : « 3 crayons de long », puis « 12 cm ». L'éveil installe l'étape d'avant — comparer sans chiffres — qui fonde toute la théorie de la mesure.",
  },
  keyIdea: "On compare d'abord (qui dépasse ?), on mesure ensuite (avec une unité).",
  why:
    "Pourquoi aligner les départs pour comparer deux longueurs ? Parce que sinon on triche : un crayon « en avance » paraît plus long alors qu'il commence juste plus loin. En partant du même bord, c'est l'arrivée qui décide — on compare vraiment les longueurs, pas les positions.",
  examples: [
    { title: "Quel ruban est le plus long ?", steps: [
      { p: "Je pose les deux rubans côte à côte, départs alignés." },
      { p: "Celui qui dépasse à l'arrivée est le plus long." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le contraire de « grand » ?", solution: "**petit**." },
    { tier: "warmup", prompt: "Le contraire de « lourd » ?", solution: "**léger**." },
    { tier: "challenge", prompt: "Pour comparer deux crayons, faut-il aligner leurs départs ou leurs pointes ? Pourquoi ?", solution: "Les **départs** : sinon un crayon décalé semble plus long sans l'être." },
    { tier: "exam", prompt: "On dit qu'un objet mesure « 3 trombones de long ». Qu'a-t-on choisi pour mesurer ?", solution: "Une **unité** (le trombone) : mesurer, c'est compter combien d'unités tiennent dans la grandeur." },
  ],
};

// — Time (preschool) —
const timePassing = {
  id: "applied.preschool.time",
  level: "preschool", domain: "applied",
  title: "Le temps qui passe",
  prereqs: ["numbers.preschool.order"],
  tagline: "Le moment de la journée et les jours de la semaine, dans l'ordre.",
  intuition:
    "Le temps avance toujours dans le **même ordre**, on ne revient pas en arrière. Dans une journée : le **matin**, puis le **midi**, puis l'**après-midi**, puis le **soir**, puis la **nuit**.\n\nLes jours se suivent aussi : lundi, mardi, mercredi… Savoir l'ordre, c'est savoir ce qui vient **avant** et **après**.",
  depths: {
    discovery:
      "Une journée se déroule dans l'ordre : **matin → midi → après-midi → soir → nuit**.\n\nLa semaine a 7 jours, eux aussi dans l'ordre : **lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche**.",
    standard:
      "Comme pour les nombres, chaque moment a un **avant** et un **après** : après le matin vient le midi ; avant le soir, il y a l'après-midi.\n\nLes jours tournent en boucle : après dimanche, on revient à lundi.",
    advanced:
      "Mettre des événements dans l'ordre du temps, c'est les **ranger sur une ligne** — la même idée que ranger des nombres du plus petit au plus grand. Cette ligne deviendra plus tard une *frise*, puis un *axe du temps*.",
  },
  keyIdea: "Le temps avance toujours dans le même ordre : il y a un **avant** et un **après**.",
  why:
    "Pourquoi apprendre l'ordre du temps ? Parce qu'il permet de prévoir : si on est le matin, on sait que le repas de midi vient *après*. Comprendre « avant / après », c'est commencer à organiser sa journée.",
  examples: [
    { title: "Avant ou après ?", steps: [
      { p: "On déjeune à midi." },
      { p: "Le goûter, c'est l'après-midi." },
      { p: "Donc le goûter vient **après** le déjeuner." },
    ] },
    { title: "Le jour suivant", steps: [
      { p: "Aujourd'hui, c'est mercredi." },
      { p: "Le jour d'après est **jeudi**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce qui vient juste après le matin ?", solution: "Le **midi**." },
    { tier: "warmup", prompt: "Cite les moments de la journée dans l'ordre.", solution: "Matin, midi, après-midi, soir, nuit." },
    { tier: "application", prompt: "Quel jour vient juste après lundi ?", solution: "**Mardi**." },
    { tier: "challenge", prompt: "On est vendredi. Dans deux jours, quel jour sera-t-il ?", solution: "Vendredi → samedi → **dimanche**." },
    { tier: "exam", prompt: "Range dans l'ordre : soir, matin, après-midi.", solution: "**Matin, après-midi, soir**." },
  ],
  practice: [
    { tier: "warmup", label: "Le jour d'après", make: (r) => { const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]; const i = randint(r, 0, 6); const next = days[(i + 1) % 7]; return { prompt: `Quel jour vient juste après ${days[i]} ?`, answer: next, check: { type: "exact" }, solution: `Après ${days[i]} vient **${next}**.` }; } },
  ],
};

// — Measuring a length with a unit (preschool) —
const measureLength = {
  id: "applied.preschool.measure-length",
  level: "preschool", domain: "applied",
  title: "Mesurer une longueur",
  tagline: "Compter combien d'unités tiennent bout à bout dans une longueur.",
  prereqs: ["applied.preschool.magnitudes", "numbers.preschool.count"],
  intuition:
    "Comment comparer la table et la porte, qu'on ne peut pas coller l'une contre l'autre ? Avec une **bande témoin** : je reporte la longueur de la table sur une bande de papier (un trait au bon endroit), puis je transporte la bande jusqu'à la porte. La bande **transporte la longueur**.\n\nL'étape d'après, c'est **mesurer** : dire **combien** c'est long, avec un nombre. On choisit un petit objet comme **unité** (un trombone, un cube) et on compte combien il en faut, posés **bout à bout**. « Le crayon mesure 4 trombones. »",
  depths: {
    discovery:
      "**Avec les mains** : pour comparer deux longueurs qu'on ne peut pas rapprocher, je reporte l'une sur une **bande témoin** et je transporte la bande jusqu'à l'autre. La bande permet aussi de couper un ruban **exactement aussi long** qu'un objet donné.",
    standard:
      "**En image** : mesurer, c'est aller plus loin que comparer — donner un **nombre**. Deux règles : poser les unités **bout à bout** (sans trou) et **sans chevauchement**, en partant du bord.\n\nLe nombre dépend de l'**unité choisie** : le même crayon fait 4 gros trombones ou 8 petits cubes. Plus l'unité est petite, plus le nombre est grand.",
    advanced:
      "**Dans la tête** : mesurer, c'est associer un **nombre** à une grandeur — longueur = nombre d'unités. La bande témoin est l'outil de la maternelle ; compter les unités est déjà un pas vers le CP, où arriveront l'unité **commune** (le centimètre, le mètre) et la règle graduée.",
  },
  keyIdea: "Mesurer = compter combien d'**unités** tiennent bout à bout dans la longueur.",
  why:
    "Pourquoi faut-il poser les unités bout à bout, sans trou ni chevauchement ? Parce qu'un trou fait compter **trop peu**, un chevauchement fait compter **trop**. Bout à bout, chaque unité couvre sa part exactement une fois : le compte donne la vraie longueur.",
  examples: [
    { title: "Mesurer un crayon", steps: [
      { p: "Je pose des trombones bout à bout le long du crayon." },
      { p: "J'en compte 4 → le crayon mesure **4 trombones**." },
    ] },
    { title: "Petite unité, grand nombre", steps: [
      { p: "Avec des cubes plus petits, il en faut **8** pour le même crayon." },
      { p: "Plus l'unité est petite, plus le nombre est grand." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Mesurer une longueur, c'est compter quoi ?", solution: "Combien d'**unités** tiennent dans la longueur." },
    { tier: "warmup", prompt: "La table est trop lourde pour être poussée jusqu'à la porte. Comment comparer leurs largeurs ?", solution: "Avec une **bande témoin** : je reporte la largeur de la table sur la bande, puis je porte la bande jusqu'à la porte." },
    { tier: "application", prompt: "Comment couper un ruban exactement aussi long que le bâton, sans règle graduée ?", solution: "Je pose le ruban **le long du bâton**, à la même origine, et je marque le bout : je **reporte** la longueur." },
    { tier: "warmup", prompt: "On aligne 5 cubes bout à bout le long d'un bâton. Combien mesure le bâton ?", solution: "**5 cubes**." },
    { tier: "application", prompt: "Pourquoi faut-il poser les trombones sans laisser de trou entre eux ?", solution: "Sinon on en compte **trop peu** : un trou fausse la mesure." },
    { tier: "challenge", prompt: "Un crayon fait 4 gros trombones. Avec des trombones deux fois plus petits, combien en faut-il ?", solution: "**8** : l'unité est deux fois plus petite, il en faut deux fois plus." },
    { tier: "exam", prompt: "Léa mesure 6 cubes de long, Tom mesure 6 trombones (plus grands que les cubes). Qui est le plus grand ?", solution: "**Tom** : à nombre égal, l'unité la plus grande donne la plus grande longueur." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les unités", make: (r) => {
      const n = randint(r, 3, 8);
      const unit = pick(r, ["cubes", "trombones", "pas"]);
      return { prompt: `On aligne ${n} ${unit} bout à bout le long d'un ruban. Combien mesure le ruban ?`, answer: n, solution: `On compte les unités : **${n} ${unit}**.` };
    } },
  ],
};

// — Mass: heavy or light, the balance scale (programme: explorer la masse) —
const mass = {
  id: "applied.preschool.mass",
  level: "preschool", domain: "applied",
  title: "Lourd ou léger : la balance",
  tagline: "Soupeser, comparer avec la balance — et ne pas confondre gros et lourd.",
  prereqs: ["applied.preschool.magnitudes"],
  intuition:
    "Prends une boule de pétanque dans une main, une balle de tennis dans l'autre : la pétanque **tire la main vers le bas**. Elle est plus **lourde**.\n\nQuand les deux mains hésitent, on appelle l'arbitre : la **balance à plateaux**. Elle **penche du côté du plus lourd** — et si les deux plateaux restent à la même hauteur, c'est l'**équilibre** : même masse.",
  depths: {
    discovery:
      "**Avec les mains** : soupeser, c'est tenir un objet dans chaque main et sentir lequel tire le plus. On dit « plus lourd que », « plus léger que », « de même masse que ».",
    standard:
      "**En image** : la balance penche du côté du plus lourd ; à plat, les masses sont **égales**. Et gare au piège : **plus gros ne veut pas dire plus lourd** ! Un gros sachet de coton est plus léger qu'un petit sachet de sable.",
    advanced:
      "**Dans la tête** : pour ranger trois objets, pas besoin de toutes les pesées. Si la pomme est plus lourde que la balle, et la balle plus lourde que la plume, alors la pomme est plus lourde que la plume — **sans nouvelle pesée**. Plus tard, la masse deviendra un **nombre** (les grammes) ; pour l'instant, on compare et on ordonne.",
  },
  keyIdea: "La balance **penche du côté du plus lourd** ; à plat, c'est l'**équilibre**. Et plus gros ≠ plus lourd !",
  why:
    "Pourquoi le plus gros n'est-il pas toujours le plus lourd ? Parce que ça dépend de la **matière** : le sable est bien plus « serré » que le coton — à taille égale, il pèse beaucoup plus. C'est pour ça qu'on **soupèse** au lieu de juger à l'œil.",
  examples: [
    { title: "Pétanque contre tennis", steps: [
      { p: "Une dans chaque main : la pétanque tire vers le bas." },
      { p: "Elle est **plus lourde** que la balle de tennis — pourtant elles ont presque la même taille !" },
    ] },
    { title: "Le piège du coton", steps: [
      { p: "Un gros sachet de coton, un petit sachet de sable, un sur chaque plateau." },
      { p: "La balance penche du côté du **sable** : plus gros ≠ plus lourd." },
    ] },
    { title: "Ranger sans tout peser", steps: [
      { p: "La pomme est plus lourde que la balle ; la balle est plus lourde que la plume." },
      { p: "Alors la pomme est plus lourde que la plume — **sans nouvelle pesée**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "De quel côté penche la balance à plateaux ?", solution: "Du côté du **plus lourd**." },
    { tier: "warmup", prompt: "Quel est le contraire de « plus lourd que » ?", solution: "« **Plus léger que** »." },
    { tier: "application", prompt: "Un gros sachet de coton et un petit sachet de sable : lequel pèse le plus lourd ?", solution: "Le **sable** : plus gros ne veut pas dire plus lourd — ça dépend de la matière." },
    { tier: "challenge", prompt: "Les deux plateaux de la balance restent à la même hauteur. Que peut-on dire ?", solution: "Les deux objets ont la **même masse** : c'est l'**équilibre**." },
    { tier: "exam", prompt: "La pomme pèse plus lourd que la balle, et la balle plus lourd que la plume. Sans balance : pomme ou plume, qui pèse le plus lourd ?", solution: "La **pomme** : elle dépasse la balle, qui dépasse la plume — donc elle dépasse aussi la plume." },
  ],
  practice: [
    { tier: "application", label: "Qui pèse le plus lourd ?", make: (r) => {
      const t = pick(r, [["la pomme", "la balle", "la plume"], ["la brique", "la chaussure", "le bouchon"], ["le livre", "la cuillère", "la feuille"]]);
      return { prompt: `${t[0]} pèse plus lourd que ${t[1]}, et ${t[1]} pèse plus lourd que ${t[2]}. Qui pèse le plus lourd ?`, answer: t[0], check: { type: "exact" }, solution: `**${t[0]}** : ce qui dépasse le milieu dépasse aussi le plus léger.` };
    } },
  ],
};

export default [magnitudes, mass, measureLength, timePassing];
