import {
  TOGGLE_EDIT_MODE,
} from 'store/actions/common';

const initialState = {
  editMode: true
};

export const common = (state = initialState, action: any) => {
  switch(action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode
      };

    default:
      return state;
  }
};
