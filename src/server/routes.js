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

  server.get("/recipes/:id", fetchRecipeDetails);
  server.get("/recipes", fetchRecipesList);

  server.put("/recipes/rate/:id", rateRecipe);
  server.put("/recipes/:id", updateReceipe);

  server.post("/recipes", addRecipe);

}

module.exports = routes;
