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
      lines.filter((line) => {
        if (/ab|cd|pq|xy/.test(line)) {
          return false;
        }
        let vowels = 0;
        let prev = "";
        let foundEqual = false;
        line.split("").map((letter) => {
          if (letter === prev) {
            foundEqual++;
          }
          if (/[aeiou]/.test(letter)) {
            vowels++;
          }
          prev = letter;
        });
        if (vowels < 3) {
          return false;
        }
        return foundEqual;
      }).length
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 258
// Elapsed: 10ms
