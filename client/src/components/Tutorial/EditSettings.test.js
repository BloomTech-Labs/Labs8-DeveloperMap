import React from 'react';
import renderer from 'react-test-renderer';
import EditSettings from './EditSettings';
import { shallow } from 'enzyme';

describe(`edit settings Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <EditSettings />
        );
        expect(tree).toMatchSnapshot();
      });

});