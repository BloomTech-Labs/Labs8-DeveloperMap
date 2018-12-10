import React from 'react';
import {GlobeContainer} from './LoadingStyles.js';

const SpinningGlobe = () => {
  return (
    <GlobeContainer>
     <div className="globe-filter"/>
     <div className="globe-spinning"/>
   </GlobeContainer>
  )
}

export default SpinningGlobe;