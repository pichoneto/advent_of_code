const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    let uncompressed = "";

    let match = null;
    while ((match = /\((\d+)x(\d+)\)/.exec(data))) {
      const [full, length, repetitions] = match;
      const index = match.index + full.length;
      const patternLength = parseInt(length);
      const pattern = data.slice(index, index + patternLength);

      uncompressed += data.slice(0, match.index);
      uncompressed += pattern.repeat(parseInt(repetitions));
      data = data.slice(index + patternLength);
    }
    uncompressed += data;

    console.log(uncompressed.length);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 138735
// Elapsed: 3ms
