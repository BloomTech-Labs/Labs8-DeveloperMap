const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_cU4wt2KwNDwC9R37YYXJC2NV';

export default STRIPE_PUBLISHABLE;