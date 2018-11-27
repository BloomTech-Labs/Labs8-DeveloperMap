import React from 'react';
import styled from 'styled-components';
import Heart from '../../images/favorites-icon.png';
import Avatar from '../../images/avatar-icon.jpg';
import Logout from '../../images/logout.png';

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
            <button onClick={this.handleSignIn}>Sign In ></button>
          </div>)}
      </Nav>
    );
  
  }
}

export default NavBar;
