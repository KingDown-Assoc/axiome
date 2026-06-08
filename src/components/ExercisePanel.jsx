// Exercises: 5 tiers with revealable solutions + endless drills (auto-checked generators).
import React, { useMemo, useState } from "react";
import { TIERS } from "../core/exercises.js";
import { rng } from "../core/exercises.js";
import { checkAnswer } from "../core/checker.js";
import RichText from "./RichText.jsx";
import { MathInline } from "./Math.jsx";

function StaticExercise({ ex, index }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="ex">
      <div className="ex-head">
        <span className="ex-num">{index}</span>
        <div className="ex-body">
          <RichText text={ex.prompt} />
          {ex.tex && <div className="ex-tex"><MathInline>{ex.tex}</MathInline></div>}
        </div>
      </div>
      <button className="reveal" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Masquer la correction" : "Voir la correction"}
      </button>
      {open && <div className="solution"><RichText text={ex.solution} /></div>}
    </li>
  );
}

function PracticeCard({ gen }) {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const q = useMemo(() => gen.make(rng(seed)), [gen, seed]);
  const [val, setVal] = useState("");
  const [verdict, setVerdict] = useState(null); // null | "ok" | "no"
  const [show, setShow] = useState(false);

  const verify = () => {
    const r = checkAnswer(val, q.answer, q.check || { type: "number" });
    setVerdict(r.ok ? "ok" : "no");
  };
  const renew = () => { setSeed(Math.floor(Math.random() * 1e9)); setVal(""); setVerdict(null); setShow(false); };

  return (
    <div className="practice-card">
      <div className="practice-q">
        <RichText text={q.prompt} />
        {q.tex && <div className="ex-tex"><MathInline>{q.tex}</MathInline></div>}
      </div>
      <div className="practice-row">
        <input
          className="practice-input"
          value={val}
          placeholder="ta réponse"
          onChange={(e) => { setVal(e.target.value); setVerdict(null); }}
          onKeyDown={(e) => { if (e.key === "Enter") verify(); }}
        />
        <button className="btn" onClick={verify}>Vérifier</button>
        <button className="btn btn-ghost" onClick={renew}>Nouvel exo</button>
      </div>
      {verdict === "ok" && <div className="verdict ok">Bravo, c'est juste !</div>}
      {verdict === "no" && <div className="verdict no">Pas encore — réessaie.</div>}
      {q.solution && (
        <>
          <button className="reveal" onClick={() => setShow((s) => !s)}>
            {show ? "Masquer la correction" : "Voir la correction"}
          </button>
          {show && <div className="solution"><RichText text={q.solution} /></div>}
        </>
      )}
    </div>
  );
}

export default function ExercisePanel({ exercises = [], practice = [] }) {
  if (exercises.length === 0 && practice.length === 0) return null;
  return (
    <section className="exercises">
      <h3 className="block-title">Exercices</h3>
      {TIERS.map((tier) => {
        const items = exercises.filter((e) => e.tier === tier.key);
        const drills = practice.filter((p) => p.tier === tier.key);
        if (items.length === 0 && drills.length === 0) return null;
        return (
          <div key={tier.key} className="tier" style={{ "--tier": tier.color }}>
            <div className="tier-head">
              <span className="tier-dot" />
              <span className="tier-label">{tier.label}</span>
              <span className="tier-sub">{tier.sub}</span>
            </div>
            {items.length > 0 && (
              <ol className="ex-list">
                {items.map((ex, i) => <StaticExercise key={i} ex={ex} index={i + 1} />)}
              </ol>
            )}
            {drills.map((g, i) => (
              <div key={i} className="practice">
                <div className="practice-title">{g.label || "S'entraîner (exercices à volonté)"}</div>
                <PracticeCard gen={g} />
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
