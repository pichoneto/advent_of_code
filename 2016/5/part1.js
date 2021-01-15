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
    let password = "";
    for (let i = 0; i < 8; i++) {
      while (!hash.startsWith("00000")) {
        hash = crypto
          .createHash("md5")
          .update(data + counter)
          .digest("hex");
        counter++;
      }
      password += hash.charAt(5);
      console.log(password);
      hash = "";
    }
    console.log(password);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: f77a0e6e
// Elapsed: 20177ms
