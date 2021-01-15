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
    while (!hash.startsWith("000000")) {
      hash = crypto
        .createHash("md5")
        .update(data + counter)
        .digest("hex");
      counter++;
    }
    console.log(counter - 1);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 9962624
// Elapsed: 23915ms
