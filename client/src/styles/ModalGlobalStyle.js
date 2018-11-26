import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const ModalMain = styled.div`
  background: rgb(255, 255, 255);
  position: fixed;
  top: 10%;
  left: 25%;
  width: 50%;
  height: auto;
  margin: 0 auto;
`;
