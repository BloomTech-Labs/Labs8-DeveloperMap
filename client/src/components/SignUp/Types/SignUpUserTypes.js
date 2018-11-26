import React from 'react';

class SignUpUserTypes extends React.Component {

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
        <section> 
          <h2>Are You a...</h2>
          {/*User defines whether they are a seeker or an employer. This method also navigates to the sign up types component.*/}
          <button onClick={() => this.props.setUserType('seeker')}>Job Seeker</button>
          <button onClick={() => this.props.setUserType('employer')}>Employer</button>
        </section>
    );
  }
}

export default SignUpUserTypes;