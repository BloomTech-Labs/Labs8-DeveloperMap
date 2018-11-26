import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle';
import profile from '../../images/avatar-icon.jpg';
import { 
  SaveButton,
  Label,
  Social,
  ProfileInfo,
  Location, 
  Input, 
  Select,
  TextArea,
  SettingsModalMain, 
  Password,
  LeftColumn,
  RightColumn,
  ContactInfo } from '../../styles/SettingsStyle';

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
    return (
        <ModalContainer data-type="modal-container">
          <SettingsModalMain>
            <LeftColumn>
              <ProfileInfo>
                <div>
                  <img alt='Profile Picture' src={profile}/>
                  <Label>
                  Upload New Profile Picture
                  <Input type="file" accept=".png,.jpg,.jpeg"/>
                </Label>
                </div>
                <h3>Resume</h3>
                <a href="#">Resume.pdf</a>
                <Label>
                  Upload New Resume
                  <Input type="file" accept=".pdf,.doc,.docx"/>
                </Label>
              </ProfileInfo>
              <Password>
              <h3>Update Password</h3>
                <Label>
                  Current Password
                  <Input/>
                </Label>
                <Label>
                  New Password
                  <Input/>
                </Label>
                <Label>
                  Retype New Password
                  <Input/>
                </Label>
            </Password>
            </LeftColumn>

            <RightColumn>
              <ContactInfo>
                <Label width="48%">
                  First Name
                  <Input/>
                </Label>
                <Label width="48%">
                  Last Name
                  <Input/>
                </Label>
                <Label width="100%">
                  Email
                  <Input/>
                </Label>
                <Label width="48%">
                  Phone
                  <Input/>
                </Label>
                <Label width="48%">
                  Expertise
                  <Select>
                    <option value="web-developer">Web Developer</option>
                    <option value="ux-designer">UX Designer</option>
                    <option value="ios-developer">iOS Developer</option>
                    <option value="andriod-developer">Android Developer</option>
                    <option value="machine-learning">Machine Learning</option>
                  </Select>
                </Label>
                <Label width="100%">
                  Bio
                  <TextArea></TextArea>
                </Label>

              </ContactInfo>
              <Location>
              <h3>Location</h3>
                <Label>
                  Street
                  <Input/>
                </Label>
                <Label>
                  City
                  <Input/>
                </Label>
                <Label>
                  State
                  <Input/>
                </Label>
                <Label>
                  Zip Code
                  <Input/>
                </Label>
              </Location>
              <Social>
              <h3>Social</h3>
                <Label>
                  <Input/>
                </Label>
                <Label>
                  <Input/>
                </Label>
              </Social>
            </RightColumn>
            <SaveButton>{this.state.editing ? 'Save Changes' : 'Edit ' }</SaveButton>
          </SettingsModalMain>
        </ModalContainer>
    );
  }
  componentDidMount() {

  }
}

export default SeekerSettings;
