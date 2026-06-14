// Field "Numbers" — MIDDLE module (3e year), part 2: the equation x² = a.
// Official cycle-4 programme: solving equations of the form x² = a analytically
// AND graphically, solving problems using the square root — with the parabola
// and its focus (satellite dishes) and root-extraction algorithms (Heron) as the
// official historical and cultural extensions.
import { randint, pick } from "../../core/exercises.js";

const equationCarre = {
  id: "numbers.middle.equation-carre",
  level: "middle", domain: "numbers",
  title: "Les équations x² = a",
  tagline: "Deux solutions, une ou zéro — le signe de a décide.",
  prereqs: ["numbers.middle.racine-carree", "algebra.middle.equations-degre1"],
  intuition:
    "Quel nombre a pour carré 9 ? Réflexe : 3. Mais $(-3)^2 = 9$ aussi — l'équation $x^2 = 9$ a **deux** solutions : $3$ et $-3$.\n\nLa règle complète : $x^2 = a$ a **deux solutions** $\\sqrt{a}$ et $-\\sqrt{a}$ si $a > 0$, **une seule** ($0$) si $a = 0$, et **aucune** si $a < 0$ — un carré n'est jamais négatif.",
  depths: {
    discovery:
      "**Avec les mains** : la règle des signes de 4e explique tout — positif × positif et négatif × négatif donnent du positif : deux chemins mènent à 9, aucun ne mène à $-9$. L'oubli de la solution négative est l'erreur classique : $\\sqrt{9} = 3$ (la racine est **le** positif), mais l'équation $x^2 = 9$ en veut deux.",
    standard:
      "**En image** : la résolution **graphique** — trace la courbe de $x \\to x^2$ (la parabole !) et la droite horizontale $y = a$ : si $a > 0$, elles se coupent en **deux points** symétriques ($\\pm\\sqrt{a}$) ; si $a = 0$, elles se touchent en un seul (le sommet) ; si $a < 0$, la droite passe **sous** la parabole : aucune rencontre. Le dessin raconte exactement la règle.",
    advanced:
      "**Dans la tête** : et quand $a$ n'est pas un carré parfait ? $x^2 = 50$ : solutions exactes $\\pm\\sqrt{50}$, encadrées entre 7 et 8 (ta 4e) — et Héron d'Alexandrie savait les **raffiner** : pars d'une estimation $x$, remplace-la par la moyenne $\\frac{1}{2}\\left(x + \\frac{50}{x}\\right)$, répète : $7 \\to 7{,}07 \\to 7{,}0711\\ldots$ — chaque tour double les décimales justes. C'est l'algorithme que ta calculatrice exécute en secret, et l'un des plus vieux du monde : ta boucle de logic l'écrirait en trois lignes.",
  },
  keyIdea: "$x^2 = a$ : deux solutions $\\pm\\sqrt{a}$ si $a > 0$, une ($0$) si $a = 0$, **aucune** si $a < 0$. Graphiquement : la parabole coupée par la droite $y = a$.",
  why:
    "Pourquoi tant insister sur la deuxième solution ? Parce que l'oublier fausse la moitié des problèmes — et parce que ce comptage des solutions (deux, une, zéro selon un signe) est le **prototype** de toute la théorie des équations du lycée : le discriminant de la seconde fera exactement ce tri. La parabole coupée par une droite, c'est le second degré tout entier en une image.",
  examples: [
    { title: "Les deux chemins vers 9", steps: [
      { p: "$x^2 = 9$ : $3^2 = 9$ et $(-3)^2 = 9$ — la règle des signes ouvre deux portes." },
      { p: "Solutions : $3$ et $-3$ — et $\\sqrt{9}$ ne désigne que la première." },
    ] },
    { title: "La parabole tranchée", steps: [
      { p: "Courbe de $x^2$, droite $y = 16$ : deux intersections, en $-4$ et $4$." },
      { p: "Droite $y = -5$ : sous la parabole — **aucune** solution : un carré n'est jamais négatif." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous $x^2 = 9$. Pourquoi deux solutions, alors que $\\sqrt{9}$ n'en désigne qu'une ?", solution: "$x = 3$ **ou** $x = -3$ — deux signes, deux carrés égaux à 9. La racine $\\sqrt{9} = 3$ est par définition **le positif** ; l'équation, elle, accepte les deux." },
    { tier: "warmup", prompt: "Résous : $x^2 = 25$ ; $x^2 = 0$ ; $x^2 = -4$.", solution: "$x = 5$ ou $x = -5$ ; $x = 0$ (une seule) ; **aucune solution** — un carré n'est jamais négatif : le signe de $a$ compte les solutions." },
    { tier: "application", prompt: "Résous $x^2 = 50$ : solutions exactes, puis encadrement entre deux entiers.", solution: "$x = \\sqrt{50}$ ou $x = -\\sqrt{50}$ ; et $7 < \\sqrt{50} < 8$ (car $49 < 50 < 64$) — l'exact d'abord, l'approché ensuite." },
    { tier: "challenge", prompt: "Décris la résolution graphique de $x^2 = a$ pour $a = 16$, $a = 0$, $a = -5$.", solution: "La parabole de $x \\to x^2$ coupée par la droite horizontale $y = a$ : pour 16, **deux points** ($\\pm 4$, symétriques) ; pour 0, **un seul** (le sommet) ; pour $-5$, la droite passe sous la courbe : **aucun** — le dessin égrène la règle." },
    { tier: "exam", prompt: "Applique deux tours de la méthode de Héron à $x^2 = 50$ en partant de $x = 7$ : calcule $\\frac{1}{2}\\left(x + \\frac{50}{x}\\right)$ deux fois (arrondis à 4 décimales) et compare à $\\sqrt{50} \\approx 7{,}0711$.", solution: "Tour 1 : $\\frac{1}{2}\\left(7 + \\frac{50}{7}\\right) = \\frac{1}{2}(7 + 7{,}1429) \\approx $ **7,0714**. Tour 2 : $\\frac{1}{2}\\left(7{,}0714 + \\frac{50}{7{,}0714}\\right) \\approx $ **7,0711** — déjà quatre décimales justes : chaque tour double la précision. Héron (Ier siècle) tournait cette moyenne à la main ; ta calculatrice la tourne encore." },
  ],
  practice: [
    { tier: "warmup", label: "Compter les solutions", make: (r) => {
      const a = pick(r, [randint(r, 1, 100), 0, -randint(r, 1, 50)]);
      const n = a > 0 ? 2 : a === 0 ? 1 : 0;
      return { prompt: `Combien de solutions pour $x^2 = ${a}$ ?`, answer: n, solution: `$a ${a > 0 ? "> 0 : **deux** solutions ($\\pm\\sqrt{" + a + "}$)" : a === 0 ? "= 0 : **une** (zéro)" : "< 0 : **aucune** — un carré n'est jamais négatif"}$.` };
    } },
    { tier: "application", label: "La solution positive", make: (r) => {
      const n = randint(r, 2, 12);
      return { prompt: `$x^2 = ${n * n}$ : donne la solution positive.`, answer: n, solution: `$\\sqrt{${n * n}} = $ **${n}** — sans oublier que $-${n}$ est l'autre solution.` };
    } },
    { tier: "challenge", label: "L'aire remontée", make: (r) => {
      const c = randint(r, 3, 14);
      return { prompt: `Un carré a une aire de ${c * c} m². Quel est son côté ? (la solution négative a-t-elle un sens ici ?)`, answer: c, solution: `$x^2 = ${c * c}$ → $x = \\pm ${c}$, mais une longueur est positive : côté $= $ **${c} m** — le contexte filtre les solutions.` };
    } },
  ],
};

export default [equationCarre];
