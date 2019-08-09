import {
  SAVE_NOTE_BEGIN,
  SAVE_NOTE_SUCCESS,
  SAVE_NOTE_FAILURE
} from 'store/actions/save_note';

const initialState = {
  error: null
};

export const saveNote = (state = initialState, action: any) => {
  switch(action.type) {
    case SAVE_NOTE_BEGIN:
      return {
        ...state,
        error: null
      };

    case SAVE_NOTE_SUCCESS:
      return {
        ...state
      };

    case SAVE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
