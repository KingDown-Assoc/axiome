"use strict";
module.exports = function (t, { ssr }) {
  const app = ssr.renderApp();
  t("the app renders server-side without crashing", typeof app === "string" && app.length > 300, app && app.length);
  t('the name "Axiome" appears', app.includes("Axiome"));

  const lesson = ssr.renderLesson(ssr.sampleLessonId);
  t("a (high-school) lesson renders", typeof lesson === "string" && lesson.length > 300);
  t("KaTeX renders the formulas (katex class present)", lesson.includes("katex"));
  t("the lesson title appears", lesson.toLowerCase().includes("dériv"));

  const preschool = ssr.renderLesson(ssr.samplePreschoolId);
  t("a preschool lesson renders (widgets included)", typeof preschool === "string" && preschool.length > 300);
  t("the ten-frame is rendered (tenframe class)", preschool.includes("tenframe"));
};
