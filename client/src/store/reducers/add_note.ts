import {
  ADD_NOTE_BEGIN,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE
} from 'store/actions/add_note';

const initialState = {
  error: null
};

export const addNote = (state = initialState, action: any) => {
  switch(action.type) {
    case ADD_NOTE_BEGIN:
      return {
        ...state,
        error: null
      };

    case ADD_NOTE_SUCCESS:
      return {
        ...state
      };

    case ADD_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
