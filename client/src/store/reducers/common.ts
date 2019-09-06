import {
  SET_FOLDER,
  TOGGLE_VIEW_EDIT,
  SEARCH_BY_TAG,
  SEARCH_BY_TEXT,
} from 'store/actions/common';

const initialState = {
  folder: 'notes',
  editMode: false,
  search: {
    tag: null,
    text: null,
  }
};

export const common = (state = initialState, action: any) => {
  switch(action.type) {
    case SET_FOLDER:
      localStorage.setItem('folder', action.folder);;

      return {
        ...state,
        folder: action.folder
      };

    case TOGGLE_VIEW_EDIT:
      return {
        ...state,
        editMode: action.isEdit !== undefined ? action.isEdit : !state.editMode
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
