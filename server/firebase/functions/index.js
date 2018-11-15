const functions = require('firebase-functions');
const firebase = require('./firebase.js');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//exports.labs8 = functions.https.onRequest(server);
exports.deleteUser = functions.auth.user().onDelete(user => {
  const { uid } = user;
  if (user.customClaims.seeker) {
    let updateObject = {};
    updateObject[`seekers/${uid}`] = null;
    updateObject[`favoritePostings/${uid}`] = null;
    return firebase
      .database()
      .ref()
      .update(updateObject);
  } else if (user.customClaims.company) {
    let updateObject = {};
    updateObject[`companies/${uid}`] = null;
    updateObject[`companyPostings/${uid}`] = null;
    updateObject[`favoriteLookup/${uid}`] = null;
    return firebase
      .database()
      .ref()
      .update(updateObject);
  }
});

// exports.addClaims = functions.auth.user().onCreate(user => {
//   firebase
//     .auth()
//     .setCustomUserClaims(user.uid, { seeker: true })
//     .then(() => {
//       return firebase.auth().setCustomUserClaims(user.uid, { company: true });
//     });
// });
