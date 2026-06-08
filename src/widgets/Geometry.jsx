// Geometry figure with draggable points. params: { points:[{id,x,y,label}], segments:[[idA,idB]], readout?, height? }
// Coordinates in the SVG frame (0..560 × 0..H). readout(pos) -> text shown under the figure.
import React, { useRef, useState } from "react";

export default function Geometry({ points = [], segments = [], readout, height = 320, grid = true }) {
  const W = 560, H = height;
  const ref = useRef(null);
  const [pos, setPos] = useState(() => Object.fromEntries(points.map((p) => [p.id, { x: p.x, y: p.y }])));
  const [drag, setDrag] = useState(null);

  const toSvg = (e) => {
    const svg = ref.current; if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * W;
    const y = (e.clientY - r.top) / r.height * H;
    return { x: Math.max(8, Math.min(W - 8, x)), y: Math.max(8, Math.min(H - 8, y)) };
  };
  const onMove = (e) => { if (!drag) return; const p = toSvg(e); if (p) setPos((s) => ({ ...s, [drag]: p })); };
  const end = () => setDrag(null);
  const P = (id) => pos[id] || { x: 0, y: 0 };
  const info = readout ? readout(pos) : null;

  return (
    <div className="geom">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} width="100%" className="geom-svg" role="img" aria-label="Figure de géométrie"
        onPointerMove={onMove} onPointerUp={end} onPointerLeave={end}>
        {grid && Array.from({ length: Math.floor(W / 40) + 1 }).map((_, i) => <line key={"vx" + i} x1={i * 40} y1={0} x2={i * 40} y2={H} className="grid" />)}
        {grid && Array.from({ length: Math.floor(H / 40) + 1 }).map((_, i) => <line key={"vy" + i} x1={0} y1={i * 40} x2={W} y2={i * 40} className="grid" />)}
        {segments.map((s, i) => { const a = P(s[0]), b = P(s[1]); return <line key={"s" + i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="geom-seg" />; })}
        {points.map((p) => {
          const q = P(p.id);
          return (
            <g key={p.id}>
              <circle cx={q.x} cy={q.y} r={8} className={"geom-pt" + (drag === p.id ? " dragging" : "")}
                onPointerDown={(e) => { if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId); setDrag(p.id); }} />
              {p.label && <text x={q.x + 12} y={q.y - 10} className="geom-label">{p.label}</text>}
            </g>
          );
        })}
      </svg>
      {info && <div className="geom-read">{info}</div>}
      <div className="geom-hint">Fais glisser les points.</div>
    </div>
  );
}
