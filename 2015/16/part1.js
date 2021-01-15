const fs = require("fs");
const path = require("path");

const parseAunts = (auntInfo) => {
  const [full, id, attributes] = auntInfo.match(/Sue (\d+): (.+)/);
  const info = {
    id: parseInt(id),
    children: -1,
    cats: -1,
    samoyeds: -1,
    pomeranians: -1,
    akitas: -1,
    vizslas: -1,
    goldfish: -1,
    trees: -1,
    cars: -1,
    perfumes: -1,
  };
  attributes.split(", ").map((attr) => {
    const [key, value] = attr.split(": ");
    info[key] = parseInt(value);
  });

  return info;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const aunts = lines.map(parseAunts);

    // children: 3
    // cats: 7
    // samoyeds: 2
    // pomeranians: 3
    // akitas: 0
    // vizslas: 0
    // goldfish: 5
    // trees: 3
    // cars: 2
    // perfumes: 1

    console.log(
      aunts.filter(
        (aunt) =>
          (aunt.children === 3 || aunt.children === -1) &&
          (aunt.cats === 7 || aunt.cats === -1) &&
          (aunt.samoyeds === 2 || aunt.samoyeds === -1) &&
          (aunt.pomeranians === 3 || aunt.pomeranians === -1) &&
          (aunt.akitas === 0 || aunt.akitas === -1) &&
          (aunt.vizslas === 0 || aunt.vizslas === -1) &&
          (aunt.goldfish === 5 || aunt.goldfish === -1) &&
          (aunt.trees === 3 || aunt.trees === -1) &&
          (aunt.cars === 2 || aunt.cars === -1) &&
          (aunt.perfumes === 1 || aunt.perfumes === -1)
      )[0].id
    );

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 40
// Elapsed: 9ms
