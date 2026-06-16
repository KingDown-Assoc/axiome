// Field "Discrete mathematics" — MIDDLE module (4e year): statistical
// indicators. Official cycle-4 programme: computing a WEIGHTED MEAN for a small
// discrete series (raw data, table, or bar chart), determining and INTERPRETING
// a MEDIAN for a small raw series, computing and interpreting the RANGE,
// understanding how the median and the mean EVOLVE when an extreme value is
// added, solving problems mixing the indicators, COMPARING statistical series,
// and using a spreadsheet — with Kersseboom's political arithmetic (18th c.) as
// the official historical extension.
import { randint, pick } from "../../core/exercises.js";

const mediane = {
  id: "discrete.middle.mediane",
  level: "middle", domain: "discrete",
  title: "Moyenne pondérée, médiane, étendue",
  tagline: "La médiane résiste aux valeurs extrêmes, là où la moyenne est sensible.",
  prereqs: ["discrete.middle.moyenne"],
  intuition:
    "Ta moyenne de 5e gagne des **poids** : un devoir coefficient 3 compte trois fois — la **moyenne pondérée** multiplie chaque valeur par son coefficient avant de diviser par le **total des coefficients**.\n\nEt deux nouveaux indicateurs entrent : la **médiane** (la valeur du milieu, une fois la série rangée — autant de valeurs avant qu'après) et l'**étendue** (max $-$ min : la largeur de la série).",
  depths: {
    discovery:
      "**Avec les mains** : notes 8, 12, 13, 15, 17 rangées — la médiane est la **3e** : 13 (deux notes en dessous, deux au-dessus). Série paire 8, 12, 13, 15 ? La médiane se loge **entre** 12 et 13 : 12,5 — le milieu de la file, pas le milieu des valeurs.",
    standard:
      "**En image** : la pondérée au travail — contrôles 11 et 14 (coef 1), devoir 8 (coef 3) : $\\dfrac{11 + 14 + 8 \\times 3}{1 + 1 + 3} = \\dfrac{49}{5} = 9{,}8$ — le devoir lesté tire la moyenne vers lui. L'**étendue** complète le tableau : $17 - 8 = 9$ points d'écart : deux classes peuvent avoir la même moyenne et des étendues opposées — l'une homogène, l'autre écartelée.",
    advanced:
      "**Dans la tête** : le duel moyenne-médiane — salaires 1 500, 1 600, 1 700, 1 800, 1 900 € : moyenne $=$ médiane $= 1\\,700$. Ajoute un patron à 20 000 € : la **moyenne bondit à 4 750**, la **médiane glisse à peine** (1 750 — entre 1 700 et 1 800). La moyenne est un point d'équilibre : un poids excentré la déporte ; la médiane ne compte que les **rangs** : l'extrême n'est qu'une valeur de plus au bout de la file. C'est pourquoi on annonce le salaire **médian** d'un pays — et Kersseboom, dès le XVIIIe siècle, fondait son « arithmétique politique » sur ces résumés de populations : gouverner, c'est déjà choisir son indicateur.",
  },
  keyIdea: "Pondérée : $\\dfrac{\\sum \\text{valeur} \\times \\text{coef}}{\\sum \\text{coefs}}$. **Médiane** : la valeur du **milieu** de la série rangée. **Étendue** : max $-$ min. Valeur extrême : la moyenne bouge, la médiane résiste.",
  why:
    "Pourquoi trois indicateurs au lieu d'un ? Parce qu'un seul nombre ment toujours un peu : la moyenne dit le **total partagé**, la médiane dit le **milieu de la file**, l'étendue dit la **dispersion** — et chacun a son talon d'Achille. Lire une statistique, c'est demander : lequel m'a-t-on donné, et que cache-t-il ? La 4e t'arme contre les résumés trop beaux pour être complets.",
  examples: [
    { title: "La pondérée du trimestre", steps: [
      { p: "Contrôles 11 et 14 (coef 1), devoir 8 (coef 3) : somme pondérée $= 11 + 14 + 24 = 49$." },
      { p: "Coefs : $1 + 1 + 3 = 5$ → moyenne $= \\dfrac{49}{5} = 9{,}8$ — le coef 3 pèse trois fois." },
    ] },
    { title: "Le patron dans la série", steps: [
      { p: "1 500, 1 600, 1 700, 1 800, 1 900 : moyenne et médiane à 1 700 €." },
      { p: "Avec 20 000 € : moyenne **4 750**, médiane **1 750** — l'extrême déporte l'une, effleure l'autre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Range la série 13, 8, 17, 12, 15 et donne sa médiane. Que signifie-t-elle ?", solution: "Rangée : 8, 12, **13**, 15, 17 — médiane $= 13$ : autant de valeurs **avant** qu'**après** : le milieu de la file, pas des valeurs." },
    { tier: "warmup", prompt: "Contrôles 11 et 14 (coef 1 chacun), devoir 8 (coef 3) : calcule la moyenne pondérée.", solution: "$\\dfrac{11 \\times 1 + 14 \\times 1 + 8 \\times 3}{1 + 1 + 3} = \\dfrac{49}{5} = $ **9,8** — chaque note compte autant que son coefficient, et on divise par le **total des coefs** (5, pas 3)." },
    { tier: "application", prompt: "Série 8, 12, 13, 15, 17 : donne l'étendue, puis la médiane de la série paire 8, 12, 13, 15.", solution: "Étendue $= 17 - 8 = $ **9** ; série paire : la médiane se loge entre les deux du milieu : $\\dfrac{12 + 13}{2} = $ **12,5** — la file a deux milieux, on prend leur moyenne." },
    { tier: "challenge", prompt: "Salaires : 1 500, 1 600, 1 700, 1 800, 1 900 €. On embauche un directeur à 20 000 €. Calcule moyenne et médiane avant/après, et conclus.", solution: "Avant : moyenne $=$ médiane $= 1\\,700$ €. Après : moyenne $= \\dfrac{28\\,500}{6} = $ **4 750 €**, médiane $= \\dfrac{1\\,700 + 1\\,800}{2} = $ **1 750 €** — la moyenne triple presque, la médiane glisse de 50 € : face aux extrêmes, **la médiane résiste** ; c'est elle qu'il faut demander." },
    { tier: "exam", prompt: "Deux classes ont 12 de moyenne. La classe A a une étendue de 4, la classe B de 16. Que peut-on dire de chacune, et quel indicateur supplémentaire demanderais-tu pour comparer vraiment ?", solution: "Même centre, dispersions opposées : A est **homogène** (toutes les notes entre ~10 et 14), B est **écartelée** (des très faibles et des très forts coexistent). Pour trancher, demander la **médiane** de chacune : si celle de B est sous 12, la moitié de la classe est en difficulté malgré la moyenne flatteuse — un indicateur seul ne résume jamais une population, Kersseboom le savait déjà en comptant les vivants et les morts." },
  ],
  practice: [
    { tier: "warmup", label: "Le milieu de la file", make: (r) => {
      const base = randint(r, 6, 12);
      const vals = [base, base + randint(r, 1, 3), base + randint(r, 4, 6), base + randint(r, 7, 9), base + randint(r, 10, 12)];
      const shuffled = [...vals].sort(() => r() - 0.5);
      return { prompt: `Donne la médiane de la série : ${shuffled.join(" ; ")}.`, answer: vals[2], solution: `Rangée : ${vals.join(", ")} — la 3e valeur : **${vals[2]}**.` };
    } },
    { tier: "application", label: "La pondérée", make: (r) => {
      const a = randint(r, 8, 16); const b = randint(r, 8, 16); const c = randint(r, 6, 14); const k = pick(r, [2, 3]);
      const m = Math.round(((a + b + c * k) / (2 + k)) * 10) / 10;
      return { prompt: `Notes ${a} et ${b} (coef 1), devoir ${c} (coef ${k}) : moyenne pondérée ? (arrondie au dixième)`, answer: m, solution: `$\\dfrac{${a} + ${b} + ${c} \\times ${k}}{${2 + k}} = \\dfrac{${a + b + c * k}}{${2 + k}} = $ **${String(m).replace(".", ",")}**.` };
    } },
    { tier: "challenge", label: "L'étendue à l'envers", make: (r) => {
      const min = randint(r, 4, 10); const et = randint(r, 5, 12);
      return { prompt: `Une série a pour minimum ${min} et pour étendue ${et}. Quel est son maximum ?`, answer: min + et, solution: `max $=$ min $+$ étendue $= ${min} + ${et} = $ **${min + et}** — la définition remontée.` };
    } },
  ],
};

export default [mediane];
