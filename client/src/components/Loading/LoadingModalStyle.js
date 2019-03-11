import styled from 'styled-components';
import SeekerLoad from './SeekerLoad';

export const Timeline = styled.div`
  padding: 10px 0;

  .animate {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    position: relative;

    margin: 20px 0;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export const SeekerLoadStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-container {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }

  .name-container,
  .location-container {
    width: 50%;
    height: 25px;
    margin: 10px 0;
  }

  .info-container {
    height: 105px;
    width: 50%;
    border-radius: 20px;
    margin: 10px 0 20px 0;
  }
`;
