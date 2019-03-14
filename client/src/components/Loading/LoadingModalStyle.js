import styled from 'styled-components';

export const Timeline = styled.div`
  padding: 10px 0;

  .animate {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    position: relative;

    margin: 20px 0;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export const SeekerLoadStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-container {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }

  .name-container,
  .location-container {
    width: 50%;
    height: 25px;
    margin: 10px 0;
  }

  .info-container {
    height: 105px;
    width: 50%;
    border-radius: 20px;
    margin: 10px 0 20px 0;
  }
`;

export const CompanyLoadStyle = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 801px) {
    flex-direction: column;
    align-items: center;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    width: 30%;
    @media (max-width: 801px) {
      width: 45%;
    }
  }

  .image-container {
    height: 34%;
    border-radius: 50%;
    margin-bottom: 20px;

    @media (max-width: 801px) {
      height: 150px;
      width: 150px;
      margin: 50px auto 0 auto;
    }
  }
  .name-container {
    height: 30px;
  }

  .info-container {
    width: 100%;
    height: 260px;
  }

  .job-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;

    @media (max-width: 801px) {
      width: 60%;
    }
  }

  .jobs-container {
    height: 110px;
    margin: 10px 0;
  }
`;
