// Resolves an interactive block by its `kind` and passes its params. Extensible registry.
import React from "react";
import { WIDGETS } from "../widgets/index.js";

export default function WidgetHost({ kind, params, caption }) {
  const Cmp = WIDGETS[kind];
  return (
    <figure className="widget">
      <div className="widget-stage">
        {Cmp
          ? <Cmp {...(params || {})} />
          : <div className="widget-missing">Brique interactive « {kind} » non disponible</div>}
      </div>
      {caption && <figcaption className="widget-cap">{caption}</figcaption>}
    </figure>
  );
}
