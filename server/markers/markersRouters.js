const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const markers = express.Router();

// === Reutrns all the markers ===
markers.get('/', (req, res) => {
  rootRef
    .child('markers')
    .once('value')
    .then(snap => {
      res.json(snap.val());
    })
    .catch(err => console.log(err));
});

// === Adds marker to the list ===
markers.post('/', (req, res) => {
  const { uid, firstName } = req.body;

  const newData = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {
      uid: uid,
      title: firstName,
    },
  };

  rootRef
    .child(`markers`)
    .push(newData)
    .then(() => res.json(newData));
});

// markers.delete('/:uid', (req, res) => {
//   const { uid } = req.params;

//   rootRef
//     .child(`markers`)
//     .once('value')
//     .then(snap => {
//       const array = snap.val();
//       array.forEach(stuff => {
//         if (stuff.properties.uid === uid) {
//           console.log(stuff);
//         }
//       });
//     });
// });

module.exports = markers;
