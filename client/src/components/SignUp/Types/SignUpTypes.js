import React from 'react';
import firebase from 'firebase';
import { Label, Input, Button, AuthField } from '../../../styles/SignIn_UpStyle';

class SignUpTypes extends React.Component {
  state = {
    email: '',
    password: '',
    rePassword: ''
  };

  // Form Input Control
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Redirect the user to their respective signup form if their type is user or seeker.
  // Redirect the user to choose their user type again, if their type is not user or seeker.
  userRedirect = () => {
    if (this.props.userType === 'employer') {
      this.props.history.push('/signup/employer')
    } else if (this.props.userType === 'seeker') {
      this.props.history.push('/signup/seeker')
    } else {
      this.props.history.push('/signup')
    }
  }


  // On Form Submit, Check User Type
  submitHandler = e => {  

    e.preventDefault();

    // --- Form Validation ---
    // Check to make sure that the password matches the confirm password
    if (this.state.password !== this.state.rePassword) {
      return alert('Password does not match the confirm password.');
    }

    // Check password length
    if (this.state.password.length <= 8) {
      return alert('Password must be at least 8 characters long.');
    }

    // Authorize User with Firebase OAuth2 Method
    this.props.authorizeNewUserWithEmailAndPassword(this.state.email, this.state.password, this.state.rePassword);
    this.userRedirect();
  }

  componentDidMount = () => {

    // If a user is signed in and on this page, re-direct th
    const user = firebase.auth().currentUser;
    if (user !== null) {
      if (this.props.currentSignedInUser) {
        this.props.history.push('/settings')
      } else {
      this.userRedirect();
    }
  }
}

  // Form is not currently functional. Just a placeholder until after the next merge.
  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <section>
          <form onSubmit={this.submitHandler}>
          <h2>Sign Up</h2>
            <AuthField>
              <Label htmlFor="email">
                Email
              </Label>  
              <Input
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.changeHandler}
                required
              />
            </AuthField>
            <AuthField>
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.changeHandler}
                required
              />
            </AuthField>
            <AuthField>
              <Label htmlFor="rePassword">
                Re-Enter Password
              </Label>
              <Input
                id="rePassword"
                name="rePassword"
                type="password"
                value={this.state.rePassword}
                onChange={this.changeHandler}
                required
              />
            </AuthField>
            <Button>Sign Up</Button>
            <div>
            {/*Third Party Auth Goes Here. Two Examples (Nonfunctional) Below: */}
            <div>{/*Google Logo Icon*/}</div><p>Sign Up With Google</p>
            <div>{/*GitHub Logo Icon*/}</div><p>Sign Up With GitHub</p>
            </div>
          </form>

      </section>
    );
  }
}

export default SignUpTypes;