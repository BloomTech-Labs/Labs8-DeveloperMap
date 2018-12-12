import React from 'react';
import renderer from 'react-test-renderer';

import LandingPage from './LandingPage';

describe(`Landing Page Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LandingPage />).toJSON();
        expect(tree).toMatchSnapshot();
      });
})