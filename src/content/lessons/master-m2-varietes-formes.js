// Field "Geometry" — MASTER module (m2 year), master de mathématiques.
// Porte 1/6 du M2 : variétés différentielles, formes, Stokes.
// Ancrage : M2 fonda Paris Centre, cours introductif « Géométrie différentielle
// et riemannienne » (Naud) ; Polytechnique 3A « Variétés, fibrés vectoriels et
// formes différentielles » (Pacard) ; Sorbonne 4MA322.
// (1) Variétés différentielles : cartes, atlas, applications lisses, espace
// tangent, immersions/submersions.
// (2) Formes différentielles : produit extérieur, dérivée extérieure d, d²=0,
// gradient/rotationnel/divergence unifiés.
// (3) Théorème de Stokes : orientation, bord, intégration sur les variétés ;
// FTC, Green, divergence comme cas particuliers ; de Rham en germe.
// Singapour au niveau master : Concret = UN objet explicite (le cercle ; une
// fonction de R³ ; le théorème fondamental) ; Pictural = le dessin (recollement
// de cartes, champ de covecteurs, télescopage au bord) ; Abstrait = les
// théorèmes, big idea nommée. Exam = colle ; pratique = réponses entières.
import { randint, pick } from "../../core/exercises.js";

// — Une variété ressemble localement à l'espace plat, recollée par des cartes —
const varietesCartes = {
  id: "geometry.master.varietes-cartes",
  level: "master", domain: "geometry",
  title: "Variétés différentielles : cartes et espace tangent",
  tagline: "Une variété est un espace qui ressemble localement à l'espace plat, recollé par des cartes lisses — et en chaque point un espace tangent linéarise la géométrie.",
  prereqs: ["geometry.master.sous-varietes-lagrange", "analysis.bachelor.inversion-locale"],
  intuition:
    "Une **sous-variété** de $\\mathbb{R}^n$ vit dans un espace ambiant. Mais la sphère, le tore, l'espace-temps n'ont aucun besoin d'un ambiant pour exister : ce sont des espaces courbes en eux-mêmes. Une **variété** capture cette idée — un espace qui, vu de tout près, ressemble à un morceau de $\\mathbb{R}^n$, sans qu'on suppose un plongement.\n\nLe dictionnaire entre le local plat et le global courbe, ce sont les **cartes** : des homéomorphismes d'un morceau de la variété vers $\\mathbb{R}^n$, comme les cartes d'un atlas géographique. Là où deux cartes se chevauchent, le changement de coordonnées doit être **lisse**. Une fois ce cadre posé, on linéarise : en chaque point, l'**espace tangent** rassemble les vitesses des courbes qui y passent — le meilleur modèle linéaire de la variété en ce point.",
  depths: {
    discovery:
      "**Avec les mains** : prends le cercle $S^1$. Aucune carte unique ne le couvre sans déchirure (une coordonnée d'angle saute toujours quelque part). Mais **deux** suffisent, par projection stéréographique. Depuis le pôle nord $N$, on projette $S^1 \\setminus \\{N\\}$ sur la droite réelle ($p \\mapsto u$) ; depuis le pôle sud $S$, on couvre $S^1 \\setminus \\{S\\}$ ($p \\mapsto v$). Sur le chevauchement (le cercle privé des deux pôles), le changement de coordonnées est $v = 1/u$ — une fonction **lisse** là où $u \\neq 0$. Ces deux cartes forment un **atlas** : $S^1$ est une variété de dimension $1$, sans qu'on ait eu besoin de le voir comme inclus dans le plan.",
    standard:
      "**En image** : imagine une surface courbe recouverte de pastilles de coordonnées qui se chevauchent, comme les feuilles d'un atlas routier. Sur chaque chevauchement, on sait passer d'un système de coordonnées à l'autre par une formule lisse : c'est la condition de compatibilité qui fait d'une collection de cartes une vraie structure différentiable.\n\nPour l'espace tangent, place-toi en un point $p$ et regarde toutes les courbes tracées sur la variété qui passent par $p$. Chacune a une **vitesse** en $p$ ; l'ensemble de ces vecteurs vitesse forme l'**espace tangent** $T_p M$ — le plan (ou l'hyperplan) qui épouse la variété au plus près en $p$, de même dimension qu'elle.",
    advanced:
      "**Dans la tête** : une **variété topologique** de dimension $n$ est un espace séparé, à base dénombrable, **localement homéomorphe** à $\\mathbb{R}^n$. Une **structure lisse** est la donnée d'un **atlas** de cartes $(U_i, \\varphi_i)$, $\\varphi_i \\colon U_i \\to \\mathbb{R}^n$ homéomorphismes, dont les **changements de cartes** $\\varphi_j \\circ \\varphi_i^{-1}$ sont de classe $C^\\infty$ sur les chevauchements. Une application entre variétés est **lisse** si elle l'est lue dans les cartes.\n\nL'**espace tangent** $T_p M$ se définit comme l'ensemble des classes de courbes $\\gamma$ passant par $p$, deux courbes étant identifiées si elles ont la même vitesse dans une carte (de façon équivalente : les dérivations sur les fonctions). C'est un espace vectoriel de dimension $n$. La différentielle $d f_p \\colon T_p M \\to T_{f(p)} N$ classe les applications : **immersion** si $df_p$ est injective partout, **submersion** si surjective partout, **difféomorphisme** si bijective lisse d'inverse lisse.\n\nBig idea *Equivalence* : une variété **est** la donnée de ses cartes, à équivalence lisse près. Le théorème de la valeur régulière (vu en M1) montre que toute sous-variété de $\\mathbb{R}^n$ porte un atlas naturel ; réciproquement (Whitney), toute variété abstraite se plonge dans un $\\mathbb{R}^N$. Plongée ou abstraite, c'est la **même** géométrie intrinsèque — l'espace tangent calculé dans n'importe quelle carte coïncide.",
  },
  keyIdea: "Une **variété** de dimension $n$ est un espace localement homéomorphe à $\\mathbb{R}^n$, muni d'un **atlas** de cartes à changements de cartes $C^\\infty$. En chaque point, l'**espace tangent** $T_p M$ (vitesses des courbes) linéarise la variété, de dimension $n$. La différentielle classe les applications lisses en immersions, submersions et difféomorphismes. Big idea *Equivalence*.",
  why:
    "La notion de variété est le langage de toute la géométrie et de la physique moderne : la relativité générale est l'étude d'une variété lorentzienne, les espaces de configuration de la mécanique sont des variétés, les groupes de Lie sont des variétés-groupes. En libérant la géométrie d'un plongement fixé, on peut parler de courbure, de connexion, de flot intrinsèquement — et recoller des modèles locaux simples en objets globaux riches.",
  examples: [
    { title: "Le cercle comme variété à deux cartes", steps: [
      { p: "Sur $S^1 = \\{(x, y) : x^2 + y^2 = 1\\}$, la projection stéréographique depuis $N = (0, 1)$ envoie $(x, y) \\mapsto u = \\frac{x}{1 - y}$, définie sur $S^1 \\setminus \\{N\\}$. Depuis $S = (0, -1)$, on a $(x, y) \\mapsto v = \\frac{x}{1 + y}$, définie sur $S^1 \\setminus \\{S\\}$." },
      { p: "Sur le chevauchement $S^1 \\setminus \\{N, S\\}$, un calcul donne $uv = \\frac{x^2}{1 - y^2} = \\frac{x^2}{x^2} = 1$, donc $v = 1/u$ : le changement de carte est $C^\\infty$ là où $u \\neq 0$. Les deux cartes forment un atlas lisse, et $S^1$ est une variété de dimension $1$." },
    ] },
    { title: "L'espace tangent à la sphère", steps: [
      { p: "Vue comme sous-variété, $S^2 = \\{\\|x\\| = 1\\}$ a en un point $p$ l'espace tangent $T_p S^2 = p^\\perp = \\{v : \\langle p, v \\rangle = 0\\}$ (orthogonal au gradient $2p$, comme en M1)." },
      { p: "Intrinsèquement, une courbe $\\gamma(t)$ sur la sphère vérifie $\\|\\gamma(t)\\|^2 = 1$ ; en dérivant, $\\langle \\gamma(t), \\gamma'(t) \\rangle = 0$, donc sa vitesse en $p = \\gamma(0)$ est bien dans $p^\\perp$. Les deux descriptions coïncident : $\\dim T_p S^2 = 2$. L'espace tangent abstrait égale le plan tangent plongé." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de cartes faut-il, au minimum, pour couvrir la sphère $S^2$ par projection stéréographique ? Pourquoi pas une seule ?", solution: "Il en faut **deux** : la projection depuis le pôle nord couvre $S^2$ privée du pôle nord, celle depuis le pôle sud couvre le complémentaire. Une seule carte ne peut pas suffire car elle serait un homéomorphisme entre $S^2$ (compact) et un ouvert de $\\mathbb{R}^2$ — impossible, un compact sans bord n'est homéomorphe à aucun ouvert de $\\mathbb{R}^2$. Deux cartes stéréographiques, à changement de carte lisse, font de $S^2$ une variété de dimension $2$." },
    { tier: "warmup", prompt: "Soit $M$ et $N$ deux variétés de dimensions $m$ et $n$. Quelle est la dimension de la variété produit $M \\times N$ ? Illustre avec le tore $T^2 = S^1 \\times S^1$.", solution: "La dimension du produit est la **somme** : $\\dim(M \\times N) = m + n$. Une carte de $M \\times N$ s'obtient en prenant le produit d'une carte de $M$ et d'une carte de $N$, à valeurs dans $\\mathbb{R}^m \\times \\mathbb{R}^n = \\mathbb{R}^{m+n}$. Pour le tore $T^2 = S^1 \\times S^1$ : $\\dim T^2 = 1 + 1 = 2$, c'est bien une surface." },
    { tier: "application", prompt: "Une application lisse $f \\colon \\mathbb{R}^m \\to \\mathbb{R}^n$ peut-elle être une immersion si $m > n$ ? Et une submersion si $m < n$ ?", solution: "**Non** dans les deux cas. Une immersion exige $df_p$ **injective**, donc $\\mathrm{rang}\\, df_p = m \\le n$ : impossible si $m > n$. Une submersion exige $df_p$ **surjective**, donc $\\mathrm{rang}\\, df_p = n \\le m$ : impossible si $m < n$. Le rang d'une matrice $n \\times m$ est borné par $\\min(m, n)$ ; immersion réclame $m \\le n$, submersion réclame $n \\le m$, et difféomorphisme local réclame $m = n$." },
    { tier: "challenge", prompt: "Montre que $\\gamma \\colon \\mathbb{R} \\to \\mathbb{R}^2$, $t \\mapsto (\\cos t, \\sin t)$, est une immersion, mais n'est pas injective. Que dire de l'application induite sur $S^1$ ?", solution: "La différentielle est $\\gamma'(t) = (-\\sin t, \\cos t)$, de norme $1$, donc jamais nulle : $d\\gamma_t$ est injective pour tout $t$, c'est une **immersion**. Mais $\\gamma(t + 2\\pi) = \\gamma(t)$ : elle n'est **pas injective** (elle enroule $\\mathbb{R}$ une infinité de fois sur le cercle). En passant au quotient, $\\gamma$ induit une application $\\mathbb{R} / 2\\pi\\mathbb{Z} \\to S^1$ qui est un **difféomorphisme** : le cercle abstrait $\\mathbb{R}/2\\pi\\mathbb{Z}$ et $S^1 \\subset \\mathbb{R}^2$ sont la même variété. Une immersion est un plongement **local**, pas forcément global ■." },
    { tier: "exam", prompt: "(1) Définis une variété différentielle de dimension $n$ (cartes, atlas, changements de cartes). (2) Définis l'espace tangent en un point et donne sa dimension. (3) Montre que $S^2$ est une variété de dimension $2$. (4) Distingue immersion, submersion, difféomorphisme par la différentielle.", solution: "(1) Un espace séparé à base dénombrable, recouvert par des ouverts $U_i$ avec des homéomorphismes $\\varphi_i \\colon U_i \\to \\mathbb{R}^n$ (les **cartes**) dont les **changements de cartes** $\\varphi_j \\circ \\varphi_i^{-1}$ sont $C^\\infty$ sur les chevauchements. L'ensemble des cartes est un **atlas**.\n\n(2) $T_p M$ = classes d'équivalence de courbes lisses passant par $p$, deux courbes étant équivalentes si elles ont même vitesse dans une carte ; c'est un espace vectoriel de dimension $n = \\dim M$.\n\n(3) Deux cartes stéréographiques (depuis les pôles) couvrent $S^2$, à changement de carte lisse (de la forme $w \\mapsto w / \\|w\\|^2$) : $S^2$ est une variété de dimension $2$.\n\n(4) Via $df_p$ : **immersion** si injective partout, **submersion** si surjective partout, **difféomorphisme** si $f$ est une bijection lisse d'inverse lisse (alors $df_p$ est un isomorphisme en tout point) ■." },
  ],
  practice: [
    { tier: "discovery", label: "Dimension d'un produit de sphères", make: (r) => {
      const a = randint(r, 1, 5), b = randint(r, 1, 5);
      return { prompt: `Quelle est la dimension de la variété produit $S^{${a}} \\times S^{${b}}$ ?`, answer: a + b, solution: `La dimension d'un produit est la somme des dimensions : $\\dim(S^{${a}} \\times S^{${b}}) = ${a} + ${b} = ${a + b}$.` };
    } },
    { tier: "warmup", label: "Dimension du groupe orthogonal", make: (r) => {
      const n = randint(r, 2, 6);
      const d = (n * (n - 1)) / 2;
      return { prompt: `Le groupe orthogonal $O(${n})$ est une variété. Quelle est sa dimension ?`, answer: d, solution: `L'espace tangent en l'identité est l'espace des matrices **antisymétriques** $${n} \\times ${n}$, de dimension $\\frac{${n}(${n}-1)}{2} = ${d}$. Donc $\\dim O(${n}) = ${d}$.` };
    } },
    { tier: "application", label: "Immersion possible ?", make: (r) => {
      const m = randint(r, 1, 5), n = randint(r, 1, 5);
      const ok = m <= n ? 1 : 0;
      return { prompt: `Une application lisse $f \\colon \\mathbb{R}^{${m}} \\to \\mathbb{R}^{${n}}$ peut-elle être une **immersion** ? (réponds $1$ pour oui, $0$ pour non)`, answer: ok, solution: ok ? `Oui : une immersion demande $df$ injective, soit $\\mathrm{rang} = ${m} \\le ${n}$ — possible ici.` : `Non : une immersion demande $df$ injective, soit le rang $= ${m}$, or le rang d'une matrice $${n} \\times ${m}$ est au plus $${n} < ${m}$. Impossible.` };
    } },
  ],
};

// — Les formes différentielles sont les intégrands ; d unifie grad/rot/div —
const formesDifferentielles = {
  id: "geometry.master.formes-differentielles",
  level: "master", domain: "geometry",
  title: "Formes différentielles et dérivée extérieure",
  tagline: "Les formes différentielles sont les objets que l'on intègre ; une seule opération, la dérivée extérieure, contient le gradient, le rotationnel et la divergence à la fois.",
  prereqs: ["geometry.master.varietes-cartes"],
  intuition:
    "Qu'est-ce qu'on intègre, au fond ? Pas une fonction, mais un objet qui sait mesurer un **volume orienté** de la bonne dimension : le long d'une courbe on intègre une $1$-forme ($\\int f\\, dx$), sur une surface une $2$-forme (un flux), sur un volume une $3$-forme. Une $k$-**forme** est exactement l'intégrand naturel des objets de dimension $k$.\n\nDeux opérations les organisent. Le **produit extérieur** $\\wedge$ combine les formes de façon **antisymétrique** ($dx \\wedge dy = -\\, dy \\wedge dx$), ce qui encode l'orientation. La **dérivée extérieure** $d$ augmente le degré de $1$ et — miracle — contient à elle seule le gradient, le rotationnel et la divergence du calcul vectoriel, avec une unique identité maîtresse : $d^2 = 0$.",
  depths: {
    discovery:
      "**Avec les mains** : travaille dans $\\mathbb{R}^3$ avec la fonction $f(x, y, z) = xyz$ (une $0$-**forme**). Sa dérivée extérieure est sa différentielle : $df = yz\\, dx + xz\\, dy + xy\\, dz$ — c'est le **gradient**, écrit comme $1$-forme. Calculons maintenant $d(df)$. Le terme $yz\\, dx$ donne $d(yz) \\wedge dx = (z\\, dy + y\\, dz) \\wedge dx$, et de même pour les autres. En regroupant et en utilisant $dy \\wedge dx = -\\, dx \\wedge dy$, **tout s'annule** : $d(df) = 0$. Cette identité $d^2 = 0$ n'est rien d'autre que « le rotationnel d'un gradient est nul » — vérifié ici sur un exemple, vrai toujours.",
    standard:
      "**En image** : vois une $1$-forme comme un champ de « règles graduées » (des covecteurs) qui mesurent, le long d'un déplacement, combien on traverse de lignes de niveau. Une $2$-forme mesure une aire orientée, une « boîte » à travers laquelle compter un flux. La dérivée extérieure $d$ mesure une **densité de circulation ou de flux** : combien la forme « tourne » ou « sort » localement.\n\nGarde aussi en tête l'image qui prépare Stokes : intégrer $d\\omega$ sur un petit domaine revient à intégrer $\\omega$ sur son bord, car les contributions intérieures de cellules voisines se compensent le long des arêtes partagées. La dérivée extérieure et le passage au bord se répondent.",
    advanced:
      "**Dans la tête** : sur une variété, une $k$-**forme** est une section de $\\Lambda^k(T^*M)$ — en chaque point, une forme $k$-linéaire **alternée** sur l'espace tangent. En coordonnées, $\\omega = \\sum_{I} f_I\\, dx^{i_1} \\wedge \\cdots \\wedge dx^{i_k}$. Le **produit extérieur** $\\wedge \\colon \\Lambda^k \\times \\Lambda^l \\to \\Lambda^{k+l}$ est associatif et **anticommutatif** : $\\alpha \\wedge \\beta = (-1)^{kl}\\, \\beta \\wedge \\alpha$.\n\nLa **dérivée extérieure** $d \\colon \\Lambda^k \\to \\Lambda^{k+1}$ est l'unique opérateur tel que $df$ soit la différentielle sur les fonctions, vérifiant la règle de Leibniz graduée $d(\\alpha \\wedge \\beta) = d\\alpha \\wedge \\beta + (-1)^k\\, \\alpha \\wedge d\\beta$, et l'identité fondamentale $d^2 = 0$. Dans $\\mathbb{R}^3$, $d$ agissant sur les $0$-formes est le **gradient**, sur les $1$-formes le **rotationnel**, sur les $2$-formes la **divergence** ; $d^2 = 0$ redonne $\\mathrm{rot}\\,\\mathrm{grad} = 0$ et $\\mathrm{div}\\,\\mathrm{rot} = 0$. Le **tiré en arrière** $f^* \\omega$ commute avec $d$. Une forme est **fermée** si $d\\omega = 0$, **exacte** si $\\omega = d\\eta$ ; toute exacte est fermée, la réciproque mesure la topologie (de Rham).\n\nBig idea *Notations* : le calcul extérieur est une **notation** qui unifie tout le calcul vectoriel — un seul symbole $d$, une seule identité $d^2 = 0$, et le gradient, le rotationnel, la divergence ainsi que leurs identités d'annulation en découlent automatiquement, dans n'importe quelle dimension et sans coordonnées.",
  },
  keyIdea: "Une $k$-**forme** est l'intégrand des objets de dimension $k$ (forme alternée sur le tangent). Le **produit extérieur** $\\wedge$ est anticommutatif ; la **dérivée extérieure** $d$ augmente le degré de $1$, vérifie la règle de Leibniz graduée et $d^2 = 0$. Dans $\\mathbb{R}^3$, $d$ est tour à tour gradient, rotationnel, divergence. Big idea *Notations*.",
  why:
    "Les formes différentielles sont le langage correct de l'intégration sur les variétés (théorème de Stokes), de l'électromagnétisme (les équations de Maxwell deviennent $F = dA$, $dF = 0$), et de la cohomologie de de Rham (fermée/exacte mesure les « trous » d'un espace). Coordonnée-libres et fonctorielles par tiré en arrière, elles remplacent avantageusement le calcul vectoriel dès qu'on quitte $\\mathbb{R}^3$.",
  examples: [
    { title: "d carré nul sur une fonction de R³", steps: [
      { p: "Pour $f(x, y, z) = xyz$, $df = yz\\, dx + xz\\, dy + xy\\, dz$. C'est la $1$-forme du gradient $\\nabla f = (yz, xz, xy)$." },
      { p: "Calculons $d(df)$ : par exemple le terme en $dy \\wedge dz$ provient de $\\partial_y(xy) - \\partial_z(xz) = x - x = 0$, et de même pour les autres composantes. Donc $d(df) = 0$ : c'est $\\mathrm{rot}(\\nabla f) = 0$, conséquence directe de $d^2 = 0$ et de l'égalité des dérivées croisées." },
    ] },
    { title: "La forme de circulation et l'aire", steps: [
      { p: "Sur $\\mathbb{R}^2$, considère la $1$-forme $\\omega = -y\\, dx + x\\, dy$. Sa dérivée extérieure est $d\\omega = -\\,dy \\wedge dx + dx \\wedge dy = 2\\, dx \\wedge dy$ (car $dy \\wedge dx = -\\,dx \\wedge dy$)." },
      { p: "Le coefficient $2$ est une densité d'aire : par Stokes (vu à la leçon suivante), $\\oint_{\\partial D} \\omega = \\int_D 2\\, dx\\, dy = 2\\,\\mathrm{Aire}(D)$. La $1$-forme « circulation » a pour dérivée extérieure le double de la forme d'aire." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Que vaut la dérivée extérieure $df$ d'une fonction (une $0$-forme) sur $\\mathbb{R}^n$ ? À quel objet du calcul vectoriel correspond-elle ?", solution: "Pour une $0$-forme $f$, $df = \\sum_{i=1}^n \\frac{\\partial f}{\\partial x_i}\\, dx_i$ : c'est la **différentielle**, qui code exactement le **gradient** $\\nabla f = (\\partial_1 f, \\ldots, \\partial_n f)$ sous forme de $1$-forme. La dérivée extérieure des fonctions, c'est le gradient." },
    { tier: "warmup", prompt: "Calcule $dx \\wedge dx$, puis $(dx + dy) \\wedge (dx - dy)$ sur $\\mathbb{R}^2$.", solution: "Par antisymétrie, $dx \\wedge dx = 0$ (toute forme avec un facteur répété s'annule). Ensuite $(dx + dy) \\wedge (dx - dy) = dx \\wedge dx - dx \\wedge dy + dy \\wedge dx - dy \\wedge dy = 0 - dx \\wedge dy - dx \\wedge dy - 0 = -2\\, dx \\wedge dy$ (en utilisant $dy \\wedge dx = -\\,dx \\wedge dy$). Le produit extérieur se développe comme un produit, mais anticommutatif." },
    { tier: "application", prompt: "Sur $\\mathbb{R}^3$, calcule $d\\omega$ pour $\\omega = P\\, dx + Q\\, dy + R\\, dz$. Retrouve le rotationnel.", solution: "$d\\omega = dP \\wedge dx + dQ \\wedge dy + dR \\wedge dz$. En développant chaque $dP = \\partial_x P\\, dx + \\partial_y P\\, dy + \\partial_z P\\, dz$ et en regroupant via l'antisymétrie : $d\\omega = (\\partial_y R - \\partial_z Q)\\, dy \\wedge dz + (\\partial_z P - \\partial_x R)\\, dz \\wedge dx + (\\partial_x Q - \\partial_y P)\\, dx \\wedge dy$. Les trois coefficients sont exactement les composantes du **rotationnel** $\\mathrm{rot}(P, Q, R)$. La dérivée extérieure d'une $1$-forme, c'est le rotationnel." },
    { tier: "challenge", prompt: "Sur $\\mathbb{R}^2 \\setminus \\{0\\}$, montre que la $1$-forme $\\omega = \\frac{-y\\, dx + x\\, dy}{x^2 + y^2}$ est **fermée** ($d\\omega = 0$) mais **non exacte**.", solution: "**Fermée** : on calcule $\\partial_x\\!\\left(\\frac{x}{x^2+y^2}\\right) = \\frac{y^2 - x^2}{(x^2+y^2)^2}$ et $\\partial_y\\!\\left(\\frac{-y}{x^2+y^2}\\right) = \\frac{y^2 - x^2}{(x^2+y^2)^2}$ : ils sont égaux, donc $d\\omega = (\\partial_x Q - \\partial_y P)\\, dx \\wedge dy = 0$. **Non exacte** : si $\\omega = d\\theta$ pour une fonction globale $\\theta$, alors $\\oint_{S^1} \\omega = 0$ par le théorème fondamental. Or $\\omega$ est précisément $d(\\arg)$, et $\\oint_{S^1} \\omega = \\int_0^{2\\pi} d\\vartheta = 2\\pi \\neq 0$. Donc $\\omega$ n'admet pas de primitive **globale** : fermée mais pas exacte. Cet écart $2\\pi$ détecte le **trou** de $\\mathbb{R}^2 \\setminus \\{0\\}$ — le premier exemple de cohomologie de de Rham non triviale ■." },
    { tier: "exam", prompt: "(1) Définis une $k$-forme différentielle et le produit extérieur. (2) Énonce les propriétés caractéristiques de la dérivée extérieure $d$. (3) Démontre que $d^2 = 0$ sur les fonctions et interprète dans $\\mathbb{R}^3$. (4) Définis fermée et exacte, et explique le lien avec la topologie.", solution: "(1) Une $k$-forme est une section de $\\Lambda^k(T^*M)$ : en chaque point, une forme $k$-linéaire alternée sur le tangent ; en coordonnées $\\omega = \\sum_I f_I\\, dx^I$. Le **produit extérieur** $\\wedge$ est bilinéaire, associatif et anticommutatif : $\\alpha \\wedge \\beta = (-1)^{kl} \\beta \\wedge \\alpha$ pour $\\alpha$ de degré $k$, $\\beta$ de degré $l$.\n\n(2) $d$ est linéaire, augmente le degré de $1$, coïncide avec la différentielle sur les fonctions, vérifie $d(\\alpha \\wedge \\beta) = d\\alpha \\wedge \\beta + (-1)^{\\deg \\alpha}\\, \\alpha \\wedge d\\beta$, et $d \\circ d = 0$. Ces propriétés la déterminent uniquement.\n\n(3) Pour une fonction $f$, $d(df) = \\sum_{i,j} \\partial_j \\partial_i f\\, dx^j \\wedge dx^i$ ; comme $\\partial_j \\partial_i f = \\partial_i \\partial_j f$ (Schwarz) tandis que $dx^j \\wedge dx^i = -\\,dx^i \\wedge dx^j$, les termes s'annulent deux à deux : $d^2 f = 0$. Dans $\\mathbb{R}^3$ c'est $\\mathrm{rot}\\,\\mathrm{grad} = 0$.\n\n(4) $\\omega$ est **fermée** si $d\\omega = 0$, **exacte** si $\\omega = d\\eta$. Toute exacte est fermée ($d^2 = 0$) ; le quotient fermées/exactes est la **cohomologie de de Rham**, qui mesure les trous de l'espace (trivial sur un convexe, non trivial sur $\\mathbb{R}^2 \\setminus \\{0\\}$) ■." },
  ],
  practice: [
    { tier: "discovery", label: "Dimension des k-formes", make: (r) => {
      const n = randint(r, 2, 6);
      const k = randint(r, 0, n);
      const fact = (m) => (m <= 1 ? 1 : m * fact(m - 1));
      const c = fact(n) / (fact(k) * fact(n - k));
      return { prompt: `Sur une variété de dimension $${n}$, quelle est la dimension de l'espace des $${k}$-formes en un point ?`, answer: c, solution: `C'est le nombre de façons de choisir $${k}$ indices distincts parmi $${n}$ : $\\binom{${n}}{${k}} = ${c}$.` };
    } },
    { tier: "warmup", label: "Degré d'un produit extérieur", make: (r) => {
      const p = randint(r, 1, 4), q = randint(r, 1, 4);
      return { prompt: `Si $\\alpha$ est une $${p}$-forme et $\\beta$ une $${q}$-forme, quel est le degré de $\\alpha \\wedge \\beta$ ?`, answer: p + q, solution: `Le produit extérieur additionne les degrés : $\\deg(\\alpha \\wedge \\beta) = ${p} + ${q} = ${p + q}$.` };
    } },
    { tier: "application", label: "Coefficient du rotationnel", make: (r) => {
      const a = randint(r, 1, 6);
      return { prompt: `Sur $\\mathbb{R}^2$, soit $\\omega = ${a}(-y\\, dx + x\\, dy)$. On a $d\\omega = c\\, dx \\wedge dy$. Que vaut $c$ ?`, answer: 2 * a, solution: `$d\\omega = ${a}(-dy \\wedge dx + dx \\wedge dy) = ${a}(2\\, dx \\wedge dy) = ${2 * a}\\, dx \\wedge dy$, donc $c = ${2 * a}$.` };
    } },
  ],
};

// — Stokes : intégrer dω sur un domaine = intégrer ω sur son bord —
const stokes = {
  id: "geometry.master.stokes",
  level: "master", domain: "geometry",
  title: "Le théorème de Stokes et l'intégration sur les variétés",
  tagline: "Intégrer la dérivée d'une forme sur un domaine revient à intégrer la forme sur son bord — une seule formule qui contient le théorème fondamental, Green et la divergence.",
  prereqs: ["geometry.master.formes-differentielles", "analysis.master.fubini-tonelli"],
  intuition:
    "Le calcul à une variable a son joyau : $\\int_a^b f'(x)\\, dx = f(b) - f(a)$ — l'intégrale d'une dérivée se lit aux extrémités. Le **théorème de Stokes** est la même phrase, à toute dimension : $\\int_M d\\omega = \\int_{\\partial M} \\omega$. L'intégrale de la **dérivée extérieure** d'une forme sur une variété égale l'intégrale de la forme sur son **bord**.\n\nUne seule formule absorbe ainsi le théorème fondamental de l'analyse (dimension $1$), la formule de Green (dimension $2$), le théorème de la divergence d'Ostrogradski et le théorème du rotationnel classique. Derrière, une dualité limpide : l'opérateur de bord $\\partial$ et la dérivée extérieure $d$ se répondent — et $\\partial^2 = 0$ fait écho à $d^2 = 0$.",
  depths: {
    discovery:
      "**Avec les mains** : prends la dimension $1$. La variété est le segment $M = [a, b]$, et $\\omega = f$ une $0$-forme (une fonction). Alors $d\\omega = f'(x)\\, dx$, une $1$-forme. Le **bord** orienté de $[a, b]$ est le point $b$ compté positivement et le point $a$ compté négativement : $\\partial M = \\{b\\} - \\{a\\}$. Le théorème de Stokes énonce $\\int_{[a,b]} f'(x)\\, dx = \\int_{\\partial M} f = f(b) - f(a)$ — c'est **exactement** le théorème fondamental de l'analyse. Le résultat le plus familier du calcul intégral est le cas le plus simple de Stokes.",
    standard:
      "**En image** : découpe un domaine en petites cellules. L'intégrale de $d\\omega$ sur chaque cellule vaut, à l'ordre dominant, l'intégrale de $\\omega$ sur le bord de la cellule. Quand on somme sur toutes les cellules, chaque arête **intérieure** est parcourue deux fois en sens opposés : les contributions se **télescopent** et s'annulent. Ne survit que le parcours du bord extérieur. C'est le mécanisme de Stokes — un télescopage géométrique.\n\nEn dimension $2$, cette image est la formule de Green : la circulation de $\\omega$ le long du bord d'un domaine égale l'intégrale du rotationnel ($d\\omega$) sur le domaine. Les tourbillons intérieurs voisins s'annulent ; il reste la circulation au bord.",
    advanced:
      "**Dans la tête** : sur une variété **orientée** $M$ de dimension $n$, à bord $\\partial M$ (une variété de dimension $n-1$ munie de l'orientation induite), et pour toute $(n-1)$-forme $\\omega$ à support compact, le **théorème de Stokes** affirme $\\int_M d\\omega = \\int_{\\partial M} \\omega$.\n\nCas particuliers : $n = 1$ redonne le **théorème fondamental** ; $n = 2$ dans le plan redonne **Green** ; le **théorème de la divergence** $\\int_\\Omega \\mathrm{div}\\, F\\, dV = \\int_{\\partial \\Omega} F \\cdot n\\, dS$ et le théorème du **rotationnel** en sont des reformulations. Conséquence majeure : si $M$ est **sans bord** (compacte fermée, $\\partial M = \\emptyset$), alors $\\int_M d\\omega = 0$ — l'intégrale d'une forme **exacte** sur une variété fermée est nulle. Donc l'intégrale d'une forme **fermée** sur un cycle ne dépend que de sa classe de cohomologie.\n\nBig idea *Invariance* : $\\partial^2 = 0$ reflète $d^2 = 0$, et Stokes fait de l'intégration un **appariement** entre l'homologie (les cycles) et la cohomologie de de Rham (les formes fermées modulo exactes). L'intégrale d'une forme fermée sur un cycle est un **invariant** : déformer le cycle, ou modifier la forme par une exacte, ne change pas le résultat. C'est le pont entre analyse et topologie.",
  },
  keyIdea: "Le **théorème de Stokes** : sur une variété orientée à bord, $\\int_M d\\omega = \\int_{\\partial M} \\omega$. Il unifie le théorème fondamental ($n=1$), Green ($n=2$), la divergence et le rotationnel. Sur une variété fermée, l'intégrale d'une forme exacte est nulle, et l'intégrale d'une forme fermée sur un cycle ne dépend que de sa classe de cohomologie. Big idea *Invariance*.",
  why:
    "Stokes est la pierre angulaire de la géométrie, de la topologie et de la physique. En physique : la loi de Gauss, la loi de Faraday, les lois de conservation s'écrivent toutes « variation totale = flux net au bord ». En topologie : il fonde la dualité de de Rham entre formes et cycles, et explique pourquoi certaines intégrales (degrés, enlacements, flux quantifiés) sont des entiers invariants par déformation. C'est la généralisation ultime de « la somme des variations égale la différence aux bouts ».",
  examples: [
    { title: "Le théorème fondamental comme Stokes en dimension 1", steps: [
      { p: "Sur $M = [a, b]$, prends la $0$-forme $\\omega = f$. Alors $d\\omega = f'\\, dx$, et le bord orienté est $\\partial M = \\{b\\} - \\{a\\}$ (le point d'arrivée moins le point de départ)." },
      { p: "Stokes donne $\\int_a^b f'(x)\\, dx = \\int_{\\partial M} f = f(b) - f(a)$. C'est mot pour mot le théorème fondamental de l'analyse : intégrer une dérivée, c'est évaluer aux bords. La dimension $1$ est déjà tout Stokes en miniature." },
    ] },
    { title: "Green et l'aire du disque", steps: [
      { p: "Prends $\\omega = -y\\, dx + x\\, dy$ sur $\\mathbb{R}^2$, avec $d\\omega = 2\\, dx \\wedge dy$ (leçon précédente). Sur un domaine $D$ de bord $\\partial D$ orienté positivement, Stokes (formule de Green) donne $\\oint_{\\partial D} \\omega = \\int_D 2\\, dx\\, dy = 2\\,\\mathrm{Aire}(D)$." },
      { p: "Pour le disque unité $D$ d'aire $\\pi$ : $\\oint_{\\partial D} (-y\\, dx + x\\, dy) = 2\\pi$. On retrouve l'aire par une intégrale de bord — d'où la formule de l'arpenteur $\\mathrm{Aire}(D) = \\tfrac{1}{2} \\oint_{\\partial D} (-y\\, dx + x\\, dy)$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Énonce le théorème de Stokes en dimension $1$. Quel théorème classique reconnaît-on ?", solution: "En dimension $1$ : $M = [a, b]$, $\\omega = f$ une $0$-forme, $d\\omega = f'\\, dx$, $\\partial M = \\{b\\} - \\{a\\}$. Stokes donne $\\int_a^b f'(x)\\, dx = f(b) - f(a)$ : c'est le **théorème fondamental de l'analyse**. Le cas le plus simple de Stokes est le théorème qu'on apprend en premier en intégration." },
    { tier: "warmup", prompt: "Avec la formule de Green, calcule $\\oint_{\\partial R} x\\, dy$ où $R = [0, L] \\times [0, W]$ est un rectangle parcouru positivement.", solution: "Par Green, $\\oint_{\\partial R} x\\, dy = \\int_R d(x\\, dy) = \\int_R dx \\wedge dy = \\int_R 1\\, dx\\, dy = \\mathrm{Aire}(R) = L \\cdot W$. L'intégrale de bord $\\oint x\\, dy$ calcule directement l'aire du domaine : ici $LW$." },
    { tier: "application", prompt: "Soit $F(x, y, z) = (x, y, z)$ le champ radial sur $\\mathbb{R}^3$, et $B$ la boule de rayon $R$. Calcule le flux $\\int_{\\partial B} F \\cdot n\\, dS$ par le théorème de la divergence.", solution: "La divergence est $\\mathrm{div}\\, F = \\partial_x x + \\partial_y y + \\partial_z z = 3$. Par le théorème de la divergence (un cas de Stokes), $\\int_{\\partial B} F \\cdot n\\, dS = \\int_B \\mathrm{div}\\, F\\, dV = 3\\,\\mathrm{Vol}(B) = 3 \\cdot \\tfrac{4}{3}\\pi R^3 = 4\\pi R^3$. Le flux du champ radial à travers la sphère vaut $4\\pi R^3$, trois fois le volume." },
    { tier: "challenge", prompt: "Montre que si $M$ est une variété **compacte sans bord** et $\\omega$ une forme exacte, alors $\\int_M \\omega = 0$. En déduire que $\\int_M \\eta$ ne dépend que de la classe de cohomologie de $\\eta$ (forme fermée).", solution: "Si $\\omega = d\\alpha$ est exacte et $\\partial M = \\emptyset$, Stokes donne $\\int_M \\omega = \\int_M d\\alpha = \\int_{\\partial M} \\alpha = \\int_\\emptyset \\alpha = 0$. Maintenant soit $\\eta$ une forme **fermée** ($d\\eta = 0$) ; si $\\eta' = \\eta + d\\alpha$ est une autre représentante de la même classe de cohomologie, alors $\\int_M \\eta' - \\int_M \\eta = \\int_M d\\alpha = 0$. Donc $\\int_M \\eta$ ne dépend que de $[\\eta] \\in H^{\\dim M}_{\\mathrm{dR}}(M)$ : c'est un **invariant cohomologique**, insensible au choix de représentante. C'est le fondement de la dualité de de Rham ■." },
    { tier: "exam", prompt: "(1) Énonce le théorème de Stokes (hypothèses : orientation, bord). (2) Retrouve le théorème fondamental et la formule de Green comme cas particuliers. (3) Énonce le théorème de la divergence. (4) Démontre que sur une variété fermée, l'intégrale d'une forme exacte est nulle, et interprète.", solution: "(1) Soit $M$ une variété orientée de dimension $n$, à bord $\\partial M$ muni de l'orientation induite, et $\\omega$ une $(n-1)$-forme à support compact. Alors $\\int_M d\\omega = \\int_{\\partial M} \\omega$.\n\n(2) $n = 1$, $M = [a, b]$, $\\omega = f$ : $\\int_a^b f' = f(b) - f(a)$ (**théorème fondamental**). $n = 2$, $\\omega = P\\, dx + Q\\, dy$ : $\\int_D (\\partial_x Q - \\partial_y P)\\, dx\\, dy = \\oint_{\\partial D} P\\, dx + Q\\, dy$ (**Green**).\n\n(3) **Divergence** : pour un champ $F$ et un domaine $\\Omega \\subset \\mathbb{R}^3$, $\\int_\\Omega \\mathrm{div}\\, F\\, dV = \\int_{\\partial \\Omega} F \\cdot n\\, dS$ — Stokes appliqué à la $2$-forme de flux associée à $F$.\n\n(4) Si $\\partial M = \\emptyset$ et $\\omega = d\\alpha$, alors $\\int_M \\omega = \\int_{\\partial M} \\alpha = 0$. Interprétation : l'intégrale d'une forme fermée sur une variété fermée ne dépend que de sa classe de de Rham, ce qui fait de l'intégration un appariement homologie–cohomologie ■." },
  ],
  practice: [
    { tier: "discovery", label: "Théorème fondamental via Stokes", make: (r) => {
      const p = randint(r, 1, 9), q = randint(r, 10, 20);
      return { prompt: `Par Stokes en dimension $1$, $\\int_a^b f'(x)\\, dx = f(b) - f(a)$. Si $f(a) = ${p}$ et $f(b) = ${q}$, que vaut $\\int_a^b f'(x)\\, dx$ ?`, answer: q - p, solution: `C'est $f(b) - f(a) = ${q} - ${p} = ${q - p}$ : l'intégrale de la dérivée se lit aux bords.` };
    } },
    { tier: "warmup", label: "Aire par la formule de Green", make: (r) => {
      const L = randint(r, 2, 9), W = randint(r, 2, 9);
      return { prompt: `Par Green, $\\oint_{\\partial R}(-y\\, dx + x\\, dy) = 2\\,\\mathrm{Aire}(R)$. Pour le rectangle $R$ de côtés $${L}$ et $${W}$, que vaut cette intégrale de bord ?`, answer: 2 * L * W, solution: `L'aire est $${L} \\times ${W} = ${L * W}$, donc $\\oint = 2 \\times ${L * W} = ${2 * L * W}$.` };
    } },
    { tier: "application", label: "Flux par la divergence", make: (r) => {
      const c = randint(r, 1, 6), V = randint(r, 2, 9);
      return { prompt: `Un champ $F$ a une divergence constante $\\mathrm{div}\\, F = ${c}$ sur un domaine de volume $${V}$. Par le théorème de la divergence, que vaut le flux $\\int_{\\partial \\Omega} F \\cdot n\\, dS$ ?`, answer: c * V, solution: `Le flux égale $\\int_\\Omega \\mathrm{div}\\, F\\, dV = ${c} \\times ${V} = ${c * V}$.` };
    } },
  ],
};

export default [varietesCartes, formesDifferentielles, stokes];
