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
router.post('/addUser/:parentKey', (req, res) => {
  const { parentKey } = req.params;
  if (parentKey === 'companies') {
    const {
      uid,
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
      .child(`${parentKey}/${uid}`)
      .set(newData)
      .then(() => {
        res.json(`${companyName} has been added to database`);
      });
  }
  if (parentKey === 'seekers') {
    const { uid, email, firstName, lastName, jobTitle, location } = req.body;
    const newData = {
      email,
      firstName,
      lastName,
      jobTitle,
      location,
      github: '',
      linkedIn: '',
      phoneNumber: '',
      porfolio: '',
      twitter: '',
    };
    rootRef
      .child(`${parentKey}/${uid}`)
      .set(newData)
      .then(() => {
        res.json(`${firstName} has been added to the database`);
      });
  } else {
    res
      .status(500)
      .json({ err: `${parentKey} must be either 'seekers' or 'companies'` });
  }
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
    if (parentKey === 'seekers'){
    rootRef
      .child(`${parentKey}/${uid}`)
      .remove()
      .then(() => {
        res.json('seekers deleted');
      });
    } else {
      res.status(500)
    }
  })


module.exports = router;
