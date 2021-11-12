import axios from 'axios';
import {
  SUPER_ADMIN_KULINER_FAIL,
  SUPER_ADMIN_KULINER_START,
  SUPER_ADMIN_KULINER_SUCCESS,
  SUPER_ADMIN_OLEH_FAIL,
  SUPER_ADMIN_OLEH_START,
  SUPER_ADMIN_OLEH_SUCCESS,
  SUPER_ADMIN_USER_FAIL,
  SUPER_ADMIN_USER_START,
  SUPER_ADMIN_USER_SUCCESS,
  SUPER_ADMIN_WISATA_FAIL,
  SUPER_ADMIN_WISATA_START,
  SUPER_ADMIN_WISATA_SUCCESS,
} from '../type';

export const actionGetWisata = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: SUPER_ADMIN_WISATA_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/wisata')
      .then(res => {
        dispatch({type: SUPER_ADMIN_WISATA_SUCCESS, wisata: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: SUPER_ADMIN_WISATA_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetKuliner = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: SUPER_ADMIN_KULINER_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/kuliner')
      .then(res => {
        dispatch({type: SUPER_ADMIN_KULINER_SUCCESS, kuliner: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: SUPER_ADMIN_KULINER_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetOlehOleh = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: SUPER_ADMIN_OLEH_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/toko')
      .then(res => {
        dispatch({type: SUPER_ADMIN_OLEH_SUCCESS, oleh: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: SUPER_ADMIN_OLEH_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetUserAdmin = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: SUPER_ADMIN_USER_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/user/admin')
      .then(res => {
        dispatch({type: SUPER_ADMIN_USER_SUCCESS, admin: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: SUPER_ADMIN_USER_FAIL});
        reject(err.response.status);
      });
  });
};
