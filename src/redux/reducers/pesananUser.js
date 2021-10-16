import {
  PESANAN_USER_START,
  PESANAN_USER_SUCCESS,
  PESANAN_USER_FAIL,
  DETAIL_PESANAN_USER_SUCCESS,
  BOOKING_START,
  BOOKING_FINISH,
} from '../type';

const initialState = {
  isLoading: false,
  dataListPesanan: [],
  detailPesanan: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PESANAN_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case PESANAN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataListPesanan: action.value,
      };
    case DETAIL_PESANAN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detailPesanan: action.value,
      };
    case PESANAN_USER_FAIL:
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
