const fs = require("fs");
const path = require("path");

const generatePosibilities = (personsAvailable, currentOrder) => {
  const posibilities = [];
  if (personsAvailable.length === 1) {
    posibilities.push([...currentOrder, personsAvailable[0]]);
    return posibilities;
  }
  for (let i = 0; i < personsAvailable.length; i++) {
    const candidate = personsAvailable.splice(i, 1);
    const a = generatePosibilities(personsAvailable, [
      ...currentOrder,
      ...candidate,
    ]);
    posibilities.push(...a);
    personsAvailable.splice(i, 0, ...candidate);
  }
  return posibilities;
};

const calculateScore = (people, relationships) => {
  let score = 0;
  for (let i = 0; i < people.length; i++) {
    if (i === 0) {
      score +=
        relationships[people[i]][people[i + 1]] +
        relationships[people[i]][people[people.length - 1]];
    } else if (i === people.length - 1) {
      score +=
        relationships[people[i]][people[0]] +
        relationships[people[i]][people[i - 1]];
    } else {
      score +=
        relationships[people[i]][people[i + 1]] +
        relationships[people[i]][people[i - 1]];
    }
  }
  return score;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const relationships = { me: {} };
    lines.map((line) => {
      const [full, person, action, quantity, target] = line.match(
        /^(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)\.$/
      );
      if (!relationships[person]) {
        relationships[person] = {
          me: 0,
        };
        relationships["me"] = { ...relationships["me"], [person]: 0 };
      }
      const score =
        action === "gain" ? parseInt(quantity) : -parseInt(quantity);
      relationships[person] = { ...relationships[person], [target]: score };
    });
    const guests = Object.keys(relationships);
    const posibilities = generatePosibilities(guests.slice(2), []);
    let best = 0;
    posibilities.map((posibility) => {
      best = Math.max(
        best,
        calculateScore([guests[0], ...posibility], relationships)
      );
    });
    console.log(best);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 668
// Elapsed: 25ms
