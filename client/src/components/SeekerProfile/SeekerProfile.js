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
  SignEmployer,
  ProfileModalStyle,
} from './ProfileModalStyle.js';

// Images for the Profile Modal
import profile from '../../images/avatar-icon.jpg';
import computerPic from '../../images/Icons/icons8-computer-monitor.png';
import githubPic from '../../images/Icons/icons8-github.png';
import linkedinPic from '../../images/Icons/icons8-linkedin-filled.png';
import resumePic from '../../images/Icons/icons8-resume.png';
import twitterPic from '../../images/Icons/icons8-twitter-filled.png';
import paperPlane from '../../images/Icons/icons8-paper-plane-26.png';
import phonePic from '../../images/Icons/icons8-phone-26.png';
import Loading from '../Loading/Loading.js';

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
      loading: true,
    };
  }

  componentDidMount() {
    const uid = this.props.match.params.seekerId;
    axios
      .get(
        `https://intense-stream-29923.herokuapp.com/api/database/seekers/${uid}`
      )
      .then(response => this.setState({ ...response.data, loading: false }))
      .catch(err => {
        console.log('%cNot a user', 'color: red', err);
        this.props.history.push('/nouser');
      });
  }

  signUpEmployer = () => {
    this.props.history.push('/signin');
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loading />
        ) : (
          <ModalContainer data-type="modal-container">
            <ProfileModalStyle className="modal">
              <ProfileStyle>
                <Icons>
                  <a
                    href={this.state.linkedIn}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      className={this.state.linkedIn ? null : 'none'}
                      src={linkedinPic}
                      alt="LinkedIn"
                    />
                  </a>
                  <a
                    href={this.state.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      className={this.state.github ? null : 'none'}
                      src={githubPic}
                      alt="Github"
                    />
                  </a>
                  <a
                    href={this.state.portfolio}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      className={this.state.portfolio ? null : 'none'}
                      src={computerPic}
                      alt="Computer"
                    />
                  </a>
                  <a
                    href={this.state.twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      className={this.state.twitter ? null : 'none'}
                      src={twitterPic}
                      alt="Twitter"
                    />
                  </a>
                  <a
                    href={this.state.resume}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      className={this.state.resume ? null : 'none'}
                      src={resumePic}
                      alt="Resume"
                    />
                  </a>
                </Icons>
                {this.state.profilePicture ? (
                  <ProfilePic image={this.state.profilePicture} alt="profile" />
                ) : (
                  <ProfilePic image={profile} alt="default" />
                )}
                <MainContent>
                  <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
                  <h3>
                    {this.state.location.city}, {this.state.location.state}
                  </h3>
                  {this.state.bio ? (
                    <div className="bio">
                      <h4>Bio:</h4>
                      <p>{this.state.bio}</p>
                    </div>
                  ) : (
                    <span />
                  )}
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
                {this.props.currentSignedInUser ? (
                  <Info>
                    <div className="info">
                      <img src={paperPlane} alt="paper plane" />
                      <p>{this.state.email}</p>
                    </div>
                    <div className="info">
                      <img src={phonePic} alt="phone number" />
                      <p>{this.state.phoneNumber}</p>
                    </div>
                  </Info>
                ) : (
                  <SignEmployer>
                    <p onClick={this.signUpEmployer}>Sign Up Employer</p>
                  </SignEmployer>
                )}
              </ProfileStyle>
            </ProfileModalStyle>
          </ModalContainer>
        )}
      </>
    );
  }
}

export default SeekerProfile;
