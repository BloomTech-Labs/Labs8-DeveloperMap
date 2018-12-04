import React from 'react';
import styled from 'styled-components';
import company from '../../images/markerlogo4.png';

class ComProfileGuide extends React.Component{
    switchPage = () => {
        this.props.history.push('/tutorial/editsettings');
    }
    render(){
    return (
        <ProfileGuide>
           <h1>Employer Profile</h1>
           <p>
               By clicking on a <span><img src={company} alt="" style={{width:'50px'}}/></span> marker 
               on the map, you will be brought to that companies profile. You will see some general 
               contact information for that company, as well as any jobs they have posted. By clicking the 
               heart affiliated with each job.
           </p>
           <h1>Picture goes here</h1>
           <p>To find jobs that have been favorited by you, click on the favorites icon on the Nav bar at 
               the top of the screen.
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

export default ComProfileGuide;