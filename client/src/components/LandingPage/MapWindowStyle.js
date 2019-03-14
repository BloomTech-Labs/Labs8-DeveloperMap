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
      margin-left: Calc(3% + 10px);
      margin-top: 5px;
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

  .mapboxgl-popup-anchor-bottom {
    .mapboxgl-popup-tip {
      border-top-color: rgb(35, 34, 48);
    }
  }
`;

export const ShowMarker = styled.img`
  height: 35px;
  width: 25px;
  cursor: pointer;
  

  &.company {
    display: ${props => (props.show.company ? 'block' : 'none')};
  }

  &.seeker {
    display: ${props => (props.show.seeker ? 'block' : 'none')};
  }
`;

export const CloseX = styled.p`
  position: absolute;
  right: -7px;
  top: -3px;
  font-size: 19px;
  cursor: pointer;
  background-color: rgb(37, 36, 48);
  color: rgb(255,255,255);
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 210px;
  padding: 8px 0px 0px 0px;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 6px;

  }

  div {
    text-align: center;

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
  }
`;

export const Link = styled.div`
  color: white;
  cursor: pointer;
  width: 100%;
  background: rgb(35, 34, 48);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 5px 0px;
`;

export const PopupImg = styled.div`
  display: ${props => (props.image ? 'block' : 'none')};
  width: 60px;
  height: 60px;
  background-image: ${props => (props.image ? `url(${props.image})` : 'null')};
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: top;
  margin-right: 5px;
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
  width: 30px;
  height: 45px;
`;

export const KeyBox = styled.div`
  width: 205px;
  height: 135px;
  background-color: rgba(109, 7, 26, 0.95);
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 4% 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  z-index: 5;

  .container {
    padding: 6px 3%;
    background-color: #fafafa;
    border-radius: 10px;

    @media (max-width: 550px) {
      display: flex;
      padding: 0 2%;
    }
  }

  .key {
    display: flex;
    align-items: center;
    padding: 2px 0;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: lighter;
    width: 90px;
  }

  @media (max-width: 550px) {
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    flex-direction: row;
    height: 50px;
    border-radius: 0;
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


export const PopContent = styled.div`
  width: 128px;
`;