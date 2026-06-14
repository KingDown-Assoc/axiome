// Field "Analysis" — MIDDLE module (4e year): functions in embryo. Official
// cycle-4 programme (thème « Proportionnalité, fonctions »): applying a two-step
// (or multi-step) calculation programme to a simple number then to a VARIABLE,
// finding the starting number by WALKING A PROGRAMME BACKWARDS, producing a
// literal formula representing the dependence of one quantity on another, and
// REPRESENTING that dependence by a graph — the expression "en fonction de" at
// work, opening the analysis domain at middle-school level.
import { randint, pick } from "../../core/exercises.js";

const fonctionDe = {
  id: "analysis.middle.fonction-de",
  level: "middle", domain: "analysis",
  title: "Une grandeur en fonction d'une autre",
  tagline: "Le programme de calcul devient formule, la formule devient courbe.",
  prereqs: ["applied.middle.coefficient", "algebra.middle.calcul-litteral"],
  intuition:
    "« Le prix dépend du poids », « la hauteur dépend du temps » — la 4e apprend à **écrire** ces dépendances : appliquer un programme de calcul à une **variable** ($x \\to 2x + 3$), c'est produire une **formule** qui dit le prix **en fonction du** poids.\n\nEt la formule se **dessine** : chaque valeur de $x$ donne un point $(x\\,;\\,\\text{résultat})$ dans ton repère de 5e — la dépendance devient courbe.",
  depths: {
    discovery:
      "**Avec les mains** : le programme « choisis un nombre ; multiplie par 2 ; ajoute 3 » sur quelques entrées — $1 \\to 5$, $2 \\to 7$, $4 \\to 11$ ; puis sur la **variable** : $x \\to 2x + 3$ — la formule capture toutes les sorties d'un coup, c'est ton calcul littéral devenu machine.",
    standard:
      "**En image** : place les couples $(1\\,;\\,5)$, $(2\\,;\\,7)$, $(4\\,;\\,11)$ — alignés ! mais la droite **rate l'origine** ($0 \\to 3$) : ce n'est **pas** une proportionnalité (ton détecteur de 5e fonctionne) ; c'est une dépendance plus générale. Le graphique se lit dans les deux sens : $x$ donné → monter jusqu'à la courbe, lire la sortie ; sortie visée → redescendre vers le $x$.",
    advanced:
      "**Dans la tête** : **remonter** un programme — la machine $x \\to 2x + 3$ affiche 17 : quel départ ? Défais à l'envers : $-3$ puis $\\div 2$ : $x = 7$ — c'est ton équation $2x + 3 = 17$ vue comme une marche arrière, et chaque programme inversible a son programme miroir (les opérations inverses, dans l'ordre inverse). La 3e baptisera tout cela **fonction** et notera $f(x) = 2x + 3$ ; les notations $P(A)$, $p(t)$ s'installent déjà — tu fais de l'analyse sans le savoir, la branche des mathématiques qui étudie ce qui dépend de quoi.",
  },
  keyIdea: "Programme → **formule** ($x \\to 2x + 3$) → **graphique** (les points $(x\\,;\\,\\text{sortie})$). Remonter : opérations **inverses dans l'ordre inverse**. Proportionnalité $=$ le cas particulier qui passe par l'origine.",
  why:
    "Pourquoi dessiner une formule ? Parce que la courbe montre d'un regard ce que la formule cache : où ça monte, où ça plafonne, où deux offres se croisent (ton point de bascule des équations — c'est l'intersection de deux droites !). La science entière travaille ainsi : mesurer, tracer le nuage, chercher la formule qui l'épouse. La 4e te donne le va-et-vient ; le lycée ne fera que l'approfondir.",
  examples: [
    { title: "Du programme à la formule", steps: [
      { p: "« Multiplie par 2, ajoute 3 » : $1 \\to 5$, $2 \\to 7$, $4 \\to 11$." },
      { p: "Sur la variable : $x \\to 2x + 3$ — toutes les sorties en quatre symboles." },
    ] },
    { title: "Remonter la machine", steps: [
      { p: "Sortie 17 : défais à l'envers — $17 - 3 = 14$, puis $14 \\div 2 = 7$." },
      { p: "Départ : **7** — les opérations inverses, dans l'ordre inverse : l'équation en marche arrière." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Applique le programme « multiplie par 2, ajoute 3 » à 1, 2, 4, puis à la variable $x$.", solution: "$1 \\to 5$ ; $2 \\to 7$ ; $4 \\to 11$ ; et $x \\to 2x + 3$ — la lettre absorbe tous les cas d'un coup." },
    { tier: "warmup", prompt: "Un taxi : prise en charge 3 €, puis 2 € par km. Écris le prix en fonction du nombre $x$ de kilomètres.", solution: "Prix $= 2x + 3$ — la dépendance mise en formule : « en fonction de » se traduit par une expression de $x$." },
    { tier: "application", prompt: "Place (mentalement) les points du taxi pour $x = 0, 1, 2, 4$. Sont-ils alignés ? Est-ce une proportionnalité ?", solution: "$(0\\,;\\,3)$, $(1\\,;\\,5)$, $(2\\,;\\,7)$, $(4\\,;\\,11)$ : **alignés**, mais la droite passe par $(0\\,;\\,3)$, pas par l'origine — **pas** une proportionnalité (la prise en charge décale tout) : dépendance affine en germe." },
    { tier: "challenge", prompt: "La machine $x \\to 2x + 3$ affiche 17. Retrouve le départ en remontant le programme, puis vérifie avec l'équation.", solution: "À rebours : $17 - 3 = 14$, $14 \\div 2 = $ **7**. Équation : $2x + 3 = 17 \\Rightarrow x = 7$ ✓ — remonter un programme **est** résoudre une équation : deux langages, un geste." },
    { tier: "exam", prompt: "Deux taxis : A facture $2x + 3$ €, B facture $3x$ € (pas de prise en charge). Pour quelle distance paie-t-on pareil ? Réponds par le calcul, puis dis ce que cela représente sur le graphique.", solution: "$2x + 3 = 3x \\Rightarrow x = $ **3 km** (les deux valent 9 €). Sur le graphique, c'est **l'intersection des deux droites** — avant : B moins cher ; après : A. Le point de bascule de tes équations a un visage : croiser deux courbes, c'est résoudre une équation des yeux." },
  ],
  practice: [
    { tier: "warmup", label: "La machine avant", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 9); const x = randint(r, 2, 12);
      return { prompt: `Le programme $x \\to ${a}x + ${b}$ : sortie pour $x = ${x}$ ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b}**.` };
    } },
    { tier: "application", label: "La machine arrière", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 9); const x = randint(r, 2, 12);
      return { prompt: `Le programme $x \\to ${a}x + ${b}$ affiche ${a * x + b}. Quel était le départ ?`, answer: x, solution: `À rebours : $${a * x + b} - ${b} = ${a * x}$, puis $\\div ${a}$ : **${x}** — inverses, ordre inverse.` };
    } },
    { tier: "challenge", label: "Par l'origine ou pas ?", make: (r) => {
      const a = randint(r, 2, 5); const b = r() < 0.5 ? 0 : randint(r, 1, 8);
      return { prompt: `La formule $${b === 0 ? a + "x" : a + "x + " + b}$ : est-ce une proportionnalité ? (1 = oui, 0 = non)`, answer: b === 0 ? 1 : 0, solution: `Pour $x = 0$ : sortie ${b} — ${b === 0 ? "la droite passe par l'**origine** : proportionnalité (coefficient " + a + ")" : "décalée de " + b + " : **pas** une proportionnalité"}.` };
    } },
  ],
};

export default [fonctionDe];
