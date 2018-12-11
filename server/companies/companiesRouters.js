const express = require('express');
const firebase = require('../firebase/firebase.js');
const {
  createMarkerObjectCompany,
} = require('../markers/markersMiddleware.js');
const {
  setCompanyClaims,
  verifyCompanyToken,
  createProfilePicture,
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

router.get(
  '/allCompanyDataAndFavKeys/:companyUid/:seekersUid',
  async (req, res) => {
    const { seekersUid, companyUid } = req.params;
    let favoritedList = [];
    const posts = await rootRef
      .child(`companyPostings/${companyUid}`)
      .once('value')
      .then(snapshot => snapshot.val());

    const companyInfo = await rootRef
      .child(`companies/${companyUid}`)
      .once('value')
      .then(snapshot => snapshot.val());

    await rootRef
      .child(`favoritePostings/${seekersUid}`)
      .once('value')
      .then(snapshot =>
        snapshot.forEach(snapshot => {
          favoritedList.push(snapshot.key);
        })
      );
    res.json({ posts, companyInfo, favoritedList });
  }
);

router.get('/allCompanyData/:companyUid', async (req, res) => {
  const { companyUid } = req.params;
  const posts = await rootRef
    .child(`companyPostings/${companyUid}`)
    .once('value')
    .then(snapshot => snapshot.val());

  const companyInfo = await rootRef
    .child(`companies/${companyUid}`)
    .once('value')
    .then(snapshot => snapshot.val());
  res.json({ posts, companyInfo });
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
  createProfilePicture,
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
      profilePicture,
    } = req.body;
    const newData = {
      companyName,
      companyWebsite,
      email,
      location,
      phoneNumber,
      profilePicture: profilePicture || '',
      remote: false,
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

router.post('/jobsListed', async (req, res) => {
  const { companyName, date, jobLink, jobTitle, uid } = req.body;
  const companyUid = uid;
  const jobId = rootRef.push(null).key;
  const locationSnap = await rootRef
    .child(`companies/${uid}/location`)
    .once('value');
  const location = locationSnap.val();
  const newData = {
    companyName,
    date,
    jobLink,
    jobTitle,
    companyUid,
    jobId,
    location,
  };
  const updateObject = {
    [`companyPostings/${uid}/${jobId}`]: newData,
    [`allJobPostings/${jobId}`]: newData,
  };
  rootRef
    .update(updateObject)
    .then(res => {
      res.json({ message: 'Job added' });
    })
    .catch(err => {
      res.json(err);
    });
});

// Payment success applied to company

router.post('/paysuccess', (req, res) => {
  const { uid } = req.body;
  const paid = true;
  rootRef
    .child(`companies/${uid}/paid`)
    .set(true)
    .then(res => {
      res.json({ message: 'Payment Recorded' });
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
    .once('value')
    .then(snapshot => {
      let updateObject = {};
      if (markerData) {
        updateObject[`markers/${uid}`] = markerData;
      }

      snapshot.child(`companies/${uid}`).forEach(childSnap => {
        const snapKey = childSnap.key;
        if (updateKeys.includes(snapKey)) {
          if (childSnap.val() === req.body[snapKey]) {
            console.log(`${snapKey} data is same as posted data`);
          } else {
            updateObject[`/companies/${uid}/${snapKey}`] = req.body[snapKey];
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

router.put('/jobListed/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const { companyName, date, location, jobLink, jobTitle, uid } = req.body;
  const newData = { companyName, date, location, jobLink, jobTitle };

  let updateObject = {
    [`companyPostings/${uid}/${jobId}`]: newData,
    [`allJobListed/${uid}/${jobId}`]: newData,
  };
  await rootRef
    .child('favoritePostings')
    .once('value')
    .then(snapshot =>
      snapshot.forEach(childSnap => {
        if (childSnap.child(jobId).exists()) {
          updateObject[`favoritePostings/${childSnap.key}/${jobId}`] = newData;
        }
      })
    );
  rootRef.update(updateObject).then(res.json({ updateObject }));
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

router.delete('/jobsListed/:jobId', async (req, res) => {
  const { uid } = req.body;
  const { jobId } = req.params;

  // const existsInCompanyPostings = rootRef
  //   .child(`companyPostings/${uid}/${jobId}`)
  //   .once('value')
  //   .then(snapshot => snapshot.exists());

  // const existsInAllJobPostings = rootRef
  //   .child(`allJobPostings/${jobId}`)
  //   .once('value')
  //   .then(snapshot => snapshot.exists());

  let updateObject = {
    [`companyPostings/${uid}/${jobId}`]: null,
    [`allJobPostings/${jobId}`]: null,
  };

  await rootRef
    .child('favoritePostings')
    .once('value')
    .then(snapshot =>
      snapshot.forEach(childSnap => {
        if (childSnap.child(jobId).exists()) {
          updateObject[`favoritePostings/${childSnap.key}/${jobId}`] = null;
        }
      })
    );

  rootRef.update(updateObject).then(() => {
    res.json({ message: `jobId: ${jobId} deleted` });
  });
});

module.exports = router;
