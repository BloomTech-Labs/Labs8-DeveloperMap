import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { SignModalMain } from '../../styles/SignIn_UpStyle';
import { Route } from 'react-router-dom';
import SignUpTypes from './Types/SignUpTypes';
import SignUpUserTypes from './Types/SignUpUserTypes';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    repassword: ''
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    this.props.signUpNewUserWithEmailAndPassword(
      e, 
      this.state.email, 
    );
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          <Route exact path="/signuptest" component={SignUpTypes} />
          <Route path="/signuptest/usertype" component={SignUpUserTypes} />
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;