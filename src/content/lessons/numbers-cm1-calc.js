// Field "Numbers" — PRIMARY module (CM1 year), part 2: calculation. Official cycle-3
// programme (2025): mental calculation extended to decimals (×10, ÷10, ×5, decimal
// writings of usual fractions), the euclidean division algorithm (1-digit divisor),
// parentheses and estimation, column operations on decimals, and problem structures
// (word traps, plausibility checks, counting and optimization problems).
import { randint, pick } from "../../core/exercises.js";

// — Mental calculation with decimals (programme: ×10/÷10 d'un décimal, ×5, faits décimaux) —
const mentalDecimals = {
  id: "numbers.primary.mental-decimals",
  level: "primary", domain: "numbers",
  title: "Calcul mental : la virgule s'invite",
  tagline: "×10, ÷10 sur les décimaux, ×5 en deux gestes — et 1/2 = 0,5 par cœur.",
  prereqs: ["numbers.primary.mental-10000", "numbers.primary.decimals"],
  intuition:
    "Tes procédures s'étendent aux décimaux. Multiplier $3{,}5$ par 10 ? Chaque chiffre **monte d'un rang** : les dixièmes deviennent des unités → $35$. Diviser par 10 : chaque chiffre descend → $0{,}35$.\n\nAttention à la légende : ce n'est pas « la virgule qui se déplace » — la virgule reste la frontière des unités ; ce sont les **chiffres** qui changent de rang.",
  depths: {
    discovery:
      "**Avec les mains** : sur le glisse-nombres, $3{,}5 \\times 10$ — le 3 glisse des unités aux dizaines, le 5 des dixièmes aux unités : 35. Le geste est celui du cycle 2, prolongé sous la virgule.",
    standard:
      "**En image** : sans retenue, les décimaux s'ajoutent rang par rang — $2{,}34 + 3$ centièmes $= 2{,}37$ ; $2{,}34 + 2$ dixièmes $= 2{,}54$. Et la perle nouvelle : **×5 = ×10 puis moitié** — $36 \\times 5$ : $360 \\div 2 = 180$. Deux gestes faciles remplacent un calcul pénible.",
    advanced:
      "**Dans la tête** : quelques traductions s'apprennent **par cœur** — $\\frac{1}{2} = 0{,}5$ ; $\\frac{1}{4} = 0{,}25$ ; $\\frac{3}{4} = 0{,}75$ ; $\\frac{1}{5} = 0{,}2$ ; $\\frac{1}{10} = 0{,}1$. Et les produits à zéros se pensent en unités de numération : $7 \\times 300 = 21$ centaines $= 2\\,100$ ; $\\times 1\\,000$ fait grimper de trois rangs. La numération calcule pour toi.",
  },
  keyIdea: "$\\times 10$ : chaque chiffre **monte d'un rang** (÷10 : il descend) — la virgule, elle, ne bouge pas. Et $\\times 5 = \\times 10$ puis moitié.",
  why:
    "Pourquoi refuser le slogan « la virgule se déplace » ? Parce qu'il marche sans comprendre — et lâche dès qu'on comprend mal. « Les chiffres changent de rang » dit la **vraie** raison : ×10 rend chaque chiffre dix fois plus précieux. Une image juste vaut mieux qu'un truc fragile.",
  examples: [
    { title: "3,5 × 10 et 3,5 ÷ 10", steps: [
      { p: "×10 : le 3 monte aux dizaines, le 5 aux unités → **35**." },
      { p: "÷10 : le 3 descend aux dixièmes, le 5 aux centièmes → **0,35**." },
    ] },
    { title: "36 × 5 en deux gestes", steps: [
      { p: "$36 \\times 10 = 360$." },
      { p: "La moitié : $360 \\div 2 = $ **180**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $3{,}5 \\times 10 = 35$, qu'est-il arrivé au chiffre 5 ?", solution: "Il est **monté d'un rang** : des dixièmes aux unités. (La virgule, elle, n'a pas bougé — c'est la frontière.)" },
    { tier: "warmup", prompt: "Calcule $2{,}34 + \\frac{2}{10}$ puis $42{,}7 \\div 10$.", solution: "$2{,}34 + 0{,}2 = $ **2,54** (rang des dixièmes) ; $42{,}7 \\div 10 = $ **4,27** (chaque chiffre descend)." },
    { tier: "application", prompt: "Calcule $36 \\times 5$ puis $48 \\times 5$ avec la procédure du ×5.", solution: "$360 \\div 2 = $ **180** ; $480 \\div 2 = $ **240** — ×10 puis moitié." },
    { tier: "challenge", prompt: "Donne l'écriture décimale de $\\frac{1}{2}$, $\\frac{1}{4}$, $\\frac{3}{4}$ et $\\frac{1}{5}$.", solution: "**0,5 — 0,25 — 0,75 — 0,2** : des faits à restituer d'un coup, comme les tables." },
    { tier: "exam", prompt: "Calcule $7 \\times 300$ puis $24 \\times 1\\,000$ en raisonnant en unités de numération.", solution: "$7 \\times 3$ centaines $= 21$ centaines $= $ **2 100** ; $24 \\times 1\\,000$ : trois rangs plus haut → **24 000**." },
  ],
  practice: [
    { tier: "warmup", label: "×10 et ÷10 d'un décimal", make: (r) => {
      const e = randint(r, 1, 9), d = randint(r, 1, 9); const x = e + d / 10;
      if (r() < 0.5) return { prompt: `Calcule $${e}{,}${d} \\times 10$.`, answer: 10 * x, solution: `Chaque chiffre monte d'un rang : **${10 * x}**.` };
      return { prompt: `Calcule $${e}${d} \\div 10$.`, answer: (10 * e + d) / 10, solution: `Chaque chiffre descend d'un rang : **${e},${d}**.` };
    } },
    { tier: "application", label: "×5 en deux gestes", make: (r) => {
      const n = randint(r, 12, 96) * 2; // pair pour une moitié entière confortable
      return { prompt: `Calcule $${n} \\times 5$ (×10 puis moitié).`, answer: 5 * n, solution: `$${n} \\times 10 = ${10 * n}$, moitié : **${5 * n}**.` };
    } },
    { tier: "challenge", label: "Produits à zéros", make: (r) => {
      const a = randint(r, 3, 9); const p = pick(r, [[10, "dizaines"], [100, "centaines"]]); const k = randint(r, 2, 9);
      return { prompt: `Calcule $${a} \\times ${k * p[0]}$.`, answer: a * k * p[0], solution: `$${a} \\times ${k}$ ${p[1]} $= ${a * k}$ ${p[1]} $= $ **${a * k * p[0]}**.` };
    } },
  ],
};

// — The euclidean division algorithm (programme: diviseur à un chiffre, quotient et reste) —
const divisionColumn = {
  id: "numbers.primary.division-column",
  level: "primary", domain: "numbers",
  title: "La division posée",
  tagline: "La division posée : potence, quotient, reste, et la preuve par la multiplication.",
  prereqs: ["numbers.primary.division", "numbers.primary.multiply-column"],
  intuition:
    "Le signe ÷ du CE2 gagne sa technique : la **division posée** (la « potence »). On partage 845 en 7 : combien de fois 7 dans 8 ? Une fois, **reste** 1 — qui s'accroche au chiffre suivant : 14, puis 25…\n\nQuatre mots officiels : le **dividende** (845) divisé par le **diviseur** (7) donne le **quotient** (120) et le **reste** (5). Et le reste obéit à une loi de fer : il est toujours **plus petit que le diviseur**.",
  depths: {
    discovery:
      "**Avec les mains** : 845 en matériel — 8 centaines partagées en 7 : une centaine chacun, il en reste une, qu'on **casse** en dix dizaines (14 dizaines en tout)… La potence n'est que ce partage étage par étage, écrit proprement.",
    standard:
      "**En image** : $845 \\div 7$ — au rang des centaines : $7 \\times 1 = 7$, reste 1 ; j'abaisse le 4 → 14 dizaines : $7 \\times 2 = 14$, reste 0 ; j'abaisse le 5 → 5 unités : $7 \\times 0 = 0$, reste 5. Quotient **120**, reste **5**. Le diviseur reste à un chiffre au CM1.",
    advanced:
      "**Dans la tête** : la **vérification** scelle tout — $7 \\times 120 + 5 = 840 + 5 = 845$ ✓. Cette égalité (quotient × diviseur + reste = dividende) est la carte d'identité de la division euclidienne : si elle ne tombe pas juste, ou si le reste atteint le diviseur, c'est qu'une étape a fauté. La division se corrige elle-même.",
  },
  keyIdea: "**Dividende = diviseur × quotient + reste**, avec reste < diviseur — la vérification est dans la définition.",
  why:
    "Pourquoi un reste, plutôt que de « finir » la division ? Parce que le monde entier ne se partage pas toujours juste : 845 bonbons pour 7 enfants, c'est 120 chacun **et 5 bonbons sur la table**. Le reste n'est pas un échec — c'est une information. (Les décimaux apprendront plus tard à le grignoter.)",
  examples: [
    { title: "845 ÷ 7, posé", steps: [
      { p: "Centaines : 8 ÷ 7 → 1, reste 1. J'abaisse le 4 : quatorze dizaines." },
      { p: "Dizaines : 14 ÷ 7 → 2, reste 0. J'abaisse le 5 : cinq unités." },
      { p: "Unités : 5 ÷ 7 → 0, reste 5. Quotient **120**, reste **5**." },
    ] },
    { title: "La vérification", steps: [
      { p: "$7 \\times 120 = 840$, puis $840 + 5 = 845$ ✓." },
      { p: "Et $5 < 7$ ✓ : la loi du reste est respectée." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $845 \\div 7$, comment s'appellent 845, 7, le résultat et ce qui reste ?", solution: "845 est le **dividende**, 7 le **diviseur**, le résultat le **quotient**, et ce qui reste… le **reste**." },
    { tier: "warmup", prompt: "Pose et calcule $96 \\div 4$.", solution: "$9 \\div 4 \\to 2$ reste 1 ; j'abaisse : $16 \\div 4 \\to 4$ reste 0. Quotient **24**, reste **0**." },
    { tier: "application", prompt: "Pose et calcule $845 \\div 7$. Vérifie.", solution: "Quotient **120**, reste **5** — et $7 \\times 120 + 5 = 845$ ✓." },
    { tier: "challenge", prompt: "Une division par 6 peut-elle avoir 7 pour reste ? Pourquoi ?", solution: "**Non** : si 7 restaient, on pourrait encore servir une part de 6. Le reste est toujours **strictement plus petit** que le diviseur." },
    { tier: "exam", prompt: "On partage 1 000 € entre 8 personnes (parts entières en euros). Combien chacun, et que reste-t-il ? Vérifie.", solution: "$1\\,000 \\div 8 = 125$, reste $0$ : **125 € chacun**, rien sur la table — $8 \\times 125 = 1\\,000$ ✓." },
  ],
  practice: [
    { tier: "application", label: "Quotient cherché", make: (r) => {
      const d = randint(r, 3, 9), q = randint(r, 13, 130), rr = randint(r, 0, d - 1);
      const N = d * q + rr;
      return { prompt: `Pose et calcule $${N} \\div ${d}$. Réponds par le quotient.`, answer: q, solution: `Quotient **${q}**, reste ${rr} — vérification : $${d} \\times ${q} + ${rr} = ${N}$ ✓.` };
    } },
    { tier: "challenge", label: "Le reste sous contrôle", make: (r) => {
      const d = randint(r, 4, 9), q = randint(r, 15, 110), rr = randint(r, 1, d - 1);
      const N = d * q + rr;
      return { prompt: `Quel est le reste de $${N} \\div ${d}$ ?`, answer: rr, solution: `$${d} \\times ${q} = ${d * q}$, et $${N} - ${d * q} = $ **${rr}** $< ${d}$ ✓.` };
    } },
  ],
};

// — Parentheses, estimation and decimal column operations (programme: les quatre opérations CM1) —
const parentheses = {
  id: "numbers.primary.parentheses",
  level: "primary", domain: "numbers",
  title: "Parenthèses, estimations, posées décimales",
  tagline: "Calculer d'abord ce qui est entre parenthèses — et flairer le résultat avant de poser.",
  prereqs: ["numbers.primary.multiply-column", "applied.primary.money-decimal"],
  intuition:
    "Trois outils de l'artisan calculateur. Les **parenthèses** : ce qu'elles enferment se calcule **d'abord** — $(3 + 5) \\times 4 = 8 \\times 4 = 32$.\n\nL'**estimation** : avant de poser $4\\,987 + 3\\,014$, flaire l'ordre de grandeur — $5\\,000 + 3\\,000 = 8\\,000$. Et les **posées** s'étendent : additions et soustractions de décimaux (la virgule sous la virgule, comme la monnaie !), multiplication d'un décimal par un entier.",
  depths: {
    discovery:
      "**Avec les mains** : $(3 + 5) \\times 4$ avec des jetons — d'abord réunir 3 et 5 (huit jetons), puis quatre fois ce tas : 32. Les parenthèses racontent l'ordre des gestes.",
    standard:
      "**En image** : $3{,}25 \\times 4$, posé — je calcule $325 \\times 4 = 1\\,300$… en **centièmes** (car 3,25 = 325 centièmes) : $1\\,300$ centièmes $= $ **13**. La virgule revient à la fin, guidée par les rangs. Pour ± : virgule sous virgule, exactement comme les euros — la technique de la monnaie était la générale en répétition.",
    advanced:
      "**Dans la tête** : l'estimation est un **garde-fou** — si la posée de $4\\,987 + 3\\,014$ affiche 79 901, l'ordre de grandeur (≈ 8 000) crie à l'erreur avant toute vérification. Estimer d'abord, calculer ensuite, comparer enfin : la routine des calculateurs sûrs. (Pour les durées et les angles, l'estimation s'appelle vraisemblance — même réflexe.)",
  },
  keyIdea: "Parenthèses **d'abord**. Estimer **avant** de poser : l'ordre de grandeur attrape les grosses erreurs gratuitement.",
  why:
    "Pourquoi des parenthèses, alors qu'on pourrait écrire les calculs dans l'ordre ? Parce qu'une expression écrite doit se lire **sans ambiguïté** par tout le monde : $(3+5) \\times 4$ et $3 + (5 \\times 4)$ racontent deux histoires différentes — 32 et 23. Les parenthèses sont la ponctuation des mathématiques.",
  examples: [
    { title: "(3 + 5) × 4", steps: [
      { p: "Parenthèses d'abord : $3 + 5 = 8$." },
      { p: "Puis $8 \\times 4 = $ **32**." },
    ] },
    { title: "3,25 × 4 par les centièmes", steps: [
      { p: "$3{,}25 = 325$ centièmes ; $325 \\times 4 = 1\\,300$ centièmes." },
      { p: "$1\\,300$ centièmes $= $ **13** — la virgule revient par les rangs." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que dit une parenthèse dans un calcul ?", solution: "« **Moi d'abord** » : ce qu'elle enferme se calcule avant le reste." },
    { tier: "warmup", prompt: "Calcule $(3 + 5) \\times 4$, puis $3 + (5 \\times 4)$.", solution: "$8 \\times 4 = $ **32** ; $3 + 20 = $ **23** — les parenthèses changent l'histoire." },
    { tier: "application", prompt: "Estime $4\\,987 + 3\\,014$ avant de poser, puis pose.", solution: "Estimation : $5\\,000 + 3\\,000 = 8\\,000$. Posée : **8 001** — l'estimation valide." },
    { tier: "challenge", prompt: "Pose et calcule $3{,}25 \\times 4$.", solution: "$325 \\times 4 = 1\\,300$ centièmes $= $ **13** — penser en centièmes place la virgule sans hésiter." },
    { tier: "exam", prompt: "Lina pose $12{,}6 + 7{,}85$ et trouve 91,1. Sans poser, montre qu'elle s'est trompée, puis corrige.", solution: "Estimation : $13 + 8 = 21$ — un résultat à deux chiffres avant la virgule est impossible ici (elle a mal aligné). Correct : virgule sous virgule, $12{,}60 + 7{,}85 = $ **20,45**." },
  ],
  practice: [
    { tier: "warmup", label: "Parenthèses d'abord", make: (r) => {
      const a = randint(r, 2, 9), b = randint(r, 2, 9), c = randint(r, 3, 9);
      if (r() < 0.5) return { prompt: `Calcule $(${a} + ${b}) \\times ${c}$.`, answer: (a + b) * c, solution: `$${a + b} \\times ${c} = $ **${(a + b) * c}**.` };
      return { prompt: `Calcule $${a} + (${b} \\times ${c})$.`, answer: a + b * c, solution: `Parenthèses d'abord : $${b * c}$, puis $+ ${a}$ : **${a + b * c}**.` };
    } },
    { tier: "application", label: "Estimer l'ordre de grandeur", make: (r) => {
      const a = randint(r, 2, 8) * 1000 + randint(r, -60, 60), b = randint(r, 1, 6) * 1000 + randint(r, -60, 60);
      const est = Math.round(a / 1000) * 1000 + Math.round(b / 1000) * 1000;
      return { prompt: `Estime $${a} + ${b}$ en arrondissant aux milliers.`, answer: est, solution: `$${Math.round(a / 1000) * 1000} + ${Math.round(b / 1000) * 1000} = $ **${est}** — le garde-fou avant la posée (résultat exact : ${a + b}).` };
    } },
  ],
};

// — Problem solving (programme: mots-pièges, vraisemblance, dénombrement, optimisation) —
const problemsSense = {
  id: "numbers.primary.problems-sense",
  level: "primary", domain: "numbers",
  title: "Problèmes : pièges de mots et bon sens",
  tagline: "« Plus » ne veut pas toujours dire additionner, et repérer un résultat invraisemblable.",
  prereqs: ["numbers.primary.problems-10000", "numbers.primary.decimals"],
  intuition:
    "Un mot ne commande pas une opération. « Léo a 53 billes, c'est 8 de **plus** que Zoé » — combien a Zoé ? Le mot « plus » est là… et c'est une **soustraction** : $53 - 8 = 45$. Lire l'**histoire**, jamais les mots-déclencheurs.\n\nEt à la fin, le **bon sens** inspecte : « 4,5 m pour une voiture ? » plausible. « 800 km entre Paris et New York ? » impossible — c'est presque 6 000 km.",
  depths: {
    discovery:
      "**Avec les mains** : toujours dix problèmes par semaine, dont des éclairs à l'ardoise. Et pour chaque réponse, la double question : « Est-ce possible ? Est-ce vraisemblable ? »",
    standard:
      "**En image** : le schéma en barres déjoue les mots-pièges — Léo (53) a la barre **longue**, Zoé la courte : la différence 8 se voit, et l'opération se lit sur le dessin, pas dans l'énoncé. Les étapes s'enchaînent jusqu'à trois, décimaux compris : des courses à 12,45 € et 7,80 € payées avec 30 €…",
    advanced:
      "**Dans la tête** : deux familles nouvelles. Le **dénombrement** : 3 tee-shirts et 4 shorts — combien de tenues ? $3 \\times 4 = 12$ (chaque tee-shirt s'associe à chaque short). L'**optimisation** : payer 87 € avec **le moins de billets et de pièces possible** — on sert d'abord les plus gros (50, 20, 10, 5, 2) : 5 coupures. Chercher *le meilleur*, pas seulement *un* résultat : voilà l'optimisation.",
  },
  keyIdea: "Le **schéma** décide de l'opération, jamais le mot. Et toute réponse passe au tribunal de la **vraisemblance**.",
  why:
    "Pourquoi les énoncés tendent-ils des pièges de mots ? Ils n'en tendent pas — c'est la vraie vie qui parle ainsi : « j'ai 8 ans de plus que toi » se dit dans les deux sens. Automatiser « plus → addition », c'est résoudre des mots ; comprendre l'histoire, c'est résoudre des **problèmes**.",
  examples: [
    { title: "Le piège du mot « plus »", steps: [
      { p: "Léo a 53 billes, c'est 8 de plus que Zoé. La barre de Léo est la longue." },
      { p: "Zoé : $53 - 8 = $ **45 billes** — « plus » dans l'énoncé, soustraction dans le calcul." },
    ] },
    { title: "Le tribunal de la vraisemblance", steps: [
      { p: "« La voiture mesure 4,5 m » : plausible ✓ (une citadine fait ~4 m)." },
      { p: "« Paris–New York : 800 km » : rejeté ✗ — l'Atlantique seul en fait des milliers." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi ne faut-il pas traduire « plus » par « addition » automatiquement ?", solution: "Parce que « 8 de plus que Zoé » peut décrire **Léo** : pour trouver Zoé, on **soustrait**. C'est l'histoire qui choisit l'opération — le schéma la révèle." },
    { tier: "warmup", prompt: "Léo a 53 billes, c'est 8 de plus que Zoé. Combien Zoé en a-t-elle ?", solution: "$53 - 8 = $ **45 billes** — la barre courte de Zoé l'exigeait." },
    { tier: "application", prompt: "Course : 12,45 € et 7,80 €, payés avec 30 €. Combien rend-on ? Vérifie la vraisemblance.", solution: "$12{,}45 + 7{,}80 = 20{,}25$ ; $30 - 20{,}25 = $ **9,75 €** — moins que 30 € et positif : plausible ✓." },
    { tier: "challenge", prompt: "3 tee-shirts et 4 shorts : combien de tenues différentes ?", solution: "$3 \\times 4 = $ **12 tenues** — chaque tee-shirt s'associe à chacun des 4 shorts : un dénombrement." },
    { tier: "exam", prompt: "Paie 87 € avec le moins de billets et pièces possible (50, 20, 10, 5, 2, 1).", solution: "$50 + 20 + 10 + 5 + 2 = 87$ : **5 coupures** — servir les plus grosses d'abord. Chercher le *minimum*, c'est de l'optimisation." },
  ],
  practice: [
    { tier: "application", label: "Le mot-piège", make: (r) => {
      const z = randint(r, 25, 90), d = randint(r, 6, 19); const s = z + d;
      return { prompt: `Aya a ${s} images, c'est ${d} de plus que Noé. Combien Noé en a-t-il ?`, answer: z, solution: `« De plus » décrit Aya (barre longue) : $${s} - ${d} = $ **${z}** pour Noé.` };
    } },
    { tier: "challenge", label: "Compter les combinaisons", make: (r) => {
      const a = randint(r, 2, 5), b = randint(r, 3, 6);
      return { prompt: `Un menu propose ${a} plats et ${b} desserts. Combien de menus différents (un plat + un dessert) ?`, answer: a * b, solution: `Chaque plat s'associe à chacun des ${b} desserts : $${a} \\times ${b} = $ **${a * b}** menus.` };
    } },
  ],
};

export default [mentalDecimals, divisionColumn, parentheses, problemsSense];
