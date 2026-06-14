// Field "Numbers" — PRIMARY module (CP year). Built on the official cycle-2 programme
// (BO n°41, 31/10/2024) crossed with the Singapore P1 syllabus: CPA progression, verbalized
// procedures, bar-model as the central problem-solving representation.
import { randint, pick } from "../../core/exercises.js";

// — Place value: tens and ones, the base-ten idea (programme: aspect décimal et positionnel) —
const placeValue = {
  id: "numbers.primary.place-value",
  level: "primary", domain: "numbers",
  title: "Dizaines et unités : la base dix",
  tagline: "Faire des paquets de dix, échanger, et lire un nombre d'un coup d'œil.",
  prereqs: ["numbers.preschool.tens-and-ones", "numbers.preschool.crossing-ten"],
  intuition:
    "Compter 34 cubes un par un, c'est long — et on se trompe. Le grand truc du CP : faire des **paquets de dix**.\n\nTrois barres de dix cubes et quatre cubes tout seuls : « **trois dizaines et quatre unités, cela fait trente-quatre** ». Ou : « trente plus quatre ». Ou en comptant : « dix, vingt, trente, trente-et-un… trente-quatre ». Trois chemins, le même nombre.",
  depths: {
    discovery:
      "**Avec les mains** : devant un tas de cubes, je fabrique des barres de dix. Quand je n'ai plus de quoi faire une barre, ce qui reste, ce sont les unités. Dix unités s'**échangent** toujours contre une dizaine — et inversement.",
    standard:
      "**En image** : trois barres et quatre cubes se dessinent, puis s'écrivent **34** — le 3 du côté des dizaines, le 4 du côté des unités. Un tableau à deux colonnes (dizaines | unités) suffit à ranger n'importe quel nombre jusqu'à cent.",
    advanced:
      "**Dans la tête** : la **position** d'un chiffre lui donne sa valeur — c'est pour ça que $23$ et $32$, faits des mêmes chiffres, ne sont pas le même nombre : dans 23 le 2 vaut vingt, dans 32 il vaut deux. Cette idée (la numération de position) est si puissante qu'elle écrira tous les nombres du monde avec dix signes.",
  },
  keyIdea: "Dix unités = une dizaine. La **place** du chiffre dit sa valeur : dans 34, le 3 vaut trente.",
  why:
    "Pourquoi des paquets de **dix** et pas de sept ? Parce qu'on a dix doigts — et surtout parce qu'un seul choix, toujours le même, permet de lire les nombres d'un coup d'œil : pas besoin de recompter, la position raconte tout.",
  widgets: [
    { kind: "odometer", params: { value: 34 }, caption: "Bouge les roues : 34, c'est 3 dizaines et 4 unités. Regarde l'échange quand les unités passent 9." },
  ],
  examples: [
    { title: "Dénombrer en organisant", steps: [
      { p: "Un tas de cubes : je forme des barres de dix. J'obtiens 3 barres et 4 cubes isolés." },
      { p: "Je verbalise : « trois dizaines et quatre unités, cela fait **trente-quatre** »." },
    ] },
    { title: "23 n'est pas 32", steps: [
      { p: "Dans **23**, le 2 est à la place des dizaines : il vaut vingt." },
      { p: "Dans **32**, le 2 est à la place des unités : il vaut deux. Mêmes chiffres, nombres différents !" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi fait-on des paquets de dix pour compter un grand tas ?", solution: "Pour **lire** la quantité sans recompter : tant de dizaines, tant d'unités — fini les erreurs du un-par-un." },
    { tier: "warmup", prompt: "3 barres de dix et 4 cubes isolés : combien de cubes ?", solution: "« Trois dizaines et quatre unités, cela fait **trente-quatre** » (34)." },
    { tier: "application", prompt: "Dans 47, que vaut le chiffre 4 ?", solution: "Il est à la place des dizaines : il vaut **quarante**." },
    { tier: "challenge", prompt: "23 et 32 s'écrivent avec les mêmes chiffres. Est-ce le même nombre ? Explique avec la numération.", solution: "**Non** : dans 23 le 2 vaut vingt (dizaines), dans 32 il vaut deux (unités). La place change la valeur." },
    { tier: "exam", prompt: "J'ai 5 barres de dix. J'échange une barre contre des cubes unités. Combien ai-je de dizaines et d'unités ? Le nombre a-t-il changé ?", solution: "**4 dizaines et 10 unités** — et c'est toujours **50** : l'échange change la forme, pas le nombre." },
  ],
  practice: [
    { tier: "warmup", label: "Lire dizaines et unités", make: (r) => {
      const d = randint(r, 2, 9), u = randint(r, 0, 9);
      return { prompt: `${d} dizaines et ${u} unités, c'est quel nombre ?`, answer: 10 * d + u, solution: `${d} dizaines, c'est ${10 * d} ; et ${u} unités : **${10 * d + u}**.` };
    } },
    { tier: "application", label: "La valeur du chiffre", make: (r) => {
      const d = randint(r, 1, 9), u = randint(r, 0, 9); const n = 10 * d + u;
      return { prompt: `Dans ${n}, que vaut le chiffre ${d} ?`, answer: 10 * d, solution: `Il est à la place des dizaines : il vaut **${10 * d}**.` };
    } },
  ],
};

// — Numbers to one hundred (programme: suite écrite et orale, représentations, comparaison, ordinaux) —
const toHundred = {
  id: "numbers.primary.to-100",
  level: "primary", domain: "numbers",
  title: "Les nombres jusqu'à cent",
  tagline: "Les dire, les écrire, les comparer, les placer — dans tous les sens.",
  prereqs: ["numbers.primary.place-value"],
  intuition:
    "Au CP, les nombres vont jusqu'à **cent** — et on apprend à se promener dedans : compter de 1 en 1, de **2 en 2**, de **10 en 10**, en partant de n'importe où, et même **à rebours**.\n\nUn même nombre a plusieurs visages : 3 barres et 5 cubes, **35**, « trente-cinq », « trois dizaines et cinq unités », $30 + 5$, et en lettres : *trente-cinq*. Savoir passer d'un visage à l'autre, c'est le connaître vraiment.",
  depths: {
    discovery:
      "**Avec les mains** : sur la bande numérique géante, je saute de 10 en 10 à partir de 37 : « quarante-sept, cinquante-sept, soixante-sept… ». Et à rebours depuis 23 : « vingt-deux, vingt-et-un, vingt ».",
    standard:
      "**En image** : sur la demi-droite graduée de un en un, chaque nombre a son point — plus on va à droite, plus c'est grand. Pour comparer 49 et 53, je regarde d'abord les **dizaines** : 4 dizaines contre 5, donc $49 < 53$. Les symboles $<$, $>$ et $=$ écrivent la comparaison.",
    advanced:
      "**Dans la tête** : le nombre garde aussi sa fonction de **rang** : les ordinaux vont jusqu'à « vingtième ». Si je suis troisième dans la file, il y a **deux** personnes devant moi — le rang et le nombre de précédents diffèrent toujours de un. Et dans la suite répétitive ABAB…, la 19e lettre se trouve **sans tout écrire** : la règle suffit.",
  },
  keyIdea: "Un nombre a plusieurs écritures (35 = trente-cinq = 30 + 5 = 3 d et 5 u) ; pour comparer, on regarde **d'abord les dizaines**.",
  why:
    "Pourquoi comparer par les dizaines d'abord ? Parce qu'une dizaine pèse plus que toutes les unités possibles : 5 dizaines battent 4 dizaines, peu importe les unités derrière. La numération transforme la comparaison en simple coup d'œil.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 12, value: 7 }, caption: "La demi-droite graduée : chaque nombre est un point, à sa distance de l'origine." },
  ],
  examples: [
    { title: "Aaron et Mia", steps: [
      { p: "Aaron a 49 trombones, Mia en a 53. Qui en a le plus ?" },
      { p: "4 dizaines contre 5 dizaines : $49 < 53$ → **Mia**." },
    ] },
    { title: "Compter de 10 en 10 depuis 37", steps: [
      { p: "« 37, 47, 57, 67, 77 » — seules les dizaines bougent, les unités restent." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Compte de 10 en 10 à partir de 37, jusqu'à 77.", solution: "37, 47, 57, 67, **77** : à chaque saut, une dizaine de plus." },
    { tier: "warmup", prompt: "Place le bon symbole entre 49 et 53 : $<$, $>$ ou $=$ ?", solution: "$49 < 53$ : 4 dizaines, c'est moins que 5 dizaines." },
    { tier: "application", prompt: "Écris 35 de trois façons différentes.", solution: "« trente-cinq » ; $30 + 5$ ; **3 dizaines et 5 unités** (ou en lettres : trente-cinq)." },
    { tier: "challenge", prompt: "Range dans l'ordre croissant : 61, 16, 60, 19, 91.", solution: "**16, 19, 60, 61, 91** — d'abord les dizaines (1, 1, 6, 6, 9), puis les unités pour départager." },
    { tier: "exam", prompt: "Six personnes font la queue ; je suis troisième. Combien y a-t-il de personnes devant moi ?", solution: "**2** : le rang et le nombre de précédents diffèrent toujours de un." },
    { tier: "exam", prompt: "Dans la suite répétitive A B A B A B…, quelle est la dix-neuvième lettre ?", solution: "**A** : les rangs impairs (1, 3, 5…) portent A, et 19 est impair — la règle évite d'écrire toute la suite." },
  ],
  practice: [
    { tier: "warmup", label: "Dix de plus, dix de moins", make: (r) => {
      const n = randint(r, 15, 85); const plus = r() < 0.5;
      return plus
        ? { prompt: `Quel nombre vaut dix de plus que ${n} ?`, answer: n + 10, solution: `J'ajoute une dizaine : **${n + 10}**.` }
        : { prompt: `Quel nombre vaut dix de moins que ${n} ?`, answer: n - 10, solution: `J'enlève une dizaine : **${n - 10}**.` };
    } },
    { tier: "application", label: "Comparer", make: (r) => {
      let a = randint(r, 11, 99), b = randint(r, 11, 99); if (a === b) b = a + 1;
      const ans = a < b ? "<" : ">";
      return { prompt: `Quel symbole entre ${a} et ${b} : < ou > ?`, answer: ans, check: { type: "exact" }, solution: `On compare les dizaines d'abord : $${a} ${ans} ${b}$.` };
    } },
  ],
};

// — Addition facts: tables, doubles, halves (programme: mémoriser des faits numériques) —
const additionFacts = {
  id: "numbers.primary.addition-facts",
  level: "primary", domain: "numbers",
  title: "Les tables d'addition",
  tagline: "Connaître les sommes par cœur — dans les deux sens, et à toute vitesse.",
  prereqs: ["numbers.preschool.complements", "numbers.preschool.doubles"],
  intuition:
    "Tu connais déjà presque tout : les décompositions de la maternelle **deviennent** les tables d'addition, écrites maintenant avec « $+$ » et « $=$ ».\n\nLe but du CP : les connaître **dans les deux sens** — répondre à $5 + 3 = \\,?$ mais aussi à $4 + \\,? = 12$ — et de plus en plus vite. Repère officiel de fin d'année : huit égalités à trous en une minute !",
  depths: {
    discovery:
      "**Avec les mains** : je reconstruis un fait avec les doigts ou le dix-cadre — $7 + 3$ : sept jetons, le cadre montre les trois qui manquent pour dix.",
    standard:
      "**En image** : la table se lit dans les deux sens. $4 + 8 = 12$ donne aussi « $4 + \\,? = 12$ → 8 » et « $12 = 4 + \\,?$ → 8 ». Les **doubles** (de 1 à 10, et des dizaines : $30 + 30 = 60$) et les **moitiés** (des pairs jusqu'à 20, et de 40, 60, 80, 100) sont les faits vedettes.",
    advanced:
      "**Dans la tête** : chaque fait connu en engendre d'autres — si je sais $6 + 6 = 12$, alors $6 + 7$ c'est « un de plus » : 13 (le presque-double). Mémoriser peu, déduire beaucoup : c'est la vraie fluence.",
  },
  keyIdea: "Une table sue **dans les deux sens** : $5 + 3 = 8$, donc $5 + \\,? = 8$ → 3, et $8 = 3 + \\,?$ → 5.",
  why:
    "Pourquoi mémoriser, alors qu'on sait compter sur ses doigts ? Parce qu'un fait restitué d'un coup libère la tête pour le reste du problème. Compter use l'attention ; savoir la garde intacte.",
  widgets: [
    { kind: "tenframe", params: { count: 7, target: 10 }, caption: "Le dix-cadre : 7 jetons posés, 3 cases vides — le fait 7 + 3 = 10 se voit." },
  ],
  examples: [
    { title: "L'égalité à trous", steps: [
      { p: "$4 + \\,? = 12$ : je cherche ce qui complète 4 jusqu'à 12." },
      { p: "Je sais $4 + 8 = 12$ → la réponse est **8**." },
    ] },
    { title: "Le presque-double", steps: [
      { p: "$6 + 7$ : c'est $6 + 6$ « et encore un »." },
      { p: "$12 + 1 = $ **13**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que veut dire « connaître $5 + 3 = 8$ dans les deux sens » ?", solution: "Savoir répondre à $5 + 3 = \\,?$ **et** à $5 + \\,? = 8$ (ou $8 = \\,? + 3$) : la même table, lue dans tous les sens." },
    { tier: "warmup", prompt: "Complète : $4 + \\,? = 12$.", solution: "**8**, car $4 + 8 = 12$." },
    { tier: "application", prompt: "Quel est le double de 40 ? Et la moitié de 60 ?", solution: "Double de 40 = **80** (4 dizaines et 4 dizaines). Moitié de 60 = **30**." },
    { tier: "challenge", prompt: "Tu sais que $7 + 7 = 14$. Combien font $7 + 8$, sans compter sur tes doigts ?", solution: "**15** : c'est le double de 7, « et encore un »." },
    { tier: "exam", prompt: "Complète : $10 = 7 + \\,?$ puis $13 - 7 = \\,?$. Que remarques-tu ?", solution: "$10 = 7 + $ **3** ; $13 - 7 = $ **6**. La deuxième se déduit aussi des tables : c'est $7 + \\,? = 13$." },
  ],
  practice: [
    { tier: "warmup", label: "Égalités à trous", make: (r) => {
      const a = randint(r, 2, 10), b = randint(r, 2, 10);
      return { prompt: `Complète : $${a} + \\,? = ${a + b}$`, answer: b, solution: `$${a} + ${b} = ${a + b}$ → **${b}**.` };
    } },
    { tier: "application", label: "Doubles et moitiés", make: (r) => {
      if (r() < 0.5) { const n = pick(r, [3, 4, 6, 7, 8, 9, 20, 30, 40, 50]); return { prompt: `Quel est le double de ${n} ?`, answer: n + n, solution: `${n} et ${n} font **${n + n}**.` }; }
      const m = pick(r, [4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100]);
      return { prompt: `Quelle est la moitié de ${m} ?`, answer: m / 2, solution: `${m / 2} et ${m / 2} font ${m} → la moitié de ${m} est **${m / 2}**.` };
    } },
  ],
};

// — Mental calculation strategies (programme: numération + procédures de calcul mental) —
const mentalStrategies = {
  id: "numbers.primary.mental-strategies",
  level: "primary", domain: "numbers",
  title: "Le calcul mental malin",
  tagline: "S'appuyer sur les dizaines pour calculer vite — et sans les doigts.",
  prereqs: ["numbers.primary.addition-facts", "numbers.primary.place-value"],
  intuition:
    "Pour calculer $76 - 30$, inutile de reculer trente fois ! Je pense en **dizaines** : « 30, c'est 3 dizaines. 7 dizaines moins 3 dizaines, 4 dizaines. Donc $76 - 30 = 46$. »\n\nLe calcul mental du CP, c'est ça : utiliser la numération au lieu de compter — et verbaliser sa procédure à voix haute.",
  depths: {
    discovery:
      "**Avec les mains** : ajouter 10, c'est poser **une barre de plus** ; retirer 10, c'est en enlever une. Les unités ne bougent pas : $37 - 10$ → « j'enlève une dizaine aux trois dizaines » → **27**.",
    standard:
      "**En image** : pour ajouter un petit nombre, je passe par la **dizaine d'après**. $47 + 8$ : « de 47 à 50, il faut 3 ; il me reste 5 à ajouter ; $50 + 5 = 55$ ». Sur la droite, ce sont deux sauts : $+3$ puis $+5$. Le complément à la dizaine supérieure se trouve avec le complément à 10 : pour 74, « le complément à 10 de 4 est 6 ».",
    advanced:
      "**Dans la tête** : chaque procédure se choisit selon les nombres. $32 + 4$ : les unités suffisent ($2 + 4 = 6$, donc 36). $47 + 8$ : passage par 50. $76 - 30$ : les dizaines. Savoir **choisir** sa procédure — et l'expliquer — c'est ça, être fort en calcul mental.",
  },
  keyIdea: "Ajouter/retirer 10 = bouger les **dizaines**. Pour un petit nombre : **passer par la dizaine d'après** (deux sauts).",
  why:
    "Pourquoi passer par 50 pour faire $47 + 8$ ? Parce que les dizaines rondes sont des **gares** : tout y est simple. Couper le saut en deux ($+3$ puis $+5$) remplace un calcul dur par deux calculs faciles.",
  examples: [
    { title: "76 − 30, en dizaines", steps: [
      { p: "« 30, c'est 3 dizaines. »" },
      { p: "« 7 dizaines moins 3 dizaines, cela fait 4 dizaines. Donc $76 - 30 = $ **46**. »" },
    ] },
    { title: "47 + 8, par la gare 50", steps: [
      { p: "De 47 à 50, il faut **3** (complément à la dizaine)." },
      { p: "Il reste $8 - 3 = 5$ à ajouter : $50 + 5 = $ **55**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour calculer $37 - 10$, que fais-tu ?", solution: "J'enlève **une dizaine** : « 3 dizaines moins 1 dizaine, 2 dizaines » → **27**. Les unités ne bougent pas." },
    { tier: "warmup", prompt: "Calcule $54 + 10$ puis $54 - 2$.", solution: "$54 + 10 = $ **64** (une dizaine de plus). $54 - 2$ : je recule de 1 et encore de 1 → **52**." },
    { tier: "application", prompt: "Quel est le complément de 74 à la dizaine supérieure ?", solution: "74, c'est 7 dizaines et 4 unités ; le complément à 10 de 4 est **6** → il faut 6 pour atteindre 80." },
    { tier: "challenge", prompt: "Calcule $47 + 8$ en passant par la dizaine. Explique tes deux sauts.", solution: "De 47 à **50** : $+3$. Reste $5$ : $50 + 5 = $ **55**." },
    { tier: "exam", prompt: "Pour $32 + 4$ et pour $76 - 30$, utilises-tu la même procédure ? Pourquoi ?", solution: "**Non** : $32 + 4$ se joue sur les unités ($2 + 4 = 6$ → 36) ; $76 - 30$ sur les dizaines (7 − 3 dizaines → 46). On **choisit** la procédure selon les nombres." },
  ],
  practice: [
    { tier: "warmup", label: "Plus ou moins des dizaines", make: (r) => {
      const n = randint(r, 21, 89); const d = randint(r, 1, Math.min(5, Math.floor(n / 10))); const plus = r() < 0.5 && n + 10 * d <= 99;
      return plus
        ? { prompt: `Calcule $${n} + ${10 * d}$.`, answer: n + 10 * d, solution: `${10 * d}, c'est ${d} dizaine(s) de plus : **${n + 10 * d}**.` }
        : { prompt: `Calcule $${n} - ${10 * d}$.`, answer: n - 10 * d, solution: `J'enlève ${d} dizaine(s) : **${n - 10 * d}**.` };
    } },
    { tier: "application", label: "Le complément à la dizaine", make: (r) => {
      const n = randint(r, 21, 88); const u = n % 10 === 0 ? 0 : 10 - (n % 10); if (u === 0) return { prompt: `Quel est le complément de ${n + 4} à la dizaine supérieure ?`, answer: 6, solution: `Le complément à 10 de 4 est **6**.` };
      return { prompt: `Quel est le complément de ${n} à la dizaine supérieure ?`, answer: u, solution: `Le complément à 10 de ${n % 10} est **${u}** : $${n} + ${u} = ${n + u}$.` };
    } },
  ],
};

// — Meaning of +, −, = and the inverse relationship (programme: sens des opérations et symboles) —
const symbolsMeaning = {
  id: "numbers.primary.add-sub-meaning",
  level: "primary", domain: "numbers",
  title: "Les symboles +, − et =",
  tagline: "Trois petits signes très puissants — et un piège célèbre à éviter.",
  prereqs: ["numbers.preschool.add-subtract"],
  intuition:
    "Au CP, les gestes de la maternelle s'écrivent : ajouter devient « $+$ », retirer devient « $-$ », et « $=$ » dit que les deux côtés ont **la même valeur**.\n\nEt les deux opérations sont des inverses : si $32 + 15 = 47$, alors $47 - 32 = 15$ et $47 - 15 = 32$ — une seule histoire, trois égalités.",
  depths: {
    discovery:
      "**Avec les mains** : je réunis 32 cubes et 15 cubes : 47. Puis j'en retire 15 : me revoilà à 32. Retirer **défait** ce qu'ajouter a fait.",
    standard:
      "**En image** : la famille d'égalités se dessine — un tout (47) et deux parties (32 et 15). Pour l'addition, **l'ordre ne compte pas** ($32 + 15 = 15 + 32$) ; pour la soustraction, **si** : $47 - 15$ n'est pas $15 - 47$.",
    advanced:
      "**Dans la tête** : « $=$ » n'est pas « voici le résultat », c'est « **même valeur des deux côtés** ». Du coup, l'écriture $47 + 3 = 50 + 5 = 55$ est **fausse** : elle prétend que $50 = 55$ ! On écrit en deux temps : $47 + 3 = 50$, puis $50 + 5 = 55$. Respecter le « $=$ », c'est déjà faire de l'algèbre.",
  },
  keyIdea: "$=$ veut dire « même valeur ». Et si $a + b = c$, alors $c - b = a$ : une famille de trois égalités.",
  why:
    "Pourquoi interdire $47 + 3 = 50 + 5 = 55$ alors que « ça marche » ? Parce que le signe $=$ relie tout ce qu'il touche : cette ligne affirme $50 = 55$, qui est faux. Un symbole qui dit parfois vrai, parfois faux, ne sert plus à rien — on le protège.",
  examples: [
    { title: "La famille de 47", steps: [
      { p: "$32 + 15 = 47$." },
      { p: "Donc $47 - 32 = 15$ **et** $47 - 15 = 32$ : trois égalités, une seule histoire de parties et de tout." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie exactement le signe $=$ ?", solution: "« **Même valeur** des deux côtés » — pas seulement « voici le résultat »." },
    { tier: "warmup", prompt: "Sachant $32 + 15 = 47$, donne $47 - 15$ sans calculer.", solution: "**32** : la soustraction défait l'addition." },
    { tier: "application", prompt: "$32 + 15$ et $15 + 32$ : même résultat ? Et $47 - 15$ et $15 - 47$ ?", solution: "Pour $+$, **oui** (l'ordre ne compte pas) : 47. Pour $-$, **non** : l'ordre compte." },
    { tier: "challenge", prompt: "Lina écrit : $47 + 3 = 50 + 5 = 55$. Où est l'erreur ?", solution: "Sa ligne affirme $50 = 55$, ce qui est faux. On écrit **en deux temps** : $47 + 3 = 50$, puis $50 + 5 = 55$." },
    { tier: "exam", prompt: "Écris la famille complète de l'égalité $26 + 13 = 39$.", solution: "$26 + 13 = 39$ ; $13 + 26 = 39$ ; $39 - 13 = 26$ ; $39 - 26 = 13$." },
  ],
  practice: [
    { tier: "application", label: "La famille d'égalités", make: (r) => {
      const a = randint(r, 11, 40), b = randint(r, 11, 40); const c = a + b;
      return { prompt: `Sachant $${a} + ${b} = ${c}$, combien vaut $${c} - ${a}$ ?`, answer: b, solution: `La soustraction défait l'addition : $${c} - ${a} = $ **${b}**.` };
    } },
  ],
};

const columnAddition = {
  id: "numbers.primary.column-addition",
  level: "primary", domain: "numbers",
  title: "L'addition posée (avec retenue)",
  tagline: "Additionner colonne par colonne en gérant la retenue.",
  prereqs: ["numbers.preschool.complements", "numbers.preschool.tens-and-ones"],
  intuition:
    "Quand les nombres sont grands, on les pose l'un sous l'autre, bien alignés : unités sous unités, dizaines sous dizaines.\n\nOn additionne colonne par colonne, **de droite à gauche**. Si une colonne dépasse 9, on « garde » une dizaine pour la colonne suivante : c'est la **retenue** — exactement le complément à 10 qu'on a appris à l'éveil.",
  depths: {
    discovery: "**Avec les mains** : je pose les barres de dix sous les barres, les cubes sous les cubes — puis sur le papier : unités sous unités, dizaines sous dizaines, et j'additionne colonne par colonne, de droite à gauche.",
    standard: "**En image** : l'addition posée s'appuie sur la numération de position. Quand la somme d'une colonne atteint 10 ou plus, j'écris le chiffre des unités et je **reporte** 1 sur la colonne de gauche — dix unités échangées contre une dizaine, comme avec les cubes.",
    advanced: "**Dans la tête** : la retenue traduit le passage à la base dix — on somme les chiffres pondérés par des puissances de $10$, puis on « normalise » pour que chaque chiffre reste dans $\\{0,\\dots,9\\}$. C'est exactement ce que fait un additionneur à propagation de retenue. (Au CP, elle arrive en période 4 ou 5 — d'abord le sens, ensuite la technique.)",
  },
  keyIdea: "Une colonne à gauche vaut **dix fois** plus : 10 unités = 1 dizaine.",
  why:
    "Pourquoi reporter $1$ et pas $10$ ? Parce qu'une colonne plus à gauche vaut dix fois plus. $10$ unités, c'est $1$ dizaine : on remplace dix petites cases par une seule case de la colonne voisine.",
  examples: [
    { title: "Poser 27 + 48", steps: [
      { p: "Unités : $7 + 8 = 15$ → j'écris **5**, je retiens **1**." },
      { p: "Dizaines : $2 + 4 + 1 = 7$ → **75**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien font 6 + 7 ?", solution: "$6 + 7 = 13$." },
    { tier: "challenge", prompt: "Pose et calcule 38 + 47.", solution: "$8+7=15$ (5, retenue 1) ; $3+4+1=8$ → **85**." },
    { tier: "exam", prompt: "Calcule 156 + 247.", solution: "$6+7=13$ (3, r1) ; $5+4+1=10$ (0, r1) ; $1+2+1=4$ → **403**." },
  ],
  practice: [
    { tier: "warmup", label: "Petites additions", make: (r) => { const a = randint(r, 2, 9), b = randint(r, 2, 9); return { prompt: `Combien font ${a} + ${b} ?`, answer: a + b, solution: `$${a} + ${b} = ${a + b}$.` }; } },
    { tier: "application", label: "Additions à deux chiffres", make: (r) => { const a = randint(r, 12, 89), b = randint(r, 12, 89); return { prompt: `Calcule ${a} + ${b}.`, answer: a + b, solution: `$${a} + ${b} = ${a + b}$.` }; } },
  ],
};

// — Subtracting by breaking a ten (programme: soustractions par manipulation et cassage de dizaines) —
const breakTen = {
  id: "numbers.primary.subtract-100",
  level: "primary", domain: "numbers",
  title: "Soustraire en cassant une dizaine",
  tagline: "Quand les unités ne suffisent pas, on casse une barre de dix.",
  prereqs: ["numbers.primary.place-value", "numbers.primary.add-sub-meaning"],
  intuition:
    "Anna avait **43 cerises** ; elle en a mangé **18**. Avec 4 barres de dix et 3 cubes, impossible de retirer 8 unités : je n'en ai que 3…\n\nLe geste qui sauve : **casser une barre** ! 43 devient 3 dizaines et 13 unités — et là, retirer 18 (une dizaine et huit unités) devient possible : il reste **25**.",
  depths: {
    discovery:
      "**Avec les mains** : 4 barres et 3 cubes ; je casse une barre en dix cubes ; j'entoure 18 cubes à retirer ; je compte ce qui reste : 2 barres et 5 cubes, **25**.",
    standard:
      "**En image** : je dessine les barres et les cubes, je barre ce que je retire. Ou je calcule **par étapes** : $43 - 10 = 33$, puis $33 - 8$ en passant par la dizaine : $33 - 3 = 30$, $30 - 5 = 25$.",
    advanced:
      "**Dans la tête** : casser une dizaine, c'est l'**échange** de la numération joué à l'envers (une dizaine ↔ dix unités). C'est exactement ce que fera, au CE1, la **retenue** de la soustraction posée — ici, on la comprend avec les mains avant de l'écrire.",
  },
  keyIdea: "Pas assez d'unités ? On **casse une dizaine** en dix unités — le nombre ne change pas, sa forme si.",
  why:
    "Pourquoi a-t-on le droit de casser ? Parce qu'une dizaine **vaut** dix unités — l'échange ne change pas la quantité, seulement son habillage. C'est le même nombre, présenté autrement, et soudain le retrait devient possible.",
  examples: [
    { title: "Les cerises d'Anna : 43 − 18", steps: [
      { p: "4 barres + 3 cubes. Je casse une barre : 3 barres + 13 cubes." },
      { p: "Je retire 18 : une barre et huit cubes." },
      { p: "Il reste 2 barres + 5 cubes : **25 cerises**." },
    ] },
    { title: "Par étapes, de tête", steps: [
      { p: "$43 - 10 = 33$." },
      { p: "$33 - 8$ : $33 - 3 = 30$, puis $30 - 5 = $ **25**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour retirer 8 unités quand on n'en a que 3, que fait-on ?", solution: "On **casse une dizaine** en dix unités : on en a alors 13, le retrait devient possible." },
    { tier: "warmup", prompt: "Calcule $30 - 4$.", solution: "Je casse une dizaine : 2 dizaines et 10 unités ; $10 - 4 = 6$ → **26**." },
    { tier: "application", prompt: "Calcule $43 - 18$ par étapes.", solution: "$43 - 10 = 33$ ; $33 - 3 = 30$ ; $30 - 5 = $ **25**." },
    { tier: "challenge", prompt: "Casser une dizaine change-t-il le nombre ? Explique.", solution: "**Non** : une dizaine vaut dix unités — 43, c'est aussi 3 dizaines et 13 unités. La forme change, pas la quantité." },
    { tier: "exam", prompt: "Quel geste du CE1 ce « cassage » prépare-t-il ?", solution: "La **retenue** de la soustraction posée : on échangera une dizaine contre dix unités, exactement comme avec les barres." },
  ],
  practice: [
    { tier: "application", label: "Soustraire par étapes", make: (r) => {
      const a = randint(r, 31, 92); const u = a % 10; const b = randint(r, u + 1, Math.min(u + 9, a - 10));
      return { prompt: `Calcule $${a} - ${b}$ (il faudra casser une dizaine).`, answer: a - b, solution: `$${a} - ${u} = ${a - u}$ (j'arrive à la dizaine), puis $${a - u} - ${b - u} = $ **${a - b}**.` };
    } },
  ],
};

// — The bar model (Singapore): drawing the problem before solving it —
const barModelLesson = {
  id: "numbers.primary.bar-model",
  level: "primary", domain: "numbers",
  title: "Le modèle en barres",
  tagline: "Dessiner le problème avant de le calculer — la position du « ? » choisit l'opération.",
  prereqs: ["numbers.preschool.first-problems", "numbers.primary.add-sub-meaning"],
  intuition:
    "Voici l'outil-star de la méthode de Singapour : avant de calculer, on **dessine le problème en barres**.\n\nUne grande barre pour le **tout**, des morceaux pour les **parties**. Ce qu'on cherche porte un « **?** » — et sa **place** dans le dessin dit quoi faire : le tout caché → on ajoute les parties ; une partie cachée → on retire du tout ; l'écart entre deux barres → on retire la petite de la grande.",
  depths: {
    discovery:
      "**Avec les mains** : 5 cubes rouges collés, 3 cubes bleus collés, bout à bout : la barre totale fait 8. Le modèle en barres, c'est ça — des trains de cubes.",
    standard:
      "**En image** : je dessine. Parties 5 et 3, tout inconnu → « ? » en haut → $5 + 3 = 8$. Tout 8, partie 5, l'autre cachée → « ? » en bas → $8 - 5 = 3$. Comparaison : Léa 9, Tom 5, deux barres alignées à gauche — l'écart est le bout qui dépasse → $9 - 5 = 4$.",
    advanced:
      "**Dans la tête** : le modèle traduit les **mots** en **longueurs** — et les longueurs ne mentent pas. « Pierre a 3 de moins que Julie » : la barre de Pierre est la **courte** ; celle de Julie dépasse de 3. Le dessin choisit l'opération à ma place, même quand l'énoncé piège. Plus tard, les mêmes barres porteront les multiplications, les fractions, les pourcentages : un seul outil pour des années.",
  },
  keyIdea: "Tout en haut, parties en bas, « ? » sur l'inconnue : **la place du ? choisit l'opération**.",
  why:
    "Pourquoi dessiner alors qu'on pourrait calculer direct ? Parce que les énoncés trompent (« de plus », et pourtant on soustrait…) — les **longueurs**, jamais. Le détour par le dessin coûte dix secondes et supprime l'erreur de sens, la pire de toutes.",
  widgets: [
    { kind: "barmodel", params: { mode: "part-whole", parts: [5, 3], unknown: "whole" }, caption: "Parties 5 et 3, le tout caché : touche le « ? » — il se trouve en réunissant." },
    { kind: "barmodel", params: { mode: "comparison", parts: [9, 5], labels: ["Léa", "Tom"], unknown: "difference" }, caption: "Léa 9, Tom 5 : l'écart est le bout qui dépasse." },
  ],
  examples: [
    { title: "Le tout caché", steps: [
      { p: "« J'ai 6 billes rouges et 4 bleues. Combien en tout ? »" },
      { p: "Deux parties dessinées (6 et 4), le tout porte « ? » → $6 + 4 = $ **10**." },
    ] },
    { title: "Une partie cachée", steps: [
      { p: "« 10 billes en tout, 6 rouges. Combien de bleues ? »" },
      { p: "Tout 10 en haut, partie 6 en bas, « ? » à côté → $10 - 6 = $ **4**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans le modèle en barres, que représente la barre du haut ?", solution: "Le **tout** ; en dessous, les **parties** mises bout à bout font exactement la même longueur." },
    { tier: "warmup", prompt: "Parties 6 et 4, le tout porte « ? ». Quelle opération, quel résultat ?", solution: "Le tout caché se trouve en **réunissant** : $6 + 4 = $ **10**." },
    { tier: "application", prompt: "Tout 10, une partie 7, l'autre porte « ? ». Opération et résultat ?", solution: "Une partie cachée se trouve en **retirant** : $10 - 7 = $ **3**." },
    { tier: "challenge", prompt: "Léa a 9 images, Tom en a 5. Dessine les deux barres : que vaut l'écart ?", solution: "Barres alignées à gauche, Léa dépasse : l'écart vaut $9 - 5 = $ **4**." },
    { tier: "exam", prompt: "« Pierre a 5 billes. Il en a 3 de moins que Julie. » Qui a la barre la plus longue ? Combien Julie en a-t-elle ?", solution: "**Julie** a la longue barre (Pierre en a *moins*). Sa barre = celle de Pierre + 3 → $5 + 3 = $ **8**. Le mot disait « moins », le dessin dit d'ajouter !" },
  ],
  practice: [
    { tier: "application", label: "La partie cachée", make: (r) => {
      const a = randint(r, 4, 12), b = randint(r, 3, 12); const t = a + b;
      return { prompt: `Le tout vaut ${t}, une partie vaut ${a}. Que vaut la partie cachée ?`, answer: b, solution: `Une partie cachée = le tout moins l'autre : $${t} - ${a} = $ **${b}**.` };
    } },
  ],
};

// — One-step problems, the CP ritual (programme: comprendre, modéliser, calculer, répondre — 10 par semaine) —
const problemsOneStep = {
  id: "numbers.primary.problems",
  level: "primary", domain: "numbers",
  title: "Dix problèmes par semaine",
  tagline: "Comprendre, modéliser, calculer, répondre — et toujours vérifier que c'est possible.",
  prereqs: ["numbers.primary.bar-model"],
  intuition:
    "Au CP, on résout **au moins dix problèmes par semaine** — c'est le programme qui le dit. Le rituel, toujours le même :\n\n**Comprendre** (je raconte l'histoire avec mes mots), **modéliser** (je dessine — barres ou cubes), **calculer**, **répondre** (une phrase !). Et un dernier réflexe : la **régulation** — « mon résultat est-il possible ? »",
  depths: {
    discovery:
      "**Avec les mains** : tant que le calcul n'est pas disponible, on joue la scène — cubes, barres de dix, pièces fictives — et on dénombre ce qui reste.",
    standard:
      "**En image** : le modèle en barres traduit l'énoncé. Trois grandes familles : **parties-tout** (réunir/retirer), **transformation** (avant → après), **comparaison** (de plus / de moins — gare aux énoncés où le mot ne dit pas l'opération !). S'y ajoutent des problèmes en **deux étapes** (champ ≤ 30 : un schéma par étape) et les premiers **multiplicatifs** et **partages**.",
    advanced:
      "**Dans la tête** : la régulation est un calcul de vraisemblance — « il reste 61 cerises sur 43 au départ : impossible, le reste dépasse le tout ! ». Se poser la question *avant* de répondre, c'est le début de l'esprit critique mathématique — et l'étape « répondre » ramène toujours le nombre dans l'histoire : « Anna a 25 cerises. »",
  },
  keyIdea: "Le rituel : **comprendre → modéliser → calculer → répondre** — plus la **régulation** (« est-ce possible ? »).",
  why:
    "Pourquoi une phrase-réponse, alors que le nombre suffit ? Parce qu'un problème vient du monde réel et doit y retourner : « 25 » ne dit rien ; « il reste 25 cerises » répond. Le retour à l'histoire est la moitié du sens.",
  examples: [
    { title: "Les cerises d'Anna, en entier", steps: [
      { p: "**Comprendre** : Anna avait 43 cerises, elle en a mangé 18 ; on cherche le reste." },
      { p: "**Modéliser** : tout 43, partie mangée 18, partie restante « ? »." },
      { p: "**Calculer** : $43 - 18 = 25$ (en cassant une dizaine)." },
      { p: "**Répondre** : « Anna a maintenant **25 cerises**. » Régulation : 25 < 43, c'est possible ✓." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelles sont les quatre étapes du rituel de résolution ?", solution: "**Comprendre, modéliser, calculer, répondre** — et on ajoute la régulation : « est-ce possible ? »." },
    { tier: "warmup", prompt: "« Lina avait 25 billes ; elle en gagne 13. » Modélise et réponds.", solution: "Parties 25 et 13, tout « ? » : $25 + 13 = 38$. **« Lina a 38 billes. »**" },
    { tier: "application", prompt: "« Il y avait 52 oiseaux ; 20 s'envolent. » Combien reste-t-il ?", solution: "$52 - 20 = $ **32** (je retire 2 dizaines). « Il reste 32 oiseaux. »" },
    { tier: "challenge", prompt: "« Tom a 36 cartes, c'est 10 de **plus** que Zoé. » Combien Zoé en a-t-elle ?", solution: "Le mot dit « plus »… mais Zoé a la barre **courte** : $36 - 10 = $ **26**. Le dessin déjoue le piège." },
    { tier: "exam", prompt: "Un élève trouve « il reste 61 cerises » au problème d'Anna (43 au départ). Sans refaire le calcul, que peux-tu dire ?", solution: "**Impossible** : le reste (61) dépasse le tout de départ (43). La régulation rejette la réponse avant même de vérifier le calcul." },
    { tier: "exam", prompt: "Il y avait 29 enfants dans un bus. Au premier arrêt, 12 descendent. Au deuxième, 7 montent. Combien d'enfants maintenant ?", solution: "**Deux étapes**, un schéma chacune : $29 - 12 = 17$, puis $17 + 7 = $ **24**. « Il y a 24 enfants dans le bus. »" },
  ],
  practice: [
    { tier: "application", label: "Un problème, une étape", make: (r) => {
      const kind = r();
      if (kind < 0.34) { const a = randint(r, 12, 45), b = randint(r, 11, 40); return { prompt: `Maé avait ${a} images ; elle en gagne ${b}. Combien en a-t-elle ?`, answer: a + b, solution: `Parties ${a} et ${b}, tout caché : $${a} + ${b} = $ **${a + b}**. « Maé a ${a + b} images. »` }; }
      if (kind < 0.67) { const t = randint(r, 30, 90), b = randint(r, 11, t - 10); return { prompt: `Il y avait ${t} oiseaux ; ${b} s'envolent. Combien reste-t-il ?`, answer: t - b, solution: `Tout ${t}, partie ${b} : $${t} - ${b} = $ **${t - b}**. « Il reste ${t - b} oiseaux. »` }; }
      const s = randint(r, 20, 60), d = randint(r, 5, 15); return { prompt: `Ali a ${s} billes, c'est ${d} de plus que Noa. Combien Noa en a-t-elle ?`, answer: s - d, solution: `« De plus »… mais Noa a la barre courte : $${s} - ${d} = $ **${s - d}**.` };
    } },
  ],
};

// — Toward multiplication: the word "fois" (programme: sens de la multiplication, additions itérées) —
const timesFois = {
  id: "numbers.primary.times-fois",
  level: "primary", domain: "numbers",
  title: "Trois fois vingt : vers la multiplication",
  tagline: "Des paquets tout pareils, le mot « fois » — le signe attendra le CE1.",
  prereqs: ["numbers.preschool.doubles", "numbers.primary.add-sub-meaning"],
  intuition:
    "Jan a **trois paquets** de biscuits, **20 biscuits** dans chaque paquet. Combien de biscuits ?\n\nOn dit : « Jan a **trois fois vingt** biscuits » — et on écrit $20 + 20 + 20 = 60$. Le mot « **fois** » raconte des paquets tout pareils qu'on répète. C'est déjà la multiplication ; son signe « × » arrivera au CE1.",
  depths: {
    discovery:
      "**Avec les mains** : trois assiettes, deux gâteaux dans chacune. « Trois fois deux gâteaux » : $2 + 2 + 2 = 6$. Les doubles que tu connais sont des « deux fois » !",
    standard:
      "**En image** : le modèle en barres s'y prête à merveille — trois morceaux **de même longueur** (20, 20, 20) bout à bout : le tout fait 60. Des parts égales : voilà la signature de la multiplication.",
    advanced:
      "**Dans la tête** : « trois fois vingt » et « vingt fois trois » donnent le même total — mais ne racontent pas la même histoire (3 gros paquets, ou 20 petits). Compter les paquets d'un côté, le contenu de l'autre : cette double lecture nourrira les tables du CE1.",
  },
  keyIdea: "« $k$ fois $n$ » = $n + n + \\dots + n$ ($k$ paquets identiques). Le signe « × » attend le CE1.",
  why:
    "Pourquoi un mot nouveau alors que l'addition suffit ? Parce que « trois fois vingt » se **pense d'un bloc**, là où $20 + 20 + 20$ se traîne. Donner un nom à la répétition, c'est préparer l'outil qui la calculera d'un coup.",
  examples: [
    { title: "Les biscuits de Jan", steps: [
      { p: "Trois paquets de 20 : « trois fois vingt »." },
      { p: "$20 + 20 + 20 = $ **60 biscuits**." },
    ] },
    { title: "Le double est un « deux fois »", steps: [
      { p: "Le double de 7, c'est « deux fois sept » : $7 + 7 = 14$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie « trois fois cinq » ?", solution: "Trois paquets de cinq : $5 + 5 + 5 = $ **15**." },
    { tier: "warmup", prompt: "Quatre boîtes de 10 crayons : combien de crayons ?", solution: "« Quatre fois dix » : $10 + 10 + 10 + 10 = $ **40**." },
    { tier: "application", prompt: "Écris « cinq fois deux » comme une addition, puis calcule.", solution: "$2 + 2 + 2 + 2 + 2 = $ **10**." },
    { tier: "challenge", prompt: "« Trois fois vingt » et « vingt fois trois » : même total ? Même histoire ?", solution: "Même total (**60**), mais pas la même histoire : 3 paquets de 20, ou 20 paquets de 3." },
    { tier: "exam", prompt: "Mia dit : « le double de 30, c'est deux fois trente ». A-t-elle raison ? Combien cela fait-il ?", solution: "**Oui** : un double est un « deux fois ». $30 + 30 = $ **60**." },
  ],
  practice: [
    { tier: "application", label: "Des paquets tout pareils", make: (r) => {
      const k = randint(r, 2, 5); const n = pick(r, [2, 5, 10]);
      const add = Array(k).fill(n).join(" + ");
      return { prompt: `${k} paquets de ${n} objets : combien d'objets en tout ?`, answer: k * n, solution: `« ${k} fois ${n} » : $${add} = $ **${k * n}**.` };
    } },
  ],
};

export default [
  placeValue, toHundred, additionFacts, mentalStrategies, symbolsMeaning, columnAddition, breakTen,
  barModelLesson, problemsOneStep, timesFois,
];
