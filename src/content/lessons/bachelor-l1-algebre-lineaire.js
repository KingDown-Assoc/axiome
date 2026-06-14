// Field "Algebra" — BACHELOR module (l1 year), licence de mathématiques.
// Official MPSI/MP2I programme (arrêté 2021), chapters "Espaces vectoriels
// et applications linéaires" (vector spaces, subspaces, spans, finite
// dimension: free/generating families and bases, dimension theorem, rank
// of a family; linear maps: kernel and image, RANK THEOREM, projectors and
// symmetries, isomorphisms) and "Matrices" (matrix of a linear map in given
// bases, matrix-vector dictionary, change of basis: passage matrices,
// equivalent and similar matrices). Singapore method at university level:
// Concrete = manipulate explicit spaces (R^2, polynomials, sequences) and
// ONE projector; Pictorial = the plane spanned by two vectors, the
// kernel-image factory diagram, the commutative square of base change;
// Abstract = axioms, the rank theorem and its proof idea. Big ideas named;
// exam = colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — Vector spaces and dimension (MPSI: espaces vectoriels, dimension finie) —
const espacesVectoriels = {
  id: "algebra.bachelor.espaces-vectoriels",
  level: "bachelor", domain: "algebra",
  title: "Espaces vectoriels et dimension",
  tagline: "Flèches, polynômes, suites, signaux — un seul mot d'ordre : combiner linéairement.",
  prereqs: ["geometry.high.vecteurs-coordonnees", "algebra.bachelor.structures-algebriques"],
  intuition:
    "Tes vecteurs du plan s'additionnent et se dilatent — mais les polynômes aussi, les suites aussi, les fonctions aussi, les solutions d'une équation différentielle linéaire aussi.\n\nL'**espace vectoriel** axiomatise ce geste commun : un ensemble où l'on **combine linéairement** — et la **dimension** comptera les degrés de liberté de chacun de ces mondes.",
  depths: {
    discovery:
      "**Avec les mains** : habite trois espaces — dans $\\mathbb{R}^2$, combine $(1, 0)$ et $(0, 1)$ : tu atteins tout le plan ; dans $\\mathbb{R}_2[X]$, combine $1, X, X^2$ : tu fabriques tous les trinômes ; dans les suites, combine $(1, 1, 1, \\ldots)$ et $(1, 2, 3, \\ldots)$ : toutes les suites arithmétiques sortent — trois mondes, **un seul geste** : $\\lambda u + \\mu v$ — et le test de **sous-espace** tient en une ligne : non vide et stable par combinaison linéaire.",
    standard:
      "**En image** : $\\text{Vect}(u, v)$ se dessine — deux vecteurs non colinéaires de $\\mathbb{R}^3$ engendrent un **plan** (toutes leurs combinaisons : le parallélogramme dilaté à l'infini) ; ajoute un troisième vecteur DANS ce plan : rien de neuf (il était combinaison des deux — famille **liée**) ; un troisième HORS du plan : l'espace entier jaillit (famille **libre**) — big idea *Diagrams* : libre = aucun vecteur n'est dans le sous-espace engendré par les autres, et le dessin du plan-qui-grossit-ou-pas EST la définition.",
    advanced:
      "**Dans la tête** : la **base** = famille libre ET génératrice — chaque vecteur s'écrit alors de façon **unique** comme combinaison (existence par génératrice, unicité par liberté) : les coordonnées naissent ; et le **théorème de la dimension** verrouille tout : dans un espace de dimension finie, toutes les bases ont le même cardinal — ce nombre, la **dimension**, compte les degrés de liberté ($\\dim \\mathbb{R}^n = n$, $\\dim \\mathbb{R}_n[X] = n + 1$, les solutions de $y'' + ay' + by = 0$ : dimension 2 — ton chapitre calcul-pratique relu !). Les inégalités de comptage en découlent : libre ⟹ cardinal $\\leq \\dim$, génératrice ⟹ cardinal $\\geq \\dim$, et en dimension $n$ exactement, une famille de $n$ vecteurs est libre ⟺ génératrice ⟺ base — le comptage remplace la moitié des vérifications : big idea *Invariance* — la dimension est LE nombre qui ne dépend d'aucun choix.",
  },
  keyIdea: "Espace vectoriel : on **combine linéairement** ($\\mathbb{R}^n$, polynômes, suites, solutions d'EDL) ; sous-espace : stable par combinaison. **Libre** (personne n'est combinaison des autres), **génératrice**, **base** = les deux ⟹ coordonnées uniques. **Dimension** : le cardinal commun des bases (*Invariance*) — et en dimension $n$ : $n$ vecteurs libres ⟺ base.",
  why:
    "Pourquoi axiomatiser des flèches ? Parce que les flèches sont le cas visible d'un phénomène universel : dès qu'un problème est **linéaire** (signaux, équations différentielles, images, états quantiques, codes correcteurs), ses solutions forment un espace vectoriel — et la dimension dit d'avance combien de paramètres le décrivent. C'est l'infrastructure de toutes les mathématiques appliquées : le L2 réduira ses endomorphismes, le traitement du signal décomposera sur des bases de Fourier — tout commence par savoir compter les degrés de liberté.",
  examples: [
    { title: "Trois mondes, un geste", steps: [
      { p: "$\\mathbb{R}^2$, $\\mathbb{R}_2[X]$, les suites arithmétiques : partout, $\\lambda u + \\mu v$ reste dedans." },
      { p: "Dimensions : 2, 3, 2 — les degrés de liberté comptés avant tout calcul." },
    ] },
    { title: "Le plan qui grossit (ou pas)", steps: [
      { p: "$u, v$ non colinéaires dans $\\mathbb{R}^3$ : $\\text{Vect}(u, v)$ est un plan." },
      { p: "$w$ dans le plan : famille liée, rien de neuf ; $w$ dehors : libre, l'espace jaillit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Parmi ces parties de $\\mathbb{R}^2$, lesquelles sont des sous-espaces vectoriels ? $D = \\{(x, y) : y = 2x\\}$ ; $A = \\{(x, y) : y = 2x + 1\\}$ ; $P = \\{(x, y) : xy \\geq 0\\}$. Teste la stabilité.", solution: "$D$ : **oui** — $(0,0) \\in D$ et $\\lambda(x, 2x) + \\mu(x', 2x') = (x'', 2x'')$ ✓ (une droite PAR l'origine) ; $A$ : **non** — $(0, 0) \\notin A$ (la droite décalée rate l'origine : l'axiome du zéro tue d'un coup) ; $P$ : **non** — $(1, 0) + (-1, 1)$... mieux : $(1, 1) \\in P$, $(-1, 1) \\in P$ ? $(-1)(1) < 0$ non — prenons $(1, 0)$ et $(0, -1)$ : tous deux dans $P$, somme $(1, -1)$ : $xy = -1 < 0$ **sort** — pas stable : les sous-espaces passent TOUS par zéro et ne connaissent ni décalage ni quadrant." },
    { tier: "warmup", prompt: "La famille $\\{(1, 1, 0), (1, 0, 1), (0, 1, 1)\\}$ de $\\mathbb{R}^3$ est-elle libre ? Pose la combinaison nulle et résous (ton pivot !).", solution: "$\\lambda(1,1,0) + \\mu(1,0,1) + \\nu(0,1,1) = 0$ ⟹ $\\begin{cases} \\lambda + \\mu = 0 \\\\ \\lambda + \\nu = 0 \\\\ \\mu + \\nu = 0 \\end{cases}$ — pivot : $\\lambda = \\mu = \\nu = $ **0** seule solution : famille **libre** — et trois vecteurs libres en dimension 3 : c'est une **base** de $\\mathbb{R}^3$ (le comptage conclut sans tester la génération !) — la liberté se teste toujours ainsi : combinaison nulle ⟹ coefficients nuls, et le pivot tranche." },
    { tier: "application", prompt: "Montre que les solutions de $y'' + y = 0$ forment un espace vectoriel, exhibe une base, et donne la dimension. Que devient « résoudre l'équation » dans ce langage ?", solution: "Stabilité : si $y_1'' + y_1 = 0$ et $y_2'' + y_2 = 0$, alors $(\\lambda y_1 + \\mu y_2)'' + (\\lambda y_1 + \\mu y_2) = \\lambda \\cdot 0 + \\mu \\cdot 0 = 0$ ✓ — la **linéarité** de l'équation fait l'espace ; base : $\\{\\cos, \\sin\\}$ (solutions, et libres : $\\lambda\\cos + \\mu\\sin = 0$ évalué en $0$ et $\\frac{\\pi}{2}$ donne $\\lambda = \\mu = 0$) — **dimension 2** : résoudre = donner une base — la solution générale $\\lambda\\cos t + \\mu\\sin t$ de ton chapitre calcul-pratique n'était que la décomposition dans cette base : l'EDL est un espace vectoriel déguisé." },
    { tier: "challenge", prompt: "Dans $\\mathbb{R}_2[X]$ (dimension 3), la famille $\\{1 + X, X + X^2, 1 + X^2\\}$ est-elle une base ? Conclus par le comptage après UN seul test — puis donne les coordonnées de $P = 2 + 2X$ dans cette base.", solution: "Trois vecteurs en dimension 3 : libre ⟺ base — teste la liberté : $a(1 + X) + b(X + X^2) + c(1 + X^2) = 0$ ⟹ $\\begin{cases} a + c = 0 \\\\ a + b = 0 \\\\ b + c = 0 \\end{cases}$ ⟹ $a = b = c = 0$ ✓ : **base** ■. Coordonnées de $2 + 2X$ : résous $a + c = 2$, $a + b = 2$, $b + c = 0$ — $a = 2, b = 0, c = 0$ : $P = 2(1 + X)$ — coordonnées $(2, 0, 0)$ : la base donne à chaque polynôme son adresse unique, et le comptage a économisé la moitié du travail." },
    { tier: "exam", prompt: "Soit $F = \\{(x, y, z) \\in \\mathbb{R}^3 : x + y + z = 0\\}$ et $G = \\text{Vect}((1, 1, 1))$. (1) Montre que $F$ est un sous-espace et donne une base et sa dimension. (2) Montre que $F \\cap G = \\{0\\}$. (3) Montre que tout vecteur de $\\mathbb{R}^3$ s'écrit (de façon unique) comme somme d'un élément de $F$ et d'un élément de $G$ — on dit que $F$ et $G$ sont **supplémentaires**. (4) Décompose $(5, 2, 2)$ selon cette somme, et interprète géométriquement le couple plan-droite.", solution: "(1) Stable par combinaison ✓ (l'équation est linéaire homogène) ; base : $\\{(1, -1, 0), (1, 0, -1)\\}$ (dans $F$, libres) — **dimension 2** : un plan par l'origine. (2) $(t, t, t) \\in F$ ⟹ $3t = 0$ ⟹ $t = 0$ ■. (3) Analyse-synthèse (ton chapitre 1 !) : si $v = f + g$ avec $g = (t, t, t)$, alors la somme des coordonnées de $v$ vaut $0 + 3t$ — donc $t = \\frac{x + y + z}{3}$ **forcé** (unicité) ; synthèse : $g = t(1,1,1)$ ainsi défini, et $f = v - g$ a pour somme de coordonnées $0$ : $f \\in F$ ✓ — existence ■. Dimension en écho : $2 + 1 = 3$ ✓. (4) $t = \\frac{9}{3} = 3$ : $g = (3, 3, 3)$, $f = (2, -1, -1)$ — géométriquement : tout vecteur de l'espace se projette sur le plan $F$ **le long de la direction** $(1,1,1)$ — la décomposition unique plan ⊕ droite : c'est le projecteur de la leçon suivante qui pointe déjà son nez, et la moyenne $t$ retire à $v$ sa composante « uniforme » : le traitement du signal appelle ça retirer la composante continue." },
  ],
  practice: [
    { tier: "warmup", label: "Le test du zéro", make: (r) => {
      const b = randint(r, 1, 5); const sub = r() < 0.5;
      return { prompt: `$\\{(x, y) : y = ${sub ? "3x" : "3x + " + b}\\}$ : sous-espace de $\\mathbb{R}^2$ ? (1/0)`, answer: sub ? 1 : 0, solution: `**${sub ? "Oui — droite par l'origine" : "Non — $(0,0)$ n'y est pas"}**.` };
    } },
    { tier: "application", label: "Compter les dimensions", make: (r) => {
      const cas = pick(r, [["\\mathbb{R}^4", 4], ["\\mathbb{R}_3[X]", 4], ["\\mathbb{R}_5[X]", 6], ["les solutions de $y'' - y = 0$", 2]]);
      return { prompt: `$\\dim$ de $${cas[0]}$ ?`, answer: cas[1], solution: `**${cas[1]}** — les degrés de liberté comptés.` };
    } },
    { tier: "challenge", label: "Le comptage qui conclut", make: (r) => {
      const n = randint(r, 2, 5); const k = pick(r, [[n, 1, "libre de cardinal n = base"], [n + 1, 0, "trop nombreux : liée d'office"]]);
      return { prompt: `En dimension $${n}$, une famille LIBRE peut-elle avoir $${k[0]}$ vecteurs ? (1/0)`, answer: k[1], solution: `**${k[1] ? "Oui — et c'est alors une base" : "Non — libre ⟹ cardinal ≤ dimension"}**.` };
    } },
  ],
};

// — Linear maps (MPSI: applications linéaires, théorème du rang) —
const applicationsLineaires = {
  id: "algebra.bachelor.applications-lineaires",
  level: "bachelor", domain: "algebra",
  title: "Applications linéaires et théorème du rang",
  tagline: "Noyau, image — ce que la machine écrase, ce qu'elle atteint : le rang compte tout.",
  prereqs: ["algebra.bachelor.espaces-vectoriels"],
  intuition:
    "Une application **linéaire** respecte les combinaisons : $f(\\lambda u + \\mu v) = \\lambda f(u) + \\mu f(v)$ — rotations, projections, dérivation des polynômes : des machines qui transportent la structure.\n\nDeux sous-espaces racontent toute la machine : le **noyau** (ce qu'elle écrase sur zéro) et l'**image** (ce qu'elle atteint) — et le **théorème du rang** les lie par un comptage exact.",
  depths: {
    discovery:
      "**Avec les mains** : prends la projection $p(x, y, z) = (x, y, 0)$ — linéaire ✓ (vérifie sur une combinaison) : son **noyau** = les vecteurs écrasés = l'axe $(0, 0, z)$ (dimension 1) ; son **image** = le plan horizontal (dimension 2) — et compte : $1 + 2 = 3 = \\dim \\mathbb{R}^3$ : le hasard ? Non — le théorème du rang, que tu viens de toucher.",
    standard:
      "**En image** : la machine en usine — l'espace de départ entre, le **noyau s'écrase** sur $0$ (la matière perdue), l'**image sort** (la production) : big idea *Diagrams* — et le dessin porte les deux critères : **injective** ⟺ noyau réduit à $\\{0\\}$ (rien d'autre que zéro ne s'écrase — LE test d'injectivité linéaire, infiniment plus maniable que la définition générale), **surjective** ⟺ image pleine — le noyau mesure la perte, l'image mesure la portée.",
    advanced:
      "**Dans la tête** : le **théorème du rang** — $\\dim E = \\dim \\ker f + \\text{rg}\\, f$ (où $\\text{rg}\\, f = \\dim \\text{Im}\\, f$) : la dimension de départ se **partage** exactement entre ce qui meurt et ce qui sort — l'idée de preuve : une base du noyau se complète en base de $E$, et les images des vecteurs ajoutés forment une base de l'image (la machine est fidèle sur le supplémentaire du noyau). Conséquence reine en dimensions égales : $f : E \\to F$ avec $\\dim E = \\dim F$ — **injective ⟺ surjective ⟺ bijective** : UN critère suffit, le comptage offre les deux autres (le miracle de la dimension finie — faux pour la dérivation sur $\\mathbb{R}[X]$, surjective jamais injective : l'infini ne compte pas pareil). Et les **projecteurs** ($p \\circ p = p$ : projeter deux fois = projeter une fois) incarnent la décomposition $E = \\ker p \\oplus \\text{Im}\\, p$ — ta somme plan ⊕ droite, devenue machine — big idea *Invariance* : le rang est LE nombre de la machine, indépendant de toute base.",
  },
  keyIdea: "Linéaire : $f(\\lambda u + \\mu v) = \\lambda f(u) + \\mu f(v)$. **Noyau** $\\ker f$ (l'écrasé) ⟹ injective ⟺ $\\ker f = \\{0\\}$ ; **image** ⟹ surjective ⟺ pleine. **Théorème du rang** : $\\dim E = \\dim\\ker f + \\text{rg}\\,f$ (*Invariance*) — et en dimensions égales : injective ⟺ surjective ⟺ bijective. **Projecteur** : $p^2 = p$ ⟺ $E = \\ker p \\oplus \\text{Im}\\,p$.",
  why:
    "Pourquoi noyau et image plutôt que la formule de $f$ ? Parce qu'ils répondent aux deux questions universelles du linéaire : « l'équation $f(x) = b$ a-t-elle une solution ? » (⟺ $b \\in \\text{Im}\\, f$) et « combien ? » (la solution générale = une particulière + le noyau — ta structure des solutions de systèmes ET d'équations différentielles, unifiée !). Le théorème du rang est le bilan comptable de toute machine linéaire : compression d'image, codes correcteurs, résolution de systèmes — partout, perte + production = capital de départ.",
  examples: [
    { title: "La projection comptée", steps: [
      { p: "$p(x, y, z) = (x, y, 0)$ : noyau = l'axe vertical (dim 1), image = le plan (dim 2)." },
      { p: "$1 + 2 = 3$ ✓ — le théorème du rang : perte + production = départ." },
    ] },
    { title: "Le test du noyau", steps: [
      { p: "$f$ injective ⟺ $\\ker f = \\{0\\}$ : une seule équation à résoudre, $f(x) = 0$." },
      { p: "La linéarité ramène toute l'injectivité au point zéro — le test le plus rentable du chapitre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Soit $f(x, y) = (x + y, 2x + 2y)$. Calcule le noyau (résous $f(x,y) = (0,0)$), l'image, leurs dimensions — et vérifie le théorème du rang.", solution: "Noyau : $x + y = 0$ — la droite $\\{(t, -t)\\}$ : **dimension 1** ; image : tous les $(s, 2s)$ — la droite dirigée par $(1, 2)$ : **dimension 1** (rang 1) ; bilan : $1 + 1 = 2 = \\dim \\mathbb{R}^2$ ✓ — la machine écrase une droite et produit une droite : le rang a tout compté, et $f$ n'est ni injective (noyau non nul) ni surjective (image non pleine) — les deux échecs vont ensemble en dimensions égales." },
    { tier: "warmup", prompt: "La dérivation $D : \\mathbb{R}_3[X] \\to \\mathbb{R}_3[X]$, $P \\mapsto P'$ : détermine $\\ker D$ et $\\text{Im}\\, D$, vérifie le rang, et conclus sur injectivité/surjectivité.", solution: "$\\ker D$ = les polynômes de dérivée nulle = les **constantes** (dim 1) ; $\\text{Im}\\, D = \\mathbb{R}_2[X]$ (toute fonction de degré $\\leq 2$ a une primitive de degré $\\leq 3$) : rang 3 — bilan : $1 + 3 = 4 = \\dim \\mathbb{R}_3[X]$ ✓ — ni injective (les constantes s'écrasent : deux primitives diffèrent d'une constante — ton vieux $+ C$ devenu noyau !) ni surjective ($X^3$ n'est l'image de personne dans $\\mathbb{R}_3[X]$) : la dérivation perd exactement les constantes, le théorème du rang le chiffre." },
    { tier: "application", prompt: "Soit $f : \\mathbb{R}^3 \\to \\mathbb{R}^3$ linéaire avec $\\ker f = \\{0\\}$. Sans rien savoir d'autre, montre que $f$ est bijective — quel miracle de la dimension finie utilises-tu, et donne un contre-exemple en dimension infinie.", solution: "Rang : $\\dim\\ker + \\text{rg} = 3$ ⟹ $\\text{rg}\\, f = 3$ ⟹ image = $\\mathbb{R}^3$ entier : **surjective**, donc bijective ■ — le miracle : en dimensions égales finies, injectif ⟺ surjectif (le comptage interdit l'un sans l'autre). Contre-exemple infini : $P \\mapsto XP$ sur $\\mathbb{R}[X]$ — injective (noyau nul) mais jamais surjective (les constantes non nulles inatteignables) : l'infini absorbe sans déborder — la dimension finie est une comptabilité exacte, l'infinie non." },
    { tier: "challenge", prompt: "Soit $p$ linéaire avec $p \\circ p = p$ (projecteur). Montre que $E = \\ker p \\oplus \\text{Im}\\, p$ : tout $x$ s'écrit $x = (x - p(x)) + p(x)$ — vérifie l'appartenance de chaque morceau et l'unicité.", solution: "Morceau 1 : $p(x - p(x)) = p(x) - p^2(x) = p(x) - p(x) = 0$ — donc $x - p(x) \\in \\ker p$ ✓ ; morceau 2 : $p(x) \\in \\text{Im}\\, p$ ✓ — existence ■ ; unicité : si $v \\in \\ker p \\cap \\text{Im}\\, p$, alors $v = p(w)$ et $p(v) = 0$ : $v = p(w) = p^2(w) = p(v) = 0$ ■ — la décomposition $E = \\ker \\oplus \\text{Im}$ tient pour TOUT projecteur : projeter, c'est exactement choisir « ce qu'on garde » (l'image) et « ce qu'on jette » (le noyau) — l'identité $x = (x - p(x)) + p(x)$ est l'algorithme de tri." },
    { tier: "exam", prompt: "Sur $\\mathbb{R}_2[X]$, soit $\\varphi(P) = P - P'$. (1) Montre que $\\varphi$ est linéaire. (2) Détermine $\\ker \\varphi$ (résous $P = P'$ en degrés). (3) Conclus par le théorème du rang que $\\varphi$ est bijective. (4) Application : résous $P - P' = X^2$ (cherche $P = aX^2 + bX + c$) — et relie la structure « solution unique » au bilan noyau-image.", solution: "(1) $\\varphi(\\lambda P + \\mu Q) = \\lambda P + \\mu Q - \\lambda P' - \\mu Q' = \\lambda\\varphi(P) + \\mu\\varphi(Q)$ ✓. (2) $P = P'$ : si $\\deg P = n \\geq 0$, alors $\\deg P' = n - 1 < n$ — impossible sauf $P = 0$ : $\\ker\\varphi = \\{0\\}$ ■ (l'argument des degrés : court et létal). (3) Dimensions égales (3 = 3) + injective ⟹ **bijective** ■ — le miracle du comptage. (4) $\\varphi(aX^2 + bX + c) = aX^2 + (b - 2a)X + (c - b) = X^2$ ⟹ $a = 1$, $b = 2$, $c = 2$ : $P = X^2 + 2X + 2$ — unique, comme promis par (3) : noyau nul = aucun degré de liberté, image pleine = toujours une solution — l'équation fonctionnelle entière (existence ET unicité) lue d'avance sur le bilan noyau-image : c'est exactement la puissance du chapitre, et le brouillon de la variation de la constante revisitée." },
  ],
  practice: [
    { tier: "warmup", label: "Le bilan du rang", make: (r) => {
      const n = randint(r, 3, 6); const k = randint(r, 0, n - 1);
      return { prompt: `$f$ sur un espace de dimension ${n}, $\\dim\\ker f = ${k}$ : le rang ?`, answer: n - k, solution: `$${n} - ${k} = $ **${n - k}** — perte + production = départ.` };
    } },
    { tier: "application", label: "Le test d'injectivité", make: (r) => {
      const inj = r() < 0.5;
      return { prompt: `$\\ker f = ${inj ? "\\{0\\}" : "\\text{une droite}"}$ : $f$ injective ? (1/0)`, answer: inj ? 1 : 0, solution: `**${inj ? "Oui — rien ne s'écrase sauf zéro" : "Non — toute la droite s'écrase"}**.` };
    } },
    { tier: "challenge", label: "Le miracle des dimensions égales", make: (r) => {
      const n = randint(r, 2, 5);
      return { prompt: `$f : \\mathbb{R}^${n} \\to \\mathbb{R}^${n}$ injective : son rang ?`, answer: n, solution: `$\\ker = \\{0\\}$ ⟹ rang $= ${n}$ — **${n}** : surjective offerte par le comptage.` };
    } },
  ],
};

// — Matrix representations (MPSI: matrices d'applications linéaires, changement de base) —
const matricesRepresentations = {
  id: "algebra.bachelor.matrices-representations",
  level: "bachelor", domain: "algebra",
  title: "Matrices : représenter le linéaire",
  tagline: "Une base, et l'application abstraite devient tableau — changer de base, c'est traduire.",
  prereqs: ["algebra.bachelor.applications-lineaires", "algebra.bachelor.matrices-systemes"],
  intuition:
    "L'application linéaire est abstraite ; la matrice est son **portrait dans une base** : la colonne $j$ stocke les coordonnées de l'image du $j$-ième vecteur de base.\n\nUn portrait par base — et le **changement de base** traduit un portrait dans l'autre : c'est le dictionnaire qui prépare toute la réduction de L2.",
  depths: {
    discovery:
      "**Avec les mains** : photographie la rotation d'angle $\\frac{\\pi}{2}$ du plan dans la base canonique — où va $e_1 = (1, 0)$ ? En $(0, 1)$ : **première colonne** ; où va $e_2$ ? En $(-1, 0)$ : **deuxième colonne** — $R = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ : la règle tient en une phrase — *les colonnes sont les images des vecteurs de base* — et le produit $RX$ calcule la rotation de n'importe qui.",
    standard:
      "**En image** : le **carré commutatif** du changement de base — deux étages : en haut les vecteurs abstraits, en bas leurs coordonnées dans l'ancienne et la nouvelle base ; la matrice de passage $P$ (colonnes = la nouvelle base écrite dans l'ancienne) fait l'ascenseur : $X_{\\text{ancien}} = P X_{\\text{nouveau}}$ — big idea *Diagrams* : suivre les flèches du carré DÉMONTRE la formule $A' = P^{-1} A P$ (descendre, appliquer, remonter) — pas une formule à apprendre : un itinéraire à suivre.",
    advanced:
      "**Dans la tête** : deux matrices représentant la **même application dans deux bases** sont dites **semblables** ($A' = P^{-1}AP$) — c'est LA relation d'équivalence du linéaire (ton chapitre 1 : réflexive, symétrique, transitive — vérifie !) : tout ce qui est intrinsèque à l'application (le rang, et bientôt la trace, le déterminant, les valeurs propres) doit être **invariant par similitude** — big idea *Invariance* : les bons nombres sont ceux qui ne dépendent pas du photographe. Et le programme de L2 s'annonce : **réduire**, ce sera chercher LA base où le portrait est le plus simple possible (diagonal si la machine le permet) — le changement de base d'aujourd'hui est l'outil ; la chasse à la meilleure base, le but.",
  },
  keyIdea: "Matrice de $f$ dans une base : **colonnes = images des vecteurs de base** — et $f(x)$ se calcule par $AX$. **Passage** : $P$ = nouvelle base en colonnes (dans l'ancienne), $X = PX'$ ; même application, deux bases : $A' = P^{-1}AP$ — matrices **semblables** (*Diagrams* : le carré commutatif). L'intrinsèque (rang…) est invariant par similitude (*Invariance*).",
  why:
    "Pourquoi deux portraits du même objet ? Parce que le BON choix de base change tout : une rotation est illisible en base quelconque, limpide en base adaptée ; un système dynamique couplé se découple dans la base propre — choisir sa base, c'est choisir son repère de travail, et la moitié du génie calculatoire en algèbre linéaire consiste à se placer là où la matrice devient simple. La similitude dit ce qui survit au choix : c'est elle qui définira « les invariants » de L2 — trace, déterminant, spectre — la carte d'identité de la machine, indépendante du photographe.",
  examples: [
    { title: "La rotation photographiée", steps: [
      { p: "$e_1 \\mapsto (0, 1)$, $e_2 \\mapsto (-1, 0)$ : colonnes — $R = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$." },
      { p: "Les colonnes SONT les images de la base : la règle entière du portrait." },
    ] },
    { title: "L'itinéraire P⁻¹AP", steps: [
      { p: "Nouveau → ancien ($P$), appliquer ($A$), ancien → nouveau ($P^{-1}$) : $A' = P^{-1}AP$." },
      { p: "Le carré commutatif se suit du doigt — la formule est un trajet, pas un par-cœur." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris la matrice (base canonique de $\\mathbb{R}^2$) de la symétrie par rapport à l'axe des abscisses, puis celle de l'homothétie de rapport 3 — par la règle des colonnes.", solution: "Symétrie : $e_1 = (1,0) \\mapsto (1, 0)$, $e_2 = (0,1) \\mapsto (0, -1)$ — $S = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ ; homothétie : $e_i \\mapsto 3e_i$ — $H = \\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix} = 3I$ — deux questions, une seule règle : où vont les vecteurs de base ? Les colonnes répondent." },
    { tier: "warmup", prompt: "La matrice de la dérivation $D$ sur $\\mathbb{R}_2[X]$ dans la base $(1, X, X^2)$ ? Vérifie en calculant $D(2 + 3X + X^2)$ par le produit matriciel.", solution: "$D(1) = 0$, $D(X) = 1$, $D(X^2) = 2X$ — colonnes : $M = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix}$ ; produit : $M\\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 2 \\\\ 0 \\end{pmatrix}$ — soit $3 + 2X$ ✓ ($= (2 + 3X + X^2)'$) — l'opérateur abstrait « dériver » est devenu un tableau de nombres : c'est tout le pouvoir de la représentation — et note la matrice **nilpotente** : dériver trois fois un trinôme l'annule, $M^3 = 0$ le code." },
    { tier: "application", prompt: "Vérifie que la similitude est une relation d'équivalence : réflexive, symétrique, transitive — exhibe à chaque fois la matrice de passage qui convient.", solution: "Réflexive : $A = I^{-1}AI$ ($P = I$) ✓ ; symétrique : $B = P^{-1}AP$ ⟹ $A = PBP^{-1} = (P^{-1})^{-1}B(P^{-1})$ ($P' = P^{-1}$) ✓ ; transitive : $B = P^{-1}AP$ et $C = Q^{-1}BQ$ ⟹ $C = Q^{-1}P^{-1}APQ = (PQ)^{-1}A(PQ)$ ($P'' = PQ$) ✓ ■ — la similitude partitionne les matrices en **classes** (ton chapitre 1 : toute équivalence partitionne) : une classe = une application linéaire vue sous tous ses angles — et les invariants de L2 seront les étiquettes des classes." },
    { tier: "challenge", prompt: "Soit $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$ et la nouvelle base $u = (1, 0)$, $v = (1, -1)$. Écris $P$, calcule $P^{-1}$, puis $A' = P^{-1}AP$ — que remarques-tu, et pourquoi cette base était-elle bien choisie ?", solution: "$P = \\begin{pmatrix} 1 & 1 \\\\ 0 & -1 \\end{pmatrix}$, $P^{-1} = \\begin{pmatrix} 1 & 1 \\\\ 0 & -1 \\end{pmatrix}$ (elle est sa propre inverse !) — $AP = \\begin{pmatrix} 3 & 2 \\\\ 0 & -2 \\end{pmatrix}$, puis $A' = P^{-1}AP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}$ : **diagonale** ! La base $(u, v)$ était faite de directions que $A$ dilate sans tourner ($Au = 3u$, $Av = 2v$ — vérifie !) — tu viens de **diagonaliser** ta première matrice : la chasse aux bonnes directions (les vecteurs propres) est exactement le programme de la réduction de L2 — ici, on t'a soufflé la base ; là-bas, tu apprendras à la trouver." },
    { tier: "exam", prompt: "Sur $\\mathbb{R}^2$, soit $p$ la projection sur la droite $D : y = x$ parallèlement à la droite $D' : y = -x$. (1) Justifie sans calcul que dans la base $u = (1, 1)$, $v = (1, -1)$, la matrice de $p$ est $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$. (2) Écris $P$ et calcule $P^{-1}$. (3) Calcule la matrice $A$ de $p$ en base canonique par $A = P A' P^{-1}$ — attention au sens ! (4) Vérifie $A^2 = A$ et interprète : que dit la diagonale $(1, 0)$ sur le tri noyau-image du projecteur ?", solution: "(1) $u \\in D$ : $p(u) = u$ (coordonnées $(1, 0)$) ; $v \\in D'$ : $p(v) = 0$ — colonnes : $A' = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$ ✓ : dans la base adaptée, projeter = garder/jeter. (2) $P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$, $P^{-1} = \\frac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$. (3) Le sens : $A' = P^{-1}AP$ ⟹ $A = PA'P^{-1} = \\frac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ — la moyenne des coordonnées, deux fois ! (4) $A^2 = \\frac{1}{4}\\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix} = A$ ✓ : projecteur — et la diagonale $(1, 0)$ de $A'$ EST le tri : valeur 1 sur l'image (on garde $u$), valeur 0 sur le noyau (on jette $v$) — ta décomposition $E = \\ker \\oplus \\text{Im}$, devenue lecture de diagonale : le bon portrait rend le théorème visible — c'est exactement la promesse de la réduction." },
  ],
  practice: [
    { tier: "warmup", label: "La règle des colonnes", make: (r) => {
      const a = randint(r, 2, 6);
      return { prompt: `$f(e_1) = (${a}, 0)$ et $f(e_2) = (0, 1)$ : le coefficient en haut à gauche de la matrice ?`, answer: a, solution: `Colonne 1 = image de $e_1$ : **${a}**.` };
    } },
    { tier: "application", label: "Le portrait calcule", make: (r) => {
      const a = randint(r, 1, 4); const b = randint(r, 1, 4); const x = randint(r, 1, 3); const y = randint(r, 1, 3);
      return { prompt: `$A = \\begin{pmatrix} ${a} & 0 \\\\ 0 & ${b} \\end{pmatrix}$, $X = \\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ : première coordonnée de $AX$ ?`, answer: a * x, solution: `$${a} \\times ${x} = $ **${a * x}** — la diagonale dilate chaque axe.` };
    } },
    { tier: "challenge", label: "L'invariant qui survit", make: (r) => {
      const rg = randint(r, 1, 3);
      return { prompt: `$\\text{rg}\\,A = ${rg}$ et $B = P^{-1}AP$ : $\\text{rg}\\,B = \\,?$`, answer: rg, solution: `**${rg}** — le rang est intrinsèque : il ignore le changement de base.` };
    } },
  ],
};

export default [espacesVectoriels, applicationsLineaires, matricesRepresentations];
