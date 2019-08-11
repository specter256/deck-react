import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { Note } from 'interfaces/interfaces';
import * as themes from 'utils/themes';
import Navbar from 'components/Navbar/Navbar';
import NoteContent from 'components/NoteContent/NoteContent';
import { fetchNotes } from 'store/actions/fetch_notes';
import { saveNote } from 'store/actions/save_note';
import { AppState } from 'store/reducers/root';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<void>;
  saveNote: () => Promise<void>;
  loading: boolean;
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
            loading={this.props.loading}
            fetchNotes={this.props.fetchNotes}/>
          <NoteContent
            saveNote={this.props.saveNote}
            fetchNotes={this.props.fetchNotes}/>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notes: state.fetchNotes.items,
  loading: state.fetchNotes.loading,
  error: state.fetchNotes.error
});

const mapDispatchToProps = {
  fetchNotes,
  saveNote,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
