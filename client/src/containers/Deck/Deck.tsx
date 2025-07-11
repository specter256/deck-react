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
import { delImage } from 'store/actions/images/del_image';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: number) => Promise<Note>;
  addNote: () => Promise<void>;
  updNote: () => Promise<void>;
  delNote: () => Promise<void>;
  fetchTags: () => Promise<void>;
  addTag: () => Promise<void>;
  delTag: () => Promise<void>;
  toggleViewEdit: (isEdit?: boolean) => void;
  clearSelectedNote: () => void;
  searchByTag: () => void;
  searchByText: () => void;
  setFolder: (folder: string) => void;
  fetchImages: () => Promise<any[]>;
  delImage: () => Promise<void>;
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

    this.handleKeyDown = this.handleKeyDown.bind(this);

    Themes.init();
    ImageUploader.init(this.props.fetchImages);
    document.addEventListener('keydown', this.handleKeyDown);

    this.props.fetchNotes()
      .then((notes: Note[]) => {
        if (notes.length > 0) {
          this.props.fetchNote(notes[0].id);
        }
      });
    this.props.fetchImages();
    this.props.fetchTags();

    const folder = localStorage.getItem('folder');

    if (folder) {
      this.props.setFolder(folder);
    }
  }

  handleKeyDown(event: any) {
    const target = event.target || event.srcElement;

    if (/INPUT|TEXTAREA|SELECT|BUTTON/.test(target.nodeName) ) {
      return;
    }

    if (event.key === 'e') {
      event.preventDefault();
      this.props.toggleViewEdit();
    }

    if (event.key === 'c') {
      event.preventDefault();
      this.props.clearSelectedNote();
      this.props.setFolder('notes');
      this.props.toggleViewEdit(true);
      const editor = document.querySelector('textarea');

      if (editor) {
        editor.value = '';
        setTimeout(() => { editor.focus(); });
      }
    }

    if (event.ctrlKey && event.key === 'ArrowUp') {
      this.selectNextNote('up');
    }

    if (event.ctrlKey && event.key === 'ArrowDown') {
      this.selectNextNote('down');
    }
  }

  selectNextNote(direction: string) {
    if (!this.props.selectedNote.id) { return; }

    const directionVal = (direction === 'up') ? -1 : 1;
    const index = this.props.notes.findIndex(n => n.id === this.props.selectedNote.id);
    let nextNote = this.props.notes[index + directionVal];

    if (!nextNote) {
      if (directionVal === 1) {
        nextNote = this.props.notes[0];
      } else {
        nextNote = this.props.notes[this.props.notes.length - 1];
      }
    }

    if (!nextNote) { return; }

    this.props.fetchNote(nextNote.id);
  }

  render() {
    return (
      <div id="deck">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={200}
          allowResize={false}
        >
          <TagList
            tags={this.props.tags}
            fetchTags={this.props.fetchTags}
            addTag={this.props.addTag}
            delTag={this.props.delTag}
            fetchNotes={this.props.fetchNotes}
            searchByTag={this.props.searchByTag}
            searchTag={this.props.searchTag}
            setFolder={this.props.setFolder}
            folder={this.props.folder}
            fetchImages={this.props.fetchImages}
          />
          <SplitPane
            split="vertical"
            minSize={300}
            defaultSize={300}
            allowResize={false}
            resizerStyle={{ background: 'var(--p2_primary)' }}
          >
            <NoteList
              notes={this.props.notes}
              selectedNote={this.props.selectedNote}
              clearSelectedNote={this.props.clearSelectedNote}
              fetchNotes={this.props.fetchNotes}
              fetchNote={this.props.fetchNote}
              delNote={this.props.delNote}
              searchByTag={this.props.searchByTag}
              setFolder={this.props.setFolder}
            />
            <NoteContent
              folder={this.props.folder}
              tags={this.props.tags}
              toggleViewEdit={this.props.toggleViewEdit}
              selectedNote={this.props.selectedNote}
              clearSelectedNote={this.props.clearSelectedNote}
              fetchNotes={this.props.fetchNotes}
              fetchNote={this.props.fetchNote}
              searchByText={this.props.searchByText}
              addNote={this.props.addNote}
              updNote={this.props.updNote}
              editMode={this.props.editMode}
              images={this.props.images}
              fetchImages={this.props.fetchImages}
              delImage={this.props.delImage}
              setFolder={this.props.setFolder}
            />
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
  delImage,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
