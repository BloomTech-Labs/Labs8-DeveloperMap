const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://clever-liskov-29b49a.netlify.com'
  : 'http://localhost:9000';

export default PAYMENT_SERVER_URL;