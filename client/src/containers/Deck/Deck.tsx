import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import TagList from 'components/TagList/TagList';
import NoteList from 'components/NoteList/NoteList';
import NoteContent from 'components/NoteContent/NoteContent';
import { Note, Tag } from 'interfaces/interfaces';
import { Themes } from 'utils/themes';
import { ImageUploader } from 'utils/imageUploader';
import { AppState } from 'store/reducers/root';
import { fetchNotes } from 'store/actions/notes/fetch_notes';
import { addNote } from 'store/actions/notes/add_note';
import { updNote } from 'store/actions/notes/upd_note';
import { delNote } from 'store/actions/notes/del_note';
import { fetchTags } from 'store/actions/tags/fetch_tags';
import { addTag } from 'store/actions/tags/add_tag';
import { delTag } from 'store/actions/tags/del_tag';
import { fetchNote, clearSelectedNote } from 'store/actions/notes/fetch_note';
import { getFilteredNotes } from 'store/selectors/index';
import { setFolder, toggleViewEdit, searchByTag, searchByText } from 'store/actions/common';
import { fetchImages } from 'store/actions/images/fetch_images';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: number) => Promise<void>;
  addNote: () => Promise<void>;
  updNote: () => Promise<void>;
  delNote: () => Promise<void>;
  fetchTags: () => Promise<void>;
  addTag: () => Promise<void>;
  delTag: () => Promise<void>;
  toggleViewEdit: () => void;
  clearSelectedNote: () => void;
  searchByTag: () => void;
  searchByText: () => void;
  setFolder: () => void;
  fetchImages: () => Promise<any[]>;
  folder: string;
  editMode: boolean;
  selectedNote: Note;
  notes: Note[];
  tags: Tag[];
  searchTag: Tag;
  images: any[];
}

type DeckState = {}

class Deck extends React.Component<DeckProps, DeckState> {
  constructor(props: any) {
    super(props);
    Themes.init();
    ImageUploader.init(this.props.fetchImages);
    this.props.fetchNotes()
      .then((notes: Note[]) => {
        if (notes.length > 0) {
          this.props.fetchNote(notes[0].id);
        }
      });
    this.props.fetchImages();
    this.props.fetchTags();
  }

  render() {
    return (
      <div id="deck">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={200}
          allowResize={false}
          resizerStyle={{ background: 'var(--p1_primary)' }}>
          <TagList
            tags={this.props.tags}
            fetchTags={this.props.fetchTags}
            addTag={this.props.addTag}
            delTag={this.props.delTag}
            fetchNotes={this.props.fetchNotes}
            searchByTag={this.props.searchByTag}
            searchTag={this.props.searchTag}
            setFolder={this.props.setFolder}
            fetchImages={this.props.fetchImages}/>
          <SplitPane
            split="vertical"
            minSize={300}
            defaultSize={300}
            allowResize={false}
            resizerStyle={{ background: 'var(--p2_primary)' }}>
            <NoteList
              notes={this.props.notes}
              selectedNote={this.props.selectedNote}
              fetchNotes={this.props.fetchNotes}
              fetchNote={this.props.fetchNote}
              delNote={this.props.delNote}
              searchByTag={this.props.searchByTag}
              setFolder={this.props.setFolder}/>
            <NoteContent
              folder={this.props.folder}
              tags={this.props.tags}
              toggleViewEdit={this.props.toggleViewEdit}
              selectedNote={this.props.selectedNote}
              clearSelectedNote={this.props.clearSelectedNote}
              fetchNotes={this.props.fetchNotes}
              searchByText={this.props.searchByText}
              addNote={this.props.addNote}
              updNote={this.props.updNote}
              editMode={this.props.editMode}
              images={this.props.images}/>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notes: getFilteredNotes(state),
  tags: state.fetchTags.items,
  images: state.fetchImages.items,
  folder: state.common.folder,
  editMode: state.common.editMode,
  selectedNote: state.fetchNote.data,
  searchTag: state.common.search.tag
});

const mapDispatchToProps = {
  fetchNotes,
  fetchNote,
  clearSelectedNote,
  addNote,
  updNote,
  delNote,
  fetchTags,
  addTag,
  delTag,
  toggleViewEdit,
  searchByTag,
  searchByText,
  setFolder,
  fetchImages,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
