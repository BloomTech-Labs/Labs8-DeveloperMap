import styled from 'styled-components';
import { ModalMain } from './ModalGlobalStyle.js';
const googleAuthImageURL = 'https://firebasestorage.googleapis.com/v0/b/labs8-developermap.appspot.com/o/thirdPartyAuth%2Fbtn_google_signin_light_normal_web.png?alt=media&token=cff7b16c-6e52-483d-b195-ebc43b3f2b57';
const googleAuthHoverImageURL = 'https://firebasestorage.googleapis.com/v0/b/labs8-developermap.appspot.com/o/thirdPartyAuth%2Fbtn_google_signin_light_pressed_web.png?alt=media&token=e4a98c94-5d5d-4e78-aadb-54d20fb44e1e'

export const SignModalMain = styled(ModalMain)`
  width: 21%;
  display: flex;
  align-items: center;
  padding: 50px 5% 50px 5%;
  flex-direction: column;
  top: 10%;
  box-sizing: border-box;
  border-radius: 20px;
  form{
    width: 100%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  position: absolute;
  z-index: 10;
  top: 20px;
  left: 17px;
  cursor: text;
  color: #999;
  width: 100%;
  text-align: left;
  transition: transform .1s ease-out,-webkit-transform .1s ease-out;
  user-select: none;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  background-color: #fafafa;
  border-radius: 25px;
  border: 1px solid #dbdbdb;
  padding: 10px 0 10px 15px;

  outline: none;

  &:focus {
    border-color: rgba(207, 149, 4);
  }

  &.active {
    padding: 15px 0 5px 15px;
  }

  &.active + label {
    transform: scale(.7) translateY(-15px) translateX(-49px);
  }
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

export const AuthField = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const TypesContainer = styled.section`
display: flex;
flex-direction: column;
align-items: center;

  h2 {
    margin-bottom: 20px;
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
  width: ${props => props.width ? props.width : '100%'};
  height: 40px;
  background-color: rgb(184,15,10);
  color: white;
  border: none;
  border-radius: 25px;
  margin: 10px 0 10px 0;
  box-shadow: 0 4px 2px -2px gray;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(184,15,10,.8);
  }
`;

export const GoogleAuthButton = styled.div`
  background-image: url("${googleAuthImageURL}");
  width: 191px;
  height: 46px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-image: url("${googleAuthHoverImageURL}");
  }
`;