const fs = require("fs");
const path = require("path");

const increasePassword = (pass) => {
  for (let i = pass.length - 1; i >= 0; i--) {
    if (pass[i] !== "z") {
      pass[i] = String.fromCharCode(pass[i].charCodeAt(0) + 1);
      if (pass[i] === "i" || pass[i] === "l" || pass[i] === "o") {
        pass[i] = String.fromCharCode(pass[i].charCodeAt(0) + 1);
      }
      for (let j = i + 1; j < pass.length; j++) {
        pass[j] = "a";
      }
      return pass;
    }
  }
};

const isValid = (pass) => {
  let consecutive = false;
  let pairs = 0;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] === "i" || pass[i] === "l" || pass[i] === "o") {
      return false;
    }
    if (i <= pass.length - 3) {
      const currentChar = pass[i].charCodeAt(0);
      if (
        pass[i + 1].charCodeAt(0) === currentChar + 1 &&
        pass[i + 2].charCodeAt(0) === currentChar + 2
      ) {
        consecutive = true;
      }
    }
    if (i <= pass.length - 2) {
      if (pass[i] === pass[i + 1] && pass[i] !== pass[i + 2]) {
        pairs++;
      }
    }
  }
  return consecutive && pairs > 1;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    let pass = data.split("");
    while (!isValid(pass)) {
      pass = increasePassword(pass);
    }
    pass = increasePassword(pass);
    while (!isValid(pass)) {
      pass = increasePassword(pass);
    }
    console.log(pass.join(""));

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: vzcaabcc
// Elapsed: 205ms
