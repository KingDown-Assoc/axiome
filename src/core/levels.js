// The levels (cycles), from the very start to research.
// `order` drives the vertical progression; one can be inserted without breaking anything.
export const LEVELS = [
  { id: "preschool", label: "Éveil",    sub: "préparation au CP · 3–6 ans",            order: 0 },
  { id: "primary",   label: "Primaire", sub: "CP → CM2 · 6–11 ans",                    order: 1 },
  { id: "middle",    label: "Collège",  sub: "6e → 3e · 11–15 ans",                    order: 2 },
  { id: "high",      label: "Lycée",    sub: "2de → Terminale, spé maths · 15–18 ans", order: 3 },
  { id: "bachelor",  label: "Licence",  sub: "L1 → L3",                                order: 4 },
  { id: "master",    label: "Master",   sub: "M1 · M2",                                order: 5 },
  { id: "phd",       label: "Doctorat", sub: "recherche & post-doc",                   order: 6 },
];

export const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l]));
export const levelOrder = (id) => (LEVEL_BY_ID[id] ? LEVEL_BY_ID[id].order : 999);
