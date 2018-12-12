import React from 'react';
import renderer from 'react-test-renderer';
import ComProfileGuide from './ComProfileGuide';
import { shallow } from 'enzyme';

describe(`com profile guide Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <ComProfileGuide />
        );
        expect(tree).toMatchSnapshot();
      });

});