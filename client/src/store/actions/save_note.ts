import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const SAVE_NOTE_BEGIN   = 'SAVE_NOTE_BEGIN';
export const SAVE_NOTE_SUCCESS = 'SAVE_NOTE_SUCCESS';
export const SAVE_NOTE_FAILURE = 'SAVE_NOTE_FAILURE';

export const saveNoteBegin = () => ({
  type: SAVE_NOTE_BEGIN
});

export const saveNoteSuccess = (notes: Note) => ({
  type: SAVE_NOTE_SUCCESS,
  payload: { notes }
});

export const saveNoteFailure = (error: any) => ({
  type: SAVE_NOTE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const save = (data: any) => {
  return axios.post('api/notes/add', data)
    .then(handleErrors)
    .then(res => res.data);
}

export function saveNote(data: any) {
  return (dispatch: any) => {
    dispatch(saveNoteBegin());

    return save(data)
      .then(res => {
        dispatch(saveNoteSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(saveNoteFailure(error))
      });
  };
}
