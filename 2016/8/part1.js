const fs = require("fs");
const { parse } = require("path");
const path = require("path");

const parseInstruction = (instruction, screen) => {
  const rectRegex = /rect (\d+)x(\d+)/;
  const colRegex = /rotate column x=(\d+) by (\d+)/;
  const rowRegex = /rotate row y=(\d+) by (\d+)/;

  if (rectRegex.test(instruction)) {
    const [full, sizeX, sizeY] = instruction.match(rectRegex);
    for (let y = 0; y < parseInt(sizeY); y++) {
      for (let x = 0; x < parseInt(sizeX); x++) {
        screen[y][x] = "#";
      }
    }
  } else if (colRegex.test(instruction)) {
    const [full, columnToChange, amount] = instruction.match(colRegex);
    const steps = parseInt(amount) % 6;
    const column = screen.map((row) => row[parseInt(columnToChange)]);
    for (let i = 0; i < steps; i++) {
      const temp = column.pop();
      column.unshift(temp);
    }
    screen.map((row, i) => (row[parseInt(columnToChange)] = column[i]));
  } else if (rowRegex.test(instruction)) {
    const [full, rowToChange, amount] = instruction.match(rowRegex);
    const steps = parseInt(amount) % 50;
    const row = screen[rowToChange];
    for (let i = 0; i < steps; i++) {
      const temp = row.pop();
      row.unshift(temp);
    }
  }
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const screen = [];
    for (let y = 0; y < 6; y++) {
      screen[y] = [];
      for (let x = 0; x < 50; x++) {
        screen[y][x] = ".";
      }
    }

    lines.map((line) => {
      parseInstruction(line, screen);
    });
    console.log(
      screen
        .map((row) => row.filter((cell) => cell === "#").length)
        .reduce((p, c) => p + c, 0)
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 128
// Elapsed: 5ms
