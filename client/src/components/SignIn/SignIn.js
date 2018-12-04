import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import {
  Label,
  Input,
  Button,
  GoogleAuthButton,
  SignModalMain,
  AuthField,
} from '../../styles/SignIn_UpStyle';
import firebase from '../../firebase/firebase.js';
import axios from 'axios';

class SignIn extends React.Component {
  //Basic state
  state = {
    email: '',
    password: '',
    userSignin: false,
  };

  changeHandler = e => {
    if (e.currentTarget.value === '') {
      e.currentTarget.classList.remove('active');
    } else {
      e.currentTarget.classList.add('active');
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  clickRegister = () => {
    this.props.history.push('/signup');
  };

  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     axios
    //       .get(
    //         `https://intense-stream-29923.herokuapp.com/api/database/seekers/${
    //           user.uid
    //         }`
    //       )
    //       .then(res => {
    //         res.data.userSignin = true;
    //         this.setState(res.data);
    //       });
    //   } else {
    //     // No user is signed in.
    //   }
    // });
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state)
    const { location, firstName, jobTitle, email } = this.state;

    return (
      <ModalContainer data-type="modal-container">
        {this.state.userSignin && (
          <SignModalMain width="21%">
            <h2>Hello, {firstName}</h2>
            <h2>JobTitle: ${jobTitle}</h2>
            <h2>Email: {email}</h2>
            {location.city && <h2>City: {location.city}</h2>}
            {location.street && <h2>Street: {location.street}</h2>}
            {location.zip && <h2>Zip: {location.zip}</h2>}
            <button
              onClick={e => {
                this.props.signOutCurrentUser(e);
              }}
            >
              Sign Out
            </button>
          </SignModalMain>
        )}

        {!this.state.userSignin && (
          <SignModalMain>
            <h2>
              {this.props.currentSignedInUser
                ? `Welcome ${this.props.currentSignedInUser.firstName}`
                : 'Sign In'}
            </h2>
            <form
              onSubmit={e => {
                this.props.signInWithEmailAndPassword(
                  e,
                  this.state.email,
                  this.state.password
                );
                this.setState({ email: '', password: '' });
                this.props.history.push('/');
              }}
            >
            <AuthField>
              <Input
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              />
              <Label htmlFor="email">
                Email
              </Label>
            </AuthField>


              <AuthField>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  required
                />
                <Label htmlFor="password">
                  Password
                </Label>
              </AuthField>
              <Button>Sign In</Button>
              - or -
              <Button onClick={e => {e.preventDefault(); this.props.history.push('/signup')}}>Register</Button>
              <GoogleAuthButton />

            </form>
          </SignModalMain>
        )}
      </ModalContainer>
    );
  }
}

export default SignIn;
