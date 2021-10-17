import axios from 'axios';
import {AGENDA_FAIL, AGENDA_START, AGENDA_SUCCESS} from '../type';

export const actionGetAgenda = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: AGENDA_START});
    axios
      .get(`https://skripsi-wulan.herokuapp.com/agenda/list/${id}`)
      .then(res => {
        dispatch({type: AGENDA_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: AGENDA_FAIL});
        reject(err.response.status);
      });
  });
};
