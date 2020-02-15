const check_operator = expr => {
  const operations = ["+", "-", "*", "/"];
  const expr_len = expr.length;

  for (op of operations) {
    for (let i = expr_len; i !== 0; i--) {
      const pos = expr.lastIndexOf(op, i - 1);

      if (pos !== -1) {
        if (
          !(
            (op === "+" || op === "-") &&
            (pos === 0 || expr[pos - 1] === "*" || expr[pos - 1] === "/")
          )
        ) {
          return {
            op: op,
            pos: pos,
            len: expr.length
          };
        }
      }
    }
  }
};

const handle_expr = expr => {
  const expr_len = expr.length;

  if (expr_len > 2) {
    const res = check_operator(expr);
    const subExpr_left = expr.substring(0, res.pos);
    const subExpr_right = expr.substring(res.pos + 1, res.len);
    const left_res = handle_expr(subExpr_left);
    const right_res = handle_expr(subExpr_right);

    switch (res.op) {
      case "*":
        return left_res * right_res;
      case "/":
        return left_res / right_res;
      case "+":
        return left_res + right_res;
      case "-":
        return left_res - right_res;
    }
  } else if (expr_len === 2) {
    return parseInt(expr);
  } else {
    return parseInt(expr);
  }
};

const form = "2*3+4/6*3/2+2-8*2+6*6-3*-5/9+4*-3/5+4/-2/-2/-4/-9+4*2-5/3";

console.log("Expr: " + form + " -->  Resultado:" + handle_expr(form));
