const fs = require("fs");
const path = require("path");

const isValid = (ip) => {
  let match = null;
  const regex = /(?:\[(\w+)\])/g;
  while ((match = regex.exec(ip))) {
    const supernet = ip.replace(/(?:\[(\w+)\])/g, "");
    const values = match[1].split("");
    for (let i = 2; i < values.length; i++) {
      if (values[i] === values[i - 2] && values[i] !== values[i - 1]) {
        const inverse = [values[i - 1], values[i], values[i - 1]].join("");
        if (supernet.indexOf(inverse) !== -1) {
          return ip;
        }
      }
    }
  }
  return false;
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

// Answer: 231
// Elapsed: 15ms
