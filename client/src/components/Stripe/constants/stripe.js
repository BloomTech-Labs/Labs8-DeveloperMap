const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_pDNaozIDLwRbPR2REq1yQ0aZ';

export default STRIPE_PUBLISHABLE;