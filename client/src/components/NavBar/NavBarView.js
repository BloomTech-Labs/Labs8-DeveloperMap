import React from 'react';
import Heart from '../../images/favorites-icon.png';
import Avatar from '../../images/avatar-icon.jpg';
import Logout from '../../images/logout.png';
import {
  Nav,
  Icons,
  InButton
} from './NavBarStyles';



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
