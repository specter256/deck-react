import {
  SET_FOLDER,
  TOGGLE_VIEW_EDIT,
  SEARCH_BY_TAG,
  SEARCH_BY_TEXT,
} from 'store/actions/common';

const initialState = {
  folder: 'notes',
  editMode: true,
  search: {
    tag: null,
    text: null,
  }
};

export const common = (state = initialState, action: any) => {
  switch(action.type) {
    case SET_FOLDER:
      return {
        ...state,
        folder: action.folder
      };

    case TOGGLE_VIEW_EDIT:
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
