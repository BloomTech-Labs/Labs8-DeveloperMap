import React from 'react';
import firebase from '../../firebase/firebase';
import axios from 'axios';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle.js';
import { Info, ProfileStyle, CheckLabel } from './ProfileModal.js';

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
      relocation: false,
      remote: false,
    };
  }

  componentDidMount() {
    const uid = this.props.match.params.seekerId;
    axios
      .get(
        `https://intense-stream-29923.herokuapp.com/api/database/seekers/${uid}`
      )
      .then(response => this.setState({ ...response.data }))
      .catch(err => {
        console.log('%cNot a user', 'color: red', err);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain>
          <ProfileStyle>
            <img src={profile} alt="" />
            <h2>{this.state.firstName}</h2>
            <h4>
              {this.state.location.city}, {this.state.location.state}
            </h4>
            {this.state.bio ? <p>Bio: {this.state.bio}</p> : <span />}
            <div className="options">
              <CheckLabel>
                <input
                  type="checkbox"
                  disabled="true"
                  checked={this.state.remote}
                />
                <span className="slider round" />
                <span>Open to remote work</span>
              </CheckLabel>
              <CheckLabel>
                <input
                  type="checkbox"
                  disabled="true"
                  checked={this.state.relocation}
                />
                <span>Open to relocation</span>
              </CheckLabel>
            </div>
            <Info>
              <p>{this.state.email}</p>
              <p>{this.state.phoneNumber}</p>
            </Info>
          </ProfileStyle>
        </ModalMain>
      </ModalContainer>
    );
  }
}

export default SeekerProfile;
