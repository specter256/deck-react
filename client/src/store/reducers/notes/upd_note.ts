import {
  UPD_NOTE_BEGIN,
  UPD_NOTE_SUCCESS,
  UPD_NOTE_FAILURE
} from 'store/actions/notes/upd_note';

const initialState = {
  error: null
};

export const updNote = (state = initialState, action: any) => {
  switch(action.type) {
    case UPD_NOTE_BEGIN:
      return {
        ...state,
        error: null
      };

    case UPD_NOTE_SUCCESS:
      return {
        ...state
      };

    case UPD_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
