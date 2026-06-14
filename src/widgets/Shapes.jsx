// Basic shapes: tap a shape to identify it. params: { color }
import React, { useState } from "react";

const SHAPES = [
  { id: "circle",    label: "Disque",    desc: "tout rond, aucun coin",            draw: (c) => <circle cx="40" cy="40" r="30" fill={c} /> },
  { id: "square",    label: "Carré",     desc: "4 côtés égaux et 4 coins droits",  draw: (c) => <rect x="12" y="12" width="56" height="56" rx="3" fill={c} /> },
  { id: "triangle",  label: "Triangle",  desc: "3 côtés et 3 coins",               draw: (c) => <polygon points="40,8 70,70 10,70" fill={c} /> },
  { id: "rectangle", label: "Rectangle", desc: "comme un carré, mais plus long",   draw: (c) => <rect x="6" y="24" width="68" height="32" rx="3" fill={c} /> },
];

export default function Shapes({ color = "#37dbf0" }) {
  const [sel, setSel] = useState(null);
  const cur = SHAPES.find((s) => s.id === sel);
  return (
    <div className="shapes">
      <div className="shapes-row">
        {SHAPES.map((s) => (
          <button key={s.id} type="button" className={"shape-btn" + (sel === s.id ? " on" : "")} onClick={() => setSel(s.id)} aria-label={s.label}>
            <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">{s.draw(sel === s.id ? color : "#3a4660")}</svg>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <div className="shapes-read">{cur ? <span><b>{cur.label}</b> — {cur.desc}.</span> : "Touche une forme pour la reconnaître."}</div>
    </div>
  );
}
