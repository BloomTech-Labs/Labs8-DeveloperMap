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

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSignedInUser: null
    }
  }

  /// ----- Modal Control -----

  // --- Close Modal If Click Is Not On Modal ---
  closeModalOnOutsideClick = (e) => {
    if (e.target.dataset.type === 'modal-container') {
      this.props.history.push('/');
    } 
  }

  /// ----- User Control Methods -----

  // --- Sign Up Methods ---
  signUpNewUserWithEmailAndPassword = (e, fullName, email, password, rePassword) => {
    e.preventDefault();

    // Check to make sure that the password matches the confirm password
    if (password !== rePassword) {
    return alert('Password does not match the confirm password.')
    }

    //Check password length
    if (password.length <= 8) {
    return alert('Password must be at least 8 characters long.')
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      // Deconstruct response body
      const { uid, email } = response.user;
      // Construct User Object
      const seeker = { "email":email, "firstName":fullName, "lastName":'test', "jobTitle":'test', "location":'test'}
      axios.post(`https://intense-stream-29923.herokuapp.com/api/database/seekers/addUser/${uid}`, {...seeker})
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((error) => console.log(error))

      this.setState({currentSignedInUser: seeker});
      this.props.history.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
      alert(errorMessage)
    });
  }

  // --- Sign In Methods ---
  signInWithEmailAndPassword = (e, email, password) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      axios.get(`https://intense-stream-29923.herokuapp.com/api/database/seekers/${response.user.uid}`)
      .then(response => this.setState({currentSignedInUser: response.data}))
      .catch(error => console.log(error));

      this.props.history.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
  }

  // --- Sign Out Method ---
  signOutCurrentUser = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
    .then(() => {
      alert('User Successfully Signed Out')
      this.setState({currentSignedInUser: null})
      this.props.history.push('/');
    })
    .catch(() => {
      alert('Unable to Sign Out User')
    })
  }

  componentDidMount() {
    // --- User Session Check (Handled by Firebase) ---
    auth.onAuthStateChanged(currentSignedInUser => {
      if(currentSignedInUser){
        axios.get(`https://intense-stream-29923.herokuapp.com/api/database/seekers/${currentSignedInUser.uid}`)
        .then(response => this.setState({currentSignedInUser: response.data}))
        .catch(error => console.log(error));
      } else {
        this.setState({ currentSignedInUser: null });
      }
      });
  }

  render() {
    return (
      <div className="App" onClick={e => this.closeModalOnOutsideClick(e)}>
        <NavBar { ...this.props }/>
        <Route path="/" component={LandingPage} />
        <Route path="/employer/:employerId" component={EmployerProfile} />
        <Route path="/seeker/:seekerId" component={SeekerProfile} />
        <Route path="/seeker/:seekerId/settings" component={SeekerSettings} />
        <Route
          path="/employer/:employerId/settings"
          component={EmployerSettings}
        />
        <Route
          path="/employer/:employerId/settings/billing"
          component={EmployerBilling}
        />
        <Route path="/seeker/:seekerId/favorites" component={SeekerFavorites} />
        <Route path="/signin" render={(props) => 
          <SignIn 
          {...props} 
          signInWithEmailAndPassword={this.signInWithEmailAndPassword} 
          signOutCurrentUser={this.signOutCurrentUser}
          currentSignedInUser={this.state.currentSignedInUser}
          />}
        />
        <Route path="/signup" render={(props) => 
          <SignUp {...props} signUpNewUserWithEmailAndPassword={this.signUpNewUserWithEmailAndPassword} />
        }/>
      </div>
    );
  }
}

export default withRouter(App);