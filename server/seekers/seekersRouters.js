const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();
const authMw = require('../auth/authMiddleware.js');

//----------------------------------------------------------------GETS

router.get('/', (req, res) => {
  rootRef
    .child('seekers')
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
    .child(`seekers/${uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        res.status(200).json(snapshot.val());
      } else {
        res.status(404).json({ err: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//-----------------------------------------------------------------------POSTS
//Add User

router.post('/addUser', authMw.setSeekerClaims, (req, res) => {
  const { email, firstName, lastName, jobTitle, location, uid } = req.body;
  // const { uid } = req.params;
  // const { email, firstName, lastName, jobTitle, location } = req.body;
  const newData = {
    email,
    firstName,
    lastName,
    jobTitle,
    location,
    github: '',
    linkedIn: '',
    phoneNumber: '',
    portfolio: '',
    twitter: '',
  };
  rootRef
    .child(`seekers/${uid}`)
    .once('value')
    .then(snapshot => {
      if (
        snapshot.child(`seekers/${uid}`).exists() ||
        snapshot.child(`marker/${uid}`)
      ) {
        res.json({ err: 'user already exists' });
      } else {
        snapshot.ref
          .set(newData)
          .then(() => {
            res
              .status(201)
              .json({ message: `${email} has been added to database.` });
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })

    // rootRef.once('value').then(snapshot => {
    //   if (snapshot.child(`seekers/${uid}`).exists() || snapshot.child(`marker/${uid}`)) {
    //         res.json({ err: 'user already exists' });
    //   } else {
    //   snapshot.child(`seekers/${uid}`)
    //   let key = snapshot.child(`markers`).push(markerData).key
    //   let updateObject = {}

    //   updateObject[`seekers/${uid}`] = req.body
    //   updateObject[`markers/${key}`] = markerData
    //   return rootRef.update(updateObject)
    // }
    // })

    .catch(err => res.status(500).json(err));
});

//------------------------------------------------------------------PUT
//Change UserInfo

router.put('/userInfo/:uid', (req, res) => {
  const { uid } = req.params;
  const updateKeys = Object.keys(req.body);
  rootRef
    .child(`seekers/${uid}`)
    .once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        return res.json({ message: 'user does not exist' });
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
            res.json(`userInfo updated in ${updateNumber} fields`);
          })
          .catch(err => res.json(err));
      } else {
        res.json('no new data was posted');
      }
    })
    .catch(err => res.json(err));
});

//----------------------------------------------------------------------DELETE

router.delete('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child(`seekers/${uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        snapshot.ref
          .remove()
          .then(() => {
            res.json('user has been deleted');
          })
          .catch(err => res.json(err));
      } else {
        return res.json("user doesn't exist");
      }
    });
});

module.exports = router;
