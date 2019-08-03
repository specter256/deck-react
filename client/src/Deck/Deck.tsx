import React from 'react';
import SplitPane from 'react-split-pane';

import './Deck.scss';
import * as themes from '../utils/themes';
import Navbar from '../Navbar/Navbar';
import NoteContent from '../NoteContent/NoteContent';

interface DeckProps {
}

interface DeckState {
}

export default class Deck extends React.Component<DeckProps, DeckState> {
  constructor(props: any) {
    super(props);
    themes.init();
  }

  saveHandler() {
  }

  render() {
    return (
      <div id="deck">
        <SplitPane
          split="vertical"
          minSize={250}
          defaultSize={250}
          resizerStyle={{ background: 'none' }}>
          <Navbar/>
          <NoteContent onSave={this.saveHandler}/>
        </SplitPane>
      </div>
    );
  }
}
