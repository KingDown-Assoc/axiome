"use strict";
// Curriculum structure — years and cycles must exactly partition the tagged content,
// and the grouping helpers must account for every lesson.
module.exports = (t, { api }) => {
  const L = api.LESSONS;
  const ofY = (id) => api.lessonsOfYear(L, id);

  t("maternelle = 30 leçons", ofY("maternelle").length === 30, ofY("maternelle").length);
  t("cp = 16 leçons", ofY("cp").length === 16, ofY("cp").length);
  t("ce1 = 13 leçons", ofY("ce1").length === 13, ofY("ce1").length);
  t("ce2 = 15 leçons", ofY("ce2").length === 15, ofY("ce2").length);
  t("cm1 = 19 leçons", ofY("cm1").length === 19, ofY("cm1").length);
  t("cm2 = 19 leçons", ofY("cm2").length === 19, ofY("cm2").length);
  t("sixieme = 18 leçons", ofY("sixieme").length === 18, ofY("sixieme").length);
  t("cinquieme = 18 leçons", ofY("cinquieme").length === 18, ofY("cinquieme").length);
  t("quatrieme = 18 leçons", ofY("quatrieme").length === 18, ofY("quatrieme").length);
  t("troisieme = 18 leçons", ofY("troisieme").length === 18, ofY("troisieme").length);
  t("seconde = 18 leçons", ofY("seconde").length === 18, ofY("seconde").length);
  t("premiere = 18 leçons", ofY("premiere").length === 18, ofY("premiere").length);
  t("terminale = 18 leçons", ofY("terminale").length === 18, ofY("terminale").length);
  t("expertes = 9 leçons", ofY("expertes").length === 9, ofY("expertes").length);
  t("seconde-pro = 9 leçons", ofY("seconde-pro").length === 9, ofY("seconde-pro").length);
  t("premiere-pro = 9 leçons", ofY("premiere-pro").length === 9, ofY("premiere-pro").length);
  t("terminale-pro = 9 leçons", ofY("terminale-pro").length === 9, ofY("terminale-pro").length);
  t("l1 = 18 leçons", ofY("l1").length === 18, ofY("l1").length);
  t("l2 = 18 leçons", ofY("l2").length === 18, ofY("l2").length);
  t("l3 = 18 leçons", ofY("l3").length === 18, ofY("l3").length);
  t("m1 = 18 leçons", ofY("m1").length === 18, ofY("m1").length);
  t("m2 = 18 leçons", ofY("m2").length === 18, ofY("m2").length);
  t("doctorat = 7 leçons (les problèmes du millénaire)", ofY("doctorat").length === 7, ofY("doctorat").length);
  t("recherche = 8 leçons (portes de recherche)", ofY("recherche").length === 8, ofY("recherche").length);

  t("cycle 1 = 30 leçons", api.lessonsOfCycle(L, "cycle1").length === 30);
  t("cycle 2 = 44 leçons", api.lessonsOfCycle(L, "cycle2").length === 44);
  t("cycle 3 = 56 leçons (CM1 + CM2 + 6e)", api.lessonsOfCycle(L, "cycle3").length === 56);
  t("cycle 4 = 54 leçons (5e + 4e + 3e)", api.lessonsOfCycle(L, "cycle4").length === 54);
  t("cycle lycée = 63 leçons (2de + 1re + Tle + expertes)", api.lessonsOfCycle(L, "lycee").length === 63);
  t("cycle pro = 27 leçons (la voie professionnelle complète)", api.lessonsOfCycle(L, "pro").length === 27, api.lessonsOfCycle(L, "pro").length);
  t("cycle licence = 54 leçons (L1 + L2 + L3)", api.lessonsOfCycle(L, "licence").length === 54, api.lessonsOfCycle(L, "licence").length);
  t("cycle master = 36 leçons (M1 + M2)", api.lessonsOfCycle(L, "master").length === 36, api.lessonsOfCycle(L, "master").length);
  t("cycle doctorat = 15 leçons (millénaire 7 + portes de recherche 8)", api.lessonsOfCycle(L, "phd").length === 15, api.lessonsOfCycle(L, "phd").length);

  const tagged = api.YEARS.flatMap((y) => ofY(y.id).map((l) => l.id));
  t("les années sont disjointes", new Set(tagged).size === tagged.length, tagged.length);

  const mods = api.modulesOfYear(L, "ce2");
  t("les modules du CE2 partitionnent ses 15 leçons", mods.reduce((n, m) => n + m.lessons.length, 0) === 15);
  t("modules : domaines connus et non vides", mods.every((m) => api.DOMAIN_BY_ID[m.domain] && m.lessons.length > 0));

  const left = api.leftoverByLevel(L).reduce((n, g) => n + g.lessons.length, 0);
  t("hors curriculum = total − couvert", left === L.length - tagged.length, left);
  t("chaque cycle référence des années déclarées", api.CYCLES.every((c) => c.years.every((y) => api.YEAR_BY_ID[y])));

  const groups = api.yearGroupsOfLevel(L, "primary");
  t("primaire : 5 classes dans l'ordre", groups.map((g) => g.year && g.year.id).join(",") === "cp,ce1,ce2,cm1,cm2");
  t("classes du primaire : 16/13/15/19/19", groups.map((g) => g.lessons.length).join(",") === "16,13,15,19,19");
  const groupsM = api.yearGroupsOfLevel(L, "middle");
  t("collège : la 6e groupe ses 18 leçons", groupsM.some((g) => g.year && g.year.id === "sixieme" && g.lessons.length === 18));
  t("collège : la 5e groupe ses 18 leçons", groupsM.some((g) => g.year && g.year.id === "cinquieme" && g.lessons.length === 18));
  t("collège : la 4e groupe ses 18 leçons", groupsM.some((g) => g.year && g.year.id === "quatrieme" && g.lessons.length === 18));
  t("collège : la 3e groupe ses 18 leçons", groupsM.some((g) => g.year && g.year.id === "troisieme" && g.lessons.length === 18));
  const groupsH = api.yearGroupsOfLevel(L, "high");
  t("lycée : la 2de groupe ses 18 leçons", groupsH.some((g) => g.year && g.year.id === "seconde" && g.lessons.length === 18));
  t("lycée : la 1re groupe ses 18 leçons", groupsH.some((g) => g.year && g.year.id === "premiere" && g.lessons.length === 18));
  t("lycée : la Tle groupe ses 18 leçons", groupsH.some((g) => g.year && g.year.id === "terminale" && g.lessons.length === 18));
  t("lycée : les expertes groupent leurs 9 leçons", groupsH.some((g) => g.year && g.year.id === "expertes" && g.lessons.length === 9));
  t("éveil : un seul groupe (affichage plat)", api.yearGroupsOfLevel(L, "preschool").length === 1);
  t("les groupes couvrent tout le niveau", groups.reduce((n, g) => n + g.lessons.length, 0) === L.filter((l) => l.level === "primary").length);
};

