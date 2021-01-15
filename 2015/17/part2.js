const fs = require("fs");
const path = require("path");

const backtrack = (
  amountLeft,
  containersAvailable,
  containers,
  combinations,
  cache
) => {
  if (amountLeft === 0) {
    combinations[JSON.stringify(containers)] = containers;
    return;
  }

  for (let i = 0; i < Object.keys(containersAvailable).length; i++) {
    const { [i]: candidate, ...rest } = containersAvailable;
    if (candidate <= amountLeft) {
      const newContainers = { ...containers, [i]: candidate };
      const key = JSON.stringify(rest) + JSON.stringify(newContainers);
      if (!cache[key]) {
        backtrack(
          amountLeft - candidate,
          rest,
          newContainers,
          combinations,
          cache
        );
        cache[key] = true;
      }
    }
  }
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const amount = 150;
    const containers = {};
    data.split(/[\r\n]+/).map((size, i) => {
      containers[i] = parseInt(size);
    });
    const combinations = {};
    backtrack(amount, containers, {}, combinations, {});

    let min = Infinity;
    Object.values(combinations).map(
      (combination) => (min = Math.min(min, Object.keys(combination).length))
    );
    let count = 0;
    Object.values(combinations).map(
      (combination) =>
        (count = Object.keys(combination).length === min ? count + 1 : count)
    );
    console.log(count);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 18
// Elapsed: 3372ms
