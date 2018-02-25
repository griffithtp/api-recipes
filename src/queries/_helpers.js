
// generates Links object for Link Headers pagination
const getLinks = (baseURL, req_queries, total, page, per_page) => {

  const base_url = baseURL || "http://localhost:8000";
  // console.log(req_queries);

  const firstLink = _renderPaginationLinks(base_url, req_queries, total, page, per_page, 'first');
  const lastLink = _renderPaginationLinks(base_url, req_queries, total, page, per_page, 'last');
  const nextLink = _renderPaginationLinks(base_url, req_queries, total, page, per_page, 'next');
  const prevLink = _renderPaginationLinks(base_url, req_queries, total, page, per_page, 'prev');
  let Links = [
    { rel: 'first', url: firstLink },
    { rel: 'last', url: lastLink },
    { rel: 'next', url: nextLink },
    { rel: 'prev', url: prevLink }
  ]

  return Links;
}

// render Pagination Link for a rel
const _renderPaginationLinks = (base_url, req_queries, total, page, per_page, rel) => {
  let params = [];
  for (let param in req_queries) {
    switch (param == 'page' && rel) {
      case "first":
        req_queries[param] = 0;
        break;
      case "last":
        req_queries[param] = Math.ceil( total / per_page ) - 1;
        break;
      case "next":
        const next = parseInt(page) + parseInt(per_page);
        req_queries[param] = next >= total - 1 ? total - 1 : next;
        break;
      case "prev":
        const prev = parseInt(page) - parseInt(per_page);
        req_queries[param] = prev <= 0 ? 0 : prev;
        break;
    }
    params.push(encodeURIComponent(param) + "=" + encodeURIComponent(req_queries[param]));
  }
  return `<${base_url}?${params.join("&")}>`;
}

module.exports = {
  getLinks,
  _renderPaginationLinks
}
