const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const visited = new Set();
    let x = 0;
    let y = 0;
    visited.add([x, y].toString());

    const directions = data.split("");
    directions.map((direction) => {
      switch (direction) {
        case "<":
          x--;
          break;
        case ">":
          x++;
          break;
        case "^":
          y--;
          break;
        case "v":
          y++;
          break;
      }
      visited.add([x, y].toString());
    });

    console.log(visited.size);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 2081
// Elapsed: 10ms
