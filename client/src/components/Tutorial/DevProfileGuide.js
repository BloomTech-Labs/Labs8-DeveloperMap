import React from 'react';
import styled from 'styled-components';
import seeker from '../../images/markerlogo.png';

class DevProfileGuide extends React.Component{
    switchPage = () => {
        this.props.history.push('/tutorial/comprofileguide');
    }
    render() {
    return (
        <ProfileGuide>
           <h1>Job Seeker Profile</h1>
           <p>
               By clicking on a <span><img src={seeker} alt="" style={{width:'50px'}}/></span> marker 
               on the map, you will be brought to that job seekers profile. The icons on the right will 
               bring you to various accounts for the user such as linkedIn or their portfolio page.
           </p>
           <h1>Picture goes here</h1>
           <p>
               At the bottom you will see their contact info if you are a verified company through MappaJob. 
           </p>
           <h1>Picture goes here</h1>
           <button onClick={this.switchPage}>Next</button>
        </ProfileGuide>
    );
    }
}

const ProfileGuide = styled.div`
  padding: 5%;
`;

export default DevProfileGuide;