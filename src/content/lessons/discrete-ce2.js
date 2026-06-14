// Field "Discrete" — PRIMARY module (CE2 year): quantitative discrete characters, adapted
// scales, completing tables with holes and partially-drawn bar charts. Official programme.
import { randint, pick } from "../../core/exercises.js";

// — Tables with holes, adapted scales (programme: caractères quantitatifs, échelle adaptée, Poséidon) —
const dataGaps = {
  id: "discrete.primary.data-gaps",
  level: "primary", domain: "discrete",
  title: "Tableaux à trous, échelles adaptées",
  tagline: "Reconstruire l'information manquante — les données deviennent des problèmes.",
  prereqs: ["discrete.primary.charts-tables"],
  intuition:
    "Nouveauté double. D'abord, on n'enquête plus seulement sur des couleurs ou des transports : les caractères peuvent être des **nombres** — l'âge, le nombre de frères et sœurs.\n\nEnsuite, les tableaux et diagrammes arrivent **incomplets** : des cases vides, une barre manquante. À toi de reconstruire — chaque ligne, chaque colonne est un problème parties-tout qui s'ignore.",
  depths: {
    discovery:
      "**Avec les mains** : j'enquête sur un caractère **quantitatif** — « combien de frères et sœurs as-tu ? » — et les valeurs possibles sont des nombres : 0, 1, 2, 3… Le tableau les compte, le diagramme les dresse.",
    standard:
      "**En image** : quand les effectifs grimpent, l'axe gradué de 1 en 1 ne suffit plus — je choisis une **échelle adaptée** : de 10 en 10, de 20 en 20. Une barre qui s'arrête entre 50 et 60 se lit avec l'échelle, pas en comptant des cases.",
    advanced:
      "**Dans la tête** : le tableau à trous se résout case par case — ligne « à pied » : 77 filles, total 142 → $142 - 77 = 65$ garçons. Colonne « filles » : total 148, déjà $77 + 29 + 24 = 130$ placées → la case « en bus » vaut **18**. Et le diagramme de l'école Poséidon : 175 élèves, trois barres connues ($78 + 13 + 32 = 123$) → la quatrième mesure $175 - 123 = $ **52**. Les marges et les touts font tout retrouver.",
  },
  keyIdea: "Case manquante = **le tout moins les parties connues** — en ligne, en colonne, ou sur le diagramme entier.",
  why:
    "Pourquoi peut-on retrouver une case effacée ? Parce qu'un tableau à totaux est **redondant** : la même information y est écrite plusieurs fois (par les cases, par les marges). Cette redondance, qui semble du luxe, est une assurance — elle permet de vérifier… et de reconstruire.",
  examples: [
    { title: "La case effacée", steps: [
      { p: "Ligne « en vélo » : ? filles, 18 garçons, total 47." },
      { p: "$47 - 18 = $ **29 filles** — le tout moins la partie connue." },
    ] },
    { title: "La barre manquante de Poséidon", steps: [
      { p: "175 élèves en tout ; les barres connues : $78 + 13 + 32 = 123$." },
      { p: "Deltaville : $175 - 123 = $ **52** — je dessine la barre à 52, en lisant l'échelle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "« Le nombre de frères et sœurs » : en quoi ce caractère diffère-t-il de « la couleur préférée » ?", solution: "C'est un caractère **quantitatif** : ses valeurs sont des **nombres** (0, 1, 2…) — la couleur, elle, est **qualitative**." },
    { tier: "warmup", prompt: "Pourquoi graduer l'axe de 10 en 10 plutôt que de 1 en 1 quand les effectifs atteignent 80 ?", solution: "Pour garder le diagramme **lisible** : l'échelle s'adapte aux données — 80 graduations de 1 seraient illisibles." },
    { tier: "application", prompt: "Ligne « à pied » : 77 filles, total 142. Combien de garçons ?", solution: "$142 - 77 = $ **65 garçons** — la marge se renverse en soustraction." },
    { tier: "challenge", prompt: "Colonne « filles » : total 148, et trois cases connues : 77, 29 et 24. Que vaut la quatrième ?", solution: "$77 + 29 + 24 = 130$, puis $148 - 130 = $ **18** — le tout moins les trois parties connues." },
    { tier: "exam", prompt: "L'école Poséidon compte 175 élèves répartis sur quatre villes. Les barres connues : 78, 13 et 32. Quelle hauteur pour la quatrième barre, et comment la dessiner ?", solution: "$78 + 13 + 32 = 123$ ; $175 - 123 = $ **52**. Je dessine la barre jusqu'à 52 **en lisant l'échelle de l'axe** — entre les graduations 40 et 60, un peu au-dessus de la moitié." },
  ],
  practice: [
    { tier: "application", label: "Reconstruire la case", make: (r) => {
      if (r() < 0.5) {
        const t = pick(r, ["à pied", "en vélo", "en bus"]); const f = randint(r, 15, 80), g = randint(r, 15, 80);
        return { prompt: `Ligne « ${t} » : ${f} filles, total ${f + g}. Combien de garçons ?`, answer: g, solution: `$${f + g} - ${f} = $ **${g}** — le tout moins la partie connue.` };
      }
      const T = randint(r, 130, 200); const a = randint(r, 30, 70), b = randint(r, 10, 30), c = randint(r, 20, 50);
      return { prompt: `Une école compte ${T} élèves répartis sur quatre villes. Trois barres du diagramme : ${a}, ${b} et ${c}. Hauteur de la quatrième ?`, answer: T - a - b - c, solution: `$${a} + ${b} + ${c} = ${a + b + c}$, puis $${T} - ${a + b + c} = $ **${T - a - b - c}**.` };
    } },
  ],
};

export default [dataGaps];
