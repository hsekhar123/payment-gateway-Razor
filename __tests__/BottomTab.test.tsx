import React from 'react';
import {render} from '@testing-library/react-native';
import BottomTab from '../src/navigation/BottomTab';
const {View: MockView} = require('react-native');
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: (props: any) => {
      props.screenOptions.headerShown = false;
      return <MockView {...props} />;
    },
    Screen: (props: any) => {
                props.options.tabBarIcon({ color:"black"})
                return <MockView {...props} />
            }
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
      MapView: () => <></>,
    },
  };
});

jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
    IOS: {
      LOCATION_ALWAYS: 'IOS.permission.LOCATION_ALWAYS',
    },
  },
  request: jest
    .fn()
    .mockImplementation((...args) => Promise.resolve('granted'))
    .mockImplementationOnce((...args) => Promise.resolve('unavailable'))
    .mockImplementationOnce((...args) => Promise.resolve('denied')),
  opensettings: jest.fn().mockImplementation(() => Promise.resolve()),
}));
describe('Bottom tab navigation page', () => {
  it('Bottom tab', () => {
    render(<BottomTab />);
  });
});
