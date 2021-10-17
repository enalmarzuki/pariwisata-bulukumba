import {
  AGENDA_FAIL,
  AGENDA_START,
  AGENDA_SUCCESS,
  KULINER_DETAIL_FAIL,
  KULINER_DETAIL_START,
  KULINER_DETAIL_SUCCESS,
  KULINER_FAIL,
  KULINER_START,
  KULINER_SUCCESS,
} from '../type';

const initialState = {
  isLoading: false,
  dataAgenda: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AGENDA_START:
      return {
        ...state,
        isLoading: true,
      };
    case AGENDA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataAgenda: action.value,
      };
    case AGENDA_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
