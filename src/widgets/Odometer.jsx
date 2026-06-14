// Place-value counter with N wheels (units up to hundreds of millions). Each wheel
// steps its own rank; when a wheel passes 9 it rolls back to 0 and the next rank
// advances (and the reverse on the way down) — the carry made visible at any scale.
// The wheel count follows the value (minimum 2, maximum 9), or can be forced.
// params: { value=0, digits?, max? }  — backward compatible: { value: 34 } → 2 wheels.
import React, { useState, useRef } from "react";

const LABELS = [
  "unités", "dizaines", "centaines",
  "milliers", "dizaines de milliers", "centaines de milliers",
  "millions", "dizaines de millions", "centaines de millions",
];
const COLORS = ["#5dcaa5", "#8b7fe8", "#e8a87f"]; // cycle per position within a class

export default function Odometer({ value = 0, digits, max }) {
  const safe = Math.max(0, Math.floor(value));
  const wheels = Math.max(2, Math.min(9, digits || String(safe).length));
  const cap = Math.max(9, Math.min(Math.pow(10, wheels) - 1, max ?? Math.pow(10, wheels) - 1));
  const [n, setN] = useState(Math.min(cap, safe));
  const [flash, setFlash] = useState("");
  const timer = useRef(null);

  const digitAt = (v, i) => Math.floor(v / Math.pow(10, i)) % 10;
  const clamp = (v) => Math.max(0, Math.min(cap, v));

  const note = (msg) => {
    setFlash(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(""), 1600);
  };

  // Each wheel drives its own carry: stepping rank i past 9 rolls it to 0 and feeds rank i+1.
  const step = (i, dir) => {
    const next = clamp(n + dir * Math.pow(10, i));
    if (next !== n) {
      const before = digitAt(n, i), after = digitAt(next, i);
      if (dir > 0 && before === 9 && after === 0)
        note(`Les ${LABELS[i]} reviennent à 0 → +1 ${i + 1 < wheels ? LABELS[i + 1].replace(/s$/, "") : "retenue"} !`);
      if (dir < 0 && before === 0 && after === 9)
        note(`Les ${LABELS[i]} repartent à 9 → −1 ${i + 1 < wheels ? LABELS[i + 1].replace(/s$/, "") : "retenue"}`);
    }
    setN(next);
  };

  const order = []; // wheels rendered left → right: highest rank first
  for (let i = wheels - 1; i >= 0; i--) order.push(i);

  return (
    <div className="odometer">
      <div className="odo-wheels" style={{ flexWrap: "wrap", justifyContent: "center" }}>
        {order.map((i) => (
          <div
            key={i}
            className="odo-wheel"
            style={{
              "--odo": COLORS[i % 3],
              marginLeft: i % 3 === 2 && i !== wheels - 1 ? "12px" : undefined, // class gap (units | mille | millions)
            }}
          >
            <div className="odo-label">{wheels > 4 ? LABELS[i].replace("dizaines de ", "diz. de ").replace("centaines de ", "cent. de ") : LABELS[i]}</div>
            <button type="button" className="odo-btn" onClick={() => step(i, +1)} aria-label={`augmenter les ${LABELS[i]}`}>▲</button>
            <div className="odo-digit">{digitAt(n, i)}</div>
            <button type="button" className="odo-btn" onClick={() => step(i, -1)} aria-label={`diminuer les ${LABELS[i]}`}>▼</button>
          </div>
        ))}
      </div>
      <div className="odo-readout">ça fait <b>{n.toLocaleString("fr-FR")}</b></div>
      <div className={"odo-flash" + (flash ? " on" : "")}>{flash || "\u00a0"}</div>
    </div>
  );
}
