import styled from 'styled-components';

export const MapWindow = styled.div`
  .mapboxgl-ctrl-geocoder {
    width: 20%;
    border-radius: 20px;
    .geocoder-icon-search {
      top: 7px;
      left: 3%;
    }

    input[type='text'] {
      height: auto;
      width: 100%;
      border-radius: 20px;
      border: none;
      padding: 10px 0 10px 14%;

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
      right: initial;
      top: initial;
      left: initial;
    }
  }
  .geocoder-pin-right {
    display: none;
  }

  .mapboxgl-popup {
    height: 50px;
  }
`;

export const ShowMarker = styled.img`
  height: 45px;
  width: 50px;
  cursor: pointer;
`;

export const CloseX = styled.p`
  position: absolute;
  right: 6%;
  top: 3px;
  font-family: sans-serif;
  font-size: 12px;
  cursor: pointer;
`;

export const PopupInfo = styled.div`
  padding: 5px 10px;
`;
