const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

// ==== Middleware for favorites ====

const validate = (req, res, next) => {
  const { companyName, date, location, jobLink, jobTitle } = req.body;

  if (!companyName || !date || !location || !jobLink || !jobTitle) {
    res.status(400).json({ error: 'Data is missing for the job' });
  } else {
    next();
  }
};

// ==== GET will return all the jobs favorited for the specific user ====
router.get('/:uid', (req, res) => {
  const { uid } = req.params;

  rootRef
    .child(`favoritePostings/${uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val() === null) {
        res.status(404).json('No favorite jobs');
      } else {
        res.status(200).json(snapshot.val());
      }
    })
    .catch(err => {
      res.status(500).json(`Server error --> ${err}`);
    });
});

//  ==== POST will add the job favorited to the the list of favorites ====

router.post('/:uid/:jid', validate, (req, res) => {
  const { uid, jid } = req.params;
  const newData = req.body;

  rootRef
    .once('value')
    .then(snapshot => {
      if (snapshot.child(`favoritePostings/${uid}/${jid}`).exists()) {
        return res.status(400).json({ message: 'Job already in favorites' });
      } else {
        let updateObject = {};
        updateObject[`favoritePostings/${uid}/${jid}`] = newData;

        rootRef.update(updateObject);

        res.status(200).json({ message: `Job has been added to favorites.` });
      }
    })
    .catch(err => res.status(500).json({ error: `Server error --> ${err}` }));
});

// ==== DELETE will remove the job from the favorites list ====

router.delete('/:uid/:jid', (req, res) => {
  const { uid, jid } = req.params;

  rootRef
    .child(`favoritePostings/${uid}/${jid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        snapshot.ref
          .remove()
          .then(() => {
            res.json({ message: 'Job removed from favorites.' });
          })
          .catch(() => res.json(err));
      } else {
        return res.json({ message: 'Job not in favorites' });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
