import React from 'react';
import Heart from '../../images/favheart.png';
import Avatar from '../../images/gear.png';
import Logout from '../../images/logout1.png';
import { Nav, Icons, InButton } from './NavBarStyles';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSignIn = () => {
    this.props.history.push('/signin');
  };

  favorite = () => {
    const { uid } = this.props.user;
    this.props.history.push(`/favorites/${this.props.user.uid}`);
  };

  profilePop = () => {
    this.props.history.push(`/settings`);
  };

  render() {
    return (
      <Nav>
        {this.props.user ? (
          <Icons>
            <div className="heart" onClick={this.favorite}>
              <img alt="Favorites Icon" src={Heart} title="Favorites" />
            </div>
            <div className="avatar">
              <img
                alt="Avatar Icon"
                src={Avatar}
                onClick={this.profilePop}
                title="User Settings"
              />
            </div>
            <div className="signout">
              <img
                alt="Logout"
                src={Logout}
                onClick={this.props.signOut}
                title="Logout"
              />
            </div>
          </Icons>
        ) : (
          <div>
            <InButton onClick={this.handleSignIn}>Sign In ></InButton>
          </div>
        )}
      </Nav>
    );
  }
}

export default NavBar;
