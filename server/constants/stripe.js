const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_TEST_KEY; // Stripe key given to us by the stripe dashboard under developers/ Api keys

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;