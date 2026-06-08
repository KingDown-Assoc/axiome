// Function plotter. params: { fns:[{f,color,label}], xmin, xmax, ymin?, ymax?, height?, tangent?:{fnIndex,x0} }
// Functions are passed directly as JS (the content is code), so anything is possible.
import React, { useMemo, useState } from "react";

function niceStep(range) {
  const raw = range / 8;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / mag;
  const s = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10;
  return s * mag;
}

export default function Plotter({ fns = [], xmin = -5, xmax = 5, ymin, ymax, height = 300, tangent }) {
  const W = 560, H = height, pad = 34, N = 240;

  const samples = useMemo(
    () => fns.map((fn) => {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const x = xmin + (xmax - xmin) * i / N;
        let y; try { y = fn.f(x); } catch (e) { y = NaN; }
        pts.push([x, y]);
      }
      return pts;
    }),
    [fns, xmin, xmax]
  );

  let lo = ymin, hi = ymax;
  if (lo == null || hi == null) {
    let mn = Infinity, mx = -Infinity;
    for (const pts of samples) for (const pt of pts) { const y = pt[1]; if (isFinite(y)) { if (y < mn) mn = y; if (y > mx) mx = y; } }
    if (!isFinite(mn)) { mn = -1; mx = 1; }
    if (mn === mx) { mn -= 1; mx += 1; }
    const padY = (mx - mn) * 0.12;
    if (lo == null) lo = mn - padY;
    if (hi == null) hi = mx + padY;
  }

  const sx = (x) => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
  const sy = (y) => H - pad - (y - lo) / (hi - lo) * (H - 2 * pad);

  const toPath = (pts) => {
    let d = "", pen = false;
    const span = hi - lo;
    for (const [x, y] of pts) {
      if (!isFinite(y) || y < lo - span * 3 || y > hi + span * 3) { pen = false; continue; }
      d += (pen ? " L" : " M") + sx(x).toFixed(1) + " " + sy(y).toFixed(1);
      pen = true;
    }
    return d.trim();
  };

  const stepX = niceStep(xmax - xmin), stepY = niceStep(hi - lo);
  const xticks = [], yticks = [];
  for (let x = Math.ceil(xmin / stepX) * stepX; x <= xmax + 1e-9; x += stepX) xticks.push(+x.toFixed(6));
  for (let y = Math.ceil(lo / stepY) * stepY; y <= hi + 1e-9; y += stepY) yticks.push(+y.toFixed(6));

  const ti = tangent ? (tangent.fnIndex || 0) : null;
  const [x0, setX0] = useState(() => (tangent && tangent.x0 != null ? tangent.x0 : (xmin + xmax) / 2));
  let tan = null;
  if (tangent && fns[ti]) {
    const f = fns[ti].f, h = 1e-4;
    let y0, slope; try { y0 = f(x0); slope = (f(x0 + h) - f(x0 - h)) / (2 * h); } catch (e) {}
    if (isFinite(y0) && isFinite(slope)) {
      tan = { y0, slope, yA: y0 + slope * (xmin - x0), yB: y0 + slope * (xmax - x0) };
    }
  }

  return (
    <div className="plotter">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="plot-svg" role="img" aria-label="Graphe d'une fonction">
        {xticks.map((x, i) => <line key={"gx" + i} x1={sx(x)} y1={pad} x2={sx(x)} y2={H - pad} className="grid" />)}
        {yticks.map((y, i) => <line key={"gy" + i} x1={pad} y1={sy(y)} x2={W - pad} y2={sy(y)} className="grid" />)}
        {0 >= xmin && 0 <= xmax && <line x1={sx(0)} y1={pad} x2={sx(0)} y2={H - pad} className="axis" />}
        {0 >= lo && 0 <= hi && <line x1={pad} y1={sy(0)} x2={W - pad} y2={sy(0)} className="axis" />}
        {xticks.map((x, i) => <text key={"tx" + i} x={sx(x)} y={H - pad + 14} className="tick" textAnchor="middle">{(+x.toFixed(2)).toString()}</text>)}
        {yticks.map((y, i) => <text key={"ty" + i} x={pad - 6} y={sy(y) + 3} className="tick" textAnchor="end">{(+y.toFixed(2)).toString()}</text>)}
        {tan && <line x1={sx(xmin)} y1={sy(tan.yA)} x2={sx(xmax)} y2={sy(tan.yB)} className="tangent" />}
        {samples.map((pts, i) => <path key={"c" + i} d={toPath(pts)} className="curve" style={{ stroke: fns[i].color || "#37dbf0" }} />)}
        {tan && <circle cx={sx(x0)} cy={sy(tan.y0)} r={4.5} className="tan-pt" />}
      </svg>
      {tangent && (
        <div className="plot-ctrl">
          <input type="range" min={xmin} max={xmax} step={(xmax - xmin) / 200} value={x0} onChange={(e) => setX0(parseFloat(e.target.value))} />
          <span className="plot-read">x₀ = {x0.toFixed(2)}{tan ? ` · pente f '(x₀) ≈ ${tan.slope.toFixed(2)}` : ""}</span>
        </div>
      )}
      {fns.some((f) => f.label) && (
        <div className="plot-legend">
          {fns.map((f, i) => f.label && <span key={i} className="leg"><i style={{ background: f.color || "#37dbf0" }} />{f.label}</span>)}
        </div>
      )}
    </div>
  );
}
