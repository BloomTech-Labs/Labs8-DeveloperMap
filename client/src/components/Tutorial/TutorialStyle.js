import styled from 'styled-components';

// === Global Style for Tutorial Styles ===

// Next Button on Modals
export const Next = styled.button`
  width: 100px;
  border: none;
  border-radius: 25px;
  background-color: rgba(109, 7, 26, 0.95);
  cursor: pointer;
  outline: none;
  height: 30px;
  color: white;
  box-shadow: 0 4px 2px -2px gray;
  &:hover {
    background-color: rgba(109, 7, 26, 0.75);
  }
`;

// Main Style of Content
export const TutorialStyle = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin: 2%;
    line-height: 1.25;
  }
`;

// ==== Other Styled ====

// TutorialIntro Style
export const Navigate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3%;
  a {
    text-decoration: none;
    color: rgba(109, 7, 26, 0.95);
  }
`;

//DevProfileGuide Style
export const DevProfile = styled(TutorialStyle)`
  .fav {
    margin-bottom: 15px;
  }
`;

// Intro Container Style
export const IntroContainer = styled(TutorialStyle)`
  h1 {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    img {
      padding-top: 20px;
    }
  }
  p {
    max-width: 500px;
    margin-bottom: 10px;
  }
  img {
    margin-bottom: 20px;
  }
`;

// UsingMarkers Style
export const MarkerGuide = styled(TutorialStyle)`
  img {
    padding-top: 10px;
  }
`;

// GettingStarted Style
export const StartContainer = styled(TutorialStyle)`
  max-width: 600px;
  width: 100%;
`;
