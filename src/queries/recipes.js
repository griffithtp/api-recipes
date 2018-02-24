
const { Recipes } = require('../models');

const fetchRecipeDetails = async (req, res, next) => {

  res.send({});

}

const fetchRecipesList = async (req, res, next) => {

  Recipes.findAll({})
    .then( recipes => {
      res.send(recipes);
    })

}

const updateReceipe = async (req, res, next) => {

  res.send({});

}

const rateRecipe = async (req, res, next) => {

  res.send({});

}

const addRecipe = async (req, res, next) => {

  res.send({});

}


module.exports = {
  fetchRecipeDetails,
  fetchRecipesList,
  updateReceipe,
  rateRecipe,
  addRecipe
}
