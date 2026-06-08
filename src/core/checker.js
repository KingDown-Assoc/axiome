// Answer normalization + comparison, plus a SAFE arithmetic evaluator (no eval) used for the
// numeric mode and the exercise generators.

export function normalize(s) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\u2212/g, "-")   // unicode minus sign
    .replace(/\s+/g, "")
    .replace(/,/g, ".");
}

const PREC = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
const RIGHT = { "^": true };

function apply(out, op) {
  const b = out.pop(), a = out.pop();
  if (a === undefined || b === undefined) throw new Error("missing operand");
  switch (op) {
    case "+": out.push(a + b); break;
    case "-": out.push(a - b); break;
    case "*": out.push(a * b); break;
    case "/": out.push(a / b); break;
    case "^": out.push(Math.pow(a, b)); break;
    default: throw new Error("unknown operator");
  }
}

// Evaluate an arithmetic expression (+ - * / ^, parentheses, decimals, unary minus).
export function evalArith(expr) {
  const s = normalize(expr).replace(/\*\*/g, "^");
  if (s === "") throw new Error("empty");
  const toks = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      toks.push({ t: "num", v: parseFloat(s.slice(i, j)) });
      i = j;
    } else if ("+-*/^()".includes(c)) {
      toks.push({ t: "op", v: c });
      i++;
    } else {
      throw new Error("invalid character: " + c);
    }
  }
  const out = [], ops = [];
  let prev = null; // null | "num" | "op" | "("
  for (const tk of toks) {
    if (tk.t === "num") { out.push(tk.v); prev = "num"; continue; }
    const op = tk.v;
    if (op === "(") { ops.push("("); prev = "("; continue; }
    if (op === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") apply(out, ops.pop());
      if (!ops.length) throw new Error("paren");
      ops.pop(); prev = "num"; continue;
    }
    // binary / unary operator
    if ((op === "-" || op === "+") && (prev === null || prev === "op" || prev === "(")) {
      if (op === "-") { out.push(0); ops.push("-"); }
      prev = "op"; continue; // unary + ignored
    }
    while (ops.length) {
      const top = ops[ops.length - 1];
      if (top === "(") break;
      if (PREC[top] > PREC[op] || (PREC[top] === PREC[op] && !RIGHT[op])) apply(out, ops.pop());
      else break;
    }
    ops.push(op); prev = "op";
  }
  while (ops.length) {
    const op = ops.pop();
    if (op === "(") throw new Error("paren");
    apply(out, op);
  }
  if (out.length !== 1 || !isFinite(out[0])) throw new Error("invalid expression");
  return out[0];
}

// Compare the learner's input to the expected answer.
// opts.type: "number" (default) | "exact" | "set"
export function checkAnswer(input, expected, opts = {}) {
  const type = opts.type || "number";
  if (input == null || normalize(input) === "") return { ok: false, reason: "empty" };

  if (type === "number") {
    let got, exp;
    try { got = evalArith(input); } catch { return { ok: false, reason: "unreadable" }; }
    try { exp = typeof expected === "number" ? expected : evalArith(expected); } catch { return { ok: false, reason: "invalid-expected" }; }
    const tol = opts.tol != null ? opts.tol : 1e-6;
    const ok = Math.abs(got - exp) <= tol * Math.max(1, Math.abs(exp));
    return { ok, got, exp };
  }

  if (type === "exact") {
    return { ok: normalize(input) === normalize(expected) };
  }

  if (type === "set") {
    // Split on , or ; BEFORE normalizing (normalize() turns commas into dots).
    const toItems = (x) => String(x ?? "")
      .toLowerCase()
      .replace(/\u2212/g, "-")
      .split(/[;,]/)
      .map((s) => s.replace(/\s+/g, ""))
      .filter(Boolean)
      .sort();
    const a = toItems(input), b = toItems(expected);
    return { ok: a.length === b.length && a.every((v, k) => v === b[k]) };
  }

  return { ok: false, reason: "unknown-type" };
}
