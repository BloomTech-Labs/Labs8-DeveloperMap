import styled from 'styled-components';

import { ModalMain } from '../../styles/ModalGlobalStyle';

export const EmployerModalMain = styled(ModalMain)`
  max-width: 750px;
  overflow-y: auto;

  @media (max-width: 801px) {
    height: 98%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  width: 100%;
  padding: 5%;
  .com-name {
    font-size: 1.6rem;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  h4 {
    margin-bottom: 15px;
  }
`;

export const Styling = styled.div`
  display: flex;
  padding: 5%;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 801px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
`;

export const Posts = styled.div`
  width: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  @media (max-width: 650px) {
    flex-direction: row;
  }
`;

export const ProfilePic = styled.img`
  width: 50%;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const InfoContainer = styled.div`
  border: 0.7px solid rgba(220, 220, 220, 0.6);
  border-radius: 4px;
  width: 100%;
  padding: 2%;
`;

export const Job = styled.div`
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 350px;
  width: 100%;
  border: 0.7px solid rgba(220, 220, 220, 0.6);
  border-radius: 4px;
  padding: 5%;
  margin-bottom: 15px;
  &:hover {
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: rgba(109, 7, 26, 0.95);
  }

  @media (max-width: 801px) {
    max-width: none;
  }
`;
