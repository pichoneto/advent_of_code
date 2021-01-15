const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    console.log(
      lines
        .map((line) => {
          const code = line.length;
          line = line
            .slice(1, line.length - 1)
            .replace(/\\"/g, "X")
            .replace(/\\\\/g, "Y")
            .replace(/\\x\w{2}/g, "Z");
          return code - line.length;
        })
        .reduce((p, c) => p + c, 0)
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1333
// Elapsed: 4ms
