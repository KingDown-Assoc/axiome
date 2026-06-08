// Formula rendering via KaTeX. renderToString also works during SSR.
import React, { useMemo } from "react";
import katex from "katex";

export function MathInline({ children }) {
  const html = useMemo(
    () => katex.renderToString(String(children), { throwOnError: false, displayMode: false }),
    [children]
  );
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathBlock({ children }) {
  const html = useMemo(
    () => katex.renderToString(String(children), { throwOnError: false, displayMode: true }),
    [children]
  );
  return <div className="math-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
