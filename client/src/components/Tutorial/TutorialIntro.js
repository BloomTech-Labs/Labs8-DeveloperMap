import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import Intro from './Intro';
import GettingStarted from './GettingStarted';
import Navigation from './Navigation';
import UsingMarkers from './UsingMarkers';
import DevProfileGuide from './DevProfileGuide';
import ComProfileGuide from './ComProfileGuide';
import EditSettings from './EditSettings';
import { withRouter, Route, NavLink } from 'react-router-dom';

import { Navigate } from './TutorialStyle';

class TutorialIntro extends React.Component {
  render() {
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain
          style={{
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '650px',
            flexDirection: 'column',
          }}
        >
          <Navigate>
            <NavLink to={`${this.props.match.path}/gettingstarted`}>
              Getting Started
            </NavLink>
            <NavLink to={`${this.props.match.path}/navigation`}>
              Navigation
            </NavLink>
            <NavLink to={`${this.props.match.path}/usingmarkers`}>
              Using Markers
            </NavLink>
            <NavLink to={`${this.props.match.path}/devprofileguide`}>
              Seeker Profile
            </NavLink>
            <NavLink to={`${this.props.match.path}/comprofileguide`}>
              Employer Profile
            </NavLink>
            <NavLink to={`${this.props.match.path}/editsettings`}>
              Edit Settings
            </NavLink>
          </Navigate>
          <div>
            <Route exact path="/tutorial" component={Intro} />
            <Route
              path={`${this.props.match.path}/gettingstarted`}
              component={GettingStarted}
            />
            <Route
              path={`${this.props.match.path}/navigation`}
              component={Navigation}
            />
            <Route
              path={`${this.props.match.path}/usingmarkers`}
              component={UsingMarkers}
            />
            <Route
              path={`${this.props.match.path}/devprofileguide`}
              component={DevProfileGuide}
            />
            <Route
              path={`${this.props.match.path}/comprofileguide`}
              component={ComProfileGuide}
            />
            <Route
              path={`${this.props.match.path}/editsettings`}
              component={EditSettings}
            />
          </div>
        </ModalMain>
      </ModalContainer>
    );
  }
}


// const Navigate = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 3%;
//   a {
//     text-decoration: none;
//     color: rgba(109, 7, 26, 0.95);
//   }
// `;

export default withRouter(TutorialIntro);
