import React from 'react';
import nav from '../../images/navsearch.PNG';
import pinch from '../../images/Pinch_zoom.png';

import { TutorialStyle, Next } from './TutorialStyle';

class Navigating extends React.Component {
  switchPage = () => {
    this.props.history.push('/tutorial/usingmarkers');
  };
  render() {
    return (
      <TutorialStyle>
        <h1>Navigation</h1>
        <p>
          You can use the search bar at the top left of the map to enter a
          location. The map will pan to the location on the map.
        </p>
        <img src={nav} alt="" />
        <p>
          By clicking and dragging the map you can also pan accross the map, if
          you are on mobile, you can zoom into a location by using two fingers
          and spreading them apart in any direction.
        </p>
        <img src={pinch} alt="" />
        <Next onClick={this.switchPage}>Next</Next>
      </TutorialStyle>
    );
  }
}

export default Navigating;
