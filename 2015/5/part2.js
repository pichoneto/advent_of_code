const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    let regexpStr = "";
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(97 + i);
      regexpStr += "|" + char + "[a-z]" + char;
    }

    console.log(
      lines.filter((line) => {
        const doubleLetterRegexp = new RegExp(regexpStr.slice(1));
        if (!doubleLetterRegexp.test(line)) {
          return false;
        }
        const groups = {};
        const letters = line.split("");
        for (let i = 1; i < letters.length; i++) {
          const key = [letters[i - 1], letters[i]].toString();
          if (!groups[key]) {
            groups[key] = 1;
          } else {
            if (
              !(
                letters[i] === letters[i - 1] &&
                letters[i - 1] === letters[i - 2]
              )
            ) {
              groups[key]++;
            }
          }
        }
        return Object.values(groups).filter((v) => v > 1).length > 0;
      }).length
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 53
// Elapsed: 90ms
