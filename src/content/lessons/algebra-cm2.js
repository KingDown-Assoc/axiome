// Field "Algebra" — PRIMARY module (CM2 year): algebraic thinking strengthened.
// Official cycle-3 programme (2025): solving algebraic problems, executing AND
// producing calculation programs (up to three instructions), formulating the rule
// of a number sequence (7; 15; 31; 63 → ×2+1), and motif sequences with the
// element count at a given stage (rank ↔ value relation).
import { randint, pick } from "../../core/exercises.js";

// — Formulating rules (programme: identifier et formuler une règle, motifs, étape n) —
const rules = {
  id: "algebra.primary.rules",
  level: "primary", domain: "algebra",
  title: "Formuler la règle",
  tagline: "Poursuivre une suite, c'est bien — dire sa loi, c'est l'algèbre.",
  prereqs: ["algebra.primary.symbols"],
  intuition:
    "Au CM1, tu **poursuivais** les suites. Au CM2, tu en **formules la règle** : dans 7 ; 15 ; 31 ; 63 ; 127…, chaque terme est *le double du précédent plus 1*. Dire la loi, c'est posséder la suite entière — y compris ses termes lointains.\n\nMême bond pour les motifs : une figure qui grandit étape par étape cache une formule — combien d'éléments à l'étape 10, **sans dessiner** ?",
  depths: {
    discovery:
      "**Avec les mains** : des carrés d'allumettes en ligne — étape 1 : 4 allumettes ; étape 2 : 7 ; étape 3 : 10. Chaque carré nouveau n'en coûte que **3** (il partage un côté). La règle se touche : 4, puis +3 à chaque étape.",
    standard:
      "**En image** : formuler exige de tester — 7 ; 15 ; 31 ; 63 : de 7 à 15, $+8$ ? Mais de 15 à 31, $+16$ — l'écart change : pas un « + ». Essai « ×2 » : $7 \\times 2 = 14$… presque 15. **« ×2 puis +1 »** : $15 \\times 2 + 1 = 31$ ✓, $31 \\times 2 + 1 = 63$ ✓ — règle trouvée, et le terme suivant offert : 127.",
    advanced:
      "**Dans la tête** : la règle des motifs se dit en fonction du **rang** — les carrés d'allumettes : étape $n$, c'est $4 + 3 \\times (n - 1)$, ou plus élégant : $3 \\times n + 1$ (trois allumettes par carré, plus la première verticale). Étape 10 : $31$ allumettes, **sans dessiner**. Et les programmes de calcul montent à trois instructions — « choisis ; ajoute 2 ; multiplie par 4 ; retire 3 » — exécutables, **productibles**, et remontables pas à pas.",
  },
  keyIdea: "Une règle se **formule** (« ×2 puis +1 ») et se **teste** sur tous les termes connus — alors les termes lointains tombent sans effort.",
  why:
    "Pourquoi exiger la formule quand poursuivre suffit ? Parce que poursuivre coûte un pas par terme : l'étape 100 demanderait 99 dessins. La formule paie une fois et répond partout — $3 \\times 100 + 1 = 301$ allumettes, en deux secondes. L'algèbre est une machine à abolir la répétition.",
  examples: [
    { title: "Démasquer 7 ; 15 ; 31 ; 63", steps: [
      { p: "Les écarts grandissent (+8, +16, +32) : pas une addition simple — quelque chose **double**." },
      { p: "Test « ×2 + 1 » : $7 \\to 15$ ✓, $15 \\to 31$ ✓, $31 \\to 63$ ✓. Suivant : $63 \\times 2 + 1 = $ **127**." },
    ] },
    { title: "Les carrés d'allumettes à l'étape 10", steps: [
      { p: "Étape 1 : 4 allumettes ; chaque carré suivant en coûte 3 → règle : $3 \\times n + 1$." },
      { p: "Étape 10 : $3 \\times 10 + 1 = $ **31 allumettes** — zéro dessin." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Quelle différence entre « poursuivre » une suite et « formuler sa règle » ?", solution: "Poursuivre donne le terme **suivant** ; formuler donne **tous** les termes, même lointains — la règle est la suite en une phrase." },
    { tier: "warmup", prompt: "Formule la règle de 7 ; 15 ; 31 ; 63 ; … et donne le terme suivant.", solution: "**« Le double, plus 1 »** : chaque test passe — suivant : $63 \\times 2 + 1 = $ **127**." },
    { tier: "application", prompt: "Des carrés d'allumettes en ligne : 4, 7, 10 allumettes aux étapes 1, 2, 3. Combien à l'étape 10 ?", solution: "Règle : $3 \\times n + 1$ (chaque carré partage un côté). Étape 10 : $3 \\times 10 + 1 = $ **31**." },
    { tier: "challenge", prompt: "Produis un programme de calcul à trois instructions qui transforme 5 en 25, puis vérifie-le sur 10.", solution: "Par exemple : « ajoute 2 ; multiplie par 4 ; retire 3 » — $5 \\to 7 \\to 28 \\to 25$ ✓. Sur 10 : $10 \\to 12 \\to 48 \\to 45$. (D'autres programmes marchent : produire, c'est choisir.)" },
    { tier: "exam", prompt: "Programme : « ajoute 2 ; multiplie par 4 ; retire 3 ». La machine affiche 45. Remonte au nombre choisi.", solution: "À rebours, instruction par instruction : $45 + 3 = 48$ ; $48 \\div 4 = 12$ ; $12 - 2 = $ **10**. Vérif à l'endroit : $10 \\to 12 \\to 48 \\to 45$ ✓." },
  ],
  practice: [
    { tier: "application", label: "L'étape n sans dessiner", make: (r) => {
      const step = randint(r, 2, 5), first = randint(r, 3, 7); const n = randint(r, 8, 20);
      return { prompt: `Une suite de motifs compte ${first} éléments à l'étape 1, puis ${step} de plus à chaque étape. Combien d'éléments à l'étape ${n} ?`, answer: first + step * (n - 1), solution: `Règle : $${first} + ${step} \\times (n - 1)$. Étape ${n} : $${first} + ${step} \\times ${n - 1} = $ **${first + step * (n - 1)}**.` };
    } },
    { tier: "challenge", label: "Remonter trois instructions", make: (r) => {
      const add = randint(r, 2, 6), mul = pick(r, [3, 4, 5]), sub = randint(r, 1, 5);
      const n = randint(r, 3, 12); const out = (n + add) * mul - sub;
      return { prompt: `Programme : « ajoute ${add} ; multiplie par ${mul} ; retire ${sub} ». Résultat : ${out}. Quel nombre a été choisi ?`, answer: n, solution: `À rebours : $${out} + ${sub} = ${(n + add) * mul}$ ; $\\div ${mul} = ${n + add}$ ; $- ${add} = $ **${n}** ✓.` };
    } },
  ],
};

export default [rules];
