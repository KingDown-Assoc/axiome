// Field "Logic" — MIDDLE module (4e year): conditions and manipulated
// variables. Official cycle-4 programme (« La pensée informatique »):
// representing simple CONDITIONS, writing CONDITIONAL instructions (if/else),
// MANIPULATING a variable (now written to, not merely read), writing a simple
// programme autonomously to reach a goal or solve a problem, and modifying a
// provided programme to change its behaviour.
import { randint, pick } from "../../core/exercises.js";

const conditions = {
  id: "logic.middle.conditions",
  level: "middle", domain: "logic",
  title: "Si… alors : les conditions",
  tagline: "Le programme apprend à choisir — et la variable, à changer.",
  prereqs: ["logic.middle.programmes"],
  intuition:
    "Tes programmes de 5e exécutaient tout, toujours. La 4e leur donne un **carrefour** : l'instruction conditionnelle — **si** la condition est vraie, **alors** une branche ; **sinon**, l'autre.\n\nEt la variable change de statut : on ne fait plus que la lire, on **écrit dedans** — « mettre $s + 3$ dans $s$ » : la boîte se remplit, se vide, compte.",
  depths: {
    discovery:
      "**Avec les mains** : « demande l'âge ; **si** âge $\\geq 18$ **alors** affiche “majeur” **sinon** affiche “mineur” » — exécute à la main pour 15, pour 20 : une seule branche s'allume à chaque fois. La condition est une question à réponse oui/non ; le programme bifurque.",
    standard:
      "**En image** : la variable **manipulée** — « mettre 0 dans $s$ ; pour chaque note : **si** note $> 10$ **alors** mettre $s + 1$ dans $s$ » : la boîte $s$ **compte** les notes au-dessus de 10. Lire $s$ à droite, écrire à gauche : « $s + 1 \\to s$ » n'est pas une équation, c'est un **geste** — la nouvelle valeur écrase l'ancienne, et la trace d'exécution (noter $s$ après chaque pas) reste ton meilleur débogueur.",
    advanced:
      "**Dans la tête** : la condition est de la **logique embarquée** — « si l'égalité de Pythagore tient, alors rectangle » : ta réciproque de géométrie s'écrit en une instruction conditionnelle, et le programme qui teste $a^2 + b^2 = c^2$ rend le verdict que le rapporteur devine. Mais gare au sens : le **sinon** exécute la contraposée (égalité fausse → pas rectangle), jamais la réciproque inversée — les trois énoncés de ta leçon de logique vivent dans chaque if/else. Écrire un programme, c'est rédiger une démonstration que la machine rejoue à l'infini.",
  },
  keyIdea: "**Si** condition **alors** branche A **sinon** branche B — une seule s'exécute. La variable s'**écrit** : « $s + 1 \\to s$ » écrase l'ancienne valeur ; la trace d'exécution suit la boîte pas à pas.",
  why:
    "Pourquoi des conditions, puisque la boucle suffisait à répéter ? Parce que répéter sans choisir ne décide rien : le tri, le jeu, le thermostat, le correcteur d'orthographe — tout programme utile passe son temps à **bifurquer**. La paire boucle + condition est universelle : avec elle seule, on peut écrire tout calcul que l'humanité sait décrire — c'est le théorème fondateur de l'informatique, et la 4e t'en met les deux moitiés en main.",
  examples: [
    { title: "Le videur numérique", steps: [
      { p: "« Demande l'âge ; si âge $\\geq 18$ alors “majeur” sinon “mineur” »." },
      { p: "Entrée 15 → la condition est fausse → branche **sinon** : “mineur” — une bifurcation, pas deux." },
    ] },
    { title: "Le compteur", steps: [
      { p: "« $0 \\to s$ ; pour chaque note : si note $> 10$ alors $s + 1 \\to s$ » sur 12, 8, 15, 9, 11." },
      { p: "Trace : $s = 0 \\to 1 \\to 1 \\to 2 \\to 2 \\to 3$ — la boîte a compté **3** notes au-dessus de 10." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Exécute à la main : « demande $n$ ; si $n$ est pair alors affiche $n \\div 2$ sinon affiche $3n + 1$ » pour $n = 10$ puis $n = 7$.", solution: "$n = 10$ : pair → affiche **5** ; $n = 7$ : impair → affiche $3 \\times 7 + 1 = $ **22** — une seule branche s'allume à chaque exécution." },
    { tier: "warmup", prompt: "Que signifie l'instruction « mettre $s + 3$ dans $s$ » si $s$ vaut 12 ? En quoi n'est-ce pas une équation ?", solution: "La boîte $s$ reçoit $12 + 3 = $ **15** : on lit l'ancienne valeur à droite, on écrit la nouvelle à gauche — c'est un **geste** qui écrase, pas une égalité à résoudre ($s = s + 3$ n'aurait aucune solution !)." },
    { tier: "application", prompt: "Écris (en français structuré) un programme qui demande trois notes et affiche combien dépassent 10.", solution: "« Mettre **0** dans $c$ ; demander trois notes ; pour chacune : **si** note $> 10$ **alors** mettre $c + 1$ dans $c$ ; afficher $c$ » — initialiser, tester, incrémenter : le trio du compteur." },
    { tier: "challenge", prompt: "Programme : « demande $a$, $b$, $c$ (avec $c$ le plus grand) ; si $a^2 + b^2 = c^2$ alors affiche “rectangle” sinon affiche “pas rectangle” ». Quel théorème chaque branche applique-t-elle ?", solution: "La branche **alors** applique la **réciproque** de Pythagore (égalité → rectangle) ; la branche **sinon** applique la **contraposée** (égalité fausse → pas rectangle) — le if/else rejoue exactement ta leçon de logique : la machine démontre à ta place, à condition d'avoir mis le bon énoncé dans la bonne branche." },
    { tier: "exam", prompt: "On fournit : « $0 \\to s$ ; répéter 5 fois : [demander $n$ ; mettre $s + n$ dans $s$] ; afficher $s$ ». Que calcule-t-il ? Modifie-le pour qu'il affiche la moyenne, puis pour qu'il ne compte que les $n$ pairs.", solution: "Il calcule la **somme** des cinq nombres. Moyenne : afficher $s \\div 5$ à la fin. Pairs seulement : insérer la condition — « **si** $n$ est pair **alors** mettre $s + n$ dans $s$ » (et, pour une moyenne des pairs, un second compteur $c$ s'impose : $s \\div c$) — modifier un programme, c'est chirurgie : on touche la bonne ligne, on laisse le reste vivre." },
  ],
  practice: [
    { tier: "warmup", label: "La bifurcation", make: (r) => {
      const seuil = pick(r, [10, 12, 15, 18]); const n = randint(r, 3, 25);
      return { prompt: `« Si $n \\geq ${seuil}$ alors affiche 1 sinon affiche 0 » — sortie pour $n = ${n}$ ?`, answer: n >= seuil ? 1 : 0, solution: `$${n} ${n >= seuil ? "\\geq" : "<"} ${seuil}$ → branche ${n >= seuil ? "**alors** : 1" : "**sinon** : 0"}.` };
    } },
    { tier: "application", label: "La boîte écrasée", make: (r) => {
      const s0 = randint(r, 2, 9); const pas = randint(r, 2, 5); const fois = randint(r, 2, 5);
      return { prompt: `« $${s0} \\to s$ ; répéter ${fois} fois : mettre $s + ${pas}$ dans $s$ » — valeur finale de $s$ ?`, answer: s0 + pas * fois, solution: `$${s0} + ${fois} \\times ${pas} = $ **${s0 + pas * fois}** — la trace : ${Array.from({length: fois + 1}, (_, i) => s0 + i * pas).join(" → ")}.` };
    } },
    { tier: "challenge", label: "Le compteur conditionnel", make: (r) => {
      const seuil = 10; const notes = Array.from({length: 5}, () => randint(r, 4, 18));
      const c = notes.filter(n => n > seuil).length;
      return { prompt: `« $0 \\to c$ ; pour chaque note de [${notes.join(", ")}] : si note $> ${seuil}$ alors $c + 1 \\to c$ » — valeur finale de $c$ ?`, answer: c, solution: `Notes au-dessus de ${seuil} : ${notes.filter(n => n > seuil).join(", ") || "aucune"} → $c = $ **${c}**.` };
    } },
  ],
};

export default [conditions];
