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

// axios.defaults.withCredentials = true;

class SignUp extends React.Component {
  state = {
    userType: '',
    email: '',
  };

  /// ---- Auth Methods ----
  /// --- Firebase Auth Signup Method
  authorizeNewUser = (email, password, provider) => {
    if (provider === 'email') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          if (this.state.userType === 'employer') {
            this.props.history.push('/signup/employer');
          } else if (this.state.userType === 'seeker') {
            this.props.history.push('/signup/seeker');
          } else {
            this.props.history.push('/signup');
          }
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          this.props.toggleModal('Email Already in Use', errorMessage);
        });
    }

    if (provider === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          if (this.state.userType === 'employer') {
            this.props.history.push('/signup/employer');
          } else if (this.state.userType === 'seeker') {
            this.props.history.push('/signup/seeker');
          } else {
            this.props.history.push('/signup');
          }
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          this.props.toggleModal({ errorCode, errorMessage });
        });
    }

    if (provider === 'github') {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          if (this.state.userType === 'employer') {
            this.props.history.push('/signup/employer');
          } else if (this.state.userType === 'seeker') {
            this.props.history.push('/signup/seeker');
          } else {
            this.props.history.push('/signup');
          }
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorMessage, errorCode });
          this.props.toggleModal({ errorCode, errorMessage });
        });
    }
  };

  /// ---- Add New User To Database ----
  signUpNewUser = (
    e,
    type,
    email,
    phoneNumber,
    identifier1,
    identifier2,
    jobTitle,
    street,
    city,
    state,
    zipCode
  ) => {
    // Get idToken of Authorized User
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        const headers = { authorization: idToken };
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
            location = {
              street: street,
              city: city,
              state: state,
              zip: zipCode,
              coordinates: response.data.features[0].geometry.coordinates,
            };
            console.log({ location });

            // --- Determine User Type ---
            let user = {
              email,
              phoneNumber,
              location,
            };

            // Construct Object for Seeker Type Users
            if (type === 'seekers') {
              user = {
                ...user,
                firstName: identifier1,
                lastName: identifier2,
                jobTitle,
              };

              // Construct Object for Employer Type Users
            } else if (type === 'companies') {
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
                `https://intense-stream-29923.herokuapp.com/api/database/${type}/addUser`,
                { ...user },
                { headers }
              )
              .then(response => {
                this.props.toggleModal('Your Account Has Been Created');
                firebase
                  .auth()
                  .signInWithCustomToken(response.data.customToken)
                  .then(() => {
                    this.props.history.push('/');
                    return window.location.reload();
                  })
                  .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({ errorCode, errorMessage });
                    this.props.toggleModal(errorCode, errorMessage);
                  });
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  // Sets the user type so that the correct user type form is navigated to after signing up with Google Auth/3rd Party Auth.
  setUserType = type => {
    this.setState({ userType: type });
    this.props.history.push({
      pathname: '/signup/method',
      state: { ...this.state, userType: type },
    });
  };

  componentDidMount() {
    this.setState({ ...this.props.location.state });
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
      <ModalContainer data-type="modal-container">
        <SignModalMain width="100%">
          {/*'User Types' Component: User selects whether they are an employer or a seeker.*/}
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUpUserTypes {...props} setUserType={this.setUserType} />
            )}
          />

          {/*'Sign Up Types' Component: User selects the method that they would like to use for authentication (email + password, google auth, etc.).*/}
          <Route
            exact
            path="/signup/method"
            render={props => (
              <SignUpTypes
                {...props}
                userType={this.props.location.state.userType}
                currentSignedInUser={this.props.currentSignedInUser}
                authorizeNewUser={this.authorizeNewUser}
              />
            )}
          />

          {/*'Seeker Signup Form' Component: Creates a seeker in the database for the user.*/}
          <Route
            path="/signup/seeker"
            render={props => (
              <SeekerSignUp {...props} signUpNewUser={this.signUpNewUser} />
            )}
          />

          {/*'Employer Signup Form' Component: Creates a seeker in the database for the user.*/}
          <Route
            path="/signup/employer"
            render={props => (
              <EmployerSignUp {...props} signUpNewUser={this.signUpNewUser} />
            )}
          />
        </SignModalMain>
      </ModalContainer>
    );
  }
}

export default SignUp;
