// Field "Analysis" — demo lesson (skeleton).
const derivative = {
  id: "analysis.high.derivative",
  level: "high", domain: "analysis",
  title: "La dérivée d'une fonction",
  tagline: "La pente de la courbe en un point : sa vitesse de variation.",
  draft: true,
  prereqs: ["algebra.middle.linear-equation"],
  intuition:
    "Imagine une voiture : sa position change avec le temps. La dérivée, c'est sa **vitesse à un instant précis** — pas la vitesse moyenne du trajet, mais celle pile maintenant.\n\nSur le graphe d'une fonction, la dérivée en un point, c'est la **pente de la tangente** : la droite qui « épouse » la courbe à cet endroit. Pente positive → ça monte ; négative → ça descend ; nulle → c'est plat (souvent un sommet ou un creux).",
  depths: {
    discovery: "La dérivée dit si ça monte ou descend, et à quel point c'est raide. C'est la pente de la courbe au point regardé.",
    standard: "Le nombre dérivé $f'(a)$ est la limite du taux d'accroissement entre $a$ et $a+h$ quand $h$ devient minuscule. C'est la pente de la tangente en $a$. Règles usuelles : $(x^n)' = n x^{n-1}$, et la dérivation est linéaire.",
    advanced: "$f$ est dérivable en $a$ si la limite du taux d'accroissement existe et est finie ; cette limite est $f'(a)$. La dérivabilité en $a$ entraîne la continuité en $a$ (réciproque fausse : $|x|$ en $0$). La fonction $a \\mapsto f'(a)$ ouvre tout le calcul différentiel : variations, optimisation, développements limités, équations différentielles.",
  },
  formulas: [
    { tex: "f'(a) = \\lim_{h \\to 0} \\dfrac{f(a+h) - f(a)}{h}", legend: "le nombre dérivé : limite du taux d'accroissement" },
    { tex: "(x^n)' = n\\,x^{\\,n-1}", legend: "la règle de base sur les puissances" },
    { tex: "(u+v)' = u' + v', \\qquad (k\\,u)' = k\\,u'", legend: "la dérivation est linéaire" },
  ],
  keyIdea: "Tangente horizontale $\\iff f'(x) = 0$ : c'est là qu'on cherche les extremums.",
  why:
    "Pourquoi une limite ? Parce que la « vitesse moyenne » entre $a$ et $a+h$ vaut $\\frac{f(a+h)-f(a)}{h}$ — la pente d'une corde. En rapprochant $a+h$ de $a$ (donc $h \\to 0$), la corde bascule vers la tangente : la pente moyenne devient la pente instantanée. La limite, c'est exactement ce « moment où $h$ disparaît » sans jamais diviser par zéro.",
  widgets: [
    { kind: "plotter", params: { fns: [{ f: (x) => x * x, color: "#37dbf0", label: "f(x) = x²" }], xmin: -3, xmax: 3, tangent: { fnIndex: 0, x0: 1 } }, caption: "Déplace x₀ : la pente affichée est f '(x₀). En x₀ = 1, elle vaut 2." },
  ],
  examples: [
    { title: "Dériver f(x) = x²", steps: [
      { p: "Règle $(x^n)' = n x^{n-1}$ avec $n = 2$." },
      { p: "Donc", tex: "f'(x) = 2x^{2-1} = 2x" },
      { p: "En $x = 1$ : $f'(1) = 2$ → la tangente monte avec une pente de 2." },
    ] },
    { title: "Dériver une somme : f(x) = x³ + 5x", steps: [
      { p: "$(x^3)' = 3x^2$ et $(5x)' = 5$." },
      { p: "La dérivée d'une somme est la somme des dérivées :", tex: "f'(x) = 3x^2 + 5" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La pente de la tangente est négative. La fonction monte-t-elle ou descend-elle ?", solution: "Pente négative → la fonction **descend**." },
    { tier: "warmup", prompt: "Dérive $f(x) = x^4$.", solution: "$(x^4)' = 4x^3$." },
    { tier: "application", prompt: "Dérive $f(x) = 3x^2$.", solution: "$(3x^2)' = 3 \\times 2x = 6x$." },
    { tier: "challenge", prompt: "Pour $f(x) = x^2$, calcule $f'(2)$ (la pente en $x = 2$).", solution: "$f'(x) = 2x$, donc $f'(2) = 4$." },
    { tier: "exam", prompt: "Soit $f(x) = x^2 - 4x + 1$. Pour quelle valeur de $x$ la tangente est-elle horizontale ?", solution: "$f'(x) = 2x - 4$. Tangente horizontale $\\iff f'(x) = 0 \\iff 2x - 4 = 0 \\iff x = 2$." },
  ],
};

export default [derivative];
