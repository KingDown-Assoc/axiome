// Manipulatives for the youngest learners. params: { mode:"counters"|"fractionbar"|"line", ... }
import React, { useState } from "react";
import { MathInline } from "../components/Math.jsx";

export default function NumberLine({ mode = "counters", count = 5, max = 10, parts = 4, filled = 1, value = 3, label }) {
  if (mode === "fractionbar") return <FractionBar parts={parts} filledInit={filled} />;
  if (mode === "line") return <Line max={max} valueInit={value} />;
  return <Counters init={count} max={max} label={label} />;
}

function Counters({ init, max, label }) {
  const [n, setN] = useState(init);
  return (
    <div className="nl counters">
      <div className="dots">{Array.from({ length: n }).map((_, i) => <span key={i} className="dot" />)}</div>
      <div className="nl-row">
        <button className="btn btn-round" onClick={() => setN((v) => Math.max(0, v - 1))} aria-label="enlever un">−</button>
        <div className="nl-count">{n}</div>
        <button className="btn btn-round" onClick={() => setN((v) => Math.min(max, v + 1))} aria-label="ajouter un">+</button>
      </div>
      <div className="nl-cap">{label || "Compte les ronds, puis ajoute ou enlève."}</div>
    </div>
  );
}

function FractionBar({ parts, filledInit }) {
  const [f, setF] = useState(filledInit);
  return (
    <div className="nl frac">
      <div className="bar">{Array.from({ length: parts }).map((_, i) => <span key={i} className={"seg" + (i < f ? " on" : "")} onClick={() => setF(i + 1)} />)}</div>
      <div className="nl-count"><MathInline>{`\\dfrac{${f}}{${parts}}`}</MathInline></div>
      <div className="nl-cap">Clique pour colorier une part de plus.</div>
    </div>
  );
}

function Line({ max, valueInit }) {
  const [v, setV] = useState(valueInit);
  const W = 520, H = 70, pad = 24;
  const sx = (x) => pad + x / max * (W - 2 * pad);
  return (
    <div className="nl line">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Droite numérique">
        <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} className="axis" />
        {Array.from({ length: max + 1 }).map((_, i) => (
          <g key={i}>
            <line x1={sx(i)} y1={H / 2 - 6} x2={sx(i)} y2={H / 2 + 6} className="axis" />
            <text x={sx(i)} y={H / 2 + 22} className="tick" textAnchor="middle">{i}</text>
          </g>
        ))}
        <circle cx={sx(v)} cy={H / 2} r={8} className="tan-pt" />
      </svg>
      <input type="range" min={0} max={max} step={1} value={v} onChange={(e) => setV(parseInt(e.target.value, 10))} />
      <div className="nl-cap">Déplace le curseur : tu es sur {v}.</div>
    </div>
  );
}
