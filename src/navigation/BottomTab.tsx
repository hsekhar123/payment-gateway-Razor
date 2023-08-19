import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
class BottomTab extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <AntDesign
                  name="home"
                  size={25}
                  color={focused ? 'black' : 'gray'}
                />
                        ),
                title:'Payment'
            }}
            name="Home"
            component={HomePage}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <Feather
                  name="map-pin"
                  size={25}
                  color={focused ? 'black' : 'gray'}
                />
              ),
            }}
            name="Map"
            component={MapPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
export default BottomTab;
