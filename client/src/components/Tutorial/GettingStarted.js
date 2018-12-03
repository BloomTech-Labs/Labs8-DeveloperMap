import React from 'react';
import styled from 'styled-components';


const GettingStarted = (props) => {
    return (

            <StartContainer>
                <h1>Getting Started</h1>
                <p>
                    You can start by signing up through the Sign In button in the top right
                    corner of the App. This is also where you will sign in once your account 
                    is set up.
                </p>
                <h1>Picture Goes Here</h1>
                <p>
                    Click on the 'Register Here' link to start filling out your information needed to 
                    use the application effectively. You will be prompted to choose whether you are 
                    a Job Seeker or an Employer.
                </p>
                <h1>Picture Goes Here</h1>
                <p>
                    Next Enter your Email and Password that you would like to affiliate with your account. Note: You 
                    will be re-entering these in just a second. Now just fill out the Sign up form with your info and 
                    submit. You will then be redireced to the Map.
                </p>
            </StartContainer>

    );
}

const StartContainer = styled.div`
  padding: 5%;
  display: none;
`;

export default GettingStarted;