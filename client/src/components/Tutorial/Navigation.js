import React from 'react';
import styled from 'styled-components';

class Navigating extends React.Component {
    switchPage = () => {
        this.props.history.push('/tutorial/usingmarkers');
    }
    render() {
    return (
        <NavGuide>
            <h1>Navigation</h1>
            <p>
                You can use the search bar at the top left of the map to enter a location. The map will pan to the location 
                on the map. 
            </p>
            <h1>Picture goes here</h1>
            <p>By clicking and dragging the map you can also pan accross the map, if you are 
                on mobile, you can zoom into a location by using two fingers and spreading them apart 
                in any direction.
            </p>
            <h1>Picture goes here
            </h1>
            <Next onClick={this.switchPage}>Next</Next>
        </NavGuide>
    );
    }
}

const NavGuide = styled.div`
  padding: 5%;
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

export default Navigating;