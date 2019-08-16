import {
  TOGGLE_EDIT_MODE,
  SEARCH_BY_TAG,
  SEARCH_BY_TEXT,
} from 'store/actions/common';

const initialState = {
  editMode: true,
  search: {
    tag: null,
    text: null,
  }
};

export const common = (state = initialState, action: any) => {
  switch(action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode
      };
    case SEARCH_BY_TAG:
      return {
        ...state,
        search: {
          ...state.search,
          tag: action.tag,
        }
      };
    case SEARCH_BY_TEXT:
      return {
        ...state,
        search: {
          ...state.search,
          text: action.text,
        }
      };

    default:
      return state;
  }
};
