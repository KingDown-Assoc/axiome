// Field "Algebra" — HIGH module (seconde year): algebraic computation and sign
// tables. Official programme: computation rules on relative-integer powers and
// on square roots with the REQUIRED PROOF √(ab) = √a·√b; simple computations on
// algebraic and fractional expressions; isolating a variable (U = RI, V = πr²h,
// ax + by = c); choosing the most adapted form of an expression; sums of
// inequalities, product of an inequality by a positive or negative real; the
// solution sets of ax + b = 0 and ax + b > 0; zero-product equations; SIGN of
// A(x)B(x) and A(x)/B(x) via SIGN TABLES; quotient equations A(x)/B(x) = k with
// the domain of definition.
import { randint, pick } from "../../core/exercises.js";

// — Algebraic computation (programme: puissances, racines, √(ab) = √a√b) —
const calculAlgebrique = {
  id: "algebra.high.calcul-algebrique",
  level: "high", domain: "algebra",
  title: "Puissances, racines et formules",
  tagline: "√(ab) = √a √b — démontré — et l'art d'isoler une variable.",
  prereqs: ["numbers.middle.exposants-negatifs", "algebra.middle.identites"],
  intuition:
    "Tes règles de calcul passent l'inspection du lycée : les puissances d'exposants **relatifs** ($a^m a^n = a^{m+n}$, $a^{-n} = \\frac{1}{a^n}$…) et les racines gagnent les leurs — $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ pour $a, b \\geq 0$.\n\nEt cette règle-là ne se décrète plus : elle se **démontre** — bienvenue dans un monde où chaque formule doit montrer ses papiers.",
  depths: {
    discovery:
      "**Avec les mains** : la démonstration de $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ — pose $x = \\sqrt{a}\\,\\sqrt{b}$ : c'est un **positif** (produit de positifs), et son carré vaut $x^2 = (\\sqrt{a})^2 (\\sqrt{b})^2 = ab$. Un positif dont le carré vaut $ab$ : c'est **la définition** de $\\sqrt{ab}$ — donc $x = \\sqrt{ab}$ ✓. Application immédiate : $\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$ — sortir le carré parfait.",
    standard:
      "**En image** : le piège jumeau — $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ ($\\sqrt{9 + 16} = 5$, mais $3 + 4 = 7$) : la racine traverse les **produits**, jamais les sommes. Même prudence pour les expressions fractionnaires : réduire au même dénominateur, simplifier par un **facteur** commun ($\\frac{2x}{2y} = \\frac{x}{y}$), jamais par un terme ($\\frac{2 + x}{2 + y}$ ne se simplifie pas !).",
    advanced:
      "**Dans la tête** : **isoler une variable** est le geste le plus utile du lycée — $U = RI$ : qui cherche $R$ divise ($R = \\frac{U}{I}$) ; $V = \\pi r^2 h$ : qui cherche $r$ divise puis prend la racine ($r = \\sqrt{\\frac{V}{\\pi h}}$) ; $ax + by = c$ : qui cherche $y$ soustrait puis divise ($y = \\frac{c - ax}{b}$). Toujours la même grammaire : défaire les opérations en ordre inverse — tes équations de 4e, devenues réflexe transversal : la physique, la chimie, l'économie ne font que ça.",
  },
  keyIdea: "$\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ ($a, b \\geq 0$) — démontré par « positif de carré $ab$ » ; mais $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$. Isoler une variable : défaire les opérations **en ordre inverse**. Simplifier par un facteur, jamais par un terme.",
  why:
    "Pourquoi démontrer une règle de calcul qui marche depuis la 4e ? Parce que le lycée inverse la charge de la preuve : une formule n'est plus vraie parce qu'elle marche sur des exemples, mais parce qu'un raisonnement la garantit **partout**. Et la méthode de cette démonstration — vérifier qu'un candidat est positif et a le bon carré — est un patron réutilisable : la moitié des preuves d'analyse procèdent ainsi, par caractérisation.",
  examples: [
    { title: "Sortir le carré parfait", steps: [
      { p: "$\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25}\\,\\sqrt{2} = 5\\sqrt{2}$." },
      { p: "La règle produit en action : la racine se range, le carré sort." },
    ] },
    { title: "Isoler r dans V = πr²h", steps: [
      { p: "$r^2 = \\dfrac{V}{\\pi h}$ — diviser par ce qui entoure." },
      { p: "$r = \\sqrt{\\dfrac{V}{\\pi h}}$ — puis remonter le carré : les opérations inverses, en ordre inverse." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Simplifie $\\sqrt{50}$, $\\sqrt{72}$ et $\\sqrt{18} \\times \\sqrt{2}$ avec la règle du produit.", solution: "$\\sqrt{50} = 5\\sqrt{2}$ ; $\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$ ; $\\sqrt{18} \\times \\sqrt{2} = \\sqrt{36} = $ **6** — sortir ou rentrer les carrés parfaits, au choix du calcul." },
    { tier: "warmup", prompt: "Vrai ou faux : $\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16}$ ? Et $\\sqrt{9 \\times 16} = \\sqrt{9} \\times \\sqrt{16}$ ?", solution: "**Faux** : $\\sqrt{25} = 5 \\neq 3 + 4$ — la racine ne traverse pas les sommes. **Vrai** : $\\sqrt{144} = 12 = 3 \\times 4$ — elle traverse les produits : c'est toute la règle." },
    { tier: "application", prompt: "Isole la variable demandée : $R$ dans $U = RI$ ; $h$ dans $V = \\pi r^2 h$ ; $y$ dans $2x + 3y = 12$.", solution: "$R = \\dfrac{U}{I}$ ; $h = \\dfrac{V}{\\pi r^2}$ ; $y = \\dfrac{12 - 2x}{3}$ — défaire ce qui entoure, dans l'ordre inverse : le réflexe que toutes les sciences réclament." },
    { tier: "challenge", prompt: "Calcule $\\left(2^{-3}\\right)^2 \\times 2^{8}$ et simplifie $\\dfrac{\\sqrt{12}}{\\sqrt{3}}$.", solution: "$2^{-6} \\times 2^8 = 2^2 = $ **4** ; $\\dfrac{\\sqrt{12}}{\\sqrt{3}} = \\sqrt{\\dfrac{12}{3}} = \\sqrt{4} = $ **2** — les règles jumelles : la racine traverse aussi les quotients." },
    { tier: "exam", prompt: "Démontre que pour tous réels positifs $a$ et $b$ : $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ (caractérise $\\sqrt{ab}$ comme l'unique positif de carré $ab$).", solution: "Pose $x = \\sqrt{a}\\,\\sqrt{b}$. D'une part $x \\geq 0$ (produit de deux positifs) ; d'autre part $x^2 = (\\sqrt{a})^2(\\sqrt{b})^2 = ab$. Or $\\sqrt{ab}$ est **par définition** l'unique positif dont le carré vaut $ab$ : donc $x = \\sqrt{ab}$, c'est-à-dire $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ — démonstration par caractérisation : exhiber un candidat, vérifier qu'il coche les deux cases de la définition." },
  ],
  practice: [
    { tier: "warmup", label: "Sortir le carré", make: (r) => {
      const k = pick(r, [2, 3, 5, 7]); const c = pick(r, [2, 3, 4, 5, 6]);
      return { prompt: `$\\sqrt{${c * c * k}} = \\,? \\sqrt{${k}}$ : quel coefficient sort de la racine ?`, answer: c, solution: `$\\sqrt{${c * c} \\times ${k}} = \\sqrt{${c * c}}\\,\\sqrt{${k}} = ${c}\\sqrt{${k}}$ — le coefficient : **${c}**.` };
    } },
    { tier: "application", label: "Isoler la variable", make: (r) => {
      const rr = randint(r, 2, 9); const i = randint(r, 2, 9);
      return { prompt: `$U = RI$ avec $U = ${rr * i}$ et $I = ${i}$ : que vaut $R$ ?`, answer: rr, solution: `$R = \\dfrac{U}{I} = \\dfrac{${rr * i}}{${i}} = $ **${rr}** — isoler, puis substituer.` };
    } },
    { tier: "challenge", label: "Racines en produit", make: (r) => {
      const m = pick(r, [[2, 8, 4], [3, 12, 6], [2, 18, 6], [5, 20, 10], [3, 27, 9]]);
      return { prompt: `$\\sqrt{${m[0]}} \\times \\sqrt{${m[1]}} = \\,?$ (le produit est un carré parfait)`, answer: m[2], solution: `$\\sqrt{${m[0] * m[1]}} = $ **${m[2]}** — rentrer sous une seule racine, reconnaître le carré.` };
    } },
  ],
};

// — Inequalities and sign tables (programme: signe de ax+b, tableaux, quotients) —
const inequationsSignes = {
  id: "algebra.high.inequations-signes",
  level: "high", domain: "algebra",
  title: "Inégalités et tableaux de signes",
  tagline: "Le signe de chaque facteur, ligne par ligne — et le produit avoue le sien.",
  prereqs: ["algebra.middle.inequations", "algebra.middle.equation-produit"],
  intuition:
    "Le signe de $ax + b$ se résume en une phrase : nul en $-\\frac{b}{a}$, du signe de $a$ **après**, du signe contraire **avant**. Une droite qui monte ($a > 0$) passe du − au + ; une qui descend, l'inverse.\n\nEt pour un **produit** $A(x)B(x)$ ou un **quotient** $\\frac{A(x)}{B(x)}$ : le **tableau de signes** — chaque facteur sa ligne, la règle des signes conclut colonne par colonne.",
  depths: {
    discovery:
      "**Avec les mains** : le signe de $2x - 6$ — il s'annule en $x = 3$ ; pour $x > 3$ : positif (essaie 4 : $2$) ; pour $x < 3$ : négatif (essaie 0 : $-6$). Coefficient $a = 2 > 0$ : la droite monte, le signe passe de − à + en traversant la racine. C'est tout le théorème — et il se lit sur le graphique de ta fonction affine.",
    standard:
      "**En image** : le tableau pour $(2x - 6)(x + 1) > 0$ — trois lignes : $x$ avec les racines triées ($-1$ et $3$), une ligne par facteur (chacun son signe : $x + 1$ négatif avant $-1$, positif après ; $2x - 6$ négatif avant 3, positif après), et la ligne **produit** : la règle des signes colonne par colonne donne $+, -, +$. Solutions de $> 0$ : $\\,]-\\infty, -1[ \\,\\cup\\, ]3, +\\infty[$ — le tableau transforme un problème de degré 2 en lecture de lignes.",
    advanced:
      "**Dans la tête** : le **quotient** ajoute une subtilité — pour $\\dfrac{x - 2}{x + 1} \\leq 0$ : même tableau, mais $x = -1$ annule le **dénominateur** : la valeur est **interdite** (double barre dans le tableau !) — l'ensemble de définition exclut $-1$. Solutions : $\\,]-1, 2]$ — crochet ouvert sur l'interdit, fermé sur la racine du numérateur. Et l'équation quotient $\\frac{A(x)}{B(x)} = k$ suit la même hygiène : poser le domaine d'abord, résoudre ensuite ($\\frac{x-2}{x+1} = 3 \\Rightarrow x - 2 = 3(x+1) \\Rightarrow x = -\\frac{5}{2}$, qui respecte le domaine ✓). Le réflexe domaine-d'abord est la politesse du calcul.",
  },
  keyIdea: "$ax + b$ : nul en $-\\frac{b}{a}$, du signe de $a$ **après**. Produit/quotient : une ligne par facteur, la règle des signes par colonne — et la **double barre** sur les valeurs qui annulent un dénominateur : domaine d'abord.",
  why:
    "Pourquoi un tableau quand on pourrait tester des valeurs ? Parce que le tableau **prouve** : il couvre tous les réels d'un coup, là où les essais n'attrapent que des points. C'est l'outil charnière du lycée — variations de fonctions, études de signes de dérivées en première, tout passera par lui : la seconde t'en donne la grammaire sur les affines, le reste de la scolarité ne fera qu'ajouter des lignes.",
  examples: [
    { title: "Le tableau du produit", steps: [
      { p: "$(2x - 6)(x + 1)$ : racines $-1$ et $3$ triées ; ligne $x + 1$ : $-, +, +$ ; ligne $2x - 6$ : $-, -, +$." },
      { p: "Ligne produit : $+, -, +$ — solutions de $> 0$ : $\\,]-\\infty, -1[ \\,\\cup\\, ]3, +\\infty[$." },
    ] },
    { title: "Le quotient et sa double barre", steps: [
      { p: "$\\dfrac{x - 2}{x + 1}$ : racine 2 au numérateur, **interdit** en $-1$ (double barre)." },
      { p: "Signes $+, -, +$ ; solutions de $\\leq 0$ : $\\,]-1, 2]$ — ouvert sur l'interdit, fermé sur la racine." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne le signe de $2x - 6$ selon $x$, et relie-le au graphique de la fonction affine associée.", solution: "Nul en $x = 3$ ; **négatif avant, positif après** ($a = 2 > 0$) — la droite monte et traverse l'axe en 3 : le signe de l'expression est la position de la droite par rapport à l'axe." },
    { tier: "warmup", prompt: "Dresse le tableau de signes de $-3x + 12$.", solution: "Nul en $x = 4$ ; $a = -3 < 0$ : **positif avant 4, négatif après** — la droite descend : le signe de $a$ commande le sens de la traversée." },
    { tier: "application", prompt: "Résous $(2x - 6)(x + 1) > 0$ par un tableau de signes.", solution: "Racines $-1$ et 3 ; lignes facteurs puis produit : $+, -, +$ → solutions $\\,]-\\infty, -1[ \\,\\cup\\, ]3, +\\infty[$ — strictement positif : les bornes sont exclues." },
    { tier: "challenge", prompt: "Résous $\\dfrac{x - 2}{x + 1} \\leq 0$ — et explique le sort des deux bornes.", solution: "Interdit en $-1$ (dénominateur nul : double barre), racine en 2 ; signes $+, -, +$ → solutions $\\,]-1, 2]$ : $-1$ **exclu** (hors domaine), $2$ **inclus** (le quotient y vaut 0, et $\\leq$ l'accepte) — chaque crochet a sa raison." },
    { tier: "exam", prompt: "Résous l'équation quotient $\\dfrac{x - 2}{x + 1} = 3$ en commençant par l'ensemble de définition, et vérifie.", solution: "**Domaine d'abord** : $x \\neq -1$. Sur ce domaine, multiplier par $x + 1$ : $x - 2 = 3(x + 1) = 3x + 3$, d'où $-2x = 5$ et $x = -\\dfrac{5}{2}$ — qui respecte le domaine ($-\\frac{5}{2} \\neq -1$) ✓. Vérification : $\\dfrac{-5/2 - 2}{-5/2 + 1} = \\dfrac{-9/2}{-3/2} = 3$ ✓ — l'équation quotient se résout en deux temps : déclarer les interdits, puis libérer le dénominateur." },
  ],
  practice: [
    { tier: "warmup", label: "La racine du signe", make: (r) => {
      const a = pick(r, [2, 3, 4, 5]); const x0 = randint(r, -6, 8);
      return { prompt: `En quelle valeur $${a}x ${x0 * a >= 0 ? "- " + a * x0 : "+ " + (-a * x0)}$ s'annule-t-il ?`, answer: x0, solution: `$${a}x = ${a * x0}$ → $x = $ **${x0}** — et le signe de $a$ (positif) dit : − avant, + après.` };
    } },
    { tier: "application", label: "Le signe à droite", make: (r) => {
      const a = (r() < 0.5 ? 1 : -1) * pick(r, [2, 3, 5]); const x0 = randint(r, -4, 6);
      return { prompt: `Pour $x$ très grand, $${a}x ${-a * x0 >= 0 ? "+ " + (-a * x0) : "- " + (a * x0)}$ est-il positif ? (1 = oui, 0 = non)`, answer: a > 0 ? 1 : 0, solution: `Après la racine, l'expression est du **signe** de $a$ : $a = ${a}$ → ${a > 0 ? "**positif**" : "**négatif**"}.` };
    } },
    { tier: "challenge", label: "La valeur interdite", make: (r) => {
      const b = randint(r, -7, 7) || 3;
      return { prompt: `Quelle valeur est interdite pour $\\dfrac{x - 2}{x ${b >= 0 ? "+ " + b : "- " + (-b)}}$ ?`, answer: -b, solution: `Le dénominateur s'annule en $x = $ **${-b}** — double barre au tableau : le domaine l'exclut.` };
    } },
  ],
};

export default [calculAlgebrique, inequationsSignes];
