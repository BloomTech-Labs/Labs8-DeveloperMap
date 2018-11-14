const express = require('express');
const firebase = require('../firebase/firebase.js');

module.exports = { setSeekerClaims, verifySeekerToken };

const setSeekerClaims = (req, res, next) => {
  const { uid } = req.params;
  firebase
    .auth()
    .setCustomUserClaims(uid, { seeker: true })
    .then(() => {
      next();
    })
    .catch(err => res.json(err));
};

const verifySeekerToken = (req, res, next) => {
  firebase
    .auth()
    .verifyIdToken(idToken)
    .then(claims => {
      if (claims.seeker) {
        next();
      } else {
        res.json({ err: 'Does not have required role' });
      }
    });
};
