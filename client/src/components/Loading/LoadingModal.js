import React from 'react';
import SeekerLoad from './SeekerLoad';
import CompanyLoad from './CompanyLoad';
import { Timeline } from './LoadingModalStyle';

const LoadingModal = props => {
    return (
        <Timeline className="timeline-item">
            {props.type === 'seeker' ? <SeekerLoad /> : <CompanyLoad />}
        </Timeline>
    );
};

export default LoadingModal;
