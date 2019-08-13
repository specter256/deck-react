import {
  combineReducers,
} from 'redux';

import { fetchNotes } from 'store/reducers/fetch_notes';
import { fetchNote } from 'store/reducers/fetch_note';
import { addNote } from 'store/reducers/add_note';
import { updNote } from 'store/reducers/upd_note';
import { delNote } from 'store/reducers/del_note';
import { common } from 'store/reducers/common';

export const rootReducer = combineReducers({
  fetchNotes,
  fetchNote,
  addNote,
  updNote,
  delNote,
  common,
});

export type AppState = ReturnType<typeof rootReducer>
