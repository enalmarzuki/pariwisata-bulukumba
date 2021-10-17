import axios from 'axios';
import {
  WISATA_DETAIL_START,
  WISATA_DETAIL_SUCCESS,
  WISATA_FAIL,
  WISATA_START,
  WISATA_SUCCESS,
} from '../type';

export const actionGetWisata = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: WISATA_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/wisata')
      .then(res => {
        dispatch({type: WISATA_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: WISATA_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailWisata = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: WISATA_DETAIL_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/wisata/${id}`)
      .then(res => {
        console.log('res dadaasdsad', res);
        dispatch({type: WISATA_DETAIL_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        console.log('err asdadsad', err);
        dispatch({type: WISATA_FAIL});
        reject(err.response.status);
      });
  });
};
