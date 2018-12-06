import React from 'react';
import styled from 'styled-components';
import company from '../../images/markerlogo4.png';
import seeker from '../../images/markerlogo.png';

class UsingMarkers extends React.Component {
  switchPage = () => {
    this.props.history.push('/tutorial/devprofileguide');
  };
  render() {
    return (
      <MarkerGuide>
        <h1>Using the Markers</h1>
        <p>
          There are two types of markers on the map. Companies are
          <span>
            <img src={company} alt="" style={{ width: '40px' }} />
          </span>
          and Job Seekers are
          <span>
            <img src={seeker} alt="" style={{ width: '40px' }} />
          </span>
          . You can click on a marker to bring up the name of the company or
          seeker in which that maker belongs to. Clicking on the link there will
          bring you to their profile page.
        </p>
        <p>
          If you want to display only seekers or only companies, you can use the
          key in the bottom right hand corner of your screen.
        </p>
        <h1>Picture Goes here</h1>
        <Next onClick={this.switchPage}>Next</Next>
      </MarkerGuide>
    );
  }
}

const MarkerGuide = styled.div`
  padding: 5%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin: 2%;
    line-height: 1.25;
    img {
      padding-top: 10px;
    }
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

export default UsingMarkers;
