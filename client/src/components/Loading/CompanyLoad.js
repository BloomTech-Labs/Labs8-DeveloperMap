import React from 'react';
import { CompanyLoadStyle } from './LoadingModalStyle';

const CompanyLoad = () => {
  return (
    <CompanyLoadStyle>
      <div className="left-side">
        <div className="image-container animate" />
        <div className="name-container animate" />
        <div className="info-container animate" />
      </div>
      <div className="job-side">
        <div className="jobs-container animate" />
        <div className="jobs-container animate" />
        <div className="jobs-container animate" />
        <div className="jobs-container animate" />
        <div className="jobs-container animate" />
      </div>
    </CompanyLoadStyle>
  );
};

export default CompanyLoad;
