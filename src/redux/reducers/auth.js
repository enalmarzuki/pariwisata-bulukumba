import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS} from '../type';

const initialState = {
  isLoading: false,
  dataUser: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataUser: action.value,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
