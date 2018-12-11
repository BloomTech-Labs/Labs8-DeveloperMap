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
  Loading,
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

  toggleModal = (header = '', message = '') => {
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
    }, 3000);
  };

  //// ----- Modal Control -----
  // --- Close Modal If Click Is Not On Modal ---
  closeModalOnOutsideClick = e => {
    if (e.target.dataset.type === 'modal-container') {
      this.props.history.push('/');
    }
  };

  //// ----- User Control Methods -----
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
          this.toggleModal(
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
          this.toggleModal(errorCode, errorMessage);
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
          this.toggleModal(errorCode, errorMessage);
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
          this.toggleModal(errorCode, errorMessage);
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
        this.toggleModal('User Successfully Signed Out');
        this.setState({ currentSignedInUser: null });

        // Close Modal
        this.props.history.push('/');
      })
      .catch(() => {
        this.toggleModal('Unable to Sign Out User');
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

            <Route
              exact
              path="/loading"
              render={props => <Loading {...props} />}
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
