const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

router.get('/:uid', (req, res) => {
  const { uid } = req.params;

  rootRef
    .child(`favoritePostings/${uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val() === null) {
        res.status(404).json('No favorite jobs');
      } else {
        res.status(200).json(snapshot.val());
      }
    })
    .catch(err => {
      res.status(500).json(`Server error --> ${err}`);
    });
});

module.exports = router;
