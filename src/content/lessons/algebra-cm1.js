// Field "Algebra" — PRIMARY module (CM1 year): initiation to algebraic thinking.
// Official cycle-3 programme (2025): symbols/letters for unknown numbers (to find
// or generic), the extended meaning of "=", equation-like equalities (178 − … = 6 × 8),
// complex evolving sequences and calculation programs (pensée informatique).
import { randint, pick } from "../../core/exercises.js";

// — Symbols for numbers (programme: pensée algébrique, égalités à trous, programmes de calcul) —
const symbols = {
  id: "algebra.primary.symbols",
  level: "primary", domain: "algebra",
  title: "Des lettres pour les nombres",
  tagline: "Raisonner sur un nombre qu'on ne connaît pas — l'algèbre commence ici.",
  prereqs: ["numbers.primary.problems-10000", "numbers.primary.parentheses"],
  intuition:
    "Peut-on calculer avec un nombre **inconnu** ? Oui — il suffit de lui donner un nom. Des tee-shirts à 12 € pièce, 5 € de livraison : quel que soit le nombre $N$ de tee-shirts, le prix s'écrit $(N \\times 12) + 5$.\n\nLa lettre joue deux rôles : tantôt elle cache un nombre **à trouver** (2 paires de ciseaux et 3 stylos coûtent 20 €…), tantôt elle représente **toutes les valeurs possibles** — c'est le cas de $N$.",
  depths: {
    discovery:
      "**Avec les mains** : le schéma en barres accueille l'inconnu — une barre de 178 dont on retire un morceau « ? » pour qu'il reste autant que $6 \\times 8$ : le morceau caché se déduit du dessin, avant tout calcul.",
    standard:
      "**En image** : le signe « = » grandit — il ne dit plus seulement « voici le résultat », il affirme que **deux expressions pèsent pareil**, comme une balance : $178 - \\,? = 6 \\times 8$. À droite : 48. Le trou doit donc valoir $178 - 48 = 130$. Une égalité à compléter… c'est déjà presque une **équation**.",
    advanced:
      "**Dans la tête** : la pensée algébrique généralise aussi les **suites** — dans 80 ; 85 ; 83 ; 88 ; 86 ; 91…, le motif est $+5$ puis $-2$, en alternance ; dans 1 ; 2 ; 6 ; 7 ; 11 ; 12…, c'est $+1$, $+4$. Et les **programmes de calcul** enchaînent les gestes : « choisis un nombre ; ajoute 2 ; multiplie par 4 » — pour 5 : $(5 + 2) \\times 4 = 28$. À rebours : si la machine affiche 36, on remonte — $36 \\div 4 = 9$, puis $9 - 2 = 7$.",
  },
  keyIdea: "Une lettre **nomme** un nombre inconnu ou générique ; le signe « = » met deux expressions **en équilibre** — et l'équilibre se remonte.",
  why:
    "Pourquoi écrire $(N \\times 12) + 5$ plutôt qu'un exemple chiffré ? Parce que la formule répond à **toutes** les questions d'un coup : 3 tee-shirts, 7, 100 — une seule écriture les couvre. Généraliser, c'est calculer une fois pour toujours : voilà le superpouvoir que l'algèbre promet.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", whole: 178, parts: [48, 130], unknown: "part" }, caption: "La barre de 178 : il doit rester 48 (= 6 × 8) — touche le « ? » : le morceau retiré se déduit du dessin." },
  ],
  examples: [
    { title: "La formule des tee-shirts", steps: [
      { p: "Un tee-shirt : 12 €. Livraison : 5 €, une seule fois." },
      { p: "Pour $N$ tee-shirts : $(N \\times 12) + 5$ euros — pour $N = 3$ : $36 + 5 = 41$ €." },
    ] },
    { title: "L'égalité-balance", steps: [
      { p: "$178 - \\,? = 6 \\times 8$ : le plateau de droite pèse 48." },
      { p: "Le trou vaut $178 - 48 = $ **130** — l'égalité reste en équilibre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $(N \\times 12) + 5$, que représente la lettre $N$ ?", solution: "Le **nombre de tee-shirts**, quel qu'il soit : la lettre est générique — la formule marche pour toutes ses valeurs." },
    { tier: "warmup", prompt: "Complète : $178 - \\,? = 6 \\times 8$.", solution: "À droite : 48. Donc $? = 178 - 48 = $ **130** — le signe = exige l'équilibre." },
    { tier: "application", prompt: "Avec la formule $(N \\times 12) + 5$, calcule le prix de 7 tee-shirts.", solution: "$(7 \\times 12) + 5 = 84 + 5 = $ **89 €**." },
    { tier: "challenge", prompt: "Suite : 80 ; 85 ; 83 ; 88 ; 86 ; 91 ; 89 ; … Quel est le terme suivant, et quelle est la règle ?", solution: "Règle : **+5 puis −2**, en alternance. Après 89 : $89 + 5 = $ **94**." },
    { tier: "exam", prompt: "Programme : « choisis un nombre ; ajoute 2 ; multiplie par 4 ». La machine affiche 36. Quel nombre a été choisi ?", solution: "On **remonte** le programme : $36 \\div 4 = 9$, puis $9 - 2 = $ **7**. Vérification : $(7 + 2) \\times 4 = 36$ ✓." },
  ],
  practice: [
    { tier: "warmup", label: "L'égalité-balance", make: (r) => {
      const b = randint(r, 3, 9), c = randint(r, 4, 9); const droite = b * c; const a = droite + randint(r, 30, 160);
      return { prompt: `Complète : $${a} - \\,? = ${b} \\times ${c}$`, answer: a - droite, solution: `À droite : ${droite}. Le trou vaut $${a} - ${droite} = $ **${a - droite}**.` };
    } },
    { tier: "application", label: "La formule générique", make: (r) => {
      const p = pick(r, [9, 11, 12, 15]), f = pick(r, [4, 5, 6]); const N = randint(r, 3, 9);
      return { prompt: `Prix : $(N \\times ${p}) + ${f}$ euros pour $N$ objets. Calcule pour $N = ${N}$.`, answer: N * p + f, solution: `$(${N} \\times ${p}) + ${f} = ${N * p} + ${f} = $ **${N * p + f} €**.` };
    } },
    { tier: "challenge", label: "Remonter le programme", make: (r) => {
      const add = randint(r, 2, 6), mul = pick(r, [3, 4, 5]); const n = randint(r, 3, 12);
      const out = (n + add) * mul;
      return { prompt: `Programme : « choisis un nombre ; ajoute ${add} ; multiplie par ${mul} ». Résultat affiché : ${out}. Quel nombre a été choisi ?`, answer: n, solution: `À rebours : $${out} \\div ${mul} = ${n + add}$, puis $- ${add}$ : **${n}**.` };
    } },
  ],
};

export default [symbols];
