// Content aggregation. Adding a field or a level = create a file in lessons/, then import it here.
import numbers from "./lessons/numbers.js";
import algebra from "./lessons/algebra.js";
import geometry from "./lessons/geometry.js";
import analysis from "./lessons/analysis.js";
import applied from "./lessons/applied.js";
import discrete from "./lessons/discrete.js";

export const LESSONS = [...numbers, ...algebra, ...geometry, ...analysis, ...applied, ...discrete];
