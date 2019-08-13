import {
  FETCH_NOTE_BEGIN,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_FAILURE,
  CLEAR_SELECTED_NOTE,
} from 'store/actions/fetch_note';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export const fetchNote = (state = initialState, action: any) => {
  switch(action.type) {
    case FETCH_NOTE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        data: action.payload.note,
        loading: false,
      };

    case FETCH_NOTE_FAILURE:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload.error,
      };

      case CLEAR_SELECTED_NOTE:
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        }

    default:
      return state;
  }
};
