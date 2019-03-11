import React from 'react';
import SeekerLoad from './SeekerLoad';
import { Timeline } from './LoadingModalStyle';

const LoadingModal = props => {
  return (
    <Timeline className="timeline-item">
      {props.type === 'seeker' ? <SeekerLoad /> : <div />}
    </Timeline>
  );
};

export default LoadingModal;
