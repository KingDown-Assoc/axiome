// Field "Applied maths & computation" — PRESCHOOL module: comparing and ordering magnitudes.
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

export default [magnitudes];
