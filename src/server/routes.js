const {
  fetchRecipeDetails,
  fetchRecipesList,
  updateReceipe,
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

  server.put("/recipes/rate/:recipe_id", rateRecipe);
  server.put("/recipes/:recipe_id", updateReceipe);

  server.post("/recipes", addRecipe);

}

module.exports = routes;
