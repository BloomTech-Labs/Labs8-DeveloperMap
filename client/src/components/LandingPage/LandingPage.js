import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { MapWindow } from '../../styles/MapWindowStyle';

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
    this.setState({
      data: [
        {
          geometry: {
            coordinates: { 0: 40, 1: -123 },
          },

          properties: {
            title: 'Lauren',
            uid: 'jklsfn3',
          },
        },
        {
          geometry: {
            coordinates: { 0: 37.8, 1: -122.41 },
          },
          properties: {
            title: 'Ezra',
            uid: 'hsbneis7dd8s',
          },
        },
        {
          geometry: {
            coordinates: {
              0: -75.915527,
              1: 42.106374,
            },
          },
          properties: {
            title: 'Austin',
            uid: 'dfagagds',
          },
        },
        {
          geometry: {
            coordinates: { 0: 0, 1: 0 },
          },
          properties: {
            title: 'Brock',
            uid: 'fd87ash3bkjs',
          },
        },
      ],
    });
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
                latitude={mark.geometry.coordinates[0]}
                longitude={mark.geometry.coordinates[1]}
              >
                <div>{mark.properties.title}</div>
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
