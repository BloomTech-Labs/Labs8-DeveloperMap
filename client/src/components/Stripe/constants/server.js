const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://intense-stream-29923.herokuapp.com/api/database/seekers'
  : 'http://localhost:9000';

export default PAYMENT_SERVER_URL;