import axios from 'axios';
import { Image } from 'interfaces/interfaces';

export const FETCH_IMAGES_BEGIN   = 'FETCH_IMAGES_BEGIN';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export const fetchImagesBegin = () => ({
  type: FETCH_IMAGES_BEGIN
});

export const fetchImagesSuccess = (images: Image) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: { images }
});

export const fetchImagesFailure = (error: any) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const getImages = async () => {
  const response = await axios.get('api/images');
  const res = await handleErrors(response);
  return res.data;
}

export function fetchImages() {
  return async (dispatch: any) => {
    dispatch(fetchImagesBegin());

    try {
      const data = await getImages();
      dispatch(fetchImagesSuccess(data));
      return data;
    }
    catch (error) {
      dispatch(fetchImagesFailure(error));
    }
  };
}
