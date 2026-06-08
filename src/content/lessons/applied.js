// Field "Applied maths & computation" — PRESCHOOL module: comparing and ordering magnitudes.
import { randint } from "../../core/exercises.js";
const magnitudes = {
  id: "applied.preschool.magnitudes",
  level: "preschool", domain: "applied",
  title: "Comparer des grandeurs : grand, long, lourd",
  tagline: "Plus grand, plus petit, plus long, plus lourd — et comment ranger.",
  prereqs: [],
  intuition:
    "On ne compare pas que des quantités, on compare aussi des **tailles**. Qui est le plus grand ? Quel crayon est le plus long ? Quel sac est le plus lourd ?\n\nPour comparer deux longueurs, on aligne les départs côte à côte et on regarde qui dépasse. Pour le poids, une balance penche du côté le plus lourd.",
  depths: {
    discovery: "On compare des tailles : grand/petit, long/court, lourd/léger. On peut aussi les ranger.",
    standard: "Une **grandeur** (longueur, masse, contenance) se compare directement (côte à côte, balance) avant de se mesurer avec des nombres. Comparer puis ranger des grandeurs prépare la **mesure**.",
    advanced: "Mesurer, c'est associer un **nombre** à une grandeur en choisissant une **unité** : « 3 crayons de long », puis « 12 cm ». L'éveil installe l'étape d'avant — comparer sans chiffres — qui fonde toute la théorie de la mesure.",
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

export default [magnitudes, timePassing];
