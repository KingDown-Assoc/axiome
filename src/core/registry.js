// Content indexing: turns a flat list of lessons into indexes ready for the UI.
// The logic is pure (testable); file aggregation happens in content/index.js.
import { LEVELS } from "./levels.js";
import { DOMAINS } from "./domains.js";
import { validateLesson } from "./schema.js";
import { topoOrder } from "./prereq.js";

export function buildIndex(lessons, { warn } = {}) {
  const log = warn || ((m) => { try { console.warn("[maths] " + m); } catch (e) {} });
  const byId = {};
  const clean = [];
  for (const l of lessons) {
    const errs = validateLesson(l);
    if (errs.length) log(`lesson skipped (${l && l.id}): ${errs.join(", ")}`);
    else if (byId[l.id]) log(`duplicate id, skipped: ${l.id}`);
    else { byId[l.id] = l; clean.push(l); }
  }

  const byLevel = {}, byDomain = {}, byLevelDomain = {};
  for (const l of clean) {
    (byLevel[l.level] = byLevel[l.level] || []).push(l);
    (byDomain[l.domain] = byDomain[l.domain] || []).push(l);
    byLevelDomain[l.level] = byLevelDomain[l.level] || {};
    (byLevelDomain[l.level][l.domain] = byLevelDomain[l.level][l.domain] || []).push(l);
  }

  const levelsPresent = LEVELS.filter((lv) => byLevel[lv.id]);
  const domainsPresent = DOMAINS.filter((d) => byDomain[d.id]);
  const { order, cycle } = topoOrder(clean);
  if (cycle) log("cycle detected in prerequisites!");

  return { lessons: clean, byId, byLevel, byDomain, byLevelDomain, levelsPresent, domainsPresent, topo: order };
}
