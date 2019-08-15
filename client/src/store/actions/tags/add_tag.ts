import axios from 'axios';
import { Tag } from 'interfaces/interfaces';

export const ADD_TAG_BEGIN   = 'ADD_TAG_BEGIN';
export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS';
export const ADD_TAG_FAILURE = 'ADD_TAG_FAILURE';

export const addTagBegin = () => ({
  type: ADD_TAG_BEGIN
});

export const addTagSuccess = (tag: Tag) => ({
  type: ADD_TAG_SUCCESS,
  payload: { tag }
});

export const addTagFailure = (error: any) => ({
  type: ADD_TAG_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const add = async (data: any) => {
  const response = await axios.post('api/tags/add', data);
  const res = await handleErrors(response);
  return res.data;
}

export function addTag(data: any) {
  return async (dispatch: any) => {
    dispatch(addTagBegin());

    try {
      const res = await add(data);
      dispatch(addTagSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(addTagFailure(error));
    }
  };
}
