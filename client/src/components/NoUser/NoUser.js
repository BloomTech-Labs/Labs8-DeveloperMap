import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import { Header } from './NoUserStyle.js';

const NoUser = () => {
  return (
    <ModalContainer data-type="modal-container">
      <ModalMain>
        <Header>This user is no longer with us.</Header>
      </ModalMain>
    </ModalContainer>
  );
};

export default NoUser;
