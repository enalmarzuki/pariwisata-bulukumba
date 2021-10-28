import axios from 'axios';
import {showError} from '../../utils/showMessage';
import {
  BOOKING_FINISH,
  BOOKING_START,
  DETAIL_PESANAN_USER_SUCCESS,
  PESANAN_USER_FAIL,
  PESANAN_USER_START,
  PESANAN_USER_SUCCESS,
} from '../type';

export const actionGetListPesananUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: PESANAN_USER_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/pesanan/list/${id}`)
      .then(res => {
        dispatch({type: PESANAN_USER_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: PESANAN_USER_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailPesananUser = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: PESANAN_USER_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/pesanan/${id}`)
      .then(res => {
        dispatch({type: DETAIL_PESANAN_USER_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: PESANAN_USER_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailPesananAdmin = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: PESANAN_USER_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/pesanan/listAdmin/${id}`)
      .then(res => {
        dispatch({type: PESANAN_USER_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: PESANAN_USER_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionUploadPayment = (id, data) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: BOOKING_START});

    console.log('id', id);

    const newData = new FormData();
    newData.append('nama', data.nama);
    newData.append('bank', data.bank);
    newData.append('norek', data.norek);
    newData.append('foto', {
      uri: data.foto.uri,
      name: 'buktiPembayaran',
      type: data.foto.type,
    });

    axios
      .put(`https://skripsi-wulan.herokuapp.com/pesanan/${id}`, newData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch({type: BOOKING_FINISH});
        resolve(res.data);
      })
      .catch(err => {
        showError('Somethings wrong !');
        dispatch({type: BOOKING_FINISH});
        reject(err.response.status);
      });
  });
};
