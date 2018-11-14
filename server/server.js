const cors = require('cors');
const express = require('express');
const server = express();

//const usersRouters = require('./users/usersRouters.js');
const seekersRouters = require('./seekers/seekersRouters.js');
const companiesRouters = require('./companies/companiesRouters.js');
const markersRouters = require('./markers/markersRouters.js');


const configureServer = require('./serverConfig');
const configureRoutes = require('./stripe-routes');

server.use(express.json());
//server.use('/api/database', usersRouters);
server.use('/api/database/seekers', seekersRouters);
server.use('/api/database/companies', companiesRouters);
server.use('/api/markers', markersRouters);

configureServer(server);
configureRoutes(server);


module.exports = server;
