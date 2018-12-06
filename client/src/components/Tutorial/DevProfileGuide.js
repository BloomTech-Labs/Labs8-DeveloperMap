import React from 'react';
import styled from 'styled-components';
import seeker from '../../images/markerlogo.png';
import contact from '../../images/contact.PNG';
import links from '../../images/links.PNG';

class DevProfileGuide extends React.Component {
  switchPage = () => {
    this.props.history.push('/tutorial/comprofileguide');
  };
  render() {
    return (
      <ProfileGuide>
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
      </ProfileGuide>
    );
  }
}

const ProfileGuide = styled.div`
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

const Next = styled.button`
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

export default DevProfileGuide;
