import React from 'react';
import axios from 'axios';
import firebase from '../../firebase/firebase';

class SeekerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      email: '',
      firstName: '',
      github: '',
      jobTitle: '',
      lastName: '',
      linkedIn: '',
      location: '',
      phoneNumber: '',
      portfolio: '',
      twitter: '',
    };
  }
  render() {
    return <div />;
  }
  componentDidMount() {
    const uid = 'uid1';
    firebase
      .database()
      .ref()
      .child(`seekers/${uid}`)
      .once('value')
      .then(snapshot => {
        this.setState(snapshot.val());
      });
  }
}

export default SeekerProfile;
