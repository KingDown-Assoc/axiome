// Solids in space: tap a solid to identify it. The six solids of the cycle-1 programme.
// Mirrors Shapes.jsx (reuses the .shapes CSS). params: { color }
import React, { useState } from "react";

const SOLIDS = [
  {
    id: "cube", label: "Cube", desc: "comme un dé : 6 faces carrées, il ne roule pas",
    draw: (c) => (
      <>
        <polygon points="24,36 36,26 64,26 52,36" fill={c} fillOpacity="0.7" />
        <polygon points="52,36 64,26 64,54 52,64" fill={c} fillOpacity="0.85" />
        <polygon points="24,36 52,36 52,64 24,64" fill={c} />
      </>
    ),
  },
  {
    id: "cuboid", label: "Pavé", desc: "comme une boîte de chaussures : 6 faces en rectangle",
    draw: (c) => (
      <>
        <polygon points="10,34 22,26 70,26 58,34" fill={c} fillOpacity="0.7" />
        <polygon points="58,34 70,26 70,52 58,60" fill={c} fillOpacity="0.85" />
        <polygon points="10,34 58,34 58,60 10,60" fill={c} />
      </>
    ),
  },
  {
    id: "sphere", label: "Boule", desc: "toute ronde : elle roule dans tous les sens",
    draw: (c) => (
      <>
        <circle cx="40" cy="42" r="26" fill={c} />
        <ellipse cx="31" cy="33" rx="7" ry="4" fill="#ffffff" opacity="0.3" />
      </>
    ),
  },
  {
    id: "cylinder", label: "Cylindre", desc: "comme une boîte de conserve",
    draw: (c) => (
      <>
        <ellipse cx="40" cy="60" rx="18" ry="6" fill={c} />
        <rect x="22" y="22" width="36" height="38" fill={c} />
        <ellipse cx="40" cy="22" rx="18" ry="6" fill={c} fillOpacity="0.7" />
      </>
    ),
  },
  {
    id: "cone", label: "Cône", desc: "comme un chapeau de fête ou un cornet de glace",
    draw: (c) => (
      <>
        <ellipse cx="40" cy="60" rx="22" ry="7" fill={c} fillOpacity="0.85" />
        <polygon points="40,14 62,60 18,60" fill={c} />
      </>
    ),
  },
  {
    id: "pyramid", label: "Pyramide", desc: "des faces en triangle et une pointe : comme en Égypte",
    draw: (c) => (
      <>
        <polygon points="40,10 14,64 56,64" fill={c} />
        <polygon points="40,10 56,64 72,54" fill={c} fillOpacity="0.7" />
      </>
    ),
  },
];

export default function Solids({ color = "#37dbf0" }) {
  const [sel, setSel] = useState(null);
  const cur = SOLIDS.find((s) => s.id === sel);
  return (
    <div className="shapes">
      <div className="shapes-row">
        {SOLIDS.map((s) => (
          <button key={s.id} type="button" className={"shape-btn" + (sel === s.id ? " on" : "")} onClick={() => setSel(s.id)} aria-label={s.label}>
            <svg viewBox="0 0 80 80" width="74" height="74" aria-hidden="true">{s.draw(sel === s.id ? color : "#3a4660")}</svg>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <div className="shapes-read">{cur ? <span><b>{cur.label}</b> — {cur.desc}.</span> : "Touche un solide pour le reconnaître."}</div>
    </div>
  );
}
