import React from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { NavLink } from 'react-router-dom';

import {
  MapWindow,
  ShowMarker,
  CloseX,
  PopupInfo,
  LogoImg,
  PinKey,
  KeyBox,
  ToggleKnob,
  PopupImg,
  Link,
} from './MapWindowStyle';
import SeekerPin from '../../images/SMarker.png';
import MainLogo from '../../images/mainlogo.png';
import CompanyPin from '../../images/EMarker.png';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';

class LandingPage extends React.Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -100,
      zoom: 3,
      width: '100%',
      height: '100%',
    },
    data: [],
    pin: null,
    filter: {
      seeker: true,
      company: true,
    },
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.getMarkers();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentSignedInUser !== this.props.currentSignedInUser &&
      this.props.currentSignedInUser !== null
    ) {
      if (this.props.currentSignedInUser.role === 'seeker') {
        this.setState({
          currentSignedInUser: this.props.currentSignedInUser,
          filter: {
            seeker: false,
            company: true,
          },
        });
      } else if (this.props.currentSignedInUser.role === 'company') {
        this.setState({
          currentSignedInUser: this.props.currentSignedInUser,
          filter: {
            seeker: true,
            company: false,
          },
        });
      }
    } else if (
      prevProps.currentSignedInUser !== this.props.currentSignedInUser &&
      this.props.currentSignedInUser === null
    ) {
      this.setState({
        filter: {
          seeker: true,
          company: true,
        },
      });
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getMarkers();
    }
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

  // ==== Gets the markers from the server ====
  getMarkers = () => {
    axios
      .get('https://intense-stream-29923.herokuapp.com/api/markers')
      .then(response => {
        const markerArray = [];
        for (let mark in response.data) {
          markerArray.push(response.data[mark]);
        }
        this.setState({ data: markerArray });
      })
      .catch(err => console.log(err));
  };

  // ==== Filter feature for the markers ====
  markerShow = e => {
    if (e.target.name === 'seeker') {
      this.setState(prevState => {
        return {
          filter: {
            ...this.state.filter,
            seeker: !prevState.filter.seeker,
          },
        };
      });
    } else if (e.target.name === 'company') {
      this.setState(prevState => {
        return {
          filter: {
            ...this.state.filter,
            company: !prevState.filter.company,
          },
        };
      });
    }
  };

  // ==== Renders the markers to the map ====
  renderMarker = (mark, i) => {
    let { role } = mark.properties;
    let pin;
    if (role === 'seeker') {
      pin = SeekerPin;
    } else if (role === 'company') {
      pin = CompanyPin;
    }
    return (
      <Marker
        key={i}
        latitude={mark.geometry.coordinates[1]}
        longitude={mark.geometry.coordinates[0]}
        offsetTop={-30}
        offsetLeft={-12.5}
      >
        <ShowMarker
          className={role}
          src={pin}
          alt="Marker"
          onClick={() => this.setState({ pin: mark })}
          show={this.state.filter}
        />
      </Marker>
    );
  };

  // ==== Renders the popup to the map ====
  renderPopup = () => {
    const { pin } = this.state;

    let fullName = '';
    let title, jobTitle, profilePicture, role, geometry, properties;

    if (!!pin) {
      properties = pin.properties;
      geometry = pin.geometry;
      title = properties.title;
      profilePicture = properties.profilePicture;
      role = properties.role;

      if (!!pin.properties.title.firstName) {
        jobTitle = properties.jobTitle;

        fullName = `${title.firstName} ${title.lastName}`;
      } else if (!!pin.properties.title.companyName) {
        role = 'employer';

        fullName = title.companyName;
      } else {
        console.log('Not a seeker or company');
      }

      return (
        pin && (
          <Popup
            latitude={geometry.coordinates[1]}
            longitude={geometry.coordinates[0]}
            offsetTop={-20}
            closeButton={false}
            closeOnClick={false}
          >
            <CloseX onClick={() => this.setState({ pin: null })}>&#215;</CloseX>
            <PopupInfo>
              <div className="container">
                <PopupImg image={profilePicture} />
                <div>
                  <h4>{fullName}</h4>
                  {jobTitle ? (
                    <div className="jobTitle">
                      <p>Job Title:</p> <p>{jobTitle}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <Link
                className="link"
                onClick={() => {
                  this.props.history.push(`/${role}/${properties.uid}`);
                }}
              >
                Learn more
              </Link>
            </PopupInfo>
          </Popup>
        )
      );
    }
  };

  render() {
    return (
      <MapWindow>
        <MapGL
          ref={this.mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={this.handleViewportChange}
          style={{ position: 'absolute', margin: '-1px' }}
          mapStyle="mapbox://styles/lndubose/cjohrsfn608in2qqyyn2wu15g"
          onClick={() => this.setState({ pin: null })}
        >
          <Geocoder
            mapRef={this.mapRef}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
            placeholder="Search for places"
          />
          <LogoImg alt="logo" src={MainLogo} />
          <KeyBox>
            <div className="container">
              <div className="key key1">
                <PinKey src={SeekerPin} />
                <h3>Job Seeker</h3>
                <ToggleKnob htmlFor="seeker">
                  <input
                    type="checkbox"
                    name="seeker"
                    id="seeker"
                    checked={this.state.filter.seeker}
                    onChange={this.markerShow}
                  />
                </ToggleKnob>
              </div>
              <div className="key key2">
                <PinKey src={CompanyPin} />
                <h3>Employer</h3>
                <ToggleKnob htmlFor="company">
                  <input
                    type="checkbox"
                    name="company"
                    id="company"
                    checked={this.state.filter.company}
                    onChange={this.markerShow}
                  />
                </ToggleKnob>
              </div>
            </div>
          </KeyBox>

          {this.state.data.map(this.renderMarker)}

          {this.renderPopup()}
        </MapGL>
      </MapWindow>
    );
  }
}

export default LandingPage;
