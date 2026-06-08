// Navigation: level selector, then the fields present → lessons (with lock / suggested step).
import React from "react";
import { DOMAIN_BY_ID, domainOrder } from "../core/domains.js";
import { isUnlocked } from "../core/prereq.js";
import Icon from "./Icon.jsx";

export default function Nav({ index, level, onLevel, selectedId, onSelect, completed, nextIds }) {
  const lvObj = index.levelsPresent.find((l) => l.id === level) || index.levelsPresent[0];
  const lv = lvObj ? lvObj.id : null;
  const domains = lv && index.byLevelDomain[lv]
    ? Object.keys(index.byLevelDomain[lv]).map((id) => DOMAIN_BY_ID[id]).filter(Boolean).sort((a, b) => domainOrder(a.id) - domainOrder(b.id))
    : [];

  return (
    <nav className="nav">
      <div className="nav-section-title">Niveaux</div>
      <div className="levels">
        {index.levelsPresent.map((l) => (
          <button
            key={l.id}
            className={"level-pill" + (l.id === lv ? " is-active" : "")}
            onClick={() => onLevel(l.id)}
            title={l.sub}
          >
            <span className="level-label">{l.label}</span>
            <span className="level-sub">{l.sub}</span>
          </button>
        ))}
      </div>

      <div className="nav-section-title">Champs</div>
      <div className="domains">
        {domains.length === 0 && <p className="nav-empty">Aucun champ ici pour l'instant.</p>}
        {domains.map((d) => {
          const lessons = index.byLevelDomain[lv][d.id] || [];
          return (
            <div key={d.id} className="domain-group" style={{ "--domain": d.color }}>
              <div className="domain-head"><Icon name={d.icon} size={15} /><span>{d.label}</span></div>
              <ul className="lesson-list">
                {lessons.map((l) => {
                  const unlocked = isUnlocked(l.id, completed, index.byId);
                  const isNext = nextIds && nextIds.has(l.id);
                  const isDone = completed && completed.has(l.id);
                  return (
                    <li key={l.id}>
                      <button
                        className={"lesson-item" + (l.id === selectedId ? " is-active" : "") + (!unlocked ? " is-locked" : "")}
                        onClick={() => onSelect(l.id)}
                      >
                        <span className="li-state">
                          {isDone ? <Icon name="CheckCircle2" size={14} />
                            : !unlocked ? <Icon name="Lock" size={13} />
                            : isNext ? <Icon name="Star" size={13} />
                            : <Icon name="Circle" size={12} />}
                        </span>
                        <span className="li-title">{l.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
