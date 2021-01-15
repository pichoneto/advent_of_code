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
          const [length, width, height] = line.split("x").map(Number);
          const slack = Math.min(
            Math.min(width * length, width * height),
            height * length
          );
          return (
            2 * length * width +
            2 * length * height +
            2 * width * height +
            slack
          );
        })
        .reduce((p, c) => p + c, 0)
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1598415
// Elapsed: 5ms
