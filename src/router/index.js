import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  DetailKamar,
  DetailPenginapan,
  GetStarted,
  Penginapan,
  SplashScreen,
  MetodePembayaran,
  KonfirmasiPembayaran,
  ProsesPembayaran,
} from '../pages';

const Stack = createStackNavigator();

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
      <Stack.Screen
        name="KonfirmasiPembayaran"
        component={KonfirmasiPembayaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProsesPembayaran"
        component={ProsesPembayaran}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
