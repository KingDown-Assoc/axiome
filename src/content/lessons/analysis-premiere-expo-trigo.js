// Field "Analysis" — HIGH module (premiere year), part 2: exponential and
// trigonometry. Official première spécialité programme. EXPONENTIAL: defined as
// the unique differentiable function with f' = f and f(0) = 1 (existence
// admitted, UNIQUENESS proved), functional equation exp(x+y) = exp(x)exp(y)
// (REQUIRED PROOF), exp(x)exp(−x) = 1, the number e and notation e^x, sign and
// variations (REQUIRED PROOF: strictly positive and increasing), link with
// geometric sequences, derivative of t ↦ e^(at), graphs of e^(kt) and e^(−kt),
// modelling (capital at fixed rate, radioactive decay) — Euler's method and the
// sequence (1 + 1/n)^n as algorithms. TRIGONOMETRY: the trigonometric circle,
// arc length, the RADIAN, winding the real line onto the circle, cosine and
// sine of a real number (link with the right triangle), remarkable values —
// REQUIRED PROOF: cos and sin of π/4 and π/3 —, associated angles read on the
// circle, Archimedes' approximation of π as the official algorithm.
import { randint, pick } from "../../core/exercises.js";

// — The exponential function (programme: f' = f, équation fonctionnelle) —
const exponentielle = {
  id: "analysis.high.exponentielle",
  level: "high", domain: "analysis",
  title: "La fonction exponentielle",
  tagline: "L'unique fonction égale à sa dérivée — la croissance qui se nourrit d'elle-même.",
  prereqs: ["algebra.high.suites", "analysis.high.fonction-derivee"],
  intuition:
    "Une population croît d'autant plus vite qu'elle est nombreuse : sa **vitesse égale sa valeur** — en langage dérivé : $f' = f$.\n\nIl existe **une unique** fonction dérivable sur $\\mathbb{R}$ vérifiant $f' = f$ et $f(0) = 1$ : l'**exponentielle**, $\\exp$ — et $\\exp(1) = e \\approx 2{,}718$, le nombre qui rejoint $\\pi$ au panthéon.",
  depths: {
    discovery:
      "**Avec les mains** : l'unicité se **démontre** — soit $g$ une autre solution ($g' = g$, $g(0) = 1$) ; étudie $h(x) = g(x)\\exp(-x)$ : $h' = g'\\exp(-x) - g\\exp(-x) = (g' - g)\\exp(-x) = 0$ — $h$ est **constante**, et $h(0) = 1$ : donc $g(x)\\exp(-x) = 1$ partout, soit $g = \\exp$ ✓. Une équation sur la dérivée définit une fonction entière : c'est ta première **équation différentielle**, résolue.",
    standard:
      "**En image** : l'équation fonctionnelle, **démontrée** — fixe $y$ et pose $h(x) = \\exp(x + y)\\exp(-x)$ : $h' = \\exp(x+y)\\exp(-x) - \\exp(x+y)\\exp(-x) = 0$ — constante, et $h(0) = \\exp(y)$ : donc $\\exp(x + y) = \\exp(x)\\exp(y)$ ✓. **L'exponentielle change les sommes en produits** — d'où la notation $e^x$ : elle se comporte exactement comme une puissance, $e^{x+y} = e^x e^y$, $e^{-x} = \\frac{1}{e^x}$, $(e^x)^n = e^{nx}$ : tes règles de 4e, promues au continu.",
    advanced:
      "**Dans la tête** : positivité et croissance se **démontrent** — $e^x e^{-x} = e^0 = 1$ interdit à $e^x$ de s'annuler ; et $e^x = \\left(e^{x/2}\\right)^2 \\geq 0$ : donc $e^x > 0$ **partout** — alors $(\\exp)' = \\exp > 0$ : **strictement croissante** ✓, de 0 (jamais atteint) vers l'infini. Et la boucle se boucle avec tes suites : $e^x$ **prolonge les suites géométriques** au continu — la suite $u_n = e^{an}$ est géométrique de raison $e^a$, et un capital à taux continu, une population, une désintégration ($N(t) = N_0\\,e^{-kt}$ : la radioactivité, la datation au carbone 14 !) suivent $e^{at}$, de dérivée $a\\,e^{at}$. **Euler** approchait la courbe pas à pas (avancer le long de la tangente : $f(x+h) \\approx f(x)(1 + h)$ — l'algorithme officiel), et la suite $\\left(1 + \\frac{1}{n}\\right)^n$ grimpe vers $e$ : la plus célèbre des limites.",
  },
  keyIdea: "$\\exp$ : l'**unique** $f$ dérivable avec $f' = f$, $f(0) = 1$ (unicité démontrée). $e^{x+y} = e^x e^y$ (démontré : les sommes deviennent produits), $e^x > 0$ et croissante (démontré). $\\left(e^{at}\\right)' = a\\,e^{at}$ — le prolongement continu des suites géométriques.",
  why:
    "Pourquoi cette fonction règne-t-elle sur les sciences ? Parce que « la vitesse est proportionnelle à la valeur » est la loi la plus répandue de la nature — intérêts composés, croissance bactérienne, désintégration nucléaire, décharge d'un condensateur, refroidissement d'un café : tous résolvent $f' = kf$, tous répondent $e^{kt}$. L'exponentielle n'est pas une fonction parmi d'autres : c'est la signature mathématique de l'auto-amplification — et de son contraire, la décroissance qui s'épuise.",
  examples: [
    { title: "Les sommes deviennent produits", steps: [
      { p: "$h(x) = \\exp(x+y)\\exp(-x)$ : $h' = 0$, donc $h$ constante, et $h(0) = \\exp(y)$." },
      { p: "$\\exp(x+y) = \\exp(x)\\exp(y)$ ✓ — d'où la notation $e^x$ : une vraie puissance." },
    ] },
    { title: "La décroissance radioactive", steps: [
      { p: "$N(t) = N_0\\,e^{-kt}$ : il reste d'autant moins à désintégrer qu'il en reste peu — $N' = -kN$." },
      { p: "Le carbone 14 date les fossiles sur cette courbe — l'exponentielle décroissante, horloge de l'archéologue." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle équation définit l'exponentielle ? Vérifie que ses deux conditions excluent la fonction nulle et la fonction constante 1.", solution: "$f' = f$ **et** $f(0) = 1$. La fonction nulle vérifie $f' = f$ mais $f(0) = 0$ ✗ ; la constante 1 vérifie $f(0) = 1$ mais $f' = 0 \\neq 1 = f$ ✗ — il faut les **deux** conditions, et il n'existe alors qu'une seule solution : c'est tout le théorème." },
    { tier: "warmup", prompt: "Simplifie avec les propriétés algébriques : $e^3 \\times e^{-1}$ ; $\\dfrac{e^5}{e^2}$ ; $(e^2)^3$ ; $e^x e^{-x}$.", solution: "$e^2$ ; $e^3$ ; $e^6$ ; $e^0 = $ **1** — les sommes en haut, les produits en bas : les règles des puissances de 4e, intégralement transportées au continu." },
    { tier: "application", prompt: "Démontre que $\\exp(x + y) = \\exp(x)\\exp(y)$ (fixe $y$ et étudie $h(x) = \\exp(x+y)\\exp(-x)$).", solution: "$h'(x) = \\exp(x+y)\\exp(-x) - \\exp(x+y)\\exp(-x) = 0$ : $h$ est **constante** ; or $h(0) = \\exp(y)\\exp(0) = \\exp(y)$ — donc $\\exp(x+y)\\exp(-x) = \\exp(y)$ pour tout $x$, soit $\\exp(x+y) = \\exp(x)\\exp(y)$ ✓ : la dérivée nulle fait toute la preuve." },
    { tier: "challenge", prompt: "Démontre que $e^x > 0$ pour tout réel $x$, puis déduis-en le sens de variation de l'exponentielle.", solution: "$e^x e^{-x} = e^0 = 1$ : $e^x$ ne s'annule **jamais** ; et $e^x = \\left(e^{x/2}\\right)^2 \\geq 0$ — combiné : $e^x > 0$ partout ✓. Alors $(\\exp)' = \\exp > 0$ : **strictement croissante** sur $\\mathbb{R}$ ✓ — la fonction se tire elle-même vers le haut : positivité et croissance, démontrées d'un même geste." },
    { tier: "exam", prompt: "Démontre l'unicité : si $g$ est dérivable avec $g' = g$ et $g(0) = 1$, alors $g = \\exp$ (étudie $h(x) = g(x)\\exp(-x)$). Puis applique : un échantillon radioactif suit $N(t) = N_0\\,e^{-0{,}1t}$ — vérifie que $N' = -0{,}1\\,N$ et calcule la part restante à $t = 10$.", solution: "$h' = g'\\exp(-x) - g\\exp(-x) = (g' - g)\\exp(-x) = 0$ : $h$ constante, $h(0) = g(0) = 1$ — donc $g(x)\\exp(-x) = 1$, soit $g = \\exp$ ✓ : **une seule** fonction au monde vérifie l'équation. Application : $N'(t) = -0{,}1\\,N_0\\,e^{-0{,}1t} = -0{,}1\\,N(t)$ ✓ — la désintégration est proportionnelle au stock ; à $t = 10$ : $N = N_0\\,e^{-1} \\approx $ **37 %** du stock initial — l'équation différentielle la plus simple gouverne les horloges atomiques de l'archéologie." },
  ],
  practice: [
    { tier: "warmup", label: "Sommes en produits", make: (r) => {
      const a = randint(r, 1, 6); const b = randint(r, -4, 5);
      return { prompt: `$e^{${a}} \\times e^{${b}} = e^{?}$`, answer: a + b, solution: `Les exposants s'additionnent : $e^{${a + b}}$ — **${a + b}**.` };
    } },
    { tier: "application", label: "La dérivée de e^(at)", make: (r) => {
      const a = pick(r, [2, 3, 5, -2, -4]);
      return { prompt: `$f(t) = e^{${a}t}$ : $f'(t) = k\\,e^{${a}t}$ — que vaut $k$ ?`, answer: a, solution: `$\\left(e^{at}\\right)' = a\\,e^{at}$ : $k = $ **${a}** — la pente proportionnelle à la valeur, coefficient $${a}$.` };
    } },
    { tier: "challenge", label: "Croissante, donc comparable", make: (r) => {
      const a = randint(r, -3, 4); const b = a + randint(r, 1, 4);
      return { prompt: `L'exponentielle est strictement croissante : a-t-on $e^{${a}} < e^{${b}}$ ? (1 = oui, 0 = non)`, answer: 1, solution: `$${a} < ${b}$ et $\\exp$ croissante : **oui** — la monotonie transporte les inégalités, même sans calculer.` };
    } },
  ],
};

// — Trigonometry (programme: cercle, radian, valeurs remarquables) —
const trigonometrie = {
  id: "analysis.high.trigonometrie",
  level: "high", domain: "analysis",
  title: "Le cercle trigonométrique",
  tagline: "Enrouler la droite sur le cercle — cos et sin deviennent des coordonnées.",
  prereqs: ["geometry.middle.trigonometrie", "numbers.high.intervalles-valeur-absolue"],
  intuition:
    "Prends le cercle de rayon 1, et **enroule** la droite réelle dessus, en partant du point $(1\\,;\\,0)$, sens antihoraire : chaque réel $x$ atterrit sur un point du cercle.\n\nSes coordonnées **sont** $(\\cos x\\,;\\,\\sin x)$ — le cosinus et le sinus de 3e, libérés du triangle : définis pour **tout** réel, négatifs compris.",
  depths: {
    discovery:
      "**Avec les mains** : la nouvelle unité — le **radian** : la mesure d'un angle par la **longueur d'arc** qu'il découpe sur le cercle unité. Le tour complet mesure le périmètre, $2\\pi$ ; le demi-tour, $\\pi$ ; le quart, $\\frac{\\pi}{2}$ — fini les degrés arbitraires : l'angle se mesure en longueur, et $180° = \\pi$ rad fait la conversion.",
    standard:
      "**En image** : placer, c'est lire — $x = \\frac{\\pi}{2}$ atterrit au sommet $(0\\,;\\,1)$ : $\\cos\\frac{\\pi}{2} = 0$, $\\sin\\frac{\\pi}{2} = 1$ ; $x = \\pi$ à gauche $(-1\\,;\\,0)$. Et Pythagore sur le rayon 1 donne l'identité éternelle : $\\cos^2 x + \\sin^2 x = 1$ — ta formule de 3e, devenue l'équation du cercle lui-même. Le lien au triangle survit : pour $x$ entre 0 et $\\frac{\\pi}{2}$, le cosinus du cercle est le cosinus du triangle rectangle — la définition s'étend, ne renie rien.",
    advanced:
      "**Dans la tête** : les valeurs remarquables se **démontrent** — pour $\\frac{\\pi}{4}$ (le huitième de tour : la diagonale du carré !), le point est sur la bissectrice : $\\cos = \\sin$, et $\\cos^2 + \\sin^2 = 1$ donne $2\\cos^2 = 1$ : $\\cos\\frac{\\pi}{4} = \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$ ✓ — ton $\\sqrt{2}$ irrationnel, logé dans le cercle. Pour $\\frac{\\pi}{3}$ (le sixième de tour : le **triangle équilatéral**, demi-côté à l'appui) : $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$, et l'identité livre $\\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$ ✓. Et les **angles associés** se lisent par symétries du cercle : $-x$ (reflet horizontal : $\\cos(-x) = \\cos x$, $\\sin(-x) = -\\sin x$), $\\pi - x$ (reflet vertical : $\\cos$ change, $\\sin$ tient), $\\pi + x$ (demi-tour : les deux changent) — un dessin remplace seize formules. Archimède, lui, encadrait $\\pi$ par des polygones inscrits et exinscrits à 96 côtés : $3{,}1408 < \\pi < 3{,}1429$ — l'algorithme officiel, vieux de vingt-deux siècles.",
  },
  keyIdea: "Le radian : l'angle mesuré par la **longueur d'arc** ($2\\pi$ = le tour, $180° = \\pi$). Enroulement : $x$ réel → point $(\\cos x\\,;\\,\\sin x)$ du cercle unité — d'où $\\cos^2 x + \\sin^2 x = 1$ et les angles associés par symétries.",
  why:
    "Pourquoi quitter les degrés et le triangle ? Parce que le cercle libère la trigonométrie pour son vrai destin : décrire les **phénomènes périodiques** — rotation, marées, son, courant alternatif, saisons. Un angle de triangle s'arrête à 90° ; l'enroulement, lui, tourne sans fin et accepte tout réel : cos et sin deviennent des **fonctions**, prêtes pour les ondes de la terminale — et le radian, mesure naturelle, rendra leur dérivation miraculeusement simple.",
  examples: [
    { title: "Lire le cercle", steps: [
      { p: "$x = \\frac{\\pi}{2}$ : quart de tour, sommet $(0\\,;\\,1)$ — $\\cos = 0$, $\\sin = 1$." },
      { p: "$x = \\pi$ : demi-tour, point $(-1\\,;\\,0)$ — les coordonnées **sont** le cosinus et le sinus." },
    ] },
    { title: "π/4, démontré", steps: [
      { p: "Sur la bissectrice : $\\cos\\frac{\\pi}{4} = \\sin\\frac{\\pi}{4}$, et $\\cos^2 + \\sin^2 = 1$ donne $2\\cos^2 = 1$." },
      { p: "$\\cos\\frac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$ — la diagonale du carré, repliée dans le cercle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Convertis en radians : $180°$, $90°$, $60°$, $45°$, $30°$ — et explique ce que mesure le radian.", solution: "$\\pi$, $\\frac{\\pi}{2}$, $\\frac{\\pi}{3}$, $\\frac{\\pi}{4}$, $\\frac{\\pi}{6}$ — le radian mesure l'angle par la **longueur d'arc** découpée sur le cercle de rayon 1 : le tour entier fait $2\\pi$, comme le périmètre." },
    { tier: "warmup", prompt: "Donne $\\cos$ et $\\sin$ de $0$, $\\frac{\\pi}{2}$, $\\pi$ en lisant le cercle.", solution: "$0$ : point $(1\\,;\\,0)$ → $\\cos = 1$, $\\sin = 0$ ; $\\frac{\\pi}{2}$ : $(0\\,;\\,1)$ → $0$ et $1$ ; $\\pi$ : $(-1\\,;\\,0)$ → $-1$ et $0$ — les coordonnées du point d'arrivée, rien de plus." },
    { tier: "application", prompt: "Démontre les valeurs de $\\cos\\frac{\\pi}{4}$ et $\\sin\\frac{\\pi}{4}$.", solution: "Le point de $\\frac{\\pi}{4}$ (huitième de tour) est sur la **bissectrice** du premier quadrant : abscisse = ordonnée, donc $\\cos = \\sin$. L'identité $\\cos^2 + \\sin^2 = 1$ donne $2\\cos^2\\frac{\\pi}{4} = 1$, d'où $\\cos\\frac{\\pi}{4} = \\sin\\frac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$ ✓ (positif au premier quadrant) — la démonstration exigible, par symétrie et Pythagore." },
    { tier: "challenge", prompt: "Sachant $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$ (le triangle équilatéral coupé en deux), démontre $\\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$, puis lis sur le cercle : $\\cos\\left(\\pi - \\frac{\\pi}{3}\\right)$ et $\\sin\\left(-\\frac{\\pi}{3}\\right)$.", solution: "$\\sin^2\\frac{\\pi}{3} = 1 - \\frac{1}{4} = \\frac{3}{4}$ → $\\sin\\frac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$ ✓ (positif). Associés par symétrie : $\\pi - \\frac{\\pi}{3}$ est le reflet **vertical** → $\\cos\\frac{2\\pi}{3} = -\\frac{1}{2}$ ; $-\\frac{\\pi}{3}$ le reflet **horizontal** → $\\sin\\left(-\\frac{\\pi}{3}\\right) = -\\frac{\\sqrt{3}}{2}$ — un dessin du cercle remplace toutes les formules." },
    { tier: "exam", prompt: "Décris la méthode d'Archimède pour approcher $\\pi$ : que calcule-t-on avec des polygones inscrits et exinscrits dans le cercle unité, et pourquoi cela encadre-t-il $\\pi$ ? Donne l'encadrement qu'il obtint à 96 côtés.", solution: "Le demi-périmètre du cercle unité **est** $\\pi$ : un polygone régulier **inscrit** a un périmètre plus court (les cordes coupent), un **exinscrit** plus long (les tangentes débordent) — leurs demi-périmètres **encadrent** $\\pi$, et doubler le nombre de côtés resserre l'étau. À 96 côtés, Archimède obtint $3{,}1408 < \\pi < 3{,}1429$, soit l'encadrement $3 + \\frac{10}{71} < \\pi < 3 + \\frac{1}{7}$ — vingt-deux siècles avant Python, l'algorithme d'approximation par excès et par défaut existait déjà : c'est celui que le programme te fait coder." },
  ],
  practice: [
    { tier: "warmup", label: "Degrés vers radians", make: (r) => {
      const cas = pick(r, [[180, 1], [90, 2], [60, 3], [45, 4], [30, 6], [360, 0.5]]);
      return { prompt: `$${cas[0]}° = \\dfrac{\\pi}{?}$ rad ${cas[0] === 360 ? "(réponds 0,5 pour $2\\pi$)" : ""}`, answer: cas[1], solution: `$${cas[0]}° = ${cas[0] === 360 ? "2\\pi" : cas[1] === 1 ? "\\pi" : "\\frac{\\pi}{" + cas[1] + "}"}$ — la règle de trois sur $180° = \\pi$.` };
    } },
    { tier: "application", label: "Les coordonnées du point", make: (r) => {
      const cas = pick(r, [["0", 1, 0], ["\\pi", -1, 0], ["\\frac{\\pi}{2}", 0, 1], ["-\\frac{\\pi}{2}", 0, -1], ["2\\pi", 1, 0]]);
      const quoi = r() < 0.5;
      return { prompt: `Que vaut $${quoi ? "\\cos" : "\\sin"}\\left(${cas[0]}\\right)$ ?`, answer: quoi ? cas[1] : cas[2], solution: `Le point d'arrivée est $(${cas[1]}\\,;\\,${cas[2]})$ : **${quoi ? cas[1] : cas[2]}** — lire le cercle, pas mémoriser.` };
    } },
    { tier: "challenge", label: "Pythagore sur le cercle", make: (r) => {
      const num = pick(r, [[1, 2, 3], [3, 4, 1]]);
      return { prompt: `$\\sin^2 x = \\dfrac{${num[0]}}{${num[1]}}$ : que vaut $\\cos^2 x$ ? (réponds le numérateur sur ${num[1]})`, answer: num[2], solution: `$\\cos^2 x = 1 - \\dfrac{${num[0]}}{${num[1]}} = \\dfrac{${num[2]}}{${num[1]}}$ — **${num[2]}** : l'identité du cercle unité.` };
    } },
  ],
};

export default [exponentielle, trigonometrie];
