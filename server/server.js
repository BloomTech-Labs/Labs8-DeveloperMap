const cors = require('cors');
const express = require('express');
const server = express();
const usersRouters = require('./users/usersRouters.js');
const markersRouters = require('./markers/markersRouters.js');

server.use(express.json(), cors());
server.use('/api/database', usersRouters);
server.use('/api/markers', markersRouters);

module.exports = server;
