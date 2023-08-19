import React, {Component} from 'react';
import {Linking} from 'react-native';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
interface IProps {}
interface IState {
  cordinate: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}
class MapPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cordinate: {
        latitude: 17.448294,
        longitude: 78.391487,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  componentDidMount() {
    this.requestPermission();
  }
  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        console.log('result=>>', result);
        if (result === 'granted') {
          console.log("Permission granted")
        } else if(result === "unavailable") {
           console.log('This feature is not available (on this device / in this context)')
        } else if(result === 'denied') {
          console.log("The permission has not been requested / is denied but requestable")
        } else {
          Linking.openSettings()
        }
      } catch (err) {
        console.log('ios permission error', err);
      }
    } else {
      try {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        console.log('result=>>', result);
        if (result === 'granted') {
          console.log('Permission granted');
        } else if (result === 'unavailable') {
          console.log(
            'This feature is not available (on this device / in this context)',
          );
        } else if (result === 'denied') {
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
        } else {
          Linking.openSettings();
        }
      } catch (err) {
        console.log('permission', err);
      }
    }
  };
  render() {
    const {cordinate} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <MapView
            testID="google-map"
            initialRegion={cordinate}
            style={{ width: '100%', height: '100%' }}
            zoomControlEnabled={true}
          >
            <Marker coordinate={this.state.cordinate} />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}
export default MapPage;
const styles = StyleSheet.create({
  container: {
    // backgroundColor:"rgba(230,230,230,1)"
  },
  text2: {
    textAlign: 'center',
    color: 'green',
    fontSize: 20,
  },
});
