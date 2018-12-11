import React from 'react';
import firebase from '../../firebase/firebase';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import profile from '../../images/avatar-icon.jpg';
import { Info, Styling, ProfilePic, InfoContainer } from './EmployerStyles';

import EmployerPostings from './EmployerPostings';

class EmployerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyWebsite: '',
      email: '',
      location: {},
      phoneNumber: '',
      profilePicture: '',
    };
  }

  componentDidMount() {
    const uid = this.props.match.params.employerId;
    firebase
      .database()
      .ref()
      .child(`companies/${uid}`)
      .once('value')
      .then(snapshot => {
        this.setState(snapshot.val());
      });
  }

  render() {
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain
          style={{ maxWidth: '750px', borderRadius: '20px' }}
          className="modal"
        >
          <Styling>
            <Info>
              {this.state.profilePicture ? (
                <ProfilePic src={this.state.profilePicture} alt="profile" />
              ) : (
                <ProfilePic src={profile} alt="default" />
              )}
              <h2 className="com-name">{this.state.companyName}</h2>
              <InfoContainer>
                <h3>Location:</h3>
                <h4>{this.state.location.city}</h4>
                <h3>Website:</h3>
                <h4>{this.state.companyWebsite}</h4>
                <h3>Phone</h3>
                <h4>{this.state.phoneNumber}</h4>
                <h3>Email:</h3>
                <h4>{this.state.email}</h4>
              </InfoContainer>
            </Info>
            <EmployerPostings {...this.props} />
          </Styling>
        </ModalMain>
      </ModalContainer>
    );
  }
}

export default EmployerProfile;
