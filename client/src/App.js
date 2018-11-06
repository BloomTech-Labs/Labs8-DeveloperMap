import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Developer Map</h1>
        <Route exact path='/' component={App}/>
        <Route path='/employer/:employerId' component={EmployerProfile}/>
        <Route path='/seeker/:seekerId' component={SeekerProfile}/>
        <Route path='/seeker/:seekerId/settings' component={SeekerSettings}/>
        <Route path='/employer/:employerId/settings' component={EmployerSettings}/>
        <Route path='/employer/:employerId/settings/billing' component={EmployerBilling}/>
        <Route path='/seeker/:seekerId/favorites' component={SeekerFavorites}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/Signup' component={Signup}/>
      </div>
    );
  }
}

export default withRouter(App);
