import axios from 'axios';
import { Tag } from 'interfaces/interfaces';

export const DEL_TAG_BEGIN   = 'DEL_TAG_BEGIN';
export const DEL_TAG_SUCCESS = 'DEL_TAG_SUCCESS';
export const DEL_TAG_FAILURE = 'DEL_TAG_FAILURE';

export const delTagBegin = () => ({
  type: DEL_TAG_BEGIN
});

export const delTagSuccess = (tag: Tag) => ({
  type: DEL_TAG_SUCCESS,
  payload: { tag }
});

export const delTagFailure = (error: any) => ({
  type: DEL_TAG_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const del = async (data: any) => {
  const response = await axios.delete('api/tags/del', {
    data: data
  });
  const res = await handleErrors(response);
  return res.data;
}

export function delTag(data: any) {
  return async (dispatch: any) => {
    dispatch(delTagBegin());

    try {
      const res = await del(data);
      dispatch(delTagSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(delTagFailure(error));
    }
  };
}
