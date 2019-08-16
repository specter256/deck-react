import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import TagList from 'components/TagList/TagList';
import NoteList from 'components/NoteList/NoteList';
import NoteContent from 'components/NoteContent/NoteContent';
import { Note, Tag } from 'interfaces/interfaces';
import * as themes from 'utils/themes';
import { fetchNotes } from 'store/actions/notes/fetch_notes';
import { addNote } from 'store/actions/notes/add_note';
import { updNote } from 'store/actions/notes/upd_note';
import { delNote } from 'store/actions/notes/del_note';
import { fetchTags } from 'store/actions/tags/fetch_tags';
import { addTag } from 'store/actions/tags/add_tag';
import { delTag } from 'store/actions/tags/del_tag';
import { AppState } from 'store/reducers/root';
import { toggleEditMode, selectTag } from 'store/actions/common';
import { fetchNote, clearSelectedNote } from 'store/actions/notes/fetch_note';
import { getFilteredNotes } from 'store/selectors/index';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<void>;
  fetchNote: () => Promise<void>;
  addNote: () => Promise<void>;
  updNote: () => Promise<void>;
  delNote: () => Promise<void>;
  fetchTags: () => Promise<void>;
  addTag: () => Promise<void>;
  delTag: () => Promise<void>;
  toggleEditMode: () => void;
  clearSelectedNote: () => void;
  selectTag: () => Promise<void>;
  editMode: boolean;
  selectedNote: Note;
  notes: Note[];
  tags: Tag[];
  selectedTag: Tag;
}

type DeckState = {
}

class Deck extends React.Component<DeckProps, DeckState> {
  constructor(props: any) {
    super(props);
    themes.init();
    this.props.fetchNotes();
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
          resizerStyle={{ background: 'none' }}>
          <TagList
            tags={this.props.tags}
            fetchTags={this.props.fetchTags}
            addTag={this.props.addTag}
            delTag={this.props.delTag}
            fetchNotes={this.props.fetchNotes}
            selectTag={this.props.selectTag}
            selectedTag={this.props.selectedTag}/>
          <SplitPane
            split="vertical"
            minSize={300}
            defaultSize={300}
            allowResize={false}
            resizerStyle={{ background: 'none' }}>
            <NoteList
              notes={this.props.notes}
              selectedNote={this.props.selectedNote}
              fetchNotes={this.props.fetchNotes}
              fetchNote={this.props.fetchNote}
              delNote={this.props.delNote}
              selectTag={this.props.selectTag}/>
            <NoteContent
              tags={this.props.tags}
              toggleEditMode={this.props.toggleEditMode}
              selectedNote={this.props.selectedNote}
              clearSelectedNote={this.props.clearSelectedNote}
              fetchNotes={this.props.fetchNotes}
              addNote={this.props.addNote}
              updNote={this.props.updNote}
              editMode={this.props.editMode}/>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notes: getFilteredNotes(state),
  tags: state.fetchTags.items,
  editMode: state.common.editMode,
  selectedNote: state.fetchNote.data,
  selectedTag: state.common.selectedTag
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
  toggleEditMode,
  selectTag,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
