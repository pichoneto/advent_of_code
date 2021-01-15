const fs = require("fs");
const path = require("path");

const calculate = (target, signals) => {
  if (Number.isInteger(signals[target])) {
    return signals[target];
  }

  const matches = signals[target].match(
    /(?:(\w+)|(\w+) (AND|OR|LSHIFT|RSHIFT) (\w+)|(NOT) (\w+)) -> \w+/
  );
  if (matches[5] === "NOT") {
    const operand = matches[6];
    if (isNaN(parseInt(operand))) {
      signals[target] = ~calculate(operand, signals) & 0xffff;
    } else {
      signals[target] = ~signals[parseInt(operand)] & 0xffff;
    }
  } else if (matches[3]) {
    const operand1 = matches[2];
    const operation = matches[3];
    const operand2 = matches[4];
    const a = isNaN(parseInt(operand1))
      ? calculate(operand1, signals)
      : parseInt(operand1);
    const b = isNaN(parseInt(operand2))
      ? calculate(operand2, signals)
      : parseInt(operand2);
    switch (operation) {
      case "AND":
        signals[target] = a & b & 0xffff;
        break;
      case "OR":
        signals[target] = a | (b & 0xffff);
        break;
      case "LSHIFT":
        signals[target] = (a << b) & 0xffff;
        break;
      case "RSHIFT":
        signals[target] = (a >> b) & 0xffff;
        break;
    }
  } else {
    const operand = matches[1];
    if (isNaN(parseInt(operand))) {
      signals[target] = calculate(operand, signals);
    } else {
      signals[target] = parseInt(operand);
    }
  }
  return signals[target];
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const signals = {};
    data.split(/[\r\n]+/).map((line) => {
      const [rest, signal] = line.split(" -> ");
      signals[signal] = line;
    });
    signals["b"] = 956;
    console.log(calculate("a", signals));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 40149
// Elapsed: 8ms
