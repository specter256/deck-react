import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { Note } from 'interfaces/interfaces';
import * as themes from 'utils/themes';
import Navbar from 'components/Navbar/Navbar';
import NoteContent from 'components/NoteContent/NoteContent';
import { fetchNotes } from 'store/actions/fetch_notes';
import { fetchNote } from 'store/actions/fetch_note';
import { addNote } from 'store/actions/add_note';
import { updNote } from 'store/actions/upd_note';
import { delNote } from 'store/actions/del_note';
import { toggleEditMode } from 'store/actions/common';
import { AppState } from 'store/reducers/root';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<void>;
  fetchNote: () => Promise<void>;
  addNote: () => Promise<void>;
  updNote: () => Promise<void>;
  delNote: () => Promise<void>;
  toggleEditMode: () => void;
  editMode: boolean;
  selectedNote: Note;
  notes: Note[];
}

type DeckState = {
}

class Deck extends React.Component<DeckProps, DeckState> {
  constructor(props: any) {
    super(props);
    themes.init();
    this.props.fetchNotes();
  }

  render() {
    return (
      <div id="deck">
        <SplitPane
          split="vertical"
          minSize={250}
          defaultSize={250}
          allowResize={false}
          resizerStyle={{ background: 'none' }}>
          <Navbar
            notes={this.props.notes}
            selectedNote={this.props.selectedNote}
            fetchNotes={this.props.fetchNotes}
            fetchNote={this.props.fetchNote}
            delNote={this.props.delNote}/>
          <NoteContent
            toggleEditMode={this.props.toggleEditMode}
            selectedNote={this.props.selectedNote}
            fetchNotes={this.props.fetchNotes}
            addNote={this.props.addNote}
            updNote={this.props.updNote}
            editMode={this.props.editMode}/>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notes: state.fetchNotes.items,
  editMode: state.common.editMode,
  selectedNote: state.fetchNote.data,
});

const mapDispatchToProps = {
  fetchNotes,
  fetchNote,
  addNote,
  updNote,
  delNote,
  toggleEditMode,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
