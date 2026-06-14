// Field "Applied mathematics" — MIDDLE module (3e year): translating
// evolutions. Official cycle-4 programme: TRANSLATING an increase or decrease
// into percentages (reading the coefficient backwards), applying evolutions with
// or without the multiplier coefficient, and RELATING the graphical
// representation of a proportional situation to THALES' theorem — the nested
// triangles of geometry being the very picture of the linear graph.
import { randint, pick } from "../../core/exercises.js";

const evolutions = {
  id: "applied.middle.evolutions",
  level: "middle", domain: "applied",
  title: "Traduire les évolutions",
  tagline: "×0,72 avoue −28 % — et le graphique de proportionnalité cache un Thalès.",
  prereqs: ["applied.middle.coefficient-multiplicateur"],
  intuition:
    "La 4e traduisait les % en coefficients ; la 3e lit **dans l'autre sens** : un prix multiplié par $1{,}15$ a augmenté de **15 %** ($1{,}15 = 1 + 0{,}15$) ; multiplié par $0{,}72$, il a baissé de **28 %** ($0{,}72 = 1 - 0{,}28$).\n\nLe coefficient avoue toujours : son écart à 1 **est** la variation.",
  depths: {
    discovery:
      "**Avec les mains** : un loyer passe de 800 € à 920 € — coefficient $\\dfrac{920}{800} = 1{,}15$ : hausse de **15 %**. La recette : diviser l'arrivée par le départ, lire l'écart à 1 — toute évolution se mesure ainsi, sans formule à retenir.",
    standard:
      "**En image** : **annuler** une évolution — après $+25\\,\\%$ ($\\times 1{,}25$), revenir au départ exige de **diviser** par $1{,}25$, soit multiplier par $\\dfrac{1}{1{,}25} = 0{,}8$ : une baisse de **20 %**, pas de 25 ! Les évolutions réciproques ne sont jamais symétriques ($+50\\,\\%$ s'annule par $-33{,}3\\,\\%$) — l'inverse du coefficient, pas l'opposé du pourcentage.",
    advanced:
      "**Dans la tête** : le graphique de proportionnalité rejoint la géométrie — tes points alignés avec l'origine forment des **triangles emboîtés** : l'origine en sommet, l'axe horizontal et les verticales des points en côtés ; Thalès y lit l'égalité des rapports $\\dfrac{y_1}{x_1} = \\dfrac{y_2}{x_2}$ — c'est **le coefficient**, constant parce que les triangles sont emboîtés dans des parallèles. La proportionnalité de 5e, le Thalès de 3e : la même vérité, vue par l'arithmétique puis par la géométrie — et la fonction linéaire s'apprête à lui donner son troisième nom.",
  },
  keyIdea: "Coefficient $= \\dfrac{\\text{arrivée}}{\\text{départ}}$ — l'écart à 1 **est** le pourcentage ($\\times 0{,}72 \\Leftrightarrow -28\\,\\%$). Annuler : **diviser** par le coefficient (jamais l'opposé du %). Le graphique linéaire est un Thalès déguisé.",
  why:
    "Pourquoi savoir lire un coefficient à l'envers ? Parce que le monde annonce ses variations en coefficients muets : « les prix ont été multipliés par 1,8 en vingt ans », « l'audience a fait ×0,6 » — celui qui traduit (+80 %, −40 %) compare, celui qui ne traduit pas subit. Et la dissymétrie des réciproques (+25 % / −20 %) est le piège favori des soldes et des salaires : la lecture des coefficients est une compétence de citoyen.",
  examples: [
    { title: "Le coefficient avoue", steps: [
      { p: "Loyer : 800 € → 920 € — coefficient $\\dfrac{920}{800} = 1{,}15$." },
      { p: "Écart à 1 : $+0{,}15$ — une hausse de **15 %** : la variation se lit dans le nombre." },
    ] },
    { title: "Annuler +25 %", steps: [
      { p: "$\\times 1{,}25$ se défait en divisant : $\\dfrac{1}{1{,}25} = 0{,}8$." },
      { p: "Soit $-20\\,\\%$ — l'inverse du coefficient, jamais l'opposé du pourcentage." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Traduis en pourcentage d'évolution : $\\times 1{,}15$ ; $\\times 0{,}72$ ; $\\times 2$ ; $\\times 1$.", solution: "$+15\\,\\%$ ; $-28\\,\\%$ ; $+100\\,\\%$ (doubler !) ; $0\\,\\%$ (rien ne bouge) — l'écart à 1 est la variation, dans les deux sens." },
    { tier: "warmup", prompt: "Un loyer passe de 800 € à 920 €. Quel est le pourcentage d'augmentation ?", solution: "Coefficient $= \\dfrac{920}{800} = 1{,}15$ → **+15 %** — diviser l'arrivée par le départ, lire l'écart à 1." },
    { tier: "application", prompt: "Après une hausse de 25 %, quel pourcentage de baisse ramène au prix initial ?", solution: "Annuler $\\times 1{,}25$ : multiplier par $\\dfrac{1}{1{,}25} = 0{,}8$, soit **−20 %** — les réciproques ne sont pas symétriques : l'inverse du coefficient, pas l'opposé du pourcentage." },
    { tier: "challenge", prompt: "Une action perd 50 % puis regagne 50 %. Bilan ? Et que faudrait-il regagner pour revenir au départ ?", solution: "$0{,}5 \\times 1{,}5 = 0{,}75$ : bilan **−25 %**. Pour annuler $\\times 0{,}5$, il faut $\\times 2$ : regagner **+100 %** — perdre la moitié exige de doubler : la dissymétrie des évolutions, en version brutale." },
    { tier: "exam", prompt: "Sur le graphique d'une situation de proportionnalité, prends deux points $(x_1\\,;\\,y_1)$ et $(x_2\\,;\\,y_2)$ et l'origine. Explique, avec le théorème de Thalès, pourquoi $\\dfrac{y_1}{x_1} = \\dfrac{y_2}{x_2}$.", solution: "Les verticales des deux points sont **parallèles** entre elles ; avec l'axe horizontal et la droite des points (qui passe par l'origine), elles dessinent des **triangles emboîtés** de sommet O. Thalès donne $\\dfrac{y_1}{y_2} = \\dfrac{x_1}{x_2}$, soit $\\dfrac{y_1}{x_1} = \\dfrac{y_2}{x_2}$ : le **coefficient** constant — la proportionnalité de 5e, le graphique alignés-avec-l'origine, et Thalès sont trois visages d'une même vérité." },
  ],
  practice: [
    { tier: "warmup", label: "Lire le coefficient", make: (r) => {
      const t = pick(r, [5, 12, 15, 20, 28, 35, 40]); const up = r() < 0.5;
      const c = up ? 1 + t / 100 : 1 - t / 100;
      return { prompt: `$\\times ${String(c).replace(".", ",")}$ : quelle évolution en % ? (positif pour une hausse, négatif pour une baisse)`, answer: up ? t : -t, solution: `Écart à 1 : ${up ? "+" : "−"}$0{,}${t < 10 ? "0" + t : t}$ → **${up ? "+" : "−"}${t} %**.` };
    } },
    { tier: "application", label: "Le coefficient mesuré", make: (r) => {
      const dep = pick(r, [200, 400, 500, 800]); const t = pick(r, [10, 15, 20, 25, 30]); const up = r() < 0.6;
      const arr = Math.round(dep * (up ? 1 + t / 100 : 1 - t / 100));
      return { prompt: `Un prix passe de ${dep} € à ${arr} € : quelle évolution en % ? (négatif si baisse)`, answer: up ? t : -t, solution: `$\\dfrac{${arr}}{${dep}} = ${String(arr / dep).replace(".", ",")}$ → **${up ? "+" : "−"}${t} %**.` };
    } },
    { tier: "challenge", label: "Annuler l'évolution", make: (r) => {
      const couples = [[25, 20], [100, 50], [50, 100]];
      const c = pick(r, couples); const sens = r() < 0.5;
      if (sens) return { prompt: `Quelle baisse en % annule une hausse de ${c[0]} % ? (réponds positif)`, answer: c[1] === 100 ? 50 : c[1], solution: `Annuler $\\times ${String(1 + c[0] / 100).replace(".", ",")}$ : diviser — soit $\\times ${String(Math.round(10000 / (100 + c[0])) / 100).replace(".", ",")}$ : **−${c[1] === 100 ? 50 : c[1]} %**.` };
      return { prompt: `Quelle hausse en % annule une baisse de ${c[1] === 100 ? 50 : c[1]} % ? (réponds positif)`, answer: c[1] === 100 ? 100 : c[0], solution: `Annuler $\\times ${String(1 - (c[1] === 100 ? 50 : c[1]) / 100).replace(".", ",")}$ : diviser — **+${c[1] === 100 ? 100 : c[0]} %** : la dissymétrie des réciproques.` };
    } },
  ],
};

export default [evolutions];
