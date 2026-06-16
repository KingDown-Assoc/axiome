// Field "Numbers" — MIDDLE module (6e year), part 1: numbers. Official cycle-3
// programme (2025): the billion (demography, distances in the Universe), the
// fraction as QUOTIENT (a/b is the number whose product by b gives a; a/b can be
// an integer, a decimal, or a non-decimal number), fraction operations
// (simplification via common divisors, comparing/ordering with mixed numbers,
// inventing problems), and the percentage as a fourth writing of a number.
import { randint, pick } from "../../core/exercises.js";

// — The billion (programme: le milliard, démographie, distances dans l'Univers) —
const billion = {
  id: "numbers.middle.billion",
  level: "middle", domain: "numbers",
  title: "Le milliard",
  tagline: "Une quatrième classe de chiffres, les milliards : démographie et distances dans l'espace.",
  prereqs: ["numbers.primary.to-billion"],
  intuition:
    "Au-dessus des millions, une quatrième classe ouvre : les **milliards**. Mille millions font un milliard ($1\\,000\\,000\\,000$) — et la Terre porte environ **8 milliards** d'humains.\n\nLa machine ne change pas : quatre classes de trois chiffres — milliards | millions | mille | unités — et la lecture coule : 8 217 463 905 se lit « huit-milliards-deux-cent-dix-sept-millions-quatre-cent-soixante-trois-mille-neuf-cent-cinq ».",
  depths: {
    discovery:
      "**Avec les mains** : donner corps au milliard — compter jusqu'à mille prend un quart d'heure ; jusqu'au million, des semaines ; jusqu'au **milliard**, toute une vie (environ 32 ans sans dormir). Les classes successives ne grandissent pas : elles **explosent**.",
    standard:
      "**En image** : les grands nombres habitent la démographie et le ciel — France : ~68 millions ; humanité : ~8 milliards ; Terre–Soleil : ~150 millions de km ; et une année-lumière vaut environ 9 461 **milliards** de km. Comparer, décomposer, placer : la valeur positionnelle commande, comme depuis le CP.",
    advanced:
      "**Dans la tête** : nos chiffres « arabes » (nés en Inde, transmis par les savants arabes) ont gagné contre les numérations romaine, grecque, égyptienne pour une raison de machine : MMXXVI ne dit pas la valeur par la **position**, et multiplier en chiffres romains est un calvaire. La numération de position est le logiciel ; les classes de trois, son interface — et ce logiciel monte sans limite : billions, trillions attendent, mais le principe est acquis pour toujours.",
  },
  keyIdea: "$1$ milliard $= 1\\,000$ millions $= 10^9$. Quatre classes — milliards | millions | mille | unités — et la même machine positionnelle.",
  why:
    "Pourquoi introduire le milliard maintenant ? Parce que le monde le réclame : la population mondiale, les budgets d'État, les distances spatiales se chiffrent en milliards. Un citoyen qui lit « 3 000 milliards de dette » sans vertige ni confusion possède un outil de compréhension du monde — c'est exactement l'enjeu.",
  examples: [
    { title: "Lire 8 217 463 905", steps: [
      { p: "Quatre classes : 8 | 217 | 463 | 905." },
      { p: "« Huit-milliards-deux-cent-dix-sept-millions-quatre-cent-soixante-trois-mille-neuf-cent-cinq. »" },
    ] },
    { title: "Combien de millions dans 3 milliards ?", steps: [
      { p: "$1$ milliard $= 1\\,000$ millions." },
      { p: "$3$ milliards $= 3\\,000$ millions — les classes se convertissent comme des unités." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de millions font un milliard ? Écris un milliard en chiffres.", solution: "**Mille millions** : $1\\,000\\,000\\,000$ — un 1 suivi de neuf zéros, la quatrième classe." },
    { tier: "warmup", prompt: "Écris en chiffres : « sept-milliards-quarante-millions ».", solution: "7 | 040 | 000 | 000 → **7 040 000 000** — les zéros tiennent les classes vides." },
    { tier: "application", prompt: "La population mondiale est d'environ 8,2 milliards. Écris ce nombre en chiffres, puis en millions.", solution: "$8\\,200\\,000\\,000$, soit **8 200 millions** — un milliard se monnaye en mille millions." },
    { tier: "challenge", prompt: "Range : 9 460 milliards (km d'une année-lumière) ; 150 millions (km Terre–Soleil) ; 384 400 (km Terre–Lune).", solution: "**384 400 < 150 000 000 < 9 460 000 000 000** — six, neuf, treize chiffres : l'Univers étire la numération." },
    { tier: "exam", prompt: "Pourquoi la numération romaine (MMXXVI…) a-t-elle perdu face à la nôtre ?", solution: "Elle n'est pas **positionnelle** : la valeur d'un signe n'y dépend pas de sa place, il faut des symboles nouveaux pour chaque grandeur, et les calculs posés y sont presque impossibles. Notre système écrit l'infini avec dix chiffres — et calcule avec." },
  ],
  practice: [
    { tier: "warmup", label: "Milliards ↔ millions", make: (r) => {
      const g = randint(r, 2, 9);
      if (r() < 0.5) return { prompt: `Combien de millions font ${g} milliards ?`, answer: 1000 * g, solution: `$${g} \\times 1\\,000 = $ **${1000 * g} millions**.` };
      const m = randint(r, 2, 9) * 1000;
      return { prompt: `Combien de milliards font ${m} millions ?`, answer: m / 1000, solution: `$${m} \\div 1\\,000 = $ **${m / 1000} milliard${m / 1000 > 1 ? "s" : ""}**.` };
    } },
    { tier: "application", label: "La valeur du chiffre", make: (r) => {
      const d = randint(r, 1, 9); const reste = randint(r, 111111111, 999999999);
      return { prompt: `Dans ${d * 1000000000 + reste}, que vaut le chiffre ${d} (au rang des milliards) ?`, answer: d * 1000000000, solution: `${d} au rang des milliards : **${d * 1000000000}**.` };
    } },
  ],
};

// — The fraction as quotient (programme: a/b = a ÷ b, b × (a/b) = a, non-decimal numbers) —
const fractionQuotient = {
  id: "numbers.middle.fraction-quotient",
  level: "middle", domain: "numbers",
  title: "La fraction est un quotient",
  tagline: "La fraction-quotient : 3/4, c'est aussi le quart de trois, et le cas illimité de 1/3.",
  prereqs: ["numbers.primary.fraction-times", "numbers.primary.division-decimal"],
  intuition:
    "Renversement de perspective : $\\frac{3}{4}$ ne dit pas seulement « trois quarts d'une unité » — c'est aussi **le quart de 3** : trois bandes entières, partagées en quatre. Autrement dit : $\\frac{3}{4} = 3 \\div 4$.\n\nLa définition officielle : $\\frac{a}{b}$ est **le nombre** qui, multiplié par $b$, donne $a$ — la réponse exacte à l'égalité à trous $? \\times 4 = 3$.",
  depths: {
    discovery:
      "**Avec les mains** : une ficelle de 3 m à partager en 4 — chacun reçoit $\\frac{3}{4}$ de mètre. Pour les partages rétifs (en 5, en 7), le **guide-âne** : un réseau de droites parallèles équidistantes qui découpe n'importe quelle bande en parts égales, sans calcul.",
    standard:
      "**En image** : la définition se vérifie — $4 \\times \\frac{3}{4} = \\frac{12}{4} = 3$ ✓ : multiplier le quotient par le diviseur **rend** le dividende, toujours. Et la division posée traduit : $3 \\div 4 = 0{,}75$ — donc $\\frac{3}{4} = 0{,}75$, le même nombre sous deux habits. Graduer un segment de 3 en 4 parts, c'est placer $\\frac{3}{4}$, $\\frac{6}{4}$, $\\frac{9}{4}$…",
    advanced:
      "**Dans la tête** : trois destins pour $\\frac{a}{b}$ — un **entier** ($\\frac{8}{4} = 2$), un **décimal** ($\\frac{3}{4} = 0{,}75$)… ou ni l'un ni l'autre : $\\frac{1}{3} = 0{,}333…$ — la division ne s'arrête **jamais** (ton reste 1 éternel du CM2 !). $\\frac{1}{3}$ est un nombre parfaitement exact que l'écriture à virgule ne peut pas finir d'écrire : on l'**arrondit** ($\\approx 0{,}33$) quand on mesure, on le garde en fraction quand on calcule. La fraction n'est pas une écriture de secours — c'est la seule exacte.",
  },
  keyIdea: "$\\frac{a}{b} = a \\div b$ : **le** nombre qui, multiplié par $b$, donne $a$. Il peut être entier, décimal — ou non décimal ($\\frac{1}{3}$).",
  why:
    "Pourquoi inventer un nombre pour chaque division, même celles qui « ne tombent pas juste » ? Parce que le monde partage sans demander la permission : 3 mètres pour 4 personnes existent, donc leur part doit être un nombre. La fraction-quotient garantit que **toute** division a une réponse exacte — quitte à ce que la virgule n'arrive pas à l'écrire.",
  examples: [
    { title: "Vérifier la définition", steps: [
      { p: "$\\frac{3}{4}$ est le nombre qui, multiplié par 4, donne 3." },
      { p: "Test : $4 \\times \\frac{3}{4} = \\frac{12}{4} = 3$ ✓ — et $3 \\div 4 = 0{,}75$ le confirme en décimal." },
    ] },
    { title: "Le destin de 1/3", steps: [
      { p: "$1 \\div 3 = 0{,}333…$ — le reste 1 revient à chaque étage : la division ne finit jamais." },
      { p: "$\\frac{1}{3}$ n'est **pas** un nombre décimal — on l'arrondit ($\\approx 0{,}33$) ou on le garde en fraction." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Complète : $? \\times 4 = 3$. Quel est ce nombre ?", solution: "$\\frac{3}{4}$ — **le** nombre qui, multiplié par 4, donne 3 : c'est sa définition de quotient ($3 \\div 4 = 0{,}75$)." },
    { tier: "warmup", prompt: "Trois mètres de ruban pour quatre personnes : quelle longueur chacune ? Donne la fraction et le décimal.", solution: "$\\frac{3}{4}$ de mètre $= 3 \\div 4 = $ **0,75 m** — le quart de trois." },
    { tier: "application", prompt: "Classe ces quotients : entier, décimal, ou non décimal ? $\\frac{8}{4}$ ; $\\frac{3}{4}$ ; $\\frac{1}{3}$.", solution: "$\\frac{8}{4} = 2$ : **entier** ; $\\frac{3}{4} = 0{,}75$ : **décimal** ; $\\frac{1}{3} = 0{,}333…$ : **non décimal** — la division ne s'arrête jamais." },
    { tier: "challenge", prompt: "Donne la valeur arrondie au centième de $\\frac{1}{3}$ et de $\\frac{2}{7}$.", solution: "$1 \\div 3 = 0{,}333… \\approx $ **0,33** ; $2 \\div 7 = 0{,}2857… \\approx $ **0,29** — l'arrondi habille les nombres que la virgule ne finit pas." },
    { tier: "exam", prompt: "Sans poser de division, calcule $7 \\times \\frac{5}{7}$ et $13 \\times \\frac{4}{13}$. Quelle propriété utilises-tu ?", solution: "**5** et **4** — par définition, $\\frac{a}{b}$ multiplié par $b$ redonne $a$ : le quotient et le diviseur s'annulent, aucune division nécessaire." },
  ],
  practice: [
    { tier: "warmup", label: "La définition en action", make: (r) => {
      const b = randint(r, 3, 13); const a = randint(r, 2, 11);
      return { prompt: `Calcule $${b} \\times \\frac{${a}}{${b}}$ (sans poser).`, answer: a, solution: `Par définition du quotient : $${b} \\times \\frac{${a}}{${b}} = $ **${a}**.` };
    } },
    { tier: "application", label: "La fraction en décimal", make: (r) => {
      const q = pick(r, [[1, 4, 0.25], [3, 4, 0.75], [1, 2, 0.5], [3, 2, 1.5], [5, 4, 1.25], [7, 4, 1.75], [5, 2, 2.5], [1, 5, 0.2], [3, 5, 0.6]]);
      return { prompt: `Écris $\\frac{${q[0]}}{${q[1]}}$ en écriture décimale.`, answer: q[2], solution: `$${q[0]} \\div ${q[1]} = $ **${String(q[2]).replace(".", ",")}**.` };
    } },
  ],
};

// — Fraction operations (programme: simplifier, comparer, ordonner, inventer des problèmes) —
const fractionOps = {
  id: "numbers.middle.fraction-ops",
  level: "middle", domain: "numbers",
  title: "Fractions : simplifier, comparer, opérer",
  tagline: "12/18 = 2/3 : simplifier une fraction par ses diviseurs communs.",
  prereqs: ["numbers.primary.fractions-common", "numbers.middle.fraction-quotient"],
  intuition:
    "Tes diviseurs communs du CM2 trouvent leur destination : **simplifier**. $\\frac{12}{18}$ — 6 divise les deux : $\\frac{12}{18} = \\frac{2}{3}$. Même nombre, habit minimal.\n\nEt l'atelier tourne à plein régime : comparer, encadrer, **ordonner** des listes mêlant fractions et nombres mixtes, additionner, soustraire, multiplier par un entier — toutes les techniques convergent.",
  depths: {
    discovery:
      "**Avec les mains** : la bande pliée en 18, dont on prend 12 parts, se superpose exactement à la bande en 3 dont on prend 2 — simplifier ne change pas la longueur, seulement le **récit du découpage**.",
    standard:
      "**En image** : simplifier = diviser haut et bas par un diviseur **commun** (le plus grand fait le travail d'un coup : $\\frac{12}{18}$ par 6 → $\\frac{2}{3}$). Ordonner une liste mixte — $\\frac{7}{4}$ ; $1{,}5$ ; $1 + \\frac{2}{3}$ — passe par une langue commune (tout en quarts ? tout en décimaux approchés ? tout encadré par des entiers ?) : $1{,}5 < 1 + \\frac{2}{3} < \\frac{7}{4}$.",
    advanced:
      "**Dans la tête** : les automatismes deviennent réflexes — $\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$ ; $1 - \\frac{1}{4} = \\frac{3}{4}$ ; $\\frac{3}{4} - \\frac{1}{2} = \\frac{1}{4}$ : le quatuor 1, $\\frac{1}{4}$, $\\frac{1}{2}$, $\\frac{3}{4}$ se connaît par cœur. Et le sommet de l'art : **inventer** un problème dont la réponse est $\\frac{3}{4}$ — qui sait fabriquer l'énoncé possède la notion deux fois.",
  },
  keyIdea: "Simplifier : diviser numérateur **et** dénominateur par un diviseur commun. Ordonner du mixte : traduire d'abord en langue commune.",
  why:
    "Pourquoi simplifier, si $\\frac{12}{18}$ et $\\frac{2}{3}$ sont le même nombre ? Pour **voir** : $\\frac{2}{3}$ se compare, se place, s'additionne en un regard ; $\\frac{12}{18}$ demande un effort. Simplifier, c'est de la politesse mathématique — envers le lecteur, et envers soi-même dans dix minutes.",
  examples: [
    { title: "Simplifier 12/18", steps: [
      { p: "Diviseurs communs de 12 et 18 : 1, 2, 3, **6** — le plus grand fait tout d'un coup." },
      { p: "$\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$ — même nombre, habit minimal." },
    ] },
    { title: "Ordonner du mixte", steps: [
      { p: "$\\frac{7}{4}$ ; $1{,}5$ ; $1 + \\frac{2}{3}$ — traduisons : $1{,}75$ ; $1{,}5$ ; $\\approx 1{,}67$." },
      { p: "$1{,}5 < 1 + \\frac{2}{3} < \\frac{7}{4}$ — la langue commune tranche." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Simplifie $\\frac{12}{18}$ au maximum. Quel diviseur commun utilises-tu ?", solution: "Le plus grand diviseur commun, **6** : $\\frac{12}{18} = \\frac{2}{3}$ — un seul geste suffit." },
    { tier: "warmup", prompt: "Calcule de tête : $\\frac{1}{2} + \\frac{1}{4}$ ; $1 - \\frac{1}{4}$ ; $\\frac{3}{4} - \\frac{1}{2}$.", solution: "$\\frac{3}{4}$ ; $\\frac{3}{4}$ ; $\\frac{1}{4}$ — le quatuor des quarts, à connaître comme les tables." },
    { tier: "application", prompt: "Simplifie $\\frac{15}{20}$ puis $\\frac{14}{21}$.", solution: "$\\frac{15}{20} = \\frac{3}{4}$ (par 5) ; $\\frac{14}{21} = \\frac{2}{3}$ (par 7) — les diviseurs communs taillent l'habit." },
    { tier: "challenge", prompt: "Ordonne : $\\frac{7}{4}$ ; $1{,}5$ ; $1 + \\frac{2}{3}$.", solution: "En décimaux : $1{,}75$ ; $1{,}5$ ; $\\approx 1{,}67$ → $1{,}5 < 1 + \\frac{2}{3} < \\frac{7}{4}$ — traduire avant de ranger." },
    { tier: "exam", prompt: "Invente un problème concret dont la réponse est $\\frac{3}{4}$ de litre, puis rédige sa solution.", solution: "Par exemple : « Une carafe d'un litre est pleine ; on en verse un quart dans un verre. Que reste-t-il ? » — $1 - \\frac{1}{4} = \\frac{3}{4}$ **de litre**. Inventer l'énoncé prouve qu'on possède la notion dans les deux sens." },
  ],
  practice: [
    { tier: "application", label: "Tailler à l'os", make: (r) => {
      const base = pick(r, [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6]]); const k = pick(r, [2, 3, 4, 5, 6]);
      return { prompt: `Simplifie $\\frac{${base[0] * k}}{${base[1] * k}}$ au maximum. Réponds par le numérateur final.`, answer: base[0], solution: `Diviseur commun ${k} : $\\frac{${base[0] * k}}{${base[1] * k}} = \\frac{${base[0]}}{${base[1]}}$ → numérateur **${base[0]}**.` };
    } },
    { tier: "challenge", label: "Le quatuor des quarts", make: (r) => {
      const q = pick(r, [
        ["\\frac{1}{2} + \\frac{1}{4}", 0.75, "\\frac{3}{4}"],
        ["1 - \\frac{1}{4}", 0.75, "\\frac{3}{4}"],
        ["\\frac{3}{4} - \\frac{1}{2}", 0.25, "\\frac{1}{4}"],
        ["\\frac{1}{4} + \\frac{1}{4}", 0.5, "\\frac{1}{2}"],
        ["\\frac{3}{4} + \\frac{1}{4}", 1, "1"],
        ["1 - \\frac{1}{2}", 0.5, "\\frac{1}{2}"],
      ]);
      return { prompt: `Calcule de tête $${q[0]}$ (réponds en écriture décimale).`, answer: q[1], solution: `$${q[0]} = ${q[2]}$ — soit **${String(q[1]).replace(".", ",")}**.` };
    } },
  ],
};

// — Percentages (programme: définition, proportion partie/tout, appliquer un pourcentage) —
const percent = {
  id: "numbers.middle.percent",
  level: "middle", domain: "numbers",
  title: "Les pourcentages",
  tagline: "25 % = 25/100 = 0,25 = un quart — la quatrième écriture du nombre.",
  prereqs: ["numbers.middle.fraction-quotient"],
  intuition:
    "Un **pourcentage** n'est rien d'autre qu'une fraction de dénominateur 100 : $25\\,\\% = \\frac{25}{100}$. Le symbole % se lit « pour cent » — sur cent.\n\nUn même nombre porte désormais **quatre habits** : $\\frac{1}{4} = \\frac{25}{100} = 0{,}25 = 25\\,\\%$ — fraction, fraction décimale, virgule, pourcentage. Quatre écritures, un nombre.",
  depths: {
    discovery:
      "**Avec les mains** : la grille de 100 carreaux — colorie 25 carreaux : c'est 25 %, c'est le quart de la grille, c'est 0,25 de la grille. Les quatre écritures se touchent sur le même dessin.",
    standard:
      "**En image** : deux gestes inverses. **Exprimer** une proportion : 18 réussites sur 24 tirs — $\\frac{18}{24} = \\frac{3}{4} = 75\\,\\%$ (simplifier, puis traduire en centièmes). **Appliquer** un pourcentage : $25\\,\\%$ de 80 € — le quart de 80 : **20 €** ; $10\\,\\%$ de 350 — le dixième : **35** (les pourcentages-fractions usuels se calculent en un geste : 50 % = la moitié, 25 % = le quart, 10 % = le dixième).",
    advanced:
      "**Dans la tête** : le pourcentage est la fraction-**opérateur** du cours moyen, en habit de ville — « 25 % de 80 » = $\\frac{25}{100} \\times 80$ : la fraction agit sur un nombre. Pourquoi le monde l'adore-t-il ? Parce que **tout sur 100** rend tout comparable : 75 % de réussite au basket contre 80 % au hand se comparent d'un regard, là où 18 sur 24 contre 20 sur 25 demandaient un calcul. Le pourcentage est l'espéranto des proportions.",
  },
  keyIdea: "$p\\,\\% = \\frac{p}{100}$. Exprimer : partie/tout → centièmes. Appliquer : $p\\,\\%$ de $N$ = $\\frac{p}{100} \\times N$ — et les usuels (50, 25, 10 %) en un geste.",
  why:
    "Pourquoi 100, et pas 10 ou 1 000 ? Le compromis du juste milieu : assez fin pour distinguer (73 % et 74 % diffèrent), assez gros pour rester en entiers la plupart du temps. Né chez les marchands de la Renaissance (impôts et intérêts « pour cento »), le centième est devenu la langue mondiale de la proportion.",
  examples: [
    { title: "Exprimer : 18 sur 24", steps: [
      { p: "$\\frac{18}{24} = \\frac{3}{4}$ (simplifier par 6)." },
      { p: "$\\frac{3}{4} = \\frac{75}{100} = $ **75 %** — la proportion en langue universelle." },
    ] },
    { title: "Appliquer : 25 % de 80 €", steps: [
      { p: "$25\\,\\% = \\frac{25}{100} = \\frac{1}{4}$ — le quart." },
      { p: "$80 \\div 4 = $ **20 €** — l'opérateur du cours moyen, en habit de pourcentage." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie le symbole % ? Écris 25 % en fraction puis en écriture décimale.", solution: "« **Pour cent** » — sur cent : $25\\,\\% = \\frac{25}{100} = \\frac{1}{4} = $ **0,25**. Quatre habits, un nombre." },
    { tier: "warmup", prompt: "Calcule 50 % de 64, puis 10 % de 350.", solution: "La moitié : **32** ; le dixième : **35** — les pourcentages usuels sont des fractions déguisées." },
    { tier: "application", prompt: "Au basket, Lina a réussi 18 tirs sur 24. Exprime sa réussite en pourcentage.", solution: "$\\frac{18}{24} = \\frac{3}{4} = $ **75 %** — simplifier, puis traduire en centièmes." },
    { tier: "challenge", prompt: "Compare : 18 réussites sur 24, ou 20 sur 25 — qui est le plus adroit ?", solution: "$\\frac{18}{24} = 75\\,\\%$ ; $\\frac{20}{25} = \\frac{80}{100} = 80\\,\\%$ : **20 sur 25 l'emporte** — tout sur cent, tout comparable." },
    { tier: "exam", prompt: "Un manteau à 80 € est soldé à −25 %. Calcule la remise puis le nouveau prix, et vérifie par une autre écriture.", solution: "Remise : $25\\,\\%$ de 80 = **20 €** ; prix : $80 - 20 = $ **60 €**. Vérification : payer $75\\,\\%$ de 80 = $\\frac{3}{4} \\times 80 = 60$ ✓ — deux chemins, un prix." },
  ],
  practice: [
    { tier: "warmup", label: "Les usuels en un geste", make: (r) => {
      const q = pick(r, [[50, 2, "la moitié"], [25, 4, "le quart"], [10, 10, "le dixième"]]);
      const N = q[1] * randint(r, 6, 30);
      return { prompt: `Calcule ${q[0]} % de ${N}.`, answer: N / q[1], solution: `${q[0]} % = ${q[2]} : $${N} \\div ${q[1]} = $ **${N / q[1]}**.` };
    } },
    { tier: "application", label: "Exprimer la proportion", make: (r) => {
      const base = pick(r, [[3, 4, 75], [1, 4, 25], [1, 2, 50], [1, 5, 20], [2, 5, 40], [4, 5, 80], [1, 10, 10], [7, 10, 70]]);
      const k = randint(r, 2, 8);
      return { prompt: `${base[0] * k} réussites sur ${base[1] * k} essais : quel pourcentage ?`, answer: base[2], solution: `$\\frac{${base[0] * k}}{${base[1] * k}} = \\frac{${base[0]}}{${base[1]}} = $ **${base[2]} %**.` };
    } },
  ],
};

export default [billion, fractionQuotient, fractionOps, percent];
