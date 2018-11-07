import React, { Component } from 'react';

import { Route, NavLink, withRouter } from 'react-router-dom';
import {
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
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
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
        <Route path="/signin" component={SignIn} />
        <Route path="/Signup" component={SignUp} />
      </div>
    );
  }
}

export default withRouter(App);
