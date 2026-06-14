// Field "Analysis" — HIGH module (terminale year), part 4: primitives,
// differential equations, integral calculus. Official terminale spécialité
// programme. PRIMITIVES: the equation y' = f, primitives of a continuous
// function — REQUIRED PROOF: two primitives differ by a constant —, reference
// primitives (x^n for n ∈ ℤ, 1/√x, exp, sin, cos — and 1/x → ln), recognizing
// (v' ∘ u) × u' backwards. DIFFERENTIAL EQUATIONS: y' = ay (shape of the
// curves) — REQUIRED PROOF of the resolution —, y' = ay + b via a constant
// particular solution, y' = ay + f given a particular solution; deepenings:
// logistic equation, Euler's method. INTEGRAL: definition as the area under
// the curve for a continuous positive f on [a,b] — THEOREM (proved for
// positive increasing f): F_a(x) = ∫f is the primitive vanishing at a —,
// ∫ = F(b) − F(a), every continuous function has primitives (admitted),
// linearity, positivity, Chasles, MEAN VALUE, area between two curves,
// INTEGRATION BY PARTS (required proof); deepenings: rectangle methods,
// Monte-Carlo. History: Huygens, Pascal and Barrow see areas as the inverse
// problem of tangents.
import { randint, pick } from "../../core/exercises.js";

