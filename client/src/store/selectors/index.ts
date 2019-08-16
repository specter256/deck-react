import { AppState } from 'store/reducers/root';
import { createSelector } from 'reselect';

import { Note, Tag } from 'interfaces/interfaces';

const getNotes = (state: AppState) => state.fetchNotes.items
const getSearchTag = (state: AppState) => state.common.search.tag
const getSearchText = (state: AppState) => state.common.search.text

export const filterByTag = createSelector(
  [getNotes, getSearchTag],
  (notes: Note[], tag: Tag) => {
    if (!tag) {
      return notes;
    }

    const filteredNotes = notes.filter((note: Note) => {
      return note.tags.find(x => x.id === tag.id) !== undefined;
    });

    return filteredNotes;
  }
);

export const filterByText = createSelector(
  [getNotes, getSearchText],
  (notes: Note[], text: string) => {
    if (!text) {
      return notes;
    }

    const filteredNotes = notes.filter((note: Note) => {
      return note.text.toLowerCase().includes(text.toLowerCase());
    });

    return filteredNotes;
  }
);

export const getFilteredNotes = createSelector(
  [filterByTag, filterByText],
  (byTag, byText) => byTag.filter(value => -1 !== byText.indexOf(value))
);
