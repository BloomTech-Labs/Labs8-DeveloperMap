import React, { Component } from 'react';
import firebase, { auth } from './firebase/firebase';
import axios from 'axios';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  NavBar,
  EmployerProfile,
  EmployerBilling,
  LandingPage,
  SeekerFavorites,
  Settings,
  SeekerProfile,
  SignIn,
  SignUp,
  NoUser,
  TutorialIntro,
  AlertModal,
} from './reducer';
import { AppStyle } from './styles/AppStyle';
import { GlobalStyle } from './styles/GlobalStyle';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSignedInUser: null,
      modal: {
        show: false,
        header: '',
        message: '',
      },
    };
  }

  toggleModal = (message = '', header = '') => {
    this.setState(prevState => {
      return {
        modal: {
          show: !prevState.modal.show,
          header,
          message,
        },
      };
    });

    setTimeout(() => {
      this.setState(prevState => {
        return {
          modal: {
            show: !prevState.modal.show,
            header: '',
            message: '',
          },
        };
      });
    }, 4000);
  };

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
      return (
        <AlertModal message={'Password does not match the confirm password.'} />
      );
    }

    // Check password length
    if (password.length <= 8) {
      return (
        <AlertModal message={'Password must be at least 8 characters long.'} />
      );
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
                this.toggleModal(response.data.message);
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
        this.props.toggleModal(errorMessage, errorCode);
      });
  };

  /// ---- Sign In Methods ----

  // Gets User Data for Current Signed In User
  // Adds Data to State
  getCurrentUserData = response => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(idTokenResult => {
        let userId = response.user.uid;
        let userType;
        let role;
        if (idTokenResult.claims.seeker) {
          userType = 'seekers';
          role = 'seeker';
        } else if (idTokenResult.claims.company) {
          userType = 'companies';
          role = 'company';
        } else {
          this.props.toggleModal(
            "We're missing some information from you. Please Sign Up!"
          );
          return this.props.history.push('/signup');
        }
        axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/${userType}/${userId}`
          )
          .then(response =>
            this.setState({
              currentSignedInUser: {
                ...response.data,
                role: role,
                uid: userId,
              },
            })
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

  signInUser = (e, email, password, provider) => {
    e.preventDefault();
    if (provider === 'email') {
      // Firebase Email Auth
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => this.getCurrentUserData(response))
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          this.props.toggleModal(errorMessage, errorCode);
        });
    }

    if (provider === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(response => this.getCurrentUserData(response))
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          this.props.toggleModal(errorMessage, errorCode);
        });
    }

    if (provider === 'github') {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(response => this.getCurrentUserData(response))
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          this.props.toggleModal(errorMessage, errorCode);
        });
    }
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
        this.props.toggleModal('Unable to Sign Out User');
      });
  };

  componentDidMount() {
    // --- User Session Check (Handled by Firebase) ---
    auth.onAuthStateChanged(currentSignedInUser => {
      if (currentSignedInUser) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            let userType;
            let role;

            if (idTokenResult.claims.seeker) {
              userType = 'seekers';
              role = 'seeker';
            } else if (idTokenResult.claims.company) {
              userType = 'companies';
              role = 'company';
            } else {
              return;
            }
            axios
              .get(
                `https://intense-stream-29923.herokuapp.com/api/database/${userType}/${
                  currentSignedInUser.uid
                }`
              )
              .then(response =>
                this.setState({
                  currentSignedInUser: {
                    ...response.data,
                    role: role,
                    uid: currentSignedInUser.uid,
                  },
                })
              )
              .catch(error => {
                if (!this.props.location.pathname.includes('signup')) {
                  this.props.history.push('/signup');
                }
              });
          })
          .catch(error => {
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
      <Route
        render={({ location }) => (
          <AppStyle
            className="App"
            onClick={e => this.closeModalOnOutsideClick(e)}
          >
            <GlobalStyle />

            <NavBar
              {...this.props}
              user={this.state.currentSignedInUser}
              signOut={this.signOutCurrentUser}
            />
            <AlertModal show={this.state.modal.show} modal={this.state.modal} />
            <Route
              path="/"
              render={props => (
                <LandingPage
                  {...props}
                  currentSignedInUser={this.state.currentSignedInUser}
                />
              )}
            />
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={{ enter: 500, exit: 500 }}
                classNames="fade"
              >
                <Switch location={location}>
                  <Route
                    path="/employer/:employerId"
                    render={props => (
                      <EmployerProfile
                        user={this.state.currentSignedInUser}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/seeker/:seekerId"
                    render={props => (
                      <SeekerProfile
                        currentSignedInUser={this.state.currentSignedInUser}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/settings"
                    render={props =>
                      this.state.currentSignedInUser && (
                        <Settings
                          {...props}
                          toggleModal={this.toggleModal}
                          currentSignedInUser={this.state.currentSignedInUser}
                        />
                      )
                    }
                  />

                  <Route path="/billing" component={EmployerBilling} />
                  <Route
                    path="/favorites/:seekerId/"
                    component={SeekerFavorites}
                  />
                  <Route
                    path="/signin"
                    render={props => (
                      <SignIn
                        {...props}
                        signOutCurrentUser={this.signOutCurrentUser}
                        currentSignedInUser={this.state.currentSignedInUser}
                        signInUser={this.signInUser}
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
                        toggleModal={this.toggleModal}
                        currentSignedInUser={this.state.currentSignedInUser}
                        toggleModal={this.toggleModal}
                      />
                    )}
                  />
                  <Route path="/nouser" component={NoUser} />
                  <Route path="/tutorial" component={TutorialIntro} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </AppStyle>
        )}
      />
    );
  }
}

export default withRouter(App);
