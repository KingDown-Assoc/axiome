// Field "Probability & statistics" — HIGH module (premiere-pro year), voie
// professionnelle. Official 1re pro programme, domain "Statistique et
// probabilités": STATISTIQUE À DEUX VARIABLES QUANTITATIVES (groupements
// A, B, C — scatter plot, affine adjustment line obtained with a calculator
// or spreadsheet, INTERPOLATE and EXTRAPOLATE values, critical caution) and
// PROBABILITÉS (groupements A, B, C — universe, events in SET LANGUAGE:
// union, intersection, complement; two-way tables; equiprobable models).
// Singapore method: Readiness through maintenance and production contexts;
// Concrete (plotting real measurements) → Pictorial (the cloud and its
// line, the two-way table) → Abstract (the adjustment equation, the set
// notation); big ideas Diagrams and Notations named; exam tiers are full
// multi-step trade problems.
import { randint, pick } from "../../core/exercises.js";

// — Two-variable statistics (programme: nuage, ajustement, inter/extrapolation) —
const nuageAjustement = {
  id: "probability.high.nuage-ajustement",
  level: "high", domain: "probability",
  title: "Le nuage de points et sa droite",
  tagline: "Deux colonnes de mesures, un nuage — et la droite qui prédit entre les points.",
  prereqs: ["probability.high.stat-une-variable", "analysis.high.fonctions-affines"],
  intuition:
    "Le carnet d'entretien note : à 20 000 km, plaquettes usées de 3 mm ; à 40 000, de 5,8 mm ; à 60 000, de 9,1 mm — **deux variables** liées (kilométrage, usure).\n\nPlace chaque couple en point : le **nuage** apparaît — et s'il s'allonge, une **droite d'ajustement** le résume : ta fonction affine, élue par les données pour prédire l'usure à 50 000 km.",
  depths: {
    discovery:
      "**Avec les mains** : trace le nuage du carnet — kilométrage en abscisse, usure en ordonnée, un point par relevé : les points ne s'alignent **pas parfaitement** (les mesures fluctuent, tu le sais depuis la 2de) mais ils **s'allongent** : la tendance se voit avant tout calcul — poser une règle transparente « au plus près des points » est déjà un ajustement : ton œil fait le travail que la machine raffinera.",
    standard:
      "**En image** : big idea *Diagrams* — le nuage rend visible la **liaison** : allongé montant (plus de kilomètres, plus d'usure), allongé descendant (plus d'entretien, moins de pannes), ou **patatoïde** (aucun lien : inutile d'ajuster !) — le premier geste professionnel est ce diagnostic visuel ; ensuite seulement, la calculatrice ou le tableur fournit l'équation de la droite d'ajustement $y = ax + b$ (le programme la fait **donner par l'outil**, pas calculer à la main) : la pente $a$ redevient un taux — des mm d'usure par millier de kilomètres.",
    advanced:
      "**Dans la tête** : la droite sert à **prédire** — deux gestes que le programme distingue : **interpoler** (estimer ENTRE les relevés : l'usure à 50 000 km, encadrée par tes mesures — fiable) et **extrapoler** (estimer AU-DELÀ : à 120 000 km — risqué : rien ne garantit que la tendance continue, une pièce peut lâcher brutalement, un marché saturer). Le professionnel extrapole **prudemment et proche** : prolonger la droite d'un pas, oui ; la suivre vers l'infini, jamais — c'est l'esprit critique de 2de, version prédiction : la droite résume le passé observé, elle ne signe aucun contrat sur l'avenir.",
  },
  keyIdea: "Deux variables → **nuage de points** : le diagnostic visuel d'abord (allongé = liaison, patatoïde = rien à ajuster) — big idea *Diagrams*. La **droite d'ajustement** $y = ax + b$ (donnée par l'outil) prédit : **interpoler** (entre les points : fiable) vs **extrapoler** (au-delà : prudence) — la pente est un taux métier.",
  why:
    "Pourquoi ajuster une droite sur des mesures ? Parce que prévoir est le quotidien du métier : planifier la maintenance (quand les plaquettes atteindront-elles la limite ?), dimensionner un stock (les ventes contre la température), estimer un rendement — et le couple nuage-droite est l'outil de prévision le plus simple qui existe. Sa limite fait sa valeur pédagogique : savoir qu'extrapoler loin est un pari, c'est ce qui sépare la prévision professionnelle de la boule de cristal.",
  examples: [
    { title: "Le carnet devenu nuage", steps: [
      { p: "(20 ; 3), (40 ; 5,8), (60 ; 9,1) — en milliers de km : trois points qui s'allongent en montant." },
      { p: "La liaison se voit : plus de route, plus d'usure — l'ajustement a un sens." },
    ] },
    { title: "Interpoler, pas deviner", steps: [
      { p: "Droite d'ajustement $y = 0{,}15x - 0{,}1$ : à 50 000 km, $y = 7{,}4$ mm — entre les relevés : fiable." },
      { p: "À 200 000 km, la droite dit 29,9 mm — mais les plaquettes n'existent plus depuis longtemps : extrapolation absurde." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Relevés d'un four : (temps de chauffe en min ; température en °C) — (2 ; 80), (4 ; 130), (6 ; 185), (8 ; 230). Décris le nuage : allongé ou patatoïde ? Montant ou descendant ? Conclus sur la liaison.", solution: "Quatre points qui montent régulièrement : nuage **allongé montant** — plus le four chauffe longtemps, plus la température grimpe : la liaison est nette, l'ajustement par une droite a un sens — le diagnostic visuel AVANT tout calcul : c'est le premier geste du chapitre." },
    { tier: "warmup", prompt: "Le tableur donne pour ce four la droite d'ajustement $y = 25x + 31$. Que représentent concrètement la pente 25 et l'ordonnée 31 ?", solution: "Pente **25** : le four gagne 25 °C par minute de chauffe (le taux — ta fonction affine au travail) ; ordonnée **31** : la température estimée à $t = 0$, environ la température ambiante de départ — l'équation d'ajustement se LIT en grandeurs du métier, sinon elle ne sert à rien." },
    { tier: "application", prompt: "Avec $y = 25x + 31$ : (1) interpole la température à 5 min ; (2) à quel instant atteint-on 206 °C ? (3) Lequel de ces deux calculs est une interpolation, et pourquoi est-ce le plus fiable ?", solution: "(1) $y = 25 \\times 5 + 31 = $ **156 °C** ; (2) $25x + 31 = 206$ ⟹ $x = $ **7 min** (ton premier degré !) ; (3) les **deux** restent entre les relevés (2 à 8 min) : interpolations — fiables car encadrées par des mesures réelles : la droite ne fait que combler les trous du carnet, elle n'invente rien." },
    { tier: "challenge", prompt: "Avec la même droite, un collègue annonce : « à 30 minutes, le four sera à 781 °C ». Calcule, puis critique en deux arguments — et propose la conduite professionnelle correcte.", solution: "Le calcul est juste : $25 \\times 30 + 31 = $ **781 °C** — mais c'est une **extrapolation lointaine** (les relevés s'arrêtent à 8 min !) : (1) rien ne garantit que la montée reste linéaire — tout four plafonne vers sa température de consigne ; (2) la prédiction sort largement du domaine observé. Conduite correcte : **mesurer** au-delà de 8 min avant de prédire, ou borner l'usage de la droite au domaine [2 ; 8] — la droite résume le passé, elle ne promet pas l'avenir." },
    { tier: "exam", prompt: "Une PME relève ses ventes de boissons fraîches selon la température : (18 °C ; 42 packs), (22 ; 58), (25 ; 71), (28 ; 83), (31 ; 95). (1) Diagnostic du nuage. (2) Le tableur donne $y = 4{,}1x - 32$ : interprète la pente pour le gérant. (3) Météo à 27 °C demain : commande conseillée ? (4) Canicule annoncée à 40 °C : que dit la droite, et que décides-tu réellement — en argumentant interpolation/extrapolation et bon sens métier ?", solution: "(1) Nuage **allongé montant**, liaison nette : l'ajustement est légitime. (2) Pente 4,1 : **environ 4 packs de plus par degré** — la météo pilote le stock. (3) $y = 4{,}1 \\times 27 - 32 = 78{,}7$ : commander **≈ 80 packs** — interpolation (27 est entre 18 et 31) : fiable. (4) La droite annonce $4{,}1 \\times 40 - 32 = 132$ packs — mais 40 °C est **hors domaine observé** (extrapolation) : la relation peut changer (saturation des frigos, rupture fournisseur, clients restés chez eux…) ; décision professionnelle : commander davantage (la tendance est réelle) mais **par paliers** avec point d'étape, plutôt que parier 132 sur une droite prolongée — l'outil chiffre, le métier tranche : tout l'esprit du module." },
  ],
  practice: [
    { tier: "warmup", label: "Lire la droite d'ajustement", make: (r) => {
      const a = pick(r, [2, 3, 5]); const b = pick(r, [10, 20, 30]); const x = randint(r, 4, 12);
      return { prompt: `Ajustement $y = ${a}x + ${b}$ : estimation pour $x = ${x}$ ?`, answer: a * x + b, solution: `$${a} \\times ${x} + ${b} = $ **${a * x + b}** — la droite comble le trou entre les relevés.` };
    } },
    { tier: "application", label: "Retrouver le x", make: (r) => {
      const a = pick(r, [4, 5, 10]); const b = pick(r, [12, 20]); const x = randint(r, 3, 9);
      return { prompt: `$y = ${a}x + ${b}$ : pour quelle valeur de $x$ a-t-on $y = ${a * x + b}$ ?`, answer: x, solution: `$${a}x = ${a * x}$ ⟹ $x = $ **${x}** — l'équation d'ajustement se renverse comme toute affine.` };
    } },
    { tier: "challenge", label: "Interpoler ou extrapoler ?", make: (r) => {
      const lo = pick(r, [10, 20]); const hi = lo + pick(r, [20, 30]); const interp = r() < 0.5;
      const x = interp ? lo + 5 : hi + randint(r, 10, 25);
      return { prompt: `Relevés entre ${lo} et ${hi} ; on prédit en $x = ${x}$ : interpolation (1) ou extrapolation (0) ?`, answer: interp ? 1 : 0, solution: `**${interp ? "Interpolation — entre les relevés : fiable" : "Extrapolation — hors domaine : prudence"}**.` };
    } },
  ],
};

// — Events and set language (programme: univers, ensembliste, tableaux) —
const evenementsEnsembles = {
  id: "probability.high.evenements-ensembles",
  level: "high", domain: "probability",
  title: "Événements et langage des ensembles",
  tagline: "ET, OU, CONTRAIRE — trois mots du métier, trois symboles, un tableau qui range tout.",
  prereqs: ["probability.high.fluctuation-echantillons", "probability.middle.union-intersection"],
  intuition:
    "Au contrôle qualité, une pièce peut être « rayée », « voilée », les deux, ou ni l'un ni l'autre — et les questions du chef sont toujours les mêmes : rayée **ET** voilée ? rayée **OU** voilée ? **PAS** rayée ?\n\nLe langage des ensembles écrit ces trois mots : $A \\cap B$ (et), $A \\cup B$ (ou), $\\bar{A}$ (contraire) — big idea *Notations* : trois symboles qui rangent tout le hasard.",
  depths: {
    discovery:
      "**Avec les mains** : trie un lot réel de 100 pièces en quatre tas — rayées seulement, voilées seulement, les deux, aucune : disons 12, 8, 3, 77 — chaque question du chef se répond en **additionnant des tas** : « rayée ET voilée » = le tas double (3) ; « rayée OU voilée » = tout sauf le tas intact ($12 + 8 + 3 = 23$) ; « pas rayée » = $8 + 77 = 85$ — le tri physique EST la théorie.",
    standard:
      "**En image** : le **tableau à double entrée** range les quatre tas — lignes rayée/non rayée, colonnes voilée/non voilée : chaque case un tas, les marges totalisent — et chaque symbole se **colorie** : $A \\cap B$ = une case, $A \\cup B$ = trois cases (toutes sauf le coin double-non), $\\bar{A}$ = une ligne entière : le tableau est le diagramme de Venn du professionnel — il rend la formule $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ **visible** : additionner les deux lignes compte la case commune deux fois, on la retire une.",
    advanced:
      "**Dans la tête** : formalise — l'**univers** $\\Omega$ est l'ensemble des issues (les 100 pièces), un **événement** une partie de $\\Omega$, et en situation d'**équiprobabilité** chaque probabilité se calcule en comptant : $P(A) = \\dfrac{\\text{effectif de } A}{100}$ — ainsi $P(\\text{rayée}) = 0{,}15$, $P(\\text{rayée} \\cap \\text{voilée}) = 0{,}03$, $P(\\text{rayée} \\cup \\text{voilée}) = 0{,}15 + 0{,}11 - 0{,}03 = 0{,}23$ ✓ (le tableau confirme : 23 pièces). Deux événements **incompatibles** ($A \\cap B = \\varnothing$ : la case vide) simplifient en $P(A \\cup B) = P(A) + P(B)$, et le **contraire** offre le raccourci roi : $P(\\bar{A}) = 1 - P(A)$ — « au moins un défaut » se calcule presque toujours par son contraire « aucun défaut » : le réflexe qui sauvera tes arbres de terminale.",
  },
  keyIdea: "Univers $\\Omega$, événements ; $A \\cap B$ (**et**), $A \\cup B$ (**ou**), $\\bar{A}$ (**contraire**) — big idea *Notations*. Le **tableau à double entrée** range tout, et $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ s'y lit (la case commune comptée deux fois) ; $P(\\bar{A}) = 1 - P(A)$ : le raccourci du « au moins un ».",
  why:
    "Pourquoi un langage pour si peu ? Parce que les mots trompent : « rayée ou voilée » inclut-il les deux ? (oui — le OU mathématique est inclusif) ; « 15 % rayées et 11 % voilées » fait-il 26 % de défauts ? (non — les 3 % doubles sont comptés deux fois). Les symboles et le tableau **désamorcent** ces pièges qui coûtent des litiges réels — et ce langage est l'infrastructure de toute la suite : conditionnelles, arbres de terminale, fiabilité des systèmes parlent ensembliste couramment.",
  examples: [
    { title: "Les quatre tas", steps: [
      { p: "100 pièces : 12 rayées seules, 8 voilées seules, 3 les deux, 77 intactes — le tri range tout." },
      { p: "« Rayée OU voilée » $= 12 + 8 + 3 = 23$ — jamais $15 + 11$ : les 3 doubles ne comptent qu'une fois." },
    ] },
    { title: "Le contraire qui raccourcit", steps: [
      { p: "« Au moins un défaut » : long à compter directement — son contraire « aucun défaut » : 77 pièces." },
      { p: "$P = 1 - 0{,}77 = 0{,}23$ ✓ — passer par le contraire, le réflexe à vie." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Un atelier contrôle 50 soudures : 9 présentent une porosité, 6 une fissure, dont 2 les deux défauts. Construis le tableau à double entrée (donne les quatre cases).", solution: "Cases : porosité seule $= 9 - 2 = $ **7**, fissure seule $= 6 - 2 = $ **4**, les deux $= $ **2**, aucune $= 50 - 13 = $ **37** — vérification : $7 + 4 + 2 + 37 = 50$ ✓ — le tableau commence toujours par la case ET (l'intersection), puis tout se déduit : c'est le tri des quatre tas, posé sur papier." },
    { tier: "warmup", prompt: "Avec ce tableau, traduis en symboles puis calcule : P(porosité), P(porosité ∩ fissure), P(porosité ∪ fissure).", solution: "Équiprobabilité sur 50 : $P(A) = \\dfrac{9}{50} = $ **0,18** ; $P(A \\cap B) = \\dfrac{2}{50} = $ **0,04** ; $P(A \\cup B) = \\dfrac{7 + 4 + 2}{50} = $ **0,26** — et la formule confirme : $0{,}18 + 0{,}12 - 0{,}04 = 0{,}26$ ✓ : le tableau compte, la formule vérifie — toujours les deux routes." },
    { tier: "application", prompt: "Pourquoi $P(A \\cup B) \\neq P(A) + P(B)$ en général ? Montre-le sur le tableau des soudures, et donne la condition (avec son nom) pour que l'addition simple soit juste.", solution: "Additionner $P(A) + P(B) = 0{,}18 + 0{,}12 = 0{,}30$ compte la case commune **deux fois** (les 2 soudures doubles sont dans la ligne ET la colonne) : il faut retirer $P(A \\cap B)$ — d'où le 0,26. L'addition simple n'est juste que si la case commune est **vide** : événements **incompatibles** ($A \\cap B = \\varnothing$) — le tableau rend la formule évidente : c'est sa raison d'être." },
    { tier: "challenge", prompt: "Sur les 50 soudures, on en tire une au hasard. Calcule P(« au moins un défaut ») de deux façons : directement, puis par l'événement contraire — et dis laquelle généralise le mieux.", solution: "Direct : $\\dfrac{7 + 4 + 2}{50} = $ **0,26** ; par le contraire : « aucun défaut » $= \\dfrac{37}{50} = 0{,}74$, donc $P = 1 - 0{,}74 = $ **0,26** ✓ — même résultat, mais le contraire **généralise** : avec trois défauts possibles ou dix contrôles successifs, compter directement « au moins un » explose, tandis que « aucun » reste une seule case — $P(\\bar{A}) = 1 - P(A)$ est le raccourci qui passera à l'échelle en terminale." },
    { tier: "exam", prompt: "Une enquête interne sur 200 salariés : 120 sont formés aux premiers secours (S), 70 à la sécurité incendie (I), 45 aux deux. (1) Tableau complet. (2) Un salarié au hasard : P(S ∪ I), en symboles et en valeur. (3) P(aucune formation) — que représente cet événement en ensembliste ? (4) La direction vise « au plus 10 % sans aucune formation » : objectif atteint ? Sinon, combien de salariés former au minimum ?", solution: "(1) S seul $= 75$, I seul $= 25$, les deux $= 45$, aucun $= 200 - 145 = $ **55** ✓ (total 200). (2) $P(S \\cup I) = \\dfrac{145}{200} = $ **0,725** — ou par la formule : $0{,}6 + 0{,}35 - 0{,}225 = 0{,}725$ ✓. (3) « Aucune formation » $= \\overline{S \\cup I}$ : $P = 1 - 0{,}725 = $ **0,275** — le contraire de la réunion. (4) 27,5 % > 10 % : **objectif manqué** — il faudrait au plus 20 salariés sans formation : former au moins $55 - 20 = $ **35 salariés** supplémentaires — le tableau a rangé, les symboles ont traduit, le contraire a raccourci, et la décision RH tombe : le langage ensembliste au service du dialogue social." },
  ],
  practice: [
    { tier: "warmup", label: "La case ET d'abord", make: (r) => {
      const both = randint(r, 2, 6); const aSeul = randint(r, 5, 12);
      return { prompt: `${aSeul + both} pièces ont le défaut A, dont ${both} ont aussi le défaut B : combien ont A SEULEMENT ?`, answer: aSeul, solution: `$${aSeul + both} - ${both} = $ **${aSeul}** — toujours retirer l'intersection.` };
    } },
    { tier: "application", label: "La formule de l'union", make: (r) => {
      const a = randint(r, 10, 20); const b = randint(r, 8, 15); const inter = randint(r, 2, 6);
      return { prompt: `Sur 100 : $P(A) = 0{,}${a}$, $P(B) = 0{,}${String(b).padStart(2, "0")}$, $P(A \\cap B) = 0{,}0${inter}$ — effectif de $A \\cup B$ ?`, answer: a + b - inter, solution: `$${a} + ${b} - ${inter} = $ **${a + b - inter}** — la case commune retirée une fois.` };
    } },
    { tier: "challenge", label: "Par le contraire", make: (r) => {
      const aucun = pick(r, [60, 70, 75, 80]);
      return { prompt: `$P(\\text{aucun défaut}) = 0{,}${aucun}$ : $P(\\text{au moins un})$ ? (en centièmes : réponds l'entier)`, answer: 100 - aucun, solution: `$1 - 0{,}${aucun} = 0{,}${100 - aucun}$ — **${100 - aucun}** centièmes : le raccourci du contraire.` };
    } },
  ],
};

export default [nuageAjustement, evenementsEnsembles];
