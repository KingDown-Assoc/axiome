// Field "Discrete mathematics" — MIDDLE module (5e year): statistics. Official
// cycle-4 programme: collecting and organizing data, computing COUNTS and
// FREQUENCIES (expressed in decimal, fraction, or percentage form), reading and
// representing data as tables, bar charts, pie charts, or cartesian graphs (with
// a spreadsheet-grapher), CHOOSING the representation suited to the message, and
// computing and INTERPRETING the simple MEAN of a data series — with Florence
// Nightingale's rose diagrams as the official historical extension.
import { randint, pick } from "../../core/exercises.js";

const moyenne = {
  id: "discrete.middle.moyenne",
  level: "middle", domain: "discrete",
  title: "Effectifs, fréquences, moyenne",
  tagline: "La moyenne égalise tout le monde — et un bon diagramme a sauvé des milliers de soldats.",
  prereqs: ["discrete.middle.survey"],
  intuition:
    "Ton enquête de 6e gagne deux instruments de précision. La **fréquence** d'abord : la part d'un effectif dans le total, en **trois écritures** — fraction, décimal, pourcentage ($\\frac{6}{24} = 0{,}25 = 25\\,\\%$ : tes habits d'un même nombre).\n\nPuis la **moyenne** : la somme des valeurs divisée par l'effectif total — la valeur que tout le monde aurait si on **égalisait** le partage.",
  depths: {
    discovery:
      "**Avec les mains** : notes de Léa — 8, 12, 13, 15. Somme : 48 ; moyenne : $48 \\div 4 = 12$. Le sens : si Léa avait eu **la même note** aux quatre contrôles, ce serait 12 — la moyenne nivelle les hauts et les bas en préservant le total.",
    standard:
      "**En image** : chaque représentation a sa spécialité — le **diagramme en barres** compare des catégories ; le **circulaire** montre les parts d'un tout (les fréquences en quartiers !) ; le **graphique cartésien** suit une évolution dans le temps. Choisir, c'est se demander : qu'est-ce que je veux montrer ? Le tableur-grapheur les fabrique tous — à toi de commander le bon.",
    advanced:
      "**Dans la tête** : la moyenne est un **point d'équilibre** — pose les valeurs comme des poids sur une règle graduée : elle tient en équilibre exactement sur la moyenne. D'où sa fragilité : une valeur extrême la déporte (un 0 fait chuter une moyenne de quatre notes de 3 points !) — et sa nuance : la moyenne n'est **pas** la majorité (une classe peut avoir 12 de moyenne sans qu'aucun élève n'ait 12). Lire une moyenne, c'est savoir ce qu'elle cache.",
  },
  keyIdea: "Fréquence $= \\dfrac{\\text{effectif}}{\\text{total}}$ — trois écritures. Moyenne $= \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$ : la valeur du partage **égalisé**.",
  why:
    "À quoi sert un « bon » diagramme ? À convaincre — et parfois à sauver des vies : Florence Nightingale, infirmière et statisticienne (1858), inventa ses **diagrammes en rose** pour montrer au Parlement britannique que les soldats de Crimée mouraient d'infections évitables bien plus que de blessures. Les tableaux de chiffres n'avaient convaincu personne ; **l'image**, si — les hôpitaux furent réformés. Représenter des données, c'est leur donner une voix.",
  examples: [
    { title: "Les trois écritures", steps: [
      { p: "6 élèves sur 24 préfèrent le bleu : fréquence $\\frac{6}{24} = \\frac{1}{4}$." },
      { p: "Soit $0{,}25$, soit **25 %** — fraction, décimal, pourcentage : trois habits, un nombre." },
    ] },
    { title: "La moyenne de Léa", steps: [
      { p: "Notes 8, 12, 13, 15 : somme $= 48$, effectif $= 4$." },
      { p: "Moyenne $= 48 \\div 4 = $ **12** — la note unique qui préserverait le total." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans une classe de 24, le bleu obtient 6 voix. Écris la fréquence sous trois formes.", solution: "$\\frac{6}{24} = \\frac{1}{4}$ ; $0{,}25$ ; **25 %** — la fréquence est la part du tout, sous l'habit qui arrange." },
    { tier: "warmup", prompt: "Calcule la moyenne des notes 8, 12, 13, 15, et explique ce qu'elle signifie.", solution: "$\\frac{8 + 12 + 13 + 15}{4} = \\frac{48}{4} = $ **12** — la note que Léa aurait eue à chaque contrôle si on égalisait : même total, partagé uniformément." },
    { tier: "application", prompt: "Quel diagramme choisir pour : (a) les parts de marché de 4 marques, (b) la température sur une semaine, (c) le nombre d'élèves par sport ?", solution: "(a) **circulaire** (des parts d'un tout) ; (b) **graphique cartésien** (une évolution dans le temps) ; (c) **barres** (comparer des catégories) — choisir, c'est savoir ce qu'on montre." },
    { tier: "challenge", prompt: "Notes de Tom : 11, 12, 13 et un 0 d'absence. Calcule la moyenne avec puis sans le 0, et conclus.", solution: "Avec : $\\frac{36}{4} = $ **9** ; sans : $\\frac{36}{3} = $ **12** — une seule valeur extrême déporte la moyenne de 3 points : le point d'équilibre est sensible aux poids excentrés." },
    { tier: "exam", prompt: "Une classe a 12 de moyenne en maths. Peut-on affirmer que la moitié des élèves a plus de 12 ? Qu'au moins un élève a exactement 12 ? Justifie par un exemple.", solution: "**Non et non** — la moyenne n'est ni la majorité ni une valeur atteinte : la série 8, 8, 8, 24 a pour moyenne $\\frac{48}{4} = 12$, mais trois élèves sur quatre sont **sous** 12 et personne n'a 12. La moyenne préserve le total, pas la répartition — c'est sa force et son piège." },
  ],
  practice: [
    { tier: "warmup", label: "La fréquence en pourcentage", make: (r) => {
      const tot = pick(r, [20, 25, 40, 50]); const eff = pick(r, [tot / 4, tot / 2, tot / 5, (3 * tot) / 10].filter(x => Number.isInteger(x) && x >= 1));
      return { prompt: `${eff} élèves sur ${tot} : quelle fréquence en % ?`, answer: (eff / tot) * 100, solution: `$\\frac{${eff}}{${tot}} = \\frac{${(eff / tot) * 100}}{100} = $ **${String((eff / tot) * 100).replace(".", ",")} %**.` };
    } },
    { tier: "application", label: "Égaliser le partage", make: (r) => {
      const n = pick(r, [3, 4, 5]); const m = randint(r, 8, 15);
      const vals = []; let s = 0;
      for (let i = 0; i < n - 1; i++) { const v = randint(r, Math.max(2, m - 4), Math.min(19, m + 4)); vals.push(v); s += v; }
      vals.push(n * m - s);
      return { prompt: `Calcule la moyenne de : ${vals.join(" ; ")}.`, answer: m, solution: `Somme $= ${n * m}$, effectif $= ${n}$ : moyenne $= ${n * m} \\div ${n} = $ **${m}**.` };
    } },
    { tier: "challenge", label: "La moyenne à l'envers", make: (r) => {
      const m = randint(r, 9, 15); const a = randint(r, m - 4, m - 1); const b = randint(r, m, m + 3);
      const c = 3 * m - a - b;
      return { prompt: `Deux notes : ${a} et ${b}. Quelle troisième note pour une moyenne de ${m} ?`, answer: c, solution: `Le total doit valoir $3 \\times ${m} = ${3 * m}$ ; il manque $${3 * m} - ${a} - ${b} = $ **${c}** — la moyenne se pilote par le total.` };
    } },
  ],
};

export default [moyenne];
