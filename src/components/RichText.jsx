// Text with inline maths ($...$), **bold**, *italic*, and paragraphs (blank line = new paragraph).
import React, { Fragment } from "react";
import { MathInline } from "./Math.jsx";

// Render **bold** and *italic* inside a plain (non-maths) text chunk.
function emphasis(text, keyBase) {
  const nodes = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={keyBase + "p" + i}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] != null) nodes.push(<strong key={keyBase + "b" + i}>{m[1]}</strong>);
    else nodes.push(<em key={keyBase + "i" + i}>{m[2]}</em>);
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(<Fragment key={keyBase + "p" + i}>{text.slice(last)}</Fragment>);
  return nodes;
}

// Split a line on $...$ maths, then format the remaining text with emphasis().
function inline(text, keyBase) {
  const parts = String(text).split(/(\$[^$]+\$)/g);
  return parts.map((p, i) =>
    p.length > 1 && p.startsWith("$") && p.endsWith("$")
      ? <MathInline key={keyBase + "m" + i}>{p.slice(1, -1)}</MathInline>
      : <Fragment key={keyBase + "s" + i}>{emphasis(p, keyBase + "s" + i)}</Fragment>
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
            <Fragment key={j}>{j > 0 && <br />}{inline(line, i + "-" + j + "-")}</Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
