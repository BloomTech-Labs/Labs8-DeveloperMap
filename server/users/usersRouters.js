const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

//const updateData

// router.get('/', (req, res) => {
//   rootRef
//     .child('seekers')
//     .once('value')
//     .then(snapshot => {
//       res.json(snapshot);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// router.get('/:uid', (req, res) => {
//   const { uid } = req.params;
//   rootRef
//     .child('users/' + uid)
//     .once('value')
//     .then(snapshot => {
//       res.json(snapshot);
//     });
// });

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
        res.json({
          err: `did not have permission to access rootRef/favoriteLookup/${uid}.`,
        })
      )
      .then(() => {
        rootRef.update(updateObject).then(() => {
          res.json(rootRef);
        });
      })
      .catch(err =>
        res.json({
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

router.put('/links/:uid', (req, res) => {
  const { uid } = req.params;
  const links = req.body;
  const linkKeys = Object.keys(req.body);
  let updateObject = {};
  linkKeys.forEach(linkKey => {
    updateObject[`users/${uid}/${linkKey}`] = links[linkKey];
  });

  rootRef
    .update(updateObject)
    .then(() => {
      res.json('links added status updated');
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete Users
router.delete('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child('users/' + uid)
    .remove()
    .then(() => {
      res.json('user deleted');
    });
});

router.get('/', (req, res) => {});

module.exports = router;
