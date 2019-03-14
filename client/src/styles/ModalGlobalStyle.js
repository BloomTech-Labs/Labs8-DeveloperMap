import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const ModalMain = styled.div`
  background: rgb(255, 255, 255);
  width: 60%;
  height: auto;
  margin: 0 auto;
  border-radius: 20px;

  @media (max-width: 801px) {
    width: 70%;
  }

  @media (max-width: 661px) {
    width: 90%;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    margin: 2% 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    height: 50px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
