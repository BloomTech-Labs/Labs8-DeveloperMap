const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

router.get('/', (req, res) => {
  rootRef
    .child('companies')
    .once('value')
    .then(snapshot => {
      res.status(200).json(snapshot.val());
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child(`companies/${uid}`)
    .once('value')
    .then(snapshot => {
      res.status(200).json(snapshot.val());
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.post('/addUser/:uid', (req, res) => {
  const { uid } = req.params;
  const {
    companyName,
    companyWebsite,
    email,
    location,
    phoneNumber,
  } = req.body;
  const newData = {
    companyName,
    companyWebsite,
    email,
    location,
    phoneNumber,
  };
  rootRef
    .child(`companies/${uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        res.status(500).json({ err: 'message already exists' });
      } else {
        snapshot.ref
          .set(newData)
          .then(() => {
            res
              .status(201)
              .json({ message: `${email} has been added to database` });
          })
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});
