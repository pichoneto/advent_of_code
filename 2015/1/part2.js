const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const instructions = data.split("");
    let floor = 0;
    for (let i = 0; i < instructions.length; i++) {
      instructions[i] === "(" ? floor++ : floor--;
      if (floor === -1) {
        console.log(i + 1);
        break;
      }
    }

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1797
// Elapsed: 3ms
