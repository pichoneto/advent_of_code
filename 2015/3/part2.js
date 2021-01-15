const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const visited = new Set();
    let xSanta = 0;
    let ySanta = 0;
    let xRoboSanta = 0;
    let yRoboSanta = 0;
    visited.add([0, 0].toString());

    const directions = data.split("");
    directions.map((direction, i) => {
      switch (direction) {
        case "<":
          i % 2 === 0 ? xSanta-- : xRoboSanta--;
          break;
        case ">":
          i % 2 === 0 ? xSanta++ : xRoboSanta++;
          break;
        case "^":
          i % 2 === 0 ? ySanta-- : yRoboSanta--;
          break;
        case "v":
          i % 2 === 0 ? ySanta++ : yRoboSanta++;
          break;
      }
      if (i % 2 === 0) {
        visited.add([xSanta, ySanta].toString());
      } else {
        visited.add([xRoboSanta, yRoboSanta].toString());
      }
    });

    console.log(visited.size);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 2341
// Elapsed: 13ms
