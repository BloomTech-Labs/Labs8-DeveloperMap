import React from 'react';
import styled from 'styled-components';
import Heart from '../../images/favorites-icon.png';
import Avatar from '../../images/avatar-icon.jpg';

const Nav = styled.div`
  width: 98%;
  height: 50px;
  background-color: rgb(232, 232, 232);
  z-index: 1;
  position: absolute;
  border-radius: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .heart {
    margin-right: 2%;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .avatar {
    margin-right: 2%;
    img {
      border-radius: 50%;
      width: 27px;
      height: 27px;
    }
  }
  .knobs {
    display: flex;
    width: 25%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 30%;
  }
`;

const ToggleKnob = styled.label`
  position: relative;
  width: 29px;
  height: 12px;
  justify-self: center;
  align-items: center;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: '';
      height: 13px;
      width: 13px;
      left: 1px;
      bottom: 0px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
  .slider.round {
    border-radius: 12px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

class NavBar extends React.Component {
  handleSignIn = () => {
    this.props.history.push('/signin');
  };
  
  billMe = () => {
    this.props.history.push('/billing');
  }


  render() {
    return (
      <Nav>
        <div className="knobs">
          <ToggleKnob>
            <input type="checkbox" />
            <span className="slider round" />
          </ToggleKnob>
          <h5>Job Seeker</h5>
          <ToggleKnob>
            <input type="checkbox" />
            <span className="slider round" />
          </ToggleKnob>
          <h5>Employer</h5>
        </div>
        <div className="heart" onClick={this.billMe}>
          <img alt="Favorites Icon" src={Heart} />
        </div>
        <div className="avatar" onClick={this.handleSignIn}>
          <img alt="Avatar Icon" src={Avatar} />
        </div>
      </Nav>
    );
  }
}

export default NavBar;
