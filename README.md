REST API Recipes
===

## Getting Started
1. `npm install`
1. `$ sequelize db:migrate` - setup DB structure
1. `$ sequelize db:seed:all` - to load csv data
1. `npm run dev` - start service in dev mode with nodemon
1. `npm test` - run tests


## Features
This REST API includes the following:
* Fetch a recipe by id
  * `GET /recipes/:recipe_id`
  * `GET /recipes/:recipe_id?embed=ratings`
  * *parameters*:
    * recipe_id
    * embed=ratings - display embeded (includes) list ratings object
* Fetch all recipes for a specific cuisine with pagination
  * `GET /recipes` - defaults query params to `?page=0&per_page=10`
  * `GET /recipes?cuisine=&page=0&per_page=2`
  * *parameters*:
    * `page` - current page, 0 based index, defaults to 0
    * `per_page` - number of results per page, defaults to 10
    * `cuisine` - filter based on `recipe_cuisine` field
  * *pagination*:
    * Link headers - this allows metadata to be given for pagination without affecting the API request. Relation Type in the `rel` Link header is used to represent `first`, `next`, `prev`, or `last` Url Links.
* Rate an existing recipe between 1 and 5
  * `PUT /recipes/rate/:recipe_id`
  * *parameters*:
    * recipe_id
* Update an existing recipe
  * `PUT /recipes/:recipe_id`
  * *parameters*:
    * recipe_id
* Store a new recipe
  * `POST /recipes`
  * *mandatory fields*:
    * `box_type`
    * `title`
    * `recipe_cuisine`

## Technology Stack
Nodejs REST API
1. restify - Node.js web service framework to build RESTful API
1. sqlite - to temporarily store recipes and ratings in lightweight database file with option to store i-memory
1. sequelize - ORM for Node.js to support SQLite queries via object models
1. ava - test runner for unit test and integration tests
1. supertest - integration tests agent for Node.js to test single API endpoint

## API consumers
As a RESTful API, clients/consumers will be able to access the above endpoints. Each API consumers should register for an API `app_key` in order for this service to track and log incoming API requests. Providing an `app_key` in the header of each API requests is common practice.
Example of API consumer can be a mobile app, web app, or another web service or a GraphQL server.

The Pagination feature in the `GET /recipes` allows mobile apps to provide a scroll feature to dynamically load the next set of recipes list.

Providing the `auth_token` in the _Authorization_ header allows this service validate the credentials of the end-user request. In this example, we could identify which users have added a rating to a specific recipe and prevent a single user to submit multiple recipe ratings on a single recipe.


## Additional Notes
###### Production notes
In this example, we use mysql as a database instance for production environment.
Before starting the service for the first time, please ensure to load the _migration files_ and optionally _seeds_
1. `$ sequelize db:create --env production` - create database specified by the configuration under db/config.js
1. `$ sequelize db:migrate --env production` - run pending migrations, setup DB structure
1. `$ sequelize db:seed:all --env production` - run seeder file to load csv data
1. `npm start` - start service

###### Deployment
As a Nodejs application, it is relatively straight-forward to deploy onto Google Cloud Platform AppEngine using Travis-CI.
