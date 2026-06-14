// Field "Numbers" — MIDDLE module (4e year), part 2: powers and square roots.
// Official cycle-4 programme: defining powers with positive whole exponents,
// multiplying powers of the SAME base (a^m × a^n) and powers with the SAME
// exponent (a^n × b^n), solving power problems; understanding and knowing the
// definition of the SQUARE ROOT of a positive number, BRACKETING the square root
// of an integer between two consecutive integers — with the official extensions:
// discovering irrational numbers (square area vs side) and proving that √2 is
// not a decimal number by contradiction on the units digit.
import { randint, pick } from "../../core/exercises.js";

// — Powers with whole exponents (programme: aⁿ, aᵐ×aⁿ, aⁿ×bⁿ) —
const puissancesExposants = {
  id: "numbers.middle.puissances-exposants",
  level: "middle", domain: "numbers",
  title: "Les puissances d'exposant entier",
  tagline: "a^m × a^n = a^(m+n) — compter les facteurs au lieu de les multiplier.",
  prereqs: ["numbers.middle.puissances"],
  intuition:
    "Tes carrés et cubes généralisent : $a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ facteurs}}$ — l'exposant **compte les facteurs**.\n\nEt compter révèle deux règles : $a^m \\times a^n = a^{m+n}$ (les facteurs s'additionnent !) et $a^n \\times b^n = (a \\times b)^n$ (même exposant : les bases se marient).",
  depths: {
    discovery:
      "**Avec les mains** : $2^3 \\times 2^4 = (2 \\times 2 \\times 2) \\times (2 \\times 2 \\times 2 \\times 2)$ — sept facteurs 2 en tout : $2^7$. Pas besoin de calculer $8 \\times 16 = 128$ pour le savoir : **compter** les facteurs suffit, et $3 + 4 = 7$ est plus rapide que toute multiplication.",
    standard:
      "**En image** : les pièges et la deuxième règle — $a^m \\times a^n$ **additionne** les exposants (jamais ne les multiplie : $2^3 \\times 2^4 \\neq 2^{12}$ !), et elle exige la **même base** : $2^3 \\times 5^3$ ne s'y plie pas… mais la règle jumelle le ramasse : même **exposant** → $2^3 \\times 5^3 = (2 \\times 5)^3 = 10^3 = 1\\,000$. Apparier les facteurs deux à deux : trois paires $(2 \\times 5)$.",
    advanced:
      "**Dans la tête** : les puissances de 10 portent la numération — $10^6$ : le million, un 1 suivi de **six** zéros : l'exposant compte les zéros, et $10^2 \\times 10^3 = 10^5$ se lit « cent mille » sans poser une seule multiplication. Quant à la croissance des puissances, la légende de l'échiquier la mesure : un grain doublé à chaque case, $2^{63}$ à la dernière — environ $9 \\times 10^{18}$ grains, des siècles de récolte mondiale. Doubler peu de fois suffit à dépasser tout ce qui croît en additionnant : c'est la leçon que les exposants enseignent au monde.",
  },
  keyIdea: "$a^n$ : $n$ facteurs. **Même base** : $a^m \\times a^n = a^{m+n}$ (les exposants s'additionnent). **Même exposant** : $a^n \\times b^n = (ab)^n$. Pour 10 : l'exposant compte les zéros.",
  why:
    "Pourquoi des règles pour éviter de calculer ? Parce que les puissances dépassent vite toute calculatrice : $2^{100}$ a 31 chiffres — mais $2^{40} \\times 2^{60} = 2^{100}$ se voit en une seconde. Les règles d'exposants permettent de **raisonner sur des nombres qu'on ne peut pas écrire** : c'est ainsi que l'informatique manipule ses clés de chiffrement et l'astronomie ses distances.",
  examples: [
    { title: "Compter au lieu de multiplier", steps: [
      { p: "$2^3 \\times 2^4$ : trois facteurs 2, puis quatre — sept en tout." },
      { p: "$= 2^{3+4} = 2^7 = 128$ — l'addition des exposants remplace la multiplication des valeurs." },
    ] },
    { title: "Marier les bases", steps: [
      { p: "$2^3 \\times 5^3$ : même exposant — apparie les facteurs : $(2 \\times 5) \\times (2 \\times 5) \\times (2 \\times 5)$." },
      { p: "$= 10^3 = 1\\,000$ — trois paires, une puissance de dix." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris $2^3 \\times 2^4$ comme une seule puissance de 2, en comptant les facteurs.", solution: "$3 + 4 = 7$ facteurs : $2^7$ ($= 128$) — les exposants s'**additionnent**, ils ne se multiplient pas." },
    { tier: "warmup", prompt: "Écris sous forme d'une seule puissance : $5^2 \\times 5^6$ ; $10^3 \\times 10^4$.", solution: "$5^8$ ; $10^7$ — même base : on additionne les exposants ($10^7$ : un 1 et sept zéros)." },
    { tier: "application", prompt: "Calcule astucieusement $2^5 \\times 5^5$.", solution: "Même exposant : $(2 \\times 5)^5 = 10^5 = $ **100 000** — apparier les facteurs vaut mieux que calculer $32 \\times 3\\,125$." },
    { tier: "challenge", prompt: "Vrai ou faux : $2^3 \\times 2^4 = 2^{12}$ ; $3^2 \\times 3^2 = 9^2$ ; $4^2 \\times 25^2 = 100^2$. Corrige.", solution: "**Faux** : $2^7$ (on additionne, $3+4$) ; **faux** : $3^4 = 81$ (même base → exposants ajoutés ; or $9^2 = 81$… vrai par coïncidence de valeur mais l'écriture juste est $3^4$ — méfie-toi : $(3 \\times 3)^2 = 9^2$ exigerait la règle même-exposant) ; **vrai** : $(4 \\times 25)^2 = 100^2$ — même exposant, bases mariées." },
    { tier: "exam", prompt: "La légende de l'échiquier : 1 grain sur la 1re case, le double à chaque case. Écris en puissance le nombre de grains de la case 11, puis exprime le produit (case 11) × (case 21) en une puissance de 2.", solution: "Case 11 : $2^{10} = 1\\,024$ grains (dix doublements). Produit : $2^{10} \\times 2^{20} = 2^{30}$ (plus d'un milliard) — les exposants s'additionnent, et la croissance doublée écrase tout : à la case 64, $2^{63}$ dépasse les récoltes de l'humanité." },
  ],
  practice: [
    { tier: "warmup", label: "Additionner les exposants", make: (r) => {
      const a = pick(r, [2, 3, 5, 10]); const m = randint(r, 2, 6); const n = randint(r, 2, 6);
      return { prompt: `$${a}^{${m}} \\times ${a}^{${n}} = ${a}^{?}$ : quel exposant ?`, answer: m + n, solution: `$${m} + ${n} = $ **${m + n}** facteurs ${a} en tout.` };
    } },
    { tier: "application", label: "Marier les bases", make: (r) => {
      const n = randint(r, 2, 4); const pair = pick(r, [[2, 5], [4, 25], [5, 20]]);
      return { prompt: `$${pair[0]}^{${n}} \\times ${pair[1]}^{${n}} = ?^{${n}}$ : quelle base ?`, answer: pair[0] * pair[1], solution: `Même exposant : $(${pair[0]} \\times ${pair[1]})^{${n}} = ${pair[0] * pair[1]}^{${n}}$.` };
    } },
    { tier: "challenge", label: "Les zéros du dix", make: (r) => {
      const m = randint(r, 2, 5); const n = randint(r, 2, 5);
      return { prompt: `Combien de zéros dans l'écriture décimale de $10^{${m}} \\times 10^{${n}}$ ?`, answer: m + n, solution: `$10^{${m + n}}$ : un 1 suivi de **${m + n}** zéros — l'exposant compte les zéros.` };
    } },
  ],
};

// — The square root (programme: définition, encadrement, √2 irrationnel) —
const racineCarree = {
  id: "numbers.middle.racine-carree",
  level: "middle", domain: "numbers",
  title: "La racine carrée",
  tagline: "Le carré à l'envers — et √2, le nombre qui a brisé les fractions.",
  prereqs: ["numbers.middle.puissances"],
  intuition:
    "Quel nombre positif, élevé au carré, donne 49 ? La **racine carrée** répond : $\\sqrt{49} = 7$ — la machine qui remonte le carré.\n\nDéfinition : $\\sqrt{a}$ est le nombre **positif** dont le carré vaut $a$ : $\\sqrt{a} \\times \\sqrt{a} = a$. Géométriquement, c'est le **côté** du carré d'aire $a$.",
  depths: {
    discovery:
      "**Avec les mains** : tes carrés parfaits se renversent — $\\sqrt{1} = 1$, $\\sqrt{4} = 2$, $\\sqrt{25} = 5$, $\\sqrt{144} = 12$ : la table des carrés, lue de droite à gauche. Et $\\sqrt{0} = 0$ : le carré d'aire nulle n'a pas de côté.",
    standard:
      "**En image** : entre les carrés parfaits, on **encadre** — $\\sqrt{50}$ ? Les carrés voisins : $49 = 7^2$ et $64 = 8^2$, donc $7 < \\sqrt{50} < 8$ (à peine plus que 7). Toujours la même méthode : coincer $a$ entre deux carrés parfaits consécutifs, les racines suivent — l'ordre de grandeur des racines, sans calculatrice.",
    advanced:
      "**Dans la tête** : $\\sqrt{2}$ — le côté… non : la **diagonale** du carré de côté 1 a pour longueur $\\sqrt{2}$ (son carré construit sur elle a une aire double, les Grecs le voyaient au dessin). Or $\\sqrt{2}$ ne peut pas être décimal : si $\\sqrt{2} = 1{,}414\\ldots$ s'arrêtait, son **chiffre des unités** au carré devrait finir le 2 — mais un nombre fini de décimales, élevé au carré, finit par le carré de son dernier chiffre ($1, 4, 9, 6, 5\\ldots$), jamais par un 0 propre à donner 2,000… exactement. **Absurde** : aucune écriture décimale finie (ni, on le montrera, aucune fraction) ne vaut $\\sqrt{2}$ — un nombre **irrationnel**. La légende dit que sa découverte coûta la vie à un pythagoricien : les nombres avaient débordé les fractions.",
  },
  keyIdea: "$\\sqrt{a}$ : le **positif** dont le carré vaut $a$ ($\\sqrt{a} \\times \\sqrt{a} = a$) — le côté du carré d'aire $a$. Encadrer : coincer $a$ entre deux carrés parfaits consécutifs.",
  why:
    "Pourquoi inventer encore un nombre ? Même réponse qu'aux fractions et aux relatifs : pour qu'une opération se remonte **toujours**. Le carré de 4e exigeait sa marche arrière — et celle-ci, surprise, déborde tous les nombres connus : $\\sqrt{2}$ n'est ni entier, ni décimal, ni fraction. La droite graduée cachait des points inaccessibles aux quotients ; la racine carrée les révèle — et Pythagore l'attend au tournant.",
  examples: [
    { title: "La table renversée", steps: [
      { p: "$\\sqrt{49} = 7$ car $7^2 = 49$ ; $\\sqrt{121} = 11$ car $11^2 = 121$." },
      { p: "Les carrés de 0 à 12, lus à l'envers — la racine remonte le carré." },
    ] },
    { title: "Encadrer √50", steps: [
      { p: "Carrés voisins : $49 = 7^2$ et $64 = 8^2$, et $49 < 50 < 64$." },
      { p: "Donc $7 < \\sqrt{50} < 8$ — à peine plus que 7, sans calculatrice." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne $\\sqrt{25}$, $\\sqrt{81}$, $\\sqrt{144}$, $\\sqrt{0}$ — et explique ce que « racine carrée » remonte.", solution: "**5, 9, 12, 0** — la racine remonte le **carré** : c'est la table des carrés lue de droite à gauche, et le côté du carré dont on connaît l'aire." },
    { tier: "warmup", prompt: "Encadre $\\sqrt{50}$ entre deux entiers consécutifs.", solution: "$49 < 50 < 64$, donc $\\sqrt{49} < \\sqrt{50} < \\sqrt{64}$ : $7 < \\sqrt{50} < 8$ — coincer entre deux carrés parfaits." },
    { tier: "application", prompt: "Encadre $\\sqrt{90}$ puis $\\sqrt{20}$ entre deux entiers consécutifs.", solution: "$81 < 90 < 100$ : $9 < \\sqrt{90} < 10$ ; $16 < 20 < 25$ : $4 < \\sqrt{20} < 5$ — la méthode est toujours la même." },
    { tier: "challenge", prompt: "Un carré a une aire de 2 m². Que vaut son côté, et pourquoi ce nombre est-il « nouveau » ?", solution: "Côté $= \\sqrt{2} \\approx 1{,}414$ m — un nombre qui n'est **ni entier, ni décimal, ni fraction** : irrationnel. L'aire la plus simple après 1 engendre un nombre hors de tous les anciens." },
    { tier: "exam", prompt: "Démontre que $\\sqrt{2}$ n'est pas un nombre décimal, en raisonnant par l'absurde sur le chiffre des unités du carré.", solution: "Supposons $\\sqrt{2}$ décimal : son écriture s'arrête sur un dernier chiffre non nul $c$. Alors son carré se termine par le dernier chiffre de $c^2$ — or $c^2$ finit par $1, 4, 9, 6$ ou $5$ ($c = 1\\ldots9$), jamais de façon à donner **exactement** $2{,}000\\ldots0$ (il faudrait finir par 0, donc $c = 0$ : contradiction avec « dernier chiffre non nul »). **Absurde** : $\\sqrt{2}$ n'est pas décimal — première rencontre avec un irrationnel, par la plus vieille méthode du monde : supposer le contraire et le voir s'effondrer." },
  ],
  practice: [
    { tier: "warmup", label: "La table à l'envers", make: (r) => {
      const n = randint(r, 2, 12);
      return { prompt: `Que vaut $\\sqrt{${n * n}}$ ?`, answer: n, solution: `$${n}^2 = ${n * n}$ → $\\sqrt{${n * n}} = $ **${n}**.` };
    } },
    { tier: "application", label: "Coincer la racine", make: (r) => {
      const n = randint(r, 2, 11); const a = n * n + randint(r, 1, 2 * n);
      return { prompt: `$\\sqrt{${a}}$ est entre deux entiers consécutifs : donne le plus petit.`, answer: n, solution: `$${n * n} < ${a} < ${(n + 1) * (n + 1)}$ → $${n} < \\sqrt{${a}} < ${n + 1}$ : **${n}**.` };
    } },
    { tier: "challenge", label: "Le côté du carré", make: (r) => {
      const c = randint(r, 3, 15);
      return { prompt: `Un carré a une aire de ${c * c} cm². Quel est son côté ?`, answer: c, solution: `Côté $= \\sqrt{${c * c}} = $ **${c} cm** — la racine est l'aire remontée.` };
    } },
  ],
};

export default [puissancesExposants, racineCarree];
