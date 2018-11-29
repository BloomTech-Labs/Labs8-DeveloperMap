import styled from 'styled-components';

// Controls the content in the modal
export const ProfileStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
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
export const ProfilePic = styled.img`
  width: 30%;
  border-radius: 50%;
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
`;

// Controls the checkboxes
export const CheckLabel = styled.label`
  display: block;
  padding: 5px;
`;

// Controls the info box
export const Info = styled.div`
  border: 1px solid black;
  padding: 20px 7%;
  margin: 10px 0 20px 0;

  .info {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    p {
      padding-left: 5%;
    }
  }
`;
