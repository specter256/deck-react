import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const FETCH_NOTES_BEGIN   = 'FETCH_NOTES_BEGIN';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN
});

export const fetchNotesSuccess = (notes: Note) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes }
});

export const fetchNotesFailure = (error: any) => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const getNotes = async () => {
  const response = await axios.get('api/notes');
  const res = await handleErrors(response);
  return res.data;
}

export function fetchNotes() {
  return async (dispatch: any) => {
    dispatch(fetchNotesBegin());

    try {
      const data = await getNotes();
      dispatch(fetchNotesSuccess(data));
      return data;
    }
    catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
}
