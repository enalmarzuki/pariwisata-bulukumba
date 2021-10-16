import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import auth from './auth';
import penginapan from './penginapan';
import kamar from './kamar';
import pesananUser from './pesananUser';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['dataUser'],
};

const penginapanPersistConfig = {
  key: 'penginapan',
  storage: AsyncStorage,
  whitelist: ['dataPenginapan', 'dataDetailPenginapan'],
};

const kamarPersistConfig = {
  key: 'kamar',
  storage: AsyncStorage,
  whitelist: ['dataKamar'],
};

const pesananUserPersistConfig = {
  key: 'pesananUser',
  storage: AsyncStorage,
  whitelist: ['dataListPesanan'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  penginapan: persistReducer(penginapanPersistConfig, penginapan),
  kamar: persistReducer(kamarPersistConfig, kamar),
  pesananUser: persistReducer(pesananUserPersistConfig, pesananUser),
});

export default rootReducer;
