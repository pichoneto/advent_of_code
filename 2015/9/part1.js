const fs = require("fs");
const path = require("path");

const calculate = (origin, paths, subPaths, visited) => {
  visited.push(origin);

  const candidates = Object.keys(paths[origin]);
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (visited.indexOf(candidate) === -1) {
      const distance =
        paths[origin][candidate] + (subPaths[visited.join(",")] || 0);
      subPaths[[...visited, candidate].join(",")] = distance;
      subPaths[[...visited, candidate].reverse().join(",")] = distance;
      calculate(candidate, paths, subPaths, [...visited]);
    }
  }
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const paths = {};
    lines.map((line) => {
      const [full, from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/);
      if (!paths[from]) {
        paths[from] = { [to]: parseInt(distance) };
      } else {
        paths[from] = { ...paths[from], [to]: parseInt(distance) };
      }

      if (!paths[to]) {
        paths[to] = { [from]: parseInt(distance) };
      } else {
        paths[to] = { ...paths[to], [from]: parseInt(distance) };
      }
    });

    const subPaths = {};
    Object.keys(paths).map((origin) => {
      calculate(origin, paths, subPaths, []);
    });

    let min = Infinity;
    Object.keys(subPaths)
      .filter(
        (subPath) => subPath.split(",").length === Object.keys(paths).length
      )
      .map((subPath) => (min = Math.min(min, subPaths[subPath])));
    console.log(min);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 251
// Elapsed: 524ms
