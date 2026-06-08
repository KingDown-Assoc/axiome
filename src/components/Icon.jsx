// Resolves a lucide icon by name, with a fallback (never crashes if the name changes).
import React from "react";
import * as Lucide from "lucide-react";

export default function Icon({ name, ...props }) {
  const Cmp = (name && Lucide[name]) || Lucide.Circle;
  return <Cmp {...props} />;
}
