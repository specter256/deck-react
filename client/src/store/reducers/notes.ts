import {
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE
} from 'store/actions/notes';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const notes = (state = initialState, action: any) => {
  switch(action.type) {
    case FETCH_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.notes
      };

    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
};
