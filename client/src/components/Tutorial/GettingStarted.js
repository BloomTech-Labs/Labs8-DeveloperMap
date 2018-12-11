import React from 'react';
import signin from '../../images/newsignin.PNG';
import sorc from '../../images/sorc.PNG';

import { StartContainer, Next } from './TutorialStyle';

class GettingStarted extends React.Component {
  switchPage = () => {
    this.props.history.push('/tutorial/navigation');
  };
  render() {
    return (
      <StartContainer>
        <h1>Getting Started</h1>
        <p>
          You can start by signing up through the Sign In button in the top
          right corner of the App. This is also where you will sign in once your
          account is set up.
        </p>
        <img src={signin} alt="" style={{ width: '200px' }} />
        <p>
          Click on the 'Register Here' link to start filling out your
          information needed to use the application effectively. You will be
          prompted to choose whether you are a Job Seeker or an Employer.
        </p>
        <img src={sorc} alt="" style={{ width: '200px' }} />
        <p>
          Next Enter your Email and Password that you would like to affiliate
          with your account. Note: You will be re-entering these in just a
          second. Now just fill out the Sign up form with your info and submit.
          You will then be redireced to the Map.
        </p>
        <Next onClick={this.switchPage}>Next</Next>
      </StartContainer>
    );
  }
}

export default GettingStarted;
