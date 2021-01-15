const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    let molecule = lines[lines.length - 1];
    const replacements = lines
      .slice(0, lines.length - 1)
      .map((replacement) => replacement.split(" => ").reverse());

    let steps = 0;
    while (molecule !== "e") {
      for (let i = 0; i < replacements.length; i++) {
        if (molecule.indexOf(replacements[i][0]) !== -1) {
          molecule = molecule.replace(replacements[i][0], replacements[i][1]);
          steps++;
        }
      }
    }
    console.log(steps);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 195
// Elapsed: 3ms
