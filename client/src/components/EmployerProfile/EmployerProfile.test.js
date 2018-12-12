import React from 'react';
import renderer from 'react-test-renderer';

import EmployerProfile from './EmployerProfile';

describe(`Employer Profile Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(<EmployerProfile />).toJSON();
        expect(tree).toMatchSnapshot();
      });
})