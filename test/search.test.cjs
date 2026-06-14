"use strict";
module.exports = function (t, { api }) {
  const { searchLessons, LESSONS, buildIndex } = api;
  const { lessons } = buildIndex(LESSONS);
  const ids = (q, n) => searchLessons(lessons, q, n).map((l) => l.id);

  t("requête vide -> aucun résultat", searchLessons(lessons, "   ", 12).length === 0);

  const r1 = searchLessons(lessons, "riemann", 12);
  t("terme du titre -> leçon en tête", r1.length > 0 && r1[0].id === "numbers.phd.hypothese-riemann", r1[0] && r1[0].id);

  t("insensible aux accents (poincare ~ Poincaré)", ids("poincare", 12).includes("topology.phd.conjecture-poincare"));
  t("insensible aux accents (géométrie == geometrie)",
    searchLessons(lessons, "géométrie", 999).length === searchLessons(lessons, "geometrie", 999).length &&
    searchLessons(lessons, "geometrie", 999).length > 0);

  t("insensible à la casse (RIEMANN)", ids("RIEMANN", 5).includes("numbers.phd.hypothese-riemann"));

  t("ET multi-mots garde la leçon pertinente", ids("riemann zêta", 12).includes("numbers.phd.hypothese-riemann"));
  t("ET multi-mots exclut le non-pertinent", !ids("riemann poincaré", 12).includes("topology.phd.conjecture-poincare"));

  t("limite respectée", searchLessons(lessons, "le", 5).length <= 5);
  t("charabia -> aucun résultat", searchLessons(lessons, "zzzxqkw", 12).length === 0);
};
