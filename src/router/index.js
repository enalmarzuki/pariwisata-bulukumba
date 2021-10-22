/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
  Home,
  Wisata,
  DetailWisata,
  Kuliner,
  DetailKuliner,
  Oleh,
  DetailOleh,
  Agenda,
  Pesanan,
  KelolaKamar,
  DetailPesanan,
  ListPesanan,
  AdminKamar,
} from '../pages';
import {BottomNavigator, TopNavigatior} from '../components';
import Tambah from '../components/organism/Modal/Agenda/Tambah';
import {Dimensions, Text, View} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} />}
      initialRouteName="Pariwisata">
      <Tab.Screen
        name="Pariwisata"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
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
        name="AdminPesanan"
        component={Pesanan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminDetailPesanan"
        component={DetailPesanan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminKamar"
        component={AdminKamar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Penginapan"
        component={Penginapan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListPesanan"
        component={ListPesanan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Wisata"
        component={Wisata}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Kuliner"
        component={Kuliner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Oleh"
        component={Oleh}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPenginapan"
        component={DetailPenginapan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailWisata"
        component={DetailWisata}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailKamar"
        component={DetailKamar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailKuliner"
        component={DetailKuliner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailOleh"
        component={DetailOleh}
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
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{headerShown: false}}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="MyModal"
          component={Tambah}
          options={{presentation: 'transparentModal', headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Router;
