import React from 'react';
import { Label, Input } from '../../../styles/SignIn_UpStyle';

class SignUpTypes extends React.Component {
  state = {
    email: '',
    password: '',
    repassword: ''
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    if (this.props.userType === 'employer') {
      this.props.history.push('/employer/signup')
    } else if (this.props.userType === 'seeker') {
      this.props.history.push('/seeker/signup')
    } else {
      this.props.history.push('/signup')
    }
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <section>
          <h2>Sign Up</h2>
          <form onSubmit={this.submitHandler}>
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
          <div>
            <div>{/*Google Logo Icon*/}</div><p>Sign Up With Google</p>
          </div>
      </section>
    );
  }
}

export default SignUpTypes;