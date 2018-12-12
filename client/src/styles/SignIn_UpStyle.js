import styled from 'styled-components';
import { ModalMain } from './ModalGlobalStyle.js';
import googleAuthImageURL from '../images/signup/btn_google_signin_light_normal_web.png';
import googleAuthHoverImageURL from '../images/signup/btn_google_signin_light_pressed_web.png';
import githubAuthImageURL from '../images/signup/btn_github_signin_light_normal_web@2x.png';
import githubAuthHoverImageURL from '../images/signup/btn_github_signin_light_pressed_web@2x.png';

export const SignModalMain = styled(ModalMain)`
  width: ${props => props.width};
  max-width: Calc(450px + 10%);
  display: flex;
  align-items: center;
  padding: 50px 5% 50px 5%;
  flex-direction: column;
  top: 10%;
  box-sizing: border-box;
  border-radius: 20px;
  form {
    width: 100%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      margin-bottom: 10px;
    }
    h4 {
      border-bottom: 0.5px solid lightgrey;
      color: rgb(184, 15, 10);
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
  top: 22px;
  left: 17px;
  cursor: text;
  color: #999;
  width: 100%;
  text-align: left;
  transition: transform 0.1s ease-out, -webkit-transform 0.1s ease-out;
  user-select: none;
  font-size: 15px;
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
    transform: scale(0.7) translateY(-15px) translateX(-49px);
  }
`;

export const RegisterButton = styled.span`
  color: blue;
  cursor: pointer;
`;

export const FullName = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;

  div {
    width: 49%;
  }

  input[type='text'] {
    width: 100%;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  input[type='text'],
  input[type='email'] {
    width: 100%;
  }

  .div {
    width: 100%;
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
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    width: 49%;
  }
`;

export const Password = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input[type='password'] {
    height: 30px;
    width: 200px;
    border-radius: 2px;
    border: 0.5px solid lightgrey;
    padding-left: 5px;
    margin-bottom: 15px;
  }
`;

export const Button = styled.button`
  width: ${props => (props.width ? props.width : '100%')};
  height: 40px;
  background-color: rgb(184, 15, 10);
  color: white;
  border: none;
  border-radius: 25px;
  margin: 10px 0 10px 0;
  box-shadow: 0 4px 2px -2px gray;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(184, 15, 10, 0.8);
  }
`;

export const GoogleAuthButton = styled.div`
  background-image: url("${googleAuthImageURL}");
  background-size: cover;
  width: 191px;
  height: 46px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-image: url("${googleAuthHoverImageURL}");
    background-size: cover;
  }
`;

export const GithubAuthButton = styled.div`
  background-image: url("${githubAuthImageURL}");
  background-size: cover;
  width: 191px;
  height: 46px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-image: url("${githubAuthHoverImageURL}");
    background-size: cover;
  }
`;

export const Valid = styled.p`
  display: ${props => (props.show ? 'block' : 'none')};
  color: red;
  font-size: 0.9rem;
`;
