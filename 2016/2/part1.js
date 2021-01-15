const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);

    let code = "";
    const keypad = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let x = 1;
    let y = 1;
    lines.map((line) => {
      line.split("").map((command) => {
        switch (command) {
          case "U":
            y = Math.max(y - 1, 0);
            break;
          case "D":
            y = Math.min(y + 1, 2);
            break;
          case "L":
            x = Math.max(x - 1, 0);
            break;
          case "R":
            x = Math.min(x + 1, 2);
            break;
        }
      });
      code += keypad[y][x];
    });
    console.log(code);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 35749
// Elapsed: 3ms
