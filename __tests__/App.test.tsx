/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const {View: MockView} = require('react-native');
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />,
  };
});
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: () => <></>,
    Group: () => <></>,
    Screen: () => <></>,
  }),
}));
jest.mock('react-native-vector-icons/Feather', () => () => <></>);
jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-razorpay', () => {
  return {
    default: {
      RazorpayCheckout: jest.fn(),
    },
  };
});
jest.mock('react-native-maps', () => {
  return {
    default: {
      MapView: () => <></>
    }
  }
});

jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
    IOS: {
      ACCESS_FINE_LOCATION: 'ios.permission.ACCESS_FINE_LOCATION',
    },
  },
  request: jest
    .fn()
    .mockImplementation((...args) => Promise.resolve('unavailable'))
    .mockImplementationOnce((...args) => Promise.resolve('granted'))
    .mockImplementationOnce((...args) => Promise.resolve('denied'))
    .mockImplementationOnce((...args) => Promise.resolve('blocked')),
}));