// Rendering of the year-grouped navigation and overview (needs the ssr bundle).
module.exports.ssr = true;
const base = module.exports;
module.exports = (t, ctx) => {
  base(t, ctx);
  const { ssr } = ctx;
  const navP = ssr.renderNav("primary"), navE = ssr.renderNav("preschool");
  t("nav primaire : classes CP / CE1 / CE2 / CM1 / CM2", navP.includes(">CP<") && navP.includes(">CE1<") && navP.includes(">CE2<") && navP.includes(">CM1<") && navP.includes(">CM2<"));
  t("nav éveil : affichage plat (pas de groupe classe)", !navE.includes("nav-year"));
  const navM = ssr.renderNav("middle");
  t("nav collège : classe 6e présente", navM.includes(">6e<"));
  t("nav collège : classe 5e présente", navM.includes(">5e<"));
  t("nav collège : classe 4e présente", navM.includes(">4e<"));
  t("nav collège : classe 3e présente", navM.includes(">3e<"));
  const navH = ssr.renderNav("high");
  t("nav lycée : classe 2de présente", navH.includes(">2de<"));
  t("nav lycée : classe 1re présente", navH.includes(">1re<"));
  t("nav lycée : classe Tle présente", navH.includes(">Tle<"));
  t("nav lycée : option Exp présente", navH.includes(">Exp<"));
  t("nav lycée : la voie pro présente (2de pro / 1re pro / Tle pro)", navH.includes(">2de pro<") && navH.includes(">1re pro<") && navH.includes(">Tle pro<"));
  const navB = ssr.renderNav("bachelor");
  t("nav licence : classes L1, L2 et L3 présentes", navB.includes(">L1<") && navB.includes(">L2<") && navB.includes(">L3<"));
  const navMa = ssr.renderNav("master");
  t("nav master : classes M1 et M2 présentes (deux années → pastilles)", navMa.includes(">M1<") && navMa.includes(">M2<"));
  const navDoc = ssr.renderNav("phd");
  t("nav doctorat : deux années → pastilles (Le millénaire / Portes de recherche)", navDoc.includes(">Le millénaire<") && navDoc.includes(">Portes de recherche<"));
  const homeP = ssr.renderHome("primary");
  t("accueil primaire : sections de classes", homeP.includes("ov-year") && homeP.includes(">CE2<"));
};
