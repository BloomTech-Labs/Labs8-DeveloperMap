const FRONTEND_DEV_URLS = [ 'https://clever-liskov-29b49a.netlify.com' ];

const FRONTEND_PROD_URLS = [
  'https://www.yourdomain.com',
  'https://yourdomain.com'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;