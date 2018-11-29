import React, { Component } from 'react';
import firebase, { auth } from './firebase/firebase';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';
import {
  NavBar,
  EmployerProfile,
  EmployerBilling,
  EmployerSettings,
  LandingPage,
  SeekerFavorites,
  SeekerSettings,
  SeekerProfile,
  SignIn,
  SignUp,
} from './reducer';

import { GlobalStyle } from './styles/GlobalStyle';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSignedInUser: null,
    };
  }

  //// ----- Modal Control -----
  // --- Close Modal If Click Is Not On Modal ---
  closeModalOnOutsideClick = e => {
    if (e.target.dataset.type === 'modal-container') {
      this.props.history.push('/');
    }
  };

  //// ----- User Control Methods -----
  /// ---- Sign Up Methods ----
  signUpNewUserWithEmailAndPassword = (
    e,
    type,
    email,
    phone,
    identifier1,
    identifier2,
    jobTitle,
    street,
    city,
    state,
    zipCode,
    password,
    rePassword
  ) => {
    e.preventDefault();

    // --- Form Validation ---
    // Check to make sure that the password matches the confirm password
    if (password !== rePassword) {
      return alert('Password does not match the confirm password.');
    }

    // Check password length
    if (password.length <= 8) {
      return alert('Password must be at least 8 characters long.');
    }

    // --- Firebase Auth Method ---
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async response => {
        // Deconstruct response body
        const { uid, email } = response.user;
        const token = await response.user.getIdToken(true);
        const headers = { authorization: token };

        // --- Add User to Database ---
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
              uid: uid,
              email: email,
              phoneNumber: phone,
              location: location,
            };

            // Construct Object for Seeker Type Users
            if (type === 'seekers') {
              user = {
                ...user,
                firstName: identifier1,
                lastName: identifier2,
                jobTitle: jobTitle,
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
                console.log(response.data);
                alert(response.data.message);
              })
              .catch(error => console.log(error));

            // Add the Current User to State
            this.setState({ currentSignedInUser: user });

            // Close Modal
            this.props.history.push('/');
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        alert(error);
      });
  };

  signUpWithGoogleAuthentication = () => {
    // --- Google Auth Method ---
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        // --- Add User to Database ---
        // Construct Location Object
        let location = {};
        let tempUser = response;
        let accessToken =
          'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';
        let addressString = 'utah';
        let mapboxGeocodingAPIURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=${accessToken}`;

        // Get Location Coordinates and Return Promise
        axios
          .get(mapboxGeocodingAPIURL)
          .then(response => {
            location = {
              street: 'street',
              city: 'city',
              state: 'utah',
              zip: 'zipCode',
              coordinates: response.data.features[0].geometry.coordinates,
            };

            let user = {
              uid: tempUser.user.uid,
              email: tempUser.user.email,
              phoneNumber: tempUser.user.phone,
              location: location,
              firstName: 'identifier1',
              lastName: 'identifier2',
              jobTitle: 'jobTitle',
            };

            // Create User In Database
            axios
              .post(
                `https://intense-stream-29923.herokuapp.com/api/database/seekers/addUser/${
                  tempUser.user.uid
                }`,
                { ...user }
              )
              .then(response => {
                console.log(response.data);
                alert(response.data.message);

                axios
                  .get(
                    `https://intense-stream-29923.herokuapp.com/api/database/seekers/${
                      tempUser.user.uid
                    }`
                  )
                  .then(() => {
                    this.setState({ currentSignedInUser: tempUser.data });
                    this.props.history.push('/');
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));

        // Close Modal
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  /// ---- Sign In Methods ----
  signInWithEmailAndPassword = (e, email, password) => {
    e.preventDefault();

    // --- Firebase Auth Method ---
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/seekers/${
              response.user.uid
            }`
          )
          .then(response =>
            this.setState({ currentSignedInUser: response.data })
          )
          .catch(error => console.log(error));

        // Close Modal
        this.props.history.push('/');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  // --- Sign Out Method ---
  signOutCurrentUser = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('User Successfully Signed Out');
        this.setState({ currentSignedInUser: null });

        // Close Modal
        this.props.history.push('/');
      })
      .catch(() => {
        alert('Unable to Sign Out User');
      });
  };

  componentDidMount() {
    // --- User Session Check (Handled by Firebase) ---
    auth.onAuthStateChanged(currentSignedInUser => {
      if (currentSignedInUser) {
        firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {

          let userType;

           // Confirm the user is an Admin.
           if (idTokenResult.claims.seeker) {
            userType = "seekers";
          } else if (idTokenResult.claims.company) {
            userType = "companies";
          } else {
            return console.log('Invalid user type!')
          }
          axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/${userType}/${
              currentSignedInUser.uid
            }`
          )
          .then(response => {
            this.setState({ currentSignedInUser: { ...response.data, role: userType } })
          }
          )
          .catch(error => {
            console.log(error)
            if (!this.props.location.pathname.includes('signup'))
            this.props.history.push('/signup')
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        this.setState({ currentSignedInUser: null });
      }
    });
  }

  // /employer/:employerId/settings

  render() {
    return (
      <div className="App" onClick={e => this.closeModalOnOutsideClick(e)}>
        <GlobalStyle />

        <NavBar {...this.props} user={this.state.currentSignedInUser} signOut={this.signOutCurrentUser}/>
        <Route path="/" render={props => <LandingPage {...props} />} />
        <Route path="/employer/:employerId" component={EmployerProfile} />
        <Route path="/seeker/:seekerId" component={SeekerProfile} />
        <Route path="/settings" render={(props) => 
          this.state.currentSignedInUser &&
          <SeekerSettings
          {...props} 
          currentSignedInUser={this.state.currentSignedInUser} 
          /> 
        }
        />
        {/* <Route
          path="/employer/:employerId/settings"
          component={EmployerSettings}
        /> */}
        <Route path="/billing" component={EmployerBilling} />
        <Route path="/seeker/:seekerId/favorites" component={SeekerFavorites} />
        <Route
          path="/signin"
          render={props => (
            <SignIn
              {...props}
              signInWithEmailAndPassword={this.signInWithEmailAndPassword}
              signOutCurrentUser={this.signOutCurrentUser}
              currentSignedInUser={this.state.currentSignedInUser}
              signUpWithGoogleAuthentication={
                this.signUpWithGoogleAuthentication
              }
            />
          )}
        />
        <Route
          path="/signup"
          render={props => (
            <SignUp
              {...props}
              signUpNewUserWithEmailAndPassword={
                this.signUpNewUserWithEmailAndPassword
              }
              currentSignedInUser={this.state.currentSignedInUser}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
