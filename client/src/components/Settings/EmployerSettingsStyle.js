import styled from 'styled-components';

export const Job = styled.div`
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: space-between;
  height: 100px;
  max-width: 300px;
  width: 100%;
  border: 0.7px solid rgba(220, 220, 220, 0.6);
  border-radius: 4px;
  padding: 2%;
  margin-bottom: 10px;
  h2 {
    font-size: 1.4rem;
  }
  &:hover {
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: rgb(109, 7, 26);
  }
  h3 {
    font-size: 1rem;
  }
`;

export const JobForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-height: 400px;
  height: 100%;
  h2 {
    margin-top: 100px;
  }
  input {
    border-radius: 25px;
    height: 30px;
    max-width: 300px;
    width: 100%;
    background-color: #fafafa;
    border-radius: 25px;
    border: 1px solid #dbdbdb;
    padding: 10px 0 10px 15px;
    margin: 3% 0;

    outline: none;

    &:focus {
      border-color: rgba(207, 149, 4);
    }

    &.active {
      padding: 15px 0 5px 15px;
    }
  }
  button {
    border-radius: 25px;
    height: 30px;
    max-width: 300px;
    width: 100%;
    padding: 2%;
    background-color: rgba(109, 7, 26, 0.95);
    color: white;
    border: none;
    box-shadow: 0 4px 2px -2px gray;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: rgba(109, 7, 26, 0.75);
    }
  }
`;

export const AddButton = styled.button`
  border-radius: 25px;
  height: 30px;
  max-width: 300px;
  width: 100%;
  padding: 2%;
  background-color: rgba(109, 7, 26, 0.95);
  color: white;
  border: none;
  box-shadow: 0 4px 2px -2px gray;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgba(109, 7, 26, 0.75);
  }
`;

export const Premium = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.6rem;
    color: rgba(109, 7, 26, 0.95);
    margin: 3% 0;
  }
  height: 300px;
`;
