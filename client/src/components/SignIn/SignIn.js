import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle.js';

class SignIn extends React.Component {
  //Basic state
  state = {
    email: '',
    password: '',
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer>
        <ModalMain>
          <h2>Sign In</h2>
          <form>
            <label htmlFor="email">
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </label>
            <label htmlFor="password">
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </label>
            <button>Sign In</button>
            <p>
              New here? <a href="/Signup">Register here</a>
            </p>
          </form>
        </ModalMain>
      </ModalContainer>
    );
  }
}

export default SignIn;
