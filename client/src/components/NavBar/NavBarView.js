import React from 'react';
import styled from 'styled-components';
import Heart from '../../images/favorites-icon.png';
import Avatar from '../../images/avatar-icon.jpg';
import Logout from '../../images/logout.png';

const Nav = styled.div`
  width: 98%;
  height: 50px;
  background-color: rgba(232, 232, 232, .85);
  z-index: 1;
  position: absolute;
  border-radius: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: inset 10px 10px 10px rgba(255,255,255,.5);
  .heart {
    margin-right: 2%;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .avatar {
    
    img {
      border-radius: 50%;
      width: 27px;
      height: 27px;
    }
  }
  
`;


const Icons = styled.div`
  display: flex;
  margin: 0 2%;
  justify-content: space-between;
  width: 100px;
  .signout{
    img {
      border-radius: 50%;
      width: 27px;
      height: 27px;
    } 
  }
`;

const InButton = styled.button`
  width: 75px;
  height: 35px;
  background-color: rgb(184,15,10);
  color: white;
  border-radius: 20px;
  border: none;
  margin-right: 10px;
  box-shadow: 0 4px 2px -2px gray;
  &:hover {
    background-color: rgba(184,15,10,.8);
  } 
  &:focus {
    outline: 0;
  }
`;

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  handleSignIn = () => {
    this.props.history.push('/signin');
  };
  
  billMe = () => {
    this.props.history.push('/billing');
  }

  profilePop = () => {
    this.props.history.push(`/settings`);
  }


  render() {
    return (
      <Nav>
        {this.props.user ? (
        <Icons>
        <div className="heart" onClick={this.billMe}>
          <img alt="Favorites Icon" src={Heart} />
        </div>
        <div className="signout">
        <img alt='Logout' src={Logout} onClick={this.props.signOut}/>
        </div>
        <div className="avatar">
          <img alt="Avatar Icon" src={Avatar} onClick={this.profilePop}/>
        </div>
        </Icons>)
        :
        (
          <div>
            <InButton onClick={this.handleSignIn}>Sign In ></InButton>
          </div>)}
      </Nav>
    );
  
  }
}

export default NavBar;
