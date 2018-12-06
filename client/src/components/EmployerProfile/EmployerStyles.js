import styled from 'styled-components';

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  width: 100%;
  padding: 5%;
  .com-name{
    font-size: 1.6rem;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  h4{
    margin-bottom: 15px;
  }
`;


export const Styling = styled.div`
  display: flex;
  padding: 5%;
  justify-content: space-between;
  max-width: 750px;
  width: 100%;
  @media (max-width: 650px) {
    flex-wrap: wrap;
    padding-top: 500px;
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