const fs = require("fs");
const path = require("path");
const { play, countAlive } = require("../../util/game_of_life");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);

    const grid = lines.map((line) =>
      line.split("").map((cell) => cell === "#")
    );

    const result = play(grid, 100);
    console.log(countAlive(result));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 814
// Elapsed: 202ms
