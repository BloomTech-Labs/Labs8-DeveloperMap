import styled from 'styled-components';
import map from './map.PNG'

export const GlobeContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;

.globe-filter {
  position: absolute;
  width: 75px;
  height: 75px;
  background: radial-gradient(circle at 25px 25px, rgba(92, 171, 255, 0.5), black);
  border-radius: 100%;
  background-size: 90px;
  z-index: 501;
}

.globe-spinning {
  width: 75px;
  height: 75px;
  background: ${map};
  border-radius: 100%;
  background-size: 180px;
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