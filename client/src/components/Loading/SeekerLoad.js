import React from 'react';
import { SeekerLoadStyle } from './LoadingModalStyle';

const SeekerLoad = () => {
  return (
    <SeekerLoadStyle>
      <div className="image-container animate" />
      <div className="name-container animate" />
      <div className="location-container animate" />
      <div className="info-container animate" />
    </SeekerLoadStyle>
  );
};

export default SeekerLoad;
