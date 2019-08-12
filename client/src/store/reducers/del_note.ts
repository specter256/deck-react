import {
  DEL_NOTE_BEGIN,
  DEL_NOTE_SUCCESS,
  DEL_NOTE_FAILURE
} from 'store/actions/del_note';

const initialState = {
  error: null
};

export const delNote = (state = initialState, action: any) => {
  switch(action.type) {
    case DEL_NOTE_BEGIN:
      return {
        ...state,
        error: null
      };

    case DEL_NOTE_SUCCESS:
      return {
        ...state
      };

    case DEL_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
