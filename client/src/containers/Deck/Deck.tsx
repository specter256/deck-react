import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { Note } from 'interfaces/interfaces';
import * as themes from 'utils/themes';
import Navbar from 'components/Navbar/Navbar';
import NoteContent from 'components/NoteContent/NoteContent';
import { fetchNotes } from 'store/actions/notes';
import { AppState } from 'store/reducers/root';

import './Deck.scss';

type DeckProps = {
  fetchNotes: () => Promise<void>;
  loading: boolean;
  notes: Note[];
}

type DeckState = {
}

class Deck extends React.Component<DeckProps, DeckState> {
  constructor(props: any) {
    super(props);
    themes.init();
  }

  render() {
    return (
      <div id="deck">
        <SplitPane
          split="vertical"
          minSize={250}
          defaultSize={250}
          resizerStyle={{ background: 'none' }}>
          <Navbar
            notes={this.props.notes}
            loading={this.props.loading}
            fetchNotes={this.props.fetchNotes}/>
          <NoteContent
            fetchNotes={this.props.fetchNotes}/>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notes: state.notes.items,
  loading: state.notes.loading,
  error: state.notes.error
});

const mapDispatchToProps = {
  fetchNotes,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
