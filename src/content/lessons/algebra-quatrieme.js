// Field "Algebra" — MIDDLE module (4e year): first-degree equations and
// algebraic proof. Official cycle-4 programme: solving equations of the form
// ax + b = c, putting problems into equations of the form ax + b = cx + d and
// solving them, formulating conjectures with an algorithm or spreadsheet;
// producing formulas and testing their plausibility (areas, even/odd numbers),
// using simple distributivity to expand and factor, and using algebraic
// calculation to PRODUCE DEMONSTRATIONS.
import { randint, pick } from "../../core/exercises.js";

// — First-degree equations (programme: ax + b = c, puis ax + b = cx + d) —
const equationsDegre1 = {
  id: "algebra.middle.equations-degre1",
  level: "middle", domain: "algebra",
  title: "Équations : ax + b = c",
  tagline: "Deux marches à descendre — puis rassembler les x quand ils campent des deux côtés.",
  prereqs: ["algebra.middle.equations", "numbers.middle.relatifs-somme"],
  intuition:
    "Tes équations de 5e n'avaient qu'une opération à remonter. La 4e en empile **deux** : $3x + 5 = 17$ — d'abord défaire le $+5$ (l'opération inverse : $3x = 12$), puis le $\\times 3$ ($x = 4$).\n\nL'ordre compte : on déshabille **dans l'ordre inverse de l'habillage** — le dernier geste appliqué se défait en premier.",
  depths: {
    discovery:
      "**Avec les mains** : la balance — $3x + 5 = 17$ : trois sachets identiques et 5 g à gauche, 17 g à droite. Retire 5 g **des deux côtés** (l'équilibre tient !) : $3x = 12$ ; partage en trois : $x = 4$. Chaque geste s'applique aux deux plateaux — c'est la règle d'or.",
    standard:
      "**En image** : quand les $x$ campent **des deux côtés** — $5x + 3 = 2x + 12$ : retire $2x$ des deux côtés ($3x + 3 = 12$), puis le chemin connu ($3x = 9$, $x = 3$). Rassembler les inconnues d'un côté, les nombres de l'autre : deux migrations, puis deux marches. Et **vérifier** : $5 \\times 3 + 3 = 18$ et $2 \\times 3 + 12 = 18$ ✓ — les deux membres tombent d'accord.",
    advanced:
      "**Dans la tête** : la **mise en équation** est l'art véritable — « Léa a 3 fois l'âge de Tom ; dans 10 ans, elle aura le double » : note $x$ l'âge de Tom : $3x + 10 = 2(x + 10)$ — développe ($3x + 10 = 2x + 20$), migre ($x = 10$) : Tom a 10 ans, Léa 30 ; dans 10 ans, 40 et 20 ✓. Le calcul n'est rien ; la traduction est tout — choisir l'inconnue, écrire les deux récits d'une même quantité, poser l'égalité. Toute la physique du lycée tiendra dans ce geste.",
  },
  keyIdea: "Déshabiller à l'envers : $ax + b = c \\to ax = c - b \\to x = \\frac{c-b}{a}$. Des $x$ partout ? **Rassembler** d'abord ($-cx$ des deux côtés) — et toujours vérifier dans l'équation d'origine.",
  why:
    "Pourquoi opérer « des deux côtés » plutôt que déplacer en changeant de signe ? Les deux marchent — mais la balance dit **pourquoi** : une égalité est un équilibre, et tout geste appliqué aux deux plateaux le préserve. Le « je fais passer de l'autre côté » n'est que l'ombre portée de ce principe : qui tient la balance ne se trompe jamais de signe.",
  examples: [
    { title: "Deux marches", steps: [
      { p: "$3x + 5 = 17$ : retire 5 des deux côtés → $3x = 12$." },
      { p: "Divise par 3 → $x = $ **4** ; vérification : $3 \\times 4 + 5 = 17$ ✓." },
    ] },
    { title: "Les x des deux côtés", steps: [
      { p: "$5x + 3 = 2x + 12$ : retire $2x$ → $3x + 3 = 12$ ; retire 3 → $3x = 9$." },
      { p: "$x = $ **3** — rassembler, puis descendre les deux marches ; les deux membres valent 18 ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur la balance, $3x + 5 = 17$ : décris les deux gestes qui isolent $x$, et pourquoi l'équilibre tient.", solution: "Retirer **5 g des deux plateaux** ($3x = 12$), puis **partager chaque plateau en 3** ($x = 4$) — tout geste appliqué aux deux côtés préserve l'égalité : c'est la règle d'or." },
    { tier: "warmup", prompt: "Résous : $3x + 5 = 17$ ; $4x - 7 = 13$ ; $2x + 9 = 3$.", solution: "$x = 4$ ; $x = 5$ ; $x = \\frac{3 - 9}{2} = $ **−3** — les relatifs de 5e entrent dans la danse : une solution peut être négative." },
    { tier: "application", prompt: "Résous $5x + 3 = 2x + 12$ et vérifie.", solution: "$-2x$ : $3x + 3 = 12$ ; $-3$ : $3x = 9$ ; $x = $ **3**. Vérification : $5 \\times 3 + 3 = 18 = 2 \\times 3 + 12$ ✓ — rassembler, descendre, contrôler." },
    { tier: "challenge", prompt: "Mets en équation et résous : « Je pense à un nombre ; son triple augmenté de 10 égale son double augmenté de 20. »", solution: "$3x + 10 = 2x + 20$ → $x = $ **10** — la traduction d'abord (deux récits du même nombre), la mécanique ensuite. Vérification : $40 = 40$ ✓." },
    { tier: "exam", prompt: "Un abonnement A coûte 12 € puis 2 € par film ; un abonnement B coûte 3 € par film. Pour combien de films les deux coûtent-ils pareil ? Mets en équation, résous, vérifie, interprète.", solution: "$12 + 2x = 3x$ → $x = $ **12 films** ($12 + 24 = 36 = 3 \\times 12$ ✓). En dessous, B gagne ; au-dessus, A gagne — l'équation trouve le **point de bascule** : c'est elle qui répond aux « à partir de quand ? » du monde réel." },
  ],
  practice: [
    { tier: "warmup", label: "Deux marches", make: (r) => {
      const a = randint(r, 2, 8); const x = randint(r, -6, 12) || 5; const b = randint(r, 1, 15);
      return { prompt: `Résous $${a}x + ${b} = ${a * x + b}$.`, answer: x, solution: `$${a}x = ${a * x}$ puis $x = $ **${x}** — défaire le +, puis le ×.` };
    } },
    { tier: "application", label: "Rassembler les x", make: (r) => {
      const c = randint(r, 1, 4); const a = c + randint(r, 1, 4); const x = randint(r, 2, 9); const b = randint(r, 1, 9);
      const d = (a - c) * x + b;
      return { prompt: `Résous $${a}x + ${b} = ${c}x + ${d}$.`, answer: x, solution: `$-${c}x$ : $${a - c}x + ${b} = ${d}$ → $${a - c}x = ${d - b}$ → $x = $ **${x}**.` };
    } },
    { tier: "challenge", label: "Le point de bascule", make: (r) => {
      const fixe = pick(r, [8, 10, 12, 15]); const pa = randint(r, 1, 3); const pb = pa + randint(r, 1, 2);
      const x = fixe / (pb - pa);
      return { prompt: `Offre A : ${fixe} € + ${pa} €/unité ; offre B : ${pb} €/unité. Pour combien d'unités sont-elles à égalité ?`, answer: x, solution: `$${fixe} + ${pa}x = ${pb}x$ → $x = ${fixe} \\div ${pb - pa} = $ **${x}** — le point de bascule par l'équation.` };
    } },
  ],
};

// — Algebraic demonstrations (programme: formules, pairs/impairs, démontrer) —
const demonstrations = {
  id: "algebra.middle.demonstrations",
  level: "middle", domain: "algebra",
  title: "Démontrer avec l'algèbre",
  tagline: "Pair = 2n, impair = 2n + 1 : démontrer une propriété vraie pour tous les nombres.",
  prereqs: ["algebra.middle.calcul-litteral", "numbers.middle.divisibilite"],
  intuition:
    "Le calcul littéral de 5e devient une **usine à théorèmes** — il suffit de savoir nommer : un nombre **pair** s'écrit $2n$ (un double), un **impair** $2n + 1$ (un double plus un), trois **consécutifs** : $n$, $n+1$, $n+2$.\n\nAvec ces costumes, les conjectures se démontrent : « la somme de deux impairs est paire » devient un calcul de deux lignes.",
  depths: {
    discovery:
      "**Avec les mains** : conjecture d'abord — additionne des impairs : $3 + 5 = 8$, $7 + 11 = 18$, $13 + 9 = 22$… toujours pair ? Le tableur teste cent cas en une seconde : la **conjecture** tient. Mais cent cas ne sont pas une preuve — il en manque une infinité.",
    standard:
      "**En image** : la démonstration — deux impairs : $2n + 1$ et $2m + 1$ (deux lettres : ils sont **quelconques**, pas forcément égaux !). Somme : $2n + 1 + 2m + 1 = 2n + 2m + 2 = 2(n + m + 1)$ — un **double** : pair, pour tous les impairs de l'univers. La factorisation a fait la preuve : exhiber le facteur 2, c'est exhiber la parité.",
    advanced:
      "**Dans la tête** : le même moule produit en série — « la somme de trois consécutifs est divisible par 3 » : $n + (n+1) + (n+2) = 3n + 3 = 3(n + 1)$ ✓ (et mieux : c'est le **triple du nombre du milieu** — la formule dit plus que la conjecture !). « Le produit de deux pairs est multiple de 4 » : $2n \\times 2m = 4nm$ ✓. La méthode est toujours la même : **nommer** (le bon costume), **calculer** (développer, réduire), **factoriser** (exhiber le facteur qui conclut). Le tableur conjecture, l'algèbre signe.",
  },
  keyIdea: "Pair $= 2n$, impair $= 2n + 1$, consécutifs $= n, n+1, n+2$ — **deux lettres** pour deux nombres quelconques. Démontrer : nommer, calculer, **factoriser** le facteur qui conclut.",
  why:
    "Pourquoi deux lettres pour deux impairs ? Parce que $2n + 1$ et $2n + 1$ seraient **le même** nombre — la preuve ne vaudrait que pour $7 + 7$, pas pour $7 + 11$. Le choix des costumes est la moitié de la démonstration : trop étroit, on ne prouve rien ; bien taillé, l'infini tient dans une ligne. C'est l'erreur la plus instructive de toute l'algèbre.",
  examples: [
    { title: "Deux impairs, somme paire", steps: [
      { p: "Costumes : $2n + 1$ et $2m + 1$ (deux lettres : nombres quelconques)." },
      { p: "Somme : $2n + 2m + 2 = 2(n + m + 1)$ — un double : **pair**, démontré pour tous." },
    ] },
    { title: "Trois consécutifs", steps: [
      { p: "$n + (n+1) + (n+2) = 3n + 3 = 3(n+1)$ : divisible par 3." },
      { p: "Et $3(n+1)$ est le triple du **milieu** — la formule révèle plus que la conjecture." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris en fonction de $n$ : un nombre pair ; un impair ; le suivant d'un impair.", solution: "$2n$ ; $2n + 1$ ; $2n + 2$ — le costume algébrique : le facteur 2 dit la parité, le $+1$ dit l'écart." },
    { tier: "warmup", prompt: "Démontre que la somme de deux nombres pairs est paire.", solution: "$2n + 2m = 2(n + m)$ — un double : **pair**. Deux lettres (nombres quelconques), une factorisation, une vérité éternelle." },
    { tier: "application", prompt: "Démontre que la somme de deux impairs est paire. Pourquoi faut-il deux lettres ?", solution: "$(2n + 1) + (2m + 1) = 2n + 2m + 2 = 2(n + m + 1)$ : **pair**. Deux lettres car $2n+1$ deux fois serait **le même** impair — la preuve ne couvrirait pas $7 + 11$." },
    { tier: "challenge", prompt: "Démontre que la somme de trois entiers consécutifs est divisible par 3, et précise par quoi elle est égale.", solution: "$n + (n+1) + (n+2) = 3n + 3 = 3(n+1)$ — divisible par 3, et égale au **triple du nombre du milieu** : 14 + 15 + 16 = 45 = 3 × 15 ✓. La formule démontre et explique." },
    { tier: "exam", prompt: "Conjecture au tableur : « le produit de deux entiers consécutifs est toujours pair ». Démontre-la (indice : l'un des deux est forcément pair — traite les deux cas).", solution: "Deux cas. **Cas pair** : $n = 2k$, produit $= 2k(n+1) = 2 \\times k(n+1)$ : pair. **Cas impair** : $n + 1$ est pair, $n+1 = 2k$, produit $= n \\times 2k = 2nk$ : pair. Dans les deux cas, le facteur 2 est exhibé : **toujours pair** — la disjonction de cas rejoint la boîte à outils du démonstrateur." },
  ],
  practice: [
    { tier: "warmup", label: "Le bon costume", make: (r) => {
      const n = randint(r, 3, 30);
      if (r() < 0.5) return { prompt: `Le nombre pair $2n$ pour $n = ${n}$ : quelle valeur ?`, answer: 2 * n, solution: `$2 \\times ${n} = $ **${2 * n}**.` };
      return { prompt: `L'impair $2n + 1$ pour $n = ${n}$ : quelle valeur ?`, answer: 2 * n + 1, solution: `$2 \\times ${n} + 1 = $ **${2 * n + 1}**.` };
    } },
    { tier: "application", label: "Le triple du milieu", make: (r) => {
      const n = randint(r, 5, 40);
      return { prompt: `Sans additionner : la somme de ${n}, ${n + 1} et ${n + 2} ?`, answer: 3 * (n + 1), solution: `$3 \\times ${n + 1} = $ **${3 * (n + 1)}** — le triple du milieu, dit la formule $3(n+1)$.` };
    } },
    { tier: "challenge", label: "Substituer pour conjecturer", make: (r) => {
      const n = randint(r, 2, 9); const m = randint(r, 2, 9);
      return { prompt: `$(2n+1) + (2m+1)$ pour $n = ${n}$, $m = ${m}$ : quelle valeur (paire !) ?`, answer: 2 * n + 2 * m + 2, solution: `$${2 * n + 1} + ${2 * m + 1} = $ **${2 * n + 2 * m + 2}** $= 2(${n + m + 1})$ — pair, comme la formule le promet.` };
    } },
  ],
};

export default [equationsDegre1, demonstrations];
