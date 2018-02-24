const restify = require('restify');
const server = restify.createServer();

const cors = require('./cors');
const routes = require('./routes');

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

routes(server);

module.exports = server;
