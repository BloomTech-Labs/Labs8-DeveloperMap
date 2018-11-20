import React from 'react';
import firebase from '../../firebase/firebase';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';

import profile from '../../images/avatar-icon.jpg';

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

  render() {
    return (
      <ModalContainer>
        <ModalMain>
          <img src={profile} alt="" />
          <h2>Name here</h2>
          <h4>Location here</h4>
          <p>Bio</p>
          <div className="options">
            <p>Open to remote work</p>
          </div>
          <div className="options">
            <p>Open to relocation</p>
          </div>
          <div className="info">
            <p>email</p>
          </div>
        </ModalMain>
      </ModalContainer>
    );
  }
}

export default SeekerProfile;
