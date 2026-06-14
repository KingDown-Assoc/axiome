// Field "Numbers" — PRIMARY module (CE1 year). Official cycle-2 programme (BO n°41, 31/10/2024)
// crossed with Singapore P2: numbers to 1000, the × sign, all times tables, fractions of a whole,
// column subtraction, two-step problems with bar models (the BO itself says « schémas en barre »).
import { randint, pick } from "../../core/exercises.js";

// — Numbers to one thousand (programme: la centaine, six écritures, suites évolutives) —
const toThousand = {
  id: "numbers.primary.to-1000",
  level: "primary", domain: "numbers",
  title: "Les nombres jusqu'à mille",
  tagline: "La centaine arrive : plaques, billets de cent, et des nombres à trois chiffres.",
  prereqs: ["numbers.primary.place-value", "numbers.primary.to-100"],
  intuition:
    "Dix dizaines font une **centaine** : la plaque de cent cubes, le billet de 100 €. Avec elle, les nombres filent jusqu'à **mille**.\n\n635, c'est 6 plaques, 3 barres, 5 cubes — « six centaines, trois dizaines et cinq unités ». Et le même nombre s'écrit de bien des façons : $600 + 30 + 5$, ou $(6 \\times 100) + (3 \\times 10) + (5 \\times 1)$, ou « six-cent-trente-cinq » en lettres.",
  depths: {
    discovery:
      "**Avec les mains** : je dénombre en organisant — des groupes de cent, des groupes de dix, des unités. Même quand c'est en désordre : « 2 centaines, 27 dizaines et 14 unités », je convertis (27 dizaines = 2 centaines et 7 dizaines ; 14 unités = 1 dizaine et 4 unités) → **484**.",
    standard:
      "**En image** : sur la demi-droite graduée — de un en un, de dix en dix ou de **cent en cent** — chaque nombre a son point. Je complète une bande lacunaire (391, 392, 393, ?, ?, 396…), j'ordonne cinq nombres (229, 234, 239, 243, 300) en comparant d'abord les **centaines**.",
    advanced:
      "**Dans la tête** : les ordinaux montent jusqu'à **cent** — avant le quarante-huitième coureur du Tour, il y en a **47**. Et les suites deviennent **évolutives** : dans 1, 2, 4, 7, 11, 16…, l'écart grandit de un à chaque pas (+1, +2, +3…) ; dans 1, 2, 4, 8, 16…, chaque terme **double**. Trouver la règle, c'est pouvoir prédire sans tout écrire.",
  },
  keyIdea: "Dix dizaines = une **centaine** ; dix centaines = **mille**. Pour comparer : centaines d'abord, puis dizaines, puis unités.",
  why:
    "Pourquoi la machine à paquets ne s'arrête-t-elle pas à cent ? Parce que le même geste — dix paquets deviennent un paquet plus gros — marche **à tous les étages** : unités → dizaines → centaines → milliers. Un seul principe, des nombres sans fin.",
  widgets: [
    { kind: "numberline", params: { mode: "line", max: 12, value: 4 }, caption: "La demi-droite se gradue maintenant de 10 en 10 ou de 100 en 100 : même outil, plus grands sauts." },
  ],
  examples: [
    { title: "Convertir un désordre", steps: [
      { p: "« 9 dizaines, 23 unités et 4 centaines » : je range." },
      { p: "23 unités = 2 dizaines et 3 unités → 9 + 2 = 11 dizaines = 1 centaine et 1 dizaine." },
      { p: "4 + 1 = 5 centaines, 1 dizaine, 3 unités : **513**." },
    ] },
    { title: "La commande de timbres", steps: [
      { p: "Il faut 235 timbres ; on vend des plaques de 100, des carnets de 10, des unités." },
      { p: "2 plaques + 3 carnets + 5 timbres… ou 1 plaque + 13 carnets + 5 timbres : **plusieurs commandes**, un même nombre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de dizaines dans une centaine ? Et de centaines dans mille ?", solution: "**Dix** dizaines font cent ; **dix** centaines font mille — le même échange, un étage plus haut." },
    { tier: "warmup", prompt: "6 plaques de cent, 3 barres de dix et 5 cubes : quel nombre ?", solution: "« Six centaines, trois dizaines et cinq unités » : **635**." },
    { tier: "application", prompt: "Écris 635 sous la forme d'une somme, puis avec des produits.", solution: "$600 + 30 + 5$ ; et $(6 \\times 100) + (3 \\times 10) + (5 \\times 1)$." },
    { tier: "challenge", prompt: "« 2 centaines, 27 dizaines et 14 unités » : quel nombre ?", solution: "27 dizaines = 270 ; 14 unités = 14 : $200 + 270 + 14 = $ **484**." },
    { tier: "exam", prompt: "Dans une course de 167 cyclistes, combien sont arrivés avant le quarante-huitième ?", solution: "**47** : le rang et le nombre de précédents diffèrent toujours de un — même à trois chiffres." },
    { tier: "exam", prompt: "Suite évolutive : 1, 2, 4, 7, 11, 16, … Quel est le terme suivant, et pourquoi ?", solution: "**22** : l'écart grandit de un à chaque pas (+1, +2, +3, +4, +5, **+6**)." },
  ],
  practice: [
    { tier: "warmup", label: "Centaines, dizaines, unités", make: (r) => {
      const c = randint(r, 1, 9), d = randint(r, 0, 9), u = randint(r, 0, 9);
      return { prompt: `${c} centaines, ${d} dizaines et ${u} unités : quel nombre ?`, answer: 100 * c + 10 * d + u, solution: `$${c * 100} + ${d * 10} + ${u} = $ **${100 * c + 10 * d + u}**.` };
    } },
    { tier: "challenge", label: "Convertir un désordre", make: (r) => {
      const c = randint(r, 1, 4), d = randint(r, 11, 19), u = randint(r, 0, 9);
      const n = 100 * c + 10 * d + u;
      return { prompt: `${c} centaines, ${d} dizaines et ${u} unités : quel nombre ?`, answer: n, solution: `${d} dizaines = ${Math.floor(d / 10)} centaine et ${d % 10} dizaines → **${n}**.` };
    } },
  ],
};

// — Column subtraction (programme: algorithme posé, par cassage ou par compensation, P3) —
const subtractColumn = {
  id: "numbers.primary.subtract-column",
  level: "primary", domain: "numbers",
  title: "La soustraction posée",
  tagline: "Le cassage de dizaine devient une technique écrite — la retenue.",
  prereqs: ["numbers.primary.subtract-100", "numbers.primary.column-addition"],
  intuition:
    "Au CP, tu cassais des barres de dix avec les mains. Au CE1, le geste s'écrit : c'est la **soustraction posée**, unités sous unités, dizaines sous dizaines, centaines sous centaines.\n\nQuand les unités du haut ne suffisent pas, on **casse** : une dizaine devient dix unités — c'est la **retenue**. Même idée, nouveau costume.",
  depths: {
    discovery:
      "**Avec les mains** : 43 − 18 avec le matériel — je casse une barre, je retire, je compte le reste : 25. La technique posée racontera exactement ce geste.",
    standard:
      "**En image** : je pose $43 - 18$. Aux unités : $3 - 8$ impossible → je casse une dizaine : 13 unités en haut, plus que 3 dizaines. $13 - 8 = 5$ ; $3 - 1 = 2$ → **25**. Il existe aussi l'algorithme « par compensation » (on ajoute dix en haut **et** en bas) — chaque école choisit **un seul** algorithme et s'y tient, du CE1 au CM2.",
    advanced:
      "**Dans la tête** : la retenue de la soustraction est l'échange de la numération joué à l'envers — exactement le miroir de la retenue de l'addition (où dix unités **deviennent** une dizaine). Les deux techniques posées sont le même principe, lu dans les deux sens.",
  },
  keyIdea: "Pas assez d'unités en haut ? On **casse une dizaine** : c'est la retenue de la soustraction.",
  why:
    "Pourquoi apprendre une technique alors qu'on sait déjà soustraire par étapes ? Parce que la technique posée marche **toujours pareil**, même avec de grands nombres : $743 - 568$ ne fait pas peur à celui qui pose. L'automatisme libère la tête pour le problème.",
  examples: [
    { title: "43 − 18, posé", steps: [
      { p: "Unités : $3 - 8$ impossible. Je casse une dizaine : 13 unités, et il reste 3 dizaines en haut." },
      { p: "$13 - 8 = 5$. Dizaines : $3 - 1 = 2$." },
      { p: "Résultat : **25** — le même que les cerises d'Anna, sans toucher un cube." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans une soustraction posée, que fait-on quand le chiffre des unités du haut est trop petit ?", solution: "On **casse une dizaine** : dix unités de plus en haut, une dizaine de moins — la retenue." },
    { tier: "warmup", prompt: "Pose et calcule $56 - 23$ (sans retenue).", solution: "$6 - 3 = 3$ ; $5 - 2 = 3$ → **33**." },
    { tier: "application", prompt: "Pose et calcule $62 - 27$.", solution: "$2 - 7$ impossible → cassage : $12 - 7 = 5$ ; $5 - 2 = 3$ → **35**." },
    { tier: "challenge", prompt: "Pose et calcule $245 - 168$.", solution: "Unités : $15 - 8 = 7$ ; dizaines : $13 - 6 = 7$ ; centaines : $1 - 1 = 0$ → **77**." },
    { tier: "exam", prompt: "Comment vérifier $62 - 27 = 35$ sans refaire la soustraction ?", solution: "Par l'opération **inverse** : $35 + 27 = 62$ ✓ — l'addition contrôle la soustraction." },
  ],
  practice: [
    { tier: "application", label: "Soustraction avec retenue", make: (r) => {
      const d = randint(r, 4, 9), u = randint(r, 0, 7);
      const bd = randint(r, 1, d - 2), bu = randint(r, u + 1, 9);
      const a = 10 * d + u, b = 10 * bd + bu;
      return { prompt: `Pose et calcule $${a} - ${b}$.`, answer: a - b, solution: `Unités : $${u} - ${bu}$ impossible → je casse une dizaine : $${10 + u} - ${bu} = ${10 + u - bu}$ ; dizaines : $${d - 1} - ${bd} = ${d - 1 - bd}$ → **${a - b}**. Vérification : $${a - b} + ${b} = ${a}$ ✓.` };
    } },
  ],
};

// — The × sign, commutativity, parity (programme: comprendre et utiliser le symbole ×) —
const timesSign = {
  id: "numbers.primary.times-sign",
  level: "primary", domain: "numbers",
  title: "Le signe ×",
  tagline: "« Fois » gagne son symbole — et l'ordre des facteurs ne compte pas.",
  prereqs: ["numbers.primary.times-fois"],
  intuition:
    "Le mot « fois » du CP reçoit enfin son écriture : Jan a sept paquets de vingt biscuits → « sept fois vingt » → $7 \\times 20 = 140$ biscuits.\n\nL'écriture multiplicative est **plus courte** que $20 + 20 + 20 + 20 + 20 + 20 + 20$ — et elle cache une propriété magique : **l'ordre des facteurs ne compte pas**.",
  depths: {
    discovery:
      "**Avec les mains** : un potager de 8 colonnes de 4 salades. Je le regarde debout : $8 \\times 4$. Je tourne autour : 4 rangées de 8 salades, $4 \\times 8$. Mêmes salades !",
    standard:
      "**En image** : le quadrillage de salades **montre** la commutativité — $8 \\times 4 = 4 \\times 8 = 32$, deux lectures du même rectangle. Et on garde les **unités** dans les calculs : « $7 \\times 20$ biscuits $= 140$ biscuits ».",
    advanced:
      "**Dans la tête** : la **parité** entre en scène — un nombre est **pair** s'il se range deux par deux sans reste (il se termine par 0, 2, 4, 6 ou 8), **impair** sinon. Les pairs entre 767 et 778 ? 768, 770, 772, 774, 776, 778. Doubles et moitiés sont le royaume des pairs.",
  },
  keyIdea: "« $a$ fois $b$ » s'écrit $a \\times b$ — et $a \\times b = b \\times a$ : l'ordre des facteurs ne compte pas.",
  why:
    "Pourquoi la commutativité est-elle une chance ? Parce qu'elle **divise le travail par deux** : qui sait $4 \\times 8$ sait aussi $8 \\times 4$. Le rectangle de salades n'a pas changé quand tu as tourné autour — le produit non plus.",
  examples: [
    { title: "Les biscuits de Jan, version CE1", steps: [
      { p: "Sept paquets de vingt : « sept fois vingt »." },
      { p: "$7 \\times 20$ biscuits $= 140$ biscuits — plus concis que sept additions !" },
    ] },
    { title: "Le potager commutatif", steps: [
      { p: "8 colonnes de 4 salades : $8 \\times 4 = 32$." },
      { p: "Vu de côté : 4 rangées de 8 : $4 \\times 8 = 32$. Même potager, même produit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Comment lit-on le symbole « × » ?", solution: "« **fois** » : $7 \\times 20$ se lit « sept fois vingt »." },
    { tier: "warmup", prompt: "Écris « cinq fois dix » avec le signe ×, puis calcule.", solution: "$5 \\times 10 = $ **50**." },
    { tier: "application", prompt: "Sans calculer : $4 \\times 8$ et $8 \\times 4$ donnent-ils le même résultat ? Pourquoi ?", solution: "**Oui** : c'est le même rectangle de salades vu de deux côtés — l'ordre des facteurs ne compte pas." },
    { tier: "challenge", prompt: "Donne tous les nombres pairs compris entre 767 et 778.", solution: "**768, 770, 772, 774, 776, 778** : ils se terminent par 0, 2, 4, 6 ou 8." },
    { tier: "exam", prompt: "Jan a sept paquets de vingt biscuits. Écris l'opération **avec les unités** et donne le résultat.", solution: "$7 \\times 20$ biscuits $= $ **140 biscuits** — les unités voyagent avec les nombres." },
  ],
  practice: [
    { tier: "warmup", label: "Écrire avec ×", make: (r) => {
      const k = randint(r, 2, 9); const n = pick(r, [10, 20, 30, 40, 50]);
      return { prompt: `${k} paquets de ${n} : combien en tout ? (écris d'abord l'opération avec ×)`, answer: k * n, solution: `$${k} \\times ${n} = $ **${k * n}** — bien plus court que ${k} additions.` };
    } },
  ],
};

// — Times tables, extended doubles and halves (programme: mémoriser des faits numériques CE1) —
const timesTables = {
  id: "numbers.primary.tables",
  level: "primary", domain: "numbers",
  title: "Les tables de multiplication",
  tagline: "De 0 à 10, dans les deux sens — construites table après table, toute l'année.",
  prereqs: ["numbers.primary.times-sign", "numbers.primary.addition-facts"],
  intuition:
    "Les tables de multiplication s'apprennent **sur toute l'année**, progressivement — et **dans les deux sens** : savoir $5 \\times 3 = 15$, c'est aussi répondre à $5 \\times \\,? = 15$ et à $15 = 3 \\times \\,?$.\n\nLes premières sues fabriquent les suivantes : qui connaît $5 \\times 7$ trouve $6 \\times 7$ en ajoutant un 7 de plus.",
  depths: {
    discovery:
      "**Avec les mains** : la table de 4, c'est des paquets de 4 — je pose 3 paquets, je compte 12 ; j'ajoute un paquet, 16. Chaque ligne de la table est la précédente **plus un paquet**.",
    standard:
      "**En image** : le rectangle montre tout — $6 \\times 7$, c'est 6 rangées de 7. Les **doubles** s'étendent (jusqu'à 15, puis 20, 25, 30… 50, puis 100, 150… 500) et les **moitiés** suivent (pairs jusqu'à 30, dizaines jusqu'à 100, centaines jusqu'à 1 000). Et les **multiples de 25** s'apprennent par cœur : 25, 50, 75, 100 — les quarts d'heure et les pièces te disent merci.",
    advanced:
      "**Dans la tête** : la fluence visée en fin de CE1 — huit égalités à trous de type $4 \\times \\,? = 12$ en une minute — n'est pas un caprice : un fait restitué d'un coup libère l'attention pour le problème. Et la mémorisation pourra rester imparfaite en fin d'année : le CE2 la renforcera. On construit, on consolide.",
  },
  keyIdea: "Une table sue **dans les deux sens** : $5 \\times 3 = 15$ donne aussi $5 \\times \\,? = 15$ et $15 = 3 \\times \\,?$.",
  why:
    "Pourquoi étaler les tables sur l'année au lieu de tout apprendre d'un coup ? Parce que chaque table **s'appuie** sur les autres : la table de 4, c'est la table de 2 doublée ; celle de 10 fabrique celle de 5. Apprendre dans l'ordre, c'est apprendre moins.",
  examples: [
    { title: "L'égalité à trous multiplicative", steps: [
      { p: "$4 \\times \\,? = 12$ : je cherche combien de paquets de 4 font 12." },
      { p: "$4 \\times 3 = 12$ → la réponse est **3**." },
    ] },
    { title: "Une ligne fabrique la suivante", steps: [
      { p: "Je sais $5 \\times 7 = 35$." },
      { p: "$6 \\times 7$, c'est un 7 de plus : $35 + 7 = $ **42**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que veut dire « connaître $5 \\times 3 = 15$ dans les deux sens » ?", solution: "Répondre à $5 \\times 3 = \\,?$ **et** à $5 \\times \\,? = 15$ (ou $15 = \\,? \\times 3$) — la table lue dans tous les sens." },
    { tier: "warmup", prompt: "Complète : $4 \\times \\,? = 12$, puis $2 \\times \\,? = 70$.", solution: "$4 \\times $ **3** $= 12$ ; $2 \\times $ **35** $= 70$ (la moitié de 70)." },
    { tier: "application", prompt: "Donne les quatre premiers multiples de 25.", solution: "**25, 50, 75, 100** — à savoir par cœur : $4 \\times 25 = 100$." },
    { tier: "challenge", prompt: "Tu sais que $5 \\times 7 = 35$. Trouve $6 \\times 7$ sans réciter la table.", solution: "Un paquet de 7 en plus : $35 + 7 = $ **42**." },
    { tier: "exam", prompt: "Quel est le double de 250 ? La moitié de 1 000 ?", solution: "Double de 250 = **500** ; moitié de 1 000 = **500** — la même réponse, et ce n'est pas un hasard : double et moitié sont inverses." },
  ],
  practice: [
    { tier: "warmup", label: "Égalités à trous (×)", make: (r) => {
      const a = randint(r, 2, 10), b = randint(r, 2, 10);
      return { prompt: `Complète : $${a} \\times \\,? = ${a * b}$`, answer: b, solution: `$${a} \\times ${b} = ${a * b}$ → **${b}**.` };
    } },
    { tier: "application", label: "Doubles et moitiés étendus", make: (r) => {
      if (r() < 0.5) { const n = pick(r, [12, 13, 14, 15, 25, 35, 45, 150, 250, 300, 500]); return { prompt: `Quel est le double de ${n} ?`, answer: n + n, solution: `$2 \\times ${n} = $ **${n + n}**.` }; }
      const m = pick(r, [22, 24, 26, 28, 30, 50, 70, 90, 300, 500, 1000]);
      return { prompt: `Quelle est la moitié de ${m} ?`, answer: m / 2, solution: `$2 \\times ${m / 2} = ${m}$ → la moitié de ${m} est **${m / 2}**.` };
    } },
  ],
};

// — Mental calculation to 1000 (programme: numération et procédures CE1, distributivité) —
const mentalThousand = {
  id: "numbers.primary.mental-1000",
  level: "primary", domain: "numbers",
  title: "Calculer malin jusqu'à mille",
  tagline: "Dizaines, centaines, ×10, +9 par +10… et la distributivité en cadeau.",
  prereqs: ["numbers.primary.mental-strategies", "numbers.primary.tables"],
  intuition:
    "Les procédures du CP grandissent avec les nombres : $234 + 60$, $765 - 200$ — toujours en pensant **dizaines et centaines**.\n\nEt trois nouveautés puissantes : **multiplier par 10** (chaque chiffre glisse d'un cran), **ajouter 9** (j'ajoute 10, je retire 1), et la **distributivité** : « 13 fois 7, c'est 10 fois 7 **plus** 3 fois 7 ».",
  depths: {
    discovery:
      "**Avec les mains** : $\\times 10$ avec le matériel — chaque cube devient une barre, chaque barre une plaque. $72 \\times 10$ : les 7 dizaines deviennent 7 centaines, les 2 unités deviennent 2 dizaines → **720**.",
    standard:
      "**En image** : pour $523 - 7$, deux sauts vers l'arrière : $-3$ pour atteindre 520, puis $-4$ (car $7 = 3 + 4$) → **516**. Pour $+9$ : un grand saut $+10$, un petit retour $-1$. La droite graduée dessine chaque procédure.",
    advanced:
      "**Dans la tête** : la **distributivité** coupe les produits difficiles — $13 \\times 7 = (10 + 3) \\times 7 = 10 \\times 7 + 3 \\times 7 = 70 + 21 = 91$. Et la moitié de 470 ? Je décompose : $470 = 400 + 70$, moitiés $200 + 35 = $ **235**. Décomposer, calculer, recoller : la stratégie reine du calcul mental.",
  },
  keyIdea: "$\\times 10$ : chaque chiffre **glisse d'un cran**. $+9$ : $+10$ puis $-1$. Et $13 \\times 7 = 10 \\times 7 + 3 \\times 7$.",
  why:
    "Pourquoi $+10-1$ vaut-il mieux que $+9$ directement ? Parce que les **dizaines rondes sont faciles** : ajouter 10 ne demande aucun effort, retirer 1 non plus. On échange un calcul moyen contre deux calculs gratuits — et on sait s'en passer quand $+9$ est direct (60 + 29 !).",
  examples: [
    { title: "746 + 80", steps: [
      { p: "« 80, c'est 8 dizaines. 4 dizaines et 8 dizaines, 12 dizaines : une centaine et 2 dizaines. »" },
      { p: "$746 + 80 = $ **826**." },
    ] },
    { title: "13 × 7 par distributivité", steps: [
      { p: "« 13 fois 7, c'est 10 fois 7 plus 3 fois 7. »" },
      { p: "$70 + 21 = $ **91**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour multiplier 72 par 10, que devient chaque chiffre ?", solution: "Il **glisse d'un cran** vers la gauche : les dizaines deviennent des centaines, les unités des dizaines → **720**." },
    { tier: "warmup", prompt: "Calcule $234 + 60$ puis $765 - 200$.", solution: "$234 + 60 = $ **294** (6 dizaines de plus) ; $765 - 200 = $ **565** (2 centaines de moins)." },
    { tier: "application", prompt: "Calcule $57 + 19$ avec la procédure du $+10-1$… adaptée.", solution: "$+19$, c'est $+20 - 1$ : $57 + 20 = 77$, $77 - 1 = $ **76**." },
    { tier: "challenge", prompt: "Calcule $523 - 7$ en passant par la dizaine inférieure.", solution: "$523 - 3 = 520$, puis $520 - 4 = $ **516** (car $7 = 3 + 4$)." },
    { tier: "exam", prompt: "Calcule $14 \\times 6$ en décomposant 14. Verbalise.", solution: "« 14 fois 6, c'est 10 fois 6 plus 4 fois 6 » : $60 + 24 = $ **84** — la distributivité." },
  ],
  practice: [
    { tier: "warmup", label: "Dizaines et centaines", make: (r) => {
      const n = randint(r, 120, 880); const kind = r();
      if (kind < 0.34) { const d = randint(r, 2, 7) * 10; return { prompt: `Calcule $${n} + ${d}$.`, answer: n + d, solution: `${d / 10} dizaines de plus : **${n + d}**.` }; }
      if (kind < 0.67) { const c = randint(r, 1, Math.floor(n / 100)) * 100; return { prompt: `Calcule $${n} - ${c}$.`, answer: n - c, solution: `${c / 100} centaine(s) de moins : **${n - c}**.` }; }
      const m = randint(r, 11, 99); return { prompt: `Calcule $${m} \\times 10$.`, answer: m * 10, solution: `Chaque chiffre glisse d'un cran : **${m * 10}**.` };
    } },
    { tier: "application", label: "La distributivité", make: (r) => {
      const a = randint(r, 11, 16), b = randint(r, 3, 7);
      return { prompt: `Calcule $${a} \\times ${b}$ en décomposant ${a}.`, answer: a * b, solution: `« ${a} fois ${b}, c'est 10 fois ${b} plus ${a - 10} fois ${b} » : $${10 * b} + ${(a - 10) * b} = $ **${a * b}**.` };
    } },
  ],
};

// — Fractions of a whole (programme CE1: fractions unitaires puis non unitaires, dén. 2,3,4,5,6,8,10) —
const fractionsIntro = {
  id: "numbers.primary.fractions",
  level: "primary", domain: "numbers",
  title: "Les fractions : des parts d'un tout",
  tagline: "Moitié, tiers, quart… et leur écriture : le partage devient un nombre.",
  prereqs: ["numbers.preschool.share", "numbers.primary.bar-model"],
  intuition:
    "Partage une bande de papier en quatre parts **égales** : chaque part est **un quart** de la bande, et ça s'écrit $\\frac{1}{4}$.\n\nLe nombre du bas (le **dénominateur**) dit en combien de parts égales on a coupé le tout ; celui du haut (le **numérateur**) dit combien de parts on prend. $\\frac{3}{8}$ : trois parts d'un tout coupé en huit.",
  depths: {
    discovery:
      "**Avec les mains** : je plie la bande en deux ($\\frac{1}{2}$), en quatre ($\\frac{1}{4}$) ; je transvase une bouteille dans quatre verres égaux — chaque verre contient **un quart** du contenu. Le tout partagé en parts égales : voilà la fraction.",
    standard:
      "**En image** : la barre fractionnée montre tout. $\\frac{3}{8} = \\frac{1}{8} + \\frac{1}{8} + \\frac{1}{8}$ — « trois huitièmes, c'est trois fois un huitième ». Et $\\frac{5}{5} = 1$ : cinq cinquièmes, c'est le tout entier. Même dénominateur ? On compare les numérateurs : $\\frac{2}{5} < \\frac{3}{5}$.",
    advanced:
      "**Dans la tête** : le piège célèbre — $\\frac{1}{3}$ est **plus grand** que $\\frac{1}{6}$, alors que $3 < 6$ ! Plus on coupe le tout en parts, plus chaque part est **petite**. On additionne aussi à dénominateur égal, en verbalisant : « deux cinquièmes du tout plus trois cinquièmes du tout, cela fait cinq cinquièmes : le tout ». Et le complément à 1 : si $\\frac{3}{10}$ est bleu, $\\frac{7}{10}$ est rouge.",
  },
  keyIdea: "$\\frac{a}{b}$ : un tout coupé en $b$ parts **égales**, dont on prend $a$. Et $\\frac{b}{b} = 1$ : toutes les parts, c'est le tout.",
  why:
    "Pourquoi $\\frac{1}{3} > \\frac{1}{6}$ alors que $3 < 6$ ? Parce que le dénominateur ne compte pas des objets : il compte des **coupes**. Plus de coupes, des parts plus fines — partage une tablette de chocolat entre 3 ou entre 6, et dis-moi quand ta part est la plus grosse.",
  widgets: [
    { kind: "numberline", params: { mode: "fractionbar", parts: 4, filled: 1 }, caption: "La barre coupée en 4 : chaque part est un quart. Remplis des parts et lis la fraction." },
    { kind: "numberline", params: { mode: "fractionbar", parts: 8, filled: 3 }, caption: "Trois huitièmes : trois fois un huitième — le numérateur compte les parts prises." },
  ],
  examples: [
    { title: "Lire trois huitièmes", steps: [
      { p: "Le tout est coupé en **8** parts égales (dénominateur)." },
      { p: "J'en prends **3** (numérateur) : $\\frac{3}{8} = \\frac{1}{8} + \\frac{1}{8} + \\frac{1}{8}$." },
    ] },
    { title: "Le complément de Lucie", steps: [
      { p: "Lucie colorie $\\frac{3}{10}$ de la figure en bleu, le reste en rouge." },
      { p: "Il faut dix dixièmes pour le tout : le rouge occupe $\\frac{7}{10}$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans $\\frac{3}{8}$, que disent le 8 et le 3 ?", solution: "Le **8** (dénominateur) : le tout est coupé en 8 parts égales. Le **3** (numérateur) : on en prend 3." },
    { tier: "warmup", prompt: "Pourquoi $\\frac{5}{5} = 1$ ?", solution: "Cinq cinquièmes, c'est **toutes** les parts : le tout entier." },
    { tier: "application", prompt: "Compare $\\frac{2}{5}$ et $\\frac{3}{5}$, puis $\\frac{1}{5}$ et $\\frac{1}{3}$.", solution: "$\\frac{2}{5} < \\frac{3}{5}$ (mêmes parts, on en prend plus). Mais $\\frac{1}{5} < \\frac{1}{3}$ : couper en 5 fait des parts **plus petites** que couper en 3 !" },
    { tier: "challenge", prompt: "Calcule $\\frac{1}{5} + \\frac{2}{5}$, puis $\\frac{2}{3} - \\frac{1}{3}$. Verbalise.", solution: "« Un cinquième plus deux cinquièmes, **trois cinquièmes** » ; « deux tiers moins un tiers, **un tiers** » — les parts s'ajoutent, le découpage ne change pas." },
    { tier: "exam", prompt: "Lucie a colorié $\\frac{3}{10}$ d'une figure en bleu et le reste en rouge. Quelle fraction est rouge ?", solution: "$\\frac{7}{10}$ : il faut $\\frac{10}{10}$ pour le tout, et $3 + 7 = 10$ — le complément à 1." },
  ],
  practice: [
    { tier: "application", label: "Compléter le tout", make: (r) => {
      const d = pick(r, [3, 4, 5, 6, 8, 10]); const a = randint(r, 1, d - 1);
      return { prompt: `Complète (réponds par le numérateur manquant) : $\\frac{${a}}{${d}} + \\frac{?}{${d}} = 1$`, answer: d - a, solution: `Il faut ${d} ${d === 3 ? "tiers" : "parts"} pour le tout : $${a} + ${d - a} = ${d}$ → $\\frac{${d - a}}{${d}}$.` };
    } },
  ],
};

// — Two-step and multiplicative problems (programme CE1: ≤ 1000, schémas en barre officiels) —
const problemsThousand = {
  id: "numbers.primary.problems-1000",
  level: "primary", domain: "numbers",
  title: "Problèmes : deux étapes et des barres",
  tagline: "Le champ monte à mille, les problèmes gagnent une étape — les barres suivent.",
  prereqs: ["numbers.primary.problems", "numbers.primary.tables"],
  intuition:
    "Toujours dix problèmes par semaine, toujours le rituel — mais le champ monte à **mille** et les histoires ont souvent **deux étapes** : « la bibliothèque a 83 livres ; le professeur en apporte 18 ; les élèves en empruntent 27 »…\n\nLe programme le dit lui-même : on s'appuie sur des **schémas en barre**. Un schéma par étape, et l'histoire devient limpide.",
  depths: {
    discovery:
      "**Avec les mains** : pour les partages, je distribue ou je groupe — 60 élèves, des équipes de 4 : je fais des paquets et je les compte.",
    standard:
      "**En image** : deux étapes, deux schémas. Madame Martin achète une tarte à 17 € et un gâteau à 26 €, paie avec 50 € : barre 1 — parties 17 et 26, tout ? → 43. Barre 2 — tout 50, partie 43, reste ? → **7 €**. Les multiplicatifs aussi se dessinent : des parts **égales** bout à bout.",
    advanced:
      "**Dans la tête** : les problèmes **mixtes** mélangent les opérations — Abi achète 7 litres d'huile à 2 € le litre et paie avec 20 € : $7 \\times 2 = 14$, puis $20 - 14 = $ **6 €**. Et la régulation veille toujours : un rendu de monnaie plus grand que le billet ? Impossible — on recommence.",
  },
  keyIdea: "Deux étapes = **deux schémas en barre**. Et le résultat de l'étape 1 entre dans l'étape 2.",
  why:
    "Pourquoi découper en étapes plutôt que tout calculer d'un coup ? Parce que chaque étape redevient un problème **simple**, qu'on sait déjà résoudre. Diviser la difficulté, c'est la stratégie des mathématiciens — du CE1 au doctorat.",
  examples: [
    { title: "La monnaie de madame Martin", steps: [
      { p: "Étape 1 — le coût total : parties 17 et 26, tout ? → $17 + 26 = 43$ €." },
      { p: "Étape 2 — le rendu : tout 50, partie 43, reste ? → $50 - 43 = $ **7 €**." },
    ] },
    { title: "Les équipes (partage en barres)", steps: [
      { p: "60 élèves, des équipes de 4 : la barre de 60 se coupe en morceaux de 4." },
      { p: "Combien de morceaux ? $4 \\times \\,? = 60$ → **15 équipes**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Dans un problème à deux étapes, que fait-on du résultat de la première étape ?", solution: "Il devient une **donnée** de la deuxième : chaque étape est un petit problème complet." },
    { tier: "warmup", prompt: "La bibliothèque a 83 livres ; on en apporte 18 ; les élèves en empruntent 27. Combien de livres maintenant ?", solution: "$83 + 18 = 101$, puis $101 - 27 = $ **74 livres**." },
    { tier: "application", prompt: "Trois enfants se partagent 18 images, parts égales. Combien chacun ? Quel fait de table utilises-tu ?", solution: "$3 \\times \\,? = 18$ → **6 images** chacun — la table de 3, lue à l'envers." },
    { tier: "challenge", prompt: "Abi achète 7 litres d'huile à 2 € le litre et paie avec 20 €. Combien lui rend-on ?", solution: "$7 \\times 2 = 14$ €, puis $20 - 14 = $ **6 €** — un problème **mixte** : une multiplication, puis une soustraction." },
    { tier: "exam", prompt: "Il y a 60 élèves et on fait des équipes de 4. Dessine la barre, écris l'égalité à trous, conclus.", solution: "Barre de 60 coupée en parts de 4 : $4 \\times \\,? = 60$ → **15 équipes**. Le schéma en barre transforme le partage en table de multiplication." },
  ],
  practice: [
    { tier: "application", label: "Deux étapes", make: (r) => {
      if (r() < 0.5) { const t = randint(r, 60, 90), a = randint(r, 11, 25), b = randint(r, 11, 30); return { prompt: `La bibliothèque a ${t} livres ; on en apporte ${a} ; les élèves en empruntent ${b}. Combien de livres maintenant ?`, answer: t + a - b, solution: `$${t} + ${a} = ${t + a}$, puis $${t + a} - ${b} = $ **${t + a - b}**.` }; }
      const k = randint(r, 3, 7), p = pick(r, [2, 3]), m = 20;
      return { prompt: `J'achète ${k} objets à ${p} € pièce et je paie avec ${m} €. Combien me rend-on ?`, answer: m - k * p, solution: `$${k} \\times ${p} = ${k * p}$ €, puis $${m} - ${k * p} = $ **${m - k * p} €**.` };
    } },
  ],
};

export default [
  toThousand, subtractColumn, timesSign, timesTables, mentalThousand, fractionsIntro, problemsThousand,
];
