import React from 'react';
import { ModalContainer } from '../../styles/ModalGlobalStyle.js';
import SeekerSettings from './SeekerSettings';
import EmployerSettings from './EmployerSettings';
import { SettingsModalMain } from '../../styles/SettingsStyle';

class Settings extends React.Component {
  render() {
    return (
      <ModalContainer data-type="modal-container">
        <SettingsModalMain className="modal">
          {this.props.currentSignedInUser.role === 'seeker' ? (
            <SeekerSettings
              {...this.props}
              toggleModal={this.props.toggleModal}
            />
          ) : (
            ''
          )}
          {this.props.currentSignedInUser.role === 'company' ? (
            <EmployerSettings
              {...this.props}
              toggleModal={this.props.toggleModal}
            />
          ) : (
            ''
          )}
        </SettingsModalMain>
      </ModalContainer>
    );
  }
}

export default Settings;
