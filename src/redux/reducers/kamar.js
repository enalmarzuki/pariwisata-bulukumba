import {
  KAMAR_START,
  KAMAR_SUCCESS,
  KAMAR_FAIL,
  BOOKING_START,
  BOOKING_FINISH,
} from '../type';

const initialState = {
  isLoading: false,
  dataKamar: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case KAMAR_START:
      return {
        ...state,
        isLoading: true,
      };
    case KAMAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataKamar: action.value,
      };
    case KAMAR_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case BOOKING_START:
      return {
        ...state,
        isLoading: true,
      };
    case BOOKING_FINISH:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
