const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(", ");

    let heading = 0; // 0 N; 1 E; 2 S; 3 W
    let x = 0;
    let y = 0;
    lines.map((line) => {
      const command = line.charAt(0);
      if (command === "R") {
        heading = (heading + 1) % 4;
      } else {
        heading = (heading + 3) % 4;
      }
      const steps = parseInt(line.slice(1));
      switch (heading) {
        case 0:
          y -= steps;
          break;
        case 1:
          x += steps;
          break;
        case 2:
          y += steps;
          break;
        case 3:
          x -= steps;
          break;
      }
    });
    console.log(Math.abs(x) + Math.abs(y));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 287
// Elapsed: 3ms
