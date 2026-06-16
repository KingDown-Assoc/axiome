// Field "Discrete mathematics" — HIGH module (terminale year): combinatorics.
// Official terminale spécialité programme. COUNTING: additive principle
// (disjoint union), multiplicative principle (cartesian product), number of
// k-tuples of an n-element set (n^k), number of PARTS of an n-element set (2^n,
// linked to n-tuples of {0,1} and binary words), k-tuples of DISTINCT elements
// (arrangements), n! and permutations. COMBINATIONS: k-element parts of an
// n-element set, the factorial formula, explicit values for k = 0, 1, 2,
// symmetry, PASCAL's relation and triangle — REQUIRED PROOFS: the sum of the
// binomial coefficients equals 2^n (by counting), Pascal's relation (by
// computation AND by a combinatorial method).
import { randint, pick } from "../../core/exercises.js";

const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };

// — Counting principles (programme: principes, k-uplets, parties, n!) —
const denombrement = {
  id: "discrete.high.denombrement",
  level: "high", domain: "discrete",
  title: "Compter sans énumérer",
  tagline: "Principes additif et multiplicatif du dénombrement, et les 2ⁿ parties d'un ensemble.",
  prereqs: ["probability.high.bernoulli", "logic.high.listes"],
  intuition:
    "Combien de codes à 4 chiffres ? Tu ne vas pas les lister : tu **comptes sans énumérer** — 10 choix, puis 10, puis 10, puis 10 : $10^4$.\n\nDeux principes suffisent : l'**additif** (des cas disjoints s'additionnent) et le **multiplicatif** (des étapes successives se multiplient) — toute la combinatoire en deux verbes.",
  depths: {
    discovery:
      "**Avec les mains** : le multiplicatif en action — un menu : 3 entrées, 4 plats, 2 desserts : $3 \\times 4 \\times 2 = 24$ repas (le produit cartésien !) ; et les $k$-uplets d'un ensemble à $n$ éléments : $n^k$ (chaque case offre $n$ choix, répétition permise) — ton arbre de Bernoulli à $2^n$ chemins était déjà un dénombrement.",
    standard:
      "**En image** : interdis les répétitions — un podium (or, argent, bronze) parmi 8 coureurs : $8 \\times 7 \\times 6 = 336$ : chaque choix retire un candidat — les $k$-uplets d'éléments **distincts** ($k$ parmi $n$, ordonnés). Pousse jusqu'au bout ($k = n$) : ranger les $n$ éléments **tous** — $n \\times (n-1) \\times \\cdots \\times 1 = n!$ : la **factorielle** compte les **permutations** ($4! = 24$ anagrammes de MARC), et elle explose : $10! = 3\\,628\\,800$.",
    advanced:
      "**Dans la tête** : le plus beau comptage — combien de **parties** (sous-ensembles) d'un ensemble à $n$ éléments ? Code chaque partie par un mot **binaire** de longueur $n$ : le $i$-ème caractère vaut 1 si l'élément $i$ est pris, 0 sinon — une partie ⟷ un mot, correspondance parfaite ; or les mots binaires de longueur $n$ sont des $n$-uplets de $\\{0, 1\\}$ : il y en a $2^n$ ✓. Trois lectures d'un même nombre : les sous-ensembles, les mots binaires, les chemins de ton arbre de Bernoulli — compter, c'est souvent **traduire** vers ce qu'on sait déjà compter, et l'informatique vit dans cette correspondance (un octet : $2^8 = 256$ parties d'un ensemble à 8 éléments).",
  },
  keyIdea: "**Additif** : cas disjoints s'additionnent ; **multiplicatif** : étapes se multiplient. $k$-uplets : $n^k$ (avec répétition) ; distincts : $n(n-1)\\cdots(n-k+1)$ ; permutations : $n!$ ; **parties** d'un ensemble à $n$ éléments : $2^n$ (les mots binaires).",
  why:
    "Pourquoi compter ce qu'on ne listera jamais ? Parce que les probabilités de terminale exigent des cardinaux d'univers immenses (la binomiale arrive !), parce que l'informatique mesure tout en dénombrements (mots de passe, clés, complexité), et parce que l'explosion combinatoire — $n!$ qui dépasse les atomes de l'univers dès $n = 60$ — est la raison d'être de la cryptographie : on compte précisément ce qui est trop nombreux pour être essayé.",
  examples: [
    { title: "Le podium sans répétition", steps: [
      { p: "8 coureurs, 3 marches : $8 \\times 7 \\times 6 = 336$ podiums — chaque choix retire un candidat." },
      { p: "Tous rangés : $8! = 40\\,320$ ordres d'arrivée — la factorielle, permutation complète." },
    ] },
    { title: "Les parties en binaire", steps: [
      { p: "Parties de $\\{a, b, c\\}$ ⟷ mots de 3 bits : $\\{a, c\\} \\leftrightarrow 101$, $\\varnothing \\leftrightarrow 000$." },
      { p: "$2^3 = 8$ parties — la traduction binaire compte ce que la liste fatiguerait à écrire." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un menu propose 3 entrées, 4 plats et 2 desserts. Combien de repas complets ? Et combien de codes PIN à 4 chiffres ?", solution: "$3 \\times 4 \\times 2 = $ **24** repas, $10^4 = $ **10 000** codes — le principe multiplicatif : des étapes successives se multiplient, répétition permise pour le PIN ($k$-uplets : $n^k$)." },
    { tier: "warmup", prompt: "8 coureurs : combien de podiums (or, argent, bronze) possibles ? Et combien de classements complets ?", solution: "$8 \\times 7 \\times 6 = $ **336** podiums (éléments **distincts** : chaque choix retire un candidat) ; classement complet : $8! = $ **40 320** — la factorielle range tout le monde." },
    { tier: "application", prompt: "Combien d'anagrammes du mot MARC (lettres toutes distinctes) ? Et pourquoi BANANE serait-il plus subtil ?", solution: "$4! = $ **24** — permutations de 4 lettres distinctes. BANANE répète ses lettres (3 A, 2 N) : des permutations deviennent identiques — le comptage devra diviser par les répétitions ($\\frac{6!}{3!\\,2!} = 60$) : la factorielle pure exige des éléments **distincts**." },
    { tier: "challenge", prompt: "Une classe de 10 élèves : combien de façons de désigner un délégué ET un suppléant ? Puis combien de délégations de 2 élèves (sans rôles) ? Que remarques-tu ?", solution: "Avec rôles : $10 \\times 9 = $ **90** (couple ordonné) ; sans rôles : chaque paire a été comptée **deux fois** (Alice-Bob = Bob-Alice) : $\\frac{90}{2} = $ **45** — l'ordre compte ou pas, et quand il ne compte pas, on divise : tu viens d'inventer les combinaisons de la leçon suivante." },
    { tier: "exam", prompt: "Démontre que le nombre de parties d'un ensemble à $n$ éléments vaut $2^n$, par la correspondance avec les mots binaires.", solution: "Numérote les éléments de 1 à $n$ et code chaque partie par le mot binaire de longueur $n$ dont le $i$-ème caractère vaut 1 si l'élément $i$ appartient à la partie, 0 sinon — la correspondance est **parfaite** : chaque partie donne un mot unique, chaque mot décrit une partie unique (bijection). Or les mots binaires de longueur $n$ sont les $n$-uplets de $\\{0, 1\\}$ : le principe multiplicatif en compte $2 \\times 2 \\times \\cdots \\times 2 = 2^n$ ✓ — compter par **traduction** : la démonstration exigible, et le geste fondateur de la combinatoire." },
  ],
  practice: [
    { tier: "warmup", label: "Le multiplicatif", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 3, 6); const c = randint(r, 2, 4);
      return { prompt: `${a} entrées, ${b} plats, ${c} desserts : combien de repas complets ?`, answer: a * b * c, solution: `$${a} \\times ${b} \\times ${c} = $ **${a * b * c}** — les étapes se multiplient.` };
    } },
    { tier: "application", label: "Avec ou sans répétition", make: (r) => {
      const n = randint(r, 5, 9); const k = randint(r, 2, 3); const sans = r() < 0.5;
      let v = 1; for (let i = 0; i < k; i++) v *= sans ? n - i : n;
      return { prompt: `${k}-uplets ${sans ? "d'éléments DISTINCTS" : "(répétition permise)"} d'un ensemble à ${n} éléments : combien ?`, answer: v, solution: `$${sans ? Array.from({length: k}, (_, i) => n - i).join(" \\times ") : n + "^" + k} = $ **${v}**.` };
    } },
    { tier: "challenge", label: "La factorielle et les parties", make: (r) => {
      const n = randint(r, 3, 6); const quoi = r() < 0.5;
      return { prompt: `Ensemble à ${n} éléments : ${quoi ? "combien de permutations ?" : "combien de parties ?"}`, answer: quoi ? fact(n) : 2 ** n, solution: `${quoi ? "$" + n + "! = $ **" + fact(n) + "**" : "$2^{" + n + "} = $ **" + 2 ** n + "** — les mots binaires"}.` };
    } },
  ],
};

// — Combinations and Pascal (programme: k parmi n, relation de Pascal) —
const combinaisons = {
  id: "discrete.high.combinaisons",
  level: "high", domain: "discrete",
  title: "Combinaisons et triangle de Pascal",
  tagline: "Combinaisons « k parmi n », et la règle de Pascal.",
  prereqs: ["discrete.high.denombrement"],
  intuition:
    "Choisir une **équipe** de 2 parmi 10 : l'ordre n'importe pas — Alice-Bob et Bob-Alice sont la même équipe. C'est la **combinaison** $\\binom{n}{k}$ : le nombre de **parties** à $k$ éléments d'un ensemble à $n$.\n\nLa formule corrige le sur-comptage : $\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$ — les arrangements, divisés par les $k!$ ordres internes.",
  depths: {
    discovery:
      "**Avec les mains** : les petits cas se lisent — $\\binom{n}{0} = 1$ (une seule façon de ne rien prendre : la partie vide !), $\\binom{n}{1} = n$ (un élément : $n$ choix), $\\binom{n}{2} = \\dfrac{n(n-1)}{2}$ (les paires : ton délégué-suppléant divisé par 2) — et la **symétrie** : $\\binom{n}{k} = \\binom{n}{n-k}$ : choisir les $k$ pris, c'est choisir les $n - k$ laissés — même geste, vu de l'autre côté.",
    standard:
      "**En image** : la **relation de Pascal** — $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ : fixe un élément, disons toi ; les équipes de $k$ se partagent en deux camps disjoints — celles **avec toi** ($\\binom{n-1}{k-1}$ : tes $k-1$ coéquipiers parmi les $n-1$ autres) et celles **sans toi** ($\\binom{n-1}{k}$) — le principe additif conclut ✓. Empile : le **triangle de Pascal**, où chaque case est la somme de ses deux épaules — 1 ; 1 1 ; 1 2 1 ; 1 3 3 1 ; 1 4 6 4 1 : tes comptages de chemins de Bernoulli, depuis toujours.",
    advanced:
      "**Dans la tête** : la somme d'une ligne — $\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$, **démontrée par double comptage** : le membre de gauche compte les parties **par taille** (celles à 0 élément, plus celles à 1, …, plus celles à $n$ : tous les cas, disjoints), le membre de droite les compte **d'un bloc** (tes mots binaires !) — deux recensements du même ensemble donnent le même total ✓. Le « double comptage » est l'arme élégante de la combinatoire : pas un calcul, une **identification**. Le triangle, lui, voyage depuis mille ans — Al-Karaji à Bagdad, Yang Hui en Chine, Tartaglia en Italie, avant que Pascal (1654, en pleine correspondance avec Fermat sur les jeux !) n'en fasse un traité : son vrai nom serait « triangle de tout le monde ».",
  },
  keyIdea: "$\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$ : les parties à $k$ éléments — l'ordre oublié. Symétrie $\\binom{n}{k} = \\binom{n}{n-k}$ ; **Pascal** : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ (avec toi / sans toi) ; $\\sum \\binom{n}{k} = 2^n$ (double comptage des parties).",
  why:
    "Pourquoi un coefficient mérite-t-il un triangle millénaire ? Parce que $\\binom{n}{k}$ compte les **chemins** à $k$ succès de ton arbre de Bernoulli — la loi binomiale, clef de voûte des probabilités de terminale, s'écrira $\\binom{n}{k}p^k(1-p)^{n-k}$ : sans les combinaisons, pas de sondages, pas de contrôle qualité, pas de génétique mendélienne quantitative. Le triangle de Pascal est la table de multiplication du hasard.",
  examples: [
    { title: "L'ordre oublié", steps: [
      { p: "Équipes de 2 parmi 10 : $10 \\times 9 = 90$ couples ordonnés, chaque équipe comptée 2 fois." },
      { p: "$\\binom{10}{2} = \\dfrac{90}{2} = 45$ — diviser par les $k!$ ordres internes : la formule entière est là." },
    ] },
    { title: "Pascal : avec toi, sans toi", steps: [
      { p: "Équipes de $k$ parmi $n$ : celles qui te prennent ($\\binom{n-1}{k-1}$) et celles qui t'ignorent ($\\binom{n-1}{k}$)." },
      { p: "Camps disjoints, principe additif : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ ✓ — chaque case, somme de ses épaules." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\binom{5}{0}$, $\\binom{5}{1}$, $\\binom{5}{2}$ par leur sens (sans formule), puis vérifie la symétrie avec $\\binom{5}{3}$.", solution: "$\\binom{5}{0} = $ **1** (la partie vide), $\\binom{5}{1} = $ **5**, $\\binom{5}{2} = \\frac{5 \\times 4}{2} = $ **10** (les paires) — et $\\binom{5}{3} = \\binom{5}{2} = $ **10** : choisir 3 pris, c'est choisir 2 laissés — la symétrie est un changement de point de vue." },
    { tier: "warmup", prompt: "Au loto simplifié, on coche 6 numéros parmi 49. Combien de grilles possibles ?", solution: "$\\binom{49}{6} = \\dfrac{49!}{6!\\,43!} = $ **13 983 816** — près de 14 millions de grilles : l'ordre des coches n'importe pas (combinaison, pas arrangement), et la rareté du jackpot est un dénombrement." },
    { tier: "application", prompt: "Démontre la relation de Pascal par la méthode combinatoire : fixe un élément et partage les parties à $k$ éléments.", solution: "Fixe un élément $e$ : les parties à $k$ éléments se partagent en deux camps **disjoints** — celles contenant $e$ (il reste $k-1$ éléments à choisir parmi les $n-1$ autres : $\\binom{n-1}{k-1}$) et celles l'évitant ($k$ parmi $n-1$ : $\\binom{n-1}{k}$). Principe **additif** : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ ✓ — la démonstration exigible, sans une factorielle." },
    { tier: "challenge", prompt: "Démontre la même relation **par le calcul**, avec la formule factorielle (réduis au même dénominateur).", solution: "$\\binom{n-1}{k-1} + \\binom{n-1}{k} = \\dfrac{(n-1)!}{(k-1)!(n-k)!} + \\dfrac{(n-1)!}{k!(n-k-1)!} = \\dfrac{(n-1)!\\,[k + (n-k)]}{k!(n-k)!} = \\dfrac{n!}{k!(n-k)!}$ ✓ — même théorème, deux preuves : le calcul transpire, la combinatoire éclaire — le programme exige les **deux**, pour cette leçon-là précisément." },
    { tier: "exam", prompt: "Démontre par dénombrement que $\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$ : compte les parties d'un ensemble à $n$ éléments de deux façons.", solution: "**Premier recensement** : trier les parties par taille — il y a $\\binom{n}{0}$ parties à 0 élément, $\\binom{n}{1}$ à 1, …, $\\binom{n}{n}$ à $n$ : ces camps sont disjoints et couvrent tout, le principe additif donne $\\sum_{k=0}^{n}\\binom{n}{k}$ parties. **Second recensement** : la bijection avec les mots binaires en compte $2^n$ (leçon précédente). Deux comptes exacts du **même** ensemble : $\\sum \\binom{n}{k} = 2^n$ ✓ — le double comptage ne calcule rien, il identifie : c'est la démonstration exigible, et l'argument le plus élégant du chapitre — la ligne $n$ du triangle de Pascal somme à $2^n$, pour l'éternité." },
  ],
  practice: [
    { tier: "warmup", label: "k parmi n", make: (r) => {
      const n = randint(r, 4, 8); const k = randint(r, 2, 3);
      return { prompt: `$\\dbinom{${n}}{${k}} = \\,?$`, answer: fact(n) / (fact(k) * fact(n - k)), solution: `$\\dfrac{${n}!}{${k}!\\,${n - k}!} = $ **${fact(n) / (fact(k) * fact(n - k))}**.` };
    } },
    { tier: "application", label: "La symétrie", make: (r) => {
      const n = randint(r, 6, 12); const k = randint(r, 1, 3);
      return { prompt: `$\\dbinom{${n}}{${n - k}} = \\dbinom{${n}}{?}$ (donne la valeur la plus petite)`, answer: k, solution: `Symétrie : $\\binom{${n}}{${n - k}} = \\binom{${n}}{${k}}$ — **${k}** : choisir les pris ou les laissés.` };
    } },
    { tier: "challenge", label: "Les épaules de Pascal", make: (r) => {
      const n = randint(r, 4, 7); const k = randint(r, 1, n - 1);
      const v = fact(n) / (fact(k) * fact(n - k));
      return { prompt: `$\\dbinom{${n - 1}}{${k - 1}} + \\dbinom{${n - 1}}{${k}} = \\dbinom{${n}}{${k}} = \\,?$`, answer: v, solution: `Pascal : ${fact(n - 1) / (fact(k - 1) * fact(n - k))} + ${fact(n - 1) / (fact(k) * fact(n - 1 - k))} = **${v}** — la somme des épaules.` };
    } },
  ],
};

export default [denombrement, combinaisons];
