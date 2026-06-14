// Field "Logic / Numbers / Analysis" — BACHELOR module (l1 year), licence de
// mathématiques. Official MPSI/MP2I programme (arrêté 2021), chapters
// "Raisonnement et vocabulaire ensembliste" (quantifiers, proof patterns,
// sets, maps, equivalence and order relations), "Nombres complexes"
// (algebraic/trigonometric/exponential forms, roots of unity, second-degree
// equations in C, linearization, geometric interpretation) and "Techniques
// fondamentales de calcul différentiel et intégral" (usual functions
// including reciprocal trigonometric and hyperbolic, practical primitives,
// first and second order linear ODEs with constant coefficients).
// Singapore method at university level: Readiness = a motivating concrete
// problem; Concrete = manipulate ONE explicit object (a three-element set,
// (1+i)^8, a capacitor equation); Pictorial = THE drawing that carries the
// idea (potato diagrams, the unit circle polygon, the family of integral
// curves); Abstract = the quantified statement and its proof. Big ideas
// named; exam tiers are full colle-style problems; practice = variation.
// Retrofit (Bachelor X audit, 2026-06): "How to write Mathematics" — added a
// proof-writing paragraph (advanced), a proof-critique exercise (the same-colour
// pencils induction) and a validity-check generator.
import { randint, pick } from "../../core/exercises.js";

