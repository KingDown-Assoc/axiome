// Continue the pattern (algorithm / organized sequence). params: { sequence:[colors], next, caption }
import React, { useState } from "react";

const PAL = { rouge: "#e2503f", bleu: "#3b82d6", vert: "#3ad29a", jaune: "#f2c14e", violet: "#a78bfa", orange: "#fb923c" };

export default function Pattern({ sequence = ["rouge", "bleu", "rouge", "bleu"], next = "rouge", caption }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pattern">
      <div className="pat-row">
        {sequence.map((k, i) => <span key={i} className="pat-dot" style={{ background: PAL[k] || "#888" }} />)}
        <span className={"pat-dot pat-next" + (show ? " on" : "")} style={show ? { background: PAL[next] || "#888" } : undefined}>{show ? "" : "?"}</span>
      </div>
      <button className="btn btn-ghost" onClick={() => setShow((s) => !s)}>{show ? "Cacher" : "Voir la suite"}</button>
      {caption && <div className="nl-cap">{caption}</div>}
    </div>
  );
}
