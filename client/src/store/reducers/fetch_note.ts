import {
  FETCH_NOTE_BEGIN,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_FAILURE
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
        loading: false,
        data: action.payload.note,
      };

    case FETCH_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
};
