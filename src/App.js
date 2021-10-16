import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider as PaperProvider} from 'react-native-paper';
import Router from './router';
import {Provider} from 'react-redux';
import {persistor, store} from './redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PaperProvider>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
