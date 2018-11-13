const express = require('express');
const server = express();
const usersRouters = require('./users/usersRouters.js');
const markersRouters = require('./markers/markersRouters.js');

server.use(express.json());
server.use('/api/database', usersRouters);
server.use('/api/markers', markersRouters);

module.exports = server;
