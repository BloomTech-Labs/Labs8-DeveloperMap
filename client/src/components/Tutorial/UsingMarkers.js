import React from 'react';
import styled from 'styled-components';
import company from '../../images/markerlogo4.png';
import seeker from '../../images/markerlogo.png';

class UsingMarkers extends React.Component{
    switchPage = () => {
        this.props.history.push('/tutorial/devprofileguide');
    }
    render(){
    return (
        <MarkerGuide>
            <h1>Using the Markers</h1>
            <p>
                There are two types of markers on the map. Companies are 
                <span><img src={company} alt="" style={{ width:'50px'}}/></span>
                and Job Seekers are 
                <span><img src={seeker} alt="" style={{ width:'50px'}}/></span>.
                You can click on a marker to bring up the name of the company or seeker in which that 
                maker belongs to. Clicking on the link there will bring you to their profile page.
            </p>
            <p>
                If you want to display only seekers or only companies, you can use the key in the bottom 
                right hand corner of your screen. 
            </p>
            <h1>Picture Goes here</h1>
            <button onClick={this.switchPage}>Next</button>
        </MarkerGuide>
    );
    }
}

const MarkerGuide = styled.div`
  padding: 5%;
`;

export default UsingMarkers;