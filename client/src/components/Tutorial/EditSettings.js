import React from 'react';
import styled from 'styled-components';


const EditSettings = () => {
    return (
        <SettingsGuide>
           <h1>Edit Settings</h1>
           <p>To edit your profile settings and change your information, click on the cog in the top 
               right of your screen.
           </p>
           <h1>Picture goes here</h1>
           <p>Then hit edit in the top right corner of the modal. Make sure you hit the save button before 
               closing, or your new settings will not be saved.
           </p>
           <h1>Picture goes here</h1>
        </SettingsGuide>
    );
}

const SettingsGuide = styled.div`
  padding: 5%;
`;

export default EditSettings;