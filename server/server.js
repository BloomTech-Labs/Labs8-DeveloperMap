const express = require('express');
const server = express();
//const usersRouters = require('./users/usersRouters.js');
const seekersRouters = require('./seekers/seekersRouters.js');
const companiesRouters = require('./companies/companiesRouters.js');


const configureServer = require('./serverConfig');
const configureRoutes = require('./stripe-routes');

server.use(express.json());
//server.use('/api/database', usersRouters);
server.use('/api/database/seekers', seekersRouters);
server.use('/api/database/companies', companiesRouters);


configureServer(server);
configureRoutes(server);

module.exports = server;
