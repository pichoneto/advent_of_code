const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "input.txt"), { encoding: "UTF8" }, (err) => {
  if (err) return;
  const t = Date.now();

  const x = 3075;
  const y = 2981;
  let iterations = 0;
  for (let i = x + y - 1; i > 0; i--) {
    iterations += i;
  }
  iterations -= y;

  let prev = 20151125;
  for (let i = 0; i < iterations; i++) {
    prev = (prev * 252533) % 33554393;
  }
  console.log(prev);

  console.log(`Elapsed ${Date.now() - t}ms`);
});

// Answer: 9132360
// Elapsed: 309ms
