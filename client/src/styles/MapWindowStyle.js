import styled from 'styled-components';
import marker from '../images/markerPic.png';

export const MapWindow = styled.div`
  .mapboxgl-ctrl-geocoder {
    width: 300px;
    border-radius: 20px;
    .geocoder-icon-search {
      top: 7px;
      left: 3%;
    }

    input[type='text'] {
      height: auto;
      width: 300px;
      border-radius: 20px;
      border: none;
      padding-left: 14%;
      &:focus {
        outline: none;
      }
    }
    .suggestions {
      background-color: white;
      border-radius: 4px;
      padding-inline-start: 20px;
      li {
        list-style-type: none;
        margin: 2px 0;
        cursor: pointer;
        &:hover {
          color: rgb(54, 154, 255);
        }
      }
      .active {
        color: rgb(119, 187, 255);
      }
    }
  }

  
  .mapboxgl-control-container {
    width: 100%;
    .mapboxgl-ctrl-top-right {
      margin-left: 3%;
      margin-top: 6px;
      right: initial;
      top: initial;
      left: initial;
    }
  }
  .geocoder-pin-right {
    display: none;
  }
`;

export const ShowMarker = styled.div`
  color: white;
  background-image: url(${marker});
  height: 40px;
  width: 47px;
  background-size: 40px;
`;

export const Pop = styled.div`
  display: none;

  &:hover {
    display: block;
    color: white;
    background-color: black;
  }
`;
