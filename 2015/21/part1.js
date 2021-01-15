const fs = require("fs");
const path = require("path");

const fight = (player, enemy) => {
  let playersTurn = true;
  while (player.hitpoints > 0 && enemy.hitpoints > 0) {
    if (playersTurn) {
      enemy.hitpoints -= Math.max(player.damage - enemy.armor, 1);
    } else {
      player.hitpoints -= Math.max(enemy.damage - player.armor, 1);
    }
    playersTurn = !playersTurn;
  }
  return player.hitpoints > enemy.hitpoints;
};

const chooseGear = (weapons, armors, rings) => {
  const gears = [];
  for (let i = 0; i < Object.keys(weapons).length; i++) {
    const weapon = weapons[Object.keys(weapons)[i]];
    for (let j = 0; j < Object.keys(armors).length; j++) {
      const armor = armors[Object.keys(armors)[j]];
      for (let k = 0; k < Object.keys(rings).length; k++) {
        const ring1 = rings[Object.keys(rings)[k]];
        for (let l = 0; l < Object.keys(rings).length; l++) {
          const ring2 = rings[Object.keys(rings)[l]];
          if (ring1 !== ring2) {
            const cost =
              weapon.cost +
              armor.cost +
              (ring1 ? ring1.cost : 0) +
              (ring2 ? ring2.cost : 0);
            const damage =
              weapon.damage +
              (ring1 ? ring1.damage || 0 : 0) +
              (ring2 ? ring2.damage || 0 : 0);
            const defense =
              armor.armor +
              (ring1 ? ring1.armor || 0 : 0) +
              (ring2 ? ring2.armor || 0 : 0);

            gears.push({ cost, damage, armor: defense });
          }
        }
      }
    }
  }
  return gears;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const lines = data.split(/[\r\n]+/);
    const enemy = {
      hitpoints: parseInt(lines[0].split(": ")[1]),
      damage: parseInt(lines[1].split(": ")[1]),
      armor: parseInt(lines[2].split(": ")[1]),
    };

    const player = {
      hitpoints: 100,
      damage: 0,
      armor: 0,
    };

    const weapons = {
      dagger: { cost: 8, damage: 4, armor: 0 },
      shortsword: { cost: 10, damage: 5, armor: 0 },
      warhammer: { cost: 25, damage: 6, armor: 0 },
      longsword: { cost: 40, damage: 7, armor: 0 },
      greataxe: { cost: 74, damage: 8, armor: 0 },
    };

    const armor = {
      none: { cost: 0, damage: 0, armor: 0 },
      leather: { cost: 13, damage: 0, armor: 1 },
      chainmail: { cost: 31, damage: 0, armor: 2 },
      splintmail: { cost: 53, damage: 0, armor: 3 },
      bandedmail: { cost: 75, damage: 0, armor: 4 },
      platemail: { cost: 102, damage: 0, armor: 5 },
    };

    const rings = {
      none: { cost: 0, damage: 0, armor: 0 },
      damage1: { cost: 25, damage: 1, armor: 0 },
      damage2: { cost: 50, damage: 2, armor: 0 },
      damage3: { cost: 100, damage: 3, armor: 0 },
      defense1: { cost: 20, damage: 0, armor: 1 },
      defense2: { cost: 40, damage: 0, armor: 2 },
      defense3: { cost: 80, damage: 0, armor: 3 },
    };

    let minCost = Infinity;
    const possibleGears = chooseGear(weapons, armor, rings);
    possibleGears.map((gear) => {
      const { cost, damage, armor } = gear;
      if (cost < minCost && fight({ ...player, damage, armor }, { ...enemy })) {
        minCost = Math.min(cost, minCost);
      }
    });
    console.log(minCost);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 111
// Elapsed: 8ms
