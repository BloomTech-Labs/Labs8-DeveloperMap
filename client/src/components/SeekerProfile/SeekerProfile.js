import React from 'react';
import firebase from '../../firebase/firebase';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';

// Delete later after moving style to different folder
import styled from 'styled-components';

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
    const uid = this.props.match.params.seekerId;
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
      <ModalContainer data-type="modal-container">
        <ModalMain>
          <ProfileStyle>
            <img src={profile} alt="" />
            <h2>{this.state.firstName}</h2>
            <h4>
              {this.state.location.city}, {this.state.location.state}
            </h4>
            <p>Bio: {this.state.bio}</p>
            <div className="options">
              <ToggleKnob>
                <input type="checkbox" />
                <span className="slider round" />
              </ToggleKnob>
              <p>Open to remote work</p>
            </div>
            <div className="options">
              <ToggleKnob>
                <input type="checkbox" />
                <span className="slider round" />
              </ToggleKnob>
              <p>Open to relocation</p>
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

const Info = styled.div`
  border: 1px solid black;
  padding: 5px 5%;
  margin-bottom: 20px;
`;

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .options {
    display: flex;
    align-items: center;
    white-space: nowrap;

    p {
      margin-left: 2%;
    }
  }
`;

const ToggleKnob = styled.label`
  position: relative;
  width: 29px;
  height: 12px;
  justify-self: center;
  align-items: center;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: '';
      height: 13px;
      width: 13px;
      left: 1px;
      bottom: 0px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
  .slider.round {
    border-radius: 12px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default SeekerProfile;
