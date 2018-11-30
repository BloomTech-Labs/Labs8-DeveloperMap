const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();

const createMarkerObjectSeeker = async (req, res, next) => {
  const { location, uid } = req.body;
  let { firstName, lastName, jobTitle } = req.body;
  if (!firstName) {
    firstName = await rootRef.child(`seekers/${uid}/firstName`).once('value');
  }
  if (!lastName) {
    lastName = await rootRef.child(`seekers/${uid}/lastName`).once('value');
  }
  if (!jobTitle) {
    jobTitle = await rootRef.child(`seekers/${uid}/jobTitle`).once('value');
  }
  if (location) {
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
        profilePicture: '',
        uid,
        role: seeker,
      },
    };
    req.body.markerData = markerData;
    next();
  }
  next();
};

const createMarkerObjectCompany = async (req, res, next) => {
  const { location, uid } = req.body;
  let { companyName } = req.body;
  if (!companyName) {
    companyName = await rootRef
      .child(`companies/${uid}/companyName`)
      .once('value');
  }

  if (location) {
    const markerData = {
      geometry: {
        // Convert Coordinates to Numbers
        coordinates: location.coordinates.map(coord => Number(coord)),
      },
      properties: {
        title: { companyName },
        uid,
        role: 'company',
      },
    };
    req.body.markerData = markerData;
    next();
  }
  next();
};

module.exports = { createMarkerObjectSeeker, createMarkerObjectCompany };
