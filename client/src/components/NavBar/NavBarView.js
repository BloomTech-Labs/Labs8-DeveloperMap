import React from 'react';
import styled from 'styled-components';
import Heart from '../../images/favorites-icon.png';
import Avatar from '../../images/avatar-icon.jpg';


const Nav = styled.div`
  width: 98%;
  height: 50px;
  background-color: rgb(232,232,232);
  z-index: 1;
  position: absolute;
  border-radius: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .heart{
      margin-right: 2%;
      img{
        width: 25px;
        height: 25px;
      }
  }
  .avatar{
      margin-right: 2%;
      img{
        border-radius: 50%;
        width: 27px;
        height: 27px;
      }
  }
`;



class NavBar extends React.Component{
    render(){
        return (
            <Nav>
            <div class='heart'><img alt='Favorites Icon' src={Heart}/></div>
            <div class='avatar'><img alt='Avatar Icon' src={Avatar}/></div>
            </Nav>
        );
    }
}

export default NavBar;