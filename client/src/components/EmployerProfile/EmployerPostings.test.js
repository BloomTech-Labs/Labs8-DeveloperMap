import React from 'react';
import renderer from 'react-test-renderer';

import EmployerPostings from './EmployerPostings';

describe(`Employer Postings Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(<EmployerPostings />).toJSON();
        expect(tree).toMatchSnapshot();
      });
})