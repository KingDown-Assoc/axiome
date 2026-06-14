// Navigation: level selector, then — when the level has school years — the
// classes (CP, CE1…), each holding its fields → lessons (lock / suggested step).
// Levels without declared years keep the flat field view.
import React from "react";
import { DOMAIN_BY_ID } from "../core/domains.js";
import { yearGroupsOfLevel, groupByDomain } from "../core/curriculum.js";
import { isUnlocked } from "../core/prereq.js";
import Icon from "./Icon.jsx";

function DomainBlocks({ lessons, byId, selectedId, onSelect, completed, nextIds }) {
  return groupByDomain(lessons).map(({ domain, lessons: ls }) => {
    const d = DOMAIN_BY_ID[domain];
    return (
      <div key={domain} className="domain-group" style={{ "--domain": d ? d.color : undefined }}>
        <div className="domain-head"><Icon name={d ? d.icon : "Circle"} size={15} /><span>{d ? d.label : domain}</span></div>
        <ul className="lesson-list">
          {ls.map((l) => {
            const unlocked = isUnlocked(l.id, completed, byId);
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
  });
}

export default function Nav({ index, level, onLevel, selectedId, onSelect, completed, nextIds }) {
  const lvObj = index.levelsPresent.find((l) => l.id === level) || index.levelsPresent[0];
  const lv = lvObj ? lvObj.id : null;
  const groups = lv ? yearGroupsOfLevel(index.byLevel[lv] || [], lv) : [];
  const showYears = groups.length > 1;
  const blocks = (ls) => (
    <DomainBlocks lessons={ls} byId={index.byId} selectedId={selectedId} onSelect={onSelect} completed={completed} nextIds={nextIds} />
  );

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

      <div className="nav-section-title">{showYears ? "Classes" : "Champs"}</div>
      <div className="domains">
        {groups.length === 0 && <p className="nav-empty">Aucun champ ici pour l'instant.</p>}
        {!showYears && groups[0] && blocks(groups[0].lessons)}
        {showYears && groups.map((g) => {
          const done = g.lessons.reduce((n, l) => n + (completed && completed.has(l.id) ? 1 : 0), 0);
          return (
            <details key={g.year ? g.year.id : "rest"} className="nav-year" open>
              <summary>
                <span className="pg-chev"><Icon name="ChevronRight" size={13} /></span>
                <span className="ny-label">{g.year ? g.year.label : "Autres leçons"}</span>
                {g.year && g.year.sub && <span className="ny-sub">{g.year.sub}</span>}
                <span className="ny-count">{done}/{g.lessons.length}</span>
              </summary>
              {blocks(g.lessons)}
            </details>
          );
        })}
      </div>
    </nav>
  );
}
