// Field "Applied mathematics" — MIDDLE module (4e year): ratios and percentage
// coefficients. Official cycle-4 programme: using quotient quantities (with or
// without units), comparing two numbers or quantities by their RATIO, expressing
// proportionality as equal ratios or in a:b ratio form, determining a FOURTH
// PROPORTIONAL, solving proportional SHARING problems; computing with
// percentages, accounting for a percentage increase or decrease through a
// MULTIPLIER COEFFICIENT, and defining that coefficient.
import { randint, pick } from "../../core/exercises.js";

// — Ratios and the fourth proportional (programme: rapports, ratio, partage) —
const ratio = {
  id: "applied.middle.ratio",
  level: "middle", domain: "applied",
  title: "Ratios et quatrième proportionnelle",
  tagline: "2:3 — partager, comparer, compléter : le rapport mène le jeu.",
  prereqs: ["applied.middle.coefficient"],
  intuition:
    "Comparer par soustraction dit l'écart ; comparer par **division** dit le **rapport** : 12 et 8 ont pour rapport $\\frac{12}{8} = 1{,}5$ — « une fois et demie ».\n\nLa notation **ratio** l'écrit en proportions entières : « 12 et 8 sont dans le ratio **3:2** » — trois parts contre deux, la recette du mélange.",
  depths: {
    discovery:
      "**Avec les mains** : un sirop au ratio 1:4 (un volume de sirop, quatre d'eau) — 5 parts en tout : dans 1 litre, $\\frac{1}{5}$ de sirop (20 cL) et $\\frac{4}{5}$ d'eau. Le ratio découpe le tout en **parts**, et les fractions de 6e prennent le relais.",
    standard:
      "**En image** : le **partage proportionnel** — partager 120 € entre Léa et Tom au ratio 2:3 : $2 + 3 = 5$ parts, une part $= 120 \\div 5 = 24$ € : Léa **48 €**, Tom **72 €** (contrôle : $48 + 72 = 120$ ✓). Et la **quatrième proportionnelle** complète les tableaux : $\\frac{3}{5} = \\frac{x}{35}$ — les rapports égaux donnent $x = \\frac{3 \\times 35}{5} = 21$ : trois nombres connus, le quatrième se déduit.",
    advanced:
      "**Dans la tête** : les **grandeurs quotients** sont des rapports qui ont gardé leurs unités — km/**h**, €/**kg**, habitants/**km²** : diviser deux grandeurs en crée une troisième, et l'unité composée raconte le calcul (90 km **par** h). Certains rapports n'ont pas d'unité (une échelle 1:100 000, une pente) : la grandeur s'est simplifiée avec elle-même. Lire l'unité d'un quotient, c'est déjà savoir quoi diviser par quoi — la moitié de la physique tient dans cette lecture.",
  },
  keyIdea: "Ratio a:b $=$ a parts contre b — **a + b parts** en tout pour partager. Quatrième proportionnelle : rapports égaux, $\\frac{a}{b} = \\frac{c}{d}$, le manquant se déduit des trois autres.",
  why:
    "Pourquoi les ratios, quand le coefficient de 5e suffisait ? Parce qu'ils comparent **sans unité ni référence** : la recette 1:4 vaut pour un verre ou une citerne, le plan 1:200 pour toute mesure, le ratio élèves:professeur pour tout collège. Le coefficient relie deux grandeurs ; le ratio capture une **structure** — c'est lui que la 3e retrouvera dans Thalès et la trigonométrie.",
  examples: [
    { title: "Le partage 2:3", steps: [
      { p: "120 € au ratio 2:3 : $2 + 3 = 5$ parts, une part $= 24$ €." },
      { p: "Léa $2 \\times 24 = $ **48 €**, Tom $3 \\times 24 = $ **72 €** — contrôle : 120 ✓." },
    ] },
    { title: "La quatrième proportionnelle", steps: [
      { p: "$\\dfrac{3}{5} = \\dfrac{x}{35}$ : les rapports sont égaux, et $35 = 5 \\times 7$." },
      { p: "$x = 3 \\times 7 = $ **21** — trois connus, le quatrième se déduit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un sirop se prépare au ratio 1:4 (sirop:eau). Que signifie ce ratio, et quelle fraction du mélange est du sirop ?", solution: "**1 part de sirop pour 4 parts d'eau** — 5 parts en tout : le sirop est $\\frac{1}{5}$ du mélange (20 %), quelle que soit la quantité préparée." },
    { tier: "warmup", prompt: "Partage 120 € entre deux personnes au ratio 2:3.", solution: "$5$ parts de $120 \\div 5 = 24$ € : **48 €** et **72 €** — et $48 + 72 = 120$ ✓ : le contrôle est dans le total." },
    { tier: "application", prompt: "Complète : $\\frac{3}{5} = \\frac{x}{35}$. Quelle méthode emploies-tu ?", solution: "$35 = 5 \\times 7$, donc $x = 3 \\times 7 = $ **21** — l'égalité des rapports (la quatrième proportionnelle) : même coefficient d'une fraction à l'autre." },
    { tier: "challenge", prompt: "Une carte à l'échelle 1:100 000 : 4,5 cm sur la carte représentent quelle distance réelle ? Pourquoi ce ratio n'a-t-il pas d'unité ?", solution: "$4{,}5 \\times 100\\,000 = 450\\,000$ cm $= $ **4,5 km**. Le ratio compare deux **longueurs** : l'unité s'est simplifiée avec elle-même — 1 cm pour 100 000 cm, 1 pouce pour 100 000 pouces : la même carte." },
    { tier: "exam", prompt: "Trois associés partagent 8 400 € de bénéfice au ratio 2:3:7. Calcule les parts et vérifie. En quoi est-ce plus juste qu'un partage égal s'ils ont investi 2 000, 3 000 et 7 000 € ?", solution: "$2 + 3 + 7 = 12$ parts de $8\\,400 \\div 12 = 700$ € : **1 400 €, 2 100 €, 4 900 €** ($+ = 8\\,400$ ✓). Le ratio 2:3:7 **reproduit la structure des investissements** : chacun touche proportionnellement à sa mise — le partage proportionnel encode l'équité que l'égalité ignorerait." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les parts", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 2, 6); const part = pick(r, [12, 15, 20, 24]);
      return { prompt: `Partage ${(a + b) * part} € au ratio ${a}:${b} : quelle est la plus petite part ?`, answer: Math.min(a, b) * part, solution: `$${a + b}$ parts de $${part}$ € → la plus petite : $${Math.min(a, b)} \\times ${part} = $ **${Math.min(a, b) * part} €**.` };
    } },
    { tier: "application", label: "La quatrième proportionnelle", make: (r) => {
      const a = randint(r, 2, 7); const b = randint(r, 2, 9); const k = randint(r, 2, 7);
      return { prompt: `Complète : $\\frac{${a}}{${b}} = \\frac{?}{${b * k}}$.`, answer: a * k, solution: `$${b * k} = ${b} \\times ${k}$ → $? = ${a} \\times ${k} = $ **${a * k}** — même coefficient en haut et en bas.` };
    } },
  ],
};

// — The multiplier coefficient (programme: augmentation/diminution en %) —
const coefficientMultiplicateur = {
  id: "applied.middle.coefficient-multiplicateur",
  level: "middle", domain: "applied",
  title: "Le coefficient multiplicateur",
  tagline: "+20 %, c'est ×1,2 — et +20 % puis −20 % ne ramène pas au départ.",
  prereqs: ["applied.middle.ratio"],
  intuition:
    "Augmenter de 20 %, c'est garder 100 % **et** ajouter 20 % : on détient $120\\,\\%$ du prix — soit une multiplication par $\\dfrac{120}{100} = 1{,}2$. C'est le **coefficient multiplicateur**.\n\nDiminuer de 15 % ? Il reste $85\\,\\%$ : coefficient $0{,}85$. Toute variation en pourcentage **est** une multiplication.",
  depths: {
    discovery:
      "**Avec les mains** : un jean à 40 € augmente de 20 % — méthode lente : $20\\,\\%$ de 40 $= 8$, puis $40 + 8 = 48$ ; méthode coefficient : $40 \\times 1{,}2 = 48$. Une seule opération, et la calculatrice dit merci.",
    standard:
      "**En image** : le sens inverse — un manteau soldé à $-30\\,\\%$ coûte 56 € : prix initial $= 56 \\div 0{,}7 = 80$ € (remonter une multiplication, c'est **diviser** : ton équation $0{,}7x = 56$ !). Et le coefficient se lit à rebours : $\\times 1{,}06$ cache $+6\\,\\%$, $\\times 0{,}45$ cache $-55\\,\\%$ — le nombre avoue la variation.",
    advanced:
      "**Dans la tête** : les variations **s'enchaînent en se multipliant** — $+20\\,\\%$ puis $-20\\,\\%$ : $\\times 1{,}2 \\times 0{,}8 = \\times 0{,}96$, soit $-4\\,\\%$ : on ne revient **pas** au départ ! (le $-20\\,\\%$ s'applique au prix gonflé, pas à l'original). Les pourcentages ne s'additionnent jamais entre étapes : $+50\\,\\%$ puis $+50\\,\\%$ font $\\times 2{,}25$, pas $+100\\,\\%$. Le coefficient multiplicateur est le seul langage où les variations se composent honnêtement — celui des prix, des populations et, en 3e, des intérêts.",
  },
  keyIdea: "$+t\\,\\% \\Leftrightarrow \\times \\left(1 + \\frac{t}{100}\\right)$ ; $-t\\,\\% \\Leftrightarrow \\times \\left(1 - \\frac{t}{100}\\right)$. Remonter : **diviser**. Enchaîner : **multiplier les coefficients** — jamais additionner les %.",
  why:
    "Pourquoi traduire les pourcentages en multiplications ? Parce que l'addition ment dès qu'on enchaîne : le commerçant qui solde de 20 % après avoir augmenté de 20 % vend **moins cher** qu'au départ, et celui qui l'ignore perd de l'argent. Le coefficient rend les variations composables, inversibles, comparables — c'est l'outil de tous les métiers du prix, et le garde-fou de tous les clients.",
  examples: [
    { title: "Le jean augmenté", steps: [
      { p: "$+20\\,\\%$ : il reste $100 + 20 = 120\\,\\%$ → coefficient $1{,}2$." },
      { p: "$40 \\times 1{,}2 = $ **48 €** — une multiplication remplace deux calculs." },
    ] },
    { title: "Le manteau remonté", steps: [
      { p: "$-30\\,\\%$ : coefficient $0{,}7$ ; prix soldé 56 €." },
      { p: "Initial $= 56 \\div 0{,}7 = $ **80 €** — remonter une multiplication : diviser." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi « augmenter de 20 % » revient-il à multiplier par 1,2 ?", solution: "On garde les $100\\,\\%$ et on ajoute $20\\,\\%$ : on détient $120\\,\\% = \\frac{120}{100} = $ **1,2** fois le prix — la variation et l'original fusionnent en un seul facteur." },
    { tier: "warmup", prompt: "Donne le coefficient multiplicateur de : $+20\\,\\%$ ; $-15\\,\\%$ ; $+6\\,\\%$ ; $-55\\,\\%$.", solution: "**1,2** ; **0,85** ; **1,06** ; **0,45** — au-dessus de 1 : hausse ; en dessous : baisse ; l'écart à 1 dit le pourcentage." },
    { tier: "application", prompt: "Un manteau soldé de 30 % coûte 56 €. Quel était son prix initial ?", solution: "$0{,}7 \\times x = 56$ → $x = 56 \\div 0{,}7 = $ **80 €** — le problème inverse : on divise par le coefficient." },
    { tier: "challenge", prompt: "Un prix subit $+20\\,\\%$ puis $-20\\,\\%$. Revient-il au départ ? Calcule le coefficient global.", solution: "$1{,}2 \\times 0{,}8 = $ **0,96** : il finit à $-4\\,\\%$ du départ — le $-20\\,\\%$ ronge le prix **gonflé** : les pourcentages successifs se multiplient, ils ne s'annulent pas." },
    { tier: "exam", prompt: "Une population augmente de 50 % puis encore de 50 %. Un élève affirme : « +100 % au total, elle a doublé. » Corrige-le avec les coefficients, et donne la vraie variation.", solution: "$1{,}5 \\times 1{,}5 = $ **2,25** : la population a été multipliée par 2,25, soit $+125\\,\\%$ — pas $+100\\,\\%$. La seconde hausse s'applique à la population **déjà augmentée** : les coefficients se multiplient ($\\times 2{,}25$), les pourcentages ne s'additionnent qu'en apparence — l'écart (les 25 % manquants de l'élève) est l'intérêt composé en germe." },
  ],
  practice: [
    { tier: "warmup", label: "Traduire en coefficient", make: (r) => {
      const t = pick(r, [5, 10, 15, 20, 25, 30, 40, 50]); const up = r() < 0.5;
      return { prompt: `Coefficient multiplicateur de ${up ? "+" : "−"}${t} % ? (réponds en décimal)`, answer: up ? 1 + t / 100 : 1 - t / 100, solution: `$${up ? "1 + " : "1 - "}\\frac{${t}}{100} = $ **${String(up ? 1 + t / 100 : 1 - t / 100).replace(".", ",")}**.` };
    } },
    { tier: "application", label: "Le prix remonté", make: (r) => {
      const t = pick(r, [10, 20, 25, 30, 50]); const x = pick(r, [40, 60, 80, 120, 200]);
      const solde = x * (1 - t / 100);
      return { prompt: `Soldé de ${t} %, un article coûte ${String(solde).replace(".", ",")} €. Prix initial ?`, answer: x, solution: `$${String(solde).replace(".", ",")} \\div ${String(1 - t / 100).replace(".", ",")} = $ **${x} €** — diviser par le coefficient.` };
    } },
    { tier: "challenge", label: "Enchaîner les coefficients", make: (r) => {
      const t = pick(r, [10, 20, 25, 50]);
      return { prompt: `$+${t}$ % puis $−${t}$ % : coefficient global ? (en décimal)`, answer: Math.round((1 + t / 100) * (1 - t / 100) * 10000) / 10000, solution: `$${String(1 + t / 100).replace(".", ",")} \\times ${String(1 - t / 100).replace(".", ",")} = $ **${String(Math.round((1 + t / 100) * (1 - t / 100) * 10000) / 10000).replace(".", ",")}** — sous 1 : on a perdu au change.` };
    } },
  ],
};

export default [ratio, coefficientMultiplicateur];
