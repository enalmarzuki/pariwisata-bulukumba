import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import auth from './auth';
import penginapan from './penginapan';
import kamar from './kamar';
import pesananUser from './pesananUser';
import wisata from './wisata';
import detail from './detail';
import kuliner from './kuliner';
import olehOleh from './olehOleh';
import destinasi from './destinasi';

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

const wisataPersistConfig = {
  key: 'wisata',
  storage: AsyncStorage,
  whitelist: ['dataWisata', 'dataDetailWisata'],
};

const detailPersistConfig = {
  key: 'detail',
  storage: AsyncStorage,
  whitelist: ['dataDetail'],
};

const kulinerPersistConfig = {
  key: 'kuliner',
  storage: AsyncStorage,
  whitelist: ['dataKuliner', 'dataDetailKuliner'],
};

const olehOlehPersistConfig = {
  key: 'olehOleh',
  storage: AsyncStorage,
  whitelist: ['dataOlehOleh', 'dataDetailOlehOleh'],
};

const destinationPersistConfig = {
  key: 'destination',
  storage: AsyncStorage,
  whitelist: ['dataDestinations'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  penginapan: persistReducer(penginapanPersistConfig, penginapan),
  kamar: persistReducer(kamarPersistConfig, kamar),
  pesananUser: persistReducer(pesananUserPersistConfig, pesananUser),
  wisata: persistReducer(wisataPersistConfig, wisata),
  detail: persistReducer(detailPersistConfig, detail),
  kuliner: persistReducer(kulinerPersistConfig, kuliner),
  olehOleh: persistReducer(olehOlehPersistConfig, olehOleh),
  destinasi: persistReducer(destinationPersistConfig, destinasi),
});

export default rootReducer;
