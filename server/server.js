const express = require('express');
const server = express();
const firebaseRouters = require('./routers/firebaseRouters.js');

server.use(express.json());
server.use('/api/database', firebaseRouters);

module.exports = server;
