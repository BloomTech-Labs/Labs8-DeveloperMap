import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './SignIn';

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

describe(`seeker profile component`, () => {
  it(`should render without error`, () => {
    const props = {
      match: {
        params: {
          seekerId: 'uid1',
        },
      },
    };

    const tree = renderer.create(<SignIn {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});