import React from 'react';
import styled from 'styled-components';
import company from '../../images/markerlogo4.png';
import jobs from '../../images/jobs.PNG';
import fav from '../../images/favicon.PNG';

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
           <img src={jobs} alt=""/>
           <p>To find jobs that have been favorited by you, click on the favorites icon on the Nav bar at 
               the top of the screen.
           </p>
           <img src={fav} alt="" className='fav'/>
           <Next onClick={this.switchPage}>Next</Next>
        </ProfileGuide>
    );
    }
}

const ProfileGuide = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
      margin: 2%;
      line-height: 1.25;
  }
  .fav{
      margin-bottom: 15px;
  }
`;

const Next = styled.button`
  width: 100px;
  border: none;
  border-radius: 25px;
  background-color: rgba(109, 7, 26, .95);
  cursor: pointer;
  outline: none;
  height: 30px;
  color: white;
  box-shadow: 0 4px 2px -2px gray;
  &:hover {
    background-color: rgba(109, 7, 26, .75);
  }
`;

export default ComProfileGuide;