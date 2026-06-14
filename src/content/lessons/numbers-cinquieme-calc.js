// Field "Numbers" — MIDDLE module (5e year), part 2: calculation. Official
// cycle-4 programme: chaining operations, translating a calculation programme
// into a single expression with parentheses, naming calculations (sums/products,
// terms/factors), operator PRIORITIES, simple numeric DISTRIBUTIVITY, dividing by
// a decimal; multiples and divisors with the divisibility criteria for 3 and 9,
// factoring, prime numbers and the sieve of Eratosthenes (official extension);
// powers introduced through squares (0-12 by heart) and cubes (10³).
import { randint, pick } from "../../core/exercises.js";

// — Priorities and distributivity (programme: priorités, distributivité, ÷ décimal) —
const priorites = {
  id: "numbers.middle.priorites",
  level: "middle", domain: "numbers",
  title: "Priorités et distributivité",
  tagline: "3 + 4 × 5 = 23 — et 12 × 103 se calcule de tête.",
  prereqs: ["algebra.primary.rules", "numbers.middle.division-large"],
  intuition:
    "Sans règle, $3 + 4 \\times 5$ vaudrait 35 ou 23 selon l'humeur. La convention mondiale tranche : **les multiplications et divisions d'abord**, puis les additions et soustractions — sauf ordre contraire des **parenthèses** : $3 + 4 \\times 5 = 23$, mais $(3 + 4) \\times 5 = 35$.\n\nEt chaque calcul porte un nom : $3 + 4 \\times 5$ est une **somme** (sa dernière opération) de deux **termes** ; $(3 + 4) \\times 5$ est un **produit** de deux **facteurs**.",
  depths: {
    discovery:
      "**Avec les mains** : tes programmes de calcul deviennent des expressions — « choisis 5 ; ajoute 2 ; multiplie par 4 ; retire 3 » se condense en $(5 + 2) \\times 4 - 3 = 25$ : les parenthèses gardent la trace de l'ordre des gestes. Une ligne raconte toute la machine.",
    standard:
      "**En image** : la **distributivité** fait le pont entre + et × — $k \\times (a + b) = k \\times a + k \\times b$ : $12 \\times 103 = 12 \\times 100 + 12 \\times 3 = 1\\,236$, de tête ! Et dans l'autre sens : $12 \\times 98 = 12 \\times 100 - 12 \\times 2 = 1\\,176$. Multiplier par un nombre, c'est multiplier chacun de ses morceaux.",
    advanced:
      "**Dans la tête** : la division par un **décimal** se ramène à l'entier — $6 \\div 0{,}2$ : combien de fois 0,2 dans 6 ? Multiplie les deux par 10 : $60 \\div 2 = 30$. Le quotient ne change pas quand on multiplie dividende et diviseur par le même nombre (la fraction $\\frac{6}{0{,}2} = \\frac{60}{2}$ le dit) — et diviser par 0,5, c'est multiplier par 2 : diviser par un nombre plus petit que 1 **agrandit**, le miroir exact du $\\times 0{,}1$ de la 6e.",
  },
  keyIdea: "**× et ÷ avant + et −**, parenthèses souveraines. $k(a + b) = ka + kb$. Diviser par un décimal : multiplier les deux par 10 (ou 100) — $6 \\div 0{,}2 = 60 \\div 2$.",
  why:
    "Pourquoi la multiplication passe-t-elle avant l'addition ? Convention — mais pas arbitraire : $3 + 4 \\times 5$ se lit « 3, plus 4 paquets de 5 » : la multiplication forme des **blocs** que l'addition assemble ensuite. Donner la priorité aux blocs économise des forêts de parenthèses : sans la règle, chaque facture s'écrirait $(3) + ((4) \\times (5))$.",
  examples: [
    { title: "Nommer puis calculer", steps: [
      { p: "$3 + 4 \\times 5$ : une **somme** — sa dernière opération est le $+$. Le produit d'abord : $4 \\times 5 = 20$." },
      { p: "$3 + 20 = $ **23** — et $(3 + 4) \\times 5 = 35$ : les parenthèses changent la nature du calcul." },
    ] },
    { title: "12 × 103 de tête", steps: [
      { p: "$12 \\times 103 = 12 \\times (100 + 3) = 12 \\times 100 + 12 \\times 3$." },
      { p: "$1\\,200 + 36 = $ **1 236** — la distributivité découpe le travail." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $3 + 4 \\times 5$ puis $(3 + 4) \\times 5$. Pourquoi deux résultats ?", solution: "**23** et **35** — sans parenthèses, le produit se fait d'abord (priorité) ; les parenthèses imposent l'addition avant. L'ordre des opérations est une information." },
    { tier: "warmup", prompt: "Traduis en une seule expression : « choisis 5 ; ajoute 2 ; multiplie par 4 ; retire 3 », puis calcule.", solution: "$(5 + 2) \\times 4 - 3 = 7 \\times 4 - 3 = 28 - 3 = $ **25** — les parenthèses gardent l'ordre des gestes." },
    { tier: "application", prompt: "Calcule de tête par distributivité : $12 \\times 103$ puis $12 \\times 98$.", solution: "$12 \\times 100 + 12 \\times 3 = $ **1 236** ; $12 \\times 100 - 12 \\times 2 = $ **1 176** — découper le facteur, distribuer, recoller." },
    { tier: "challenge", prompt: "Calcule $6 \\div 0{,}2$ puis $7 \\div 0{,}5$ en te ramenant à des entiers.", solution: "$6 \\div 0{,}2 = 60 \\div 2 = $ **30** ; $7 \\div 0{,}5 = 70 \\div 5 = $ **14** (ou : ÷0,5 = ×2) — multiplier les deux par 10 ne change pas le quotient, et diviser par moins que 1 **agrandit**." },
    { tier: "exam", prompt: "$5 + 3 \\times (8 - 6)$ : nomme ce calcul (somme ou produit ?), puis calcule-le en détaillant l'ordre.", solution: "C'est une **somme** — sa dernière opération est le $+$ ; ses termes : $5$ et $3 \\times (8 - 6)$. Calcul : parenthèses d'abord ($8 - 6 = 2$), produit ensuite ($3 \\times 2 = 6$), somme enfin : $5 + 6 = $ **11** — nommer un calcul, c'est voir sa structure avant ses nombres." },
  ],
  practice: [
    { tier: "warmup", label: "La priorité tranche", make: (r) => {
      const a = randint(r, 2, 9), b = randint(r, 2, 9), c = randint(r, 2, 9);
      return { prompt: `Calcule $${a} + ${b} \\times ${c}$.`, answer: a + b * c, solution: `Produit d'abord : $${b} \\times ${c} = ${b * c}$, puis $${a} + ${b * c} = $ **${a + b * c}**.` };
    } },
    { tier: "application", label: "Distribuer de tête", make: (r) => {
      const k = pick(r, [7, 8, 9, 11, 12]); const base = pick(r, [101, 102, 103, 98, 99]);
      return { prompt: `Calcule de tête $${k} \\times ${base}$ (distributivité !).`, answer: k * base, solution: `$${k} \\times ${base > 100 ? "(100 + " + (base - 100) + ")" : "(100 - " + (100 - base) + ")"} = ${k * 100} ${base > 100 ? "+ " + k * (base - 100) : "- " + k * (100 - base)} = $ **${k * base}**.` };
    } },
    { tier: "challenge", label: "Diviser par un décimal", make: (r) => {
      const d = pick(r, [0.2, 0.5, 0.4, 0.25]); const q = randint(r, 4, 40);
      const n = Math.round(d * q * 100) / 100;
      return { prompt: `Calcule $${String(n).replace(".", ",")} \\div ${String(d).replace(".", ",")}$.`, answer: q, solution: `Multiplie les deux par 100 : $${Math.round(n * 100)} \\div ${Math.round(d * 100)} = $ **${q}** — le quotient ne bouge pas.` };
    } },
  ],
};

// — Divisibility, primes (programme: multiples/diviseurs, critères 3 et 9, premiers) —
const divisibilite = {
  id: "numbers.middle.divisibilite",
  level: "middle", domain: "numbers",
  title: "Divisibilité et nombres premiers",
  tagline: "La somme des chiffres trahit les multiples de 3 — et Ératosthène tamise les premiers.",
  prereqs: ["numbers.primary.divisors-common"],
  intuition:
    "Tes critères du CM (2, 5, 10 : le dernier chiffre) gagnent deux recrues étonnantes : un nombre est divisible par **3** si la **somme de ses chiffres** l'est, par **9** si elle est divisible par 9. $4\\,512$ : $4+5+1+2 = 12$, divisible par 3 → $4\\,512$ aussi !\n\nEt **factoriser** devient un réflexe : $21 = 3 \\times 7$, $36 = 4 \\times 9$ — décomposer un nombre en produit, c'est lire sa structure.",
  depths: {
    discovery:
      "**Avec les mains** : teste les critères — $738$ : $7+3+8 = 18$, divisible par 9 → $738 = 9 \\times 82$ ✓. Le dernier chiffre décide pour 2, 5, 10 ; la **somme** décide pour 3 et 9 : deux familles de critères, deux mécanismes.",
    standard:
      "**En image** : certains nombres refusent toute factorisation — $7 = 1 \\times 7$ et rien d'autre. Ce sont les **nombres premiers** : exactement deux diviseurs, 1 et eux-mêmes ($2, 3, 5, 7, 11, 13, 17, 19, 23…$ — et 1 n'en est pas un : un seul diviseur). Le **crible d'Ératosthène** les tamise : écris les nombres, barre les multiples de 2, puis de 3, de 5, de 7… les survivants sont premiers.",
    advanced:
      "**Dans la tête** : pourquoi la somme des chiffres ? Parce que $10 = 9 + 1$ — une dizaine, c'est un paquet de 9 **plus 1** ; une centaine, onze paquets de 9 plus 1. En distribuant : $4\\,512 = 4 \\times 999 + 5 \\times 99 + 1 \\times 9 + (4+5+1+2)$ — tout le début est multiple de 9, le sort du nombre se joue donc sur la somme seule. Et Euclide a prouvé il y a 2 300 ans que les premiers ne s'épuisent **jamais** : ils sont les atomes de la multiplication — tout entier est un assemblage de premiers, et la liste des atomes est infinie.",
  },
  keyIdea: "Divisible par **3** (ou **9**) ⟺ la **somme des chiffres** l'est. Premier $=$ exactement deux diviseurs (1 et lui-même) ; le crible d'Ératosthène les isole.",
  why:
    "À quoi servent les nombres premiers ? Ce sont les **briques** : tout entier se fabrique en multipliant des premiers, d'une seule façon. Et cette structure protège tes messages — le chiffrement de ta carte bancaire repose sur la difficulté de retrouver les deux premiers géants cachés dans leur produit. Ératosthène tamisait par curiosité ; Internet en vit.",
  examples: [
    { title: "Le critère en action", steps: [
      { p: "$4\\,512$ : somme des chiffres $4+5+1+2 = 12$ — divisible par 3, pas par 9." },
      { p: "Donc $4\\,512$ est divisible par **3** ($= 3 \\times 1\\,504$) mais pas par 9 — la somme décide." },
    ] },
    { title: "Le crible jusqu'à 30", steps: [
      { p: "Barre les multiples de 2 (sauf 2), de 3 (sauf 3), de 5 (sauf 5)." },
      { p: "Survivants : **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** — les premiers jusqu'à 30." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sans poser de division : $738$ est-il divisible par 3 ? Par 9 ?", solution: "$7+3+8 = 18$ : divisible par 3 **et** par 9 → $738$ l'est par les deux ($738 = 9 \\times 82$) — la somme des chiffres décide." },
    { tier: "warmup", prompt: "Factorise en produit de deux facteurs différents de 1 : $21$ ; $35$ ; $54$.", solution: "$21 = 3 \\times 7$ ; $35 = 5 \\times 7$ ; $54 = 6 \\times 9$ (ou $2 \\times 27$…) — les tables lues à l'envers." },
    { tier: "application", prompt: "Parmi $1, 2, 9, 13, 15, 17$, lesquels sont premiers ? Justifie pour 1 et 9.", solution: "**2, 13, 17** sont premiers. $1$ ne l'est pas (un seul diviseur — il en faut exactement deux) ; $9 = 3 \\times 3$ a trois diviseurs (1, 3, 9) ; $15 = 3 \\times 5$." },
    { tier: "challenge", prompt: "Trouve le chiffre manquant pour que $52\\,?4$ soit divisible par 9.", solution: "$5+2+?+4 = 11 + ?$ doit être multiple de 9 → $? = $ **7** ($11 + 7 = 18$) : $5\\,274 = 9 \\times 586$ ✓ — le critère se pilote à l'envers." },
    { tier: "exam", prompt: "Explique pourquoi le critère « somme des chiffres » fonctionne pour 9, en partant de $10 = 9 + 1$.", solution: "Chaque dizaine est un paquet de 9 **plus 1**, chaque centaine est $99 + 1$, etc. En distribuant, un nombre $= $ (gros multiple de 9) $+$ (somme de ses chiffres) — le multiple de 9 ne compte pas pour la divisibilité : tout se joue sur la **somme**. Le critère n'est pas une recette : c'est la numération décimale qui avoue." },
  ],
  practice: [
    { tier: "warmup", label: "La somme décide", make: (r) => {
      const base = randint(r, 12, 330) * 3; const ok = r() < 0.6; const n = ok ? base : base + pick(r, [1, 2]);
      return { prompt: `$${n}$ est-il divisible par 3 ? (1 = oui, 0 = non — par la somme des chiffres)`, answer: n % 3 === 0 ? 1 : 0, solution: `Somme des chiffres : $${String(n).split("").join("+")} = ${String(n).split("").reduce((a, c) => a + +c, 0)}$ → **${n % 3 === 0 ? "oui" : "non"}**.` };
    } },
    { tier: "application", label: "Premier ou pas ?", make: (r) => {
      const premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]; const composes = [9, 15, 21, 25, 27, 33, 35, 39, 49, 51];
      const isP = r() < 0.5; const n = isP ? pick(r, premiers) : pick(r, composes);
      return { prompt: `$${n}$ est-il premier ? (1 = oui, 0 = non)`, answer: isP ? 1 : 0, solution: isP ? `**Oui** — deux diviseurs seulement : 1 et ${n}.` : `**Non** — par exemple $${n} = ${[3, 5, 7].find(d => n % d === 0)} \\times ${n / [3, 5, 7].find(d => n % d === 0)}$.` };
    } },
  ],
};

// — Powers: squares and cubes (programme: notation, carrés de 0 à 12, cube de 10) —
const puissances = {
  id: "numbers.middle.puissances",
  level: "middle", domain: "numbers",
  title: "Carrés et cubes",
  tagline: "7² = 49, 10³ = 1 000 — l'exposant compte les facteurs.",
  prereqs: ["applied.middle.volume"],
  intuition:
    "Une notation pour les produits répétés : $7 \\times 7$ s'écrit $7^2$ (« 7 au **carré** ») et $10 \\times 10 \\times 10$ s'écrit $10^3$ (« 10 au **cube** »). Le petit nombre en haut — l'**exposant** — compte les facteurs.\n\nLes noms ne mentent pas : $7^2 = 49$ est l'aire du **carré** de côté 7 ; $10^3 = 1\\,000$ est le volume du **cube** d'arête 10.",
  depths: {
    discovery:
      "**Avec les mains** : dessine le carré 5 × 5 — 25 carreaux : $5^2 = 25$. Empile le cube 3 × 3 × 3 — 27 petits cubes : $3^3 = 27$. La géométrie a baptisé les puissances : deux dimensions pour le carré, trois pour le cube.",
    standard:
      "**En image** : les carrés de 0 à 12 se gravent comme les tables — $0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$. Pièges classiques : $7^2 = 49$ et non $14$ ($7^2$ multiplie, ne double pas !) ; et $1^2 = 1$, $0^2 = 0$ : les extrêmes ne bougent pas.",
    advanced:
      "**Dans la tête** : $10^3 = 1\\,000$ relie les puissances à la numération — mille est un cube, et chaque saut d'unité de volume vaut $10^3$ : $1$ m³ $= 1\\,000$ dm³ (le cube de 10 dans chaque dimension), exactement comme les aires sautaient de $10^2 = 100$. Les puissances ne sont pas une nouvelle opération : c'est la multiplication qui apprend à se compter elle-même — et en 4e, les exposants s'envoleront ($10^6$, $10^{-3}$…) pour écrire l'infiniment grand et petit.",
  },
  keyIdea: "$a^2 = a \\times a$ (l'aire du carré), $a^3 = a \\times a \\times a$ (le volume du cube). Carrés de 0 à 12 par cœur ; $10^3 = 1\\,000$.",
  why:
    "Pourquoi une notation pour si peu ? Parce qu'elle va grandir : aujourd'hui $7^2$, demain $10^9$ (ton milliard !), après-demain $2^{256}$ (la sécurité de ta carte). L'exposant est l'écriture compacte de la croissance répétée — la plus puissante du monde réel, des intérêts composés aux virus. Le carré et le cube sont ses deux premières marches.",
  examples: [
    { title: "Lire la notation", steps: [
      { p: "$7^2 = 7 \\times 7 = 49$ — l'exposant 2 compte **deux** facteurs 7 (pas $7 \\times 2$ !)." },
      { p: "$10^3 = 10 \\times 10 \\times 10 = 1\\,000$ — mille est le cube de dix." },
    ] },
    { title: "La géométrie des noms", steps: [
      { p: "Carré de côté 5 : aire $5^2 = 25$ carreaux." },
      { p: "Cube d'arête 3 : volume $3^3 = 27$ petits cubes — les puissances habitent les figures." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que signifie $7^2$ ? Pourquoi ce nom de « carré » ?", solution: "$7^2 = 7 \\times 7 = $ **49** — deux facteurs 7. « Carré » parce que c'est l'**aire** du carré de côté 7 : la figure a donné son nom au calcul." },
    { tier: "warmup", prompt: "Calcule : $6^2$ ; $11^2$ ; $2^3$ ; $10^3$.", solution: "**36** ; **121** ; **8** ; **1 000** — les carrés jusqu'à 12 et les premiers cubes se récitent comme les tables." },
    { tier: "application", prompt: "Quel nombre, élevé au carré, donne 144 ? Et au cube, donne 27 ?", solution: "$12^2 = 144$ → **12** ; $3^3 = 27$ → **3** — lire les puissances à l'envers, c'est déjà préparer les racines." },
    { tier: "challenge", prompt: "Vrai ou faux : $5^2 = 10$ ; $1^3 = 3$ ; $0^2 = 0$. Corrige les erreurs.", solution: "**Faux** : $5^2 = 25$ (l'exposant multiplie les facteurs, il ne multiplie pas par 2) ; **faux** : $1^3 = 1 \\times 1 \\times 1 = 1$ ; **vrai** : $0^2 = 0$ — les extrêmes 0 et 1 sont insensibles aux puissances." },
    { tier: "exam", prompt: "Explique avec $10^3$ pourquoi $1$ m³ $= 1\\,000$ dm³ alors que $1$ m $= 10$ dm.", solution: "Le mètre cube est un cube de **10 dm dans chaque dimension** : $10 \\times 10 \\times 10 = 10^3 = 1\\,000$ dm³ — trois dimensions, trois facteurs 10. Les longueurs sautent de 10, les aires de $10^2$, les volumes de $10^3$ : l'exposant **est** la dimension." },
  ],
  practice: [
    { tier: "warmup", label: "Les carrés par cœur", make: (r) => {
      const n = randint(r, 2, 12);
      return { prompt: `Calcule $${n}^2$.`, answer: n * n, solution: `$${n} \\times ${n} = $ **${n * n}**.` };
    } },
    { tier: "application", label: "La puissance à l'envers", make: (r) => {
      if (r() < 0.6) { const n = randint(r, 2, 12); return { prompt: `Quel nombre au carré donne ${n * n} ?`, answer: n, solution: `$${n}^2 = ${n * n}$ → **${n}**.` }; }
      const n = pick(r, [2, 3, 4, 5, 10]);
      return { prompt: `Quel nombre au cube donne ${n ** 3} ?`, answer: n, solution: `$${n}^3 = ${n ** 3}$ → **${n}**.` };
    } },
  ],
};

export default [priorites, divisibilite, puissances];
