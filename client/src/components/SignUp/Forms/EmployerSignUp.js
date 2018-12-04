import React from 'react';
import firebase from 'firebase';
import { ModalContainer } from '../../../styles/ModalGlobalStyle.js';
import { 
  Label, 
  Input, 
  Button,
  FullName,
  Location,
  ContactInfo,
  SignModalMain,
  AuthField 
} from '../../../styles/SignIn_UpStyle';

class EmployerSignUp extends React.Component {
  state = {
    type: 'companies',
    // email: '',
    phone: '',
    companyName: '',
    website: '',
    jobTitle: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // password: '',
    // rePassword: ''
  };

  changeHandler = e => {
      if (e.currentTarget.value === '') {
        e.currentTarget.classList.remove('active');
      } else {
        e.currentTarget.classList.add('active');
      }  

    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {

    e.preventDefault();

    const user = firebase.auth().currentUser;

    if (user) {
    this.props.signUpNewUser(
      e, 
      this.state.type, 
      user.email,
      this.state.phone,
      this.state.companyName, 
      this.state.website, 
      this.state.jobTitle, 
      this.state.street, 
      this.state.city, 
      this.state.state, 
      this.state.zipCode, 
      // this.state.password, 
      // this.state.rePassword
    );
    } else {
      this.props.history.push('/signup');
    }
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          <h2>Employer Sign Up</h2>
          <form onSubmit={this.submitHandler}>
          <FullName>
            <AuthField>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={this.state.companyName}
                onChange={this.changeHandler}
                required
              />
              <Label htmlFor="companyName">
                Company Name
              </Label>
            </AuthField>

            <AuthField>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={this.state.phone}
                onChange={this.changeHandler}
                required
              />
              <Label htmlFor="phone">
                Phone
              </Label>
            </AuthField>

              {/* <Label htmlFor="email">
                Email
                <Input
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  required
                />
              </Label> */}
          </FullName>

          <ContactInfo>
            <AuthField>
              <Input
                id="website"
                name="website"
                type="url"
                value={this.state.website}
                onChange={this.changeHandler}
                required
                />
              <Label htmlFor="website">
                Company Website
              </Label>
            </AuthField>
          </ContactInfo>

          <Location>
            <AuthField>
              <Input
                id="street"
                name="street"
                type="text"
                value={this.state.street}
                onChange={this.changeHandler}
                required
                />
              <Label htmlFor="street">
                Street
              </Label>
            </AuthField>

            <AuthField>
              <Input
                id="city"
                name="city"
                type="text"
                value={this.state.city}
                onChange={this.changeHandler}
                required
                />
              <Label htmlFor="city">
                City
              </Label>
            </AuthField>

            <AuthField>
              <Input
                id="state"
                name="state"
                type="text"
                value={this.state.state}
                onChange={this.changeHandler}
                required
                />
              <Label htmlFor="state">
                State
              </Label>
            </AuthField>

            <AuthField>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                value={this.state.zipCode}
                onChange={this.changeHandler}
                required
                />
              <Label htmlFor="zipCode">
                Zip Code
              </Label>
            </AuthField>
          </Location>

            {/* <Label htmlFor="password">
              Password
              <Input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="rePassword">
              Re-Enter Password
              <Input
                name="rePassword"
                type="password"
                value={this.state.rePassword}
                onChange={this.changeHandler}
                required
              />
            </Label> */}
            <Button width="100%">Sign Up</Button>
          </form>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default EmployerSignUp;