// Field "Probability & statistics" — HIGH module (seconde-pro year), voie
// professionnelle. Official 2de pro programme, domain "Statistique et
// probabilités": STATISTIQUE À UNE VARIABLE (indicators: mean, median, range;
// reading, building and COMPARING diagrams; critical thinking about charts)
// and FLUCTUATIONS D'UNE FRÉQUENCE SELON LES ÉCHANTILLONS, PROBABILITÉS
// (sampling fluctuation, frequency stabilization, equiprobable models).
// Singapore method applied: Readiness = trade context in the intuition;
// Concrete → Pictorial → Abstract across the three depths; big ideas named
// (Diagrams, Invariance); problem solving at the core of the exam tier;
// systematic variation in the practice generators.
import { randint, pick } from "../../core/exercises.js";

// — One-variable statistics (programme: indicateurs, diagrammes, esprit critique) —
const statUneVariable = {
  id: "probability.high.stat-une-variable",
  level: "high", domain: "probability",
  title: "La statistique à une variable",
  tagline: "Résumer cent mesures en trois nombres — et lire les diagrammes en pro.",
  prereqs: ["discrete.middle.quartiles", "applied.middle.evolutions"],
  intuition:
    "À l'atelier, tu mesures le diamètre de 50 pièces usinées ; au commerce, tu relèves les ventes de la semaine ; en cuisine, les temps de cuisson — partout, des **séries de données** qu'il faut résumer pour décider.\n\nTrois résumés font le travail : la **moyenne** (le niveau), la **médiane** (le partage en deux moitiés), l'**étendue** (l'écart entre extrêmes) — cent mesures, trois nombres.",
  depths: {
    discovery:
      "**Avec les mains** : prends les 7 ventes de la semaine — 12, 15, 9, 22, 15, 8, 17 — et range-les physiquement comme des piles de caisses : 8, 9, 12, **15**, 15, 17, 22 — la **médiane** est la pile du milieu (15 : autant de jours en dessous qu'au-dessus) ; la **moyenne** égalise les piles (total 98 ÷ 7 = 14) ; l'**étendue** mesure du sol au sommet ($22 - 8 = 14$) — trois gestes concrets avant toute formule.",
    standard:
      "**En image** : les **diagrammes** traduisent — bâtons pour comparer des catégories, circulaire pour des parts d'un tout, histogramme pour des mesures groupées en classes — et la grande idée de Singapour s'applique : *un diagramme est une représentation qui rend visible* — la barre la plus haute SE VOIT, la part dominante du camembert SAUTE aux yeux : choisir le bon diagramme, c'est choisir ce qu'on veut montrer.",
    advanced:
      "**Dans la tête** : l'esprit critique du professionnel — une moyenne **cache** : l'équipe « moyenne 14 ventes » peut être régulière (13-15 chaque jour) ou chaotique (8 à 22) — seule l'étendue (ou mieux, les quartiles du collège) le révèle : *deux séries de même moyenne peuvent différer du tout au tout*. Et les diagrammes **mentent** parfois : un axe qui ne part pas de zéro gonfle les écarts, un effet 3D déforme les parts — le programme exige de « faire preuve d'esprit critique face à une information chiffrée » : avant de croire un graphique, lis ses axes — c'est la compétence citoyenne du chapitre, et le réflexe qui te servira face à chaque tableau de bord.",
  },
  keyIdea: "**Moyenne** (le niveau : total ÷ effectif), **médiane** (la valeur du milieu, série rangée), **étendue** (max − min : la dispersion). Big idea *Diagrams* : un diagramme rend visible — bâtons pour comparer, circulaire pour les parts, histogramme pour les classes — et l'esprit critique lit d'abord les axes.",
  why:
    "Pourquoi résumer ? Parce que décider exige de comparer, et qu'on ne compare pas cent nombres bruts : le chef d'atelier suit la moyenne des diamètres ET leur dispersion (une pièce hors tolérance se cache dans l'étendue, pas dans la moyenne), le commerçant compare ses semaines, l'infirmier surveille des constantes — la statistique à une variable est l'outil de pilotage de tous les métiers, et savoir quand la moyenne ment est ce qui distingue le professionnel du presse-bouton.",
  examples: [
    { title: "Les piles de caisses", steps: [
      { p: "Ventes : 12, 15, 9, 22, 15, 8, 17 — range : 8, 9, 12, 15, 15, 17, 22 : médiane $= 15$." },
      { p: "Moyenne $= \\dfrac{98}{7} = 14$ ; étendue $= 22 - 8 = 14$ — trois nombres, la semaine résumée." },
    ] },
    { title: "Deux équipes, même moyenne", steps: [
      { p: "Équipe A : 13, 14, 14, 15 (moyenne 14, étendue 2) ; équipe B : 8, 12, 16, 20 (moyenne 14, étendue 12)." },
      { p: "Même niveau, régularité opposée — la moyenne seule aurait menti." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Voici les temps (en min) de 7 livraisons : 18, 25, 12, 30, 25, 15, 22. Range la série, puis donne la médiane et l'étendue — avec le geste des piles.", solution: "Rangé : 12, 15, 18, **22**, 25, 25, 30 — la médiane est la pile du milieu : **22 min** (3 livraisons plus rapides, 3 plus lentes) ; étendue $= 30 - 12 = $ **18 min** — ranger d'abord : la médiane se lit, elle ne se calcule pas." },
    { tier: "warmup", prompt: "Calcule la moyenne des livraisons précédentes, et compare-la à la médiane : que remarques-tu ?", solution: "Total $= 147$, moyenne $= \\dfrac{147}{7} = $ **21 min** — proche de la médiane (22) : la série est à peu près équilibrée ; un écart marqué entre les deux aurait signalé des valeurs extrêmes qui tirent la moyenne — comparer les deux indicateurs est déjà un diagnostic." },
    { tier: "application", prompt: "Quel diagramme choisir : (a) comparer les ventes de 5 vendeurs, (b) montrer la répartition du budget d'un chantier en 4 postes, (c) représenter 60 diamètres de pièces groupés en classes ?", solution: "(a) **Bâtons** — comparer des catégories : les hauteurs se confrontent ; (b) **circulaire** — des parts d'un tout : les angles disent les proportions ; (c) **histogramme** — des mesures en classes : les rectangles couvrent les intervalles — big idea *Diagrams* : chaque diagramme rend visible une chose précise, le choix fait le message." },
    { tier: "challenge", prompt: "Deux machines produisent des pièces de diamètre moyen 20 mm. Machine A : étendue 0,4 mm ; machine B : étendue 3 mm. La tolérance client est ± 1 mm : laquelle choisis-tu et pourquoi la moyenne seule était-elle un piège ?", solution: "**Machine A** : ses pièces vivent dans $[19{,}8\\,;\\,20{,}2]$, toutes dans la tolérance $[19\\,;\\,21]$ ; la B s'étale jusqu'à $\\pm 1{,}5$ : des rebuts garantis — *même moyenne, destins opposés* : la moyenne dit le niveau, jamais la régularité — c'est la dispersion qui fait la qualité, et le contrôle qualité vit de cette distinction." },
    { tier: "exam", prompt: "Un tableau de bord affiche les ventes mensuelles : 40, 42, 41, 43 (k€), sur un graphique dont l'axe vertical démarre à 39. (1) Calcule moyenne, médiane, étendue. (2) Pourquoi le graphique donne-t-il l'impression d'une croissance spectaculaire ? (3) Rédige la phrase honnête qui résume ces quatre mois.", solution: "(1) Moyenne $= \\dfrac{166}{4} = $ **41,5 k€**, médiane $= \\dfrac{41 + 42}{2} = $ **41,5**, étendue $= $ **3 k€**. (2) L'axe **tronqué** à 39 transforme 3 k€ d'écart (7 % du niveau) en barres du simple au quadruple : l'œil lit l'écart des hauteurs *dessinées*, pas les valeurs — le mensonge graphique classique. (3) « Ventes stables autour de 41,5 k€, variations inférieures à 4 % » — l'esprit critique du programme : lire les axes avant les barres, puis dire ce que les nombres disent vraiment — ni plus, ni moins." },
  ],
  practice: [
    { tier: "warmup", label: "La pile du milieu", make: (r) => {
      const base = randint(r, 8, 15);
      const vals = [base - 3, base - 1, base, base + 2, base + 5];
      return { prompt: `Série rangée : ${vals.join(", ")} — la médiane ?`, answer: base, solution: `5 valeurs : la 3e — **${base}**.` };
    } },
    { tier: "application", label: "Moyenne d'atelier", make: (r) => {
      const m = randint(r, 10, 20); const n = pick(r, [4, 5]);
      const deltas = n === 4 ? [-2, -1, 1, 2] : [-2, -1, 0, 1, 2];
      const vals = deltas.map((d) => m + d);
      return { prompt: `Mesures : ${vals.join(", ")} — la moyenne ?`, answer: m, solution: `Total $${vals.reduce((a, b) => a + b, 0)} \\div ${n} = $ **${m}** — les écarts se compensent.` };
    } },
    { tier: "challenge", label: "L'étendue qui révèle", make: (r) => {
      const lo = randint(r, 5, 12); const et = pick(r, [4, 8, 15]);
      return { prompt: `Min $= ${lo}$, max $= ${lo + et}$ : l'étendue ?`, answer: et, solution: `$${lo + et} - ${lo} = $ **${et}** — la dispersion, que la moyenne cache.` };
    } },
  ],
};

// — Frequency fluctuation and probability (programme: échantillons, probabilités) —
const fluctuationEchantillons = {
  id: "probability.high.fluctuation-echantillons",
  level: "high", domain: "probability",
  title: "Fluctuation et probabilités",
  tagline: "Fluctuation d'échantillonnage : la fréquence se stabilise autour de la probabilité.",
  prereqs: ["probability.middle.union-intersection", "probability.high.stat-une-variable"],
  intuition:
    "Contrôle qualité : tu prélèves 50 pièces — 3 défectueuses (6 %) ; ton collègue en prélève 50 autres — 5 défectueuses (10 %). Qui a raison ? **Les deux** : la fréquence **fluctue** d'un échantillon à l'autre.\n\nMais grossis l'échantillon : sur 5 000 pièces, la fréquence se **stabilise** — vers un nombre que le hasard respecte : la **probabilité**.",
  depths: {
    discovery:
      "**Avec les mains** : lance une pièce 10 fois — tu obtiens peut-être 7 piles (70 %) ; relance 10 fois : 4 piles — la fluctuation se **touche** : deux échantillons, deux fréquences, aucun mensonge. Lance 100 fois, puis 1 000 (le tableur simule en une seconde !) : 52 %, puis 49,8 % — la fréquence **converge** vers 50 % : le hasard est instable au détail, régulier en masse.",
    standard:
      "**En image** : trace les fréquences de 20 échantillons de 50 lancers — les points **dansent** autour de 0,5, dans un couloir ; refais avec des échantillons de 500 — le couloir se **resserre** : le graphique montre la loi du chapitre : *plus l'échantillon grossit, moins la fréquence fluctue* — big idea *Invariance* : sous l'agitation des tirages, une valeur ne bouge pas — la probabilité.",
    advanced:
      "**Dans la tête** : formalise — la **probabilité** d'un événement est le nombre vers lequel sa fréquence se stabilise ; dans un modèle **équiprobable** ($n$ issues qui se valent), elle se calcule sans expérience : $P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$ — le dé donne $P(6) = \\frac{1}{6} \\approx 0{,}167$, et tes 1 000 lancers l'avaient flairé. Le professionnel en tire deux réflexes : un petit échantillon **ne prouve rien** (3 défauts sur 50, c'est compatible avec 6 % comme avec 9 %), et l'écart entre fréquence observée et probabilité annoncée ne devient suspect que s'il **persiste en masse** — le doute méthodique du contrôle qualité, fondé sur la fluctuation.",
  },
  keyIdea: "La **fréquence fluctue** d'un échantillon à l'autre — et se **stabilise** quand l'échantillon grossit : ce point fixe est la **probabilité** (big idea *Invariance*). Modèle équiprobable : $P = \\dfrac{\\text{favorables}}{\\text{possibles}}$ — et un petit échantillon ne prouve rien.",
  why:
    "Pourquoi accepter que les mesures dansent ? Parce que c'est la nature du hasard, et que la maîtriser évite deux fautes professionnelles : accuser une machine sur 50 pièces (la fluctuation suffit à expliquer l'écart), ou ignorer un défaut qui persiste sur 5 000 (là, le hasard n'excuse plus). Sondages, contrôle qualité, taux de panne, météo : toute décision sous incertitude repose sur ce trio fréquence-fluctuation-probabilité — c'est la leçon qui apprend quand s'inquiéter.",
  examples: [
    { title: "Deux contrôleurs, deux fréquences", steps: [
      { p: "50 pièces : 6 % de défauts ; 50 autres : 10 % — personne ne se trompe : ça **fluctue**." },
      { p: "Sur 5 000 : 7,9 % — la fréquence se pose : voilà le vrai taux qui se dessine." },
    ] },
    { title: "Le dé prédit sans lancer", steps: [
      { p: "6 faces équiprobables : $P(6) = \\frac{1}{6} \\approx 0{,}167$ — le modèle calcule." },
      { p: "1 000 lancers donnent $\\approx 0{,}17$ : l'expérience confirme le modèle — les deux routes se rejoignent." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Deux stagiaires testent la même pièce de monnaie : 10 lancers chacun — l'un obtient 70 % de piles, l'autre 40 %. La pièce est-elle truquée ? Qui se trompe ?", solution: "**Personne** — et la pièce n'est probablement pas truquée : sur 10 lancers, la fréquence **fluctue** largement (70 % comme 40 % sont banals) — un petit échantillon ne prouve rien : c'est la première leçon du hasard, et le réflexe qui évite les fausses alertes." },
    { tier: "warmup", prompt: "Un sac contient 3 boules rouges et 7 bleues, tirage au hasard. Donne $P(\\text{rouge})$ par le modèle équiprobable, et la fréquence attendue sur 1 000 tirages.", solution: "10 issues équiprobables, 3 favorables : $P = \\dfrac{3}{10} = $ **0,3** — sur 1 000 tirages, la fréquence se stabilisera **autour de 300 rouges** (pas exactement ! la fluctuation reste, mais resserrée) : le modèle prédit, la masse confirme." },
    { tier: "application", prompt: "On simule des échantillons de lancers de dé et on note la fréquence du 6 : taille 60 → 0,12 ; taille 600 → 0,158 ; taille 6 000 → 0,166. Commente avec le vocabulaire du chapitre, et donne la valeur limite.", solution: "Les fréquences **fluctuent** mais se **resserrent** vers $P(6) = \\dfrac{1}{6} \\approx $ **0,167** quand la taille grossit : la stabilisation en marche — big idea *Invariance* : sous l'agitation des tirages, le point fixe est la probabilité — et le tableur rend cette loi visible en trois colonnes." },
    { tier: "challenge", prompt: "Un fournisseur annonce 4 % de pièces défectueuses. Tu reçois un lot, tu en contrôles 50 : 4 défauts (8 %). Réclames-tu ? Puis tu contrôles 2 000 pièces : 158 défauts (7,9 %). Et maintenant ?", solution: "Sur **50** : non — 8 % observés sont compatibles avec 4 % réels, la fluctuation d'un petit échantillon couvre largement cet écart ; sur **2 000** : oui — la fréquence s'est stabilisée à 7,9 %, le double de l'annonce : le hasard n'explique plus, le lot est non conforme — *quand s'inquiéter* : jamais sur le détail, toujours sur la masse persistante." },
    { tier: "exam", prompt: "Une roue de loterie de fête foraine a 8 secteurs identiques : 1 « gros lot », 2 « petit lot », 5 « perdu ». (1) Donne les probabilités des trois issues. (2) Sur 400 parties, combien de gros lots attendre ? (3) Le forain observe 65 gros lots sur 400 : qu'en conclure, en raisonnant fluctuation ?", solution: "(1) Équiprobabilité des secteurs : $P(\\text{gros}) = \\dfrac{1}{8}$, $P(\\text{petit}) = \\dfrac{2}{8} = \\dfrac{1}{4}$, $P(\\text{perdu}) = \\dfrac{5}{8}$ — vérification : somme $= 1$ ✓. (2) Autour de $400 \\times \\dfrac{1}{8} = $ **50** gros lots — avec fluctuation. (3) 65 sur 400 (16,3 % contre 12,5 % attendus) : sur un échantillon déjà conséquent, l'écart est **important et coûteux** — la roue mérite vérification (secteurs inégaux ? aimant ?) : le professionnel ne crie pas à la triche sur 20 parties, mais enquête sur 400 — la fluctuation borne le doute, la masse le tranche : tout l'esprit du chapitre dans une roue." },
  ],
  practice: [
    { tier: "warmup", label: "Le modèle équiprobable", make: (r) => {
      const tot = pick(r, [8, 10, 12]); const fav = randint(r, 1, 4);
      return { prompt: `${tot} issues équiprobables, ${fav} favorables : $P = \\dfrac{?}{${tot}}$ (numérateur)`, answer: fav, solution: `$P = \\dfrac{${fav}}{${tot}}$ — **${fav}** : favorables sur possibles.` };
    } },
    { tier: "application", label: "L'effectif attendu", make: (r) => {
      const denom = pick(r, [4, 5, 10]); const n = denom * pick(r, [20, 50, 100]);
      return { prompt: `$P = \\dfrac{1}{${denom}}$, ${n} essais : autour de combien de succès ?`, answer: n / denom, solution: `$${n} \\times \\dfrac{1}{${denom}} = $ **${n / denom}** — autour de, jamais exactement : la fluctuation veille.` };
    } },
    { tier: "challenge", label: "Qui fluctue le plus ?", make: (r) => {
      const petit = pick(r, [20, 50]); const grand = petit * pick(r, [10, 20]);
      return { prompt: `Échantillon de ${petit} ou de ${grand} : lequel donne la fréquence la PLUS stable ? (réponds par sa taille)`, answer: grand, solution: `**${grand}** — plus l'échantillon grossit, moins la fréquence fluctue : la loi du chapitre.` };
    } },
  ],
};

export default [statUneVariable, fluctuationEchantillons];
