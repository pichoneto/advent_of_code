const fs = require("fs");
const path = require("path");

const generateRecipes = (ingredients, teaspoonsLeft, recipe = {}) => {
  if (ingredients.length === 1) {
    recipe[ingredients[0]] = teaspoonsLeft;
    return [recipe];
  }

  const recipes = [];
  for (let i = 0; i <= teaspoonsLeft; i++) {
    const newRecipe = generateRecipes(ingredients.slice(1), teaspoonsLeft - i, {
      ...recipe,
      [ingredients[0]]: i,
    });
    recipes.push(newRecipe);
  }
  return recipes.flat();
};

const calculateScore = (ingredients, recipe) => {
  const ingredientIds = Object.keys(ingredients);
  const capacity = Math.max(
    ingredientIds
      .map((id) => recipe[id] * ingredients[id].capacity)
      .reduce((p, c) => p + c, 0),
    0
  );
  const durability = Math.max(
    ingredientIds
      .map((id) => recipe[id] * ingredients[id].durability)
      .reduce((p, c) => p + c, 0),
    0
  );
  const flavor = Math.max(
    ingredientIds
      .map((id) => recipe[id] * ingredients[id].flavor)
      .reduce((p, c) => p + c, 0),
    0
  );
  const texture = Math.max(
    ingredientIds
      .map((id) => recipe[id] * ingredients[id].texture)
      .reduce((p, c) => p + c, 0),
    0
  );
  return capacity * durability * flavor * texture;
};

fs.readFile(
  path.join(__dirname, "input.txt"),
  { encoding: "UTF8" },
  (err, data) => {
    if (err) return;
    const t = Date.now();

    const ingredients = {};
    const lines = data.split(/[\r\n]+/);
    lines.map((line) => {
      const [name, perks] = line.split(": ");
      const [capacity, durability, flavor, texture, calories] = perks.split(
        ", "
      );
      ingredients[name] = {
        capacity: parseInt(capacity.split(" ")[1]),
        durability: parseInt(durability.split(" ")[1]),
        flavor: parseInt(flavor.split(" ")[1]),
        texture: parseInt(texture.split(" ")[1]),
        calories: parseInt(calories.split(" ")[1]),
      };
    });

    const recipes = generateRecipes(Object.keys(ingredients), 100);
    let maxScore = 0;
    recipes.map((recipe) => {
      const score = calculateScore(ingredients, recipe);
      maxScore = Math.max(score, maxScore);
    });
    console.log(maxScore);

    console.log(`Elapsed ${Date.now() - t}ms`);
  }
);

// Answer: 13882464
// Elapsed: 390ms
