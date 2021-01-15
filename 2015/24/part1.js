const fs = require("fs");
const path = require("path");
const { combsNoRep } = require("../../util/combinatorics");

const generateGroups = (targetSum, weights) => {
  for (let i = 1; i <= weights.length; i++) {
    const groups = combsNoRep(weights, i);
    const filteredGroups = groups.filter(
      (group) => group.reduce((p, c) => p + c, 0) === targetSum
    );
    if (filteredGroups.length > 0) {
      return filteredGroups;
    }
  }
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/).map(Number);

    const totalSum = lines.reduce((p, c) => p + c, 0);
    const groups = generateGroups(totalSum / 3, lines);

    let minEntanglement = Infinity;
    groups.map(
      (arrangement) =>
        (minEntanglement = Math.min(
          minEntanglement,
          arrangement.reduce((p, c) => p * c, 1)
        ))
    );
    console.log(minEntanglement);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 11266889531
// Elapsed: 172ms
