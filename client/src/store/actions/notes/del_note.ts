import axios from 'axios';
import { Note } from 'interfaces/interfaces';

export const DEL_NOTE_BEGIN   = 'DEL_NOTE_BEGIN';
export const DEL_NOTE_SUCCESS = 'DEL_NOTE_SUCCESS';
export const DEL_NOTE_FAILURE = 'DEL_NOTE_FAILURE';

export const delNoteBegin = () => ({
  type: DEL_NOTE_BEGIN
});

export const delNoteSuccess = (notes: Note) => ({
  type: DEL_NOTE_SUCCESS,
  payload: { notes }
});

export const delNoteFailure = (error: any) => ({
  type: DEL_NOTE_FAILURE,
  payload: { error }
});

function handleErrors(response: any) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }

  return response;
}

const del = async (data: any) => {
  const response = await axios.delete('api/notes/del', { data });
  const res = await handleErrors(response);
  return res.data;
}

export function delNote(data: any) {
  return async (dispatch: any) => {
    dispatch(delNoteBegin());

    try {
      const res = await del(data);
      dispatch(delNoteSuccess(res));
      return res;
    }
    catch (error) {
      dispatch(delNoteFailure(error));
    }
  };
}
