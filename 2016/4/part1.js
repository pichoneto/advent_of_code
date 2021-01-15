const fs = require("fs");
const { parse } = require("path");
const path = require("path");

const parseName = (name) => {
  const count = {};
  name.split("").map((letter) => {
    if (!count[letter]) {
      count[letter] = 0;
    }
    count[letter]++;
  });
  return Object.keys(count)
    .map((key) => ({
      letter: key,
      count: count[key],
    }))
    .sort((a, b) => {
      if (b.count > a.count) {
        return 1;
      }
      if (b.count < a.count) {
        return -1;
      }
      return a.letter.localeCompare(b.letter);
    });
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/).map((line) => line.replace(/-/g, ""));
    let sum = 0;
    lines.map((line) => {
      const [full, name, sector, checksum] = line.match(
        /([a-z]+)(\d+)\[(\w+)]/
      );
      const frequency = parseName(name);
      if (
        frequency
          .slice(0, 5)
          .map((value) => value.letter)
          .join("") === checksum
      ) {
        sum += parseInt(sector);
      }
    });
    console.log(sum);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 361724
// Elapsed: 44ms
