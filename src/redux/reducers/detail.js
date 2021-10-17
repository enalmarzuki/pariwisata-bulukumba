import {DETAIL_START, DETAIL_SUCCESS, DETAIL_FAIL} from '../type';

const initialState = {
  isLoading: false,
  dataDetail: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_START:
      return {
        ...state,
        isLoading: true,
      };
    case DETAIL_SUCCESS:
      return {
        ...state,
        dataDetail: action.value,
        isLoading: false,
      };
    case DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
