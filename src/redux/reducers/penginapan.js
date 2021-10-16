import {
  PANGINAPAN_START,
  PANGINAPAN_SUCCESS,
  PANGINAPAN_FAIL,
  PANGINAPAN_DETAIL_START,
  PANGINAPAN_DETAIL_SUCCESS,
  PANGINAPAN_DETAIL_FAIL,
} from '../type';

const initialState = {
  isLoading: false,
  dataPenginapan: [],
  dataDetailPenginapan: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PANGINAPAN_START:
      return {
        ...state,
        isLoading: true,
      };
    case PANGINAPAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataPenginapan: action.value,
      };
    case PANGINAPAN_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case PANGINAPAN_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      };
    case PANGINAPAN_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDetailPenginapan: action.value,
      };
    case PANGINAPAN_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
