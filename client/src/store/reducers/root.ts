import {
  combineReducers,
} from 'redux';

import { fetchNotes } from 'store/reducers/fetch_notes';
import { saveNote } from 'store/reducers/save_note';
import { delNote } from 'store/reducers/del_note';

export const rootReducer = combineReducers({
  fetchNotes,
  saveNote,
  delNote,
});

export type AppState = ReturnType<typeof rootReducer>
