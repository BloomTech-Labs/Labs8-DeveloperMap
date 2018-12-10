import React from 'react';
import { ModalMain, ModalContainer } from '../../styles/ModalGlobalStyle';
import styled from 'styled-components';

const AlertModal = props => {
  return (
    <AlertContainer
      onClick={props.toggleModal}
      data-type="modal-container"
      className={props.show ? '' : 'none'}
    >
      <ModalMain>
        <p>{props.message}</p>
      </ModalMain>
    </AlertContainer>
  );
};

export default AlertModal;

const AlertContainer = styled(ModalContainer)`
  &.none {
    display: none;
  }
`;
