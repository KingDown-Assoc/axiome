// Field "Logic & algorithms" — HIGH module (premiere year): Python lists. The
// official première spécialité programme states that the ONLY new algorithmic
// notion of the year is the LIST: generation in EXTENSION and in COMPREHENSION,
// explicitly linked to set notation; the conditions appearing in comprehensions
// echo the set-builder notation; indexing, appending, traversing; lists of the
// first terms of a sequence; the official algorithm "list of the slopes of the
// secants for a given step" (from the derivation chapter); functions returning
// the mean or standard deviation of a list; MODULAR programming (splitting a
// complex task into simple functions). NOTE: lesson strings use x * x rather
// than the Python power operator to keep content free of literal double
// asterisks (the renderer reserves those for bold).
import { randint, pick } from "../../core/exercises.js";

const listes = {
  id: "logic.high.listes",
  level: "high", domain: "logic",
  title: "Python : les listes",
  tagline: "Une variable qui en contient mille — et la compréhension qui écrit les ensembles.",
  prereqs: ["logic.high.python"],
  intuition:
    "Tes variables de seconde stockaient **un** nombre ; la **liste** en range autant qu'on veut : notes = [12, 15, 9, 17] — la seule notion nouvelle d'algorithmique de l'année, et elle change tout.\n\nIndexée depuis **zéro** (notes[0] vaut 12), extensible (append), parcourable (for) : la liste est le tableau de valeurs, la série statistique, la suite numérique — enfin matérialisés.",
  depths: {
    discovery:
      "**Avec les mains** : les gestes de base — créer en **extension** (écrire tout : L = [1, 2, 3]), lire par l'**indice** (L[0] est le premier, L[2] le troisième : zéro d'abord !), allonger (L.append(4)), mesurer (len(L)), parcourir (pour x dans L : …) — quatre verbes, et toute collection de nombres t'obéit.",
    standard:
      "**En image** : la création en **compréhension** — [x * x pour x dans range(10)] fabrique les dix premiers carrés en une ligne : c'est l'écriture ensembliste $\\{x^2 \\mid x \\in E\\}$ devenue exécutable, condition comprise ([x pour x dans L si x > 10] : le filtre de tes ensembles de seconde !). Et les **suites** se matérialisent : la liste des premiers termes de $u_{n+1} = 1{,}03\\,u_n$ se construit terme à terme (calculer, append, recommencer) — Syracuse et Fibonacci tiennent en cinq lignes.",
    advanced:
      "**Dans la tête** : la liste au service de l'analyse — l'algorithme officiel du chapitre de dérivation : la **liste des pentes des sécantes** pour un pas qui fond (pentes = [(f(a + h) - f(a)) / h pour h dans [0.1, 0.01, 0.001, …]]) — et tu *vois* la convergence vers $f'(a)$ dans la liste affichée : l'analyse expérimentale. Côté statistiques, les fonctions **moyenne(L)** (somme / longueur) et **ecart_type(L)** (racine de la moyenne des carrés d'écarts) traitent n'importe quelle série — et la **modularité** assemble : une fonction simule un échantillon, une autre calcule sa moyenne, une troisième répète mille fois — découper une tâche complexe en fonctions simples qui s'appellent : c'est la programmation adulte, et ton échantillonnage de probabilités tourne exactement ainsi.",
  },
  keyIdea: "Extension [1, 2, 3] ou **compréhension** [x * x pour x dans range(n)] — l'écriture ensembliste $\\{x^2 \\mid x \\in E\\}$, exécutable, filtres compris. Indice depuis **0**, append pour allonger, for pour parcourir — et la **modularité** : des petites fonctions qui s'assemblent.",
  why:
    "Pourquoi une structure de données mérite-t-elle une leçon de maths ? Parce que la liste **est** l'objet mathématique incarné : la suite (ses premiers termes), la série statistique (ses valeurs), l'échantillon simulé (ses tirages), le tableau de valeurs d'une fonction — quatre chapitres du programme tiennent dans une paire de crochets. Et la compréhension referme la boucle : la notation des ensembles, apprise en seconde comme un langage, devient un programme qui s'exécute — penser en ensembles, c'est déjà coder.",
  examples: [
    { title: "La compréhension ensembliste", steps: [
      { p: "$\\{x^2 \\mid x \\in \\{0, \\ldots, 9\\}\\}$ s'écrit : carres = [x * x pour x dans range(10)]." },
      { p: "Avec filtre : [x pour x dans L si x > 10] — la condition de tes ensembles, exécutable." },
    ] },
    { title: "Les pentes qui convergent", steps: [
      { p: "pentes = [(f(2 + h) - f(2)) / h pour h dans [0.1, 0.01, 0.001]] avec f la fonction carré." },
      { p: "Affiche [4.1, 4.01, 4.001] — la liste *montre* la convergence vers $f'(2) = 4$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "L = [12, 15, 9, 17] : que valent L[0], L[3] et len(L) ? Et que fait L.append(20) ?", solution: "L[0] vaut **12** (l'indice part de zéro !), L[3] vaut **17** (le quatrième), len(L) vaut **4** — et append(20) allonge : L devient [12, 15, 9, 17, 20] : lire, mesurer, étendre — les trois gestes." },
    { tier: "warmup", prompt: "Écris en compréhension : la liste des dix premiers carrés, puis la liste des éléments de L supérieurs à 10. Quel lien avec la notation des ensembles ?", solution: "[x * x pour x dans range(10)] et [x pour x dans L si x > 10] — c'est l'écriture $\\{x^2 \\mid x \\in E\\}$ et $\\{x \\in L \\mid x > 10\\}$ devenue exécutable : la **compréhension** porte le même nom dans les deux mondes, condition (le filtre si) comprise." },
    { tier: "application", prompt: "Décris (en français structuré) la construction de la liste des 10 premiers termes de la suite $u_{n+1} = 1{,}03\\,u_n$, $u_0 = 1000$.", solution: "« L ← [1000] ; pour i de 1 à 9 : ajouter à L la valeur 1,03 × dernier élément de L » — calculer, **append**, recommencer : la suite par récurrence se matérialise terme à terme, et L affiche le capital année par année." },
    { tier: "challenge", prompt: "Écris la fonction moyenne(L), puis explique comment ecart_type(L) la réutilise — et pourquoi ce découpage en deux fonctions est meilleur qu'une seule grosse.", solution: "moyenne(L) : renvoyer somme(L) / len(L). Puis ecart_type(L) : m ← moyenne(L) ; renvoyer racine de moyenne([(x − m) * (x − m) pour x dans L]) — la seconde **appelle** la première (deux fois le même concept, un seul code !) : c'est la **modularité** — chaque fonction fait une chose, se teste seule, se réutilise partout : la tâche complexe découpée en briques simples." },
    { tier: "exam", prompt: "L'algorithme officiel de la dérivation : construis (en français structuré ou Python) la liste des pentes des sécantes de la fonction carré en $a = 2$ pour les pas h = 0,1 ; 0,01 ; 0,001 ; 0,0001 — donne les valeurs affichées et interprète.", solution: "pentes = [((2 + h) * (2 + h) − 4) / h pour h dans [0.1, 0.01, 0.001, 0.0001]] — affichage : **[4,1 ; 4,01 ; 4,001 ; 4,0001]** : chaque pente vaut $4 + h$ (ton calcul du taux !), et la liste *montre* la convergence vers $f'(2) = 4$ quand le pas fond — la limite, observée expérimentalement : l'algorithme du programme fait dialoguer la liste (l'outil) et le nombre dérivé (le concept), et c'est exactement à ça que sert l'informatique en mathématiques." },
  ],
  practice: [
    { tier: "warmup", label: "L'indice qui part de zéro", make: (r) => {
      const L = [randint(r, 5, 20), randint(r, 5, 20), randint(r, 5, 20), randint(r, 5, 20)];
      const i = randint(r, 0, 3);
      return { prompt: `L = [${L.join(", ")}] : que vaut L[${i}] ?`, answer: L[i], solution: `L'indice ${i} désigne le ${["premier", "deuxième", "troisième", "quatrième"][i]} élément : **${L[i]}** — zéro d'abord !` };
    } },
    { tier: "application", label: "La compréhension exécutée", make: (r) => {
      const n = randint(r, 3, 6);
      return { prompt: `[x * x pour x dans range(${n})] : quel est le dernier élément de la liste ?`, answer: (n - 1) ** 2, solution: `range(${n}) s'arrête à ${n - 1} : dernier carré $${n - 1}^2 = $ **${(n - 1) ** 2}**.` };
    } },
    { tier: "challenge", label: "La liste de la suite", make: (r) => {
      const u0 = randint(r, 2, 6); const q = pick(r, [2, 3]); const n = randint(r, 2, 4);
      return { prompt: `On construit la liste des termes de $u_{n+1} = ${q}\\,u_n$, $u_0 = ${u0}$, par append successifs. Que vaut L[${n}] ?`, answer: u0 * q ** n, solution: `L = [${Array.from({length: n + 1}, (_, i) => u0 * q ** i).join(", ")}] : L[${n}] = **${u0 * q ** n}** — l'indice est l'exposant : $u_0 \\, q^{${n}}$.` };
    } },
  ],
};

export default [listes];
