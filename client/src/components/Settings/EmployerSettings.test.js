import React from 'react';
import renderer from 'react-test-renderer';
import EmployerSettings from './EmployerSettings';
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

  const firebase = mocksdk.initializeApp();
  // can take a path arg to database url
  // optional - expose the mock
  global.firebase = firebase;

  // return the mock to match your export api
  return firebase;
});

describe(`employer settings component`, () => {
  it.skip(`should render without error`, () => {
    const props = {
        currentSignedInUser: {
            uid: 'uid1'
        }
    }

    const tree = shallow(<EmployerSettings {...props}/>);
    expect(tree).toMatchSnapshot();
  });
});