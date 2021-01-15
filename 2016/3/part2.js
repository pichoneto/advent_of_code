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
    let triangles = [[], [], []];

    lines.map((line, i) => {
      const [full, side1, side2, side3] = line.match(
        /\s*(\d+)\s+(\d+)\s+(\d+)/
      );

      triangles[0].push(parseInt(side1));
      triangles[1].push(parseInt(side2));
      triangles[2].push(parseInt(side3));

      if ((i + 1) % 3 === 0) {
        for (let j = 0; j < 3; j++) {
          let valid = true;
          const a = triangles[j][0];
          const b = triangles[j][1];
          const c = triangles[j][2];
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
        }
        triangles = [[], [], []];
      }
    });
    console.log(count);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1838
// Elapsed: 10ms
