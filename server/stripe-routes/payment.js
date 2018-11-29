const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });

  } else {
    res.status(200).send({ success: stripeRes });
  }
} //function to be called after request is made to Stripe Api

const paymentApi = server => {
  server.get('/api/stripe', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  server.post('/api/stripe', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res)); // Uses Stripe library to make an 'official' stripe payment, callback function called after request to Stripe Api succeeds or fails.
  });

  return server;
};

module.exports = paymentApi;