import styled from 'styled-components';
import { ModalMain } from './ModalGlobalStyle.js';

export const SignModalMain = styled(ModalMain)`
  width: 40%;
  display: flex;
  align-items: center;
  padding: 20px 5% 20px 5%;
  flex-direction: column;
  top: 10%;
  box-sizing: border-box;
  border-radius: 2px;
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

export const Label = styled.label`
  display: block;
  padding-bottom: 10px;
`;

export const Input = styled.input`
  display: block;
`;

export const RegisterButton = styled.span`
  color: blue;
  cursor: pointer;
`;

export const FullName = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input[type=text] {
    height: 30px;
    width: 200px;
    border-radius: 2px;
    border: .5px solid lightgrey;
    padding-left: 5px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  input[type=text], input[type=email] {
    width: 100%;
    height: 30px;
    border-radius: 2px;
    border: .5px solid lightgrey;
    padding-left: 5px;
  }
  input[type=text] {
    margin-top: 10px;
  }
`;

export const Location = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input[type=text] {
    height: 30px;
    width: 200px;
    border-radius: 2px;
    border: .5px solid lightgrey;
    padding-left: 5px;
    margin-bottom: 10px;
  }
`;

export const JobTitle = styled.div`
  input[type=text] {
    width: 100%;
    height: 30px;
    border-radius: 2px;
    border: .5px solid lightgrey;
    padding-left: 5px;
  }
`;

export const Password = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input[type=password] {
    height: 30px;
    width: 200px;
    border-radius: 2px;
    border: .5px solid lightgrey;
    padding-left: 5px;
    margin-bottom: 15px;
}
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: rgb(184,15,10);
  color: white;
  border: none;
  border-radius: 2px;
  box-shadow: 0 4px 2px -2px gray;
  &:hover {
    background-color: rgba(184,15,10,.8);
  }
`;

