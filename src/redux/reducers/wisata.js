import {
  WISATA_START,
  WISATA_SUCCESS,
  WISATA_FAIL,
  WISATA_DETAIL_START,
  WISATA_DETAIL_SUCCESS,
  WISATA_DETAIL_FAIL,
} from '../type';

const initialState = {
  isLoading: false,
  dataWisata: [],
  dataDetailWisata: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WISATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case WISATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataWisata: action.value,
      };
    case WISATA_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case WISATA_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      };
    case WISATA_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataDetailWisata: action.value,
      };
    case WISATA_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
