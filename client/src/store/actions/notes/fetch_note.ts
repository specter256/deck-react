import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const FETCH_NOTE_BEGIN   = 'FETCH_NOTE_BEGIN';
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const FETCH_NOTE_FAILURE = 'FETCH_NOTE_FAILURE';
export const CLEAR_SELECTED_NOTE = 'CLEAR_SELECTED_NOTE';

export const fetchNoteBegin = () => ({
  type: FETCH_NOTE_BEGIN
});

export const fetchNoteSuccess = (note: Note) => ({
  type: FETCH_NOTE_SUCCESS,
  payload: { note }
});

export const fetchNoteFailure = (error: any) => ({
  type: FETCH_NOTE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const getNote = async (id: number) => {
  const response = await axios.get(`api/notes/${id}`);
  const res = await handleErrors(response);
  return res.data;
}

export function fetchNote(id: number) {
  return async (dispatch: any) => {
    dispatch(fetchNoteBegin());

    try {
      const res = await getNote(id);
      dispatch(fetchNoteSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(fetchNoteFailure(error));
    }
  };
}

export const clearSelectedNote = () => (dispatch: any) => {
  dispatch({ type: 'CLEAR_SELECTED_NOTE' });
};
