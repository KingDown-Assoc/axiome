// Progress management — validate or reset whole blocks in one click: the full
// progression, a cycle, a school year (classe) or a module (year × field).
// A lycéen shouldn't have to redo maternelle lesson by lesson.
import React from "react";
import { DOMAIN_BY_ID } from "../core/domains.js";
import { LEVEL_BY_ID } from "../core/levels.js";
import { CYCLES, YEAR_BY_ID, lessonsOfYear, lessonsOfCycle, modulesOfYear, leftoverByLevel } from "../core/curriculum.js";
import Icon from "./Icon.jsx";

const countDone = (lessons, completed) => lessons.reduce((n, l) => n + (completed.has(l.id) ? 1 : 0), 0);

function Bar({ done, total, color, wide }) {
  const pct = total ? Math.round((100 * done) / total) : 0;
  return (
    <span className={"pbar" + (wide ? " pbar-wide" : "")} style={color ? { "--domain": color } : undefined} aria-hidden="true">
      <span className="pbar-fill" style={{ width: pct + "%" }} />
    </span>
  );
}

// The validate / reset pair for one block of lessons. stopPropagation +
// preventDefault keep clicks inside a <summary> from toggling the <details>.
function Actions({ what, lessons, completed, onCompleteMany, onResetMany }) {
  const done = countDone(lessons, completed);
  const validate = (e) => {
    e.preventDefault(); e.stopPropagation();
    onCompleteMany(lessons.map((l) => l.id));
  };
  const reset = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm(`Réinitialiser ${what} ?\n${done} leçon(s) validée(s) seront décochées.`)) {
      onResetMany(lessons.map((l) => l.id));
    }
  };
  return (
    <span className="pg-actions">
      <button className="pg-btn" onClick={validate} disabled={done === lessons.length} title="Marquer toutes ces leçons comme terminées">
        <Icon name="CheckCheck" size={14} /> Tout valider
      </button>
      <button className="pg-btn pg-btn-danger" onClick={reset} disabled={done === 0} title="Décocher toutes ces leçons">
        <Icon name="RotateCcw" size={14} /> Réinitialiser
      </button>
    </span>
  );
}

function ModuleRow({ domain, lessons, completed, onCompleteMany, onResetMany, what }) {
  const d = DOMAIN_BY_ID[domain];
  const done = countDone(lessons, completed);
  return (
    <li className="pg-module" style={d ? { "--domain": d.color } : undefined}>
      <span className="pg-mod-label">{d && <Icon name={d.icon} size={13} />} {d ? d.label : domain}</span>
      <Bar done={done} total={lessons.length} color={d ? d.color : undefined} />
      <span className="pg-count">{done}/{lessons.length}</span>
      <Actions what={what} lessons={lessons} completed={completed} onCompleteMany={onCompleteMany} onResetMany={onResetMany} />
    </li>
  );
}

export default function Progress({ lessons, completed, onCompleteMany, onResetMany, onResetAll }) {
  const totalDone = countDone(lessons, completed);
  const extra = leftoverByLevel(lessons);

  const resetAll = () => {
    if (window.confirm(`Réinitialiser TOUTE la progression ?\n${totalDone} leçon(s) validée(s) seront décochées. Cette action ne peut pas être annulée.`)) {
      onResetAll();
    }
  };

  return (
    <div className="progress-page">
      <header className="pg-head">
        <h1><Icon name="ListChecks" size={21} /> Progression &amp; validation</h1>
        <p>
          Valide des blocs entiers — un cycle, une classe ou un module — pour débloquer la suite sans refaire le
          début ; ou réinitialise ce que tu veux reprendre à zéro. <b>{totalDone}</b>/{lessons.length} leçons terminées.
        </p>
        <button className="pg-btn pg-btn-danger" onClick={resetAll} disabled={totalDone === 0}>
          <Icon name="Trash2" size={14} /> Réinitialiser toute la progression
        </button>
      </header>

      {CYCLES.map((c) => {
        const cls = lessonsOfCycle(lessons, c.id);
        if (!cls.length) return null;
        const cdone = countDone(cls, completed);
        return (
          <section key={c.id} className="pg-cycle">
            <div className="pg-cycle-head">
              <h2>{c.label}</h2>
              <span className="pg-sub">{c.sub}</span>
              <span className="pg-count">{cdone}/{cls.length}</span>
              <Actions what={`tout le ${c.label.toLowerCase()}`} lessons={cls} completed={completed} onCompleteMany={onCompleteMany} onResetMany={onResetMany} />
            </div>
            <Bar done={cdone} total={cls.length} wide />

            {c.years.map((yid) => {
              const y = YEAR_BY_ID[yid];
              const yls = lessonsOfYear(lessons, yid);
              if (!y || !yls.length) return null;
              const ydone = countDone(yls, completed);
              return (
                <details key={yid} className="pg-year">
                  <summary>
                    <span className="pg-chev"><Icon name="ChevronRight" size={14} /></span>
                    <span className="pg-year-label">{y.label}</span>
                    <span className="pg-sub">{y.sub}</span>
                    <Bar done={ydone} total={yls.length} />
                    <span className="pg-count">{ydone}/{yls.length}</span>
                    <Actions what={`la classe de ${y.label}`} lessons={yls} completed={completed} onCompleteMany={onCompleteMany} onResetMany={onResetMany} />
                  </summary>
                  <ul className="pg-modules">
                    {modulesOfYear(lessons, yid).map((m) => (
                      <ModuleRow
                        key={m.domain}
                        domain={m.domain}
                        lessons={m.lessons}
                        completed={completed}
                        onCompleteMany={onCompleteMany}
                        onResetMany={onResetMany}
                        what={`le module « ${(DOMAIN_BY_ID[m.domain] || { label: m.domain }).label} — ${y.label} »`}
                      />
                    ))}
                  </ul>
                </details>
              );
            })}
          </section>
        );
      })}

      {extra.length > 0 && (
        <section className="pg-cycle">
          <div className="pg-cycle-head">
            <h2>Au-delà du programme</h2>
            <span className="pg-sub">niveaux en construction (squelette)</span>
          </div>
          <ul className="pg-modules">
            {extra.map(({ level, lessons: lls }) => {
              const lv = LEVEL_BY_ID[level];
              const ldone = countDone(lls, completed);
              return (
                <li key={level} className="pg-module">
                  <span className="pg-mod-label"><Icon name="Layers" size={13} /> {lv ? lv.label : level}</span>
                  <Bar done={ldone} total={lls.length} />
                  <span className="pg-count">{ldone}/{lls.length}</span>
                  <Actions what={`le niveau ${lv ? lv.label : level}`} lessons={lls} completed={completed} onCompleteMany={onCompleteMany} onResetMany={onResetMany} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <p className="pg-foot">
        Valider un bloc marque toutes ses leçons comme terminées — et déverrouille donc leurs suites. Réinitialiser
        les décoche, sans rien toucher d'autre.
      </p>
    </div>
  );
}
