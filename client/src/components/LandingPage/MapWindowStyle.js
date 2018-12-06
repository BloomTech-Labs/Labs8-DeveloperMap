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

  .mapboxgl-popup-content {
    padding: 0;
    border-radius: 20px;
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
  right: -7px;
  top: -3px;
  font-size: 19px;
  cursor: pointer;
  background-color: rgb(37, 36, 48);
  color: white;
  border-radius: 50%;
  padding: 3px 6px;
`;

export const PopupInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  padding: 12px 10px;

  div {
    text-align: center;
    padding-left: 2%;

    h4 {
      margin-bottom: 7px;
    }

    p {
      font-size: 0.9rem;
    }

    .jobTitle {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      p {
        padding-left: 2px;
      }
    }

    .link {
      color: rgb(30, 144, 255);
      cursor: pointer;
    }
  }
`;

export const PopupImg = styled.div`
  display: ${props => (props.image ? 'block' : 'none')};
  width: 60px;
  height: 60px;
  background-image: ${props => (props.image ? `url(${props.image})` : 'null')};
  background-size: 60px auto;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: top;
`;

export const LogoImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: auto;
  margin: 2%;
  @media (max-width: 550px) {
    margin: 50px auto;
    padding-left: 30%;
    width: 250px;
  }
`;

export const PinKey = styled.img`
  width: 45px;
  height: 45px;
`;

export const KeyBox = styled.div`
  width: 200px;
  height: 125px;
  background-color: rgba(109, 7, 26, 0.95);
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 4% 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  z-index: 5;
  .key {
    display: flex;
    align-items: center;
    background-color: #fafafa;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: lighter;
    width: 80px;
  }
  a {
    text-decoration: none;
    color: white;
    font-size: 0.9rem;
    margin-top: 2px;
  }
  @media (max-width: 550px) {
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    flex-direction: row;
    height: 50px;
    a {
      display: none;
    }
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
