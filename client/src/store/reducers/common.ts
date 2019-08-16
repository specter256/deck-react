import {
  TOGGLE_EDIT_MODE,
  SELECT_TAG,
} from 'store/actions/common';

const initialState = {
  editMode: true,
  selectedTag: null,
};

export const common = (state = initialState, action: any) => {
  switch(action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode
      };
    case SELECT_TAG:
      return {
        ...state,
        selectedTag: action.tag
      };

    default:
      return state;
  }
};
