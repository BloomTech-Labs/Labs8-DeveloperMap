const express = require('express');
const firebase = require('../firebase/firebase.js');

const setSeekerClaims = (req, res, next) => {
  if (req.headers.authorization) {
    let idToken = req.headers.authorization;
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const { uid } = decodedToken;
        req.body.uid = uid;
        firebase
          .auth()
          .setCustomUserClaims(uid, { seeker: true })
          .then(() => {
            next();
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  } else {
    res.json({ err: 'Token was not received.' });
  }
};

const verifySeekerToken = (req, res, next) => {
  if (req.headers.authorization) {
    console.log('TOKEN HERE TOKEN HERE:', req.headers.authorization);
    let idToken = req.headers.authorization;
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        if (decodedToken.seeker) {
          const { uid } = decodedToken;
          req.body.uid = uid;
          next();
        } else {
          res.json({ err: 'Token does not have required claims' });
        }
      });
  } else {
    res.json({ err: 'Token was not received.' });
  }
};

//----------------------------------------------------COMPANIES

const setCompanyClaims = (req, res, next) => {
  if (req.headers.authorization) {
    let idToken = req.headers.authorization;
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const { uid } = decodedToken;
        req.body.uid = uid;
        firebase
          .auth()
          .setCustomUserClaims(uid, { company: true })
          .then(() => {
            next();
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  } else {
    res.json({ err: 'Token was not received.' });
  }
};

const verifyCompanyToken = (req, res, next) => {
  if (req.headers.authorization) {
    let idToken = req.headers.authorization;
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        if (decodedToken.company) {
          const { uid } = decodedToken;
          req.body.uid = uid;
          next();
        } else {
          res.json({ err: 'Token does not have required claims' });
        }
      });
  } else {
    res.json({ err: 'Token was not received.' });
  }
};

module.exports = { setSeekerClaims, verifySeekerToken };
