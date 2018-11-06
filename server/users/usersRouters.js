const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

router.get('/', (req, res) => {
  rootRef
    .child('users')
    .once('value')
    .then(snapshot => {
      res.json(snapshot);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child('users/' + uid)
    .once('value')
    .then(snapshot => {
      res.json(snapshot);
    });
});

// router.post('/', (req, res) => {
//   const {email, phoneNumber, location, employer, uid}
//   rootRef.child('users/')
// })

router.get('/', (req, res) => {});

module.exports = router;
