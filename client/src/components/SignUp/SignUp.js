import React from 'react';

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
        <ModalMain>
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="name">
              Full Name
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </label>
            <label htmlFor="rePassword">
              Re-Enter Password
              <input
                name="rePassword"
                type="text"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </label>
            <button>Sign Up</button>
          </form>
        </ModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;
