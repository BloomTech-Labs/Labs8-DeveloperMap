import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { Label, Input, SignModalMain } from '../../styles/SignIn_UpStyle';

class SignUpUserTypes extends React.Component {
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
          <section> 
            <h2>Are You a...</h2>
            <button>Job Seeker</button>
            <button>Employer</button>
          </section>
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUpUserTypes;