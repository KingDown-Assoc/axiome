// Assembly: a model figure built from flat shapes; tap each piece to identify it.
// Covers the programme objective "reproduire des assemblages" (read a model piece by piece).
// Reuses the .shapes CSS. params: { figure: "house" | "boat" | "rocket" }
import React, { useState } from "react";

const FIGURES = {
  house: {
    label: "la maison",
    pieces: [
      { id: "roof", name: "un triangle", color: "#e8615f", el: (fill) => <polygon points="14,42 50,10 86,42" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "wall", name: "un carré", color: "#37dbf0", el: (fill) => <rect x="22" y="42" width="56" height="56" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "door", name: "un rectangle", color: "#f0b429", el: (fill) => <rect x="44" y="68" width="16" height="30" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
    ],
  },
  boat: {
    label: "le bateau",
    pieces: [
      { id: "sail1", name: "un triangle", color: "#37dbf0", el: (fill) => <polygon points="48,6 48,54 14,54" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "sail2", name: "un triangle", color: "#5dcaa5", el: (fill) => <polygon points="54,14 54,54 84,54" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "hull", name: "un rectangle", color: "#e8615f", el: (fill) => <rect x="12" y="60" width="76" height="22" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
    ],
  },
  rocket: {
    label: "la fusée",
    pieces: [
      { id: "tip", name: "un triangle", color: "#e8615f", el: (fill) => <polygon points="50,4 32,30 68,30" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "body", name: "un rectangle", color: "#37dbf0", el: (fill) => <rect x="32" y="30" width="36" height="48" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "fin1", name: "un triangle", color: "#f0b429", el: (fill) => <polygon points="32,56 32,86 14,86" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "fin2", name: "un triangle", color: "#f0b429", el: (fill) => <polygon points="68,56 68,86 86,86" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
      { id: "window", name: "un disque", color: "#5dcaa5", el: (fill) => <circle cx="50" cy="46" r="9" fill={fill} stroke="#0d1420" strokeWidth="1" /> },
    ],
  },
};

export default function Assembly({ figure = "house" }) {
  const fig = FIGURES[figure] || FIGURES.house;
  const [found, setFound] = useState({});
  const [last, setLast] = useState(null);
  const total = fig.pieces.length;
  const count = fig.pieces.filter((p) => found[p.id]).length;

  const tap = (p) => { setFound((f) => ({ ...f, [p.id]: true })); setLast(p); };

  return (
    <div className="shapes">
      <svg viewBox="0 0 100 110" width="230" height="253" aria-label={"Assemblage : " + fig.label} style={{ display: "block", margin: "0 auto" }}>
        {fig.pieces.map((p) => (
          <g key={p.id} onClick={() => tap(p)} style={{ cursor: "pointer" }} role="button" aria-label={p.name}>
            {p.el(found[p.id] ? p.color : "#3a4660")}
          </g>
        ))}
      </svg>
      <div className="shapes-read">
        {count === total ? (
          <span><b>Bravo !</b> {fig.label} est faite de <b>{total} pièces</b> — tu les as toutes reconnues.</span>
        ) : last ? (
          <span><b>{last.name}</b> — {count}/{total} pièces reconnues. Continue !</span>
        ) : (
          <span>Touche chaque pièce de {fig.label} pour la reconnaître ({total} pièces).</span>
        )}
      </div>
    </div>
  );
}
