const test = require('ava');
const _ = require('lodash');

const helpers = require('../../src/queries/_helpers');
const { _renderPaginationLinks} = helpers;
const base_url = 'http://localhost:8000';
const total = 4;

test('Link headers > rel="first"', t => {
  let req_queries = { page: '1', per_page: '1', recipe_cuisine: 'british' };
  let { page, per_page, recipe_cuisine } = req_queries;
  let rel = 'first';
  let renderedPagination = `${base_url}?page=0&per_page=${per_page}&recipe_cuisine=${recipe_cuisine}`;
  t.is(_renderPaginationLinks(base_url, req_queries, total, page, per_page, rel),
    renderedPagination)
});

test('Link headers > rel="last"', t => {
  let req_queries = { page: '1', per_page: '1', recipe_cuisine: 'british' };
  let { page, per_page, recipe_cuisine } = req_queries;
  const rel = 'last';
  const renderedPagination = `${base_url}?page=${total - 1}&per_page=${per_page}&recipe_cuisine=${recipe_cuisine}`;
  t.is(_renderPaginationLinks(base_url, req_queries, total, page, per_page, rel),
    renderedPagination)
})

test('Link headers > rel="next"', t => {
  let req_queries = { page: '1', per_page: '1', recipe_cuisine: 'british' };
  let { page, per_page, recipe_cuisine } = req_queries;
  let nextPage = 2;
  const rel = 'next';
  const renderedPagination = `${base_url}?page=${nextPage}&per_page=${per_page}&recipe_cuisine=${recipe_cuisine}`;
  t.is(_renderPaginationLinks(base_url, req_queries, total, page, per_page, rel),
    renderedPagination)
})

test('Link headers > rel="prev"', t => {
  let req_queries = { page: '1', per_page: '1', recipe_cuisine: 'british' };
  let { page, per_page, recipe_cuisine } = req_queries;
  let prevPage = 0;
  const rel = 'prev';
  const renderedPagination = `${base_url}?page=${prevPage}&per_page=${per_page}&recipe_cuisine=${recipe_cuisine}`;
  t.is(_renderPaginationLinks(base_url, req_queries, total, page, per_page, rel),
    renderedPagination)
})
