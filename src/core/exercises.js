// The 5 difficulty tiers — the "very gentle curve". `key` is code; `label`/`sub` are shown to learners.
export const TIERS = [
  { key: "discovery",   label: "Découverte",   sub: "pour tout le monde",   color: "#3ad29a" },
  { key: "warmup",      label: "Échauffement", sub: "on se met en jambes",  color: "#37dbf0" },
  { key: "application", label: "Application",  sub: "le cas standard",      color: "#ffb020" },
  { key: "challenge",   label: "Défi",         sub: "pour aller plus loin", color: "#f472b6" },
  { key: "exam",        label: "Examen",       sub: "niveau 20/20",         color: "#a78bfa" },
];
export const TIER_BY_KEY = Object.fromEntries(TIERS.map((t) => [t.key, t]));
export const TIER_KEYS = TIERS.map((t) => t.key);

// Deterministic RNG (mulberry32): a reproducible exercise generator from a seed.
export function rng(seed) {
  let a = (seed >>> 0) || 1;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const randint = (r, a, b) => a + Math.floor(r() * (b - a + 1));
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
