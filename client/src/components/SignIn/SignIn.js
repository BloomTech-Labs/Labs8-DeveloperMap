import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import {
  Label,
  Input,
  SignModalMain,
  RegisterButton,
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
    this.setState({ [e.target.name]: e.target.value });
  };

  clickRegister = () => {
    this.props.history.push('/signup');
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/seekers/${
              user.uid
            }`
          )
          .then(res => {
            res.data.userSignin = true;
            this.setState(res.data);
          });
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state)
    const { location, firstName, jobTitle, email } = this.state;

    return (
      <ModalContainer data-type="modal-container">
        {this.state.userSignin && (
          <SignModalMain>
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
              }}
            >
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
              <button>Sign In</button>
              <p>
                New here?{' '}
                <RegisterButton onClick={this.clickRegister}>
                  Register here
                </RegisterButton>
              </p>
            <RegisterButton onClick={this.props.signUpWithGoogleAuthentication}>
                Sign in with Google.
              </RegisterButton>
            </form>
            <button
              onClick={e => {
                this.props.signOutCurrentUser(e);
              }}
              style={{
                display: this.props.currentSignedInUser ? 'block' : 'none'
              }}
            >
              Sign Out
            </button> 
          </SignModalMain>
        )}

      </ModalContainer>
    );
  }
}

export default SignIn;
