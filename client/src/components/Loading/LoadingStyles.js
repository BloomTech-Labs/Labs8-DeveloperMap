import styled from 'styled-components';
import { ModalMain, ModalContainer } from '../../styles/ModalGlobalStyle';
import map from './map-smol.png';

export const LoadingContainer = styled(ModalContainer)`
background: rgba(15,32,39,.75);
background: linear-gradient(to right, rgba(44,83,100,.9), rgba(32,58,67,.9), rgba(15,32,39,.9));

`

// Main Container
export const LoadingModalMain = styled(ModalMain)`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 30px 5% 30px 5%;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 2px;
  flex-wrap: wrap;
  background: none;
`;


// Spinning Globe
export const GlobeContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100%;
width: 100%;

// Gradient Filter
.globe-filter {
  position: absolute;
  width: 75px;
  height: 75px;
  background: radial-gradient(circle at 25px 25px,rgba(215,245,255,0.2 ),rgba(0,0,0,.3));
  border-radius: 100%;
  background-size: 90px;
  z-index: 501;
}

// Actual Globe
.globe-spinning {
  width: 75px;
  height: 75px;
  background: url(${map});
  border-radius: 100%;
  background-size: 180px;
  box-shadow: 0 5px 2px 1px rgba(44,83,100, 1), inset 0 0 3px 1px rgba(44,83,100, 1);
  animation: globe 3.5s infinite linear;
  z-index: 500;
}

@keyframes globe {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 180px;
  }
}
`