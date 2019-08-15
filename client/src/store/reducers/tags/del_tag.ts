import {
  DEL_TAG_BEGIN,
  DEL_TAG_SUCCESS,
  DEL_TAG_FAILURE
} from 'store/actions/tags/del_tag';

const initialState = {
  error: null
};

export const delTag = (state = initialState, action: any) => {
  switch(action.type) {
    case DEL_TAG_BEGIN:
      return {
        ...state,
        error: null
      };

    case DEL_TAG_SUCCESS:
      return {
        ...state
      };

    case DEL_TAG_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
