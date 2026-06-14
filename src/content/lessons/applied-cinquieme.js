// Field "Applied mathematics" — MIDDLE module (5e year): the proportionality
// coefficient. Official cycle-4 programme (thème « Proportionnalité, fonctions »):
// using a coefficient in concrete contexts (unit price, average speed, scale),
// representing a proportional situation by a table OR a graph, recognizing
// proportionality from a table or a graph, recognizing graphically that a scatter
// plot is (or is not) associated with proportionality — points ALIGNED WITH THE
// ORIGIN (the lone 5e "Fonctions" objective, integrated here), the expression
// "en fonction de", applying percentages (delegate election), and the simple
// false-position method as the official historical extension.
import { randint, pick } from "../../core/exercises.js";

const coefficient = {
  id: "applied.middle.coefficient",
  level: "middle", domain: "applied",
  title: "Le coefficient de proportionnalité",
  tagline: "Un seul nombre fait toute la table — et le graphique l'avoue : aligné avec l'origine.",
  prereqs: ["applied.middle.proportionality-unit"],
  intuition:
    "Tes procédures de 6e (retour à l'unité, linéarité) se condensent en **un nombre** : le **coefficient de proportionnalité** — celui qui fait passer de toute valeur de la première ligne à la seconde, par une seule multiplication.\n\nTu le connais déjà sous trois déguisements : le **prix unitaire** (2,40 €/kg), la **vitesse moyenne** (80 km/h), l'**échelle** d'une carte (1/100 000) — chacun dit « multiplie par moi ».",
  depths: {
    discovery:
      "**Avec les mains** : 3 kg de tomates coûtent 7,20 € — le coefficient est $7{,}20 \\div 3 = 2{,}40$ €/kg : toute la table en découle (5 kg ? $5 \\times 2{,}40 = 12$ €). Et à l'envers : avec 18 €, combien de kilos ? $18 \\div 2{,}40 = 7{,}5$ kg — le coefficient travaille dans les deux sens.",
    standard:
      "**En image** : place les couples (kg ; €) dans un repère — les points d'une situation de proportionnalité sont **alignés avec l'origine** : c'est la **caractérisation graphique**, et elle marche dans les deux sens ! Alignés par l'origine ⟹ proportionnel (le coefficient est la « pente » de la file de points) ; un point qui décroche, ou une droite qui rate l'origine (un abonnement + prix au kilo…), et la proportionnalité tombe. Le prix est **en fonction de** la masse : l'expression officielle de la dépendance.",
    advanced:
      "**Dans la tête** : le pourcentage est un coefficient déguisé — à l'élection des délégués, Chloé obtient 12 voix sur 24 : $\\frac{12}{24} = \\frac{50}{100} = 50\\,\\%$ — appliquer $t\\,\\%$, c'est multiplier par $\\frac{t}{100}$. Et les anciens résolvaient sans algèbre par **fausse position** : « si 5 kg coûtaient 10 €, mais on observe 12 € » — essaie une valeur, mesure l'écart, corrige proportionnellement : la linéarité garantit que la correction est exacte. Trois mille ans avant les équations, le coefficient suffisait.",
  },
  keyIdea: "Coefficient $=$ valeur d'arrivée $\\div$ valeur de départ — il fait toute la table (et se remonte : $\\div$). Graphique : proportionnel ⟺ points **alignés avec l'origine**.",
  why:
    "Pourquoi un graphique, quand la table suffit ? Parce que l'œil détecte l'alignement en un instant, là où la table exige de tester chaque colonne : sur un nuage de points réels (taille/pointure, distance/temps), la proportionnalité **se voit** — ou son absence. Le graphique est le détecteur de mensonges de la proportionnalité ; en 4e et 3e, cette droite par l'origine deviendra la première des **fonctions**.",
  examples: [
    { title: "Le coefficient des tomates", steps: [
      { p: "3 kg → 7,20 € : coefficient $= 7{,}20 \\div 3 = 2{,}40$ €/kg." },
      { p: "5 kg → $5 \\times 2{,}40 = 12$ € ; et 18 € → $18 \\div 2{,}40 = $ **7,5 kg** — un nombre, toute la table, dans les deux sens." },
    ] },
    { title: "L'élection des délégués", steps: [
      { p: "24 votants : Alexis 6, Chloé 12, Salma 3, Djibril 3." },
      { p: "$\\frac{6}{24} = 25\\,\\%$ ; $\\frac{12}{24} = 50\\,\\%$ ; $\\frac{3}{24} = 12{,}5\\,\\%$ chacun — le pourcentage est le coefficient vers 100." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Donne trois coefficients de proportionnalité de la vie courante, avec leurs unités.", solution: "Le **prix unitaire** (€/kg), la **vitesse moyenne** (km/h), l'**échelle** d'une carte (1 cm pour 1 km…) — trois noms, un même rôle : « multiplie par moi »." },
    { tier: "warmup", prompt: "3 kg de tomates coûtent 7,20 €. Trouve le coefficient, puis le prix de 5 kg.", solution: "$7{,}20 \\div 3 = 2{,}40$ €/kg ; $5 \\times 2{,}40 = $ **12 €** — le coefficient d'abord, tout le reste suit." },
    { tier: "application", prompt: "Une voiture roule à vitesse constante : 240 km en 3 h. Quelle est sa vitesse, et quelle distance en 5 h ?", solution: "$240 \\div 3 = 80$ km/h (le coefficient !) ; $5 \\times 80 = $ **400 km** — la vitesse moyenne est un coefficient de proportionnalité entre temps et distance." },
    { tier: "challenge", prompt: "Sur un graphique, les points (1 ; 3), (2 ; 6), (4 ; 12) d'une part, et (1 ; 5), (2 ; 8), (4 ; 14) d'autre part. Quelle série est proportionnelle ? Justifie graphiquement et par le calcul.", solution: "La **première** : coefficient constant 3, points **alignés avec l'origine**. La seconde : $5 \\div 1 = 5$ mais $8 \\div 2 = 4$ — coefficients différents, et la droite des points raterait l'origine (c'est du type « abonnement + prix unitaire »)." },
    { tier: "exam", prompt: "À l'élection des délégués, 24 élèves votent : Alexis 6, Chloé 12, Salma 3, Djibril 3. Calcule le pourcentage de chacun et vérifie le total.", solution: "Alexis $\\frac{6}{24} = $ **25 %** ; Chloé $\\frac{12}{24} = $ **50 %** ; Salma et Djibril $\\frac{3}{24} = $ **12,5 %** chacun. Total : $25 + 50 + 12{,}5 + 12{,}5 = 100\\,\\%$ ✓ — les pourcentages d'un même tout se somment à 100 : la régulation est dans la structure." },
  ],
  practice: [
    { tier: "warmup", label: "Trouver le coefficient", make: (r) => {
      const k = pick(r, [1.5, 2, 2.5, 3, 4, 0.5]); const a = randint(r, 2, 12);
      const b = Math.round(a * k * 100) / 100;
      return { prompt: `${a} kg coûtent ${String(b).replace(".", ",")} €. Quel est le prix d'un kilo (le coefficient) ?`, answer: k, solution: `$${String(b).replace(".", ",")} \\div ${a} = $ **${String(k).replace(".", ",")} €/kg**.` };
    } },
    { tier: "application", label: "Le coefficient au travail", make: (r) => {
      const v = pick(r, [60, 70, 80, 90, 100, 110]); const t = randint(r, 2, 6);
      if (r() < 0.5) return { prompt: `À ${v} km/h pendant ${t} h : quelle distance ?`, answer: v * t, solution: `$${t} \\times ${v} = $ **${v * t} km** — le coefficient multiplie.` };
      return { prompt: `${v * t} km parcourus à ${v} km/h : combien d'heures ?`, answer: t, solution: `$${v * t} \\div ${v} = $ **${t} h** — le coefficient se remonte en divisant.` };
    } },
    { tier: "challenge", label: "Le pourcentage du tout", make: (r) => {
      const tot = pick(r, [20, 24, 25, 40, 50]); const part = pick(r, [tot / 4, tot / 2, tot / 5, (3 * tot) / 4].filter(x => Number.isInteger(x) && x >= 1));
      return { prompt: `${part} voix sur ${tot} votants : quel pourcentage ?`, answer: (part / tot) * 100, solution: `$\\frac{${part}}{${tot}} = \\frac{${(part / tot) * 100}}{100} = $ **${String((part / tot) * 100).replace(".", ",")} %**.` };
    } },
  ],
};

export default [coefficient];
