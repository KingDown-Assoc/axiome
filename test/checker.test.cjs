"use strict";
module.exports = function (t, { api }) {
  const { evalArith, checkAnswer, normalize } = api;
  t("evalArith — precedence", Math.abs(evalArith("2 + 3 * 4") - 14) < 1e-9);
  t("evalArith — parentheses & power", Math.abs(evalArith("(1+2)^3") - 27) < 1e-9);
  t("evalArith — unary minus", Math.abs(evalArith("-3 + 5") - 2) < 1e-9);
  t("normalize — spaces/case/comma", normalize("  3,5 X ") === "3.5x");
  t("check number — integer", checkAnswer("6", 6).ok);
  t("check number — via expression", checkAnswer("2*3", 6).ok);
  t("check number — rejects a wrong value", !checkAnswer("7", 6).ok);
  t("check exact — '<' sign", checkAnswer("<", "<", { type: "exact" }).ok);
  t("check exact — rejects '>'", !checkAnswer(">", "<", { type: "exact" }).ok);
  t("check set — unordered", checkAnswer("3,5,8", "8,3,5", { type: "set" }).ok);
  t("check — empty answer rejected", !checkAnswer("", 6).ok);
};
