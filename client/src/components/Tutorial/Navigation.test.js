import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from './Navigation';
import { shallow } from 'enzyme';

describe(`navigation Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <Navigation />
        );
        expect(tree).toMatchSnapshot();
      });

});