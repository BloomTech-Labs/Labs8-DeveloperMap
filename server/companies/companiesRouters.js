const express = require('express');
const firebase = require('../firebase/firebase.js');
const {
  createMarkerObjectCompany,
} = require('../markers/markersMiddleware.js');
const {
  setCompanyClaims,
  verifyCompanyToken,
} = require('../auth/authMiddleware.js');
const rootRef = firebase.database().ref();
const router = express.Router();

//----------------------------------------------------GETS

router.get('/token', async (req, res) => {
  const claims = { company: true };
  const customToken = await firebase
    .auth()
    .createCustomToken('test-uid', claims);
  res.json({ customToken });
});

router.get('/all', (req, res) => {
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

router.get('/jobPostings/:companyUid/:seekersUid', async (req, res) => {
  const { seekersUid, companyUid } = req.params;
  let favoritedList = [];
  const companyPostings = await rootRef
    .child(`companyPostings/${companyUid}`)
    .once('value');
  const favoritePostings = await rootRef
    .child(`favoritePostings/${seekersUid}`)
    .once('value');
  favoritePostings.forEach(favoritePosting => {
    favoritedList.push(favoritePosting.key);
  });
  res.json({
    posts: companyPostings.val(),
    favoritedList: favoritedList,
  });
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child(`companies/${uid}`)
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

// router.get('/:uid', (req, res) => {
//   const { uid } = req.body;
//   rootRef
//     .child(`companies/${uid}`)
//     .once('value')
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         res.status(200).json(snapshot.val());
//       } else {
//         res.status(404).json({ err: 'user not found' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ err });
//     });
// });

//--------------------------------------------------------POSTS

router.post(
  '/addUser',
  setCompanyClaims,
  createMarkerObjectCompany,
  (req, res) => {
    const {
      email,
      phoneNumber,
      location,
      companyName,
      companyWebsite,
      uid,
      markerData,
      customToken,
    } = req.body;
    const newData = {
      companyName,
      companyWebsite,
      email,
      location,
      phoneNumber,
      profilePicture = '',
      remote = false
    };
    let updateObject = {};
    updateObject[`companies/${uid}`] = newData;
    updateObject[`markers/${uid}`] = markerData;
    // Update database with the new object
    rootRef.update(updateObject).catch(error => console.log(error));
    // Success Message
    res.status(201).json({
      success: `${email} has been added to database.`,
      customToken,
    });
  }
);

router.post('/jobsListed', (req, res) => {
  const { companyName, date, jobLink, jobTitle,  uid } = req.body;
  const companyUid = uid;
  const jobId = rootRef.push(null).key;
  rootRef
    .child(`companyPostings/${uid}/${jobId}`)
    .set({ companyName, date, jobLink, jobTitle, companyUid, jobId })
    .then(res => {
      res.json({ message: 'Job added' });
    })
    .catch(err => {
      res.json(err);
    });
});

//----------------------------------------------------------------------PUT

router.put('/userInfo', createMarkerObjectCompany, (req, res) => {
  const { uid, markerData } = req.body;
  const updateKeys = Object.keys(req.body);
  rootRef
    .child(`companies/${uid}`)
    .once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        return res.json({ message: 'user does not exist' });
      }
      let updateObject = {};
      if (markerData) {
        updateObject[`markers/${uid}`] = markerData;
      }
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

router.put('/jobListed/:jobKey', async (req, res) => {
  const { jobKey } = req.params;
  const { companyName, date, location, jobLink, jobTitle, uid } = req.body;
  const newData = { companyName, date, location, jobLink, jobTitle, uid };
  let updateObject = {};
  const favoritedPosts = await rootRef.child('favoritePosting').once('value');
  updateObject[`companyPostings/${uid}/${jobKey}`] = {
    companyName,
    date,
    location,
    jobLink,
    jobTitle,
  };
  if (favoritedPosts) {
    favoritedPosts.forEach(childSnap => {
      if (childSnap.child(jobKey).exists()) {
        updateObject[`favoritePosting/${childSnap.key}/${jobKey}`] = newData;
      }
    });
  }
  rootRef
    .update(updateObject)
    .then(() => {
      res.json('company postings updated');
    })
    .catch(err => {
      res.json(err);
    });
});

// Version 2.0 (Needs Testing)
// router.put('/jobListed/:jobId', async (req, res) => {
//   const { uid } = req.body;
//   const { jobId } = req.params;
//   const updateKeys = Object.keys(req.body);
//   let matchedUidsInFavoritePostings = [];
//   let updateObject = {};

//   const companyPostings = await rootRef
//     .child(`companyPostings/${uid}/${jobId}`)
//     .once('value');
//   const favoritePosting = await rootRef.child('favoritePosting').once('value');

//   //Finds the UID for every parentkey in favoritePosting that had the targeted jobId

//   favoritePosting.forEach(childSnap => {
//     if (childSnap.child(jobId).exists()) {
//       matchedJobIdsInFavoritePostings.push(childSnap.key);
//     }
//   });

//   if (companyPostings.exists()) {
//     companyPostings.forEach(({ key }) => {
//       if (updateKeys.includes(key)) {
//         //Update key with new value if key exists in data base
//         updateObject[`companyPostings/${uid}/${jobId}/${key}`] = req.body[key];
//         matchedJobIdsInFavoritePostings.forEach(matchedUid => {
//           //Updates keys in all favoritePostings with t
//           updateObject[`favoritePosting/${matchedUid}/${jobId}/${key}`] =
//             req.body[key];
//         });
//       }
//     });
//   } else {
//     res.json(`companyPostings/${uid}/${jobKey} does not exist`);
//   }

// });

//-------------------------------------------------------------------DELETE

router.delete('/', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child(`companies/${uid}`)
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
