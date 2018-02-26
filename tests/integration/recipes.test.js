const test  = require('ava');
const request = require('supertest');
const app = require('../../src/server');

test('GET /recipes', async t => {
  const response = await request(app)
    .get('/recipes')
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  // t.deepEqual(await response.body, []);
  t.true(await response.body.length > 0)
})

test('GET /recipes/:id', async t => {
  const response = await request(app)
    .get('/recipes/1')
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  // t.deepEqual(await response.body, {});
  t.truthy(await response.body)
})

test('POST /recipes', async t => {
  const response = await request(app)
    .post('/recipes')
    .field("box_type", "gourmet")
    .field("title", "Healthy Pasta")
    .field("recipe_cuisine", "italian")
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  t.is(await response.body.title, 'Healthy Pasta')
  t.true(await response.body.id > 0);
  const list = await request(app)
    .get(`/recipes/${response.body.id}`)
    .set('Accept', 'application/json')
  t.is(await list.body.title, await response.body.title)
})

test('PUT /recipes/:id', async t => {
  const response = await request(app)
    .put('/recipes/1')
    .field("title", "Sweet Chilli and Lime Beef on a Crunchy Fresh Noodle Salad")
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
})

test('PUT /recipes/rate/:id', async t => {
  const response = await request(app)
    .post('/recipes/rate/1')
    .field("recipe_id", 1)
    .field("rating", 5)
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
})
