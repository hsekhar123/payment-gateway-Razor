import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MapPage from '../src/pages/MapPage';
import { Platform } from 'react-native';

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  const MockMapView = (props: any) => <View {...props} />;
  const MockMarker = (props: any) => <View {...props} />;
  const PROVIDER_DEFAULT = 'mocked-provider-default';
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_DEFAULT: PROVIDER_DEFAULT,
  };
});

describe("for MapPages", () => {
    it(' test for android platform', () => {
        Platform.OS = 'android'
        render(<MapPage />)
    });

    it(' test for ios platform', () => {
        Platform.OS = 'ios'
        render(<MapPage />)
    })
    it('render page', () => {
        render(<MapPage />);
        const map = screen.getByTestId('google-map');
        // console.log("===map", map)
        expect(map).toBeTruthy()
    })


});
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.PERMISSIONS.ACCESS_FINE_LOCATION',
    },
    IOS: {
      LOCATION_WHEN_IN_USE: 'IOS.PERMISSIONS.LOCATION_WHEN_IN_USE',
    },
  },
  request: jest.fn().mockImplementation((...args) => Promise.resolve('granted'))
    .mockImplementationOnce((...args) => Promise.resolve('unavailable'))
    .mockImplementationOnce((...args) => Promise.resolve('denied')),
  opensettings: jest.fn().mockImplementation(() => Promise.resolve()),
}));

