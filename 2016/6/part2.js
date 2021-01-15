const fs = require("fs");
const path = require("path");

const getFrequency = (str) => {
  const count = {};
  str.map((letter) => {
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
    .sort((a, b) => a.count - b.count);
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const columns = [];
    lines.map((line) => {
      line.split("").map((column, i) => {
        if (!columns[i]) {
          columns[i] = [];
        }
        columns[i].push(column);
      });
    });
    console.log(
      columns.map((column) => getFrequency(column)[0].letter).join("")
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: xdkzukcf
// Elapsed: 7ms
