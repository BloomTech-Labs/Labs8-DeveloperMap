const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

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

router.put('/:uid', (req, res) => {
  const { uid } = req.params;
  const { jid } = req.body;
  const newData = req.body;

  let updateObject = {};
  updateObject[`favoritePostings/${uid}/` + jid] = newData;

  return rootRef
    .update(updateObject)
    .then(res => res.json('Job added to favorites.'))
    .catch(err => res.status(500).json(`Server error --> ${err}`));
});

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
            res.json('Job removed from favorites.');
          })
          .catch(() => res.json(err));
      } else {
        return res.json('Job not in favorites');
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
