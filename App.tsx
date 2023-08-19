/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomePage from './src/pages/HomePage';
import BottomTab from './src/navigation/BottomTab';
import { check,request,PERMISSIONS,openSettings } from 'react-native-permissions';
class App extends React.Component{
  // componentDidMount(){
  //   this.requestHandler()
  // }
  // requestHandler = async() => {
  //   if (Platform.OS === "ios") {
  //     try {
  //       const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
  //       console.log('result=>>', result);
  //       switch (result) {
  //         case 'unavailable':
  //           console.log(
  //             'This feature is not available (on this device / in this context)',
  //           );
  //           break;
  //         case 'denied':
  //           console.log(
  //             'The permission has not been requested / is denied but requestable',
  //           );
  //           break;
  //         case 'limited':
  //           console.log('The permission is limited: some actions are possible');
  //           break;
  //         case 'granted':
  //           console.log('The permission is granted');
  //           break;
  //         default:
  //           Linking.openSettings();
  //       }
  //     } catch (err) {
  //       console.log('ios error', err);
  //     }
  //   } else {
  //      try {
  //       const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //       console.log('result=>>', result);
  //       switch (result) {
  //         case 'unavailable':
  //           console.log(
  //             'This feature is not available (on this device / in this context)',
  //           );
  //           break;
  //         case 'denied':
  //           console.log(
  //             'The permission has not been requested / is denied but requestable',
  //           );
  //           break;
  //         case 'limited':
  //           console.log('The permission is limited: some actions are possible');
  //           break;
  //         case 'granted':
  //           console.log('The permission is granted');
  //           break;
  //         default:
  //           Linking.openSettings()
  //       }
  //     } catch (err) {
  //       console.log('Android error', err);
  //     }
  //   }
  // }
  render(){
     return (
       <SafeAreaView style={styles.container}>
         <StatusBar />
         {/* <HomePage/> */}
         <BottomTab />
       </SafeAreaView>
     );
  }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex:1
  }
})
