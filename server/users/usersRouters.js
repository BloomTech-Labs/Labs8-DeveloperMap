const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

//------------------------------------------------------------------------------------GETS
//Dynamic Get
router.get('/:parentKey', (req, res) => {
  const { parentKey } = req.params;
  rootRef
    .child(parentKey)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        res.status(200).json(snapshot);
      } else {
        res
          .status(404)
          .json({ err: `Parent key: ${parentKey} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({ err: 'Not allowed to read ' + parentKey });
    });
});

//Dynamic Get by ID
router.get('/:parentKey/:uid', (req, res) => {
  const { parentKey, uid } = req.params;
  rootRef
    .child(parentKey + '/' + uid)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        res.status(200).json(snapshot);
      } else {
        res.status(404).json({
          err: `Parent key: '${parentKey}/${uid}' does not exist in parentKey:'${parentKey}'`,
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'Not allowed to read parentKey:' + '/' + uid });
    });
});
//----------------------------------------------------------------------------------------------------POSTS
//Add User to Database
// router.post('/addUser/:parentKey', (req, res) => {
//   const { parentKey } = req.params;
//   if (parentKey === 'companies') {
//     const {
//       uid,
//       companyName,
//       companyWebsite,
//       email,
//       location,
//       phoneNumber,
//     } = req.body;
//     const newData = {
//       companyName,
//       companyWebsite,
//       email,
//       location,
//       phoneNumber,
//     };
//     rootRef
//       .child(`${parentKey}/${uid}`)
//       .set(newData)
//       .then(() => {
//         res.json(`${companyName} has been added to database`);
//       });
//   }
//   if (parentKey === 'seekers') {
//     const { uid, email, firstName, lastName, jobTitle, location } = req.body;
//     const newData = {
//       email,
//       firstName,
//       lastName,
//       jobTitle,
//       location,
//       github: '',
//       linkedIn: '',
//       phoneNumber: '',
//       porfolio: '',
//       twitter: '',
//     };
//     rootRef
//       .child(`${parentKey}/${uid}`)
//       .set(newData)
//       .then(() => {
//         res.json(`${firstName} has been added to the database`);
//       });
//   } else {
//     res
//       .status(500)
//       .json({ err: `${parentKey} must be either 'seekers' or 'companies'` });
//   }
// });

//Add Users 2.0
//Add Seekers
router.post('/addUser/seekers/:uid', (req, res) => {
  const { uid } = req.params;
  const { email, firstName, lastName, jobTitle, location } = req.body;
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
      if (snapshot.exists()) {
        res.json({ err: 'snapshot already exists' });
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
    .catch(err => res.status(500).json(err));
});

//Add Companies
router.post('/addUser/companies/:uid', (req, res) => {
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
          .catch(err => res.json({ err: 'line 171' }));
      }
    })
    .catch(err => res.json({ err: 'line 174' }));
});

//Add Job posting
router.post('/jobPost/:parentKey/:uid', (req, res) => {
  const { parentKey, uid } = req.params;
  if (parentKey === 'companies') {
    const { companyName, date, jobLink, jobTitle, location } = req.body;
    rootRef
      .child(`companyPostings/${uid}`)
      .push({ companyName, date, jobLink, jobTitle, location })
      .then(snap => {
        res.status(201).json(snap.key);
      });
  } else {
    res.json(`${parentKey} !== companies`);
  }
});

// //Change UserInfo Status
// Change Seeker  info

router.put('/userInfo/seekers/:uid', (req, res) => {
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
      snapshot.ref
        .update(updateObject)
        .then(() => {
          res.json('userInfo updated');
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

//Change User info

router.put('/userInfo/companies/:uid', (req, res) => {
  const { uid } = req.params;
  const updateKeys = Object.keys(req.body);
  rootRef
    .child(`companies/${uid}`)
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
      snapshot.ref
        .update(updateObject)
        .then(() => {
          res.json('userInfo updated');
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

// router.put('/userInfo/:name/:uid', (req, res) => {
//   const { uid, name } = req.params;
//   console.log(name);
//   if (name === 'location' || name === 'employer' || name === 'email') {
//     const newDate = req.body;
//     const updateObject = {
//       [`users/${uid}/${name}`]: newDate[name],
//     };
//     rootRef
//       .update(updateObject)
//       .then(() => {
//         res.json(`${name} status updated`);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   } else {
//     res.json({ err: 'Must send location, email, employer' });
//   }
// });

//Change data for all posts under a company's uid

router.put('/jobs/:uid/:jb', (req, res) => {
  const { uid, jb } = req.params;
  const { companyName, date, location, jobLink, jobTitle } = req.body;

  //Checks object format
  if (!companyName || !date || !location || !jobLink || !jobTitle) {
    res.status(400).json({
      err:
        'Missing keys. Must have the following keys: companyName, date, location, jobLink, and jobTitle',
    });
  } else {
    const newData = { companyName, date, location, jobLink, jobTitle };

    let updateObject = {};
    updateObject[`companyPostings/${uid}/${jb}`] = newData;

    rootRef
      .child(`favoriteLookup/${uid}`)
      .once('value')
      .then(snapshot => {
        const lookups = Object.keys(snapshot.val());

        lookups.forEach(lookup => {
          updateObject[`favoritePostings/${lookup}/${jb}`] = newData;
        });
      })
      .catch(err =>
        res.status(500).json({
          err: `did not have permission to access rootRef/favoriteLookup/${uid}.`,
        })
      )
      .then(() => {
        rootRef.update(updateObject).then(() => {
          res.json(rootRef);
        });
      })
      .catch(err =>
        res.status(500).json({
          err:
            'did not have permissions to access one of the following references: ' +
            Object.keys(updateObject)
              .join(', ')
              .trim(),
        })
      );
  }
});

router.put('/changeUser/:parentKey/:uid', (req, res) => {});

//add Links

// router.put('/links/:uid', (req, res) => {
//   const { uid } = req.params;
//   const links = req.body;
//   const linkKeys = Object.keys(req.body);
//   let updateObject = {};
//   linkKeys.forEach(linkKey => {
//     updateObject[`users/${uid}/${linkKey}`] = links[linkKey];
//   });

//   rootRef
//     .update(updateObject)
//     .then(() => {
//       res.json('links added status updated');
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// //Delete Users
// router.delete('/:uid', (req, res) => {
//   const { uid } = req.params;
//   rootRef
//     .child('users/' + uid)
//     .remove()
//     .then(() => {
//       res.json('user deleted');
//     });
// });
//
router.delete('/:parentKey/:uid', (req, res) => {
  const { parentKey, uid } = req.params;
  if (parentKey === 'seekers') {
    rootRef
      .child(`${parentKey}/${uid}`)
      .remove()
      .then(() => {
        res.json('seekers deleted');
      });
  } else {
    res.status(500);
  }
});

module.exports = router;
