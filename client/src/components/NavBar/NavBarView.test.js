import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './NavBarView';


describe(`Nav Bar Component`, () => {
    it('renders correctly', () => {
        const tree = renderer.create(
          <NavBar />
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });

    it('render user prop correctly with null value', () => {  
      const props = {
              user: null
          },
          NavComponent = mount(<NavBar {...props} />);
      expect((NavComponent).prop('user')).toEqual(null);
    });  

    it('render user with empty value', () => {  
        const props = {
            user: ''
        },
        NavComponent = mount(<NavBar {...props} />);
    expect((NavComponent).prop('user')).toBeFalsy();
    });

})