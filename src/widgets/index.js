// Registry of interactive blocks. Adding a block = import it and register it here;
// a lesson then calls it with { kind: "...", params: {...} }.
import Plotter from "./Plotter.jsx";
import Geometry from "./Geometry.jsx";
import NumberLine from "./NumberLine.jsx";
import TenFrame from "./TenFrame.jsx";
import Shapes from "./Shapes.jsx";
import Pattern from "./Pattern.jsx";

export const WIDGETS = {
  plotter: Plotter,
  geometry: Geometry,
  numberline: NumberLine,
  tenframe: TenFrame,
  shapes: Shapes,
  pattern: Pattern,
};
