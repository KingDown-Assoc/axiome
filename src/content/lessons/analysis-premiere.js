// Field "Analysis" — HIGH module (premiere year), part 1: derivation. Official
// première spécialité programme. LOCAL viewpoint: rate of variation, secants,
// the DERIVATIVE NUMBER as limit of the rate, notation f'(a), the TANGENT as
// "limit of secants", its equation (REQUIRED PROOF), affine approximation
// f(a+h) ≈ f(a) + f'(a)h — interpreted as secant/tangent slope, instantaneous
// velocity, marginal cost. GLOBAL viewpoint: differentiable function, derivative
// function, derivatives of the reference functions (square, cube, inverse,
// square root) with REQUIRED PROOFS (derivative of the square and inverse
// functions; the square root is NOT differentiable at 0), operations (sum,
// product — REQUIRED PROOF —, inverse, quotient), x^n for n in ℤ, |x| at 0.
// Then variations: sign of f' ↔ monotonicity, extremum ↔ horizontal tangent,
// optimization, relative positions, even/odd functions, Newton's method.
import { randint, pick } from "../../core/exercises.js";

// — The derivative number (programme: point de vue local) —
const nombreDerive = {
  id: "analysis.high.nombre-derive",
  level: "high", domain: "analysis",
  title: "Le nombre dérivé",
  tagline: "Le nombre dérivé : la pente des sécantes tend vers celle de la tangente.",
  prereqs: ["analysis.high.variations", "geometry.high.droites-equations"],
  intuition:
    "Quelle est la pente d'une **courbe** en un point ? Une courbe n'est pas droite… mais zoome : entre $a$ et $a + h$, le **taux de variation** $\\dfrac{f(a+h) - f(a)}{h}$ est la pente de la **sécante**.\n\nFais fondre $h$ vers 0 : les sécantes pivotent vers une position limite — la **tangente** — et leur pente converge vers le **nombre dérivé** $f'(a)$.",
  depths: {
    discovery:
      "**Avec les mains** : sur $f(x) = x^2$ en $a = 1$ — taux entre 1 et $1 + h$ : $\\dfrac{(1+h)^2 - 1}{h} = \\dfrac{2h + h^2}{h} = 2 + h$. Quand $h$ fond ($0{,}1$, $0{,}01$, $0{,}001$…), le taux tend vers **2** : $f'(1) = 2$ — la parabole a une pente de 2 au point $(1\\,;\\,1)$ : la courbe a hérité d'un coefficient directeur.",
    standard:
      "**En image** : la **tangente** est la droite qui passe par $(a\\,;\\,f(a))$ avec la pente $f'(a)$ — son équation se **démontre** : une droite de pente $f'(a)$ passant par ce point s'écrit $y - f(a) = f'(a)(x - a)$ (ta forme point-pente de seconde !), soit $y = f(a) + f'(a)(x - a)$ ✓. Et près de $a$, la courbe **colle** à sa tangente : $f(a + h) \\approx f(a) + f'(a)\\,h$ — l'approximation affine, l'arme secrète du calcul approché.",
    advanced:
      "**Dans la tête** : le nombre dérivé est le concept le plus traduit des mathématiques — en **cinématique**, le taux de variation de la position est une vitesse **moyenne**, et sa limite la vitesse **instantanée** : ton compteur affiche un nombre dérivé ; en **économie**, $C'(q)$ est le **coût marginal** — ce que coûte la prochaine unité. Newton cherchait les vitesses, Leibniz les pentes : tous deux ont trouvé la même limite, et leur querelle de paternité a déchiré l'Europe savante — le calcul différentiel a deux pères et un seul théorème. La liste des pentes de sécantes pour un pas qui fond (l'algorithme officiel) te fait voir la convergence de tes propres yeux.",
  },
  keyIdea: "$f'(a) = $ limite du taux $\\dfrac{f(a+h) - f(a)}{h}$ quand $h \\to 0$ — la pente de la tangente. **Tangente** : $y = f(a) + f'(a)(x - a)$ (démontrée par point-pente). Près de $a$ : $f(a+h) \\approx f(a) + f'(a)\\,h$.",
  why:
    "Pourquoi vouloir la pente d'une courbe ? Parce que la pente est un **taux instantané** — vitesse, débit, coût marginal, taux de croissance : toutes les sciences posent la question « à quelle vitesse, là, maintenant ? », et le nombre dérivé est la seule réponse rigoureuse. C'est l'invention qui a rendu la physique calculable — et le chapitre le plus rentable de toute ta scolarité commence ici.",
  examples: [
    { title: "Les sécantes qui pivotent", steps: [
      { p: "$f(x) = x^2$, $a = 1$ : taux $= \\dfrac{(1+h)^2 - 1}{h} = 2 + h$." },
      { p: "$h \\to 0$ : le taux $\\to$ **2** — $f'(1) = 2$, la pente de la parabole au point $(1\\,;\\,1)$." },
    ] },
    { title: "L'équation de la tangente", steps: [
      { p: "Pente $f'(a)$, point $(a\\,;\\,f(a))$ : la forme point-pente de seconde donne $y - f(a) = f'(a)(x - a)$." },
      { p: "$y = f(a) + f'(a)(x - a)$ — démontrée en une ligne : la tangente est une droite comme les autres." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour $f(x) = x^2$, calcule le taux de variation entre 1 et $1 + h$, simplifie, et fais tendre $h$ vers 0. Que vaut $f'(1)$ ?", solution: "$\\dfrac{(1+h)^2 - 1}{h} = \\dfrac{2h + h^2}{h} = 2 + h \\to $ **2** quand $h \\to 0$ : $f'(1) = 2$ — la sécante pivote vers la tangente, sa pente converge." },
    { tier: "warmup", prompt: "Démontre l'équation de la tangente à la courbe de $f$ au point d'abscisse $a$.", solution: "La tangente est la droite de **pente** $f'(a)$ passant par $(a\\,;\\,f(a))$ : forme point-pente $y - f(a) = f'(a)(x - a)$, soit $y = f(a) + f'(a)(x - a)$ ✓ — la démonstration exigible tient dans la géométrie repérée de seconde." },
    { tier: "application", prompt: "Avec $f(x) = x^2$, $f(1) = 1$ et $f'(1) = 2$ : donne l'équation de la tangente en 1, puis approche $f(1{,}02)$ sans calculatrice et compare à la valeur exacte.", solution: "Tangente : $y = 1 + 2(x - 1) = 2x - 1$. Approximation : $f(1{,}02) \\approx 1 + 2 \\times 0{,}02 = $ **1,04** — exact : $1{,}0404$ : la courbe colle à sa tangente, l'erreur est en $h^2$." },
    { tier: "challenge", prompt: "Une voiture parcourt $d(t) = 5t^2$ mètres en $t$ secondes. Calcule sa vitesse moyenne entre 2 et $2 + h$ secondes, puis sa vitesse instantanée à $t = 2$.", solution: "Taux : $\\dfrac{5(2+h)^2 - 20}{h} = \\dfrac{20h + 5h^2}{h} = 20 + 5h \\to $ **20 m/s** — la vitesse moyenne sur un intervalle qui fond devient la vitesse **instantanée** : ton compteur calcule des nombres dérivés." },
    { tier: "exam", prompt: "Le coût de production de $q$ objets est $C(q) = q^2 + 10q + 100$. Calcule le taux de variation entre $q$ et $q + 1$ (le coût de l'objet suivant), puis $C'(q)$ par la limite du taux entre $q$ et $q + h$, et compare en $q = 20$. Que représente $C'(q)$ pour l'économiste ?", solution: "Coût du 21e objet : $C(21) - C(20) = 751 - 700 = $ **51 €**. Taux : $\\dfrac{C(q+h) - C(q)}{h} = \\dfrac{2qh + h^2 + 10h}{h} = 2q + 10 + h \\to 2q + 10$ : $C'(20) = $ **50** — le **coût marginal**, quasi égal au coût réel de l'unité suivante : l'économiste pilote sa production au nombre dérivé, l'approximation affine fait le reste." },
  ],
  practice: [
    { tier: "warmup", label: "Le taux qui converge", make: (r) => {
      const a = randint(r, 1, 5);
      return { prompt: `$f(x) = x^2$ : le taux entre $${a}$ et $${a} + h$ vaut $${2 * a} + h$. Que vaut $f'(${a})$ ?`, answer: 2 * a, solution: `$h \\to 0$ : le taux $\\to$ **${2 * a}** — la pente de la parabole en $x = ${a}$.` };
    } },
    { tier: "application", label: "L'approximation affine", make: (r) => {
      const fa = randint(r, 2, 9); const fp = randint(r, 2, 6); const h = pick(r, [0.1, 0.01]);
      return { prompt: `$f(a) = ${fa}$, $f'(a) = ${fp}$ : approche $f(a + ${String(h).replace(".", ",")})$ par la tangente. (décimal)`, answer: Math.round((fa + fp * h) * 100) / 100, solution: `$f(a) + f'(a)\\,h = ${fa} + ${fp} \\times ${String(h).replace(".", ",")} = $ **${String(fa + fp * h).replace(".", ",")}**.` };
    } },
    { tier: "challenge", label: "La tangente en un point", make: (r) => {
      const a = randint(r, 1, 4); const x = a + randint(r, 1, 3);
      return { prompt: `$f(x) = x^2$, tangente en $${a}$ : $y = ${2 * a}x - ${a * a}$. Quelle ordonnée en $x = ${x}$ ?`, answer: 2 * a * x - a * a, solution: `$y = ${2 * a} \\times ${x} - ${a * a} = $ **${2 * a * x - a * a}** — la tangente prolonge la pente, la parabole (à ${x * x}) s'en écarte.` };
    } },
  ],
};

// — The derivative function (programme: point de vue global, opérations) —
const fonctionDerivee = {
  id: "analysis.high.fonction-derivee",
  level: "high", domain: "analysis",
  title: "Calculer les dérivées",
  tagline: "Les règles de dérivation, démontrées : (x²)′ = 2x, (uv)′ = u′v + uv′.",
  prereqs: ["analysis.high.nombre-derive"],
  intuition:
    "Calculer $f'(a)$ point par point serait l'enfer : on dérive **la fonction entière** — la **fonction dérivée** $f'$ associe à chaque $x$ la pente en $x$.\n\nUn répertoire ($x^2 \\to 2x$, $x^3 \\to 3x^2$, $\\frac{1}{x} \\to -\\frac{1}{x^2}$, $\\sqrt{x} \\to \\frac{1}{2\\sqrt{x}}$) et quatre règles d'assemblage : somme, produit, inverse, quotient — l'usine à pentes.",
  depths: {
    discovery:
      "**Avec les mains** : la première dérivée se **démontre** — taux de $x^2$ entre $x$ et $x + h$ : $\\dfrac{(x+h)^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h \\to 2x$ : $(x^2)' = 2x$ ✓ — ta pente $2$ en $x = 1$, ta pente $-6$ en $x = -3$ : une seule formule pour toutes. Même jeu pour l'inverse : $\\dfrac{\\frac{1}{x+h} - \\frac{1}{x}}{h} = \\dfrac{-1}{x(x+h)} \\to -\\dfrac{1}{x^2}$ ✓.",
    standard:
      "**En image** : les règles d'assemblage — la **somme** dérive terme à terme, $(ku)' = ku'$, et le **produit** se démontre par l'astuce du terme fantôme : $\\dfrac{u(x+h)v(x+h) - u(x)v(x)}{h}$ — ajoute et retranche $u(x+h)v(x)$ : le taux se casse en $\\dfrac{u(x+h)-u(x)}{h}v(x) + u(x+h)\\dfrac{v(x+h)-v(x)}{h} \\to u'v + uv'$ ✓ — **pas** $u'v'$ ! Puis l'inverse $\\left(\\frac{1}{v}\\right)' = -\\frac{v'}{v^2}$ et le quotient $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$ complètent l'usine : tout polynôme, toute fraction rationnelle se dérive mécaniquement.",
    advanced:
      "**Dans la tête** : le répertoire s'unifie — $(x^n)' = nx^{n-1}$ pour **tout** $n \\in \\mathbb{Z}$ : $x^2 \\to 2x$, $x^3 \\to 3x^2$, et $\\frac{1}{x} = x^{-1} \\to -x^{-2}$ : une seule loi, l'exposant descend devant et perd un cran. Mais deux fonctions résistent en 0 : la **racine** — son taux en 0 vaut $\\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}} \\to +\\infty$ : la tangente devient **verticale**, $\\sqrt{x}$ n'est **pas dérivable en 0** (démontré !) ; et $|x|$ — pente $-1$ à gauche, $+1$ à droite : le **point anguleux**, deux demi-tangentes qui ne s'accordent pas. Dérivable exige mieux que continu : la courbe doit être *lisse*.",
  },
  keyIdea: "Répertoire : $(x^2)' = 2x$, $(x^3)' = 3x^2$, $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}$, $(\\sqrt{x}\\,)' = \\frac{1}{2\\sqrt{x}}$ — et $(x^n)' = nx^{n-1}$. Règles : $(u+v)' = u' + v'$, $(uv)' = u'v + uv'$ (jamais $u'v'$ !), $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$.",
  why:
    "Pourquoi des règles plutôt que la limite à chaque fois ? Parce que la dérivation devient un **calcul** : mécanique, enseignable, programmable — Leibniz a gagné la postérité notationnelle précisément parce que ses règles transformaient l'analyse en algèbre. Dériver un polynôme de degré 50 prend dix secondes ; la limite directe, une après-midi : les règles sont l'industrialisation de la pente.",
  examples: [
    { title: "(x²)′, démontrée", steps: [
      { p: "Taux : $\\dfrac{(x+h)^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h$." },
      { p: "$h \\to 0$ : $(x^2)' = 2x$ — la formule de toutes les pentes de la parabole." },
    ] },
    { title: "L'usine au travail", steps: [
      { p: "$f(x) = 3x^2 + 5x - 7$ : somme et constantes — $f'(x) = 6x + 5$." },
      { p: "$g(x) = x^2 \\cdot \\sqrt{x}$ : produit — $g'(x) = 2x\\sqrt{x} + x^2 \\cdot \\dfrac{1}{2\\sqrt{x}}$ : $u'v + uv'$, jamais $u'v'$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Démontre que $(x^2)' = 2x$ par la limite du taux de variation.", solution: "$\\dfrac{(x+h)^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h \\to 2x$ quand $h \\to 0$ — l'identité remarquable développe, le $h$ se simplifie, la limite conclut : la démonstration exigible la plus courte du chapitre." },
    { tier: "warmup", prompt: "Dérive : $f(x) = 3x^2 + 5x - 7$ ; $g(x) = x^3 - \\dfrac{1}{x}$.", solution: "$f'(x) = 6x + 5$ (terme à terme, la constante meurt) ; $g'(x) = 3x^2 + \\dfrac{1}{x^2}$ — le répertoire et la somme suffisent : l'usine tourne." },
    { tier: "application", prompt: "Dérive $h(x) = (2x + 1)(x^2 - 3)$ avec la règle du produit, puis vérifie en développant d'abord.", solution: "Produit : $h'(x) = 2(x^2 - 3) + (2x+1)(2x) = 6x^2 + 2x - 6$. Développé : $h(x) = 2x^3 + x^2 - 6x - 3 \\to h'(x) = 6x^2 + 2x - 6$ ✓ — deux chemins, même pente : et surtout pas $u'v' = 4x$." },
    { tier: "challenge", prompt: "Démontre que la fonction racine carrée n'est pas dérivable en 0.", solution: "Taux en 0 : $\\dfrac{\\sqrt{h} - 0}{h} = \\dfrac{1}{\\sqrt{h}}$ — quand $h \\to 0^+$, ce taux **explose** vers $+\\infty$ : pas de limite finie, donc pas de nombre dérivé. Géométriquement, la tangente devient **verticale** au départ de la courbe — dérivable exige une pente finie." },
    { tier: "exam", prompt: "Démontre la règle du produit $(uv)' = u'v + uv'$ : pars du taux de variation de $uv$ et utilise l'astuce du terme ajouté-retranché.", solution: "$\\dfrac{u(x+h)v(x+h) - u(x)v(x)}{h}$ : ajoute et retranche $u(x+h)v(x)$ au numérateur — il se casse en $\\dfrac{u(x+h) - u(x)}{h}\\,v(x) + u(x+h)\\,\\dfrac{v(x+h) - v(x)}{h}$. Quand $h \\to 0$ : le premier taux $\\to u'(x)$, le second $\\to v'(x)$, et $u(x+h) \\to u(x)$ — limite : $u'v + uv'$ ✓. Le terme fantôme est le grand geste du chapitre : on fabrique les deux taux qu'on sait faire converger — et la formule explique pourquoi dériver un produit n'est **pas** multiplier les dérivées." },
  ],
  practice: [
    { tier: "warmup", label: "Le répertoire", make: (r) => {
      const a = randint(r, 2, 7); const b = randint(r, 1, 9); const x = randint(r, 1, 5);
      return { prompt: `$f(x) = ${a}x^2 + ${b}x$ : que vaut $f'(${x})$ ?`, answer: 2 * a * x + b, solution: `$f'(x) = ${2 * a}x + ${b}$ → $f'(${x}) = $ **${2 * a * x + b}**.` };
    } },
    { tier: "application", label: "L'exposant qui descend", make: (r) => {
      const n = randint(r, 3, 6); const x = pick(r, [1, 2]);
      return { prompt: `$(x^{${n}})' = n\\,x^{n-1}$ : que vaut cette dérivée en $x = ${x}$ ?`, answer: n * x ** (n - 1), solution: `$${n} \\times ${x}^{${n - 1}} = $ **${n * x ** (n - 1)}** — l'exposant descend, et perd un cran.` };
    } },
    { tier: "challenge", label: "Produit, pas u′v′", make: (r) => {
      const a = randint(r, 1, 4); const x = randint(r, 1, 3);
      return { prompt: `$h(x) = x \\cdot x^2$ (donc $x^3$) : la règle du produit donne $h'(x) = 1 \\cdot x^2 + x \\cdot 2x$. Que vaut $h'(${x})$ ? (et vérifie que c'est bien $3x^2$ !)`, answer: 3 * x * x, solution: `$x^2 + 2x^2 = 3x^2$ → $h'(${x}) = $ **${3 * x * x}** ✓ — $u'v + uv'$ retombe sur $(x^3)' = 3x^2$ ; $u'v' = 2x$ aurait menti.` };
    } },
  ],
};

// — Variations via f' (programme: signe de f', optimisation, parité) —
const variationsDerivee = {
  id: "analysis.high.variations-derivee",
  level: "high", domain: "analysis",
  title: "Le signe de f′ commande",
  tagline: "f′ positive : ça monte — l'optimisation devient un calcul de routine.",
  prereqs: ["analysis.high.fonction-derivee", "algebra.high.fonction-second-degre"],
  intuition:
    "Le théorème pivot de l'analyse : sur un intervalle, $f' > 0 \\Rightarrow f$ **croissante**, $f' < 0 \\Rightarrow f$ décroissante — la pente locale commande le mouvement global.\n\nL'étude d'une fonction devient un algorithme : dériver, étudier le **signe** de $f'$ (tes tableaux de signes !), dresser le tableau de variations — et les extremums tombent.",
  depths: {
    discovery:
      "**Avec les mains** : $f(x) = x^2 - 4x + 1$ — dérive : $f'(x) = 2x - 4$, qui s'annule en 2, négatif avant, positif après : $f$ **descend** jusqu'à 2 puis **monte** — minimum $f(2) = -3$. En seconde, tu démontrais ces variations à la main ($f(b) - f(a)$ facteur par facteur) ; la dérivée fait le même travail en deux lignes, pour **n'importe quelle** fonction dérivable.",
    standard:
      "**En image** : en un extremum **local** (intérieur à l'intervalle), la tangente est **horizontale** : $f'$ s'y annule — le sommet de la colline a pente nulle. Attention au sens unique : $f' = 0$ ne suffit pas ($x^3$ en 0 : pente nulle, mais ça monte toujours — un **palier**, pas un sommet) ; c'est le **changement de signe** de $f'$ qui fait l'extremum. Le tableau complet superpose donc deux lignes : le signe de $f'$, puis les flèches de $f$ — l'algorithme d'étude, gravé pour le lycée entier.",
    advanced:
      "**Dans la tête** : trois armes en bonus — l'**optimisation** générale (la boîte sans couvercle, le coût minimal : dériver, annuler, conclure — l'enclos de seconde traitait les paraboles, la dérivée traite tout) ; les **inégalités par variations** (pour montrer $f \\geq g$, étudie $f - g$ : si son minimum est positif, gagné — la position relative de seconde, industrialisée) ; et les **symétries** : $f(-x) = f(x)$ définit une fonction **paire** (courbe symétrique par rapport à l'axe vertical — le carré), $f(-x) = -f(x)$ une **impaire** (symétrie par rapport à l'origine — le cube, l'inverse) : l'étude se fait sur une moitié, la symétrie offre l'autre. Et quand l'équation $f(x) = 0$ résiste, **Newton** la traque : suis la tangente jusqu'à l'axe, recommence — chaque tour double les décimales : Héron était son cas particulier.",
  },
  keyIdea: "Signe de $f'$ → variations de $f$ ; extremum local → tangente horizontale ($f' = 0$ **et** changement de signe). Algorithme : dériver, signe de $f'$ (tableaux !), tableau de variations, conclure. Paire : $f(-x) = f(x)$ ; impaire : $f(-x) = -f(x)$.",
  why:
    "Pourquoi ce théorème est-il le pivot du lycée ? Parce qu'il convertit toute question de **forme** (où ça monte, où est le meilleur) en question de **signe** — et les signes, tu sais les étudier depuis la seconde. L'ingénieur qui minimise un coût, le physicien qui cherche l'équilibre, l'économiste qui maximise un profit exécutent tous le même algorithme : dériver, annuler, trancher. C'est la routine la plus puissante des mathématiques appliquées.",
  examples: [
    { title: "L'algorithme d'étude", steps: [
      { p: "$f(x) = x^2 - 4x + 1$ : $f'(x) = 2x - 4$ — négatif avant 2, positif après." },
      { p: "Tableau : ↘ jusqu'à $f(2) = -3$, ↗ ensuite — minimum trouvé par le signe, pas par le dessin." },
    ] },
    { title: "Le piège du palier", steps: [
      { p: "$f(x) = x^3$ : $f'(x) = 3x^2 \\geq 0$, nul en 0 — mais positif des **deux** côtés." },
      { p: "Pas d'extremum : un palier — $f' = 0$ sans changement de signe ne fait pas un sommet." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Étudie $f(x) = x^2 - 4x + 1$ : dérivée, signe, tableau de variations, extremum.", solution: "$f'(x) = 2x - 4$ : négatif sur $]-\\infty\\,;\\,2[$, positif après — $f$ **décroît puis croît**, minimum $f(2) = $ **−3** : dériver, signer, tabuler — l'algorithme complet en trois gestes." },
    { tier: "warmup", prompt: "Pourquoi $f(x) = x^3$ n'a-t-elle pas d'extremum en 0, alors que $f'(0) = 0$ ?", solution: "$f'(x) = 3x^2$ est **positif des deux côtés** de 0 : la fonction monte, marque un palier horizontal, et remonte — un extremum exige que $f'$ **change de signe**, pas seulement qu'elle s'annule." },
    { tier: "application", prompt: "Étudie les variations de $f(x) = x^3 - 3x$ sur $\\mathbb{R}$ et donne ses extremums locaux.", solution: "$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : positif, négatif, positif (le tableau du second degré !) — $f$ croît, décroît sur $[-1\\,;\\,1]$, recroît : **maximum local** $f(-1) = 2$, **minimum local** $f(1) = -2$ — la dérivée du degré 3 est un second degré : les chapitres s'emboîtent." },
    { tier: "challenge", prompt: "La fonction $f(x) = x^3 - 3x$ est-elle paire, impaire ? Démontre-le et dis ce que cela offre à la courbe.", solution: "$f(-x) = -x^3 + 3x = -(x^3 - 3x) = -f(x)$ : **impaire** — courbe symétrique par rapport à l'**origine** : le maximum $(−1\\,;\\,2)$ se reflète en le minimum $(1\\,;\\,-2)$, l'étude d'une moitié offre l'autre." },
    { tier: "exam", prompt: "Une boîte sans couvercle, base carrée de côté $x$, doit avoir un volume de 32 L (dm³). Sa surface de carton est $S(x) = x^2 + \\dfrac{128}{x}$. Étudie $S$ sur $]0\\,;\\,+\\infty[$ et détermine les dimensions qui minimisent le carton.", solution: "$S'(x) = 2x - \\dfrac{128}{x^2} = \\dfrac{2x^3 - 128}{x^2}$ — du signe de $2x^3 - 128$ : négatif avant $x = 4$ ($x^3 = 64$), positif après. $S$ décroît puis croît : **minimum** en $x = 4$ dm, hauteur $\\frac{32}{16} = 2$ dm, surface $S(4) = 48$ dm² — la boîte optimale est large et basse, et l'optimisation générale (hors paraboles !) est désormais un calcul de routine : dériver, annuler, trancher." },
  ],
  practice: [
    { tier: "warmup", label: "Le signe commande", make: (r) => {
      const c = randint(r, 1, 6); const x = pick(r, [c - randint(r, 1, 3), c + randint(r, 1, 3)]);
      return { prompt: `$f'(x) = 2x - ${2 * c}$ : en $x = ${x}$, $f$ est-elle croissante ? (1 = oui, 0 = non)`, answer: x > c ? 1 : 0, solution: `$f'(${x}) = ${2 * x - 2 * c}$ : **${x > c ? "positif → croissante" : "négatif → décroissante"}** — le signe de la pente commande.` };
    } },
    { tier: "application", label: "L'extremum par f′", make: (r) => {
      const c = randint(r, 1, 7); const b = 2 * c;
      return { prompt: `$f(x) = x^2 - ${b}x + ${randint(r, 1, 9)}$ : en quel $x$ le minimum est-il atteint ? ($f'$ s'annule où ?)`, answer: c, solution: `$f'(x) = 2x - ${b} = 0 \\Leftrightarrow x = $ **${c}** — et $f'$ change de signe : vrai minimum.` };
    } },
    { tier: "challenge", label: "Paire ou impaire ?", make: (r) => {
      const cas = pick(r, [["x^2 + 3", 1], ["x^3 - x", 0], ["x^4 - 2x^2", 1], ["\\frac{1}{x}", 0], ["x^3 + 5x", 0], ["|x|", 1]]);
      return { prompt: `$f(x) = ${cas[0]}$ : paire (1) ou impaire (0) ?`, answer: cas[1], solution: `$f(-x) = ${cas[1] ? "f(x)" : "-f(x)"}$ : **${cas[1] ? "paire — symétrie d'axe vertical" : "impaire — symétrie par l'origine"}** (exposants tous ${cas[1] ? "pairs" : "impairs"}).` };
    } },
  ],
};

export default [nombreDerive, fonctionDerivee, variationsDerivee];
