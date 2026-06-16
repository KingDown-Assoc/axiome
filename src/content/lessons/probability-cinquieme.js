// Field "Probability" — MIDDLE module (5e year): the official vocabulary.
// Official cycle-4 programme: approaching chance through simple problems, using
// the probability vocabulary in concrete contexts (random EXPERIMENT, OUTCOME,
// EVENT), assigning probabilities in simple equiprobable cases, expressing them
// in fraction/decimal/percentage form, positioning extreme events on the 0-1
// scale (lottery, ten 1s in a row), linking "one chance in four" to 1/4, and
// materially REPEATING a random experiment with results recorded in a count and
// frequency table — the frequentist bridge between probability and statistics.
import { randint, pick } from "../../core/exercises.js";

const vocabulaire = {
  id: "probability.middle.vocabulaire",
  level: "middle", domain: "probability",
  title: "Expérience, issue, événement",
  tagline: "Le vocabulaire des probabilités, et la fréquence qui se rapproche de la théorie sur de nombreux lancers.",
  prereqs: ["probability.middle.proba-number"],
  intuition:
    "Ton nombre de 6e gagne sa grammaire : une **expérience aléatoire** (lancer un dé), ses **issues** (1, 2, 3, 4, 5, 6 — les résultats possibles), et un **événement** (« obtenir un nombre pair » : un paquet d'issues — ici 2, 4, 6).\n\nQuand les issues sont **équiprobables** (dé équilibré !), la règle tombe : $P(\\text{événement}) = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$ — pair : $\\frac{3}{6} = \\frac{1}{2}$.",
  depths: {
    discovery:
      "**Avec les mains** : place sur l'échelle de 0 à 1 — l'impossible (0), le certain (1), pile ($\\frac{1}{2}$), un 6 au dé ($\\frac{1}{6}$)… et les extrêmes parlants : gagner au **loto** (presque 0 — environ une chance sur 19 millions) ; obtenir **dix fois de suite** le 1 avec un dé (minuscule : un sixième de un sixième de… dix fois). « Une chance sur quatre » se dit $\\frac{1}{4} = 0{,}25 = 25\\,\\%$ : tes trois écritures, encore.",
    standard:
      "**En image** : l'**équiprobabilité** s'attribue, elle ne se décrète pas — le dé équilibré : oui ($\\frac{1}{6}$ chacune) ; une urne de 3 rouges et 1 bleue : non pour les couleurs (mais oui pour les **boules** : $P(\\text{rouge}) = \\frac{3}{4}$ en comptant les boules-issues). Bien choisir ses issues, c'est la moitié du travail.",
    advanced:
      "**Dans la tête** : que disent les probabilités du réel ? **Répète** l'expérience — lance le dé 600 fois, note les effectifs dans un tableau, calcule les **fréquences** : autour de $\\frac{1}{6} \\approx 16{,}7\\,\\%$ chacune, avec des fluctuations qui s'amenuisent quand les lancers s'accumulent. La fréquence observée (statistique) **converge** vers la probabilité (théorie) : c'est le pont entre tes deux chapitres — la moyenne de tes données rencontre le nombre du hasard. Le dé ne se souvient de rien, mais la masse des lancers obéit.",
  },
  keyIdea: "**Expérience** → **issues** → **événement** (un paquet d'issues). Équiprobabilité : $P = \\dfrac{\\text{favorables}}{\\text{possibles}}$ — et la fréquence observée, en répétant, se rapproche de $P$.",
  why:
    "Pourquoi un vocabulaire si cérémonieux pour des jeux de dés ? Parce que la précision désamorce les pièges : « j'ai fait trois piles, le face est dû » confond l'expérience (un lancer) et la série (le dé n'a pas de mémoire !). Distinguer issue, événement, fréquence et probabilité, c'est l'antidote — celui qui manquait aux joueurs ruinés qui, en interrogeant Pascal et Fermat (1654), ont fait naître cette science.",
  examples: [
    { title: "La grammaire sur un dé", steps: [
      { p: "Expérience : lancer le dé. Issues : 1, 2, 3, 4, 5, 6. Événement « pair » : {2, 4, 6}." },
      { p: "Équiprobabilité : $P(\\text{pair}) = \\frac{3}{6} = \\frac{1}{2} = 50\\,\\%$ — favorables sur possibles." },
    ] },
    { title: "Le tableau qui converge", steps: [
      { p: "600 lancers : le 4 sort 103 fois — fréquence $\\frac{103}{600} \\approx 17{,}2\\,\\%$." },
      { p: "Théorie : $\\frac{1}{6} \\approx 16{,}7\\,\\%$ — l'observé frôle le prévu, et l'écart fond avec les lancers." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour le lancer d'une pièce : nomme l'expérience, les issues, et un événement.", solution: "**Expérience** : lancer la pièce ; **issues** : pile, face ; un **événement** : « obtenir pile » (ici une seule issue — un événement peut en grouper plusieurs)." },
    { tier: "warmup", prompt: "Un dé équilibré : donne $P(\\text{obtenir un nombre pair})$ sous trois écritures.", solution: "Issues favorables {2, 4, 6} sur 6 : $\\frac{3}{6} = \\frac{1}{2} = 0{,}5 = $ **50 %** — fraction, décimal, pourcentage." },
    { tier: "application", prompt: "Une urne : 3 boules rouges, 1 bleue. Les couleurs sont-elles équiprobables ? Donne $P(\\text{rouge})$.", solution: "**Non** — mais les 4 **boules** le sont : $P(\\text{rouge}) = \\frac{3}{4} = 75\\,\\%$. Choisir les bonnes issues (les boules, pas les couleurs) rend l'équiprobabilité utilisable." },
    { tier: "challenge", prompt: "Place sur l'échelle de 0 à 1 : gagner au loto ; obtenir pile ; tirer une boule verte d'une urne 100 % verte ; obtenir dix fois de suite le 1 au dé.", solution: "Loto : **presque 0** (≈ 1 sur 19 millions) ; pile : $\\frac{1}{2}$ ; boule verte certaine : **1** ; dix 1 de suite : **minuscule** ($\\frac{1}{6}$ de $\\frac{1}{6}$… dix fois — moins d'une chance sur 60 millions) — l'échelle loge tout, du certain à l'infime." },
    { tier: "exam", prompt: "On lance un dé 600 fois : le 4 sort 103 fois. Calcule la fréquence, compare à la probabilité théorique, et explique pourquoi elles diffèrent sans se contredire.", solution: "Fréquence $= \\frac{103}{600} \\approx $ **17,2 %** ; théorie : $\\frac{1}{6} \\approx 16{,}7\\,\\%$. L'écart est la **fluctuation** normale d'un échantillon fini — le hasard ne promet pas l'exactitude à 600 lancers, il promet le **rapprochement** quand on répète : la fréquence converge vers la probabilité, c'est le pont entre statistique et théorie." },
  ],
  practice: [
    { tier: "warmup", label: "Favorables sur possibles", make: (r) => {
      const fav = randint(r, 1, 5); const evts = [["pair", 3], ["impair", 3], ["plus grand que 4", 2], ["multiple de 3", 2]];
      const [nom, f] = pick(r, evts);
      return { prompt: `Dé équilibré : combien d'issues favorables pour « obtenir un nombre ${nom} » ?`, answer: f, solution: `**${f}** issues sur 6 → $P = \\frac{${f}}{6}$.` };
    } },
    { tier: "application", label: "L'urne équiprobable", make: (r) => {
      const rouge = randint(r, 2, 7); const bleu = randint(r, 1, 5);
      return { prompt: `Urne : ${rouge} rouges, ${bleu} bleues. $P(\\text{rouge})$ en pourcentage (arrondi à l'unité) ?`, answer: Math.round((rouge / (rouge + bleu)) * 100), solution: `$\\frac{${rouge}}{${rouge + bleu}} \\approx $ **${Math.round((rouge / (rouge + bleu)) * 100)} %** — les boules sont les issues équiprobables.` };
    } },
    { tier: "challenge", label: "La fréquence observée", make: (r) => {
      const n = pick(r, [200, 300, 500, 600]); const eff = Math.round(n / 6) + randint(r, -5, 5);
      return { prompt: `${n} lancers d'un dé : le 6 sort ${eff} fois. Fréquence en % (arrondi à l'unité) ?`, answer: Math.round((eff / n) * 100), solution: `$\\frac{${eff}}{${n}} \\approx $ **${Math.round((eff / n) * 100)} %** — à comparer aux $\\frac{1}{6} \\approx 17\\,\\%$ théoriques : la fluctuation est normale.` };
    } },
  ],
};

export default [vocabulaire];
