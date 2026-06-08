// Course-depth selector: Discovery / Standard / Advanced (only shows what exists).
import React from "react";

export const DEPTHS = [
  { key: "discovery", label: "Découverte" },
  { key: "standard",  label: "Standard" },
  { key: "advanced",  label: "Avancé" },
];

export default function DepthTabs({ depths, value, onChange }) {
  const present = DEPTHS.filter((d) => depths && depths[d.key]);
  if (present.length <= 1) return null;
  return (
    <div className="depth-tabs" role="tablist" aria-label="Profondeur du cours">
      {present.map((d) => (
        <button
          key={d.key}
          role="tab"
          aria-selected={value === d.key}
          className={"depth-tab" + (value === d.key ? " is-active" : "")}
          onClick={() => onChange(d.key)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
