const express = require('express');
const server = express();
const usersRouters = require('./users/usersRouters.js');
const seekersRouters = require('./seekers/seekersRouters.js');

server.use(express.json());
server.use('/api/database', usersRouters);
server.use('/api/database/seekers', seekersRouters);

module.exports = server;
