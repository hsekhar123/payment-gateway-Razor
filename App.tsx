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

  render(){
     return (
       <SafeAreaView style={styles.container}>
         <StatusBar />
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
