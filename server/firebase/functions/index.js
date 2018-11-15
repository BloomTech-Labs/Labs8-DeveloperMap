const functions = require('firebase-functions');
const firebase = require('./firebase.js');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//exports.labs8 = functions.https.onRequest(server);
exports.deleteUser = functions.auth.user().onDelete(user => {
  console.log(user);
});
