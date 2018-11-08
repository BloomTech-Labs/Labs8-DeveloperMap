import React from 'react';
import firebase from '../../firebase/firebase';

class EmployerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyWebsite: '',
      email: '',
      location: '',
      phoneNumber: '',
    };
  }
  render() {
    return <div />;
  }
  componentDidMount() {
    const uid = 'uid2';
    firebase
      .database()
      .ref()
      .child(`companies/${uid}`)
      .once('value')
      .then(snapshot => {
        this.setState(snapshot.val());
      });
  }
}

export default EmployerSettings;
