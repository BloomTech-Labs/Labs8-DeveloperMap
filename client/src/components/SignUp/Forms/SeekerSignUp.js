import React from 'react';
import firebase from 'firebase';
import { ModalContainer } from '../../../styles/ModalGlobalStyle.js';
import { 
  Button,
  JobTitle,
  Location, 
  Label, 
  Input, 
  AuthField,
  SignModalMain, 
  // Password,
  FullName, 
  ContactInfo } from '../../../styles/SignIn_UpStyle';

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
          Are you an employer?{" "}
          <span style={{color:'blue', cursor:'pointer'}} onClick = {(e) => {
            this.employerRegister(e)
            }}>Sign Up Here</span>
          <form onSubmit={this.submitHandler}>
            <h4>Full Name</h4>
            <AuthField>
              <Input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandler}
                required
              />
              <Label>
                First
              </Label>
              </AuthField>

            <AuthField>   
              <Input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandler}
                required
              />
              <Label>
                Last
              </Label>
            </AuthField>

            <h4>Contact Information</h4>
            <ContactInfo>
              {/* <Input
                name="email"
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              /> */}

            <AuthField>
              <Input
                name="phone"
                type="text"
                value={this.state.phone}
                onChange={this.changeHandler}
                required
              />
              <Label>
                Phone
              </Label>
            </AuthField>
            </ContactInfo>

            <h4>Location</h4>
            <Location>
            <AuthField>
              <Input
                name="street"
                type="text"
                value={this.state.street}
                onChange={this.changeHandler}
                required
              />
              <Label>
                Street
              </Label>
            </AuthField>
            
            <AuthField>
              <Input
                name="city"
                type="text"
                value={this.state.city}
                onChange={this.changeHandler}
                required
              />
              <Label>
                City
              </Label>
            </AuthField>
            
            <AuthField>
              <Input
                name="state"
                type="text"
                value={this.state.state}
                onChange={this.changeHandler}
                required
              />
              <Label>
                State
              </Label>
            </AuthField>
            
            <AuthField>
              <Input
                name="zipCode"
                type="text"
                value={this.state.zipCode}
                onChange={this.changeHandler}
                required
              />
              <Label>
                Zip Code
              </Label>
            </AuthField>

            </Location>
            <h4>Job Title</h4>
            <JobTitle>
            <AuthField>
              <Input
                name="jobTitle"
                type="text"
                value={this.state.jobTitle}
                onChange={this.changeHandler}
                required
              />
              <Label>
              Job Title
              </Label>
            </AuthField>

            </JobTitle>
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