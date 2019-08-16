import {
  FETCH_IMAGES_BEGIN,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE
} from 'store/actions/images/fetch_images';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchImages = (state = initialState, action: any) => {
  switch(action.type) {
    case FETCH_IMAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.images
      };

    case FETCH_IMAGES_FAILURE:
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
