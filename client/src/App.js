import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import './App.css';
import EmployerBilling from './components/Employer/BillingModal/EmployerBilling';
import EmployerSettings from './components/Employer/SettingEmployerModal/EmployerSettings';
import EmployerProfile from './components/EmployerProfile/EmployerProfile';
import SeekerFavorites from './components/Seeker/SeekerFavorites';
import SeekerSettings from './components/Seeker/SeekerSettings';
import SeekerProfile from './components/SeekerProfile/SeekerProfile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Developer Map</h1>
        
        <Route path='/employer/:employerId' component={EmployerProfile}/>
        <Route path='/seeker/:seekerId' component={SeekerProfile}/>
        <Route path='/seeker/:seekerId/settings' component={SeekerSettings}/>
        <Route path='/employer/:employerId/settings' component={EmployerSettings}/>
        <Route path='/employer/:employerId/settings/billing' component={EmployerBilling}/>
        <Route path='/seeker/:seekerId/favorites' component={SeekerFavorites}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/Signup' component={SignUp}/>
      </div>
    );
  }
}

export default withRouter(App);
