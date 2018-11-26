const express = require('express');
const firebase = require('../firebase/firebase.js');

const setSeekerClaims = (req, res, next) => {
  console.log('Token', req.headers.authorization);
  const claim = { seeker: true };
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
          .setCustomUserClaims(uid, claim)
          .then(async () => {
            const customToken = await firebase
              .auth()
              .createCustomToken(uid, claim);
            req.body.customToken = customToken;
            console.log(req.body.customToken);
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
      })
      .catch(err => res.json(err));
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
      })
      .catch(err => res.json(err));
  } else {
    res.json({ err: 'Token was not received.' });
  }
};

const allowSeekerUpdate = (req, res, next) => {
  const { body } = req;
  if (body && (body.email || body.phoneNumber)) {
    const { email, phoneNumber, uid } = body;
    console.log(body);
    firebase
      .auth()
      .updateUser(uid, {
        email: email,
        phoneNumber: phoneNumber,
      })
      .then(() => {
        console.log('NEXT');
        next();
      })
      .catch(err => {
        console.log('CATCH');
        return res.json(err);
      });
  } else {
    next();
  }
};

module.exports = {
  setSeekerClaims,
  verifySeekerToken,
  allowSeekerUpdate,
  verifyCompanyToken,
  setCompanyClaims,
};
