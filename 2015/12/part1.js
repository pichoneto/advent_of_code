const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    console.log(
      data
        .match(/(-*\d+)/g)
        .map(Number)
        .reduce((p, c) => p + c, 0)
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 111754
// Elapsed: 4ms
