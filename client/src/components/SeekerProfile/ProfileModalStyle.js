import styled from 'styled-components';
import { ModalMain } from '../../styles/ModalGlobalStyle';

export const ProfileModalStyle = styled(ModalMain)`
  width: 75%;
  max-width: 750px;
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

  @media (max-width: 661px) {
    position: initial;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    margin-bottom: 10px;
  }

  a {
    width: 70%;

    @media (max-width: 661px) {
      width: 11%;
    }
  }

  img {
    width: 100%;
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
  width: 80%;

  h1,
  p {
    margin: 10px 0;
  }

  span {
    font-weight: bold;
  }

  .bio {
    margin: 20px 0 10px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      align-self: center;
    }

    p {
      text-align: left;
      line-height: 1.25;
      margin: 0;
    }
  }
`;

// Controls the checkboxes
export const OpenStyle = styled.div`
  margin: 15px 0;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;

  span {
    padding-left: 3%;
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
  width: 50%;

  .info {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    p {
      padding-left: 2%;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
`;

// Controls info box when not signed in
export const SignEmployer = styled.div`
  border: 1px solid black;
  margin: 10px 0 20px 0;
  padding: 15px 0;
  min-height: 105px;
  background-color: rgb(37, 36, 48);
  color: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  width: 50%;

  p {
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
