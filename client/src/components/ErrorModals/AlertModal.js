import React from 'react';
import { AlertContainer } from './AlertStyle';

const AlertModal = props => {
  const { header, message } = props.modal;
  return (
    <AlertContainer className={props.show ? 'display' : ''}>
      <h3>{header}</h3>
      {message ? <p>{message}</p> : ''}
    </AlertContainer>
  );
};

export default AlertModal;
