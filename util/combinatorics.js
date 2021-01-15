// Permutations: order matters
// Combinations: order doesn't matter

const fact = (value) => {
  if (value === 0) {
    return 1;
  }
  return value * fact(value - 1);
};

const permsRep = (elements, size) => {
  const solutions = new Array(Math.pow(elements.length, size));
  const rec = (solution) => {
    if (solution.length === size) {
      solutions.push(solution);
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      rec(solution.concat([elements[i]]));
    }
  };

  rec([]);
  return solutions;
};

const permsNoRep = (elements, size) => {
  const solutions = new Array(
    fact(elements.length) / fact(elements.length - size)
  );
  const rec = (solution, used) => {
    if (solution.length === size) {
      solutions.push(solution);
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      if (!used[elements[i]]) {
        used[elements[i]] = true;
        rec(solution.concat([elements[i]]), JSON.parse(JSON.stringify(used)));
        used[elements[i]] = false;
      }
    }
  };

  rec([], {});
  return solutions;
};

// solutions.length = fact(elements.length + size - 1) / fact(elements.length - 1) / fact(size)
const combsRep = (elements, size) => {
  throw new Error("Not implemented");
};

const combsNoRep = (elements, size) => {
  const solutions = new Array(
    fact(elements.length) / fact(elements.length - size) / fact(size)
  );
  const rec = (solutionPtr, solution, elementPtr) => {
    if (solutionPtr === size) {
      solutions.push(solution);
      return;
    }
    if (elementPtr >= elements.length) {
      return;
    }

    solution[solutionPtr] = elements[elementPtr];

    rec(solutionPtr + 1, [...solution], elementPtr + 1);
    rec(solutionPtr, [...solution], elementPtr + 1);
  };
  rec(0, [], 0);
  return solutions;
};

module.exports = {
  fact,
  permsRep,
  permsNoRep,
  combsRep,
  combsNoRep,
};
