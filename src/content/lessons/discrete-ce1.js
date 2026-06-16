// Field "Discrete" — PRIMARY module (CE1 year): graduated-axis bar charts, double-entry tables
// with totals. Official cycle-2 programme, domain "Organisation et gestion de données".
import { randint, pick } from "../../core/exercises.js";

// — Graduated charts and tables with totals (programme: axe gradué de 1 en 1, totaux) —
const chartsTables = {
  id: "discrete.primary.charts-tables",
  level: "primary", domain: "discrete",
  title: "Diagrammes gradués et tableaux à totaux",
  tagline: "Lire un tableau de données, et exploiter les totaux en marge.",
  prereqs: ["discrete.primary.data-survey"],
  intuition:
    "L'enquête grandit : jusqu'à **cent** personnes interrogées ! Pour lire les barres sans compter les cases, le diagramme gagne un **axe vertical gradué** de un en un.\n\nEt le tableau à double entrée gagne ses **totaux** : une ligne et une colonne « Total » qui additionnent tout. Filles et garçons, à pied, en vélo, en voiture ou en bus : 282 élèves dans un seul tableau.",
  depths: {
    discovery:
      "**Avec les mains** : je mène l'enquête (moins de cent individus, deux à cinq valeurs possibles), je compile dans un tableau, je dresse le diagramme — et l'axe gradué remplace le comptage de cubes.",
    standard:
      "**En image** : je lis des diagrammes et des tableaux **que je n'ai pas construits** — c'est nouveau ! « Combien de garçons viennent en vélo ? » : ligne « en vélo », colonne « garçons », la case à l'intersection répond : **18**. La hauteur d'une barre se lit directement sur l'axe.",
    advanced:
      "**Dans la tête** : les **marges** racontent les touts — le total d'une ligne est la somme de ses cases. Du coup, elles se **recalculent** : ligne « en vélo », total 47, dont 29 filles → $47 - 29 = 18$ garçons, sans regarder la case ! Chaque ligne du tableau est un problème parties-tout déguisé — et le modèle en barres s'y cache.",
  },
  keyIdea: "L'intersection ligne-colonne répond aux questions croisées ; les **totaux** additionnent — et se recalculent par soustraction.",
  why:
    "Pourquoi ajouter des totaux alors que toutes les cases sont déjà là ? Parce que les questions les plus fréquentes portent sur les **touts** : « combien d'élèves en tout ? », « combien de filles ? ». Les marges répondent d'un coup d'œil — le tableau travaille à ta place.",
  examples: [
    { title: "Lire une case croisée", steps: [
      { p: "Question : « Combien de garçons viennent à l'école en vélo ? »" },
      { p: "Ligne « en vélo » ∩ colonne « garçons » → **18**." },
    ] },
    { title: "Recalculer une marge", steps: [
      { p: "Ligne « à pied » : 77 filles, 65 garçons." },
      { p: "Total de la ligne : $77 + 65 = $ **142** — la marge est la somme de ses cases." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "À quoi sert l'axe vertical gradué d'un diagramme en barres ?", solution: "À **lire la hauteur** d'une barre directement, sans compter les cases une à une." },
    { tier: "warmup", prompt: "Ligne « en vélo » : 29 filles et 18 garçons. Quel est le total de la ligne ?", solution: "$29 + 18 = $ **47** : la marge additionne les cases de sa ligne." },
    { tier: "application", prompt: "D'après le tableau des transports, combien de garçons viennent à l'école en vélo ?", solution: "Ligne « en vélo », colonne « garçons » : la case à l'**intersection** donne **18**." },
    { tier: "challenge", prompt: "Ligne « en bus » : total 45, dont 18 filles. Combien de garçons, sans regarder la case ?", solution: "$45 - 18 = $ **27** : le tout moins une partie donne l'autre — un parties-tout caché dans le tableau." },
    { tier: "exam", prompt: "Le tableau compte 282 élèves en tout, dont 148 filles. Combien de garçons ? Quel modèle reconnais-tu ?", solution: "$282 - 148 = $ **134 garçons** — le **modèle en barres** parties-tout, version statistique : tout 282, parties 148 et ?." },
  ],
  practice: [
    { tier: "application", label: "Les marges parlent", make: (r) => {
      const t = pick(r, ["à pied", "en vélo", "en voiture", "en bus"]);
      const f = randint(r, 12, 60), g = randint(r, 12, 60);
      if (r() < 0.5) return { prompt: `Ligne « ${t} » : ${f} filles et ${g} garçons. Quel est le total de la ligne ?`, answer: f + g, solution: `$${f} + ${g} = $ **${f + g}** : la marge additionne sa ligne.` };
      return { prompt: `Ligne « ${t} » : total ${f + g}, dont ${f} filles. Combien de garçons ?`, answer: g, solution: `$${f + g} - ${f} = $ **${g}** : le tout moins la partie connue.` };
    } },
  ],
};

export default [chartsTables];
