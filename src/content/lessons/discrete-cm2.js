// Field "Discrete" — PRIMARY module (CM2 year): organisation and management of data.
// Official cycle-3 programme (2025): reading circular diagrams (the sector as a
// fraction of the disc), cross-referencing text, tables, bar charts and curves,
// and solving one-to-two-step problems on real-world data.
import { randint, pick } from "../../core/exercises.js";

// — Circular diagrams (programme: lire et interpréter un diagramme circulaire) —
const circular = {
  id: "discrete.primary.circular",
  level: "primary", domain: "discrete",
  title: "Les diagrammes circulaires",
  tagline: "Le camembert : chaque part est une fraction du tout — littéralement.",
  prereqs: ["discrete.primary.curves"],
  intuition:
    "Nouveau venu dans la famille des graphiques : le **diagramme circulaire** — le « camembert ». Le disque entier représente le **total** ; chaque secteur, une catégorie — et sa taille dit sa part.\n\nLa magie : tes fractions travaillent directement — un secteur qui couvre le **quart** du disque représente le quart du total. Sur 28 élèves, ce quart fait $28 \\div 4 = 7$ élèves.",
  depths: {
    discovery:
      "**Avec les mains** : le disque se plie comme une crêpe — en deux (les moitiés), encore en deux (les quarts). Un secteur qui épouse un pli est une fraction **exacte** : la lecture commence par les plis remarquables (moitié, quart, tiers).",
    standard:
      "**En image** : lire un camembert, c'est enchaîner fraction → quantité — sport préféré de 28 élèves : le foot couvre la moitié (14 élèves), la danse un quart (7), le reste se partage. Vérification d'or : les parts doivent **remonter au total** ($14 + 7 + 7 = 28$ ✓) — le disque entier vaut toujours 1.",
    advanced:
      "**Dans la tête** : chaque graphique a son métier — le camembert excelle à montrer les **parts d'un tout** (qui domine ? qui est marginal ?) mais cache les valeurs exactes et les évolutions ; la courbe raconte le **temps** ; les barres **comparent** des quantités. Croiser un texte, un tableau et un camembert dans un même problème, c'est choisir à chaque question la bonne source — la vraie compétence de lecture de données.",
  },
  keyIdea: "Le disque entier = le total ; chaque secteur = sa **fraction** du tout. Vérification : les parts remontent toujours au total.",
  why:
    "Pourquoi un cercle, et pas une barre découpée ? Parce que le disque n'a ni début ni fin : aucune catégorie ne paraît « première », et l'œil compare des **angles** — ce qu'il fait remarquablement bien pour les moitiés et les quarts. Chaque forme de graphique exploite un talent de l'œil ; celui du camembert, c'est la part du tout.",
  examples: [
    { title: "Du secteur aux élèves", steps: [
      { p: "Classe de 28 élèves ; le secteur « foot » couvre la moitié du disque." },
      { p: "Foot : $28 \\div 2 = $ **14 élèves** — la fraction du disque est la fraction du total." },
    ] },
    { title: "La vérification d'or", steps: [
      { p: "Foot 14, danse 7, lecture 7." },
      { p: "$14 + 7 + 7 = 28$ ✓ — les parts reconstituent le disque entier." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans un diagramme circulaire, que représentent le disque entier et chaque secteur ?", solution: "Le disque entier : le **total** ; chaque secteur : une catégorie, dont la taille est sa **fraction** du tout." },
    { tier: "warmup", prompt: "Sur 28 élèves, le secteur « foot » couvre la moitié du disque. Combien d'élèves ?", solution: "$28 \\div 2 = $ **14 élèves**." },
    { tier: "application", prompt: "Sur 40 votes, le secteur « bleu » couvre un quart du disque et le « vert » la moitié. Combien de votes pour le reste ?", solution: "Bleu : $10$ ; vert : $20$ ; reste : $40 - 30 = $ **10 votes** — le disque remonte toujours au total." },
    { tier: "challenge", prompt: "Quel graphique choisir pour : (a) la répartition du budget d'une classe ; (b) la température au fil de la semaine ?", solution: "(a) un **camembert** — des parts d'un tout ; (b) une **courbe** — une évolution dans le temps. Chaque graphique a son métier." },
    { tier: "exam", prompt: "Un camembert affiche : transports 1/2, repas 1/4, loisirs 1/4 — sur un budget de 60 €. Un texte précise que 5 € des loisirs vont au cinéma. Combien de loisirs hors cinéma ?", solution: "Loisirs : $60 \\div 4 = 15$ € ; hors cinéma : $15 - 5 = $ **10 €** — deux étapes, deux sources (le disque, puis le texte)." },
  ],
  practice: [
    { tier: "application", label: "La fraction du disque", make: (r) => {
      const total = pick(r, [24, 28, 32, 36, 40, 48]); const f = pick(r, [[2, "la moitié"], [4, "le quart"]]);
      return { prompt: `Sur ${total} élèves, un secteur couvre ${f[1]} du disque. Combien d'élèves représente-t-il ?`, answer: total / f[0], solution: `$${total} \\div ${f[0]} = $ **${total / f[0]} élèves** — la fraction du disque est la fraction du total.` };
    } },
    { tier: "challenge", label: "Remonter au total", make: (r) => {
      const total = pick(r, [40, 48, 60, 80]); const a = total / 2, b = total / 4;
      return { prompt: `Un camembert : la moitié pour A (${a} votes), le quart pour B (${b} votes). Combien de votes pour le secteur restant ?`, answer: total - a - b, solution: `Total $${total}$ ; reste : $${total} - ${a} - ${b} = $ **${total - a - b} votes** — le dernier quart du disque.` };
    } },
  ],
};

export default [circular];
