import styled from 'styled-components';

export const MapWindow = styled.div`
  .mapboxgl-ctrl-geocoder {
    width: 100%;
    border-radius: 20px;

    @media (max-width: 1050px) {
      min-width: 200px;
    }

    @media (max-width: 350px) {
      min-width: 170px;
    }
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
      margin-left: Calc(10% + 10px);
      margin-top: 4px;
      right: initial;
      top: initial;
      left: initial;

      @media (max-width: 1050px) {
        margin-left: Calc(3% + 10px);
      }

      .mapboxgl-ctrl {
        margin: 10px 0 0 0;
      }
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
  display: ${props => (props.show ? 'block' : 'none')};
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

export const LogoImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: auto;
  margin: 2%;
`;

export const PinKey = styled.img`
  width: 45px;
  height: 45px;
`;

export const KeyBox = styled.div`
  width: 200px;
  height: 150px;
  background-color: rgba(232, 232, 232, 0.85);
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 4% 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 2%;
  border-radius: 2px;
  z-index: 5;
  .key {
    display: flex;
    align-items: center;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: lighter;
    width: 80px;
  }
`;

export const ToggleKnob = styled.label`
  position: relative;
  width: 30px;
  height: 12px;
  background-color: ${props =>
    props.children.props.checked
      ? props.children.props.id === 'company'
        ? 'rgb(207, 149, 4)'
        : 'rgb(122, 38, 38)'
      : 'rgb(128, 128, 128)'};
  margin: 20px 0;
  border-radius: 5px;
  z-index: 10;
  margin: 0 10px;
  cursor: pointer;

  input[type='checkbox'] {
    outline: none;
    appearance: none;
    display: block;
    width: 17px;
    height: 17px;
    border-radius: 50%;

    transition: all 0.5s ease;
    cursor: pointer;
    position: absolute;
    top: -5px;
    left: 15px;

    background: rgb(37, 36, 48);
  }

  input[type='checkbox']:checked {
    left: -5px;
  }
`;
