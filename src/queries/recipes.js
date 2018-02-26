const errs = require('restify-errors');

const { Recipes, Ratings } = require('../models');
const { getLinks } = require('./_helpers');

const fetchRecipeDetails = async (req, res, next) => {

  Recipes.findById(req.params.recipe_id)
    .then( recipe => {
      if (!recipe) {
        return next( new errs.ResourceNotFoundError(`Unable to find recipe id=${req.params.recipe_id}`) );
      }
      res.send(recipe);
    })
    .catch( err => {
      return next(new errs.BadRequestError(err.message || 'unknown error'));
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
      return next(new errs.BadRequestError(err.message || 'unknown error'));
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
      return next(new errs.InvalidContentError("could not update resource"));
    }
  } else {
    return next(new errs.InvalidArgumentError("resource not found or missing parameters"));
  }
  return next();
}

const rateRecipe = async (req, res, next) => {

  // validate req.params for minimum recipe properties
  const require_fields = ['rating', 'recipe_id'];
  const validated = require_fields.every((param) => param in req.params);
  if (!validated) {
    return next(new errs.InvalidArgumentError(`please ensure all required fiels are provided: ${require_fields.join(", ")}`))
  }

  // validate rating to be 0 to 5 inclusive
  if (![0,1,2,3,4,5].includes(parseInt(req.params.rating))) {
    return next(new errs.InvalidArgumentError(`please ensure rating is between 0 and 5 only`))
  }

  const result = await Ratings.create(req.params)
    .then( recipe => recipe )
    .catch( err => {
      console.log(err);
      return err;
    })
  if (result.id) {
    const rating_id = result.id;
    const new_recipe = await Ratings.findById(rating_id)
      .then(res => res)
    res.send(new_recipe);
  } else {
    return next(new errs.InvalidContentError("unable to add new rating"));
  }

}

const addRecipe = async (req, res, next) => {

  // validate req.params for minimum recipe properties
  const require_fields = ['box_type','title','recipe_cuisine'];
  const validated = require_fields.every((param) => param in req.params);
  if (!validated) {
    return next(new errs.InvalidArgumentError(`please ensure all required fiels are provided: ${require_fields.join(", ")}`))
  }

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
    return next(new errs.InvalidContentError("unable to add new recipe"));
  }

}


module.exports = {
  fetchRecipeDetails,
  fetchRecipesList,
  updateRecipe,
  rateRecipe,
  addRecipe
}
