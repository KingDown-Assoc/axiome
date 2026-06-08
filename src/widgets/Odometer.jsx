// Place-value counter with two wheels (tens + units). When the units wheel passes 9 it rolls back
// to 0 and the tens wheel advances by 1 (and the reverse on the way down) — the carry made visible.
// params: { value=0, max=99 }
import React, { useState, useRef } from "react";

export default function Odometer({ value = 0, max = 99 }) {
  const cap = Math.min(99, Math.max(9, max));
  const [n, setN] = useState(Math.max(0, Math.min(cap, value)));
  const [flash, setFlash] = useState("");
  const timer = useRef(null);

  const tens = Math.floor(n / 10);
  const units = n % 10;
  const clamp = (v) => Math.max(0, Math.min(cap, v));

  const note = (msg) => {
    setFlash(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(""), 1600);
  };

  // The units wheel drives the carry: n + 1 from x9 naturally becomes the next ten.
  const unitUp = () => { if (units === 9 && tens < Math.floor(cap / 10)) note("Les unités reviennent à 0 → +1 dizaine !"); setN(clamp(n + 1)); };
  const unitDown = () => { if (units === 0 && tens > 0) note("Les unités repartent à 9 → −1 dizaine"); setN(clamp(n - 1)); };
  const tenUp = () => setN(clamp(n + 10));
  const tenDown = () => setN(clamp(n - 10));

  return (
    <div className="odometer">
      <div className="odo-wheels">
        <div className="odo-wheel" style={{ "--odo": "#8b7fe8" }}>
          <div className="odo-label">dizaines</div>
          <button type="button" className="odo-btn" onClick={tenUp} aria-label="augmenter les dizaines">▲</button>
          <div className="odo-digit">{tens}</div>
          <button type="button" className="odo-btn" onClick={tenDown} aria-label="diminuer les dizaines">▼</button>
        </div>
        <div className="odo-wheel" style={{ "--odo": "#5dcaa5" }}>
          <div className="odo-label">unités</div>
          <button type="button" className="odo-btn" onClick={unitUp} aria-label="augmenter les unités">▲</button>
          <div className="odo-digit">{units}</div>
          <button type="button" className="odo-btn" onClick={unitDown} aria-label="diminuer les unités">▼</button>
        </div>
      </div>
      <div className="odo-readout">ça fait <b>{n}</b></div>
      <div className={"odo-flash" + (flash ? " on" : "")}>{flash || "\u00a0"}</div>
    </div>
  );
}
