import React from 'react';
import { ModalContainer } from '../../../styles/ModalGlobalStyle.js';
import { 
  Button,
  JobTitle,
  Location, 
  Input, 
  SignModalMain, 
  Password,
  FullName, 
  ContactInfo } from '../../../styles/SignIn_UpStyle';

class SeekerSignUp extends React.Component {
  state = {
    type: 'seekers',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    rePassword: ''
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    this.props.signUpNewUserWithEmailAndPassword(
      e, 
      this.state.type,
      this.state.email,
      this.state.phone, 
      this.state.firstName, 
      this.state.lastName, 
      this.state.jobTitle, 
      this.state.street, 
      this.state.city, 
      this.state.state, 
      this.state.zipCode, 
      this.state.password, 
      this.state.rePassword
    );

    this.state.password === this.state.rePassword ? this.setState({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      jobTitle: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      password: '',
      rePassword: '',
    }) : this.setState({password: '', rePassword: ''});
  }

  employerRegister = () => {
    this.props.history.push('/employer/signup');
  };

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          <h2>Job Seeker - Sign Up</h2>
          Are you an employer?{" "}
          <span style={{color:'blue', cursor:'pointer'}} onClick = {(e) => {
            this.employerRegister(e)
            }}>Sign Up Here</span>
          <form onSubmit={this.submitHandler}>
            <h4>Full Name</h4>
            <FullName>
              <Input
                name="firstName"
                placeholder="First"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandler}
                required
              />
              <Input
                name="lastName"
                placeholder="Last"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandler}
                required
              />
            </FullName>
            <h4>Contact Information</h4>
            <ContactInfo>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              />
              <Input
                name="phone"
                placeholder="Phone"
                type="text"
                value={this.state.phone}
                onChange={this.changeHandler}
                required
              />
            </ContactInfo>
            <h4>Location</h4>
            <Location>
              <Input
                name="street"
                placeholder="Street"
                type="text"
                value={this.state.street}
                onChange={this.changeHandler}
                required
              />
              <Input
                name="city"
                placeholder="City"
                type="text"
                value={this.state.city}
                onChange={this.changeHandler}
                required
              />

              <Input
                name="state"
                placeholder="State"
                type="text"
                value={this.state.state}
                onChange={this.changeHandler}
                required
              />

              <Input
                name="zipCode"
                placeholder="Zipcode"
                type="text"
                value={this.state.zipCode}
                onChange={this.changeHandler}
                required
              />
            </Location>
            <h4>Job Title</h4>
            <JobTitle>
              <Input
                name="jobTitle"
                type="text"
                value={this.state.jobTitle}
                onChange={this.changeHandler}
                required
              />
            </JobTitle>
            <h4>Create Password</h4>
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
            </Password>
            <Button>Sign Up</Button>            
          </form>          
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SeekerSignUp;