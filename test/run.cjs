"use strict";
/*
 * Test runner — Axiome skeleton.
 *  1) bundles the React-free surface (src/api.js) and the SSR entry (src/ssr.jsx) for Node, via esbuild;
 *  2) discovers test/*.test.cjs, passing each { api, ssr } + an assertion helper t(name, ok, info?);
 *  3) exits with code != 0 if any test fails.
 *
 *   node test/run.cjs
 */
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const ROOT = path.resolve(__dirname, "..");
const GEN = path.join(__dirname, ".gen");
fs.mkdirSync(GEN, { recursive: true });

function bundle(entry, outfile, jsx) {
  esbuild.buildSync({
    entryPoints: [path.join(ROOT, entry)],
    outfile: path.join(GEN, outfile),
    bundle: true, platform: "node", format: "cjs", logLevel: "silent",
    ...(jsx ? { jsx: "automatic", loader: { ".js": "jsx", ".jsx": "jsx" } } : {}),
  });
}

bundle("src/api.js", "api.cjs", false);
bundle("src/ssr.jsx", "ssr.cjs", true);

const api = require(path.join(GEN, "api.cjs"));
const ssr = require(path.join(GEN, "ssr.cjs"));

const files = fs.readdirSync(__dirname).filter((f) => f.endsWith(".test.cjs")).sort();
let pass = 0, fail = 0;
const fails = [];

for (const f of files) {
  const label = f.replace(/\.test\.cjs$/, "");
  const suite = require(path.join(__dirname, f));
  let sp = 0, sf = 0;
  const t = (name, ok, info) => {
    if (ok) { pass++; sp++; }
    else { fail++; sf++; fails.push(label + " > " + name + (info !== undefined ? "  " + JSON.stringify(info) : "")); }
  };
  try { suite(t, { api, ssr }); }
  catch (e) { fail++; sf++; fails.push(label + " > (exception) " + (e && e.message)); }
  console.log(`  ${sf === 0 ? "\u2714" : "\u2717"} ${label.padEnd(14)} ${sp}/${sp + sf}`);
}

console.log(`\nAxiome — skeleton: ${pass} passed, ${fail} failed.`);
if (fail) {
  console.log("\nFailure details:");
  for (const x of fails) console.log("  \u2717 " + x);
  process.exit(1);
}
console.log("All green \u2714");
