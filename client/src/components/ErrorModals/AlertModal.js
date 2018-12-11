import React from 'react';
import { ModalMain } from '../../styles/ModalGlobalStyle';
import styled from 'styled-components';

const AlertModal = props => {
  return (
    <AlertContainer className={props.show ? 'display' : ''}>
      <p>{props.message}</p>
    </AlertContainer>
  );
};

export default AlertModal;

const AlertContainer = styled(ModalMain)`
  opacity: 0;
  position: fixed;
  max-height: 200px;
  z-index: 5;
  height: 150px;
  width: 25%;
  max-height: 200px;
  z-index: 5;
  left: 40%;
  top: -50px;

  transition: all 0.5s ease-in;

  &.display {
    opacity: 1;
    animation: slide 1s ease-in;
    top: 0px;
  }

  @media (max-width: 661px) {
    width: 25%;
  }

  @media (max-width: 801px) {
    width: 25%;
  }

  p {
    margin-top: 60px;
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
