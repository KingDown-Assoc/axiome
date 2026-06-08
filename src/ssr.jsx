// Server-side render entry — used only by the test suite (a "blank" render to catch any crash).
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import Lesson from "./components/Lesson.jsx";
import { LESSONS } from "./content/index.js";
import { buildIndex } from "./core/registry.js";

const idx = buildIndex(LESSONS);
export const sampleLessonId = "analysis.high.derivative";
export const samplePreschoolId = "numbers.preschool.decompose";

export function renderApp() {
  return renderToString(React.createElement(App));
}
export function renderLesson(id) {
  const l = idx.byId[id] || idx.lessons[0];
  return renderToString(React.createElement(Lesson, { lesson: l, byId: idx.byId, completed: new Set() }));
}
