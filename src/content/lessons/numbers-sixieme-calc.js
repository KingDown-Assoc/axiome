// Field "Numbers" — MIDDLE module (6e year), part 2: calculation. Official cycle-3
// programme (2025): the product of two decimals (beyond iterated addition — meaning
// via the area of a rectangle, technique via decomposition into integer products,
// automated comma placement controlled by orders of magnitude), multiplying by
// 0.1, 0.01, 0.001 and its link with dividing by 10, 100, 1000, and euclidean
// division by a two-digit divisor (partition and quotition senses, calculator
// beyond simple cases, sexagesimal conversions as a natural application).
import { randint, pick } from "../../core/exercises.js";

// — The product of two decimals (programme: sens par l'aire, technique, virgule, contrôle) —
const decimalProduct = {
  id: "numbers.middle.decimal-product",
  level: "middle", domain: "numbers",
  title: "Multiplier deux décimaux",
  tagline: "0,5 × 0,3 = 0,15 — multiplier peut rapetisser, et l'aire explique pourquoi.",
  prereqs: ["numbers.primary.decimal-times", "applied.primary.area-units"],
  intuition:
    "Jusqu'ici, multiplier répétait : $3 \\times 2{,}4$ = trois fois 2,4. Mais $0{,}5 \\times 0{,}3$ — une demi-fois 0,3 ?! L'addition itérée rend l'âme.\n\nLe nouveau sens vient de l'**aire** : $0{,}5 \\times 0{,}3$ est l'aire d'un rectangle de 0,5 sur 0,3 — un coin du carré unité quadrillé en centièmes : **15 carreaux sur 100** : $0{,}15$. Multiplier deux nombres plus petits que 1 donne plus petit encore.",
  depths: {
    discovery:
      "**Avec les mains** : le carré unité (1 sur 1) quadrillé en dixièmes — colorie un rectangle de 5 dixièmes sur 3 dixièmes : il couvre $5 \\times 3 = 15$ petits carreaux, et chaque carreau est un **centième** du carré : $0{,}15$. L'aire donne au produit son nouveau sens.",
    standard:
      "**En image** : la technique décompose vers l'entier — $2{,}4 \\times 1{,}3 = 24$ dixièmes $\\times\\ 13$ dixièmes $= 312$ **centièmes** $= 3{,}12$ : dixième × dixième = centième, les rangs se multiplient. D'où la règle automatisée : poser $24 \\times 13$, puis placer la virgule pour **autant de chiffres décimaux que les deux facteurs réunis** (1 + 1 = 2).",
    advanced:
      "**Dans la tête** : l'**ordre de grandeur** contrôle tout — $2{,}4 \\times 1{,}3 \\approx 2 \\times 1{,}5 = 3$ : si la posée affiche 31,2 ou 0,312, la virgule a fui. Réflexe absolu avant et après chaque produit. Et la commutativité ($a \\times b = b \\times a$) se **voit** sur le rectangle : tourner la feuille d'un quart de tour ne change pas l'aire — la propriété n'est plus un décret, c'est une évidence géométrique.",
  },
  keyIdea: "$2{,}4 \\times 1{,}3$ : poser $24 \\times 13 = 312$, puis **autant de décimales que les deux facteurs réunis** (dixième × dixième = centième). L'ordre de grandeur juge.",
  why:
    "Pourquoi « multiplier » peut-il rapetisser, alors que le mot promet d'agrandir ? Parce que le sens a grandi : $0{,}5 \\times 0{,}3$, c'est « prendre la moitié de 0,3 » — une fraction d'une fraction. Le mot vient d'un temps où l'on ne multipliait que des entiers ; le concept, lui, a continué sa route. En mathématiques, les définitions s'étendent — les intuitions doivent suivre.",
  examples: [
    { title: "0,5 × 0,3 par l'aire", steps: [
      { p: "Rectangle de 5 dixièmes sur 3 dixièmes dans le carré unité : $5 \\times 3 = 15$ carreaux." },
      { p: "Chaque carreau vaut un centième : $0{,}5 \\times 0{,}3 = $ **0,15** — plus petit que chaque facteur." },
    ] },
    { title: "2,4 × 1,3 par les rangs", steps: [
      { p: "Ordre de grandeur : $\\approx 2 \\times 1{,}5 = 3$. Posée entière : $24 \\times 13 = 312$." },
      { p: "Dixième × dixième = centième : $312$ centièmes $= $ **3,12** ✓ (cohérent avec 3)." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi $0{,}5 \\times 0{,}3$ donne-t-il un résultat plus petit que 0,3 ?", solution: "Parce que multiplier par $0{,}5$, c'est prendre **la moitié** : la moitié de 0,3 fait 0,15. L'aire le montre : un rectangle de 0,5 sur 0,3 ne couvre que 15 centièmes du carré unité." },
    { tier: "warmup", prompt: "Calcule $0{,}4 \\times 0{,}2$ en raisonnant en dixièmes.", solution: "$4$ dixièmes $\\times 2$ dixièmes $= 8$ **centièmes** $= $ **0,08** — dixième × dixième = centième." },
    { tier: "application", prompt: "Estime puis calcule $2{,}4 \\times 1{,}3$.", solution: "Estimation $\\approx 3$. Posée : $24 \\times 13 = 312$, deux décimales en tout : **3,12** ✓." },
    { tier: "challenge", prompt: "Noa pose $3{,}25 \\times 2{,}4$ et hésite entre 78, 7,8 et 0,78. Tranche sans poser.", solution: "Ordre de grandeur : $3 \\times 2{,}5 \\approx 7{,}5$ → **7,8** — et la règle confirme : $325 \\times 24 = 7\\,800$, trois décimales en tout : 7,800." },
    { tier: "exam", prompt: "Un carrelage coûte 24,50 € le m². Combien pour 3,6 m² ? Contrôle ton résultat.", solution: "$24{,}50 \\times 3{,}6$ : posée $2\\,450 \\times 36 = 88\\,200$, trois décimales : **88,20 €**. Contrôle : $\\approx 25 \\times 3{,}5 = 87{,}5$ ✓ — l'ordre de grandeur veille." },
  ],
  practice: [
    { tier: "warmup", label: "Dixième × dixième", make: (r) => {
      const a = randint(r, 2, 9), b = randint(r, 2, 9);
      return { prompt: `Calcule $0{,}${a} \\times 0{,}${b}$.`, answer: (a * b) / 100, solution: `$${a} \\times ${b} = ${a * b}$ centièmes $= $ **${String(a * b / 100).replace(".", ",")}**.` };
    } },
    { tier: "application", label: "Produit complet et virgule", make: (r) => {
      const a = randint(r, 11, 49) / 10; const b = randint(r, 11, 39) / 10;
      const prod = Math.round(a * 10 * b * 10) / 100;
      return { prompt: `Calcule $${String(a).replace(".", ",")} \\times ${String(b).replace(".", ",")}$ (estime d'abord !).`, answer: prod, solution: `$${a * 10} \\times ${b * 10} = ${a * 10 * b * 10}$, deux décimales : **${String(prod).replace(".", ",")}** — et l'estimation ($\\approx ${Math.round(a) * Math.round(b)}$) valide.` };
    } },
  ],
};

// — Multiplying by 0.1, 0.01, 0.001 (programme: lien avec la division par 10, 100, 1000) —
const timesTenth = {
  id: "numbers.middle.times-tenth",
  level: "middle", domain: "numbers",
  title: "Multiplier par 0,1 — c'est diviser par 10",
  tagline: "Le pont secret entre deux opérations que tout opposait.",
  prereqs: ["numbers.middle.decimal-product"],
  intuition:
    "$\\times\\ 0{,}1$ : prendre **un dixième de** — exactement ce que fait $\\div\\ 10$. Deux écritures, un seul geste : $47 \\times 0{,}1 = 47 \\div 10 = 4{,}7$.\n\nLa famille au complet : $\\times\\ 0{,}01 = \\div\\ 100$ ; $\\times\\ 0{,}001 = \\div\\ 1\\,000$ — multiplier par un petit, c'est diviser par son inverse.",
  depths: {
    discovery:
      "**Avec les mains** : 0,1 est la fraction $\\frac{1}{10}$ en habit décimal — et « $\\frac{1}{10}$ de 47 », tu le calcules depuis le CM1 : $47 \\div 10$. Rien de neuf, tout se rejoint.",
    standard:
      "**En image** : les chiffres glissent d'un rang vers le bas, comme pour $\\div 10$ — $3{,}25 \\times 0{,}1 = 0{,}325$ ; $608 \\times 0{,}01 = 6{,}08$ ; $4\\,500 \\times 0{,}001 = 4{,}5$. La règle des décimales le confirme : $47 \\times 0{,}1$ → $47 \\times 1 = 47$, une décimale : $4{,}7$ ✓.",
    advanced:
      "**Dans la tête** : ce pont enterre définitivement le vieux slogan « multiplier agrandit » — $\\times\\ 0{,}1$ **rapetisse**, et c'est cohérent : prendre un dixième de quelque chose en laisse moins. Multiplication et division ne sont plus deux mondes opposés mais les deux sens d'une même route : multiplier par $n$ ↔ diviser par $n$, multiplier par $\\frac{1}{n}$ ↔ diviser par $n$. Au collège, cette symétrie deviendra la notion d'**inverse**.",
  },
  keyIdea: "$\\times\\ 0{,}1 = \\div\\ 10$ ; $\\times\\ 0{,}01 = \\div\\ 100$ ; $\\times\\ 0{,}001 = \\div\\ 1\\,000$ — multiplier par un dixième, c'est prendre un dixième.",
  why:
    "Pourquoi deux écritures pour un même geste ? Parce que chacune éclaire un contexte : « 47 articles à 0,10 € » se pense en multiplication ($47 \\times 0{,}1$) ; « partager 47 en 10 » se pense en division. Le calcul est identique, le **récit** diffère — et savoir traduire l'un en l'autre, c'est choisir toujours le chemin le plus court.",
  examples: [
    { title: "47 × 0,1, deux lectures", steps: [
      { p: "Lecture opérateur : un dixième de 47 — $47 \\div 10 = 4{,}7$." },
      { p: "Lecture technique : $47 \\times 1 = 47$, une décimale → $4{,}7$ ✓ — même nombre." },
    ] },
    { title: "La famille au complet", steps: [
      { p: "$608 \\times 0{,}01 = 6{,}08$ (deux rangs plus bas)." },
      { p: "$4\\,500 \\times 0{,}001 = 4{,}5$ (trois rangs) — multiplier par petit, descendre d'autant." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi $47 \\times 0{,}1$ vaut-il la même chose que $47 \\div 10$ ?", solution: "Parce que $0{,}1 = \\frac{1}{10}$ : multiplier par $0{,}1$, c'est prendre **un dixième de** 47 — exactement la division par 10. Résultat : **4,7**." },
    { tier: "warmup", prompt: "Calcule $3{,}25 \\times 0{,}1$ puis $608 \\times 0{,}01$.", solution: "**0,325** (un rang plus bas) ; **6,08** (deux rangs) — les chiffres glissent comme pour ÷10 et ÷100." },
    { tier: "application", prompt: "Traduis en division puis calcule : $7\\,200 \\times 0{,}001$.", solution: "$7\\,200 \\div 1\\,000 = $ **7,2** — trois rangs vers le bas." },
    { tier: "challenge", prompt: "« Multiplier agrandit toujours. » Réfute avec deux contre-exemples de cette leçon.", solution: "$47 \\times 0{,}1 = 4{,}7 < 47$ et $0{,}5 \\times 0{,}3 = 0{,}15 < 0{,}3$ — multiplier par un nombre **plus petit que 1** rapetisse : le slogan date des entiers." },
    { tier: "exam", prompt: "Sans calculatrice : 84 timbres à 0,01 € pièce, et 84 bonbons à 0,10 € pièce. Quel coût pour chaque lot ?", solution: "$84 \\times 0{,}01 = 84 \\div 100 = $ **0,84 €** ; $84 \\times 0{,}10 = 84 \\div 10 = $ **8,40 €** — les petits prix se paient en divisions." },
  ],
  practice: [
    { tier: "warmup", label: "Le pont en action", make: (r) => {
      const n = randint(r, 12, 980); const f = pick(r, [[0.1, 10], [0.01, 100], [0.001, 1000]]);
      return { prompt: `Calcule $${n} \\times ${String(f[0]).replace(".", ",")}$.`, answer: n / f[1], solution: `$\\times\\ ${String(f[0]).replace(".", ",")} = \\div\\ ${f[1]}$ : **${String(n / f[1]).replace(".", ",")}**.` };
    } },
  ],
};

// — Euclidean division by a two-digit divisor (programme: diviseur < 100, sens, durées) —
const divisionLarge = {
  id: "numbers.middle.division-large",
  level: "middle", domain: "numbers",
  title: "Diviser par un nombre à deux chiffres",
  tagline: "La potence affronte les grands diviseurs — et convertit les secondes en heures.",
  prereqs: ["numbers.primary.division-decimal"],
  intuition:
    "Le diviseur grandit : $3\\,847 \\div 64$. La potence tient, mais chaque chiffre du quotient demande une **estimation** : combien de fois 64 dans 384 ? Penser « combien de fois 6 dans 38 » → essayer 6 : $64 \\times 6 = 384$ — pile.\n\nEt deux **sens** à distinguer : la division-**partition** (84 € pour 12 personnes → la valeur d'une part) et la division-**quotition** (84 € en parts de 12 € → le nombre de parts). Même calcul, deux questions.",
  depths: {
    discovery:
      "**Avec les mains** : 84 jetons. Partition : 12 tas égaux — combien dans chaque ? Quotition : des tas de 12 — combien de tas ? Les deux gestes diffèrent, le quotient est le même : **7**. Une opération, deux histoires.",
    standard:
      "**En image** : $3\\,847 \\div 64$ posé — $384 \\div 64$ : essai 6 ($64 \\times 6 = 384$), reste 0 ; j'abaisse le 7 : $7 \\div 64 \\to 0$, reste 7. Quotient **60**, reste **7** — vérification : $64 \\times 60 + 7 = 3\\,847$ ✓. L'estimation guide chaque chiffre ; quand elle déborde, on corrige d'un cran (essai trop grand → produit qui dépasse → un de moins).",
    advanced:
      "**Dans la tête** : l'application royale — **convertir le temps** : $3\\,847$ s $\\div 60 = 64$ min reste $7$ s ; puis $64 \\div 60 = 1$ h reste $4$ min → **1 h 4 min 7 s**. Deux divisions par 64… non : par 60 — le système sexagésimal de Babylone, vivant dans ta montre. Et au-delà des cas raisonnables, la **calculatrice** est légitime : la technique sert le sens, pas l'inverse.",
  },
  keyIdea: "Diviseur à deux chiffres : **estimer** chaque chiffre du quotient (et corriger d'un cran si ça déborde). Partition = valeur d'une part ; quotition = nombre de parts.",
  why:
    "Pourquoi apprendre la potence à deux chiffres à l'ère des calculatrices ? Pour posséder l'**estimation** : qui sait flairer « combien de fois 64 dans 384 » détecte la calculatrice qui a reçu un mauvais chiffre. La machine calcule ; l'humain contrôle — et le contrôle exige d'avoir su faire.",
  examples: [
    { title: "3 847 ÷ 64, posé", steps: [
      { p: "$384 \\div 64$ : essai 6 — $64 \\times 6 = 384$, reste 0. J'abaisse le 7." },
      { p: "$7 \\div 64 \\to 0$ reste 7 : quotient **60**, reste **7** — $64 \\times 60 + 7 = 3\\,847$ ✓." },
    ] },
    { title: "3 847 secondes en h min s", steps: [
      { p: "$3\\,847 \\div 60 = 64$ min, reste $7$ s." },
      { p: "$64 \\div 60 = 1$ h, reste $4$ min → **1 h 4 min 7 s** — Babylone dans ta montre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "« 84 € pour 12 personnes » et « 84 € en billets de 12 € » : quelle question pose chaque division ?", solution: "La première cherche **la valeur d'une part** (partition : 7 € chacun) ; la seconde **le nombre de parts** (quotition : 7 billets). Même calcul $84 \\div 12 = 7$, deux histoires." },
    { tier: "warmup", prompt: "Pose et calcule $989 \\div 43$.", solution: "$98 \\div 43$ : essai 2 ($86$), reste 12 ; j'abaisse : $129 \\div 43 = 3$ ($129$), reste 0 → quotient **23**, reste **0** — $43 \\times 23 = 989$ ✓." },
    { tier: "application", prompt: "Pose et calcule $3\\,847 \\div 64$, puis vérifie.", solution: "Quotient **60**, reste **7** — $64 \\times 60 + 7 = 3\\,847$ ✓." },
    { tier: "challenge", prompt: "Convertis 3 847 secondes en heures, minutes et secondes.", solution: "$3\\,847 \\div 60 = 64$ min r. $7$ ; $64 \\div 60 = 1$ h r. $4$ → **1 h 4 min 7 s** — deux divisions euclidiennes par 60." },
    { tier: "exam", prompt: "Un car transporte 55 passagers. Combien de cars pour 1 230 élèves ? (attention au reste !)", solution: "$1\\,230 \\div 55 = 22$ reste $20$ : 22 cars pleins **et 20 élèves debout sur le quai** → il faut **23 cars** — en quotition, le reste impose souvent d'arrondir au-dessus : le sens décide, pas le quotient seul." },
  ],
  practice: [
    { tier: "application", label: "Grand diviseur", make: (r) => {
      const d = randint(r, 12, 89); const q = randint(r, 11, 85); const rr = randint(r, 0, Math.min(d - 1, 30));
      return { prompt: `Pose et calcule $${d * q + rr} \\div ${d}$. Réponds par le quotient.`, answer: q, solution: `Quotient **${q}**, reste ${rr} — vérification : $${d} \\times ${q} + ${rr} = ${d * q + rr}$ ✓.` };
    } },
    { tier: "challenge", label: "Babylone dans la montre", make: (r) => {
      const m = randint(r, 5, 50), s = randint(r, 1, 59); const total = 60 * m + s;
      return { prompt: `Convertis ${total} secondes en minutes et secondes. Réponds par le nombre de minutes.`, answer: m, solution: `$${total} \\div 60 = $ **${m} min**, reste ${s} s — la division euclidienne par 60.` };
    } },
  ],
};

export default [decimalProduct, timesTenth, divisionLarge];
