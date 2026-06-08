// Ten-frame (a canonical early-maths tool): visualize a quantity ≤ 10 and its complement.
// params: { count, max=10, target=10 }
import React, { useState } from "react";

export default function TenFrame({ count = 4, max = 10, target = 10 }) {
  const [n, setN] = useState(Math.max(0, Math.min(max, count)));
  const cols = Math.min(5, max);
  const missing = Math.max(0, target - n);
  return (
    <div className="tenframe">
      <div className="tf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: max }).map((_, i) => (
          <button key={i} type="button" className={"tf-cell" + (i < n ? " on" : "")}
            onClick={() => setN(i < n ? i : i + 1)} aria-label={"case " + (i + 1)} />
        ))}
      </div>
      <div className="nl-row">
        <button className="btn btn-round" onClick={() => setN((v) => Math.max(0, v - 1))} aria-label="enlever un">−</button>
        <div className="nl-count">{n}</div>
        <button className="btn btn-round" onClick={() => setN((v) => Math.min(max, v + 1))} aria-label="ajouter un">+</button>
      </div>
      <div className="nl-cap">{n} jeton{n > 1 ? "s" : ""} · il en manque <b>{missing}</b> pour faire {target}.</div>
    </div>
  );
}
