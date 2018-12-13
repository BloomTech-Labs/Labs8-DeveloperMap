import React from 'react';
import { AlertContainer } from './AlertStyle';

const AlertModalSignout = (props) => {
  return (
    <AlertContainer className={props.signout ? 'display' : ''}>
      <h3>Are you sure you want to sign out?</h3>
      <div className='out-buttons'>
          <button onClick={props.signOutCurrentUser}>Yes</button>
          <button onClick={props.closeAlert}>No</button>
      </div>
    </AlertContainer>
  );
};

export default AlertModalSignout;