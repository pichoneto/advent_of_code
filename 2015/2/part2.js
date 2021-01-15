const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    console.log(
      lines
        .map((line) => {
          const [sideA, sideB, sideC] = line
            .split("x")
            .map(Number)
            .sort((a, b) => a - b);
          return 2 * sideA + 2 * sideB + sideA * sideB * sideC;
        })
        .reduce((p, c) => p + c, 0)
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 3812909
// Elapsed: 6ms
