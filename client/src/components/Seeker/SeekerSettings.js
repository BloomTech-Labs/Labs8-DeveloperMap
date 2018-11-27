import React from 'react';
import firebase, { auth } from '../../firebase/firebase';
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

  // Toggles whether or not the input fields are disabled or not.
  editSettings = e => {
    e.preventDefault();
    this.setState({ editing: !this.state.editing })
  }

  // Updates state when a field is changed.
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Reauthentication Abstraction
  reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Change Password
  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = auth.currentUser;
      user.updatePassword(newPassword).then(() => {
        alert("Password updated!");
      }).catch((error) => { 
        console.log(error);
        alert(error.message);
      });
    }).catch((error) => { 
      console.log(error); 
      alert(error.message);
    });
  }

  // Change Email
  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = auth.currentUser;
      user.updateEmail(newEmail).then(() => {
        alert("Email updated!");
      }).catch((error) => { 
        console.log(error); 
        alert(error.message);
      });
    }).catch((error) => { 
      console.log(error); 
      alert(error.message);
    });
  }

  submitHandler = e => {
    e.preventDefault();

    const currentPassword = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const rePassword = this.state.rePassword;
    const email = this.state.email;
    const emailCheck = this.state.emailCheck;
    const emailRegex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
    const passwordRegex = RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');

    // Check to make sure that the fields are being edited. This shouldn't be needed, but is an extra check.
    if (this.state.editing) {
      // Check to see if the user attempted to change the password.
      if (newPassword !== '' || rePassword !== '') {
        // Check to make sure that all of the password fields have been implemented.
        if (currentPassword && newPassword && rePassword) {
          // Check to make sure that the newPassword matches the rePassword. 
          if (newPassword !== rePassword) {
            return alert ('Your new password does not match the reentered password');
          }
          // Validate Password Strength (Medium Strength Test)
          if (passwordRegex.test(newPassword)) { 
            // Call the change password method.
            this.changePassword(currentPassword, newPassword);
          } else {
           return alert ('Your password must contain six characters or more and must have at least one lowercase and one uppercase alphabetical character ',
            'or at least one lowercase and one numeric character ', 
            'or at least one uppercase and one numeric character.')
          }
        } else {
          return alert ('All password fields must be filled out in order to change your password.')
        }
      }

      // Check to see if the email was edited.
      if (email !== emailCheck) {
        // Check to make sure that user has entered their password.
        if (currentPassword !== '') {
          if (emailRegex.test(email)) { 
          this.changeEmail(currentPassword, email);
          } else {
            return alert('We could not understand the format of your email address. Please enter a valid email address.')
          }
        } else {
          return alert ('Please enter your current password in the current password field in order to change your email address.')
        }
      }
      // const location = { 
      //   street: this.state.street, 
      //   city: this.state.city, 
      //   state: this.state.state, 
      //   zip: this.state.zip 
      // };
      // const userUpdateInformation = {  }
    } else {
     return alert('Unable to Make Changes');
    }

    // Reset the password fields after a successful update.
    this.setState({
     newPassword : '',
     currentPassword : '',
     rePassword : ''
    })
  }

  componentDidMount = () => {
    const user = this.props.currentSignedInUser;
    if (user) {
      this.setState({
        ...this.state, ...user, ...user.location, emailCheck: user.email
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
                  Email {this.state.editing ? <span style={{color:'red', fontSize:'12px'}}><br/>Please additionally enter your current password in the "Current Password Field"</span> : ""}
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
            {this.state.editing ? <EditButtons right="120px" onClick={this.submitHandler}>Save</EditButtons> : ''}
          </SettingsModalMain>
        </ModalContainer>
    );
  }
}

export default SeekerSettings;
