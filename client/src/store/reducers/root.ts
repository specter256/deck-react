import {
  combineReducers,
} from 'redux';

import { fetchNotes } from 'store/reducers/notes/fetch_notes';
import { fetchNote } from 'store/reducers/notes/fetch_note';
import { addNote } from 'store/reducers/notes/add_note';
import { updNote } from 'store/reducers/notes/upd_note';
import { delNote } from 'store/reducers/notes/del_note';
import { fetchTags } from 'store/reducers/tags/fetch_tags';
import { addTag } from 'store/reducers/tags/add_tag';
import { delTag } from 'store/reducers/tags/del_tag';
import { fetchImages } from 'store/reducers/images/fetch_images';
import { delImage } from 'store/reducers/images/del_image';
import { common } from 'store/reducers/common';

export const rootReducer = combineReducers({
  fetchNotes,
  fetchNote,
  addNote,
  updNote,
  delNote,
  fetchTags,
  addTag,
  delTag,
  fetchImages,
  delImage,
  common,
});

export type AppState = ReturnType<typeof rootReducer>