// — Primitives and differential equations (programme: y' = ay démontrée) —
const primitivesEquadiff = {
  id: "analysis.high.primitives-equadiff",
  level: "high", domain: "analysis",
  title: "Primitives et équations différentielles",
  tagline: "Dériver à l'envers — et résoudre y′ = ay, l'équation que la nature préfère.",
  prereqs: ["analysis.high.convexite", "analysis.high.logarithme"],
  intuition:
    "Renverse la dérivation : connaissant $f$, trouver $F$ telle que $F' = f$ — une **primitive** : l'antidérivée.\n\nC'est résoudre l'équation $y' = f$, la plus simple des **équations différentielles** — ces équations dont l'inconnue est une *fonction* et qui écrivent les lois de la nature : vitesse, désintégration, refroidissement.",
  depths: {
    discovery:
      "**Avec les mains** : le répertoire se lit à l'envers — $x^n$ a pour primitive $\\frac{x^{n+1}}{n+1}$ (l'exposant remonte !), $e^x$ se primitive en $e^x$ (l'invariante !), $\\cos$ en $\\sin$, $\\sin$ en $-\\cos$ — et le trou de première se comble : $\\frac{1}{x}$ a pour primitive $\\ln x$ (sur $]0\\,;\\,+\\infty[$) : ta dérivée fraîchement démontrée, lue dans l'autre sens.",
    standard:
      "**En image** : combien de primitives ? Si $F' = f$, alors $(F + 3)' = f$ aussi : les primitives pullulent — mais **deux primitives diffèrent d'une constante**, démontré : si $F' = G' = f$, alors $(F - G)' = 0$, et une fonction de dérivée nulle sur un intervalle est **constante** (ses variations sont nulles !) : $F = G + C$ ✓ — la famille complète est $F + C$, une courbe par altitude, et une **condition initiale** ($F(0) = 5$) en élit une seule. Pour primitiver les composées : reconnaître $(v' \\circ u) \\times u'$ — $2x\\,e^{x^2}$ crie sa primitive $e^{x^2}$ : la dérivation de composée, lue à rebours.",
    advanced:
      "**Dans la tête** : l'équation reine $y' = ay$ — « la vitesse est proportionnelle à la valeur » : ses solutions sont **exactement** les $y = C\\,e^{ax}$, **démontré** : que les $Ce^{ax}$ marchent, dérive ; qu'il n'y a qu'elles, prends une solution $g$ et pose $h(x) = g(x)\\,e^{-ax}$ — $h' = (g' - ag)e^{-ax} = 0$ : $h$ constante, $g = C\\,e^{ax}$ ✓ (l'argument même de l'unicité de l'exponentielle en première !). Pour $y' = ay + b$ : cherche d'abord une solution **constante** $y_0 = -\\frac{b}{a}$ (l'équilibre !), et la solution générale est $C\\,e^{ax} - \\frac{b}{a}$ — l'écart à l'équilibre suit $y' = ay$. Le café refroidit ($T' = -k(T - T_{\\text{air}})$), le carbone 14 se désintègre, le condensateur se charge : la même équation, trois costumes — et la **logistique** ($y' = ay(1 - y)$ : la croissance qui sature) ou la méthode d'**Euler** (avancer le long de la tangente, pas à pas) t'attendent en éclaireurs du supérieur.",
  },
  keyIdea: "Primitive : $F' = f$ — **deux primitives diffèrent d'une constante** (démontré : dérivée nulle ⟹ constante). Répertoire inversé : $x^n \\to \\frac{x^{n+1}}{n+1}$, $\\frac{1}{x} \\to \\ln x$, $(v' \\circ u) \\times u'$ reconnu. $y' = ay$ ⟺ $y = Ce^{ax}$ (démontré) ; $y' = ay + b$ : équilibre $-\\frac{b}{a}$ + $Ce^{ax}$.",
  why:
    "Pourquoi dériver à l'envers ? Parce que la nature dicte des **vitesses**, jamais des positions : la physique mesure des taux (vitesse, débit, flux) et veut des trajectoires — chaque loi est une équation différentielle, chaque prédiction une primitive. Newton a inventé le calcul intégral *pour* résoudre le mouvement des planètes : trois siècles plus tard, météo, épidémiologie, circuits et finance résolvent toujours $y' = ay + \\cdots$ — c'est l'équation la plus rentable de la science.",
  examples: [
    { title: "Le répertoire renversé", steps: [
      { p: "$f(x) = x^2$ : primitive $\\dfrac{x^3}{3}$ (vérifie : dérive !) — famille complète $\\dfrac{x^3}{3} + C$." },
      { p: "$f(x) = 2x\\,e^{x^2}$ : la forme $(v' \\circ u)\\,u'$ — primitive $e^{x^2}$ : la composée, lue à rebours." },
    ] },
    { title: "Le café qui refroidit", steps: [
      { p: "$T' = -0{,}1(T - 20)$ : l'écart $y = T - 20$ suit $y' = -0{,}1\\,y$ — donc $y = Ce^{-0{,}1t}$." },
      { p: "$T(t) = 20 + Ce^{-0{,}1t}$ : la température glisse vers l'équilibre, exponentiellement." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne une primitive de $f(x) = x^2$, de $g(x) = e^x + 3$, de $h(x) = \\frac{1}{x}$ (sur $]0\\,;\\,+\\infty[$) — et vérifie l'une d'elles en dérivant.", solution: "$F(x) = \\dfrac{x^3}{3}$, $G(x) = e^x + 3x$, $H(x) = \\ln x$ — vérification : $F'(x) = x^2$ ✓ : primitiver, c'est dériver à l'envers, et chaque réponse se contrôle d'un coup de dérivée." },
    { tier: "warmup", prompt: "Démontre que deux primitives d'une même fonction sur un intervalle diffèrent d'une constante.", solution: "Si $F' = G' = f$, alors $(F - G)' = 0$ sur l'intervalle — une fonction de **dérivée nulle** y est **constante** (son tableau de variations est plat !) : $F - G = C$, soit $F = G + C$ ✓ — la démonstration exigible : toute la famille des primitives est une seule courbe, translatée verticalement." },
    { tier: "application", prompt: "Trouve LA primitive de $f(x) = 2x\\,e^{x^2}$ qui vaut 5 en 0.", solution: "Reconnais $(v' \\circ u)\\,u'$ avec $u = x^2$ : les primitives sont $e^{x^2} + C$ ; la condition $F(0) = 5$ donne $1 + C = 5$ : $C = 4$ — $F(x) = e^{x^2} + 4$ : la famille entière, puis l'élection par la condition initiale." },
    { tier: "challenge", prompt: "Résous $y' = 2y + 6$ : trouve la solution constante, puis la solution générale, puis celle qui vérifie $y(0) = 1$.", solution: "Constante : $0 = 2y_0 + 6$ : $y_0 = -3$ (l'équilibre). L'écart $z = y + 3$ suit $z' = 2z$ : $z = Ce^{2x}$ — général : $y = Ce^{2x} - 3$ ; et $y(0) = 1$ : $C = 4$ — $y = 4e^{2x} - 3$ : équilibre + écart exponentiel : la méthode complète en trois gestes." },
    { tier: "exam", prompt: "Démontre que les solutions de $y' = ay$ sont exactement les fonctions $y = Ce^{ax}$ (vérifie le sens direct, puis prouve qu'il n'y en a pas d'autres via $h(x) = g(x)e^{-ax}$). Applique : un échantillon radioactif vérifie $N' = -0{,}02N$ avec $N(0) = 1000$ — donne $N(t)$.", solution: "**Direct** : $(Ce^{ax})' = aCe^{ax} = a \\times Ce^{ax}$ ✓. **Réciproque** : soit $g$ une solution ; $h(x) = g(x)e^{-ax}$ a pour dérivée $h' = (g' - ag)e^{-ax} = 0$ — $h$ est **constante** $C$, donc $g(x) = Ce^{ax}$ ✓ : aucune autre solution n'existe — c'est mot pour mot l'argument d'unicité de l'exponentielle en première, devenu théorème général : la démonstration exigible. **Application** : $N(t) = Ce^{-0{,}02t}$ et $N(0) = 1000$ : $N(t) = 1000\\,e^{-0{,}02t}$ — la datation au carbone 14 tient dans ces deux lignes." },
  ],
  practice: [
    { tier: "warmup", label: "L'exposant remonte", make: (r) => {
      const n = randint(r, 1, 5);
      return { prompt: `Primitive de $x^{${n}}$ : $\\dfrac{x^{?}}{${n + 1}}$ — quel exposant ?`, answer: n + 1, solution: `L'exposant **remonte** : $\\dfrac{x^{${n + 1}}}{${n + 1}}$ — réponds **${n + 1}** (dérive pour vérifier).` };
    } },
    { tier: "application", label: "La constante élue", make: (r) => {
      const v0 = randint(r, 2, 9);
      return { prompt: `Primitives de $e^x$ : $e^x + C$. Laquelle vaut ${v0 + 1} en 0 ? (donne $C$)`, answer: v0, solution: `$1 + C = ${v0 + 1}$ : $C = $ **${v0}** — la condition initiale élit sa courbe.` };
    } },
    { tier: "challenge", label: "L'équilibre de y′ = ay + b", make: (r) => {
      const a = pick(r, [2, -2, 3]); const b = a * randint(r, 1, 4) * (r() < 0.5 ? 1 : -1);
      return { prompt: `$y' = ${a}y ${b >= 0 ? "+ " + b : "- " + (-b)}$ : quelle est la solution constante (l'équilibre) ?`, answer: -b / a, solution: `$0 = ${a}y_0 ${b >= 0 ? "+ " + b : "- " + (-b)}$ : $y_0 = $ **${-b / a}** — le point où plus rien ne bouge.` };
    } },
  ],
};

// — Integral calculus (programme: aire, théorème fondamental, IPP) —
const integrale = {
  id: "analysis.high.integrale",
  level: "high", domain: "analysis",
  title: "Le calcul intégral",
  tagline: "L'aire sous la courbe — et le théorème qui la confie aux primitives.",
  prereqs: ["analysis.high.primitives-equadiff", "analysis.high.continuite"],
  intuition:
    "L'**intégrale** $\\int_a^b f(x)\\,dx$ d'une fonction continue positive est l'**aire** entre sa courbe et l'axe, de $a$ à $b$ — le cumul continu : distance parcourue, énergie consommée, eau écoulée.\n\nEt le miracle du chapitre : cette aire se calcule **par les primitives** — $\\int_a^b f(x)\\,dx = F(b) - F(a)$ : le problème des aires et celui des tangentes étaient inverses l'un de l'autre.",
  depths: {
    discovery:
      "**Avec les mains** : l'aire d'abord — $\\int_0^3 2\\,dx = 6$ (un rectangle !), $\\int_0^1 x\\,dx = \\frac{1}{2}$ (un triangle) : pour les courbes simples, la géométrie de l'école suffit — et l'unité d'aire est celle du repère. Pour les vraies courbes, on **encadre** par des rectangles : la méthode, vieille comme Archimède, que ton ordinateur exécute encore.",
    standard:
      "**En image** : le **théorème fondamental** — pour $f$ continue positive, la fonction « aire accumulée » $F_a(x) = \\int_a^x f(t)\\,dt$ est dérivable et $F_a' = f$ : **l'aire se dérive en la hauteur** (le taux $\\frac{F_a(x+h) - F_a(x)}{h}$ est une tranche d'aire divisée par sa largeur — coincée entre $f(x)$ et $f(x+h)$ pour $f$ croissante : les gendarmes concluent ✓). Conséquence : $\\int_a^b f(x)\\,dx = F(b) - F(a)$ pour **toute** primitive $F$ — l'aire sous la parabole : $\\int_0^1 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3}$ — ce qu'Archimède obtint par épuisement, une primitive le donne en une ligne.",
    advanced:
      "**Dans la tête** : la boîte à outils — **linéarité** ($\\int(f + g) = \\int f + \\int g$), **positivité** ($f \\geq 0 \\Rightarrow \\int \\geq 0$, et les inégalités s'intègrent), **Chasles** ($\\int_a^b + \\int_b^c = \\int_a^c$ : les aires s'aboutent), **valeur moyenne** $\\frac{1}{b-a}\\int_a^b f$ (l'altitude du rectangle équivalent — ta moyenne de notes, version continue), aire **entre deux courbes** ($\\int (f - g)$). Et l'arme lourde, **démontrée** : l'**intégration par parties** — intègre $(uv)' = u'v + uv'$ entre $a$ et $b$ : $[uv]_a^b = \\int u'v + \\int uv'$, soit $\\int_a^b u\\,v' = [uv]_a^b - \\int_a^b u'v$ ✓ — on échange une intégrale contre une plus simple : $\\int_0^1 x\\,e^x\\,dx$ tombe en posant $u = x$. Huygens, Pascal et Barrow pressentaient que les aires inversaient les tangentes — Newton et Leibniz en firent le théorème : deux mille ans après Archimède, le calcul des aires devint un calcul tout court.",
  },
  keyIdea: "$\\int_a^b f$ : l'aire sous la courbe ($f$ continue positive). **Théorème fondamental** : $x \\mapsto \\int_a^x f$ est LA primitive nulle en $a$ — d'où $\\int_a^b f = F(b) - F(a)$. Linéarité, positivité, **Chasles**, valeur moyenne $\\frac{1}{b-a}\\int f$ — et l'**IPP** : $\\int u\\,v' = [uv] - \\int u'v$ (démontrée : $(uv)'$ intégrée).",
  why:
    "Pourquoi l'aire obsède-t-elle l'analyse ? Parce qu'**intégrer, c'est cumuler** : la distance cumule la vitesse, l'énergie cumule la puissance, la probabilité cumulera la densité (le supérieur arrive) — toute grandeur étendue est une intégrale de sa densité. Le théorème fondamental est sans doute le plus beau résultat du lycée : deux questions millénaires — quadrer les aires, tracer les tangentes — se révèlent être la **même** question, lue dans les deux sens : c'est lui qui rend le monde calculable.",
  examples: [
    { title: "L'aire en une ligne", steps: [
      { p: "$\\int_0^1 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{1}{3}$ — le tiers du carré unité, sous la parabole." },
      { p: "Archimède l'avait par épuisement de triangles : la primitive l'offre en une ligne." },
    ] },
    { title: "L'IPP qui échange", steps: [
      { p: "$\\int_0^1 x\\,e^x\\,dx$ : pose $u = x$, $v' = e^x$ — alors $\\int = [x\\,e^x]_0^1 - \\int_0^1 e^x\\,dx$." },
      { p: "$= e - (e - 1) = 1$ — l'intégrale rebelle, troquée contre une docile." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule par la géométrie pure : $\\int_0^3 2\\,dx$ et $\\int_0^4 x\\,dx$ — quelles figures vois-tu ?", solution: "Un **rectangle** $3 \\times 2 = $ **6**, et un **triangle** $\\frac{4 \\times 4}{2} = $ **8** — l'intégrale d'une fonction positive est une aire, et les aires simples se lisent : la géométrie du primaire valide le calcul du supérieur." },
    { tier: "warmup", prompt: "Calcule $\\int_0^1 x^2\\,dx$ par une primitive, puis $\\int_1^e \\frac{1}{x}\\,dx$.", solution: "$\\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3}$ — le tiers du carré, sous la parabole ; $[\\ln x]_1^e = \\ln e - \\ln 1 = $ **1** : l'aire sous l'hyperbole de 1 à $e$ vaut exactement 1 — c'est même ce qui *définit* $e$ dans certains manuels." },
    { tier: "application", prompt: "Une voiture roule à $v(t) = 3t^2$ m/s. Quelle distance entre $t = 0$ et $t = 4$ s ? Et que vaut sa vitesse moyenne sur ce trajet ?", solution: "$d = \\int_0^4 3t^2\\,dt = [t^3]_0^4 = $ **64 m** — la distance cumule la vitesse : intégrer, c'est cumuler ; vitesse moyenne $= \\frac{1}{4}\\int_0^4 v = \\frac{64}{4} = $ **16 m/s** — la valeur moyenne : l'altitude du rectangle qui ferait la même aire." },
    { tier: "challenge", prompt: "Calcule l'aire entre les courbes de $f(x) = x$ et $g(x) = x^2$ sur $[0\\,;\\,1]$ (qui est au-dessus ?).", solution: "Sur $[0\\,;\\,1]$, $x \\geq x^2$ (la droite domine la parabole entre les intersections 0 et 1) : aire $= \\int_0^1 (x - x^2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$ — l'aire entre deux courbes intègre la différence : le croissant entre droite et parabole pèse un sixième." },
    { tier: "exam", prompt: "Démontre la formule d'intégration par parties à partir de la dérivée d'un produit, puis applique-la pour calculer $\\int_0^1 x\\,e^x\\,dx$.", solution: "$(uv)' = u'v + uv'$ : intègre les deux membres sur $[a\\,;\\,b]$ — à gauche, une primitive de $(uv)'$ est $uv$ : $[uv]_a^b$ ; à droite, la linéarité sépare : $\\int_a^b u'v + \\int_a^b uv'$ — d'où $\\int_a^b u\\,v' = [uv]_a^b - \\int_a^b u'v$ ✓ : la démonstration exigible, la règle du produit lue à l'envers. **Application** : $u = x$ ($u' = 1$), $v' = e^x$ ($v = e^x$) : $\\int_0^1 x\\,e^x\\,dx = [x\\,e^x]_0^1 - \\int_0^1 e^x\\,dx = e - (e - 1) = $ **1** — on a troqué $x\\,e^x$ (introuvable au répertoire) contre $e^x$ (immédiate) : l'échange standard, qui désarme la moitié des intégrales du supérieur." },
  ],
  practice: [
    { tier: "warmup", label: "L'aire du rectangle", make: (r) => {
      const h = randint(r, 2, 6); const b = randint(r, 2, 5);
      return { prompt: `$\\displaystyle\\int_0^{${b}} ${h}\\,dx = \\,?$`, answer: h * b, solution: `Un rectangle $${b} \\times ${h} = $ **${h * b}** — l'intégrale d'une constante.` };
    } },
    { tier: "application", label: "La primitive aux bornes", make: (r) => {
      const b = randint(r, 1, 3); const n = pick(r, [1, 2, 3]);
      return { prompt: `$\\displaystyle\\int_0^{${b}} ${n + 1 === 2 ? "2x" : (n + 1) + "x^{" + n + "}"}\\,dx = [x^{${n + 1}}]_0^{${b}} = \\,?$`, answer: b ** (n + 1), solution: `$${b}^{${n + 1}} - 0 = $ **${b ** (n + 1)}** — $F(b) - F(a)$.` };
    } },
    { tier: "challenge", label: "Chasles aboute", make: (r) => {
      const a1 = randint(r, 2, 8); const a2 = randint(r, 2, 8);
      return { prompt: `$\\displaystyle\\int_0^2 f = ${a1}$ et $\\displaystyle\\int_2^5 f = ${a2}$ : que vaut $\\displaystyle\\int_0^5 f$ ?`, answer: a1 + a2, solution: `Chasles : $${a1} + ${a2} = $ **${a1 + a2}** — les aires s'aboutent.` };
    } },
  ],
};

export default [primitivesEquadiff, integrale];
