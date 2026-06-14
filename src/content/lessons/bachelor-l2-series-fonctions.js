// Field "Analysis" — BACHELOR module (l2 year), licence de mathématiques.
// Official MP/MPI programme (arrêté 2021), chapters "Séries numériques et
// vectorielles" (refined series-integral comparison: estimating partial
// sums of divergent series and remainders of convergent ones, d'Alembert
// ratio test, summation of comparison relations o/O/~ in both convergent
// and divergent cases, Cesàro; absolutely convergent vector series),
// "Suites et séries de fonctions" (pointwise vs uniform convergence,
// inheritance theorems: continuity, double limit — proof off-programme —,
// integration on a segment, differentiation under CVS + uniform CV of
// derivatives, normal convergence, uniform approximation: step functions
// and WEIERSTRASS, proof not required) and "Séries entières" (Abel's
// lemma, radius of convergence, d'Alembert for R, normal convergence on
// closed sub-disks, C-infinity on the open interval with term-by-term
// differentiation, uniqueness of coefficients, usual expansions; radial
// Abel mentioned, proof off-programme). Singapore method: Concrete = H_n
// bracketed by hand, x^n breaking continuity, the geometric series;
// Pictorial = rectangles vs curve, THE uniform tube, the sharp disk of
// convergence; Abstract = the theorems with programme-exact limits.
// Big ideas named; exam = colle-style; practice = systematic variation.
import { randint, pick } from "../../core/exercises.js";

