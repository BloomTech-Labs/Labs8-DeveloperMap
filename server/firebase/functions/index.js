const functions = require('firebase-functions');
const firebase = require('./firebase.js');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//exports.labs8 = functions.https.onRequest(server);
exports.deleteUser = functions.auth.user().onDelete(user => {
  const { uid } = user;
  console.log(user);
  if (user.customClaims.seeker) {
    let updateObject = {};
    firebase
      .database()
      .ref(`favoriteLookup`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnap => {
          if (childSnap.child(uid).exists()) {
            updateObject[`favoriteLookup/${childSnap.key}/${uid}`] = null;
          }
          updateObject[`seekers/${uid}`] = null;
          updateObject[`favoritePostings/${uid}`] = null;
        });
      });

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

exports.logsMissingData = functions.auth.user().onCreate(user => {
  const { uid } = user;
  firebase
    .database()
    .ref()
    .once('value')
    .then(snapshot => {
      console.log('checking data');
      console.log('seekers:', !snapshot.child(`seekers/${uid}`).exists());
      console.log('companies:', !snapshot.child(`companies/${uid}`).exists());
      if (
        !snapshot.child(`seekers/${uid}`).exists() &&
        !snapshot.child(`companies/${uid}`).exists()
      ) {
        console.log(
          `user data was not put into the realtime database upon creation`,
          user
        );
      } else {
        console.log('no missing data');
      }
    });
});
// exports.addClaims = functions.auth.user().onCreate(user => {
//   firebase
//     .auth()
//     .setCustomUserClaims(user.uid, { seeker: true })
//     .then(() => {
//       return firebase.auth().setCustomUserClaims(user.uid, { company: true });
//     });
// });
