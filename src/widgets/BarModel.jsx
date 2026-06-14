// Bar model (Singapore method): part-whole and comparison models for word problems.
// params: { mode: "part-whole" | "comparison", whole?, parts: [a, b], labels?: [..], unknown: "whole" | "part" | "difference" }
import React, { useState } from "react";

const W = 250, BAR = 30, X0 = 6;
const COLORS = ["#37dbf0", "#f0b429", "#5dcaa5"];
const fr = (v) => String(v).replace(".", ",");

function Seg({ x, w, y, color, text, hidden, onTap }) {
  return (
    <g onClick={hidden ? onTap : undefined} style={hidden ? { cursor: "pointer" } : undefined}>
      <rect x={x} y={y} width={Math.max(w, 26)} height={BAR} fill={hidden ? "#3a4660" : color} stroke="#0d1420" strokeWidth="1.2" rx="3" />
      <text x={x + Math.max(w, 26) / 2} y={y + BAR / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={hidden ? "#ffffff" : "#0d1420"}>{hidden ? "?" : text}</text>
    </g>
  );
}

export default function BarModel({ mode = "part-whole", whole, parts = [], labels = [], unknown = "whole" }) {
  const [rev, setRev] = useState(false);
  const tap = () => setRev(true);
  const total = whole != null ? whole : parts.reduce((a, b) => a + b, 0);
  const scale = (W - 2 * X0) / total;

  if (mode === "comparison") {
    const [a, b] = parts; const diff = Math.round((a - b) * 100) / 100;
    const la = labels[0] || "A", lb = labels[1] || "B";
    const sentence = rev ? `${fr(a)} − ${fr(b)} = ${fr(diff)} : l'écart se lit sur le bout qui dépasse.` : "Touche le « ? » pour révéler l'écart.";
    return (
      <div className="shapes">
        <svg viewBox={`0 0 ${W + 60} 110`} width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto" }} aria-label="Modèle en barres : comparaison">
          <text x={X0} y={18} fontSize="12" fill="currentColor">{la}</text>
          <Seg x={X0} w={a * scale} y={24} color={COLORS[0]} text={fr(a)} />
          <text x={X0} y={72} fontSize="12" fill="currentColor">{lb}</text>
          <Seg x={X0} w={b * scale} y={78} color={COLORS[1]} text={fr(b)} />
          <path d={`M ${X0 + b * scale} 70 v -8 h ${(a - b) * scale} v 8`} fill="none" stroke="currentColor" strokeWidth="1.4" />
          <g onClick={!rev ? tap : undefined} style={!rev ? { cursor: "pointer" } : undefined}>
            <text x={X0 + b * scale + ((a - b) * scale) / 2} y={56} textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">{rev ? diff : "?"}</text>
          </g>
        </svg>
        <div className="shapes-read">{sentence}</div>
      </div>
    );
  }

  // part-whole
  const wholeHidden = unknown === "whole" && !rev;
  const partHidden = (i) => unknown === "part" && i === parts.length - 1 && !rev;
  let x = X0;
  const sentence = rev
    ? (unknown === "whole" ? `${parts.map(fr).join(" + ")} = ${fr(total)} : les parties réunies font le tout.` : `${fr(total)} − ${parts.slice(0, -1).map(fr).join(" − ")} = ${fr(parts[parts.length - 1])} : le tout moins les parties connues donne la partie cachée.`)
    : "Touche le « ? » pour révéler la valeur cachée.";
  return (
    <div className="shapes">
      <svg viewBox={`0 0 ${W + 12} 112`} width="100%" style={{ maxWidth: 340, display: "block", margin: "0 auto" }} aria-label="Modèle en barres : parties et tout">
        <Seg x={X0} w={total * scale} y={10} color={COLORS[2]} text={fr(total)} hidden={wholeHidden} onTap={tap} />
        <text x={X0 + (total * scale) / 2} y={58} textAnchor="middle" fontSize="11" fill="currentColor">le tout</text>
        {parts.map((p, i) => { const s = <Seg key={i} x={x} w={p * scale} y={68} color={COLORS[i % 2]} text={fr(p)} hidden={partHidden(i)} onTap={tap} />; x += p * scale; return s; })}
        <text x={X0 + (total * scale) / 2} y={110} fontSize="11" textAnchor="middle" fill="currentColor">les parties</text>
      </svg>
      <div className="shapes-read">{sentence}</div>
    </div>
  );
}
