const express = require('express');
const server = express();
const usersRouters = require('./users/usersRouters.js');

const configureServer = require('./index');
const configureRoutes = require('./stripe-routes');

server.use(express.json());
server.use('/api/database', usersRouters);

configureServer(server);
configureRoutes(server);

module.exports = server;
