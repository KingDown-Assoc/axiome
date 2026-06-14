// Field "Analysis" — HIGH module (terminale year), part 3: the natural
// logarithm. Official terminale spécialité programme. The function ln is
// CONSTRUCTED as the reciprocal of the exponential studied in première;
// algebraic properties (products to sums); derivative of ln — REQUIRED PROOF,
// differentiability being admitted (differentiate e^(ln x) = x via the chain
// rule); variations, limits at 0 and +∞, the curves of ln and exp symmetric
// about the line y = x; growth comparison of ln and x ↦ x^n at 0 and +∞ —
// REQUIRED PROOF: the limit of x·ln(x) at 0; using the functional equations of
// exp and ln to transform expressions and solve equations. Official algorithm:
// BRIGGS' algorithm for computing logarithms. The DECIMAL logarithm (the
// terminale techno exclusive: pH, decibels, Richter) lives in the lower tiers.
import { randint, pick } from "../../core/exercises.js";

const logarithme = {
  id: "analysis.high.logarithme",
  level: "high", domain: "analysis",
  title: "Le logarithme népérien",
  tagline: "La réciproque de l'exponentielle — les produits redeviennent des sommes.",
  prereqs: ["analysis.high.exponentielle", "analysis.high.limites-fonctions"],
  intuition:
    "L'exponentielle est strictement croissante de $]0\\,;\\,+\\infty[$ vers tous les positifs : chaque $k > 0$ a **un unique antécédent** — ce nombre s'appelle $\\ln k$ : le **logarithme népérien** est la **réciproque** de l'exponentielle.\n\nDeux clés d'or : $e^{\\ln x} = x$ et $\\ln(e^x) = x$ — chacune défait l'autre, et $e^x = k \\iff x = \\ln k$ : les équations exponentielles tombent.",
  depths: {
    discovery:
      "**Avec les mains** : les valeurs s'héritent — $\\ln 1 = 0$ (car $e^0 = 1$), $\\ln e = 1$, et le logarithme **décimal** $\\log x = \\frac{\\ln x}{\\ln 10}$ compte les zéros : $\\log 1000 = 3$ — c'est lui qui gradue le **pH** (chaque unité : un facteur 10 d'acidité), les **décibels**, l'échelle de **Richter** (magnitude 7 = trente fois l'énergie d'une 6) : quand les grandeurs s'étalent sur des facteurs 10, le logarithme les remet à l'échelle humaine.",
    standard:
      "**En image** : les propriétés algébriques, miroir de l'exponentielle — $\\ln(ab) = \\ln a + \\ln b$ (les **produits deviennent des sommes** : l'inverse exact de $e^{x+y} = e^x e^y$), d'où $\\ln\\frac{a}{b} = \\ln a - \\ln b$ et $\\ln(a^n) = n\\ln a$ — la puissance descend en facteur : $2^x = 10$ se résout $x = \\frac{\\ln 10}{\\ln 2} \\approx 3{,}32$. Et les **courbes** de $\\ln$ et $\\exp$ sont **symétriques** par rapport à la droite $y = x$ — chaque point $(a\\,;\\,b)$ de l'une se reflète en $(b\\,;\\,a)$ de l'autre : la réciproque, dessinée.",
    advanced:
      "**Dans la tête** : la dérivée, **démontrée** (dérivabilité admise) — dérive l'identité $e^{\\ln x} = x$ par la composée : $\\ln'(x) \\times e^{\\ln x} = 1$, soit $\\ln'(x) \\times x = 1$ : $\\boxed{\\ln'(x) = \\frac{1}{x}}$ ✓ — la fonction inverse, orpheline de primitive en première, vient de trouver sa mère. Variations : $\\frac{1}{x} > 0$ : strictement **croissante**, de $-\\infty$ (en $0^+$) à $+\\infty$ — mais à quel train de sénateur : les **croissances comparées** disent $\\frac{\\ln x}{x^n} \\to 0$ en $+\\infty$ (le logarithme perd contre toute puissance — pose $x = e^t$ : c'est ta course $t/e^{nt}$ !) et $x\\ln x \\to 0$ en $0^+$ (**démontré** par le même changement : $x\\ln x = -t\\,e^{-t} \\to 0$) : la hiérarchie complète $\\ln \\ll x^n \\ll e^x$ est scellée. Henry **Briggs** (1617) calculait ses tables par racines carrées répétées — extraire $\\sqrt{\\phantom{x}}$ divise le logarithme par 2 : l'algorithme officiel, qui fit naviguer trois siècles de marins.",
  },
  keyIdea: "$\\ln$ : réciproque de $\\exp$ — $e^{\\ln x} = x$, $\\ln(e^x) = x$, courbes symétriques par rapport à $y = x$. $\\ln(ab) = \\ln a + \\ln b$, $\\ln(a^n) = n\\ln a$. **Dérivée** : $\\ln'(x) = \\frac{1}{x}$ (démontrée par composée) ; croissante de $-\\infty$ à $+\\infty$, mais $\\ln \\ll x^n$ — et $x\\ln x \\to 0$ en $0^+$.",
  why:
    "Pourquoi inventer la réciproque ? Parce que la moitié des questions sont des questions **inverses** — l'exponentielle dit où sera le capital dans $n$ ans, le logarithme dit **quand** il aura doublé ; l'une projette, l'autre date. Et historiquement, l'ordre fut inverse : Napier créa les logarithmes en 1614 pour **remplacer les multiplications par des additions** — les tables de logarithmes furent le coprocesseur de l'humanité, de Kepler aux ingénieurs d'Apollo, trois siècles avant que l'exponentielle ne prenne le trône théorique.",
  examples: [
    { title: "L'équation renversée", steps: [
      { p: "Un capital double : $1{,}03^n = 2$, soit $e^{n\\ln 1{,}03} = 2$ — donc $n\\ln 1{,}03 = \\ln 2$." },
      { p: "$n = \\dfrac{\\ln 2}{\\ln 1{,}03} \\approx 23{,}4$ — ta boucle de seuil de première, résolue en une ligne." },
    ] },
    { title: "La dérivée par la composée", steps: [
      { p: "Dérive $e^{\\ln x} = x$ : la composée donne $\\ln'(x)\\,e^{\\ln x} = 1$, soit $x\\ln'(x) = 1$." },
      { p: "$\\ln'(x) = \\dfrac{1}{x}$ ✓ — l'inverse trouve enfin qui le dérive." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\ln 1$, $\\ln e$, $\\ln(e^3)$ et $e^{\\ln 5}$ — sans calculatrice, par la réciprocité.", solution: "$\\ln 1 = $ **0** ($e^0 = 1$), $\\ln e = $ **1**, $\\ln(e^3) = $ **3** et $e^{\\ln 5} = $ **5** — chaque fonction défait l'autre : les deux clés d'or suffisent." },
    { tier: "warmup", prompt: "Simplifie avec les propriétés algébriques : $\\ln 6 - \\ln 2$ ; $\\ln 8$ en fonction de $\\ln 2$ ; $\\ln\\frac{1}{e}$.", solution: "$\\ln\\frac{6}{2} = \\ln 3$ ; $\\ln(2^3) = 3\\ln 2$ (la puissance descend) ; $\\ln(e^{-1}) = -1$ — les produits deviennent des sommes : le miroir exact de l'exponentielle." },
    { tier: "application", prompt: "Un capital placé à 3 % double quand $1{,}03^n = 2$. Résous par le logarithme, et compare à ta boucle de seuil de première.", solution: "$n\\ln 1{,}03 = \\ln 2$ : $n = \\dfrac{\\ln 2}{\\ln 1{,}03} \\approx $ **23,4** — donc 24 années pleines : exactement le rang que ta boucle *tant que* traquait pas à pas — le logarithme résout d'un coup ce que l'algorithme grignotait." },
    { tier: "challenge", prompt: "Démontre que $x\\ln x \\to 0$ quand $x \\to 0^+$ (pose $x = e^{-t}$ avec $t \\to +\\infty$).", solution: "$x\\ln x = e^{-t} \\times (-t) = -\\dfrac{t}{e^t}$ — et la croissance comparée dit $\\dfrac{t}{e^t} \\to 0$ : donc $x\\ln x \\to $ **0** ✓ — la démonstration exigible : le changement de variable rapatrie la question chez l'exponentielle, où la course est déjà jugée — le logarithme tend vers $-\\infty$ en 0, mais si lentement que $x$ l'éteint." },
    { tier: "exam", prompt: "Démontre que $\\ln'(x) = \\frac{1}{x}$ (la dérivabilité de ln étant admise), en dérivant l'identité $e^{\\ln x} = x$.", solution: "Pour $x > 0$, dérive les deux membres de $e^{\\ln x} = x$ : à gauche, la **composée** $(e^u)' = u'e^u$ donne $\\ln'(x)\\,e^{\\ln x}$ ; à droite, 1 — donc $\\ln'(x)\\,e^{\\ln x} = 1$, et comme $e^{\\ln x} = x$ : $\\ln'(x) = \\dfrac{1}{x}$ ✓ — la démonstration exigible : trois lignes où la réciprocité et la dérivée de composée font tout le travail — et la fonction $\\frac{1}{x}$, qui n'était la dérivée de personne en première, trouve sa primitive : le calcul intégral en aura besoin dès la leçon suivante." },
  ],
  practice: [
    { tier: "warmup", label: "Les clés d'or", make: (r) => {
      const n = randint(r, 2, 7); const quoi = r() < 0.5;
      return { prompt: quoi ? `$\\ln(e^{${n}}) = \\,?$` : `$e^{\\ln ${n}} = \\,?$`, answer: n, solution: `Réciprocité : **${n}** — chaque fonction défait l'autre.` };
    } },
    { tier: "application", label: "La puissance descend", make: (r) => {
      const n = randint(r, 2, 6);
      return { prompt: `$\\ln(2^{${n}}) = k\\ln 2$ : que vaut $k$ ?`, answer: n, solution: `$\\ln(a^n) = n\\ln a$ : $k = $ **${n}** — l'exposant descend en facteur.` };
    } },
    { tier: "challenge", label: "Le doublement daté", make: (r) => {
      const cas = pick(r, [[2, 0.7], [3, 1.1], [8, 2.1]]);
      const taux = pick(r, [[7, 0.07], [10, 0.1]]);
      return { prompt: `$\\ln ${cas[0]} \\approx ${String(cas[1]).replace(".", ",")}$ : combien d'années pour multiplier un capital par ${cas[0]} à ${taux[0]} % continu ($e^{${String(taux[1]).replace(".", ",")}t} = ${cas[0]}$) ?`, answer: cas[1] / taux[1], solution: `$t = \\dfrac{\\ln ${cas[0]}}{${String(taux[1]).replace(".", ",")}} = $ **${String(cas[1] / taux[1]).replace(".", ",")}** ans — le logarithme date.` };
    } },
  ],
};

export default [logarithme];
