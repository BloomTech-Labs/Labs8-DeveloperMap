const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

router.get('/', (req, res) => {
  rootRef.once('value').then(snapshot => {
    res.json(snapshot);
  });
});

module.exports = router;
