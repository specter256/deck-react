import { createSelector } from 'reselect';

import { Note, Tag } from 'interfaces/interfaces';

const getNotes = (state: any) => state.fetchNotes.items
const getSelectedTag = (state: any) => state.common.selectedTag

export const getFilteredNotes = createSelector(
  [getNotes, getSelectedTag],
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
