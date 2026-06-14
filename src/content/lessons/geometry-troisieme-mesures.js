// Field "Geometry" — MIDDLE module (3e year), part 2: the sphere and the ball.
// Official cycle-4 programme: defining the BALL and the SPHERE, great circles
// and the diameter; visualizing and producing SECTIONS of a cuboid parallel to a
// face, of a cylinder parallel or perpendicular to its axis, and of a ball;
// knowing and using the VOLUME formula of a ball of given radius — with
// Archimedes' intuition (two thirds of the circumscribed cylinder, later proved
// formally by Newton) and the five regular polyhedra illustrated by Leonardo da
// Vinci for Pacioli's De divina proportione as official extensions.
import { randint, pick } from "../../core/exercises.js";

const sphere = {
  id: "geometry.middle.sphere",
  level: "middle", domain: "geometry",
  title: "Sphère, boule et sections",
  tagline: "V = 4/3 πr³ — les deux tiers du cylindre, la fierté d'Archimède.",
  prereqs: ["geometry.middle.pyramide-cone"],
  intuition:
    "La **sphère** de centre O et de rayon $r$ : tous les points à distance **exactement** $r$ de O — la peau. La **boule** : tous les points à distance **au plus** $r$ — le fruit entier.\n\nSon volume couronne le cycle : $V = \\dfrac{4}{3} \\pi r^3$ — le rayon au **cube** : la sphère est l'objet le plus rond, et le plus efficace, de la géométrie.",
  depths: {
    discovery:
      "**Avec les mains** : couper pour comprendre — la section d'une **boule** par un plan est toujours un **disque** (l'orange tranchée !), maximal quand le plan passe par le centre : un **grand cercle**, de rayon $r$ (l'équateur). Le pavé tranché parallèlement à une face donne un rectangle identique à la face ; le cylindre, un disque (⊥ à l'axe) ou un rectangle (∥ à l'axe) — la section révèle l'anatomie du solide.",
    standard:
      "**En image** : la formule au travail — ballon de rayon 11 cm : $V = \\dfrac{4}{3} \\pi \\times 11^3 = \\dfrac{4}{3} \\pi \\times 1\\,331 \\approx 5\\,575$ cm³, environ 5,6 L. Et l'exposant **3** rappelle sa loi : doubler le rayon multiplie le volume par $2^3 = 8$ — une orange deux fois plus large nourrit huit fois plus.",
    advanced:
      "**Dans la tête** : d'où vient le $\\frac{4}{3}$ ? Archimède (IIIe siècle av. J.-C.) a découvert que la boule remplit exactement les **deux tiers** du cylindre qui l'enserre : cylindre de rayon $r$ et de hauteur $2r$, volume $\\pi r^2 \\times 2r = 2\\pi r^3$ — les deux tiers font $\\dfrac{4}{3}\\pi r^3$ ✓. Il en fut si fier qu'il voulut la sphère dans son cylindre gravée sur sa **tombe** (Cicéron la retrouva, envahie de ronces, deux siècles plus tard) ; la démonstration pleinement rigoureuse attendit Newton et le calcul infinitésimal. Une formule, deux mille ans d'écart entre l'intuition et la preuve — et au passage, les Grecs savaient aussi qu'il n'existe que **cinq** polyèdres parfaitement réguliers, que Léonard de Vinci dessina pour le traité de Pacioli : le catalogue complet des solides parfaits tient sur une main.",
  },
  keyIdea: "Sphère $=$ la peau (distance $= r$), boule $=$ le plein (distance $\\leq r$). Toute section plane d'une boule est un **disque** (grand cercle par le centre). $V = \\dfrac{4}{3}\\pi r^3$ — les deux tiers du cylindre circonscrit.",
  why:
    "Pourquoi la nature aime-t-elle tant la sphère — gouttes, bulles, planètes ? Parce qu'elle enferme le **plus de volume avec le moins de surface** : la forme la plus économe qui soit. La tension de l'eau, la gravité des astres ne calculent pas $\\frac{4}{3}\\pi r^3$ — elles minimisent, et la sphère gagne à chaque fois. La formule d'Archimède mesure le chef-d'œuvre que la physique sculpte toute seule.",
  examples: [
    { title: "Le ballon de basket", steps: [
      { p: "Rayon 11 cm : $V = \\dfrac{4}{3} \\pi \\times 11^3 = \\dfrac{4}{3} \\pi \\times 1\\,331$." },
      { p: "$\\approx 5\\,575$ cm³, soit **5,6 L** d'air — le cube du rayon mène la danse." },
    ] },
    { title: "Les deux tiers d'Archimède", steps: [
      { p: "Cylindre enserrant la boule : rayon $r$, hauteur $2r$ — volume $2\\pi r^3$." },
      { p: "Les deux tiers : $\\dfrac{2}{3} \\times 2\\pi r^3 = \\dfrac{4}{3}\\pi r^3$ ✓ — la formule sort du cylindre." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle différence entre la sphère et la boule ? Et qu'obtient-on en coupant une boule par un plan ?", solution: "La **sphère** est la peau (distance exactement $r$ du centre), la **boule** est le fruit plein (distance $\\leq r$) — et toute section plane d'une boule est un **disque**, maximal au centre : le grand cercle." },
    { tier: "warmup", prompt: "Calcule le volume d'une boule de rayon 3 cm (valeur exacte en π, puis arrondi).", solution: "$V = \\dfrac{4}{3}\\pi \\times 3^3 = \\dfrac{4}{3}\\pi \\times 27 = 36\\pi \\approx $ **113 cm³** — le rayon au cube, puis le $\\frac{4}{3}\\pi$." },
    { tier: "application", prompt: "Décris les sections : d'un pavé par un plan parallèle à une face ; d'un cylindre par un plan perpendiculaire à son axe, puis parallèle à son axe.", solution: "Pavé ∥ face : un **rectangle identique à la face** ; cylindre ⊥ axe : un **disque** (le rayon du cylindre) ; cylindre ∥ axe : un **rectangle** (hauteur × corde) — chaque coupe raconte la structure du solide." },
    { tier: "challenge", prompt: "On double le rayon d'une boule. Par combien son volume est-il multiplié ? Et pour le rayon multiplié par 3 ?", solution: "Par $2^3 = $ **8** ; par $3^3 = $ **27** — le volume vit en dimension 3 : l'exposant du rayon est la signature de l'espace (tes sauts d'unités de 5e le disaient déjà)." },
    { tier: "exam", prompt: "Vérifie l'intuition d'Archimède : calcule le volume du cylindre de rayon r et de hauteur 2r qui enserre la boule de rayon r, puis montre que la boule en occupe les deux tiers. Pourquoi cette figure ornait-elle sa tombe ?", solution: "Cylindre : $\\pi r^2 \\times 2r = 2\\pi r^3$ ; rapport : $\\dfrac{\\frac{4}{3}\\pi r^3}{2\\pi r^3} = \\dfrac{4}{3} \\times \\dfrac{1}{2} = \\dfrac{2}{3}$ ✓ — la boule remplit exactement les deux tiers de son étui. Archimède jugea ce rapport sa plus belle découverte et demanda la figure sur sa tombe — Cicéron l'y retrouva ; Newton, deux millénaires après, en signa la preuve complète : l'intuition géniale a précédé la rigueur de vingt siècles." },
  ],
  practice: [
    { tier: "warmup", label: "Le cube du rayon", make: (r) => {
      const ray = randint(r, 2, 6);
      return { prompt: `Boule de rayon ${ray} cm : $V = \\frac{4}{3}\\pi \\times \\,?$ — que vaut $r^3$ ?`, answer: ray ** 3, solution: `$${ray}^3 = $ **${ray ** 3}** — le rayon au cube d'abord, le $\\frac{4}{3}\\pi$ ensuite.` };
    } },
    { tier: "application", label: "Doubler, c'est octupler", make: (r) => {
      const k = pick(r, [2, 3, 4]);
      return { prompt: `On multiplie le rayon d'une boule par ${k} : le volume est multiplié par ?`, answer: k ** 3, solution: `$${k}^3 = $ **${k ** 3}** — la dimension 3 cube le coefficient.` };
    } },
    { tier: "challenge", label: "Le rayon remonté", make: (r) => {
      const ray = randint(r, 2, 7);
      return { prompt: `Une boule a un volume de $\\frac{4}{3}\\pi \\times ${ray ** 3}$ cm³. Quel est son rayon ?`, answer: ray, solution: `$r^3 = ${ray ** 3}$ → $r = $ **${ray} cm** — la racine cubique en embuscade : remonter un cube.` };
    } },
  ],
};

export default [sphere];
