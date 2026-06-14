// Field "Discrete" — MIDDLE module (6e year): organisation and management of data.
// Official cycle-3 programme (2025): the pupil LEADS a statistical survey end to
// end — planning (question, population), collecting and recording measurements,
// building the table (observations, characters), FILTERING the data by a
// criterion — and reads real-world data (climate) with a critical eye.
import { randint, pick } from "../../core/exercises.js";

// — Leading a survey (programme: planifier, recueillir, consigner, filtrer) —
const survey = {
  id: "discrete.middle.survey",
  level: "middle", domain: "discrete",
  title: "Mener l'enquête",
  tagline: "De la question au tableau filtré — la statistique, c'est toi qui la fabriques.",
  prereqs: ["discrete.primary.circular"],
  intuition:
    "Jusqu'ici tu **lisais** des tableaux et des diagrammes fabriqués par d'autres. En 6e, tu changes de côté : tu **mènes** l'enquête — poser la question, choisir qui interroger, recueillir, consigner, présenter.\n\nEt un geste nouveau : **filtrer** — extraire d'un tableau les seules lignes qui vérifient un critère (« les élèves qui viennent à vélo », « les jours au-dessus de 25 °C »).",
  depths: {
    discovery:
      "**Avec les mains** : une vraie enquête de classe — « Comment viens-tu au collège ? » Planifier : la question (claire, une seule interprétation !) et la **population** (qui ? toute la classe). Recueillir : chacun répond, tu **consignes** au fur et à mesure — bâtons sur le brouillon, puis tableau propre.",
    standard:
      "**En image** : le tableau s'organise en **observations** (une ligne par élève interrogé) et **caractères** (les colonnes : moyen de transport, durée du trajet, distance). C'est la table de données — et le **filtre** la interroge : « durée > 20 min » ne garde que les lignes concernées ; les compter, c'est déjà répondre à une question que le tableau brut cachait.",
    advanced:
      "**Dans la tête** : les données réelles réclament un **esprit critique** — un tableau de températures moyennes annuelles montre +1,2 °C en un siècle : que mesure-t-on exactement (moyennes ? maximales ? où ?) ; combien d'observations (un an de plus ou de moins change-t-il la tendance ?) ; qui a recueilli ? La statistique n'est pas un décor : c'est une **méthode** — et la maîtriser de bout en bout (question → données → tableau → filtre → conclusion) immunise contre les chiffres qui font dire n'importe quoi.",
  },
  keyIdea: "Une enquête : **question** précise → **population** → recueil **consigné** → tableau (observations × caractères) → **filtre** selon un critère → conclusion prudente.",
  why:
    "Pourquoi fabriquer ses propres données plutôt qu'en lire ? Parce que celui qui a transpiré sur le recueil sait ce qu'un tableau **cache** : les réponses ambiguës, les absents du jour, la question mal posée. Cette lucidité-là ne s'apprend qu'en faisant — et c'est elle qui protège, plus tard, des sondages truqués et des moyennes trompeuses.",
  examples: [
    { title: "Planifier l'enquête transport", steps: [
      { p: "Question : « Comment viens-tu au collège, et en combien de minutes ? » — population : les 24 élèves de la classe." },
      { p: "Recueil consigné ligne par ligne : un tableau de 24 observations, 2 caractères (moyen, durée)." },
    ] },
    { title: "Filtrer le tableau", steps: [
      { p: "Critère : « durée > 20 minutes » — on parcourt les lignes, on ne garde que celles qui vérifient." },
      { p: "7 lignes restent : **7 élèves sur 24** ont plus de 20 minutes de trajet — le filtre répond." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelles sont les étapes d'une enquête statistique, de la question à la conclusion ?", solution: "**Planifier** (question précise, population), **recueillir** et **consigner** les réponses, **construire le tableau** (observations en lignes, caractères en colonnes), **filtrer**/présenter, conclure prudemment." },
    { tier: "warmup", prompt: "Dans une enquête sur les trajets, quelles sont les observations et quels sont les caractères ?", solution: "Les **observations** : une ligne par élève interrogé ; les **caractères** : les colonnes mesurées (moyen de transport, durée, distance…)." },
    { tier: "application", prompt: "Un tableau de 24 élèves indique leur durée de trajet. Le filtre « durée > 20 min » garde 7 lignes. Que conclure ?", solution: "**7 élèves sur 24** mettent plus de 20 minutes — le filtre extrait du tableau la réponse à une question précise." },
    { tier: "challenge", prompt: "« Fais-tu beaucoup de sport ? » est une mauvaise question d'enquête. Pourquoi, et comment la corriger ?", solution: "« Beaucoup » n'a pas le même sens pour tous : les réponses ne seront pas comparables. Corriger en mesurable : « **Combien d'heures de sport par semaine ?** » — une bonne question n'a qu'une interprétation." },
    { tier: "exam", prompt: "Un tableau montre la température moyenne annuelle d'une ville depuis 1900 : +1,2 °C en un siècle. Donne deux questions critiques à poser avant de conclure.", solution: "Par exemple : **que mesure-t-on** exactement (moyenne de quelles relevés, à quel endroit — la station a-t-elle bougé ?) et **sur combien d'observations** (la tendance résiste-t-elle si on retire une année exceptionnelle ?). Les données réelles se lisent avec méthode — c'est tout l'esprit de l'enquête." },
  ],
  practice: [
    { tier: "application", label: "Compter après filtre", make: (r) => {
      const total = randint(r, 18, 30); const garde = randint(r, 4, Math.min(12, total - 5));
      const crit = pick(r, ["durée > 20 min", "vient à vélo", "plus de 2 livres lus", "température > 25 °C"]);
      return { prompt: `Un tableau compte ${total} observations. Le filtre « ${crit} » en garde ${garde}. Combien d'observations ne vérifient PAS le critère ?`, answer: total - garde, solution: `$${total} - ${garde} = $ **${total - garde}** — le filtre partage le tableau en deux.` };
    } },
    { tier: "challenge", label: "Le filtre en pourcentage", make: (r) => {
      const base = pick(r, [[1, 4, 25], [1, 2, 50], [3, 4, 75], [1, 5, 20], [2, 5, 40], [1, 10, 10]]);
      const k = pick(r, [2, 4, 6, 8]); const total = base[1] * k; const garde = base[0] * k;
      return { prompt: `Sur ${total} observations, un filtre en garde ${garde}. Quel pourcentage du tableau vérifie le critère ?`, answer: base[2], solution: `$\\frac{${garde}}{${total}} = \\frac{${base[0]}}{${base[1]}} = $ **${base[2]} %** — le filtre se lit en proportion.` };
    } },
  ],
};

export default [survey];
