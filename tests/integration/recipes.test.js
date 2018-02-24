const test  = require('ava');
const request = require('supertest');
const app = require('../../src/server');

test('GET /recipes', async t => {
  const response = await request(app)
    .get('/recipes')
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  t.deepEqual(await response.body, []);
})

test('GET /recipes/:id', async t => {
  const response = await request(app)
    .get('/recipes/1')
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  t.deepEqual(await response.body, {});
})

test('PUT /recipes/:id', async t => {
  const response = await request(app)
    .put('/recipes/1')
    // .field()
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
})

test('PUT /recipes/rate/:id', async t => {
  const response = await request(app)
    .put('/recipes/rate/ 1')
    // .field()
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
})
