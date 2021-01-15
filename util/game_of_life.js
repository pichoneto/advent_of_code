const countNeighbors = (grid, x0, y0) => {
  let neighbors = 0;
  for (let x = x0 - 1; x <= x0 + 1; x++) {
    for (let y = y0 - 1; y <= y0 + 1; y++) {
      if (x === x0 && y === y0) {
        continue;
      }
      if (grid[y] && grid[y][x]) {
        neighbors++;
      }
    }
  }
  return neighbors;
};

const iterate = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const neighbors = countNeighbors(grid, x, y);
      if (grid[y][x]) {
        newGrid[y][x] = neighbors === 2 || neighbors === 3 ? true : false;
      } else {
        newGrid[y][x] = neighbors === 3 ? true : false;
      }
    }
  }

  return newGrid;
};

const play = (grid, steps = 1) => {
  for (let i = 0; i < steps; i++) {
    grid = iterate(grid);
  }

  return grid;
};

const countAlive = (grid) => {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        count++;
      }
    }
  }
  return count;
};

module.exports = {
  play,
  countAlive,
};
