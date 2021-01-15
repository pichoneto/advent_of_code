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

    let grid = lines.map((line) => line.split("").map((cell) => cell === "#"));

    grid[0][0] = true;
    grid[0][grid.length - 1] = true;
    grid[grid.length - 1][0] = true;
    grid[grid.length - 1][grid.length - 1] = true;

    for (let i = 0; i < 100; i++) {
      grid = play(grid);
      grid[0][0] = true;
      grid[0][grid.length - 1] = true;
      grid[grid.length - 1][0] = true;
      grid[grid.length - 1][grid.length - 1] = true;
    }

    console.log(countAlive(grid));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 924
// Elapsed: 206ms
