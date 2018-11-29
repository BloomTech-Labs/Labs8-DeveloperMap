const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_STRIPE_PUBLISHABLE
  : process.env.REACT_APP_STRIPE_PUBLISHABLE_TEST;

export default STRIPE_PUBLISHABLE;