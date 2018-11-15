import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { Label, Input, SignModalMain } from '../../styles/SignIn_UpStyle';

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
          <h2>Job Seeker Sign Up</h2>
          <form onSubmit={this.submitHandler}>
            <Label htmlFor="firstName">
              First Name
              <Input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="lastName">
              Last Name
              <Input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="email">
              Email
              <Input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="phone">
              Phone
              <Input
                name="phone"
                type="text"
                value={this.state.phone}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="jobTitle">
              Job Title
              <Input
                name="jobTitle"
                type="text"
                value={this.state.jobTitle}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="street">
              Street
              <Input
                name="street"
                type="text"
                value={this.state.street}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="city">
              City
              <Input
                name="city"
                type="text"
                value={this.state.city}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="state">
              State
              <Input
                name="state"
                type="text"
                value={this.state.state}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="zipCode">
              Zip Code
              <Input
                name="zipCode"
                type="text"
                value={this.state.zipCode}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="password">
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
            </Label>
            <button>Sign Up</button>
          </form>
          Are you an employer?{" "}
          <span style={{color:'blue', cursor:'pointer'}} onClick = {(e) => {
            this.employerRegister(e)
            }}>Sign Up Here</span>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SeekerSignUp;