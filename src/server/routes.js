const {
  fetchRecipeDetails,
  fetchRecipesList,
  updateRecipe,
  rateRecipe,
  addRecipe
} = require("../queries/recipes");

const routes = (server) => {
  server.get("/", (req, res) => {
    res.send({});
  })

  server.get("/status", (req, res) => res.send('ok'));

  server.get("/recipes/:recipe_id", fetchRecipeDetails);
  server.get("/recipes", fetchRecipesList);

  server.put("/recipes/:recipe_id", updateRecipe);

  server.post("/recipes", addRecipe);
  server.post("/recipes/rate/:recipe_id", rateRecipe);

}

module.exports = routes;
