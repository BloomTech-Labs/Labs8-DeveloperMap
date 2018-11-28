import React from 'react';
import styled from 'styled-components';


function JobPosting(props) {
    // if(!props.posts || !props.posts.length){
    //     return <h1>Post your first job!</h1>
    // }
    return (
        <Job>
            <div>
            <h2>{props.post.companyName}</h2>
            <h3>{props.post.date}</h3>
            <h4>{props.post.jobLink}</h4>
            <h4>{props.post.jobTitle}</h4>
            <h4>{props.post.location}</h4>
            </div>
            <div>
            <img alt='hollow heart' src={props.heart} style={{width:'50px'}} onClick={props.favToggle}/>
            </div>
        </Job>
)
}

const Job = styled.div`
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 350px;
  width: 100%;
  border: .7px solid rgba(220,220,220,.6);
  padding: 5%;
  margin-bottom: 15px;
  &:hover{
      box-shadow: none;
  }
`;

export default JobPosting;