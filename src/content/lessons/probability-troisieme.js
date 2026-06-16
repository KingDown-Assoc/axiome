// Field "Probability" — MIDDLE module (3e year): the union formula and the
// stabilization of frequencies. Official cycle-4 programme: knowing and applying
// the relation P(A ∪ B) + P(A ∩ B) = P(A) + P(B), SIMULATING independent random
// experiments, and OBSERVING the stabilization of frequencies as the number of
// repetitions grows — linking frequency and probability according to the number
// of repetitions: the law of large numbers in embryo.
import { randint, pick } from "../../core/exercises.js";

const unionIntersection = {
  id: "probability.middle.union-intersection",
  level: "middle", domain: "probability",
  title: "P(A∪B) : la formule du ou",
  tagline: "Corriger le double comptage : la formule du crible sur des séries de lancers.",
  prereqs: ["probability.middle.deux-epreuves"],
  intuition:
    "Additionner $P(A)$ et $P(B)$ pour avoir le « ou » ? Piège : les issues communes sont comptées **deux fois**.\n\nLa formule rend la monnaie : $P(A \\cup B) + P(A \\cap B) = P(A) + P(B)$ — autrement dit, $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ : on additionne, puis on **rembourse** le doublon.",
  depths: {
    discovery:
      "**Avec les mains** : sur un dé, $A = $ pair $= \\{2, 4, 6\\}$ et $B = $ plus grand que 4 $= \\{5, 6\\}$ — l'addition naïve donne $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$, mais $A \\cup B = \\{2, 4, 5, 6\\}$ ne vaut que $\\frac{4}{6}$ : le **6**, pair **et** grand, a été compté deux fois — l'écart est exactement $P(A \\cap B) = \\frac{1}{6}$.",
    standard:
      "**En image** : deux cercles qui se chevauchent — additionner les disques compte la lentille centrale **deux fois** : il faut la retrancher une fois. Et le cas confortable : si $A \\cap B = \\varnothing$ (événements **incompatibles** — un dé ne peut être 2 et 5), la lentille est vide et l'addition simple devient légale : $P(A \\cup B) = P(A) + P(B)$ — l'exception qui justifie le réflexe.",
    advanced:
      "**Dans la tête** : la 5e promettait que la fréquence approche la probabilité — la 3e le **constate** : simule mille lancers de dé (chaque lancer **indépendant** des autres) et trace la fréquence du 6 au fil des lancers : elle tangue violemment au début (après 10 lancers, 0 % ou 30 % sont courants), puis **se stabilise** vers $\\frac{1}{6} \\approx 16{,}7\\,\\%$ — non parce que le dé se souvient, mais parce que les écarts se **diluent** dans le nombre. C'est la stabilisation des fréquences, que Jacques Bernoulli a démontrée (la « loi des grands nombres ») : le pont définitif entre l'expérience qui compte et la théorie qui prévoit — et la raison d'être des assurances, des sondages et des casinos.",
  },
  keyIdea: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ — rembourser le double comptage ; incompatibles ($A \\cap B = \\varnothing$) : addition simple. Et en répétant : la **fréquence se stabilise** vers la probabilité.",
  why:
    "Pourquoi une formule pour un dessin si simple ? Parce que le double comptage est l'erreur statistique la plus commise au monde — « 40 % aiment le foot, 30 % le tennis, donc 70 % aiment un sport » oublie ceux qui aiment les deux. La formule du « ou » est un correctif universel ; et la stabilisation des fréquences est sa contrepartie expérimentale : ensemble, elles font des probabilités une science qui se vérifie.",
  examples: [
    { title: "Le 6 compté deux fois", steps: [
      { p: "$A = \\{2, 4, 6\\}$, $B = \\{5, 6\\}$ : $P(A) + P(B) = \\dfrac{5}{6}$, mais $A \\cup B = \\{2, 4, 5, 6\\}$." },
      { p: "$P(A \\cup B) = \\dfrac{4}{6}$ — l'écart $\\dfrac{1}{6}$ est le 6, membre des deux clubs : $P(A \\cap B)$." },
    ] },
    { title: "Le cas incompatible", steps: [
      { p: "$A = \\{1, 2\\}$, $B = \\{5, 6\\}$ : aucune issue commune — $A \\cap B = \\varnothing$." },
      { p: "$P(A \\cup B) = \\dfrac{2}{6} + \\dfrac{2}{6} = \\dfrac{4}{6}$ — l'addition simple, enfin légale." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Sur un dé, $A = $ pair, $B = $ plus grand que 4. Calcule $P(A) + P(B)$ puis $P(A \\cup B)$ en listant les issues : d'où vient l'écart ?", solution: "$P(A) + P(B) = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$ ; or $A \\cup B = \\{2, 4, 5, 6\\}$ : $P = \\frac{4}{6}$ — l'écart $\\frac{1}{6}$ est le **6**, compté deux fois : c'est $P(A \\cap B)$, et la formule le rembourse." },
    { tier: "warmup", prompt: "Énonce la formule reliant $P(A \\cup B)$, $P(A \\cap B)$, $P(A)$ et $P(B)$, et sa version « moins ».", solution: "$P(A \\cup B) + P(A \\cap B) = P(A) + P(B)$ — soit $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ : additionner les deux clubs, retrancher une fois les doubles adhérents." },
    { tier: "application", prompt: "Quand a-t-on le droit d'écrire $P(A \\cup B) = P(A) + P(B)$ tout court ? Donne un exemple et un contre-exemple sur un dé.", solution: "Quand $A$ et $B$ sont **incompatibles** : $A \\cap B = \\varnothing$. Exemple : $\\{1, 2\\}$ et $\\{5, 6\\}$ (rien en commun) ; contre-exemple : pair et plus-grand-que-4 — le 6 appartient aux deux, l'addition simple surcompte." },
    { tier: "challenge", prompt: "Dans une classe, $60\\,\\%$ font du foot, $30\\,\\%$ du tennis, $15\\,\\%$ les deux. Quelle proportion fait au moins un des deux sports ? Et aucun ?", solution: "$P(F \\cup T) = 0{,}6 + 0{,}3 - 0{,}15 = $ **75 %** — sans la correction, on aurait annoncé 90 % en comptant deux fois les biathlètes. Aucun sport : le contraire — $1 - 0{,}75 = $ **25 %** : la formule du ou et le complément de 4e, main dans la main." },
    { tier: "exam", prompt: "On simule 10, 100 puis 10 000 lancers d'un dé équilibré et on note la fréquence du 6 : 0 %, puis 19 %, puis 16,8 %. Explique ce phénomène, son nom, et pourquoi il ne signifie pas que le dé « se souvient ».", solution: "C'est la **stabilisation des fréquences** : sur peu de lancers, le hasard tangue (0 % après 10 lancers n'a rien d'étrange) ; en répétant des expériences **indépendantes**, les écarts se **diluent** et la fréquence se range vers la probabilité $\\frac{1}{6} \\approx 16{,}7\\,\\%$. Le dé n'a aucune mémoire — chaque lancer reste à $\\frac{1}{6}$ — c'est la **masse** des répétitions qui lisse, pas une compensation : Bernoulli en a fait un théorème (la loi des grands nombres), et c'est le pont définitif entre la fréquence qu'on mesure et la probabilité qu'on calcule." },
  ],
  practice: [
    { tier: "warmup", label: "Rembourser le doublon", make: (r) => {
      const pa = randint(r, 2, 4); const pb = randint(r, 2, 3); const pab = randint(r, 1, Math.min(pa, pb));
      return { prompt: `Sur un dé : $P(A) = \\frac{${pa}}{6}$, $P(B) = \\frac{${pb}}{6}$, $P(A \\cap B) = \\frac{${pab}}{6}$. Que vaut $P(A \\cup B)$ ? (numérateur sur 6)`, answer: pa + pb - pab, solution: `$\\frac{${pa} + ${pb} - ${pab}}{6} = \\frac{${pa + pb - pab}}{6}$ — additionner, rembourser : **${pa + pb - pab}**.` };
    } },
    { tier: "application", label: "Incompatibles ou pas ?", make: (r) => {
      const ok = r() < 0.5;
      const paires = ok ? pick(r, [["1, 2", "5, 6"], ["1", "4, 6"], ["2, 3", "6"]]) : pick(r, [["2, 4, 6", "5, 6"], ["1, 2, 3", "3, 5"], ["4, 5", "5, 6"]]);
      return { prompt: `Sur un dé : $A = \\{${paires[0]}\\}$ et $B = \\{${paires[1]}\\}$. Incompatibles ? (1 = oui, 0 = non)`, answer: ok ? 1 : 0, solution: `${ok ? "Aucune issue commune : $A \\cap B = \\varnothing$ — **incompatibles**, addition simple permise" : "Une issue commune existe — **pas incompatibles** : la formule complète s'impose"}.` };
    } },
    { tier: "challenge", label: "La fréquence qui se range", make: (r) => {
      const n = pick(r, [6, 60, 600, 6000]);
      return { prompt: `On lance un dé ${n} fois. Autour de combien de 6 la stabilisation des fréquences fait-elle attendre le compte ?`, answer: n / 6, solution: `$\\frac{1}{6}$ de ${n} $= $ **${n / 6}** — d'autant plus fiable que ${n} est grand : les écarts se diluent.` };
    } },
  ],
};

export default [unionIntersection];
