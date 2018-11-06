const express = require('express');
const server = express();
const usersRouters = require('./users/usersRouters.js');

server.use(express.json());
server.use('/api/database', usersRouters);

module.exports = server;
