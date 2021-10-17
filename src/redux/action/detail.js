import axios from 'axios';
import {DETAIL_FAIL, DETAIL_START, DETAIL_SUCCESS} from '../type';

export const actionGetDetail = url => dispatch => {
  console.log('urlasdasd', url);
  return new Promise((resolve, reject) => {
    dispatch({type: DETAIL_START});
    axios
      .get(url)
      .then(res => {
        console.log('res', res);
        dispatch({type: DETAIL_SUCCESS, value: res.data.result});
        resolve(res.data);
      })
      .catch(err => {
        dispatch({type: DETAIL_FAIL});
        reject(err.response.status);
      });
  });
};
