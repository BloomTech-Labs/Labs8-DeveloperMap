import styled from 'styled-components';
import { ModalMain } from '../../styles/ModalGlobalStyle';

export const AlertContainer = styled(ModalMain)`
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
  padding: 3% 2% 6% 2%;
  border-radius: 0px 0px 20px 20px;

  transition: all 0.5s ease-in;

  &.display {
    opacity: 1;
    animation: slide 1s ease-in;
    top: -10px;

    h3 {
      margin-top: 20px;
    }
  }

  p {
    margin-top: 15px;
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
      -webkit-transform: translateY(10px);
      transform: translateY(10px);
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

  .out-buttons{
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 2% 10%;
    justify-content: space-between;
    button {
      width: 70px;
      height: 30px;
      background-color: rgb(184, 15, 10);
      color: white;
      border: none;
      border-radius: 25px;
      margin: 10px 0 10px 0;
      box-shadow: 0 4px 2px -2px gray;
      outline: none;
      cursor: pointer;
      &:hover {
        background-color: rgba(184, 15, 10, 0.8);
      }
    }
  }
`;
