import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const ADD_NOTE_BEGIN   = 'ADD_NOTE_BEGIN';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';

export const addNoteBegin = () => ({
  type: ADD_NOTE_BEGIN
});

export const addNoteSuccess = (notes: Note) => ({
  type: ADD_NOTE_SUCCESS,
  payload: { notes }
});

export const addNoteFailure = (error: any) => ({
  type: ADD_NOTE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const add = async (data: any) => {
  const response = await axios.post('api/notes/add', data);
  const res = await handleErrors(response);
  return res.data;
}

export function addNote(data: any) {
  return async (dispatch: any) => {
    dispatch(addNoteBegin());

    try {
      const res = await add(data);
      dispatch(addNoteSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(addNoteFailure(error));
    }
  };
}
