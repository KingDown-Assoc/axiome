// Field "Analysis" — HIGH module (expertes year): the imaginary exponential.
// Official terminale MATHS EXPERTES programme, section "Nombres complexes et
// trigonométrie": ADDITION and duplication formulas (from the dot product —
// REQUIRED PROOF: one of the addition formulas), the IMAGINARY EXPONENTIAL
// e^(iθ) and its functional relation, the EXPONENTIAL FORM of a complex
// number, EULER's formulas cos θ = (e^(iθ) + e^(−iθ))/2 and
// sin θ = (e^(iθ) − e^(−iθ))/(2i), MOIVRE's formula
// (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ); transforming trigonometric
// expressions (linearization for integration), computing powers of complex
// numbers; cos(π/5) and the regular pentagon as the showcase problem.
import { randint, pick } from "../../core/exercises.js";

const exponentielleImaginaire = {
  id: "analysis.high.exponentielle-imaginaire",
  level: "high", domain: "analysis",
  title: "L'exponentielle imaginaire",
  tagline: "e^(iθ) tourne sur le cercle — et la trigonométrie devient de l'algèbre.",
  prereqs: ["analysis.high.exponentielle", "analysis.high.trigonometrie", "numbers.high.plan-complexe"],
  intuition:
    "Note $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ : le point du cercle $\\mathbb{U}$ d'angle $\\theta$ — pourquoi ce nom d'exponentielle ? Parce qu'elle en a la **relation fonctionnelle** : $e^{i\\theta} \\times e^{i\\theta'} = e^{i(\\theta + \\theta')}$.\n\n**Multiplier, c'est additionner les angles** — et tout complexe s'écrit $z = r\\,e^{i\\theta}$ : la forme exponentielle, où les produits deviennent triviaux.",
  depths: {
    discovery:
      "**Avec les mains** : la relation fonctionnelle se touche — $e^{i\\theta}e^{i\\theta'} = (\\cos\\theta + i\\sin\\theta)(\\cos\\theta' + i\\sin\\theta')$ : développe — partie réelle $\\cos\\theta\\cos\\theta' - \\sin\\theta\\sin\\theta'$, partie imaginaire $\\sin\\theta\\cos\\theta' + \\cos\\theta\\sin\\theta'$ — et si le résultat doit être $e^{i(\\theta+\\theta')}$, alors ces deux expressions **sont** $\\cos(\\theta + \\theta')$ et $\\sin(\\theta + \\theta')$ : les **formules d'addition** de la trigonométrie, lues dans un produit de complexes.",
    standard:
      "**En image** : la démonstration exigible, par la géométrie — pour $\\cos(\\theta - \\theta')$ : prends les deux points $A(\\cos\\theta\\,;\\,\\sin\\theta)$ et $B(\\cos\\theta'\\,;\\,\\sin\\theta')$ du cercle unité — leur **produit scalaire** se calcule deux fois : en coordonnées, $\\cos\\theta\\cos\\theta' + \\sin\\theta\\sin\\theta'$ ; par la formule du cosinus, $1 \\times 1 \\times \\cos(\\theta - \\theta')$ — égalise : $\\cos(\\theta - \\theta') = \\cos\\theta\\cos\\theta' + \\sin\\theta\\sin\\theta'$ ✓ — ta première au service de l'option, et les autres formules (addition, **duplication** : $\\cos 2\\theta = 2\\cos^2\\theta - 1$, $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$) en découlent par substitutions.",
    advanced:
      "**Dans la tête** : deux formules couronnent l'édifice — **Euler** inverse la définition : $\\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$, $\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$ — le cosinus et le sinus, *fabriqués* à partir d'exponentielles : élève au cube, développe au binôme, et $\\cos^3\\theta = \\frac{1}{4}(\\cos 3\\theta + 3\\cos\\theta)$ tombe — la **linéarisation**, qui rendra intégrables les puissances de cosinus. **Moivre** itère la relation fonctionnelle : $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$ — élever à la puissance $n$, c'est multiplier l'angle par $n$ : $(1 + i)^{20} = (\\sqrt{2}\\,e^{i\\pi/4})^{20} = 2^{10}e^{i5\\pi} = -1024$ — vingt multiplications, réglées en une rotation. Et le joyau : $\\theta = \\pi$ donne $e^{i\\pi} + 1 = 0$ — cinq constantes fondamentales, une équation : l'identité d'Euler, régulièrement élue plus belle formule des mathématiques.",
  },
  keyIdea: "$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ — relation fonctionnelle $e^{i\\theta}e^{i\\theta'} = e^{i(\\theta+\\theta')}$ : **multiplier = additionner les angles** ; forme exponentielle $z = r\\,e^{i\\theta}$. **Euler** : $\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}$ (la linéarisation) ; **Moivre** : $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$ — et $e^{i\\pi} + 1 = 0$.",
  why:
    "Pourquoi marier exponentielle et cercle ? Parce que la trigonométrie devient de l'**algèbre** : seize formules d'addition, de duplication, de linéarisation se réduisent à *une* relation fonctionnelle — apprendre $e^{i\\theta}$, c'est désapprendre un formulaire. Et la physique en vit : tout signal périodique est une somme d'exponentielles tournantes (Fourier !), tout courant alternatif un $e^{i\\omega t}$ — l'électronique, les télécoms et la mécanique quantique calculent dans cette notation du matin au soir.",
  examples: [
    { title: "Multiplier, c'est tourner", steps: [
      { p: "$e^{i\\pi/3} \\times e^{i\\pi/6} = e^{i\\pi/2} = i$ — les angles s'additionnent : $60° + 30° = 90°$." },
      { p: "La relation fonctionnelle de ton exponentielle, transportée sur le cercle." },
    ] },
    { title: "Moivre écrase les puissances", steps: [
      { p: "$(1 + i)^{20}$ : forme exponentielle $\\sqrt{2}\\,e^{i\\pi/4}$ — puissance : $2^{10}\\,e^{i5\\pi}$." },
      { p: "$= 1024 \\times (-1) = -1024$ — vingt produits, réglés en une ligne d'angles." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris $e^{i\\pi/2}$, $e^{i\\pi}$ et $e^{2i\\pi}$ sous forme algébrique, et donne la fameuse identité d'Euler.", solution: "$e^{i\\pi/2} = \\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2} = i$ ; $e^{i\\pi} = -1$ ; $e^{2i\\pi} = $ **1** (le tour complet) — d'où $e^{i\\pi} + 1 = 0$ : cinq constantes ($e$, $i$, $\\pi$, 1, 0), une équation — la plus belle formule des mathématiques, lue sur ton cercle." },
    { tier: "warmup", prompt: "Mets $z = 1 + i$ sous forme exponentielle, puis calcule $z^8$.", solution: "$|z| = \\sqrt{2}$, $\\arg z = \\frac{\\pi}{4}$ : $z = \\sqrt{2}\\,e^{i\\pi/4}$ — alors $z^8 = (\\sqrt{2})^8 e^{i2\\pi} = $ **16** : Moivre multiplie l'angle par 8 (deux tours complets !) et le module fait $2^4$ — huit produits algébriques évités." },
    { tier: "application", prompt: "Démontre la formule $\\cos(\\theta - \\theta') = \\cos\\theta\\cos\\theta' + \\sin\\theta\\sin\\theta'$ par le produit scalaire de deux points du cercle unité.", solution: "$\\vec{OA}(\\cos\\theta\\,;\\,\\sin\\theta)$ et $\\vec{OB}(\\cos\\theta'\\,;\\,\\sin\\theta')$, tous deux de norme 1 — produit scalaire **en coordonnées** : $\\cos\\theta\\cos\\theta' + \\sin\\theta\\sin\\theta'$ ; **par le cosinus** : $1 \\times 1 \\times \\cos(\\theta - \\theta')$ (l'angle entre les vecteurs) — égalise : $\\cos(\\theta - \\theta') = \\cos\\theta\\cos\\theta' + \\sin\\theta\\sin\\theta'$ ✓ — la démonstration exigible : ta première (le scalaire) offre la formule mère, les autres suivent par substitutions ($\\theta' \\to -\\theta'$, $\\theta' = \\theta$…)." },
    { tier: "challenge", prompt: "Linéarise $\\cos^2\\theta$ avec les formules d'Euler, et vérifie la cohérence avec la formule de duplication.", solution: "$\\cos^2\\theta = \\left(\\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}\\right)^2 = \\dfrac{e^{2i\\theta} + 2 + e^{-2i\\theta}}{4} = \\dfrac{1 + \\cos 2\\theta}{2}$ ✓ — exactement la duplication $\\cos 2\\theta = 2\\cos^2\\theta - 1$ renversée : Euler **fabrique** les formules au lieu de les mémoriser — et $\\frac{1 + \\cos 2\\theta}{2}$ s'intègre, là où $\\cos^2$ résistait : la linéarisation est l'antichambre du calcul intégral." },
    { tier: "exam", prompt: "Démontre la formule de Moivre $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$ par récurrence (l'hérédité utilise les formules d'addition), puis applique : calcule $(1 + i)^{20}$.", solution: "**Init** : $n = 0$ : $1 = \\cos 0 + i\\sin 0$ ✓. **Hérédité** : $(\\cos\\theta + i\\sin\\theta)^{n+1} = (\\cos n\\theta + i\\sin n\\theta)(\\cos\\theta + i\\sin\\theta)$ — développe : partie réelle $\\cos n\\theta\\cos\\theta - \\sin n\\theta\\sin\\theta = \\cos((n+1)\\theta)$, partie imaginaire $\\sin((n+1)\\theta)$ — les **formules d'addition** font passer le rang ✓. **Application** : $1 + i = \\sqrt{2}\\,e^{i\\pi/4}$ : $(1+i)^{20} = 2^{10}\\,e^{i5\\pi} = 1024 \\times e^{i\\pi} = -1024$ — la récurrence assemble l'addition en puissances, et Moivre transforme vingt produits en une multiplication d'angle : la trigonométrie est devenue de l'algèbre." },
  ],
  practice: [
    { tier: "warmup", label: "Les angles s'additionnent", make: (r) => {
      const cas = pick(r, [[3, 6, 2], [4, 4, 2], [6, 3, 2], [2, 2, 1]]);
      return { prompt: `$e^{i\\pi/${cas[0]}} \\times e^{i\\pi/${cas[1]}} = e^{i\\pi/?}$`, answer: cas[2], solution: `$\\frac{\\pi}{${cas[0]}} + \\frac{\\pi}{${cas[1]}} = \\frac{\\pi}{${cas[2]}}$ — **${cas[2]}** : multiplier, c'est additionner les angles.` };
    } },
    { tier: "application", label: "Moivre multiplie l'angle", make: (r) => {
      const n = pick(r, [2, 3, 4, 6]); const denom = pick(r, [6, 4, 3]);
      return { prompt: `$\\left(e^{i\\pi/${denom}}\\right)^{${n}} = e^{in\\pi/${denom}}$ : l'angle vaut $\\frac{${n}\\pi}{${denom}}$ — donne $\\frac{n}{\\text{denom}}$ en décimal.`, answer: Math.round(n / denom * 100) / 100, solution: `Moivre : l'angle est multiplié par $${n}$ — $\\frac{${n}}{${denom}} = $ **${String(Math.round(n / denom * 100) / 100).replace(".", ",")}**.` };
    } },
    { tier: "challenge", label: "Le module de Moivre", make: (r) => {
      const m = pick(r, [2, 3]); const n = randint(r, 2, 4);
      return { prompt: `$z = ${m}\\,e^{i\\theta}$ : que vaut $|z^{${n}}|$ ?`, answer: m ** n, solution: `$|z|^{${n}} = ${m}^{${n}} = $ **${m ** n}** — le module suit la puissance, l'angle suit le facteur.` };
    } },
  ],
};

export default [exponentielleImaginaire];
