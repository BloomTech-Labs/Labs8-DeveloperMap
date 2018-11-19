import React from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { MapWindow, ShowMarker, Pop } from '../../styles/MapWindowStyle';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';

class LandingPage extends React.Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -100,
      zoom: 3,
    },
    data: [],
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    axios
      .get('https://intense-stream-29923.herokuapp.com/api/markers')
      .then(response => {
        for (let mark in response.data) {
          this.setState({ data: [...this.state.data, response.data[mark]] });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  render() {
    const style = {
      position: 'absolute',
      marginTop: '-8px',
      marginLeft: '-8px',
    };

    return (
      <MapWindow>
        <MapGL
          ref={this.mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={this.handleViewportChange}
          style={style}
          mapStyle="mapbox://styles/lndubose/cjohrsfn608in2qqyyn2wu15g"
        >
          <Geocoder
            mapRef={this.mapRef}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
          />

          {this.state.data.map((mark, i) => {
            return (
              <Marker
                key={i}
                latitude={mark.geometry.coordinates[1]}
                longitude={mark.geometry.coordinates[0]}
              >
                <ShowMarker>
                  <Pop>{mark.properties.title}</Pop>
                </ShowMarker>
              </Marker>
            );
          })}
        </MapGL>
      </MapWindow>
    );
  }
}

export default LandingPage;

// onViewportChange={this.onViewportChange}
// mapboxApiAccessToken={MAPBOX_TOKEN}
