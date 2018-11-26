import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle';
import { 
  Button,
  Uploads,
  Location, 
  Input, 
  SettingsModalMain, 
  Password,
  FullName, 
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
        <ModalContainer>
          <SettingsModalMain>
            <Uploads>
              <div>Profile Picture</div>
              <div>Resume</div>
            </Uploads>
            <Password>
              <Label>
                <Input></Input>
              </Label>
              <Label>
                <Input></Input>
              </Label>
            </Password>
            <ContactInfo>
              <Label>
                <Input></Input>
              </Label>
              <Label>
                <Input></Input>
              </Label>
            </ContactInfo>
            <Location>
              <Label>
                <Input></Input>
              </Label>
              <Label>
                <Input></Input>
              </Label>
            </Location>
            <Social>
              <Label>
                <Input></Input>
              </Label>
              <Label>
                <Input></Input>
              </Label>
            </Social>
          </SettingsModalMain>
        </ModalContainer>
    );
  }
  componentDidMount() {

  }
}

export default SeekerSettings;
