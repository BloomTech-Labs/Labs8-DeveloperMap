import React from 'react';
import renderer from 'react-test-renderer';
import GettingStarted from './GettingStarted';
import { shallow } from 'enzyme';

describe(`getting started Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <GettingStarted />
        );
        expect(tree).toMatchSnapshot();
      });

});