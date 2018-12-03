import styled from 'styled-components';

export const Nav = styled.div`
  width: 98%;
  height: 50px;
  background-color: rgba( 109, 7, 26, .95);
  z-index: 1;
  position: absolute;
  border-radius: 25px;
  display: flex;
  top: 6px;
  right: 1%;
  justify-content: flex-end;
  align-items: center;

  .heart {
    margin-right: 2%;
    padding-top: 2px;
    img {
      width: 25px;
      height: 23px;
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


export const Icons = styled.div`
  display: flex;
  margin-right: 10px;
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

export const InButton = styled.button`
  width: 75px;
  height: 35px;
  background-color: rgb(184,15,10);
  color: white;
  border-radius: 20px;
  border: none;
  margin-right: 10px;
  box-shadow: 0 4px 2px -2px rgba(15,15,15,.2);
  &:hover {
    background-color: rgba(184,15,10,.8);
  } 
  &:focus {
    outline: 0;
  }
`;