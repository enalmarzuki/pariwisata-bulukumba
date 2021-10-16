import axios from 'axios';
import {
  PANGINAPAN_START,
  PANGINAPAN_SUCCESS,
  PANGINAPAN_FAIL,
  PANGINAPAN_DETAIL_START,
  PANGINAPAN_DETAIL_SUCCESS,
  PANGINAPAN_DETAIL_FAIL,
} from '../type';

export const actionGetPenginapan = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: PANGINAPAN_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/penginapan')
      .then(res => {
        dispatch({type: PANGINAPAN_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: PANGINAPAN_FAIL});
        reject(err.response.status);
      });
  });
};

export const actionGetDetailPenginapan = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: PANGINAPAN_DETAIL_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/penginapan/${id}`)
      .then(res => {
        dispatch({type: PANGINAPAN_DETAIL_SUCCESS, value: res.data?.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: PANGINAPAN_DETAIL_FAIL});
        reject(err.response.status);
      });
  });
};
