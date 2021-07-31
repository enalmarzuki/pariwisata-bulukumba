import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Router from './router';

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