// — Reasoning and set vocabulary (MPSI ch. 1) —
const raisonnementEnsembles = {
  id: "logic.bachelor.raisonnement-ensembles",
  level: "bachelor", domain: "logic",
  title: "Raisonnement et vocabulaire ensembliste",
  tagline: "∀, ∃, ⟹ — la grammaire de toutes les démonstrations commence ici.",
  prereqs: ["logic.high.ensembles-logique", "analysis.high.recurrence"],
  intuition:
    "Au lycée, on démontrait ; en licence, on démontre **tout** — et il faut d'abord s'accorder sur la langue : que veut dire exactement « pour tout », « il existe », « implique » ?\n\nCe chapitre fonde la grammaire : les **quantificateurs**, les **modes de raisonnement** (contraposée, absurde, récurrence, analyse-synthèse), et le vocabulaire des **ensembles et applications** — la boîte à outils de tout le reste de la licence.",
  depths: {
    discovery:
      "**Avec les mains** : joue sur un ensemble minuscule — $E = \\{1, 2, 3\\}$ : « $\\forall x \\in E,\\ x \\leq 3$ » se **vérifie en trois coups** (1 ✓, 2 ✓, 3 ✓) ; « $\\exists x \\in E,\\ x > 2$ » s'arrête au premier témoin (3 ✓) — et la **négation** s'éprouve : nier « tous $\\leq 3$ », c'est exhiber UN fautif ; nier « il existe un $> 2$ », c'est vérifier que TOUS échouent — la bascule $\\forall \\leftrightarrow \\exists$ sous la négation n'est pas une règle à apprendre : c'est ce que tu viens de faire avec les doigts.",
    standard:
      "**En image** : les **patates** portent le chapitre — une application $f : E \\to F$ est un paquet de flèches (chaque élément de $E$ tire exactement une flèche) : **injective** = jamais deux flèches qui convergent (le dessin du collisionneur interdit), **surjective** = personne d'oublié dans $F$ (chaque cible reçoit), **bijective** = les deux : un appariement parfait — et l'**image réciproque** $f^{-1}(B)$ se colorie : tous les points de départ dont la flèche atterrit dans $B$ ; sur le dessin, les théorèmes se lisent avant de s'écrire : composer deux injections injecte (deux étages sans collision n'en créent pas).",
    advanced:
      "**Dans la tête** : les modes de raisonnement sont des **stratégies nommées** — la **contraposée** ($P \\Rightarrow Q$ ⟺ $\\neg Q \\Rightarrow \\neg P$ : souvent plus maniable — « $n^2$ pair $\\Rightarrow$ $n$ pair » se démontre par « $n$ impair $\\Rightarrow$ $n^2$ impair », un calcul direct), l'**absurde** (supposer $\\neg P$ et casser le monde), la **récurrence** (faible, forte, et le réflexe : l'hérédité est une implication à démontrer proprement), l'**analyse-synthèse** (supposer une solution, la cerner, puis vérifier qu'elle marche — LE schéma des problèmes d'existence-unicité). Et les **relations** structurent : une relation d'**équivalence** (réflexive, symétrique, transitive) découpe l'ensemble en **classes** disjointes — la congruence modulo $n$ partage $\\mathbb{Z}$ en $n$ paquets : tu retrouveras ce découpage partout, des groupes quotients aux espaces $L^p$ — big idea *Notations* : un symbolisme exact rend la pensée vérifiable ligne à ligne. Et le dernier mode est un art : **rédiger**. Une démonstration est un texte qui doit se lire sans toi — annonce ta stratégie (« par contraposée », « par récurrence sur $n$ ») ; introduis chaque objet **avant** de t'en servir (« soit $\\varepsilon > 0$ », « il existe $n_0$ tel que… fixons-le ») ; une idée par phrase, les quantificateurs dans l'ordre où ils se lisent ; conclus en citant ce que tu viens d'établir. La règle d'or : tout symbole qui apparaît a été présenté — un lecteur qui demande « c'est quoi, ce $k$ ? » a déjà gagné.",
  },
  keyIdea: "**Quantificateurs** : la négation bascule $\\forall \\leftrightarrow \\exists$ (l'ordre des quantificateurs compte !) ; **stratégies** : contraposée, absurde, récurrence, analyse-synthèse. Applications : **injectif** = pas de collision, **surjectif** = personne d'oublié (les patates le montrent) ; relation d'**équivalence** = découpage en classes — big idea *Notations*.",
  why:
    "Pourquoi un chapitre de grammaire ? Parce que l'erreur de licence numéro un n'est pas calculatoire mais **logique** : confondre une implication et sa réciproque, nier de travers un énoncé à deux quantificateurs, « démontrer » l'hérédité en supposant la conclusion. Tout le reste — les espaces vectoriels, les limites avec leurs $\\forall \\varepsilon\\ \\exists N$, les structures — s'écrit dans cette langue : la maîtriser maintenant, c'est ne plus jamais perdre de points sur la forme, et ton métier (les invariants de boucle, les préconditions, la logique de Hoare) parle exactement le même dialecte.",
  examples: [
    { title: "La négation aux doigts", steps: [
      { p: "Nier « $\\forall x \\in E,\\ P(x)$ » : exhiber **un** contre-exemple — $\\exists x,\\ \\neg P(x)$." },
      { p: "L'ordre compte : « $\\forall x\\ \\exists y,\\ y > x$ » (vrai dans $\\mathbb{R}$) ≠ « $\\exists y\\ \\forall x,\\ y > x$ » (faux !)." },
    ] },
    { title: "La contraposée qui débloque", steps: [
      { p: "« $n^2$ pair $\\Rightarrow n$ pair » : direct pénible — contraposée : $n = 2k+1 \\Rightarrow n^2 = 2(2k^2+2k)+1$ impair ✓." },
      { p: "Même vérité, angle d'attaque inversé — la contraposée est un outil, pas une figure de style." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur $E = \\{1, 2, 3, 4\\}$, les énoncés : (a) $\\forall x \\in E,\\ x^2 \\leq 16$ ; (b) $\\exists x \\in E,\\ x^2 = 10$ ; (c) $\\forall x \\in E,\\ \\exists y \\in E,\\ y > x$. Vrai ou faux — avec témoin ou contre-exemple à chaque fois.", solution: "(a) **Vrai** : 1, 4, 9, 16 tous $\\leq 16$ — vérification exhaustive. (b) **Faux** : aucun carré ne vaut 10 (1, 4, 9, 16) — nier un $\\exists$, c'est tout balayer. (c) **Faux** : pour $x = 4$, aucun $y$ ne dépasse — UN contre-exemple suffit contre un $\\forall$ : le petit ensemble rend la logique tactile." },
    { tier: "warmup", prompt: "Écris la négation de : « $\\forall \\varepsilon > 0,\\ \\exists N \\in \\mathbb{N},\\ \\forall n \\geq N,\\ |u_n - \\ell| \\leq \\varepsilon$ » — sans la barre de négation, en basculant les quantificateurs.", solution: "« $\\exists \\varepsilon > 0,\\ \\forall N \\in \\mathbb{N},\\ \\exists n \\geq N,\\ |u_n - \\ell| > \\varepsilon$ » — chaque quantificateur bascule, l'inégalité finale s'inverse : tu viens d'écrire « $u_n$ ne tend pas vers $\\ell$ » — et c'est exactement le gymnase qui prépare le chapitre des suites : la définition de limite est un triple quantificateur qu'il faut savoir nier les yeux fermés." },
    { tier: "application", prompt: "Soient $f : E \\to F$ et $g : F \\to G$. Démontre : si $g \\circ f$ est injective, alors $f$ est injective. (Pars de $f(x) = f(x')$ et remonte.) Puis donne un dessin en patates où $g \\circ f$ est injective sans que $g$ le soit.", solution: "Soient $x, x' \\in E$ avec $f(x) = f(x')$ — applique $g$ : $g(f(x)) = g(f(x'))$, soit $(g \\circ f)(x) = (g \\circ f)(x')$ ; l'injectivité de $g \\circ f$ donne $x = x'$ ✓ — trois lignes, zéro calcul : la définition appliquée mot à mot. Contre-exemple pour $g$ : prends $F$ plus gros que l'image de $f$ — $g$ peut écraser deux éléments de $F \\setminus f(E)$ sans que la composée le voie : sur les patates, la collision de $g$ a lieu hors des flèches venant de $E$ — le dessin localise exactement pourquoi l'argument ne remonte pas à $g$." },
    { tier: "challenge", prompt: "Par analyse-synthèse : trouve toutes les fonctions $f : \\mathbb{R} \\to \\mathbb{R}$ telles que $\\forall x, y,\\ f(x + y) = f(x) + y$. (Analyse : pose $x = 0$ pour cerner $f$ ; synthèse : vérifie.)", solution: "**Analyse** : suppose $f$ solution — pose $x = 0$ : $f(y) = f(0) + y$ pour tout $y$ : $f$ est nécessairement de la forme $f(y) = y + c$ avec $c = f(0)$. **Synthèse** : vérifie $f(x+y) = x + y + c$ et $f(x) + y = x + c + y$ ✓ — toutes les $f(y) = y + c$, $c \\in \\mathbb{R}$, et elles seules. Le schéma en deux temps est obligatoire : l'analyse ne donne que des **candidats** (elle suppose l'existence !), la synthèse les confirme — oublier la synthèse est l'erreur classique, car l'analyse pourrait avoir produit des candidats fantômes." },
    { tier: "challenge", prompt: "Critique de démonstration — voici une « preuve » par récurrence que tous les crayons d'une même trousse ont la même couleur. « Pour $n = 1$ : un seul crayon, une seule couleur ✓. Hérédité : suppose la propriété vraie au rang $n$ et prends $n + 1$ crayons. Retire le premier : les $n$ restants ont la même couleur. Remets-le, retire le dernier : les $n$ premiers ont la même couleur. Les deux groupes se chevauchent, donc les $n + 1$ crayons ont tous la même couleur. » (1) Le résultat est absurde : où est LA faille ? (2) Réécris proprement ce que l'hérédité aurait dû vérifier. (3) Dégage la morale de rédaction.", solution: "(1) Teste l'hérédité sur le plus petit cas : $n = 1 \\to 2$. Deux crayons — retire le premier : le second forme un groupe « monochrome » ; retire le second : le premier aussi. Mais ces deux groupes ne se **chevauchent pas** : aucun crayon-pivot ne relie leurs couleurs — l'argument s'effondre exactement là, et là seulement (pour $n \\geq 2$, le chevauchement existe vraiment). (2) L'hérédité est une implication à démontrer pour **tout** rang $n \\geq 1$ : la rédaction honnête aurait dû écrire la phrase « les deux groupes ont au moins un crayon en commun » — et cette phrase, une fois écrite noir sur blanc, se vérifie… fausse pour $n = 1$. Une seule marche cassée, et l'escalier entier tombe : la propriété tient au rang $1$ et meurt au rang $2$. (3) Morale : chaque objet invoqué doit **exister** (le crayon commun), et l'écrire est le test — les preuves fausses survivent dans le flou, jamais dans une rédaction où chaque pas est une phrase vérifiable. Rédiger, c'est s'exposer à la vérification : c'est exactement le but." },
    { tier: "exam", prompt: "Soit $f : E \\to F$. On définit, pour $A \\subset E$ et $B \\subset F$ : $f(A) = \\{f(x),\\ x \\in A\\}$ et $f^{-1}(B) = \\{x \\in E,\\ f(x) \\in B\\}$. (1) Démontre $A \\subset f^{-1}(f(A))$ pour toute partie $A$. (2) Montre par un dessin en patates (décris-le) que l'inclusion peut être stricte, et identifie la propriété de $f$ qui force l'égalité pour tout $A$. (3) Démontre : $f$ injective ⟺ pour tout $A$, $f^{-1}(f(A)) = A$. (sens direct + réciproque par contraposée sur des singletons.)", solution: "(1) Soit $x \\in A$ : alors $f(x) \\in f(A)$ par définition de l'image, donc $x \\in f^{-1}(f(A))$ ✓ — deux définitions dépliées. (2) Dessin : $E = \\{a, b\\}$, $f(a) = f(b) = \\star$, $A = \\{a\\}$ — alors $f(A) = \\{\\star\\}$ et $f^{-1}(\\{\\star\\}) = \\{a, b\\} \\supsetneq A$ : la **collision** de $f$ fait gonfler l'aller-retour — c'est l'injectivité qui manque. (3) ($\\Rightarrow$) Soit $x \\in f^{-1}(f(A))$ : $f(x) \\in f(A)$, donc $f(x) = f(a)$ pour un $a \\in A$ ; l'injectivité donne $x = a \\in A$ ✓ — avec (1), égalité. ($\\Leftarrow$) Contraposée : si $f$ non injective, prends $x \\neq x'$ avec $f(x) = f(x')$ et $A = \\{x\\}$ : alors $x' \\in f^{-1}(f(A))$ mais $x' \\notin A$ — l'égalité échoue ✓ — l'aller-retour image-préimage **mesure** l'injectivité : le dessin du (2) contenait déjà toute la preuve du (3) : c'est la marque des bonnes figures." },
  ],
  practice: [
    { tier: "warmup", label: "Nier le quantificateur", make: (r) => {
      const cas = pick(r, [["\\forall x,\\ P(x)", 1], ["\\exists x,\\ P(x)", 0]]);
      return { prompt: `La négation de « $${cas[0]}$ » commence par : $\\exists$ (1) ou $\\forall$ (0) ?`, answer: cas[1], solution: `**${cas[1] ? "\\u2203" : "\\u2200"}** — la négation bascule le quantificateur.` };
    } },
    { tier: "application", label: "Compter les applications", make: (r) => {
      const n = randint(r, 2, 3); const p = randint(r, 2, 4);
      return { prompt: `Combien d'applications de $E$ ($${n}$ éléments) vers $F$ ($${p}$ éléments) ?`, answer: p ** n, solution: `Chaque élément de $E$ choisit parmi $${p}$ : $${p}^{${n}} = $ **${p ** n}** — le produit des choix.` };
    } },
    { tier: "challenge", label: "Injective ?", make: (r) => {
      const cas = pick(r, [["x \\mapsto x^2 \\text{ sur } \\mathbb{R}", 0], ["x \\mapsto x^3 \\text{ sur } \\mathbb{R}", 1], ["x \\mapsto x^2 \\text{ sur } \\mathbb{R}_+", 1], ["x \\mapsto \\cos x \\text{ sur } \\mathbb{R}", 0]]);
      return { prompt: `$${cas[0]}$ : injective (1) ou non (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Injective — pas de collision" : "Non — deux antécédents se rencontrent ($(-1)$ et $1$, par exemple)"}**.` };
    } },
    { tier: "warmup", label: "Valide ou pas ?", make: (r) => {
      const k = pick(r, [["S'il pleut, le sol est mouillé. Il pleut. Donc le sol est mouillé", 1, "le modus ponens — la règle de détachement, toujours valide"], ["S'il pleut, le sol est mouillé. Le sol est mouillé. Donc il pleut", 0, "affirmer le conséquent — l'arroseur automatique mouille aussi"], ["S'il pleut, le sol est mouillé. Il ne pleut pas. Donc le sol est sec", 0, "nier l'antécédent — le même piège, pris dans l'autre sens"], ["S'il pleut, le sol est mouillé. Le sol est sec. Donc il ne pleut pas", 1, "la contraposée — l'implication retournée, toujours valide"]]);
      return { prompt: `« ${k[0]} » : ce raisonnement est-il valide ? (1 oui, 0 non)`, answer: k[1], solution: `${k[1] ? "Valide (1)" : "Invalide (0)"} : c'est ${k[2]}.` };
    } },
  ],
};

// — Complex numbers and trigonometry (MPSI ch. 3) —
const complexesTrigonometrie = {
  id: "numbers.bachelor.complexes-trigonometrie",
  level: "bachelor", domain: "numbers",
  title: "Complexes : le plan qui calcule",
  tagline: "Module, argument, racines de l'unité — la trigonométrie devient de l'algèbre.",
  prereqs: ["numbers.high.plan-complexe", "analysis.high.exponentielle-imaginaire"],
  intuition:
    "Tu connais $e^{i\\theta}$ depuis les expertes — la licence en fait une **machine industrielle** : trois écritures d'un même nombre ($a + ib$, $r(\\cos\\theta + i\\sin\\theta)$, $re^{i\\theta}$), et l'art de choisir la bonne.\n\nLe gain : la trigonométrie tout entière devient de l'**algèbre** — linéariser $\\cos^4\\theta$, sommer $\\sum \\cos(k\\theta)$, résoudre $z^n = 1$ : trois corvées du lycée, trois lignes de calcul complexe.",
  depths: {
    discovery:
      "**Avec les mains** : calcule $(1 + i)^8$ trois fois — en force (développer huit fois : douloureux), par le binôme (mieux), puis en **exponentielle** : $1 + i = \\sqrt{2}\\,e^{i\\pi/4}$, donc $(1+i)^8 = 2^4 e^{2i\\pi} = 16$ — une ligne : la forme exponentielle transforme les puissances en multiplications d'angles — choisir l'écriture, c'est choisir la difficulté.",
    standard:
      "**En image** : le **cercle unité** porte le chapitre — les racines $n$-ièmes de l'unité ($z^n = 1$) sont les sommets d'un **polygone régulier** : $\\omega_k = e^{2ik\\pi/n}$ pour $k = 0, \\ldots, n-1$ — le dessin DIT les théorèmes : elles sont $n$ (un sommet par cran de $\\frac{2\\pi}{n}$), leur somme est **nulle** (le polygone est équilibré autour du centre !), et multiplier par $\\omega_1$ fait tourner d'un cran — big idea *Diagrams* : le cercle est la table de multiplication des angles.",
    advanced:
      "**Dans la tête** : les formules d'**Euler** ($\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}$) et de **Moivre** font la machine — **linéariser** : $\\cos^3\\theta = \\left(\\frac{e^{i\\theta}+e^{-i\\theta}}{2}\\right)^3 = \\frac{1}{4}\\cos 3\\theta + \\frac{3}{4}\\cos\\theta$ (binôme, regroupement des termes conjugués) — la primitive de $\\cos^3$ tombe d'un coup ; **sommer** : $\\sum_{k=0}^{n} e^{ik\\theta}$ est géométrique de raison $e^{i\\theta}$ — sa partie réelle livre $\\sum \\cos(k\\theta)$ ; et le **second degré** dans $\\mathbb{C}$ se résout toujours ($\\Delta$ quelconque : tout complexe a deux racines carrées) — enfin, la lecture géométrique : $z \\mapsto az + b$ ($a \\neq 0$) est la **similitude directe** de rapport $|a|$ et d'angle $\\arg a$ — l'algèbre des complexes EST la géométrie du plan : rotation, homothétie, et bientôt (L2) les isométries en matrices.",
  },
  keyIdea: "Trois écritures, un réflexe : **algébrique** pour sommer, **exponentielle** pour multiplier et élever. Racines $n$-ièmes = **polygone régulier** sur le cercle (somme nulle — *Diagrams*). **Euler linéarise** ($\\cos^n \\to$ somme de $\\cos k\\theta$), la **géométrique complexe somme** les $\\cos(k\\theta)$, et $z \\mapsto az + b$ est une similitude : l'algèbre fait la géométrie.",
  why:
    "Pourquoi tant insister sur un objet déjà vu ? Parce que les complexes sont l'**infrastructure** de la suite : les séries entières (L2) vivent dans des disques de $\\mathbb{C}$, l'analyse complexe (L3) y déploie ses résidus, les polynômes s'y factorisent toujours (d'Alembert-Gauss), la transformée de Fourier est une intégrale contre $e^{-i\\omega t}$, et ta crypto manipule des racines de l'unité dans les corps finis (la NTT qui accélère les multiplications polynomiales de Kyber est exactement le polygone régulier de cette leçon, transposé dans $\\mathbb{F}_q$). On ne réapprend pas les complexes : on les industrialise.",
  examples: [
    { title: "(1 + i)⁸ en une ligne", steps: [
      { p: "$1 + i = \\sqrt{2}\\,e^{i\\pi/4}$ — la forme exponentielle d'abord." },
      { p: "$(1+i)^8 = (\\sqrt{2})^8 e^{2i\\pi} = 16$ — la puissance est devenue une multiplication d'angle." },
    ] },
    { title: "Le polygone des racines", steps: [
      { p: "$z^5 = 1$ : cinq sommets $e^{2ik\\pi/5}$ — le pentagone régulier sur le cercle unité." },
      { p: "Somme nulle : le polygone s'équilibre autour de l'origine — la géométrie démontre l'algèbre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris $z = -1 + i\\sqrt{3}$ sous forme exponentielle (module, puis argument lu sur le cercle), et calcule $z^6$.", solution: "$|z| = \\sqrt{1 + 3} = 2$ ; l'argument : $\\cos\\theta = -\\frac{1}{2}$, $\\sin\\theta = \\frac{\\sqrt{3}}{2}$ — le cercle pointe $\\theta = \\frac{2\\pi}{3}$ : $z = 2e^{2i\\pi/3}$ — puis $z^6 = 2^6 e^{4i\\pi} = $ **64** : module à la puissance, argument multiplié (et $4\\pi \\equiv 0$ : retour au réel positif) — la forme exponentielle rend la puissance triviale." },
    { tier: "warmup", prompt: "Résous $z^2 = 3 - 4i$ (pose $z = a + ib$, identifie parties réelle/imaginaire ET module). Puis résous $z^2 - (1+i)z + i = 0$ — racine évidente ?", solution: "Système : $a^2 - b^2 = 3$, $2ab = -4$, et les modules : $a^2 + b^2 = |3 - 4i| = 5$ — d'où $a^2 = 4$, $b^2 = 1$, signes opposés ($ab < 0$) : $z = \\pm(2 - i)$ ✓. Pour l'équation : $z = 1$ est racine évidente ($1 - 1 - i + i = 0$ ✓), produit des racines $= i$ : l'autre est $i$ — dans $\\mathbb{C}$, le second degré se résout TOUJOURS : c'est le luxe du corps algébriquement clos, que d'Alembert-Gauss généralisera." },
    { tier: "application", prompt: "Linéarise $\\cos^4\\theta$ par les formules d'Euler, et déduis-en $\\displaystyle\\int_0^{\\pi/2} \\cos^4\\theta\\,\\mathrm{d}\\theta$.", solution: "$\\cos^4\\theta = \\left(\\frac{e^{i\\theta} + e^{-i\\theta}}{2}\\right)^4 = \\frac{1}{16}(e^{4i\\theta} + 4e^{2i\\theta} + 6 + 4e^{-2i\\theta} + e^{-4i\\theta}) = \\frac{1}{8}\\cos 4\\theta + \\frac{1}{2}\\cos 2\\theta + \\frac{3}{8}$ — le binôme regroupe ses conjugués en cosinus. Intégrale : les $\\cos 4\\theta$ et $\\cos 2\\theta$ s'intègrent en sinus nuls aux bornes... vérifions : $\\left[\\frac{\\sin 4\\theta}{32} + \\frac{\\sin 2\\theta}{4}\\right]_0^{\\pi/2} = 0$ ✓ — reste $\\frac{3}{8} \\times \\frac{\\pi}{2} = \\dfrac{3\\pi}{16}$ — linéariser, c'est rendre intégrable : la machine d'Euler au travail." },
    { tier: "challenge", prompt: "Calcule $S = \\displaystyle\\sum_{k=0}^{n} \\cos(k\\theta)$ pour $\\theta \\not\\equiv 0\\ [2\\pi]$, en sommant la géométrique $\\sum e^{ik\\theta}$ et en prenant la partie réelle (factorisation par l'angle moitié recommandée).", solution: "$\\sum_{k=0}^n e^{ik\\theta} = \\dfrac{e^{i(n+1)\\theta} - 1}{e^{i\\theta} - 1}$ — factorise chaque exponentielle par son angle moitié : $\\dfrac{e^{i(n+1)\\theta/2}}{e^{i\\theta/2}} \\cdot \\dfrac{\\sin\\frac{(n+1)\\theta}{2}}{\\sin\\frac{\\theta}{2}}$ — partie réelle : $S = \\dfrac{\\sin\\frac{(n+1)\\theta}{2}}{\\sin\\frac{\\theta}{2}}\\cos\\frac{n\\theta}{2}$ — la somme de cosinus, conquise par UNE série géométrique complexe : l'angle moitié est LE geste technique du chapitre (il transforme $e^{ix} - 1$ en module × phase), et ce noyau resurgira dans les séries de Fourier de L3." },
    { tier: "exam", prompt: "Soit $n \\geq 2$ et $\\omega = e^{2i\\pi/n}$. (1) Justifie que les racines de $z^n = 1$ sont exactement les $\\omega^k$, $k = 0, \\ldots, n-1$, et place-les pour $n = 6$. (2) Démontre $\\sum_{k=0}^{n-1} \\omega^k = 0$ de deux façons : géométrique (somme télescopée par multiplication par $\\omega$) et algébrique (la factorisation de $z^n - 1$). (3) En déduire $\\sum_{k=0}^{n-1} \\cos\\frac{2k\\pi}{n} = 0$ et l'interpréter sur le polygone. (4) Application : démontre que le produit des distances d'un sommet du polygone aux $n - 1$ autres vaut $n$ (factorise $\\frac{z^n - 1}{z - 1}$ et évalue en $z = 1$).", solution: "(1) $(\\omega^k)^n = e^{2ik\\pi} = 1$ ✓ et les $\\omega^k$ sont deux à deux distincts (arguments distincts dans $[0, 2\\pi[$) : $n$ racines d'un polynôme de degré $n$ — toutes. Pour $n = 6$ : l'hexagone régulier, sommets tous les $60°$. (2) Géométrique : pose $S = \\sum \\omega^k$ — alors $\\omega S = \\sum \\omega^{k+1} = S$ (les indices tournent d'un cran, l'ensemble est invariant !) : $(\\omega - 1)S = 0$ et $\\omega \\neq 1$ donc $S = 0$ — **l'invariance par rotation tue la somme** (big idea *Invariance* en action). Algébrique : $z^n - 1 = (z-1)(1 + z + \\cdots + z^{n-1})$, évalué en... les racines $\\neq 1$ annulent le second facteur, et la somme des racines du polynôme $1 + z + \\cdots + z^{n-1}$ vaut $-\\frac{a_{n-2}}{a_{n-1}} = -1$... plus direct : $S$ est la somme de TOUTES les racines de $z^n - 1$, soit $-(\\text{coeff de } z^{n-1}) = 0$ ✓. (3) Partie réelle de $S = 0$ : les abscisses des sommets se compensent — **le polygone est équilibré** : son centre de gravité est l'origine. (4) $\\prod_{k=1}^{n-1}(z - \\omega^k) = \\frac{z^n - 1}{z - 1} = 1 + z + \\cdots + z^{n-1}$ — évalue en $z = 1$ : $\\prod_{k=1}^{n-1}|1 - \\omega^k| = |n| = n$ — un produit de $n - 1$ longueurs vaut exactement $n$ : le polygone cache cette identité que seule l'algèbre révèle — géométrie, invariance, polynômes : tout le chapitre dans un hexagone." },
  ],
  practice: [
    { tier: "warmup", label: "Le module d'abord", make: (r) => {
      const t = pick(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
      return { prompt: `$|${t[0]} + ${t[1]}i| = \\,?$`, answer: t[2], solution: `$\\sqrt{${t[0] ** 2} + ${t[1] ** 2}} = $ **${t[2]}** — Pythagore dans le plan complexe.` };
    } },
    { tier: "application", label: "La puissance par l'angle", make: (r) => {
      const n = pick(r, [4, 8]); const val = n === 4 ? -4 : 16;
      return { prompt: `$(1 + i)^{${n}} = \\,?$ (forme exponentielle : $\\sqrt{2}\\,e^{i\\pi/4}$)`, answer: val, solution: `$(\\sqrt{2})^{${n}} e^{i${n}\\pi/4} = ${n === 4 ? "4e^{i\\pi}" : "16e^{2i\\pi}"} = $ **${val}** — l'angle fait le signe.` };
    } },
    { tier: "challenge", label: "Compter les racines", make: (r) => {
      const n = randint(r, 3, 8);
      return { prompt: `Combien de solutions complexes à $z^{${n}} = 1$ ?`, answer: n, solution: `**${n}** — le polygone régulier à ${n} sommets sur le cercle unité.` };
    } },
  ],
};

// — Fundamental calculation techniques (MPSI ch. 4) —
const calculPratique = {
  id: "analysis.bachelor.calcul-pratique",
  level: "bachelor", domain: "analysis",
  title: "Techniques de calcul : l'atelier de l'analyste",
  tagline: "Fonctions usuelles, primitives, équations différentielles linéaires — l'outillage avant la théorie.",
  prereqs: ["analysis.high.primitives-equadiff", "analysis.high.fonction-derivee"],
  intuition:
    "Avant les grands théorèmes du semestre, le programme installe l'**atelier** : les fonctions usuelles au complet (dont les nouvelles : $\\arctan$, $\\arcsin$, ch et sh), le calcul de primitives qui marche, et les équations différentielles linéaires des physiciens.\n\nL'enjeu n'est pas conceptuel mais **musculaire** : que dériver, primitiver et résoudre $y' + ay = b$ devienne aussi automatique que la table de 7.",
  depths: {
    discovery:
      "**Avec les mains** : résous la charge du condensateur — $y' + \\dfrac{y}{\\tau} = \\dfrac{E}{\\tau}$ : l'homogène donne $\\lambda e^{-t/\\tau}$ (la décharge que tu connais !), une solution particulière constante saute aux yeux ($y = E$), et la solution générale **additionne** : $y(t) = E + \\lambda e^{-t/\\tau}$ — la condition initiale $y(0) = 0$ fixe $\\lambda = -E$ : la courbe de charge exacte, en trois gestes — homogène, particulière, condition initiale : LE rituel du chapitre.",
    standard:
      "**En image** : deux dessins structurent — d'abord les **réciproques en miroir** : $\\arctan$ est le reflet de $\\tan$ dans la diagonale $y = x$ (restreinte à $]-\\frac{\\pi}{2}, \\frac{\\pi}{2}[$ pour l'injectivité — ta leçon de logique !) : bornée par $\\pm\\frac{\\pi}{2}$, croissante, de dérivée $\\frac{1}{1 + x^2}$ (le miroir inverse les pentes !) ; ensuite la **famille des courbes intégrales** : les solutions de $y' + ay = b$ forment un faisceau de courbes parallèles convergeant vers la solution d'équilibre — une par condition initiale, jamais deux qui se croisent : le dessin annonce Cauchy-Lipschitz (L3) bien avant son énoncé.",
    advanced:
      "**Dans la tête** : la **structure** derrière les recettes — big idea *Equivalence* version linéaire : l'ensemble des solutions de $y' + ay = b$ est « une particulière + toutes les homogènes » — une **droite affine** de fonctions (et tu reverras exactement cette phrase pour les systèmes linéaires, les EDL d'ordre 2, et les espaces affines de L1 : c'est LA structure linéaire, partout la même). L'ordre 2 à coefficients constants suit le rituel : équation caractéristique $r^2 + ar + b = 0$, trois régimes selon $\\Delta$ (deux exponentielles réelles / régime critique $\\,(\\lambda + \\mu t)e^{rt}$ / oscillations amorties $e^{\\alpha t}(\\lambda\\cos\\omega t + \\mu\\sin\\omega t)$ — ton second degré complexe sert immédiatement) ; et côté primitives, trois gestes couvrent le programme : reconnaître $u'u^n$, $\\frac{u'}{u}$, $u'e^u$ ; **intégrer par parties** ; **changer de variable** — l'atelier complet, que le chapitre d'intégration (fin de semestre) fondera rigoureusement.",
  },
  keyIdea: "Réciproques **en miroir** ($\\arctan' = \\frac{1}{1+x^2}$ — le miroir inverse les pentes). EDL : **homogène + particulière + condition initiale** — les solutions forment une **droite affine** (*Equivalence* linéaire) ; ordre 2 : équation caractéristique, trois régimes selon $\\Delta$. Primitives : reconnaître $u'f(u)$, IPP, changement de variable.",
  why:
    "Pourquoi un chapitre d'atelier ? Parce que la licence entière calculera : les séries (L2) demandent des équivalents de fonctions usuelles, l'intégration de Lebesgue (L3) suppose les primitives fluides, la physique de tes voisins vit d'EDL — et l'examinateur de colle teste d'abord la main. La structure « particulière + homogène » est le vrai trésor caché : c'est la première apparition du schéma affine qui organisera l'algèbre linéaire — apprends le rituel ici, tu reconnaîtras le théorème là-bas.",
  examples: [
    { title: "Le rituel de l'ordre 1", steps: [
      { p: "$y' + 2y = 6$ : homogène $\\lambda e^{-2t}$, particulière $y = 3$ — général : $3 + \\lambda e^{-2t}$." },
      { p: "$y(0) = 1$ fixe $\\lambda = -2$ — homogène, particulière, condition : trois gestes, toujours." },
    ] },
    { title: "Le miroir d'arctan", steps: [
      { p: "$\\arctan$ reflète $\\tan$ dans la diagonale : bornée par $\\pm\\frac{\\pi}{2}$, dérivée $\\frac{1}{1+x^2}$." },
      { p: "Le miroir inverse les pentes : $(f^{-1})'(y) = \\frac{1}{f'(x)}$ — la formule EST le dessin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule $\\arctan(1)$, $\\arcsin\\left(\\frac{1}{2}\\right)$ et $\\arctan(\\sqrt{3})$ — en lisant le cercle trigonométrique à l'envers (quel angle de l'intervalle principal a cette tangente, ce sinus ?).", solution: "$\\arctan 1 = \\dfrac{\\pi}{4}$ (l'angle de $]-\\frac{\\pi}{2}, \\frac{\\pi}{2}[$ dont la tangente vaut 1), $\\arcsin\\frac{1}{2} = \\dfrac{\\pi}{6}$, $\\arctan\\sqrt{3} = \\dfrac{\\pi}{3}$ — les réciproques se LISENT sur le cercle, dans l'intervalle principal seulement : c'est la restriction qui rend la fonction injective, donc inversible — ta leçon de logique appliquée au premier objet venu." },
    { tier: "warmup", prompt: "Primitive de : (a) $\\dfrac{2x}{1 + x^2}$ ; (b) $x e^{x^2}$ ; (c) $\\dfrac{1}{1 + x^2}$ ; (d) $\\tan x$ (écris-le en $\\frac{u'}{u}$).", solution: "(a) $\\ln(1 + x^2)$ — c'est $\\frac{u'}{u}$ ; (b) $\\frac{1}{2}e^{x^2}$ — c'est $\\frac{1}{2}u'e^u$ ; (c) $\\arctan x$ — la nouvelle venue, à connaître par cœur ; (d) $\\tan x = \\frac{\\sin x}{\\cos x} = -\\frac{u'}{u}$ avec $u = \\cos$ : primitive $-\\ln|\\cos x|$ — quatre primitives, un seul geste : RECONNAÎTRE la forme $u' f(u)$ avant de calculer — l'œil avant la main." },
    { tier: "application", prompt: "Résous $y' + 3y = 6e^{-t}$ avec $y(0) = 1$ : homogène, particulière de la forme $\\lambda e^{-t}$ (pourquoi cette forme ?), recollement.", solution: "Homogène : $\\mu e^{-3t}$. Particulière : le second membre est $e^{-t}$ et $-1$ n'est PAS la racine caractéristique ($-3$) : on cherche $y_p = \\lambda e^{-t}$ — injecte : $-\\lambda + 3\\lambda = 6$ ⟹ $\\lambda = 3$. Général : $y = 3e^{-t} + \\mu e^{-3t}$ ; $y(0) = 1$ : $\\mu = -2$ — $y(t) = 3e^{-t} - 2e^{-3t}$ — la forme de la particulière copie le second membre (exponentielle → exponentielle) : le principe qui guide tout le chapitre, avec son exception (résonance) quand l'exposant tombe sur la racine caractéristique." },
    { tier: "challenge", prompt: "Résous $y'' + 2y' + 5y = 0$ : équation caractéristique, racines complexes, forme réelle des solutions — et décris physiquement le régime (un oscillateur amorti).", solution: "$r^2 + 2r + 5 = 0$ : $\\Delta = -16$ — racines $r = -1 \\pm 2i$ (ton second degré complexe !) : solutions réelles $y(t) = e^{-t}(\\lambda\\cos 2t + \\mu\\sin 2t)$ — physiquement : une **oscillation** (le $2i$ : pulsation 2) dont l'amplitude **fond** exponentiellement (le $-1$ : l'amortissement) — la partie réelle de la racine pilote l'enveloppe, la partie imaginaire la fréquence : tout le comportement de l'oscillateur se lit sur deux racines complexes — l'algèbre de la leçon précédente devenue mécanique." },
    { tier: "exam", prompt: "Un circuit RLC série donne $y'' + 4y' + 4y = 8$, avec $y(0) = 0$ et $y'(0) = 0$. (1) Équation caractéristique : quel régime ? (2) Solution homogène (attention au cas particulier), solution particulière évidente, solution générale. (3) Applique les deux conditions initiales et donne $y(t)$. (4) Vérifie le comportement en $t \\to +\\infty$ et justifie qu'il était prévisible SANS résoudre. (5) Structure : en quoi l'ensemble des solutions de l'équation complète illustre-t-il « une droite affine de fonctions » — et où reverras-tu cette phrase ?", solution: "(1) $r^2 + 4r + 4 = (r + 2)^2$ : racine **double** $r = -2$ — le régime critique. (2) Homogène : $(\\lambda + \\mu t)e^{-2t}$ (le facteur $t$ : la signature de la racine double) ; particulière : $y = 2$ ($4 \\times 2 = 8$ ✓) ; général : $y = 2 + (\\lambda + \\mu t)e^{-2t}$. (3) $y(0) = 0$ : $\\lambda = -2$ ; $y'(t) = (\\mu - 2\\lambda - 2\\mu t)e^{-2t}$, $y'(0) = 0$ : $\\mu = 2\\lambda = -4$ — $y(t) = 2 - (2 + 4t)e^{-2t}$. (4) $t \\to +\\infty$ : l'exponentielle écrase le polynôme (croissances comparées) : $y \\to 2$ — prévisible : la solution d'**équilibre** de l'équation est $y = 2$, et l'homogène (qui meurt) ne fait que décrire le transitoire : le système charge vers son régime permanent. (5) Solutions complètes $=$ $\\{2 + h,\\ h \\text{ homogène}\\}$ : le point « 2 » translaté de la droite vectorielle... ici un PLAN vectoriel des homogènes ($\\lambda, \\mu$ libres) : **un sous-espace affine** — particulière + noyau : tu reverras cette phrase mot pour mot au théorème du rang ($f(x) = b$ ⟺ $x_0 + \\ker f$) et aux systèmes linéaires — l'EDL du physicien et le système du matheux partagent le même squelette : c'est la grande idée linéaire, rencontrée ici pour la première fois." },
  ],
  practice: [
    { tier: "warmup", label: "La primitive reconnue", make: (r) => {
      const cas = pick(r, [["\\dfrac{1}{1+x^2}", "\\arctan x", 1], ["2xe^{x^2}", "e^{x^2}", 2], ["\\dfrac{2x}{1+x^2}", "\\ln(1+x^2)", 3]]);
      return { prompt: `Une primitive de $${cas[0]}$ : $\\arctan x$ (1), $e^{x^2}$ (2) ou $\\ln(1+x^2)$ (3) ?`, answer: cas[2], solution: `$${cas[1]}$ — reconnaître la forme avant de calculer.` };
    } },
    { tier: "application", label: "La solution d'équilibre", make: (r) => {
      const a = pick(r, [2, 3, 5]); const b = a * randint(r, 2, 6);
      return { prompt: `$y' + ${a}y = ${b}$ : la solution particulière constante ?`, answer: b / a, solution: `$y = \\dfrac{${b}}{${a}} = $ **${b / a}** — l'équilibre où $y' = 0$.` };
    } },
    { tier: "challenge", label: "Le régime de l'ordre 2", make: (r) => {
      const cas = pick(r, [["r^2 - 5r + 6", 0, "deux réelles : régime apériodique"], ["r^2 + 4", 2, "imaginaires pures : oscillation entretenue"], ["r^2 + 2r + 1", 1, "racine double : régime critique"], ["r^2 + 2r + 5", 2, "complexes : oscillation amortie"]]);
      return { prompt: `Caractéristique $${cas[0]} = 0$ : réelles distinctes (0), double (1) ou complexes (2) ?`, answer: cas[1], solution: `**${cas[2].charAt(0).toUpperCase() + cas[2].slice(1)}** — le $\\Delta$ dicte le régime.` };
    } },
  ],
};

export default [raisonnementEnsembles, complexesTrigonometrie, calculPratique];
