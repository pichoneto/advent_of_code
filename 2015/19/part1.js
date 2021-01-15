const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const molecule = lines[lines.length - 1];
    const replacements = lines.slice(0, lines.length - 1);

    const variations = new Set();
    replacements.map((replacement) => {
      const [before, after] = replacement.split(" => ");
      const regex = new RegExp(before, "g");
      let match = null;
      while ((match = regex.exec(molecule))) {
        const variation =
          molecule.slice(0, match.index) +
          molecule.slice(match.index).replace(before, after);
        variations.add(variation);
      }
    });
    console.log(variations.size);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: XXX
// Elapsed: 4ms
