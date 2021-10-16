import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import reducer from '../reducers';

const middleware = [thunk];

const configureStore = () => {
  const store = createStore(reducer, compose(applyMiddleware(...middleware)));
  const persistor = persistStore(store);
  return {store, persistor};
};

const {store, persistor} = configureStore();

export {store, persistor};
