// Field "Algebra / Analysis" — HIGH module (seconde-pro year), voie
// professionnelle. Official 2de pro programme, domain "Algèbre – Analyse":
// RÉSOLUTION D'UN PROBLÈME DU PREMIER DEGRÉ (translate a problem into a
// first-degree equation or inequality, solve algebraically and graphically,
// flowchart formalization), FONCTIONS (the function notion, AFFINE functions:
// slope/intercept, link slope-direction of variation, graphical reading) and
// SYSTEMS of two first-degree equations with two unknowns (graphical and
// numerical resolution). Singapore method: the BAR MODEL is the central
// pictorial tool for translating problems (the part-whole and comparison
// models); contexts are trade-based (quotes, invoices, mixtures); big ideas
// named (Equivalence for equations, Notations for functions).
import { randint, pick } from "../../core/exercises.js";

// — First-degree problems (programme: traduire, résoudre, organigramme) —
const premierDegre = {
  id: "algebra.high.premier-degre",
  level: "high", domain: "algebra",
  title: "Résoudre un problème du premier degré",
  tagline: "Modéliser par une équation du premier degré et la résoudre (contexte professionnel).",
  prereqs: ["algebra.middle.inequations", "analysis.middle.lineaire-affine"],
  intuition:
    "Un devis : la pose coûte 40 € fixes plus 15 € par mètre — budget 190 € : combien de mètres ? Le problème du métier se **traduit** : $15x + 40 = 190$.\n\nLa méthode Singapour donne le geste avant la lettre : **dessine la barre** — le total 190 d'un côté ; en face, un bloc « 40 » et $x$ blocs « 15 » : l'équation se *voit* avant de s'écrire.",
  depths: {
    discovery:
      "**Avec les mains** : matérialise — le budget est une planche de 190 cm ; pose dessus le bloc fixe de 40 cm : il reste 150 cm pour les blocs de 15 — combien en tiennent ? $150 \\div 15 = 10$ : tu viens de résoudre l'équation **sans algèbre** : retirer le fixe, partager le reste — le raisonnement concret est déjà la solution.",
    standard:
      "**En image** : le **modèle en barres** structure la traduction — barre du tout (190) ; en dessous, barre découpée : [ 40 | 15 | 15 | … | 15 ] — le schéma DIT l'équation $40 + 15x = 190$ ; et la résolution algébrique refait le geste en symboles : $15x = 190 - 40 = 150$ (retirer le fixe), $x = 150 \\div 15 = 10$ (partager) — chaque ligne d'algèbre est un coup de ciseaux dans la barre : big idea *Equivalence* — transformer sans changer la valeur.",
    advanced:
      "**Dans la tête** : les **inéquations** suivent — « budget **maximum** 190 € » se traduit $15x + 40 \\leq 190$ : mêmes gestes, et la solution est un **intervalle** ($x \\leq 10$ : jusqu'à 10 mètres) — attention au seul piège : multiplier ou diviser par un négatif **retourne** le sens. Et le programme demande de **formaliser par un organigramme** : losange « $a$ est-il positif ? », branches oui/non, rectangles d'action — la résolution devient une procédure que la machine exécuterait : l'algèbre du chantier, prête pour l'algorithmique.",
  },
  keyIdea: "Traduire = **dessiner la barre** (le tout d'un côté, fixe + parts de l'autre), puis l'équation suit : $ax + b = c$ ⟹ retirer le fixe, partager — big idea *Equivalence* : chaque étape transforme sans changer la valeur. Inéquation : pareil, et le sens se **retourne** en divisant par un négatif.",
  why:
    "Pourquoi l'algèbre quand le bon sens suffit parfois ? Parce que le bon sens plafonne vite (trois contraintes, des décimaux, un taux…) tandis que la méthode barre→équation→résolution est **industrielle** : elle traite tous les devis, toutes les marges, tous les dosages de la même façon — et l'organigramme final montre où ça mène : ta procédure deviendra un programme, et le tableur de l'entreprise exécutera ton raisonnement mille fois par jour.",
  examples: [
    { title: "La barre du devis", steps: [
      { p: "190 € au total ; barre : [ 40 (fixe) | 15 | 15 | … ] — l'équation se lit : $40 + 15x = 190$." },
      { p: "Retire le fixe (150), partage par 15 : $x = 10$ mètres — le schéma a tout fait." },
    ] },
    { title: "Le sens qui se retourne", steps: [
      { p: "$-2x \\leq 6$ : divise par $-2$ — le sens bascule : $x \\geq -3$." },
      { p: "Vérifie avec $x = 0$ : $0 \\leq 6$ ✓ — le test d'une valeur attrape toujours l'erreur de sens." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une location d'outillage : 25 € fixes + 8 € par jour. Tu paies 81 €. Dessine la barre (décris-la), pose l'équation et résous.", solution: "Barre du tout : 81 ; dessous : [ 25 | 8 | 8 | … ] — équation $8x + 25 = 81$ ; retire le fixe : $8x = 56$, partage : $x = $ **7 jours** — le bar model traduit, l'algèbre exécute : deux gestes, le devis est lu." },
    { tier: "warmup", prompt: "Résous $5x - 12 = 23$ puis $3x + 7 = x + 19$ (regroupe d'abord les $x$).", solution: "$5x = 35$ : $x = $ **7** ; pour la seconde : $3x - x = 19 - 7$ soit $2x = 12$ : $x = $ **6** — regrouper les inconnues d'un côté, les nombres de l'autre : l'équivalence à chaque ligne, et la vérification ($3 \\times 6 + 7 = 25 = 6 + 19$ ✓) signe le travail." },
    { tier: "application", prompt: "Un artisan facture 35 € de déplacement plus 28 € de l'heure. Le client dispose de 175 € maximum. Traduis par une inéquation et donne le nombre d'heures possible.", solution: "$28x + 35 \\leq 175$ — retire le fixe : $28x \\leq 140$, partage : $x \\leq $ **5 heures** — la barre plafonnée : le fixe occupe 35, il reste 140 à découper en heures de 28 — l'inéquation dit « jusqu'où », pas « exactement »." },
    { tier: "challenge", prompt: "Deux offres d'intérim : A paie 11 € de l'heure ; B paie 9 € de l'heure plus une prime fixe de 30 €. À partir de combien d'heures l'offre A devient-elle la meilleure ? (équation du point d'égalité, puis conclusion en inéquation.)", solution: "Égalité : $11x = 9x + 30$ ⟹ $2x = 30$ ⟹ $x = 15$ h — en dessous, la prime de B domine ; au-dessus, le meilleur taux horaire de A l'emporte : **A gagne dès plus de 15 heures** — le « point d'égalité puis qui dépasse » est LE raisonnement de comparaison d'offres, et tu le referas en fonctions affines à la leçon suivante : deux droites qui se croisent." },
    { tier: "exam", prompt: "Une cuisine collective prépare un buffet : le traiteur facture 180 € de forfait plus 12,50 € par convive ; le budget est de 555 €. (1) Modèle en barres : décris-le. (2) Équation et nombre de convives. (3) Le budget passe à « au plus 480 € » : inéquation et conclusion. (4) Esquisse l'organigramme de résolution de $ax + b \\leq c$ (cas $a > 0$).", solution: "(1) Barre du tout 555 ; dessous [ 180 | 12,50 × $x$ parts ] — le forfait puis les convives. (2) $12{,}5x + 180 = 555$ ⟹ $12{,}5x = 375$ ⟹ $x = $ **30 convives**. (3) $12{,}5x + 180 \\leq 480$ ⟹ $x \\leq 24$ : **au plus 24 convives**. (4) Organigramme : lire $a, b, c$ → calculer $c - b$ → diviser par $a$ → afficher « $x \\leq \\frac{c - b}{a}$ » (losange préalable : « $a > 0$ ? » — sinon retourner le sens) — la barre a traduit, l'algèbre a résolu, l'organigramme a industrialisé : la chaîne complète du chapitre, du buffet au programme." },
  ],
  practice: [
    { tier: "warmup", label: "Retirer, partager", make: (r) => {
      const a = pick(r, [4, 5, 8]); const b = randint(r, 10, 40); const x = randint(r, 3, 12);
      return { prompt: `$${a}x + ${b} = ${a * x + b}$ : $x = \\,?$`, answer: x, solution: `Retire ${b} (reste ${a * x}), partage par ${a} : $x = $ **${x}**.` };
    } },
    { tier: "application", label: "Le devis traduit", make: (r) => {
      const fixe = pick(r, [20, 30, 40]); const taux = pick(r, [8, 12, 15]); const x = randint(r, 4, 10);
      return { prompt: `Forfait ${fixe} € + ${taux} €/unité, total ${fixe + taux * x} € : combien d'unités ?`, answer: x, solution: `Barre : [ ${fixe} | ${taux} × ? ] — $(${fixe + taux * x} - ${fixe}) \\div ${taux} = $ **${x}**.` };
    } },
    { tier: "challenge", label: "Le sens de l'inéquation", make: (r) => {
      const a = pick(r, [2, 3, 4]); const x = randint(r, 3, 9); const neg = r() < 0.5;
      return { prompt: neg ? `$-${a}x \\geq ${-a * x}$ : $x \\leq \\,?$` : `$${a}x \\leq ${a * x}$ : $x \\leq \\,?$`, answer: x, solution: `${neg ? "Division par $-" + a + "$ : le sens **se retourne** — " : ""}$x \\leq $ **${x}**.` };
    } },
  ],
};

// — Affine functions (programme: coefficient directeur, lecture graphique) —
const fonctionsAffines = {
  id: "analysis.high.fonctions-affines",
  level: "high", domain: "analysis",
  title: "Fonctions affines et droites de tarifs",
  tagline: "f(x) = ax + b — la pente est le prix unitaire, l'ordonnée le forfait.",
  prereqs: ["analysis.middle.fonctions-notation", "analysis.middle.lineaire-affine"],
  intuition:
    "Ton devis $15x + 40$ est une **fonction** : à chaque métrage $x$, un prix $f(x) = 15x + 40$ — la machine à calculer du chapitre précédent devient un objet d'étude.\n\nSa courbe est une **droite** : le **coefficient directeur** $a = 15$ (le prix du mètre : la pente) et l'**ordonnée à l'origine** $b = 40$ (le forfait : où la droite coupe l'axe) — la facture entière, dans deux nombres.",
  depths: {
    discovery:
      "**Avec les mains** : dresse le tableau du tarif — 0 m → 40 €, 1 m → 55 €, 2 m → 70 €, 3 m → 85 € : chaque mètre ajoute **15** (le pas régulier !) et le départ vaut **40** — une fonction affine se reconnaît à son tableau : accroissements constants — c'est le tarif au compteur, le taxi, l'abonnement + consommation.",
    standard:
      "**En image** : trace les points : ils s'**alignent** — la droite monte de 15 chaque fois qu'on avance de 1 : la **pente** se lit sur le graphique ($a = \\dfrac{\\text{montée}}{\\text{avancée}}$, le triangle de pente), et $b$ se lit à l'intersection avec l'axe vertical — deux tarifs sur le même graphique : les droites se **croisent** au point d'égalité (ton intérim de la leçon passée !), et la plus basse à droite du croisement est la meilleure offre — comparer des offres, c'est lire des droites.",
    advanced:
      "**Dans la tête** : la notation porte tout — big idea *Notations* : écrire $f(x) = ax + b$ condense le tarif entier en une formule manipulable : $f(7)$ calcule un devis, résoudre $f(x) = 190$ retrouve le métrage, et le **signe** de $a$ dicte le sens de variation ($a > 0$ : croissante — le prix monte avec la quantité ; $a < 0$ : décroissante — la valeur d'un matériel qui se déprécie de 200 €/an : $f(x) = 3000 - 200x$). Déterminer $a$ et $b$ depuis deux points (deux devis connus !) : $a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ — l'accroissement des prix sur l'accroissement des quantités : le taux, qui deviendra la dérivée en première.",
  },
  keyIdea: "$f(x) = ax + b$ — $a$ : **la pente** (le prix unitaire : montée/avancée, signe = sens de variation), $b$ : **l'ordonnée à l'origine** (le forfait). Tableau : accroissements constants ; graphique : une droite ; deux points suffisent : $a = \\frac{\\Delta f}{\\Delta x}$ — big idea *Notations* : la formule condense le tarif entier.",
  why:
    "Pourquoi étudier la plus simple des fonctions ? Parce qu'elle est partout dans le métier — tarifs, salaires (fixe + commission), amortissements, conversions d'unités, étalonnages de machines — et parce qu'elle est l'**étalon** de toutes les autres : en première, dériver une courbe quelconque reviendra à lui coller une droite en chaque point. Maîtriser pente et ordonnée, c'est posséder la brique de base de toute la modélisation.",
  examples: [
    { title: "Le tarif lu sur la droite", steps: [
      { p: "$f(x) = 15x + 40$ : la droite coupe l'axe en 40 (le forfait) et monte de 15 par mètre (la pente)." },
      { p: "$f(10) = 190$ — le devis du chapitre précédent, devenu un point de la droite." },
    ] },
    { title: "La pente depuis deux devis", steps: [
      { p: "3 m → 85 € et 7 m → 145 € : $a = \\dfrac{145 - 85}{7 - 3} = \\dfrac{60}{4} = 15$ €/m." },
      { p: "Puis $b = 85 - 15 \\times 3 = 40$ — deux points, le tarif entier reconstruit." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un taxi : prise en charge 4 €, puis 2 € du kilomètre. Écris $f(x)$, dresse le tableau pour $x = 0, 1, 2, 5$, et vérifie le pas régulier.", solution: "$f(x) = 2x + 4$ — tableau : 4, 6, 8, 14 : chaque kilomètre ajoute **2** (accroissements constants : la signature de l'affine), et le départ vaut **4** (l'ordonnée à l'origine) — le compteur du taxi est une fonction affine qui tourne." },
    { tier: "warmup", prompt: "Sur un graphique, une droite de tarif passe par $(0\\,;\\,30)$ et monte de 12 quand on avance de 1. Donne $a$, $b$, l'expression de $f$, et $f(6)$.", solution: "$a = $ **12** (la pente : 12 € par unité), $b = $ **30** (le forfait, lu sur l'axe) : $f(x) = 12x + 30$ — et $f(6) = $ **102 €** : lire la droite, c'est lire le tarif." },
    { tier: "application", prompt: "Deux devis du même peintre : 3 h → 95 € et 8 h → 220 €. Retrouve le tarif complet $f(x) = ax + b$ — que représentent $a$ et $b$ pour le client ?", solution: "$a = \\dfrac{220 - 95}{8 - 3} = \\dfrac{125}{5} = $ **25 €/h** (le taux horaire — la pente) ; $b = 95 - 25 \\times 3 = $ **20 €** (le forfait déplacement) : $f(x) = 25x + 20$ — deux factures suffisent à percer le tarif entier : l'accroissement sur l'accroissement, le geste qui deviendra la dérivée." },
    { tier: "challenge", prompt: "Un matériel acheté 3 000 € perd 200 € de valeur par an : $v(x) = 3000 - 200x$. Sens de variation et pourquoi ? Valeur après 6 ans ? Quand la valeur atteint-elle 1 000 € ?", solution: "$a = -200 < 0$ : **décroissante** — la pente négative descend (la dépréciation) ; $v(6) = 3000 - 1200 = $ **1 800 €** ; $3000 - 200x = 1000$ ⟹ $200x = 2000$ ⟹ $x = $ **10 ans** — l'affine décrit aussi ce qui fond : le signe de la pente raconte le sens de l'histoire." },
    { tier: "exam", prompt: "Deux formules de salle de sport : A — 35 € par mois sans engagement ; B — 15 € par mois plus 120 € de frais d'inscription. (1) Exprime les coûts $f_A(x)$ et $f_B(x)$ sur $x$ mois. (2) Trace mentalement : qui démarre plus haut, qui monte plus vite ? (3) Point d'égalité et conseil au client selon sa durée.", solution: "(1) $f_A(x) = 35x$ et $f_B(x) = 15x + 120$. (2) B démarre à 120 (ordonnée à l'origine) mais monte doucement (pente 15) ; A part de 0 mais grimpe à 35 — deux droites qui vont se croiser. (3) $35x = 15x + 120$ ⟹ $20x = 120$ ⟹ $x = $ **6 mois** : avant 6 mois, **A** est moins chère ; au-delà, **B** gagne (sa pente plus douce finit par payer l'inscription) — comparer des offres = lire deux droites : pentes, départs, croisement — tout le chapitre dans un abonnement." },
  ],
  practice: [
    { tier: "warmup", label: "Lire a et b", make: (r) => {
      const a = pick(r, [2, 5, 8, 12]); const b = pick(r, [10, 20, 30]); const quoi = r() < 0.5;
      return { prompt: `$f(x) = ${a}x + ${b}$ : ${quoi ? "le prix unitaire (la pente)" : "le forfait (ordonnée à l'origine)"} ?`, answer: quoi ? a : b, solution: `${quoi ? "$a = $ **" + a + "**" : "$b = $ **" + b + "**"} — la formule condense le tarif.` };
    } },
    { tier: "application", label: "Le devis calculé", make: (r) => {
      const a = pick(r, [12, 15, 25]); const b = pick(r, [20, 40]); const x = randint(r, 2, 8);
      return { prompt: `$f(x) = ${a}x + ${b}$ : que coûte $x = ${x}$ ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b} €**.` };
    } },
    { tier: "challenge", label: "La pente entre deux devis", make: (r) => {
      const a = pick(r, [10, 15, 20]); const x1 = randint(r, 2, 4); const dx = pick(r, [3, 4, 5]); const b = pick(r, [20, 30]);
      return { prompt: `${x1} h → ${a * x1 + b} € et ${x1 + dx} h → ${a * (x1 + dx) + b} € : le taux horaire $a$ ?`, answer: a, solution: `$\\dfrac{${a * dx}}{${dx}} = $ **${a}** — l'accroissement des prix sur celui des heures.` };
    } },
  ],
};

// — 2x2 systems (programme: résolution graphique et algébrique) —
const systemes = {
  id: "algebra.high.systemes",
  level: "high", domain: "algebra",
  title: "Deux inconnues, deux contraintes",
  tagline: "Le système 2×2 — deux droites, un croisement, la solution du mélange.",
  prereqs: ["algebra.high.premier-degre", "analysis.high.fonctions-affines"],
  intuition:
    "Au café : 2 cafés + 3 croissants = 9,50 € ; 4 cafés + 1 croissant = 9,50 €. Deux inconnues (les deux prix), deux informations — c'est un **système** : $\\begin{cases} 2c + 3k = 9{,}5 \\\\ 4c + k = 9{,}5 \\end{cases}$.\n\nDeux contraintes, deux droites — et la solution est leur **point d'intersection** : le seul couple qui satisfait tout le monde.",
  depths: {
    discovery:
      "**Avec les mains** : compare les deux tickets — le second a 2 cafés de plus et 2 croissants de moins **pour le même prix** : donc 2 cafés valent 2 croissants — un café vaut un croissant ! Reporte dans le premier : 5 articles identiques pour 9,50 → **1,90 € pièce** : tu viens de résoudre par **comparaison concrète** — le raisonnement du comptoir, qui EST la méthode par combinaison.",
    standard:
      "**En image** : chaque équation est une **droite** (tes affines !) — trace-les : elles se croisent en un point, le couple solution — et trois destins existent : sécantes (une solution), parallèles strictes (aucune : contraintes incompatibles), confondues (une infinité : deux fois la même info). La lecture graphique **localise**, l'algèbre **précise** : le duo gagnant du programme.",
    advanced:
      "**Dans la tête** : les deux méthodes algébriques — **substitution** (isole une inconnue dans une équation, injecte dans l'autre : une équation à une inconnue tombe — ton premier degré !) et **combinaison** (multiplie les équations pour égaliser un coefficient, soustrais : une inconnue s'élimine — le geste du comptoir, industrialisé) — big idea *Equivalence* encore : chaque manipulation préserve l'ensemble des solutions. Le métier en regorge : mélanges (deux alliages, deux concentrations), tarifs croisés, répartitions — dès que deux quantités inconnues se contraignent mutuellement, le système 2×2 attend.",
  },
  keyIdea: "Deux inconnues, deux équations — graphiquement : **deux droites, la solution au croisement** (sécantes/parallèles/confondues : un/zéro/infinité). Algébriquement : **substitution** (isoler-injecter) ou **combinaison** (éliminer une inconnue) — big idea *Equivalence* : chaque étape préserve les solutions.",
  why:
    "Pourquoi deux inconnues d'un coup ? Parce que le réel contraint rarement une seule chose : un mélange impose masse ET concentration, une commande croise deux tarifs, un planning équilibre deux équipes — et le système est l'outil de tous ces nœuds. C'est aussi la porte de l'algèbre linéaire : tes matrices de la voie experte et les solveurs industriels (des milliers d'inconnues !) ne font qu'industrialiser le geste appris ici sur deux tickets de café.",
  examples: [
    { title: "Le raisonnement du comptoir", steps: [
      { p: "Ticket 1 : $2c + 3k = 9{,}5$ ; ticket 2 : $4c + k = 9{,}5$ — même prix : 2 cafés troqués contre 2 croissants." },
      { p: "Donc $c = k$, puis $5c = 9{,}5$ : $c = k = 1{,}90$ € — la comparaison a éliminé une inconnue." },
    ] },
    { title: "Trois destins de droites", steps: [
      { p: "Sécantes : une solution (le croisement) ; parallèles : aucune ; confondues : une infinité." },
      { p: "Le graphique diagnostique, l'algèbre calcule — toujours dans cet ordre au métier." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous par substitution : $\\begin{cases} y = 2x \\\\ x + y = 12 \\end{cases}$ — un mélange de 12 L où il y a deux fois plus d'eau ($y$) que de sirop ($x$).", solution: "Injecte $y = 2x$ dans la seconde : $x + 2x = 12$ ⟹ $3x = 12$ ⟹ $x = $ **4 L de sirop**, $y = $ **8 L d'eau** — la substitution ramène à ton premier degré : une équation, une inconnue, un partage." },
    { tier: "warmup", prompt: "Résous par combinaison : $\\begin{cases} 3x + 2y = 19 \\\\ 3x - y = 7 \\end{cases}$ (soustrais !).", solution: "Soustraction : $(3x + 2y) - (3x - y) = 19 - 7$ ⟹ $3y = 12$ ⟹ $y = 4$, puis $3x = 7 + 4 = 11$… vérifions : $3x - 4 = 7$ ⟹ $3x = 11$ ⟹ $x = \\dfrac{11}{3}$ — hmm, prenons plutôt la première : $3x = 19 - 8 = 11$ ✓ cohérent : $x = \\dfrac{11}{3}$, $y = $ **4** — les $3x$ identiques s'éliminent d'un coup de soustraction : choisir la bonne combinaison, c'est viser le coefficient commun." },
    { tier: "application", prompt: "Au marché : 3 kg de pommes + 2 kg de poires = 11,50 € ; 1 kg de pommes + 2 kg de poires = 7,50 €. Prix du kilo de chaque ? (Compare d'abord les deux paniers !)", solution: "Même quantité de poires : la différence des paniers (2 kg de pommes) coûte $11{,}5 - 7{,}5 = 4$ € — pommes : **2 €/kg** ; reporte : $2 + 2p = 7{,}5$ ⟹ poires : **2,75 €/kg** — la comparaison de paniers EST la combinaison : le geste concret et l'algèbre ne font qu'un." },
    { tier: "challenge", prompt: "Le système $\\begin{cases} 2x + 4y = 10 \\\\ x + 2y = 7 \\end{cases}$ : que se passe-t-il ? Interprète graphiquement et en termes de contraintes.", solution: "Double la seconde : $2x + 4y = 14$ — or la première dit $= 10$ : **incompatibles** : aucune solution — graphiquement, deux droites **parallèles** strictes (même pente, ordonnées différentes) : les deux contraintes se contredisent (le même panier ne peut coûter 10 et 14) — diagnostiquer l'impossible fait partie du métier : un système sans solution signale une erreur de relevé ou un cahier des charges intenable." },
    { tier: "exam", prompt: "Un atelier mélange deux aciers : l'acier A à 12 €/kg et l'acier B à 18 €/kg, pour obtenir 30 kg d'un alliage à 14 €/kg. (1) Pose le système (masse, valeur). (2) Résous par la méthode de ton choix. (3) Vérifie, et explique ce que chaque équation contraignait.", solution: "(1) Masse : $a + b = 30$ ; valeur : $12a + 18b = 14 \\times 30 = 420$. (2) Substitution : $a = 30 - b$ ⟹ $12(30 - b) + 18b = 420$ ⟹ $360 + 6b = 420$ ⟹ $b = 10$, $a = $ **20 kg de A et 10 kg de B**. (3) Vérification : $20 + 10 = 30$ ✓ et $240 + 180 = 420$ ✓ — l'équation des **masses** garantit la quantité commandée, celle des **valeurs** garantit le prix cible : deux contraintes, deux inconnues, un seul mélange possible — le problème type des alliages, dosages et coupages, résolu par le système : c'est l'exercice que tout laboratoire et toute fonderie refait chaque jour." },
  ],
  practice: [
    { tier: "warmup", label: "Substituer", make: (r) => {
      const k = pick(r, [2, 3]); const x = randint(r, 2, 6);
      return { prompt: `$y = ${k}x$ et $x + y = ${x * (k + 1)}$ : $x = \\,?$`, answer: x, solution: `$${k + 1}x = ${x * (k + 1)}$ : $x = $ **${x}**.` };
    } },
    { tier: "application", label: "Éliminer par soustraction", make: (r) => {
      const a = pick(r, [2, 3]); const y = randint(r, 2, 5); const c1 = randint(r, 10, 20);
      return { prompt: `$\\begin{cases} ${a}x + 2y = ${c1} \\\\ ${a}x - y = ${c1 - 3 * y} \\end{cases}$ : soustrais — $y = \\,?$`, answer: y, solution: `$3y = ${3 * y}$ : $y = $ **${y}** — les $${a}x$ s'éliminent.` };
    } },
    { tier: "challenge", label: "Le diagnostic des droites", make: (r) => {
      const cas = pick(r, [["sécantes", 1], ["parallèles strictes", 0], ["confondues", 2]]);
      return { prompt: `Deux droites ${cas[0]} : combien de solutions au système ? (0, 1, ou 2 pour « infinité »)`, answer: cas[1], solution: `**${["Aucune — contraintes incompatibles", "Une — le croisement", "Une infinité — deux fois la même contrainte"][cas[1]]}**.` };
    } },
  ],
};

export default [premierDegre, fonctionsAffines, systemes];
