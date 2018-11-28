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
  const { uid, firstName, profilePicture } = req.body;

  const newData = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {
      uid: uid,
      title: firstName,
      profilePicture: profilePicture
    },
  };

  rootRef
    .child(`markers`)
    .push(newData)
    .then(() => res.json(newData));
});

// === Update Marker Information ===
markers.put('/', (req, res) => {
  const { uid } = req.body;
  const updateKeys = Object.keys(req.body);

  
  rootRef
    .child(`markers/${uid}`)
    .once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        return res.json({ message: 'marker does not exist' });
      }
      let updateObject = {};
      snapshot.forEach(childSnap => {
        const snapKey = childSnap.key;
        if (updateKeys.includes(snapKey)) {
          if (childSnap.val() === req.body[snapKey]) {
            console.log(`${snapKey} data is same as posted data`);
          } else {
            updateObject[snapKey] = req.body[snapKey];
          }
        }
      });
      const updateNumber = Object.keys(updateObject).length;
      if (updateNumber > 0) {
        snapshot.ref
          .update(updateObject)
          .then(() => {
            res.json(`Marker information updated in ${updateNumber} fields`);
          })
          .catch(err => res.json(err));
      } else {
        res.json('no new data was posted');
      }
    })
    .catch(err => res.json(err));
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
