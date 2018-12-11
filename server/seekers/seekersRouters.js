const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();
const { createMarkerObjectSeeker } = require('../markers/markersMiddleware.js');
const {
  setSeekerClaims,
  verifySeekerToken,
  createProfilePicture,
} = require('../auth/authMiddleware.js');

//----------------------------------------------------------------GETS

router.get('/token', async (req, res) => {
  const claims = { seekers: true };
  const customToken = await firebase
    .auth()
    .createCustomToken('test-uid', claims);
  res.json({ customToken });
});

router.get('/all', (req, res) => {
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

router.get('/', (req, res) => {
  const { uid } = req.body;
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
router.post(
  '/addUser',
  setSeekerClaims,
  createProfilePicture,
  createMarkerObjectSeeker,
  async (req, res) => {
    // Deconstruct Request Body
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      jobTitle,
      location,
      uid,
      customToken,
      markerData,
      profilePicture,
    } = req.body;

    console.log(markerData);
    // Validation
    // if (
    //   !email ||
    //   !firstName ||
    //   !email ||
    //   !firstName ||
    //   !lastName ||
    //   !phoneNumber ||
    //   !jobTitle ||
    //   !location ||
    //   !uid
    // ) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Missing information. Unable to create user.' });
    // }

    // Construct New Seeker User Object
    const newSeeker = {
      email,
      firstName,
      lastName,
      phoneNumber,
      jobTitle,
      location,
      bio: '',
      github: '',
      linkedIn: '',
      portfolio: '',
      twitter: '',
      resume: '',
      profilePicture: profilePicture || '',
      relocation: false,
      remote: false,
    };

    // Firebase Reference Interface Methods
    // Create object to send to Firebase Database
    let updateObject = {};
    updateObject[`seekers/${uid}`] = newSeeker;
    updateObject[`markers/${uid}`] = markerData;
    // Update database with the new object
    rootRef.update(updateObject).catch();
    // Success Message
    res.status(201).json({
      success: `${email} has been added to database.`,
      customToken,
    });
  }
);

//------------------------------------------------------------------PUT
//Change UserInfo

router.put('/userInfo', createMarkerObjectSeeker, (req, res) => {
  const { uid, markerData } = req.body;
  const updateKeys = Object.keys(req.body);
  rootRef
    .once('value')
    .then(snapshot => {
      let updateObject = {};
      if (markerData) {
        updateObject[`markers/${uid}`] = markerData;
      }

      snapshot.child(`seekers/${uid}`).forEach(childSnap => {
        const snapKey = childSnap.key;
        if (updateKeys.includes(snapKey)) {
          if (childSnap.val() === req.body[snapKey]) {
            console.log(`${snapKey} data is same as posted data`);
          } else {
            updateObject[`/seekers/${uid}/${snapKey}`] = req.body[snapKey];
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

router.delete('/', (req, res) => {
  const { uid } = req.body;
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
