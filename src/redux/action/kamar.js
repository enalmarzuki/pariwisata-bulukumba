import axios from 'axios';
import {
  BOOKING_FINISH,
  BOOKING_START,
  KAMAR_FAIL,
  KAMAR_START,
  KAMAR_SUCCESS,
} from '../type';

export const actionGetRoom = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: KAMAR_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/kamar/${id}`)
      .then(res => {
        dispatch({type: KAMAR_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: KAMAR_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionBookingRoom = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: BOOKING_START});
    axios
      .post('https://skripsi-wulan.herokuapp.com/pesanan', data)
      .then(res => {
        dispatch({type: BOOKING_FINISH});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: BOOKING_FINISH});
        reject(err.response.status);
      });
  });
};
