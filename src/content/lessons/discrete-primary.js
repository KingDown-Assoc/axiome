// Field "Discrete" — PRIMARY module (CP year): data collection, tables, bar charts.
// Official cycle-2 programme, domain "Organisation et gestion de données".
import { randint, pick } from "../../core/exercises.js";

// — The survey: tallies, table, bar chart (programme: collecter et présenter des données) —
const dataCp = {
  id: "discrete.primary.data-survey",
  level: "primary", domain: "discrete",
  title: "L'enquête : du comptage au diagramme",
  tagline: "Poser une question, compter les réponses, et les faire parler en barres.",
  prereqs: ["discrete.preschool.data-table"],
  intuition:
    "« Quel est ton fruit préféré : orange, fraise, banane ou kiwi ? » Voilà une **enquête** ! Pour compter les réponses sans s'embrouiller : un trait par vote, groupés **par paquets de cinq** — ||||| ||||| || se lit « cinq, dix, douze ».\n\nEnsuite, on range tout dans un **tableau**, puis on dessine un **diagramme en barres** : un cube par élève, et les tours montrent d'un coup d'œil qui gagne.",
  depths: {
    discovery:
      "**Avec les mains** : je recueille — un trait par réponse, et le cinquième trait ferme le paquet. Puis une tour de cubes par fruit, un cube par élève : les tours, c'est déjà le diagramme.",
    standard:
      "**En image** : le tableau range (fruit | nombre d'élèves), le diagramme en barres **montre** : la barre la plus haute = le fruit le plus choisi. On lit avec les mots « le plus », « le moins », « autant que », « plus que », « moins que ». Avec orange 4, fraise 12, banane 8, kiwi 2 : la fraise gagne, le kiwi ferme la marche.",
    advanced:
      "**Dans la tête** : le **tableau à double entrée** croise deux critères — la forme ET la couleur. Une ligne, une colonne, et la case à leur **intersection** contient ce qui vérifie les deux à la fois : tous les couples possibles tiennent dans un seul tableau. Organiser, c'est rendre les questions faciles avant même de les poser.",
  },
  keyIdea: "Traits par paquets de **cinq** → **tableau** → **diagramme en barres**. La barre la plus haute dit « le plus ».",
  why:
    "Pourquoi dessiner un diagramme alors que le tableau contient déjà tout ? Parce que l'œil compare des **hauteurs** bien plus vite que des nombres : le tableau stocke, le diagramme montre. Deux outils, deux métiers — et la même enquête derrière.",
  examples: [
    { title: "L'enquête des fruits, de bout en bout", steps: [
      { p: "Recueil : orange ||||, fraise ||||| ||||| ||, banane ||||| |||, kiwi ||." },
      { p: "Tableau : orange 4, fraise 12, banane 8, kiwi 2." },
      { p: "Diagramme : la barre de la fraise domine → « la fraise est le fruit **le plus** choisi »." },
    ] },
    { title: "La case à l'intersection", steps: [
      { p: "Tableau à double entrée : lignes = formes, colonnes = couleurs." },
      { p: "Ligne « triangle », colonne « rouge » → la case compte les **triangles rouges**, et rien d'autre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi grouper les traits de comptage par paquets de cinq ?", solution: "Pour compter **vite et sûr** : « cinq, dix, douze » au lieu de douze traits un par un — des groupements, comme en numération." },
    { tier: "warmup", prompt: "Votes : orange 4, fraise 12, banane 8, kiwi 2. Quel fruit est le plus choisi ? Le moins ?", solution: "Le plus : la **fraise** (12). Le moins : le **kiwi** (2)." },
    { tier: "application", prompt: "Avec ces votes, combien d'élèves ont répondu en tout ?", solution: "$4 + 12 + 8 + 2 = $ **26 élèves** — le tout est la réunion des quatre parties." },
    { tier: "challenge", prompt: "Combien de votes la fraise a-t-elle de plus que la banane ?", solution: "$12 - 8 = $ **4** : c'est l'écart entre les deux barres — un modèle de comparaison !" },
    { tier: "exam", prompt: "Dans un tableau à double entrée formes et couleurs, que trouve-t-on à l'intersection de la ligne « triangle » et de la colonne « rouge » ?", solution: "Les **triangles rouges** — uniquement ce qui vérifie les deux critères à la fois : c'est tout le pouvoir de l'intersection." },
  ],
  practice: [
    { tier: "application", label: "Lire le diagramme", make: (r) => {
      const [o, f, b] = pick(r, [[4, 12, 8], [3, 9, 6], [5, 11, 7], [2, 10, 6]]);
      if (r() < 0.5) return { prompt: `Votes : orange ${o}, fraise ${f}, banane ${b}. Combien de votes la fraise a-t-elle de plus que la banane ?`, answer: f - b, solution: `L'écart entre les deux barres : $${f} - ${b} = $ **${f - b}**.` };
      return { prompt: `Votes : orange ${o}, fraise ${f}, banane ${b}. Combien d'élèves ont voté en tout ?`, answer: o + f + b, solution: `Je réunis les trois parties : $${o} + ${f} + ${b} = $ **${o + f + b}**.` };
    } },
  ],
};

export default [dataCp];
