import axios from 'axios';
import {
  KULINER_DETAIL_FAIL,
  KULINER_DETAIL_START,
  KULINER_DETAIL_SUCCESS,
  KULINER_FAIL,
  KULINER_START,
  KULINER_SUCCESS,
} from '../type';

export const actionGetKuliner = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: KULINER_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/kuliner')
      .then(res => {
        dispatch({type: KULINER_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: KULINER_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailKuliner = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: KULINER_DETAIL_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/kuliner/${id}`)
      .then(res => {
        console.log('res dadaasdsad', res);
        dispatch({type: KULINER_DETAIL_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        console.log('err asdadsad', err);
        dispatch({type: KULINER_DETAIL_FAIL});
        reject(err.response.status);
      });
  });
};
