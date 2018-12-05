import React from 'react';
import {Button, TypesContainer} from '../../../styles/SignIn_UpStyle';

class SignUpUserTypes extends React.Component {

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
        <TypesContainer> 
          <h2>Are You a...</h2>
          {/*User defines whether they are a seeker or an employer. This method also navigates to the sign up types component.*/}
          <Button onClick={() => this.props.setUserType('seeker')}>Job Seeker</Button>
          - or -
          <Button onClick={() => this.props.setUserType('employer')}>Employer</Button>
        </TypesContainer>
    );
  }
}

export default SignUpUserTypes;