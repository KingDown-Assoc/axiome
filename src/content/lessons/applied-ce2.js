// Field "Applied" — PRIMARY module (CE2 year): mm/dm/tonne conversions (no conversion tables
// in cycle 2!), capacities (L, dL, cL), the perimeter (compass transfer, no formulas), column
// operations on euro amounts with the comma, time to the minute. Official cycle-2 programme.
import { randint, pick } from "../../core/exercises.js";

// — From millimetre to tonne (programme: mm, dm, km ; g, kg, t ; conversions sans tableaux) —
const metricUnits = {
  id: "applied.primary.metric",
  level: "primary", domain: "applied",
  title: "Du millimètre à la tonne",
  tagline: "Les unités se complètent aux deux bouts — et les conversions s'enchaînent sans tableau.",
  prereqs: ["applied.primary.units", "numbers.primary.to-10000"],
  intuition:
    "Les longueurs gagnent leurs unités fines : le **millimètre** ($1$ cm $= 10$ mm, $1$ m $= 1\\,000$ mm) et le **décimètre** ($1$ m $= 10$ dm). Les masses gagnent leur géante : la **tonne** ($1$ t $= 1\\,000$ kg).\n\nEt une règle de la maison : **pas de tableau de conversion** au cycle 2 — on s'appuie sur les relations connues, c'est tout. $3$ cm $+ 4$ mm ? $30$ mm $+ 4$ mm $= 34$ mm.",
  depths: {
    discovery:
      "**Avec les mains** : je trace des segments de 6 cm, de « 5 cm et 3 mm », de 72 mm — la règle graduée porte les millimètres entre les centimètres. Et je soupèse : la pomme se compte en grammes, le dictionnaire en kilogrammes… la voiture en tonnes.",
    standard:
      "**En image** : les conversions s'écrivent en chaîne, relation par relation — $215$ cm $= 200$ cm $+ 15$ cm $= 2$ m $+ 1$ dm $+ 5$ cm ; $16$ m $= 1\\,600$ cm $= 160$ dm ; $5$ km $+ 750$ m $= 5\\,750$ m ; $5\\,462$ g $= 5$ kg $+ 462$ g.",
    advanced:
      "**Dans la tête** : choisir l'unité **adaptée** et estimer par **références** — une feuille de papier : quelques grammes ; un seau d'eau : une dizaine de kilogrammes ; de chez moi à Paris : des kilomètres. (Et toujours pas d'écriture à virgule pour les longueurs et les masses — elle reste réservée à la monnaie.)",
  },
  keyIdea: "$1$ cm $= 10$ mm ; $1$ m $= 10$ dm $= 100$ cm $= 1\\,000$ mm ; $1$ t $= 1\\,000$ kg. Les relations suffisent — pas de tableau.",
  why:
    "Pourquoi refuser le tableau de conversion ? Parce qu'il fait glisser des chiffres sans comprendre, quand la relation ($1$ cm $= 10$ mm) fait **calculer en sachant pourquoi**. Celui qui pense « 3 cm, c'est 30 mm » n'aura jamais besoin de tableau — ni au CE2, ni après.",
  examples: [
    { title: "215 cm, démonté", steps: [
      { p: "$215$ cm $= 200$ cm $+ 15$ cm." },
      { p: "$200$ cm $= 2$ m ; $15$ cm $= 1$ dm $+ 5$ cm." },
      { p: "Donc $215$ cm $= 2$ m $+ 1$ dm $+ 5$ cm." },
    ] },
    { title: "La tonne au travail", steps: [
      { p: "$1$ t $= 1\\,000$ kg, donc $2$ t $= 2\\,000$ kg." },
      { p: "Et dans l'autre sens : $5\\,350$ kg $= 5$ t $+ 350$ kg." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de millimètres dans un centimètre ? Dans un mètre ? Et de kilogrammes dans une tonne ?", solution: "$1$ cm $= $ **10 mm** ; $1$ m $= $ **1 000 mm** ; $1$ t $= $ **1 000 kg**." },
    { tier: "warmup", prompt: "Convertis : $3$ cm $+ 4$ mm en millimètres, puis $6$ cm en millimètres.", solution: "$30 + 4 = $ **34 mm** ; $6$ cm $= $ **60 mm**." },
    { tier: "application", prompt: "Convertis $5$ km $+ 750$ m en mètres.", solution: "$5\\,000 + 750 = $ **5 750 m**." },
    { tier: "challenge", prompt: "Décompose $215$ cm en mètres, décimètres et centimètres.", solution: "$215$ cm $= 200 + 10 + 5 = $ **2 m + 1 dm + 5 cm** — relation par relation, sans tableau." },
    { tier: "exam", prompt: "Décompose $5\\,462$ g en kilogrammes et grammes. Et une voiture pèse plutôt : 12 kg, 120 kg ou 1 200 kg ?", solution: "$5\\,462$ g $= $ **5 kg + 462 g**. La voiture : **1 200 kg** — plus d'une tonne ; les références éliminent l'absurde." },
  ],
  practice: [
    { tier: "application", label: "Conversions en chaîne", make: (r) => {
      const kind = r();
      if (kind < 0.34) { const x = randint(r, 2, 9), y = randint(r, 1, 9); return { prompt: `${x} cm et ${y} mm : combien de millimètres ?`, answer: 10 * x + y, solution: `$${10 * x} + ${y} = $ **${10 * x + y} mm**.` }; }
      if (kind < 0.67) { const k = randint(r, 2, 8), m = randint(r, 1, 9) * 100; return { prompt: `${k} km et ${m} m : combien de mètres ?`, answer: 1000 * k + m, solution: `$${1000 * k} + ${m} = $ **${1000 * k + m} m**.` }; }
      const t = randint(r, 2, 7); return { prompt: `${t} t : combien de kilogrammes ?`, answer: 1000 * t, solution: `$1$ t $= 1\\,000$ kg → **${1000 * t} kg**.` };
    } },
  ],
};

// — Capacities (programme: L, dL, cL ; transvasements, étalon, 780 cL = 7 L + 80 cL) —
const capacity = {
  id: "applied.primary.capacity",
  level: "primary", domain: "applied",
  title: "Les contenances : litres",
  tagline: "Une grandeur nouvelle : combien ça contient ? Le litre et ses dixièmes, ses centièmes.",
  prereqs: ["applied.primary.units"],
  intuition:
    "Combien d'eau tient dans la bouteille ? C'est sa **contenance** — une grandeur nouvelle, qui se mesure en **litres** (L), **décilitres** (dL) et **centilitres** (cL).\n\nLes relations chantent un air connu : $1$ L $= 10$ dL $= 100$ cL — dix et cent, encore la numération.",
  depths: {
    discovery:
      "**Avec les mains** : pour comparer deux récipients, je **transvase** — ou je compte combien de **verres** chacun remplit : le verre devient l'étalon. Puis le verre gradué donne les nombres : cette carafe contient 8 dL.",
    standard:
      "**En image** : les conversions s'enchaînent, relations en tête — $780$ cL $= 700$ cL $+ 80$ cL $= 7$ L $+ 80$ cL. Une bouteille d'un demi-litre ? $50$ cL. Toujours sans tableau, toujours sans virgule.",
    advanced:
      "**Dans la tête** : les **références** s'installent — un verre : environ 20 cL ; une bouteille : 1 L ou 1 L et demi ; un arrosoir : une dizaine de litres. Estimer la contenance d'un récipient avant de le remplir, c'est déjà mesurer.",
  },
  keyIdea: "$1$ L $= 10$ dL $= 100$ cL — la contenance se mesure, se convertit et s'estime comme les autres grandeurs.",
  why:
    "Pourquoi « contenance » et pas « taille » ? Parce que deux récipients de formes très différentes — une carafe haute et fine, un saladier bas et large — peuvent contenir **exactement autant**. Le transvasement le prouve : la grandeur ne se voit pas toujours, elle se mesure.",
  examples: [
    { title: "Comparer sans graduations", steps: [
      { p: "Le pichet remplit 6 verres ; la carafe en remplit 8." },
      { p: "La carafe a la plus grande contenance — le verre-étalon a tranché." },
    ] },
    { title: "780 cL, démonté", steps: [
      { p: "$780$ cL $= 700$ cL $+ 80$ cL." },
      { p: "$700$ cL $= 7$ L : donc $780$ cL $= 7$ L $+ 80$ cL." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment comparer les contenances de deux récipients sans aucune graduation ?", solution: "Par **transvasement** (verser l'un dans l'autre) ou avec un **étalon** : compter les verres que chacun remplit." },
    { tier: "warmup", prompt: "Combien de décilitres dans un litre ? De centilitres ?", solution: "$1$ L $= $ **10 dL** $= $ **100 cL**." },
    { tier: "application", prompt: "Décompose $780$ cL en litres et centilitres.", solution: "$780 = 700 + 80$ : **7 L + 80 cL**." },
    { tier: "challenge", prompt: "Une bouteille d'un litre et demi : combien de centilitres ?", solution: "$100 + 50 = $ **150 cL** — le demi-litre vaut 50 cL." },
    { tier: "exam", prompt: "Un verre contient plutôt : 2 cL, 20 cL ou 2 L ? Et un arrosoir : 1 L, 10 L ou 100 L ?", solution: "Le verre : **20 cL** (2 cL, c'est une cuillère ; 2 L, un grand pichet). L'arrosoir : **10 L** — les références gardent les estimations raisonnables." },
  ],
  practice: [
    { tier: "application", label: "Litres et centilitres", make: (r) => {
      if (r() < 0.5) { const x = randint(r, 1, 6), y = randint(r, 1, 9) * 10; return { prompt: `${x} L et ${y} cL : combien de centilitres ?`, answer: 100 * x + y, solution: `$${100 * x} + ${y} = $ **${100 * x + y} cL**.` }; }
      const v = randint(r, 2, 9); return { prompt: `${v} L : combien de décilitres ?`, answer: 10 * v, solution: `$1$ L $= 10$ dL → **${10 * v} dL**.` };
    } },
  ],
};

// — The perimeter (programme: longueur du contour, report au compas, carré/rectangle sans formule) —
const perimeter = {
  id: "applied.primary.perimeter",
  level: "primary", domain: "applied",
  title: "Le périmètre",
  tagline: "La longueur du contour — qui se compare au compas et se calcule sans formule.",
  prereqs: ["geometry.primary.angles", "applied.primary.metric"],
  intuition:
    "Fais le tour d'une figure avec une ficelle, puis tends la ficelle : sa longueur est le **périmètre** — la longueur du contour.\n\nPour le calculer, rien de magique : on additionne les longueurs des côtés. Et pour **comparer** deux périmètres, pas même besoin de règle graduée : le compas suffit.",
  depths: {
    discovery:
      "**Avec les mains** : je reporte au **compas** les côtés d'un polygone bout à bout sur une droite — le contour se déplie en un seul segment. Deux polygones ? Deux segments : le plus long se voit, **sans rien mesurer**.",
    standard:
      "**En image** : avec la règle graduée, je mesure chaque côté et j'additionne — un triangle de côtés 4 cm, 5 cm et 6 cm a pour périmètre $4 + 5 + 6 = 15$ cm. Le contour devient une somme.",
    advanced:
      "**Dans la tête** : pour le carré et le rectangle, **aucune formule** — mais pas besoin de tout mesurer ! Le carré a quatre côtés égaux : **une seule** mesure suffit ($7 + 7 + 7 + 7$). Le rectangle, deux à deux : **deux** mesures ($8 + 3 + 8 + 3$). Les propriétés de la figure travaillent à ta place.",
  },
  keyIdea: "Périmètre = longueur du **contour** = somme des côtés. Les égalités de côtés (carré, rectangle) économisent les mesures.",
  why:
    "Pourquoi le report au compas fonctionne-t-il ? Parce que le périmètre n'est qu'une **longueur** — celle du contour. Déplier le contour sur une droite ne change rien à sa longueur : on compare alors deux segments, le geste le plus simple de la géométrie.",
  examples: [
    { title: "Comparer au compas", steps: [
      { p: "Je reporte les côtés du premier polygone bout à bout sur une droite : un segment." },
      { p: "Même chose pour le second, sur une droite voisine." },
      { p: "Le segment le plus long désigne le plus grand périmètre — zéro mesure." },
    ] },
    { title: "Le rectangle économe", steps: [
      { p: "Longueur 8 cm, largeur 3 cm : les côtés opposés sont égaux." },
      { p: "$8 + 3 + 8 + 3 = $ **22 cm** — deux mesures au lieu de quatre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Qu'est-ce que le périmètre d'une figure plane ?", solution: "La **longueur de son contour** — celle de la ficelle qui en fait le tour, tendue ensuite en ligne droite." },
    { tier: "warmup", prompt: "Un triangle a des côtés de 4 cm, 5 cm et 6 cm. Quel est son périmètre ?", solution: "$4 + 5 + 6 = $ **15 cm**." },
    { tier: "application", prompt: "Un carré a un côté de 7 cm. Combien de mesures te faut-il ? Quel est son périmètre ?", solution: "**Une seule** — les quatre côtés sont égaux : $7 + 7 + 7 + 7 = $ **28 cm**." },
    { tier: "challenge", prompt: "Comment comparer les périmètres de deux polygones sans règle graduée ?", solution: "Au **compas** : reporter les côtés de chacun bout à bout sur une droite, puis comparer les deux segments obtenus." },
    { tier: "exam", prompt: "Un rectangle a une longueur de 8 cm et une largeur de 3 cm. Périmètre, avec le minimum de mesures ?", solution: "Deux mesures suffisent (côtés opposés égaux) : $8 + 3 + 8 + 3 = $ **22 cm**." },
  ],
  practice: [
    { tier: "application", label: "Sommes de contours", make: (r) => {
      const kind = r();
      if (kind < 0.34) { const c = randint(r, 3, 9); return { prompt: `Un carré a un côté de ${c} cm. Quel est son périmètre ?`, answer: 4 * c, solution: `$${c} + ${c} + ${c} + ${c} = $ **${4 * c} cm** — une seule mesure suffit.` }; }
      if (kind < 0.67) { const L = randint(r, 5, 9), l = randint(r, 2, L - 1); return { prompt: `Un rectangle a une longueur de ${L} cm et une largeur de ${l} cm. Quel est son périmètre ?`, answer: 2 * (L + l), solution: `$${L} + ${l} + ${L} + ${l} = $ **${2 * (L + l)} cm** — deux mesures, les côtés opposés sont égaux.` }; }
      const a = randint(r, 4, 6), b = randint(r, 4, 6), c2 = randint(r, 4, 6);
      return { prompt: `Un triangle a des côtés de ${a} cm, ${b} cm et ${c2} cm. Quel est son périmètre ?`, answer: a + b + c2, solution: `$${a} + ${b} + ${c2} = $ **${a + b + c2} cm**.` };
    } },
  ],
};

// — Column operations with the comma (programme: addition posée € P2, soustraction P4) —
const moneyDecimal = {
  id: "applied.primary.money-decimal",
  level: "primary", domain: "applied",
  title: "Poser avec la virgule",
  tagline: "Les techniques posées s'étendent aux euros — la virgule sous la virgule.",
  prereqs: ["applied.primary.cents", "numbers.primary.subtract-column"],
  intuition:
    "Tes posées savent déjà additionner et soustraire les entiers. Au CE2, elles apprennent les **montants en euros** : $12{,}45$ € $+ 3{,}80$ €.\n\nLa règle d'or tient en quatre mots : **la virgule sous la virgule** — ainsi chaque chiffre reste à son rang : centimes sous centimes, euros sous euros.",
  depths: {
    discovery:
      "**Avec les mains** : je vérifie avec la monnaie — $3{,}45$ € $+ 2{,}30$ €, ce sont des pièces et des billets que je regroupe : 5 euros et 75 centimes. La posée doit retrouver exactement ce tas.",
    standard:
      "**En image** : je pose $12{,}45 + 3{,}80$ en alignant les **virgules**. Centimes : $45 + 80 = 125$ centimes $= 1$ € et 25 centimes — la retenue passe chez les euros : $12 + 3 + 1 = 16$ → **$16{,}25$ €**. La soustraction suit la même règle (et arrive un peu plus tard dans l'année).",
    advanced:
      "**Dans la tête** : aligner les virgules n'est pas un caprice — c'est la **numération** qui l'exige : on n'additionne que des chiffres de même rang, dizaines de centimes avec dizaines de centimes. Aligner à droite comme des entiers ($5{,}2$ sous $3{,}45$ !) mélangerait les rangs — l'erreur classique à connaître pour ne jamais la faire. (Et ces posées à virgule restent réservées à la monnaie : les longueurs et les masses attendront le cycle 3.)",
  },
  keyIdea: "**La virgule sous la virgule** : chaque chiffre garde son rang, et la retenue des centimes passe aux euros (100 centimes = 1 €).",
  why:
    "Pourquoi cent centimes engendrent-ils une retenue chez les euros ? Parce que la machine à paquets ne s'arrête pas à la virgule : dix pièces de 10 centimes font un euro, exactement comme dix dizaines font une centaine. La virgule marque une frontière — pas une rupture.",
  examples: [
    { title: "12,45 € + 3,80 €, posé", steps: [
      { p: "J'aligne les virgules : 12,45 au-dessus de 3,80." },
      { p: "Centimes : $45 + 80 = 125$ → je pose 25, retenue 1 €." },
      { p: "Euros : $12 + 3 + 1 = 16$ → **16,25 €**." },
    ] },
    { title: "Rendre la monnaie, posé", steps: [
      { p: "$20$ € $- 13{,}55$ € : j'écris $20{,}00$ pour donner des rangs aux centimes." },
      { p: "Cassages en chaîne : $20{,}00 - 13{,}55 = $ **6,45 €**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans une addition posée de montants en euros, comment aligne-t-on les nombres ?", solution: "**La virgule sous la virgule** : centimes sous centimes, euros sous euros — chaque chiffre à son rang." },
    { tier: "warmup", prompt: "Pose et calcule $3{,}45$ € $+ 2{,}30$ €.", solution: "Centimes : $45 + 30 = 75$ ; euros : $3 + 2 = 5$ → **5,75 €**." },
    { tier: "application", prompt: "Pose et calcule $12{,}45$ € $+ 3{,}80$ €.", solution: "$45 + 80 = 125$ centimes → 25 et retenue 1 € ; $12 + 3 + 1 = 16$ → **16,25 €**." },
    { tier: "challenge", prompt: "Pose et calcule $20$ € $- 13{,}55$ €.", solution: "J'écris $20{,}00$ ; cassages : **6,45 €** — et je vérifie : $6{,}45 + 13{,}55 = 20$ ✓." },
    { tier: "exam", prompt: "Lina pose $5{,}2 + 3{,}45$ en alignant les derniers chiffres à droite. Explique son erreur et corrige.", solution: "Elle aligne comme des **entiers** : le 2 (dizaines de centimes) tombe sous le 5 (centimes) — rangs mélangés ! Il faut aligner les **virgules** : $5{,}20 + 3{,}45 = $ **8,65 €**." },
  ],
  practice: [
    { tier: "application", label: "Posées en euros", make: (r) => {
      if (r() < 0.5) {
        const e1 = randint(r, 2, 9), c1 = randint(r, 10, 85), e2 = randint(r, 1, 6), c2 = randint(r, 10, 90);
        const p1 = c1 < 10 ? "0" + c1 : c1, p2 = c2 < 10 ? "0" + c2 : c2;
        return { prompt: `Pose et calcule ${e1},${p1} € + ${e2},${p2} €, puis donne le résultat en centimes.`, answer: 100 * (e1 + e2) + c1 + c2, solution: `$${100 * e1 + c1} + ${100 * e2 + c2} = $ **${100 * (e1 + e2) + c1 + c2} centimes** — la virgule sous la virgule.` };
      }
      const m = pick(r, [10, 20]); const e = randint(r, 3, m - 2), c = randint(r, 5, 95);
      const pc = c < 10 ? "0" + c : c;
      return { prompt: `Pose et calcule ${m} € − ${e},${pc} €, puis donne le résultat en centimes.`, answer: 100 * m - (100 * e + c), solution: `$${100 * m} - ${100 * e + c} = $ **${100 * m - (100 * e + c)} centimes** — j'écris ${m},00 pour donner leurs rangs aux centimes.` };
    } },
  ],
};

// — Time to the minute (programme: moins le quart, durées entre deux instants, axe chronologique) —
const timeMinutes = {
  id: "applied.primary.time-minutes",
  level: "primary", domain: "applied",
  title: "L'heure à la minute",
  tagline: "Quinze heures quarante-deux, sept heures moins le quart — et les durées sur un axe.",
  prereqs: ["applied.primary.time-durations"],
  intuition:
    "L'horloge se lit maintenant **à la minute** : 10 h 35, 15 h 42, six heures dix-huit. Et la langue ajoute ses tournures : « sept heures **moins le quart** » (6 h 45), « quatre heures **moins vingt** » (3 h 40).\n\nPour les durées, un outil puissant : l'**axe du temps** — les instants s'y placent, les durées s'y lisent comme des sauts.",
  depths: {
    discovery:
      "**Avec les mains** : je positionne les aiguilles de « six heures dix-huit » — petite entre 6 et 7, grande juste après le 3 (18 minutes). Et je lis « moins le quart » : la grande sur le 9, un quart de tour **avant** l'heure pleine.",
    standard:
      "**En image** : la durée entre deux instants se calcule sur l'axe — de 8 h 30 à 8 h 50 : **20 min**. De 15 h 40 à 16 h 05, l'heure change : $+20$ min jusqu'à 16 h, puis $+5$ → **25 min**. Et les conversions : 2 h et 20 min $= 120 + 20 = 140$ min.",
    advanced:
      "**Dans la tête** : l'axe résout les problèmes dans tous les sens — Lucie sort à 8 h 30 et rentre à 12 h 30 : **4 h** dehors. Elle rentre à 12 h 30 après 4 h dehors : partie à **8 h 30** (on remonte l'axe !). Le train part à 7 h 10, roule 1 h 30, puis 40 min : $7$ h $10 \\to 8$ h $40 \\to $ **9 h 20** — deux sauts, deux étapes.",
  },
  keyIdea: "« Moins le quart » = 15 min **avant** l'heure pleine. Une durée = un **saut** sur l'axe du temps — qui se remonte aussi.",
  why:
    "Pourquoi dessiner un axe pour le temps ? Parce que le temps **est** une droite graduée : les instants sont des points, les durées des distances. Tout ce que tu sais des nombres sur la demi-droite — placer, encadrer, mesurer des écarts — sert ici tel quel.",
  examples: [
    { title: "Passer l'heure pleine", steps: [
      { p: "De 15 h 40 à 16 h 05 : j'atteins d'abord 16 h ($+20$ min)." },
      { p: "Puis $+5$ min : la durée est $20 + 5 = $ **25 minutes**." },
    ] },
    { title: "Le train à deux étapes", steps: [
      { p: "Départ 7 h 10 ; premier trajet 1 h 30 : arrivée première gare $7$ h $10 + 1$ h $30 = 8$ h $40$." },
      { p: "Second trajet 40 min : $8$ h $40 + 20 = 9$ h, puis $+20$ → **9 h 20**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "« Sept heures moins le quart » : quelle heure est-il ? Et « quatre heures moins vingt » ?", solution: "**6 h 45** (un quart d'heure avant 7 h) et **3 h 40** (vingt minutes avant 4 h)." },
    { tier: "warmup", prompt: "Convertis 2 h et 20 min en minutes.", solution: "$2 \\times 60 + 20 = 120 + 20 = $ **140 min**." },
    { tier: "application", prompt: "Quelle durée s'écoule entre 8 h 30 et 8 h 50 ?", solution: "$50 - 30 = $ **20 minutes** — même heure, on soustrait les minutes." },
    { tier: "challenge", prompt: "Quelle durée s'écoule entre 15 h 40 et 16 h 05 ? Laquelle des deux durées (avec celle d'avant) est la plus longue ?", solution: "$+20$ jusqu'à 16 h, puis $+5$ : **25 minutes** — plus longue que les 20 minutes précédentes." },
    { tier: "exam", prompt: "Le train part à 7 h 10, met 1 h 30 jusqu'à la première gare, puis 40 min jusqu'à la deuxième. Heure d'arrivée ?", solution: "$7$ h $10 + 1$ h $30 = 8$ h $40$ ; $8$ h $40 + 40$ min $= $ **9 h 20** — l'axe du temps, saut après saut." },
  ],
  practice: [
    { tier: "application", label: "Durées sur l'axe", make: (r) => {
      const kind = r();
      if (kind < 0.34) { const h = randint(r, 1, 3), m = randint(r, 1, 11) * 5; return { prompt: `Convertis ${h} h et ${m} min en minutes.`, answer: 60 * h + m, solution: `$${60 * h} + ${m} = $ **${60 * h + m} min**.` }; }
      if (kind < 0.67) { const H = randint(r, 8, 15), m1 = randint(r, 1, 6) * 5, m2 = m1 + randint(r, 2, 8) * 5; return { prompt: `Quelle durée s'écoule entre ${H} h ${m1 < 10 ? "0" + m1 : m1} et ${H} h ${m2 < 10 ? "0" + m2 : m2} ?`, answer: m2 - m1, solution: `$${m2} - ${m1} = $ **${m2 - m1} min**.` }; }
      const H2 = randint(r, 8, 15), a = randint(r, 7, 11) * 5, b = randint(r, 1, 5) * 5;
      return { prompt: `Quelle durée s'écoule entre ${H2} h ${a} et ${H2 + 1} h ${b < 10 ? "0" + b : b} ?`, answer: (60 - a) + b, solution: `$+${60 - a}$ min jusqu'à ${H2 + 1} h, puis $+${b}$ : **${60 - a + b} min**.` };
    } },
  ],
};

export default [metricUnits, capacity, perimeter, moneyDecimal, timeMinutes];
