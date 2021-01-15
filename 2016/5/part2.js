const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    let hash = "";
    let counter = 0;
    let password = [];
    while (password.filter((x) => x).length < 8) {
      while (!hash.startsWith("00000")) {
        hash = crypto
          .createHash("md5")
          .update(data + counter)
          .digest("hex");
        counter++;
      }
      const position = parseInt(hash.charAt(5));
      if (
        [0, 1, 2, 3, 4, 5, 6, 7].indexOf(position) !== -1 &&
        !password[position]
      ) {
        password[position] = hash.charAt(6);
      }
      hash = "";
    }
    console.log(password.join(""));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 999828ec
// Elapsed: 62773ms
