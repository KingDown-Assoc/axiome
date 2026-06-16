// Field "Analysis" — HIGH module (terminale year), part 1: induction and
// limits. Official terminale spécialité programme. SEQUENCES: (u_n) tends to
// +∞ if every interval [A ; +∞[ contains all the u_n from some rank on;
// convergence to ℓ if every open interval containing ℓ does; limits and
// comparison, SQUEEZE theorem, operations; behavior of the geometric (q^n);
// ADMITTED theorem: every increasing bounded-above sequence converges —
// REQUIRED PROOFS: every increasing non-bounded-above sequence tends to +∞;
// limit of (q^n) after an INDUCTION proof of Bernoulli's inequality; divergence
// by minoration; limits of exp at ±∞. REASONING BY INDUCTION as an explicit
// capacity. LIMITS OF FUNCTIONS: finite/infinite limits at ±∞ and at a point,
// ASYMPTOTES parallel to the axes, reference limits, comparison, operations —
// REQUIRED PROOF: growth comparison of x^n and exp at +∞.
import { randint, pick } from "../../core/exercises.js";

// — Proof by induction (programme: raisonner par récurrence) —
const recurrence = {
  id: "analysis.high.recurrence",
  level: "high", domain: "analysis",
  title: "Le raisonnement par récurrence",
  tagline: "Le principe de récurrence : un premier domino, puis chacun pousse le suivant.",
  prereqs: ["algebra.high.suites", "logic.high.ensembles-logique"],
  intuition:
    "Comment prouver qu'une propriété est vraie pour **tous** les entiers — une infinité de cas ? Deux gestes suffisent : montrer qu'elle est vraie au départ (**initialisation**), et que si elle tient à un rang, elle tient au suivant (**hérédité**).\n\nC'est la **récurrence** : le premier domino tombe, chaque domino pousse le suivant — la rangée entière s'effondre.",
  depths: {
    discovery:
      "**Avec les mains** : le rituel en trois temps — *initialisation* : vérifier $P(0)$ (ou $P(1)$ : le premier domino) ; *hérédité* : **supposer** $P(n)$ vraie pour un entier $n$ (l'hypothèse de récurrence) et **en déduire** $P(n+1)$ ; *conclusion* : $P(n)$ est vraie pour tout $n$. Manquer l'un des deux temps casse tout — des dominos debout sans poussée initiale, ou un premier domino isolé.",
    standard:
      "**En image** : la récurrence au travail sur ta suite — montre que $u_{n+1} = 2u_n + 1$ avec $u_0 = 1$ vérifie $u_n = 2^{n+1} - 1$ : *init* : $u_0 = 2^1 - 1 = 1$ ✓ ; *hérédité* : si $u_n = 2^{n+1} - 1$, alors $u_{n+1} = 2(2^{n+1} - 1) + 1 = 2^{n+2} - 1$ ✓ — conclu pour tout $n$. La formule explicite, **démontrée** et non plus devinée : la récurrence est l'outil de certification des suites.",
    advanced:
      "**Dans la tête** : la démonstration exigible du chapitre — l'**inégalité de Bernoulli** : pour $a > 0$ et tout entier $n$, $(1 + a)^n \\geq 1 + na$ : *init* : $(1+a)^0 = 1 \\geq 1$ ✓ ; *hérédité* : si $(1+a)^n \\geq 1 + na$, multiplie par $(1 + a) > 0$ : $(1+a)^{n+1} \\geq (1 + na)(1 + a) = 1 + (n+1)a + na^2 \\geq 1 + (n+1)a$ ✓ — la croissance géométrique **domine** la croissance linéaire, certifié pour l'infini : c'est ce lemme qui prouvera $q^n \\to +\\infty$ à la leçon suivante. Le principe remonte loin — Pascal le formule dans son Traité du triangle arithmétique (1654), Fermat raisonnait par « descente infinie » (la récurrence à rebours) — et il repose sur l'essence même de $\\mathbb{N}$ : chaque entier a un successeur, aucune chute n'est sans fin.",
  },
  keyIdea: "**Initialisation** ($P(0)$ vraie) + **hérédité** ($P(n) \\Rightarrow P(n+1)$) ⟹ $P(n)$ pour tout $n$ — les dominos. L'hypothèse de récurrence se *suppose* à un rang, jamais au suivant. **Bernoulli** : $(1+a)^n \\geq 1 + na$ — démontrée par récurrence, clé des limites géométriques.",
  why:
    "Pourquoi un mode de preuve dédié aux entiers ? Parce que l'infini dénombrable ne se vérifie pas cas par cas — et que la moitié des objets du programme sont définis *par récurrence* (les suites $u_{n+1} = f(u_n)$, les algorithmes itératifs, les structures de données) : seule la récurrence prouve leurs propriétés. C'est aussi le raisonnement fondateur de l'informatique théorique — prouver qu'une boucle fait ce qu'elle promet, c'est une récurrence sur le compteur : l'invariant de boucle de tes cours futurs.",
  examples: [
    { title: "Le rituel complet", steps: [
      { p: "$u_{n+1} = 2u_n + 1$, $u_0 = 1$ — conjecture : $u_n = 2^{n+1} - 1$. Init : $u_0 = 1$ ✓." },
      { p: "Hérédité : $u_{n+1} = 2(2^{n+1} - 1) + 1 = 2^{n+2} - 1$ ✓ — conclu pour tout $n$." },
    ] },
    { title: "Bernoulli, dominos compris", steps: [
      { p: "Si $(1+a)^n \\geq 1 + na$, multiplier par $(1+a)$ : $(1+a)^{n+1} \\geq 1 + (n+1)a + na^2$." },
      { p: "Et $na^2 \\geq 0$ : l'inégalité passe au rang suivant — la géométrique domine la linéaire, pour toujours." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Énonce les trois temps d'une démonstration par récurrence, et explique l'image des dominos.", solution: "**Initialisation** ($P$ vraie au premier rang), **hérédité** (si $P(n)$ vraie pour un entier $n$, alors $P(n+1)$ vraie), **conclusion** (vraie pour tout $n$) — le premier domino tombe, chaque domino pousse le suivant : la rangée infinie s'effondre. Sans initialisation, des dominos debout ; sans hérédité, un domino seul." },
    { tier: "warmup", prompt: "Démontre par récurrence que pour tout $n$, la somme $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$ (ta formule de Gauss, certifiée cette fois).", solution: "Init : $n = 1$ : $1 = \\frac{1 \\times 2}{2}$ ✓. Hérédité : si $1 + \\cdots + n = \\frac{n(n+1)}{2}$, alors $1 + \\cdots + (n+1) = \\frac{n(n+1)}{2} + (n+1) = \\frac{(n+1)(n+2)}{2}$ ✓ — la formule du pliage, désormais **prouvée** pour l'infini : la récurrence certifie ce que Gauss devinait." },
    { tier: "application", prompt: "$u_0 = 1$ et $u_{n+1} = 2u_n + 1$ : démontre par récurrence que $u_n = 2^{n+1} - 1$ pour tout $n$.", solution: "Init : $u_0 = 2^1 - 1 = 1$ ✓. Hérédité : supposons $u_n = 2^{n+1} - 1$ ; alors $u_{n+1} = 2(2^{n+1} - 1) + 1 = 2^{n+2} - 2 + 1 = 2^{n+2} - 1$ ✓ — conclusion : pour tout $n$. La récurrence transforme la conjecture (calculée sur trois termes) en théorème (valable pour tous)." },
    { tier: "challenge", prompt: "Où est la faille ? « Montrons que tout $n \\geq 1$ vérifie $n = n + 1$ : hérédité — si $n = n + 1$, ajouter 1 donne $n + 1 = n + 2$ ✓. Donc c'est vrai pour tout $n$. »", solution: "L'hérédité est **valide**… mais l'**initialisation manque** — et pour cause : $1 = 2$ est faux ! Des dominos parfaitement enchaînés, mais aucun ne tombe : sans premier domino, la rangée reste debout — les deux temps sont indispensables, et la faille classique des fausses récurrences est toujours là." },
    { tier: "exam", prompt: "Démontre l'inégalité de Bernoulli : pour tout réel $a > 0$ et tout entier naturel $n$, $(1 + a)^n \\geq 1 + na$.", solution: "**Init** : $n = 0$ : $(1+a)^0 = 1 \\geq 1 + 0$ ✓. **Hérédité** : supposons $(1+a)^n \\geq 1 + na$ pour un entier $n$ ; comme $1 + a > 0$, multiplier conserve l'ordre : $(1+a)^{n+1} \\geq (1 + na)(1 + a) = 1 + (n+1)a + na^2 \\geq 1 + (n+1)a$ (car $na^2 \\geq 0$) ✓. **Conclusion** : pour tout $n$ ✓ — la démonstration exigible : la puissance bat l'affine d'une marge $na^2$ qui ne fera que croître, et c'est ce lemme qui enverra $q^n$ vers l'infini à la leçon suivante." },
  ],
  practice: [
    { tier: "warmup", label: "Quel temps manque ?", make: (r) => {
      const cas = pick(r, [["on vérifie P(0), puis on conclut directement", 1], ["on montre P(n) ⟹ P(n+1), puis on conclut", 0], ["on vérifie P(0) et on montre P(n) ⟹ P(n+1)", 2]]);
      return { prompt: `Démonstration : « ${cas[0]} » — il manque : l'hérédité (1), l'initialisation (0), rien (2) ?`, answer: cas[1], solution: `**${cas[1] === 1 ? "L'hérédité" : cas[1] === 0 ? "L'initialisation" : "Rien"}** — ${cas[1] === 2 ? "le rituel est complet" : "un seul temps ne prouve rien"}.` };
    } },
    { tier: "application", label: "L'hérédité calculée", make: (r) => {
      const k = pick(r, [2, 3]); const n = randint(r, 2, 5);
      return { prompt: `$u_{n+1} = ${k}u_n$ et $u_n = ${k}^n$ (hypothèse) : que vaut $u_{n+1}$ pour $n = ${n}$ ?`, answer: k ** (n + 1), solution: `$${k} \\times ${k}^{${n}} = ${k}^{${n + 1}} = $ **${k ** (n + 1)}** — l'hypothèse pousse le rang suivant.` };
    } },
    { tier: "challenge", label: "Bernoulli minore", make: (r) => {
      const a = pick(r, [1, 2]); const n = randint(r, 3, 7);
      return { prompt: `Bernoulli : $(1 + ${a})^{${n}} \\geq 1 + ?$ (donne le minorant $1 + na$ complet)`, answer: 1 + n * a, solution: `$1 + ${n} \\times ${a} = $ **${1 + n * a}** — et en vrai, $${1 + a}^{${n}} = ${(1 + a) ** n}$ : la marge enfle.` };
    } },
  ],
};

// — Limits of sequences (programme: définitions, gendarmes, q^n) —
const suitesLimites = {
  id: "analysis.high.suites-limites",
  level: "high", domain: "analysis",
  title: "Limites de suites",
  tagline: "Limite d'une suite, et le comportement de qⁿ selon la valeur de q.",
  prereqs: ["analysis.high.recurrence", "algebra.high.suites-sommes"],
  intuition:
    "Tes limites intuitives de première reçoivent leur **définition** : $(u_n)$ converge vers $\\ell$ si **tout intervalle ouvert** contenant $\\ell$ contient tous les $u_n$ à partir d'un certain rang — aussi serré soit le piège, la suite finit dedans et n'en sort plus.\n\nVers $+\\infty$ : tout intervalle $[A\\,;\\,+\\infty[$ finit par tout contenir — aucun plafond ne résiste.",
  depths: {
    discovery:
      "**Avec les mains** : la définition au travail — $u_n = \\frac{1}{n}$ converge vers 0 : prends l'intervalle $]-0{,}01\\,;\\,0{,}01[$ — dès $n > 100$, tous les termes sont dedans ✓ ; resserre à $10^{-6}$ : dès $n > 10^6$ ✓ — *tout* piège finit par capturer : c'est la convergence. Les **opérations** suivent l'intuition (somme, produit, quotient de limites), avec leurs formes indéterminées à débusquer.",
    standard:
      "**En image** : les théorèmes de comparaison — le **théorème des gendarmes** : si $v_n \\leq u_n \\leq w_n$ et que les deux gendarmes convergent vers le **même** $\\ell$, le prisonnier aussi (l'intervalle des gendarmes se referme sur lui) ; et la **minoration** : si $u_n \\geq v_n$ avec $v_n \\to +\\infty$, alors $u_n \\to +\\infty$ (poussé par-dessous, démontré : tout $[A\\,;\\,+\\infty[$ capturant $v_n$ capture $u_n$) — on ne calcule pas la limite, on **encadre**.",
    advanced:
      "**Dans la tête** : les deux théorèmes structurels — la **convergence monotone** (admise) : toute suite croissante **majorée** converge (elle monte, le plafond l'arrête : elle se tasse quelque part) — et sa jumelle démontrée : toute suite croissante **non majorée** tend vers $+\\infty$ (aucun $A$ ne la majore, donc un terme dépasse $A$, et la croissance garde tous les suivants au-dessus ✓). Et le destin de $q^n$, **démontré par Bernoulli** : pour $q > 1$, écris $q = 1 + a$ ($a > 0$) — alors $q^n \\geq 1 + na \\to +\\infty$ : la minoration conclut ✓ ; pour $|q| < 1$, l'inverse renverse : $q^n \\to 0$ ; $q = 1$ stagne, $q \\leq -1$ oscille sans limite — **quatre destins, arbitrés par la raison**, et tes limites intuitives de première sont désormais des théorèmes.",
  },
  keyIdea: "Convergence vers $\\ell$ : **tout intervalle ouvert** contenant $\\ell$ finit par tout contenir ; vers $+\\infty$ : tout $[A\\,;\\,+\\infty[$ aussi. **Gendarmes** (encadrement vers le même $\\ell$), minoration (poussé par $+\\infty$), **convergence monotone** (croissante majorée converge) — et $q^n$ : $\\to +\\infty$ si $q > 1$ (Bernoulli !), $\\to 0$ si $|q| < 1$.",
  why:
    "Pourquoi définir si finement ce que « tendre vers » veut dire ? Parce que l'intuition se trompe aux frontières — des suites qui semblent converger divergent (les sommes $1 + \\frac{1}{2} + \\frac{1}{3} + \\cdots$ !), d'autres convergent contre toute attente — et seule la définition tranche. C'est l'acte de naissance de l'**analyse rigoureuse** : Cauchy et Weierstrass ont bâti ces définitions au XIXe pour assainir un siècle de calculs audacieux — et toutes les limites du supérieur, des séries aux intégrales impropres, parleront exactement ce langage.",
  examples: [
    { title: "Le piège qui se referme", steps: [
      { p: "$u_n = \\frac{1}{n}$ et le piège $]-10^{-6}\\,;\\,10^{-6}[$ : dès $n > 10^6$, tout est dedans." },
      { p: "Tout intervalle ouvert autour de 0 finit par tout contenir — c'est **la** définition de $u_n \\to 0$." },
    ] },
    { title: "qⁿ par Bernoulli", steps: [
      { p: "$q = 1{,}5 = 1 + 0{,}5$ : Bernoulli donne $1{,}5^n \\geq 1 + 0{,}5n$." },
      { p: "Le minorant file vers $+\\infty$, la suite est poussée par-dessous : $q^n \\to +\\infty$ ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Avec la définition, justifie que $u_n = \\frac{1}{n}$ converge vers 0 : à partir de quel rang les termes sont-ils dans $]-0{,}01\\,;\\,0{,}01[$ ? Dans $]-10^{-6}\\,;\\,10^{-6}[$ ?", solution: "Dès $n > 100$ pour le premier piège, dès $n > 10^6$ pour le second — **tout** intervalle ouvert contenant 0, aussi serré soit-il, finit par contenir tous les termes : c'est exactement la définition de la convergence." },
    { tier: "warmup", prompt: "Encadre $u_n = \\frac{\\sin(n)}{n}$ et conclus par le théorème des gendarmes.", solution: "$-1 \\leq \\sin(n) \\leq 1$ donc $-\\frac{1}{n} \\leq u_n \\leq \\frac{1}{n}$ — les deux gendarmes tendent vers **0** : le prisonnier aussi, $u_n \\to 0$ ✓ — on n'a jamais calculé $\\sin(n)$ : l'encadrement a tout fait." },
    { tier: "application", prompt: "Détermine la limite de $q^n$ pour $q = 1{,}02$ ; $q = 0{,}97$ ; $q = 1$ ; $q = -2$ — et relie au capital, à la dépréciation.", solution: "$1{,}02^n \\to +\\infty$ (le capital à 2 % finit par tout dépasser), $0{,}97^n \\to 0$ (la valeur fond), $1^n = 1$ (stagne), $(-2)^n$ : **pas de limite** (oscille en explosant) — quatre destins arbitrés par la raison : tes intuitions de première, désormais théorèmes." },
    { tier: "challenge", prompt: "Démontre que toute suite croissante non majorée tend vers $+\\infty$.", solution: "Soit $A$ un réel quelconque : la suite n'est **pas majorée** par $A$, donc un terme $u_N$ dépasse $A$ ; et la suite est **croissante** : tous les termes suivants vérifient $u_n \\geq u_N > A$ — l'intervalle $[A\\,;\\,+\\infty[$ contient tous les termes à partir du rang $N$, et $A$ était quelconque : $u_n \\to +\\infty$ ✓ — la démonstration tient en deux ingrédients : la non-majoration ouvre la porte, la croissance interdit de redescendre." },
    { tier: "exam", prompt: "Démontre que $q^n \\to +\\infty$ pour $q > 1$, en utilisant l'inégalité de Bernoulli, puis déduis-en la limite de $q^n$ pour $0 < q < 1$.", solution: "Pose $q = 1 + a$ avec $a = q - 1 > 0$ : Bernoulli (démontrée par récurrence !) donne $q^n = (1+a)^n \\geq 1 + na$ — or $1 + na \\to +\\infty$, et la **divergence par minoration** conclut : $q^n \\to +\\infty$ ✓. Pour $0 < q < 1$ : $\\frac{1}{q} > 1$ donc $\\left(\\frac{1}{q}\\right)^n \\to +\\infty$, et $q^n = \\dfrac{1}{(1/q)^n} \\to $ **0** ✓ — la démonstration exigible complète : une récurrence, une minoration, une inversion — trois leçons s'emboîtent pour sceller le destin des géométriques." },
  ],
  practice: [
    { tier: "warmup", label: "Le destin de qⁿ", make: (r) => {
      const cas = pick(r, [["1{,}05", 2], ["0{,}9", 0], ["1", 1], ["2", 2], ["0{,}5", 0]]);
      return { prompt: `Limite de $${cas[0]}^n$ : 0 (réponds 0), 1 (réponds 1), ou $+\\infty$ (réponds 2) ?`, answer: cas[1], solution: `Raison ${cas[1] === 2 ? "> 1 : explose vers $+\\infty$" : cas[1] === 0 ? "entre 0 et 1 : fond vers 0" : "= 1 : stagne à 1"} — **${cas[1]}**.` };
    } },
    { tier: "application", label: "Le rang du piège", make: (r) => {
      const eps = pick(r, [[100, "0{,}01"], [1000, "0{,}001"], [50, "0{,}02"]]);
      return { prompt: `$u_n = \\frac{1}{n}$ : à partir de quel rang (exclu) tous les termes sont-ils dans $]-${eps[1]}\\,;\\,${eps[1]}[$ ?`, answer: eps[0], solution: `$\\frac{1}{n} < ${eps[1]} \\Leftrightarrow n > $ **${eps[0]}** — le piège se referme.` };
    } },
    { tier: "challenge", label: "Le minorant de Bernoulli", make: (r) => {
      const a = pick(r, [0.5, 1]); const A = pick(r, [10, 20, 50]);
      const n = Math.ceil((A - 1) / a);
      return { prompt: `$q = ${String(1 + a).replace(".", ",")}$ : Bernoulli garantit $q^n \\geq 1 + ${String(a).replace(".", ",")}n$. Quel rang assure $q^n \\geq ${A}$ ?`, answer: n, solution: `$1 + ${String(a).replace(".", ",")}n \\geq ${A} \\Leftrightarrow n \\geq $ **${n}** — le minorant pousse la suite au-dessus de tout plafond.` };
    } },
  ],
};

// — Limits of functions (programme: asymptotes, croissance comparée) —
const limitesFonctions = {
  id: "analysis.high.limites-fonctions",
  level: "high", domain: "analysis",
  title: "Limites de fonctions et asymptotes",
  tagline: "Limites et asymptotes, et la croissance comparée de l'exponentielle.",
  prereqs: ["analysis.high.suites-limites", "analysis.high.exponentielle"],
  intuition:
    "Les limites passent au continu : $f(x)$ peut tendre vers $\\ell$ ou $\\pm\\infty$, quand $x \\to \\pm\\infty$ ou vers **un point** — six combinaisons, un seul langage.\n\nEt la géométrie suit : une limite finie en $\\pm\\infty$ dessine une **asymptote horizontale**, une limite infinie en un point une **asymptote verticale** — la courbe longe sa droite sans jamais l'atteindre.",
  depths: {
    discovery:
      "**Avec les mains** : tes références livrent leurs limites — $\\frac{1}{x} \\to 0$ en $\\pm\\infty$ (asymptote horizontale $y = 0$) et $\\to \\pm\\infty$ en $0^\\pm$ (asymptote verticale $x = 0$) : l'hyperbole de seconde longe ses deux axes ; $x^n \\to +\\infty$, $\\sqrt{x} \\to +\\infty$, et $e^x \\to +\\infty$ en $+\\infty$, $\\to 0$ en $-\\infty$ (**démontré** : $e^x \\geq 1 + x$ par convexité-Bernoulli pousse en $+\\infty$, et $e^{-x} = \\frac{1}{e^x}$ renverse) — l'asymptote $y = 0$ de l'exponentielle à gauche.",
    standard:
      "**En image** : les opérations et leurs pièges — somme, produit, quotient de limites suivent l'intuition, **sauf** les formes indéterminées : « $\\infty - \\infty$ », « $\\frac{\\infty}{\\infty}$ », « $0 \\times \\infty$ », « $\\frac{0}{0}$ » — quatre duels où chaque camp peut gagner : on tranche en **factorisant le terme dominant** ($x^2 - x = x^2(1 - \\frac{1}{x}) \\to +\\infty$) — l'indétermination n'est pas une impasse, c'est une invitation à transformer.",
    advanced:
      "**Dans la tête** : le duel au sommet, **démontré** — $\\dfrac{e^x}{x^n}$ en $+\\infty$ : qui gagne ? Astuce : $e^x = \\left(e^{x/(n+1)}\\right)^{n+1}$, et chaque facteur $\\frac{e^{x/(n+1)}}{x^{1/(n+1)}}$… la voie royale du programme passe par la minoration $e^t \\geq \\frac{t^2}{2}$ (établie par étude de fonction : dérive deux fois !) appliquée à $t = \\frac{x}{n}$ : il en sort $\\frac{e^x}{x^n} \\to +\\infty$ — l'**exponentielle écrase toute puissance** : c'est la croissance comparée, et la raison profonde pour laquelle un capital composé bat tout salaire polynomial, pour laquelle l'explosion combinatoire condamne les algorithmes naïfs. La hiérarchie est gravée : $\\ln \\ll x^n \\ll e^x$ — le logarithme la complétera.",
  },
  keyIdea: "Limite finie en $\\pm\\infty$ → **asymptote horizontale** ; limite infinie en un point → **verticale**. Formes indéterminées ($\\infty - \\infty$, $\\frac{\\infty}{\\infty}$, $0 \\times \\infty$, $\\frac{0}{0}$) : **factoriser le dominant**. Croissance comparée : $\\dfrac{e^x}{x^n} \\to +\\infty$ — l'exponentielle écrase les puissances.",
  why:
    "Pourquoi des asymptotes ? Parce qu'elles disent le **comportement à long terme** — la vitesse limite du parachutiste, la saturation d'une réaction, le plateau d'une charge de condensateur : toute la physique des régimes permanents lit des asymptotes. Et la croissance comparée est la boussole de l'informatique : exponentiel contre polynomial est *la* frontière entre faisable et infaisable — ta cryptographie tient debout parce que $e^x$ écrase $x^n$.",
  examples: [
    { title: "Les asymptotes de l'hyperbole", steps: [
      { p: "$\\frac{1}{x} \\to 0$ en $\\pm\\infty$ : asymptote **horizontale** $y = 0$." },
      { p: "$\\frac{1}{x} \\to \\pm\\infty$ en $0$ : asymptote **verticale** $x = 0$ — la courbe longe ses deux droites." },
    ] },
    { title: "Lever l'indétermination", steps: [
      { p: "$x^2 - 5x$ en $+\\infty$ : « $\\infty - \\infty$ » — factorise le dominant : $x^2\\left(1 - \\frac{5}{x}\\right)$." },
      { p: "$x^2 \\to +\\infty$ et la parenthèse $\\to 1$ : produit $\\to +\\infty$ — le dominant a tranché." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne les limites de $f(x) = \\frac{1}{x - 2}$ en $+\\infty$, en $-\\infty$, en $2^+$ et $2^-$, et les asymptotes associées.", solution: "$0$, $0$, $+\\infty$, $-\\infty$ — asymptote **horizontale** $y = 0$ (deux côtés) et **verticale** $x = 2$ : la valeur interdite de seconde devient une droite que la courbe longe sans toucher." },
    { tier: "warmup", prompt: "Calcule la limite de $x^2 - 5x + 3$ en $+\\infty$ (forme « $\\infty - \\infty$ » : factorise le dominant).", solution: "$x^2\\left(1 - \\frac{5}{x} + \\frac{3}{x^2}\\right)$ : le facteur $x^2 \\to +\\infty$, la parenthèse $\\to 1$ — produit : $+\\infty$ : tout polynôme suit son terme dominant, l'indétermination était un déguisement." },
    { tier: "application", prompt: "Démontre que $e^x \\to +\\infty$ en $+\\infty$ (utilise $e^x \\geq 1 + x$), puis déduis-en la limite en $-\\infty$ et l'asymptote.", solution: "$e^x \\geq 1 + x$ (la tangente en 0, sous la courbe convexe — ou Bernoulli continu) : le minorant $1 + x \\to +\\infty$ pousse $e^x \\to +\\infty$ ✓. En $-\\infty$ : $e^x = \\frac{1}{e^{-x}}$ avec $e^{-x} \\to +\\infty$, donc $e^x \\to $ **0** — asymptote horizontale $y = 0$ à gauche : la démonstration officielle, par minoration puis inversion." },
    { tier: "challenge", prompt: "Limite de $\\dfrac{x^3 + 1}{2x^3 - x}$ en $+\\infty$ ? (forme $\\frac{\\infty}{\\infty}$ : dominants en haut et en bas.)", solution: "$\\dfrac{x^3(1 + \\frac{1}{x^3})}{x^3(2 - \\frac{1}{x^2})} = \\dfrac{1 + \\frac{1}{x^3}}{2 - \\frac{1}{x^2}} \\to \\dfrac{1}{2}$ — asymptote horizontale $y = \\frac{1}{2}$ : le quotient des dominants gouverne, le rapport des coefficients de tête signe la limite." },
    { tier: "exam", prompt: "Démontre la croissance comparée : $\\dfrac{e^x}{x} \\to +\\infty$ en $+\\infty$ (établis d'abord $e^t \\geq \\frac{t^2}{2}$ pour $t \\geq 0$ par étude de la fonction $g(t) = e^t - \\frac{t^2}{2}$), et conclus sur la hiérarchie des croissances.", solution: "$g'(t) = e^t - t$ et $g''(t) = e^t - 1 \\geq 0$ sur $[0\\,;\\,+\\infty[$ : $g'$ croît depuis $g'(0) = 1 > 0$, donc $g' > 0$, donc $g$ croît depuis $g(0) = 1 > 0$ — d'où $e^t \\geq \\frac{t^2}{2}$ ✓. Alors $\\dfrac{e^x}{x} \\geq \\dfrac{x^2/2}{x} = \\dfrac{x}{2} \\to +\\infty$ : la minoration conclut ✓ — l'**exponentielle écrase la puissance** (et le même jeu, avec $\\frac{t^{n+1}}{(n+1)!}$, écrase tout $x^n$) : la démonstration exigible, et la hiérarchie $x^n \\ll e^x$ qui gouverne l'informatique entière — le polynomial est faisable, l'exponentiel ne l'est pas." },
  ],
  practice: [
    { tier: "warmup", label: "L'asymptote lue", make: (r) => {
      const cas = pick(r, [["\\frac{1}{x}", "en +\\infty", 0], ["\\frac{3x + 1}{x}", "en +\\infty", 3], ["5 + \\frac{2}{x}", "en +\\infty", 5]]);
      return { prompt: `$f(x) = ${cas[0]}$ : quelle est l'asymptote horizontale $y = \\,?$ ${cas[1]} ?`, answer: cas[2], solution: `Limite **${cas[2]}** : asymptote $y = ${cas[2]}$.` };
    } },
    { tier: "application", label: "Le dominant tranche", make: (r) => {
      const a = pick(r, [1, 2, 3]); const b = pick(r, [2, 4, 6]);
      return { prompt: `Limite de $\\dfrac{${a}x^2 + x}{${b}x^2 - 1}$ en $+\\infty$ ? (décimal si besoin)`, answer: a / b, solution: `Rapport des dominants : $\\dfrac{${a}}{${b}} = $ **${String(a / b).replace(".", ",")}**.` };
    } },
    { tier: "challenge", label: "Qui écrase qui ?", make: (r) => {
      const cas = pick(r, [["\\dfrac{e^x}{x^{10}}", 1], ["\\dfrac{x^{100}}{e^x}", 0], ["\\dfrac{e^x}{x^2}", 1]]);
      return { prompt: `Limite de $${cas[0]}$ en $+\\infty$ : 0 (réponds 0) ou $+\\infty$ (réponds 1) ?`, answer: cas[1], solution: `L'exponentielle **écrase** toute puissance : **${cas[1] === 1 ? "+∞" : "0"}** — la hiérarchie $x^n \\ll e^x$, sans exception.` };
    } },
  ],
};

export default [recurrence, suitesLimites, limitesFonctions];
