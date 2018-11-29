import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
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

  /// ---- Auth Methods ----
  /// --- Firebase Auth Signup Method
  authorizeNewUserWithEmailAndPassword = (email, password, rePassword) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User Authorized')
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        alert(error);
      });
  }

  /// ---- Add New User To Database ----
  signUpNewUser = (uid, email, phoneNumber, jobTitle, identifier1, identifier2, street, city, state, zipCode) => {
    const headers = {}

    // Get idToken of Authorized User
    firebase.auth().currentUser.getIdToken(true)
    .then(idToken => {
      headers = {authorization: idToken}

      // Construct Location Object
      let location = {};
      let accessToken =
        'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';
      let addressString = street.concat(' ', city, ' ', state, ' ', zipCode);
      let mapboxGeocodingAPIURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=${accessToken}`;

      // Get Location Coordinates and Return Promise
      axios
        .get(mapboxGeocodingAPIURL)
        .then(response => {
          console.log(response.data.features[0].geometry.coordinates);
          location = {
            street: street,
            city: city,
            state: state,
            zip: zipCode,
            coordinates: response.data.features[0].geometry.coordinates,
          };

              // --- Determine User Type ---
              let user = {
                uid,
                email,
                phoneNumber,
                location,
              };

              // Construct Object for Seeker Type Users
              if (this.state.userType === 'seeker') {
                user = {
                  ...user,
                  firstName: identifier1,
                  lastName: identifier2,
                  jobTitle,
                };

                // Construct Object for Employer Type Users
              } else if (this.state.userType === 'employer') {
                user = {
                  ...user,
                  companyName: identifier1,
                  companyWebsite: identifier2,
                };
              } else {
                return console.log('Invalid user type!');
              }

              // Create User In Database
              axios
                .post(
                  `https://intense-stream-29923.herokuapp.com/api/database/${this.state.userType}s/addUser`,
                  { ...user },
                  { headers }
                )
                .then(response => {
                  console.log(response.data);
                  alert(response.data.message);
                })
                .catch(error => console.log(error));


              // Close Modal
              this.props.history.push('/');

          })
          .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
  }

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
          
          {/*'User Types' Component: User selects whether they are an employer or a seeker.*/}
          <Route exact path="/signup" render={ (props) => 
            <SignUpUserTypes {...props} setUserType={this.setUserType}/>
          }/>

          {/*'Sign Up Types' Component: User selects the method that they would like to use for authentication (email + password, google auth, etc.).*/}
          <Route exact path="/signup/method" render={ (props) => 
              <SignUpTypes 
                {...props} 
                userType={this.state.userType}
                currentSignedInUser={this.props.currentSignedInUser}
                authorizeNewUserWithEmailAndPassword = {this.authorizeNewUserWithEmailAndPassword} 
              />
            }
          />

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