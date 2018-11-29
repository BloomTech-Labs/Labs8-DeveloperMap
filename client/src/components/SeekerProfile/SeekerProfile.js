import React from 'react';
import axios from 'axios';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle.js';
import {
  Info,
  ProfileStyle,
  CheckLabel,
  ProfilePic,
  Icons,
  MainContent,
} from './ProfileModalStyle.js';

// Images for the Profile Modal
import profile from '../../images/avatar-icon.jpg';
import computerPic from '../../images/Icons/icons8-computer-monitor.png';
import githubPic from '../../images/Icons/icons8-github.png';
import linkedinPic from '../../images/Icons/icons8-linkedin-filled.png';
import resumePic from '../../images/Icons/icons8-resume.png';
import twitterPic from '../../images/Icons/icons8-twitter-filled.png';

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
      location: {},
      phoneNumber: '',
      portfolio: '',
      profilePicture: '',
      relocation: false,
      remote: false,
      resume: '',
      twitter: '',
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
        this.props.history.push('/nouser');
      });
  }

  render() {
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain>
          <ProfileStyle>
            <Icons>
              <a href={this.state.linkedIn} target="_blank">
                <img
                  className={this.state.linkedIn ? null : 'none'}
                  src={linkedinPic}
                  alt="LinkedIn Picture"
                />
              </a>
              <a href={this.state.github} target="_blank">
                <img
                  className={this.state.github ? null : 'none'}
                  src={githubPic}
                  alt="Github Picture"
                />
              </a>
              <a href={this.state.portfolio} target="_blank">
                <img
                  className={this.state.portfolio ? null : 'none'}
                  src={computerPic}
                  alt="Computer Picture"
                />
              </a>
              <a href={this.state.twitter} target="_blank">
                <img
                  className={this.state.twitter ? null : 'none'}
                  src={twitterPic}
                  alt="Twitter Picture"
                />
              </a>
              <a href={this.state.resume} target="_blank">
                <img
                  className={this.state.resume ? null : 'none'}
                  src={resumePic}
                  alt="Resume Picture"
                />
              </a>
            </Icons>
            {this.state.profilePicture ? (
              <ProfilePic
                src={this.state.profilePicture}
                alt="profile picture"
              />
            ) : (
              <ProfilePic src={profile} alt="default picture" />
            )}
            <MainContent>
              <h2>{this.state.firstName}</h2>
              <h4>
                {this.state.location.city}, {this.state.location.state}
              </h4>
              {this.state.bio ? <p>Bio: {this.state.bio}</p> : <span />}
            </MainContent>
            <div className="options">
              <CheckLabel>
                <input
                  type="checkbox"
                  disabled={true}
                  checked={this.state.remote}
                />
                <span className="slider round" />
                <span>Open to remote work</span>
              </CheckLabel>
              <CheckLabel>
                <input
                  type="checkbox"
                  disabled={true}
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
