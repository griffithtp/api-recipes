const test  = require('ava');
const request = require('supertest');
const app = require('../../src/server');

test('GET /status', async t => {
  const response = await request(app)
    .get('/status')
    .set('Accept', 'application/json')
  t.is(await response.status, 200);
  t.is(await response.body, 'ok');
})
