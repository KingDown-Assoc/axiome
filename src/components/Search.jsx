// Barre de recherche (topbar) : filtre les leçons en direct et ouvre la leçon choisie.
// S'appuie sur le moteur pur core/search.js ; réutilise onOpen (ouverture de leçon).
import React, { useEffect, useMemo, useRef, useState } from "react";
import { searchLessons } from "../core/search.js";
import { DOMAIN_BY_ID } from "../core/domains.js";
import { LEVELS } from "../core/levels.js";
import Icon from "./Icon.jsx";

const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l]));

export default function Search({ index, onOpen, limit = 12 }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => searchLessons(index.lessons, q, limit), [index, q, limit]);
  useEffect(() => { setActive(0); }, [q]);

  // Fermer au clic à l'extérieur.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (lesson) => {
    if (!lesson) return;
    onOpen(lesson.id);
    setQ(""); setOpen(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { setQ(""); setOpen(false); return; }
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => (i + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[active] || results[0]); }
  };

  const showList = open && q.trim().length > 0;

  return (
    <div className="search" ref={boxRef}>
      <div className="search-box">
        <Icon name="Search" size={16} />
        <input
          ref={inputRef}
          className="search-input"
          type="search"
          value={q}
          placeholder="Rechercher une leçon, un thème…"
          aria-label="Rechercher une leçon"
          autoComplete="off"
          spellCheck={false}
          maxLength={24}
          role="combobox"
          aria-expanded={showList}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
        />
        {q && (
          <button
            className="search-clear"
            type="button"
            aria-label="Effacer la recherche"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { setQ(""); setOpen(true); if (inputRef.current) inputRef.current.focus(); }}
          >
            <Icon name="X" size={15} />
          </button>
        )}
      </div>

      {showList && (
        <div className="search-results" role="listbox">
          {results.length === 0 ? (
            <div className="search-empty">Aucune leçon pour « {q.trim()} ».</div>
          ) : (
            results.map((l, i) => {
              const dom = DOMAIN_BY_ID[l.domain];
              const lvl = LEVEL_BY_ID[l.level];
              return (
                <button
                  key={l.id}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={"search-hit" + (i === active ? " is-active" : "")}
                  style={{ "--domain": dom ? dom.color : "var(--accent)" }}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(l)}
                >
                  <span className="search-hit-meta">{dom ? dom.label : l.domain}{lvl ? " · " + lvl.label : ""}</span>
                  <span className="search-hit-title">{l.title}</span>
                  {l.tagline && <span className="search-hit-tag">{l.tagline}</span>}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
