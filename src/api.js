// "React-free" surface: everything pure and testable (logic + content).
// The test runner bundles this file for Node; no UI dependency here.
export * from "./core/checker.js";
export * from "./core/levels.js";
export * from "./core/domains.js";
export * from "./core/exercises.js";
export * from "./core/prereq.js";
export * from "./core/schema.js";
export * from "./core/registry.js";
export * from "./core/search.js";
export * from "./core/curriculum.js";
export { LESSONS } from "./content/index.js";
