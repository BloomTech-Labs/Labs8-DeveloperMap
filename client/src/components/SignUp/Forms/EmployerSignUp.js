import React from 'react';
import firebase from 'firebase';
import { ModalContainer } from '../../../styles/ModalGlobalStyle.js';
import { Label, Input, SignModalMain } from '../../../styles/SignIn_UpStyle';

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
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {

    e.preventDefault();

    const user = firebase.auth().currentUser;

    if (user) {
    this.props.signUpNewUser(
      e, 
      this.state.type, 
      // this.state.email, 
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
            <Label htmlFor="companyName">
              Company Name
              <Input
                name="companyName"
                type="text"
                value={this.state.companyName}
                onChange={this.changeHandler}
                required
              />
            </Label>
            <Label htmlFor="website">
             Company Website
              <Input
                name="website"
                type="url"
                value={this.state.website}
                onChange={this.changeHandler}
                required
              />
            </Label>
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
            <button>Sign Up</button>
          </form>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default EmployerSignUp;