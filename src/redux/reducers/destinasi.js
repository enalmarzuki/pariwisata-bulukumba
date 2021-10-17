import {
  DESTINATION_START,
  DESTINATION_SUCCESS,
  DESTINATION_FAIL,
} from '../type';

const initialState = {
  isLoading: false,
  dataDestinations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DESTINATION_START:
      return {
        ...state,
        isLoading: true,
      };
    case DESTINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDestinations: action.value,
      };
    case DESTINATION_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
