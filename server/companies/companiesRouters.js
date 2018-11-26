const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

//----------------------------------------------------GETS

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

router.get('/:uid', (req, res) => {
  const { uid } = req.body;
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

//--------------------------------------------------------POSTS

router.post('/addUser', (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    jobTitle,
    location,
    uid,
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
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});

router.post('/jobsListed', (req, res) => {
  const { uid } = req.body;
  const { companyName, date, jobLink, jobTitle, location } = req.body;
  rootRef
    .child(`companyPostings/${uid}`)
    .push({ companyName, date, jobLink, jobTitle, location })
    .then(res => {
      res.json({ message: 'Job added' });
    })
    .catch(err => {
      res.json(err);
    });
});

//----------------------------------------------------------------------PUT

router.put('/userInfo', (req, res) => {
  const { uid } = req.body;
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
