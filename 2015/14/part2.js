const fs = require("fs");
const path = require("path");

const getLeaders = (reindeers) => {
  let max = 0;
  let leaders = [];

  Object.values(reindeers).map((reindeer) => {
    if (reindeer.distance > max) {
      max = reindeer.distance;
      leaders = [reindeer];
    } else if (reindeer.distance === max) {
      leaders.push(reindeer);
    }
  });

  return leaders;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const reindeers = {};
    const lines = data.split(/[\r\n]+/);
    lines.map((line) => {
      const [full, name, speed, flight, rest] = line.match(
        /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/
      );
      reindeers[name] = {
        speed: parseInt(speed),
        flight: parseInt(flight),
        rest: parseInt(rest),
        isFlying: true,
        timeInCurrentState: 0,
        distance: 0,
        score: 0,
      };
    });

    for (let i = 0; i < 2503; i++) {
      Object.values(reindeers).map((reindeer) => {
        if (reindeer.isFlying) {
          reindeer.distance += reindeer.speed;
          reindeer.timeInCurrentState++;
          if (reindeer.timeInCurrentState === reindeer.flight) {
            reindeer.isFlying = false;
            reindeer.timeInCurrentState = 0;
          }
        } else {
          reindeer.timeInCurrentState++;
          if (reindeer.timeInCurrentState === reindeer.rest) {
            reindeer.isFlying = true;
            reindeer.timeInCurrentState = 0;
          }
        }
      });
      const leaders = getLeaders(reindeers);
      leaders.map((leader) => {
        leader.score++;
      });
    }

    let max = 0;
    Object.values(reindeers).map((reindeer) => {
      max = Math.max(max, reindeer.score);
    });
    console.log(max);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 1102
// Elapsed: 12ms
