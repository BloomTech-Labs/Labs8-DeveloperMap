import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle';
import profile from '../../images/avatar-icon.jpg';
import { 
  EditButtons,
  Label,
  Social,
  ProfileInfo,
  Location, 
  Input, 
  Select,
  TextArea,
  CheckBox,
  SettingsModalMain, 
  Password,
  LeftColumn,
  RightColumn,
  ContactInfo } from '../../styles/SettingsStyle';

class SeekerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      resume: '',
      currentPassword: '',
      newPassword: '',
      rePassword: '',
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      phone: '',
      bio: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      github: '',
      twitter: '',
      linkedIn: '',
      portfolio: '',
      remote: false,
      relocation: false,
      editing: false,
    };
  }

  editSettings = e => {
    e.preventDefault();
    this.setState({ editing: !this.state.editing })
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  componentDidMount = () => {
    const user = this.props.currentSignedInUser;
    if (user) {
      this.setState({
        ...this.state, ...user, ...user.location
      })
    } else {
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
        <ModalContainer data-type="modal-container">
          <SettingsModalMain>
            <LeftColumn>
              <ProfileInfo>
                <div>
                  <h3></h3>
                  <img alt='Profile Picture' src={profile}/>
                  <Label>
                  Upload New Profile Picture <br/>
                  (.png, .jpg, .jpeg)
                  <Input
                  name="profilePicture"
                  value={this.state.profilePicture}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="file" 
                  accept=".png,.jpg,.jpeg"
                  />
                </Label>
                </div>
                <h3>Resume</h3>
                <a href="#">Resume.pdf</a>
                <Label>
                  Upload New Resume<br/>
                  (.pdf, .doc, .docx)
                  <Input
                  name="resume"
                  value={this.state.resume}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  />
                </Label>
              </ProfileInfo>
              <Password>
              <h3>Update Password</h3>
                <Label>
                  Current Password
                  <Input
                  name="currentPassword"
                  value={this.state.currentPassword}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="password"
                  />
                </Label>
                <Label>
                  New Password
                  <Input
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="password"
                  />
                </Label>
                <Label>
                  Retype New Password
                  <Input
                  name="rePassword"
                  value={this.state.rePassword}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="password"
                  />
                </Label>
            </Password>
            </LeftColumn>

            <RightColumn>
              <ContactInfo>
                <h3>Contact Info</h3>
                <Label width="48%">
                  First Name
                  <Input
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  />
                </Label>
                <Label width="48%">
                  Last Name
                  <Input
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  />
                </Label>
                <Label width="100%">
                  Email
                  <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="email"
                  />
                </Label>
                <Label width="48%">
                  Phone
                  <Input
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="phone"
                  />
                </Label>
                <Label width="48%">
                  Job Title
                  <Input 
                  name="jobTitle"
                  value={this.state.jobTitle}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  >
                  </Input>
                </Label>
                <Label width="100%">
                  Bio
                  <TextArea 
                  name="bio"
                  value={this.state.bio}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  ></TextArea>
                </Label>

              </ContactInfo>
              <Location>
              <h3>Location</h3>
                <Label width="48%">
                  Street
                  <Input
                  name="street"
                  value={this.state.street}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing} 
                  type="text"
                  />
                </Label>
                <Label width="48%">
                  City
                  <Input
                  name="city"
                  value={this.state.city}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  />
                </Label>
                <Label width="48%">
                  State
                  <Input
                  name="state"
                  value={this.state.state}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  />
                </Label>
                <Label width="48%">
                  Zip Code
                  <Input
                  name="zip"
                  value={this.state.zip}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="text"
                  />
                </Label>
                <div className="location-options">
                  <Label>
                  <CheckBox 
                  disabled={!this.state.editing}
                  type="checkbox" 
                  name="remote" 
                  value="Open to Remote Bobs"/> <span>Open to Remote Jobs</span>
                  </Label>
                  <Label>
                  <CheckBox 
                  disabled={!this.state.editing}
                  type="checkbox" 
                  name="relocation" 
                  value="Open to Relocation"/> <span>Open to Relocation</span>
                  </Label>
                </div>
              </Location>
              <Social>
              <h3>Social Links</h3>
                <Label>
                  LinkedIn
                  <Input
                  name="linkedIn"
                  value={this.state.linkedIn}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="url"
                  />
                </Label>
                <Label>
                  GitHub
                  <Input
                  name="github"
                  value={this.state.github}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="url"
                  />
                </Label>
                <Label>
                  Twitter
                  <Input
                  name="twitter"
                  value={this.state.twitter}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="url"
                  />
                </Label>
                <Label>
                  Personal Portfolio
                  <Input
                  name="portfolio"
                  value={this.state.portfolio}
                  onChange={this.changeHandler} 
                  disabled={!this.state.editing}
                  type="url"
                  />
                </Label>
              </Social>
            </RightColumn>
            <EditButtons right="20px" onClick={this.editSettings}>{this.state.editing ? 'Cancel' : 'Edit ' }</EditButtons>
            {this.state.editing ? <EditButtons right="120px">Save</EditButtons> : ''}
          </SettingsModalMain>
        </ModalContainer>
    );
  }
  componentDidMount() {

  }
}

export default SeekerSettings;
