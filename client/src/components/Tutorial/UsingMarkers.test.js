import React from 'react';
import renderer from 'react-test-renderer';
import UsingMarkers from './UsingMarkers';


describe(`using markers Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(
          <UsingMarkers />
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });

});

