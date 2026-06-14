// Field "Algebra" — MASTER module (m2 year), master de mathématiques.
// Porte 6/6 du M2 : cryptographie et courbes elliptiques. ADN KingDown.
// Ancrage : Sorbonne 4MA235 (cryptologie, cryptographie algébrique : RSA, log
// discret, El Gamal, Diffie-Hellman, Shamir, courbes elliptiques) ; M2 fonda
// Paris Centre, cours fonda I « Introduction à l'arithmétique des courbes
// elliptiques » (Fresán).
// (1) Cryptographie à clé publique : fonctions à sens unique et trappe, RSA, log
// discret, Diffie-Hellman, El Gamal, sécurité comme réduction.
// (2) Courbes elliptiques : forme de Weierstrass, loi de groupe cordes-tangentes,
// point à l'infini, points rationnels, Mordell-Weil.
// (3) Courbes elliptiques sur les corps finis : groupe fini, borne de Hasse,
// log discret elliptique, ECDH/ECDSA, factorisation ECM de Lenstra.
// Singapour au niveau master : Concret = UN objet explicite (RSA en petits
// nombres ; additionner deux points de y²=x³+1 ; compter les points sur F_5) ;
// Pictural = le dessin (cadenas public, mélange de peintures, cordes-tangentes,
// nuage de points) ; Abstrait = les théorèmes, big idea nommée. Exam = colle ;
// pratique = réponses entières.
import { randint, pick } from "../../core/exercises.js";

