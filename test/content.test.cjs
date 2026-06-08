"use strict";
module.exports = function (t, { api }) {
  const { LESSONS, validateLesson, buildIndex, LEVELS, DOMAINS, TIERS, TIER_BY_KEY, rng, checkAnswer } = api;

  let allValid = true; const bad = [];
  for (const l of LESSONS) { const e = validateLesson(l); if (e.length) { allValid = false; bad.push(l.id + ": " + e.join(",")); } }
  t("all lessons valid (schema)", allValid, bad.slice(0, 4));
  t("at least 5 lessons seeded", LESSONS.length >= 5, LESSONS.length);
  t("unique ids", new Set(LESSONS.map((l) => l.id)).size === LESSONS.length);
  t("5 tiers · 7 levels · 10 fields", TIERS.length === 5 && LEVELS.length === 7 && DOMAINS.length === 10);

  let tiersOk = true;
  for (const l of LESSONS) for (const e of (l.exercises || [])) if (!TIER_BY_KEY[e.tier]) tiersOk = false;
  t("all exercise tiers valid", tiersOk);

  t("each lesson has exercises or a generator", LESSONS.every((l) => (l.exercises && l.exercises.length) || (l.practice && l.practice.length)));

  let genOk = true, selfCheck = true;
  for (const l of LESSONS) for (const p of (l.practice || [])) {
    const q = p.make(rng(777));
    if (!q || q.prompt == null || q.answer == null) genOk = false;
    else { const r = checkAnswer(String(q.answer), q.answer, q.check || { type: "number" }); if (!r.ok) selfCheck = false; }
  }
  t("generators produce a complete question", genOk);
  t("the checker accepts the generator's own answer", selfCheck);

  const idx = buildIndex(LESSONS);
  t("index: >= 4 fields present", idx.domainsPresent.length >= 4, idx.domainsPresent.map((d) => d.id));
  t("index: >= 4 levels present", idx.levelsPresent.length >= 4, idx.levelsPresent.map((l) => l.id));
  t("index: complete topological sort (no cycle)", idx.topo.length === LESSONS.length);
};
