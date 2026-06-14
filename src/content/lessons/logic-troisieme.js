// Field "Logic" — MIDDLE module (3e year): the conditional loop. Official
// cycle-4 programme (« La pensée informatique »): deepening the notion of
// variable, using COMPOUND CONDITIONS, using a CONDITIONAL LOOP (while),
// STRUCTURING programs, and writing a programme autonomously to reach a goal or
// solve a problem — the year of programming autonomy.
import { randint, pick } from "../../core/exercises.js";

const boucleConditionnelle = {
  id: "logic.middle.boucle-conditionnelle",
  level: "middle", domain: "logic",
  title: "Tant que : la boucle conditionnelle",
  tagline: "Répéter sans savoir combien de fois — la condition décide de la sortie.",
  prereqs: ["logic.middle.conditions"],
  intuition:
    "Ta boucle de 5e répétait un nombre **connu** de fois. Mais « verse de l'eau **jusqu'à ce que** le verre soit plein » ne dit pas combien de versements : c'est la condition qui arrête, pas un compteur.\n\nLa boucle **tant que** est née : *tant que* la condition est vraie, on refait — le nombre de tours, on le découvre en route.",
  depths: {
    discovery:
      "**Avec les mains** : « $0 \\to s$ ; **tant que** $s < 20$ : mettre $s + 6$ dans $s$ » — trace : $s = 0 \\to 6 \\to 12 \\to 18 \\to 24$, stop ($24 \\geq 20$ : la condition vient de mentir). **Quatre** tours — et remarque : la boucle teste **avant** chaque tour, et $s$ finit *au-delà* du seuil : le dernier pas franchit la ligne.",
    standard:
      "**En image** : les conditions **composées** — « tant que ($s < 20$) **et** (tours $< 10$) » exige les deux vérités à la fois ; « **ou** » se contente d'une seule. Tes probabilités sourient : le *et* est une intersection, le *ou* une réunion — la logique des événements et celle des programmes parlent la même langue, $\\cap$ et $\\cup$ en tenue de travail.",
    advanced:
      "**Dans la tête** : le pouvoir a un prix — « tant que $s \\geq 0$ : ajouter 1 » ne s'arrête **jamais** : la **boucle infinie**, le bug le plus célèbre du monde (l'écran qui gèle, c'est souvent elle). Écrire un *tant que*, c'est prouver que sa condition finira par tomber — un petit théorème par programme. La récompense : Héron tient en trois lignes — « tant que l'écart entre $x^2$ et 50 dépasse la précision : remplacer $x$ par la moyenne de $x$ et $\\frac{50}{x}$ » — la boucle qui raffine $\\sqrt{50}$ jusqu'à la décimale voulue : ta calculatrice, écrite par toi. Avec variables, conditions, boucles et blocs bien **structurés**, tu sais désormais écrire tout calcul que l'humanité sait décrire — c'est le diplôme algorithmique du collège.",
  },
  keyIdea: "**Tant que** condition : refaire — le test précède chaque tour, le nombre de tours est inconnu d'avance. Conditions composées : **et** $=$ les deux ($\\cap$), **ou** $=$ au moins une ($\\cup$). Une boucle se prouve : sa condition doit finir par tomber.",
  why:
    "Pourquoi une boucle de plus, quand « répéter $n$ fois » marchait ? Parce que le monde s'arrête sur des **conditions**, pas sur des compteurs : chercher jusqu'à trouver, remplir jusqu'au seuil, affiner jusqu'à la précision — le *répéter n fois* n'est qu'un *tant que* déguisé (tant que le compteur $< n$), jamais l'inverse. Le tant que est la boucle universelle : avec lui, l'autonomie d'écriture est complète.",
  examples: [
    { title: "Compter les tours en route", steps: [
      { p: "« $0 \\to s$ ; tant que $s < 20$ : mettre $s + 6$ dans $s$ » — trace : $0 \\to 6 \\to 12 \\to 18 \\to 24$." },
      { p: "**4 tours**, et $s$ finit à 24 : le dernier pas franchit le seuil — le test arrête au tour suivant." },
    ] },
    { title: "Le et qui verrouille", steps: [
      { p: "« tant que ($s < 20$) et (tours $< 10$) » : la boucle vit tant que **les deux** tiennent." },
      { p: "Qu'une seule tombe — seuil atteint *ou* dixième tour — et la sortie s'ouvre : le garde-fou du programmeur." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Exécute à la main : « $0 \\to s$ ; tant que $s < 20$ : mettre $s + 6$ dans $s$ ». Donne la trace, le nombre de tours et la valeur finale de $s$.", solution: "Trace : $0 \\to 6 \\to 12 \\to 18 \\to 24$ — **4 tours**, $s$ finit à **24** : à 18 la condition tenait encore (un tour de plus), à 24 elle tombe — le dernier pas dépasse le seuil." },
    { tier: "warmup", prompt: "Quelle différence essentielle entre « répéter 5 fois » et « tant que $s < 20$ » ?", solution: "Le **répéter** connaît son nombre de tours d'avance ; le **tant que** le découvre en route — c'est la condition qui décide, pas un compteur. Et le répéter $n$ fois n'est qu'un tant que déguisé (tant que compteur $< n$) : le tant que est la boucle universelle." },
    { tier: "application", prompt: "« Tant que ($s < 20$) et (tours $< 10$) » : dans quels cas la boucle s'arrête-t-elle ? Quel est le rôle du second test ?", solution: "Elle s'arrête dès qu'**une** des deux conditions tombe : seuil atteint ($s \\geq 20$) **ou** dixième tour entamé — le *et* exige les deux vérités pour continuer. Le compteur de tours est un **garde-fou** : même si $s$ n'atteignait jamais 20, la boucle mourrait au tour 10 — l'anti-boucle-infinie." },
    { tier: "challenge", prompt: "Pourquoi « $5 \\to s$ ; tant que $s \\geq 0$ : mettre $s + 1$ dans $s$ » est-il un programme dangereux ? Corrige-le pour qu'il s'arrête à 100.", solution: "$s$ ne fait que **grandir** : la condition $s \\geq 0$ ne tombera jamais — **boucle infinie**, l'écran gèle. Correction : « tant que $s < 100$ » (ou $s \\leq 100$ selon la cible) — écrire un tant que, c'est prouver que sa condition finira par mentir." },
    { tier: "exam", prompt: "Écris (en français structuré) le programme de Héron pour $\\sqrt{50}$ : partir de $x = 7$ et affiner tant que l'écart entre $x^2$ et 50 dépasse $0{,}001$. Pourquoi un tant que s'impose-t-il ici, et non un répéter ?", solution: "« $7 \\to x$ ; **tant que** l'écart entre $x^2$ et $50$ dépasse $0{,}001$ : mettre $\\dfrac{1}{2}\\left(x + \\dfrac{50}{x}\\right)$ dans $x$ ; afficher $x$ » — chaque tour remplace $x$ par la moyenne, et la précision **décide** de la sortie. Un répéter exigerait de connaître d'avance le nombre de raffinements — or il dépend du point de départ et de la précision visée : seule la **condition** le sait. La boucle de ta 3e exécute l'algorithme du Ier siècle : c'est ta calculatrice, écrite à la main." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les tours", make: (r) => {
      const pas = pick(r, [3, 4, 5, 6, 7]); const seuil = pas * randint(r, 2, 5) + randint(r, 1, pas - 1);
      const tours = Math.ceil(seuil / pas);
      return { prompt: `« $0 \\to s$ ; tant que $s < ${seuil}$ : mettre $s + ${pas}$ dans $s$ » — combien de tours ?`, answer: tours, solution: `$s$ grimpe de ${pas} en ${pas} : il faut **${tours}** tours pour atteindre ou dépasser ${seuil} ($s$ finit à ${tours * pas}).` };
    } },
    { tier: "application", label: "La valeur de sortie", make: (r) => {
      const pas = pick(r, [4, 6, 7, 9]); const seuil = pas * randint(r, 2, 5) + randint(r, 1, pas - 1);
      const fin = Math.ceil(seuil / pas) * pas;
      return { prompt: `« $0 \\to s$ ; tant que $s < ${seuil}$ : mettre $s + ${pas}$ dans $s$ » — valeur finale de $s$ ?`, answer: fin, solution: `Le dernier pas **franchit** le seuil : $s = $ **${fin}** (premier multiple de ${pas} à atteindre ${seuil}).` };
    } },
    { tier: "challenge", label: "Le et qui verrouille", make: (r) => {
      const a = randint(r, 3, 18); const b = randint(r, 3, 18); const sa = randint(r, 5, 15); const sb = randint(r, 5, 15);
      const continuer = a < sa && b < sb;
      return { prompt: `Condition « ($a < ${sa}$) et ($b < ${sb}$) » avec $a = ${a}$, $b = ${b}$ : la boucle continue-t-elle ? (1 = oui, 0 = non)`, answer: continuer ? 1 : 0, solution: `$${a} ${a < sa ? "<" : "\\geq"} ${sa}$ et $${b} ${b < sb ? "<" : "\\geq"} ${sb}$ : ${continuer ? "les **deux** tiennent — la boucle continue" : "au moins une tombe — le *et* lâche : **sortie**"}.` };
    } },
  ],
};

export default [boucleConditionnelle];
