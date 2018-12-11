import React from 'react';
import seeker from '../../images/markerlogo.png';
import contact from '../../images/contact.PNG';
import links from '../../images/links.PNG';

import { DevProfile, Next } from './TutorialStyle';

class DevProfileGuide extends React.Component {
  switchPage = () => {
    this.props.history.push('/tutorial/comprofileguide');
  };
  render() {
    return (
      <DevProfile>
        <h1>Job Seeker Profile</h1>
        <p>
          By clicking on a{' '}
          <span>
            <img src={seeker} alt="" style={{ width: '50px' }} />
          </span>{' '}
          marker on the map, you will be brought to that job seekers profile.
          The icons on the right will bring you to various accounts for the user
          such as linkedIn or their portfolio page.
        </p>
        <img src={links} alt="" />
        <p>
          At the bottom you will see their contact info if you are a verified
          company through MappaJob.
        </p>
        <img src={contact} alt="" />
        <Next onClick={this.switchPage}>Next</Next>
      </DevProfile>
    );
  }
}

export default DevProfileGuide;
