const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    let digits = data.split("").map(Number);

    for (let j = 0; j < 40; j++) {
      let current = digits[0];
      let count = 1;
      const newDigits = [];
      for (let i = 1; i < digits.length; i++) {
        if (digits[i] === current) {
          count++;
        } else {
          newDigits.push(count);
          newDigits.push(current);
          current = digits[i];
          count = 1;
        }
      }
      newDigits.push(count);
      newDigits.push(current);
      digits = newDigits;
    }

    console.log(digits.join("").length);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 360154
// Elapsed: 44ms
