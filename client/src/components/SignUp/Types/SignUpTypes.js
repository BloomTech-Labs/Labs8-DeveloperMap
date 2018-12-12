import React from 'react';
import firebase from 'firebase';
import {
  Label,
  Input,
  Button,
  AuthField,
  GoogleAuthButton,
  GithubAuthButton,
  Valid,
} from '../../../styles/SignIn_UpStyle';

class SignUpTypes extends React.Component {
  state = {
    email: '',
    password: '',
    rePassword: '',
    show: false,
    message: '',
  };

  // Form Input Control
  changeHandler = e => {
    if (e.currentTarget.value === '') {
      e.currentTarget.classList.remove('active');
    } else {
      e.currentTarget.classList.add('active');
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  // Redirect the user to their respective signup form if their type is user or seeker.
  // Redirect the user to choose their user type again, if their type is not user or seeker.
  userRedirect = () => {
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
      if (this.props.userType === 'employer') {
        this.props.history.push('/signup/employer');
      } else if (this.props.userType === 'seeker') {
        this.props.history.push('/signup/seeker');
      } else {
        this.props.history.push('/signup/method');
      }
    } else {
      return;
    }
  };

  googleHandler = e => {
    e.preventDefault();

    this.props.authorizeNewUser(
      this.state.email,
      this.state.password,
      'google'
    );
  };

  githubHandler = e => {
    e.preventDefault();

    this.props.authorizeNewUser(
      this.state.email,
      this.state.password,
      'github'
    );
  };

  // On Form Submit, Check User Type
  submitHandler = e => {
    e.preventDefault();
    
    // --- Form Validation ---
    // Check to make sure that the passwords match and they are the correct length
    if (this.state.password.length <= 8) {
      this.setState({
        show: true,
        message: 'Passwords must be at least 8 characters long.',
      });
    } else if (this.state.password !== this.state.rePassword) {
      this.setState({
        show: true,
        message: 'Passwords do not match, confirm password.',
      });
    } else {
      {
        this.setState({ show: false, message: '' });
      }
    }

    // Authorize User with Firebase OAuth2 Method
    this.props.authorizeNewUser(this.state.email, this.state.password, 'email');
    this.userRedirect();
  };

  componentDidMount = () => {
    // If a user is signed in and on this page, re-direct them to settings
    const user = firebase.auth().currentUser;
    if (user !== null) {
      if (this.props.currentSignedInUser) {
        this.props.history.push('/settings');
      } else {
        this.userRedirect();
      }
    }
  };

  // Form is not currently functional. Just a placeholder until after the next merge.
  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <section>
        <form onSubmit={this.submitHandler}>
          <h2>Sign Up</h2>
          <AuthField>
            <Input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.changeHandler}
              required
            />
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
          </AuthField>
          <AuthField>
            <Input
              id="rePassword"
              name="rePassword"
              type="password"
              value={this.state.rePassword}
              onChange={this.changeHandler}
              required
            />
            <Label htmlFor="rePassword">Re-Enter Password</Label>
          </AuthField>

          <Valid show={this.state.show}>{this.state.message}</Valid>
          <Button type="submit">Sign Up</Button>
          - or -
          {/* Third Party Auth */}
          <GoogleAuthButton type="button" onClick={e => this.googleHandler(e)} />
          <GithubAuthButton type="button" onClick={e => this.githubHandler(e)} />

        </form>
      </section>
    );
  }
}

export default SignUpTypes;
