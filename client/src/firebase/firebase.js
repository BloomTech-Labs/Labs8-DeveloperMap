import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyALdLxft_26nU5OIq7FY7iBkxgmbHv4nG8',
  authDomain: 'labs8-developermap.firebaseapp.com',
  databaseURL: 'https://labs8-developermap.firebaseio.com',
  projectId: 'labs8-developermap',
  storageBucket: 'labs8-developermap.appspot.com',
  messagingSenderId: '691093916321',
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage().ref()

export default firebase;