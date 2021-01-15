const fs = require("fs");
const { parse } = require("path");
const path = require("path");

const parseName = (name) => {
  const count = {};
  name.split("").map((letter) => {
    if (!count[letter]) {
      count[letter] = 0;
    }
    count[letter]++;
  });
  return Object.keys(count)
    .map((key) => ({
      letter: key,
      count: count[key],
    }))
    .sort((a, b) => {
      if (b.count > a.count) {
        return 1;
      }
      if (b.count < a.count) {
        return -1;
      }
      return a.letter.localeCompare(b.letter);
    });
};

const decryptRoom = (name, sector) =>
  name
    .split("")
    .map((letter) => {
      const code = letter.charCodeAt(0);
      const newCode = ((code - 97 + sector) % 26) + 97;
      return String.fromCharCode(newCode);
    })
    .join("");

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/).map((line) => line.replace(/-/g, ""));
    const decrypted = lines
      .map((line) => {
        const [full, name, sector, checksum] = line.match(
          /([a-z]+)(\d+)\[(\w+)]/
        );
        const frequency = parseName(name);
        if (
          frequency
            .slice(0, 5)
            .map((value) => value.letter)
            .join("") === checksum
        ) {
          return { name: decryptRoom(name, parseInt(sector) % 26), sector };
        }
      })
      .filter((room) => room)
      .map((room) => {
        if (room.name.indexOf("north") !== -1) {
          console.log(room.sector);
        }
      });

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 482
// Elapsed: 44ms
