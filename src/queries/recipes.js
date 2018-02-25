
const { Recipes } = require('../models');

const fetchRecipeDetails = async (req, res, next) => {

  Recipes.findById(req.params.recipe_id)
    .then( recipe => {
      res.send(recipe);
    })
    .catch( err => {
      console.log(err);
      return err;
    })
}

const fetchRecipesList = async (req, res, next) => {

  Recipes.findAll({})
    .then( recipes => {
      res.send(recipes);
    })
    .catch(err => {
      console.log(err);
      return err;
    })
}

const updateReceipe = async (req, res, next) => {

  res.send({});

}

const rateRecipe = async (req, res, next) => {

  res.send({});

}

const addRecipe = async (req, res, next) => {

  // TODO: validate req.params for minimum recipe properties

  const result = await Recipes.create(req.params)
    .then( recipe => recipe )
    .catch( err => {
      console.log(err);
      return err;
    })
  if (result.id) {
    const recipe_id = result.id;
    const new_recipe = await Recipes.findById(recipe_id)
    .then(res => res)
    res.send(new_recipe);
  } else {
    res.send(400, { error: "request failed"});
  }

}


module.exports = {
  fetchRecipeDetails,
  fetchRecipesList,
  updateReceipe,
  rateRecipe,
  addRecipe
}
