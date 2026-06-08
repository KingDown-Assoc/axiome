// Prerequisite graph: drives the "very gentle" progression (unlocking + suggested next step).
import { levelOrder } from "./levels.js";
import { domainOrder } from "./domains.js";

export function buildById(lessons) {
  const byId = {};
  for (const l of lessons) byId[l.id] = l;
  return byId;
}

// Topological sort (Kahn). Returns { order:[ids], cycle:bool }.
export function topoOrder(lessons) {
  const byId = buildById(lessons);
  const indeg = {}, adj = {};
  for (const l of lessons) { indeg[l.id] = 0; adj[l.id] = []; }
  for (const l of lessons) {
    for (const p of l.prereqs || []) {
      if (byId[p]) { adj[p].push(l.id); indeg[l.id]++; }
    }
  }
  const q = lessons.filter((l) => indeg[l.id] === 0).map((l) => l.id);
  const order = [];
  while (q.length) {
    const id = q.shift();
    order.push(id);
    for (const n of adj[id]) { if (--indeg[n] === 0) q.push(n); }
  }
  return { order, cycle: order.length !== lessons.length };
}

// Missing prerequisites (present in the catalog but not yet completed).
export function missingPrereqs(lessonId, completed, byId) {
  const l = byId[lessonId];
  if (!l) return [];
  return (l.prereqs || []).filter((p) => byId[p] && !completed.has(p));
}

export function isUnlocked(lessonId, completed, byId) {
  return missingPrereqs(lessonId, completed, byId).length === 0;
}

// Suggested next steps: unlocked, not completed, sorted by level then field.
export function nextSuggestions(completed, lessons, limit = 3) {
  const byId = buildById(lessons);
  return lessons
    .filter((l) => !completed.has(l.id) && isUnlocked(l.id, completed, byId))
    .sort((a, b) => levelOrder(a.level) - levelOrder(b.level) || domainOrder(a.domain) - domainOrder(b.domain) || a.id.localeCompare(b.id))
    .slice(0, limit);
}
