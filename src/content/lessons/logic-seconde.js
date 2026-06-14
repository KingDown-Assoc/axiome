// Field "Logic" — HIGH module (seconde year): sets-and-logic and Python.
// Official programme (transversal sections): element, subset, empty set,
// membership and inclusion, union, intersection, complement, the symbols Ø ∈ ⊂
// ∩ ∪ {…}, Card(A), couples and cartesian products; propositions, the
// connectors and/or, negation of simple propositions, COUNTEREXAMPLES,
// implication and logical equivalence, converse and CONTRAPOSITIVE,
// universal/existential statements in natural language (∀ ∃ off-programme),
// reasoning by CASE DISJUNCTION and BY CONTRADICTION. Python: typed variables
// (int, float, bool, str), assignment, conditionals, bounded (for) and
// unbounded (while) loops, FUNCTIONS with one or several arguments, random
// functions and repeated independent experiments (no list knowledge required).
import { randint, pick } from "../../core/exercises.js";

// — Sets and logic (programme: vocabulaire ensembliste et logique) —
const ensemblesLogique = {
  id: "logic.high.ensembles-logique",
  level: "high", domain: "logic",
  title: "Ensembles et logique",
  tagline: "∈, ⊂, ∩, ∪ — et les raisonnements qui portent toutes les démonstrations.",
  prereqs: ["geometry.middle.pythagore-reciproque", "probability.middle.union-intersection"],
  intuition:
    "Les symboles que tu fréquentes depuis le collège prennent leurs galons : $x \\in A$ (appartenir), $A \\subset B$ (être inclus), $A \\cap B$ (et), $A \\cup B$ (ou), $\\bar{A}$ (le complémentaire), $\\varnothing$ (l'ensemble vide), $\\text{Card}(A)$ (compter).\n\nEt la logique s'outille : implication, équivalence, contraposée, **contre-exemple** — la boîte du démonstrateur, enfin étiquetée.",
  depths: {
    discovery:
      "**Avec les mains** : distinguer $\\in$ et $\\subset$ — $2 \\in \\{1, 2, 3\\}$ (un **élément** appartient), $\\{1, 2\\} \\subset \\{1, 2, 3\\}$ (un **ensemble** est inclus). Le « ou » mathématique est **inclusif** : $x \\in A \\cup B$ accepte ceux qui sont dans les deux — pas de « fromage ou dessert » ici. Et $\\text{Card}(\\{a, b, c\\}) = 3$ : compter est devenu une fonction.",
    standard:
      "**En image** : l'arsenal logique — une **implication** $P \\Rightarrow Q$ ; sa **réciproque** $Q \\Rightarrow P$ (un énoncé neuf, à prouver à part — ta 4e le savait) ; sa **contraposée** $\\text{non-}Q \\Rightarrow \\text{non-}P$ (équivalente, gratuite) ; l'**équivalence** $P \\iff Q$ quand l'implication et sa réciproque tiennent toutes deux. Et pour tuer un « pour tout » : **un seul contre-exemple** suffit — « tout multiple de 3 est impair » meurt sur 6.",
    advanced:
      "**Dans la tête** : les deux grands raisonnements — la **disjonction de cas** : pour prouver que $n(n+1)$ est toujours pair, traite $n$ pair puis $n$ impair (dans chaque cas, un facteur pair) : les cas couvrent tout, la preuve est complète. L'**absurde** : suppose le contraire, déduis jusqu'à la contradiction — ta preuve de $\\sqrt{2}$ en est le monument. Négations utiles : non-(et) $=$ ou des négations, non-(ou) $=$ et des négations ; et nier « tous les chats sont gris » donne « **il existe** un chat non gris » — pas « aucun chat n'est gris » : la négation des quantificateurs est le piège favori des correcteurs.",
  },
  keyIdea: "$\\in$ pour un élément, $\\subset$ pour un ensemble ; « ou » inclusif. Contraposée $\\equiv$ l'énoncé, réciproque $=$ un énoncé neuf ; un **contre-exemple** tue un « pour tout » ; disjonction de cas et absurde complètent la boîte.",
  why:
    "Pourquoi un chapitre sur des symboles ? Parce que la logique est la **syntaxe des mathématiques** : confondre une implication et sa réciproque, croire qu'un exemple prouve un « pour tout », mal nier un énoncé — ce sont les fautes qui invalident des copies entières, en maths et ailleurs (un raisonnement juridique ou médical se plante exactement aux mêmes endroits). La seconde nomme les règles du jeu ; toutes les démonstrations à venir y joueront.",
  examples: [
    { title: "∈ contre ⊂", steps: [
      { p: "$2 \\in \\{1, 2, 3\\}$ : un élément **appartient** ; $\\{1, 2\\} \\subset \\{1, 2, 3\\}$ : un ensemble **est inclus**." },
      { p: "Mélanger les deux est la faute de frappe logique la plus courante — l'élément entre, l'ensemble s'emboîte." },
    ] },
    { title: "Le contre-exemple exécuteur", steps: [
      { p: "« Tout multiple de 3 est impair » — candidat : 6, multiple de 3 et pair." },
      { p: "**Un** contre-exemple suffit : la proposition est fausse — l'infini d'exemples ne prouve rien, un seul raté détruit tout." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Complète avec $\\in$ ou $\\subset$ : $5 \\;?\\; \\mathbb{N}$ ; $\\mathbb{N} \\;?\\; \\mathbb{Z}$ ; $\\{2, 4\\} \\;?\\; \\{1, 2, 3, 4\\}$ ; $2 \\;?\\; \\{1, 2\\}$.", solution: "$5 \\in \\mathbb{N}$ ; $\\mathbb{N} \\subset \\mathbb{Z}$ ; $\\{2, 4\\} \\subset \\{1, 2, 3, 4\\}$ ; $2 \\in \\{1, 2\\}$ — l'élément appartient, l'ensemble s'inclut : deux verbes, deux symboles." },
    { tier: "warmup", prompt: "La proposition « tout multiple de 3 est impair » est-elle vraie ? Justifie selon les règles du métier.", solution: "**Fausse** : 6 est multiple de 3 et pair — un **contre-exemple** suffit à réfuter un « pour tout » (alors qu'aucune liste d'exemples favorables n'aurait suffi à le prouver : l'asymétrie fondamentale de la logique)." },
    { tier: "application", prompt: "Soit P : « $n$ est multiple de 4 » et Q : « $n$ est pair ». L'implication $P \\Rightarrow Q$ est-elle vraie ? Sa réciproque ? Sa contraposée ?", solution: "$P \\Rightarrow Q$ : **vraie** ($n = 4k = 2(2k)$). Réciproque $Q \\Rightarrow P$ : **fausse** — contre-exemple : 6, pair mais pas multiple de 4. Contraposée « $n$ impair $\\Rightarrow$ $n$ pas multiple de 4 » : **vraie**, gratuitement — elle dit la même chose que $P \\Rightarrow Q$ par l'autre porte." },
    { tier: "challenge", prompt: "Nie les propositions : « $x \\geq 3$ et $x < 7$ » ; « tous les élèves ont rendu leur copie ».", solution: "« $x < 3$ **ou** $x \\geq 7$ » — la négation échange et/ou et retourne chaque inégalité ; « **il existe** un élève qui n'a pas rendu sa copie » — nier un « tous » donne un « il existe », jamais un « aucun » : le piège classique, désamorcé." },
    { tier: "exam", prompt: "Démontre par disjonction de cas que pour tout entier $n$, le produit $n(n + 1)$ est pair — et explique pourquoi les cas traités suffisent.", solution: "**Cas 1** — $n$ pair : $n = 2k$, donc $n(n+1) = 2k(n+1)$ : le facteur 2 est exhibé, pair. **Cas 2** — $n$ impair : $n + 1$ est pair, $n + 1 = 2k$, donc $n(n+1) = 2kn$ : pair. Tout entier est pair **ou** impair — les deux cas couvrent $\\mathbb{Z}$ sans trou : la conclusion vaut pour tous. La disjonction de cas est légitime exactement quand les cas épuisent l'univers — c'est la clause à vérifier avant de signer." },
  ],
  practice: [
    { tier: "warmup", label: "Le bon symbole", make: (r) => {
      const cas = pick(r, [["5", "\\{1, 5, 9\\}", 1], ["\\{2\\}", "\\{1, 2, 3\\}", 2], ["7", "\\mathbb{N}", 1], ["\\mathbb{D}", "\\mathbb{Q}", 2]]);
      return { prompt: `$${cas[0]} \\;?\\; ${cas[1]}$ — quel symbole ? (1 = ∈, 2 = ⊂)`, answer: cas[2], solution: `**${cas[2] === 1 ? "∈ — un élément appartient" : "⊂ — un ensemble s'inclut"}**.` };
    } },
    { tier: "application", label: "Le contre-exemple", make: (r) => {
      const cas = pick(r, [["tout multiple de 3 est impair", 6], ["tout nombre pair est multiple de 4", 6], ["tout entier est positif", -1], ["tout carré est pair", 9]]);
      return { prompt: `« ${cas[0].charAt(0).toUpperCase() + cas[0].slice(1)} » — lequel de ces nombres la réfute : ${[cas[1], cas[1] + 7, cas[1] * 2 + 1].sort((u, v) => u - v).join(", ")} ?`, answer: cas[1], solution: `**${cas[1]}** — un seul contre-exemple, et le « tout » s'effondre.` };
    } },
    { tier: "challenge", label: "Compter l'union", make: (r) => {
      const ca = randint(r, 3, 8); const cb = randint(r, 3, 8); const inter = randint(r, 1, Math.min(ca, cb) - 1);
      return { prompt: `$\\text{Card}(A) = ${ca}$, $\\text{Card}(B) = ${cb}$, $\\text{Card}(A \\cap B) = ${inter}$ : que vaut $\\text{Card}(A \\cup B)$ ?`, answer: ca + cb - inter, solution: `$${ca} + ${cb} - ${inter} = $ **${ca + cb - inter}** — ta formule du « ou » de 3e, version comptage.` };
    } },
  ],
};

// — Python (programme: variables typées, for/while, fonctions, random) —
const python = {
  id: "logic.high.python",
  level: "high", domain: "logic",
  title: "Python : du langage naturel au programme",
  tagline: "def, return, for, while — tes algorithmes du collège parlent enfin une vraie langue.",
  prereqs: ["logic.middle.boucle-conditionnelle"],
  intuition:
    "Tout ce que tu écrivais en français structuré depuis la 5e a une traduction officielle : **Python**. « Mettre $s + 3$ dans $s$ » devient `s = s + 3` ; « tant que » devient `while` ; « répéter pour chaque » devient `for`.\n\nEt la grande nouveauté : la **fonction** — `def f(x): return 2*x + 3` — ta machine mathématique, écrite en code.",
  depths: {
    discovery:
      "**Avec les mains** : les variables ont un **type** — `7` est un entier (int), `2.5` un flottant (float, avec le **point**, pas la virgule !), `True` un booléen, `'bonjour'` une chaîne (str). L'affectation `s = s + 3` n'est pas une équation : c'est ton « mettre dans » de 4e — lire à droite, écrire à gauche, écraser l'ancien.",
    standard:
      "**En image** : les deux boucles traduites — `for i in range(5):` répète exactement 5 fois ($i$ parcourt $0, 1, 2, 3, 4$ — **de 0 à 4**, le 5 exclu : le piège du range !) ; `while s < 20:` répète tant que la condition tient — ton tant-que de 3e, mot pour mot. Et la conditionnelle : `if x >= 18:` … `else:` — avec l'**indentation** (le décalage) qui délimite les blocs : en Python, la mise en page **est** la structure.",
    advanced:
      "**Dans la tête** : la fonction boucle la boucle — `def f(x): return 2*x + 3` définit la machine, `f(5)` l'appelle (réponse 17) : ta notation $f(x)$ de 3e, exécutable. Plusieurs arguments ? `def prix(n, pu): return n * pu`. Et le hasard entre en scène : `random()` renvoie un réel aléatoire de $[0, 1[$, `randint(1, 6)` lance un dé — répète l'appel mille fois dans une boucle qui cumule, et la fréquence du 6 se stabilise vers $\\frac{1}{6}$ : ta loi des grands nombres de 3e, **simulée par tes soins**. Le programme n'illustre plus les maths : il les expérimente.",
  },
  keyIdea: "Types : int, float (point décimal !), bool, str. `for i in range(n)` : $n$ tours, de 0 à $n - 1$ ; `while` : tant que. **`def f(x): return …`** : la fonction mathématique exécutable — et `randint` simule le hasard.",
  why:
    "Pourquoi un vrai langage, quand le français structuré suffisait ? Parce qu'un programme qui **tourne** ne pardonne rien : la machine exécute ce qui est écrit, pas ce qu'on voulait dire — la rigueur cesse d'être une vertu pour devenir une nécessité physique. Et la récompense est immense : simuler mille expériences, balayer mille valeurs, vérifier mille cas — Python est le laboratoire des mathématiques du lycée.",
  examples: [
    { title: "La machine en code", steps: [
      { p: "`def f(x): return 2*x + 3` — la définition ; `f(5)` — l'appel : **17**." },
      { p: "Ta notation $f(x)$ de 3e, devenue exécutable : définir une fois, appeler mille fois." },
    ] },
    { title: "Le piège du range", steps: [
      { p: "`for i in range(5):` fait parcourir à $i$ les valeurs $0, 1, 2, 3, 4$." },
      { p: "Cinq tours, mais **jamais le 5** : range(n) s'arrête à $n - 1$ — l'erreur d'un cran, classique mondial." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne le type Python de : `7` ; `2.5` ; `True` ; `'2.5'`. Pourquoi le dernier n'est-il pas un nombre ?", solution: "**int** ; **float** ; **bool** ; **str** — les guillemets font la chaîne : `'2.5'` est du texte, on ne peut pas l'additionner à un nombre sans conversion. Le type décide des opérations permises." },
    { tier: "warmup", prompt: "Que valent les variables après : `s = 4` puis `s = s + 3` puis `s = s * 2` ? En quoi `s = s + 3` n'est-il pas une équation ?", solution: "$4 \\to 7 \\to $ **14** — chaque affectation lit à droite, écrit à gauche, **écrase** : c'est ton « mettre dans » de 4e, pas une égalité à résoudre ($s = s + 3$ n'aurait pas de solution !)." },
    { tier: "application", prompt: "Traduis en Python : « pour $i$ de 1 à 10, afficher $i^2$ ». Attention au piège du range.", solution: "`for i in range(1, 11): print(i**2)` — range(1, 11) parcourt 1 à **10** (la borne droite est exclue) ; range(10) aurait donné 0 à 9 : l'erreur d'un cran guette à chaque boucle." },
    { tier: "challenge", prompt: "Écris une fonction Python `f` qui renvoie $2x + 3$, puis un programme qui affiche $f(0), f(1), \\ldots, f(5)$.", solution: "`def f(x): return 2*x + 3` puis `for i in range(6): print(f(i))` — la machine définie une fois, appelée six fois : le couple def/for est l'atelier de base du lycée." },
    { tier: "exam", prompt: "On dispose de `randint(1, 6)` qui simule un dé. Écris un programme Python qui lance le dé 1 000 fois, compte les 6 et affiche leur fréquence — et dis ce que la loi des grands nombres fait attendre.", solution: "```\nc = 0\nfor i in range(1000):\n    if randint(1, 6) == 6:\n        c = c + 1\nprint(c / 1000)\n``` — un compteur, une boucle bornée, une conditionnelle : la fréquence affichée tournera autour de $\\dfrac{1}{6} \\approx 0{,}167$, d'autant plus serrée que le nombre de lancers grandit — la stabilisation des fréquences de 3e, vérifiée par ta propre machine : Python est le banc d'essai des probabilités." },
  ],
  practice: [
    { tier: "warmup", label: "Le compte du range", make: (r) => {
      const n = randint(r, 3, 12);
      return { prompt: `Combien de tours fait \`for i in range(${n}):\` — et quelle est la dernière valeur de $i$ ? Réponds par la dernière valeur.`, answer: n - 1, solution: `${n} tours, $i$ de 0 à **${n - 1}** — la borne est toujours exclue.` };
    } },
    { tier: "application", label: "Appeler la machine", make: (r) => {
      const a = randint(r, 2, 5); const b = randint(r, 1, 9); const x = randint(r, 2, 10);
      return { prompt: `\`def f(x): return ${a}*x + ${b}\` — que renvoie \`f(${x})\` ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b}** — la machine $f$ exécute sa formule.` };
    } },
    { tier: "challenge", label: "La trace du programme", make: (r) => {
      const s0 = randint(r, 0, 5); const pas = randint(r, 2, 5); const n = randint(r, 3, 6);
      return { prompt: `\`s = ${s0}\` puis \`for i in range(${n}): s = s + ${pas}\` — valeur finale de \`s\` ?`, answer: s0 + n * pas, solution: `${n} tours de $+${pas}$ : $${s0} + ${n} \\times ${pas} = $ **${s0 + n * pas}**.` };
    } },
  ],
};

export default [ensemblesLogique, python];
