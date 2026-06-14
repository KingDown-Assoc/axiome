// Field "Applied" — PRIMARY module (CP year): length in cm, money, telling time.
// Official cycle-2 programme crossed with Singapore P1 (length cm, money, time).
import { randint, pick } from "../../core/exercises.js";

// — Length in centimetres: the graduated ruler (programme: unités m et cm, règle graduée) —
const lengthCm = {
  id: "applied.primary.length-cm",
  level: "primary", domain: "applied",
  title: "Le centimètre et la règle graduée",
  tagline: "La bande témoin devient une règle : mesurer, tracer, estimer.",
  prereqs: ["applied.preschool.measure-length"],
  intuition:
    "Ta bande témoin de maternelle a grandi : c'est maintenant une **règle graduée**. Chaque petit trait vaut **un centimètre** (cm) — la même unité pour tout le monde.\n\nDeux gestes : **mesurer** un segment (aligner, lire) et **tracer** un segment d'une longueur donnée. Et une grande égalité à retenir : $1$ m $= 100$ cm — encore la numération !",
  depths: {
    discovery:
      "**Avec les mains** : pour comparer deux objets qu'on ne peut pas déplacer, je reporte avec une ficelle ou une bandelette — puis la règle fait mieux : elle porte les longueurs **déjà écrites**.",
    standard:
      "**En image** : je pose la règle le long du segment, j'aligne le bord sur la graduation **zéro**, et je lis le nombre à l'autre bout : 7 → le segment mesure 7 cm. Pour tracer 5 cm : un point sur 0, un point sur 5, et je relie à la règle.",
    advanced:
      "**Dans la tête** : connaître des **longueurs de référence** permet d'estimer sans mesurer — une trousse ≈ 20 cm, une porte ≈ 2 m, la classe ≈ 8 m. Et puisque $1$ m $= 100$ cm, mètres et centimètres se parlent comme dizaines et unités : la mesure est de la numération appliquée au monde.",
  },
  keyIdea: "Aligner sur le **zéro**, lire la graduation. $1$ m $= 100$ cm.",
  why:
    "Pourquoi tout le monde utilise-t-il le même centimètre, alors que nos trombones marchaient bien ? Parce qu'une mesure sert à **communiquer** : « 4 trombones » dépend de tes trombones, « 7 cm » est vrai pour tous. L'unité commune transforme une mesure privée en vérité partagée.",
  examples: [
    { title: "Mesurer un crayon", steps: [
      { p: "J'aligne le bout du crayon sur la graduation 0." },
      { p: "L'autre bout tombe sur 12 → le crayon mesure **12 cm**." },
    ] },
    { title: "Le piège du mauvais départ", steps: [
      { p: "Un segment va de la graduation 2 à la graduation 9." },
      { p: "Sa longueur n'est pas 9 : c'est $9 - 2 = $ **7 cm** — on compte les centimètres parcourus." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur quelle graduation aligne-t-on le début de l'objet à mesurer ?", solution: "Sur le **zéro** — pas sur le bord de la règle ni sur le 1." },
    { tier: "warmup", prompt: "Un segment va de la graduation 0 à la graduation 7. Sa longueur ?", solution: "**7 cm**." },
    { tier: "application", prompt: "Combien de centimètres dans un mètre ?", solution: "$1$ m $= $ **100 cm** : un mètre, c'est dix dizaines de centimètres." },
    { tier: "challenge", prompt: "Un crayon va de la graduation 2 à la graduation 9. Mesure-t-il 9 cm ?", solution: "**Non : 7 cm** ($9 - 2$). On lit l'écart entre les deux graduations, pas le nombre d'arrivée." },
    { tier: "exam", prompt: "Ma trousse mesure plutôt : 2 cm, 20 cm ou 1 m ?", solution: "**20 cm** : 2 cm, c'est un timbre ; 1 m, c'est une porte en largeur. Les références évitent les réponses absurdes." },
  ],
  practice: [
    { tier: "application", label: "Lire la règle", make: (r) => {
      const start = r() < 0.5 ? 0 : randint(r, 1, 4); const len = randint(r, 3, 12); const end = start + len;
      return { prompt: `Un segment va de la graduation ${start} à la graduation ${end}. Quelle est sa longueur en cm ?`, answer: len, solution: start === 0 ? `Départ sur 0 : je lis **${len} cm**.` : `$${end} - ${start} = $ **${len} cm** — gare au départ qui n'est pas zéro !` };
    } },
  ],
};

// — Money: euros, value vs count (programme: la monnaie, montants entiers ≤ 100) —
const money = {
  id: "applied.primary.money",
  level: "primary", domain: "applied",
  title: "La monnaie : compter en euros",
  tagline: "Un billet de dix vaut dix pièces de un — la dizaine pour de vrai.",
  prereqs: ["numbers.primary.place-value"],
  intuition:
    "Dix pièces de 1 € valent exactement **un billet de 10 €** : la dizaine existe dans la vraie vie !\n\nAttention au piège préféré de la monnaie : ce n'est pas celui qui a **le plus de pièces** qui a le plus d'argent — c'est celui qui a la plus grande **valeur**.",
  depths: {
    discovery:
      "**Avec les mains** : je paie avec des pièces et des billets fictifs, je rends la monnaie, j'échange dix pièces de 1 € contre un billet de 10 €.",
    standard:
      "**En image** : pour compter une somme, j'organise en **groupes de dix euros** : 3 billets de 10 et 4 pièces de 1, c'est 34 € — exactement « 3 dizaines et 4 unités ». Pour constituer 48 € avec le moins de billets de 10 et de pièces de 1 : **4 billets et 8 pièces**.",
    advanced:
      "**Dans la tête** : le billet est plus abstrait que la barre de cubes — il ne **montre** pas dix pièces, il les **vaut**. Et rendre la monnaie, c'est chercher un **complément** : je paie 7 € avec 10 €, on me rend ce qui complète 7 jusqu'à 10. La monnaie fait travailler toute la numération et tout le calcul, sans en avoir l'air.",
  },
  keyIdea: "Compter une somme = compter des **valeurs**, pas des pièces. Rendre la monnaie = un **complément**.",
  why:
    "Pourquoi 3 pièces peuvent-elles battre 5 pièces ? Parce que les pièces n'ont pas toutes la même valeur : trois pièces de 2 € (6 €) battent cinq pièces de 1 € (5 €). Compter les objets et compter ce qu'ils valent sont deux questions différentes — la monnaie l'apprend mieux que tout.",
  examples: [
    { title: "Compter en organisant", steps: [
      { p: "3 billets de 10 € et 4 pièces de 1 €." },
      { p: "Trois dizaines et quatre unités : **34 €**." },
    ] },
    { title: "Rendre la monnaie", steps: [
      { p: "Le livre coûte 7 € ; je donne un billet de 10 €." },
      { p: "Complément de 7 à 10 : on me rend **3 €**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de pièces de 1 € valent un billet de 10 € ?", solution: "**Dix** : le billet de 10 €, c'est une dizaine d'euros." },
    { tier: "warmup", prompt: "3 billets de 10 € et 4 pièces de 1 € : quelle somme ?", solution: "« Trois dizaines et quatre unités » : **34 €**." },
    { tier: "application", prompt: "Qui a le plus d'argent : Léo avec 5 pièces de 1 €, ou Ana avec 3 pièces de 2 € ?", solution: "**Ana** : $2 + 2 + 2 = 6$ € contre 5 €. On compare les **valeurs**, pas le nombre de pièces." },
    { tier: "challenge", prompt: "Constitue 48 € avec le moins possible de billets de 10 € et de pièces de 1 €.", solution: "**4 billets et 8 pièces** : 4 dizaines et 8 unités." },
    { tier: "exam", prompt: "Je paie 7 € avec un billet de 10 €. Combien me rend-on, et quel calcul du CP se cache là ?", solution: "**3 €** : c'est le **complément** de 7 à 10 — la table d'addition déguisée en commerce." },
  ],
  practice: [
    { tier: "warmup", label: "Compter la somme", make: (r) => {
      const b = randint(r, 1, 8), p = randint(r, 0, 9);
      return { prompt: `${b} billet(s) de 10 € et ${p} pièce(s) de 1 € : quelle somme en euros ?`, answer: 10 * b + p, solution: `${b} dizaines et ${p} unités : **${10 * b + p} €**.` };
    } },
    { tier: "application", label: "Rendre la monnaie", make: (r) => {
      const prix = randint(r, 2, 9);
      return { prompt: `Un objet coûte ${prix} € ; je paie avec un billet de 10 €. Combien me rend-on ?`, answer: 10 - prix, solution: `Complément de ${prix} à 10 : on me rend **${10 - prix} €**.` };
    } },
  ],
};

// — Telling time: whole hours (programme CP: le repérage dans le temps se limite aux heures entières) —
const timeHours = {
  id: "applied.primary.time-hours",
  level: "primary", domain: "applied",
  title: "Lire l'heure : les heures entières",
  tagline: "Grande aiguille sur le 12, petite sur le nombre — il est… pile !",
  prereqs: ["applied.preschool.time"],
  intuition:
    "Une horloge a deux aiguilles : la **petite** (lente) montre les **heures**, la **grande** (rapide) montre les minutes.\n\nAu CP, on lit les heures **entières** : quand la grande aiguille pointe le **12**, c'est une heure pile — et la petite dit laquelle : sur le 7, « il est sept heures ».",
  depths: {
    discovery:
      "**Avec les mains** : sur une horloge à manipuler, je place la grande aiguille sur 12 et je promène la petite : trois heures, quatre heures, cinq heures…",
    standard:
      "**En image** : grande sur 12 + petite sur 9 → « il est **neuf heures** ». Si la grande aiguille n'est pas sur le 12, ce n'est **pas** une heure pile — la lecture fine attendra le CE1.",
    advanced:
      "**Dans la tête** : la petite aiguille fait **deux tours** par jour — 7 heures existe donc deux fois : le matin et le soir. Même image sur le cadran, deux moments du monde : c'est le contexte (jour ? nuit ?) qui départage, en attendant les écritures du type « 19 h ».",
  },
  keyIdea: "Heure pile = grande aiguille sur le **12** ; la **petite** aiguille dit l'heure.",
  why:
    "Pourquoi deux aiguilles, et pas une seule ? Parce qu'une seule devrait dire deux choses à la fois. En partageant le travail — l'une compte les heures, l'autre l'intérieur de l'heure — chaque lecture devient simple. Diviser pour mieux lire : très mathématicien.",
  examples: [
    { title: "Lire une heure pile", steps: [
      { p: "La grande aiguille pointe le 12 : c'est une heure pile." },
      { p: "La petite pointe le 4 : « il est **quatre heures** »." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "À une heure pile, où pointe la grande aiguille ?", solution: "Sur le **12** — toujours." },
    { tier: "warmup", prompt: "Petite aiguille sur 4, grande sur 12 : quelle heure est-il ?", solution: "Il est **quatre heures**." },
    { tier: "application", prompt: "La grande aiguille pointe le 6. Est-ce une heure pile ?", solution: "**Non** : pour une heure pile, la grande aiguille doit pointer le 12." },
    { tier: "challenge", prompt: "De 3 heures à 6 heures, combien d'heures s'écoulent ?", solution: "**3 heures** : la petite aiguille avance de trois nombres." },
    { tier: "exam", prompt: "Le cadran affiche 8 heures pile. Quel moment de la journée est-ce ?", solution: "**On ne peut pas savoir** avec le cadran seul : 8 heures existe le matin **et** le soir — la petite aiguille fait deux tours par jour." },
  ],
  practice: [
    { tier: "warmup", label: "Quelle heure est-il ?", make: (r) => {
      const h = randint(r, 1, 12);
      return { prompt: `La grande aiguille est sur le 12, la petite sur le ${h}. Quelle heure est-il ?`, answer: h, solution: `Grande sur 12 : heure pile. Petite sur ${h} : il est **${h} heure${h > 1 ? "s" : ""}**.` };
    } },
  ],
};

export default [lengthCm, money, timeHours];
