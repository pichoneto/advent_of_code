const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    let count = 0;
    lines.map((line) => {
      const [full, side1, side2, side3] = line.match(
        /\s*(\d+)\s+(\d+)\s+(\d+)/
      );
      let valid = true;
      const a = parseInt(side1);
      const b = parseInt(side2);
      const c = parseInt(side3);
      if (a + b <= c) {
        valid = false;
      }
      if (a + c <= b) {
        valid = false;
      }
      if (b + c <= a) {
        valid = false;
      }
      if (valid) {
        count++;
      }
    });
    console.log(count);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1032
// Elapsed: 7ms
