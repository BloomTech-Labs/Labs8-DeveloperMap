import React from 'react';
import {GlobeContainer, LoadingModalMain, LoadingContainer} from './LoadingStyles.js';

const SpinningGlobe = () => {
  return (
    <LoadingContainer>
      <LoadingModalMain>
        <GlobeContainer>
        <div className="globe-filter"/>
        <div className="globe-spinning"/>
      </GlobeContainer>
    </LoadingModalMain>
   </LoadingContainer>
  )
}

export default SpinningGlobe;