const test = require('ava');
const _ = require('lodash');

const server = require('../../src/server');

test('Server', t => {
  t.true(_.indexOf(server.acceptable, 'application/json') >= 0);

  t.is(typeof server.routes.get, 'object');
  t.is(typeof server.routes.getrecipes, 'object');
  t.is(typeof server.routes.getrecipesid, 'object');
  t.is(typeof server.routes.getstatus, 'object');
  t.is(typeof server.routes.postrecipes, 'object');
  t.is(typeof server.routes.putrecipesid, 'object');
  t.is(typeof server.routes.putrecipesrateid, 'object');
})
