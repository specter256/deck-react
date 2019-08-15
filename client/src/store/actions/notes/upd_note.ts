import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const UPD_NOTE_BEGIN   = 'UPD_NOTE_BEGIN';
export const UPD_NOTE_SUCCESS = 'UPD_NOTE_SUCCESS';
export const UPD_NOTE_FAILURE = 'UPD_NOTE_FAILURE';

export const updNoteBegin = () => ({
  type: UPD_NOTE_BEGIN
});

export const updNoteSuccess = (notes: Note) => ({
  type: UPD_NOTE_SUCCESS,
  payload: { notes }
});

export const updNoteFailure = (error: any) => ({
  type: UPD_NOTE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const upd = async (data: any) => {
  const response = await axios.post('api/notes/upd', data);
  const res = await handleErrors(response);
  return res.data;
}

export function updNote(data: any) {
  return async (dispatch: any) => {
    dispatch(updNoteBegin());

    try {
      const res = await upd(data);
      dispatch(updNoteSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(updNoteFailure(error));
    }
  };
}
