import {
  OLEH_OLEH_DETAIL_FAIL,
  OLEH_OLEH_DETAIL_START,
  OLEH_OLEH_DETAIL_SUCCESS,
  OLEH_OLEH_FAIL,
  OLEH_OLEH_START,
  OLEH_OLEH_SUCCESS,
} from '../type';

const initialState = {
  isLoading: false,
  dataOlehOleh: [],
  dataDetailOlehOleh: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OLEH_OLEH_START:
      return {
        ...state,
        isLoading: true,
      };
    case OLEH_OLEH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataOlehOleh: action.value,
      };
    case OLEH_OLEH_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case OLEH_OLEH_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      };
    case OLEH_OLEH_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDetailOlehOleh: action.value,
      };
    case OLEH_OLEH_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
