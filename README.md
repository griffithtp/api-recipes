REST API Recipes
===

# Getting Started
* `npm install`
* `npm start` - start service
* `npm test` - run tests
* `npm run dev` - start service in dev mode with nodemon

* `$ sequelize db:migrate` - setup DB structure
* `$ sequelize db:seed:all` - to load csv data

# Features
This REST API includes the following:
* Fetch a recipe by id
  * `GET /recipes/:recipe_id`
* Fetch all recipes for a specific cuisine with pagination
  * `GET /recipes` - defaults query params to `?page=0&per_page=10`
  * `GET /recipes?cuisine=&page=0&per_page=2`
* Rate an existing recipe between 1 and 5
  * `PUT /recipes/rate/:recipe_id`
* Update an existing recipe
  * `PUT /recipes/:recipe_id`
* Store a new recipe
  * `POST /recipes`
