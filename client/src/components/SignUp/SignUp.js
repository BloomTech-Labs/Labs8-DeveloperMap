import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { Label, Input, SignModalMain } from '../../styles/SignIn_UpStyle';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer>
        <SignModalMain>
          <h2>Sign Up</h2>
          <form onSubmit={e => this.props.signUpNewUserWithEmailAndPassword(e, this.state.name, this.state.email, this.state.password, this.state.rePassword)}>
            <Label htmlFor="name">
              Full Name
              <Input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </Label>
            <Label htmlFor="email">
              Email
              <Input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </Label>
            <Label htmlFor="rePassword">
              Re-Enter Password
              <Input
                name="rePassword"
                type="text"
                value={this.state.rePassword}
                onChange={this.changeHandler}
              />
            </Label>
            <button>Sign Up</button>
          </form>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;
