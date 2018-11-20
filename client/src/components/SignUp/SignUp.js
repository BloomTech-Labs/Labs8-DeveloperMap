import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { SignModalMain } from '../../styles/SignIn_UpStyle';
import { Route } from 'react-router-dom';
import SignUpTypes from './Types/SignUpTypes';
import SignUpUserTypes from './Types/SignUpUserTypes';
// import SeekerSignUp from './Forms/SeekerSignUp'; // Implement all signup functionality here eventually.
// import EmployerSignUp from './Forms/EmployerSignUp'; // Implement all signup functionality here eventually.

class SignUp extends React.Component {
  state = {
    userType: ''
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

  setUserType = (type) => {
  this.setState({userType:type});
  this.props.history.push('/signup/method')
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          <Route exact path="/signup/method" render={(props) => <SignUpTypes {...props} userType={this.state.userType}/>} />
          <Route exact path="/signup" render={(props) => <SignUpUserTypes {...props} setUserType={this.setUserType}/>} />
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;