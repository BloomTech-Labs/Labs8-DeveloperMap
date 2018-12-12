import React from 'react';
import renderer from 'react-test-renderer';
import Settings from './Settings';
import { shallow } from 'enzyme';

jest.mock('../../firebase/firebase', () => {
  const firebasemock = require('firebase-mock');

  const mockdatabase = new firebasemock.MockFirebase();
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(
    path => {
      return path ? mockdatabase.child(path) : mockdatabase;
    },
    () => {
      return mockauth;
    }
  );

  const firebase = mocksdk.initializeApp(); // can take a path arg to database url
  // optional - expose the mock
  global.firebase = firebase;

  // return the mock to match your export api
  return firebase;
});

describe(`settings component`, () => {
  it(`should render without error`, () => {
    const props = {
        currentSignedInUser: {
            role: 'seeker'
        }
    }

    const tree = shallow(<Settings {...props}/>)
    expect(tree).toMatchSnapshot();
  });
});