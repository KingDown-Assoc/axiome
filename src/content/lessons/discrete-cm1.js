// Field "Discrete" — PRIMARY module (CM1 year): organisation and management of data.
// Official cycle-3 programme (2025): quantitative variables (plant height, animal
// mass), curves and points in a coordinate frame, reading and producing them,
// real-world data (climate), and multi-step problems across tables, bars and curves.
import { randint, pick } from "../../core/exercises.js";

// — Curves and points in a frame (programme: courbes, repère, données réelles) —
const curves = {
  id: "discrete.primary.curves",
  level: "primary", domain: "discrete",
  title: "Courbes et points dans un repère",
  tagline: "Quand la grandeur change au fil du temps, la courbe raconte l'histoire.",
  prereqs: ["discrete.primary.data-gaps"],
  intuition:
    "Tes tableaux et diagrammes comptaient des **catégories** (couleurs, sports). Voici les caractères **quantitatifs** : la hauteur d'une plante, la température, la masse d'un animal — des grandeurs qui **évoluent**.\n\nPour les raconter : le **repère** — deux axes (le temps en bas, la grandeur sur le côté), un **point** par mesure, et la ligne qui les relie devient une **courbe**. D'un coup d'œil : ça monte, ça descend, ça accélère.",
  depths: {
    discovery:
      "**Avec les mains** : un haricot en classe, une mesure chaque matin — jour 2 : 3 cm ; jour 4 : 7 cm ; jour 6 : 12 cm. Chaque mesure devient un point : je monte du jour (axe du bas) et je croise la hauteur (axe de gauche). Relier les points, c'est dessiner la croissance.",
    standard:
      "**En image** : la courbe se **lit dans les deux sens** — « quelle hauteur au jour 4 ? » (je monte depuis 4, je lis à gauche : 7 cm) ; « quel jour la plante atteint-elle 12 cm ? » (je pars de 12 à gauche, je descends : jour 6). Et la **pente** parle : entre les jours 4 et 6, la plante a pris $12 - 7 = 5$ cm — plus que les 4 premiers jours : elle accélère.",
    advanced:
      "**Dans la tête** : les courbes ouvrent les **données réelles** — la température moyenne de la planète, relevée année après année, dessine une courbe qui monte : le réchauffement climatique se **voit**. Lire une courbe de presse ou de manuel de sciences, y prélever deux valeurs, calculer un écart, conclure : les problèmes deviennent multi-étapes, et les mathématiques deviennent un instrument d'observation du monde.",
  },
  keyIdea: "Un point = (un moment, une valeur). La courbe relie les points — et l'**écart** entre deux lectures se calcule : $h_2 - h_1$.",
  why:
    "Pourquoi relier les points, alors qu'on n'a mesuré que quelques jours ? Parce que la plante n'a pas sauté de 7 à 12 cm : elle est passée par toutes les hauteurs intermédiaires. Le trait dit « la grandeur évolue continûment » — c'est une hypothèse raisonnable pour une plante, fausse pour un nombre de buts marqués. Relier, c'est déjà modéliser.",
  widgets: [
    { kind: "plotter", params: { fns: [{ f: (x) => 0.3 * x * x, label: "hauteur (cm)" }], xmin: 0, xmax: 10, ymin: 0, ymax: 32 }, caption: "La croissance du haricot, jour après jour : la courbe monte — et de plus en plus vite." },
  ],
  examples: [
    { title: "Lire dans les deux sens", steps: [
      { p: "Quelle hauteur au jour 4 ? Je monte depuis 4, je croise la courbe, je lis à gauche : **7 cm**." },
      { p: "Quel jour pour 12 cm ? Je pars de 12 à gauche, je rejoins la courbe, je descends : **jour 6**." },
    ] },
    { title: "Calculer une croissance", steps: [
      { p: "Jour 4 : 7 cm. Jour 6 : 12 cm." },
      { p: "Croissance : $12 - 7 = $ **5 cm en deux jours** — la courbe accélère." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle différence entre un caractère qualitatif et un caractère quantitatif ? Donne un exemple de chaque.", solution: "Le **qualitatif** se décrit par des mots (une couleur, un sport) ; le **quantitatif** se mesure par des nombres (la hauteur d'une plante, une température) — et seul le quantitatif dessine des courbes." },
    { tier: "warmup", prompt: "Sur la courbe du haricot, la hauteur au jour 4 est 7 cm et au jour 6, 12 cm. De combien a-t-il grandi entre ces deux jours ?", solution: "$12 - 7 = $ **5 cm** — l'écart entre deux lectures." },
    { tier: "application", prompt: "Comment trouver, sur une courbe, le jour où la plante atteint 12 cm ?", solution: "Partir de **12 sur l'axe de gauche**, avancer jusqu'à la courbe, puis **descendre** vers l'axe du temps : le jour s'y lit — la lecture inverse." },
    { tier: "challenge", prompt: "Entre les jours 0 et 4, le haricot prend 7 cm ; entre les jours 4 et 6, il prend 5 cm. Pendant laquelle des deux périodes pousse-t-il le plus vite ?", solution: "Première période : 7 cm en **4 jours** ; seconde : 5 cm en **2 jours** — bien plus vite ensuite. La pente de la courbe le montrait d'un coup d'œil." },
    { tier: "exam", prompt: "Une courbe de presse montre la température moyenne mondiale : 13,8 °C en 1950 ; 14,9 °C en 2020. Que peut-on calculer, et que peut-on conclure ?", solution: "L'écart : $14{,}9 - 13{,}8 = $ **1,1 °C de hausse en 70 ans** — la courbe qui monte rend le réchauffement **visible** : lire des données réelles, c'est déjà de la science." },
  ],
  practice: [
    { tier: "application", label: "L'écart entre deux lectures", make: (r) => {
      const j1 = randint(r, 1, 5); const j2 = j1 + randint(r, 1, 4);
      const h1 = randint(r, 2, 12); const d = randint(r, 2, 9); const h2 = h1 + d;
      return { prompt: `Sur la courbe : ${h1} cm au jour ${j1}, ${h2} cm au jour ${j2}. De combien la plante a-t-elle grandi ?`, answer: d, solution: `$${h2} - ${h1} = $ **${d} cm** entre les jours ${j1} et ${j2}.` };
    } },
    { tier: "challenge", label: "Lecture multi-étapes", make: (r) => {
      const base = randint(r, 10, 16); const d1 = randint(r, 2, 5), d2 = randint(r, 2, 5);
      return { prompt: `Température lue sur la courbe : ${base} °C lundi, ${d1} °C de plus mardi, puis ${d2} °C de moins mercredi. Quelle température mercredi ?`, answer: base + d1 - d2, solution: `$${base} + ${d1} = ${base + d1}$ °C mardi, puis $${base + d1} - ${d2} = $ **${base + d1 - d2} °C** mercredi — deux étapes, une courbe.` };
    } },
  ],
};

export default [curves];
