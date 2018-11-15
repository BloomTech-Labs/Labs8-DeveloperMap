const firebase = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://labs8-developermap.firebaseio.com',
});

module.exports = firebase;
