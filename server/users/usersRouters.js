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

//Change Email

router.put('/email/:uid', (req, res) => {
  const { uid } = req.params;
  const { email } = req.body;
  const updateObject = {
    [`users/${uid}/email`]: email,
  };
  rootRef
    .update(updateObject)
    .then(() => {
      res.json('email updated');
    })
    .catch(err => {
      res.json(err);
    });
});

//Change Location

router.put('/location/:uid', (req, res) => {
  const { uid } = req.params;
  const { location } = req.body;
  const updateObject = {
    [`users/${uid}/location`]: location,
  };
  rootRef
    .update(updateObject)
    .then(() => {
      res.json('location updated');
    })
    .catch(err => {
      res.json(err);
    });
});

//Change Employer Status

router.put('/employer/:uid', (req, res) => {
  const { uid } = req.params;
  const { employer } = req.body;
  const updateObject = {
    [`users/${uid}/employer`]: employer,
  };
  rootRef
    .update(updateObject)
    .then(() => {
      res.json('employer status updated');
    })
    .catch(err => {
      res.json(err);
    });
});

// router.post('/', (req, res) => {
//   const {email, phoneNumber, location, employer, uid}
//   rootRef.child('users/')
// })

router.get('/', (req, res) => {});

module.exports = router;
