import axios from 'axios';
import {
  DESTINATION_FAIL,
  DESTINATION_START,
  DESTINATION_SUCCESS,
} from '../type';

export const actionGetDestination = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: DESTINATION_START});
    axios
      .get('https://skripsi-wulan.herokuapp.com/agenda/destinasi')
      .then(res => {
        dispatch({type: DESTINATION_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: DESTINATION_FAIL});
        reject(err.response.status);
      });
  });
};
