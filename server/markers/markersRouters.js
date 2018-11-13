const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const markers = express.Router();

markers.get('/', (req, res) => {
  rootRef
    .child('markers')
    .once('value')
    .then(snap => res.json(snap.val()))
    .catch(err => console.log(err));
});

module.exports = markers;
