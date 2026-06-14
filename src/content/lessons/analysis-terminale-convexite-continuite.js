// Field "Analysis" — HIGH module (terminale year), part 2: chain rule,
// convexity, continuity. Official terminale spécialité programme. DERIVATION
// COMPLEMENTS: composite of two functions v ∘ u, the relation
// (v ∘ u)' = (v' ∘ u) × u'; SECOND derivative; CONVEX function defined by the
// position of the curve relative to its secants — for twice-differentiable
// functions, characterizations via f' increasing / f'' ≥ 0; INFLECTION point;
// proving inequalities by convexity — REQUIRED PROOF: if f'' ≥ 0 then the
// curve lies above its tangents. (Lorenz curve as possible deepening — the
// maths complémentaires bridge.) CONTINUITY: definition by limits, every
// differentiable function is continuous, image of a convergent sequence by a
// continuous function (fixed points of u_{n+1} = f(u_n)), the INTERMEDIATE
// VALUE THEOREM and its strictly-monotone corollary, solutions of f(x) = k
// (existence, uniqueness, bracketing), dichotomy, Newton, secant methods.
import { randint, pick } from "../../core/exercises.js";

// — Chain rule and convexity (programme: composée, f'', inflexion) —
const convexite = {
  id: "analysis.high.convexite",
  level: "high", domain: "analysis",
  title: "Dérivée de composée et convexité",
  tagline: "(v∘u)′ = (v′∘u) × u′ — et la dérivée seconde qui lit la courbure.",
  prereqs: ["analysis.high.variations-derivee"],
  intuition:
    "Emboîte deux fonctions — $x \\mapsto e^{x^2}$ : d'abord le carré $u$, puis l'exponentielle $v$ : c'est la **composée** $v \\circ u$, et sa dérivée **multiplie les pentes** : $(v \\circ u)' = (v' \\circ u) \\times u'$.\n\nEt dérive deux fois : $f''$ lit la **courbure** — positive, la courbe est **convexe** (tournée vers le haut) ; négative, **concave** ; au changement de signe, le **point d'inflexion**.",
  depths: {
    discovery:
      "**Avec les mains** : la composée au travail — $f(x) = e^{x^2}$ : pente externe $v'(u) = e^{x^2}$, pente interne $u' = 2x$ : $f'(x) = 2x\\,e^{x^2}$ — l'engrenage : si $u$ tourne deux fois plus vite et $v$ amplifie par trois, le total amplifie par six. Cas vedettes : $(e^{u})' = u'e^{u}$, $(u^n)' = n\\,u'\\,u^{n-1}$, $(\\sqrt{u})' = \\frac{u'}{2\\sqrt{u}}$ — tes formules de première, généralisées d'un coup.",
    standard:
      "**En image** : la convexité se **voit** — une fonction est **convexe** sur un intervalle si sa courbe est **sous ses cordes** (toute sécante passe au-dessus : le bol) ; concave : au-dessus (le dôme). Pour une fonction deux fois dérivable, le critère pratique : $f''\\geq 0 \\iff f$ **convexe** ⟺ $f'$ **croissante** — la pente qui augmente creuse le bol : $x^2$ et $e^x$ sont convexes partout, $\\sqrt{x}$ et $\\ln$ concaves ; et $x^3$ change en 0 : son **point d'inflexion**, où la courbe traverse sa tangente.",
    advanced:
      "**Dans la tête** : la démonstration exigible — si $f'' \\geq 0$, la courbe est **au-dessus de ses tangentes** : fixe $a$ et pose $g(x) = f(x) - [f(a) + f'(a)(x - a)]$ (l'écart à la tangente) ; alors $g'(x) = f'(x) - f'(a)$, et comme $f'$ est croissante ($f'' \\geq 0$ !), $g'$ est négative avant $a$, nulle en $a$, positive après — $g$ décroît puis croît : **minimum** $g(a) = 0$, donc $g \\geq 0$ partout ✓. D'où les **inégalités par convexité** : $e^x \\geq 1 + x$ (tangente en 0 de la convexe $e^x$ !), et chaque tangente d'une convexe minore la courbe entière — une machine à inégalités. La **courbe de Lorenz** (répartition des richesses : convexe par construction, et plus elle se creuse, plus l'inégalité règne) t'attend côté applications.",
  },
  keyIdea: "$(v \\circ u)' = (v' \\circ u) \\times u'$ — les pentes se multiplient ($(e^u)' = u'e^u$). **Convexe** : courbe sous ses cordes ⟺ $f'$ croissante ⟺ $f'' \\geq 0$ — et alors **au-dessus de ses tangentes** (démontré). Inflexion : $f''$ change de signe — la courbe traverse sa tangente.",
  why:
    "Pourquoi la dérivée seconde mérite-t-elle un chapitre ? Parce que la courbure est une **information de second ordre** que la pente ignore : l'économie distingue rendements croissants et décroissants (convexe/concave), la physique lit l'accélération dans $f''$, la statistique fonde ses inégalités (Jensen !) sur la convexité. Et la composée est l'outil de dérivation le plus utilisé du supérieur — la moitié des fonctions réelles sont des emboîtements, et $(v \\circ u)'$ les ouvre toutes.",
  examples: [
    { title: "L'engrenage des pentes", steps: [
      { p: "$f(x) = e^{x^2}$ : externe $e^u$ (pente $e^{x^2}$), interne $x^2$ (pente $2x$)." },
      { p: "$f'(x) = 2x\\,e^{x^2}$ — les pentes se multiplient, jamais ne s'additionnent." },
    ] },
    { title: "Au-dessus de ses tangentes", steps: [
      { p: "$g(x) = f(x) - [f(a) + f'(a)(x - a)]$ : $g' = f' - f'(a)$, du signe de $x - a$ si $f'$ croît." },
      { p: "$g$ décroît puis croît : minimum $g(a) = 0$ — l'écart à la tangente ne devient jamais négatif ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dérive $f(x) = e^{x^2}$ et $g(x) = (3x + 1)^4$ par la formule de la composée.", solution: "$f'(x) = 2x\\,e^{x^2}$ (pente interne $2x$ × pente externe $e^{x^2}$) ; $g'(x) = 4 \\times 3 \\times (3x+1)^3 = 12(3x+1)^3$ — $(u^n)' = n\\,u'\\,u^{n-1}$ : les pentes se multiplient, l'engrenage tourne." },
    { tier: "warmup", prompt: "Calcule $f''$ pour $f(x) = x^3 - 3x^2$, étudie son signe, et donne les intervalles de convexité et le point d'inflexion.", solution: "$f'(x) = 3x^2 - 6x$, $f''(x) = 6x - 6$ : négative avant 1, positive après — **concave** sur $]-\\infty\\,;\\,1]$, **convexe** sur $[1\\,;\\,+\\infty[$, **inflexion** en $x = 1$ : la courbe y traverse sa tangente — le dôme devient bol." },
    { tier: "application", prompt: "Démontre l'inégalité $e^x \\geq 1 + x$ pour tout réel $x$, par la convexité de l'exponentielle.", solution: "$(e^x)'' = e^x > 0$ : l'exponentielle est **convexe** sur $\\mathbb{R}$ — elle est donc au-dessus de **toutes** ses tangentes, en particulier celle en 0 : $y = e^0 + e^0(x - 0) = 1 + x$ — d'où $e^x \\geq 1 + x$ ✓, avec égalité en 0 seul : une inégalité célèbre, offerte par une tangente." },
    { tier: "challenge", prompt: "La courbe de $f$ admet un point d'inflexion en $a$. Que fait la tangente en $a$, contrairement aux tangentes d'une zone convexe ?", solution: "En zone convexe, la courbe reste **au-dessus** de chaque tangente (démontré !) ; au point d'inflexion, $f''$ change de signe — la courbe **traverse** sa tangente : au-dessus d'un côté, au-dessous de l'autre — c'est la signature graphique de l'inflexion, et le seul endroit où la tangente coupe au lieu de soutenir." },
    { tier: "exam", prompt: "Démontre que si $f'' \\geq 0$ sur un intervalle, la courbe de $f$ est au-dessus de chacune de ses tangentes (étudie l'écart $g(x) = f(x) - f(a) - f'(a)(x - a)$).", solution: "$g'(x) = f'(x) - f'(a)$ — or $f'' \\geq 0$ rend $f'$ **croissante** : $g'$ est négative pour $x < a$, nulle en $a$, positive pour $x > a$ — $g$ décroît puis croît : son **minimum** est $g(a) = 0$, donc $g(x) \\geq 0$ partout, c'est-à-dire $f(x) \\geq f(a) + f'(a)(x - a)$ ✓ — la démonstration exigible : l'étude de variations de première, appliquée à l'écart, et chaque tangente d'une convexe devient un minorant global — la machine à inégalités est démontrée." },
  ],
  practice: [
    { tier: "warmup", label: "L'engrenage", make: (r) => {
      const a = randint(r, 2, 5); const x = randint(r, 1, 3);
      return { prompt: `$f(x) = e^{${a}x}$ : $f'(x) = k\\,e^{${a}x}$ — que vaut $k$ ?`, answer: a, solution: `Pente interne $${a}$ × externe : $k = $ **${a}** — $(e^u)' = u'e^u$.` };
    } },
    { tier: "application", label: "Convexe ou concave ?", make: (r) => {
      const cas = pick(r, [["x^2", 1], ["e^x", 1], ["\\sqrt{x}", 0], ["-x^2 + 3x", 0], ["x^4", 1]]);
      return { prompt: `$f(x) = ${cas[0]}$ : convexe (1) ou concave (0) sur son domaine usuel ?`, answer: cas[1], solution: `$f''$ ${cas[1] ? "\\geq 0$ : **convexe** — le bol" : "\\leq 0$ : **concave** — le dôme"}.` };
    } },
    { tier: "challenge", label: "L'inflexion localisée", make: (r) => {
      const c = randint(r, 1, 5);
      return { prompt: `$f''(x) = 6x - ${6 * c}$ : en quel $x$ le point d'inflexion ?`, answer: c, solution: `$f''$ s'annule **en changeant de signe** en $x = $ **${c}** — la courbe y traverse sa tangente.` };
    } },
  ],
};

// — Continuity and IVT (programme: TVI, dichotomie, point fixe) —
const continuite = {
  id: "analysis.high.continuite",
  level: "high", domain: "analysis",
  title: "Continuité et valeurs intermédiaires",
  tagline: "Le tracé sans lever le crayon — et toute valeur traversée est atteinte.",
  prereqs: ["analysis.high.limites-fonctions"],
  intuition:
    "Une fonction est **continue** en $a$ si $f(x) \\to f(a)$ quand $x \\to a$ — pas de saut, pas de trou : le crayon ne se lève pas.\n\nLe théorème payant : les **valeurs intermédiaires** — une fonction continue sur $[a\\,;\\,b]$ atteint **toute** valeur comprise entre $f(a)$ et $f(b)$ : pour traverser la rivière, il faut se mouiller.",
  depths: {
    discovery:
      "**Avec les mains** : qui est continu ? Toute fonction **dérivable** l'est (une pente finie interdit le saut : c'est un théorème !) — polynômes, exponentielle, racine, quotients sur leur domaine : tout ton répertoire. La réciproque est fausse : $|x|$ est continue en 0 (pas de saut) mais pas dérivable (le point anguleux !) — continu est plus faible que lisse.",
    standard:
      "**En image** : le **TVI** au travail — $f(x) = x^3 + x - 1$ : $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : la fonction continue passe du négatif au positif, donc elle **s'annule** quelque part entre 0 et 1 — l'**existence** d'une solution, sans la calculer ! Et le **corollaire** ajoute l'**unicité** : si $f$ est de plus **strictement monotone**, elle ne traverse qu'une fois — existence + unicité : le duo que tout l'examen réclame, et le tableau de variations le sert sur un plateau.",
    advanced:
      "**Dans la tête** : la traque numérique — la **dichotomie** encadre la solution garantie par le TVI : coupe $[0\\,;\\,1]$ en deux, garde la moitié où le signe change, recommence — chaque tour **divise l'incertitude par 2** : vingt tours, un millionième ; **Newton** fait mieux (suivre la tangente : les décimales doublent à chaque pas), la **sécante** s'en approche sans dérivée. Et le théorème discret : si $u_{n+1} = f(u_n)$ **converge** vers $\\ell$ avec $f$ continue, alors — en passant à la limite des deux côtés — $\\ell = f(\\ell)$ : la limite est un **point fixe** de $f$ : l'équation de la limite, offerte par la continuité — le pont entre tes suites et tes fonctions, et l'outil roi des suites récurrentes du bac.",
  },
  keyIdea: "Continue : $f(x) \\to f(a)$ — dérivable ⟹ continue (pas l'inverse !). **TVI** : continue sur $[a\\,;\\,b]$ ⟹ toute valeur entre $f(a)$ et $f(b)$ est atteinte ; **+ strictement monotone ⟹ unicité**. Dichotomie : l'incertitude divisée par 2 ; et si $u_{n+1} = f(u_n) \\to \\ell$ : $\\ell = f(\\ell)$ (**point fixe**).",
  why:
    "Pourquoi un théorème pour une évidence graphique ? Parce que l'« évidence » prouve l'**existence** de solutions qu'aucune formule ne donne — $x^3 + x = 1$, $e^x = 3x$, les équations de la vraie vie n'ont pas de discriminant : le TVI garantit, la dichotomie calcule — c'est le couple existence-approximation qui fait tourner tout solveur numérique, de ta calculatrice aux simulations climatiques. Bolzano l'a démontré en 1817 pour assainir l'analyse : l'évidence aussi se prouve.",
  examples: [
    { title: "L'existence sans formule", steps: [
      { p: "$f(x) = x^3 + x - 1$ : $f(0) = -1$, $f(1) = 1$ — signes opposés, fonction continue." },
      { p: "Le TVI garantit une racine dans $]0\\,;\\,1[$ — sans la moindre formule de résolution." },
    ] },
    { title: "Le point fixe de la limite", steps: [
      { p: "$u_{n+1} = f(u_n) \\to \\ell$, $f$ continue : à la limite, $u_{n+1} \\to \\ell$ et $f(u_n) \\to f(\\ell)$." },
      { p: "$\\ell = f(\\ell)$ — la limite vérifie l'équation du point fixe : la candidate est trouvée." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Montre que l'équation $x^3 + x - 1 = 0$ admet au moins une solution dans $[0\\,;\\,1]$.", solution: "$f(x) = x^3 + x - 1$ est continue (polynôme — dérivable, donc continue) avec $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : par le **TVI**, $f$ s'annule au moins une fois dans $]0\\,;\\,1[$ ✓ — l'existence, garantie sans résolution." },
    { tier: "warmup", prompt: "Avec $f'(x) = 3x^2 + 1$, complète : la solution précédente est-elle unique ?", solution: "$f'(x) = 3x^2 + 1 > 0$ partout : $f$ est **strictement croissante** — le corollaire du TVI conclut : la solution est **unique** ✓ — existence par les signes, unicité par la monotonie : le duo complet, lu sur le tableau de variations." },
    { tier: "application", prompt: "Encadre cette solution par dichotomie : pars de $[0\\,;\\,1]$ et fais trois étapes ($f(0{,}5) \\approx -0{,}375$ ; $f(0{,}75) \\approx 0{,}17$ ; $f(0{,}625) \\approx -0{,}13$).", solution: "$f(0{,}5) < 0$ : la racine est dans $[0{,}5\\,;\\,1]$ ; $f(0{,}75) > 0$ : dans $[0{,}5\\,;\\,0{,}75]$ ; $f(0{,}625) < 0$ : dans $[0{,}625\\,;\\,0{,}75]$ — trois coupes, incertitude divisée par 8 : la dichotomie grignote, garantie par le TVI à chaque étage." },
    { tier: "challenge", prompt: "Donne une fonction continue mais non dérivable en un point, et une fonction non continue en un point — et place « dérivable », « continue » sur une échelle d'exigence.", solution: "$|x|$ : **continue** en 0 (pas de saut) mais **pas dérivable** (point anguleux) ; la fonction partie entière saute à chaque entier : **pas continue**. Échelle : dérivable ⟹ continue ⟹ définie — chaque cran ajoute une exigence (la pente finie exige déjà l'absence de saut), et aucune flèche ne se renverse." },
    { tier: "exam", prompt: "La suite $u_{n+1} = \\sqrt{u_n + 2}$, $u_0 = 0$, est croissante et majorée par 2 (admis). Démontre qu'elle converge et détermine sa limite (continuité de $x \\mapsto \\sqrt{x + 2}$ et point fixe).", solution: "Croissante et **majorée** : le théorème de convergence monotone garantit la convergence vers un réel $\\ell \\in [0\\,;\\,2]$. La fonction $f(x) = \\sqrt{x + 2}$ est **continue** : en passant à la limite dans $u_{n+1} = f(u_n)$, on obtient $\\ell = \\sqrt{\\ell + 2}$ — élève au carré : $\\ell^2 - \\ell - 2 = 0$, racines $-1$ et $2$ (ton discriminant !) — et $\\ell \\geq 0$ : $\\ell = $ **2** ✓ — la convergence monotone donne l'existence, la continuité l'équation, le second degré la valeur : trois années de leçons bouclées dans l'exercice roi des suites du bac." },
  ],
  practice: [
    { tier: "warmup", label: "Le TVI flaire", make: (r) => {
      const fa = pick(r, [-3, -2, -1]); const fb = pick(r, [1, 2, 4]); const ok = r() < 0.5;
      const a = ok ? fa : Math.abs(fa);
      return { prompt: `$f$ continue sur $[0\\,;\\,1]$, $f(0) = ${a}$, $f(1) = ${fb}$ : le TVI garantit-il une racine ? (1 = oui, 0 = non)`, answer: a < 0 ? 1 : 0, solution: `Signes ${a < 0 ? "**opposés** : la traversée de 0 est garantie — oui" : "**identiques** : aucune garantie (ni interdiction) — non"}.` };
    } },
    { tier: "application", label: "La dichotomie grignote", make: (r) => {
      const n = randint(r, 3, 6);
      return { prompt: `Dichotomie sur $[0\\,;\\,1]$ : après ${n} coupes, l'incertitude vaut $\\frac{1}{?}$`, answer: 2 ** n, solution: `Divisée par 2 à chaque coupe : $\\frac{1}{2^{${n}}} = \\frac{1}{${2 ** n}}$ — **${2 ** n}**.` };
    } },
    { tier: "challenge", label: "Le point fixe", make: (r) => {
      const c = randint(r, 2, 6);
      return { prompt: `$u_{n+1} = \\frac{u_n + ${c}}{2}$ converge vers $\\ell$ : résous $\\ell = \\frac{\\ell + ${c}}{2}$.`, answer: c, solution: `$2\\ell = \\ell + ${c}$ : $\\ell = $ **${c}** — la continuité a transformé la récurrence en équation.` };
    } },
  ],
};

export default [convexite, continuite];
