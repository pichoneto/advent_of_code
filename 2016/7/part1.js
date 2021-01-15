const fs = require("fs");
const path = require("path");

const isValid = (ip) => {
  const values = ip.split("");
  let betweenBrackets = false;
  let isValid = false;
  for (let i = 3; i < values.length; i++) {
    if (values[i] === "[") {
      betweenBrackets = true;
      continue;
    }
    if (values[i] === "]") {
      betweenBrackets = false;
      continue;
    }
    if (
      values[i - 3] === values[i] &&
      values[i - 2] === values[i - 1] &&
      values[i] !== values[i - 1]
    ) {
      if (betweenBrackets) {
        return false;
      }
      isValid = true;
    }
  }
  return isValid ? ip : false;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    console.log(lines.map(isValid).filter((v) => v).length);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 115
// Elapsed: 17ms
