const fs = require("fs");
const path = require("path");

const sumObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.reduce((p, c) => {
      if (Number.isInteger(c)) {
        return p + c;
      }
      return p + sumObject(c);
    }, 0);
  }

  if (Object.values(obj).indexOf("red") !== -1) {
    return 0;
  }

  let sum = 0;
  Object.values(obj).map((val) => {
    if (Number.isInteger(val)) {
      sum += val;
    } else if (Array.isArray(val)) {
      sum += val.reduce((p, c) => {
        if (Number.isInteger(c)) {
          return p + c;
        }
        return p + sumObject(c);
      }, 0);
    } else if (typeof val === "object") {
      sum += sumObject(val);
    }
  });

  return sum;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const info = JSON.parse(data);
    console.log(sumObject(info));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 65402
// Elapsed: 9ms
