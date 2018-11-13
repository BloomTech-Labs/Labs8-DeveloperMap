const paymentApi = require('./payment');

const configureRoutes = server => {
  paymentApi(server);
};

module.exports = configureRoutes;