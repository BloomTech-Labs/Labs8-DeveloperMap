import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import { Route } from 'react-router-dom';
import SeekerSettings from './SeekerSettings';
import EmployerSettings from './EmployerSettings';
import { SettingsModalMain } from '../../styles/SettingsStyle'

class Settings extends React.Component {
  render () {
    return (        
    <ModalContainer data-type="modal-container">
      <SettingsModalMain>
        {this.props.currentSignedInUser.role === "seeker" ? (<SeekerSettings {...this.props} />) : ""}
        {this.props.currentSignedInUser.role === "company" ? (<EmployerSettings {...this.props} />) : ""}
      </ SettingsModalMain>
    </ ModalContainer>
    )
  }
}

export default Settings;