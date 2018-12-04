import styled from 'styled-components';
import { ModalMain } from './ModalGlobalStyle.js';

// Main Container
export const SettingsModalMain = styled(ModalMain)`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 30px 5% 30px 5%;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 2px;
  flex-wrap: wrap;
  h3 {
    width: 100%;
  }
  form{
    width: 100%;
    max-width: 650px;
    h4{
      border-bottom: .5px solid lightgrey;
      color: rgb(184,15,10);
      padding-bottom: 3px;
    }
  .form-switch {
    width: 75px;
  }
  }
`;

// Settings Navigation
export const Navigation = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
a {
  font-weight: bold;
  text-decoration: none;
  background-color: rgba(109, 7, 26, .95);
  color: white;
  padding: 10px 10px;
  margin: 20px 0 5px 0;
  border-radius: 25px;

  &:hover {
    background-color: rgba(109, 7, 26, .75);
  }
}

.active {
  background-color: rgba(207, 149, 4);
  color: rgba(0, 0, 0);

  &:hover {
  background-color: rgba(207, 149, 4);
  }
}

img {
  width: 100%;
  border-radius: 25px;
}
`;

// Input Fields
export const Label = styled.label`
  display: block;
  padding-bottom: 10px;
  width: ${props => props.width ? props.width : 'auto'};
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;

  border-radius: 25px;
  border: 1px solid lightgrey;
  padding: 10px 10px;
  &:disabled {
    border-color: white;
    background-color: whitesmoke;
  }
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  font-size: 16px;
  height: 25px;
  border-radius: 1px;
  border: 1px solid lightgrey;
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  min-width:100%;
  max-width:100%;
  height: 60px;
  border-radius: 1px;
  border: 1px solid lightgrey;
  &:disabled {
    border-color: white;
    background-color: whitesmoke;
  }
`;

export const CheckBox = styled.input`
// Check Box Placeholder. No stylings yet, but there definitely will be.
`;

// Columns
export const LeftColumn = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  display: flex;
  width: 65%;
  flex-direction: column; 
  justify-content: space-between;
`;

// Sections
export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 100%;
  label {
    padding: 20px 0;
    input {
      margin: 10px 0;
      border: none;
      height: 24px;
      padding: 0px 10px;
    }
  }
  // The Download Resume Link... Consider making it a component and using background images instead.
  a {
    text-align: center;
    width: 100%;
    padding: 5px 0;
    background-color: whitesmoke;
  }
`;

export const Security = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
`;

export const Location = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  // Check Boxes for Remote Jobs and Relocation... Consider making it a component and using background images instead.
  .location-options {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
`;

export const Social = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;


// Buttons Used to Edit, Save, and Cancel
export const EditButtons = styled.button`
  height: 30px;
  padding: 0px 20px;
  background-color: rgba(109, 7, 26, .95);
  color: white;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 2px -2px gray;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgba(109, 7, 26, .75);
  }
  position: absolute;
  top: 20px;
  right: ${props => props.right}
`

