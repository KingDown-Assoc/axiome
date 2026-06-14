// Server-side render entry — used only by the test suite (a "blank" render to catch any crash).
import React from "react";
import { renderToString } from "react-dom/server";
import App, { Home } from "./App.jsx";
import Nav from "./components/Nav.jsx";
import Lesson from "./components/Lesson.jsx";
import { LESSONS } from "./content/index.js";
import { buildIndex } from "./core/registry.js";

const idx = buildIndex(LESSONS);
export const sampleLessonId = "analysis.high.nombre-derive";
export const samplePreschoolId = "numbers.preschool.decompose";

export function renderApp() {
  return renderToString(React.createElement(App));
}
export function renderLesson(id) {
  const l = idx.byId[id] || idx.lessons[0];
  return renderToString(React.createElement(Lesson, { lesson: l, byId: idx.byId, completed: new Set() }));
}
export function renderNav(level) {
  return renderToString(React.createElement(Nav, {
    index: idx, level, onLevel() {}, selectedId: null, onSelect() {}, completed: new Set(), nextIds: new Set(),
  }));
}
export function renderHome(level) {
  return renderToString(React.createElement(Home, {
    index: idx, level, suggestions: [], completed: new Set(), onOpen() {},
  }));
}
