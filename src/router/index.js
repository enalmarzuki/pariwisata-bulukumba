import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {GetStarted, Penginapan, SplashScreen} from '../pages';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Penginapan">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Penginapan"
        component={Penginapan}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
