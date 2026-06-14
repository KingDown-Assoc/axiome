// Field "Applied mathematics" — HIGH module (seconde year): rates and chained
// evolutions. Official seconde programme (2019), "Information chiffrée":
// absolute variation V2 − V1, multiplier coefficient V2/V1, RELATIVE variation
// (V2 − V1)/V1 (the evolution rate); SUCCESSIVE evolutions (the global
// coefficient is the PRODUCT of the coefficients) and RECIPROCAL evolution (the
// inverse coefficient); percentage of percentage for nested reference sets.
import { randint, pick } from "../../core/exercises.js";

const evolutionsSuccessives = {
  id: "applied.high.evolutions-successives",
  level: "high", domain: "applied",
  title: "Taux d'évolution et évolutions successives",
  tagline: "Trois langages pour une variation — et les coefficients qui se multiplient.",
  prereqs: ["applied.middle.evolutions"],
  intuition:
    "Un prix passe de 80 € à 92 € : la **variation absolue** dit $+12$ € ; le **coefficient multiplicateur** dit $\\times \\frac{92}{80} = 1{,}15$ ; le **taux d'évolution** dit $\\dfrac{92 - 80}{80} = 0{,}15 = +15\\,\\%$.\n\nTrois langages, une seule réalité — et la formule pivot : $\\text{CM} = 1 + t$.",
  depths: {
    discovery:
      "**Avec les mains** : traduire dans les trois sens — $t = \\dfrac{V_2 - V_1}{V_1}$ (l'écart **rapporté au départ** : c'est lui qui rend les évolutions comparables : $+12$ € sur 80 € pèse plus que sur 800 €) ; et chaque langage se convertit : $t = +15\\,\\% \\Leftrightarrow \\text{CM} = 1{,}15$, $t = -28\\,\\% \\Leftrightarrow \\text{CM} = 0{,}72$ — ta lecture de 3e, désormais armée d'une formule.",
    standard:
      "**En image** : les évolutions **successives** — $+20\\,\\%$ puis $+30\\,\\%$ : les coefficients se multiplient, $1{,}2 \\times 1{,}3 = 1{,}56$, soit $+56\\,\\%$ (et non $50$ !) ; les **taux ne s'additionnent jamais**, le second travaille sur la valeur déjà gonflée. Et le **pourcentage de pourcentage** suit la même pente : $30\\,\\%$ des élèves sont internes, $40\\,\\%$ des internes sont des filles — les filles internes font $0{,}4 \\times 0{,}3 = 0{,}12 = 12\\,\\%$ du total : les proportions emboîtées se multiplient aussi.",
    advanced:
      "**Dans la tête** : l'évolution **réciproque** — annuler $\\times 1{,}25$ exige $\\times \\dfrac{1}{1{,}25} = 0{,}8$ : l'**inverse** du coefficient, jamais l'opposé du taux ($+25\\,\\%$ s'annule par $-20\\,\\%$) ; et la dissymétrie devient spectaculaire aux extrêmes : $-50\\,\\%$ s'annule par $+100\\,\\%$, $-90\\,\\%$ par $+900\\,\\%$ — une action qui perd 90 % doit **décupler** pour revenir. Le krach et la reprise ne parlent pas la même langue des pourcentages : seul le coefficient dit la vérité, et son inverse dit le chemin du retour.",
  },
  keyIdea: "$t = \\dfrac{V_2 - V_1}{V_1}$, $\\text{CM} = 1 + t$ — trois langages interchangeables. **Successives** : les CM se **multiplient** (jamais les taux ne s'additionnent) ; **réciproque** : l'**inverse** du CM ; proportions emboîtées : produit aussi.",
  why:
    "Pourquoi trois langages pour dire « ça a augmenté » ? Parce que chacun répond à une question différente : l'absolu dit **combien** (le portefeuille), le taux dit **combien relativement** (la comparaison juste), le coefficient dit **comment enchaîner** (le calcul). L'économie, la démographie, l'épidémiologie jonglent en permanence entre les trois — et celui qui ne convertit pas se fait raconter n'importe quoi : $+56\\,\\%$ vendu comme $+50$, la moitié perdue « presque rattrapée » par $+50\\,\\%$… La conversion est une légitime défense.",
  examples: [
    { title: "Les trois langages", steps: [
      { p: "80 € → 92 € : absolu $+12$ € ; coefficient $\\frac{92}{80} = 1{,}15$ ; taux $\\frac{12}{80} = +15\\,\\%$." },
      { p: "$\\text{CM} = 1 + t$ — le pivot entre les trois écritures." },
    ] },
    { title: "Enchaîner sans s'additionner", steps: [
      { p: "$+20\\,\\%$ puis $+30\\,\\%$ : $1{,}2 \\times 1{,}3 = 1{,}56$." },
      { p: "Bilan : $+56\\,\\%$ — les six points d'écart avec 50 sont l'intérêt composé en germe." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un loyer passe de 80 € à 92 € : donne la variation absolue, le coefficient multiplicateur et le taux d'évolution.", solution: "Absolue : $+12$ € ; CM : $\\frac{92}{80} = 1{,}15$ ; taux : $\\frac{92 - 80}{80} = $ **+15 %** — trois langages, une variation, et $\\text{CM} = 1 + t$ les relie." },
    { tier: "warmup", prompt: "Traduis : $t = +35\\,\\%$ en CM ; $\\text{CM} = 0{,}64$ en taux ; une baisse de 7 % en CM.", solution: "$1{,}35$ ; $-36\\,\\%$ ($0{,}64 = 1 - 0{,}36$) ; $0{,}93$ — l'écart à 1 est le taux, dans les deux sens." },
    { tier: "application", prompt: "Un article subit $+20\\,\\%$ puis $+30\\,\\%$. Quel est le taux d'évolution global ? Pourquoi pas $+50\\,\\%$ ?", solution: "$1{,}2 \\times 1{,}3 = 1{,}56$ : **+56 %** — le second taux s'applique au prix **déjà augmenté** : les coefficients se multiplient, les taux ne s'additionnent pas (les 6 % d'écart sont le 30 % du premier 20 %)." },
    { tier: "challenge", prompt: "Dans un lycée, $30\\,\\%$ des élèves sont internes et $40\\,\\%$ des internes sont des filles. Quel pourcentage du lycée les filles internes représentent-elles ?", solution: "$0{,}4 \\times 0{,}3 = 0{,}12$ : **12 %** du lycée — un pourcentage **de** pourcentage se multiplie : 40 % d'une sous-population de 30 %, pas 40 % du total (le piège des médias)." },
    { tier: "exam", prompt: "Une action perd 50 % puis « rattrape » en gagnant 50 %. Calcule le bilan, puis détermine le taux exact qui annulerait la perte de 50 %, et celui qui annulerait une perte de 90 %. Conclus sur la dissymétrie des évolutions réciproques.", solution: "$0{,}5 \\times 1{,}5 = 0{,}75$ : bilan **−25 %** — le rattrapage est un mirage. Annuler $\\times 0{,}5$ : $\\times \\frac{1}{0{,}5} = 2$, soit **+100 %** ; annuler $\\times 0{,}1$ : $\\times 10$, soit **+900 %**. La réciproque est l'**inverse** du coefficient, jamais l'opposé du taux — et plus la chute est profonde, plus la remontée exigée explose : perdre 90 % demande de décupler. C'est l'arithmétique cruelle des krachs, et la raison d'être du coefficient multiplicateur." },
  ],
  practice: [
    { tier: "warmup", label: "Le taux mesuré", make: (r) => {
      const v1 = pick(r, [40, 50, 80, 200, 400]); const t = pick(r, [-30, -25, -10, 5, 15, 20, 25, 50]);
      const v2 = Math.round(v1 * (1 + t / 100));
      return { prompt: `De ${v1} € à ${v2} € : quel taux d'évolution en % ? (négatif si baisse)`, answer: t, solution: `$\\dfrac{${v2} - ${v1}}{${v1}} = ${String(t / 100).replace(".", ",")}$ → **${t > 0 ? "+" : "−"}${Math.abs(t)} %**.` };
    } },
    { tier: "application", label: "Enchaîner les coefficients", make: (r) => {
      const t1 = pick(r, [10, 20, 25, 50]); const t2 = pick(r, [10, 20, 30, -20, -10]);
      const g = Math.round((1 + t1 / 100) * (1 + t2 / 100) * 100) - 100;
      return { prompt: `$${t1 > 0 ? "+" : ""}${t1}$ % puis $${t2 > 0 ? "+" : "−"}${Math.abs(t2)}$ % : quel taux global en % ?`, answer: g, solution: `$${String(1 + t1 / 100).replace(".", ",")} \\times ${String(1 + t2 / 100).replace(".", ",")} = ${String((100 + g) / 100).replace(".", ",")}$ → **${g > 0 ? "+" : "−"}${Math.abs(g)} %** — les CM se multiplient.` };
    } },
    { tier: "challenge", label: "La réciproque exacte", make: (r) => {
      const couples = [[25, 20], [50, "33,33"], [100, 50], [20, "16,67"]];
      const c = pick(r, [[25, 20, 0.8], [100, 50, 0.5], [60, 37.5, 0.625]]);
      return { prompt: `Quelle baisse en % annule exactement une hausse de ${c[0]} % ? (réponds positif${Number.isInteger(c[1]) ? "" : ", en décimal"})`, answer: c[1], solution: `Annuler $\\times ${String(1 + c[0] / 100).replace(".", ",")}$ : $\\times ${String(c[2]).replace(".", ",")}$ — soit **−${String(c[1]).replace(".", ",")} %** : l'inverse du coefficient, pas l'opposé du taux.` };
    } },
  ],
};

export default [evolutionsSuccessives];
