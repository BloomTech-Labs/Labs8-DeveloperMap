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
            </StartContainer>

    );
}

const StartContainer = styled.div`
  padding: 5%;
  display: none;
`;

export default GettingStarted;