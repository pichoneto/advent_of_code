const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const instructions = data.split(/[\r\n]+/).map((instruction) => {
      const [full, command, x0, y0, xf, yf] = instruction.match(
        /(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/
      );
      return [command, parseInt(x0), parseInt(y0), parseInt(xf), parseInt(yf)];
    });
    let lights = 0;
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        let status = false;
        for (let i = 0; i < instructions.length; i++) {
          const [command, x0, y0, xf, yf] = instructions[i];
          if (x >= x0 && x <= xf && y >= y0 && y <= yf) {
            switch (command) {
              case "turn on":
                status = true;
                break;
              case "turn off":
                status = false;
                break;
              case "toggle":
                status = !status;
                break;
            }
          }
        }
        if (status) {
          lights++;
        }
      }
    }
    console.log(lights);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 543903
// Elapsed: 3439ms