// Helpers arithmétiques (non exportés) pour les générateurs.
const modpow = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e = Math.floor(e / 2); } return r; };
const modinv = (a, m) => { a = ((a % m) + m) % m; for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x; return 1; };
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// — Une dissymétrie facile/infaisable fonde toute la cryptographie moderne —
const cryptographieClesPubliques = {
  id: "algebra.master.cryptographie-cles-publiques",
  level: "master", domain: "algebra",
  title: "Cryptographie à clé publique",
  tagline: "Multiplier deux grands nombres premiers est facile, les retrouver presque impossible : cette dissymétrie fonde RSA, le logarithme discret et l'échange de clés de Diffie-Hellman.",
  prereqs: ["algebra.bachelor.corps-finis", "algebra.bachelor.anneaux-quotients"],
  intuition:
    "La cryptographie classique (symétrique) exige une clé secrète **partagée** — mais comment la partager sur un canal ouvert, sans s'être rencontré ? La cryptographie à **clé publique** résout ce paradoxe par des **fonctions à sens unique avec trappe** : des opérations faciles à calculer dans un sens, infaisables à inverser, sauf si l'on détient un secret.\n\nDeux piliers arithmétiques. (1) La **factorisation** : multiplier deux nombres premiers $p \\cdot q = n$ est facile, retrouver $p$ et $q$ à partir de $n$ est infaisable — c'est RSA. (2) Le **logarithme discret** : calculer $g^x \\bmod p$ est facile, retrouver $x$ depuis $g^x$ est infaisable — c'est Diffie-Hellman, El Gamal. De là, deux personnes qui ne se sont jamais parlé s'accordent sur un secret par-dessus un fil public (Diffie-Hellman), et quiconque peut chiffrer vers une clé publique que seul le détenteur de la clé privée déchiffre (RSA).",
  depths: {
    discovery:
      "**Avec les mains** : faisons RSA en tout petit. Prends $p = 3$, $q = 11$, donc $n = 33$ et $\\varphi(n) = (p-1)(q-1) = 20$. Choisis l'exposant public $e = 3$ (premier avec $20$) ; l'exposant privé est $d = 3^{-1} \\bmod 20 = 7$ (car $3 \\times 7 = 21 \\equiv 1$). Pour chiffrer le message $m = 5$ : $c = 5^3 \\bmod 33 = 125 \\bmod 33 = 26$. Pour déchiffrer : $c^7 \\bmod 33 = 26^7 \\bmod 33 = 5$ — on retrouve $m$. La magie : $m^{ed} = m^{21} \\equiv m \\pmod{33}$ par le théorème d'Euler ($ed \\equiv 1 \\bmod \\varphi(n)$). Chiffrer, c'est une exponentiation modulaire ; déchiffrer utilise le secret $d$, calculé depuis la factorisation $33 = 3 \\times 11$.",
    standard:
      "**En image** : pense à un **cadenas public** que n'importe qui peut refermer (la clé publique), mais que seule la clé du propriétaire ouvre (la clé privée). Chiffrer, c'est verrouiller ; seul le détenteur de la clé privée déverrouille.\n\nPour Diffie-Hellman, image un **mélange de peintures**. Alice et Bob mélangent chacun leur couleur secrète à une couleur de base publique, échangent les mélanges sur un canal ouvert, puis chacun rajoute sa propre couleur secrète : les deux atteignent **le même** mélange final. Un espion qui ne voit que les mélanges intermédiaires ne peut pas « dé-mélanger » pour retrouver les couleurs secrètes. Mélanger est facile, séparer est infaisable.",
    advanced:
      "**Dans la tête** : une **fonction à sens unique** est facile à calculer, infaisable à inverser ; une **trappe** la rend inversible avec un secret. **RSA** : on choisit des premiers $p, q$, on pose $n = pq$, $\\varphi(n) = (p-1)(q-1)$ ; la clé publique est $(n, e)$ avec $\\gcd(e, \\varphi(n)) = 1$, la clé privée $d = e^{-1} \\bmod \\varphi(n)$. Chiffrement $c = m^e \\bmod n$, déchiffrement $m = c^d \\bmod n$ ; la correction vient de $m^{ed} \\equiv m \\pmod n$ (théorème d'Euler). La sécurité repose sur la difficulté de **factoriser** $n$.\n\n**Problème du logarithme discret (DLP)** : dans un groupe cyclique $\\langle g \\rangle$ (par exemple $\\mathbb{F}_p^*$), retrouver $x$ à partir de $g^x$ — réputé difficile. **Échange de Diffie-Hellman** : Alice publie $g^a$, Bob publie $g^b$ ; tous deux calculent le secret commun $g^{ab} = (g^b)^a = (g^a)^b$ ; l'espion affronte le problème de Diffie-Hellman. **El Gamal** chiffre sur le même principe. Le **partage de secret de Shamir** découpe un secret par interpolation polynomiale sur $\\mathbb{F}_p$ (seuil $k$ parmi $n$).\n\nBig idea *Equivalence* : la sécurité de ces systèmes s'établit par des **réductions** — casser RSA est (conjecturalement) aussi dur que factoriser, casser Diffie-Hellman aussi dur que le logarithme discret. La garantie cryptographique est une **équivalence entre problèmes** : « ce chiffre est sûr » signifie « le casser est calculatoirement équivalent à résoudre un problème jugé intraitable ». La cryptographie transforme la dissymétrie facile/difficile en réductions entre problèmes mathématiques.",
  },
  keyIdea: "La **cryptographie à clé publique** repose sur des **fonctions à sens unique avec trappe** : **RSA** (chiffrer $m^e \\bmod n$, déchiffrer avec $d = e^{-1} \\bmod \\varphi(n)$ ; sécurité = difficulté de **factoriser**) et le **logarithme discret** (Diffie-Hellman partage $g^{ab}$ sur un canal public ; El Gamal). La sécurité est une **réduction** à un problème difficile. Big idea *Equivalence*.",
  why:
    "La cryptographie à clé publique sécurise tout l'Internet : TLS/HTTPS, signatures, échange de clés, chaînes de blocs. Elle repose entièrement sur l'arithmétique (calcul modulaire, corps finis, théorème d'Euler) et sur la difficulté conjecturée de la factorisation et du logarithme discret — faisant de la théorie algorithmique des nombres une affaire d'infrastructure mondiale (et une cible de choix des ordinateurs quantiques via l'algorithme de Shor).",
  examples: [
    { title: "RSA en petits nombres", steps: [
      { p: "Clés : $p = 3$, $q = 11$, $n = 33$, $\\varphi(n) = 20$, $e = 3$, $d = 3^{-1} \\bmod 20 = 7$ (car $3 \\times 7 = 21 \\equiv 1 \\bmod 20$). La clé publique est $(33, 3)$, la privée $d = 7$." },
      { p: "Chiffrement de $m = 5$ : $c = 5^3 \\bmod 33 = 125 \\bmod 33 = 26$. Déchiffrement : $26^7 \\bmod 33 = 5$. La correction tient car $m^{ed} = m^{21} \\equiv m \\bmod 33$ : sans connaître $\\varphi(n) = 20$ (donc la factorisation), impossible de calculer $d$." },
    ] },
    { title: "Échange de clés de Diffie-Hellman", steps: [
      { p: "Paramètres publics : $p = 23$, $g = 5$. Alice tire son secret $a = 6$ et publie $A = 5^6 \\bmod 23 = 8$. Bob tire $b = 15$ et publie $B = 5^{15} \\bmod 23 = 19$." },
      { p: "Alice calcule $B^a = 19^6 \\bmod 23 = 2$ ; Bob calcule $A^b = 8^{15} \\bmod 23 = 2$ : tous deux obtiennent le **secret commun** $g^{ab} = 5^{90} \\bmod 23 = 2$. L'espion ne voit que $5, 8, 19$ et bute sur le logarithme discret pour retrouver $a$ ou $b$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Pourquoi ne peut-on pas simplement partager une clé secrète commune ? Qu'apporte une fonction à sens unique ?", solution: "Le problème est la **distribution des clés** : pour communiquer secrètement par chiffrement symétrique, il faut d'abord échanger une clé — mais sur un canal ouvert, un espion l'intercepte. La cryptographie à clé publique brise ce cercle grâce à une **fonction à sens unique avec trappe** : facile dans un sens (chiffrer avec la clé publique de tous), infaisable à inverser sans le secret (la clé privée). On peut alors publier de quoi chiffrer sans révéler de quoi déchiffrer — ou (Diffie-Hellman) fabriquer un secret commun à partir d'échanges publics." },
    { tier: "warmup", prompt: "Pour RSA avec $p = 5$, $q = 11$ et exposant public $e = 3$, calcule $n$, $\\varphi(n)$ et l'exposant privé $d$.", solution: "On a $n = pq = 55$ et $\\varphi(n) = (p-1)(q-1) = 4 \\times 10 = 40$. L'exposant privé est $d = e^{-1} \\bmod 40 = 3^{-1} \\bmod 40$. On cherche $d$ avec $3d \\equiv 1 \\bmod 40$ : $3 \\times 27 = 81 = 2 \\times 40 + 1 \\equiv 1$, donc $d = 27$. La clé publique est $(55, 3)$, la privée $d = 27$ (gardée secrète, car calculable seulement via $\\varphi(n)$, donc via la factorisation de $55$)." },
    { tier: "application", prompt: "Avec la clé RSA $n = 33$, $e = 3$, $d = 7$, chiffre le message $m = 4$, puis vérifie que le déchiffrement le restitue.", solution: "Chiffrement : $c = 4^3 \\bmod 33 = 64 \\bmod 33 = 31$. Déchiffrement : $c^d = 31^7 \\bmod 33$. Comme $31 \\equiv -2 \\bmod 33$, on calcule $(-2)^7 = -128$ ; or $128 = 3 \\times 33 + 29$, donc $128 \\equiv 29$ et $-128 \\equiv -29 \\equiv 4 \\bmod 33$. On retrouve bien $m = 4$. La correction illustre $m^{ed} = m^{21} \\equiv m \\bmod 33$ (Euler : $\\varphi(33) = 20$ et $21 \\equiv 1 \\bmod 20$)." },
    { tier: "challenge", prompt: "Dans l'échange de Diffie-Hellman, montre que les deux parties calculent bien le même secret, et explique pourquoi un espion ne peut pas le retrouver.", solution: "Paramètres publics $p$ (premier) et $g$ générateur de $\\mathbb{F}_p^*$. Alice tire $a$, publie $A = g^a \\bmod p$ ; Bob tire $b$, publie $B = g^b \\bmod p$. Alice calcule $B^a = (g^b)^a = g^{ab}$ ; Bob calcule $A^b = (g^a)^b = g^{ab}$ : **même** valeur $g^{ab} \\bmod p$, par commutativité des exposants. **L'espion** observe $p, g, A = g^a, B = g^b$ mais pas $a$ ni $b$. Pour retrouver le secret il devrait, soit résoudre le **logarithme discret** ($a$ depuis $g^a$), soit le **problème de Diffie-Hellman** ($g^{ab}$ depuis $g^a, g^b$) — tous deux sans algorithme efficace connu sur un grand $p$. La sécurité **se réduit** à la difficulté du logarithme discret ■." },
    { tier: "exam", prompt: "(1) Définis une fonction à sens unique avec trappe. (2) Décris RSA (clés, chiffrement, déchiffrement) et justifie sa correction. (3) Énonce le problème du logarithme discret. (4) Décris l'échange de Diffie-Hellman et la notion de sécurité par réduction.", solution: "(1) Une fonction **facile à calculer, infaisable à inverser** ; la **trappe** est un secret qui rend l'inversion facile.\n\n(2) **RSA** : $n = pq$, $\\varphi(n) = (p-1)(q-1)$, clé publique $(n, e)$ avec $\\gcd(e, \\varphi(n)) = 1$, clé privée $d = e^{-1} \\bmod \\varphi(n)$. Chiffrement $c = m^e \\bmod n$, déchiffrement $m = c^d \\bmod n$. **Correction** : $ed \\equiv 1 \\bmod \\varphi(n)$, donc $m^{ed} \\equiv m \\bmod n$ par le théorème d'Euler.\n\n(3) **DLP** : dans $\\langle g \\rangle$, retrouver $x$ tel que $g^x = h$ — difficile.\n\n(4) **Diffie-Hellman** : échange de $g^a, g^b$, secret commun $g^{ab}$. La **sécurité par réduction** : casser le système est calculatoirement équivalent à un problème difficile (factorisation pour RSA, logarithme discret pour DH) ■." },
  ],
  practice: [
    { tier: "discovery", label: "Exponentiation modulaire", make: (r) => {
      const p = pick(r, [7, 11, 13, 17, 19, 23]);
      const g = randint(r, 2, 5), x = randint(r, 3, 12);
      return { prompt: `Calcule $${g}^{${x}} \\bmod ${p}$ (le sens facile, celui du chiffrement).`, answer: modpow(g, x, p), solution: `Par exponentiation rapide, $${g}^{${x}} \\equiv ${modpow(g, x, p)} \\pmod{${p}}$.` };
    } },
    { tier: "warmup", label: "Exposant privé RSA", make: (r) => {
      const primes = [3, 5, 7, 11, 13];
      const p = pick(r, primes), q = pick(r, primes.filter((x) => x !== p));
      const phi = (p - 1) * (q - 1);
      const e = pick(r, [3, 5, 7, 11, 13, 17].filter((x) => x < phi && gcd(x, phi) === 1));
      const d = modinv(e, phi);
      return { prompt: `Pour RSA avec $\\varphi(n) = ${phi}$ et exposant public $e = ${e}$, quel est l'exposant privé $d = e^{-1} \\bmod ${phi}$ ?`, answer: d, solution: `On cherche $d$ tel que $${e}\\,d \\equiv 1 \\pmod{${phi}}$ : par l'algorithme d'Euclide étendu, $d = ${d}$ (car $${e} \\times ${d} \\equiv 1 \\bmod ${phi}$).` };
    } },
    { tier: "application", label: "Secret commun de Diffie-Hellman", make: (r) => {
      const p = pick(r, [11, 13, 17, 19, 23]);
      const g = pick(r, [2, 3, 5]), a = randint(r, 2, 8), b = randint(r, 2, 8);
      return { prompt: `Diffie-Hellman avec $p = ${p}$, $g = ${g}$, secret d'Alice $a = ${a}$, secret de Bob $b = ${b}$. Quel est le secret commun $g^{ab} \\bmod ${p}$ ?`, answer: modpow(g, a * b, p), solution: `Le secret commun est $${g}^{${a} \\times ${b}} = ${g}^{${a * b}} \\equiv ${modpow(g, a * b, p)} \\pmod{${p}}$ — la même valeur calculée par Alice ($B^a$) et Bob ($A^b$).` };
    } },
  ],
};

// — Trois points alignés s'annulent : la courbe devient un groupe —
const courbesElliptiques = {
  id: "algebra.master.courbes-elliptiques",
  level: "master", domain: "algebra",
  title: "Les courbes elliptiques",
  tagline: "Sur une courbe cubique, trois points alignés s'annulent : cette règle géométrique fait des points de la courbe un groupe, fondement d'une arithmétique d'une richesse insoupçonnée.",
  prereqs: ["algebra.bachelor.corps-finis", "algebra.master.extensions-corps"],
  intuition:
    "Une **courbe elliptique** est une cubique lisse $y^2 = x^3 + ax + b$. Fait remarquable : ses points forment un **groupe** abélien sous une loi géométrique. Pour additionner deux points $P$ et $Q$, on trace la droite qui les joint, on trouve son troisième point d'intersection avec la cubique, et on le **réfléchit** par rapport à l'axe des abscisses. L'élément neutre est un « point à l'infini » $O$.\n\nCette construction **cordes-tangentes** est purement un dessin, et pourtant elle vérifie tous les axiomes de groupe (l'associativité étant la partie profonde, non évidente). Les courbes elliptiques se tiennent au carrefour de la géométrie, de la théorie des nombres et de la cryptographie — et leurs points rationnels recèlent une arithmétique d'une profondeur immense (Mordell-Weil, Fermat par Wiles).",
  depths: {
    discovery:
      "**Avec les mains** : prends $y^2 = x^3 + 1$ sur $\\mathbb{R}$ et additionne deux points explicites. Les points $P = (-1, 0)$ et $Q = (0, 1)$ sont sur la courbe ($0 = -1 + 1$ ✓, $1 = 0 + 1$ ✓). La droite $(PQ)$ a pour pente $1$, soit $y = x + 1$. On substitue dans la cubique : $(x + 1)^2 = x^3 + 1$, d'où $x^3 - x^2 - 2x = 0$, soit $x(x - 2)(x + 1) = 0$. Le troisième point a pour abscisse $x = 2$, donc $y = 3$ : c'est $R = (2, 3)$. On réfléchit : $P + Q = (2, -3)$. Additionner, c'est « la droite recoupe la cubique en un troisième point, puis on réfléchit ».",
    standard:
      "**En image** : dessine la cubique (sur $\\mathbb{R}$, une ou deux composantes). Pour $P + Q$, trace la corde, touche le troisième point, réfléchis par rapport à l'axe des $x$. Pour **doubler** un point $P + P$, utilise la **tangente** en $P$ (la limite de la corde), touche le second point d'intersection, réfléchis.\n\nLe point à l'infini $O$ est l'élément neutre, situé « tout en haut » où se rejoignent les droites verticales ; $-P$ est le symétrique de $P$ par rapport à l'axe des $x$. La règle unique : **trois points alignés ont pour somme** $O$.",
    advanced:
      "**Dans la tête** : une **courbe elliptique** sur un corps $K$ (de caractéristique $\\neq 2, 3$) est une cubique projective lisse, en **forme de Weierstrass** $y^2 = x^3 + ax + b$ avec discriminant non nul $\\Delta = -16(4a^3 + 27b^2) \\neq 0$ (lissité). Ses points $E(K)$, augmentés du point à l'infini $O$, forment un **groupe abélien** : la **loi cordes-tangentes** — trois points sur une droite somment à $O$, donc $P + Q$ est le réfléchi du troisième point d'intersection ; $O$ est le neutre, $-P$ le réfléchi de $P$. L'**associativité** est vraie (par la géométrie, le groupe de Picard, ou des formules explicites). Des **formules d'addition** rationnelles en les coordonnées rendent $E(K)$ calculable. Le $j$-**invariant** classe les courbes à isomorphisme près sur $\\overline{K}$.\n\nSur $\\mathbb{Q}$, le **théorème de Mordell-Weil** : $E(\\mathbb{Q})$ est de type fini, $E(\\mathbb{Q}) \\cong \\mathbb{Z}^r \\oplus (\\text{torsion})$, où $r$ est le **rang** (profond, lié à la conjecture de Birch et Swinnerton-Dyer).\n\nBig idea *Diagrams* : la loi de groupe est un **diagramme géométrique** — corde, tangente, réflexion — et non une formule algébrique imposée de l'extérieur. La structure **émerge d'un dessin** (trois points alignés somment à zéro), et l'axiome le plus dur, l'associativité, est lui-même un énoncé sur neuf points et des droites (le théorème de Cayley-Bacharach : les deux façons de calculer $(P + Q) + R = P + (Q + R)$ donnent le même point). La géométrie dessine le groupe.",
  },
  keyIdea: "Une **courbe elliptique** $y^2 = x^3 + ax + b$ (lisse, $\\Delta \\neq 0$) a des points formant un **groupe abélien** via la **loi cordes-tangentes** (trois points alignés somment à $O$, le point à l'infini) ; les formules d'addition sont rationnelles. Sur $\\mathbb{Q}$, **Mordell-Weil** : $E(\\mathbb{Q}) \\cong \\mathbb{Z}^r \\oplus \\text{torsion}$. Big idea *Diagrams*.",
  why:
    "Les courbes elliptiques sont un objet central des mathématiques modernes : la preuve du dernier théorème de Fermat par Wiles (modularité), la conjecture de Birch et Swinnerton-Dyer (problème du millénaire), et l'épine dorsale de la cryptographie à courbes elliptiques (leçon suivante). Elles unissent la géométrie (cubiques), l'analyse (fonctions elliptiques, formes modulaires) et l'arithmétique (points rationnels).",
  examples: [
    { title: "Additionner deux points par la corde", steps: [
      { p: "Sur $y^2 = x^3 + 1$, prends $P = (-1, 0)$ et $Q = (0, 1)$. La droite $(PQ)$ est $y = x + 1$ (pente $1$). En substituant : $x^3 - x^2 - 2x = x(x-2)(x+1) = 0$, racines $-1, 0, 2$." },
      { p: "Le troisième point d'intersection a pour abscisse $x = 2$, donc $y = 3$ : $R = (2, 3)$. La somme est son réfléchi : $P + Q = (2, -3)$. La géométrie de la corde fournit l'addition." },
    ] },
    { title: "Un point d'ordre 2", steps: [
      { p: "Sur $y^2 = x^3 + 1$, le point $T = (-1, 0)$ a une ordonnée nulle. Son réfléchi par rapport à l'axe des $x$ est lui-même : $-T = T$." },
      { p: "Donc $T + T = O$ : le point $T$ est d'**ordre** $2$. Géométriquement, la tangente en un point d'ordonnée nulle est **verticale** et ne recoupe la cubique qu'à l'infini : doubler un tel point donne le neutre. Les points d'ordre $2$ sont exactement ceux avec $y = 0$, soit les racines de $x^3 + ax + b$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Décris géométriquement la loi de groupe sur une courbe elliptique. Quel est l'élément neutre ?", solution: "Pour additionner $P$ et $Q$ : on trace la droite $(PQ)$ (ou la **tangente** en $P$ si $P = Q$), qui recoupe la cubique en un troisième point $R$ ; alors $P + Q$ est le **réfléchi** de $R$ par rapport à l'axe des abscisses. La règle se résume à : **trois points alignés somment à** $O$. L'**élément neutre** est le **point à l'infini** $O$ (où se rejoignent toutes les droites verticales) ; l'opposé $-P$ est le symétrique de $P$ par rapport à l'axe des $x$." },
    { tier: "warmup", prompt: "Vérifie que $P = (3, 5)$ est sur la courbe $y^2 = x^3 - 2$, puis donne $-P$.", solution: "On vérifie : $x^3 - 2 = 27 - 2 = 25$ et $y^2 = 5^2 = 25$ : égalité, donc $P = (3, 5)$ est bien sur la courbe. L'opposé $-P$ est le réfléchi par rapport à l'axe des abscisses : $-P = (3, -5)$. On a alors $P + (-P) = O$ (la droite verticale $x = 3$ ne recoupe la courbe qu'à l'infini)." },
    { tier: "application", prompt: "Sur $y^2 = x^3 + 1$, additionne $P = (-1, 0)$ et $Q = (2, 3)$ par la méthode de la corde.", solution: "La droite $(PQ)$ a pour pente $m = \\frac{3 - 0}{2 - (-1)} = 1$, soit $y = x + 1$. On substitue dans $y^2 = x^3 + 1$ : $(x+1)^2 = x^3 + 1$, d'où $x^3 - x^2 - 2x = x(x-2)(x+1) = 0$. Les abscisses des trois points sont $-1, 2$ (nos points $P, Q$) et le troisième $x = 0$, donnant $y = 1$ : le point $(0, 1)$. On réfléchit : $P + Q = (0, -1)$. (La somme des trois abscisses $-1 + 2 + 0 = 0$ égale $m^2 = 1$ ? non : ici $m^2 - x_P - x_Q = 1 - (-1) - 2 = 0$, l'abscisse du troisième point — la formule de Vieta.)" },
    { tier: "challenge", prompt: "Montre qu'un point $T = (x_0, 0)$ d'ordonnée nulle est d'ordre $2$, et que les points d'ordre divisant $2$ correspondent aux racines de $x^3 + ax + b$.", solution: "Si $T = (x_0, 0)$, son réfléchi est $-T = (x_0, -0) = (x_0, 0) = T$. Donc $T + T = T + (-T) = O$ : $T$ est d'**ordre** $2$ (ou $1$ si $T = O$, exclu ici). Géométriquement, la tangente en un point d'ordonnée nulle est verticale (car $\\frac{dy}{dx} = \\frac{3x^2 + a}{2y} \\to \\infty$ quand $y \\to 0$) et ne recoupe la cubique qu'en $O$, d'où $2T = O$. Réciproquement, $T$ vérifie $2T = O$ ssi $-T = T$, ssi son ordonnée est nulle, ssi $y = 0$, c'est-à-dire $x_0^3 + a x_0 + b = 0$. Les points de $2$-**torsion** sont donc $O$ et les points $(x_0, 0)$ avec $x_0$ racine de $x^3 + ax + b$ : sur un corps algébriquement clos, cela donne le groupe $(\\mathbb{Z}/2)^2$ ■." },
    { tier: "exam", prompt: "(1) Donne la forme de Weierstrass et la condition de lissité. (2) Définis la loi de groupe (cordes-tangentes, neutre, opposé). (3) Quel axiome est difficile, et pourquoi ? (4) Énonce le théorème de Mordell-Weil.", solution: "(1) **Forme de Weierstrass** : $y^2 = x^3 + ax + b$ sur un corps de caractéristique $\\neq 2, 3$, **lisse** ssi le discriminant $\\Delta = -16(4a^3 + 27b^2) \\neq 0$ (pas de point singulier).\n\n(2) **Loi de groupe** : $P + Q$ = réfléchi du troisième point d'intersection de la droite $(PQ)$ (ou de la tangente si $P = Q$) avec la cubique ; règle « trois points alignés somment à $O$ ». **Neutre** : le point à l'infini $O$. **Opposé** : $-P$ = symétrique de $P$ par rapport à l'axe des $x$.\n\n(3) L'**associativité** $(P + Q) + R = P + (Q + R)$ est l'axiome difficile : il n'est pas évident géométriquement et se démontre via le théorème de Cayley-Bacharach (ou le groupe de Picard, ou les formules explicites).\n\n(4) **Mordell-Weil** : sur $\\mathbb{Q}$ (ou un corps de nombres), $E(\\mathbb{Q})$ est un groupe abélien **de type fini** : $E(\\mathbb{Q}) \\cong \\mathbb{Z}^r \\oplus T$ avec $T$ la torsion (finie) et $r$ le **rang** ■." },
  ],
  practice: [
    { tier: "discovery", label: "Quantité de lissité", make: (r) => {
      let a = randint(r, -4, 4), b = randint(r, -4, 4);
      let q = 4 * a * a * a + 27 * b * b;
      if (q === 0) { b += 1; q = 4 * a * a * a + 27 * b * b; }
      return { prompt: `La courbe $y^2 = x^3 + ${a}x + ${b}$ est lisse ssi $4a^3 + 27b^2 \\neq 0$. Calcule $4a^3 + 27b^2$.`, answer: q, solution: `$4(${a})^3 + 27(${b})^2 = ${4 * a * a * a} + ${27 * b * b} = ${q}$ ($\\neq 0$, la courbe est bien lisse).` };
    } },
    { tier: "warmup", label: "Ordonnée au carré sur la courbe", make: (r) => {
      const a = randint(r, -3, 3), b = randint(r, -3, 5), x = randint(r, 0, 4);
      const y2 = x * x * x + a * x + b;
      return { prompt: `Sur la courbe $y^2 = x^3 + ${a}x + ${b}$, quelle valeur doit valoir $y^2$ pour le point d'abscisse $x = ${x}$ ?`, answer: y2, solution: `$y^2 = ${x}^3 + ${a}\\times${x} + ${b} = ${x * x * x} + ${a * x} + ${b} = ${y2}$.` };
    } },
    { tier: "application", label: "Abscisse du troisième point", make: (r) => {
      const m = randint(r, 1, 5), x1 = randint(r, -3, 3), x2 = randint(r, -3, 3);
      const x3 = m * m - x1 - x2;
      return { prompt: `Lors d'une addition sur une courbe elliptique, la droite de pente $m = ${m}$ passe par les points d'abscisses $x_1 = ${x1}$ et $x_2 = ${x2}$. L'abscisse du troisième point est $x_3 = m^2 - x_1 - x_2$. Que vaut $x_3$ ?`, answer: x3, solution: `$x_3 = ${m}^2 - (${x1}) - (${x2}) = ${m * m} - ${x1} - ${x2} = ${x3}$ (relation de Vieta sur la cubique).` };
    } },
  ],
};

// — Sur un corps fini : Hasse encadre, le log discret elliptique protège —
const courbesElliptiquesCorpsFinis = {
  id: "algebra.master.courbes-elliptiques-corps-finis",
  level: "master", domain: "algebra",
  title: "Courbes elliptiques sur les corps finis et cryptographie",
  tagline: "Sur un corps fini, une courbe elliptique a un nombre de points encadré par Hasse ; son groupe, où le logarithme discret est redoutable, porte la cryptographie elliptique moderne.",
  prereqs: ["algebra.master.courbes-elliptiques", "algebra.master.cryptographie-cles-publiques"],
  intuition:
    "Sur un corps fini $\\mathbb{F}_p$, une courbe elliptique n'a qu'un **nombre fini** de points — un groupe abélien fini. Le **théorème de Hasse** affirme que $\\#E(\\mathbb{F}_p)$ est très proche de $p + 1$ : $|\\#E(\\mathbb{F}_p) - (p + 1)| \\le 2\\sqrt{p}$.\n\nCe groupe est la scène idéale de la cryptographie : le **problème du logarithme discret elliptique** (étant donnés $P$ et $kP$, retrouver $k$) est encore plus dur que le logarithme discret classique, si bien que la **cryptographie à courbes elliptiques (ECC)** atteint la même sécurité que RSA avec des clés bien plus courtes. ECDH (Diffie-Hellman sur une courbe), ECDSA (signatures). En prime, la méthode **ECM** de Lenstra utilise les courbes elliptiques pour **factoriser** les entiers.",
  depths: {
    discovery:
      "**Avec les mains** : comptons les points de $y^2 = x^3 + x + 1$ sur $\\mathbb{F}_5$. Les carrés modulo $5$ sont $\\{0, 1, 4\\}$. Pour chaque $x$, on calcule $f(x) = x^3 + x + 1 \\bmod 5$ et on regarde si c'est un carré : $x = 0 \\to 1$ (carré, $\\pm 1$ : $2$ points) ; $x = 1 \\to 3$ (non carré : $0$ point) ; $x = 2 \\to 11 \\equiv 1$ (carré : $2$ points) ; $x = 3 \\to 31 \\equiv 1$ (carré : $2$ points) ; $x = 4 \\to 69 \\equiv 4$ (carré, $\\pm 2$ : $2$ points). Total affine $= 8$, plus le point à l'infini $O$ : $\\#E = 9$. Vérifie Hasse : $|9 - 6| = 3 \\le 2\\sqrt{5} \\approx 4{,}47$ ✓. On compte en testant les carrés, et on ajoute le point à l'infini.",
    standard:
      "**En image** : les points de la courbe ne forment plus une courbe lisse mais un **nuage de points** sur la grille $\\mathbb{F}_p \\times \\mathbb{F}_p$ (les couples vérifiant l'équation), plus $O$. Hasse dit que ce nuage compte un nombre de points **serré autour de** $p + 1$, dans une fenêtre de largeur $4\\sqrt{p}$ : la **trace de Frobenius** $a = p + 1 - \\#E$ vérifie $|a| \\le 2\\sqrt{p}$.\n\nPour la cryptographie, image qu'on **ajoute** un point de base $P$ à lui-même $k$ fois pour obtenir $kP$ — facile dans ce sens, mais retrouver $k$ à partir de $kP$ (le logarithme discret sur la courbe) est infaisable. C'est le cadenas elliptique.",
    advanced:
      "**Dans la tête** : sur $\\mathbb{F}_p$, $E(\\mathbb{F}_p)$ est un **groupe abélien fini**, isomorphe à $\\mathbb{Z}/m$ ou $\\mathbb{Z}/m_1 \\times \\mathbb{Z}/m_2$. **Théorème de Hasse** : $\\#E(\\mathbb{F}_p) = p + 1 - a_p$ avec la **trace de Frobenius** $|a_p| \\le 2\\sqrt{p}$, donc le compte tombe dans $[\\,p + 1 - 2\\sqrt{p},\\ p + 1 + 2\\sqrt{p}\\,]$. (L'algorithme de **Schoof** compte les points en temps polynomial.)\n\n**Problème du logarithme discret elliptique (ECDLP)** : étant donnés $P$ et $Q = kP$ dans $E(\\mathbb{F}_p)$, retrouver $k$ — aucun algorithme sous-exponentiel n'est connu (contrairement à $\\mathbb{F}_p^*$ où le calcul d'indices existe), d'où une sécurité égale à clé bien plus courte (ECC $256$ bits $\\approx$ RSA $3072$ bits). **ECDH** : Alice et Bob échangent $aP$ et $bP$, partagent $abP$. **ECDSA** : l'analogue elliptique des signatures DSA (TLS, Bitcoin). **ECM de Lenstra** : factoriser $n$ en travaillant sur une courbe elliptique aléatoire modulo $n$, un facteur apparaissant quand l'ordre du groupe est friable — un algorithme de factorisation majeur.\n\nBig idea *Measures* : le théorème de Hasse est une **mesure** — il fixe la taille de $E(\\mathbb{F}_p)$ à $2\\sqrt{p}$ près de $p + 1$, quantifiant la fluctuation du nombre de points autour de la valeur « attendue » $p + 1$ via la trace de Frobenius $a_p$ (dont la distribution, quand $p$ varie, est le demi-cercle de Sato-Tate). L'arithmétique de la courbe est gouvernée par cette quantité mesurée $\\#E$, et la sécurité de l'ECC repose sur la taille et la structure de ce groupe fini.",
  },
  keyIdea: "Sur $\\mathbb{F}_p$, $E(\\mathbb{F}_p)$ est un groupe abélien fini avec la **borne de Hasse** $|\\#E(\\mathbb{F}_p) - (p + 1)| \\le 2\\sqrt{p}$ (trace de Frobenius $a_p$) ; le **logarithme discret elliptique** (retrouver $k$ depuis $kP$) n'a pas d'attaque sous-exponentielle connue, ce qui fonde l'**ECC** (ECDH, ECDSA) à clés courtes ; l'**ECM de Lenstra** factorise via les courbes. Big idea *Measures*.",
  why:
    "La cryptographie à courbes elliptiques sécurise les systèmes modernes — TLS 1.3, Signal, Bitcoin et Ethereum (ECDSA sur secp256k1), SSH — avec des clés compactes, précisément parce que l'ECDLP résiste aux attaques par calcul d'indices qui affaiblissent $\\mathbb{F}_p^*$. Le théorème de Hasse et le comptage de points (Schoof) rendent le choix des courbes rigoureux, et l'ECM reste un outil de factorisation. C'est la leçon où l'arithmétique de KingDown rejoint le fil.",
  examples: [
    { title: "Compter les points sur F_5", steps: [
      { p: "Sur $y^2 = x^3 + x + 1$ sur $\\mathbb{F}_5$, carrés $= \\{0, 1, 4\\}$. Valeurs de $f(x) = x^3 + x + 1$ : $f(0) = 1$, $f(1) = 3$, $f(2) \\equiv 1$, $f(3) \\equiv 1$, $f(4) \\equiv 4$. Sont des carrés : $x = 0, 2, 3, 4$ (deux points chacun), pas $x = 1$." },
      { p: "Total : $4 \\times 2 = 8$ points affines, plus le point à l'infini $O$, soit $\\#E = 9$. Vérification de Hasse : $p + 1 = 6$ et $|9 - 6| = 3 \\le 2\\sqrt{5} \\approx 4{,}47$ — le compte est bien dans la fenêtre." },
    ] },
    { title: "La fenêtre de Hasse", steps: [
      { p: "Pour $p = 23$, le théorème de Hasse donne $\\#E \\in [\\,24 - 2\\sqrt{23},\\ 24 + 2\\sqrt{23}\\,]$. Comme $2\\sqrt{23} \\approx 9{,}59$, on a $\\#E \\in [\\,15,\\ 33\\,]$ (entiers)." },
      { p: "Quel que soit le choix de $a, b$, une courbe elliptique sur $\\mathbb{F}_{23}$ a donc entre $15$ et $33$ points. La trace $a = 24 - \\#E$ varie dans $[-9, 9]$ : Hasse mesure exactement l'amplitude de cette fluctuation autour de $p + 1 = 24$." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Compte les points de la courbe $y^2 = x^3 + 2$ sur $\\mathbb{F}_5$ (carrés modulo $5$ : $0, 1, 4$).", solution: "On calcule $f(x) = x^3 + 2 \\bmod 5$ pour chaque $x$ : $f(0) = 2$ (non carré, $0$ point) ; $f(1) = 3$ (non carré, $0$) ; $f(2) = 10 \\equiv 0$ (carré, et $= 0$ donc $1$ point, $y = 0$) ; $f(3) = 29 \\equiv 4$ (carré, $2$ points) ; $f(4) = 66 \\equiv 1$ (carré, $2$ points). Total affine $= 0 + 0 + 1 + 2 + 2 = 5$, plus le point à l'infini $O$ : $\\#E = 6$. Vérification : $|6 - 6| = 0 \\le 2\\sqrt{5}$ ✓ (ici $\\#E = p + 1$ exactement, la courbe est dite supersingulière)." },
    { tier: "warmup", prompt: "Énonce le théorème de Hasse et calcule l'intervalle des valeurs possibles de $\\#E(\\mathbb{F}_p)$ pour $p = 13$.", solution: "**Théorème de Hasse** : $|\\#E(\\mathbb{F}_p) - (p + 1)| \\le 2\\sqrt{p}$, c'est-à-dire $\\#E \\in [\\,p + 1 - 2\\sqrt{p},\\ p + 1 + 2\\sqrt{p}\\,]$. Pour $p = 13$ : $p + 1 = 14$ et $2\\sqrt{13} \\approx 7{,}21$, donc $\\#E \\in [\\,14 - 7{,}21,\\ 14 + 7{,}21\\,]$, soit $\\#E \\in \\{7, 8, \\ldots, 21\\}$. Toute courbe elliptique sur $\\mathbb{F}_{13}$ a entre $7$ et $21$ points." },
    { tier: "application", prompt: "Une courbe sur $\\mathbb{F}_{101}$ a $\\#E = 96$ points. Calcule la trace de Frobenius $a_p$ et vérifie qu'elle respecte la borne de Hasse.", solution: "La trace est $a_p = p + 1 - \\#E = 101 + 1 - 96 = 6$. La borne de Hasse impose $|a_p| \\le 2\\sqrt{101} \\approx 20{,}1$ : ici $|6| = 6 \\le 20{,}1$ ✓. La courbe a $6$ points de « moins » que la valeur centrale $p + 1 = 102$, une fluctuation bien dans la fenêtre autorisée." },
    { tier: "challenge", prompt: "Pourquoi la cryptographie à courbes elliptiques offre-t-elle plus de sécurité par bit que RSA ? Évoque aussi le principe de la factorisation ECM.", solution: "**Sécurité par bit** : sur $\\mathbb{F}_p^*$, le logarithme discret cède à l'algorithme de **calcul d'indices** (index calculus), sous-exponentiel, ce qui force de grandes clés (RSA, DLP classique). Sur une courbe elliptique, **aucun** algorithme sous-exponentiel n'est connu pour l'ECDLP : la meilleure attaque générique (rho de Pollard) est en $O(\\sqrt{N})$, exponentielle en la taille des clés. À sécurité égale, les clés ECC sont donc bien plus courtes ($256$ bits ECC $\\approx 3072$ bits RSA), d'où des calculs et des certificats plus légers.\n\n**ECM (Lenstra)** : pour factoriser $n$, on choisit une courbe elliptique aléatoire **modulo** $n$ et on calcule $k!\\cdot P$ pour $k$ croissant. Les opérations exigent d'inverser des éléments modulo $n$ ; si l'ordre de la courbe modulo un facteur premier $p \\mid n$ est **friable** (produit de petits premiers), une inversion échoue et $\\gcd$ révèle le facteur $p$. En variant la courbe, on multiplie les chances — d'où un algorithme particulièrement efficace pour extraire des facteurs de taille moyenne ■." },
    { tier: "exam", prompt: "(1) Quelle est la structure de $E(\\mathbb{F}_p)$ ? (2) Énonce le théorème de Hasse et définis la trace de Frobenius. (3) Définis l'ECDLP et explique l'avantage de l'ECC. (4) Cite deux applications cryptographiques et le principe de l'ECM.", solution: "(1) $E(\\mathbb{F}_p)$ est un **groupe abélien fini**, isomorphe à $\\mathbb{Z}/m$ ou $\\mathbb{Z}/m_1 \\times \\mathbb{Z}/m_2$.\n\n(2) **Hasse** : $\\#E(\\mathbb{F}_p) = p + 1 - a_p$ avec $|a_p| \\le 2\\sqrt{p}$ ; $a_p$ est la **trace de Frobenius**, mesurant l'écart à la valeur centrale $p + 1$.\n\n(3) **ECDLP** : retrouver $k$ tel que $Q = kP$ dans $E(\\mathbb{F}_p)$. Sans algorithme sous-exponentiel connu, l'ECC atteint la sécurité de RSA avec des clés bien plus courtes.\n\n(4) **ECDH** (échange de clés) et **ECDSA** (signatures), utilisés dans TLS, SSH, Bitcoin. L'**ECM de Lenstra** factorise $n$ via une courbe modulo $n$ : un facteur surgit quand l'ordre du groupe modulo $p \\mid n$ est friable ■." },
  ],
  practice: [
    { tier: "discovery", label: "Compter les points sur F_p", make: (r) => {
      const p = pick(r, [5, 7, 11, 13]);
      let a = randint(r, 0, p - 1), b = randint(r, 1, p - 1), guard = 0;
      while ((((4 * a * a * a + 27 * b * b) % p) + p) % p === 0 && guard < p) { b = (b % (p - 1)) + 1; guard++; }
      let count = 1; // point à l'infini
      for (let x = 0; x < p; x++) {
        const f = ((((x * x % p) * x % p) + a * x % p + b) % p + p) % p;
        for (let y = 0; y < p; y++) if ((y * y) % p === f) count++;
      }
      return { prompt: `Combien de points (point à l'infini compris) la courbe $y^2 = x^3 + ${a}x + ${b}$ a-t-elle sur $\\mathbb{F}_{${p}}$ ?`, answer: count, solution: `En testant chaque $x \\in \\mathbb{F}_{${p}}$ et en comptant les $y$ tels que $y^2 = x^3 + ${a}x + ${b}$, on trouve $${count - 1}$ points affines, plus le point à l'infini : $\\#E = ${count}$ (borne de Hasse : $|${count} - ${p + 1}| \\le 2\\sqrt{${p}}$).` };
    } },
    { tier: "warmup", label: "Trace de Frobenius", make: (r) => {
      const p = pick(r, [11, 13, 17, 19, 23, 29, 31]);
      const bound = Math.floor(2 * Math.sqrt(p));
      const sE = p + 1 - randint(r, -bound, bound);
      return { prompt: `Une courbe sur $\\mathbb{F}_{${p}}$ a $\\#E = ${sE}$ points. Quelle est la trace de Frobenius $a_p = p + 1 - \\#E$ ?`, answer: p + 1 - sE, solution: `$a_p = ${p} + 1 - ${sE} = ${p + 1 - sE}$ (et $|a_p| \\le 2\\sqrt{${p}} \\approx ${(2 * Math.sqrt(p)).toFixed(1)}$).` };
    } },
    { tier: "application", label: "Nombre maximal de points (Hasse)", make: (r) => {
      const p = pick(r, [13, 17, 19, 23, 29, 31, 37, 41]);
      const maxE = p + 1 + Math.floor(2 * Math.sqrt(p));
      return { prompt: `Par le théorème de Hasse, quel est le nombre **maximal** de points $\\#E(\\mathbb{F}_{${p}})$ possible ? (utilise $\\#E \\le p + 1 + \\lfloor 2\\sqrt{p} \\rfloor$)`, answer: maxE, solution: `$\\#E \\le ${p} + 1 + \\lfloor 2\\sqrt{${p}} \\rfloor = ${p + 1} + ${Math.floor(2 * Math.sqrt(p))} = ${maxE}$.` };
    } },
  ],
};

export default [cryptographieClesPubliques, courbesElliptiques, courbesElliptiquesCorpsFinis];
