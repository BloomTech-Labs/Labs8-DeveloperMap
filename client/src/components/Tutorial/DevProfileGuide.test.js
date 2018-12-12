import React from 'react';
import renderer from 'react-test-renderer';
import DevProfileGuide from './DevProfileGuide';
import { shallow } from 'enzyme';

describe(`dev profile guide Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <DevProfileGuide />
        );
        expect(tree).toMatchSnapshot();
      });

});