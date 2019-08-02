import React from 'react';
import SplitPane from 'react-split-pane';

import './Deck.scss';
import * as themes from '../utils/themes';
import Navbar from '../Navbar/Navbar';
import NoteContent from '../NoteContent/NoteContent';

export default class Deck extends React.Component {
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
          <Navbar/>
          <NoteContent/>
        </SplitPane>
      </div>
    );
  }
}
