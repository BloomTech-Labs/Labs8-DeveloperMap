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
            <button onClick={this.switchPage}>Next</button>
        </NavGuide>
    );
    }
}

const NavGuide = styled.div`
  padding: 5%;
`;

export default Navigating;