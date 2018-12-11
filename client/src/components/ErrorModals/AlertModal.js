import React from 'react';
import { ModalMain } from '../../styles/ModalGlobalStyle';
import styled from 'styled-components';

const AlertModal = props => {
  return (
    <AlertContainer className={props.show ? 'display' : ''}>
      <h3>{props.modal.header}</h3>
      <p>{props.modal.message}</p>
    </AlertContainer>
  );
};

export default AlertModal;

const AlertContainer = styled(ModalMain)`
  position: fixed;
  background: rgb(38, 37, 49);
  color: rgb(255, 255, 255);
  left: 37%;
  top: -50px;
  opacity: 0;
  max-height: 200px;
  height: 150px;
  width: 25%;
  z-index: 100;
  padding: 3% 2%;

  transition: all 0.5s ease-in;

  &.display {
    opacity: 1;
    animation: slide 1s ease-in;
    top: 0px;
  }

  h3 {
    margin-bottom: 15px;
  }

  @media (max-width: 661px) {
    width: 25%;
  }

  @media (max-width: 801px) {
    width: 25%;
  }

  @keyframes slide {
    0% {
      -webkit-transform: translateY(-30px);
      transform: translateY(-30px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
    33% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    66% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
`;