// — The asymptotic arsenal for series (MP: séries numériques et vectorielles) —
const seriesComparaisons = {
  id: "analysis.bachelor.series-comparaisons",
  level: "bachelor", domain: "analysis",
  title: "Séries : l'arsenal asymptotique",
  tagline: "Au-delà du verdict converge-diverge : estimer les sommes, chiffrer les restes.",
  prereqs: ["analysis.bachelor.series-familles"],
  intuition:
    "En L1, tu tranchais : converge ou diverge. Cette année on **chiffre** : la série harmonique diverge — mais à quelle vitesse ? $\\sum \\frac{1}{n^2}$ converge — mais que vaut le reste après cent termes ?\n\nLa comparaison série-intégrale devient un instrument de mesure, et les relations de comparaison ($o$, $O$, $\\sim$) se **somment** : l'asymptotique de L1 entre dans les séries.",
  depths: {
    discovery:
      "**Avec les mains** : encadre la série harmonique — sur chaque marche $[k, k+1]$, la fonction $\\frac{1}{x}$ est coincée entre $\\frac{1}{k+1}$ et $\\frac{1}{k}$ : en sommant, $\\ln(n+1) \\leq H_n = 1 + \\frac{1}{2} + \\cdots + \\frac{1}{n} \\leq 1 + \\ln n$ — calcule : $H_{1000}$ est entre $6{,}9$ et $7{,}9$ (la vraie valeur : $7{,}49$) — tu viens d'estimer mille termes **sans les sommer** : la divergence harmonique a désormais une vitesse, $H_n \\sim \\ln n$.",
    standard:
      "**En image** : LE dessin du chapitre, dans les deux sens — les rectangles de hauteurs $f(k)$ posés **sous** la courbe décroissante (la somme minore l'intégrale décalée) puis **sur** elle (la somme majore l'intégrale) : l'encadrement $\\int_1^{n+1} f \\leq \\sum_{k=1}^{n} f(k) \\leq f(1) + \\int_1^n f$ se lit sur la figure (big idea *Diagrams*) — et il travaille des deux côtés du verdict : pour une série **divergente**, il donne l'équivalent des sommes partielles ($H_n \\sim \\ln n$) ; pour une **convergente**, l'équivalent du reste ($R_n = \\sum_{k > n} \\frac{1}{k^2} \\sim \\frac{1}{n}$ : après cent termes de $\\zeta(2)$, il manque encore environ un centième).",
    advanced:
      "**Dans la tête** : trois armes s'ajoutent. La **règle de d'Alembert** : si $\\frac{|u_{n+1}|}{|u_n|} \\to \\ell$, alors $\\ell < 1$ donne la convergence absolue, $\\ell > 1$ la divergence grossière ($\\ell = 1$ : muette — Riemann la met en échec) ; elle excelle sur les factorielles et les puissances, et préparera le rayon des séries entières. La **sommation des relations de comparaison** : pour une série de référence à termes positifs, $u_n \\sim v_n$ se transmet aux restes dans le cas convergent ($R_n^u \\sim R_n^v$) et aux sommes partielles dans le cas divergent ($S_n^u \\sim S_n^v$) — et de même pour $o$ et $O$ : l'asymptotique traverse la sommation (cas particulier offert : le théorème de **Cesàro** — si $u_n \\to \\ell$, la moyenne $\\frac{u_1 + \\cdots + u_n}{n} \\to \\ell$). Enfin l'extension **vectorielle** : pour des séries à valeurs dans un espace normé de dimension finie, la convergence absolue ($\\sum \\|u_n\\| < +\\infty$) entraîne la convergence — l'outil qui fera converger les séries de matrices et l'exponentielle du chapitre systèmes.",
  },
  keyIdea: "**Comparaison série-intégrale** ($f$ monotone) : encadrement par rectangles (*Diagrams*) — sommes partielles des divergentes ($H_n \\sim \\ln n$), restes des convergentes ($R_n \\sim \\frac{1}{n}$ pour $\\frac{1}{n^2}$). **D'Alembert** : $\\frac{|u_{n+1}|}{|u_n|} \\to \\ell$ — $\\ell < 1$ converge, $\\ell > 1$ diverge, $\\ell = 1$ muet. **Sommation des comparaisons** : $\\sim$, $o$, $O$ passent aux restes (cas convergent) et aux sommes partielles (cas divergent) ; Cesàro offert. Vectoriel : CV absolue $\\Rightarrow$ CV (dimension finie).",
  why:
    "Chiffrer les restes, c'est répondre à la question de toute machine : **combien de termes pour quelle précision ?** Sommer $\\zeta(2)$ à $10^{-6}$ près demande un million de termes ($R_n \\sim \\frac{1}{n}$) — alors qu'avec une accélération, mille suffisent : l'analyse asymptotique des séries pilote tout le calcul numérique des constantes. Et la sommation des équivalents est la cheville ouvrière des développements asymptotiques fins ($H_n = \\ln n + \\gamma + o(1)$ : la constante d'Euler naît ici) — l'analyse de complexité de tes algorithmes ($\\sum \\ln k \\sim n \\ln n$ : le coût des tris) en vit quotidiennement.",
  examples: [
    { title: "La vitesse de l'harmonique", steps: [
      { p: "Rectangles : $\\ln(n+1) \\leq H_n \\leq 1 + \\ln n$ — donc $H_n \\sim \\ln n$." },
      { p: "Mille termes $\\approx 7{,}5$ ; un million $\\approx 14$ : la divergence la plus lente du monde usuel." },
    ] },
    { title: "Le reste chiffré", steps: [
      { p: "$R_n = \\sum_{k > n} \\frac{1}{k^2}$ : rectangles autour de $\\frac{1}{x^2}$ — $\\frac{1}{n+1} \\leq R_n \\leq \\frac{1}{n}$." },
      { p: "Précision $10^{-3}$ sur $\\zeta(2)$ : mille termes — le coût se lit avant de calculer." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Par d'Alembert, tranche la nature de $\\sum \\frac{2^n}{n!}$, de $\\sum \\frac{n!}{10^n}$ et de $\\sum \\frac{1}{n^2}$ — et commente le troisième verdict.", solution: "$\\frac{u_{n+1}}{u_n} = \\frac{2}{n+1} \\to 0 < 1$ : **converge** (la factorielle écrase toute géométrique — c'est la série de $e^2$). $\\frac{u_{n+1}}{u_n} = \\frac{n+1}{10} \\to +\\infty$ : **diverge** grossièrement (la factorielle finit toujours par gagner). $\\frac{u_{n+1}}{u_n} = \\frac{n^2}{(n+1)^2} \\to 1$ : **muet** — d'Alembert ne voit pas les puissances (toutes les Riemann donnent $1$) : c'est l'outil des factorielles et des géométriques, pas des polynômes — connaître la zone aveugle d'un outil fait partie de l'outil." },
    { tier: "warmup", prompt: "Par comparaison série-intégrale, encadre $S_n = \\sum_{k=1}^{n} \\frac{1}{\\sqrt{k}}$ et donne un équivalent. Combien vaut environ $S_{10000}$ ?", solution: "$\\frac{1}{\\sqrt{x}}$ décroît : $\\int_1^{n+1} \\frac{dx}{\\sqrt{x}} \\leq S_n \\leq 1 + \\int_1^n \\frac{dx}{\\sqrt{x}}$ — soit $2\\sqrt{n+1} - 2 \\leq S_n \\leq 2\\sqrt{n} - 1$ : équivalent $S_n \\sim 2\\sqrt{n}$ ■. Pour $n = 10^4$ : $S_n \\approx 2 \\times 100 = 200$ — dix mille termes estimés par une intégrale d'une ligne : la série de Riemann divergente ($\\alpha = \\frac{1}{2}$) a sa vitesse, comme l'harmonique a la sienne ($\\ln n$) : chaque $\\alpha \\leq 1$ diverge à son rythme, $n^{1 - \\alpha}$." },
    { tier: "application", prompt: "Soit $u_n \\sim \\frac{1}{n^2}$ (termes positifs). Justifie que $\\sum u_n$ converge et que son reste vérifie $R_n \\sim \\frac{1}{n}$. Application : combien de termes pour calculer la somme à $10^{-4}$ près ?", solution: "Équivalence de termes positifs avec une Riemann convergente : $\\sum u_n$ **converge** ; et la **sommation des équivalents** (cas convergent) transmet aux restes : $R_n^u \\sim R_n^{1/k^2} \\sim \\frac{1}{n}$ ■ — sans connaître $u_n$ explicitement ! Précision $10^{-4}$ : il faut $\\frac{1}{n} \\approx 10^{-4}$, soit $n \\approx 10^4$ — **dix mille termes**. Le théorème de sommation est une machine à transférer l'asymptotique : on étudie le modèle (Riemann), tous ses équivalents héritent — et le coût numérique se lit d'avance." },
    { tier: "challenge", prompt: "Démontre le théorème de Cesàro pour une limite finie : si $u_n \\to \\ell$, alors $\\frac{u_1 + \\cdots + u_n}{n} \\to \\ell$. (Coupe la somme en deux : les premiers termes, figés, et la queue, proche de $\\ell$.) Donne ensuite un contre-exemple à la réciproque.", solution: "Soit $\\varepsilon > 0$ ; il existe $N$ tel que $|u_k - \\ell| \\leq \\varepsilon$ pour $k > N$. Pour $n > N$ : $\\left|\\frac{1}{n}\\sum_{k=1}^n u_k - \\ell\\right| = \\left|\\frac{1}{n}\\sum_{k=1}^n (u_k - \\ell)\\right| \\leq \\frac{1}{n}\\underbrace{\\sum_{k=1}^{N} |u_k - \\ell|}_{\\text{constante } C} + \\frac{n - N}{n}\\varepsilon \\leq \\frac{C}{n} + \\varepsilon$ — le premier morceau tend vers $0$ : la limite supérieure est $\\leq \\varepsilon$, pour tout $\\varepsilon$ ■ (le **découpage tête-queue** : la tête est diluée par $n$, la queue est déjà bonne — un grand geste d'analyse). Réciproque fausse : $u_n = (-1)^n$ — les moyennes tendent vers $0$, la suite diverge : Cesàro **lisse**, et le lissage peut faire converger ce qui oscille." },
    { tier: "exam", prompt: "On étudie $H_n = \\sum_{k=1}^{n} \\frac{1}{k}$ au-delà de l'équivalent. (1) Pose $v_n = H_n - \\ln n$ : montre que $v_n - v_{n+1} = \\ln\\left(1 + \\frac{1}{n}\\right) - \\frac{1}{n+1}$ et donne son signe et un équivalent (DL de $\\ln(1 + x)$ !). (2) Conclus que la suite $(v_n)$ converge — sa limite est la constante d'Euler $\\gamma \\approx 0{,}577$. (3) Écris le développement $H_n = \\ln n + \\gamma + o(1)$ et estime $H_{10^6}$. (4) En quoi cet exercice illustre-t-il le mot d'ordre du chapitre, « au-delà du verdict » ?", solution: "(1) $v_n - v_{n+1} = \\ln(n+1) - \\ln n - \\frac{1}{n+1} = \\ln\\left(1 + \\frac{1}{n}\\right) - \\frac{1}{n+1}$ ; DL : $\\ln\\left(1 + \\frac{1}{n}\\right) = \\frac{1}{n} - \\frac{1}{2n^2} + o\\left(\\frac{1}{n^2}\\right)$ et $\\frac{1}{n+1} = \\frac{1}{n} - \\frac{1}{n^2} + o\\left(\\frac{1}{n^2}\\right)$ — différence : $\\frac{1}{2n^2} + o\\left(\\frac{1}{n^2}\\right) > 0$ à partir d'un rang, équivalente à $\\frac{1}{2n^2}$ ■. (2) $(v_n)$ est (à terme) décroissante, et la série télescopique $\\sum (v_n - v_{n+1})$ converge (équivalente à $\\frac{1}{2n^2}$, Riemann) : $(v_n)$ **converge** ■ — appelle $\\gamma$ sa limite. (3) $H_n = \\ln n + \\gamma + o(1)$ : $H_{10^6} \\approx 6\\ln 10 + 0{,}577 \\approx 13{,}8 + 0{,}58 = 14{,}4$ — un million de termes, trois chiffres exacts de tête. (4) Le verdict (diverge) datait de L1 ; l'équivalent ($\\ln n$) ouvrait ce chapitre ; le **terme suivant** ($+\\gamma$) le clôt : l'asymptotique est un développement qu'on pousse cran par cran — et chaque cran est gagné par les mêmes armes : DL, télescopage, comparaison. C'est le programme du chapitre en un exercice, et $\\gamma$ — dont on ignore encore aujourd'hui si elle est irrationnelle — est ta première rencontre avec une constante de recherche vivante." },
  ],
  practice: [
    { tier: "warmup", label: "D'Alembert tranche", make: (r) => {
      const cas = pick(r, [["\\frac{3^n}{n!}", 1, "rapport $\\to 0$"], ["\\frac{n!}{5^n}", 0, "rapport $\\to +\\infty$"], ["\\frac{n}{2^n}", 1, "rapport $\\to \\frac{1}{2}$"]]);
      return { prompt: `$\\sum ${cas[0]}$ : converge (1) ou diverge (0) ?`, answer: cas[1], solution: `**${cas[1] ? "Converge" : "Diverge"}** — ${cas[2]}.` };
    } },
    { tier: "application", label: "La vitesse du reste", make: (r) => {
      const p = pick(r, [3, 4]);
      return { prompt: `Pour $\\sum \\frac{1}{k^{${p}}}$, le reste $R_n$ est équivalent à $\\frac{1}{${p - 1}\\,n^{a}}$ : que vaut $a$ ?`, answer: p - 1, solution: `Comparaison intégrale : $R_n \\sim \\int_n^{+\\infty} \\frac{dx}{x^{${p}}} = \\frac{1}{${p - 1}\\,n^{${p - 1}}}$ — $a = ${p - 1}$.` };
    } },
    { tier: "challenge", label: "Cesàro lisse", make: (r) => {
      const l = randint(r, 2, 9);
      return { prompt: `$u_n \\to ${l}$ : la moyenne $\\frac{u_1 + \\cdots + u_n}{n}$ tend vers ?`, answer: l, solution: `Cesàro : la moyenne suit la limite — $${l}$.` };
    } },
  ],
};

// — Sequences and series of functions (MP: suites et séries de fonctions) —
const suitesSeriesFonctions = {
  id: "analysis.bachelor.suites-series-fonctions",
  level: "bachelor", domain: "analysis",
  title: "Suites et séries de fonctions",
  tagline: "Quand des fonctions convergent : qui hérite — la continuité, l'intégrale, la dérivée ?",
  prereqs: ["analysis.bachelor.series-familles", "analysis.bachelor.continuite-derivabilite"],
  intuition:
    "Une suite de fonctions $f_n$ qui « tend vers $f$ » : la limite hérite-t-elle des qualités des $f_n$ ? Continues, leur limite est-elle continue ? Peut-on échanger limite et intégrale ?\n\nRéponse : pas toujours — il existe **deux** convergences, la simple (point par point) et l'**uniforme** (le tube), et seule la seconde transmet l'héritage.",
  depths: {
    discovery:
      "**Avec les mains** : prends $f_n(x) = x^n$ sur $[0, 1]$ — en chaque point, la suite converge : vers $0$ si $x < 1$, vers $1$ si $x = 1$ : la limite **simple** existe… et c'est une fonction **discontinue** (une marche), alors que chaque $f_n$ était parfaitement continue ! La convergence point par point a laissé la continuité mourir en route — l'exemple fondateur : il manque quelque chose, et ce quelque chose s'appelle l'uniformité.",
    standard:
      "**En image** : le **tube** — la convergence **uniforme** sur $A$, c'est $\\sup_A |f_n - f| \\to 0$ : dessine la bande de largeur $\\varepsilon$ autour du graphe de $f$ — à partir d'un rang, le graphe **entier** de $f_n$ tient dans le tube (big idea *Diagrams* : ton tube de L1 autour d'une limite de suite, devenu tube autour d'un graphe entier). Sur $[0, 1]$, les $x^n$ refusent : près de $1$, chaque $f_n$ s'échappe par le coin du tube ($\\sup = $ presque $1$, toujours) — convergence simple sans uniforme, et c'est exactement là que la continuité s'est perdue ; sur $[0, a]$ avec $a < 1$ en revanche, $\\sup = a^n \\to 0$ : uniforme, et tout va bien — la morale pratique du chapitre : **on cherche l'uniformité sur des sous-intervalles adaptés**.",
    advanced:
      "**Dans la tête** : les théorèmes d'héritage, tous sous hypothèse uniforme — **continuité** : limite uniforme de fonctions continues est continue ; **double limite** (démonstration hors programme) : on peut échanger $\\lim_n$ et $\\lim_{x \\to a}$ ; **intégration sur un segment** : $\\int_a^b f_n \\to \\int_a^b f$ (l'aire suit le tube : l'erreur est au plus $\\varepsilon(b - a)$) ; **dérivation** — la subtile : il faut la convergence simple des $f_n$ ET la convergence **uniforme des dérivées** $f_n'$ (c'est la suite des dérivées qui commande : dériver est le monstre du chapitre topologie, on ne le dompte qu'en contrôlant directement sa sortie). Pour les **séries** de fonctions $\\sum u_n$ : mêmes héritages, et une arme dominante — la convergence **normale** ($\\sum \\sup_A |u_n| < +\\infty$ : une série numérique majore tout), qui entraîne l'uniforme, qui entraîne la simple : en pratique, **on cherche la CVN d'abord**. Couronnement : le théorème de **Weierstrass** (démonstration non exigible) — toute fonction continue sur un segment est limite **uniforme** de polynômes : les polynômes sont denses, l'approximation est un théorème.",
  },
  keyIdea: "Convergence **simple** (point par point) vs **uniforme** : $\\sup_A |f_n - f| \\to 0$ — le **tube** (*Diagrams*). L'uniforme transmet : continuité, double limite, $\\int_a^b$ sur un segment ; la **dérivation** exige la CVU des **dérivées** (+ CVS de $f_n$). Séries : **CVN** ($\\sum \\sup |u_n| < \\infty$) $\\Rightarrow$ CVU $\\Rightarrow$ CVS — chercher la normale d'abord, sur des intervalles adaptés. **Weierstrass** : les polynômes approchent uniformément toute continue sur un segment.",
  why:
    "Toutes les fonctions sérieuses des mathématiques sont des **limites** : $\\zeta$ est une série de fonctions, l'exponentielle de matrice une série d'opérateurs, les solutions d'équations différentielles des limites de schémas — et chaque fois qu'on affirme « la somme est continue », « on peut dériver sous le signe somme », c'est un théorème d'héritage qui signe. Le contre-exemple $x^n$ n'est pas une pathologie : c'est la frontière qui rend ces théorèmes nécessaires — et Weierstrass est la caution théorique de toutes les approximations polynomiales, de ta calculatrice aux éléments finis.",
  examples: [
    { title: "La marche qui naît", steps: [
      { p: "$x^n$ sur $[0,1]$ : limite simple $= 0$ puis $1$ en $x = 1$ — discontinue, née de continues." },
      { p: "Le coin du tube fuit en $x = 1$ : simple sans uniforme — l'exemple à toujours garder." },
    ] },
    { title: "La CVN en une ligne", steps: [
      { p: "$\\sum \\frac{\\sin(nx)}{n^2}$ : $\\sup_{\\mathbb{R}} \\left|\\frac{\\sin(nx)}{n^2}\\right| = \\frac{1}{n^2}$, sommable — CVN sur $\\mathbb{R}$." },
      { p: "Donc CVU, donc la somme est continue sur $\\mathbb{R}$ : trois conclusions, une majoration." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pour $f_n(x) = x^n$ : calcule $\\sup_{[0, 1]} |f_n - f|$ puis $\\sup_{[0, 1/2]} |f_n - f|$ (où $f$ est la limite simple). Conclus : sur quel domaine la convergence est-elle uniforme ?", solution: "Sur $[0, 1]$ : la limite vaut $0$ sauf en $1$ ; $\\sup_{[0,1[} x^n = 1$ (approche du coin) — le sup ne tend **pas** vers $0$ : pas de CVU. Sur $\\left[0, \\frac{1}{2}\\right]$ : $\\sup = \\left(\\frac{1}{2}\\right)^n \\to 0$ — **CVU** ✓. La convergence est uniforme sur tout $[0, a]$ avec $a < 1$, jamais sur $[0, 1]$ entier : le problème vit dans le coin, et la stratégie du chapitre est née — restreindre à des intervalles qui évitent le point chaud." },
    { tier: "warmup", prompt: "Montre que $\\sum_{n \\geq 1} \\frac{\\cos(nx)}{n^3}$ converge normalement sur $\\mathbb{R}$, et déduis-en que sa somme $S$ est continue sur $\\mathbb{R}$. Bonus : pourquoi peut-on aussi la dériver terme à terme ?", solution: "$\\sup_{\\mathbb{R}} \\left|\\frac{\\cos(nx)}{n^3}\\right| = \\frac{1}{n^3}$, et $\\sum \\frac{1}{n^3}$ converge (Riemann) : **CVN** sur $\\mathbb{R}$ ⟹ CVU ⟹ la somme de continues est **continue** ■. Dérivation : la série dérivée $\\sum \\frac{-\\sin(nx)}{n^2}$ est elle-même normalement convergente ($\\frac{1}{n^2}$ sommable) — CVS de la série + CVU des dérivées : le théorème de dérivation s'applique, $S' = \\sum \\frac{-\\sin(nx)}{n^2}$ ■ — chaque dérivation coûte un facteur $n$ : ici le budget ($n^3$) en finançait une, presque deux." },
    { tier: "application", prompt: "Justifie l'échange $\\lim_n \\int_0^1 \\frac{x^n}{1 + x}\\,dx = 0$ de deux façons : par majoration directe de l'intégrale, puis par le théorème d'intégration d'une limite uniforme — laquelle exige le plus d'hypothèses ?", solution: "Direct : $0 \\leq \\int_0^1 \\frac{x^n}{1+x}\\,dx \\leq \\int_0^1 x^n\\,dx = \\frac{1}{n+1} \\to 0$ ■ — deux lignes. Par le théorème : il faut la CVU de $\\frac{x^n}{1+x}$ sur $[0, 1]$… qui **échoue** (le coin en $1$, encore : $\\sup \\geq \\frac{1}{2} \\cdot$ presque $1$) — le théorème ne s'applique pas tel quel ! Moralité à double détente : le théorème d'intégration uniforme est suffisant, jamais nécessaire (la majoration directe gagnait ici) ; et c'est exactement pour ces cas que le L2 t'offrira bientôt la **convergence dominée** — qui, elle, conclura sans uniformité." },
    { tier: "challenge", prompt: "La fonction $\\zeta(x) = \\sum_{n \\geq 1} \\frac{1}{n^x}$ est définie pour $x > 1$. Montre que la série converge normalement sur tout $[a, +\\infty[$ avec $a > 1$, et conclus que $\\zeta$ est continue sur $]1, +\\infty[$. Pourquoi ne peut-on PAS prendre la CVN sur $]1, +\\infty[$ entier ?", solution: "Sur $[a, +\\infty[$ : $\\sup_{x \\geq a} \\frac{1}{n^x} = \\frac{1}{n^a}$ (la fonction décroît en $x$), et $\\sum \\frac{1}{n^a}$ converge ($a > 1$) — **CVN** sur $[a, +\\infty[$ ⟹ $\\zeta$ continue sur chaque $[a, +\\infty[$, donc sur leur réunion $]1, +\\infty[$ ■ (la continuité est **locale** : il suffit de l'avoir autour de chaque point). Sur $]1, +\\infty[$ entier : $\\sup_{x > 1} \\frac{1}{n^x} = \\frac{1}{n}$ — l'harmonique, divergente : pas de CVN globale, car $\\zeta$ **explose** près de $1$. La technique-mère du chapitre : CVN sur les segments (ou demi-droites) **adaptés**, jamais sur l'ouvert entier — et tu viens d'apprivoiser la fonction la plus célèbre des mathématiques." },
    { tier: "exam", prompt: "Soit $S(x) = \\sum_{n \\geq 0} e^{-nx}$ pour $x > 0$. (1) Reconnais une série géométrique et calcule $S(x)$ explicitement. (2) Montre la CVN sur $[a, +\\infty[$ pour tout $a > 0$, et retrouve la continuité de $S$ sur $]0, +\\infty[$ sans la formule. (3) Justifie la dérivation terme à terme et écris $S'(x)$ de deux façons (série, et dérivée de la formule) : vérifie la cohérence en sommant la série dérivée. (4) Que devient $S(x)$ quand $x \\to 0^+$, et pourquoi aucune CVN globale n'était possible ?", solution: "(1) Raison $e^{-x} \\in ]0, 1[$ : $S(x) = \\frac{1}{1 - e^{-x}}$ ■. (2) $\\sup_{x \\geq a} e^{-nx} = e^{-na}$, série géométrique convergente : **CVN** sur $[a, +\\infty[$ ⟹ continuité sur tout $]0, +\\infty[$ ✓. (3) Série dérivée $\\sum -n e^{-nx}$ : $\\sup_{x \\geq a} n e^{-nx} = n e^{-na}$, sommable (d'Alembert : rapport $\\to e^{-a} < 1$) — CVU des dérivées + CVS : $S'(x) = -\\sum_{n \\geq 1} n e^{-nx}$ ■ ; par la formule : $S'(x) = \\frac{-e^{-x}}{(1 - e^{-x})^2}$ — et en effet $\\sum n q^n = \\frac{q}{(1-q)^2}$ (la série géométrique dérivée, ta vieille connaissance) avec $q = e^{-x}$ : **cohérent** ✓. (4) $x \\to 0^+$ : $S(x) = \\frac{1}{1 - e^{-x}} \\sim \\frac{1}{x} \\to +\\infty$ — la somme explose au bord, donc $\\sup_{x > 0} e^{-nx} = 1$ : aucune CVN globale possible (la série en $x = 0$ serait $\\sum 1$) — le schéma complet d'une colle de séries de fonctions : formule fermée, CVN locale, dérivation justifiée, comportement au bord — quatre gestes, à dérouler dans cet ordre." },
  ],
  practice: [
    { tier: "warmup", label: "Le sup qui juge", make: (r) => {
      const a = pick(r, [[2, 1], [3, 1], [10, 1]]);
      return { prompt: `$f_n(x) = x^n$ sur $[0, \\frac{1}{${a[0]}}]$ : $\\sup |f_n| = \\frac{1}{${a[0]}^n} \\to 0$ — CVU ? (1/0)`, answer: a[1], solution: `**Oui** — le sup tend vers $0$ : le tube se referme.` };
    } },
    { tier: "application", label: "CVN en une majoration", make: (r) => {
      const p = pick(r, [[2, 1, "Riemann converge"], [3, 1, "Riemann converge"], [1, 0, "harmonique diverge"]]);
      return { prompt: `$\\sum \\frac{\\sin(nx)}{n^{${p[0]}}}$ : CVN sur $\\mathbb{R}$ ? (1/0)`, answer: p[1], solution: `$\\sup = \\frac{1}{n^{${p[0]}}}$ : ${p[2]} — **${p[1] ? "CVN" : "pas de CVN"}**.` };
    } },
    { tier: "challenge", label: "Le budget des dérivations", make: (r) => {
      const k = randint(r, 3, 5);
      return { prompt: `$\\sum \\frac{\\cos(nx)}{n^{${k}}}$ : combien de dérivations terme à terme le budget autorise-t-il (en gardant une série normalement convergente) ?`, answer: k - 2, solution: `Chaque dérivation coûte un facteur $n$ : il faut garder un exposant $> 1$ — $${k} - 2 = ${k - 2}$ dérivations.` };
    } },
  ],
};

// — Power series (MP: séries entières) —
const seriesEntieres = {
  id: "analysis.bachelor.series-entieres",
  level: "bachelor", domain: "analysis",
  title: "Séries entières",
  tagline: "Des polynômes infinis, un rayon qui tranche net — et toutes les fonctions usuelles dedans.",
  prereqs: ["analysis.bachelor.suites-series-fonctions", "analysis.bachelor.series-comparaisons"],
  intuition:
    "Un polynôme de degré infini : $\\sum a_n z^n$. Où converge-t-il ? Réponse d'une netteté rare : à l'intérieur d'un **disque** de rayon $R$ — convergence absolue dedans, divergence grossière dehors, frontière nette.\n\nEt dans ce disque, la somme est une fonction de rêve : $C^\\infty$, dérivable terme à terme — $e^x$, $\\sin$, $\\ln(1+x)$ y vivent toutes.",
  depths: {
    discovery:
      "**Avec les mains** : la première série entière, tu la connais — $\\sum z^n = \\frac{1}{1 - z}$ pour $|z| < 1$ : teste les frontières — $z = \\frac{1}{2}$ : converge vers $2$ ✓ ; $z = 2$ : les termes explosent, divergence **grossière** ; $z = 1$ : $\\sum 1$ diverge — le disque de rayon $1$, dedans tout va, dehors rien ne va : le **rayon de convergence** existe, et tu viens de le mesurer sur l'exemple-mère.",
    standard:
      "**En image** : le **disque de convergence** — dans le plan complexe, un cercle de rayon $R$ centré en $0$ : à l'**intérieur**, convergence absolue (zone verte) ; à l'**extérieur**, le terme général ne tend même pas vers $0$ (zone rouge, divergence grossière) ; **sur le cercle**, tout peut arriver (la zone grise, étudiée au cas par cas) — big idea *Diagrams* : une frontière circulaire nette, sans dégradé. Le mécanisme : le **lemme d'Abel** — si $(a_n z_0^n)$ est seulement **bornée**, alors la série converge absolument pour tout $|z| < |z_0|$ (la géométrique $\\left(\\frac{|z|}{|z_0|}\\right)^n$ écrase tout) : un point sage rend sage tout le disque plus petit — et $R$ est la borne supérieure des rayons sages.",
    advanced:
      "**Dans la tête** : calculer $R$ — la règle de **d'Alembert** appliquée au rapport $\\frac{|a_{n+1}|}{|a_n|} \\to \\ell$ donne $R = \\frac{1}{\\ell}$ ; et les comparaisons transfèrent : $a_n = O(b_n) \\Rightarrow R_a \\geq R_b$, $a_n \\sim b_n \\Rightarrow R_a = R_b$ (multiplier par $n^\\alpha$ ne change pas le rayon). Dans le disque, la machine à théorèmes : convergence **normale sur tout disque fermé** strictement inclus (jamais sur le disque ouvert entier !) — d'où la **continuité** de la somme ; sur l'intervalle réel $]-R, R[$, la somme est $C^\\infty$ et se **dérive terme à terme** (la série dérivée $\\sum n a_n x^{n-1}$ a le **même rayon**) ; et l'**unicité** : les coefficients se lisent sur la somme, $a_n = \\frac{f^{(n)}(0)}{n!}$ — deux séries entières qui coïncident près de $0$ sont identiques (l'identification des coefficients, ton outil de résolution d'équations différentielles par séries). Les développements usuels à connaître sur le bout des doigts : $e^x = \\sum \\frac{x^n}{n!}$ ($R = \\infty$), $\\frac{1}{1-x} = \\sum x^n$ et $\\ln(1+x) = \\sum \\frac{(-1)^{n-1} x^n}{n}$ ($R = 1$), $\\sin$, $\\cos$ ($R = \\infty$) — tes DL de L1 étaient leurs troncatures : la boucle est bouclée.",
  },
  keyIdea: "**Lemme d'Abel** : $(a_n z_0^n)$ bornée $\\Rightarrow$ CVA pour $|z| < |z_0|$ — d'où le **rayon** $R$ : CVA si $|z| < R$, divergence grossière si $|z| > R$ (*Diagrams* : le disque net). Calcul : d'Alembert ($R = 1/\\ell$), $\\sim$ conserve $R$. Dans $]-R, R[$ : CVN sur tout fermé inclus, somme $C^\\infty$, **dérivation terme à terme** (même rayon), **unicité** $a_n = \\frac{f^{(n)}(0)}{n!}$. Usuels : $e^x$, $\\frac{1}{1-x}$, $\\ln(1+x)$, $\\sin$, $\\cos$ — les DL de L1 en version infinie.",
  why:
    "Les séries entières sont l'**implémentation** des fonctions : quand ta machine calcule $e^x$ ou $\\sin x$, elle somme une série entière tronquée — le rayon dit où c'est légal, le reste dit la précision. Elles résolvent les équations différentielles par identification des coefficients (la méthode de Frobenius, les fonctions de Bessel de la physique), elles portent les fonctions génératrices des probabilités (chapitre suivant : toute l'information d'une loi dans une série entière), et la variable **complexe** qu'elles introduisent ici en douceur deviendra le théâtre des fonctions holomorphes de L3 — où « développable en série entière » sera la définition même de l'analyticité.",
  examples: [
    { title: "Le disque-mère", steps: [
      { p: "$\\sum z^n$ : converge ssi $|z| < 1$, vers $\\frac{1}{1-z}$ — rayon $1$, frontière nette." },
      { p: "Dehors : $|z|^n \\to \\infty$, divergence grossière — le rayon tranche sans appel." },
    ] },
    { title: "L'identification des coefficients", steps: [
      { p: "$f$ et $g$ développables, égales près de $0$ : alors $a_n = b_n$ pour tout $n$." },
      { p: "Une équation fonctionnelle devient une récurrence sur les coefficients — la méthode." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Calcule le rayon de convergence de $\\sum \\frac{z^n}{n!}$, de $\\sum n!\\,z^n$ et de $\\sum \\frac{z^n}{n^2}$ par la règle de d'Alembert — trois rayons, trois mondes.", solution: "$\\frac{|a_{n+1}|}{|a_n|} = \\frac{1}{n+1} \\to 0$ : $R = +\\infty$ — la série de $e^z$ converge **partout** (la factorielle au dénominateur dévore tout). $\\frac{(n+1)!}{n!} = n + 1 \\to +\\infty$ : $R = 0$ — ne converge **qu'en zéro** (la factorielle au numérateur tue tout). $\\frac{n^2}{(n+1)^2} \\to 1$ : $R = 1$ — le disque unité. Trois mondes : entier ($R = \\infty$), dégénéré ($R = 0$), standard ($R$ fini) — et le rapport des coefficients les départage en une ligne." },
    { tier: "warmup", prompt: "Quel est le rayon de $\\sum n^3 z^n$ ? Et celui de $\\sum \\frac{z^n}{\\sqrt{n}}$ ? Justifie sans d'Alembert, par comparaison avec la géométrique ($a_n \\sim$ ou $O$).", solution: "$n^3 \\cdot 1^n$ : les puissances de $n$ ne changent pas le rayon de la géométrique — $a_n = n^3 = n^3 \\cdot 1$ et le rayon de $\\sum z^n$ est $1$ : multiplier par $n^\\alpha$ conserve $R$ (le critère $\\sim$ / $O$ dans les deux sens) — $R = 1$ ; même argument pour $\\frac{1}{\\sqrt{n}}$ : $R = 1$ ■. La règle de fond : le rayon ne voit que la croissance **géométrique** des coefficients — les facteurs polynomiaux sont invisibles pour lui (mais pas pour le comportement **sur** le cercle : $\\sum \\frac{z^n}{n^2}$ converge en $z = 1$, $\\sum n^3 z^n$ non — la zone grise se joue là)." },
    { tier: "application", prompt: "À partir de $\\frac{1}{1 - x} = \\sum_{n \\geq 0} x^n$ ($R = 1$), retrouve par dérivation terme à terme la somme $\\sum_{n \\geq 1} n x^{n-1}$, puis $\\sum_{n \\geq 1} n x^n$ — et évalue $\\sum_{n \\geq 1} \\frac{n}{2^n}$.", solution: "Dérivation (légale sur $]-1, 1[$, même rayon) : $\\frac{1}{(1-x)^2} = \\sum_{n \\geq 1} n x^{n-1}$ ; multiplie par $x$ : $\\sum n x^n = \\frac{x}{(1-x)^2}$ ■. En $x = \\frac{1}{2}$ : $\\frac{1/2}{(1/2)^2} = 2$ — $\\sum \\frac{n}{2^n} = 2$ ✓ (ta série arithmético-géométrique de L1, désormais calculée en deux gestes : dériver la géométrique, évaluer). C'est la **fabrique de sommes exactes** : partir d'un développement connu, dériver/intégrer/multiplier — la moitié des sommes de colles en sortent." },
    { tier: "challenge", prompt: "Résous l'équation différentielle $y' = y$, $y(0) = 1$, par la méthode des séries entières : pose $y = \\sum a_n x^n$, identifie les coefficients, et reconnais la solution. Quel théorème du chapitre rend chaque étape légale ?", solution: "Dérivation terme à terme : $y' = \\sum_{n \\geq 1} n a_n x^{n-1} = \\sum_{n \\geq 0} (n+1) a_{n+1} x^n$ ; l'équation $y' = y$ et l'**unicité des coefficients** donnent $(n+1) a_{n+1} = a_n$, soit $a_{n+1} = \\frac{a_n}{n+1}$ — avec $a_0 = y(0) = 1$ : $a_n = \\frac{1}{n!}$ ■. Rayon : d'Alembert donne $R = +\\infty$ — la solution est $y = \\sum \\frac{x^n}{n!} = e^x$, **construite** plutôt que devinée. Légalité : dérivation terme à terme (même rayon), identification (unicité des coefficients), et la convergence partout valide la solution sur $\\mathbb{R}$ — la méthode qui résoudra les équations sans solution élémentaire (Bessel, Airy) : ici elle redécouvre l'exponentielle, demain elle créera des fonctions nouvelles." },
    { tier: "exam", prompt: "Soit $f(x) = \\arctan(x)$. (1) Développe $f'(x) = \\frac{1}{1 + x^2}$ en série entière (substitue dans la géométrique) et donne le rayon. (2) Intègre terme à terme pour obtenir le développement de $\\arctan$ — justifie l'opération. (3) Le développement converge-t-il en $x = 1$ ? (théorème des séries alternées). (4) En admettant le théorème d'Abel radial (continuité jusqu'au bord quand la série converge au bord), déduis-en la formule de Leibniz $\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\cdots$ — et commente sa beauté contre sa lenteur.", solution: "(1) $\\frac{1}{1 + x^2} = \\frac{1}{1 - (-x^2)} = \\sum_{n \\geq 0} (-1)^n x^{2n}$, rayon $R = 1$ (il faut $|x^2| < 1$). (2) Intégration terme à terme (la primitive d'une série entière, terme à terme, même rayon — le théorème de régularité à l'envers) avec $\\arctan(0) = 0$ : $\\arctan(x) = \\sum_{n \\geq 0} \\frac{(-1)^n x^{2n+1}}{2n+1}$ sur $]-1, 1[$ ■. (3) En $x = 1$ : $\\sum \\frac{(-1)^n}{2n+1}$ — la suite $\\frac{1}{2n+1}$ décroît vers $0$ : **converge** par le théorème des séries alternées ✓. (4) Abel radial : la somme est continue en $1^-$, donc la valeur au bord est $\\lim_{x \\to 1^-} \\arctan(x) = \\arctan(1) = \\frac{\\pi}{4}$ — $\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\cdots$ ■. Beauté : $\\pi$ écrit avec les impairs et des signes alternés, rien d'autre. Lenteur : le reste alterné est $\\sim \\frac{1}{2n}$ — **un million de termes pour six décimales** : la plus belle formule n'est pas la plus utile, et le calcul réel de $\\pi$ passe par des séries qui convergent comme des fusées (Machin, Ramanujan) — l'esthétique et l'efficacité sont deux métiers." },
  ],
  practice: [
    { tier: "warmup", label: "D'Alembert pour R", make: (r) => {
      const cas = pick(r, [["\\frac{z^n}{n!}", -1, "factorielle au dénominateur : $R = \\infty$ (réponds -1 pour l'infini)"], ["\\frac{z^n}{3^n}", 3, "géométrique camouflée : $R = 3$"], ["\\frac{z^n}{2^n}", 2, "$R = 2$"]]);
      return { prompt: `Rayon de $\\sum ${cas[0]}$ ? (réponds $-1$ si infini)`, answer: cas[1], solution: cas[2] };
    } },
    { tier: "application", label: "Les puissances invisibles", make: (r) => {
      const k = randint(r, 2, 5); const a = pick(r, [2, 3]);
      return { prompt: `Rayon de $\\sum \\frac{n^{${k}}}{${a}^n} z^n$ ?`, answer: a, solution: `Le facteur $n^{${k}}$ est invisible pour le rayon : seule la géométrique compte — $R = ${a}$.` };
    } },
    { tier: "challenge", label: "La fabrique de sommes", make: (r) => {
      const x = pick(r, [[2, 2], [3, 0.75]]);
      return { prompt: `$\\sum_{n \\geq 1} n x^n = \\frac{x}{(1-x)^2}$ : valeur en $x = \\frac{1}{${x[0]}}$ ? (décimale acceptée)`, answer: x[1], solution: `$\\frac{1/${x[0]}}{(1 - 1/${x[0]})^2} = ${x[1]}$.` };
    } },
  ],
};

export default [seriesComparaisons, suitesSeriesFonctions, seriesEntieres];
