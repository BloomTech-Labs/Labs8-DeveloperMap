import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { SignModalMain } from '../../styles/SignIn_UpStyle';
import { Route } from 'react-router-dom';
import SignUpTypes from './Types/SignUpTypes';
import SignUpUserTypes from './Types/SignUpUserTypes';
import SeekerSignUp from './Forms/SeekerSignUp';
import EmployerSignUp from './Forms/EmployerSignUp';

class SignUp extends React.Component {
  state = {
    userType: '', 
    email: ''
  };

  // Sets the user type so that the correct user type form is navigated to after signing up with Google Auth/3rd Party Auth.
  setUserType = (type) => {
  this.setState({userType:type});
  this.props.history.push('/signup/method')
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain>
          {/*'Sign Up Types' Component: User selects the method that they would like to use for authentication (email + password, google auth, etc.).*/}
          <Route exact path="/signup/method" render={ (props) => 
          <SignUpTypes {...props} userType={this.state.userType}/>
          }/>

          {/*'User Types' Component: User selects whether they are an employer or a seeker.*/}
          <Route exact path="/signup" render={ (props) => 
          <SignUpUserTypes {...props} setUserType={this.setUserType}/>
          }/>

          {/*'Seeker Signup Form' Component: Creates a seeker in the database for the user.*/}
          <Route
              path="/signup/seeker"
              render={props => (
                <SeekerSignUp
                  {...props}
                  signUpNewUserWithEmailAndPassword={
                    this.props.signUpNewUserWithEmailAndPassword
                  }
                />
              )}
            />

          {/*'Employer Signup Form' Component: Creates a seeker in the database for the user.*/}          
          <Route
            path="/signup/employer"
            render={props => (
              <EmployerSignUp
                {...props}
                signUpNewUserWithEmailAndPassword={
                  this.props.signUpNewUserWithEmailAndPassword
                }
              />
            )}
          />

        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;