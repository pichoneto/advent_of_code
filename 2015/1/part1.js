const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const instructions = data.split("");
    let floor = 0;
    instructions.map((i) => (i === "(" ? floor++ : floor--));

    console.log(floor);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 280
// Elapsed: 4ms
