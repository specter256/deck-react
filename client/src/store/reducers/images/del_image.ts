import {
  DEL_IMAGE_BEGIN,
  DEL_IMAGE_SUCCESS,
  DEL_IMAGE_FAILURE
} from 'store/actions/images/del_image';

const initialState = {
  error: null
};

export const delImage = (state = initialState, action: any) => {
  switch(action.type) {
    case DEL_IMAGE_BEGIN:
      return {
        ...state,
        error: null
      };

    case DEL_IMAGE_SUCCESS:
      return {
        ...state
      };

    case DEL_IMAGE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
