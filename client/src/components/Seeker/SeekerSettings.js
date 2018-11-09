import React from 'react';
import firebase from '../../firebase/firebase';

class SeekerSettings extends React.Component {
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

export default SeekerSettings;
