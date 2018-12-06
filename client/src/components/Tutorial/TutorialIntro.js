import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import Intro from './Intro';
import GettingStarted from './GettingStarted';
import Navigation from './Navigation';
import UsingMarkers from './UsingMarkers';
import DevProfileGuide from './DevProfileGuide';
import ComProfileGuide from './ComProfileGuide';
import EditSettings from './EditSettings';
import { withRouter, Route } from 'react-router-dom';

class TutorialIntro extends React.Component {
    
    render() {
        return (
            <ModalContainer data-type="modal-container">
                <ModalMain 
                    style={{ 
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '650px'
                    }}
                    >
                    
                    <div>
                        <Route exact path='/tutorial' component={Intro}/>
                        <Route path={`${this.props.match.path}/gettingstarted`} component={GettingStarted}/>
                        <Route path={`${this.props.match.path}/navigation`} component={Navigation} />
                        <Route path={`${this.props.match.path}/usingmarkers`} component={UsingMarkers} />
                        <Route path={`${this.props.match.path}/devprofileguide`} component={DevProfileGuide} />
                        <Route path={`${this.props.match.path}/comprofileguide`} component={ComProfileGuide} />
                        <Route path={`${this.props.match.path}/editsettings`} component={EditSettings}/>
                    </div>
                </ModalMain>
            </ModalContainer>
        )
    }
}


export default withRouter(TutorialIntro);