// Field "Algebra" — HIGH module (premiere year), part 1: sequences. Official
// première spécialité programme: generation modes of a sequence (explicit
// formula u_n = f(n), recurrence u_{n+1} = f(u_n)), notations u(n) and u_n;
// ARITHMETIC sequences (definition, general term) and GEOMETRIC sequences
// (definition, general term) with the link to successive evolutions at constant
// rate; direction of variation; REQUIRED PROOFS: general term of an arithmetic
// sequence, of a geometric sequence, computation of 1 + 2 + … + n and of
// 1 + q + … + q^n; intuitive introduction of limits (finite, infinite, none);
// official algorithms: terms, sums, thresholds, factorial, Syracuse and
// Fibonacci lists, tower of Hanoi.
import { randint, pick } from "../../core/exercises.js";

// — Arithmetic and geometric sequences (programme: modes de génération, termes généraux) —
const suites = {
  id: "algebra.high.suites",
  level: "high", domain: "algebra",
  title: "Suites arithmétiques et géométriques",
  tagline: "+r ou ×q à chaque pas — les deux moteurs de toute évolution discrète.",
  prereqs: ["applied.high.evolutions-successives", "logic.high.python"],
  intuition:
    "Une **suite** est une liste infinie de nombres indexée par $\\mathbb{N}$ : $u_0, u_1, u_2, \\ldots$ — une fonction sur les entiers, notée $u_n$ ou $u(n)$.\n\nDeux familles dominent le monde : les **arithmétiques** (on **ajoute** la raison $r$ à chaque pas) et les **géométriques** (on **multiplie** par la raison $q$) — la croissance linéaire et la croissance exponentielle, en version discrète.",
  depths: {
    discovery:
      "**Avec les mains** : deux façons d'engendrer — la **récurrence** dit le pas suivant ($u_{n+1} = u_n + 5$ : chaque terme naît du précédent), la **formule explicite** dit le terme directement ($u_n = 3 + 5n$ : saute à $u_{100}$ sans calculer les 99 autres). La récurrence raconte le mécanisme, l'explicite donne le raccourci — et passer de l'une à l'autre est tout l'art.",
    standard:
      "**En image** : les termes généraux, **démontrés** — arithmétique de premier terme $u_0$ et de raison $r$ : pour atteindre $u_n$, on a ajouté $r$ exactement $n$ fois, donc $u_n = u_0 + nr$ ; géométrique : on a multiplié par $q$ exactement $n$ fois, donc $u_n = u_0 \\times q^n$ — deux preuves en une phrase chacune (compter les pas), deux raccourcis pour l'éternité. Et le sens de variation se lit sur la raison : arithmétique croissante si $r > 0$ ; géométrique (à termes positifs) croissante si $q > 1$, décroissante si $0 < q < 1$.",
    advanced:
      "**Dans la tête** : tes évolutions successives reviennent en costume de suite — un capital à $+3\\,\\%$ par an est la suite géométrique $u_{n+1} = 1{,}03\\,u_n$ : le coefficient multiplicateur **est** la raison, et $u_n = u_0 \\times 1{,}03^n$ enchaîne $n$ années d'un coup. Le partage du monde est net : ce qui croît d'une **quantité fixe** (abonnement, remplissage régulier) est arithmétique ; ce qui croît d'un **pourcentage fixe** (capital, population, épidémie naissante) est géométrique — et la géométrique finit **toujours** par écraser l'arithmétique : Sissa et son échiquier l'avaient appris à leur roi.",
  },
  keyIdea: "Arithmétique : $u_{n+1} = u_n + r$, terme général $u_n = u_0 + nr$ ($n$ ajouts). Géométrique : $u_{n+1} = q \\, u_n$, terme général $u_n = u_0 \\, q^n$ ($n$ multiplications). Quantité fixe $=$ arithmétique ; pourcentage fixe $=$ géométrique.",
  why:
    "Pourquoi deux familles seulement, parmi l'infinité des suites ? Parce que « le pas ne dépend pas de la position » est la plus simple des hypothèses — et que le monde la vérifie souvent : intérêts, loyers indexés, désintégrations, remboursements. Ces deux modèles sont aux évolutions discrètes ce que les fonctions affines sont aux continues : le premier réflexe du modélisateur — et la première question d'un examen d'économie comme de biologie.",
  examples: [
    { title: "Le terme général, démontré", steps: [
      { p: "Arithmétique : de $u_0$ à $u_n$, on ajoute $r$ exactement $n$ fois." },
      { p: "$u_n = u_0 + nr$ — la preuve tient dans le comptage des pas ; pour la géométrique : $u_n = u_0 \\, q^n$." },
    ] },
    { title: "Le capital en suite", steps: [
      { p: "1 000 € à $+3\\,\\%$ par an : $u_{n+1} = 1{,}03\\,u_n$ — géométrique de raison $1{,}03$." },
      { p: "Dans 10 ans : $u_{10} = 1\\,000 \\times 1{,}03^{10} \\approx 1\\,344$ € — dix années en une formule." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "La suite $u_{n+1} = u_n + 5$, $u_0 = 3$ : calcule $u_1, u_2, u_3$, puis donne une formule explicite pour $u_n$.", solution: "$8, 13, 18$ — on ajoute 5 à chaque pas : **arithmétique** de raison 5, et $u_n = 3 + 5n$ (vérification : $u_3 = 18$ ✓) — la récurrence raconte, l'explicite saute." },
    { tier: "warmup", prompt: "Démontre le terme général d'une suite arithmétique de premier terme $u_0$ et de raison $r$.", solution: "De $u_0$ à $u_n$, on effectue exactement $n$ pas, chacun ajoutant $r$ : au total $u_n = u_0 + nr$ — la démonstration compte les ajouts ; pour partir de $u_1$ : $u_n = u_1 + (n-1)r$." },
    { tier: "application", prompt: "Un capital de 1 000 € est placé à 3 % par an. Écris la relation de récurrence, identifie la suite, et calcule le capital après 10 ans.", solution: "$u_{n+1} = 1{,}03\\,u_n$ : **géométrique** de raison $q = 1{,}03$ (le coefficient multiplicateur de seconde !) — $u_{10} = 1\\,000 \\times 1{,}03^{10} \\approx $ **1 344 €** : le terme général enchaîne les années." },
    { tier: "challenge", prompt: "La suite $v_n = 5 \\times 0{,}8^n$ : nature, raison, sens de variation ? Et que devient-elle pour $n$ très grand ?", solution: "**Géométrique** de raison $0{,}8$, premier terme 5 — termes positifs et $0 < q < 1$ : **décroissante**, et $0{,}8^n$ s'écrase vers 0 : la suite fond vers **0** (chaque pas garde 80 % du précédent — ta dépréciation de seconde, indexée)." },
    { tier: "exam", prompt: "Démontre le terme général d'une suite géométrique de raison $q$, puis utilise-le : une ville de 20 000 habitants perd 2 % de sa population chaque année — population dans 15 ans (arrondi à la centaine), et nature de la croissance comparée à une perte fixe de 400 habitants/an.", solution: "De $u_0$ à $u_n$ : $n$ multiplications par $q$, donc $u_n = u_0 \\, q^n$ ✓. Ville : $q = 0{,}98$, $u_{15} = 20\\,000 \\times 0{,}98^{15} \\approx $ **14 800** habitants. La perte fixe (arithmétique : $20\\,000 - 400 \\times 15 = 14\\,000$) ferait pire à 15 ans — mais la géométrique ralentit sa perte (2 % d'une population qui fond), l'arithmétique fonce droit vers zéro et même au-delà : deux modèles, deux destins, et le choix du modèle est la vraie décision." },
  ],
  practice: [
    { tier: "warmup", label: "Le pas suivant", make: (r) => {
      const arith = r() < 0.5;
      const u0 = randint(r, 1, 9);
      if (arith) { const pas = randint(r, 2, 7); return { prompt: `Suite arithmétique : $u_0 = ${u0}$, raison $${pas}$. Que vaut $u_3$ ?`, answer: u0 + 3 * pas, solution: `$u_3 = ${u0} + 3 \\times ${pas} = $ **${u0 + 3 * pas}** — trois ajouts.` }; }
      const q = randint(r, 2, 3); return { prompt: `Suite géométrique : $u_0 = ${u0}$, raison $${q}$. Que vaut $u_3$ ?`, answer: u0 * q ** 3, solution: `$u_3 = ${u0} \\times ${q}^3 = $ **${u0 * q ** 3}** — trois multiplications.` };
    } },
    { tier: "application", label: "Sauter au terme n", make: (r) => {
      const u0 = randint(r, 2, 12); const pas = randint(r, 3, 9); const n = randint(r, 10, 40);
      return { prompt: `Arithmétique : $u_0 = ${u0}$, raison $${pas}$. Que vaut $u_{${n}}$ ? (formule explicite !)`, answer: u0 + n * pas, solution: `$u_{${n}} = ${u0} + ${n} \\times ${pas} = $ **${u0 + n * pas}** — l'explicite saute les ${n - 1} termes intermédiaires.` };
    } },
    { tier: "challenge", label: "La raison remontée", make: (r) => {
      const u0 = randint(r, 2, 8); const q = randint(r, 2, 4); const n = randint(r, 2, 4);
      return { prompt: `Suite géométrique : $u_0 = ${u0}$ et $u_{${n}} = ${u0 * q ** n}$. Quelle est la raison ?`, answer: q, solution: `$q^{${n}} = \\dfrac{${u0 * q ** n}}{${u0}} = ${q ** n}$ → $q = $ **${q}** — le terme général lu à l'envers.` };
    } },
  ],
};

// — Sums, thresholds, limits (programme: 1+…+n, 1+q+…+q^n, seuils) —
const suitesSommes = {
  id: "algebra.high.suites-sommes",
  level: "high", domain: "algebra",
  title: "Sommes, seuils et limites",
  tagline: "Gauss plie la somme en deux — et le télescope avale la géométrique.",
  prereqs: ["algebra.high.suites"],
  intuition:
    "Additionner les cent premiers entiers ? Le petit Gauss, dit-on, répondit en quelques secondes : **plier la somme** — $1 + 100 = 101$, $2 + 99 = 101$… cinquante paires : $5\\,050$.\n\nDeux formules couronnent les suites : $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$ et $1 + q + \\cdots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ — toutes deux **démontrables en quatre lignes**.",
  depths: {
    discovery:
      "**Avec les mains** : la preuve de Gauss en général — écris $S = 1 + 2 + \\cdots + n$ puis la même somme **à l'envers** dessous : chaque colonne vaut $n + 1$, il y a $n$ colonnes, donc $2S = n(n+1)$ et $S = \\dfrac{n(n+1)}{2}$ ✓ — le pliage devenu démonstration : la somme arithmétique, c'est (premier + dernier) × nombre de termes ÷ 2.",
    standard:
      "**En image** : la somme **géométrique** se démontre par télescopage — pose $S = 1 + q + \\cdots + q^n$ et calcule $(1 - q)S = S - qS$ : tous les termes du milieu s'annulent deux à deux, il ne survit que $1 - q^{n+1}$ — donc $S = \\dfrac{1 - q^{n+1}}{1 - q}$ (pour $q \\neq 1$) ✓. L'échiquier de Sissa se solde enfin : $1 + 2 + \\cdots + 2^{63} = 2^{64} - 1$ grains — la formule règle en une ligne ce que le roi n'a jamais pu payer.",
    advanced:
      "**Dans la tête** : deux questions d'avenir — le **seuil** : à partir de quel rang $u_n$ dépasse-t-il un cap ? Ta boucle *tant que* le traque (« tant que $u <$ seuil : avancer, compter ») : c'est l'algorithme officiel, et le capital qui double, l'épidémie qui sature, le forfait qui devient rentable sont tous des problèmes de seuil. Et la **limite**, en version intuitive : $0{,}8^n$ fond vers 0, $1{,}03^n$ explose vers $+\\infty$, $(-1)^n$ oscille sans destination — finie, infinie, ou absente : la première vraie question d'analyse, que la terminale formalisera. En attendant, les suites célèbres défilent : **Fibonacci** ($u_{n+2} = u_{n+1} + u_n$ : les lapins, les tournesols), **Syracuse** (moitié ou $3n+1$ : la conjecture que personne n'a percée), **Hanoï** ($2^n - 1$ déplacements : les moines et la fin du monde).",
  },
  keyIdea: "$1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$ (le pliage de Gauss) ; $1 + q + \\cdots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ (le télescopage $(1-q)S$). Seuil : la boucle *tant que* ; limite intuitive : finie, infinie, ou absente.",
  why:
    "Pourquoi sommer des suites ? Parce que le monde **cumule** : un versement mensuel est un terme, l'épargne est la somme ; une dose quotidienne est un terme, la concentration est la somme. Les annuités, les amortissements, les rentes — toute la mathématique financière — vivent de la somme géométrique : la formule de quatre lignes pilote des milliards.",
  examples: [
    { title: "Le pliage de Gauss", steps: [
      { p: "$S = 1 + 2 + \\cdots + n$, et la même à l'envers : chaque colonne somme à $n + 1$." },
      { p: "$2S = n(n+1)$, donc $S = \\dfrac{n(n+1)}{2}$ — pour $n = 100$ : **5 050**." },
    ] },
    { title: "Le télescopage", steps: [
      { p: "$(1 - q)S = (1 + q + \\cdots + q^n) - (q + q^2 + \\cdots + q^{n+1})$ : le milieu s'évapore." },
      { p: "$= 1 - q^{n+1}$, donc $S = \\dfrac{1 - q^{n+1}}{1 - q}$ — l'échiquier de Sissa : $2^{64} - 1$ grains." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $1 + 2 + \\cdots + 100$ par la méthode du pliage, en expliquant le geste.", solution: "Apparier $1 + 100$, $2 + 99$, … : **50 paires** valant chacune 101 → $50 \\times 101 = $ **5 050** — le pliage transforme cent additions en une multiplication : la légende du petit Gauss." },
    { tier: "warmup", prompt: "Démontre que $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$.", solution: "Écris $S$ puis $S$ renversée et additionne colonne par colonne : chaque colonne vaut $n + 1$, il y en a $n$ — donc $2S = n(n + 1)$ et $S = \\dfrac{n(n+1)}{2}$ ✓ : la démonstration exigible, en quatre lignes." },
    { tier: "application", prompt: "Démontre que $1 + q + \\cdots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ pour $q \\neq 1$, puis calcule $1 + 2 + 4 + \\cdots + 2^{10}$.", solution: "$(1 - q)S$ : les termes intermédiaires s'annulent deux à deux (télescopage), reste $1 - q^{n+1}$ → $S = \\dfrac{1 - q^{n+1}}{1 - q}$ ✓. Pour $q = 2$, $n = 10$ : $\\dfrac{1 - 2^{11}}{1 - 2} = 2^{11} - 1 = $ **2 047**." },
    { tier: "challenge", prompt: "Décris l'algorithme de seuil : à partir de quel rang $u_n = 1\\,000 \\times 1{,}03^n$ dépasse-t-il 2 000 (le capital double) ? Donne la structure de la boucle et le rang.", solution: "« $u \\gets 1000$ ; $n \\gets 0$ ; **tant que** $u < 2000$ : $u \\gets 1{,}03 \\times u$ ; $n \\gets n + 1$ ; afficher $n$ » — la boucle de 3e au service des suites : elle s'arrête à $n = $ **24** ($1{,}03^{24} \\approx 2{,}03$) — un capital à 3 % double en 24 ans." },
    { tier: "exam", prompt: "Donne la limite intuitive (finie, infinie, ou absence) de : $u_n = 0{,}8^n$ ; $v_n = 1{,}03^n$ ; $w_n = (-1)^n$ ; $t_n = 5 + \\frac{1}{n}$ — et justifie d'une phrase chacune.", solution: "$0{,}8^n \\to $ **0** (chaque pas garde 80 % : la valeur fond) ; $1{,}03^n \\to +\\infty$ (croissance géométrique : tout cap est dépassé — ton seuil le prouve) ; $(-1)^n$ : **pas de limite** (oscille entre $-1$ et $1$ sans se décider) ; $t_n \\to $ **5** (le $\\frac{1}{n}$ s'évanouit). Quatre destins — finie, infinie, absente, finie : le vocabulaire intuitif que la terminale armera de définitions." },
  ],
  practice: [
    { tier: "warmup", label: "Le pliage", make: (r) => {
      const n = pick(r, [10, 20, 50, 100, 200]);
      return { prompt: `$1 + 2 + \\cdots + ${n} = \\,?$ (la formule de Gauss)`, answer: n * (n + 1) / 2, solution: `$\\dfrac{${n} \\times ${n + 1}}{2} = $ **${n * (n + 1) / 2}**.` };
    } },
    { tier: "application", label: "La somme des puissances", make: (r) => {
      const n = randint(r, 3, 8);
      return { prompt: `$1 + 2 + 4 + \\cdots + 2^{${n}} = \\,?$`, answer: 2 ** (n + 1) - 1, solution: `$\\dfrac{1 - 2^{${n + 1}}}{1 - 2} = 2^{${n + 1}} - 1 = $ **${2 ** (n + 1) - 1}** — l'échiquier en réduction.` };
    } },
    { tier: "challenge", label: "Le seuil traqué", make: (r) => {
      const q = pick(r, [2, 3]); const u0 = randint(r, 1, 4); const seuil = u0 * q ** randint(r, 3, 6) + 1;
      let n = 0; let u = u0; while (u < seuil) { u *= q; n++; }
      return { prompt: `$u_0 = ${u0}$, raison $${q}$ : premier rang $n$ tel que $u_n > ${seuil}$ ? (la boucle tant que !)`, answer: n, solution: `$${u0} \\times ${q}^{${n}} = ${u0 * q ** n} > ${seuil}$ (et $${u0 * q ** (n - 1)}$ ne suffisait pas) — rang **${n}**.` };
    } },
  ],
};

export default [suites, suitesSommes];
