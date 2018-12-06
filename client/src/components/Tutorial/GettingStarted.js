import React from 'react';
import styled from 'styled-components';
import signin from '../../images/newsignin.PNG';
import sorc from '../../images/sorc.PNG';

class GettingStarted extends React.Component{
    switchPage = () => {
        this.props.history.push('/tutorial/navigation');
    }
    render() {
    return (
            <StartContainer>
                <h1>Getting Started</h1>
                <p>
                    You can start by signing up through the Sign In button in the top right
                    corner of the App. This is also where you will sign in once your account 
                    is set up.
                </p>
                <img src={signin} alt="" style={{ width: '200px' }}/>
                <p>
                    Click on the 'Register Here' link to start filling out your information needed to 
                    use the application effectively. You will be prompted to choose whether you are 
                    a Job Seeker or an Employer.
                </p>
                <img src={sorc} alt="" style={{ width: '200px' }}/>
                <p>
                    Next Enter your Email and Password that you would like to affiliate with your account. Note: You 
                    will be re-entering these in just a second. Now just fill out the Sign up form with your info and 
                    submit. You will then be redireced to the Map.
                </p>
                <Next onClick={this.switchPage}>Next</Next>
            </StartContainer>
    );
    }
}

const StartContainer = styled.div`
  padding: 5%;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
      line-height: 1.25;
      margin: 2%;
  }
`;

const Next = styled.button`
  width: 100px;
  border: none;
  border-radius: 25px;
  background-color: rgba(109, 7, 26, .95);
  cursor: pointer;
  outline: none;
  height: 30px;
  color: white;
  box-shadow: 0 4px 2px -2px gray;
  &:hover {
    background-color: rgba(109, 7, 26, .75);
  }
`;

export default GettingStarted;