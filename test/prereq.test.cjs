"use strict";
module.exports = function (t, { api }) {
  const { LESSONS, buildById, topoOrder, isUnlocked, missingPrereqs, nextSuggestions } = api;
  const byId = buildById(LESSONS);
  t("no prerequisite cycle", topoOrder(LESSONS).cycle === false);

  const empty = new Set();
  t("subitize — unlocked from the start", isUnlocked("numbers.preschool.subitize", empty, byId));
  t("count — locked until subitize + number-sequence are done", !isUnlocked("numbers.preschool.count", empty, byId));
  t(
    "count — unlocked after subitize + number-sequence",
    isUnlocked("numbers.preschool.count", new Set(["numbers.preschool.subitize", "numbers.preschool.number-sequence"]), byId)
  );
  t("compare — locked at the start", !isUnlocked("numbers.preschool.compare", empty, byId));
  t("compare — prerequisite is count", missingPrereqs("numbers.preschool.compare", empty, byId).join() === "numbers.preschool.count");

  const sugg = nextSuggestions(empty, LESSONS, 3);
  t(
    "first suggestion is a preschool lesson with no prerequisite",
    !!sugg[0] && sugg[0].level === "preschool" && (sugg[0].prereqs || []).length === 0,
    sugg.map((s) => s.id)
  );
  t("at least 3 steps suggested at the start", sugg.length >= 3, sugg.length);
};
