// Field "Numbers" — HIGH module (seconde year): real numbers, intervals,
// arithmetic. Official programme (Nombres et calculs, algèbre): the sets ℕ, ℤ,
// 𝔻, ℚ, ℝ and the real line, irrational numbers (√2, π), decimal bracketing to
// 10⁻ⁿ; intervals of ℝ with their notations, ABSOLUTE VALUE as distance,
// |x − a| ⩽ r and the interval [a − r, a + r], √(a²) = |a|; formal definitions
// of multiple/divisor/even/odd (a = kb), irreducible fractions. REQUIRED PROOFS:
// 1/3 is not decimal; the sum of two multiples of a is a multiple of a; the
// square of an odd number is odd; √2 is irrational.
import { randint, pick } from "../../core/exercises.js";

// — The number sets (programme: ℝ, droite numérique, encadrements, irrationnels) —
const ensemblesNombres = {
  id: "numbers.high.ensembles-nombres",
  level: "high", domain: "numbers",
  title: "ℕ, ℤ, 𝔻, ℚ, ℝ : la carte des nombres",
  tagline: "Cinq ensembles emboîtés — et la droite qui les contient tous.",
  prereqs: ["numbers.middle.irreductible", "numbers.middle.racine-carree"],
  intuition:
    "Ta carte de 3e devient officielle, et gagne son continent : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ — naturels, relatifs, décimaux, rationnels… et les **réels** : tous les points de la droite graduée, irrationnels compris.\n\n$\\mathbb{R}$ est l'ensemble des abscisses : chaque point de la droite est un nombre, chaque nombre un point — la géométrie et le calcul fusionnent.",
  depths: {
    discovery:
      "**Avec les mains** : placer chaque nombre dans sa plus petite maison — $7 \\in \\mathbb{N}$ ; $-3 \\in \\mathbb{Z}$ (mais pas $\\mathbb{N}$) ; $2{,}5 \\in \\mathbb{D}$ ; $\\dfrac{1}{3} \\in \\mathbb{Q}$ (son écriture décimale $0{,}333\\ldots$ ne s'arrête jamais : pas décimal !) ; $\\sqrt{2}$ et $\\pi \\in \\mathbb{R}$ seulement — les irrationnels, fournis par la géométrie : la diagonale du carré, le tour du cercle.",
    standard:
      "**En image** : approcher sans atteindre — tout réel s'**encadre** par des décimaux à $10^{-n}$ près : $1{,}414 < \\sqrt{2} < 1{,}415$ (amplitude $10^{-3}$), et l'on resserre autant qu'on veut. C'est ce que fait ta calculatrice : elle ne connaît **que** des décimaux — son $\\sqrt{2}$ est un mensonge utile à $10^{-12}$ près. Distinguer le nombre réel de son approximation machine : le premier réflexe du lycée.",
    advanced:
      "**Dans la tête** : pourquoi $\\dfrac{1}{3}$ n'est-il pas décimal ? Suppose-le : $\\dfrac{1}{3} = \\dfrac{a}{10^n}$ pour un entier $a$ — alors $3a = 10^n$. Mais $10^n = 2^n \\times 5^n$ : sa décomposition en facteurs premiers ne contient **aucun 3**, alors que $3a$ en contient au moins un. Deux décompositions différentes pour le même nombre : impossible (l'unicité des facteurs premiers, ta 3e) — **absurde**. Le développement décimal de $\\frac{1}{3}$ est donc infini ($0{,}333\\ldots$), et périodique — comme celui de **tout** rationnel : la division pose toujours les mêmes restes, donc finit par boucler. Les irrationnels, eux, ne bouclent jamais.",
  },
  keyIdea: "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ — chaque nombre a sa plus petite maison. $\\mathbb{R} = $ la droite entière ; tout réel s'encadre par des décimaux à $10^{-n}$ près ; la calculatrice n'habite que $\\mathbb{D}$.",
  why:
    "Pourquoi nommer des ensembles plutôt que des nombres ? Parce que les théorèmes du lycée s'énoncent **sur des ensembles** : « pour tout réel », « il existe un rationnel »… Préciser où l'on travaille n'est pas de la pédanterie : $x^2 = 2$ n'a aucune solution dans $\\mathbb{Q}$ et deux dans $\\mathbb{R}$ — la réponse dépend de la maison. La carte des nombres est la grammaire de tout ce qui suit.",
  examples: [
    { title: "La plus petite maison", steps: [
      { p: "$7 \\in \\mathbb{N}$ ; $-3 \\in \\mathbb{Z} \\setminus \\mathbb{N}$ ; $2{,}5 \\in \\mathbb{D}$ ; $\\dfrac{1}{3} \\in \\mathbb{Q} \\setminus \\mathbb{D}$ ; $\\sqrt{2} \\in \\mathbb{R} \\setminus \\mathbb{Q}$." },
      { p: "Chaque inclusion est stricte : chaque extension a accueilli de nouveaux venus." },
    ] },
    { title: "Encadrer √2", steps: [
      { p: "$1{,}4^2 = 1{,}96 < 2$ et $1{,}5^2 = 2{,}25 > 2$ : donc $1{,}4 < \\sqrt{2} < 1{,}5$." },
      { p: "On resserre : $1{,}41 < \\sqrt{2} < 1{,}42$, puis $1{,}414 < \\sqrt{2} < 1{,}415$ — amplitude $10^{-3}$, et l'on continue à volonté." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Place $7$ ; $-3$ ; $2{,}5$ ; $\\dfrac{1}{3}$ ; $\\sqrt{2}$ dans sa plus petite maison parmi $\\mathbb{N}, \\mathbb{Z}, \\mathbb{D}, \\mathbb{Q}, \\mathbb{R}$.", solution: "$7 \\in \\mathbb{N}$ ; $-3 \\in \\mathbb{Z}$ ; $2{,}5 \\in \\mathbb{D}$ ; $\\dfrac{1}{3} \\in \\mathbb{Q}$ (écriture décimale infinie) ; $\\sqrt{2} \\in \\mathbb{R}$ — et chacun habite aussi toutes les maisons plus grandes : les ensembles s'emboîtent." },
    { tier: "warmup", prompt: "Donne un encadrement de $\\sqrt{2}$ d'amplitude $10^{-2}$, en justifiant par des carrés.", solution: "$1{,}41^2 = 1{,}9881 < 2$ et $1{,}42^2 = 2{,}0164 > 2$ : donc $1{,}41 < \\sqrt{2} < 1{,}42$ — coincer le carré, les racines suivent." },
    { tier: "application", prompt: "Vrai ou faux, avec justification : tout décimal est rationnel ; tout rationnel est décimal ; $\\pi \\in \\mathbb{Q}$.", solution: "**Vrai** : $2{,}5 = \\frac{25}{10}$, tout décimal est un quotient ($\\mathbb{D} \\subset \\mathbb{Q}$). **Faux** : $\\frac{1}{3}$ est rationnel mais pas décimal — l'inclusion est stricte. **Faux** : $\\pi$ est irrationnel (admis) — la géométrie fournit des nombres hors de $\\mathbb{Q}$." },
    { tier: "challenge", prompt: "Pose la division de 1 par 7 et observe les restes. Pourquoi le développement décimal d'un rationnel finit-il toujours par boucler ?", solution: "$\\frac{1}{7} = 0{,}142857\\,142857\\ldots$ — les restes possibles en divisant par 7 sont $1, 2, \\ldots, 6$ : **six au plus**, donc au bout d'au plus six étapes un reste revient, et la division rejoue exactement la même suite : le développement est **périodique**. Tout rationnel boucle ; un développement qui ne boucle jamais trahit un irrationnel." },
    { tier: "exam", prompt: "Démontre que $\\dfrac{1}{3}$ n'est pas un nombre décimal (raisonne par l'absurde avec $\\frac{1}{3} = \\frac{a}{10^n}$ et les facteurs premiers).", solution: "Supposons $\\dfrac{1}{3}$ décimal : il existe un entier $a$ et un entier $n$ tels que $\\dfrac{1}{3} = \\dfrac{a}{10^n}$, donc $3a = 10^n = 2^n \\times 5^n$. La décomposition de $10^n$ en facteurs premiers ne contient **aucun** facteur 3 ; celle de $3a$ en contient au moins un — or la décomposition d'un entier est **unique** (3e). Contradiction : $\\dfrac{1}{3}$ n'est pas décimal — première démonstration exigible du lycée, et l'absurde frappe d'entrée." },
  ],
  practice: [
    { tier: "warmup", label: "La plus petite maison", make: (r) => {
      const cas = pick(r, [["7", 1], ["-5", 2], ["3{,}25", 3], ["\\frac{2}{7}", 4], ["\\sqrt{3}", 5]]);
      return { prompt: `Quelle est la plus petite maison de $${cas[0]}$ ? (1 = ℕ, 2 = ℤ, 3 = 𝔻, 4 = ℚ, 5 = ℝ)`, answer: cas[1], solution: `**${["", "ℕ — entier naturel", "ℤ — relatif non naturel", "𝔻 — décimal (écriture finie)", "ℚ — rationnel non décimal", "ℝ — irrationnel"][cas[1]]}**.` };
    } },
    { tier: "application", label: "Coincer par les carrés", make: (r) => {
      const n = pick(r, [2, 3, 5, 7, 10]); const ent = Math.floor(Math.sqrt(n));
      return { prompt: `L'encadrement entier de $\\sqrt{${n}}$ est $? < \\sqrt{${n}} < ? + 1$ : donne le plus petit.`, answer: ent, solution: `$${ent}^2 = ${ent * ent} < ${n} < ${(ent + 1) * (ent + 1)} = ${ent + 1}^2$ → **${ent}** — premier cran d'un encadrement qu'on resserre à volonté.` };
    } },
  ],
};

// — Intervals and absolute value (programme: intervalles, |a|, |x−a| ⩽ r) —
const intervallesValeurAbsolue = {
  id: "numbers.high.intervalles-valeur-absolue",
  level: "high", domain: "numbers",
  title: "Intervalles et valeur absolue",
  tagline: "[a, b], ]−∞, a] — et |x − a|, la distance qui dessine les intervalles.",
  prereqs: ["numbers.high.ensembles-nombres", "algebra.middle.inequations"],
  intuition:
    "Tes demi-droites solutions de 3e gagnent une écriture : l'**intervalle** — $x \\geq 4$ s'écrit $x \\in [4, +\\infty[$ ; $-1 < x \\leq 3$ s'écrit $x \\in \\,]-1, 3]$ : crochet fermé pour « compris », ouvert pour « exclu », toujours ouvert vers l'infini.\n\nEt la **valeur absolue** mesure : $|a|$ est la distance de $a$ à 0, $|a - b|$ la distance entre $a$ et $b$ — le nombre sans son signe, la géométrie dans le calcul.",
  depths: {
    discovery:
      "**Avec les mains** : lire et écrire les huit formes — $[a, b]$, $]a, b[$, $[a, b[$, $]a, b]$, $[a, +\\infty[$, $]a, +\\infty[$, $]-\\infty, b]$, $]-\\infty, b[$ — et tester l'appartenance : $3 \\in [3, 7[$ (crochet fermé) mais $7 \\notin [3, 7[$ (ouvert). Le dessin sur la droite : segment plein ou borne creuse — tes crochets de 3e, devenus langue officielle.",
    standard:
      "**En image** : la distance résout — $|x - 5| \\leq 2$ se lit « $x$ est à distance au plus 2 de 5 » : sur la droite, l'intervalle $[3, 7]$, centré en 5, de rayon 2. La règle générale : $|x - a| \\leq r \\iff x \\in [a - r, a + r]$ — une inéquation à valeur absolue est un **intervalle centré** qui s'ignore. Et dans l'autre sens : $[2, 8]$ est centré en 5 (le milieu), de rayon 3 : il s'écrit $|x - 5| \\leq 3$.",
    advanced:
      "**Dans la tête** : la valeur absolue répare une vieille blessure — que vaut $\\sqrt{a^2}$ ? Pour $a = 3$ : $\\sqrt{9} = 3$ ✓ ; pour $a = -3$ : $\\sqrt{9} = 3 = |-3|$, **pas** $-3$ ! La racine renvoie toujours le positif : $\\sqrt{a^2} = |a|$, jamais $a$ tout court — l'erreur la plus commise du lycée, désamorcée. Et la notation paie en sciences : « mesure à $\\pm 0{,}1$ près » s'écrit $|m - m_0| \\leq 0{,}1$, les tolérances d'usinage, les marges d'erreur — toute l'incertitude du monde tient dans une valeur absolue.",
  },
  keyIdea: "Crochet fermé $=$ compris, ouvert $=$ exclu, l'infini toujours ouvert. $|a - b| = $ **distance** entre $a$ et $b$ ; $|x - a| \\leq r \\iff x \\in [a - r, a + r]$ (centre $a$, rayon $r$) ; et $\\sqrt{a^2} = |a|$.",
  why:
    "Pourquoi une notation de plus pour des inégalités qu'on savait écrire ? Parce que les fonctions du lycée vivent **sur des intervalles** : ensembles de définition, tableaux de variations, domaines d'étude — tout s'énonce en crochets. Et la valeur absolue traduit la question la plus fréquente des sciences : « à quelle distance ? » — précision d'une mesure, écart à une cible, erreur d'une approximation. Deux notations, tout un langage.",
  examples: [
    { title: "Traduire dans les deux sens", steps: [
      { p: "$x \\geq 4 \\iff x \\in [4, +\\infty[$ ; $-1 < x \\leq 3 \\iff x \\in \\,]-1, 3]$." },
      { p: "Fermé sur le 3 (compris), ouvert sur le $-1$ (exclu) — le crochet dit tout." },
    ] },
    { title: "L'intervalle centré", steps: [
      { p: "$|x - 5| \\leq 2$ : distance à 5 au plus 2 — de $5 - 2$ à $5 + 2$." },
      { p: "$x \\in [3, 7]$ — centre 5, rayon 2 : la valeur absolue dessine l'intervalle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris en intervalle : $x \\geq 4$ ; $-1 < x \\leq 3$ ; $x < 0$. Puis teste : $7 \\in [3, 7[$ ?", solution: "$[4, +\\infty[$ ; $\\,]-1, 3]$ ; $\\,]-\\infty, 0[$ — et $7 \\notin [3, 7[$ : le crochet ouvert exclut sa borne." },
    { tier: "warmup", prompt: "Calcule $|{-7}|$ ; $|3 - 8|$ ; $|8 - 3|$. Que remarques-tu sur les deux derniers ?", solution: "$7$ ; $5$ ; $5$ — $|a - b| = |b - a|$ : la **distance** entre 3 et 8 ne dépend pas du sens du trajet." },
    { tier: "application", prompt: "Résous $|x - 5| \\leq 2$ et représente l'ensemble des solutions.", solution: "Distance à 5 au plus 2 : $x \\in [3, 7]$ — le segment centré en 5, de rayon 2 : l'inéquation à valeur absolue est un intervalle centré." },
    { tier: "challenge", prompt: "Écris l'intervalle $[2, 8]$ sous la forme $|x - a| \\leq r$.", solution: "Centre $= \\dfrac{2 + 8}{2} = 5$, rayon $= \\dfrac{8 - 2}{2} = 3$ : $|x - 5| \\leq 3$ — le milieu et la demi-longueur reconstruisent la valeur absolue." },
    { tier: "exam", prompt: "Simplifie $\\sqrt{a^2}$ pour $a = 3$ puis $a = -3$. Énonce la règle générale, et explique pourquoi $\\sqrt{a^2} = a$ est faux en général.", solution: "$a = 3$ : $\\sqrt{9} = 3$ ; $a = -3$ : $\\sqrt{9} = 3 \\neq -3$. La racine carrée renvoie **le positif** dont le carré vaut $a^2$ — c'est $|a|$ : $\\sqrt{a^2} = |a|$ pour tout réel. Écrire $\\sqrt{a^2} = a$ suppose $a \\geq 0$ sans le dire : sur les négatifs, l'égalité ment d'un signe — la valeur absolue est le garde-fou." },
  ],
  practice: [
    { tier: "warmup", label: "Dedans ou dehors ?", make: (r) => {
      const a = randint(r, -5, 3); const b = a + randint(r, 2, 7); const fermeB = r() < 0.5;
      const x = pick(r, [a, b, a + 1, b + 1]);
      const dedans = (x > a && x < b) || x === a || (x === b && fermeB);
      return { prompt: `$${x} \\in [${a}, ${b}${fermeB ? "]" : "["}$ ? (1 = oui, 0 = non)`, answer: dedans ? 1 : 0, solution: `${x === b ? (fermeB ? "Borne **fermée** : " + x + " est compris" : "Borne **ouverte** : " + x + " est exclu") : x > a && x < b ? "Strictement entre les bornes : **oui**" : x === a ? "Borne gauche fermée : **oui**" : "Hors du segment : **non**"}.` };
    } },
    { tier: "application", label: "La distance qui dessine", make: (r) => {
      const a = randint(r, -4, 9); const rr = randint(r, 1, 5);
      return { prompt: `$|x - ${a}| \\leq ${rr}$ : quelle est la borne droite de l'intervalle solution ?`, answer: a + rr, solution: `$[${a - rr}, ${a + rr}]$ — centre ${a}, rayon ${rr} : borne droite **${a + rr}**.` };
    } },
    { tier: "challenge", label: "Centre et rayon", make: (r) => {
      const c = randint(r, -3, 8); const rr = randint(r, 1, 6);
      return { prompt: `L'intervalle $[${c - rr}, ${c + rr}]$ s'écrit $|x - a| \\leq r$ : que vaut $a$ ?`, answer: c, solution: `Le centre : $\\dfrac{${c - rr} + ${c + rr}}{2} = $ **${c}** (et $r = ${rr}$).` };
    } },
  ],
};

// — Arithmetic (programme: a = kb, démonstrations exigibles, √2 irrationnel) —
const arithmetique = {
  id: "numbers.high.arithmetique",
  level: "high", domain: "numbers",
  title: "Multiples, diviseurs, démonstrations",
  tagline: "a = kb — la définition qui démontre, jusqu'à l'irrationalité de √2.",
  prereqs: ["numbers.middle.irreductible", "algebra.middle.demonstrations"],
  intuition:
    "Le collège constatait ; la seconde **définit pour démontrer** : $a$ est multiple de $b$ s'il existe un entier $k$ tel que $a = kb$ — un pair s'écrit $2k$, un impair $2k + 1$.\n\nAvec ces définitions, les propriétés se prouvent en deux lignes — et la plus belle preuve du programme tombe au bout : $\\sqrt{2}$ est irrationnel.",
  depths: {
    discovery:
      "**Avec les mains** : la première démonstration exigible — la somme de deux multiples de $a$ est un multiple de $a$ : prends $m = ka$ et $m' = k'a$ (deux lettres : ils sont quelconques !) ; alors $m + m' = ka + k'a = (k + k')a$ — un entier fois $a$ : **multiple** de $a$, par définition. La factorisation a exhibé le $k + k'$ : démontré pour l'infinité des cas.",
    standard:
      "**En image** : la deuxième exigible — le carré d'un impair est impair : $n = 2k + 1$, donc $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ — la forme $2K + 1$ : **impair** ✓ (ton identité remarquable au service de l'arithmétique). Et la contraposée offre un bonus gratuit : si $n^2$ est pair, alors $n$ est pair — retiens-la, elle va servir.",
    advanced:
      "**Dans la tête** : la preuve qui a coûté un naufrage — supposons $\\sqrt{2}$ rationnel : $\\sqrt{2} = \\dfrac{p}{q}$, fraction **irréductible** (toujours possible, ta 3e). En élevant au carré : $2q^2 = p^2$ — $p^2$ est pair, donc $p$ est pair (la contraposée !) : $p = 2k$. Alors $2q^2 = 4k^2$, soit $q^2 = 2k^2$ : $q^2$ pair, donc $q$ pair. Mais $p$ **et** $q$ pairs contredisent l'irréductibilité — **absurde** : $\\sqrt{2} \\notin \\mathbb{Q}$. La légende veut qu'Hippase de Métaponte, pythagoricien, ait péri en mer pour avoir révélé ce scandale : les nombres débordent les fractions, et la démonstration tient en cinq lignes.",
  },
  keyIdea: "Définitions opérantes : multiple $\\iff a = kb$ ; pair $= 2k$, impair $= 2k + 1$. Démontrer : nommer, calculer, **exhiber la forme** — et l'absurde conclut quand l'hypothèse contraire s'effondre ($\\sqrt{2}$ irrationnel).",
  why:
    "Pourquoi redémontrer ce que le collège constatait ? Parce que la seconde change de métier : on ne vérifie plus, on **prouve** — et l'arithmétique est le terrain d'entraînement idéal : définitions courtes, calculs propres, conclusions nettes. Les trois démonstrations exigibles de ce chapitre (somme de multiples, carré d'impair, $\\sqrt{2}$) sont les gammes du raisonnement : qui les maîtrise sait ce que « démontrer » veut dire.",
  examples: [
    { title: "La somme de deux multiples", steps: [
      { p: "$m = ka$, $m' = k'a$ : alors $m + m' = (k + k')a$." },
      { p: "Un entier fois $a$ : multiple de $a$ — la définition fait la preuve." },
    ] },
    { title: "Le carré d'un impair", steps: [
      { p: "$n = 2k + 1$ : $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$." },
      { p: "La forme $2K + 1$ : **impair** — et par contraposée : $n^2$ pair $\\Rightarrow n$ pair." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris la définition formelle : $a$ est multiple de $b$ ; $n$ est pair ; $n$ est impair. Pourquoi « il existe un entier $k$ » est-il essentiel ?", solution: "$a = kb$ avec $k$ **entier** ; $n = 2k$ ; $n = 2k + 1$. Sans « entier », tout serait multiple de tout ($6 = 2{,}4 \\times 2{,}5$…) — la définition n'opère que si $k$ vit dans $\\mathbb{Z}$." },
    { tier: "warmup", prompt: "Démontre que la somme de deux multiples de 7 est un multiple de 7.", solution: "$m = 7k$ et $m' = 7k'$ : $m + m' = 7k + 7k' = 7(k + k')$ — un entier fois 7 : **multiple de 7** par définition. Deux lettres, une factorisation, l'infini couvert." },
    { tier: "application", prompt: "Démontre que le carré d'un nombre impair est impair, puis énonce la contraposée.", solution: "$(2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ : la forme $2K + 1$, **impair**. Contraposée : si $n^2$ est **pair**, alors $n$ est **pair** — équivalente à l'énoncé, et c'est elle qui servira dans la preuve de $\\sqrt{2}$." },
    { tier: "challenge", prompt: "La somme d'un multiple de 4 et d'un multiple de 6 est-elle toujours un multiple de 4 ? de 2 ? Démontre ou réfute.", solution: "**De 4 : non** — contre-exemple : $4 + 6 = 10$, pas multiple de 4 (un contre-exemple suffit à tuer un « toujours »). **De 2 : oui** — $4k + 6k' = 2(2k + 3k')$ : la factorisation par 2 marche toujours. Démontrer et réfuter sont les deux faces du même métier." },
    { tier: "exam", prompt: "Démontre que $\\sqrt{2}$ est irrationnel (raisonne par l'absurde avec une fraction irréductible et le lemme « $n^2$ pair $\\Rightarrow$ $n$ pair »).", solution: "Supposons $\\sqrt{2} = \\dfrac{p}{q}$, fraction **irréductible**. Alors $2q^2 = p^2$ : $p^2$ est pair, donc $p$ est pair (contraposée du carré d'impair) — $p = 2k$. D'où $2q^2 = 4k^2$, soit $q^2 = 2k^2$ : $q^2$ pair, donc $q$ pair. Mais $p$ et $q$ pairs se simplifient par 2 : contradiction avec l'irréductibilité. **Absurde** — $\\sqrt{2}$ est irrationnel. Cinq lignes pour faire déborder les fractions : la démonstration la plus célèbre du lycée, et l'aboutissement de quatre ans d'arithmétique." },
  ],
  practice: [
    { tier: "warmup", label: "La forme qui avoue", make: (r) => {
      const k = randint(r, 3, 20); const pair = r() < 0.5;
      const n = pair ? 2 * k : 2 * k + 1;
      return { prompt: `$${n} = 2 \\times ${k}${pair ? "" : " + 1"}$ : ce nombre est-il pair ? (1 = oui, 0 = non)`, answer: pair ? 1 : 0, solution: `La forme $2k${pair ? "" : " + 1"}$ avoue : **${pair ? "pair" : "impair"}**.` };
    } },
    { tier: "application", label: "Exhiber le k", make: (r) => {
      const a = pick(r, [3, 5, 7, 11]); const k = randint(r, 4, 15); const kk = randint(r, 2, 9);
      return { prompt: `$${a * k} + ${a * kk} = ${a} \\times \\,?$ — quel entier la factorisation exhibe-t-elle ?`, answer: k + kk, solution: `$${a}(${k} + ${kk}) = ${a} \\times $ **${k + kk}** — la somme de deux multiples de ${a}, factorisée.` };
    } },
    { tier: "challenge", label: "Le plus grand multiple", make: (r) => {
      const a = pick(r, [3, 4, 6, 7, 9]); const b = randint(r, 20, 95);
      return { prompt: `Quel est le plus grand multiple de ${a} inférieur ou égal à ${b} ? (l'algorithme du programme !)`, answer: Math.floor(b / a) * a, solution: `$${b} \\div ${a} \\approx ${(b / a).toFixed(2).replace(".", ",")}$ → $${Math.floor(b / a)} \\times ${a} = $ **${Math.floor(b / a) * a}** — la division euclidienne en embuscade.` };
    } },
  ],
};

export default [ensemblesNombres, intervallesValeurAbsolue, arithmetique];
