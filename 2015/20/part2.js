const fs = require("fs");
const path = require("path");
const { divisors } = require("../../util/math");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const target = data
      .split(/[\r\n]+/)
      .map(Number)
      .pop();

    let candidate = 0;
    let score = 0;
    while (score <= target) {
      candidate++;
      const elves = divisors(candidate);
      score = elves
        .filter((elf) => candidate / elf <= 50)
        .reduce((p, c) => p + c * 11, 0);
    }
    console.log(candidate);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 665280
// Elapsed: 2000ms
