// Lesson schema + (non-blocking) validator. This is THE contract the generic renderer relies on:
// as long as a lesson has this shape, the app displays it without touching the code.
//
// Lesson = {
//   id: string            // globally unique, e.g. "numbers.preschool.count"
//   level: string         // a LEVELS id
//   domain: string        // a DOMAINS id
//   title: string         // shown to learners — in French
//   prereqs?: string[]    // ids of lessons to see first
//   draft?: boolean       // provisional content ("demo" badge)
//   tagline?: string
//   intuition: string     // plain-language explanation — in French. Inline maths with $...$
//   depths?: { discovery?: string, standard?: string, advanced?: string }  // the course, by depth
//   formulas?: { tex: string, legend?: string }[]
//   keyIdea?: string
//   why?: string          // "Why?" box
//   examples?: { title: string, steps: { p: string, tex?: string }[] }[]   // worked, step by step
//   widgets?: { kind: string, params?: object, caption?: string }[]        // interactive blocks
//   exercises?: { tier: string, prompt: string, tex?: string, solution: string }[]  // 5 tiers
//   practice?: { tier: string, label?: string, make: (rng)=>{prompt,tex?,answer,solution,check?} }[]  // endless drills
// }

import { LEVEL_BY_ID } from "./levels.js";
import { DOMAIN_BY_ID } from "./domains.js";
import { TIER_BY_KEY } from "./exercises.js";

export function validateLesson(l) {
  const errs = [];
  const need = (cond, msg) => { if (!cond) errs.push(msg); };
  need(l && typeof l === "object", "lesson missing");
  if (!l || typeof l !== "object") return errs;
  need(typeof l.id === "string" && l.id, "missing id");
  need(LEVEL_BY_ID[l.level], `unknown level: ${l.level}`);
  need(DOMAIN_BY_ID[l.domain], `unknown field: ${l.domain}`);
  need(typeof l.title === "string" && l.title, "missing title");
  need(typeof l.intuition === "string" && l.intuition, "missing intuition");
  for (const e of l.exercises || []) need(TIER_BY_KEY[e.tier], `unknown tier: ${e.tier} (${l.id})`);
  for (const p of l.practice || []) need(typeof p.make === "function", `generator without make() (${l.id})`);
  return errs;
}
