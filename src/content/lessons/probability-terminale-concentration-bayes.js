// Field "Probability" — HIGH module (terminale year), part 2: concentration
// and Bayesian inference. Official terminale spécialité programme.
// CONCENTRATION: the BIENAYMÉ-TCHEBYCHEV inequality — for X of expectation μ
// and variance V, P(|X − μ| ≥ δ) ≤ V/δ² —, the CONCENTRATION inequality for
// the sample mean M_n (using V(M_n) = V/n): P(|M_n − μ| ≥ δ) ≤ V/(nδ²), the
// LAW OF LARGE NUMBERS; capacity: sizing a sample given precision and risk;
// official experiments: random walks, comparing the guaranteed bound with the
// observed ~95% within 2σ/√n. BAYES (the terminale MATHS COMPLÉMENTAIRES
// exclusive, theme "Inférence bayésienne" — the spécialité stops at total
// probability): BAYES' FORMULA P_B(A) = P_A(B)·P(A)/P(B) for inverting
// conditioning, prior and posterior probabilities, the denominator via total
// probability, belief updating (medical tests, spam filters).
import { randint, pick } from "../../core/exercises.js";

// — Concentration and the law of large numbers (programme: B-T, LGN) —
const concentration = {
  id: "probability.high.concentration",
  level: "high", domain: "probability",
  title: "Concentration et loi des grands nombres",
  tagline: "Bienaymé-Tchebychev borne les écarts — et la moyenne converge, démontré.",
  prereqs: ["probability.high.sommes-variables", "probability.high.echantillonnage"],
  intuition:
    "Peut-on **garantir** qu'une variable reste près de son espérance ? L'inégalité de **Bienaymé-Tchebychev** : $P(|X - \\mu| \\geq \\delta) \\leq \\dfrac{V}{\\delta^2}$ — la probabilité de s'écarter de plus de $\\delta$ est bornée par la variance sur $\\delta^2$.\n\nAucune hypothèse sur la loi : la borne vaut pour **tout** hasard — c'est sa force, et le prix est d'être large.",
  depths: {
    discovery:
      "**Avec les mains** : lis la borne en écarts types — $\\delta = 2\\sigma$ donne $P(|X - \\mu| \\geq 2\\sigma) \\leq \\frac{\\sigma^2}{4\\sigma^2} = \\frac{1}{4}$ : **au moins 75 %** de la masse vit à moins de deux écarts types, quelle que soit la loi — ton couloir des 95 % observé en première était plus généreux : Tchebychev garantit moins, mais garantit **toujours**.",
    standard:
      "**En image** : applique à la moyenne d'échantillon — $M_n$ a pour espérance $\\mu$ et variance $\\frac{V}{n}$ (démontré !) : Tchebychev donne l'**inégalité de concentration** $P(|M_n - \\mu| \\geq \\delta) \\leq \\dfrac{V}{n\\delta^2}$ — le $n$ au dénominateur change tout : à $\\delta$ fixé, la borne **fond** quand $n$ grandit : la moyenne se concentre sur $\\mu$, et la vitesse est lisible.",
    advanced:
      "**Dans la tête** : la **loi des grands nombres**, enfin démontrée — fais tendre $n \\to \\infty$ dans la concentration : $P(|M_n - \\mu| \\geq \\delta) \\to 0$ pour tout $\\delta > 0$ : la moyenne d'échantillon converge (en probabilité) vers l'espérance ✓ — la fréquence qui « se stabilisait » en seconde, le $\\frac{2\\sigma}{\\sqrt{n}}$ observé en première : tout cela était un **théorème**, et le voici. Mieux : la concentration **dimensionne** — exiger $P(|M_n - \\mu| \\geq \\delta) \\leq \\alpha$ se garantit dès que $n \\geq \\dfrac{V}{\\alpha\\delta^2}$ : précision $\\delta$, risque $\\alpha$, taille $n$ — le triangle du sondeur, avec démonstration. Bienaymé (1853) et Tchebychev (son correspondant à Saint-Pétersbourg) ont forgé l'outil ; Bernoulli avait pressenti la loi dès 1713 — *Ars Conjectandi* l'appelait son « théorème d'or » : deux siècles pour passer de l'intuition à la preuve, trois lignes pour toi.",
  },
  keyIdea: "**Bienaymé-Tchebychev** : $P(|X - \\mu| \\geq \\delta) \\leq \\frac{V}{\\delta^2}$ — universelle (toute loi), large (75 % garantis à $2\\sigma$ contre 95 % observés). **Concentration** : $P(|M_n - \\mu| \\geq \\delta) \\leq \\frac{V}{n\\delta^2}$ — et $n \\to \\infty$ démontre la **loi des grands nombres** ; taille d'échantillon : $n \\geq \\frac{V}{\\alpha\\delta^2}$.",
  why:
    "Pourquoi une borne si pessimiste ? Parce qu'elle est **inconditionnelle** : aucune hypothèse de forme, aucune cloche supposée — quand on ignore tout de la loi (et le réel est avare en lois connues), Tchebychev tient. Et surtout, elle suffit à démontrer la loi des grands nombres : le pont entre probabilités (le modèle) et statistiques (les données) — la raison mathématique pour laquelle observer beaucoup renseigne sur le vrai : sans elle, sondages, assurances et physique statistique flotteraient sans fondation.",
  examples: [
    { title: "75 % garantis, toujours", steps: [
      { p: "$\\delta = 2\\sigma$ : $P(|X - \\mu| \\geq 2\\sigma) \\leq \\dfrac{\\sigma^2}{4\\sigma^2} = \\dfrac{1}{4}$." },
      { p: "Au moins 75 % à moins de $2\\sigma$ — moins que les 95 % observés, mais pour **toute** loi." },
    ] },
    { title: "La LGN en une ligne", steps: [
      { p: "$P(|M_n - \\mu| \\geq \\delta) \\leq \\dfrac{V}{n\\delta^2}$ — et $n \\to \\infty$ : la borne s'écrase sur 0." },
      { p: "La moyenne converge vers l'espérance : le théorème d'or de Bernoulli, démontré." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Une variable a $\\mu = 100$ et $\\sigma = 5$. Que garantit Bienaymé-Tchebychev pour $P(|X - 100| \\geq 10)$ ? Et pour la probabilité complémentaire ?", solution: "$\\delta = 10 = 2\\sigma$ : $P \\leq \\dfrac{25}{100} = $ **0,25** — donc au moins **75 %** de chances que $X$ reste dans $]90\\,;\\,110[$ : la garantie universelle, sans rien connaître de la loi." },
    { tier: "warmup", prompt: "Compare : Tchebychev garantit 75 % à moins de $2\\sigma$, mais ta simulation de première observait 95 %. Contradiction ?", solution: "Aucune : Tchebychev est une **borne**, pas une valeur — elle promet *au moins* 75 % pour **toute** loi imaginable, y compris les plus pathologiques ; les lois usuelles (cloches !) font mieux, d'où les 95 % observés — la borne est large parce qu'elle est universelle : c'est un plancher, pas une prédiction." },
    { tier: "application", prompt: "Établis l'inégalité de concentration pour $M_n$ à partir de Bienaymé-Tchebychev et de $V(M_n) = \\frac{V}{n}$, et déduis-en la loi des grands nombres.", solution: "Applique Tchebychev à $M_n$ (espérance $\\mu$, variance $\\frac{V}{n}$ — démontré au chapitre des sommes) : $P(|M_n - \\mu| \\geq \\delta) \\leq \\dfrac{V}{n\\delta^2}$ ✓ — puis $n \\to \\infty$ : la borne tend vers **0** pour tout $\\delta > 0$ : $M_n$ converge vers $\\mu$ — la **loi des grands nombres**, démontrée en deux lignes : Tchebychev fournit la borne, la division par $n$ fait le reste." },
    { tier: "challenge", prompt: "Un sondage estime une proportion ($V \\leq \\frac{1}{4}$ pour une Bernoulli). Combien de personnes interroger pour garantir une précision de 0,05 avec un risque d'au plus 5 % ?", solution: "$n \\geq \\dfrac{V}{\\alpha\\delta^2} = \\dfrac{0{,}25}{0{,}05 \\times 0{,}0025} = $ **2 000** — la garantie inconditionnelle coûte le double du sondage usuel (1 000 personnes, calibré sur les 95 % empiriques) : Tchebychev paie son universalité — précision, risque, taille : le triangle du sondeur, démontré." },
    { tier: "exam", prompt: "Une machine remplit des paquets : $\\mu = 500$ g, $\\sigma = 4$ g. (1) Borne la probabilité qu'un paquet s'écarte d'au moins 10 g. (2) On contrôle par la moyenne de $n$ paquets : quelle taille $n$ garantit $P(|M_n - 500| \\geq 1) \\leq 0{,}05$ ? Conclus sur le rôle de chaque inégalité.", solution: "(1) Tchebychev : $P(|X - 500| \\geq 10) \\leq \\dfrac{16}{100} = $ **0,16** — au plus 16 % de paquets hors de $\\pm 10$ g, toute loi confondue. (2) Concentration : $\\dfrac{V}{n\\delta^2} = \\dfrac{16}{n} \\leq 0{,}05$ ⟺ $n \\geq $ **320** — en moyennant 320 paquets, l'usine garantit le gramme près à 95 % : Tchebychev borne **un** tirage, la concentration borne la **moyenne** et fond en $\\frac{1}{n}$ — l'une surveille la pièce, l'autre calibre le contrôle qualité : c'est exactement la capacité attendue du programme, et le fondement démontré de toute la métrologie." },
  ],
  practice: [
    { tier: "warmup", label: "La borne de Tchebychev", make: (r) => {
      const sig = pick(r, [2, 3, 5]); const k = pick(r, [2, 3]);
      return { prompt: `$\\sigma = ${sig}$, écart $\\delta = ${k}\\sigma = ${k * sig}$ : Tchebychev borne $P$ par $\\frac{1}{?}$`, answer: k * k, solution: `$\\dfrac{\\sigma^2}{(${k}\\sigma)^2} = \\dfrac{1}{${k * k}}$ — **${k * k}** : à $${k}\\sigma$, au plus $\\frac{1}{${k * k}}$ d'écarts.` };
    } },
    { tier: "application", label: "La concentration fond", make: (r) => {
      const V = pick(r, [4, 16]); const n = pick(r, [100, 400]); const d = 1;
      return { prompt: `$V = ${V}$, $n = ${n}$, $\\delta = 1$ : la borne $\\dfrac{V}{n\\delta^2}$ vaut ? (décimal)`, answer: V / n, solution: `$\\dfrac{${V}}{${n}} = $ **${String(V / n).replace(".", ",")}** — le $n$ au dénominateur écrase la borne.` };
    } },
    { tier: "challenge", label: "Dimensionner l'échantillon", make: (r) => {
      const V = pick(r, [1, 4]); const alpha = pick(r, [[0.1, "0{,}1"], [0.05, "0{,}05"]]); const d = pick(r, [[0.5, "0{,}5"], [1, "1"]]);
      const n = Math.ceil(V / (alpha[0] * d[0] * d[0]));
      return { prompt: `$V = ${V}$, précision $\\delta = ${d[1]}$, risque $\\alpha = ${alpha[1]}$ : taille minimale $n = \\dfrac{V}{\\alpha\\delta^2} = \\,?$`, answer: n, solution: `$\\dfrac{${V}}{${alpha[1]} \\times ${String(d[0] * d[0]).replace(".", ",")}} = $ **${n}** — le triangle précision-risque-taille.` };
    } },
  ],
};

// — Bayesian inference (programme maths comp: formule de Bayes) —
const bayes = {
  id: "probability.high.bayes",
  level: "high", domain: "probability",
  title: "L'inférence bayésienne",
  tagline: "Renverser le conditionnement — la formule qui met à jour les croyances.",
  prereqs: ["probability.high.independance"],
  intuition:
    "Le médecin connaît $P_M(+)$ — la probabilité d'un test positif **sachant** la maladie ; le patient veut $P_+(M)$ — la maladie **sachant** le positif : le conditionnement à l'envers.\n\nLa **formule de Bayes** fait le pont : $P_B(A) = \\dfrac{P_A(B) \\times P(A)}{P(B)}$ — l'inversion, écrite noir sur blanc.",
  depths: {
    discovery:
      "**Avec les mains** : d'où vient-elle ? De la double lecture de l'intersection — $P(A \\cap B) = P(A)\\,P_A(B) = P(B)\\,P_B(A)$ (les deux sens de l'arbre !) : isole $P_B(A)$ et la formule tombe — tu la pratiquais déjà en remontant les arbres ; Bayes lui donne un nom et un statut.",
    standard:
      "**En image** : le vocabulaire de l'inférence — $P(A)$ est l'**a priori** (ce qu'on croit *avant* l'indice), $P_B(A)$ l'**a posteriori** (la croyance *révisée* après avoir observé $B$), et $P_A(B)$ la **vraisemblance** (à quel point l'indice colle à l'hypothèse) ; le dénominateur $P(B)$ se calcule par tes **probabilités totales** — la formule complète : $P_B(A) = \\dfrac{P_A(B)\\,P(A)}{P_A(B)\\,P(A) + P_{\\bar{A}}(B)\\,P(\\bar{A})}$ : tout le chapitre de première, assemblé en une machine à réviser.",
    advanced:
      "**Dans la tête** : la révision en marche — le filtre **anti-spam** : a priori $P(\\text{spam}) = 0{,}4$ ; le mot « gratuit » apparaît, avec $P_{\\text{spam}}(\\text{gratuit}) = 0{,}3$ contre $0{,}02$ chez les légitimes : Bayes révise à $P \\approx 0{,}91$ — chaque mot observé met à jour la croyance, et l'a posteriori d'un mot devient l'a priori du suivant : c'est l'**apprentissage bayésien**, cœur des premiers filtres et ancêtre direct des classifieurs modernes. La justice y a ses garde-fous (confondre $P_{\\text{innocent}}(\\text{indice})$ et $P_{\\text{indice}}(\\text{innocent})$ est *l'erreur du procureur* — des procès l'ont payée), la médecine ses surprises (ton $\\frac{1}{3}$ !). Thomas Bayes, pasteur anglais, mourut en 1761 sans publier ; son ami Price exhuma l'essai, Laplace généralisa — et la formule posthume gouverne aujourd'hui diagnostic, IA et navigation spatiale.",
  },
  keyIdea: "$P_B(A) = \\dfrac{P_A(B)\\,P(A)}{P(B)}$ — l'inversion du conditionnement, née de la double lecture de $P(A \\cap B)$. **A priori** $P(A)$ → indice $B$ → **a posteriori** $P_B(A)$ ; le dénominateur par les **probabilités totales** : la machine à réviser les croyances.",
  why:
    "Pourquoi une formule pour ce que l'arbre faisait déjà ? Parce que la nommer change l'échelle : l'inférence bayésienne est devenue un **paradigme** — raisonner, c'est réviser des probabilités à mesure que les indices tombent. Le diagnostic médical, le filtre anti-spam, la fusion de capteurs d'un drone, l'estimation d'une position GPS : tous exécutent Bayes en boucle. C'est la formule la plus influente des probabilités appliquées — et elle tient sur une ligne de ta première.",
  examples: [
    { title: "La double lecture", steps: [
      { p: "$P(A \\cap B) = P(A)\\,P_A(B) = P(B)\\,P_B(A)$ — l'intersection, lue par chaque branche." },
      { p: "Isole : $P_B(A) = \\dfrac{P_A(B)\\,P(A)}{P(B)}$ — l'inversion, en une division." },
    ] },
    { title: "Le spam révisé", steps: [
      { p: "A priori 0,4 ; « gratuit » observé : vraisemblances 0,3 (spam) contre 0,02 (légitime)." },
      { p: "$P = \\dfrac{0{,}3 \\times 0{,}4}{0{,}3 \\times 0{,}4 + 0{,}02 \\times 0{,}6} \\approx 0{,}91$ — l'indice a fait bondir la croyance." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Démontre la formule de Bayes à partir des deux écritures de $P(A \\cap B)$.", solution: "$P(A \\cap B) = P(A)\\,P_A(B)$ et $P(A \\cap B) = P(B)\\,P_B(A)$ (la définition du conditionnement, lue dans chaque sens) — égalise et isole : $P_B(A) = \\dfrac{P_A(B)\\,P(A)}{P(B)}$ ✓ — deux lignes : la formule la plus influente des probabilités est une simple double lecture." },
    { tier: "warmup", prompt: "Identifie a priori, vraisemblance et a posteriori dans : « 1 % de la population est malade ; le test détecte 99 % des malades ; sachant mon test positif, quelle probabilité d'être malade ? »", solution: "**A priori** : $P(M) = 0{,}01$ (avant tout test) ; **vraisemblance** : $P_M(+) = 0{,}99$ (l'indice sachant l'hypothèse) ; **a posteriori** : $P_+(M)$ — la croyance révisée, celle que Bayes calcule : le vocabulaire de l'inférence, posé sur ton exemple de toujours." },
    { tier: "application", prompt: "Avec $P(M) = 0{,}01$, $P_M(+) = 0{,}99$ et $P_{\\bar{M}}(+) = 0{,}02$ : calcule $P_+(M)$ par la formule de Bayes complète (dénominateur par probabilités totales).", solution: "$P(+) = 0{,}99 \\times 0{,}01 + 0{,}02 \\times 0{,}99 = 0{,}0099 + 0{,}0198 = 0{,}0297$ — puis $P_+(M) = \\dfrac{0{,}0099}{0{,}0297} = \\frac{1}{3}$ ✓ : le paradoxe du dépistage de seconde (les 10 000 personnes), puis l'arbre de première — désormais la **formule directe** : trois années, trois méthodes, un même tiers." },
    { tier: "challenge", prompt: "L'erreur du procureur : « la probabilité de trouver cet ADN chez un innocent est d'une sur un million, donc l'accusé est coupable à 99,9999 % ». Démasque la confusion avec le vocabulaire bayésien.", solution: "On confond $P_{\\text{innocent}}(\\text{ADN})$ — la **vraisemblance**, effectivement infime — et $P_{\\text{ADN}}(\\text{innocent})$ — l'**a posteriori**, qui dépend de l'**a priori** ! Dans une ville d'un million d'habitants, environ un innocent porte cet ADN par hasard : sans autre indice, l'accusé est à peu près à pile ou face — inverser un conditionnement sans Bayes a réellement condamné des innocents : la formule est un garde-fou judiciaire." },
    { tier: "exam", prompt: "Un filtre anti-spam : a priori $P(S) = 0{,}4$ ; le mot « gratuit » a pour vraisemblances $P_S(G) = 0{,}3$ et $P_{\\bar{S}}(G) = 0{,}02$. (1) Calcule l'a posteriori $P_G(S)$. (2) Explique la mise à jour : que devient ce résultat si un second mot suspect arrive ?", solution: "(1) $P(G) = 0{,}3 \\times 0{,}4 + 0{,}02 \\times 0{,}6 = 0{,}132$ — $P_G(S) = \\dfrac{0{,}12}{0{,}132} \\approx $ **0,91** : un mot a fait passer la croyance de 40 à 91 %. (2) L'a posteriori devient le **nouvel a priori** : pour le mot suivant, on repart de 0,91 et Bayes révise encore — la croyance se met à jour indice par indice, en boucle : c'est l'inférence bayésienne au sens plein — apprendre, c'est itérer Bayes, et tes filtres, ton GPS et les IA probabilistes ne font rien d'autre." },
  ],
  practice: [
    { tier: "warmup", label: "L'inversion nue", make: (r) => {
      const pab = pick(r, [[6, 10], [4, 10], [8, 10]]); const pa = pick(r, [[1, 2], [1, 5]]); const pb = pick(r, [[1, 2], [2, 5]]);
      const num = pab[0] * pa[0] * pb[1]; const den = pab[1] * pa[1] * pb[0];
      const g = (a, b) => b ? g(b, a % b) : a; const d = g(num, den);
      return { prompt: `$P_A(B) = ${String(pab[0] / pab[1]).replace(".", ",")}$, $P(A) = \\frac{${pa[0]}}{${pa[1]}}$, $P(B) = \\frac{${pb[0]}}{${pb[1]}}$ : $P_B(A) = \\frac{?}{${den / d}}$ (numérateur)`, answer: num / d, solution: `$\\dfrac{${String(pab[0] / pab[1]).replace(".", ",")} \\times \\frac{${pa[0]}}{${pa[1]}}}{\\frac{${pb[0]}}{${pb[1]}}} = \\frac{${num / d}}{${den / d}}$ — **${num / d}**.` };
    } },
    { tier: "application", label: "A priori ou a posteriori ?", make: (r) => {
      const cas = pick(r, [["la probabilité d'être malade, avant tout test", 0], ["la probabilité d'être malade, sachant le test positif", 1], ["la probabilité du test positif, sachant la maladie", 2]]);
      return { prompt: `« ${cas[0]} » : a priori (0), a posteriori (1), ou vraisemblance (2) ?`, answer: cas[1], solution: `**${["A priori — avant l'indice", "A posteriori — la croyance révisée", "Vraisemblance — l'indice sachant l'hypothèse"][cas[1]]}**.` };
    } },
    { tier: "challenge", label: "Bayes en chiffres ronds", make: (r) => {
      const pa = pick(r, [[1, 10], [2, 10]]); const vm = pick(r, [[9, 10], [8, 10]]); const vf = [1, 10];
      const num = vm[0] * pa[0];
      const den = num + vf[0] * (10 - pa[0]);
      const g = (a, b) => b ? g(b, a % b) : a; const d = g(num, den);
      return { prompt: `A priori $\\frac{${pa[0]}}{10}$, vraisemblances $\\frac{${vm[0]}}{10}$ (si A) et $\\frac{1}{10}$ (sinon) : a posteriori $= \\frac{?}{${den / d}}$ (numérateur)`, answer: num / d, solution: `$\\dfrac{${num}}{${num} + ${vf[0] * (10 - pa[0])}} = \\frac{${num / d}}{${den / d}}$ — **${num / d}** : l'indice a révisé.` };
    } },
  ],
};

export default [concentration, bayes];
