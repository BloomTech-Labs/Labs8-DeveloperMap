import React from 'react';
import renderer from 'react-test-renderer';
import Intro from './Intro';
import { shallow } from 'enzyme';

describe(`intro Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <Intro />
        );
        expect(tree).toMatchSnapshot();
      });

});