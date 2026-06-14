// Field "Logic" — MIDDLE module (6e year): initiation to computational thinking.
// Official cycle-3 programme (2025): instructions, sequences of instructions,
// inputs and outputs, repetitions — identified, executed and PRODUCED, by hand or
// with a machine (block programming, robots) — and programming a simple path.
import { randint, pick } from "../../core/exercises.js";

// — Instructions and sequences (programme: pensée informatique 6e) —
const sequences = {
  id: "logic.middle.sequences",
  level: "middle", domain: "logic",
  title: "Instructions, séquences, répétitions",
  tagline: "Décrire un travail si précisément qu'une machine pourrait le faire.",
  prereqs: ["algebra.primary.rules"],
  intuition:
    "Une **instruction** est un ordre élémentaire : « avance d'une case », « tourne à droite », « ajoute 2 ». Une **séquence** les enchaîne dans l'ordre — et l'ordre est roi : « avance puis tourne » ne mène pas où « tourne puis avance ».\n\nLa **répétition** compacte : tracer un carré, c'est « avance de 5, tourne à droite » — écrit quatre fois… ou **répété 4 fois**. Une ligne au lieu de huit.",
  depths: {
    discovery:
      "**Avec les mains** : joue au robot — un camarade dicte, tu exécutes **à la lettre** (le robot ne devine rien !). « Avance, avance, tourne à gauche, avance » : le chemin se dessine sur le quadrillage. Inverser deux instructions, et le robot finit dans le mur — l'ordre se vit.",
    standard:
      "**En image** : un programme a des **entrées** (ce qu'on lui donne) et des **sorties** (ce qu'il rend) — ton programme de calcul du CM2 (« choisis un nombre ; ajoute 2 ; multiplie par 4 ») prend 5 en entrée et sort 28. **Produire** une séquence, c'est l'écrire pour un exécutant aveugle : chemin codé case par case (→ → ↑ ↑ →), construction géométrique dictée — si deux exécutants divergent, la séquence a fauté, pas eux.",
    advanced:
      "**Dans la tête** : repérer les répétitions, c'est voir la **structure** — le carré : RÉPÈTE 4 fois [avance 5 ; tourne à droite]. L'hexagone : répète 6 fois. L'escalier de 10 marches : répète 10 fois [avance ; monte]. La boucle est l'œil de l'informaticien : là où le novice écrit huit lignes, il en écrit deux — et son programme se relit, se corrige, se généralise. Scratch et les robots exécutent ; toi, tu penses.",
  },
  keyIdea: "Instruction → séquence (l'**ordre** compte) → **répétition** (la structure compactée). Entrée, traitement, sortie : tout programme tient là.",
  why:
    "Pourquoi apprendre à parler aux machines alors qu'on a des humains ? Parce que la machine est un **miroir impitoyable de la pensée** : elle exécute exactement ce qui est écrit — ni ce qu'on voulait dire, ni ce qui était évident. Programmer oblige à penser complet et ordonné ; cette rigueur sert partout, des démonstrations de géométrie aux recettes de cuisine.",
  examples: [
    { title: "Le carré en boucle", steps: [
      { p: "Version longue : avance 5 ; tourne à droite ; avance 5 ; tourne à droite ; avance 5 ; tourne à droite ; avance 5 ; tourne à droite." },
      { p: "Version structurée : **répète 4 fois** [avance 5 ; tourne à droite] — même tracé, une ligne." },
    ] },
    { title: "Entrée → sortie", steps: [
      { p: "Programme : « ajoute 2 ; multiplie par 4 ; retire 3 ». Entrée : 5." },
      { p: "$5 \\to 7 \\to 28 \\to 25$ : sortie **25** — la machine déroule, sans état d'âme." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi « avance puis tourne à droite » et « tourne à droite puis avance » ne mènent-ils pas au même endroit ?", solution: "Parce qu'une séquence s'exécute **dans l'ordre** : la première avance vers l'avant initial puis pivote ; la seconde pivote d'abord et avance dans la **nouvelle** direction — l'ordre est une information." },
    { tier: "warmup", prompt: "Exécute à la main : entrée 5 ; « ajoute 2 ; multiplie par 4 ; retire 3 ». Quelle sortie ?", solution: "$5 \\to 7 \\to 28 \\to $ **25** — dérouler instruction par instruction, sans sauter." },
    { tier: "application", prompt: "Écris avec une répétition la séquence qui trace un carré de côté 5.", solution: "**Répète 4 fois [avance de 5 ; tourne à droite]** — la boucle compacte les quatre côtés identiques." },
    { tier: "challenge", prompt: "Produis la séquence d'un chemin sur quadrillage : du départ, 3 cases à droite puis 2 cases en haut, en n'utilisant que → et ↑, puis compacte-la.", solution: "→ → → ↑ ↑ — compactée : **répète 3 fois [→] puis répète 2 fois [↑]** — produire, c'est écrire pour un exécutant aveugle." },
    { tier: "exam", prompt: "Deux camarades exécutent ta séquence de chemin et n'arrivent pas au même endroit. Qui est en faute, et quel est le critère d'une bonne séquence ?", solution: "La **séquence** : une instruction ambiguë (départ non fixé, « tourne » sans côté, pas non précisé) a permis deux lectures. Critère : chaque instruction n'a qu'**une** exécution possible — le même critère que tes programmes de construction en géométrie." },
  ],
  practice: [
    { tier: "warmup", label: "Dérouler la séquence", make: (r) => {
      const add = randint(r, 2, 7), mul = pick(r, [2, 3, 4]), sub = randint(r, 1, 6);
      const n = randint(r, 3, 12);
      return { prompt: `Entrée : ${n}. Séquence : « ajoute ${add} ; multiplie par ${mul} ; retire ${sub} ». Quelle sortie ?`, answer: (n + add) * mul - sub, solution: `$${n} \\to ${n + add} \\to ${(n + add) * mul} \\to $ **${(n + add) * mul - sub}**.` };
    } },
    { tier: "application", label: "Compter la boucle", make: (r) => {
      const q = pick(r, [["un carré", 4], ["un triangle équilatéral", 3], ["un hexagone régulier", 6], ["un pentagone régulier", 5]]);
      return { prompt: `Pour tracer ${q[0]}, combien de fois répéter [avance ; tourne] ?`, answer: q[1], solution: `**${q[1]} fois** — une répétition par côté.` };
    } },
  ],
};

export default [sequences];
