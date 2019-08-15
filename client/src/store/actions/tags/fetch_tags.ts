import axios from 'axios';
import { Tag } from 'interfaces/interfaces';

export const FETCH_TAGS_BEGIN   = 'FETCH_TAGS_BEGIN';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const fetchTagsBegin = () => ({
  type: FETCH_TAGS_BEGIN
});

export const fetchTagsSuccess = (tags: Tag) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: { tags }
});

export const fetchTagsFailure = (error: any) => ({
  type: FETCH_TAGS_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const getTags = async () => {
  const response = await axios.get('api/tags');
  const res = await handleErrors(response);
  return res.data;
}

export function fetchTags() {
  return async (dispatch: any) => {
    dispatch(fetchTagsBegin());

    try {
      const data = await getTags();
      dispatch(fetchTagsSuccess(data));
      return data;
    }
    catch (error) {
      dispatch(fetchTagsFailure(error));
    }
  };
}
