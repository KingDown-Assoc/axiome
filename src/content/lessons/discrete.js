// Field "Combinatorics & discrete maths" — starts in PRESCHOOL with patterns (organized sequences).
import { randint, pick } from "../../core/exercises.js";

const patterns = {
  id: "discrete.preschool.patterns",
  level: "preschool", domain: "discrete",
  title: "Continuer un motif",
  tagline: "Rouge, bleu, rouge, bleu… et après ? Repérer la règle qui se répète.",
  prereqs: [],
  intuition:
    "Un motif, c'est quelque chose qui **se répète** : rouge, bleu, rouge, bleu… Pour deviner la suite, on cherche le petit bout qui revient (ici « rouge-bleu »).\n\nDès qu'on a trouvé le morceau qui se répète, on peut continuer aussi loin qu'on veut — et même dire ce qu'il y aura beaucoup plus loin.\n\nCertains motifs ne se répètent pas à l'identique : ils **grandissent** à chaque tour (un de plus, encore un de plus…). Ce sont les motifs **évolutifs**.",
  depths: {
    discovery: "On repère le morceau qui se répète, puis on le continue.",
    standard: "Un motif **répétitif** répète un même bloc, appelé **période** : la trouver, c'est tenir la règle — et prédire n'importe quel terme suivant. Un élément qui casse la règle est un **intrus** ; le repérer prouve qu'on a vraiment compris la règle.",
    advanced: "Les motifs **évolutifs** grandissent selon une règle : ⚫⬛⚫⚫⬛⬛⚫⚫⚫⬛⬛⬛ — à chaque tour, **un de plus** de chaque. Et l'idée la plus profonde : « clap, clap, cuisse, cuisse » et ★★⚫⚫ ont la **même structure** (deux pareils, puis deux autres) sous des habits différents. Reconnaître la structure indépendamment des objets, c'est déjà l'**abstraction** — celle qui mène aux suites et aux algorithmes.",
  },
  keyIdea: "Trouver le bloc qui se répète (la **période**), puis le prolonger.",
  why:
    "Pourquoi chercher « ce qui se répète » plutôt que deviner au hasard ? Parce qu'une fois la période trouvée, on a une **règle sûre** : on peut continuer sans se tromper, même très loin. Comprendre la règle vaut mieux que mémoriser les premiers termes.",
  widgets: [
    { kind: "pattern", params: { sequence: ["rouge", "bleu", "rouge", "bleu"], next: "rouge" }, caption: "Trouve le bloc qui se répète, puis dévoile la suite pour vérifier." },
  ],
  examples: [
    { title: "Continuer 🔺⚫🔺⚫", steps: [
      { p: "Le bloc qui se répète est « triangle, rond »." },
      { p: "Après ⚫ vient donc un **triangle** 🔺." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Le motif est : rond, rond, carré, rond, rond, carré… Quelle est la forme qui se répète ?", solution: "Le bloc **« rond, rond, carré »**." },
    { tier: "warmup", prompt: "Rouge, bleu, rouge, bleu… Quelle couleur vient après le dernier bleu ?", solution: "**rouge**." },
    { tier: "application", prompt: "rouge, bleu, rouge, bleu, rouge, rouge, bleu… Où est l'intrus ?", solution: "Le **deuxième rouge d'affilée** : la règle alterne rouge puis bleu, jamais deux rouges collés." },
    { tier: "challenge", prompt: "A, B, B, A, B, B, A, B, B… quelle lettre vient ensuite ?", solution: "La période est « A, B, B », qui vient de se finir → **A**." },
    { tier: "challenge", prompt: "⚫⬛⚫⚫⬛⬛⚫⚫⚫… Que vient-il juste après ?", solution: "**⬛⬛⬛** : à chaque tour, un de plus — un rond puis un carré, deux ronds puis deux carrés, trois ronds puis **trois carrés**." },
    { tier: "exam", prompt: "Motif rouge-bleu-vert qui se répète. De quelle couleur sera le 7e jeton ?", solution: "Période de longueur 3 : les rangs 1, 4, **7** sont rouges → **rouge**." },
    { tier: "exam", prompt: "« Clap, clap, cuisse, cuisse » et ★★⚫⚫ : ces deux motifs ont-ils quelque chose en commun ?", solution: "**Oui : la même structure** — deux pareils, puis deux autres. Les habits changent, la règle est la même." },
    { tier: "exam", prompt: "Invente un motif avec des gestes et décris-le, sans le montrer, pour qu'un camarade le reproduise.", solution: "Donner la **règle** suffit : par exemple « *clap, clap, cuisse* — et on recommence ». Décrire le bloc qui se répète, c'est transmettre tout le motif." },
  ],
  practice: [
    { tier: "application", label: "Quelle couleur ensuite ?", make: (r) => { const base = pick(r, [["rouge", "bleu"], ["rouge", "vert"], ["bleu", "jaune"], ["rouge", "bleu", "vert"]]); const reps = base.length === 2 ? 2 : 1; const seq = []; for (let k = 0; k < reps; k++) seq.push(...base); const next = base[seq.length % base.length]; return { prompt: `Le motif « ${base.join(", ")} » se répète : ${seq.join(", ")}, … Quelle couleur vient ensuite ?`, answer: next, check: { type: "exact" }, solution: `Le bloc « ${base.join(", ")} » recommence → **${next}**.` }; } },
  ],
};

// — Sorting & classifying (preschool) —
const sorting = {
  id: "discrete.preschool.sorting",
  level: "preschool", domain: "discrete",
  title: "Trier et classer",
  tagline: "Regrouper ce qui se ressemble selon une règle.",
  intuition:
    "Deux gestes proches, deux mots. **Trier**, c'est séparer en **deux** groupes selon une règle : ceux qui la respectent (« c'est rond ? oui ! ») et les autres. **Classer**, c'est ranger en **plusieurs familles** selon un critère : par couleur, par forme, par taille…\n\nLa même collection peut se classer de plusieurs façons : tout dépend du critère choisi.",
  depths: {
    discovery:
      "**Trier** : une règle, deux groupes — ce qui la respecte d'un côté, le reste de l'autre. **Classer** : un critère (la couleur, par exemple) et une famille par valeur.\n\nUne chaussette rouge va avec les rouges, une bleue avec les bleues.",
    standard:
      "On peut classer la **même** collection de plusieurs manières : par couleur, par forme, ou par taille — le résultat change selon le critère.\n\nUn objet va dans un groupe **seulement s'il** respecte la règle : dedans ou dehors, jamais entre les deux. C'est ce qui rend le tri **sûr**.",
    advanced:
      "Trier selon une règle, c'est répartir une collection en **catégories** qui ne se mélangent pas : l'idée des *ensembles*, où chaque élément est dedans ou dehors selon une propriété.",
  },
  keyIdea: "**Trier** = deux groupes (la règle : oui ou non). **Classer** = une famille par valeur du critère.",
  why:
    "Pourquoi trier ? Parce que ça aide à **compter** et à **comparer** : une fois les jetons rangés par couleur, on voit tout de suite s'il y a plus de rouges ou de bleus. Ranger, c'est déjà raisonner.",
  examples: [
    { title: "Trier par couleur", steps: [
      { p: "On a des billes rouges et bleues mélangées." },
      { p: "Règle choisie : la couleur." },
      { p: "On fait deux paquets : les rouges, les bleues." },
    ] },
    { title: "Changer de règle", steps: [
      { p: "Mêmes billes, nouvelle règle : la taille." },
      { p: "On fait deux paquets : les grosses, les petites." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour trier des objets, que choisit-on d'abord ?", solution: "Une **règle** (un critère) : couleur, forme, taille…" },
    { tier: "warmup", prompt: "Je sépare les jetons en deux groupes : « ronds » et « pas ronds ». Tri ou classement ?", solution: "Un **tri** : une seule règle, deux groupes — oui ou non." },
    { tier: "warmup", prompt: "On trie par couleur. Où va un carré rouge : avec les rouges, ou avec les ronds ?", solution: "Avec les **rouges** — la règle, c'est la couleur." },
    { tier: "application", prompt: "Tu as 3 jetons rouges et 2 bleus. En triant par couleur, combien de paquets ?", solution: "**2** paquets : un de rouges, un de bleus." },
    { tier: "challenge", prompt: "Peut-on classer les mêmes objets de deux façons différentes ?", solution: "**Oui** : par couleur, par forme, par taille… le critère change le classement." },
    { tier: "exam", prompt: "Dans un paquet « formes rondes », un triangle a-t-il sa place ?", solution: "**Non** : un triangle n'est pas rond, il ne respecte pas la règle." },
  ],
  practice: [
    { tier: "warmup", label: "Compter dans un paquet", make: (r) => { const red = randint(r, 2, 5); const blue = randint(r, 1, 4); return { prompt: `Tu as ${red} jetons rouges et ${blue} bleus. En triant par couleur, combien de jetons dans le paquet rouge ?`, answer: red, solution: `Le paquet rouge contient les ${red} jetons rouges.` }; } },
  ],
};

// — Organizing data: tables & first bar charts (preschool — bridge to the CP "données" domain) —
const dataTable = {
  id: "discrete.preschool.data-table",
  level: "preschool", domain: "discrete",
  title: "Ranger des réponses dans un tableau",
  tagline: "Compter des réponses et les ranger pour les comparer d'un coup d'œil.",
  prereqs: ["numbers.preschool.count", "discrete.preschool.sorting"],
  intuition:
    "Quand on pose une question à toute la classe — « ton fruit préféré ? » — on récolte plein de réponses en vrac. Pour s'y retrouver, on **range** les réponses identiques ensemble et on **compte** chaque groupe.\n\nUn **tableau** met chaque réponse en face de son nombre ; on voit alors tout de suite laquelle revient le plus.",
  depths: {
    discovery:
      "Pour comparer beaucoup de réponses, on regroupe les mêmes et on compte chaque groupe. On range ensuite chaque réponse avec son nombre dans un **tableau**.",
    standard:
      "On peut aussi empiler **un cube par réponse** (1 cube = 1 enfant). La **tour la plus haute** montre la réponse la plus choisie — sans même lire les nombres. C'est un premier **diagramme en barres**.",
    advanced:
      "Recueillir des données, les ranger en tableau et les représenter est une compétence à part entière. Au CP, on construira un vrai diagramme en barres (1 cube = 1 individu) ; ici on en pose les premières briques.",
  },
  keyIdea: "Pour comparer des réponses, on les **groupe**, on **compte** chaque groupe, et la **tour la plus haute** l'emporte.",
  why:
    "Pourquoi ranger avant de dire « quel fruit gagne » ? Parce qu'en vrac on n'y voit rien ; groupées et comptées, les réponses se comparent d'un coup d'œil. Ranger les données, c'est rendre l'information lisible.",
  examples: [
    { title: "Le fruit préféré", steps: [
      { p: "Réponses : pomme, banane, pomme, pomme, banane." },
      { p: "Je groupe et je compte : pomme → 3, banane → 2." },
      { p: "La **pomme** l'emporte (3 contre 2)." },
    ] },
    { title: "La tour de cubes", steps: [
      { p: "Un cube par enfant : tour « pomme » = 3 cubes, tour « banane » = 2 cubes." },
      { p: "La tour pomme est la plus haute → on voit le gagnant sans compter." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour comparer beaucoup de réponses, que fait-on d'abord ?", solution: "On **groupe** les mêmes et on **compte** chaque groupe." },
    { tier: "warmup", prompt: "Tableau — chats : 4, chiens : 2. Quel animal est le plus choisi ?", solution: "Le **chat** (4 contre 2)." },
    { tier: "application", prompt: "Un cube par enfant : tour rouge = 5 cubes, tour bleue = 3. Quelle couleur gagne ?", solution: "**Rouge** : sa tour est la plus haute." },
    { tier: "challenge", prompt: "Pourquoi la tour la plus haute gagne-t-elle, même sans lire les nombres ?", solution: "Parce que **1 cube = 1 enfant** : plus la tour est haute, plus il y a d'enfants." },
    { tier: "exam", prompt: "Tableau — pomme : 3, banane : 3, kiwi : 1. Y a-t-il un seul gagnant ?", solution: "**Non** : pomme et banane sont à **égalité** (3 chacune)." },
  ],
  practice: [
    { tier: "warmup", label: "Qui gagne ?", make: (r) => {
      const opt = pick(r, [["pommes", "bananes"], ["chats", "chiens"], ["rouges", "bleus"]]);
      const a = randint(r, 2, 6); let b = randint(r, 1, 6); if (b === a) b = a > 1 ? a - 1 : a + 1;
      const win = a > b ? opt[0] : opt[1];
      return { prompt: `Tableau — ${opt[0]} : ${a}, ${opt[1]} : ${b}. Lequel est le plus choisi ?`, answer: win, check: { type: "exact" }, solution: `${win} : ${Math.max(a, b)} contre ${Math.min(a, b)}.` };
    } },
  ],
};

export default [patterns, sorting, dataTable];
