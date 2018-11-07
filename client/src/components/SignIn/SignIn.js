import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle.js';
import {
  Label,
  Input,
  SignModalMain,
  RegisterButton,
} from '../../styles/SignIn_UpStyle';

class SignIn extends React.Component {
  //Basic state
  state = {
    email: '',
    password: '',
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickRegister = () => {
    this.props.history.push('/Signup');
  };

  render() {
    console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer>
        <SignModalMain>
          <h2>Sign In</h2>
          <form>
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
            <button>Sign In</button>
            <p>
              New here?{' '}
              <RegisterButton onClick={this.clickRegister}>
                Register here
              </RegisterButton>
            </p>
          </form>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignIn;
