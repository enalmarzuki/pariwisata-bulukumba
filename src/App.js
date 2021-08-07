import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider as PaperProvider} from 'react-native-paper';
import Router from './router';

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PaperProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
