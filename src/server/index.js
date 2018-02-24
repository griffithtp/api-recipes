const restify = require('restify');
const server = restify.createServer();

const cors = require('./cors');

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

server.get("/status", (req, res) => res.send('ok'));


module.exports = server;
