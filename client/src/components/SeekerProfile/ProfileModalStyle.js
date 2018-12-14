import styled from 'styled-components';
import { ModalMain } from '../../styles/ModalGlobalStyle';

export const ProfileModalStyle = styled(ModalMain)`
  width: 55%;
`;

// Controls the content in the modal
export const ProfileStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

// Manipulates the icons on the side of the modal
export const Icons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 15px;

  img {
    width: 60%;
    margin: 3px 0;
  }

  .none {
    display: none;
  }
`;

// Controls Profile Picture
export const ProfilePic = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-image: ${props => (props.image ? `url(${props.image})` : 'null')};
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
`;

// Controls Name, Location, Bio
export const MainContent = styled.div`
  text-align: center;
  width: 50%;

  h1 {
    padding: 5px 0;
  }

  span {
    font-weight: bold;
  }

  p {
    padding: 5px 0;
  }

  .bio {
    margin: 20px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      align-self: center;
    }

    p {
      margin-left: 2%;
      text-align: left;
      line-height: 1.25;
    }
  }
`;

export const OpenContainer = styled.div``;

// Controls the checkboxes
export const OpenStyle = styled.div`
  margin: 15px 0;
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  align-items: center;

  span {
    padding-left: 0.5%;
    white-space: nowrap;
  }
`;

// Controls the info box
export const Info = styled.div`
  border: 1px solid black;
  padding: 20px 7%;
  margin: 10px 0 20px 0;
  min-height: 105px;
  border-radius: 20px;

  .info {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    p {
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
`;

// Controls info box when not signed in
export const SignEmployer = styled.div`
  border: 1px solid black;
  padding: 20px 7%;
  margin: 10px 0 20px 0;
  min-height: 105px;
  background-color: rgb(37, 36, 48);
  color: rgb(255, 255, 255);
  border-radius: 20px;

  p {
    font-size: 1.3rem;
    cursor: pointer;
    padding-top: 17px;
  }
`;
