import axios from 'axios';
import {
  OLEH_OLEH_DETAIL_FAIL,
  OLEH_OLEH_DETAIL_START,
  OLEH_OLEH_DETAIL_SUCCESS,
  OLEH_OLEH_FAIL,
  OLEH_OLEH_START,
  OLEH_OLEH_SUCCESS,
} from '../type';

export const actionGetOlehOleh = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: OLEH_OLEH_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/toko')
      .then(res => {
        dispatch({type: OLEH_OLEH_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: OLEH_OLEH_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailOlehOleh = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: OLEH_OLEH_DETAIL_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/toko/${id}`)
      .then(res => {
        console.log('res dadaasdsad', res);
        dispatch({type: OLEH_OLEH_DETAIL_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        console.log('err asdadsad', err);
        dispatch({type: OLEH_OLEH_DETAIL_FAIL});
        reject(err.response.status);
      });
  });
};
