import React from 'react';
import renderer from 'react-test-renderer';

import NavBar from './NavBarView';

describe(`Nav Bar Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(<NavBar />).toJSON();
        expect(tree).toMatchSnapshot();
      });
})