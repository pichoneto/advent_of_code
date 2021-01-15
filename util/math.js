const factors = (value) => {
  const stopAt = Math.sqrt(value);
  let candidate = 2;
  const factors = { 1: 1 };

  while (candidate <= stopAt) {
    if (value % candidate === 0) {
      if (!factors[candidate]) {
        factors[candidate] = 0;
      }
      factors[candidate]++;
      value /= candidate;
    } else {
      candidate++;
    }
  }

  factors[value] = 1;

  return factors;
};

const divisors = (value) => {
  const divisors = [];
  for (let i = 1; i <= Math.sqrt(value); i++) {
    if (value % i === 0) {
      if (value / i !== i) {
        divisors.push(value / i);
      }
      divisors.push(i);
    }
  }
  return divisors;
};

module.exports = {
  factors,
  divisors,
};
