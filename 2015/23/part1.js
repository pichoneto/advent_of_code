const fs = require("fs");
const path = require("path");

const compute = (instruction, a, b, pc) => {
  const [command, operand, offset] = instruction.split(" ");

  switch (command) {
    case "hlf":
      if (operand === "a") {
        return [a / 2, b, pc + 1];
      }
      return [a, b / 2, pc + 1];
    case "tpl":
      if (operand === "a") {
        return [a * 3, b, pc + 1];
      }
      return [a, b * 3, pc + 1];
    case "inc":
      if (operand === "a") {
        return [a + 1, b, pc + 1];
      }
      return [a, b + 1, pc + 1];
    case "jmp":
      return [a, b, pc + parseInt(operand)];
    case "jie":
      if (operand === "a,") {
        return [a, b, pc + (a % 2 === 0 ? parseInt(offset) : 1)];
      }
      return [a, b, pc + (b % 2 === 0 ? parseInt(offset) : 1)];
    case "jio":
      if (operand === "a,") {
        return [a, b, pc + (a === 1 ? parseInt(offset) : 1)];
      }
      return [a, b, pc + (b === 1 ? parseInt(offset) : 1)];
  }
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const instructions = data.split(/[\r\n]+/);

    let a = 0;
    let b = 0;
    let pc = 0;
    while (pc < instructions.length) {
      [a, b, pc] = compute(instructions[pc], a, b, pc);
    }
    console.log(b);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 184
// Elapsed: 5ms
