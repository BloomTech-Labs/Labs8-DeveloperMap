import React from 'react';
import Heart from '../../images/hollow-heart.png';
import EmployerPostings from './EmployerPostings';

function JobPosting(props) {
    if(!props.posts || !props.posts.length){
        return <h1>Post your first job!</h1>
    }

    return (
        <div>
            <h2>{props.post.companyName}</h2>
            <h3>{props.post.date}</h3>
            <h4>{props.post.jobLink}</h4>
            <h4>{props.post.jobTitle}</h4>
            <h4>{props.post.location}</h4>
            <img alt='hollow heart' src={Heart} style={{width:'50px'}} onClick={props.favToggle}/>
        </div>
)
}

export default JobPosting;