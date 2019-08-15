import {
  FETCH_TAGS_BEGIN,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from 'store/actions/tags/fetch_tags';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchTags = (state = initialState, action: any) => {
  switch(action.type) {
    case FETCH_TAGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.tags
      };

    case FETCH_TAGS_FAILURE:
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
