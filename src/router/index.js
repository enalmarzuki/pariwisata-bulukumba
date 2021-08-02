import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DetailPenginapan, GetStarted, Penginapan, SplashScreen} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="DetailPenginapan">
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
      <Stack.Screen
        name="DetailPenginapan"
        component={DetailPenginapan}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
