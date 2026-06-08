// Generic lesson rendering: intuition → course (depths) → why → figures → examples → exercises.
import React, { useState } from "react";
import { DOMAIN_BY_ID } from "../core/domains.js";
import { LEVEL_BY_ID } from "../core/levels.js";
import RichText from "./RichText.jsx";
import { MathBlock, MathInline } from "./Math.jsx";
import DepthTabs from "./DepthTabs.jsx";
import WidgetHost from "./WidgetHost.jsx";
import ExercisePanel from "./ExercisePanel.jsx";
import Icon from "./Icon.jsx";

function firstDepth(depths) {
  if (!depths) return null;
  for (const k of ["discovery", "standard", "advanced"]) if (depths[k]) return k;
  return null;
}

export default function Lesson({ lesson, byId, completed, onComplete }) {
  const [depth, setDepth] = useState(() => firstDepth(lesson.depths));
  // re-pick a valid depth when switching lessons
  const validDepth = lesson.depths && lesson.depths[depth] ? depth : firstDepth(lesson.depths);

  const dom = DOMAIN_BY_ID[lesson.domain];
  const lvl = LEVEL_BY_ID[lesson.level];
  const showWhy = lesson.why && validDepth !== "discovery"; // the "Why?" box appears from Standard on
  const prereqLessons = (lesson.prereqs || []).map((p) => byId && byId[p]).filter(Boolean);
  const done = completed && completed.has(lesson.id);

  return (
    <article className="lesson" style={{ "--domain": dom ? dom.color : "#5dcaa5" }}>
      <header className="lesson-head">
        <div className="chips">
          {dom && <span className="chip chip-domain"><Icon name={dom.icon} size={14} />{dom.label}</span>}
          {lvl && <span className="chip">{lvl.label}</span>}
          {lesson.draft && <span className="chip chip-draft">démo · provisoire</span>}
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        {lesson.tagline && <p className="lesson-tagline">{lesson.tagline}</p>}
        {prereqLessons.length > 0 && (
          <p className="prereq-line">
            <Icon name="CornerDownRight" size={13} /> À voir avant : {prereqLessons.map((p) => p.title).join(" · ")}
          </p>
        )}
      </header>

      <section className="intuition">
        <div className="block-tag">L'intuition d'abord</div>
        <RichText text={lesson.intuition} />
      </section>

      {lesson.depths && (
        <section className="cours">
          <div className="cours-bar">
            <h3 className="block-title">Le cours</h3>
            <DepthTabs depths={lesson.depths} value={validDepth} onChange={setDepth} />
          </div>
          <RichText text={lesson.depths[validDepth]} />
        </section>
      )}

      {lesson.formulas && lesson.formulas.length > 0 && (
        <section className="formulas">
          {lesson.formulas.map((f, i) => (
            <div key={i} className="formula">
              <MathBlock>{f.tex}</MathBlock>
              {f.legend && <div className="formula-legend">{f.legend}</div>}
            </div>
          ))}
        </section>
      )}

      {lesson.keyIdea && (
        <aside className="keyidea"><span className="keyidea-tag">À retenir</span><RichText text={lesson.keyIdea} /></aside>
      )}

      {showWhy && (
        <aside className="why">
          <div className="why-tag"><Icon name="HelpCircle" size={15} /> Pourquoi&nbsp;?</div>
          <RichText text={lesson.why} />
        </aside>
      )}

      {(lesson.widgets || []).map((w, i) => (
        <WidgetHost key={i} kind={w.kind} params={w.params} caption={w.caption} />
      ))}

      {lesson.examples && lesson.examples.length > 0 && (
        <section className="examples">
          <h3 className="block-title">Exemples corrigés</h3>
          {lesson.examples.map((ex, i) => (
            <div key={i} className="example">
              <div className="example-title">{ex.title}</div>
              <ol className="steps">
                {ex.steps.map((s, j) => (
                  <li key={j} className="step">
                    <RichText text={s.p} />
                    {s.tex && <div className="ex-tex"><MathInline>{s.tex}</MathInline></div>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      <ExercisePanel exercises={lesson.exercises} practice={lesson.practice} />

      {onComplete && (
        <footer className="lesson-foot">
          <button className={"btn " + (done ? "btn-done" : "")} onClick={() => onComplete(lesson.id)}>
            <Icon name={done ? "CheckCircle2" : "Circle"} size={16} />
            {done ? "Leçon terminée — débloque la suite" : "Marquer comme terminée"}
          </button>
        </footer>
      )}
    </article>
  );
}
