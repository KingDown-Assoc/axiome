// Field "Algebra" — demo lesson (skeleton).
import { randint } from "../../core/exercises.js";

const linearEquation = {
  id: "algebra.middle.linear-equation",
  level: "middle", domain: "algebra",
  title: "Résoudre une équation ax + b = c",
  tagline: "Trouver la valeur cachée en gardant l'égalité équilibrée.",
  draft: true,
  prereqs: ["numbers.primary.column-addition"],
  intuition:
    "Une équation, c'est une balance en équilibre : ce qu'il y a à gauche pèse autant qu'à droite, et $x$ est le poids inconnu. Pour le trouver, on fait **la même opération des deux côtés** — sinon la balance penche.\n\nOn « range » : d'abord on isole le terme en $x$ (on enlève $b$ des deux côtés), puis on partage (on divise par $a$). $x$ se retrouve tout seul.",
  depths: {
    discovery: "On enlève $b$ des deux côtés, puis on divise par $a$. $x$ est trouvé.",
    standard: "Pour résoudre $ax + b = c$ : (1) soustraire $b$ → $ax = c - b$ ; (2) diviser par $a$ (avec $a \\neq 0$) → $x = \\dfrac{c-b}{a}$. On vérifie en remplaçant $x$ par sa valeur.",
    advanced: "Ces deux gestes sont des transformations d'équivalence (ajouter un même réel, multiplier par un réel non nul) : elles préservent l'ensemble des solutions. L'équation affine $ax+b=c$ a une **unique** solution si $a \\neq 0$ ; si $a = 0$, elle est soit impossible ($b \\neq c$), soit indéterminée ($b = c$).",
  },
  formulas: [
    { tex: "ax + b = c \\;\\Longrightarrow\\; x = \\dfrac{c-b}{a}\\quad (a \\neq 0)", legend: "la solution, une fois x isolé" },
  ],
  why:
    "Pourquoi « la même chose des deux côtés » ? Parce qu'une égalité reste vraie si on ajoute (ou retranche) le même nombre à gauche et à droite, et si on multiplie (ou divise) les deux membres par un même nombre non nul. On ne change pas la solution : on la rend visible en isolant $x$.",
  examples: [
    { title: "Résoudre 3x + 4 = 19", steps: [
      { p: "J'enlève 4 des deux côtés :", tex: "3x = 15" },
      { p: "Je divise par 3 :", tex: "x = 5" },
      { p: "Vérification : $3 \\times 5 + 4 = 19$ ✔" },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Résous :", tex: "x + 5 = 12", solution: "$x = 12 - 5 = 7$." },
    { tier: "challenge", prompt: "Attention au signe — résous :", tex: "7x - 3 = 25", solution: "$7x = 28$, puis $x = 4$." },
    { tier: "exam", prompt: "Avec des inconnues des deux côtés :", tex: "5x + 2 = 2x + 17", solution: "$5x - 2x = 17 - 2$, soit $3x = 15$, donc $x = 5$." },
  ],
  practice: [
    { tier: "warmup", label: "Équations à une étape", make: (r) => { const a = randint(r, 2, 6), x = randint(r, 1, 9), b = randint(r, 1, 9); const c = a * x + b; return { prompt: "Résous (donne la valeur de x) :", tex: `${a}x + ${b} = ${c}`, answer: x, solution: `On isole : $${a}x = ${c} - ${b} = ${c - b}$, puis $x = ${x}$.` }; } },
    { tier: "application", label: "Avec une soustraction", make: (r) => { const a = randint(r, 2, 7), x = randint(r, 1, 9), b = randint(r, 1, 9); const c = a * x - b; return { prompt: "Résous (donne la valeur de x) :", tex: `${a}x - ${b} = ${c}`, answer: x, solution: `On isole : $${a}x = ${c} + ${b} = ${c + b}$, puis $x = ${x}$.` }; } },
  ],
};

export default [linearEquation];
