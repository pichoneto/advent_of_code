const fs = require("fs");
const path = require("path");

let minCost = Infinity;

const fight = (
  player,
  enemy,
  spells,
  spellsUsed = [],
  playersTurn = true,
  turnsLeftShield = 0,
  turnsLeftPoison = 0,
  turnsLeftRecharge = 0
) => {
  if (turnsLeftShield > 0) {
    turnsLeftShield--;
    if (turnsLeftShield === 0) {
      player.armor = 0;
    }
  }
  if (turnsLeftPoison > 0) {
    enemy.hitpoints -= spells.poison.damage;
    turnsLeftPoison--;
  }
  if (turnsLeftRecharge > 0) {
    player.mana += spells.recharge.mana;
    turnsLeftRecharge--;
  }

  if (player.hitpoints > 0 && enemy.hitpoints > 0) {
    if (playersTurn) {
      const availableSpells = [];
      if (player.mana >= spells.missile.cost) {
        availableSpells.push("missile");
      }
      if (player.mana >= spells.drain.cost) {
        availableSpells.push("drain");
      }
      if (player.mana >= spells.shield.cost && turnsLeftShield === 0) {
        availableSpells.push("shield");
      }
      if (player.mana >= spells.poison.cost && turnsLeftPoison === 0) {
        availableSpells.push("poison");
      }
      if (player.mana >= spells.recharge.cost && turnsLeftRecharge === 0) {
        availableSpells.push("recharge");
      }
      for (let i = 0; i < availableSpells.length; i++) {
        const spell = availableSpells[i];
        if (player.spent + spells[spell].cost < minCost) {
          const newPlayer = { ...player };
          const newEnemy = { ...enemy };
          const newSpellsUsed = [...spellsUsed];
          newSpellsUsed.push(spell);
          switch (spell) {
            case "missile":
              newEnemy.hitpoints -= spells.missile.damage;
              break;
            case "drain":
              newEnemy.hitpoints -= spells.drain.damage;
              newPlayer.hitpoints += spells.drain.heal;
              break;
            case "shield":
              turnsLeftShield = spells.shield.duration;
              newPlayer.armor = spells.shield.armor;
              break;
            case "poison":
              turnsLeftPoison = spells.poison.duration;
              break;
            case "recharge":
              turnsLeftRecharge = spells.recharge.duration;
              break;
          }
          newPlayer.mana -= spells[spell].cost;
          newPlayer.spent += spells[spell].cost;

          fight(
            { ...newPlayer },
            { ...newEnemy },
            spells,
            [...newSpellsUsed],
            !playersTurn,
            turnsLeftShield,
            turnsLeftPoison,
            turnsLeftRecharge
          );

          switch (spell) {
            case "shield":
              turnsLeftShield = 0;
              break;
            case "poison":
              turnsLeftPoison = 0;
              break;
            case "recharge":
              turnsLeftRecharge = 0;
              break;
          }
        }
      }
    } else {
      const newPlayer = { ...player };
      newPlayer.hitpoints -= Math.max(enemy.damage - newPlayer.armor, 1);
      fight(
        { ...newPlayer },
        { ...enemy },
        spells,
        [...spellsUsed],
        !playersTurn,
        turnsLeftShield,
        turnsLeftPoison,
        turnsLeftRecharge
      );
    }
  } else {
    if (player.hitpoints > enemy.hitpoints) {
      minCost = Math.min(player.spent, minCost);
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
    const enemy = {
      hitpoints: parseInt(lines[0].split(": ")[1]),
      damage: parseInt(lines[1].split(": ")[1]),
    };

    const player = {
      hitpoints: 50,
      mana: 500,
      armor: 0,
      spent: 0,
    };

    const spells = {
      missile: { cost: 53, damage: 4, heal: 0, duration: 0, armor: 0, mana: 0 },
      drain: { cost: 73, damage: 2, heal: 2, duration: 0, armor: 0, mana: 0 },
      shield: { cost: 113, damage: 0, heal: 0, duration: 6, armor: 7, mana: 0 },
      poison: { cost: 173, damage: 3, heal: 0, duration: 6, armor: 0, mana: 0 },
      recharge: {
        cost: 229,
        damage: 0,
        heal: 0,
        duration: 5,
        armor: 0,
        mana: 101,
      },
    };

    fight(player, enemy, spells);
    console.log(minCost);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 953
// Elapsed: 280ms
