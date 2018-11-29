const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.STRIPE_TEST_KEY;
     // Stripe key given to us by the stripe dashboard under developers/ Api keys

const stripe = configureStripe('sk_test_PpMqcjSTNKejHAdeygFxcyRN');

module.exports = stripe;