// The major mathematical fields (the cross-cutting axis).
// `color` = visual identity; `icon` = lucide-react icon name (resolved dynamically).
// Adding a field here (then a folder in content/) is enough to wire it in everywhere.
export const DOMAINS = [
  { id: "numbers",     label: "Nombres & arithmétique",         color: "#5dcaa5", icon: "Hash",       order: 0 },
  { id: "algebra",     label: "Algèbre",                        color: "#8b7fe8", icon: "Sigma",      order: 1 },
  { id: "geometry",    label: "Géométrie",                      color: "#37dbf0", icon: "Shapes",     order: 2 },
  { id: "analysis",    label: "Analyse",                        color: "#ffb020", icon: "TrendingUp", order: 3 },
  { id: "probability", label: "Probabilités & statistiques",    color: "#f472b6", icon: "Dices",      order: 4 },
  { id: "logic",       label: "Logique & fondements",           color: "#9aa7bd", icon: "Binary",     order: 5 },
  { id: "discrete",    label: "Combinatoire & maths discrètes", color: "#fb923c", icon: "Network",    order: 6 },
  { id: "topology",    label: "Topologie",                      color: "#22d3ee", icon: "Spline",     order: 7 },
  { id: "applied",     label: "Maths appliquées & calcul",      color: "#a3e635", icon: "Calculator", order: 8 },
  { id: "categories",  label: "Théorie des catégories",         color: "#c084fc", icon: "GitBranch",  order: 9 },
];

export const DOMAIN_BY_ID = Object.fromEntries(DOMAINS.map((d) => [d.id, d]));
export const domainOrder = (id) => (DOMAIN_BY_ID[id] ? DOMAIN_BY_ID[id].order : 999);
