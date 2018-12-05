import React from 'react';
import firebase from 'firebase';
import { ModalContainer } from '../../../styles/ModalGlobalStyle.js';
import { 
  Button,
  Location, 
  Label, 
  Input, 
  AuthField,
  SignModalMain, 
  // Password,
  FullName 
} from '../../../styles/SignIn_UpStyle';

class SeekerSignUp extends React.Component {
  state = {
    type: 'seekers',
    // email: '',
    phone: '',
    firstName: '',
    lastName: '',
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
    const user = firebase.auth().currentUser;
    e.preventDefault();
    
    if (user) {
      this.props.signUpNewUser(
        e, 
        this.state.type,
        user.email, 
        this.state.phone, 
        this.state.firstName, 
        this.state.lastName, 
        this.state.jobTitle, 
        this.state.street, 
        this.state.city, 
        this.state.state, 
        this.state.zipCode, 
        // this.state.password,                      
        // this.state.rePassword
      );
    } else {
      console.log('nope');
    }
  }

  employerRegister = () => {
    this.props.history.push('/employer/signup');
  };

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain width="45%">
          <h2>Job Seeker - Sign Up</h2>
          {/* Are you an employer?{" "}
          <span style={{color:'blue', cursor:'pointer'}} onClick = {(e) => {
            this.employerRegister(e)
            }}>Sign Up Here</span> */}
          <form onSubmit={this.submitHandler}>
            <h4>Personal Information</h4>
            <FullName>
            <AuthField>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandler}
                required
              />
              <Label htmlFor="firstName">
                First
              </Label>
            </AuthField>

            <AuthField>   
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandler}
                required
              />
              <Label htmlFor="lastName">
                Last
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

            <AuthField>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={this.state.jobTitle}
                  onChange={this.changeHandler}
                  required
                />
                <Label htmlFor="jobTitle">
                Job Title
                </Label>
              </AuthField>
            </FullName>

            <h4>Location</h4>
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
            {/* <h4>Create Password</h4>
            <Password>
              <Input
                name="password"
                placeholder="Enter New Password"
                type="password"
                value={this.state.password}
                onChange={this.changeHandler}
                required
              />

              <Input
                name="rePassword"
                placeholder="Re-Enter Password"
                type="password"
                value={this.state.rePassword}
                onChange={this.changeHandler}
                required
              />
            </Password> */}
            <Button>Sign Up</Button>            
          </form>          
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SeekerSignUp;