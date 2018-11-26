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
overflow-y: scroll;
background: rgba(0, 0, 0, 0.6);
z-index: 10;
`;

export const ModalMain = styled.div`
  background: rgb(255, 255, 255);
  width: 50%;
  height: auto;
  margin: 0 auto;
`;
