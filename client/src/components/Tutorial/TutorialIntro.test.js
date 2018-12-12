import React from 'react';
import renderer from 'react-test-renderer';
import TutorialIntro from './TutorialIntro';
import { shallow } from 'enzyme';

describe(`tutorial intro Component`, () => {
    it('renders correctly', () => {
        const tree = shallow(
          <TutorialIntro />
        );
        expect(tree).toMatchSnapshot();
      });

});