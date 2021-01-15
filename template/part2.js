const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: XXX
// Elapsed: TTms
