import React from 'react';
import fav from '../../images/favicon.PNG';
import edit from '../../images/edit.PNG';

import { TutorialStyle, Next } from './TutorialStyle';

class EditSettings extends React.Component {
  switchPage = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <TutorialStyle>
        <h1>Edit Settings</h1>
        <p>
          To edit your profile settings and change your information, click on
          the cog in the top right of your screen.
        </p>
        <img src={fav} alt="" />
        <p>
          Then hit edit in the top right corner of the modal. Make sure you hit
          the save button before closing, or your new settings will not be
          saved.
        </p>
        <img src={edit} alt="" />
        <Next onClick={this.switchPage}>Done</Next>
      </TutorialStyle>
    );
  }
}

export default EditSettings;
