import {
  FETCH_IMAGES_BEGIN,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE
} from 'store/actions/images/fetch_images';
import { Image } from 'interfaces/interfaces';

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
      const images: any = [];
      action.payload.images.forEach((image: Image) => {
        images.push({
          id: image.id,
          src: `api/images/${image.filename}`,
          width: 1,
          height: 1,
        });
      });

      return {
        ...state,
        loading: false,
        items: images
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
