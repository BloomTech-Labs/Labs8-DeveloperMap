import React from 'react';
import renderer from 'react-test-renderer';
import NoUser from './NoUser';

describe(`no user Component`, () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoUser />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
