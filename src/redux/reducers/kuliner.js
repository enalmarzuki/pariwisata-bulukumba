import {
  KULINER_DETAIL_FAIL,
  KULINER_DETAIL_START,
  KULINER_DETAIL_SUCCESS,
  KULINER_FAIL,
  KULINER_START,
  KULINER_SUCCESS,
} from '../type';

const initialState = {
  isLoading: false,
  dataKuliner: [],
  dataDetailKuliner: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case KULINER_START:
      return {
        ...state,
        isLoading: true,
      };
    case KULINER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataKuliner: action.value,
      };
    case KULINER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case KULINER_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      };
    case KULINER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDetailKuliner: action.value,
      };
    case KULINER_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
