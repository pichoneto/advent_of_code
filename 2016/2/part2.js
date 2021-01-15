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
      ["0", "0", "1", "0", "0"],
      ["0", "2", "3", "4", "0"],
      ["5", "6", "7", "8", "9"],
      ["0", "A", "B", "C", "0"],
      ["0", "0", "D", "0", "0"],
    ];
    let x = 0;
    let y = 2;
    lines.map((line) => {
      line.split("").map((command) => {
        switch (command) {
          case "U":
            y =
              keypad[y - 1] && keypad[y - 1][x] !== "0"
                ? Math.max(y - 1, 0)
                : y;
            break;
          case "D":
            y =
              keypad[y + 1] && keypad[y + 1][x] !== "0"
                ? Math.min(y + 1, 4)
                : y;
            break;
          case "L":
            x =
              keypad[y][x - 1] && keypad[y][x - 1] !== "0"
                ? Math.max(x - 1, 0)
                : x;
            break;
          case "R":
            x =
              keypad[y][x + 1] && keypad[y][x + 1] !== "0"
                ? Math.min(x + 1, 4)
                : x;
            break;
        }
      });
      code += keypad[y][x];
    });
    console.log(code);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 9365C
// Elapsed: 5ms
