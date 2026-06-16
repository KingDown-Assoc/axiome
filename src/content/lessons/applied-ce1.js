// Field "Applied" — PRIMARY module (CE1 year): length and mass units, euro cents and the
// decimal comma, half/quarter hours. Official cycle-2 programme crossed with Singapore P2.
import { randint, pick } from "../../core/exercises.js";

// — Length and mass units (programme: m, cm, km ; g, kg ; références et encadrements) —
const unitsLengthMass = {
  id: "applied.primary.units",
  level: "primary", domain: "applied",
  title: "Mètres, kilomètres, grammes, kilos",
  tagline: "Les unités s'organisent en famille — et mille revient partout.",
  prereqs: ["applied.primary.length-cm", "applied.preschool.mass", "numbers.primary.to-1000"],
  intuition:
    "Les longueurs gagnent une grande unité : le **kilomètre** — $1$ km $= 1\\,000$ m, comme $1$ m $= 100$ cm. Et les masses gagnent leurs nombres : le **gramme** et le **kilogramme**, avec $1$ kg $= 1\\,000$ g.\n\nTiens donc : **mille** encore ! Les unités de mesure parlent la langue de la numération.",
  depths: {
    discovery:
      "**Avec les mains** : je mesure au **mètre ruban** (la règle d'un mètre, graduée en centimètres) ; je pèse à la balance — Roberval ou digitale — pour lire une masse en grammes ou en kilogrammes.",
    standard:
      "**En image** : les conversions s'écrivent — $1$ m $+ 46$ cm $= 146$ cm (un mètre, c'est cent centimètres, plus quarante-six). Et quand la mesure ne tombe pas juste, on **encadre** : « la longueur du segment est **entre 8 et 9 cm** ».",
    advanced:
      "**Dans la tête** : les **références** font estimer sans instrument — un paquet de sucre pèse 1 kg, un sachet de levure environ 10 g ; de l'école à la mairie, on compte en kilomètres. Choisir l'unité **adaptée**, c'est déjà la moitié de la mesure. (Et pas d'écriture à virgule pour les longueurs et les masses : elle est réservée à la monnaie, pour l'instant.)",
  },
  keyIdea: "$1$ km $= 1\\,000$ m ; $1$ m $= 100$ cm ; $1$ kg $= 1\\,000$ g — la numération habille les unités.",
  why:
    "Pourquoi des grandes ET des petites unités ? Parce qu'on mesure des choses très différentes : la levure en kilomètres ou le trajet en grammes donneraient des nombres absurdes. La bonne unité rend le nombre **lisible** — c'est elle qui choisit l'échelle.",
  examples: [
    { title: "Convertir 1 m et 46 cm", steps: [
      { p: "Un mètre, c'est 100 cm." },
      { p: "$100 + 46 = $ **146 cm**." },
    ] },
    { title: "Ordonner des masses mélangées", steps: [
      { p: "À ranger : 1 kg et 300 g ; 1 000 g ; 50 kg ; 2 kg et 100 g." },
      { p: "Tout en grammes : 1 300 g ; 1 000 g ; 50 000 g ; 2 100 g." },
      { p: "Ordre croissant : **1 000 g < 1 kg et 300 g < 2 kg et 100 g < 50 kg**." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de centimètres dans un mètre ? De mètres dans un kilomètre ? De grammes dans un kilogramme ?", solution: "$1$ m $= $ **100 cm** ; $1$ km $= $ **1 000 m** ; $1$ kg $= $ **1 000 g**." },
    { tier: "warmup", prompt: "Une corde mesure 1 m et 46 cm. Combien de centimètres en tout ?", solution: "$100 + 46 = $ **146 cm**." },
    { tier: "application", prompt: "« Le segment mesure entre 8 et 9 cm. » Que signifie cet encadrement ?", solution: "Sa longueur **dépasse 8 cm** sans **atteindre 9 cm** : quand la mesure ne tombe pas juste, on la coince entre deux entiers." },
    { tier: "challenge", prompt: "Range dans l'ordre croissant : 1 kg et 300 g ; 1 000 g ; 50 kg ; 2 kg et 100 g.", solution: "En grammes : 1 300 ; 1 000 ; 50 000 ; 2 100 → **1 000 g < 1 kg et 300 g < 2 kg et 100 g < 50 kg**." },
    { tier: "exam", prompt: "La distance de l'école à la mairie vaut plutôt : 2 cm, 2 m ou 2 km ? Et la masse d'un sachet de levure : 10 g, 10 kg ou 1 kg ?", solution: "**2 km** (2 m, c'est une porte !) et **10 g** : les références gardent les réponses vraisemblables." },
  ],
  practice: [
    { tier: "application", label: "Convertir", make: (r) => {
      const kind = r();
      if (kind < 0.4) { const x = randint(r, 5, 95); return { prompt: `1 m et ${x} cm : combien de centimètres en tout ?`, answer: 100 + x, solution: `$100 + ${x} = $ **${100 + x} cm**.` }; }
      if (kind < 0.7) { const k = randint(r, 1, 3); return { prompt: `${k} km : combien de mètres ?`, answer: 1000 * k, solution: `$1$ km $= 1\\,000$ m → **${1000 * k} m**.` }; }
      const y = randint(r, 1, 9) * 100; return { prompt: `1 kg et ${y} g : combien de grammes en tout ?`, answer: 1000 + y, solution: `$1\\,000 + ${y} = $ **${1000 + y} g**.` };
    } },
  ],
};

// — Euro cents and the decimal comma (programme: 100 centimes = 1 €, écriture à virgule dès P3) —
const cents = {
  id: "applied.primary.cents",
  level: "primary", domain: "applied",
  title: "Les centimes et la virgule",
  tagline: "La numération descend sous l'euro — et la virgule marque la frontière.",
  prereqs: ["applied.primary.money", "numbers.primary.to-1000"],
  intuition:
    "L'euro se coupe en **cent centimes** : $100$ centimes $= 1$ €. Dix pièces de 1 centime font 10 centimes ; dix pièces de 10 centimes font **un euro** — la machine à paquets de dix continue, un étage **en dessous**.\n\nPour écrire euros et centimes ensemble, un signe nouveau : la **virgule**. Elle repère le chiffre des **unités d'euro** : 3,45 € = 3 euros et 45 centimes.",
  depths: {
    discovery:
      "**Avec les mains** : je constitue 1 € de plusieurs façons — deux pièces de 50 centimes, cinq de 20, dix de 10… — et j'échange dix pièces de 10 centimes contre une pièce de 1 €.",
    standard:
      "**En image** : les rangs s'alignent — centime, **dizaine de centimes**, **centaine de centimes = un euro**, dizaine d'euros… La virgule se place juste après les euros : 3 € et 45 centimes s'écrit **3,45 €**, et se convertit : 345 centimes.",
    advanced:
      "**Dans la tête** : gare au piège officiel — « deux euros et **cinq** centimes » s'écrit **2,05 €**, pas 2,50 € ! (2,50 €, c'est deux euros et **cinquante** centimes.) Le zéro tient la place de la dizaine de centimes, exactement comme en numération. La virgule n'est pas décorative : chaque chiffre a son rang.",
  },
  keyIdea: "$100$ centimes $= 1$ €. La **virgule** repère les unités d'euro — et **2,05 € ≠ 2,50 €**.",
  why:
    "Pourquoi un zéro dans 2,05 € ? Pour la même raison qu'entre 205 et 250 : le zéro **garde la place**. Sans lui, les 5 centimes grimperaient au rang des dizaines de centimes et la somme serait multipliée par dix. Petite virgule, grandes conséquences.",
  examples: [
    { title: "Écrire avec la virgule", steps: [
      { p: "3 euros et 45 centimes : la virgule après les euros → **3,45 €**." },
      { p: "En centimes : $300 + 45 = $ **345 centimes**." },
    ] },
    { title: "Le piège des cinq centimes", steps: [
      { p: "« Deux euros et cinq centimes » : 5 centimes, ce n'est pas 5 dizaines de centimes." },
      { p: "On écrit **2,05 €** — et surtout pas 2,50 €." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de centimes dans 1 € ? Et combien de pièces de 10 centimes pour faire 1 € ?", solution: "**100 centimes** — et **dix** pièces de 10 centimes : dix dizaines font une centaine." },
    { tier: "warmup", prompt: "Écris « 3 euros et 45 centimes » avec la virgule, puis en centimes.", solution: "**3,45 €**, soit $300 + 45 = $ **345 centimes**." },
    { tier: "application", prompt: "Écris en centimes : 2,05 € puis 2,50 €. Est-ce la même somme ?", solution: "2,05 € = **205 centimes** ; 2,50 € = **250 centimes**. Pas du tout la même : le zéro tient le rang des dizaines de centimes." },
    { tier: "challenge", prompt: "Constitue 1 € de trois façons différentes avec des pièces de centimes.", solution: "Par exemple : **2 × 50 c**, **5 × 20 c**, **10 × 10 c** — cent centimes à chaque fois." },
    { tier: "exam", prompt: "M. Milack achète une baguette à 1,15 € et un pain aux raisins à 95 centimes. Il paie avec 5 €. Combien lui rend-on ?", solution: "En centimes : $115 + 95 = 210$ c $= 2{,}10$ €. Puis $500 - 210 = 290$ c → on lui rend **2,90 €** — deux étapes, et des conversions partout." },
  ],
  practice: [
    { tier: "application", label: "Euros et centimes", make: (r) => {
      const e = randint(r, 1, 4); const c = r() < 0.4 ? randint(r, 1, 9) : randint(r, 10, 95);
      const cc = c < 10 ? "0" + c : "" + c;
      return { prompt: `${e} euro${e > 1 ? "s" : ""} et ${c} centime${c > 1 ? "s" : ""} : combien de centimes en tout ? (Et pense à l'écriture ${e},${cc} €.)`, answer: 100 * e + c, solution: `$${100 * e} + ${c} = $ **${100 * e + c} centimes** — soit ${e},${cc} € (le zéro garde la place si besoin).` };
    } },
  ],
};

// — Half and quarter hours, durations (programme: heures > 12, demi-heure, quarts d'heure liés aux fractions) —
const timeDurations = {
  id: "applied.primary.time-durations",
  level: "primary", domain: "applied",
  title: "Heures, demi-heures, quarts d'heure",
  tagline: "Des fractions d'heure, et les heures de l'après-midi au-delà de midi.",
  prereqs: ["applied.primary.time-hours", "numbers.primary.fractions"],
  intuition:
    "La grande aiguille fait **un tour** en une heure : $1$ h $= 60$ min. Un **demi**-tour ? 30 minutes : « et demie ». Un **quart** de tour ? 15 minutes : « et quart » — tes fractions toutes neuves, en chair et en aiguilles !\n\nEt la journée dépasse douze : « trois heures de l'après-midi », c'est aussi **15 h** — l'horloge digitale affiche 15:00.",
  depths: {
    discovery:
      "**Avec les mains** : je positionne les aiguilles — « quatre heures et demie » : petite entre 4 et 5, grande sur le **6** (un demi-tour). « Deux heures et quart » : grande sur le **3** (un quart de tour).",
    standard:
      "**En image** : le cadran est un disque fractionné — le tour entier vaut 60 minutes, la moitié 30, le quart 15. Sachant qu'on est l'après-midi, « 2 heures et quart » se dit aussi « **14 heures et 15 minutes** » et s'affiche **14:15** en digital.",
    advanced:
      "**Dans la tête** : la petite aiguille fait deux tours par jour, mais les nombres n'en font qu'un — de 0 à 24 : 3 heures de l'après-midi $= 3 + 12 = 15$ h. Et pour parler d'une **durée**, on choisit l'unité adaptée : « cinq minutes pour cet exercice », « deux heures à la piscine » — l'heure pour le long, la minute pour le court.",
  },
  keyIdea: "$1$ h $= 60$ min ; « et demie » $= 30$ min (demi-tour) ; « et quart » $= 15$ min (quart de tour). L'après-midi : $+ 12$.",
  why:
    "Pourquoi « quart » d'heure ? Parce que c'est exactement $\\frac{1}{4}$ du tour de la grande aiguille — le tout (60 minutes) coupé en quatre parts égales de 15. L'horloge est la première figure fractionnée que tu liras tous les jours.",
  examples: [
    { title: "De l'après-midi au digital", steps: [
      { p: "« Deux heures et quart de l'après-midi »." },
      { p: "$2 + 12 = 14$ h, et le quart vaut 15 min → **14:15**." },
    ] },
    { title: "Le quart, fraction du tour", steps: [
      { p: "Le tour entier de la grande aiguille : 60 minutes." },
      { p: "Un quart du tour : $60$ partagé en 4 parts égales → **15 minutes**, grande aiguille sur le 3." },
    ] },
  ],
  exercises: [
    { tier: "discovery", prompt: "Combien de minutes dans une heure ? Dans une demi-heure ?", solution: "$1$ h $= $ **60 min** ; une demi-heure, c'est la moitié : **30 min**." },
    { tier: "warmup", prompt: "Un quart d'heure, c'est combien de minutes — et pourquoi « quart » ?", solution: "**15 minutes** : le tour de 60 minutes coupé en **quatre parts égales** — un quart du tour, une vraie fraction." },
    { tier: "application", prompt: "Il est trois heures de l'après-midi. Qu'affiche l'horloge digitale ?", solution: "$3 + 12 = 15$ → **15:00**." },
    { tier: "challenge", prompt: "« Deux heures et quart » l'après-midi : écris l'heure digitale, et place la grande aiguille.", solution: "**14:15** — et la grande aiguille pointe le **3** (un quart de tour depuis le 12)." },
    { tier: "exam", prompt: "« Je suis resté 120 minutes à la piscine. » Dis-le avec une unité mieux adaptée. Et où pointe la grande aiguille à « et demie » ?", solution: "$120$ min $= $ **2 heures** (l'heure pour les longues durées). À « et demie », la grande aiguille pointe le **6** : un demi-tour." },
  ],
  practice: [
    { tier: "warmup", label: "Fractions d'heure", make: (r) => {
      if (r() < 0.5) { const t = pick(r, [["un quart d'heure", 15], ["une demi-heure", 30], ["trois quarts d'heure", 45], ["une heure", 60]]); return { prompt: `${t[0].charAt(0).toUpperCase() + t[0].slice(1)} : combien de minutes ?`, answer: t[1], solution: `Le tour vaut 60 min → **${t[1]} min**.` }; }
      const h = randint(r, 1, 11); return { prompt: `Il est ${h} heure${h > 1 ? "s" : ""} de l'après-midi. Quelle heure affiche l'horloge digitale ?`, answer: h + 12, solution: `L'après-midi, on ajoute 12 : $${h} + 12 = $ **${h + 12} h**.` };
    } },
  ],
};

export default [unitsLengthMass, cents, timeDurations];
