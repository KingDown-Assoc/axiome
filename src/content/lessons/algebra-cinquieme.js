// Field "Algebra" — MIDDLE module (5e year): literal calculus and first equations.
// Official cycle-4 programme: producing formulas, substituting, testing whether an
// equality holds, distinguishing sums from products, exploiting k(a±b) = ka±kb to
// expand or factor, reducing ax + b, PROVING a general property by literal
// calculus, using a COUNTEREXAMPLE; giving the letter the status of unknown,
// modelling gap problems as ax = c or x + b = c, solving by arithmetic methods
// based on inverse operations — Al-Khwarizmi's al-jabr as the historical thread.
import { randint, pick } from "../../core/exercises.js";

// — Literal calculus (programme: développer, factoriser, réduire, démontrer) —
const calculLitteral = {
  id: "algebra.middle.calcul-litteral",
  level: "middle", domain: "algebra",
  title: "Le calcul littéral",
  tagline: "3x + 5x = 8x : une lettre permet de calculer et de démontrer en général.",
  prereqs: ["applied.middle.formulas", "algebra.middle.pre-algebra"],
  intuition:
    "La lettre quitte les formules toutes faites : tu vas en **produire** ($n + 1$ : le successeur de $n$ ; $4c$ : le périmètre du carré) et **calculer avec elle**.\n\nDeux gestes fondateurs : **réduire** — $3x + 5x = 8x$ (trois x et cinq x font huit x, comme des pommes) — et **distribuer** — $k(a + b) = ka + kb$, ta distributivité numérique promue en règle universelle, qui **développe** vers la somme ou **factorise** vers le produit.",
  depths: {
    discovery:
      "**Avec les mains** : teste une égalité — $3x + 5 = 8x$, vraie ? Pour $x = 1$ : $8 = 8$ ✓… mais pour $x = 2$ : $11 \\neq 16$ ✗. Vraie **parfois** n'est pas vraie **toujours** : un seul **contre-exemple** suffit à tuer une règle générale — c'est l'arme la plus économique des mathématiques.",
    standard:
      "**En image** : la structure avant les nombres — $3x + 5$ est une **somme** (on ne peut pas la compacter : $3x$ et $5$ ne sont pas de la même espèce !) ; $3(x + 5)$ est un **produit**. Développer transforme l'un en l'autre : $3(x + 5) = 3x + 15$ ; factoriser fait le chemin inverse : $7a + 7b = 7(a + b)$. Et réduire ne mélange jamais les espèces : $3x + 5x = 8x$ ✓, mais $3x + 5$ reste $3x + 5$.",
    advanced:
      "**Dans la tête** : la lettre **démontre** — le programme « choisis un nombre ; ajoute 3 ; multiplie par 2 ; retire le double du nombre choisi » donne 6, toujours. Pourquoi ? Appelle le nombre $x$ : $2(x + 3) - 2x = 2x + 6 - 2x = 6$ — le $x$ s'évapore, le 6 reste, pour **tous** les nombres de l'univers d'un coup. Mille essais numériques suggèrent ; une ligne de calcul littéral **prouve**. C'est le saut de la 5e : la lettre n'est plus une place vide, c'est une machine à vérités générales.",
  },
  keyIdea: "Réduire : $ax + bx = (a+b)x$ — jamais $3x + 5 = 8x$ ! Distribuer : $k(a \\pm b) = ka \\pm kb$ (développer ↔ factoriser). Un contre-exemple tue ; un calcul littéral **prouve**.",
  why:
    "Pourquoi calculer avec des lettres alors que les nombres marchent si bien ? Parce qu'un calcul numérique vérifie **un** cas, et un calcul littéral les vérifie **tous** : $2(x+3) - 2x = 6$ est une infinité de vérifications en une ligne. Les mathématiques ne collectionnent pas les exemples — elles fabriquent des énoncés éternels, et la lettre est leur outil.",
  examples: [
    { title: "Développer, factoriser", steps: [
      { p: "Développer : $3(x + 5) = 3x + 15$ — le 3 visite chaque terme." },
      { p: "Factoriser : $7a + 7b = 7(a + b)$ — le facteur commun sort, le produit revient." },
    ] },
    { title: "Le programme démasqué", steps: [
      { p: "« $x$ ; ajoute 3 ; multiplie par 2 ; retire $2x$ » : $2(x + 3) - 2x$." },
      { p: "$= 2x + 6 - 2x = $ **6**, pour tout $x$ — démontré, pas constaté." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Produis une formule pour : le double de $n$ ; le successeur de $n$ ; le périmètre d'un carré de côté $c$.", solution: "$2n$ ; $n + 1$ ; $4c$ — la lettre capture la règle, les nombres viendront s'y glisser." },
    { tier: "warmup", prompt: "Réduis si possible : $3x + 5x$ ; $7y - 2y$ ; $3x + 5$.", solution: "$8x$ ; $5y$ ; et $3x + 5$ **ne se réduit pas** — des $x$ et des unités sont des espèces différentes : on ne compacte que le même." },
    { tier: "application", prompt: "Développe $5(x + 4)$ puis factorise $9a + 9b$.", solution: "$5x + 20$ ; $9(a + b)$ — la distributivité dans les deux sens : développer étale, factoriser rassemble." },
    { tier: "challenge", prompt: "L'égalité $3x + 5 = 8x$ est-elle toujours vraie ? Teste $x = 1$ puis $x = 2$ et conclus.", solution: "$x = 1$ : $8 = 8$ ✓ ; $x = 2$ : $11 \\neq 16$ ✗ — **un contre-exemple suffit** : l'égalité n'est pas une règle générale (elle n'est vraie que pour $x = 1$)." },
    { tier: "exam", prompt: "Démontre que le programme « choisis $x$ ; ajoute 3 ; multiplie par 2 ; retire le double de $x$ » donne toujours 6.", solution: "$2(x + 3) - 2x = 2x + 6 - 2x = $ **6** — le $x$ se développe puis s'annule : le résultat ne dépend plus du nombre choisi. Une ligne de calcul littéral vaut l'infinité des essais numériques : c'est une **démonstration**." },
  ],
  practice: [
    { tier: "warmup", label: "Compacter le même", make: (r) => {
      const a = randint(r, 2, 9); const b = randint(r, 2, 9);
      return { prompt: `Réduis $${a}x + ${b}x$. Réponds par le coefficient de $x$.`, answer: a + b, solution: `$${a}x + ${b}x = ${a + b}x$ — coefficient **${a + b}**.` };
    } },
    { tier: "application", label: "Développer", make: (r) => {
      const k = randint(r, 2, 9); const b = randint(r, 2, 12);
      return { prompt: `Développe $${k}(x + ${b})$. Réponds par le terme constant.`, answer: k * b, solution: `$${k}x + ${k * b}$ — le ${k} visite chaque terme : constante **${k * b}**.` };
    } },
    { tier: "challenge", label: "Substituer pour tester", make: (r) => {
      const a = randint(r, 2, 6); const b = randint(r, 1, 9); const x = randint(r, 2, 8);
      return { prompt: `Que vaut $${a}x + ${b}$ pour $x = ${x}$ ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b}** — substituer, puis priorités.` };
    } },
  ],
};

// — First equations (programme: lettre inconnue, ax = c et x + b = c, Al-Khwarizmi) —
const equations = {
  id: "algebra.middle.equations",
  level: "middle", domain: "algebra",
  title: "Les premières équations",
  tagline: "x + 19 = 52 — remonter par l'opération inverse.",
  prereqs: ["algebra.middle.calcul-litteral", "numbers.middle.fraction-quotient"],
  intuition:
    "La lettre prend son statut le plus célèbre : l'**inconnue** — un nombre précis, caché, à débusquer. Une **équation** est une égalité qui le tient prisonnier : $x + 19 = 52$.\n\nLa clé : l'**opération inverse** — on a ajouté 19 ? On retire 19 : $x = 52 - 19 = 33$. On a multiplié par 4 ($4x = 60$) ? On divise : $x = 60 \\div 4 = 15$. Résoudre, c'est remonter la machine.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", whole: 52, parts: [19, 33], unknown: "part" }, caption: "L'équation x + 19 = 52 en barres : le tout 52, une part connue 19 — touche le « ? » : l'inconnue se déduit par l'opération inverse." },
  ],
  depths: {
    discovery:
      "**Avec les mains** : le schéma en barres voit l'équation — une barre de 52, dont un morceau vaut 19 : le morceau caché se lit sur le dessin, $52 - 19 = 33$. L'équation est un dessin mis en symboles ; tes égalités à trous du CM ($2 + ? = 7$) étaient déjà des équations qui s'ignoraient.",
    standard:
      "**En image** : **modéliser** d'abord — « 4 carnets identiques coûtent 60 € » devient $4x = 60$ ; « après avoir dépensé 19 €, il me reste 33 € » devient $x - 19 = 33$. Puis remonter : $4x = 60 \\to x = 60 \\div 4 = 15$ ; $x - 19 = 33 \\to x = 33 + 19 = 52$. Et toujours **vérifier** en substituant : $4 \\times 15 = 60$ ✓ — l'équation elle-même juge la solution.",
    advanced:
      "**Dans la tête** : ce geste a un acte de naissance — Bagdad, vers 820 : Al-Khwarizmi nomme l'inconnue *la chose* (al-shay') et baptise l'art de la traquer **al-jabr** (« la restauration » — rétablir l'équilibre de l'égalité) : notre mot *algèbre*. Et ta fraction-quotient de 6e était déjà une solution d'équation : $4x = 3$ a pour réponse exacte $x = \\frac{3}{4}$ — le nombre inventé pour ça. Équation et nombre se fabriquent l'un l'autre depuis toujours.",
  },
  keyIdea: "Modéliser ($x + b = c$ ou $ax = c$), remonter par l'**opération inverse** ($x = c - b$ ; $x = c \\div a$), **vérifier** en substituant.",
  why:
    "Pourquoi des équations, quand l'arithmétique résout déjà tant ? Parce qu'elles renversent le sens du travail : l'arithmétique part des données et avance vers le résultat ; l'équation **part du résultat** et nomme l'inconnu pour remonter. Tous les problèmes « j'ai pensé à un nombre… » et la moitié de la physique se résolvent en marche arrière — l'équation est le véhicule de la marche arrière.",
  examples: [
    { title: "x + 19 = 52", steps: [
      { p: "On a ajouté 19 à l'inconnue : l'inverse est de retirer 19." },
      { p: "$x = 52 - 19 = $ **33** — vérification : $33 + 19 = 52$ ✓." },
    ] },
    { title: "Modéliser puis remonter", steps: [
      { p: "« 4 carnets identiques coûtent 60 € » : $4x = 60$." },
      { p: "$x = 60 \\div 4 = $ **15 €** — l'inverse de × est ÷, et $4 \\times 15 = 60$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "En quoi $2 + \\,? = 7$ et $x + 2 = 7$ sont-ils le même problème ?", solution: "Le trou **est** l'inconnue : seule l'écriture change — la lettre $x$ remplace le « ? ». Résolution identique : l'opération inverse, $x = 7 - 2 = $ **5**." },
    { tier: "warmup", prompt: "Résous : $x + 19 = 52$ ; $x - 7 = 15$ ; $4x = 60$.", solution: "$x = 52 - 19 = $ **33** ; $x = 15 + 7 = $ **22** ; $x = 60 \\div 4 = $ **15** — chaque opération se remonte par son inverse." },
    { tier: "application", prompt: "Modélise par une équation puis résous : « En ajoutant 2,5 kg à ma valise, elle atteint 23 kg. »", solution: "$x + 2{,}5 = 23$ → $x = 23 - 2{,}5 = $ **20,5 kg** — modéliser, remonter, et vérifier : $20{,}5 + 2{,}5 = 23$ ✓." },
    { tier: "challenge", prompt: "Résous $5x = 3$. Quel type de nombre obtiens-tu ?", solution: "$x = 3 \\div 5 = \\frac{3}{5} = 0{,}6$ — la **fraction-quotient** de 6e : exactement le nombre inventé pour que $5x = 3$ ait une solution. Vérification : $5 \\times \\frac{3}{5} = 3$ ✓." },
    { tier: "exam", prompt: "« Je pense à un nombre, je le multiplie par 7, j'obtiens 91. » Modélise, résous, vérifie — et nomme la discipline née de ce geste.", solution: "$7x = 91$ → $x = 91 \\div 7 = $ **13** ; vérification : $7 \\times 13 = 91$ ✓. Traquer *la chose* cachée en restaurant l'équilibre : **al-jabr**, l'algèbre d'Al-Khwarizmi (Bagdad, vers 820) — tu viens de refaire son geste fondateur." },
  ],
  practice: [
    { tier: "warmup", label: "Remonter l'addition", make: (r) => {
      const b = randint(r, 5, 40); const x = randint(r, 5, 60);
      return { prompt: `Résous $x + ${b} = ${x + b}$.`, answer: x, solution: `$x = ${x + b} - ${b} = $ **${x}** — l'inverse du + est le −.` };
    } },
    { tier: "application", label: "Remonter le produit", make: (r) => {
      const a = randint(r, 2, 12); const x = randint(r, 3, 25);
      return { prompt: `Résous $${a}x = ${a * x}$.`, answer: x, solution: `$x = ${a * x} \\div ${a} = $ **${x}** — l'inverse du × est le ÷, et $${a} \\times ${x} = ${a * x}$ ✓.` };
    } },
    { tier: "challenge", label: "Modéliser le réel", make: (r) => {
      const n = pick(r, [3, 4, 5, 6]); const x = randint(r, 4, 30) / 2;
      const tot = Math.round(n * x * 100) / 100;
      return { prompt: `${n} stylos identiques coûtent ${String(tot).replace(".", ",")} €. Écris l'équation et donne le prix d'un stylo.`, answer: x, solution: `$${n}x = ${String(tot).replace(".", ",")}$ → $x = ${String(tot).replace(".", ",")} \\div ${n} = $ **${String(x).replace(".", ",")} €**.` };
    } },
  ],
};

export default [calculLitteral, equations];
