import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import { MapWindow } from '../../styles/MapWindowStyle';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';

class LandingPage extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  };

  // resize() {
  //   this.onViewportChange({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   });
  // }

  render() {
    const style = {
      position: 'absolute',
      marginTop: '-8px',
      marginLeft: '-8px',
    };

    return (
      <MapWindow>
        <ReactMapGL
          className="map"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          style={style}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/lndubose/cjo6br6c61dfs2snxq0bxlg3f?optimize=true"
        />
      </MapWindow>
    );
  }
}

export default LandingPage;

// onViewportChange={this.onViewportChange}
// mapboxApiAccessToken={MAPBOX_TOKEN}
