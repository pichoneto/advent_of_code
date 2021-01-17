const fs = require("fs");
const path = require("path");

const decompress = (data) => {
  let match = null;
  let partialLength = 0;
  while ((match = /\((\d+)x(\d+)\)/.exec(data))) {
    const [full, length, repetitions] = match;
    const index = match.index + full.length;
    const patternLength = parseInt(length);
    const pattern = data.slice(index, index + patternLength);

    partialLength += data.slice(0, match.index).length;
    partialLength += decompress(pattern) * parseInt(repetitions);
    data = data.slice(index + patternLength);
  }
  partialLength += data.length;
  return partialLength;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    console.log(decompress(data));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 11125026826
// Elapsed: 5ms
