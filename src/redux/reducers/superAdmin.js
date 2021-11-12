import {
  SUPER_ADMIN_KULINER_FAIL,
  SUPER_ADMIN_KULINER_START,
  SUPER_ADMIN_KULINER_SUCCESS,
  SUPER_ADMIN_OLEH_FAIL,
  SUPER_ADMIN_OLEH_START,
  SUPER_ADMIN_OLEH_SUCCESS,
  SUPER_ADMIN_USER_FAIL,
  SUPER_ADMIN_USER_START,
  SUPER_ADMIN_USER_SUCCESS,
  SUPER_ADMIN_WISATA_FAIL,
  SUPER_ADMIN_WISATA_START,
  SUPER_ADMIN_WISATA_SUCCESS,
} from '../type';

const initialState = {
  isLoadingWisata: false,
  dataWisata: '',
  isLoadingKuliner: false,
  dataKuliner: '',
  isLoadingOleh: false,
  dataOleh: '',
  isLoadingUser: false,
  dataUser: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPER_ADMIN_WISATA_START:
      return {
        ...state,
        isLoadingWisata: true,
      };
    case SUPER_ADMIN_WISATA_SUCCESS:
      return {
        ...state,
        isLoadingWisata: false,
        dataWisata: action.wisata,
      };
    case SUPER_ADMIN_WISATA_FAIL:
      return {
        ...state,
        isLoadingWisata: false,
      };

    case SUPER_ADMIN_KULINER_START:
      return {
        ...state,
        isLoadingKuliner: true,
      };
    case SUPER_ADMIN_KULINER_SUCCESS:
      return {
        ...state,
        isLoadingKuliner: false,
        dataKuliner: action.kuliner,
      };
    case SUPER_ADMIN_KULINER_FAIL:
      return {
        ...state,
        isLoadingKuliner: false,
      };

    case SUPER_ADMIN_OLEH_START:
      return {
        ...state,
        isLoadingOleh: true,
      };
    case SUPER_ADMIN_OLEH_SUCCESS:
      return {
        ...state,
        isLoadingOleh: false,
        dataOleh: action.oleh,
      };
    case SUPER_ADMIN_OLEH_FAIL:
      return {
        ...state,
        isLoadingOleh: false,
      };

    case SUPER_ADMIN_USER_START:
      return {
        ...state,
        isLoadingUser: true,
      };
    case SUPER_ADMIN_USER_SUCCESS:
      return {
        ...state,
        isLoadingUser: false,
        dataUser: action.admin,
      };
    case SUPER_ADMIN_USER_FAIL:
      return {
        ...state,
        isLoadingUser: false,
      };

    default:
      return state;
  }
};

export default reducer;
