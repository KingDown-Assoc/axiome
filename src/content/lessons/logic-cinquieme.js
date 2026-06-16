// Field "Logic" — MIDDLE module (5e year): computational thinking. Official
// cycle-4 programme (« La pensée informatique »): manipulating and sequencing
// simple instructions, identifying a program's inputs and outputs, representing
// FORMULAS as expressions in a block programming language, computing formula
// values through instruction sequences, PREDICTING the value of an expression
// before execution, analyzing a simple program and modifying its parameters, and
// performing a simple UNCONDITIONAL LOOP repeating a linear sequence a precise
// number of times — the variable seen only as data read from storage.
import { randint, pick } from "../../core/exercises.js";

const programmes = {
  id: "logic.middle.programmes",
  level: "middle", domain: "logic",
  title: "Programmer : variables et boucles",
  tagline: "Prévoir ce qu'affiche un programme avant de l'exécuter.",
  prereqs: ["logic.middle.sequences"],
  intuition:
    "Tes programmes de calcul rencontrent la machine : dans un langage par **blocs** (Scratch), la **variable** est une boîte étiquetée qu'on **consulte** — « demander un nombre, le ranger dans $n$, afficher $n \\times 2 + 1$ ».\n\nLa formule devient expression informatique, et le programme a des **entrées** (ce qu'on saisit) et des **sorties** (ce qu'il affiche).",
  depths: {
    discovery:
      "**Avec les mains** : exécute à la main — « demande $n$ ; affiche $(n + 3) \\times 2$ ». Pour $n = 5$ : tu **prévois** 16 avant de cliquer ; la machine confirme. Prévoir puis vérifier : le programmeur calcule toujours un coup d'avance — c'est son geste de régulation.",
    standard:
      "**En image** : la **boucle inconditionnelle** compresse la répétition — « répéter 4 fois : avancer de 50, tourner de 90° » dessine un **carré** en deux lignes au lieu de huit. Analyser un programme, c'est lire ses **paramètres** (le 4, le 50, le 90) et prédire l'effet d'un changement : « répéter 3 fois… tourner de 120° » ? Un **triangle** — les paramètres sont les boutons de la machine.",
    advanced:
      "**Dans la tête** : combien d'instructions exécutées dans « répéter 6 fois : [avancer ; tourner] » ? Pas 2, pas 8 : $6 \\times 2 = 12$ — la boucle **multiplie** son contenu, et la trace d'exécution (dérouler pas à pas en notant la valeur affichée) est ta table de vérité du mouvement. Un détail à méditer : pour fermer un polygone, les rotations doivent totaliser **360°** (un tour complet !) — d'où le $90° \\times 4$, le $120° \\times 3$ : la géométrie pilote le code, et ton futur angle extérieur se cache déjà dans la tortue.",
  },
  keyIdea: "Variable $=$ boîte **consultée** ; formule → expression par blocs. **Prévoir** la sortie avant l'exécution. « Répéter $n$ fois » multiplie son contenu — et $n \\times$ l'angle $= 360°$ ferme la figure.",
  why:
    "Pourquoi prévoir, puisque la machine exécute en une milliseconde ? Parce que la machine fait ce qu'on **écrit**, jamais ce qu'on **veut** : celui qui ne sait pas prédire la sortie ne peut pas reconnaître un bug — il regarde un résultat faux sans le voir. L'exécution mentale est au programmeur ce que l'ordre de grandeur est au calculateur : le garde-fou qui précède la machine.",
  examples: [
    { title: "Prévoir avant d'exécuter", steps: [
      { p: "Programme : « demande $n$ ; affiche $(n + 3) \\times 2$ ». Entrée : $n = 5$." },
      { p: "Prévision : $(5 + 3) \\times 2 = $ **16** — la machine confirme : le programmeur avait un coup d'avance." },
    ] },
    { title: "Le carré en deux lignes", steps: [
      { p: "« Répéter **4** fois : avancer de 50, tourner de **90°** » — la boucle compresse huit ordres en deux." },
      { p: "$4 \\times 90° = 360°$ : le tour complet ferme le carré — changer en (3 ; 120°) dessine un triangle." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans « demander un nombre, le ranger dans $n$, afficher $n \\times 2$ » : quelle est l'entrée, quelle est la sortie ?", solution: "**Entrée** : le nombre saisi (rangé dans la boîte $n$) ; **sortie** : son double affiché — la variable se remplit puis se consulte." },
    { tier: "warmup", prompt: "Prévois la sortie de « demande $n$ ; affiche $(n + 3) \\times 2$ » pour $n = 5$, puis pour $n = 10$.", solution: "$(5 + 3) \\times 2 = $ **16** ; $(10 + 3) \\times 2 = $ **26** — exécuter dans sa tête avant la machine : priorités et parenthèses au poste de commande." },
    { tier: "application", prompt: "Traduis la formule du périmètre du rectangle $P = 2 \\times (L + l)$ en une suite d'instructions par blocs.", solution: "« Demander $L$ ; demander $l$ ; afficher $2 \\times (L + l)$ » — la formule de la 5e devient expression informatique : mêmes parenthèses, mêmes priorités." },
    { tier: "challenge", prompt: "« Répéter 4 fois : avancer de 50, tourner de 90° » dessine un carré. Modifie les deux paramètres pour un triangle équilatéral, et justifie l'angle.", solution: "« Répéter **3** fois : avancer de 50, tourner de **120°** » — il faut totaliser $360°$ pour fermer la figure : $3 \\times 120 = 360$ ✓ (l'angle de rotation est l'angle **extérieur**, pas les 60° intérieurs !)." },
    { tier: "exam", prompt: "Programme : « mettre 0 dans $s$ ; répéter 5 fois : [ajouter 3 à $s$] ; afficher $s$ ». Prévois la sortie en dressant la trace d'exécution, puis donne la formule directe.", solution: "Trace : $s = 0 \\to 3 \\to 6 \\to 9 \\to 12 \\to 15$ — sortie : **15**. Formule directe : $5 \\times 3 = 15$ — la boucle qui additionne $n$ fois, c'est la **multiplication** : le programme redécouvre ta définition du CE1." },
  ],
  practice: [
    { tier: "warmup", label: "L'exécution mentale", make: (r) => {
      const a = randint(r, 2, 9); const b = randint(r, 2, 9); const n = randint(r, 3, 12);
      return { prompt: `« Demande $n$ ; affiche $(n + ${a}) \\times ${b}$ » — sortie pour $n = ${n}$ ?`, answer: (n + a) * b, solution: `$(${n} + ${a}) \\times ${b} = ${n + a} \\times ${b} = $ **${(n + a) * b}** — prévu avant d'exécuter.` };
    } },
    { tier: "application", label: "La boucle qui multiplie", make: (r) => {
      const fois = randint(r, 3, 8); const instr = randint(r, 2, 4);
      if (r() < 0.5) return { prompt: `« Répéter ${fois} fois : [${instr} instructions] » — combien d'instructions exécutées en tout ?`, answer: fois * instr, solution: `$${fois} \\times ${instr} = $ **${fois * instr}** — la boucle multiplie son contenu.` };
      const pas = pick(r, [2, 3, 4, 5]);
      return { prompt: `« Mettre 0 dans $s$ ; répéter ${fois} fois : ajouter ${pas} à $s$ » — valeur finale de $s$ ?`, answer: fois * pas, solution: `$${fois} \\times ${pas} = $ **${fois * pas}** — additionner en boucle, c'est multiplier.` };
    } },
    { tier: "challenge", label: "Fermer la figure", make: (r) => {
      const n = pick(r, [3, 4, 5, 6, 8, 9, 10]);
      return { prompt: `« Répéter ${n} fois : avancer, tourner de ?° » doit dessiner un polygone régulier à ${n} côtés. Quel angle ?`, answer: 360 / n, solution: `$360 \\div ${n} = $ **${360 / n}°** — les rotations doivent totaliser un tour complet.` };
    } },
  ],
};

export default [programmes];
