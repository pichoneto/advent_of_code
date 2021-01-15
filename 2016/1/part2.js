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
    const visited = new Set();
    visited.add(JSON.stringify([x, y]));
    lines.some((line) => {
      const command = line.charAt(0);
      if (command === "R") {
        heading = (heading + 1) % 4;
      } else {
        heading = (heading + 3) % 4;
      }
      const steps = parseInt(line.slice(1));
      switch (heading) {
        case 0:
          for (let i = 0; i < steps; i++) {
            y--;
            const key = JSON.stringify([x, y]);
            if (visited.has(key)) {
              return true;
            }
            visited.add(key);
          }
          break;
        case 1:
          for (let i = 0; i < steps; i++) {
            x++;
            const key = JSON.stringify([x, y]);
            if (visited.has(key)) {
              return true;
            }
            visited.add(key);
          }
          break;
        case 2:
          for (let i = 0; i < steps; i++) {
            y++;
            const key = JSON.stringify([x, y]);
            if (visited.has(key)) {
              return true;
            }
            visited.add(key);
          }
          break;
        case 3:
          for (let i = 0; i < steps; i++) {
            x--;
            const key = JSON.stringify([x, y]);
            if (visited.has(key)) {
              return true;
            }
            visited.add(key);
          }
          break;
      }
      return false;
    });
    console.log(Math.abs(x) + Math.abs(y));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 133
// Elapsed: 5ms
