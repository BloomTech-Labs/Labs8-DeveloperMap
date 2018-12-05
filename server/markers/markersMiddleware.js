const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();

const createMarkerObjectSeeker = async (req, res, next) => {
  const { uid } = req.body;
  let { firstName, lastName, jobTitle, profilePicture, location } = req.body;
  const exists = await rootRef
    .child(`/seekers/${uid}`)
    .once('value')
    .then(snap => snap.exists());

  if (!uid || !exists) {
    return res.json({ message: 'user does not exist' });
  }

  if (!firstName) {
    firstName = await rootRef
      .child(`seekers/${uid}/firstName`)
      .once('value')
      .then(snapshot => snapshot.val());
  }
  if (!lastName) {
    lastName = await rootRef
      .child(`seekers/${uid}/lastName`)
      .once('value')
      .then(snapshot => snapshot.val());
  }
  if (!jobTitle) {
    jobTitle = await rootRef
      .child(`seekers/${uid}/jobTitle`)
      .once('value')
      .then(snapshot => snapshot.val());
  }
  if (!profilePicture) {
    profilePicture = await rootRef
      .child(`seekers/${uid}/profilePicture`)
      .once('value')
      .then(snapshot => snapshot.val());
  }
  if (!location) {
    location = await rootRef
      .child(`seekers/${uid}/location`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  const markerData = {
    geometry: {
      // Convert Coordinates to Numbers
      coordinates: location.coordinates.map(coord => Number(coord)),
    },
    properties: {
      title: {
        firstName,
        lastName,
      },
      jobTitle,
      profilePicture,
      uid,
      role: 'seeker',
    },
  };
  req.body.markerData = markerData;
  next();
};

const createMarkerObjectCompany = async (req, res, next) => {
  const { location, uid } = req.body;
  let { companyName } = req.body;
  const exists = await rootRef
    .child(`/companies/${uid}`)
    .once('value')
    .then(snap => snap.exists());

  if (!uid || !exists) {
    return res.json({ message: 'user does not exist' });
  }

  if (!companyName) {
    companyName = await rootRef
      .child(`companies/${uid}/companyName`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  if (!profilePicture) {
    profilePicture = await rootRef
      .child(`seekers/${uid}/profilePicture`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  if (!location) {
    location = await rootRef
      .child(`seekers/${uid}/location`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  const markerData = {
    geometry: {
      // Convert Coordinates to Numbers
      coordinates: location.coordinates.map(coord => Number(coord)),
    },
    properties: {
      title: { companyName },
      uid,
      profilePicture,
      role: 'company',
    },
  };
  req.body.markerData = markerData;
  next();
};

module.exports = { createMarkerObjectSeeker, createMarkerObjectCompany };
