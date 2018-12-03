import React from 'react';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import styled from 'styled-components';
import Intro from './Intro';
import GettingStarted from './GettingStarted';


class TutorialIntro extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {

        return (
            <ModalContainer data-type="modal-container">
                <ModalMain>
                    <div>
                        <GettingStarted/>
                        <Intro />
                    </div>
                </ModalMain>
            </ModalContainer>
        )
    }
}


export default TutorialIntro;