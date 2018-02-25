const errs = require('restify-errors');

const { Recipes } = require('../models');
const { getLinks } = require('./_helpers');

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

  const baseURL = 'http://' + req.headers.host + req.route.path;
  const cuisine = req.query.recipe_cuisine || null;
  const page = req.query.page || 0;
  const per_page = req.query.per_page || 10;

  const where = () => {
    return cuisine ? { recipe_cuisine : cuisine } : null;
  }
  const options = {
    where: where(),
    offset: page,
    limit: per_page
  }

  Recipes.findAndCountAll(options)
    .then( ({count, rows}) => {
      // output pagination using Link headers
      const links = getLinks(baseURL, req.query, count, page, per_page);
      links.forEach( link => {
        res.link(link.url, link.rel)
      })

      res.send(rows);
      return next();
    })
    .catch(err => {
      // console.log(err);
      return next(new errs.BadRequestError(err.message));
      // return err;
    })
}

const updateRecipe = async (req, res, next) => {

  const recipe = await Recipes.findById(req.params.recipe_id)
    .catch(err => {
      // console.log(err);
      return err
    });

  if (recipe && req.body) {
    const updatedRecipe = await recipe.update(req.body)
      .then(res => res)
      .catch(err => err)
    if (updatedRecipe) {
      res.send(await updatedRecipe.dataValues)
    } else {
      res.send(404, { error: "could not update resource"});
    }
  } else {
    res.send(404, { error: "resource not found or missing parameters"});
  }

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
  updateRecipe,
  rateRecipe,
  addRecipe
}
