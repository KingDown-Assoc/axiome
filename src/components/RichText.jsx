// Text with inline maths ($...$) and paragraphs (blank line = new paragraph).
import React, { Fragment } from "react";
import { MathInline } from "./Math.jsx";

function inline(text) {
  const parts = String(text).split(/(\$[^$]+\$)/g);
  return parts.map((p, i) =>
    p.length > 1 && p.startsWith("$") && p.endsWith("$")
      ? <MathInline key={i}>{p.slice(1, -1)}</MathInline>
      : <Fragment key={i}>{p}</Fragment>
  );
}

export default function RichText({ text, className }) {
  if (text == null) return null;
  const paras = String(text).split(/\n{2,}/);
  return (
    <>
      {paras.map((para, i) => (
        <p key={i} className={"rt-p" + (className ? " " + className : "")}>
          {para.split(/\n/).map((line, j) => (
            <Fragment key={j}>{j > 0 && <br />}{inline(line)}</Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
