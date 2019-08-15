import {
  ADD_TAG_BEGIN,
  ADD_TAG_SUCCESS,
  ADD_TAG_FAILURE
} from 'store/actions/tags/add_tag';

const initialState = {
  error: null
};

export const addTag = (state = initialState, action: any) => {
  switch(action.type) {
    case ADD_TAG_BEGIN:
      return {
        ...state,
        error: null
      };

    case ADD_TAG_SUCCESS:
      return {
        ...state
      };

    case ADD_TAG_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
