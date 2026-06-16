// Field "Numbers" — PRIMARY module (CM1 year), part 1: numbers. Official cycle-3
// programme (2025): integers to 999 999, multiples/divisors (criteria for 2, 5, 10),
// fractions beyond 1 (integer + fraction, framing, number status), the unit fraction
// as operator, decimal fractions, and decimals as a coding of canonical decompositions.
// Crossed with Singapore P4 (mixed numbers ↔ improper fractions, fraction of a set).
import { randint, pick } from "../../core/exercises.js";

// — Numbers to 999 999 (programme: dizaines et centaines de milliers) —
const toMillion = {
  id: "numbers.primary.to-999999",
  level: "primary", domain: "numbers",
  title: "Les nombres jusqu'à 999 999",
  tagline: "Deux rangs nouveaux — et la classe des mille au complet.",
  prereqs: ["numbers.primary.to-10000"],
  intuition:
    "Deux étages s'ajoutent à la tour : les **dizaines de milliers** et les **centaines de milliers**. Les nombres montent à six chiffres : 425 367.\n\nPour les lire, un secret d'organisation : les chiffres se groupent **par trois** — la classe des mille (425), la classe des unités simples (367). « Quatre-cent-vingt-cinq-mille-trois-cent-soixante-sept » : on lit la classe des mille comme un nombre ordinaire, puis on dit « mille ».",
  depths: {
    discovery:
      "**Avec les mains** : le matériel continue de raconter l'histoire — le gros cube de mille s'empile à son tour : dix cubes de mille font une plaque de dix-mille… Le même échange, deux étages plus haut.",
    standard:
      "**En image** : l'espace entre les classes (425 367) rend la lecture instantanée. Comparer suit la règle de toujours, depuis le rang le plus haut : 425 367 < 431 002 (les dizaines de milliers tranchent : 2 < 3). La demi-droite se gradue de mille en mille, de dix-mille en dix-mille.",
    advanced:
      "**Dans la tête** : la valeur d'un chiffre se lit à sa position — dans 425 367, le 2 vaut **20 000**. Et les décompositions suivent : $425\\,367 = (4 \\times 100\\,000) + (2 \\times 10\\,000) + (5 \\times 1\\,000) + 367$. Six chiffres, mais zéro idée nouvelle : la numération est la même machine, simplement plus haute.",
  },
  keyIdea: "Les chiffres se groupent **par trois** : classe des mille, classe des unités. On compare depuis le rang le plus haut.",
  why:
    "Pourquoi grouper par trois et pas par quatre ? Pure convention — mais une convention puissante : il suffit de savoir lire les nombres jusqu'à 999 pour lire **n'importe quoi** : 425 (mille) 367. Demain, les millions et les milliards se liront avec le même truc. Apprendre une fois, lire pour toujours.",
  widgets: [
    { kind: "odometer", params: { value: 425367 }, caption: "Six roues : centaines de milliers, dizaines de milliers, milliers — puis centaines, dizaines, unités." },
  ],
  examples: [
    { title: "Lire 425 367", steps: [
      { p: "Classe des mille : 425 → « quatre-cent-vingt-cinq-mille »." },
      { p: "Classe des unités : 367 → « trois-cent-soixante-sept »." },
    ] },
    { title: "Comparer 425 367 et 431 002", steps: [
      { p: "Centaines de milliers : 4 = 4. Dizaines de milliers : $2 < 3$." },
      { p: "Donc $425\\,367 < 431\\,002$ — inutile de regarder plus loin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment s'appellent les deux nouveaux rangs du CM1 ?", solution: "Les **dizaines de milliers** et les **centaines de milliers** — la classe des mille au complet." },
    { tier: "warmup", prompt: "Écris en chiffres : « trois-cent-six-mille-cinquante ».", solution: "Classe des mille : 306 ; classe des unités : 050 → **306 050** (les zéros gardent les places !)." },
    { tier: "application", prompt: "Dans 425 367, que vaut le chiffre 2 ? Et le chiffre 5 ?", solution: "Le 2 est au rang des dizaines de milliers : **20 000**. Le 5, aux milliers : **5 000**." },
    { tier: "challenge", prompt: "Range dans l'ordre croissant : 425 367, 431 002, 99 999, 425 098.", solution: "**99 999 < 425 098 < 425 367 < 431 002** — cinq chiffres avant six, puis rang par rang." },
    { tier: "exam", prompt: "Décompose 425 367 avec des produits.", solution: "$(4 \\times 100\\,000) + (2 \\times 10\\,000) + (5 \\times 1\\,000) + (3 \\times 100) + (6 \\times 10) + 7$." },
  ],
  practice: [
    { tier: "warmup", label: "Classes de mille", make: (r) => {
      const m = randint(r, 12, 850), u = randint(r, 0, 999);
      return { prompt: `${m} milliers et ${u} unités : quel nombre ?`, answer: 1000 * m + u, solution: `$${m} \\times 1\\,000 + ${u} = $ **${1000 * m + u}**.` };
    } },
    { tier: "application", label: "La valeur du chiffre", make: (r) => {
      const d = randint(r, 1, 9); const rang = pick(r, [[10000, "dizaines de milliers"], [100000, "centaines de milliers"], [1000, "milliers"]]);
      const reste = randint(r, 111, 999);
      const n = d * rang[0] + reste;
      return { prompt: `Dans ${n}, que vaut le chiffre ${d} (au rang des ${rang[1]}) ?`, answer: d * rang[0], solution: `${d} au rang des ${rang[1]} : **${d * rang[0]}**.` };
    } },
  ],
};

// — Multiples and divisors (programme: critères 2/5/10, multiple de k ≤ 10, diviseur) —
const multiples = {
  id: "numbers.primary.multiples",
  level: "primary", domain: "numbers",
  title: "Multiples et diviseurs",
  tagline: "Le mot « diviseur », et trois critères pour reconnaître vite la divisibilité.",
  prereqs: ["numbers.primary.multiply-column", "numbers.primary.division"],
  intuition:
    "Tu connais les **multiples** : 84 est un multiple de 7 car $7 \\times 12 = 84$. Voici le mot miroir : 7 est un **diviseur** de 84. Multiple et diviseur disent la même chose, vue des deux bouts.\n\nEt trois rangs se lisent d'un coup d'œil : un nombre est multiple de **2** si son chiffre des unités est pair, de **5** s'il finit par 0 ou 5, de **10** s'il finit par 0.",
  depths: {
    discovery:
      "**Avec les mains** : 84 jetons en paquets de 7 — douze paquets, rien ne dépasse : 84 est multiple de 7. Avec des paquets de 9 : il reste 3 jetons — 84 n'est **pas** multiple de 9.",
    standard:
      "**En image** : les critères ne regardent que la **fin** du nombre — 736 finit par 6 (pair) : multiple de 2 ; 735 finit par 5 : multiple de 5 ; 730 finit par 0 : multiple de 10 (et donc de 2 et de 5 !). Pour les autres nombres (3, 4, 6, 7, 8, 9), pas de raccourci au CM1 : on interroge les tables ou on **divise**.",
    advanced:
      "**Dans la tête** : « 84 est un multiple de 7 » $\\Leftrightarrow$ « 7 est un diviseur de 84 » $\\Leftrightarrow$ « $84 \\div 7$ tombe juste ». Trois phrases, un seul fait — et la division en juge : si le reste est zéro, c'est oui. Le vocabulaire prépare un continent entier : les nombres premiers t'attendent au collège.",
  },
  keyIdea: "$7 \\times 12 = 84$ : 84 est un **multiple** de 7, et 7 est un **diviseur** de 84. Critères express : 2 (unité paire), 5 (unité 0 ou 5), 10 (unité 0).",
  why:
    "Pourquoi le critère de 5 ne regarde-t-il que le dernier chiffre ? Parce que tout le reste du nombre est fait de **dizaines** — et les dizaines sont déjà des multiples de 5 ($10 = 2 \\times 5$). Seules les unités peuvent gâcher la fête : 0 ou 5, et tout le nombre suit.",
  examples: [
    { title: "84 et le nombre 7", steps: [
      { p: "$7 \\times 12 = 84$ : 84 est un **multiple** de 7." },
      { p: "Dit dans l'autre sens : 7 est un **diviseur** de 84 — et $84 \\div 7 = 12$, reste zéro." },
    ] },
    { title: "Le critère express", steps: [
      { p: "4 730 finit par 0 : multiple de **10** — donc aussi de 2 et de 5." },
      { p: "4 736 finit par 6 : multiple de 2, mais pas de 5 ni de 10." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "« 84 est un multiple de 7. » Redis la même chose avec le mot « diviseur ».", solution: "« **7 est un diviseur de 84** » — le même fait, vu de l'autre bout : $7 \\times 12 = 84$." },
    { tier: "warmup", prompt: "Parmi 735, 736 et 740, lesquels sont multiples de 5 ? De 2 ? De 10 ?", solution: "De 5 : **735 et 740** (unités 5 ou 0). De 2 : **736 et 740** (unités paires). De 10 : **740** seul." },
    { tier: "application", prompt: "126 est-il un multiple de 9 ?", solution: "**Oui** : $9 \\times 14 = 126$ — la table (ou la division : $126 \\div 9 = 14$, reste 0) en décide." },
    { tier: "challenge", prompt: "Donne tous les diviseurs de 12.", solution: "**1, 2, 3, 4, 6, 12** — chacun multiplié par un entier redonne 12 : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$." },
    { tier: "exam", prompt: "Un nombre est multiple de 10. Que peux-tu dire de plus, sans le connaître ?", solution: "Il est **aussi multiple de 2 et de 5** : $10 = 2 \\times 5$, donc tout paquet de 10 se découpe en paquets de 2 ou de 5." },
  ],
  practice: [
    { tier: "application", label: "Multiple : combien de fois ?", make: (r) => {
      const a = randint(r, 3, 9), q = randint(r, 6, 15);
      return { prompt: `${a * q} est un multiple de ${a}. Combien de fois ${a} ? (autrement dit : $${a * q} \\div ${a}$)`, answer: q, solution: `$${a} \\times ${q} = ${a * q}$ → **${q}** fois. Et ${a} est un diviseur de ${a * q}.` };
    } },
  ],
};

// — Fractions beyond 1 (programme: entier + fraction, encadrement, statut de nombre) —
const fractionsMixed = {
  id: "numbers.primary.fractions-mixed",
  level: "primary", domain: "numbers",
  title: "Les fractions dépassent 1",
  tagline: "Fractions et nombres mixtes : sept tiers, c'est deux unités et un tiers.",
  prereqs: ["numbers.primary.fraction-ruler"],
  intuition:
    "Jusqu'ici, tes fractions restaient sous 1. Libération : $\\frac{7}{3}$ existe — sept parts d'un tiers chacune.\n\nEt ce nombre se range : $\\frac{7}{3} = \\frac{3}{3} + \\frac{3}{3} + \\frac{1}{3} = 2 + \\frac{1}{3}$. Une fraction plus grande que 1, c'est **un entier plus une fraction plus petite que 1** — et elle habite la demi-droite, entre 2 et 3, comme un nombre à part entière.",
  depths: {
    discovery:
      "**Avec les mains** : sept tiers de tarte, c'est deux tartes entières (six tiers) et un tiers qui dépasse. Le partage le montre : les fractions au-delà de 1 ne sont pas étranges, elles sont **plusieurs touts plus un morceau**.",
    standard:
      "**En image** : sur la demi-droite graduée en tiers, $\\frac{7}{3}$ tombe au septième pas — juste après 2 ($= \\frac{6}{3}$), avant 3 ($= \\frac{9}{3}$). D'où l'**encadrement** par deux entiers consécutifs : $2 < \\frac{7}{3} < 3$. Dans l'autre sens, $4 + \\frac{2}{5}$ se compacte en $\\frac{22}{5}$ ($4 = \\frac{20}{5}$).",
    advanced:
      "**Dans la tête** : la partie entière se lit par la **division** — dans $\\frac{7}{3}$, combien de fois 3 dans 7 ? Deux fois, reste 1 : $\\frac{7}{3} = 2 + \\frac{1}{3}$. Comparer, additionner, soustraire : tout l'acquis du CE2 survit tel quel (dénominateurs ≤ 20 désormais) — les fractions sont des nombres, et les nombres obéissent aux mêmes lois, petits ou grands.",
  },
  keyIdea: "$\\frac{a}{b} > 1$ se range en **entier + fraction < 1** — et s'encadre par deux entiers consécutifs : $2 < \\frac{7}{3} < 3$.",
  why:
    "Pourquoi tenait-on tant à dire que les fractions sont des **nombres** ? Parce qu'un nombre a une adresse sur la demi-droite, se compare, s'additionne — il vit avec les autres. La fraction n'est plus seulement une part de gâteau : c'est un habitant de la droite numérique, installé **entre** les entiers.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 3, filled: 3 }, caption: "Trois tiers : une unité pleine…" },
    { kind: "numberline", params: { mode: "fractionbar", parts: 3, filled: 1 }, caption: "…puis encore un tiers : ensemble, quatre tiers — plus grand que 1." },
  ],
  examples: [
    { title: "Ranger sept tiers", steps: [
      { p: "Combien de fois 3 dans 7 ? Deux fois ($\\frac{6}{3} = 2$), reste un tiers." },
      { p: "$\\frac{7}{3} = 2 + \\frac{1}{3}$ — et $2 < \\frac{7}{3} < 3$." },
    ] },
    { title: "Compacter 4 + 2/5", steps: [
      { p: "$4 = \\frac{20}{5}$ (vingt cinquièmes)." },
      { p: "$4 + \\frac{2}{5} = \\frac{20}{5} + \\frac{2}{5} = \\frac{22}{5}$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi $\\frac{7}{3}$ est-il plus grand que 1 ?", solution: "Parce que sept tiers dépassent trois tiers — et trois tiers, c'est déjà **le tout entier**." },
    { tier: "warmup", prompt: "Écris $\\frac{7}{3}$ comme la somme d'un entier et d'une fraction plus petite que 1.", solution: "$\\frac{7}{3} = \\frac{6}{3} + \\frac{1}{3} = 2 + \\frac{1}{3}$." },
    { tier: "application", prompt: "Encadre $\\frac{13}{4}$ par deux entiers consécutifs.", solution: "$\\frac{12}{4} = 3$ et $\\frac{16}{4} = 4$ : $3 < \\frac{13}{4} < 4$." },
    { tier: "challenge", prompt: "Écris $4 + \\frac{2}{5}$ comme une seule fraction.", solution: "$4 = \\frac{20}{5}$, donc $4 + \\frac{2}{5} = \\frac{22}{5}$." },
    { tier: "exam", prompt: "Place $\\frac{7}{3}$ sur une demi-droite graduée en tiers. Entre quels entiers tombe-t-il, et à combien de pas du 2 ?", solution: "Au **septième pas** de tiers : entre **2 et 3**, à **un pas** ($\\frac{1}{3}$) après le 2 — la fraction a une adresse, comme tout nombre." },
  ],
  practice: [
    { tier: "application", label: "La partie entière", make: (r) => {
      const b = randint(r, 3, 8); const e = randint(r, 1, 4); const rr = randint(r, 1, b - 1); const a = e * b + rr;
      return { prompt: `Écris $\\frac{${a}}{${b}}$ comme entier + fraction. Réponds par la partie entière.`, answer: e, solution: `Combien de fois ${b} dans ${a} ? **${e}** fois, reste ${rr} : $\\frac{${a}}{${b}} = ${e} + \\frac{${rr}}{${b}}$.` };
    } },
    { tier: "challenge", label: "Compacter", make: (r) => {
      const b = randint(r, 3, 8); const e = randint(r, 1, 4); const n = randint(r, 1, b - 1);
      return { prompt: `Écris $${e} + \\frac{${n}}{${b}}$ comme une seule fraction. Réponds par le numérateur.`, answer: e * b + n, solution: `$${e} = \\frac{${e * b}}{${b}}$, donc le numérateur est $${e * b} + ${n} = $ **${e * b + n}**.` };
    } },
  ],
};

// — The unit fraction as operator (programme: un tiers de 12 billes, un quart de 100 mètres) —
const fractionOf = {
  id: "numbers.primary.fraction-of",
  level: "primary", domain: "numbers",
  title: "La fraction de quelque chose",
  tagline: "Prendre une fraction d'une quantité : un tiers de 12, un quart de 100.",
  prereqs: ["numbers.primary.division", "numbers.primary.fractions-mixed"],
  intuition:
    "Nouveau pouvoir des fractions : elles **agissent** sur les quantités. « Un tiers de 12 billes », c'est partager 12 en trois parts égales et en prendre une : $12 \\div 3 = 4$ billes.\n\nLa fraction unitaire devient un **opérateur** : prendre $\\frac{1}{4}$ de 100 mètres, c'est calculer $100 \\div 4 = 25$ mètres.",
  depths: {
    discovery:
      "**Avec les mains** : 12 jetons, trois tas égaux — un tas contient un tiers des jetons : 4. Le schéma en barre dit pareil : la barre de 12, coupée en 3, chaque part vaut 4.",
    standard:
      "**En image** : « $\\frac{1}{3}$ **de** 12 » se calcule par la division : $12 \\div 3$. Le mot « de » cache l'action : couper le tout par le dénominateur. Un quart de 100 m : $100 \\div 4 = 25$ m — les grandeurs aussi se fractionnent.",
    advanced:
      "**Dans la tête** : la barre coupée révèle l'aller-retour — si un tiers de la classe fait 9 élèves, la classe entière en compte $9 \\times 3 = 27$ : connaître **une part**, c'est connaître le tout. La fraction-opérateur prépare un grand classique du collège : « les $\\frac{3}{4}$ de… » — pour l'instant, le CM1 s'en tient aux fractions **unitaires**.",
  },
  keyIdea: "$\\frac{1}{b}$ **de** $N$ = $N \\div b$ : la fraction unitaire est une division déguisée — et la barre en garde la trace.",
  why:
    "Pourquoi le petit mot « de » change-t-il tout ? Parce qu'il transforme la fraction en **verbe** : $\\frac{1}{3}$ tout seul est un nombre sur la droite ; « $\\frac{1}{3}$ de 12 » est une action sur 12. Un même symbole, deux métiers — c'est la richesse des fractions, et la raison de bien lire les énoncés.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", whole: 12, parts: [4, 4, 4], unknown: "part" }, caption: "La barre de 12 coupée en trois parts égales : un tiers de 12, c'est une part — 4." },
  ],
  examples: [
    { title: "Un tiers de 12 billes", steps: [
      { p: "Partager 12 en 3 parts égales : $12 \\div 3 = 4$." },
      { p: "Un tiers de 12 billes = **4 billes**." },
    ] },
    { title: "Retrouver le tout", steps: [
      { p: "Un quart d'un ruban mesure 25 cm." },
      { p: "Le ruban entier : $25 \\times 4 = $ **100 cm** — la barre se remonte." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie « un tiers **de** 12 » ?", solution: "Partager 12 en **trois parts égales** et en prendre une : $12 \\div 3 = 4$." },
    { tier: "warmup", prompt: "Calcule un quart de 100 mètres.", solution: "$100 \\div 4 = $ **25 mètres**." },
    { tier: "application", prompt: "Un cinquième des 35 élèves de l'école mange à la cantine. Combien d'élèves ?", solution: "$35 \\div 5 = $ **7 élèves** — la fraction agit sur la quantité." },
    { tier: "challenge", prompt: "Un tiers de la classe, c'est 9 élèves. Combien d'élèves dans la classe ?", solution: "Une part vaut 9, et il y a trois parts : $9 \\times 3 = $ **27 élèves** — l'opérateur se remonte." },
    { tier: "exam", prompt: "Quelle différence entre « $\\frac{1}{3}$ » et « $\\frac{1}{3}$ de 12 » ?", solution: "$\\frac{1}{3}$ est un **nombre** (une adresse sur la droite, entre 0 et 1) ; « $\\frac{1}{3}$ de 12 » est une **action** sur 12, qui donne 4. Même écriture, deux métiers." },
  ],
  practice: [
    { tier: "application", label: "La fraction agit", make: (r) => {
      const b = randint(r, 3, 8); const m = randint(r, 3, 12); const N = b * m;
      const noms = { 3: "tiers", 4: "quart", 5: "cinquième", 6: "sixième", 7: "septième", 8: "huitième" };
      return { prompt: `Calcule un ${noms[b]} de ${N}.`, answer: m, solution: `$${N} \\div ${b} = $ **${m}**.` };
    } },
    { tier: "challenge", label: "Remonter au tout", make: (r) => {
      const b = randint(r, 3, 6); const m = randint(r, 4, 15);
      const noms = { 3: "tiers", 4: "quart", 5: "cinquième", 6: "sixième" };
      return { prompt: `Un ${noms[b]} d'un groupe fait ${m} personnes. Combien de personnes dans le groupe ?`, answer: b * m, solution: `Une part vaut ${m}, et il y a ${b} parts : $${m} \\times ${b} = $ **${b * m}**.` };
    } },
  ],
};

// — Decimal fractions (programme: dixièmes et centièmes, décompositions) —
const decimalFractions = {
  id: "numbers.primary.decimal-fractions",
  level: "primary", domain: "numbers",
  title: "Les fractions décimales",
  tagline: "Dixièmes et centièmes : la numération continue sous le 1.",
  prereqs: ["numbers.primary.fractions-mixed"],
  intuition:
    "Parmi toutes les fractions, deux familles royales : les **dixièmes** ($\\frac{1}{10}$) et les **centièmes** ($\\frac{1}{100}$). Pourquoi royales ? Parce qu'elles parlent la langue de la numération : dix centièmes font un dixième, dix dixièmes font une unité — la machine à paquets de dix, prolongée **sous** le 1.\n\nEt tout nombre s'y décompose : $\\frac{357}{100} = 3 + \\frac{5}{10} + \\frac{7}{100}$.",
  depths: {
    discovery:
      "**Avec les mains** : la bande-unité du CE2 se plie en dix (les dixièmes), puis chaque dixième en dix (les centièmes — le quadrillage aide). Cent petits morceaux dans l'unité : $\\frac{100}{100} = 1$.",
    standard:
      "**En image** : la demi-droite se gradue en dixièmes — $\\frac{7}{10}$ au septième pas, $\\frac{13}{10}$ juste après 1. Les conversions glissent : $\\frac{3}{10} = \\frac{30}{100}$ (parts dix fois plus petites, dix fois plus de parts — la règle du CE2 !), et l'on compare : $\\frac{7}{10} = \\frac{70}{100} > \\frac{67}{100}$.",
    advanced:
      "**Dans la tête** : la **décomposition canonique** range tout — $\\frac{357}{100} = \\frac{300}{100} + \\frac{50}{100} + \\frac{7}{100} = 3 + \\frac{5}{10} + \\frac{7}{100}$ : un entier, des dixièmes (moins de dix), des centièmes (moins de dix). Chaque rang son chiffre, comme au-dessus du 1. Cette écriture rangée prépare un codage célèbre… qui arrive à la prochaine leçon.",
  },
  keyIdea: "$\\frac{10}{100} = \\frac{1}{10}$ et $\\frac{10}{10} = 1$ : les fractions décimales prolongent la numération **sous l'unité**.",
  why:
    "Pourquoi privilégier 10 et 100 comme dénominateurs ? Parce que notre numération compte **par dix** : en choisissant des parts au dixième et au centième, les fractions s'emboîtent dans les rangs existants. Les autres fractions restent vraies — mais celles-ci parlent la langue maternelle de nos nombres.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 10, filled: 3 }, caption: "La bande-unité en dixièmes : trois dixièmes — et chaque dixième se recoupera en dix centièmes." },
  ],
  examples: [
    { title: "Décomposer 357 centièmes", steps: [
      { p: "$\\frac{357}{100} = \\frac{300}{100} + \\frac{50}{100} + \\frac{7}{100}$." },
      { p: "$= 3 + \\frac{5}{10} + \\frac{7}{100}$ : un entier, cinq dixièmes, sept centièmes." },
    ] },
    { title: "Comparer 7 dixièmes et 67 centièmes", steps: [
      { p: "$\\frac{7}{10} = \\frac{70}{100}$ (la règle des égalités !)." },
      { p: "$\\frac{70}{100} > \\frac{67}{100}$ : sept dixièmes l'emportent." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de centièmes dans un dixième ? Dans une unité ?", solution: "$\\frac{1}{10} = \\frac{10}{100}$ : **dix** centièmes. Et $1 = \\frac{100}{100}$ : **cent** centièmes — la machine à dix continue sous le 1." },
    { tier: "warmup", prompt: "Combien de centièmes vaut $\\frac{4}{10}$ ?", solution: "$\\frac{4}{10} = \\frac{40}{100}$ : **40 centièmes** (parts dix fois plus petites, dix fois plus de parts)." },
    { tier: "application", prompt: "Décompose $\\frac{357}{100}$ en entier + dixièmes + centièmes.", solution: "$\\frac{357}{100} = 3 + \\frac{5}{10} + \\frac{7}{100}$." },
    { tier: "challenge", prompt: "Compare $\\frac{7}{10}$ et $\\frac{67}{100}$.", solution: "$\\frac{7}{10} = \\frac{70}{100} > \\frac{67}{100}$ — on renomme, puis on compare les numérateurs." },
    { tier: "exam", prompt: "Place $\\frac{13}{10}$ sur une demi-droite graduée en dixièmes. Entre quels entiers ?", solution: "Au treizième pas de dixième : entre **1 et 2**, trois pas après le 1 ($\\frac{13}{10} = 1 + \\frac{3}{10}$)." },
  ],
  practice: [
    { tier: "warmup", label: "Dixièmes ↔ centièmes", make: (r) => {
      const n = randint(r, 1, 9);
      return { prompt: `Combien de centièmes vaut $\\frac{${n}}{10}$ ? (réponds par le numérateur)`, answer: 10 * n, solution: `$\\frac{${n}}{10} = \\frac{${10 * n}}{100}$ : **${10 * n} centièmes**.` };
    } },
    { tier: "application", label: "La partie entière", make: (r) => {
      const e = randint(r, 1, 8), d = randint(r, 0, 9), c = randint(r, 1, 9);
      const num = 100 * e + 10 * d + c;
      return { prompt: `Décompose $\\frac{${num}}{100}$ : quelle est la partie entière ?`, answer: e, solution: `$\\frac{${num}}{100} = ${e} + \\frac{${d}}{10} + \\frac{${c}}{100}$ → partie entière **${e}**.` };
    } },
  ],
};

// — Decimal numbers (programme: la virgule comme codage de la décomposition canonique) —
const decimals = {
  id: "numbers.primary.decimals",
  level: "primary", domain: "numbers",
  title: "Les nombres à virgule",
  tagline: "35,78 n'est qu'un codage : 35 + 7 dixièmes + 8 centièmes.",
  prereqs: ["numbers.primary.decimal-fractions", "applied.primary.money-decimal"],
  intuition:
    "Tu écris des virgules depuis le CE1 — mais seulement pour les euros. Voici le secret général : l'écriture **35,78** est un simple **codage** du nombre $35 + \\frac{7}{10} + \\frac{8}{100}$.\n\nLa virgule marque la frontière des unités ; à sa droite, chaque chiffre dit son rang : 7 **dixièmes**, 8 **centièmes**. La monnaie le savait déjà : 2,05 € = 2 € + 5 centièmes d'euro.",
  depths: {
    discovery:
      "**Avec les mains** : sur la demi-droite graduée en dixièmes, 35,78 habite entre 35,7 et 35,8 — il faut zoomer en centièmes pour le voir pile. Lire « 35 unités et 78 centièmes », c'est déjà le comprendre.",
    standard:
      "**En image** : comparer demande de respecter les **rangs** — gare au piège : $3{,}5 > 3{,}45$ ! (Car $3{,}5 = 3{,}50$ : cinquante centièmes contre quarante-cinq.) Un nombre à virgule n'est pas « plus grand quand il est plus long ». La **partie entière** de 35,78 est 35 ; son **arrondi à l'entier** est 36 (78 centièmes dépassent la moitié).",
    advanced:
      "**Dans la tête** : entre deux décimaux, il y a **toujours** d'autres décimaux — entre 3,4 et 3,5 vivent 3,41, 3,45, 3,49… (zoome en centièmes !). C'est l'**intercalation** : la droite numérique n'a pas de trous visibles à cette échelle. Au CM1, on s'arrête aux centièmes : deux chiffres après la virgule, pas plus.",
  },
  keyIdea: "$35{,}78 = 35 + \\frac{7}{10} + \\frac{8}{100}$ : la virgule **code** la décomposition canonique. Comparer = comparer rang par rang.",
  why:
    "Pourquoi inventer la virgule alors que les fractions décimales suffisaient ? Pour **calculer comme avant** : poser $35{,}78 + 12{,}4$, c'est aligner des rangs, exactement comme avec les entiers. La virgule n'ajoute aucun nombre nouveau — elle rend les anciens maniables. Les meilleurs codages sont ceux qu'on oublie.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 10, filled: 5 }, caption: "Cinq dixièmes remplis : 0,5 — et la moitié de la barre le confirme : 1/2 = 0,5." },
  ],
  examples: [
    { title: "Décoder 35,78", steps: [
      { p: "À gauche de la virgule : 35 unités. À droite : 7 dixièmes, 8 centièmes." },
      { p: "$35{,}78 = 35 + \\frac{7}{10} + \\frac{8}{100}$ — lu « 35 unités et 78 centièmes »." },
    ] },
    { title: "Le piège 3,5 contre 3,45", steps: [
      { p: "$3{,}5 = 3{,}50$ : cinquante centièmes." },
      { p: "$50 > 45$, donc $3{,}5 > 3{,}45$ — le plus « long » n'est pas le plus grand !" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que code l'écriture 35,78 ?", solution: "$35 + \\frac{7}{10} + \\frac{8}{100}$ — la virgule sépare les unités des dixièmes et centièmes." },
    { tier: "warmup", prompt: "Écris $4 + \\frac{2}{10} + \\frac{9}{100}$ avec une virgule.", solution: "**4,29** — chaque fraction décimale prend son rang." },
    { tier: "application", prompt: "Compare 3,5 et 3,45.", solution: "$3{,}5 = 3{,}50$ et $50 > 45$ centièmes : $3{,}5 > 3{,}45$ — rang par rang, jamais à la longueur." },
    { tier: "challenge", prompt: "Donne la partie entière et l'arrondi à l'entier de 35,78. Puis intercale un nombre entre 3,4 et 3,5.", solution: "Partie entière **35** ; arrondi **36** (78 centièmes > la moitié). Entre 3,4 et 3,5 : par exemple **3,45** — il y a toujours de la place en zoomant aux centièmes." },
    { tier: "exam", prompt: "Zoé écrit : « 12,9 < 12,15 car 9 < 15 ». Explique son erreur.", solution: "Elle compare des **longueurs d'écriture**, pas des rangs : $12{,}9 = 12{,}90$, et 90 centièmes > 15 centièmes — donc $12{,}9 > 12{,}15$. La virgule exige de penser en dixièmes et centièmes." },
  ],
  practice: [
    { tier: "warmup", label: "Coder avec la virgule", make: (r) => {
      const e = randint(r, 1, 40), d = randint(r, 1, 9), c = randint(r, 1, 9);
      return { prompt: `Écris $${e} + \\frac{${d}}{10} + \\frac{${c}}{100}$ en écriture à virgule.`, answer: e + d / 10 + c / 100, solution: `**${e},${d}${c}** — ${d} dixièmes, ${c} centièmes, chacun à son rang.` };
    } },
    { tier: "application", label: "L'arrondi à l'entier", make: (r) => {
      const e = randint(r, 3, 89), dc = randint(r, 11, 94);
      const x = e + dc / 100; const arrondi = dc >= 50 ? e + 1 : e;
      return { prompt: `Quel est l'arrondi à l'entier de ${e},${dc < 10 ? "0" + dc : dc} ?`, answer: arrondi, solution: `${dc} centièmes ${dc >= 50 ? "dépassent" : "n'atteignent pas"} la moitié : arrondi à **${arrondi}**.` };
    } },
  ],
};

export default [toMillion, multiples, fractionsMixed, fractionOf, decimalFractions, decimals];
