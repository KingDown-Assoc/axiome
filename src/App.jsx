// App root: wires navigation, lesson and home; tracks progress + theme (localStorage) and the suggested next step.
import React, { useEffect, useMemo, useState } from "react";
import { LESSONS } from "./content/index.js";
import { buildIndex } from "./core/registry.js";
import { nextSuggestions } from "./core/prereq.js";
import { LEVELS } from "./core/levels.js";
import { DOMAINS } from "./core/domains.js";
import Nav from "./components/Nav.jsx";
import Lesson from "./components/Lesson.jsx";
import Icon from "./components/Icon.jsx";

const STORE = "maths:completed";
function loadCompleted() {
  if (typeof window === "undefined") return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(STORE) || "[]")); } catch (e) { return new Set(); }
}

const THEME_KEY = "maths:theme";
function loadTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch (e) {}
  return "dark";
}

function Home({ index, level, suggestions, completed, onOpen }) {
  const present = index.byLevelDomain[level] || {};
  const domains = DOMAINS.filter((d) => present[d.id]);
  return (
    <div className="home">
      <section className="hero">
        <h1>Apprendre, comprendre et <em>faire</em> des mathématiques.</h1>
        <p>De la préparation au CP jusqu'au doctorat. Chaque notion part de zéro — une intuition imagée, puis le cours
           formel, des schémas, et des dizaines d'exercices corrigés à difficulté qui monte tout doucement. Tu avances
           à ton rythme : la suite se débloque quand tu es prêt.</p>
      </section>

      {suggestions.length > 0 && (
        <section className="suggest">
          <h2 className="block-title"><Icon name="Sparkles" size={16} /> Tes prochaines étapes</h2>
          <div className="suggest-grid">
            {suggestions.map((l) => {
              const dom = DOMAINS.find((d) => d.id === l.domain);
              const lvl = LEVELS.find((v) => v.id === l.level);
              return (
                <button key={l.id} className="suggest-card" style={{ "--domain": dom ? dom.color : "#5dcaa5" }} onClick={() => onOpen(l.id)}>
                  <span className="suggest-meta">{dom ? dom.label : ""} · {lvl ? lvl.label : ""}</span>
                  <span className="suggest-title">{l.title}</span>
                  {l.tagline && <span className="suggest-tag">{l.tagline}</span>}
                  <span className="suggest-go">Commencer <Icon name="ArrowRight" size={14} /></span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="level-overview">
        <h2 className="block-title">{(LEVELS.find((v) => v.id === level) || {}).label} — les leçons disponibles</h2>
        {domains.length === 0 && (
          <p className="nav-empty">Ce niveau est encore une case à remplir. Le squelette accepte un nouveau champ ou une
             nouvelle leçon à tout moment : il suffit d'ajouter un fichier dans <code>content/</code>.</p>
        )}
        {domains.map((d) => (
          <div key={d.id} className="ov-domain" style={{ "--domain": d.color }}>
            <h3 className="ov-domain-h"><Icon name={d.icon} size={15} /> {d.label}</h3>
            <div className="ov-cards">
              {present[d.id].map((l) => {
                const done = completed.has(l.id);
                return (
                  <button key={l.id} className={"ov-card" + (done ? " is-done" : "")} onClick={() => onOpen(l.id)}>
                    <span className="ov-card-t">{l.title}</span>
                    {l.tagline && <span className="ov-card-s">{l.tagline}</span>}
                    {done && <span className="ov-done"><Icon name="CheckCircle2" size={13} /> terminé</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function App() {
  const index = useMemo(() => buildIndex(LESSONS), []);
  const firstLevel = index.levelsPresent[0] ? index.levelsPresent[0].id : "preschool";
  const [level, setLevel] = useState(firstLevel);
  const [selectedId, setSelectedId] = useState(null);
  const [completed, setCompleted] = useState(loadCompleted);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(STORE, JSON.stringify([...completed])); } catch (e) {}
  }, [completed]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }, [theme]);

  const suggestions = useMemo(() => nextSuggestions(completed, index.lessons, 3), [completed, index]);
  const nextIds = useMemo(() => new Set(suggestions.map((s) => s.id)), [suggestions]);

  const lesson = selectedId ? index.byId[selectedId] : null;
  const toggle = (id) => setCompleted((s) => { const x = new Set(s); x.has(id) ? x.delete(id) : x.add(id); return x; });
  const open = (id) => { setSelectedId(id); setMenuOpen(false); if (typeof window !== "undefined") window.scrollTo(0, 0); };
  const goLevel = (id) => { setLevel(id); setSelectedId(null); };

  return (
    <div className="app">
      <header className="topbar">
        <button className="burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Ouvrir le menu"><Icon name="Menu" size={20} /></button>
        <div className="brand" onClick={() => setSelectedId(null)} role="button" tabIndex={0}>
          <span className="brand-mark">∑</span>
          <span className="brand-text"><b>Axiome</b><i>de la préparation au CP au doctorat</i></span>
        </div>
        <div className="prog" title="Leçons terminées"><Icon name="GraduationCap" size={16} /> {completed.size}/{index.lessons.length}</div>
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Basculer le thème clair / sombre"
          title="Thème clair / sombre"
        >
          <Icon name={theme === "dark" ? "Sun" : "Moon"} size={18} />
        </button>
      </header>

      <div className="layout">
        <aside className={"sidebar" + (menuOpen ? " open" : "")}>
          <Nav index={index} level={level} onLevel={goLevel} selectedId={selectedId} onSelect={open} completed={completed} nextIds={nextIds} />
        </aside>
        {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
        <main className="content">
          {lesson ? (
            <>
              <button className="back" onClick={() => setSelectedId(null)}><Icon name="ArrowLeft" size={15} /> Retour</button>
              <Lesson lesson={lesson} byId={index.byId} completed={completed} onComplete={toggle} />
            </>
          ) : (
            <Home index={index} level={level} suggestions={suggestions} completed={completed} onOpen={open} />
          )}
        </main>
      </div>
    </div>
  );
}
