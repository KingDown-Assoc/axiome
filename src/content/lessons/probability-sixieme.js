// Field "Probability" — MIDDLE module (6e year): probability becomes a NUMBER.
// Official cycle-3 programme (2025): moving from "a chances in b" (CM2) to the
// quotient a/b — expressible as a fraction, a decimal or a percentage (all the
// year's writings converge); the [0,1] scale from impossible to certain; and the
// FREQUENTIST approach introduced: repeated experiments show frequencies settling
// near the probability — chance unpredictable per throw, predictable in mass.
import { randint, pick } from "../../core/exercises.js";

// — Probability as a number (programme: du « a chances sur b » au quotient a/b) —
const probaNumber = {
  id: "probability.middle.proba-number",
  level: "middle", domain: "probability",
  title: "La probabilité est un nombre",
  tagline: "3 chances sur 6 = 1/2 = 0,5 = 50 % — toutes tes écritures convergent ici.",
  prereqs: ["probability.primary.count-chances", "numbers.middle.percent"],
  intuition:
    "Au CM2, tu comptais des chances : « 3 chances sur 6 » d'obtenir un nombre pair au dé. En 6e, ce constat devient un **nombre** : la probabilité est le quotient $\\frac{3}{6} = \\frac{1}{2} = 0{,}5 = 50\\,\\%$.\n\nFraction, décimal, pourcentage — toutes les écritures de l'année désignent la même probabilité. Et ce nombre vit sur une échelle fermée : de **0** (impossible) à **1** (certain).",
  depths: {
    discovery:
      "**Avec les mains** : l'échelle de 0 à 1 se gradue comme une réglette — tirer un nombre ≤ 6 au dé : probabilité **1** (certain) ; tirer un 7 : **0** (impossible) ; un nombre pair : **0,5**, pile au milieu ; un 6 : $\\frac{1}{6} \\approx 0{,}17$, près du bord gauche. Chaque événement trouve sa place sur la réglette.",
    standard:
      "**En image** : le calcul reste celui du CM2 — issues favorables sur issues possibles — mais le résultat s'écrit en nombre : une boule rouge parmi 4 rouges et 6 bleues : $\\frac{4}{10} = \\frac{2}{5} = 0{,}4 = 40\\,\\%$. Simplifier, convertir, comparer : tout ton arsenal des nombres s'applique aux probabilités — « 40 % de chances » et « probabilité $\\frac{2}{5}$ » disent exactement la même chose.",
    advanced:
      "**Dans la tête** : l'approche **fréquentiste** — lance une pièce 10 fois : peut-être 7 piles (70 % !). Lance-la 1 000 fois : la fréquence des piles se tasse vers 0,5 — toujours. Le hasard est **imprévisible au coup, prévisible en masse** : la probabilité est le nombre vers lequel les fréquences se serrent quand on répète sans fin. C'est pour cela que les assurances et les casinos, qui jouent des millions de fois, ne perdent jamais : ils ne parient pas sur un lancer, ils parient sur la masse.",
  },
  keyIdea: "Probabilité $= \\frac{\\text{issues favorables}}{\\text{issues possibles}}$ — un **nombre** entre 0 (impossible) et 1 (certain), en fraction, décimal ou pourcentage. En masse, les fréquences le rejoignent.",
  why:
    "Pourquoi transformer « 3 chances sur 6 » en nombre ? Pour **comparer et calculer** : « 3 chances sur 6 » contre « 2 chances sur 5 » se disputent ; $0{,}5$ contre $0{,}4$ se classent d'un regard. Dès que le hasard devient nombre, toute la machinerie des nombres — ordre, opérations, pourcentages — se met à son service. C'est le geste fondateur d'une science entière : les probabilités.",
  examples: [
    { title: "Du comptage au nombre", steps: [
      { p: "Dé équilibré, événement « nombre pair » : 3 issues favorables (2, 4, 6) sur 6 possibles." },
      { p: "Probabilité : $\\frac{3}{6} = \\frac{1}{2} = 0{,}5 = $ **50 %** — quatre habits, un nombre." },
    ] },
    { title: "La masse a raison", steps: [
      { p: "10 lancers de pièce : 7 piles — fréquence 0,7, loin de 0,5 : normal, le hasard est nerveux à petite échelle." },
      { p: "1 000 lancers : 503 piles — fréquence 0,503 : les fréquences **se serrent** vers la probabilité." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Au dé, quelle est la probabilité d'obtenir un nombre pair ? Donne les trois écritures.", solution: "3 issues sur 6 : $\\frac{3}{6} = \\frac{1}{2} = $ **0,5** $= $ **50 %** — la probabilité est un nombre, sous tous ses habits." },
    { tier: "warmup", prompt: "Place sur l'échelle de 0 à 1 : obtenir un 7 au dé ; obtenir un nombre ≤ 6 ; obtenir un 6.", solution: "Un 7 : **0** (impossible) ; ≤ 6 : **1** (certain) ; un 6 : $\\frac{1}{6} \\approx 0{,}17$ — entre les deux bords." },
    { tier: "application", prompt: "Un sac : 4 boules rouges, 6 bleues. Probabilité de tirer une rouge, en fraction simplifiée puis en pourcentage ?", solution: "$\\frac{4}{10} = \\frac{2}{5} = 0{,}4 = $ **40 %** — simplifier et convertir, comme tout nombre." },
    { tier: "challenge", prompt: "Vaut-il mieux « 3 chances sur 6 » ou « 2 chances sur 5 » ? Tranche par les nombres.", solution: "$\\frac{3}{6} = 0{,}5$ contre $\\frac{2}{5} = 0{,}4$ : **3 sur 6 l'emporte** — le passage au nombre rend les hasards comparables." },
    { tier: "exam", prompt: "Lina lance une pièce 10 fois et obtient 7 piles. Elle conclut : « ma pièce a 70 % de chances de tomber sur pile ». Critique avec l'approche fréquentiste.", solution: "10 lancers, c'est trop peu : le hasard est **imprévisible au coup** et nerveux à petite échelle. C'est en répétant beaucoup (1 000 lancers…) que la fréquence se serre vers la probabilité — vers **0,5** si la pièce est équilibrée. La fréquence observée approche la probabilité ; elle ne la décrète pas sur dix lancers." },
  ],
  practice: [
    { tier: "warmup", label: "Les habits du hasard", make: (r) => {
      const q = pick(r, [[3, 6, 50], [1, 2, 50], [1, 4, 25], [3, 4, 75], [2, 5, 40], [1, 5, 20], [4, 10, 40], [1, 10, 10]]);
      return { prompt: `${q[0]} issues favorables sur ${q[1]} possibles : quelle probabilité en pourcentage ?`, answer: q[2], solution: `$\\frac{${q[0]}}{${q[1]}} = $ **${q[2]} %** — le comptage devient nombre.` };
    } },
    { tier: "application", label: "La fréquence se serre", make: (r) => {
      const n = pick(r, [200, 400, 500, 1000]); const p = pick(r, [[1, 2], [1, 4], [1, 5]]);
      const attendu = n * p[0] / p[1];
      return { prompt: `Une expérience a une probabilité de $\\frac{${p[0]}}{${p[1]}}$. Sur ${n} répétitions, autour de combien de réussites s'attendre ?`, answer: attendu, solution: `$${n} \\times \\frac{${p[0]}}{${p[1]}} = $ **${attendu}** environ — la masse rejoint la probabilité.` };
    } },
  ],
};

export default [probaNumber];
