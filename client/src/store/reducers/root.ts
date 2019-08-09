import {
  combineReducers,
} from 'redux';

import { fetchNotes } from 'store/reducers/fetch_notes';
import { saveNote } from 'store/reducers/save_note';

export const rootReducer = combineReducers({
  fetchNotes,
  saveNote,
});

export type AppState = ReturnType<typeof rootReducer>
