// Field "Analysis" — BACHELOR module (l1 year), licence de mathématiques.
// Official MPSI/MP2I programme (arrêté 2021), chapters "Nombres réels et
// suites numériques" (upper bound property, epsilon-N convergence, monotone
// limit theorem, adjacent sequences, extracted sequences, Bolzano-
// Weierstrass), "Fonctions d'une variable réelle : limites et continuité,
// dérivabilité" (epsilon-delta limits, intermediate value theorem, extreme
// value theorem on a segment, Rolle, mean value theorem and applications)
// and "Analyse asymptotique" (equivalents, o/O comparison, Taylor-Young,
// usual expansions, limit computation). Singapore method: the epsilon
// definition is first PLAYED on an explicit sequence, then DRAWN as the
// tube picture, then formalized; Rolle is the rotating-tangent drawing;
// Taylor is the local microscope. Big ideas Invariance and Diagrams named;
// exam tiers are colle-grade multi-step proofs.
import { randint, pick } from "../../core/exercises.js";

// — Real numbers and sequences (MPSI ch. 5) —
const reelsSuites = {
  id: "analysis.bachelor.reels-suites",
  level: "bachelor", domain: "analysis",
  title: "Nombres réels et suites : ε entre en scène",
  tagline: "La borne supérieure fonde ℝ, le tube ε définit la limite — l'analyse devient exacte.",
  prereqs: ["analysis.high.suites-limites", "analysis.high.recurrence"],
  intuition:
    "Au lycée, « $u_n$ tend vers $\\ell$ » restait intuitif. La licence exige une définition **vérifiable** : aussi près qu'on veuille ($\\varepsilon$), à partir d'un certain rang ($N$), tous les termes y sont.\n\nEt sous cette définition, un axiome fonde tout : toute partie non vide majorée de $\\mathbb{R}$ a une **borne supérieure** — c'est ce qui distingue $\\mathbb{R}$ de $\\mathbb{Q}$ (où $\\{x : x^2 < 2\\}$ n'a pas de plus petit majorant rationnel) : la droite réelle n'a pas de trou.",
  depths: {
    discovery:
      "**Avec les mains** : joue la définition sur $u_n = \\dfrac{1}{n}$ — défi : $\\varepsilon = 0{,}01$ : à partir de quel rang $|u_n - 0| \\leq 0{,}01$ ? Réponse : $N = 100$ ✓ ; nouveau défi $\\varepsilon = 10^{-6}$ : $N = 10^6$ ✓ — quel que soit le défi $\\varepsilon$, **tu sais produire** le $N$ : c'est exactement « $\\forall \\varepsilon > 0,\\ \\exists N$ » — la limite est un jeu à deux joueurs, et converger, c'est avoir une stratégie gagnante contre tous les $\\varepsilon$.",
    standard:
      "**En image** : le **tube** — trace la bande horizontale $[\\ell - \\varepsilon,\\ \\ell + \\varepsilon]$ autour de la limite : converger, c'est que la suite finisse **piégée dans le tube** (au plus un nombre fini de points dehors), et ce pour tout rétrécissement du tube — le dessin rend les théorèmes évidents : l'**unicité** de la limite (deux tubes disjoints autour de deux limites distinctes ne peuvent piéger tous deux la queue de la suite), le théorème d'**encadrement** (coincée entre deux suites du tube, la troisième y est) — big idea *Diagrams* : le tube est la définition, dessinée.",
    advanced:
      "**Dans la tête** : la borne sup déploie ses conséquences — le théorème de la **limite monotone** (croissante majorée ⟹ converge, vers sa borne sup : la suite grimpe vers le plafond le plus bas) ; les **suites adjacentes** (l'une monte, l'autre descend, l'écart fond : elles pincent une limite commune — la machine à fabriquer des réels, dont les segments emboîtés) ; et les **suites extraites** : de toute suite bornée on peut extraire une sous-suite convergente — **Bolzano-Weierstrass**, démontré par dichotomie (coupe l'intervalle en deux : une moitié contient une infinité de termes ; recoupe ; les segments emboîtés pincent la valeur d'adhérence) — le théorème de compacité avant l'heure, et l'argument de dichotomie que tu recroiseras de la topologie (L2) à tes recherches binaires.",
  },
  keyIdea: "**Borne sup** : tout majoré non vide a un plus petit majorant — $\\mathbb{R}$ est sans trou. **Limite** : $\\forall \\varepsilon\\ \\exists N$ — le **tube** qui piège la queue de la suite (*Diagrams*). Monotone majorée ⟹ converge ; adjacentes ⟹ limite commune ; bornée ⟹ sous-suite convergente (**Bolzano-Weierstrass**, par dichotomie).",
  why:
    "Pourquoi formaliser ce qui marchait ? Parce que l'intuition ment dès que ça se complique : une suite peut s'approcher de 0 sans converger (alternée), avoir deux valeurs d'adhérence, converger « lentement »... et les séries de L2, les espaces de fonctions, les probabilités de L3 exigent l'outil exact. La borne sup est le socle invisible : sans elle, ni limite monotone, ni TVI, ni intégrale — toute l'analyse réelle repose sur « pas de trou ». Et le jeu $\\varepsilon$-$N$ est la première vraie épreuve de quantificateurs : ta leçon de logique passe à l'acte.",
  examples: [
    { title: "Le jeu epsilon", steps: [
      { p: "$u_n = \\frac{1}{n}$, défi $\\varepsilon = 10^{-3}$ : réponse $N = 1000$ — la stratégie : $N = \\lceil 1/\\varepsilon \\rceil$." },
      { p: "Une stratégie pour TOUT $\\varepsilon$ : voilà la convergence — un jeu gagné d'avance." },
    ] },
    { title: "Les adjacentes qui pincent", steps: [
      { p: "$a_n$ monte, $b_n$ descend, $b_n - a_n \\to 0$ : les deux mâchoires se referment." },
      { p: "La limite commune existe par borne sup — c'est ainsi qu'on fabrique $e$, $\\pi$, et tous les réels." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour $u_n = \\dfrac{2n + 1}{n + 3}$ : devine la limite, puis joue le jeu — pour $\\varepsilon = 0{,}1$, trouve un rang $N$ qui marche (majore $|u_n - 2|$ par une fraction simple).", solution: "Limite : $\\ell = 2$. Calcule l'écart : $|u_n - 2| = \\left|\\dfrac{2n + 1 - 2n - 6}{n + 3}\\right| = \\dfrac{5}{n + 3}$ — défi $\\varepsilon = 0{,}1$ : il suffit que $\\dfrac{5}{n+3} \\leq 0{,}1$, soit $n \\geq 47$ : $N = 47$ convient ✓ — la stratégie générale est lisible : $N = \\lceil 5/\\varepsilon \\rceil$ marche pour tout défi — majorer l'écart par une expression simple, puis inverser : LE geste du jeu epsilon." },
    { tier: "warmup", prompt: "Démontre l'unicité de la limite avec le tube : suppose $u_n \\to \\ell$ et $u_n \\to \\ell'$ avec $\\ell \\neq \\ell'$, et choisis $\\varepsilon = \\dfrac{|\\ell - \\ell'|}{3}$.", solution: "Avec ce $\\varepsilon$, les tubes $[\\ell \\pm \\varepsilon]$ et $[\\ell' \\pm \\varepsilon]$ sont **disjoints** (leur écart vaut au moins $\\frac{|\\ell - \\ell'|}{3} > 0$) — or chacun doit contenir tous les termes à partir d'un rang ($N$ et $N'$) : pour $n \\geq \\max(N, N')$, $u_n$ vivrait dans deux tubes disjoints — **absurde** ✓ — le dessin des deux tubes ÉTAIT la preuve : choisir l'$\\varepsilon$ qui les sépare, c'est tout l'art." },
    { tier: "application", prompt: "Soit $u_0 = 2$ et $u_{n+1} = \\dfrac{u_n + 3/u_n}{2}$ (méthode de Héron pour $\\sqrt{3}$). Montre que $u_n \\geq \\sqrt{3}$ pour tout $n$ (étudie $u_{n+1}^2 - 3$), puis que la suite est décroissante, et conclus à la convergence vers $\\sqrt{3}$.", solution: "Minoration : $u_{n+1}^2 - 3 = \\dfrac{(u_n^2 - 3)^2}{4u_n^2} \\geq 0$ ✓ (et $u_0 = 2 \\geq \\sqrt{3}$) — chaque itéré reste au-dessus. Décroissance : $u_{n+1} - u_n = \\dfrac{3 - u_n^2}{2u_n} \\leq 0$ puisque $u_n^2 \\geq 3$ ✓. **Décroissante minorée ⟹ converge** (limite monotone !) vers $\\ell \\geq \\sqrt{3}$ ; la limite vérifie l'équation de point fixe $\\ell = \\frac{\\ell + 3/\\ell}{2}$, soit $\\ell^2 = 3$ : $\\ell = \\sqrt{3}$ — l'algorithme babylonien, certifié par le théorème : c'est exactement ainsi que ta calculatrice extrait les racines, et la convergence est foudroyante (l'écart est élevé au carré à chaque pas)." },
    { tier: "challenge", prompt: "Soient $a_n = \\sum_{k=0}^{n} \\dfrac{1}{k!}$ et $b_n = a_n + \\dfrac{1}{n \\cdot n!}$. Montre que ces suites sont adjacentes — leur limite commune est $e$. Bonus : déduis-en que $e$ est irrationnel (suppose $e = \\frac{p}{q}$ et regarde $q!\\,(e - a_q)$).", solution: "$a$ croît (on ajoute $\\frac{1}{(n+1)!} > 0$) ; $b_{n+1} - b_n = \\frac{1}{(n+1)!} + \\frac{1}{(n+1)(n+1)!} - \\frac{1}{n\\,n!} = \\frac{n(n+1) + n - (n+1)^2}{n(n+1)(n+1)!} = \\frac{-1}{n(n+1)(n+1)!} < 0$ : $b$ décroît ✓ ; et $b_n - a_n = \\frac{1}{n\\,n!} \\to 0$ ✓ — **adjacentes** : limite commune $e$, avec l'encadrement $a_n < e < b_n$ pour tout $n$. Bonus : si $e = \\frac{p}{q}$, alors $q!\\,e \\in \\mathbb{N}$ et $q!\\,a_q \\in \\mathbb{N}$ (chaque $\\frac{q!}{k!}$ est entier) — or $0 < q!(e - a_q) < q!\\,(b_q - a_q) = \\frac{1}{q} < 1$ : un **entier strictement entre 0 et 1** — absurde : $e \\notin \\mathbb{Q}$ — les mâchoires adjacentes ne donnent pas que l'existence : leur vitesse de pincement démontre l'irrationalité — un bijou de 1815, à ta portée dès le premier semestre." },
    { tier: "exam", prompt: "Bolzano-Weierstrass par dichotomie. Soit $(u_n)$ une suite à valeurs dans $[a, b]$. (1) Explique la construction : couper l'intervalle en deux, choisir une moitié contenant une infinité de termes, recommencer — pourquoi une telle moitié existe-t-elle toujours ? (2) Justifie que les intervalles emboîtés $[a_k, b_k]$ produits ont des extrémités adjacentes, de limite commune $c$. (3) Construis l'extraction : comment choisir $\\varphi(k)$ strictement croissante avec $u_{\\varphi(k)} \\in [a_k, b_k]$ ? (4) Conclus $u_{\\varphi(k)} \\to c$, et énonce le théorème. (5) Donne une suite bornée divergente et exhibe DEUX valeurs d'adhérence — pourquoi cela ne contredit-il rien ?", solution: "(1) Si chaque moitié ne contenait qu'un nombre **fini** de termes, leur réunion aussi — or la suite est infinie : au moins une moitié en contient une infinité (principe des tiroirs, version infinie). (2) $a_k$ croît, $b_k$ décroît, $b_k - a_k = \\frac{b - a}{2^k} \\to 0$ : **adjacentes** — limite commune $c$ ✓ (la machine de l'exercice précédent !). (3) Récurrence : $\\varphi(0)$ = un indice dans $[a_0, b_0]$ ; $[a_{k+1}, b_{k+1}]$ contient une infinité d'indices, donc un indice $> \\varphi(k)$ : prends-le pour $\\varphi(k+1)$ — l'infinité à chaque étage garantit qu'on peut toujours dépasser. (4) $a_k \\leq u_{\\varphi(k)} \\leq b_k$ et les mâchoires tendent vers $c$ : **encadrement** ⟹ $u_{\\varphi(k)} \\to c$ — *toute suite réelle bornée admet une sous-suite convergente*. (5) $u_n = (-1)^n$ : bornée, divergente, mais les termes pairs convergent vers 1 et les impairs vers $-1$ — **deux valeurs d'adhérence** : le théorème promet UNE sous-suite convergente, jamais la convergence de la suite — et cette nuance (adhérence vs limite) est le germe de la compacité, le concept-roi de la topologie de L2 : tu viens de démontrer ton premier théorème de compacité." },
  ],
  practice: [
    { tier: "warmup", label: "Le N du défi", make: (r) => {
      const eps = pick(r, [[10, "0{,}1"], [100, "0{,}01"], [1000, "0{,}001"]]);
      return { prompt: `$u_n = \\dfrac{1}{n}$, défi $\\varepsilon = ${eps[1]}$ : le plus petit $N$ tel que $u_N \\leq \\varepsilon$ ?`, answer: eps[0], solution: `$N = $ **${eps[0]}** — la stratégie $N = 1/\\varepsilon$.` };
    } },
    { tier: "application", label: "Converger ou pas", make: (r) => {
      const cas = pick(r, [["croissante et majorée", 1], ["croissante et non majorée", 0], ["décroissante et minorée", 1], ["bornée", 0]]);
      return { prompt: `Une suite ${cas[0]} converge-t-elle toujours ? (1 oui / 0 non)`, answer: cas[1], solution: `**${cas[1] ? "Oui — limite monotone" : cas[0] === "bornée" ? "Non — $(-1)^n$ est bornée et diverge (mais a une sous-suite convergente : B-W)" : "Non — elle tend vers $+\\infty$"}**.` };
    } },
    { tier: "challenge", label: "Les mâchoires", make: (r) => {
      const k = pick(r, [4, 8, 16]);
      return { prompt: `Adjacentes avec $b_n - a_n = \\dfrac{${k}}{2^n}$ : premier rang où l'écart $\\leq 1$ ?`, answer: Math.log2(k), solution: `$2^n \\geq ${k}$ : $n = $ **${Math.log2(k)}** — la dichotomie pince à vitesse géométrique.` };
    } },
  ],
};

// — Limits, continuity, differentiability (MPSI ch. 6) —
const continuiteDerivabilite = {
  id: "analysis.bachelor.continuite-derivabilite",
  level: "bachelor", domain: "analysis",
  title: "Continuité et dérivabilité : les grands théorèmes",
  tagline: "TVI, extrema sur un segment, Rolle, accroissements finis — l'analyse gagne ses outils de preuve.",
  prereqs: ["analysis.high.limites-fonctions", "analysis.high.continuite"],
  intuition:
    "Le lycée utilisait le TVI ; la licence le **démontre** — et l'entoure de sa famille : toute fonction continue sur un segment est bornée et **atteint** ses bornes ; entre deux points d'égale altitude, la tangente s'horizontalise quelque part (**Rolle**) ; et sur tout intervalle, la pente moyenne est une pente instantanée (**accroissements finis**).\n\nQuatre théorèmes, une signature commune : ils affirment qu'un point **existe** sans le calculer — la marque de l'analyse adulte.",
  depths: {
    discovery:
      "**Avec les mains** : éprouve le TVI sur $f(x) = x^3 + x - 1$ — $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : une racine vit dans $]0, 1[$ ; **dichotomie** : $f(0{,}5) = -0{,}375$ (la racine est à droite), $f(0{,}75) > 0$ (à gauche)... chaque coupe divise la cage par deux — dix coupes : la racine au millième — le TVI n'est pas qu'un théorème d'existence : sa preuve EST l'algorithme de ta recherche binaire, et la borne sup le fonde (l'ensemble $\\{x : f(x) < 0\\}$ a une borne sup, qui est la racine).",
    standard:
      "**En image** : **Rolle est un dessin** — une courbe qui part de l'altitude $f(a)$ et y revient en $f(b) = f(a)$ : entre les deux, elle culmine ou creuse quelque part (le théorème des bornes atteintes le garantit !), et au sommet intérieur, la tangente est **horizontale** ($f'(c) = 0$ : ton extremum de première, devenu lemme) ; et les **accroissements finis** ne sont que Rolle penché : fais pivoter le dessin pour que la corde devienne horizontale — il existe $c$ où la tangente est **parallèle à la corde** : $f'(c) = \\dfrac{f(b) - f(a)}{b - a}$ — la pente moyenne est réalisée quelque part : sur l'autoroute, si ta moyenne est 130, ton compteur a affiché 130 à un instant — big idea *Diagrams* : ces théorèmes se dessinent avant de se rédiger.",
    advanced:
      "**Dans la tête** : la chaîne déductive mérite d'être vue entière — borne sup ⟹ TVI et bornes atteintes (sur un segment : continue ⟹ bornée ET les bornes sont des valeurs — la compacité avant l'heure) ⟹ Rolle (l'extremum intérieur annule la dérivée) ⟹ **égalité des accroissements finis** ⟹ ses corollaires ouvriers : $f' \\geq 0$ sur un intervalle ⟺ $f$ croissante (le théorème que le lycée admettait : le voilà DÉMONTRÉ — chaque pente de corde est une pente de tangente, donc positive), l'**inégalité** des accroissements finis ($|f'| \\leq M$ ⟹ $f$ est $M$-lipschitzienne : la vitesse bornée borne le déplacement — l'outil de toutes les estimations à venir, des suites récurrentes au théorème du point fixe). Une remarque d'architecte : tout repose sur « pas de trou dans $\\mathbb{R}$ » — sur $\\mathbb{Q}$, $x^2 - 2$ change de signe sans s'annuler : le TVI est faux — l'axiome de la borne sup n'était pas décoratif.",
  },
  keyIdea: "Sur un segment, continue ⟹ **bornée, bornes atteintes** ; **TVI** (la preuve = dichotomie) ; **Rolle** (même altitude ⟹ tangente horizontale entre) ⟹ **accroissements finis** (la pente moyenne est atteinte : tangente ∥ corde — *Diagrams*) ⟹ $f' \\geq 0$ ⟺ croissante, et l'inégalité $|f(b) - f(a)| \\leq M|b - a|$ : l'outil d'estimation universel.",
  why:
    "Pourquoi démontrer ce que le dessin rend évident ? Parce que l'évidence graphique s'effondre dès qu'on quitte le confort : fonctions monstrueuses, espaces abstraits, dimension infinie — seule la preuve voyage. Et la chaîne TVI → Rolle → AF est le premier exemple d'**architecture** mathématique : quatre théorèmes qui s'engendrent, un axiome qui porte tout — comprendre QUI implique QUOI vaut mieux que connaître chaque énoncé isolément : c'est cette charpente que les colles testent, et c'est elle que la topologie de L2 généralisera (compacité, connexité : les vrais noms de « segment »).",
  examples: [
    { title: "Rolle dessiné", steps: [
      { p: "Même altitude aux deux bouts : la courbe culmine entre — tangente horizontale au sommet." },
      { p: "$f'(c) = 0$ : l'existence lue sur le dessin, fondée sur les bornes atteintes." },
    ] },
    { title: "La moyenne réalisée", steps: [
      { p: "Moyenne 130 km/h sur le trajet : à un instant, le compteur a affiché exactement 130." },
      { p: "AF : $f'(c) = \\frac{f(b) - f(a)}{b - a}$ — Rolle penché, la corde devenue horizon." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Montre que $f(x) = x^3 + x - 1$ a une unique racine réelle : existence (TVI sur $[0, 1]$) puis unicité (stricte monotonie via $f'$).", solution: "Existence : $f$ continue, $f(0) = -1 < 0 < 1 = f(1)$ — le **TVI** livre $c \\in\\,]0, 1[$ avec $f(c) = 0$ ✓. Unicité : $f'(x) = 3x^2 + 1 > 0$ partout — $f$ **strictement croissante** sur $\\mathbb{R}$, donc injective : une seule annulation — le duo existence-unicité dans sa forme canonique : TVI pour exister, monotonie pour être seul — le schéma de la moitié des exercices d'analyse." },
    { tier: "warmup", prompt: "Démontre Rolle en admettant les bornes atteintes : $f$ continue sur $[a,b]$, dérivable sur $]a,b[$, $f(a) = f(b)$. Distingue le cas $f$ constante du cas où un extremum est intérieur.", solution: "Si $f$ constante : $f' = 0$ partout, fini. Sinon : $f$ atteint son max $M$ et son min $m$ (bornes atteintes), et $m < M$ — l'un des deux diffère de $f(a) = f(b)$, donc est atteint en un point **intérieur** $c \\in\\,]a, b[$ ; en un extremum intérieur d'une fonction dérivable, $f'(c) = 0$ (le lemme du lycée, désormais démontrable : les taux à gauche et à droite de $c$ ont des signes opposés et une limite commune) ✓ — Rolle = bornes atteintes + extremum intérieur : deux briques, un théorème." },
    { tier: "application", prompt: "Par l'inégalité des accroissements finis, montre que $|\\sin a - \\sin b| \\leq |a - b|$ pour tous réels, puis que la suite $u_{n+1} = \\dfrac{\\sin u_n}{2}$, $u_0 = 1$, converge vers 0 (majore $|u_{n+1}|$).", solution: "$|\\sin'| = |\\cos| \\leq 1$ : l'IAF donne $|\\sin a - \\sin b| \\leq 1 \\cdot |a - b|$ ✓ — le sinus est 1-lipschitzien. Suite : $|u_{n+1}| = \\frac{|\\sin u_n|}{2} = \\frac{|\\sin u_n - \\sin 0|}{2} \\leq \\frac{|u_n|}{2}$ — par récurrence $|u_n| \\leq \\frac{1}{2^n} \\to 0$ : $u_n \\to 0$, à vitesse géométrique ✓ — l'IAF transforme une borne sur $f'$ en contraction, et la contraction en convergence : tu viens d'exécuter le mécanisme du théorème du point fixe, l'un des plus utiles de toute l'analyse (de Newton aux EDO de L3)." },
    { tier: "challenge", prompt: "Soit $f$ dérivable sur $\\mathbb{R}$ avec $f(0) = 0$, $f(1) = 0$ et $f(2) = 4$. Montre qu'il existe $c$ avec $f'(c) = 0$, puis $d$ avec $f'(d) = 4$, puis — plus fin — qu'il existe $t$ avec $f'(t) = 2$. (Rolle, AF, puis TVI… sur quelle fonction auxiliaire ?)", solution: "Rolle sur $[0, 1]$ ($f(0) = f(1)$) : $f'(c) = 0$ ✓. AF sur $[1, 2]$ : $f'(d) = \\frac{4 - 0}{1} = 4$ ✓. Pour $f'(t) = 2$ : applique l'AF à la fonction auxiliaire $g(x) = f(x) - 2x$ sur $[0, 2]$ : $g(0) = 0$, $g(2) = 0$ — **Rolle** sur $g$ donne $t$ avec $g'(t) = f'(t) - 2 = 0$ ✓ — la fonction auxiliaire « $f$ moins la pente visée » est LE truc du métier : Rolle appliqué à $g$ fabrique toutes les valeurs intermédiaires de $f'$ (c'est le théorème de Darboux en germe : une dérivée vérifie le TVI même sans être continue)." },
    { tier: "exam", prompt: "Le théorème « dérivée positive ⟹ croissante », enfin démontré. Soit $f$ continue sur $[a, b]$, dérivable sur $]a, b[$, avec $f' \\geq 0$. (1) Soient $x < y$ dans $[a, b]$ : applique l'égalité des accroissements finis sur $[x, y]$ et conclus $f(x) \\leq f(y)$. (2) Montre que si $f' > 0$ (strictement), $f$ est strictement croissante. (3) La réciproque de (2) est-elle vraie ? ($f(x) = x^3$ en 0.) (4) Démontre le corollaire « $f' = 0$ sur un intervalle ⟹ $f$ constante », et exhibe un contre-exemple si le domaine n'est PAS un intervalle. (5) Moralité : quel rôle joue la connexité du domaine, et où la retrouveras-tu ?", solution: "(1) L'AF sur $[x, y]$ : il existe $c \\in\\,]x, y[$ avec $f(y) - f(x) = f'(c)(y - x)$ — les deux facteurs sont $\\geq 0$ : $f(y) \\geq f(x)$ ✓ — chaque corde hérite du signe d'une tangente : le théorème du lycée tombe en deux lignes... une fois l'AF disponible. (2) Mêmes lignes, inégalités strictes : $f'(c) > 0$ et $y - x > 0$ ✓. (3) **Non** : $x^3$ est strictement croissante mais $f'(0) = 0$ — la stricte croissance autorise des tangentes horizontales isolées : l'implication ne se renverse pas. (4) $f' = 0$ : l'AF donne $f(y) = f(x)$ pour toute paire — constante ✓ ; contre-exemple hors intervalle : $f = 0$ sur $]0, 1[$ et $f = 1$ sur $]2, 3[$ — dérivée nulle partout, fonction non constante : l'AF exige un **chemin continu** entre $x$ et $y$. (5) La connexité (être « d'un seul tenant ») est l'hypothèse silencieuse de tous ces théorèmes — son nom officiel arrive en topologie (L2), et la phrase « localement nul + connexe ⟹ globalement nul » reviendra jusqu'en analyse complexe (L3, prolongement analytique) : tu viens de rencontrer, dans un exercice de L1, l'un des principes organisateurs de toute l'analyse." },
  ],
  practice: [
    { tier: "warmup", label: "Le bon théorème", make: (r) => {
      const cas = pick(r, [["f(a) = f(b) \\Rightarrow \\exists c,\\ f'(c) = 0", 1], ["f \\text{ change de signe} \\Rightarrow \\text{racine}", 0], ["\\exists c,\\ f'(c) = \\tfrac{f(b)-f(a)}{b-a}", 2]]);
      return { prompt: `« $${cas[0]}$ » : TVI (0), Rolle (1) ou AF (2) ?`, answer: cas[1], solution: `**${["TVI", "Rolle", "Accroissements finis"][cas[1]]}** — la signature du théorème.` };
    } },
    { tier: "application", label: "La constante de Lipschitz", make: (r) => {
      const M = pick(r, [2, 3, 5]); const d = randint(r, 2, 6);
      return { prompt: `$|f'| \\leq ${M}$ et $|b - a| = ${d}$ : majorant de $|f(b) - f(a)|$ ?`, answer: M * d, solution: `IAF : $${M} \\times ${d} = $ **${M * d}** — vitesse bornée, déplacement borné.` };
    } },
    { tier: "challenge", label: "Compter par dichotomie", make: (r) => {
      const k = pick(r, [[10, 1024], [7, 128], [5, 32]]);
      return { prompt: `TVI par dichotomie sur un intervalle de longueur ${k[1]} : combien de coupes pour une cage de longueur 1 ?`, answer: k[0], solution: `$2^{${k[0]}} = ${k[1]}$ : **${k[0]}** coupes — la racine au pas géométrique.` };
    } },
  ],
};

// — Asymptotic analysis (MPSI ch. 11) —
const analyseAsymptotique = {
  id: "analysis.bachelor.analyse-asymptotique",
  level: "bachelor", domain: "analysis",
  title: "Analyse asymptotique : le microscope local",
  tagline: "Équivalents, petits o, développements limités — voir une fonction de très près ou de très loin.",
  prereqs: ["analysis.bachelor.continuite-derivabilite", "analysis.bachelor.reels-suites"],
  intuition:
    "Près de 0, $\\sin x$ ressemble à $x$ — mais *à quel point* ? Le développement limité répond : $\\sin x = x - \\dfrac{x^3}{6} + o(x^3)$ — la fonction vue au **microscope**, polynôme par polynôme.\n\nTrois lentilles : l'**équivalent** ($\\sim$ : le terme dominant), le **petit o** (négligeable devant), le **DL** (l'approximation polynomiale avec son reste) — l'art de ne garder que ce qui compte.",
  depths: {
    discovery:
      "**Avec les mains** : zoome numériquement sur $\\sin$ — $\\sin(0{,}1) = 0{,}0998334\\ldots$ contre $x - \\frac{x^3}{6} = 0{,}0998333\\ldots$ : sept décimales communes ! et à $x = 0{,}01$, l'erreur tombe sous $10^{-12}$ — **le polynôme colle, et colle d'autant mieux qu'on zoome** : voilà ce que $o(x^3)$ veut dire — l'erreur meurt plus vite que $x^3$ : le microscope est honnête sur sa marge.",
    standard:
      "**En image** : superpose les **approximations emboîtées** de $\\sin$ — la droite $y = x$ (ordre 1 : la tangente !), la cubique $x - \\frac{x^3}{6}$ (ordre 3), l'ordre 5 : chaque courbe épouse le sinus sur une plage plus large avant de décrocher — le DL est une **tangente généralisée** : l'ordre 1 colle une droite, l'ordre $n$ colle un polynôme — big idea *Diagrams* : la hiérarchie des zooms se dessine, et **Taylor-Young** la fonde : si $f$ est $n$ fois dérivable en $a$, $f(x) = \\sum_{k=0}^{n} \\dfrac{f^{(k)}(a)}{k!}(x - a)^k + o((x-a)^n)$ — les dérivées successives SONT les coefficients du zoom.",
    advanced:
      "**Dans la tête** : la **discipline du calcul** fait la différence entre l'outil et l'accident — les DL usuels en 0 ($e^x$, $\\cos$, $\\sin$, $\\ln(1+x)$, $(1+x)^\\alpha$, $\\frac{1}{1-x}$) se composent, se multiplient, se divisent — mais avec deux règles d'or : **tronquer à l'ordre cohérent** (multiplier deux DL d'ordre 3 ne donne PAS un ordre 6 fiable : les restes contaminent) et **jamais sommer des équivalents** ($x \\sim x + x^2$ et $-x \\sim -x$, mais leur somme $x^2 \\not\\sim 0$ : l'équivalent ne voit que le terme dominant, qui peut s'annuler dans une somme — le piège classique des copies). La récompense : les **limites indéterminées tombent** — $\\dfrac{\\sin x - x}{x^3} \\to -\\dfrac{1}{6}$ se lit sur le DL, là où le lycée séchait — et les **branches infinies** se domestiquent pareil (poser $h = \\frac{1}{x}$ : l'infini devient un voisinage de 0) — le microscope et le télescope sont le même instrument.",
  },
  keyIdea: "**Taylor-Young** : $f(x) = \\sum \\frac{f^{(k)}(a)}{k!}(x-a)^k + o((x-a)^n)$ — le polynôme qui colle, les dérivées en coefficients. DL usuels à connaître par cœur ; **tronquer cohérent**, **ne jamais sommer des équivalents** (le dominant peut s'annuler !) — et les formes indéterminées tombent : le terme dominant tranche.",
  why:
    "Pourquoi approximer quand on sait calculer exact ? Parce que l'exact est souvent inaccessible ou illisible : une limite indéterminée, une intégrale sans primitive, une équation transcendante — l'asymptotique extrait l'essentiel. C'est l'outil le plus *utilisé* de toute la licence : les séries de L2 convergent ou divergent sur un équivalent, les intégrales généralisées aussi, la physique vit de DL à l'ordre 2 — et la complexité de tes algorithmes ($O(n \\log n)$ !) est exactement ce chapitre, écrit en grand : le $o$ de Landau est né ici avant d'émigrer en informatique.",
  examples: [
    { title: "La limite qui tombe", steps: [
      { p: "$\\dfrac{\\sin x - x}{x^3}$ : DL — $\\sin x - x = -\\dfrac{x^3}{6} + o(x^3)$." },
      { p: "Quotient : $-\\dfrac{1}{6} + o(1) \\to -\\dfrac{1}{6}$ — l'indétermination dissoute au microscope." },
    ] },
    { title: "Le piège de la somme", steps: [
      { p: "$e^x \\sim 1$ et $-1 \\sim -1$ en 0... mais $e^x - 1 \\sim x$, pas $0$ !" },
      { p: "Les dominants se sont annulés : sommer des équivalents est interdit — passer au DL, toujours." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Écris les DL en 0 à l'ordre 3 de $e^x$, $\\ln(1 + x)$ et $\\dfrac{1}{1 - x}$, et vérifie numériquement celui de $e^x$ en $x = 0{,}1$ (compare $e^{0{,}1} \\approx 1{,}10517$ au polynôme).", solution: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + o(x^3)$ ; $\\ln(1+x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} + o(x^3)$ (les signes alternent, les dénominateurs sont $k$, pas $k!$ — la confusion classique) ; $\\dfrac{1}{1-x} = 1 + x + x^2 + x^3 + o(x^3)$ — la géométrique. Vérification : $1 + 0{,}1 + 0{,}005 + 0{,}000167 = 1{,}105167$ contre $1{,}10517$ : **l'erreur vit au-delà de la cinquième décimale** — $o(x^3)$ tient parole." },
    { tier: "warmup", prompt: "Calcule $\\displaystyle\\lim_{x \\to 0} \\dfrac{e^x - 1 - x}{x^2}$ et $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\ln(1+x)}{\\sin x}$ par DL à l'ordre juste nécessaire.", solution: "Première : $e^x - 1 - x = \\dfrac{x^2}{2} + o(x^2)$ — quotient : $\\dfrac{1}{2}$. Seconde : ordre 1 suffit — $\\dfrac{x + o(x)}{x + o(x)} \\to$ **1** — l'art : deviner l'ordre AVANT de développer (le dénominateur dicte : $x^2$ exige l'ordre 2, $x$ l'ordre 1) — développer trop coûte du temps, trop peu donne $\\frac{o(x)}{o(x)}$ : indéterminé encore." },
    { tier: "application", prompt: "Développe $f(x) = \\dfrac{\\sin x}{1 - x}$ à l'ordre 3 en 0 (produit de deux DL — tronque à chaque étape), et donne l'équation de la tangente en 0 plus la position locale de la courbe.", solution: "$\\sin x = x - \\frac{x^3}{6} + o(x^3)$ et $\\frac{1}{1-x} = 1 + x + x^2 + x^3 + o(x^3)$ — produit tronqué à l'ordre 3 : $x \\cdot 1 + x \\cdot x + x \\cdot x^2 - \\frac{x^3}{6} = x + x^2 + \\frac{5x^3}{6} + o(x^3)$ — **tangente** : $y = x$ (l'ordre 1) ; **position** : le terme suivant $+x^2 > 0$ : la courbe est localement **au-dessus** de sa tangente des deux côtés — le DL ne calcule pas que des limites : il dessine la géométrie locale (tangente, position, inflexions), gratuitement." },
    { tier: "challenge", prompt: "Montre que sommer des équivalents est illégal sur l'exemple : $\\sqrt{n^2 + n} - n$ quand $n \\to +\\infty$. (Le réflexe naïf « $\\sqrt{n^2+n} \\sim n$ donc la différence $\\sim 0$ » échoue — calcule la vraie limite par la quantité conjuguée OU par DL de $(1 + u)^{1/2}$.)", solution: "Naïf : $\\sqrt{n^2+n} \\sim n$ et $-n \\sim -n$ — « somme $\\sim 0$ » : FAUX. Vrai calcul : $\\sqrt{n^2+n} - n = n\\left(\\sqrt{1 + \\tfrac{1}{n}} - 1\\right) = n\\left(\\dfrac{1}{2n} + o\\left(\\tfrac{1}{n}\\right)\\right) \\to\\dfrac{1}{2}$ (DL de $(1+u)^{1/2} = 1 + \\frac{u}{2} + o(u)$ avec $u = \\frac{1}{n}$) — les dominants $n$ et $-n$ se sont annihilés, et c'est le terme SUIVANT qui décide : l'équivalent est aveugle au-delà du dominant, le DL voit l'étage d'après — la morale tient en une règle : dans une somme qui se compense, toujours développer un cran plus loin." },
    { tier: "exam", prompt: "Étude asymptotique complète de $f(x) = x^2\\ln\\left(1 + \\dfrac{1}{x}\\right)$ en $+\\infty$. (1) Pose $h = \\dfrac{1}{x}$ et développe à l'ordre 3 en $h$. (2) Déduis le développement asymptotique $f(x) = x - \\dfrac{1}{2} + \\dfrac{1}{3x} + o\\left(\\dfrac{1}{x}\\right)$. (3) Identifie l'asymptote oblique et la position de la courbe par rapport à elle. (4) Quelle est la limite de $f(x) - x$ et que mesure-t-elle graphiquement ? (5) En quoi ce calcul illustre-t-il « le télescope est le microscope » ?", solution: "(1) $\\ln(1 + h) = h - \\dfrac{h^2}{2} + \\dfrac{h^3}{3} + o(h^3)$. (2) $f = \\dfrac{1}{h^2}\\ln(1+h) = \\dfrac{1}{h} - \\dfrac{1}{2} + \\dfrac{h}{3} + o(h)$ — retraduit : $f(x) = x - \\dfrac{1}{2} + \\dfrac{1}{3x} + o\\left(\\dfrac{1}{x}\\right)$ ✓. (3) Asymptote : $y = x - \\dfrac{1}{2}$, et le terme $+\\dfrac{1}{3x} > 0$ place la courbe **au-dessus** de l'asymptote (en $+\\infty$). (4) $f(x) - x \\to -\\dfrac{1}{2}$ : l'écart vertical à la première bissectrice se stabilise — c'est l'ordonnée à l'origine de l'asymptote qui se lit. (5) Le changement $h = \\frac{1}{x}$ a transformé l'étude **à l'infini** en étude **en 0** : le télescope (comportement lointain) est le microscope (DL local) regardé dans la variable inverse — un seul instrument, deux bouts de la lunette : et ce réflexe servira aux séries ($\\sum u_n$ : comportement de $u_n$ en l'infini) comme aux intégrales généralisées de L2 — l'asymptotique est UN chapitre qui en irrigue dix." },
  ],
  practice: [
    { tier: "warmup", label: "Le DL usuel", make: (r) => {
      const cas = pick(r, [["e^x", "x^2", 2, "\\frac{1}{2}"], ["\\cos x", "x^2", -2, "-\\frac{1}{2}"], ["\\ln(1+x)", "x^2", -2, "-\\frac{1}{2}"], ["\\sin x", "x^3", -6, "-\\frac{1}{6}"]]);
      return { prompt: `Dans le DL de $${cas[0]}$ en 0, le coefficient de $${cas[1]}$ vaut $\\dfrac{1}{n}$ avec $n = \\,?$ (signe compris)`, answer: cas[2], solution: `Coefficient $${cas[3]}$ : $n = $ **${cas[2]}**.` };
    } },
    { tier: "application", label: "La limite au microscope", make: (r) => {
      const cas = pick(r, [["\\dfrac{e^x - 1}{x}", 1], ["\\dfrac{\\ln(1+x)}{x}", 1], ["\\dfrac{1 - \\cos x}{x^2}", 0.5], ["\\dfrac{\\sin x}{x}", 1]]);
      return { prompt: `$\\displaystyle\\lim_{x \\to 0} ${cas[0]} = \\,?$ (décimal)`, answer: cas[1], solution: `**${String(cas[1]).replace(".", ",")}** — le terme dominant tranche.` };
    } },
    { tier: "challenge", label: "L'ordre nécessaire", make: (r) => {
      const n = pick(r, [2, 3, 4]);
      return { prompt: `Pour lever l'indétermination de $\\dfrac{f(x) - P(x)}{x^{${n}}}$, développer $f$ à quel ordre minimal ?`, answer: n, solution: `Ordre **${n}** — le dénominateur dicte le zoom.` };
    } },
  ],
};

export default [reelsSuites, continuiteDerivabilite, analyseAsymptotique];
