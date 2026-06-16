// Field "Numbers" — PRIMARY module (CM2 year), part 2: calculation. Official cycle-3
// programme (2025): mental calculation completed (×/÷ 10/100/1000 on decimals,
// additions with carry, doubles/halves of decimals, halves of odd numbers ≤ 15,
// ÷4 and ÷8, ×5 and ×50 on decimals, round-number products), decimal division
// (integer or decimal dividend, quotient past the comma), posed multiplication of
// a decimal by any integer, one or two pairs of parentheses, and problem solving
// including the new algorithm-preparation structure.
import { randint, pick } from "../../core/exercises.js";

// — The complete mental toolbox (programme: calcul mental CM2) —
const mentalCm2 = {
  id: "numbers.primary.mental-cm2",
  level: "primary", domain: "numbers",
  title: "Calcul mental : la boîte à outils complète",
  tagline: "La moitié de 7, le ×50 en deux gestes, et 30 × 400 sans poser.",
  prereqs: ["numbers.primary.mental-decimals", "numbers.primary.thousandths"],
  intuition:
    "Le calcul mental finit son arsenal. La **moitié des impairs** : la moitié de 7, c'est $3{,}5$ — les décimaux libèrent les partages. Les retenues s'apprivoisent : $3{,}8 + 2{,}5 = 6{,}3$ (huit dixièmes et cinq dixièmes font treize dixièmes : une unité passe).\n\nEt les grands gestes : $\\times 50 = \\times 100$ puis moitié ; $\\div 4 = $ moitié de moitié ; $30 \\times 400 = 12\\,000$ (trois fois quatre, puis les rangs).",
  depths: {
    discovery:
      "**Avec les mains** : la moitié de 7 carreaux de chocolat — trois carreaux chacun et le septième **cassé en deux** : $3 + 0{,}5$. L'impair se partage, à condition d'accepter la virgule.",
    standard:
      "**En image** : les décimaux glissent maintenant sur **trois** rangs — $\\times 1\\,000$ : $3{,}517 \\to 3\\,517$ ; $\\div 100$ : $42{,}7 \\to 0{,}427$. Le double et la moitié s'étendent ($\\text{double de } 3{,}6 = 7{,}2$ ; moitié de $4{,}8 = 2{,}4$). Et $\\div 8$ : moitié, moitié, moitié — $96 \\div 8$ : $48$, $24$, **12**.",
    advanced:
      "**Dans la tête** : les nombres ronds se multiplient par leurs **chiffres de tête** — $30 \\times 400$ : $3 \\times 4 = 12$, puis dizaines × centaines = milliers : **12 000**. Le $\\times 50$ enchaîne deux gestes faciles : $3{,}6 \\times 50 = 360 \\div 2 = 180$. Aucun de ces calculs n'exige de poser : la numération et trois procédures font tout — c'est l'aboutissement de six ans d'entraînement.",
  },
  keyIdea: "Moitié d'un impair : un décimal ($7 \\to 3{,}5$). $\\times 50 = \\times 100$ puis moitié ; $\\div 4 = $ moitié de moitié ; ronds × ronds = têtes × têtes puis les rangs.",
  why:
    "Pourquoi accumuler des procédures plutôt qu'une seule méthode universelle (la posée) ? Parce que la posée coûte trente secondes et un papier ; la procédure, deux secondes et zéro encre. Le calcul mental n'est pas un sport scolaire : c'est l'art de payer chaque calcul son juste prix — et la plupart valent deux secondes.",
  examples: [
    { title: "3,8 + 2,5 avec retenue", steps: [
      { p: "Dixièmes : $8 + 5 = 13$ dixièmes — une unité passe, il reste 3 dixièmes." },
      { p: "Unités : $3 + 2 + 1 = 6$ → **6,3**." },
    ] },
    { title: "3,6 × 50 en deux gestes", steps: [
      { p: "$3{,}6 \\times 100 = 360$." },
      { p: "La moitié : $360 \\div 2 = $ **180**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle est la moitié de 7 ? Et celle de 15 ?", solution: "$3{,}5$ et $7{,}5$ — l'impair se partage dès qu'on accepte les dixièmes : des faits à connaître par cœur." },
    { tier: "warmup", prompt: "Calcule $3{,}8 + 2{,}5$ puis $42{,}7 \\div 100$.", solution: "$3{,}8 + 2{,}5 = $ **6,3** (treize dixièmes : retenue) ; $42{,}7 \\div 100 = $ **0,427** (deux rangs plus bas)." },
    { tier: "application", prompt: "Calcule $96 \\div 8$ par moitiés successives, puis $3{,}517 \\times 1\\,000$.", solution: "$96 \\to 48 \\to 24 \\to $ **12** (trois moitiés) ; $3{,}517 \\times 1\\,000 = $ **3 517** (trois rangs plus haut)." },
    { tier: "challenge", prompt: "Calcule $30 \\times 400$ puis $3{,}6 \\times 50$.", solution: "$3 \\times 4 = 12$, dizaines × centaines : **12 000** ; $3{,}6 \\times 100 = 360$, moitié : **180**." },
    { tier: "exam", prompt: "Calcule le double de 4,75 et la moitié de 9,4, en expliquant le passage des rangs.", solution: "Double : $4{,}75 + 4{,}75 = $ **9,5** (les 75 centièmes doublés font 150 : une unité et demie passe). Moitié : $9{,}4 \\div 2 = $ **4,7** (neuf unités → 4 et demie ; 4 dixièmes → 2 ; ensemble 4,7)." },
  ],
  practice: [
    { tier: "warmup", label: "Moitiés d'impairs et de décimaux", make: (r) => {
      if (r() < 0.5) { const n = pick(r, [3, 5, 7, 9, 11, 13, 15]); return { prompt: `Quelle est la moitié de ${n} ?`, answer: n / 2, solution: `**${n / 2}** — l'impair se coupe avec la virgule.` }; }
      const e = randint(r, 1, 9) * 2, d = pick(r, [2, 4, 6, 8]);
      return { prompt: `Quelle est la moitié de $${e}{,}${d}$ ?`, answer: (10 * e + d) / 20, solution: `Moitié des unités et des dixièmes : **${e / 2},${d / 2}**.` };
    } },
    { tier: "application", label: "Ronds × ronds", make: (r) => {
      const a = randint(r, 2, 9), b = randint(r, 2, 9);
      const pa = pick(r, [10, 100]), pb = pick(r, [10, 100]);
      return { prompt: `Calcule $${a * pa} \\times ${b * pb}$.`, answer: a * b * pa * pb, solution: `$${a} \\times ${b} = ${a * b}$, puis les rangs : **${a * b * pa * pb}**.` };
    } },
    { tier: "challenge", label: "×50 et ÷4 en gestes", make: (r) => {
      if (r() < 0.5) { const n = randint(r, 11, 89) * 2; return { prompt: `Calcule $${n} \\times 50$ (×100 puis moitié).`, answer: 50 * n, solution: `$${n} \\times 100 = ${100 * n}$, moitié : **${50 * n}**.` }; }
      const n = randint(r, 6, 60) * 4;
      return { prompt: `Calcule $${n} \\div 4$ (moitié de moitié).`, answer: n / 4, solution: `$${n} \\to ${n / 2} \\to $ **${n / 4}**.` };
    } },
  ],
};

// — Decimal division (programme: quotient décimal, dividende entier puis décimal) —
const divisionDecimal = {
  id: "numbers.primary.division-decimal",
  level: "primary", domain: "numbers",
  title: "La division continue après la virgule",
  tagline: "7 ÷ 2 ne s'arrête plus à « 3 reste 1 » : le quotient devient 3,5.",
  prereqs: ["numbers.primary.division-column", "numbers.primary.thousandths"],
  intuition:
    "Au CM1, $7 \\div 2$ donnait quotient 3, **reste 1** — et le reste restait sur la table. Au CM2, on le partage aussi : 1 unité = 10 dixièmes ; $10 \\div 2 = 5$ dixièmes. Quotient complet : **3,5**.\n\nLa potence continue après la virgule : on pose la virgule au quotient, on **abaisse un zéro**, et la division reprend — le reste se monnaye en dixièmes, puis en centièmes.",
  depths: {
    discovery:
      "**Avec les mains** : 7 € pour 2 personnes — 3 € chacun, et l'euro restant se **casse** en pièces de 10 centimes : 5 chacun. $3{,}50$ € : la monnaie a toujours su diviser après la virgule.",
    standard:
      "**En image** : $7 \\div 2$ posé — $3$, reste $1$ ; je pose la **virgule** au quotient, j'abaisse un zéro (1 unité devient 10 dixièmes) : $10 \\div 2 = 5$. Quotient **3,5**, reste 0. Et le dividende décimal suit la même loi : $8{,}4 \\div 7$ — les unités ($8 \\div 7 = 1$ reste 1), la virgule au passage de la virgule, puis 14 dixièmes $\\div 7 = 2$ : **1,2**.",
    advanced:
      "**Dans la tête** : la vérification ne change pas — $2 \\times 3{,}5 = 7$ ✓ ; $7 \\times 1{,}2 = 8{,}4$ ✓. Mais une surprise guette : certaines divisions ne s'arrêtent **jamais** ($10 \\div 3 = 3{,}333…$) — on tronque alors au rang demandé. Toutes les divisions ne se laissent pas finir : première rencontre avec un infini de poche.",
  },
  keyIdea: "Quand il reste : virgule au quotient, **un zéro abaissé** (l'unité se monnaye en dixièmes), et la potence repart.",
  why:
    "Pourquoi a-t-on le droit d'abaisser un zéro ? Parce que $7 = 7{,}0 = 7{,}00$ : les zéros après la virgule ne changent rien au nombre, mais ils **libèrent des rangs** à partager. Abaisser un zéro, c'est convertir le reste en monnaie plus fine — exactement le geste du caissier qui casse un euro.",
  examples: [
    { title: "7 ÷ 2, jusqu'au bout", steps: [
      { p: "$7 \\div 2 = 3$, reste 1. Virgule au quotient, j'abaisse un zéro : 10 dixièmes." },
      { p: "$10 \\div 2 = 5$ dixièmes → quotient **3,5**, reste 0. Vérif : $2 \\times 3{,}5 = 7$ ✓." },
    ] },
    { title: "8,4 ÷ 7 (dividende décimal)", steps: [
      { p: "Unités : $8 \\div 7 = 1$, reste 1. Je passe la virgule (au quotient aussi)." },
      { p: "14 dixièmes $\\div 7 = 2$ → **1,2** — vérif : $7 \\times 1{,}2 = 8{,}4$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Au CM1, $7 \\div 2$ donnait « 3 reste 1 ». Que devient ce reste au CM2 ?", solution: "Il se **monnaye** : 1 unité = 10 dixièmes, et $10 \\div 2 = 5$ dixièmes → quotient complet **3,5**." },
    { tier: "warmup", prompt: "Pose et calcule $9 \\div 4$.", solution: "$9 \\div 4 = 2$ reste 1 ; virgule, zéro abaissé : $10 \\div 4 = 2$ reste 2 ; encore : $20 \\div 4 = 5$ → **2,25**." },
    { tier: "application", prompt: "Pose et calcule $8{,}4 \\div 7$, puis vérifie.", solution: "$8 \\div 7 = 1$ r. 1 ; virgule ; $14 \\div 7 = 2$ → **1,2**. Vérif : $7 \\times 1{,}2 = 8{,}4$ ✓." },
    { tier: "challenge", prompt: "Partage 25,5 € entre 3 personnes.", solution: "$25 \\div 3 = 8$ r. 1 ; virgule ; 15 dixièmes $\\div 3 = 5$ → **8,50 €** chacun — vérif : $3 \\times 8{,}5 = 25{,}5$ ✓." },
    { tier: "exam", prompt: "Calcule $10 \\div 3$ au centième près. Qu'observes-tu ?", solution: "$10 \\div 3 = 3$ r. 1 ; $10 \\div 3 = 3$ r. 1 ; $10 \\div 3 = 3$ r. 1… → **3,33** au centième, et le reste 1 revient **éternellement** : cette division ne finit jamais — on tronque au rang demandé." },
  ],
  practice: [
    { tier: "application", label: "Le quotient décimal", make: (r) => {
      const d = pick(r, [2, 4, 5]); const ent = randint(r, 3, 24);
      const dec = d === 5 ? pick(r, [1, 2, 3, 4]) * 2 : (d === 2 ? 1 : pick(r, [1, 2, 3]));
      const quotient = (d * ent + dec) / d;
      return { prompt: `Pose et calcule $${d * ent + dec} \\div ${d}$ (continue après la virgule).`, answer: quotient, solution: `Quotient entier ${ent}, reste ${dec} monnayé en dixièmes → **${String(quotient).replace(".", ",")}**. Vérif : $${d} \\times ${String(quotient).replace(".", ",")} = ${d * ent + dec}$ ✓.` };
    } },
    { tier: "challenge", label: "Dividende décimal", make: (r) => {
      const d = randint(r, 3, 8); const e = randint(r, 1, 9); const dx = randint(r, 1, 9);
      const N = d * e + (d * dx) / 10;
      return { prompt: `Pose et calcule $${String(N).replace(".", ",")} \\div ${d}$.`, answer: e + dx / 10, solution: `Unités : ${e} ; virgule ; dixièmes : ${dx} → **${e},${dx}**. Vérif : $${d} \\times ${e},${dx} = ${String(N).replace(".", ",")}$ ✓.` };
    } },
  ],
};

// — Posed decimal multiplication, double parentheses (programme: les quatre opérations CM2) —
const decimalTimes = {
  id: "numbers.primary.decimal-times",
  level: "primary", domain: "numbers",
  title: "Multiplier un décimal, parenthéser double",
  tagline: "24,7 × 36 : penser en dixièmes — et deux paires de parenthèses qui s'emboîtent.",
  prereqs: ["numbers.primary.parentheses", "numbers.primary.thousandths"],
  intuition:
    "Le ×décimal du CM1 (par un entier < 10) devient général : $24{,}7 \\times 36$. Le truc reste le même : **penser en dixièmes** — $247$ dixièmes $\\times 36 = 8\\,892$ dixièmes $= 889{,}2$. On pose comme avec des entiers, la virgule revient à la fin, guidée par les rangs.\n\nEt les parenthèses se dédoublent : $(12 + 8) \\times (15 - 9)$ — chaque paire d'abord, le produit ensuite.",
  depths: {
    discovery:
      "**Avec les mains** : 36 rubans de 24,7 cm — c'est 36 fois 247 **millimètres** : 8 892 mm, soit 889,2 cm. Changer d'unité pour calculer en entiers : la conversion est l'amie de la posée.",
    standard:
      "**En image** : la posée de $24{,}7 \\times 36$ s'écrit comme $247 \\times 36$ ($7 \\,402$… non : $247 \\times 36 = 8\\,892$ — par étages : $247 \\times 6 = 1\\,482$ et $247 \\times 30 = 7\\,410$). Puis le sens replace la virgule : on a compté des **dixièmes**, donc $8\\,892$ dixièmes $= 889{,}2$. L'estimation veille : $25 \\times 36 = 900$ — c'est cohérent ✓.",
    advanced:
      "**Dans la tête** : avec deux paires de parenthèses, chaque enclos se règle séparément — $(12 + 8) \\times (15 - 9) = 20 \\times 6 = 120$. Et l'estimation reste le garde-fou suprême : avant toute posée décimale, arrondir et flairer. Un résultat dix fois trop grand trahit toujours une virgule égarée — l'erreur favorite du chapitre, et la plus facile à attraper.",
  },
  keyIdea: "$24{,}7 \\times 36$ : poser $247 \\times 36$, puis rendre les **dixièmes** ($8\\,892$ dixièmes $= 889{,}2$). Estimer d'abord — la virgule égarée saute aux yeux.",
  why:
    "Pourquoi ne pose-t-on pas la virgule pendant la multiplication, comme dans l'addition ? Parce qu'additionner aligne des rangs (virgule sous virgule), mais multiplier **compte des paquets** : 36 paquets de 247 dixièmes. La virgule n'a rien à faire dans le décompte — elle revient à la traduction finale. Deux opérations, deux logiques.",
  examples: [
    { title: "24,7 × 36 par les dixièmes", steps: [
      { p: "Estimation : $25 \\times 36 \\approx 900$. Posée : $247 \\times 36 = 8\\,892$." },
      { p: "On comptait des dixièmes : $8\\,892$ dixièmes $= $ **889,2** — l'estimation valide ✓." },
    ] },
    { title: "Deux paires d'enclos", steps: [
      { p: "$(12 + 8) \\times (15 - 9)$ : chaque paire d'abord — $20$ et $6$." },
      { p: "$20 \\times 6 = $ **120**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour poser $24{,}7 \\times 36$, en quelle unité pense-t-on ?", solution: "En **dixièmes** : $24{,}7 = 247$ dixièmes — la posée devient entière, la virgule revient à la fin." },
    { tier: "warmup", prompt: "Calcule $(12 + 8) \\times (15 - 9)$.", solution: "Chaque paire d'abord : $20 \\times 6 = $ **120**." },
    { tier: "application", prompt: "Estime puis pose $24{,}7 \\times 36$.", solution: "Estimation $\\approx 25 \\times 36 = 900$. Posée : $247 \\times 36 = 8\\,892$ dixièmes $= $ **889,2** ✓." },
    { tier: "challenge", prompt: "Noa trouve $24{,}7 \\times 36 = 88{,}92$. Sans poser, montre l'erreur.", solution: "L'estimation crie : $25 \\times 36 \\approx 900$, pas 89 ! Une **virgule égarée** (un rang de trop) — le bon résultat est $889{,}2$." },
    { tier: "exam", prompt: "Calcule $(3{,}5 + 1{,}5) \\times (20 - 13)$ en expliquant l'ordre.", solution: "Enclos 1 : $3{,}5 + 1{,}5 = 5$. Enclos 2 : $20 - 13 = 7$. Produit : $5 \\times 7 = $ **35** — les parenthèses d'abord, toujours, même décimales." },
  ],
  practice: [
    { tier: "warmup", label: "Deux enclos", make: (r) => {
      const a = randint(r, 5, 15), b = randint(r, 2, 9), c = randint(r, 10, 20), d = randint(r, 2, c - 2);
      return { prompt: `Calcule $(${a} + ${b}) \\times (${c} - ${d})$.`, answer: (a + b) * (c - d), solution: `$${a + b} \\times ${c - d} = $ **${(a + b) * (c - d)}**.` };
    } },
    { tier: "application", label: "Décimal × entier, par les dixièmes", make: (r) => {
      const e = randint(r, 3, 40), dx = randint(r, 1, 9); const n = randint(r, 3, 12);
      const dixiemes = (10 * e + dx) * n;
      return { prompt: `Calcule $${e}{,}${dx} \\times ${n}$ (pense en dixièmes).`, answer: dixiemes / 10, solution: `$${10 * e + dx} \\times ${n} = ${dixiemes}$ dixièmes $= $ **${String(dixiemes / 10).replace(".", ",")}**.` };
    } },
  ],
};

// — Problem solving CM2 (programme: plusieurs étapes, préparation aux algorithmes) —
const problemsCm2 = {
  id: "numbers.primary.problems-cm2",
  level: "primary", domain: "numbers",
  title: "Problèmes : étapes en série, algorithmes en germe",
  tagline: "Reconnaître les procédures qui reviennent dans les problèmes à étapes.",
  prereqs: ["numbers.primary.problems-sense", "numbers.primary.division-decimal"],
  intuition:
    "Les structures du CM1 tiennent toujours — mots-pièges, vraisemblance, dénombrement, optimisation — mais les étapes s'allongent et le champ s'élargit (jusqu'à 999 999 999, décimaux, fractions).\n\nUne famille nouvelle entre : les problèmes **préparant aux algorithmes** — ceux où une même procédure se **répète** : « un bambou de 1 m double chaque semaine ; quand dépasse-t-il 10 m ? » Semaine après semaine, le même geste, jusqu'à la condition d'arrêt.",
  depths: {
    discovery:
      "**Avec les mains** : le bambou — 1, 2, 4, 8, **16** : quatre doublements et la barre des 10 m tombe. Compter les répétitions d'un geste, c'est déjà exécuter un algorithme : *tant que* la hauteur est sous 10, *doubler*.",
    standard:
      "**En image** : les chaînes s'allongent — des courses à 12,45 € et 7,80 €, payées avec un billet, la monnaie partagée en 3… chaque étape nourrit la suivante, et le schéma en barres garde le fil. La **régulation** clôt toujours : le résultat est-il possible ? vraisemblable ?",
    advanced:
      "**Dans la tête** : le problème-algorithme se reconnaît à sa question — « combien de fois ? », « au bout de combien d'étapes ? », « quand dépasse-t-on ? ». La réponse n'est pas un calcul mais un **comptage de répétitions** : on déroule la procédure en notant chaque état. C'est la pensée informatique en habits de problème — et le pont direct vers tes programmes de calcul.",
  },
  keyIdea: "Quand une procédure se **répète**, dérouler étape par étape et compter — la condition d'arrêt est la vraie question.",
  why:
    "Pourquoi appeler ça « préparer aux algorithmes » ? Parce qu'un algorithme n'est rien d'autre : des instructions répétées jusqu'à une condition d'arrêt. Le bambou qui double, c'est une boucle *tant que* déguisée en jardinage — l'ordinateur fera pareil, juste plus vite et sans se lasser.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", whole: 30, parts: [20.25, 9.75], unknown: "part" }, caption: "Payé 30 € : la barre se coupe en courses (20,25 €) et rendu — le « ? » se déduit du tout, avant de partager en 3." },
  ],
  examples: [
    { title: "Le bambou qui double", steps: [
      { p: "1 m → 2 → 4 → 8 → 16 : je déroule en notant chaque semaine." },
      { p: "16 > 10 au bout de **4 doublements** : la condition d'arrêt répond à la question." },
    ] },
    { title: "La chaîne de monnaie", steps: [
      { p: "Courses : $12{,}45 + 7{,}80 = 20{,}25$ €. Payé 30 € : rendu $30 - 20{,}25 = 9{,}75$ €." },
      { p: "Partagé en 3 : $9{,}75 \\div 3 = 3{,}25$ € chacun — régulation : $3 \\times 3{,}25 = 9{,}75$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "À quoi reconnaît-on un problème « préparant aux algorithmes » ?", solution: "À sa question : « **combien d'étapes ?** », « quand dépasse-t-on ? » — une même procédure se répète jusqu'à une condition d'arrêt." },
    { tier: "warmup", prompt: "Un bambou de 1 m double chaque semaine. Au bout de combien de semaines dépasse-t-il 10 m ?", solution: "1 → 2 → 4 → 8 → 16 : **4 semaines** — dérouler et compter." },
    { tier: "application", prompt: "Courses : 12,45 € et 7,80 €, payées avec 30 €. La monnaie est partagée également entre 3 personnes. Combien chacune ?", solution: "Total $12{,}45 + 7{,}80 = 20{,}25$ € ; rendu $30 - 20{,}25 = 9{,}75$ € ; partagé : $9{,}75 \\div 3 = $ **3,25 €** chacune — trois étapes, et la régulation confirme : $3 \\times 3{,}25 = 9{,}75$ ✓." },
    { tier: "challenge", prompt: "On retire 7 chaque fois à partir de 100. Combien de retraits avant de passer sous 30 ?", solution: "100, 93, 86, 79, 72, 65, 58, 51, 44, 37, **30**, 23 : sous 30 au **11e retrait** — ou par division : $(100 - 30) \\div 7 = 10$ et il en faut un de plus." },
    { tier: "exam", prompt: "Un nénuphar double sa surface chaque jour et couvre l'étang en 12 jours. Quand en couvrait-il la moitié ?", solution: "Au jour **11** — la veille ! S'il double chaque jour, la moitié précède le tout d'un seul doublement. L'intuition crie « 6 jours » ; la procédure déroulée à rebours corrige : penser en algorithme protège du réflexe." },
  ],
  practice: [
    { tier: "application", label: "Compter les répétitions", make: (r) => {
      const start = randint(r, 60, 120), step = randint(r, 6, 12), seuil = randint(r, 15, 35);
      let n = 0, v = start; while (v >= seuil) { v -= step; n++; }
      return { prompt: `On part de ${start} et on retire ${step} à chaque étape. Combien d'étapes pour passer sous ${seuil} ?`, answer: n, solution: `Dérouler (ou diviser l'écart ${start - seuil} par ${step} et ajuster) : **${n} étapes** — on finit à ${v}.` };
    } },
    { tier: "challenge", label: "La chaîne décimale", make: (r) => {
      const a = randint(r, 8, 30) + randint(r, 1, 9) / 10; const b = randint(r, 5, 20) + randint(r, 1, 9) / 10;
      const billet = pick(r, [50, 100]);
      const rendu = Math.round((billet - a - b) * 10) / 10;
      return { prompt: `Courses : ${String(a).replace(".", ",")} € et ${String(b).replace(".", ",")} €, payées avec ${billet} €. Combien rend-on ?`, answer: rendu, solution: `Total $${String(Math.round((a + b) * 10) / 10).replace(".", ",")}$ € ; rendu : $${billet} - ${String(Math.round((a + b) * 10) / 10).replace(".", ",")} = $ **${String(rendu).replace(".", ",")} €** — et c'est moins que ${billet} € : plausible ✓.` };
    } },
  ],
};

export default [mentalCm2, divisionDecimal, decimalTimes, problemsCm2];
