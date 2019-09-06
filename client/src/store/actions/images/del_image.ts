import axios from 'axios';
import { Image } from 'interfaces/interfaces';

export const DEL_IMAGE_BEGIN   = 'DEL_IMAGE_BEGIN';
export const DEL_IMAGE_SUCCESS = 'DEL_IMAGE_SUCCESS';
export const DEL_IMAGE_FAILURE = 'DEL_IMAGE_FAILURE';

export const delImageBegin = () => ({
  type: DEL_IMAGE_BEGIN
});

export const delImageSuccess = (images: Image) => ({
  type: DEL_IMAGE_SUCCESS,
  payload: { images }
});

export const delImageFailure = (error: any) => ({
  type: DEL_IMAGE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const del = async (data: any) => {
  const response = await axios.delete('api/images/del', { data });
  const res = await handleErrors(response);
  return res.data;
}

export function delImage(data: any) {
  return async (dispatch: any) => {
    dispatch(delImageBegin());

    try {
      const res = await del(data);
      dispatch(delImageSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(delImageFailure(error));
    }
  };
}
