import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  DetailKamar,
  DetailPenginapan,
  GetStarted,
  Penginapan,
  SplashScreen,
  MetodePembayaran,
} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="MetodePembayaran">
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
      <Stack.Screen
        name="DetailKamar"
        component={DetailKamar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MetodePembayaran"
        component={MetodePembayaran}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
