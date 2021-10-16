import axios from 'axios';
import {showError} from '../../utils/showMessage';
import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS} from '../type';

export const actionLogin = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: AUTH_START});
    axios
      .post('https://skripsi-wulan.herokuapp.com/auth/login', data)
      .then(res => {
        dispatch({type: AUTH_SUCCESS, value: res.data?.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: AUTH_FAIL});
        showError('Email atau password anda salah');
        reject(err.response.status);
      });
  });
};
