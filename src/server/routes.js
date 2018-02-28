const {
  fetchRecipeDetails,
  fetchRecipesList,
  updateRecipe,
  rateRecipe,
  addRecipe
} = require("../queries/recipes");

const routes = (server) => {
  server.get("/", (req, res, next) => {
    res.send({});
    return next();
  })

  server.get("/status", (req, res, next) => {res.send('ok'); return next()});

  server.get("/recipes/:recipe_id", fetchRecipeDetails);
  server.get("/recipes", fetchRecipesList);

  server.put("/recipes/:recipe_id", updateRecipe);

  server.post("/recipes", addRecipe);
  server.post("/recipes/rate/:recipe_id", rateRecipe);

}

module.exports = routes;
